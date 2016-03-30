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

validate5.loadForm = loadForm;
validate5.patterns = {
    email: [emailRegex.source, "Invalid email address."]
};
validate5.skips = [function (c) {
    return c.getAttribute("type") === "submit";
}];

validate5.validateInput = function (input) {
    let value = input.value
      , pattern = input.getAttribute(ATTR.PATTERN)
      , error = input.getAttribute(ATTR.CUSTOM_ERROR) || input.getAttribute("title")
      , required = input.getAttribute(ATTR.REQUIRED)
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
    return $("input", c => {
        if (validate5.skips.filter(fn => fn(c)).length) { return; }
        cb(c);
    }, [], formElm);
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
    validate5.loadForm(formElm);
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
