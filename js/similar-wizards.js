'use strict';


(function () {
  var wizardsContainer = document.querySelector('.setup-similar');


  var createSimilarWizards = function (loadedData) {
    window.similarWizards = loadedData;

    window.updateWizards(window.similarWizards);
    wizardsContainer.classList.remove('hidden');
  };


  window.backend.load(createSimilarWizards, window.util.showError);
})();
