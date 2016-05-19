angular
.module('app')
.controller('MainCtrl', ['$mdSidenav', '$mdToast', MainCtrl]);

function MainCtrl($mdSidenav, $mdToast) {

	var vm  = this;

	vm.toggleSidenav = function(menu) {
		$mdSidenav(menu).toggle();
	};

	vm.toast = function(message) {
		var toast = $mdToast.simple().content('You clicked ' + message).position('bottom right');
		$mdToast.show(toast);
	};

	vm.toggle = function(item, list) {
		var idx = list.indexOf(item);
		if (idx > -1) list.splice(idx, 1);
		else list.push(item);
	};

	vm.changeTheme = function(theme) {
		vm.theme = theme;
		$mdToast.show(
			$mdToast.simple()
			.content('Your theme is now ' + theme)
			.position('bottom right')
		);
		localStorage.setItem('theme', theme);
	};

	vm.showSR = function(param) {
		$mdToast.show(
			$mdToast.simple()
			.content('State successfully ' + param + '!')
			.position('bottom right')
		);
	}

	vm.showGP = function() {
		$mdToast.show(
			$mdToast.simple()
			.content('Here are all the photos in the area!')
			.position('bottom right')
		);
	}

	vm.showFiltered = function(param) {
		$mdToast.show(
			$mdToast.simple()
			.content('Photos filtered by ' + param + '!')
			.position('bottom right')
		);
	}	
};