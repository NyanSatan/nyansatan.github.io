function fillTab(tab, tabContents) {

	if (!parsed) {
		tabContents.innerHTML = "Error loading tab";
		return;
	}

	if (tab.id == "articles-tab") {
		var template = "templates/article.html";
	} else if (tab.id == "threads-tab") {
		var template = "templates/thread.html";
		var twttrWidgetLoad = true;
	} else {
		tabContents.innerHTML = "Undefined tab";
		return;
	}

	var xhr = new XMLHttpRequest();

	xhr.open("GET", template, true);
	xhr.send();
	xhr.onreadystatechange = function() {

		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {
		    tabContents.innerHTML = "Error loading template";
		} else {

			var templateText = xhr.responseText;
			tabContents.innerHTML = Mustache.render(templateText, parsed);

			tab.inited = 1;

			if (twttrWidgetLoad)
				twttr.widgets.load();

		}

	}

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

var parsed = undefined;

function main() {

	var mainElement = document.getElementById("main");
	var errorElement = document.getElementById("error");
	var footerElement = document.getElementsByTagName("footer")[0];

	var xhr = new XMLHttpRequest();

	xhr.open("GET", "resources/index.json", true);
	xhr.send();
	xhr.onreadystatechange = function() {

		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {
		    errorElement.hidden = false;
		} else {

			try {
				parsed = JSON.parse(xhr.responseText);
			} catch (error) {
				errorElement.hidden = false;
				return;
			}

			var photoElement = document.getElementById("photo");
			photoElement.src = parsed["photo"];

			var tabs = document.getElementById("tabs").getElementsByClassName("tab");

			for (var i = 0; i < tabs.length; i++) {
				tabs[i].onclick = tabHandler;
			}

			if (HTMLElement.click)
		    	document.getElementById("articles-tab").click();
		    else
		    	tabHandler({srcElement : document.getElementById("articles-tab")});

		    mainElement.hidden = false;
		    footerElement.hidden = false;

		}

		
	};

	return false;

}
