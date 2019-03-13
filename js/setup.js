'use strict';

var COUNT_WIZARDS = 4;
var CODE_ENTER = 13;
var CODE_ESC = 27;
var vornames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var listCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var listEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var listFireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// Ищем окно настроек и отображем его по нажатию на setup-open
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
setupOpen.addEventListener('click', function () {
  setup.classList.remove('hidden');
});

// Когда в фокусе кнопка setup-open, то по нажатию Enter запускать окно настроек
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === CODE_ENTER) {
    setup.classList.remove('hidden');
  }
});

// Пишем обработчик закрытия окна настроек по клику мыши
var setupClose = setup.querySelector('.setup-close');
setupClose.addEventListener('click', function () {
  setup.classList.add('hidden');
  setup.style.top = 80 + 'px';
  setup.style.left = 50 + '%';
});

// Обработчик закрытия окна настроек на кнопку ESC, если фокус находится в строке ввода, то не закрывать окно
document.addEventListener('keydown', function (evt) {
  if ((!document.activeElement.matches('.setup-user-name')) && (evt.keyCode === CODE_ESC)) {
    setup.classList.add('hidden');
  }
});

// Если окно открыто и фокус находится на кнопке закрытия окна
// 1. Проверить наличие фокуса на кнопке закрытия
// 2. Проверить наличие класса hidden в элементе окна настроек, если нет, то открыто окно
// 3. Если оба условия предыдущих совпадают и нажата клавиша Enter, то закрыть окно.

setupClose.addEventListener('keydown', function (evt) {
  if (!setup.classList.contains('hidden')) {
    if (evt.keyCode === CODE_ENTER) {
      setup.classList.add('hidden');
    }
  }
});

// Находим блоки глаз, мантии и файерболла в окне настроек
var coatWizard = setup.querySelector('.wizard-coat');
var eyesWizard = setup.querySelector('.wizard-eyes');
var fireballWizard = setup.querySelector('.setup-fireball-wrap');

coatWizard.addEventListener('click', function () {
  var currentCoatColor = listCoatColors[randomElementOfArray(listCoatColors)];
  document.getElementsByName('coat-color')[0].value = currentCoatColor;
  coatWizard.style.fill = currentCoatColor;
});

fireballWizard.addEventListener('click', function () {
  var currentFireballColor = listFireballColors[randomElementOfArray(listFireballColors)];
  document.getElementsByName('fireball-color')[0].value = currentFireballColor;
  fireballWizard.style.background = currentFireballColor;
});

eyesWizard.addEventListener('click', function () {
  var currentEyesColor = listEyesColors[randomElementOfArray(listEyesColors)];
  document.getElementsByName('eyes-color')[0].value = currentEyesColor;
  eyesWizard.style.fill = currentEyesColor;
});

// Ищем блок, в котором будем отображать волшебников
var similarListElement = setup.querySelector('.setup-similar-list');

// Создаем шаблон для отображения волшебника
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var randomElementOfArray = function (listElements) {
  return Math.floor(Math.random() * listElements.length);
};

var createWizards = function (countWizards) {
  var wizards = [];
  for (var i = 0; i < countWizards; i++) {
    var oldWizard = {
      name: vornames[randomElementOfArray(vornames)] + ' ' + surnames[randomElementOfArray(surnames)],
      coatColor: listCoatColors[randomElementOfArray(listCoatColors)],
      eyesColor: listEyesColors[randomElementOfArray(listEyesColors)]
    };
    wizards.push(oldWizard);
  }
  return wizards;
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
var listWizards = createWizards(COUNT_WIZARDS);

// Создаем фрагмент
var fragment = document.createDocumentFragment();
for (var j = 0; j < listWizards.length; j++) {
  fragment.appendChild(renderWizard(listWizards[j]));
}
// Вставляем в разметку новые блоки с волшебниками
similarListElement.appendChild(fragment);

document.querySelector('.setup-similar').classList.remove('hidden');

