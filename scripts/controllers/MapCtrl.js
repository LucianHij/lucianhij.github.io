angular
.module('app')
.controller("MapCtrl", ['imageServiceInstagram', 'galleryService', MapCtrl]);

function MapCtrl(imageServiceInstagram, galleryService, NgMap) {
  var vm = this;

  vm.pics = [];
  vm.photoPos = [];
  vm.photoList = [];

  //console.log(vm.photoPos);

  var onLocationFound = function(data) {
    vm.loc = data.data;
    angular.forEach(vm.loc, function(loc) {
      imageServiceInstagram.getPhotos(loc.id).then(onPhotos, onError); 
    });   
  };  

  var onPhotos = function(data) {
    if (typeof data.data !== 'undefined' && data.data.length > 0) {
      angular.forEach(data.data, function(photo) {
        galleryService.addPhoto(photo);
        vm.photoList.push(photo);
        
        var ok = 0;
        for (var i = 0; i < vm.photoPos.length; i++) {
            if(photo.location.longitude === vm.photoPos[i].location.longitude && photo.location.latitude === vm.photoPos[i].location.latitude){
              ok = 1;
            }
        };
        if(ok === 0)
          vm.photoPos.push(photo);
        
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
      });

    };
  }

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
    if(localStorage.getItem("photoPos") !== null) 
      vm.photoPos = JSON.parse(localStorage.getItem("photoPos"));

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