"use strict";

// ------------------------------------------
// management of special characters and HTML integers in a string of characters
// php friendly
// ------------------------------------------
function htmlspecialchars(str) {
    if (typeof(str) === "string") {
        // to do first
        str = str.replace(/&/g, "&amp;");

        str = str.replace(/"/g, "&quot;");
        str = str.replace(/'/g, "&#039;");
        str = str.replace(/</g, "&lt;");
        str = str.replace(/>/g, "&gt;");
    }
    return str;
}

function htmlspecialchars_decode(str) {
    if (typeof(str) === "string") {
        str = str.replace(/&gt;/ig, ">");
        str = str.replace(/&lt;/ig, "<");
        str = str.replace(/&#039;/g, "'");
        str = str.replace(/&quot;/ig, '"');

        // to do last
        str = str.replace(/&amp;/ig, '&');
    }

    return str;
}
