'use strict';


var KeyCodes = {
  ENTER: 13,
  ESC: 27
};

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
  ],
  FIREBALL_COLORS: [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ]
};


// вывод похожих персонажей


var getRandomItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var generateWizards = function (wizardsProps) {
  var wizards = [];

  for (var i = 0; i < wizardsProps.QUANTITY; i++) {
    wizards.push({
      name: getRandomItem(wizardsProps.NAMES) + ' ' + getRandomItem(wizardsProps.SURNAMES),
      coatColor: getRandomItem(wizardsProps.COAT_COLORS),
      eyesColor: getRandomItem(wizardsProps.EYES_COLORS)
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


// рендер похожих персонажей


var renderSimilarWizards = function () {
  var wizards = generateWizards(WizardsProps);
  var similarWizards = getSimilarWizards(wizards);

  var wizardsContainer = document.querySelector('.setup-similar');
  var wizardsList = wizardsContainer.querySelector('.setup-similar-list');

  wizardsList.appendChild(similarWizards);
  wizardsContainer.classList.remove('hidden');
};


renderSimilarWizards();


// открытие/закрытие окна настройки персонажа


var setupWindow = document.querySelector('.setup');
var wizardName = setupWindow.querySelector('.setup-user-name');

var openBtn = document.querySelector('.setup-open');
var closeBtn = setupWindow.querySelector('.setup-close');


var openSetup = function () {
  setupWindow.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closeSetup = function () {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === KeyCodes.ESC && evt.target !== wizardName) {
    closeSetup();
  }
};


closeBtn.addEventListener('click', closeSetup);
openBtn.addEventListener('click', openSetup);

openBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCodes.ENTER) {
    openSetup();
  }
});

closeBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCodes.ENTER) {
    closeSetup();
  }
});
