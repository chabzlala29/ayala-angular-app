//GLOBAL VARS
document.token = '';
document.site_url = 'http://localhost/ayala-mall-angular(2)';

function HomeCtrl($scope,$http, Mall) {
    delete $http.defaults.headers.common['X-Requested-With'];
    
    $scope.malls = Mall.query();
 	$scope.title = 'Ayala Malls'
 	$scope.orderProp = 'position';
}
function LoginCtrl($scope, $http, $routeParams) {
	delete $http.defaults.headers.common['X-Requested-With'];
	$scope.loginEmail = function(){
		$.ajax({
			type: 'GET',
			url: 'http://ayala360.net/api/v1/profile/web_login?email='+$('#email_address').val()+'&callback=JSON_CALLBACK',
			success: function(data){
				// $.ajax({
				// 	type: 'GET',
				// 	url: document.site_url + '/php/sessions.php?action=token&token=' + data.token,
				// 	success: function(data){
						// document.token = data.token;
						sessionStorage.token = data.token;
						alert('Successfully logged in. You will now be redirected to Mall Lists.');
						window.location.href = '#/home';
				// 	}
				// });
			},
			error: function(){
				alert('Email not registered. You must sign up first');
			}
		});
	}	
}
function RegistrationCtrl($scope, $http) {
	delete $http.defaults.headers.common['X-Requested-With'];

	$scope.register = function() {
		$.ajax({
			type:'POST',
			url: 'http://ayala360.net/api/v1/profile?callback=JSON_CALLBACK',
			data:$('#registration').serialize(),
			success: function(response) {
				if(typeof response =='object'){
					// document.token = response.token;
					// $.ajax({
					// 	type: 'GET',
					// 	url: document.site_url +'/php/sessions.php?action=token&token=' + document.token,
					// 	success: function(){
							document.location = '#/login';
							alert("Successfully registered. Please login with your email.");
					// 	}
					// });
				}else{
					alert("The email is already been taken. Please try another one.")
				}
	        }
	    });

	    return false;
	} 
}
function FavoritesCtrl($scope, $http, $routeParams, Favorites) {
	delete $http.defaults.headers.common['X-Requested-With'];
	$scope.mall_name = $routeParams.mallName;
	$scope.mall_id = $routeParams.mallId;
	$scope.favorites = [];
	$http.get('http://ayala360.net/api/v1/favorites?token='+ sessionStorage.token +'&callback=JSON_CALLBACK').success(function(data){
		
		$scope.favorites = data;
	});
   
}
function PrefsCtrl($scope, $routeParams, $http) {
	delete $http.defaults.headers.common['X-Requested-With'];

	$scope.mall_name = $routeParams.mallName;
	$scope.mall_id = $routeParams.mallId;

	$('input[name=gender]').click(function($scope){
		if ($('#gender_male').attr('checked')=='checked') {
			$('#gender_value').html("Male");
		}
		else {
			$('#gender_value').html("Female");
		}
	});

	$http.get('http://ayala360.net/api/v1/profile/web_login?token='+sessionStorage.token+'&callback=JSON_CALLBACK').success(function(data) {
		if(data.gender == 0) {
			$('#gender_female').attr('checked', 'checked'); $('#gender_value').html('Female');
		}
		else {
			$('#gender_male').attr('checked', 'checked'); $('#gender_value').html('Male');
		}

		if (data.age == '1') { $('#under_18').attr('selected', 'selected'); }
		else if (data.age == '2') { $('#18-22').attr('selected', 'selected'); }
		else if (data.age == '3') { $('#23-27').attr('selected', 'selected'); }
		else if (data.age == '4') { $('#28-32').attr('selected', 'selected'); }
		else if (data.age == '5') { $('#33-37').attr('selected', 'selected'); }
		else if (data.age == '6') { $('#38-42').attr('selected', 'selected'); }
		else if (data.age == '7') { $('#43-47').attr('selected', 'selected'); }
		else if (data.age == '8') { $('#48-52').attr('selected', 'selected'); }
		else if (data.age == '9') { $('#53-57').attr('selected', 'selected'); }
		else if (data.age == '10') { $('#58-62').attr('selected', 'selected'); }
		else if (data.age == '11') { $('#63_above').attr('selected', 'selected'); }

		$scope.email_address = data.email;
	});

	$('#btn-edit-prefs').click(function() {
		$('#prefs-form').submit();
	});

	$scope.editPrefs = function() {
		$.ajax({
			type:'POST',
			url: 'http://ayala360.net/api/v1/profile?web_login?token='+sessionStorage.token+'&callback=JSON_CALLBACK',
			data:$('#prefs-form').serialize(),
			success: function(response) {
				if(typeof response =='object'){
					// document.location = '#/'+$routeParams.mallName+'/'+$routeParams.mallName+'/preferences';
					alert("Successfully edited");
				}else{
					alert("The email is already been taken. Please try another one.")
				}
	        }
	    });

	    return false;
	}
}
function MallFeatureCtrl($scope, $routeParams, $http) {
	delete $http.defaults.headers.common['X-Requested-With'];

  	$http.get('http://ayala360.net/api/v1/malls?callback=JSON_CALLBACK').success(function(data) {
	  	$.each(data,function(x){
	  		if(data[x].id == $routeParams.mallId){
	  			$scope.mall_name = data[x].name;
	  			$scope.mall_id = data[x].id;
	  			$scope.mall_code = data[x].tcode;
	  			$scope.logo_url = data[x].logo_url;
	  			$scope.photo_url = data[x].photo_url;
	  			$scope.phone_number = data[x].phone_number;
	  			$scope.email = data[x].email;
	  			$scope.coordn8s = data[x].coordinates;
	  			showMap($scope.coordn8s);
	  		}
	  	})
  	});
}
function showMap(coordn8s) {
	coords = coordn8s;
	coordinates = coords.split(",");

	var mapOptions = {
	  zoom: 16,
	  center: new google.maps.LatLng(parseFloat(coordinates[0]),parseFloat(coordinates[1])),
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

	var myLatLng = new google.maps.LatLng(parseFloat(coordinates[0]),parseFloat(coordinates[1]));
	var beachMarker = new google.maps.Marker({
	    position: myLatLng,
	    map: map,
	    animation:google.maps.Animation.BOUNCE
	});
}
function StoresCtrl($scope, $routeParams, $http, Store, Category){
	delete $http.defaults.headers.common['X-Requested-With'];

	$scope.alphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	$scope.stores = Store.query({mallId: $routeParams.mallId});
	$scope.mall_name = $routeParams.mallName;
	$scope.mall_id = $routeParams.mallId;
	$scope.query_category = '';

	$scope.categories = Category.query();

	$scope.myFilter = function(letter){
		var $array = new Array();
		if(letter){
			$.each($scope.stores, function(index){
				if(($scope.stores[index].store_name[0] == letter) || ($scope.stores[index].store_name[0] == letter.toLowerCase())){
					$array.push($scope.stores[index]);
				}
			});
		}
		return $array;
	}

	$scope.changeCat = function(category){
		$scope.query_category = category;
	}

	$scope.myQuery = function(){
		$array2 = new Array();
		
		if($scope.query_category){
			console.log($scope.stores[0]);
			$.each($scope.stores, function(index, item){
				if(typeof item.categories[0] != 'undefined') {
					if(item.categories[0].name == $scope.query_category){
						$array2.push(item.store_name);
					}
				}
			});
		}
		return $array2;
	}	
}
function StoreDetailsCtrl($scope, $routeParams, $http, StoreDetails){
	delete $http.defaults.headers.common['X-Requested-With'];
	$scope.mall_name = $routeParams.mallName;
	$scope.mall_id = $routeParams.mallId;
	$scope.store_id = $routeParams.storeId;
	$store_details = StoreDetails.query({storeId: $routeParams.storeId});
	$http.get('http://ayala360.net/api/v1/stores/'+ $routeParams.storeId+'&callback=JSON_CALLBACK').success(function(data) {
		$scope.location = 'Located on ' + data.location + '. ' + data.contact;
		$scope.name = data.store_name;
		$scope.details = data.description;
	});

	$scope.addToFavorites = function(){
		$.ajax({
			type:'POST',
			url: 'http://ayala360.net/api/v1/favorites?store_location_id=' + $routeParams.storeId + '&token='+ sessionStorage.token +'&callback=JSON_CALLBACK',
			data:$('#registration').serialize(),
			success: function(response) {
				alert('You successfully added this '+ $scope.name + ' to your favorite list.')
	        }
	    });
	}
	
}
function EventsCtrl($scope, $routeParams, $http, Event){
	delete $http.defaults.headers.common['X-Requested-With'];

	$scope.mall_name = $routeParams.mallName;
	$scope.mall_id = $routeParams.mallId;
	$scope.events = Event.query({mallId: $routeParams.mallId});
}
function EventDetailsCtrl($scope, $routeParams, $http) {
	delete $http.defaults.headers.common['X-Requested-With'];

	$scope.mall_id = $routeParams.mallId;
	$scope.mall_name = $routeParams.mallName;
	$http.get('data/' + $routeParams.mallId + '/events.json').success(function(data) {
		$.each(data, function(index, e) {
			if (e.id == $routeParams.eventId) {
				$scope.advert_url = e.advert_url;
				$scope.event_title = e.headline;
				$scope.details = e.description;
				$scope.starts_at = dateFormat(e.starts_at, 'mmm dd, yyyy');
				$scope.ends_at = dateFormat(e.ends_at, 'mmm dd, yyyy');
				$scope.terms = e.terms;
				$scope.disclaimer = e.disclaimer;
			}
		});
	})
}
function PromosCtrl($scope, $routeParams, $http, Promos) {
	delete $http.defaults.headers.common['X-Requested-With'];

	$scope.mall_name = $routeParams.mallName;
	$scope.mall_id = $routeParams.mallId;
	$scope.promos = Promos.query({mallId: $routeParams.mallId});
}
function PromoDetailsCtrl($scope, $routeParams, $http) {
	delete $http.defaults.headers.common['X-Requested-With'];

	$scope.mall_id = $routeParams.mallId;
	$scope.mall_name = $routeParams.mallName;
	$http.get('data/' + $routeParams.mallId + '/promos.json').success(function(data) {
		$.each(data, function(index, p) {
			if (p.id == $routeParams.promoId) {
				$scope.advert_url = p.advert_url;
				$scope.promo_title = p.headline;
				$scope.details = p.description;
				$scope.starts_at = dateFormat(p.starts_at, 'mmm dd, yyyy');
				$scope.ends_at = dateFormat(p.ends_at, 'mmm dd, yyyy');
				$scope.terms = p.terms;
				$scope.disclaimer = p.disclaimer;
			}
		});
	})
}
function FoodCtrl($scope, $routeParams, Store, Food){
	$scope.mall_name = $routeParams.mallName;
	$scope.mall_id = $routeParams.mallId;
	$scope.stores = Store.query({mallId: $routeParams.mallId});
	$scope.foods = Food.query({mallId: $routeParams.mallId});
	$scope.getCat = function(id){
		var $id = id;
		var $cat = '';
		$.each($scope.stores, function(index,item){
				if(item.store_id == $id){
					$cat = item.categories[0].name;
				}
			
		});
		return $cat;
	}

	$scope.stripName = function(name){
		return name.slice(0,name.indexOf(' at'));
	}
}
function FoodDetailsCtrl($scope, $routeParams, $http){
	$scope.mall_id = $routeParams.mallId;
	$scope.mall_name = $routeParams.mallName;
	$http.get('data/'+ $routeParams.mallId + '/stores.json').success(function(data){
		$stores = data;
		$.each($stores, function(index,item){
			if(item.store_id == $routeParams.storeId){
				$scope.name = item.store_name;
				$scope.location = 'Located on ' + item.location + '. ' + item.contact;
			}
		});
	})
	$scope.goBack = function(hash){
		$location.hash(hash);
	}
}

function CinemasCtrl($scope, $routeParams, $http, Mall){
	delete $http.defaults.headers.common['X-Requested-With'];
	$scope.mall_name = $routeParams.mallName;
	$scope.mall_id = $routeParams.mallId;
	$scope.mall_code = $routeParams.mallCode;
	$schedules = new Array();
	$now_showing = new Array();
	$coming_soon = new Array();
	$http.get('http://ayala360.net/api/v1/sureseats_api_json_version?action=schedule&callback=JSON_CALLBACK').success(function(data){
		 $.each(data['Movie']['Schedule'],function(index, item){
		 	if($routeParams.mallCode.indexOf(item.theater_code) !== -1){
		 		$schedules.push(item);
		 	}
		 });
		 $scope.schedules = $schedules;
	});
	$http.get('http://ayala360.net/api/v1/sureseats_api_json_version?action=nowshowing&callback=JSON_CALLBACK').success(function(data){
		 var $checker = JSON.stringify($schedules);
		 $.each(data['Movie']['Now_Showing'], function(index, item){
		 	if($checker.indexOf(item.movie_title) !== -1){
		 		$now_showing.push(item);
		 	}
		 });
		$scope.now_showing = $now_showing;
	});

	$http.get('http://ayala360.net/api/v1/sureseats_api_json_version?action=comingsoon&callback=JSON_CALLBACK').success(function(data){
		 var $checker = JSON.stringify($schedules);
		 $.each(data['Movie']['Coming_Soon'], function(index, item){
		 	if($checker.indexOf(item.movie_title) !== -1){
		 		$coming_soon.push(item);
		 	}
		 });
		$scope.coming_soon = $coming_soon;
	});
	$scope.getDate = function(movie){
		var string = '';
		// console.log($scope.schedules);
		$.each($scope.schedules,function(i,item){
			if(movie == item.movie_title){
				string = item.screening;
			}			
		})
		return string;
	}
	
}

function MovieDetailsCtrl($scope, $routeParams, $http){
	delete $http.defaults.headers.common['X-Requested-With'];
	$scope.mall_name = $routeParams.mallName;
	$scope.mall_id = $routeParams.mallId;
	$scope.mall_code = $routeParams.mallCode
	$scope.movie_title = $routeParams.movieTitle;
	$schedules = new Array();
	$http.get('http://ayala360.net/api/v1/sureseats_api_json_version?action=schedule&callback=JSON_CALLBACK').success(function(data){
		 $.each(data['Movie']['Schedule'],function(index, item){
		 	if($routeParams.mallCode.indexOf(item.theater_code) !== -1){
		 		$schedules.push(item);
		 	}
		 });
		 $scope.schedules = $schedules;
	});
	$http.get('http://ayala360.net/api/v1/sureseats_api_json_version?action=nowshowing&callback=JSON_CALLBACK').success(function(data){
		 $.each(data['Movie']['Now_Showing'], function(index, item){
		 	if($routeParams.movieTitle == item.movie_title){
		 		$scope.artists = item.cast;
		 		$scope.synopsis = item.synopsis;
		 		$scope.picture = item.picture;
		 		$.each($scope.schedules,function(i,item2){
		 			if(item.movie_title == item2.movie_title){
		 				$scope.ratings = item2.rating;
		 			}
		 		})
		 	}
		 });
	});
	$scope.goBack = function(hash){
		$location.hash(hash);
	}
}

function goBack(href){
	window.location.href = href;
}