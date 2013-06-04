
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
			}
		});
	});

}

function EventsCtrl($scope, $routeParams, Event){
	$scope.mall_name = $routeParams.mallName;
	$scope.events = Event.query({mallId: $routeParams.mallId});
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

function goBack(href){
	window.location.href = href;
}