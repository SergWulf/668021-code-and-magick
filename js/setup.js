'use strict';

// Ищем окно и отображем его(убираем класс hidden)
var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

// Ищем блок, в котором будем отображать волшебников
var similarListElement = setup.querySelector('.setup-similar-list');

// Создаем шаблон для отображения волшебника
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var countMagicWizards = 4;
var vornames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var listCoatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var listEyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

var randomElementOfArray = function (listElements) {
  return Math.floor(Math.random() * listElements.length);
};

var createWizards = function (countWizards) {
  var Wizards = [];
  for (var i = 0; i < countWizards; i++) {
    var oldWizard = {
      name: vornames[randomElementOfArray(vornames)] + ' ' + surnames[randomElementOfArray(surnames)],
      coatColor: listCoatColor[randomElementOfArray(listCoatColor)],
      eyesColor: listEyesColor[randomElementOfArray(listEyesColor)]
    };
    Wizards.push(oldWizard);
  }
  return Wizards;
};

// Функция добавления данных волшебника из объекта в вёрстку
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

// Создаем волшебников
var listWizards = createWizards(countMagicWizards);

// Создаем фрагмент
var fragment = document.createDocumentFragment();
for (var j = 0; j < listWizards.length; j++) {
  fragment.appendChild(renderWizard(listWizards[j]));
}
// Вставляем в разметку новые блоки с волшебниками
similarListElement.appendChild(fragment);

document.querySelector('.setup-similar').classList.remove('hidden');

