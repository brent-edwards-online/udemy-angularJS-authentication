(function() {
  'use strict'

  angular
  .module('authApp')
  .directive('toolbar', toolbar);

  function toolbar(){
    return {
      templateUrl: 'components/toolbar/toolbar.tpl.html',
      controller: toolbarController,
      controllerAs: 'toolbar'
    }
  }

  function toolbarController(auth, store, $location){
    var vm = this;
    vm.login = login;
    vm.logout = logout;
    vm.auth = auth;

    function login(){
      auth.signin({}, function(profile, token){
        store.set('profile', profile);
        store.set('token', token);
        $location.path('/home');
      }, function(error){
        console.log(error);
      });
    }

    function logout(){
      store.remove('profile');
      store.remove('token');
      auth.signout();
      $location.path('/home');
    }
    
  }


})();