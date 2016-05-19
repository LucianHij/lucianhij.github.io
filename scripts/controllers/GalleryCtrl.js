angular
.module('app')
.controller("GalleryCtrl", ['imageServiceInstagram', 'galleryService', 'angularGridInstance', GalleryCtrl]);

function GalleryCtrl(imageServiceInstagram, galleryService, angularGridInstance) {
  var vm  = this;
  
  vm.angularGridOptions = {
     gridWidth : 300,
     gutterSize : 10,
     refreshOnImgLoad : true
  }
 
  vm.pics = galleryService.getPhotos();

  vm.refresh = function(){
    angularGridInstance.gallery.refresh();
  }

  vm.timeConverter = function (UNIX_timestamp){
    if(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
      return time;
    } else {
      return "unknown";
    }
  }

  vm.SearchedImages = function(keyEvent, captionSearched){
    
    if(keyEvent.which === 13){
     
      for (var i = 0; i < vm.pics.length; i++)
      {
        if(vm.pics[i].caption != null){



         if(vm.pics[i].caption.text.indexOf(captionSearched) < 0)
           { 
            vm.pics.splice(i,1);
            i--;
           }
           else
           {
            console.log(vm.pics[i].caption.text);
            console.log(vm.pics.length);
           }
        }
        else
        {
          vm.pics.splice(i,1);
          i--;
        }
      }
    
    }
    
    console.log("something");
  }
  //make sure to keep a refrence of original list and create a new list refrence for scope using concat method.
  // $scope.imageList = vm.pics;
  // console.log($scope.imageList);

  // //apply search on the list base on searchTxt which can be binded to an input element
  // $scope.$watch('searchTxt', function (val) {
  //   val = val.toLowerCase();
  //   $scope.imageList = imageList.filter(function (obj) {
  //     return obj.title.toLowerCase().indexOf(val) != -1;
  //   });
  // });
  
  vm.sortByDate = function () {
     vm.pics.sort(function(a, b) {
      try{
      if(a.caption.created_time!=="" && b.caption.created_time !== "")
      return b.caption.created_time === null ? -1 : a.caption.created_time === null ? 1 : b.caption.created_time.toString().localeCompare(a.caption.created_time);
      } catch(e) {
        console.log(e);
      }
    });
  }

  vm.sortByLikes = function () {
    vm.pics.sort(function (a, b) {
      return b.likes.count - a.likes.count;
    });
  }

  vm.sortByComments = function () {
    vm.pics.sort(function (a, b) {
      return b.comments.count - a.comments.count;
    });
  }
};