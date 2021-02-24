'use strict';

(function () {
  const cleanerTelRegExp = new RegExp('[\D\s\._\-]+', 'g');
  const countTelRegExp = new RegExp('[\w\s]{17}', 'g');
  // const telRegExp = new RegExp('(\+(7)\s\([0-9]{3}\)\s[0-9]{3}\s[0-9]{4}){1}', 'g');

  const initaialTelValue = '+7(';

  const telValidationRule = 'Введите телефон в формате "+7(XXX)XXXXXXX"';

  const setInputInitialState = (input) => {
    input.value = initaialTelValue;
  };

  const onInputFocusSetValue = (evt) => {
    if (evt.target.value === '') {
      setInputInitialState(evt.target);
    }
  };

  const onInputBlurSetValue = (evt) => {
    if (evt.target.value === initaialTelValue) {
      evt.target.value = '';
    }
  };

  const getInputValue = (input) => {
    const currentValue = input.value;
  };

  const formatValue = (value) => {
    let currentValue = value.replace(cleanerTelRegExp, '');
    if (value.length === initaialTelValue.length + 3) {
      currentValue = `${value})`;
    } else if (value.length >= 14) {
      currentValue = value.slice(0, 14);
    }
    return currentValue;
  };

  const onInputKeyupFormatValue = (evt) => {
    const unformatedValue = evt.target.value;
    const formatedValue = formatValue(unformatedValue);

    evt.target.value = formatedValue;
    console.log(evt.target.value);
  };

  const onInputValidate = (evt) => {
    evt.target.setCustomValidity(telValidationRule);
    evt.target.style.outline = '2px solid red';
    console.log('INVALID!');
    console.log(evt.target);
    console.log(evt.target.value);
  };

  // const onInputCheckValidity = (evt) => {
  //   if (evt.target.checkValidity()) {
  //     evt.target.style.outline = 'none';
  //     evt.target.removeEventListener('invalid', onInputValidate);
  //   } else {
  //     evt.target.addEventListener('invalid', onInputValidate);
  //   }
  // };

  const validateTelInput = (input) => {
    // input.removeAttribute('pattern');
    // обнулили паттерн, теперь нужно сделать проверку по регулярке через checkValidity
    input.addEventListener('focus', onInputFocusSetValue);
    input.addEventListener('keyup', onInputKeyupFormatValue);
    input.addEventListener('blur', onInputBlurSetValue);
    // input.setCustomValidity(telValidationRule);
    // input.addEventListener('invalid', onInputValidate);
    // input.addEventListener('input', onInputCheckValidity);
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    alert('Успешная отправка!');
  };

  const validateForm = (form) => {
    form.addEventListener('submit', onFormSubmit);
  };

  const setValidation = () => {
    validateTelInput(telInput);
    validateTelInput(formTelInput);
  };

  const setFormValidation = () => {
    validateForm(feedbackForm);
    validateForm(pageForm);
  };

  setFormValidation();
  setValidation();
})();
