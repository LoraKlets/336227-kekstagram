'use strict';
window.formEdit = (function () {

  var ESCAPE_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;
  var uploadFilterControls = document.querySelector('.upload-filter-controls');
  var uploadOverlay = document.querySelector('.upload-overlay ');
  var divPreview = document.querySelector('.upload-form-preview');
  var imgPreview = divPreview.querySelector('.filter-image-preview');

  var uploadFormDescription = uploadOverlay.querySelector('.upload-form-description');
  var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');

  var uploadForm = document.querySelector('.upload-form');
  var uploadFile = document.querySelector('#upload-file');
  var uploadSelectImage = document.querySelector('#upload-select-image');


  var isActivateEvent = function (evt) {
    return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
  };

  var filterLevelLine = uploadFilterControls.querySelector('.upload-filter-level-line');
  var filterPin = uploadFilterControls.querySelector('.upload-filter-level-pin');
  var filterVal = uploadFilterControls.querySelector('.upload-filter-level-val');

  var MAX_LEFT = 450;

  filterPin.style.left = MAX_LEFT + 'px';
  filterLevelLine.classList.add('invisible');
  filterVal.style.width = MAX_LEFT + 'px';


  filterPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startX - moveEvt.clientX;

      startX = moveEvt.clientX;

      filterPin.style.left = (filterPin.offsetLeft - shiftX) + 'px';
      if (parseInt(filterPin.style.left, 10) > MAX_LEFT) {
        filterPin.style.left = MAX_LEFT + 'px';
      }
      if (parseInt(filterPin.style.left, 10) < 0) {
        filterPin.style.left = 0 + 'px';
      }
      filterVal.style.width = (filterPin.offsetLeft - shiftX) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      var currentClass = imgPreview.classList[1];
      var filterValue;
      switch (currentClass) {
        case 'filter-chrome': {
          filterValue = (parseInt(filterVal.style.width, 10) / MAX_LEFT).toFixed(1);
          imgPreview.style.filter = 'grayscale(' + filterValue + ')';
          imgPreview.setAttribute('style', '-webkit-filter: grayscale(' + filterValue + ');');
          break;
        }
        case 'filter-sepia': {
          filterValue = (parseInt(filterVal.style.width, 10) / MAX_LEFT).toFixed(1);
          imgPreview.style.filter = 'sepia(' + filterValue + ')';
          imgPreview.setAttribute('style', '-webkit-filter: sepia(' + filterValue + ');');
          break;
        }
        case 'filter-marvin': {
          filterValue = (parseInt(filterVal.style.width, 10) / MAX_LEFT).toFixed(1) * 100;
          imgPreview.style.filter = 'invert(' + filterValue + '%)';
          imgPreview.setAttribute('style', '-webkit-filter: invert(' + filterValue + '%);');
          break;
        }
        case 'filter-phobos': {
          filterValue = Math.floor(parseInt(filterVal.style.width, 10) / 114);
          imgPreview.style.filter = 'blur(' + filterValue + 'px)';
          imgPreview.setAttribute('style', '-webkit-filter: blur(' + filterValue + 'px);');
          break;
        }
        case 'filter-heat': {
          filterValue = Math.floor(parseInt(filterVal.style.width, 10) / 114);
          imgPreview.style.filter = 'brightness(' + filterValue + ')';
          imgPreview.setAttribute('style', '-webkit-filter: brightness(' + filterValue + ');');
          break;
        }
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  var pictureElement = document.querySelector('.filter-image-preview');
  var applyFilter = function (newFilter, oldFilter) {
    pictureElement.classList.remove('filter-' + oldFilter);
    pictureElement.classList.add('filter-' + newFilter);
    if (newFilter === 'none') {
      filterLevelLine.classList.add('invisible');
    } else {
      filterLevelLine.classList.remove('invisible');
    }
    filterPin.style.left = MAX_LEFT + 'px';
    filterVal.style.width = MAX_LEFT + 'px';
    pictureElement.style.filter = '';
  };

  var oldFilter = uploadFilterControls.querySelector('input[name=upload-filter]:checked').value;
  uploadFilterControls.addEventListener('click', function (evt) {
    var selectedFilter = evt.target.tagName;
    if (selectedFilter.toLowerCase() === 'input') {
      var selectedElement = evt.target;
      var newFilter = selectedElement.value;
      window.initializeFilters(selectedElement, oldFilter, applyFilter);
      oldFilter = newFilter;
    }
  });

  var scaleElement = document.querySelector('.upload-resize-controls');

  var adjustScale = function (scale) {
    pictureElement.style.transform = 'scale(' + scale / 100 + ')';
  };
  window.initializeScale(scaleElement, adjustScale);

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

