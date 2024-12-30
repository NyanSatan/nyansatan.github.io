var map =
{
    "articles" : {
        "template" : "templates/article.html",
        "posts" : [
            {
                "title" : "iOS dualboot guide",
                "date" : "5.5.17",
                "desc" : "(Almost) complete dualboot guide for 32-bit iOS devices",
                "picture" : "resources/dualboot.jpg",
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
                "picture" : "resources/new-output.png",
                "link" : "power-nvram"
            },
            {
                "title" : "Booting diags from iBoot recovery shell",
                "date" : "19.4.19",
                "desc" : "Simple method to boot diags image from iBoot shell on newer armv7 devices",
                "picture" : "resources/diags.jpg",
                "link" : "boot-diags"
            },
            {
                "title" : "Exploiting the iOS 5 iBoot bug",
                "date" : "5.11.18",
                "desc" : "My first ever exploit write-up. Learn how to exploit HFS+ bug to get untethered code execution",
                "picture" : "resources/hello-darkness.png",
                "link" : "exploiting-ios-5-iboot"
            },
            {
                "title" : "Building iBoot",
                "date" : "14.7.18",
                "desc" : "Dramaful guide for building iBoot from stolen iOS 9 iBoot source code",
                "picture" : "resources/dev-iboot.png",
                "link" : "building-iboot"
            },
            {
                "title" : "iOS restore in verbose mode",
                "date" : "2.3.18",
                "desc" : "Booting Restore OS in verbose mode for fun and profit",
                "picture" : "resources/verbose-restore.jpg",
                "link" : "verbose-restore"
            },
            {
                "title" : "Enabling debug-uarts on DFU-like iBoot",
                "date" : "18.1.18",
                "desc" : "Enabling additional debug UART output using special patch",
                "picture" : "resources/dfu-uart.png",
                "link" : "dfu-uart"
            },
            {
                "title" : "Dealing with data protection on iOS 9 + 6 dual boots",
                "date" : "9.3.17",
                "desc" : "Technique to overcome the issue when protected volumes created on iOS 9+ do not mount on older OSes",
                "picture" : "resources/dataprotection.jpg",
                "link" : "dataprotection"
            }
        ]
    },

    "projects" : {
        "template" : "templates/project.html",
        "posts" : [

        ]
    },

    "threads" : {
        "template" : "templates/thread.html",
        "posts" : [

        ]
    }
};
