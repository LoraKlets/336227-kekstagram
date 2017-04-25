'use strict';

window.gallery = (function () {
  var TWENTY_FIVE = 25;

  var blockPictures = document.querySelector('.pictures');
  var fragment;
  var filtersBlock = document.querySelector('.filters');
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';
  var pictureArray = [];
  var nextNum;
  var photoNumbers = [];
  var randomNumber = function (MIN, MAX) {
    return MIN + Math.floor(Math.random() * (MAX + 1 - MIN));
  };
  var isPhotoInArray = function (array, num) {
    return array.indexOf(num);
  };
  var nextPhotoNum = function (array) {
    var numPhoto = randomNumber(1, TWENTY_FIVE);
    while (isPhotoInArray(array, numPhoto) > -1) {
      numPhoto = randomNumber(1, TWENTY_FIVE);
    }
    return numPhoto;
  };
  var onLoad = function (data) {
    fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(window.picture(data[i]));
      pictureArray.push(data[i]);
    }
    blockPictures.appendChild(fragment);

    var pictureElements = document.querySelectorAll('a.picture');
    pictureElements.forEach(function (el) {
      el.addEventListener('click', window.preview.overlayOpenClick);
      el.addEventListener('keydown', window.preview.overlayOpenKeydown);
    });
    filtersBlock.classList.remove('hidden');
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

  var onGalleryChange = function (filter) {
    fragment = document.createDocumentFragment();
    blockPictures.innerHTML = '';
    switch (filter) {
      case 'new': {
        photoNumbers = [];
        for (var i = 0; i < 10; i++) {
          nextNum = nextPhotoNum(photoNumbers);
          photoNumbers.push(nextNum);
          fragment.appendChild(window.picture(pictureArray[nextNum]));
        }
        blockPictures.appendChild(fragment);
        break;
      }
      case 'discussed': {
        var sortPictures = pictureArray.slice();
        sortPictures.sort(function (first, second) {
          if (first.comments.length > second.comments.length) {
            return -1;
          } else {
            if (first.comments.length < second.comments.length) {
              return 1;
            } else {
              return 0;
            }
          }
        });
        sortPictures.forEach(function (el) {
          fragment.appendChild(window.picture(el));
        });
        blockPictures.appendChild(fragment);
        break;
      }
      default: {
        pictureArray.forEach(function (el) {
          fragment.appendChild(window.picture(el));
        });
        blockPictures.appendChild(fragment);
      }
    }
  };
  var currentFilter;
  var lastTimeout;
  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, 500);
  };
  filtersBlock.addEventListener('click', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'input') {
      currentFilter = evt.target.value;
      debounce(function () {
        onGalleryChange(currentFilter);
      });
    }
  });
})();

