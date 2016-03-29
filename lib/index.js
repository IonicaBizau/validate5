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
