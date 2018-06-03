'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var SHADOW_OFFSET = 10;
var PRONG_LEDGE = 10;
var PRONG_COUNT = 9;
var HORIZONTAL_MARGIN = 55;
var VERTICAL_MARGIN = 15;
var FONT_SIZE = 16;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var BAR_MARGIN = 50;

var statX = CLOUD_X + HORIZONTAL_MARGIN;
var statY = CLOUD_Y + VERTICAL_MARGIN;
var lineHeight = FONT_SIZE * 1.25;

var renderCloud = function (ctx, x, y, width, height, prongLedge, prongCount, color) {
  // рисует поле с зубцами по бокам
  // prongLedge -- величина выступа зубцов
  // prongCount -- кол-во зубцов

  var prongHalf = height / (2 * prongCount);

  ctx.beginPath();
  ctx.moveTo(x + prongLedge, y);

  ctx.lineTo(x + width - prongLedge, y);

  // правый край
  for (var i = 1; i <= 2 * prongCount; i++) {
    if (i % 2 !== 0) {
      ctx.lineTo(x + width, y + i * prongHalf);
    } else {
      ctx.lineTo(x + width - prongLedge, y + i * prongHalf);
    }
  }

  ctx.lineTo(x + prongLedge, y + height);

  // левый край
  for (var j = 1; j <= 2 * prongCount; j++) {
    if (j % 2 !== 0) {
      ctx.lineTo(x, y + height - j * prongHalf);
    } else {
      ctx.lineTo(x + prongLedge, y + height - j * prongHalf);
    }
  }

  ctx.stroke();
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomNum = function (min, max) {
  return Math.random() * (max - min) + min;
};


window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_OFFSET, CLOUD_Y + SHADOW_OFFSET, CLOUD_WIDTH, CLOUD_HEIGHT, PRONG_LEDGE, PRONG_COUNT, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, PRONG_LEDGE, PRONG_COUNT, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = FONT_SIZE + 'px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', statX, statY);
  ctx.fillText('Список результатов:', statX, statY + lineHeight);

  var histogramY = statY + lineHeight + FONT_SIZE + VERTICAL_MARGIN;
  var maxTime = getMaxElement(times);
  var currentBarHeight;

  for (var i = 0; i < names.length; i++) {
    currentBarHeight = BAR_MAX_HEIGHT * Math.round(times[i]) / maxTime;

    ctx.fillStyle = '#000';
    ctx.textBaseline = 'hanging';
    ctx.fillText(Math.round(times[i]), statX + (BAR_WIDTH + BAR_MARGIN) * i, histogramY + BAR_MAX_HEIGHT - currentBarHeight);
    ctx.textBaseline = 'bottom';
    ctx.fillText(names[i], statX + (BAR_WIDTH + BAR_MARGIN) * i, histogramY + lineHeight + BAR_MAX_HEIGHT + lineHeight);

    if (names[i] === 'Вы') {
      ctx.fillStyle = '#f00';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.round(getRandomNum(0, 100)) + '%, 50%)';
    }

    ctx.fillRect(statX + (BAR_WIDTH + BAR_MARGIN) * i, histogramY + lineHeight + BAR_MAX_HEIGHT - currentBarHeight, BAR_WIDTH, currentBarHeight);
  }
};
