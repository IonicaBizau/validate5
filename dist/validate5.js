(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.validate5 = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const $ = require("elm-select")
    , emailRegex = require("regex-email")
    , iterateObj = require("iterate-object")
    , validify = require("validify")
    ;

const ATTR_ERROR = "data-validate5-error";

function validate5(forms) {
    $(forms, c => {
        validate5.inputs(c, input => {
            if (input.hasAttribute("required")) {
                input.setAttribute("data-validate5-required", "required");
            }
            let pattern = input.getAttribute("pattern")
            input.removeAttribute("required");
            input.removeAttribute("pattern");

            let pat = validate5.patterns[input.getAttribute("type")];
            if (pat && !pattern) {
                input.setAttribute("type", "text");
                pattern = pat[0];
                input.setAttribute("data-validate5-custom-error", pat[1]);
            }

            if (pattern) {
                input.setAttribute("data-validate5-pattern", pattern);
            }
        });
        c.addEventListener("submit", e => {
            if (validate5.showErrors(this)) {
                e.preventDefault();
            }
        });
    });
}

validate5.patterns = {
    email: [emailRegex.source, "Invalid email address."]
}

validate5.validateInput = function (input) {
    let value = input.value
      , pattern = input.getAttribute("data-validate5-pattern")
      , error = input.getAttribute("data-validate5-custom-error") || input.getAttribute("title")
      , required = input.getAttribute("data-validate5-required")
      ;

    if (pattern) {
        pattern = new RegExp(pattern);
    } else {
    }
    if (required && !pattern) {
        pattern = /.*\S.*/;
        error = error || "This input is required.";
    }

    if (!pattern) {
        return {};
    }

    return validify(value, pattern, error || "Invalid value.");
};

validate5.inputs = function (formElm, cb) {
    return $("input", cb, [], formElm);
}

validate5.validateForm = function (formElm) {
    let errs = [];
    validate5.inputs(formElm, c => {
        let res = validate5.validateInput(c);
        if (!res.error) { return; }
        errs.push({
            elm: c
          , err: res.error
        });
    });
    return errs;
};

validate5.showErrors = function (formElm) {
    let errs = validate5.validateForm(formElm);
    validate5.inputs(formElm, c => {
        c.parentNode.removeAttribute(ATTR_ERROR);
    });
    if (!errs.length) { return false; }
    iterateObj(errs, c => {
        c.elm.parentNode.setAttribute(ATTR_ERROR, c.err.message);
    });
    errs[0].elm.focus();
    return errs;
};

module.exports = validate5;

},{"elm-select":2,"iterate-object":4,"regex-email":5,"validify":6}],2:[function(require,module,exports){
// Dependencies
var Typpy = require("typpy");

/**
 * ElmSelect
 * Select DOM elements and optionally call a function.
 *
 * @name ElmSelect
 * @function
 * @param {String|Element|NodeList} elm A stringified query selector, an element or a node list.
 * @param {Function} fn If this function is provided, it will be called with the current element and additional arguments passed in `args`.
 * @param {Array} args An array of arguments used in the `fn` function call (default: `[]`).
 * @param {String|Element} parent The parent element where to search the elements (default: `document`). This makes sense only when a query selector is used.
 * @return {NodeList} A node list containing the selected elements.
 */
function ElmSelect(elm, fn, args, parent) {
    var i = 0
      , _args = null
      ;

    // Handle the query selectors
    if (typeof elm === "string") {
        if (parent) {
            parent = ElmSelect(parent)[0];
        } else {
            parent = document;
        }
        elm = parent.querySelectorAll(elm);
    }

    // Check if the input is a nodelist
    if (!Typpy(elm, NodeList) && !Typpy(elm, HTMLCollection)) {
        elm = [elm];
    }

    // Handle the function call
    if (typeof fn === "function") {
        if (!Array.isArray(args)) {
            args = [args];
        }
        for (; i < elm.length; ++i) {
            _args = [elm[i]].concat(args);
            fn.apply(this, _args);
        }
    }

    return elm;
}

module.exports = ElmSelect;

},{"typpy":3}],3:[function(require,module,exports){
/**
 * Typpy
 * Gets the type of the input value or compares it
 * with a provided type.
 *
 * Usage:
 *
 * ```js
 * Typpy({}) // => "object"
 * Typpy(42, Number); // => true
 * Typpy.get([], "array"); => true
 * ```
 *
 * @name Typpy
 * @function
 * @param {Anything} input The input value.
 * @param {Constructor|String} target The target type.
 * It could be a string (e.g. `"array"`) or a
 * constructor (e.g. `Array`).
 * @return {String|Boolean} It returns `true` if the
 * input has the provided type `target` (if was provided),
 * `false` if the input type does *not* have the provided type
 * `target` or the stringified type of the input (always lowercase).
 */
function Typpy(input, target) {
    if (arguments.length === 2) {
        return Typpy.is(input, target);
    }
    return Typpy.get(input, true);
}

/**
 * Typpy.is
 * Checks if the input value has a specified type.
 *
 * @name Typpy.is
 * @function
 * @param {Anything} input The input value.
 * @param {Constructor|String} target The target type.
 * It could be a string (e.g. `"array"`) or a
 * constructor (e.g. `Array`).
 * @return {Boolean} `true`, if the input has the same
 * type with the target or `false` otherwise.
 */
Typpy.is = function (input, target) {
    return Typpy.get(input, typeof target === "string") === target;
};

/**
 * Typpy.get
 * Gets the type of the input value. This is used internally.
 *
 * @name Typpy.get
 * @function
 * @param {Anything} input The input value.
 * @param {Boolean} str A flag to indicate if the return value
 * should be a string or not.
 * @return {Constructor|String} The input value constructor
 * (if any) or the stringified type (always lowercase).
 */
Typpy.get = function (input, str) {

    if (typeof input === "string") {
        return str ? "string" : String;
    }

    if (null === input) {
        return str ? "null" : null;
    }

    if (undefined === input) {
        return str ? "undefined" : undefined;
    }

    if (input !== input) {
        return str ? "nan" : NaN;
    }

    return str ? input.constructor.name.toLowerCase() : input.constructor;
};

module.exports = Typpy;

},{}],4:[function(require,module,exports){
/**
 * IterateObject
 * Iterates an object. Note the object field order may differ.
 *
 * @name IterateObject
 * @function
 * @param {Object} obj The input object.
 * @param {Function} fn A function that will be called with the current value, field name and provided object.
 * @return {Function} The `IterateObject` function.
 */
function IterateObject(obj, fn) {
    var i = 0
      , keys = []
      ;

    if (Array.isArray(obj)) {
        for (; i < obj.length; ++i) {
            if (fn(obj[i], i, obj) === false) {
                break;
            }
        }
    } else {
        keys = Object.keys(obj);
        for (; i < keys.length; ++i) {
            if (fn(obj[keys[i]], keys[i], obj) === false) {
                break;
            }
        }
    }
}

module.exports = IterateObject;

},{}],5:[function(require,module,exports){
/**
 * Expose email regex.
 *
 * Example input:
 *   yo+3@gmail.com
 *   tobi@ferret.com
 *   stack@lebron.technology
 */

module.exports = /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/;

},{}],6:[function(require,module,exports){
"use strict";

const typpy = require("typpy")
    , Err = require("err")
    ;

/**
 * validify
 * Validates the input against the validation method.
 *
 * @name validify
 * @function
 * @param {Anything} input The input value.
 * @param {Function|String|RegExp} type The validation type.
 * @param {Object|Error|String} errMessage The error message interpreted by [`err`](http://github.com/IonicaBizau/err).
 * @returns {Object} An object containing:
 *
 *  - `error` (Error|null): The `Error` object (if any), or `null`.
 *  - `valid` (Boolean): `true` if the input is valid, `false` otherwise.
 */
module.exports = function validify(input, type, errMessage) {


    let isValid = typpy(type, RegExp)
                    ? typpy(input, String)
                      ? type.test(input)
                      : false
                    : typpy(input, type)
      , err = isValid ? null : new Err(errMessage)
      ;

    return {
        error: err
      , valid: isValid
    };
};

},{"err":7,"typpy":8}],7:[function(require,module,exports){
// Dependencies
var typpy = require("typpy");

/**
 * Err
 * Create a custom error object.
 *
 * @name Err
 * @function
 * @param {String|Error} error The error message or an existing `Error` instance.
 * @param {String|Object} code The error code or the data object.
 * @param {Object} data The data object (its fields will be appended to the `Error` object).
 * @return {Error} The custom `Error` instance.
 */
function Err(error, code, data) {

    // Create the error
    if (!typpy(error, Error)) {
        error = new Error(error);
    }

    // Err(message, code, data);
    // Err(message, data);
    if (typpy(data, Object)) {
        data.code = code;
    } else if (typpy(code, Object)) {
        data = code;
        code = undefined;
    } else if (!typpy(code, undefined)) {
        data = { code: code };
    }

    if (data) {
        Object.keys(data).forEach(function (c) {
            error[c] = data[c];
        });
    }

    return error;
}

module.exports = Err;

},{"typpy":8}],8:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}]},{},[1])(1)
});