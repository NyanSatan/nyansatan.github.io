var map =
{
    "projects" : {
        "template" : "templates/project.html",
        "desc" : "Most notable software projects of mine. Check my GitHub profile for the rest of them",
        "posts" : [
            {
                "title" : "Anya",
                "desc" : "(Ab)uses hardware debugging available on preproduction prototypes of Apple devices to decrypt production iOS firmwares",
                "picture" : "resources/projects/anya.png",
                "link" : "https://github.com/NyanSatan/Anya"
            },
            {
                "title" : "Image3 RE",
                "desc" : "Research on the mysterious Apple A6 ROM exploit that uses flaws in Image3 subsystem. Even though I found a few bugs there, it's not enough",
                "picture" : "resources/projects/ipsw.png",
                "link" : "https://github.com/NyanSatan/Image3RE"
            },
            {
                "title" : "S5Late-8723",
                "desc" : "iPod nano 6 port of the new ROM exploit by @__gsch - S5Late, which is originally made for nano 7. Also supports iPod shuffle 4",
                "picture" : "resources/projects/ipodnano6.png",
                "link" : "https://github.com/NyanSatan/S5Late-8723"
            },
            {
                "title" : "S5L8442Pwnage2",
                "desc" : "iPod shuffle 3 port of ancient Pwnage 2.0 exploit that was initially released back in 2008",
                "picture" : "resources/projects/ipodshuffle3.png",
                "link" : "https://github.com/NyanSatan/S5L8442Pwnage2"
            },
            {
                "title" : "kanzitools",
                "desc" : "Kit of utilities for interacting with various aspects of Apple's own hardware debugger - KanziSWD (and its' derivatives)",
                "link" : "https://github.com/NyanSatan/kanzitools"
            },
            {
                "title" : "checkm8_bootkit",
                "desc" : "Little tool that implements protocol of the original ipwndfu checkm8 shellcode. Apart from firmware decryption and demotion, it allows you to boot arbitrary 2nd-stage iBoot without any changes to the original exploit",
                "link" : "https://github.com/NyanSatan/checkm8_bootkit"
            }
        ]
    },

    "articles" : {
        "template" : "templates/article.html",
        "desc" : "Various write-ups & tutorials - I mostly cover low level iOS-related things",
        "posts" : [
            {
                "title" : "iOS dualboot guide",
                "date" : "5.5.17",
                "desc" : "(Almost) complete dualboot guide for 32-bit iOS devices",
                "picture" : "resources/articles/dualboot.jpg",
                "link" : "dualboot",
                "pinned" : true
            },
            {
                "title" : "Apple Lightning (cont.) - serial number reading",
                "date" : "29.10.20",
                "desc" : "(Almost) everything I know about how Kanzi/SNR cables read serial numbers from dead devices",
                "picture" : "lightning-snr/resources/cover.jpg",
                "link" : "lightning-snr"
            },
            {
                "title" : "Apple Lightning",
                "date" : "1.7.20",
                "desc" : "(Almost) everything I know about Tristar, HiFive, SDQ, IDBUS and etc.",
                "picture" : "lightning/resources/cover.jpg",
                "link" : "lightning"
            },
            {
                "title" : "Accessing Power NVRAM using iBoot",
                "date" : "30.8.19",
                "desc" : "Learn how to access Power NVRAM to get debug UART on any iBoot",
                "picture" : "resources/articles/new-output.png",
                "link" : "power-nvram"
            },
            {
                "title" : "Booting diags from iBoot recovery shell",
                "date" : "19.4.19",
                "desc" : "Simple method to boot diags image from iBoot shell on newer armv7 devices",
                "picture" : "resources/articles/diags.jpg",
                "link" : "boot-diags"
            },
            {
                "title" : "Exploiting the iOS 5 iBoot bug",
                "date" : "5.11.18",
                "desc" : "My first ever exploit write-up. Learn how to exploit HFS+ bug to get untethered code execution",
                "picture" : "resources/articles/hello-darkness.png",
                "link" : "exploiting-ios-5-iboot"
            },
            {
                "title" : "Building iBoot",
                "date" : "14.7.18",
                "desc" : "Dramaful guide for building iBoot from stolen iOS 9 iBoot source code",
                "picture" : "resources/articles/dev-iboot.png",
                "link" : "building-iboot"
            },
            {
                "title" : "iOS restore in verbose mode",
                "date" : "2.3.18",
                "desc" : "Booting Restore OS in verbose mode for fun and profit",
                "picture" : "resources/articles/verbose-restore.jpg",
                "link" : "verbose-restore"
            },
            {
                "title" : "Enabling debug-uarts on DFU-like iBoot",
                "date" : "18.1.18",
                "desc" : "Enabling additional debug UART output using special patch",
                "picture" : "resources/articles/dfu-uart.png",
                "link" : "dfu-uart"
            },
            {
                "title" : "Dealing with data protection on iOS 9 + 6 dual boots",
                "date" : "9.3.17",
                "desc" : "Technique to overcome the issue when protected volumes created on iOS 9+ do not mount on older OSes",
                "picture" : "resources/articles/dataprotection.jpg",
                "link" : "dataprotection"
            }
        ]
    },

    "threads" : {
        "template" : "templates/thread.html",
        "desc" : "Twitter threads - I write them if the information is too little to have its' own article",
        "posts" : [
            {
                "title" : "T6020 SecureROM dump analysis",
                "date" : "1.11.23",
                "text" : "Here is my tiny thread about something exciting that I’ve been sitting on for a quite some time now:<br><br>Early T6020 SecureROM dump!<br><br>This thread contains some details that I noticed in those 15 minutes I bothered to analyze it (so read on your own risk!)",
                "picture" : "resources/tweets/t6020.jpeg",
                "link" : "https://twitter.com/nyan_satan/status/1719744117670875601"
            },
            {
                "title" : "(Real bad) ruminations about KIS",
                "date" : "2.7.22",
                "text" : "Here is my little thread of real bad ruminations about KIS - Kanzi In System - a debug probe embedded right into a device since A14<br><br>Seriously, read it with great caution, and don’t blindly trust it at all costs!",
                "picture" : "resources/tweets/kis.jpeg",
                "link" : "https://twitter.com/nyan_satan/status/1543156112165376000"
            },
            {
                "title" : "Tatsu Auth Debug sniffings",
                "date" : "15.6.21",
                "text" : "Here is another little thread of mine about Tatsu Auth Debug - this time we’ll sniff whatever happens between Astris and the Apple’s server<br><br>As always read on your own risk!",
                "picture" : "resources/tweets/debug_auth_p2.jpeg",
                "link" : "https://twitter.com/nyan_satan/status/1404839374202753028"
            },
            {
                "title" : "(Bad) ruminations about debug auth",
                "date" : "9.6.21",
                "text" : "As promised, here’s my little thread with (bad) ruminations of mine about Tatsu Auth Debug and KIS or Why Those Keys & Dumps Are So Valuable<br><br>Important: I have never touched any of the devices mentioned below myself. So I can only interpret the data their actual owners sent me…",
                "picture" : "resources/tweets/debug_auth_p1.jpeg",
                "link" : "https://twitter.com/nyan_satan/status/1402707693245247489"
            },
            {
                "title" : "H2FMI bug in A6 SecureROM",
                "date" : "29.5.21",
                "text" : "Here is my little thread about yet another bug I found in A6 bootrom (and probably any other that boots from H2FMI PPN NAND)<br><br>As always, absolutely useless on its own",
                "picture" : "resources/tweets/h2fmi.jpeg",
                "link" : "https://twitter.com/nyan_satan/status/1398708563430805511"
            },
            {
                "title" : "KongSWD 1st-gen repair",
                "date" : "5.7.20",
                "text" : "As promised, here’s my little thread about my experience of repairing 1st-gen KongSWD (all-white)",
                "picture" : "resources/tweets/kong_1g.jpeg",
                "link" : "https://twitter.com/nyan_satan/status/1279789064930148352"
            },
            {
                "title" : "Image3 bugs",
                "date" : "5.2.20",
                "text" : "Here is my little thread about bugs I’ve found in Image3 parsers of various SecureROMs (well, A4 and A6)<br><br>None of them are exploitable, but all of them can cause a crash and/or denial-of-service<br><br>Why am I posting this? Just for lulz and from hopelessness",
                "picture" : "resources/tweets/image3.jpeg",
                "link" : "https://twitter.com/nyan_satan/status/1225106425531322370"
            },
            {
                "title" : "Power NVRAM",
                "date" : "17.8.19",
                "text" : "Here is my little thread about Power NVRAM — another persistent key-value storage, located right on PMU chip. Only talking about iBoot context",
                "picture" : "resources/tweets/powernvram.jpeg",
                "link" : "https://twitter.com/nyan_satan/status/1162631189938745345"
            },
            {
                "title" : "Haywire",
                "date" : "27.7.19",
                "text" : "Here is my little thread about Lightning video adapters – also known as Haywire – which are actually computers that feature Apple Secure Boot and run Darwin kernel",
                "picture" : "resources/tweets/haywire.jpeg",
                "link" : "https://twitter.com/nyan_satan/status/1155148789977636864"
            },
            {
                "title" : "SWD on iOS devices",
                "date" : "31.1.19",
                "text" : "I was planning to keep this knowledge private, but damn it. This is a thread about Apple SWD cables, some things they can do and how to use them",
                "picture" : "resources/tweets/swd.jpeg",
                "link" : "https://twitter.com/nyan_satan/status/1090989650280398849"
            }
        ]
    },

    "links" : {
        "template" : "templates/link.html",
        "posts" : [
            {
                "name" : "nyan_satan",
                "link" : "https://twitter.com/nyan_satan",
                "icon" : "resources/ui/twitter_logo.png",
                "desc" : "My primary blog. I only post when I have something to say or show, mostly about tech",
                "atprefix" : true
            },
            {
                "name" : "nyan_satan@infosec.exchange",
                "link" : "https://infosec.exchange/@nyan_satan",
                "icon" : "resources/ui/mastodon_logo.svg",
                "desc" : "Since some people moved away from Twitter, I also cross-post to Mastodon",
                "atprefix" : true
            },
            {
                "name" : "NyanSatan",
                "link" : "https://github.com/NyanSatan",
                "icon" : "resources/ui/github_logo.png",
                "desc" : "Open source projects of mine. There is no license not in a single repository, but since it wouldn't stop anyone anyway, WTFPL is assumed. However, I'd appreciate a credit if you use my code in a public project of yours"
            },
            {
                "name" : "nyansatan@icloud.com",
                "link" : "mailto:nyansatan@icloud.com",
                "icon" : "resources/ui/mail_logo.png",
                "desc" : "Public e-mail address - feel free to contact me if you have any questions!"
            }
        ]
    }
};
