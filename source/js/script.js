'use strict';

(function () {
  const KeyboardCode = {
    ESC: 27,
    ENTER: 13
  };

  const BtnState = {
    SHOW: 'main-footer__btn--show',
    HIDE: 'main-footer__btn--hide'
  };

  const SimilarityState = {
    SIMILAR: 1,
    NONSIMILAR: -1
  };

  const storage = window.localStorage;

  const header = document.querySelector('.main-header');
  const main = document.querySelector('.main');
  const footer = document.querySelector('.main-footer');

  const footerBtns = footer.querySelectorAll('.main-footer__btn');
  const footerLists = footer.querySelectorAll('.main-footer__list');
  const sectionList = footer.querySelector('.main-footer__list--sections');
  const contactDetailsList = footer.querySelector('.main-footer__list--contact-details');

  const modalFeedback = document.querySelector('.feedback');
  const overlay = document.querySelector('.overlay');

  const feedbackForm = modalFeedback.querySelector('.feedback__form');

  const nameWrap = modalFeedback.querySelector('.feedback__name-wrap');
  const telWrap = modalFeedback.querySelector('.feedback__tel-wrap');
  const textareaWrap = modalFeedback.querySelector('.feedback__textarea-wrap');

  const nameInput = nameWrap.querySelector('input');
  const telInput = telWrap.querySelector('input');
  const textarea = textareaWrap.querySelector('textarea');

  const callbackBtn = header.querySelector('.main-header__callback-btn');
  const closeBtn = document.querySelector('.feedback__close-btn');

  const advantagesBlock = document.getElementById('advantages');
  const scrollBtn = main.querySelector('.main-screen__scroll-btn');

  const pageFormBlock = document.getElementById('page-form');
  const pageForm = pageFormBlock.querySelector('.form__form');

  const adviceBtn = main.querySelector('.main-screen__main-btn');

  const formTelWrap = pageFormBlock.querySelector('.form__tel-wrap');
  const formTelInput = formTelWrap.querySelector('input');

  const open = function (hiddenBlock) {
    hiddenBlock.classList.remove('hidden');
  };

  const close = function (block) {
    block.classList.add('hidden');
  };

  const closeModal = function () {
    close(modalFeedback);
    close(overlay);
    document.removeEventListener('keydown', onModalEscPress);
  };

  const removeNoJS = () => {
    modalFeedback.classList.remove('modal-nojs');
    overlay.classList.remove('modal-nojs');

    footerBtns.forEach(btn => btn.classList.remove('main-footer__btn--nojs'));
  };

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

  // <------------------VALIDATION------------------->
  // VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV

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

  // /VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV\
  // <------------------VALIDATION------------------->

  // <--------------FOOTER LISTS----------------------->
  // VVVVVVVVVVVVVVVVVVVVVVV

  const hideFooterList = (list) => {
    list.classList.add('main-footer__list--hidden');
  };

  const showFooterList = (list) => {
    list.classList.remove('main-footer__list--hidden');
  };

  const changeBtnTypeToShow = (btn) => {
    btn.classList.add(BtnState.SHOW);
    btn.classList.remove(BtnState.HIDE);
  };

  const changeBtnTypeToHide = (btn) => {
    btn.classList.add('main-footer__btn--hide');
    btn.classList.remove('main-footer__btn--show');
  };

  const setFooterLists = () => {
    footerLists.forEach(list => {
      hideFooterList(list);
    });
    footerBtns.forEach(btn => {
      changeBtnTypeToShow(btn);
    });
  };

  const checkBtnStatus = (button) => {
    let status = 0;
    (button.classList.contains(BtnState.SHOW)) ? (status = 1) : (status = -1);
    console.log('STATUS: ' + status);
    return status;
  };

  const defineChangeBtnsState = (button1, button2) => {
    const status1 = checkBtnStatus(button1);
    const status2 = checkBtnStatus(button2);
    let shouldChange = null;



    console.log(status1 !== status2 && status1 === 1);

    (status1 !== status2 && status1 === 1) ? shouldChange = true : shouldChange = false;

    console.log('SHOULD CHANGE?:');
    console.log(shouldChange ? 'YES' : 'NO');
    return shouldChange;
  };



  const changeBtnStates = (button) => {
    changeBtnTypeToHide(button);
    for (let btn of footerBtns) {
      const condition = (btn !== button && defineChangeBtnsState(button, btn));

      if (btn === button) {
        continue;
      } else if (condition) {
        changeBtnTypeToShow(btn);
      }

      // btn !== button && defineChangeBtnsState(button, btn) ?
      // changeBtnTypeToHide(button) && changeBtnTypeToShow(btn) :
      // changeBtnTypeToHide(button);
    };
  };

  const findListStates = (nodeList) => {
    let nodeStates = {};
    for (let node of nodeList) {
      for (let list of footerLists) {
        (node === list) ? nodeStates.similar = node : nodeStates.nonSimilar = list;
        if (nodeStates.similar !== undefined) {
          return nodeStates;
        }
      }
    }
    return nodeStates;
  };

  const findBtnState = (button) => {
    let btnStates = {};
    for (let btn of footerBtns) {
      (button === btn) ? btnStates.similar = button : btnStates.nonSimilar = btn;
    }
    return btnStates;
  };

  const setOppositeList = (list, button) => {
    const listStates = findListStates(list);
    const btnStates = findBtnState(button);

    showFooterList(listStates.similar);

    if(!listStates.nonSimilar.classList.contains('main-footer__list--hidden')) {
      hideFooterList(listStates.nonSimilar);
      changeBtnTypeToShow(btnStates.nonSimilar);
      btnStates.nonSimilar.addEventListener('click', onBtnClickOpen);
    }
  };

  const onBtnClickOpen = (evt) => {
    const btn = evt.target;
    changeBtnStates(btn);

    btn.removeEventListener('click', onBtnClickOpen);
    btn.addEventListener('click', onBtnClickClose);

    let nodeList = btn.parentNode.childNodes;

    setOppositeList(nodeList, btn);
  };

  const onBtnClickClose = (evt) => {
    const btn = evt.target;
    changeBtnTypeToShow(btn);

    btn.removeEventListener('click', onBtnClickClose);
    btn.addEventListener('click', onBtnClickOpen);

    let nodeList = btn.parentNode.childNodes;
    const listStates = findListStates(nodeList);
    const list = listStates.similar;
    const oppositeList = listStates.nonSimilar;
    hideFooterList(list);
  };

  const setFooterBtns = () => {
    footerBtns.forEach(btn => {
      btn.addEventListener('click', onBtnClickOpen);
    });
  };

  setFooterBtns();
  setFooterLists();

  // Завести стейт-блок для ведения состояния листов
  // где -1 - оба листа открыты
  // 0 - оба листа закрыты
  // 1 - первый лист открыт
  // 2 - второй лист открыт


  // /VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV\
  // <--------------FOOTER LISTS----------------------->

  const onCallbackBtnClickOpen = function (evt) {
    evt.preventDefault();
    open(modalFeedback);
    open(overlay);
    nameInput.focus();
    document.addEventListener('keydown', onModalEscPress);
  };

  const onCloseBtnClickClose = function (evt) {
    evt.preventDefault();
    closeModal();
  };

  const onOverlayClickClose = () => {
    closeModal();
  }

  const onModalEscPress = function (evt) {
    if (evt.keyCode === KeyboardCode.ESC) {
      closeModal();
    }
  };

  const onScrollBtnClickScroll = function (evt) {
    evt.preventDefault();
    scrollToBlock(advantagesBlock);
  };

  const onAdviceBtnClickScroll = function (evt) {
    evt.preventDefault();
    scrollToBlock(pageFormBlock);
  };

  scrollBtn.addEventListener('click', onScrollBtnClickScroll);
  adviceBtn.addEventListener('click', onAdviceBtnClickScroll);

  callbackBtn.addEventListener('click', onCallbackBtnClickOpen);
  closeBtn.addEventListener('click', onCloseBtnClickClose);
  overlay.addEventListener('click', onOverlayClickClose);


  removeNoJS();
  setFooterLists();
  checkValues();
})();
