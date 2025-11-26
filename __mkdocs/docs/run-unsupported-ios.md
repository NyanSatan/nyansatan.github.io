# Running unsupported iOS on deprecated devices

<style>body { background-color: #2a3c5f; }</style>
<div class="desc">Created on 26.11.25</div>

Earlier this year I [demoed](https://youtu.be/VTbShvf97kI) iOS 6 running on an iPod touch 3 - a device that Apple never gave iOS 6 to, making iOS 5.1.1 the latest build it can run

A few months later I also released a [script](https://github.com/NyanSatan/SundanceInH2A) that generates an iOS 6 restore image installable on that iPod touch model

This article describes technical details behind this work. Certain proficiency in iOS internals is assumed

![](/resources/projects/sundanceh2a.jpg)

## I'll show you what iOS is made of

First of all, let's recap what software components iOS consists of:

1. **iBoot** - the bootloader. Has 4 different types for different scenarios - iBSS, iBEC, LLB and iBoot

2. **Kernelcache** - the OS kernel + kernel extensions (drivers) built into a single binary blob

3. **DeviceTree** - structured list of hardware used by specific device model + some parameters that specify software behavior. The copy included in an IPSW is more of a template that is heavily modified by iBoot before jumping into kernel

4. Userspace filesystem - tiny **restore ramdisk** used purely for OS installation or the actual **root filesystem** of iOS installed persistently

5. Various firmwares for coprocessors, be they internal or external to the main SoC - like, baseband, Wi-Fi, Bluetooth, multitouch and etc.

## iPhone 3GS tests

iPhone 3GS was released the same year as iPod touch 3 (2009), and has a very similar hardware (**S5L8920X** SoC vs. **S5L8922X**). But the most important part is that it actually got iOS 6 officially

Before doing anything on the iPod I decided to try to boot iOS 6.0 with iOS 5.1.1 iBoot & DeviceTree on the iPhone and see what's gonna break and how

## DeviceTree

The most broken thing was DeviceTree - iOS 6 added a lot of new nodes and properties. To fix it in automated manner I wrote a stupid Python script that decodes and computes a diff between 2 DeviceTrees. Such diff can also be applied to another DeviceTree

The script is available in the **SundanceInH2A** [repo](https://github.com/NyanSatan/SundanceInH2A/blob/master/dt/ddt.py)

As I mentioned above a lot of things in a DeviceTree is filled by iBoot at runtime. One of such new properties is `nvram-proxy-data` in `chosen` node

The property must contain a raw NVRAM dump - leaving it empty will make kernel get stuck somewhere very early

For iPod touch 3 I also had to clean-up the diff out of iPhone-specific things before applying it to iPod's 5.1.1 DeviceTree

## iBoot

iBoot didn't require any major changes in this case. Just typical Image3 signature check patch, boot-args injection and `debug-enabled` patch so kernel is going to actually respect AMFI boot-args

One important thing is to actually populate `nvram-proxy-data` dynamically, at least for normal boots (aka non-restore). Restore boot will be fine with some random NVRAM hardcoded into DeviceTree, but normal one will overwrite your actual NVRAM with the random one if it decides to sync it at some point

I do it by replacing a call to `UpdateDeviceTree()` with my own little function that calls the real `UpdateDeviceTree()`, but also populates actual `nvram-proxy-data` and `random-seed` (this one shouldn't be of any importance)

For boot-args I always add `amfi=0xff` to disable code-signing, but that's pretty cannonical as well

Please note that other iBoot+kernel combos might require more changes - if you ever try something and it doesn't work, I recommend looking into DeviceTree differences (both the initial template and how iBoot fills it) and also `boot_args` structure iBoot passes to kernel (not to be confused with boot-args *string*, the `boot_args` *structure* is a different thing)

## Kernelcache

The most complex part. iPod touch 3 never got iOS 6 officialy, yes, but it was rumored that initially it was meant to have it, but Apple's marketing team said no. Either way, almost every internal iOS 6 build got both standalone S5L8922X kernel and even standalone kexts (including ones specific to iPod touch 3)

The question is how to load them all simultaneously. My initial idea was to do it just as older Mac OS X could do - load all kexts dynamically on bootloader level. Long story short, my strategy was the following:

1. In iBoot context, load all kexts from filesystem - binary itself + Info.plist
2. Lay them out in memory and add corresponding entries to `chosen/memory-map` node of DeviceTree
3. Boot standalone kernel which will then pick them up and load

The sad outcome:

```
panic(cpu 0 caller 0x802e5223): "kern_return_t kxld_link_file(KXLDContext *, u_char *, u_long, const char *, void *, KXLDDependency *, u_int, u_char **, kxld_addr_t *) (com.apple.kec.corecrypto) called in kernel without kxld support"
```

The kernel has all the code to pick them up, but not to actually link...

### Glueing a prelinked kernelcache

So creating a legit kernelcache is the only way after all. I was already imagining all the horrors of writing software to parse and apply `LINKEDIT` and etc., but then it occured to me! Mac OS X (before Apple Silicon) was generating such kernelcaches somehow! What if we use that logic to build our iOS kernelcache?

```sh
kcgen \
    -c output.bin \
    $(cat n18.10A403.kextlist | sed 's/^/--bundle-id /') \
    -kernel kernels_kexts_10A63970m/mach.development.s5l8922x \
    -arch armv7 \
    -all-personalities \
    -strip-symbols \
    -uncompressed \
    -- \
    kernels_kexts_10A63970m/Extensions
```

I used `/usr/local/bin/kcgen` from internal Sierra build (can be found online as "Phoenix A1708.dmg"), but it seems that even latest macOS `kextcache` can do it (included by default)

Here is a breakdown of the options:

* `-c output.bin` - output file to write resulting kernelcache to

* `$(cat n18.10A403.kextlist | sed 's/^/--bundle-id /')` - this weird expression appends `--bundle-id ` to every line from the file at `n18.10A403.kextlist`. This is to specify which kexts we'd like to include. How I created such list is described below

* `-arch armv7` - obviously only build armv7 slice

* `-all-personalities` - very important flag that prevents *irrelevant* IOKit personalities to be stripped. "Irrelevant" as in "irrelevant to current machine", meaning everything *relevant* to iPod touch 3 is going to be stripped

* `-strip-symbols` - strips unnecessary symbols. This flag can be omitted theoretically, but I recommend keeping it to make resulting kernelcache smaller

* `-uncompressed ` - do not apply compression. Since we'll have to change one little thing later, compression would have to be reapplied anyway

* `--` means the rest of the args will point to directories to grab kexts from

* `kernels_kexts_10A63970m/Extensions` is a path to a folder containing kexts

The little thing to do is to remove fat header. For some reason, it creates a fat Mach-O with a single slice. iBoot doesn't like it, so let's strip it:

```sh
lipo -thin armv7 output.bin -o output.thin.bin
```

The kernel cache is ready now! Just needs to be compressed and packaged into Image3 container

#### About kext lists

Once again I compared iPhone 3GS' iOS 5.1.1 vs. 6.0 - some kexts were added, some removed, some changed their bundle IDs, some were irrelevant for iPod touch 3

Do not forget to include the pseudo-extensions as well!

Samples can be found in **SundanceInH2A** [repository](https://github.com/NyanSatan/SundanceInH2A/tree/master/kc/kext_lists)

#### About IOKit personalities

In this specific case I had to patch up Info.plist of the Wi-Fi kext. As always there is a sample in the [repo](https://github.com/NyanSatan/SundanceInH2A/blob/master/kc/iokit_personalities.plist)


## Restore ramdisk filesystem

Pretty cannonical here. I patched `asr` as usual and also had to move `options.n88.plist` to `options.n18.plist` so it can lay out partitions properly

However, I also have to install the iBoot exploit. To do that I reimplement `rc.boot` binary:

1. Remount ramdisk and set `umask` just like the original one does

2. Call `restored_external`, but with `-server` argument, so it doesn't reboot after finishing restore

3. If restore was completed properly, I add a third partition, write the exploit there and set `boot-partition` to `2`

4. Reboot the device

My implementation is available guess where? Yes, in the [repository](https://github.com/NyanSatan/SundanceInH2A/tree/master/rc_boot)

## Root filesystem

This needed a lot of changes:

1. Add matching SpringBoard's hardware feature plist (`/System/Library/CoreServices/SpringBoard.app/N18AP.plist` in this case)
    * I took the iOS 5.1.1 variant as a base and added iOS 6 specific capabilities

    * I tried to keep *original* enough Home screen icon order by *merging* iPod touch 3 iOS 5.1.1 and iPod touch 4 6.x layouts

2. Add multitouch & Wi-Fi firmwares
    * I use versions from 5.1.1

3. Add Bluetooth firmware and scripts
    * This is more complicated, as those are all hardcoded into `/usr/sbin/BlueTool`

    * Luckily, they can also be overriden by files in `/etc/bluetool` - as always check my code for reference

    * I extracted both firmware and scripts from 5.1.1 `BlueTool`

4. **FairPlay** daemon is limited to `N88AP` (iPhone 3GS)
    * It has `LimitLoadToHardware` key in its' LaunchDaemon plist

    * But if we simply remove the key, it works on iPod touch 3 as well

    * This is important, because otherwise we cannot activate device through Apple's servers

    * This trick will be harder to pull off on iOS 6.1+ because they load LaunchDaemons from a signed cache. Still can be bypassed in many ways - for instance, patching `launchd` or forcefully loading another plist via `launchctl`

5. DYLD shared cache patches
    1. Product ID map patch
        * iOS 6 brings a concept of "product ID" in the form of a long byte sequence
        * It is filled by iBoot into `product` node of DeviceTree (which didn't even exist before)
        * I hardcode the value of iPhone 3GS straight into DeviceTree (`8784AE8D7066B0F0136BE91DCFE632A436FFD6FB`)
        * There is also a short form of this identifier - 16-bit integer - which existed before iOS 6
        * iPhone 3GS is `0x2714` and the iPod is `0x2715`
        * **MobileGestalt** framework has a table that matches the short form by the long one - I swap `0x2714` with `0x2715` there
        * I believe it's better for iTunes and etc.

    2. `getDeviceVariant()` patch
        * **MobileGestalt** once again messes us up our business
        * *Device variant* is a letter - usually "A" or "B"
        * It seems to depend on Wi-Fi transciever vendor used in exact device (?)
        * iOS 6 fails miserably to determine this value for iPod touch 3
        * This crashes activation process, for example
        * To fix it, I patch the function to always return "A" (in form of `CFString`)

    3. Fixing code signature
        * This is much easier than most people think
        * Shared cache files have the same format of signature as normal Mach-Os
        * And since it's just ad-hoc, all you need to do is to recalculate SHA-1 hash for pages you modified and update the signature
        * So easy, it can be done with just a hex-editor

## The iBoot exploit

iOS 5 iBoot had a bug in **HFS+** filesystem driver. I did make an exploit many years ago but it was *bad*. Like, truly *bad*. I reimplemented it from scratch for this project making it deterministic (hopefully...)

This subject probably deserves a separate article

## Conclusion & future plans

This was not easy to do, and yet easier than I expected initially

After releasing the tool many people asked me about jailbreaking. The old tools are not going to work, but it should be easy to just patch the kernel and drop Cydia tarball onto the filesystem. I guess I will give it a try later

There was another device that Apple dropped support for in that year - iPad 1. I will try that soon enough as well

I hope that the information from this write-up will help you making other crazy combinations, like iOS 4 on iPhone 4S or iOS 5 on iPad mini 1
