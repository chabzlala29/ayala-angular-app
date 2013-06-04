
function HomeCtrl($scope, Mall) {
  
  // $http.get('data/malls.json').success(function(data) {
  // $scope.malls = data;
  //   console.log(data);
  // });
  $scope.malls = Mall.query();
  $scope.title = 'Ayala Malls'
  $scope.orderProp = 'position';

}

function MallFeatureCtrl($scope, $routeParams, $http) {
  	$http.get('data/malls.json').success(function(data) {
	  	$.each(data,function(x){
	  		if(data[x].id == $routeParams.mallId){
	  			$scope.mall_name = data[x].name;
	  			$scope.mall_id = data[x].id
	  		}
	  	})
  	});


}

function StoresCtrl($scope, $routeParams, Store, Category){
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
			// console.log($scope.stores[0]);
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

function StoreDetailsCtrl($scope, $routeParams, $http){
	$http.get('data/'+ $routeParams.mallId +'/stores.json').success(function(data) {
		$.each(data, function(index){
			if($routeParams.storeIndex == index){
				$scope.location = 'Located on ' + data[index].location + '. ' + data[index].contact;
				console.log($scope.location);
				$scope.name = data[index].store_name;
				$scope.details = data[index].description;
			}
		});
	});

}

function EventsCtrl($scope, $routeParams, Event){
	$scope.mall_name = $routeParams.mallName;
	$scope.mall_id = $routeParams.mallId;
	$scope.events = Event.query({mallId: $routeParams.mallId});
}

function EventDetailsCtrl($scope, $routeParams, $http) {
	$scope.mall_id = $routeParams.mallId;
	$scope.mall_name = $routeParams.mallName;
	$http.get('data/' + $routeParams.mallId + '/events.json').success(function(data) {
		$.each(data, function(index, e) {
			if (e.id == $routeParams.eventId) {
				$scope.advert_url = e.advert_url;
				$scope.event_title = e.headline;
				$scope.details = e.description;
				$scope.period = '<b>' + dateFormat(e.starts_at, 'mmm dd, yyyy') + '</b> - <b>' + dateFormat(e.ends_at, 'mmm dd, yyyy') + '</b>';
				$scope.terms = '<li>- '+event_details.terms;
				$scope.disclaimer = '<li>- '+event_details.disclaimer;
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
	$scope.mall_name = $routeParams.mallName;
	$scope.mall_id = $routeParams.mallId;
	$schedules_mall = new Array();
	$http.get('data/xml/schedule.xml').success(
		function parseXml(xml) {
	        $(xml).find("Schedule").each(function() {
	            var csMovie = $(this).find("theater_code").text();
	            console.log(csMovie);
	        });
    	}
	);

    
}

function goBack(href){
	window.location.href = href;
}

// Changes XML to JSON
function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};
