'use strict';

(function () {
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

    (status1 !== status2 && status1 === 1) ? shouldChange = true: shouldChange = false;

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
        (node === list) ? nodeStates.similar = node: nodeStates.nonSimilar = list;
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
      (button === btn) ? btnStates.similar = button: btnStates.nonSimilar = btn;
    }
    return btnStates;
  };

  const setOppositeList = (list, button) => {
    const listStates = findListStates(list);
    const btnStates = findBtnState(button);

    showFooterList(listStates.similar);

    if (!listStates.nonSimilar.classList.contains('main-footer__list--hidden')) {
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

})();
