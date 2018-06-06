'use strict';


var WizardsProps = {
  QUANTITY: 4,
  NAMES: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],
  SURNAMES: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],
  COAT_COLORS: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],
  EYES_COLORS: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ]
};


var getRandomItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var generateWizards = function () {
  var wizards = [];

  for (var i = 0; i < WizardsProps.QUANTITY; i++) {
    wizards[i] = {
      name: getRandomItem(WizardsProps.NAMES) + ' ' + getRandomItem(WizardsProps.SURNAMES),
      coatColor: getRandomItem(WizardsProps.COAT_COLORS),
      eyesColor: getRandomItem(WizardsProps.EYES_COLORS)
    };
  }

  return wizards;
};

var renderWizard = function (template, wizard) {
  var anotherWizard = template.cloneNode(true);

  anotherWizard.querySelector('.setup-similar-label').textContent = wizard.name;
  anotherWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  anotherWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return anotherWizard;
};

var getSimilarWizards = function (wizards) {
  var similarWizards = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizardTemplate, wizards[i]));
  }

  similarWizards.appendChild(fragment);
  document.querySelector('.setup-similar').classList.remove('hidden');
};


getSimilarWizards(generateWizards());

document.querySelector('.setup').classList.remove('hidden');
