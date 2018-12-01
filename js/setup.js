'use strict';

var COUNT_WIZARDS = 4;
var vornames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var listCoatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var listEyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
var listFireballColor = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// Ищем окно настроек и отображем его по нажатию на setup-open
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
setupOpen.addEventListener('click', function () {
  setup.classList.remove('hidden');
});

// Когда в фокусе кнопка setup-open, то по нажатию Enter запускать окно настроек
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    setup.classList.remove('hidden');
  }
});

// Пишем обработчик закрытия окна настроек по клику мыши
var setupClose = setup.querySelector('.setup-close');
setupClose.addEventListener('click', function () {
  setup.classList.add('hidden');
});

// Обработчик закрытия окна настроек на кнопку ESC, если фокус находится в строке ввода, то не закрывать окно
document.addEventListener('keydown', function (evt) {
  if ((!document.activeElement.matches('.setup-user-name')) && (evt.keyCode === 27)) {
    setup.classList.add('hidden');
  }
});

// Если окно открыто и фокус находится на кнопке закрытия окна
// 1. Проверить наличие фокуса на кнопке закрытия
// 2. Проверить наличие класса hidden в элементе окна настроек, если нет, то открыто окно
// 3. Если оба условия предыдущих совпадают и нажата клавиша Enter, то закрыть окно.

setupClose.addEventListener('keydown', function (evt) {
  if (!setup.classList.contains('hidden')) {
    if (evt.keyCode === 13) {
      setup.classList.add('hidden');
    }
  }
});

// Если диалог открыт, нажатие на кнопку «Сохранить» приводит к отправке формы
// 1. Проверить наличие класса hidden в элементе окна настроек, если нет, то открыто окно
// 2. При нажатии на кнопку "Сохранить" отправить форму.
var buttonSubmit = setup.querySelector('.setup-submit');
var formWizard = setup.querySelector('.setup-wizard-form');
buttonSubmit.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (!setup.classList.contains('hidden')) {
    formWizard.submit();
  }
});

// Если диалог открыт и фокус находится на кнопке «Сохранить», нажатие на ENTER приводит к отправке формы
// 1. Перехватить Enter и проверить наличие класса hidden в элементе окна настроек, если hidden нет, то отправить форму.

buttonSubmit.addEventListener('keydown', function (evt) {
  evt.preventDefault();
  if (!setup.classList.contains('hidden')) {
    if (evt.keyCode === 13) {
      formWizard.submit();
    }
  }
});

// Находим блоки глаз, мантии и файерболла в окне настроек
var coatWizard = setup.querySelector('.wizard-coat');
var eyesWizard = setup.querySelector('.wizard-eyes');
var fireballWizard = setup.querySelector('.setup-fireball-wrap');

coatWizard.addEventListener('click', function () {
  coatWizard.style.fill = listCoatColor[randomElementOfArray(listCoatColor)];
});

fireballWizard.addEventListener('click', function () {
  fireballWizard.style.background = listFireballColor[randomElementOfArray(listFireballColor)];
});

eyesWizard.addEventListener('click', function () {
  eyesWizard.style.fill = listEyesColor[randomElementOfArray(listEyesColor)];
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
      coatColor: listCoatColor[randomElementOfArray(listCoatColor)],
      eyesColor: listEyesColor[randomElementOfArray(listEyesColor)]
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

