"use strict";
// ------------------------------------------
// returns the simplified type according to the MIME type
// http://www.iana.org/assignments/media-types/media-types.xhtml
// ------------------------------------------
function mime_type_simple(mime_type) {
    if ( typeof mime_type !== "string" ) return "unknown";
    mime_type = mime_type.split("/");

    switch( mime_type[0]) {
        // media
        case "audio":
        case "image":
        case "text":
        case "video":
            return mime_type[0];

        // archive
        case "multipart":                   // .gzip, .ustar, .zip
            return "archive";

        // specifc apps
        case "chemical":                    // .pdb, .xyz
        case "drawing":                     // .dwf
        case "i-world":                     // .ivr
        case "font":                        // .otf, .ttf, .woff, .woff2
        case "message":                     // .mht, .mhtml, .mime
        case "model":                       // .dwf, .iges, .igs, .pov, .vrml, .wrl, .wrz
        case "paleovu":                     // .pvu
        case "music":                       // .kar, .mid, .midi
        case "x-music":                     // .mid, .midi
        case "x-world":                     // .3dm, .3dmf, .qd3, .qd3d, .svr, .vrml, .vrt, .wrl, .wrz
        case "windows":                     // .wmf
        case "www":                         // .mime
            return "application";

        // apps
        case "application":
            switch(mime_type[1]) {
                // archive
                case "gnutar":              // .tgz
                case "x-compress":          // .z
                case "x-compressed":        // .z, .zip, .tgz
                case "rar":                 // .rar
                case "x-7z-compressed":     // .7z
                case "x-bzip2":             // .bz2
                case "x-gzip":              // .gz, .gzip
                case "x-tar":               // .tar
                case "x-xz":                // .xz
                case "x-zip-compressed":    // .zip
                case "zip":                 // .zip
                    return "archive";

                // text or similar
                case "hlp":                 // .hlp
                case "x-helpfile":          // .hlp
                case "javascript":          // .js
                case "ecmascript":          // .js
                case "x-javascript":        // .js
                case "json":                // .json
                case "plain":               // .text
                case "postscript":          // .ps
                case "x-bsh":               // .sh, .shar
                case "x-sh":                // .sh
                case "x-shar":              // .sh, .shar
                case "xml":                 // .xml
                case "x-bytecode.python":   // .pyc
                case "x-csh": // .csh
                    return "text";

                // Adobe PDF
                case "pdf":                 // .pdf
                case "x-pdf":               // .pdf
                case "x-bzpdf":             // .pdf
                case "x-gzpdf":             // .pdf
                    return "pdf";

                // Microsoft files
                case "msaccess.addin":      // .accda
                case "msaccess.cab":        // .accdc
                case "msaccess.runtime":    // .accdr
                case "msaccess.webapplication": // .accdw
                case "msaccess.ftemplate":  // .accft
                case "vnd.ms-access":       // .accda, .accdb, .accdc, .accde, .accdr, .accdt, .acdw, .accft
                    return "access";

                case "vnd.ms-excel":        // xls, xlt, xla
                case "vnd.openxmlformats-officedocument.spreadsheetml.sheet": // xlsx
                case "vnd.openxmlformats-officedocument.spreadsheetml.template": // xltx
                case "vnd.ms-excel.sheet.macroEnabled.12": // xlsm
                case "vnd.ms-excel.template.macroEnabled.12": // xltm
                case "vnd.ms-excel.addin.macroEnabled.12": // xlam
                case "vnd.ms-excel.sheet.binary.macroEnabled.12": // xlsb
                    return "excel";

                case "vns.ms-outlook":      // .msg
                case "CDFV2-corrupt":       // .msg
                    return "outlook";

                case "vnd.ms-powerpoint":   // ppt, pot, pps, ppa
                case "vnd.openxmlformats-officedocument.presentationml.presentation": // pptx
                case "vnd.openxmlformats-officedocument.presentationml.template": // potx
                case "vnd.openxmlformats-officedocument.presentationml.slideshow": // ppsw
                case "vnd.ms-powerpoint.addin.macroEnabled.12": // ppam
                case "vnd.ms-powerpoint.presentation.macroEnabled.12": // pptm
                case "vnd.ms-powerpoint.template.macroEnabled.12": // potm
                case "vnd.ms-powerpoint.slideshow.macroEnabled.12": // ppsm
                    return "powerpoint";

                case "msword":              // doc, dot
                case "vnd.openxmlformats-officedocument.wordprocessingml.document": // docx
                case "vnd.openxmlformats-officedocument.wordprocessingml.template": // dotx
                case "vnd.ms-word.document.macroEnabled.12": // docm
                case "vnd.ms-word.template.macroEnabled.12": // dotm
                    return "word";

                // video
                case "ogg":                 // .ogg
                    return "video";

                // flash
                case "x-shockwave-flash":   // .swf, .fla
                    return "flash";

                default:
                    return "application";
            }

        default:
            return mime_type[0];
    }
}
