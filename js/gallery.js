'use strict';

window.gallery = (function () {
  var blockPictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';
  var onLoad = function (data) {

    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(window.picture(data[i]));
    }
    blockPictures.appendChild(fragment);

    var pictureElements = document.querySelectorAll('a.picture');
    pictureElements.forEach(function (el) {
      el.addEventListener('click', window.preview.overlayOpenClick);
      el.addEventListener('keydown', window.preview.overlayOpenKeydown);
    });
  };
  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  window.load(URL, onLoad, onError);

})();

