'use strict';
window.formEdit = (function () {

  var ESCAPE_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;
  var uploadFilterControls = document.querySelector('.upload-filter-controls');
  var uploadOverlay = document.querySelector('.upload-overlay ');
  var divPreview = document.querySelector('.upload-form-preview');
  var imgPreview = divPreview.querySelector('.filter-image-preview');
  var uploadResizeControls = uploadOverlay.querySelector('.upload-resize-controls');
  var buttonResizeDec = uploadResizeControls.querySelector('.upload-resize-controls-button-dec');
  var buttonResizeInc = uploadResizeControls.querySelector('.upload-resize-controls-button-inc');
  var inputResizeValue = uploadResizeControls.querySelector('.upload-resize-controls-value');
  var uploadFormDescription = uploadOverlay.querySelector('.upload-form-description');
  var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');

  var uploadForm = document.querySelector('.upload-form');
  var uploadFile = document.querySelector('#upload-file');
  var uploadSelectImage = document.querySelector('#upload-select-image');


  var isActivateEvent = function (evt) {
    return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
  };
  uploadFilterControls.addEventListener('click', function (evt) {
    var selectedFilter = evt.target.tagName;

    if (selectedFilter.toLowerCase() === 'input') {
      var selectedElement = evt.target;
      var filterName = selectedElement.id;
      var classListLength = imgPreview.classList.length;
      if (classListLength > 0) {
        for (var i = 0; i < classListLength; i++) {
          var oneClassName = imgPreview.classList[i];
          if (oneClassName !== 'filter-image-preview') {
            imgPreview.classList.remove(oneClassName);
          }
        }
      }
      var cssClass = filterName.slice(7);
      imgPreview.classList.add(cssClass);
    }
  });
  var uploadSubmit = document.querySelector('#upload-submit');

  uploadSubmit.addEventListener('click', function (evt) {
    evt.preventDefault();
    onUploadFormSubmit();
  });
  uploadSubmit.addEventListener('keydown', function (evt) {
    if (isActivateEvent(evt)) {
      evt.preventDefault();
      onUploadFormSubmit();
    }
  });
  uploadSubmit.addEventListener('blur', function () {
    uploadFormDescription.setAttribute('style', '');
  });

  buttonResizeInc.addEventListener('click', function () {
    var totalValue = parseInt(inputResizeValue.value, 10) + parseInt(inputResizeValue.step, 10);
    if (totalValue > parseInt(inputResizeValue.max, 10)) {
      totalValue = parseInt(inputResizeValue.max, 10);
    }
    inputResizeValue.value = totalValue + '%';
    var strScale = (totalValue / 100).toFixed(2);
    imgPreview.setAttribute('style', 'transform: scale(' + strScale + ')');
  });

  buttonResizeDec.addEventListener('click', function () {
    var totalValue = parseInt(inputResizeValue.value, 10) - parseInt(inputResizeValue.step, 10);
    if (totalValue < parseInt(inputResizeValue.min, 10)) {
      totalValue = parseInt(inputResizeValue.min, 10);
    }
    inputResizeValue.value = totalValue + '%';
    var strScale = (totalValue / 100).toFixed(2);
    imgPreview.setAttribute('style', 'transform: scale(' + strScale + ')');
  });

  var uploadOverlayKeyHandler = function (evt) {
    if ((evt.keyCode === ESCAPE_KEY_CODE) && (document.activeElement !== uploadFormDescription)) {
      uploadOverlay.classList.add('invisible');
      uploadSelectImage.classList.remove('invisible');
    }
  };

  var onUploadFormSubmit = function () {
    // проверка валидности формы
    if (uploadFormDescription.validity.valid) {
      uploadSelectImage.classList.remove('invisible');
      uploadOverlay.classList.add('invisible');
      document.removeEventListener('keydown', uploadOverlayKeyHandler);
      uploadForm.submit();
      uploadForm.reset();
    } else {
      // uploadFormDescription обводим красной рамкой
      uploadFormDescription.setAttribute('style', 'border: 3px red solid');
    }
  };
  var onUploadFormClose = function () {
    uploadSelectImage.classList.remove('invisible');
    uploadOverlay.classList.add('invisible');
    document.removeEventListener('keydown', uploadOverlayKeyHandler);
  };
  uploadFile.addEventListener('change', function () {
    uploadSelectImage.classList.add('invisible');
    uploadOverlay.classList.remove('invisible');
    document.addEventListener('keydown', uploadOverlayKeyHandler);

  });
  uploadFormCancel.addEventListener('click', function () {
    onUploadFormClose();
  });
  uploadFormCancel.addEventListener('keydown', function (evt) {
    if (isActivateEvent(evt)) {
      onUploadFormClose();
    }
  });
})();

