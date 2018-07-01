'use strict';


(function () {
  var generateWizards = function (wizardsProps) {
    var wizards = [];

    for (var i = 0; i < wizardsProps.QUANTITY; i++) {
      wizards.push({
        name: window.util.getRandomItem(wizardsProps.NAMES) + ' ' + window.util.getRandomItem(wizardsProps.SURNAMES),
        coatColor: window.util.getRandomItem(wizardsProps.COAT_COLORS),
        eyesColor: window.util.getRandomItem(wizardsProps.EYES_COLORS)
      });
    }

    return wizards;
  };

  var createAnotherWizard = function (template, wizard) {
    var anotherWizard = template.cloneNode(true);

    anotherWizard.querySelector('.setup-similar-label').textContent = wizard.name;
    anotherWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    anotherWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return anotherWizard;
  };

  var getSimilarWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(createAnotherWizard(wizardTemplate, wizards[i]));
    }

    return fragment;
  };


  var renderSimilarWizards = function () {
    var wizards = generateWizards(window.util.WizardsProps);
    var similarWizards = getSimilarWizards(wizards);

    var wizardsContainer = document.querySelector('.setup-similar');
    var wizardsList = wizardsContainer.querySelector('.setup-similar-list');

    wizardsList.appendChild(similarWizards);
    wizardsContainer.classList.remove('hidden');
  };


  renderSimilarWizards();
})();
