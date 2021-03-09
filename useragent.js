"user strict";
// ------------------------------------------
// detection of the user agent
// tricks method
// ------------------------------------------
let userAgent = {
    "isOpera" : function() {
        // Opera 8.0+
        return (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0
    },
    "isFirefox" : function() {
        // Firefox 1.0+
        return typeof InstallTrigger !== 'undefined'
    },
    "isSafari" : function safari() {
        // safari 3+
        return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    },
    "isIE" : function() {
        // IE 6-11
        return /*@cc_on!@*/false || !!document.documentMode;
    },
    "isEdge" : function() {
        //edge 20+
        return !ie() && !!window.StyleMedia;
    },
    "isChrome": function() {
        // chrome 1+
        return !!window.chrome && !!window.chrome.webstore;
    },
    "isBlink": function() {
        // blink engine
        return ( chrome() || opera() ) && !!window.CSS;
    }
};
