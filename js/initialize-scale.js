'use strict';

window.initializeScale = (function () {
  return  function (scaleElement, callback) {
    var buttonResizeDec = scaleElement.querySelector('.upload-resize-controls-button-dec');
    var buttonResizeInc = scaleElement.querySelector('.upload-resize-controls-button-inc');
    var inputResizeValue = scaleElement.querySelector('.upload-resize-controls-value');

    buttonResizeInc.addEventListener('click', function () {
      var totalValue = Math.min(parseInt(inputResizeValue.value, 10) + parseInt(inputResizeValue.step, 10), parseInt(inputResizeValue.max, 10));
      inputResizeValue.value = totalValue + '%';
      if (typeof callback === 'function') {
        callback(totalValue);
      }
    });

    buttonResizeDec.addEventListener('click', function () {
      var totalValue = Math.max(parseInt(inputResizeValue.value, 10) - parseInt(inputResizeValue.step, 10), parseInt(inputResizeValue.min, 10));
      inputResizeValue.value = totalValue + '%';
      if (typeof callback === 'function') {
        callback(totalValue);
      }
    });
  };

})();

