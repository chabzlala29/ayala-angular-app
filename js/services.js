angular.module('mallServices', ['ngResource']).
factory('Mall', function($resource){
  return $resource("http://ayala360.net/api/v1/malls?callback=JSON_CALLBACK", {}, {
    query: {method:'GET', isArray:true}
  });
}).
factory('Store', function($resource){
  return $resource('http://ayala360.net/api/v1/malls/:mallId/stores?callback=JSON_CALLBACK', {}, {
    query: {method:'GET', isArray:true}
  });
}).
factory('Event', function($resource){
  return $resource('http://ayala360.net/api/v1/malls/:mallId/events?callback=JSON_CALLBACK', {}, {
    query: {method:'GET', isArray:true}
  });
}).
factory('Promos', function($resource){
  return $resource('http://ayala360.net/api/v1/malls/:mallId/announcements?callback=JSON_CALLBACK', {}, {
    query: {method:'GET', isArray:true}
  });
}).
factory('Food', function($resource){
  return $resource('http://ayala360.net/api/v1/malls/:mallId/foods?callback=JSON_CALLBACK', {}, {
    query: {method:'GET', isArray:true}
  });
}).
factory('Category', function($resource){
  return $resource('http://ayala360.net/api/v1/categories_mobile_web', {}, {
    query: {method:'GET', isArray:true}
  });
})







