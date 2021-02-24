'use strict';

(function () {
  const header = document.querySelector('.main-header');
  const main = document.querySelector('.main');
  const footer = document.querySelector('.main-footer');

  const modalFeedback = document.querySelector('.feedback');
  const overlay = document.querySelector('.overlay');

  const closeBtn = document.querySelector('.feedback__close-btn');

  const advantagesBlock = document.getElementById('advantages');

  const pageFormBlock = document.getElementById('page-form');

  const footerBtns = footer.querySelectorAll('.main-footer__btn');
  const footerLists = footer.querySelectorAll('.main-footer__list');
  const sectionList = footer.querySelector('.main-footer__list--sections');
  const contactDetailsList = footer.querySelector('.main-footer__list--contact-details');

  const feedbackForm = modalFeedback.querySelector('.feedback__form');

  const nameWrap = modalFeedback.querySelector('.feedback__name-wrap');
  const telWrap = modalFeedback.querySelector('.feedback__tel-wrap');
  const textareaWrap = modalFeedback.querySelector('.feedback__textarea-wrap');

  const nameInput = nameWrap.querySelector('input');
  const telInput = telWrap.querySelector('input');
  const textarea = textareaWrap.querySelector('textarea');

  const callbackBtn = header.querySelector('.main-header__callback-btn');

  const scrollBtn = main.querySelector('.main-screen__scroll-btn');

  const pageForm = pageFormBlock.querySelector('.form__form');

  const adviceBtn = main.querySelector('.main-screen__main-btn');

  const formTelWrap = pageFormBlock.querySelector('.form__tel-wrap');
  const formTelInput = formTelWrap.querySelector('input');

  window.global = {
    header: header,
    uploadControl: uploadControl,
    uploadForm: uploadForm,
    previewImage: previewImage,
    scale: scale,
    scaleValue: scaleValue,
    effectLevel: effectLevel,
    text: text,
    commentTextField: commentTextField,
    hashtag: hashtag,
    Value: Value,
    basicScaleValue: basicScaleValue,
    clearForm: clearForm
  };
})();




})();
