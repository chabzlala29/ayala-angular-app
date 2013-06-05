angular.module('mallServices', ['ngResource']).
    factory('Mall', function($resource){
  return $resource('data/malls.json', {}, {
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







