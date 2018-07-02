'use strict';


(function () {
  var wizardTemplate = document.querySelector('#similar-wizard-template').content;
  var wizardsContainer = document.querySelector('.setup-similar');
  var wizardsList = wizardsContainer.querySelector('.setup-similar-list');


  var createAnotherWizard = function (template, wizard) {
    var anotherWizard = template.cloneNode(true);

    anotherWizard.querySelector('.setup-similar-label').textContent = wizard.name;
    anotherWizard.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    anotherWizard.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return anotherWizard;
  };


  var onWizardsLoadSuccess = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.util.WizardsProps.QUANTITY; i++) {
      fragment.appendChild(createAnotherWizard(wizardTemplate, wizards[i]));
    }

    wizardsList.appendChild(fragment);
    wizardsContainer.classList.remove('hidden');
  };


  window.backend.load(onWizardsLoadSuccess, window.util.onServerError);
})();
