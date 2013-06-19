angular.module('ayalamalls', ['mallServices','SharedServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'partials/home.html',   controller: HomeCtrl}).
      when('/:mallName/:mallId', {templateUrl: 'partials/mall_feature.html', controller: MallFeatureCtrl}).
      when('/:mallName/:mallId/preferences', {templateUrl: 'partials/prefs.html', controller: PrefsCtrl}).
      when('/:mallName/:mallId/favorites', {templateUrl: 'partials/favorites.html', controller: FavoritesCtrl}).
      when('/:mallName/:mallId/stores', {templateUrl: 'partials/stores.html', controller: StoresCtrl}).
      when('/:mallName/:mallId/stores/:storeId', {templateUrl: 'partials/store_details.html', controller: StoreDetailsCtrl}).
      when('/:mallName/:mallId/events', {templateUrl: 'partials/events.html', controller: EventsCtrl}).
      when('/:mallName/:mallId/events/:eventId/event-details', {templateUrl: 'partials/event_details.html', controller: EventDetailsCtrl}).
      when('/:mallName/:mallId/promos', {templateUrl: 'partials/promos.html', controller: PromosCtrl}).
      when('/:mallName/:mallId/promos/:promoId/promo-details', {templateUrl: 'partials/promo_details.html', controller: PromoDetailsCtrl}).
      when('/:mallName/:mallId/food', {templateUrl: 'partials/food.html', controller: FoodCtrl}).
      when('/:mallName/:mallId/food/:storeId/store-details', {templateUrl: 'partials/food_details.html', controller: FoodDetailsCtrl}).
      when('/:mallName/:mallId/mall-information', {templateUrl: 'partials/mall_info.html', controller: MallFeatureCtrl}).
      when('/:mallName/:mallId/mall-location', {templateUrl: 'partials/mall_location.html', controller: MallFeatureCtrl}).
      when('/:mallName/:mallId/:mallCode/cinemas', {templateUrl: 'partials/cinemas.html', controller: CinemasCtrl}).
      when('/:mallName/:mallId/:mallCode/cinemas/:movieTitle', {templateUrl: 'partials/movie_details.html', controller: MovieDetailsCtrl}).
      when('/registration', {templateUrl: 'partials/registration.html', controller: RegistrationCtrl}).
      when('/login', {templateUrl: 'partials/login.html', controller: LoginCtrl}).
      otherwise({redirectTo: '/'});
}]);

