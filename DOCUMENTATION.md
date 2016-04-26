## Documentation

You can see below the API reference of this module.

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

