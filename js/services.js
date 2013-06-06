angular.module('mallServices', ['ngResource']).
factory('Mall', function($resource){
  return $resource("http://ayala360.net/api/v1/malls?callback=JSON_CALLBACK", {}, {
    query: {method:'GET', isArray:true}
  });
}).
factory('Store', function($resource){
  return $resource('data/:mallId/stores.json', {}, {
    query: {method:'GET', isArray:true}
  });
}).
factory('Event', function($resource){
  return $resource('data/:mallId/events.json', {}, {
    query: {method:'GET', isArray:true}
  });
}).
factory('Promos', function($resource){
  return $resource('data/:mallId/promos.json', {}, {
    query: {method:'GET', isArray:true}
  });
}).
factory('Food', function($resource){
  return $resource('data/:mallId/foods.json', {}, {
    query: {method:'GET', isArray:true}
  });
}).
factory('Category', function($resource){
  return $resource('data/categories.json', {}, {
    query: {method:'GET', isArray:true}
  });
});







