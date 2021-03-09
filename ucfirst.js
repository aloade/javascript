"use strict";

// ------------------------------------------
// return a string with the first upper case character
//
// parameters :
// string           <string>    string of characters
// [trim]           <boolean>   true - puts the first letter in uppercase and the others in lowercase
//                              false (default) - change only the first letter
// ------------------------------------------
function ucfirst(string, trim = false) {
    if ( typeof string !== "string" ) return string;
    return string.charAt(0).toUpperCase() + ( trim ? string.slice(1).toLowerCase() : string.slice(1) ) ;
}
