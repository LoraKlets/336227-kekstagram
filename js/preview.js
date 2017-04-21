'use strict';

window.preview = (function () {

  var galleryOverlay = document.querySelector('.gallery-overlay');

  return function (onePicture) {
    galleryOverlay.querySelector('.gallery-overlay-image').src = onePicture.url;
    galleryOverlay.querySelector('.likes-count').textContent = onePicture.likes;
    galleryOverlay.querySelector('.comments-count').textContent = onePicture.comments.length;

    return galleryOverlay;
  };

})();


