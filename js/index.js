var templates = new Object();

function fillTab(tab, tabContents) {
    tabContents.innerHTML = Mustache.render(templates[tab.map_id], map[tab.map_id]);
    tab.inited = 1;
}

function tabHandler(event) {
    var requestedTab = event.srcElement;
    var activeTab = document.getElementById("tabs").getElementsByClassName("tab-active")[0];

    if (requestedTab == activeTab) {
        return;
    }

    if (activeTab) {
        activeTab.classList.remove("tab-active");
        document.getElementById(activeTab.id + "-contents").hidden = true;
    }

    requestedTab.classList.add("tab-active");

    var requestedTabContents = document.getElementById(requestedTab.id + "-contents");
    requestedTabContents.hidden = false;

    if (!requestedTab.inited) {
        fillTab(requestedTab, requestedTabContents);
    }
}

function templateCallback(xhr, tab) {
    if (xhr.readyState != 4) { 
        return;
    }

    if (xhr.status == 200) {
        templates[tab.map_id] = xhr.responseText;

        tab.onclick = tabHandler;

        if (tab.getAttribute("primary")) {
            tabHandler({srcElement : tab});
        }
    } else {
        alert("Wow, this is unexpected, but we really couldn't load " + key + " template!");
    }
}

function iOS() {
    return !!navigator.platform.match(/iPhone|iPod|iPad/);
}

var colors = [
    "#47234d",
    "#001f3f",
    "#06402b",
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
        bgElement.style["background"] = gradient;
        bodyElement.prepend(bgElement);
    }
}

function main() {
    setBackground();

    for (var key in map) {
        var element = map[key];
        var tab = document.getElementById(key + "-tab");
        tab.map_id = key;

        var xhr = new XMLHttpRequest();

        xhr.open("GET", element["template"], true);
        xhr.onreadystatechange = templateCallback.bind(null, xhr, tab);
        xhr.send();
    }
}
