# validate-five [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![Version](https://img.shields.io/npm/v/validate-five.svg)](https://www.npmjs.com/package/validate-five) [![Downloads](https://img.shields.io/npm/dt/validate-five.svg)](https://www.npmjs.com/package/validate-five) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Form validations made easy.

## :cloud: Installation
    

Check out the [`dist`](/dist) directory to download the needed files and include them on your page.

If you're using this module in a CommonJS environment, you can install it from `npm` and `require` it:

```sh
$ npm i --save validate-five
```

        
## :clipboard: Example

        

```js
/**
 * Having the following HTML markup
 *
 * <form action="#" method="get" accept-charset="UTF-8" style="margin-left:6px;">
 *     <div class="container">
 *         <input type="text" name="name" placeholder="Your Name" autofocus required/><br/>
 *     </div>
 *     <div class="container">
 *         <input type="email" name="email" placeholder="Your Email" required/><br/>
 *     </div>
 *     <div class="container">
 *         <input type="text" name="text" title="Invalid ZIP code." pattern="\d{5}-?(\d{4})?" placeholder="ZIP (5 numbers)" required/><br/>
 *     </div>
 *     <div class="container">
 *         <input type="submit" value="Submit" />
 *     </div>
 * </form>
 **/

// To validate the forms on submit, use:
validate5("form");
```
    
## :memo: Documentation
        
### `validate5(forms)`
Handles the submit event on the selected forms.

You may want to extend the `validate5.patterns` object with custom types. By default it has validation for:

 - `email`: `[emailRegex, "Invalid email address"]`

e.g. `validate5.patterns.myCustomType = [/^[0-9]+$/g, "Not a number."]`

Use the `validate5.skips` array to handle elements that should be skipped when validating. By default it skips the `type=submit` inputs.

e.g.

```js
validate5.skips.push(function (c) {
  if (c.getattribute("data-ignore-validation")) { return true; }
});
```

#### Params
- **String** `forms`: The form(s) selector you want to automagically validate on submit.

### `validateInput(input)`
Validates an input element.

#### Params
- **HTMLElement** `input`: The input to validate.

#### Return
- **Validify** The [`validify`](https://github.com/IonicaBizau/validify) result.

### `inputs(formElm, cb)`
Iterate the inputs in the provided form.

#### Params
- **HTMLElement** `formElm`: The form element.
- **Function** `cb`: The callback function.

#### Return
- **Array** The array of inputs.

### `validateForm(formElm)`
Validates the form element.

#### Params
- **HTMLElement** `formElm`: The form element.

#### Return
- **Array** An array of errors.

### `showErrors(formElm)`
Validates the form and displays the errors.

#### Params
- **HTMLElement** `formElm`: The `<form>` element to validate.

#### Return
- **Array|Boolean** An array of errors or `false` if all the fields are valid.

        
## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## :scroll: License
    
[MIT][license] © [Ionică Bizău][website]
    
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2016#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md