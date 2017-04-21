'use strict';

window.gallery = (function () {
  var ESCAPE_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;
  var isActivateEvent = function (evt) {
    return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
  };
  var blockPictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var pictureArray = window.data;
  for (var i = 0; i < pictureArray.length; i++) {
    fragment.appendChild(window.picture(pictureArray[i], i));
  }
  blockPictures.appendChild(fragment);

  var galleryOverlay = document.querySelector('.gallery-overlay');
  var doOverlayInvisible = function (el) {
    el.classList.add('invisible');
  };
  var doOverlayVisible = function (el) {
    el.classList.remove('invisible');
  };
  doOverlayInvisible(document.querySelector('.upload-overlay'));

  var pictureElements = document.querySelectorAll('a.picture');

  for (i = 0; i < pictureElements.length; i++) {
    pictureElements[i].addEventListener('click', function (evt) {
      evt.preventDefault();
      onOverlayOpen(evt.currentTarget);
      document.addEventListener('keydown', overlayKeydownHandler);
    });
    pictureElements[i].addEventListener('keydown', function (evt) {
      if (isActivateEvent(evt)) {
        evt.preventDefault();
        onOverlayOpen(evt.currentTarget);
        document.addEventListener('keydown', overlayKeydownHandler);
      }
    });
  }
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

  galleryOverlayClose.addEventListener('keydown', function (evt) {
    if (isActivateEvent(evt)) {
      doOverlayInvisible(galleryOverlay);
    }
  });
  galleryOverlayClose.addEventListener('click', function () {
    doOverlayInvisible(galleryOverlay);
  });
  var overlayKeydownHandler = function (evt) {
    if (evt.keyCode === ESCAPE_KEY_CODE) {
      galleryOverlay.classList.add('invisible');
      document.removeEventListener('keydown', overlayKeydownHandler);
    }
  };
  var onOverlayOpen = function (el) {
    var num = el.querySelector('.numPicture').id;
    window.preview(pictureArray[num]);
    doOverlayVisible(galleryOverlay);
  };

})();

