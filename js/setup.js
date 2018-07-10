'use strict';


(function () {
  var popup = document.querySelector('.setup');
  var setupForm = popup.querySelector('.setup-wizard-form');
  var setupFormBtn = setupForm.querySelector('.setup-submit');

  var wizard = setupForm.querySelector('.setup-wizard-appearance');
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

    window.debounce(function () {
      window.updateWizards(window.similarWizards);
    });
  };

  var onEyesClick = function () {
    wizardEyesColor.value = getNextColor(window.util.WizardsProps.EYES_COLORS, wizardEyesColor.value);
    wizardEyes.style.fill = wizardEyesColor.value;

    window.debounce(function () {
      window.updateWizards(window.similarWizards);
    });
  };

  var onFireballClick = function () {
    fireballColor.value = getNextColor(window.util.WizardsProps.FIREBALL_COLORS, fireballColor.value);
    fireball.style.background = fireballColor.value;
  };


  var sendForm = function () {
    popup.classList.add('hidden');
    setupFormBtn.disabled = false;
  };

  var showError = function (errorMessage) {
    window.util.showError(errorMessage);
    setupFormBtn.disabled = false;
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    setupFormBtn.disabled = true;

    window.backend.save(new FormData(setupForm), sendForm, showError);
  };


  wizardCoat.addEventListener('click', onCoatClick);
  wizardEyes.addEventListener('click', onEyesClick);
  fireball.addEventListener('click', onFireballClick);

  setupForm.addEventListener('submit', onFormSubmit);
})();
