"use strict";

const $ = require("elm-select")
    , emailRegex = require("regex-email")
    , iterateObj = require("iterate-object")
    , validify = require("validify")
    ;

const PREFIX = "data-validate5-"
    , ATTR = {
        ERROR: PREFIX + "error"
      , SUCCESS: PREFIX + "success"
      , REQUIRED: PREFIX + "required"
      , CUSTOM_ERROR: PREFIX + "custom-error"
      , PATTERN: PREFIX + "pattern"
      }
    ;

/*!
 * loadForm
 * Prepares the form inputs to be used by by the libary. This is called internally.
 *
 * @name loadForm
 * @function
 * @param {String} form The form(s) selector you want to automagically validate on submit.
 */
function loadForm(form) {
    if (form.__validate5) { return; }
    form.__validate5 = true;
    validate5.inputs(form, input => {
        if (input.hasAttribute("required")) {
            input.setAttribute(ATTR.REQUIRED, "required");
        }
        let pattern = input.getAttribute("pattern")
        input.removeAttribute("required");
        input.removeAttribute("pattern");

        let pat = validate5.patterns[input.getAttribute("type")];
        if (pat && !pattern) {
            input.setAttribute("type", "text");
            pattern = pat[0];
            input.setAttribute(ATTR.CUSTOM_ERROR, pat[1]);
        }

        if (pattern) {
            input.setAttribute(ATTR.PATTERN, pattern);
        }
    });
}

/**
 * validate5
 * Handles the submit event on the selected forms.
 *
 * You may want to extend the `validate5.patterns` object with custom types. By default it has validation for:
 *
 *  - `email`: `[emailRegex, "Invalid email address"]`
 *
 * e.g. `validate5.patterns.myCustomType = [/^[0-9]+$/g, "Not a number."]`
 *
 * Use the `validate5.skips` array to handle elements that should be skipped when validating. By default it skips the `type=submit` inputs.
 *
 * e.g.
 *
 * ```js
 * validate5.skips.push(function (c) {
 *   if (c.getattribute("data-ignore-validation")) { return true; }
 * });
 * ```
 *
 * @name validate5
 * @function
 * @param {String} forms The form(s) selector you want to automagically validate on submit.
 */
function validate5(forms) {
    $(forms, c => {
        loadForm(c);
        c.addEventListener("submit", e => {
            if (validate5.showErrors(c)) {
                e.preventDefault();
            }
        });
    });
}

validate5.patterns = {
    email: [emailRegex.source, "Invalid email address."]
};

validate5.skips = [function (c) {
    return c.getAttribute("type") === "submit";
}];

/**
 * validateInput
 * Validates an input element.
 *
 * @name validateInput
 * @function
 * @param {HTMLElement} input The input to validate.
 * @returns {Validify} The [`validify`](https://github.com/IonicaBizau/validify) result.
 */
validate5.validateInput = function (input) {
    let value = input.value
      , pattern = input.getAttribute(ATTR.PATTERN)
      , error = input.getAttribute(ATTR.CUSTOM_ERROR) || input.getAttribute("title")
      , required = input.getAttribute(ATTR.REQUIRED)
      ;

    if (pattern) {
        pattern = new RegExp(pattern);
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

/**
 * inputs
 * Iterate the inputs in the provided form.
 *
 * @name inputs
 * @function
 * @param {HTMLElement} formElm The form element.
 * @param {Function} cb The callback function.
 * @returns {Array} The array of inputs.
 */
validate5.inputs = function (formElm, cb) {
    return $("input", c => {
        if (validate5.skips.filter(fn => fn(c)).length) {
            return;
        }
        cb(c);
    }, [], formElm);
};

/**
 * validateForm
 * Validates the form element.
 *
 * @name validateForm
 * @function
 * @param {HTMLElement} formElm The form element.
 * @returns {Array} An array of errors.
 */
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

/**
 * showErrors
 * Validates the form and displays the errors.
 *
 * @name showErrors
 * @function
 * @param {HTMLElement} formElm The `<form>` element to validate.
 * @returns {Array|Boolean} An array of errors or `false` if all the fields are valid.
 */
validate5.showErrors = function (formElm) {
    loadForm(formElm);
    let errs = validate5.validateForm(formElm);
    validate5.inputs(formElm, c => {
        c.parentNode.removeAttribute(ATTR.ERROR);
        c.parentNode.setAttribute(ATTR.SUCCESS, "success");
    });
    if (!errs.length) { return false; }
    iterateObj(errs, c => {
        c.elm.parentNode.setAttribute(ATTR.ERROR, c.err.message);
        c.elm.parentNode.removeAttribute(ATTR.SUCCESS);
    });
    errs[0].elm.focus();
    return errs;
};

module.exports = validate5;
