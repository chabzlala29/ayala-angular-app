angular.module('mallServices', ['ngResource']).
    factory('Mall', function($resource){
  return $resource('data/malls.json', {}, {
    query: {method:'GET', isArray:true}
  });
});

angular.module('storeServices', ['ngResource']).
    factory('Store', function($resource){
  return $resource('data/:mallId/stores.json', {}, {
    query: {method:'GET', isArray:true}
  });
});



