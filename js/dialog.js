'use strict';


var KeyCodes = {
  ENTER: 13,
  ESC: 27
};


var popup = document.querySelector('.setup');
var popupOpenBtn = document.querySelector('.setup-open');
var popupCloseBtn = popup.querySelector('.setup-close');
var popupHandler = popup.querySelector('.upload');
var wizardName = popup.querySelector('.setup-user-name');


// открытие/закрытие окна


var openPopup = function () {
  popup.classList.remove('hidden');
  document.addEventListener('keydown', onEscPress);
};

var closePopup = function () {
  popup.classList.add('hidden');
  document.removeEventListener('keydown', onEscPress);
  popup.style = '';
};

var onEscPress = function (evt) {
  if (evt.keyCode === KeyCodes.ESC && evt.target !== wizardName) {
    closePopup();
  }
};


popupCloseBtn.addEventListener('click', closePopup);
popupOpenBtn.addEventListener('click', openPopup);

popupOpenBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCodes.ENTER) {
    openPopup();
  }
});

popupCloseBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCodes.ENTER) {
    closePopup();
  }
});


// перетаскивание окна


var onClickPreventDefault = function (clickEvt) {
  clickEvt.preventDefault();
  popupHandler.removeEventListener('click', onClickPreventDefault);
};

var onMouseDown = function (downEvt) {
  var initialCoords = {
    x: downEvt.clientX,
    y: downEvt.clientY
  };

  var isDragMove = false;


  var onMouseMove = function (moveEvt) {
    isDragMove = true;

    var shift = {
      x: initialCoords.x - moveEvt.clientX,
      y: initialCoords.y - moveEvt.clientY
    };

    popup.style.left = (popup.offsetLeft - shift.x) + 'px';
    popup.style.top = (popup.offsetTop - shift.y) + 'px';

    initialCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
  };


  var onMouseUp = function () {
    if (isDragMove) {
      popupHandler.addEventListener('click', onClickPreventDefault);
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};


popupHandler.addEventListener('mousedown', onMouseDown);
