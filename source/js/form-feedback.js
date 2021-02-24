'use strict';

// form-feedback.js - модуль работы с формами
(function () {
  const storage = window.localStorage;

  const storeElementValue = (element) => {
    const name = element.getAttribute('name');

    element.value = storage.getItem(name) || element.value;

    element.onkeyup = function () {
      storage.setItem(name, element.value);
    };
  };

  const checkValues = () => {
    storeElementValue(nameInput);
    storeElementValue(telInput);
    storeElementValue(textarea);
  };

  const scrollToBlock = function (block) {
    block.scrollIntoView({ block: "center", behavior: "smooth" })
  };
})();
