function iOS() {
    if (!!navigator.platform.match(/iPhone|iPod/)) {
        return true;
    }

    /* this is a fucking iPad! */
    if (navigator.platform.indexOf("Mac") !== -1 && navigator.maxTouchPoints > 1) {
        return true;
    }

    return false;
}

function iOS26() {
    return navigator.userAgent.indexOf("Version/26.") !== -1;
}

var colors = [
    "#47234d",
    "#001f3f",
    "#91043c"
];

function setBackground() {
    var timestamp = Math.floor(Date.now() / 1000);
    var color = colors[timestamp % colors.length];

    var gradient = "radial-gradient(circle at bottom, " + color + ", black)";
    var bodyElement = document.body;

    if (!iOS()) {
        bodyElement.style["background"] = gradient;
        bodyElement.style["background-attachment"] = "fixed";
    } else {
        var bgElement = document.createElement("div");
        bgElement.className = "fixed-bg";
        bgElement.style.background = gradient;

        /* I HATE THE ANTICHRIST!!! */
        if (iOS26()) {
            var fullHeight = window.screen.height;

            bgElement.style.position = "absolute";
            bgElement.style.height = fullHeight + 12;

            mainElement = document.querySelector("#main");

            bodyElement.onscroll = function () {
                bgElement.style.top = Math.min(bodyElement.scrollTop, mainElement.offsetHeight - fullHeight);
            }
        } else {
            bgElement.style.position = "fixed";
            bgElement.style.height = "100%";
        }

        bodyElement.prepend(bgElement);
    }
}
