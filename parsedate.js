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
