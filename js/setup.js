'use strict';


(function () {
  var wizard = document.querySelector('.setup-wizard-appearance');
  var wizardCoat = wizard.querySelector('.wizard-coat');
  var wizardCoatColor = wizard.querySelector('input[name="coat-color"]');
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  var wizardEyesColor = wizard.querySelector('input[name="eyes-color"]');

  var fireball = document.querySelector('.setup-fireball-wrap');
  var fireballColor = fireball.querySelector('input[name="fireball-color"]');


  var getNextColor = function (colors, currentColor) {
    var currentColorIndex = colors.indexOf(currentColor);

    return currentColorIndex !== colors.length - 1 ? colors[currentColorIndex + 1] : colors[0];
  };

  var onCoatClick = function () {
    wizardCoatColor.value = getNextColor(window.util.WizardsProps.COAT_COLORS, wizardCoatColor.value);
    wizardCoat.style.fill = wizardCoatColor.value;
  };

  var onEyesClick = function () {
    wizardEyesColor.value = getNextColor(window.util.WizardsProps.EYES_COLORS, wizardEyesColor.value);
    wizardEyes.style.fill = wizardEyesColor.value;
  };

  var onFireballClick = function () {
    fireballColor.value = getNextColor(window.util.WizardsProps.FIREBALL_COLORS, fireballColor.value);
    fireball.style.background = fireballColor.value;
  };


  wizardCoat.addEventListener('click', onCoatClick);
  wizardEyes.addEventListener('click', onEyesClick);
  fireball.addEventListener('click', onFireballClick);
})();
