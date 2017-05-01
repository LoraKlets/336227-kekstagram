'use strict';

(function () {
  var TOTAL_PHOTO = 25;
  var DEBOUNCE_INTERVAL = 500;
  var blockPictures = document.querySelector('.pictures');
  var fragment;
  var filtersBlock = document.querySelector('.filters');
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';
  var pictureArray = [];
  var nextNum;
  var photoNumbers = [];
  var getRandomNumber = function (minValue, maxValue) {
    return minValue + Math.floor(Math.random() * (maxValue + 1 - minValue));
  };
  var getNextPhotoNum = function (array) {
    var numPhoto = getRandomNumber(1, TOTAL_PHOTO);
    while (array.indexOf(numPhoto) > -1) {
      numPhoto = getRandomNumber(1, TOTAL_PHOTO);
    }
    return numPhoto;
  };
  var setPictureHandlers = function (elements) {
    elements.forEach(function (el) {
      el.addEventListener('click', window.preview.overlayOpenClick);
      el.addEventListener('keydown', window.preview.overlayOpenKeydown);
    });
  };
  var onLoad = function (data) {
    fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(window.renderPicture(data[i]));
      pictureArray.push(data[i]);
    }
    blockPictures.appendChild(fragment);
    
    var pictureElements = document.querySelectorAll('a.picture');
    setPictureHandlers(pictureElements);
    
    filtersBlock.classList.remove('hidden');
  };
  
  var onError = function (errorMessage) {
    var node = document.getElementById('error-block');
    
    if (node === null) {
      node = document.createElement('div');
      node.id = 'error-block';
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '18px';
      document.body.insertBefore(node, filtersBlock);
    }
    node.textContent = errorMessage;
  };
  
  window.load(URL, onLoad, onError);

  var onGalleryChange = function (filter) {
    fragment = document.createDocumentFragment();
    blockPictures.innerHTML = '';
    switch (filter) {
      case 'new': {
        photoNumbers = [];
        for (var i = 0; i < 10; i++) {
          nextNum = getNextPhotoNum(photoNumbers);
          photoNumbers.push(nextNum);
          fragment.appendChild(window.renderPicture(pictureArray[nextNum]));
        }
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
          fragment.appendChild(window.renderPicture(el));
        });
        break;
      }
      default:
      {
        pictureArray.forEach(function (el) {
          fragment.appendChild(window.renderPicture(el));
        });
      }
    }
    blockPictures.appendChild(fragment);
    var pictureElements = document.querySelectorAll('a.picture');
    setPictureHandlers(pictureElements);
  };
  
  var currentFilter;
  var lastTimeout;
  
  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
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

