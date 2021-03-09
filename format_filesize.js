"use strict";

// ------------------------------------------
// returns a size in bytes in a readable format
//
// parameters:
// bit              <int>       size en bits
// decymals         <int>       number after the unit delimiter
// format           <string>    unit ( bit / byte / octet )
// ------------------------------------------
function format_filesize(bit, decimals, format, locale) {
    format = format || "bit";
    decimals = parseInt(decimals) || 1;
    locale = locale || "en-US";

    let units = {
        "bit": {
            "kilo" : 1000,
            "factor" : 1,
            "unit" : "b"
        },
        "byte": {
            "kilo": 1024,
            "factor" : 8,
            "unit": "B"
        },
        "octet": {
            "kilo": 1024,
            "factor" : 8,
            "unit": "o"
        }
    };
    if( typeof units[format] === "undefined" ) return bit;

    bit /= units[format].factor;
    let i = -1;
    let unit_power;
    switch( format) {
        case "byte":
        case "octet":
            unit_power = ['ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi', 'Yi'];
            break;

        case "bit":
            unit_power = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
            break;
    }

    do {
        bit = bit / units[format].kilo;
        i++;
    } while (bit > units[format].kilo && i < 7);

    return Number(Math.max(bit, Math.pow(10, -decimals) ).toFixed(decimals)).toLocaleString() + " " + unit_power[i]+units[format].unit;
}
