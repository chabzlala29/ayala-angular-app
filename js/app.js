angular.module('ayalamalls', ['mallServices', 'storeServices', 'eventServices', 'foodServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'partials/home.html',   controller: HomeCtrl}).
      when('/:mallName/:mallId', {templateUrl: 'partials/mall_feature.html',   controller: MallFeatureCtrl}).
      when('/:mallName/:mallId/stores', {templateUrl: 'partials/stores.html', controller: StoresCtrl}).
      when('/mall_feature/:mallId/stores/:storeIndex', {templateUrl: 'partials/store_details.html', controller: StoreDetailsCtrl}).
      when('/:mallName/:mallId/events', {templateUrl: 'partials/events.html', controller: EventsCtrl}).
      when('/:mallName/:mallId/food', {templateUrl: 'partials/food.html', controller: FoodCtrl}).
      otherwise({redirectTo: '/'});
}]);

