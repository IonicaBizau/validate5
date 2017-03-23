
# validate5

 [![Support me on Patreon][badge_patreon]][patreon] [![Buy me a book][badge_amazon]][amazon] [![PayPal][badge_paypal_donate]][paypal-donations] [![Version](https://img.shields.io/npm/v/validate5.svg)](https://www.npmjs.com/package/validate5) [![Downloads](https://img.shields.io/npm/dt/validate5.svg)](https://www.npmjs.com/package/validate5)

> Form validations made easy.

[![validate5](http://i.imgur.com/tLbLEeJ.png)](http://ionicabizau.github.io/validate5/example)

## :cloud: Installation


Check out the [`dist`](/dist) directory to download the needed files and include them on your page.

If you're using this module in a CommonJS environment, you can install it from `npm` and `require` it:

```sh
$ npm i --save validate5
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

## :question: Get Help

There are few ways to get help:

 1. Please [post questions on Stack Overflow](https://stackoverflow.com/questions/ask). You can open issues with questions, as long you add a link to your Stack Overflow question.
 2. For bug reports and feature requests, open issues. :bug:
 3. For direct and quick help from me, you can [use Codementor](https://www.codementor.io/johnnyb). :rocket:


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


## :sparkling_heart: Support my projects

I open-source almost everything I can, and I try to reply everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications *for free*! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:

 - Starring and sharing the projects you like :rocket:
 - [![PayPal][badge_paypal]][paypal-donations]—You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:
 - [![Support me on Patreon][badge_patreon]][patreon]—Set up a recurring monthly donation and you will get interesting news about what I'm doing (things that I don't share with everyone).
 - **Bitcoin**—You can send me bitcoins at this address (or scanning the code below): `1P9BRsmazNQcuyTxEqveUsnf5CERdq35V6`

    ![](https://i.imgur.com/z6OQI95.png)

Thanks! :heart:



## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[badge_patreon]: http://ionicabizau.github.io/badges/patreon.svg
[badge_amazon]: http://ionicabizau.github.io/badges/amazon.svg
[badge_paypal]: http://ionicabizau.github.io/badges/paypal.svg
[badge_paypal_donate]: http://ionicabizau.github.io/badges/paypal_donate.svg
[patreon]: https://www.patreon.com/ionicabizau
[amazon]: http://amzn.eu/hRo9sIZ
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(https%3A%2F%2Fionicabizau.net)&year=2016#license-mit
[website]: https://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
