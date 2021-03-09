"use strict";
// ------------------------------------------
// anti flood
//
// delays the execution of an input and executes it only once for a given period of time.
// note on the default delay of 150ms: a pro typist types an average of 350 characters per minute or ~170ms per character.
//
// parameters :
// node             <DOM node>      input's node in DOM
// event
// callback         <function>      function to call
// delay            <int>           delay between each call of the callback ( in msec, 150 ms min )
//
// usage :
// iniatilizing :
// let lazy = new LazyInput_class();
//
// for each input :
// lazy.init(<node>, <event>, <callback>, <delay>));
//
// stop all:
// lazy.stop();
// ------------------------------------------
function LazyInput_class() {
    this.init = init;
    this.stop = stop;

    let parameter = {};
    const delay_min = 150;
    let timer = null;

    // ------------------------------------------
    // handler
    function handler_event() {
        parameter.pending = this.value;
        if ( parameter.timer_id === -1) {
            parameter.timer_id = setInterval(tick, parameter.delay);
        }
    }

    // main
    function init(node, event_type, callback, delay = 150 ) {
        switch(event_type) {
            case "blur":
            case "change":
            case "focus":
            case "input":
            case "keydown":
            case "keyupress":
            case "keyup":
            case "select":
            case "submit":
            case "reset":

            case "mouseover":
            case "mouseout":
            case "mousedown":
            case "mousemove":

            case "click":
            case "dblclick":
                // void
                break;

            default:
                console.error('LazyInput_class() :\nunknown "'+event_type+'" event type');
                return;
        }
        if (! (callback instanceof Function ) ) {
            console.error('LazyInput_class() :\nthe "callback" parameter is not a function');
            return;
        }

        if ( delay < delay_min ) delay = delay_min;

        parameter = {
            "node": node,
            "event_type": event_type,
            "callback": callback,
            "delay": delay,
            "pending": "",
            "timer_id": -1 // -1 - idle // <number> - running
        };

        node.addEventListener(event_type, handler_event, false);
    }

    function tick() {
        if ( parameter.pending === "" ) {
            clearInterval(parameter.timer_id);
            parameter.timer_id = -1;
            return;
        }
        process();
    }

    function process() {
        parameter.callback(parameter.node, parameter.pending);
        parameter.pending = "";
    }

    function stop() {
        if ( parameter.timer_id !== -1 ) clearInterval(parameter.timer_id);
        parameter.node.removeEventListener(parameter.event_type, handler_event, false);
        parameter = {};
    }
}
