app.service('galleryService', function() {
  var photoList = [];

  var addPhoto = function(newPhoto) {
      photoList.unshift(newPhoto);
  };

  var getPhotos = function(){
    return photoList;
  };

  var deleteAllPhotos = function(){
    photoList = [];
  };

  var copyPhotos = function(photos) {
    photoList = photos;
  }

  return {
    copyPhotos: copyPhotos,
    addPhoto: addPhoto,
    getPhotos: getPhotos,
    deleteAllPhotos: deleteAllPhotos
  };
});