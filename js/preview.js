'use strict';

window.preview = (function () {
  var ESCAPE_KEY_CODE = 27;
  
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

  var doOverlayInvisible = function (el) {
    el.classList.add('invisible');
  };
  var doOverlayVisible = function (el) {
    el.classList.remove('invisible');
  };

  doOverlayInvisible(document.querySelector('.upload-overlay'));
  galleryOverlayClose.addEventListener('keydown', function (evt) {
    if (window.isActivateEvent(evt)) {
      doOverlayInvisible(galleryOverlay);
    }
  });
  galleryOverlayClose.addEventListener('click', function () {
    doOverlayInvisible(galleryOverlay);
  });

  var onOverlayKeydown = function (evt) {
    if (evt.keyCode === ESCAPE_KEY_CODE) {
      galleryOverlay.classList.add('invisible');
      document.removeEventListener('keydown', onOverlayKeydown);
    }
  };
  var fillOverlay = function (onePicture) {
    galleryOverlay.querySelector('.gallery-overlay-image').src = onePicture.href;
    galleryOverlay.querySelector('.likes-count').textContent = onePicture.querySelector('.picture-likes').textContent;
    galleryOverlay.querySelector('.comments-count').textContent = onePicture.querySelector('.picture-comments').textContent;

  };

  return {
    overlayOpenClick: function (evt) {
      evt.preventDefault();
      fillOverlay(evt.currentTarget);
      document.addEventListener('keydown', onOverlayKeydown);
      doOverlayVisible(galleryOverlay);
    },
    overlayOpenKeydown: function (evt) {
      if (window.isActivateEvent(evt)) {
        evt.preventDefault();
        fillOverlay(evt.currentTarget);
        document.addEventListener('keydown', onOverlayKeydown);
        doOverlayVisible(galleryOverlay);
      }
    }
  };
})();


