'use strict';

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var listWizards = [];
var vornames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var listCoatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var listEyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

var randomElementOfArray = function (listElements) {
  return Math.floor(Math.random() * listElements.length);
};

var createWizards = function (countWizards) {
  for (var i = 0; i < countWizards; i++) {
    var oldWizard = {
      name: vornames[randomElementOfArray(vornames)] + ' ' + surnames[randomElementOfArray(surnames)],
      coatColor: listCoatColor[randomElementOfArray(listCoatColor)],
      eyesColor: listEyesColor[randomElementOfArray(listEyesColor)]
    };
    listWizards.push(oldWizard);
  }
};

createWizards(4);


