'use strict';

var ESCAPE_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;
var TWENTY_FIVE = 25;
var nextNum;
var photoNumbers = [];
var pictureArray = [];
var COMMENT_STRINGS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var isActivateEvent = function (evt) {
  return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
};

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

for (var i = 0; i < TWENTY_FIVE; i++) {
  var picture = {};
  nextNum = nextPhotoNum(photoNumbers);
  photoNumbers.push(nextNum);
  picture.url = 'photos/' + nextNum + '.jpg';
  picture.likes = randomNumber(15, 200);
  picture.comments = [];
  var randomIndexComment = randomNumber(0, COMMENT_STRINGS.length - 1);
  picture.comments.push(COMMENT_STRINGS[randomIndexComment]);
  var numberComments = randomNumber(1, 2);
  if (numberComments > 1) {
    var currentIndex = randomIndexComment;
    while (currentIndex === randomIndexComment) {
      currentIndex = randomNumber(0, COMMENT_STRINGS.length - 1);
    }
    picture.comments.push(COMMENT_STRINGS[currentIndex]);
  }
  pictureArray.push(picture);
}
// заполнение шаблона
var pictureTemplate = document.querySelector('#picture-template').content;
var fillTemplate = function (photo, numPicture) {
  var photoUnit = pictureTemplate.cloneNode(true);
  photoUnit.querySelector('.picture').href = photo.url;
  photoUnit.querySelector('img').src = photo.url;
  photoUnit.querySelector('.picture-comments').textContent = photo.comments.length;
  photoUnit.querySelector('.picture-likes').textContent = photo.likes;
  photoUnit.querySelector('.numPicture').id = numPicture;

  return photoUnit;
};
var doOverlayInvisible = function (el) {
  el.classList.add('invisible');
};
var doOverlayVisible = function (el) {
  el.classList.remove('invisible');
};
var blockPictures = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
for (i = 0; i < pictureArray.length; i++) {
  fragment.appendChild(fillTemplate(pictureArray[i], i));
}
blockPictures.appendChild(fragment);
doOverlayInvisible(document.querySelector('.upload-overlay'));

var galleryOverlay = document.querySelector('.gallery-overlay');

var renderOverlay = function (onePicture) {
  galleryOverlay.querySelector('.gallery-overlay-image').src = onePicture.url;
  galleryOverlay.querySelector('.likes-count').textContent = onePicture.likes;
  galleryOverlay.querySelector('.comments-count').textContent = onePicture.comments.length;

};
var pictureElements = document.querySelectorAll('a.picture');

var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

var overlayKeydownHandler = function (evt) {
  if (evt.keyCode === ESCAPE_KEY_CODE) {
    galleryOverlay.classList.add('invisible');
    document.removeEventListener('keydown', overlayKeydownHandler);
  }
};
var onOverlayOpen = function (el) {
  var num = el.querySelector('.numPicture').id;
  renderOverlay(pictureArray[num]);
  doOverlayVisible(galleryOverlay);
};

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

galleryOverlayClose.addEventListener('keydown', function (evt) {
  if (isActivateEvent(evt)) {
    doOverlayInvisible(galleryOverlay);
  }
});
galleryOverlayClose.addEventListener('click', function () {
  doOverlayInvisible(galleryOverlay);
});
var uploadForm = document.querySelector('.upload-form');
var uploadFile = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadSelectImage = document.querySelector('#upload-select-image');
var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
var uploadFormDescription = uploadOverlay.querySelector('.upload-form-description');

var uploadOverlayKeyHandler = function (evt) {
  if ((evt.keyCode === ESCAPE_KEY_CODE) && (document.activeElement !== uploadFormDescription)) {
    uploadOverlay.classList.add('invisible');
    uploadSelectImage.classList.remove('invisible');
  }
};
var onUploadFormClose = function () {
  // проверка валидности формы
  if (uploadFormDescription.validity.valid) {
    uploadSelectImage.classList.remove('invisible');
    uploadOverlay.classList.add('invisible');
    document.removeEventListener('keydown', uploadOverlayKeyHandler);
  } else {
    console.log(uploadFormDescription.validationMessage);
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
}
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

var uploadFilterControls = document.querySelector('.upload-filter-controls');
var divPreview = document.querySelector('.upload-form-preview');
var imgPreview = divPreview.querySelector('.filter-image-preview');
var uploadResizeControls = uploadOverlay.querySelector('.upload-resize-controls');
var buttonResizeDec = uploadResizeControls.querySelector('.upload-resize-controls-button-dec');
var buttonResizeInc = uploadResizeControls.querySelector('.upload-resize-controls-button-inc');
var inputResizeValue = uploadResizeControls.querySelector('.upload-resize-controls-value');

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
var getinputResizeValue = function () {
  var valueNumber = inputResizeValue.value;
  var posPercent = valueNumber.indexOf('%');
  if (posPercent > -1) {
    valueNumber = inputResizeValue.value.slice(0, posPercent);
  }
  return valueNumber;
};
buttonResizeInc.addEventListener('click', function () {
  var totalValue = +getinputResizeValue() + (+inputResizeValue.step);
  if (totalValue > inputResizeValue.max) {
    totalValue = inputResizeValue.max;
  }
  inputResizeValue.value = totalValue + '%';
  var strScale = (totalValue / 100).toFixed(2);
  imgPreview.setAttribute('style', 'transform: scale(' + strScale + ')');
});

buttonResizeDec.addEventListener('click', function () {
  var totalValue = +getinputResizeValue() - (+inputResizeValue.step);
  if (totalValue < inputResizeValue.min) {
    totalValue = inputResizeValue.min;
  }
  inputResizeValue.value = totalValue + '%';
  var strScale = (totalValue / 100).toFixed(2);
  imgPreview.setAttribute('style', 'transform: scale(' + strScale + ')');
});
