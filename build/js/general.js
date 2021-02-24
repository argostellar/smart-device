'use strict';

(function () {
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
