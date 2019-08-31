function setCSS() {
	var iOSVersion = getiOS();
    
    var css;
    
    if (iOSVersion < 7) {
        css = 'css/skeuomorphic.css';
    } else {
        css = 'css/minimalistic.css';
    }
    
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = css;
    head.appendChild(link);
    
}

function getiOS() {
	var userAgent = navigator.userAgent
    var OS = 'OS';
    
	if (!userAgent.match('iPhone') && !userAgent.match('iPod') && !userAgent.match('iPad')) {
		return 'unknown';
	}

    var versionOffset = userAgent.indexOf(OS) + OS.length + 1;
    var underscoreOffset = userAgent.indexOf('_', versionOffset);
    
    return parseInt(userAgent.substring(versionOffset, underscoreOffset));
}