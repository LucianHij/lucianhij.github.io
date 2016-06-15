angular
.module('app')
.controller("MapCtrl", ['imageServiceInstagram', 'galleryService', MapCtrl]);

function MapCtrl(imageServiceInstagram, galleryService, NgMap) {
  var vm = this;

  vm.pics = [];
  vm.photoPos = [];
  vm.photoList = [];
  var number;
  //console.log(vm.photoPos);

  var onLocationFound = function(data) {
    vm.photoList = data;
    number = -1;
    angular.forEach(vm.photoList, function(loc) {
      imageServiceInstagram.getPhotos(loc.id).then(onPhotos, onError); 
    });   
  };  

  var onPhotos = function(photo) {
    //console.log (photo);
   // console.log(photo.length)
    if (typeof photo !== 'undefined') {
        
        number++;
        vm.photoList[number].location = {};
        vm.photoList[number].location.latitude = photo.location.latitude;
        vm.photoList[number].location.longitude = photo.location.longitude;
        vm.photoList[number].url_small = 'https://farm'+vm.photoList[number].farm+'.staticflickr.com/'+vm.photoList[number].server+'/'+vm.photoList[number].id+'_'+vm.photoList[number].secret+'_s.jpg'
        vm.photoList[number].url_big = 'https://farm'+vm.photoList[number].farm+'.staticflickr.com/'+vm.photoList[number].server+'/'+vm.photoList[number].id+'_'+vm.photoList[number].secret+'_c.jpg'
        vm.photoList[number].original_url = 'http://flickr.com/photo.gne?id=' + vm.photoList[number].id;
        vm.photoList[number].comments = Math.floor((Math.random() * 100) + 1);
        vm.photoList[number].views = photo.views;
        vm.photoList[number].upload_date = photo.dates.taken;
        vm.photoList[number].title = photo.title._content;

        galleryService.addPhoto(vm.photoList[number]);
        
        
        var ok = 0;
        for (var i = 0; i < vm.photoPos.length; i++) {
            if(photo.location.longitude === vm.photoPos[i].location.longitude && photo.location.latitude === vm.photoPos[i].location.latitude){
              ok = 1;
            }
        };
        if(ok === 0)
          vm.photoPos.push(photo);
        
       // console.log(vm.photoList);
        // for (var i = 0; i < vm.photoPos.length; i++) {
        //     if(photo.location.longitude === vm.photoPos[i].location.longitude && photo.location.latitude === vm.photoPos[i].location.latitude){
        //       if(i%2==0)
        //       {
        //         vm.photoPos[i].location.longitude += (i+1)/100000;
        //         vm.photoPos[i].location.latitude += (i+1)/100000;
        //       }
        //       else
        //       {
        //         vm.photoPos[i].location.longitude -= (i+1)/100000;
        //         vm.photoPos[i].location.latitude -= (i+1)/100000;
        //       }
        //     }
        // };
        
        //   vm.photoPos.push(photo);

    }
  };

  var onError = function(response) {
    console.log("Error at $http GET request!");
  };

  vm.getPhotos = function(lat, lng) {
    galleryService.deleteAllPhotos();
    imageServiceInstagram.getLocations(lat, lng).then(onLocationFound, onError);
  };

  vm.saveToLS = function() {
    localStorage.setItem('photoPos', JSON.stringify(vm.photoPos));
    localStorage.setItem('photoList', JSON.stringify(vm.photoList));
  }

  vm.getFromLS = function() {
    if(localStorage.getItem("photoList") !== null) 
      vm.photoList = JSON.parse(localStorage.getItem("photoList"));

    if(localStorage.getItem("photoList") !== null) 
      galleryService.copyPhotos(JSON.parse(localStorage.getItem("photoList")));
  }
};




// angular
// .module('app')
// .controller("MapCtrl", ['imageServiceInstagram', 'galleryService', MapCtrl]);

// function MapCtrl(imageServiceInstagram, galleryService, NgMap) {
//   var vm = this;

//   vm.pics = [];
//   vm.photoPos = [];
//   vm.photoList = [];

//   //console.log(vm.photoPos);

//   var onLocationFound = function(data) {
//     vm.loc = data.data;
//     angular.forEach(vm.loc, function(loc) {
//       imageServiceInstagram.getPhotos(loc.id).then(onPhotos, onError); 
//     });   
//   };  

//   var onPhotos = function(data) {
//     if (typeof data.data !== 'undefined' && data.data.length > 0) {
//       angular.forEach(data.data, function(photo) {
//         galleryService.addPhoto(photo);
//         vm.photoList.push(photo);
        
//         for (var i = 0; i < vm.photoPos.length; i++) {
//             if(photo.location.longitude === vm.photoPos[i].location.longitude && photo.location.latitude === vm.photoPos[i].location.latitude){
//               if(i%2==0)
//               {
//                 vm.photoPos[i].location.longitude += (i+1)/100000;
//                 vm.photoPos[i].location.latitude += (i+1)/100000;
//               }
//               else
//               {
//                 vm.photoPos[i].location.longitude -= (i+1)/100000;
//                 vm.photoPos[i].location.latitude -= (i+1)/100000;
//               }
//             }
//         };
        
//           vm.photoPos.push(photo);
//       });

//     };
//   }

//   var onError = function(response) {
//     console.log("Error at $http GET request!");
//   };

//   vm.getPhotos = function(lat, lng) {
//     galleryService.deleteAllPhotos();
//     imageServiceInstagram.getLocations(lat, lng).then(onLocationFound, onError);
//   };

//   vm.saveToLS = function() {
//     localStorage.setItem('photoPos', JSON.stringify(vm.photoPos));
//     localStorage.setItem('photoList', JSON.stringify(vm.photoList));
//   }

//   vm.getFromLS = function() {
//     if(localStorage.getItem("photoPos") !== null) 
//       vm.photoPos = JSON.parse(localStorage.getItem("photoPos"));

//     if(localStorage.getItem("photoList") !== null) 
//       galleryService.copyPhotos(JSON.parse(localStorage.getItem("photoList")));
//   }
// };