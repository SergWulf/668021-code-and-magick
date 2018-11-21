'use strict';

var CLOUD_WIDTH = 270;
var CLOUD_HEIGHT = 420;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  return 0;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#fff');

  ctx.fillStyle = '#000';
  var betweenY = 20;
  for (var i = 0; i < names.length; i++) {
    ctx.fillText(names[i], 110, 75 + betweenY);
    betweenY += 20;
  }

};

