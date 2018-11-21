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

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  return 0;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var onePercentHeightColumn = COLUMN_HEIGHT / 100;
  var onePercentMaxScorePlayer = 0; // Почему-то именно эту переменную подчеркивает редактор (Variable initializer is redundant more...)
  var columnOffset = COLUMN_WIDTH + COLUMN_SPACING;
  var MaxScorePlayer = 0;
  var columnHeightPlayer = 0;
  var colorColumnPlayer = '';
  var colorBlack = '#000000';
  // Найти игрока с максимальным значением
  for (var i = 0; i < times.length; i++) {
    if (times[i] > MaxScorePlayer) {
      MaxScorePlayer = times[i];
    }
  }
  // Найти количество очков соответсвующее одному проценту от максимального значения
  onePercentMaxScorePlayer = MaxScorePlayer / 100;
  for (var j = 0; j < names.length; j++) {
    columnHeightPlayer = Math.floor(times[j] / onePercentMaxScorePlayer * onePercentHeightColumn);
    if (names[j] === 'Вы') {
      colorColumnPlayer = 'rgba(255, 0, 0, 1)';
    } else {
      colorColumnPlayer = 'rgba(0, 0, 255, ' + Math.random() + ')';
    }
    if (j === 0) {
      ctx.fillStyle = colorBlack;
      ctx.fillText(String(Math.round(times[j])), CLOUD_X + COLUMN_SPACING, CLOUD_HEIGHT - CLOUD_Y - FONT_GAP * 1.5 - columnHeightPlayer);
      ctx.fillText(names[j], CLOUD_X + COLUMN_SPACING, CLOUD_HEIGHT - CLOUD_Y);

      ctx.fillStyle = colorColumnPlayer;
      ctx.fillRect(CLOUD_X + COLUMN_SPACING, CLOUD_HEIGHT - CLOUD_Y - FONT_GAP - columnHeightPlayer, COLUMN_WIDTH, columnHeightPlayer);
    } else {
      ctx.fillStyle = colorBlack;
      ctx.fillText(String(Math.round(times[j])), CLOUD_X + COLUMN_SPACING + columnOffset, CLOUD_HEIGHT - CLOUD_Y - FONT_GAP * 1.5 - columnHeightPlayer);
      ctx.fillText(names[j], CLOUD_X + COLUMN_SPACING + columnOffset, CLOUD_HEIGHT - CLOUD_Y);

      ctx.fillStyle = colorColumnPlayer;
      ctx.fillRect(CLOUD_X + COLUMN_SPACING + columnOffset, CLOUD_HEIGHT - CLOUD_Y - FONT_GAP - columnHeightPlayer, COLUMN_WIDTH, columnHeightPlayer);
      columnOffset += COLUMN_WIDTH + COLUMN_SPACING;
    }
  }
};

