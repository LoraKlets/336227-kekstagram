'use strict';

window.gallery = (function () {

  var blockPictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var pictureArray = window.data;
  for (var i = 0; i < pictureArray.length; i++) {
    fragment.appendChild(window.picture(pictureArray[i], i));
  }

  blockPictures.appendChild(fragment);

  var pictureElements = document.querySelectorAll('a.picture');
  pictureElements.forEach(function (el) {
    el.addEventListener('click', window.preview.overlayOpenClick);
    el.addEventListener('keydown', window.preview.overlayOpenKeydown);
  });

})();

