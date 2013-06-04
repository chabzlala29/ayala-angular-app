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

angular.module('eventServices', ['ngResource']).
    factory('Event', function($resource){
  return $resource('data/:mallId/events.json', {}, {
    query: {method:'GET', isArray:true}
  });
});

angular.module('foodServices', ['ngResource']).
    factory('Food', function($resource){
  return $resource('data/:mallId/foods.json', {}, {
    query: {method:'GET', isArray:true}
  });
});




