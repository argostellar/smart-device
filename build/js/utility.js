'use strict';

// utility.js - универсальные утилитарные функции
(function () {
  const open = function (hiddenBlock) {
    hiddenBlock.classList.remove('hidden');
  };

  const close = function (block) {
    block.classList.add('hidden');
  };

  const checkExistence = (element) => {
    const isExisting = null;
    (!element === (undefined || null)) ? isExisting = true : isExisting = false ;
    return isExisting;
  };

  window.utility = {
    open: open,
    close: close,
    checkExistence: checkExistence,
  };
})();
