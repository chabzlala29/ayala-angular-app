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
});

angular.module('SharedServices', [])
    .config(function ($httpProvider) {
        $httpProvider.responseInterceptors.push('myHttpInterceptor');
        var spinnerFunction = function (data, headersGetter) {
            // todo start the spinner here
            $('#loading').show();
            return data;
        };
        $httpProvider.defaults.transformRequest.push(spinnerFunction);
    })

    .factory('myHttpInterceptor', function ($q, $window) {
        return function (promise) {
            return promise.then(function (response) {
                // do something on success
                // todo hide the spinner
                $('#loading').hide();
                $('.black_overlay').fadeOut('slow');
                return response;

            }, function (response) {
                // do something on error
                // todo hide the spinner
                $('#loading').hide();
                $('.black_overlay').fadeOut('slow');
                return $q.reject(response);
            });
        };
    })




