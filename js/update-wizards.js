'use strict';


(function () {
  var wizardCoatColor = document.querySelector('input[name="coat-color"]');
  var wizardEyesColor = document.querySelector('input[name="eyes-color"]');

  var wizardTemplate = document.querySelector('#similar-wizard-template').content;
  var wizardsList = document.querySelector('.setup-similar-list');


  // сортировка


  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === wizardCoatColor.value) {
      rank += 2;
    }

    if (wizard.colorEyes === wizardEyesColor.value) {
      rank += 1;
    }

    return rank;
  };

  var compareNames = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };


  var sortWizards = function (left, right) {
    var difference = getRank(right) - getRank(left);

    if (difference === 0) {
      difference = compareNames(left.name, right.name);
    }

    return difference;
  };


  // рендер


  var createAnotherWizard = function (template, wizard) {
    var anotherWizard = template.cloneNode(true);

    anotherWizard.querySelector('.setup-similar-label').textContent = wizard.name;
    anotherWizard.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    anotherWizard.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return anotherWizard;
  };

  var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.util.WizardsProps.QUANTITY; i++) {
      fragment.appendChild(createAnotherWizard(wizardTemplate, wizards[i]));
    }

    wizardsList.innerHTML = '';
    wizardsList.appendChild(fragment);
  };


  var updateWizards = function (wizards) {
    wizards.sort(sortWizards);

    renderWizards(wizards);
  };


  window.updateWizards = updateWizards;
})();
