"use strict";
// ------------------------------------------
// return a formatted date for an input date
//
// parameters:
// timsetamp        <int>       date in sec (UNIX format)
// ------------------------------------------
function parseDate(timestamp) {
    timestamp = timestamp || Math.floor( new Date().getTime() / 1000);
    let time = new Date( ( timestamp ) * 1000);
    let year =  time.getUTCFullYear();
    let month = time.getUTCMonth()+1;
    let day = time.getUTCDate();

    if ( month < 10 ) month = "0"+month;
    if ( day < 10 ) day = "0"+day;

    return year+"-"+month+"-"+day;
}

// ------------------------------------------
// return a formatted hour for an input date
//
// parameters :
// timsetamp        <int>        date in sec (UNIX format)
// [withSeconds]    <boolean>    include seconds? ( false per default )
// ------------------------------------------
function parseHour(timestamp, withSeconds = false) {
    timestamp = timestamp || Math.floor( new Date().getTime() / 1000);
    let time = new Date( ( timestamp ) * 1000);
    let hour = time.getUTCHours();
    if ( hour < 10 ) hour = "0"+hour;

    let min = time.getUTCMinutes();
    if ( min < 10 ) min = "0"+min;

    if ( withSeconds ) {
        let sec = time.getUTCSeconds();
        if ( sec < 10 ) sec = "0"+sec;
        return hour+":"+min+":"+sec;
    }
    return hour+":"+min;
}

// ------------------------------------------
// Format a date in french
// php friendly
//
// parameter :
// date             <int>       date in sec (UNIX format)
// mask             <str>       mask ( see doc php.net )
// [gmt]            <boolean>   GMT date ? (false per default)
// ------------------------------------------
function stfrtimeFormat(date, mask, gmt = false) {
    date = date ? new Date(date) : new Date;
    if (isNaN(date)) return false;

    mask = String(mask);

    let token = /(%A)|(%a)|(%D)|(%d)|(%e)|(%j)|(%u)|(%w)|(%U)|(%V)|(%W)|(%b)|(%h)|(%B)|(%m)|(%C)|(%g)|(%G)|(%y)|(%Y)|(%H)|(%k)|(%I)|(%l)|(%M)|(%p)|(%P)|(%r)|(%R)|(%S)|(%T)|(%X)|(%z)|(%Z)|(%c)|(%F)|(%s)|(%x)/g;
    let timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
    let timezoneClip = /[^-+\dA-Z]/g;

    let day_label = [
        "dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam.",
        "dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"
    ];
    let month_label = [
        "jan.", "fÃ©vr.", "mars", "avril", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "dec.",
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    let get = gmt ? "get" : "getUTC";
    let d = date[ get + "Date"](),
        day = date[ get + "Day"](),
        month = date[ get + "Month"](),
        year = date[ get + "FullYear"](),
        hour = date[ get + "Hours"](),
        min = date[ get + "Minutes"](),
        sec = date[ get + "Seconds"](),
        offset = gmt ? 0 : date.getTimezoneOffset();

    let flags = {
        '%a': day_label[day], // day of the week (short)
        '%A': day_label[day + 7], // day of the week
        '%d': pad(d), // day in two digits
        '%e': d, // day
        '%j': '', // day of the year in third digits
        '%u': day, // day of the week (0 to 6, 0 for sunday)
        '%w': (day === 0 ? 7 : day+1), // day of the week with ISO-8601 norm (1 to 7, 1 for monday)
        '%U': '', // number of the week (1 = first complet week)
        '%V': '', // day of the week with ISO-8601 norm (0 to 6, 10for monday)
        '%W': '', // number of the week (1 = first monday)
        '%b': month_label[month], // month (short)
        '%h': month_label[month], // month (short)
        '%B': month_label[month + 12], // month
        '%m': pad(month + 1), // number of the month (in two digits)
        '%C': parseInt(year*100), // century
        '%g': String(year).slice(2), // year in two digits
        '%y': String(year).slice(0, 2), // year in two digits
        '%Y': year, // year in four digits
        '%H': pad(hour), // 24h formatted hour in two digits
        '%k': hour, // 24 formatted hour
        '%I': pad(hour % 12 || 12), // 12h formatted hour in two digits
        '%l': hour % 12 || 12, // 12h formatted hour
        '%M': pad(min), // minuts in two digits
        '%p': hour < 12 ? "AM" : "PM", // upper case ante and post meridian
        '%P': hour < 12 ? "am" : "pm", // lower case ante and post meridian
        '%R': pad(hour)+":"+pad(min), // same as "%H:%M"
        '%S': pad(sec), // seconds in two digits
        '%T': pad(hour)+":"+pad(min)+":"+pad(sec), // same as "%H:%M:%S"
        '%X': '', // hour in local format
        '%z': (offset > 0 ? "-" : "+") + pad(Math.floor(Math.abs(offset) / 60) * 100 + Math.abs(offset) % 60, 4), // time difference with greenwich time ( ex : +0200 )
        '%Z': gmt ? (String(date).match(timezone) || [""]).pop().replace(timezoneClip, "") : "UTC", // time zone identifier
        '%c': '', // date and hour in local format
        '%D': pad(month + 1)+"/"+pad(d)+"/"+String(year).slice(0, 2), // same as "%m/%d/%y"
        '%F': String(year).slice(0, 2)+"-"+pad(month + 1)+"-"+pad(d), // same as  "%y-%m-%d"
        '%s': '', // second in UNIX format
        '%x': '' // date in local format
    };

    function pad(value, length) {
        value = String(value);
        length = length || 2;
        while (value.length < length) value = "0" + value;
        return value;
    }

    return mask.replace(token, function (flag) {
        return flag in flags ? flags[flag] : flag.slice(1, flag.length - 1);
    });
}
