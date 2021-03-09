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
