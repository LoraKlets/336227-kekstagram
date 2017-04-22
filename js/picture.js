'use strict';

window.picture = (function () {
// заполнение шаблона
  var pictureTemplate = document.querySelector('#picture-template').content;
  return function (photo, numPicture) {
    var photoUnit = pictureTemplate.cloneNode(true);
    photoUnit.querySelector('.picture').href = photo.url;
    photoUnit.querySelector('img').src = photo.url;
    photoUnit.querySelector('.picture-comments').textContent = photo.comments.length;
    photoUnit.querySelector('.picture-likes').textContent = photo.likes;
    photoUnit.querySelector('.numPicture').id = numPicture;

    return photoUnit;
  };

})();
