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
  vm.pics.ascunde = false;

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

  vm.PredominantColor = function() {
  var img = document.createElement('img');
  console.log("ceva1");
  img.setAttribute('src', vm.pics[1].url_big);
console.log("ceva2");
  img.addEventListener('load', function() {
    console.log("ceva3");
    var vibrant = new Vibrant(img);
    console.log("ceva3'");
    var swatches = vibrant.swatches();
    console.log("ceva4");
    for (var swatch in swatches)
        if (swatches.hasOwnProperty(swatch) && swatches[swatch])
        {
          console.log("ceva5");
            console.log(swatch, swatches[swatch].getHex());
        }
    /*
     * Results into:
     * Vibrant #7a4426
     * Muted #7b9eae
     * DarkVibrant #348945
     * DarkMuted #141414
     * LightVibrant #f3ccb4
     */
  });

}
  vm.SearchedImages = function(keyEvent, captionSearched){
    
    var ordine = 0;
    var aux;
      for (var i = 0; i < vm.pics.length; i++)
      {
        vm.pics[i].ascunde = false;
        if(vm.pics[i].title != null){



         if(vm.pics[i].title.indexOf(captionSearched) < 0)
           { 
            vm.pics[i].ascunde = true;
            console.log(vm.pics[i].ascunde);
           }
           else
           {
            vm.pics[i].ascunde = false;
            aux = vm.pics[i];
            vm.pics[i] = vm.pics[ordine];
            vm.pics[ordine] = aux;
            ordine++;
           }
        }
        else
        {
          vm.pics[i].ascunde = true;
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
      if(a.upload_date!=="" && b.upload_date !== "")
      return b.upload_date === null ? -1 : a.upload_date === null ? 1 : b.upload_date.toString().localeCompare(a.upload_date);
      } catch(e) {
        console.log(e);
      }
    });
  }

  vm.sortByLikes = function () {
    vm.pics.sort(function (a, b) {
      return b.views - a.views;
    });
  }

  vm.sortByComments = function () {
    vm.pics.sort(function (a, b) {
      return b.comments - a.comments;
    });
  }
};