'use strict';

var randomNumber = function (MIN, MAX) {
  return MIN + Math.floor(Math.random() * (MAX + 1 - MIN));
};
var photoNumbers = [];
var COMMENT_STRINGS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var isPhotoInArray = function (array, num) {
  return array.indexOf(num);
};

var pictureArray = [];
for (var i = 0; i < 25; i++) {
  var picture = {};

  var numPhoto = randomNumber(1, 25);
  while (isPhotoInArray(photoNumbers, numPhoto) > -1) {
    numPhoto = randomNumber(1, 25);
  }
  photoNumbers.push(numPhoto);
  picture.url = 'photos/' + numPhoto + '.jpg';
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

var pictureTemplate = document.querySelector('#picture-template').content;
var fillTemplate = function (photo) {
  var photoUnit = pictureTemplate.cloneNode(true);
  photoUnit.querySelector('.picture').href = photo.url;
  photoUnit.querySelector('.picture-comments').textContent = photo.comments;
  photoUnit.querySelector('.picture-likes').textContent = photo.likes;
  return photoUnit;
};
var blockPictures = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
for (i = 0; i < pictureArray.length; i++) {
  fragment.appendChild(fillTemplate(pictureArray[i]));
}
blockPictures.appendChild(fragment);

document.querySelector('.upload-overlay').classList.add('invisible');

var galleryOverlay = document.querySelector('.gallery-overlay');

galleryOverlay.querySelector('.gallery-overlay-image').src = pictureArray[0].url;
galleryOverlay.querySelector('.likes-count').textContent = pictureArray[0].likes;
galleryOverlay.querySelector('.comments-count').textContent = pictureArray[0].comments.length;
galleryOverlay.classList.remove('invisible');
