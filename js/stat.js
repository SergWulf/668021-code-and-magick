'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var COLUMN_WIDTH = 40;
var COLUMN_HEIGHT = 150;
var COLUMN_SPACING = 50;

var texts = ['Ура вы победили!', 'Список результатов:'];

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var maxValue = function (values) {
  var maxCurrentValue = values[0];
  for (var i = 1; i < values.length; i++) {
    if (values[i] > maxCurrentValue) {
      maxCurrentValue = values[i];
    }
  }
  return maxCurrentValue;
};

var outLineByLine = function (ctx, lines, x, y, lineSpacing) {
  for (var i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, y);
    y += lineSpacing;
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  outLineByLine(ctx, texts, 120, 40, 20);

  var onePercentHeightColumn = COLUMN_HEIGHT / 100;
  var onePercentMaxScorePlayer = 0; // Почему-то именно эту переменную подчеркивает редактор (Variable initializer is redundant more...)
  var columnOffset = COLUMN_WIDTH + COLUMN_SPACING;
  var maxScorePlayer = maxValue(times); // Найти игрока с максимальным значением
  var columnHeightPlayer = 0;
  var colorColumnPlayer = '';
  var colorBlack = '#000000';
  var firstPlayerX = CLOUD_X + COLUMN_SPACING;
  var firstPlayerY = CLOUD_HEIGHT - CLOUD_Y;
  var columnPlayerY = 0;

  // Найти количество очков соответсвующее одному проценту от максимального значения
  onePercentMaxScorePlayer = maxScorePlayer / 100;
  for (var j = 0; j < names.length; j++) {
    columnHeightPlayer = Math.floor(times[j] / onePercentMaxScorePlayer * onePercentHeightColumn);
    colorColumnPlayer = (names[j] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + Math.random() + ')';
    ctx.fillStyle = colorBlack;
    ctx.textBaseline = 'bottom';
    columnPlayerY = firstPlayerY - FONT_GAP - columnHeightPlayer;
    ctx.fillText(String(Math.round(times[j])), firstPlayerX + columnOffset * j, columnPlayerY);
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(names[j], firstPlayerX + columnOffset * j, firstPlayerY);
    ctx.fillStyle = colorColumnPlayer;
    ctx.fillRect(firstPlayerX + columnOffset * j, columnPlayerY, COLUMN_WIDTH, columnHeightPlayer);
  }
};

