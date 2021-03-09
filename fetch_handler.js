"use strict";
// ------------------------------------------
// helper for fetch queries 
//
// init             <object|string>     JSON entity type
//
// consumeXXX       <object>            use date with XX format, XXX = [ ArrayBuffer, Blob, formData, JSON, Text ]
//                                      example:
//                                      fetch(...)
//                                        .then(request.consumeXXX)
//                                        .then(...)
//
// error            formatage des donnÃ©es du catch, utiliser selon
//                      .catch(function(response) {
//                          request.error(response);
//                          // ...
//                      }
// example width JSON data:
// let parameter = {
//   'param': value
// };
// fetch()
//   .init(parameter)
//   .then(request.consumeJSON)
//   .then(function success();)
//   .catch(function error();)
//   .finally(function finally();)
// ------------------------------------------
let fetch_handler = {
    "init" : function(body, contentType, method, mode, credential, redirect, cache) {
        // ------------------------------------------
        // formating datas
        // ------------------------------------------
        // body and contentType
        contentType = (contentType || "json").toLowerCase();
        let contentTypes = ["formdata", "json", "text"];
        if ( contentTypes.indexOf(contentType) === -1 ) {
            console.error('fetch_handler :\n"'+contentType+'" value is incorrect');
            return false;
        }
        else {
            switch (contentType) {
                case "formdata":
                    if ( typeof body !== "object") {
                        console.error('fetch_handler :\n"'+body+'" is not a correctly formated formData object');
                        return false;
                    }
                    // no modification of body
                    break;

                case "json":
                    // body must be a string as JSON formatted
                    switch (typeof body) {
                        case "null":
                        case "undefined":
                            body = "null"; // string
                            break;

                        case "object":
                            try {
                                body = JSON.stringify(body);
                            }
                            catch (e) {
                                console.error('fetch_handler :\n"'+body+'" is not a correctly formated object');
                                return false;
                            }
                            break;

                        case "string":
                            try {
                                JSON.parse(body);
                            }
                            catch (e) {
                                console.error('fetch_handler :\n"'+body+'" is not a correctly formated string');
                                console.error(e);
                                return false;
                            }

                            break;
                    }
                    break;

                case "text":
                    switch (typeof body) {
                        case "null":
                        case "undefined":
                            body = "";
                            break;

                        case "string":
                            // void
                            break;
                    }
                    break;
            }
        }

        // method
        method = (method || "POST").toUpperCase();
        let methods = ["GET", "POST", "PUT", "DELETE", "HEAD"];
        if ( methods.indexOf(method) === -1 ) {
            console.error('fetch_handler :\n"'+method+'" value is incorrect');
            return false;
        }

        // mode
        mode = (mode || "same-origin").toLowerCase();
        let modes = ["cors", "no-cors", "same-origin"];
        if ( modes.indexOf(mode) === -1 ) {
            console.error('fetch_handler :\n"'+mode+'" value is incorrect');
            return false;
        }

        // credentials
        credential = (credential || "same-origin").toLowerCase();
        let credentials = ["omit", "same-origin", "include"];
        if ( credentials.indexOf(credential) === -1 ) {
            console.error('fetch_handler :\n"'+credential+'" value is incorrect');
            return false;
        }

        // redirect
        redirect = (redirect || "follow").toLowerCase();
        let redirects = ["follow", "error", "manual"];
        if ( redirects.indexOf(redirect) === -1 ) {
            console.error('fetch_handler :\n"'+redirect+'" value is incorrect');
            return false;
        }

        // credentials
        cache = (cache || "no-store").toLowerCase();
        let caches = ["default", "no-store", "reload", "no-cache", "force-cache", "only-if-cached"];
        if ( caches.indexOf(cache) === -1 ) {
            console.error('fetch_handler :\n"'+cache+'" value is incorrect');
            return false;
        }

        // ------------------------------------------
        // request
        // ------------------------------------------
        let option = {
            method: method, // GET, POST, PUT, DELETE, HEAD
            mode: mode, // cors, no-cors, same-origin
            credentials: credential, // omit, same-origin, include
            redirect: redirect, // follow, error, manual
            cache: cache // default, no-store, reload, no-cache, force-cache, only-if-cached
        };

        // headers
        let headers = new Headers();
        switch(contentType ) {
            case "formdata":
                // the header must genereted automaticaly
                // in "multipart/form-data; boundary=[...]"
                break;

            case "json":
                headers.append("content-Type", "application/json");
                break;

            case "text":
                headers.append("content-Type", "text/plain");
                break;
        }

        // protection for CSRF and CORS attack
        if ( mode === "cors") headers.append("X-Requested-With", "XMLHttpRequest");

        option.headers = headers;

        switch(method ) {
            case "GET":
            case "HEADER":
                // GET et HEADER musnt have the body property
                if ( body !== "null") console.error('fetch_handler :\n"'+method+'" request cannot have a "body", datas has been ignored.');
                break;

            case "POST":
            case "PUT":
            case "DELETE":
                option.body = body;
                break;
        }
        return option;
    },
    "consumeArrayBuffer" : function(response) {
        // consume only valid request
        if (response.ok) return response.arrayBuffer();
        throw new Error(response.status + "-" + response.statusText);
    },
    "consumeBlob" : function(response) {
        // consume only valid request
        if (response.ok) return response.blob();
        throw new Error(response.status + "-" + response.statusText);
    },
    "consumeFormData" : function(response) {
        // consume only valid request
        if (response.ok) return response.formData();
        throw new Error(response.status + "-" + response.statusText);
    },
    "consumeJSON" : function(response) {
        // consume only valid request
        if (response.ok) return response.json();
        throw new Error(response.status + "-" + response.statusText);
    },
    "consumeText" : function(response) {
        // on ne 'consomme' que les requÃªtes entiÃ¨rement executÃ©es et valides
        if (response.ok) return response.text();
        throw new Error(response.status + "-" + response.statusText);

    },
    "error" : function(response, label) {
        let str = [];
        if ( typeof label === "string" ) str.push(label);
        str.push(response);

        str = str.join("\n");
        console.error('fetch_handler :\n '+response);
        if (str.length > 0 ) alert(str);
    }

};
