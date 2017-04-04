'use strict';
var TWENTY_FIVE = 25;
var nextNum;
var photoNumbers = [];
var COMMENT_STRINGS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
];
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
var pictureArray = [];
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
var fillTemplate = function (photo) {
  var photoUnit = pictureTemplate.cloneNode(true);
  photoUnit.querySelector('.picture').href = photo.url;
  photoUnit.querySelector('.picture-comments').textContent = photo.comments;
  photoUnit.querySelector('.picture-likes').textContent = photo.likes;
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
  fragment.appendChild(fillTemplate(pictureArray[i]));
}
blockPictures.appendChild(fragment);
doOverlayInvisible(document.querySelector('.upload-overlay'));

var galleryOverlay = document.querySelector('.gallery-overlay');
var renderOverlay = function (picture) {
  galleryOverlay.querySelector('.gallery-overlay-image').src = picture.url;
  galleryOverlay.querySelector('.likes-count').textContent = picture.likes;
  galleryOverlay.querySelector('.comments-count').textContent = picture.comments.length;
};
renderOverlay(pictureArray[0]);
doOverlayVisible(galleryOverlay);
