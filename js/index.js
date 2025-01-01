var templates = new Object();

function fillTab(tab, tabContents) {
    tabContents.innerHTML = Mustache.render(templates[tab.map_id], map[tab.map_id]);
    tab.inited = 1;
}

function tabHandler(event) {
    var requestedTab = event.srcElement;
    var activeTab = document.getElementById("tabs").getElementsByClassName("tab-active")[0];

    if (requestedTab == activeTab) 
        return;

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
    if (xhr.readyState != 4) return;

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

function main() {
    // var prerendered = document.querySelectorAll(`[prerendered*="1"]`);

    // for (const tab of prerendered) {
    // 	tab.inited = 1;
    // 	tab.onclick = tabHandler;
    // }

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
