
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

function StoresCtrl($scope, $routeParams, $http, Store){
	$scope.alphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	$scope.stores = Store.query({mallId: $routeParams.mallId});
	$scope.mallId = $routeParams.mallId;
	console.log($routeParams.mallId);
	console.log($scope.stores)
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
		
	$http.get('data/malls.json').success(function(data) {
	  	$.each(data,function(x){
	  		if(data[x].id == $routeParams.mallId){
	  			$scope.mall_name = data[x].name;
	  			$scope.mall_id = data[x].id
	  		}
	  	})
	});
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
function goBack(){
	window.history.back();
}