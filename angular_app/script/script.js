var app=angular.module('myApp',['ngRoute']);
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/login', {templateUrl: 'login_page.html', controller: 'myCtrl1'}).
        when('/org', {templateUrl: 'org_details.html', controller: 'myCtrl2'}).
        when('/per', {templateUrl: 'pers_details.html', controller: 'myCtrl3'}).
        otherwise({redirectTo: '/login'});
}]);

app.factory('user_det',function(){

	var userDetails=[{userId:'548502',password:'gishnu'},{userId:'548500',password:'ebin'},{userId:'548512',password:'mesh'}];
	return userDetails;
});
app.factory('user_prof',function($http){
		var userProfile={};
		var userObj={};
		$http.get('assets/data.json').then(function(response){
		console.log("hi");
     userProfile=response;
     });
       userObj.getData=function(){
  	return userProfile;
  }
  return userObj;
});
app.service('mySer',function(user_det){
	var user_mob;
	this.setUser=function(name){
		user_det=name;
	}
	this.get=function(){
		return user_det;
	}
	this.setMob=function(mob){
		user_mob=mob;
	}
	this.getMob=function(){
		return user_mob;
	}
});
app.controller('myCtrl1',['user_det','mySer','$scope','$location',function(user_det,mySer,$scope,$location){
	// $scope.watch="";
	$scope.$watch('uname',function(newval,oldval){
		if(newval!=oldval){
			$scope.watch=newval;
		console.log($scope.watch);

		}
	});

	$scope.to_login=function(){
		var flag=0;
	angular.forEach(user_det,function(value,key){
		console.log($scope.uname);
					if((value.userId==$scope.uname) && (value.password==$scope.paswd)){
				flag=1;
				mySer.setUser($scope.uname);
				$location.path('/org');
				}
								});
	if(flag==0){
		 alert("Incorrect username or password");
	}
}
}]);
app.controller('myCtrl2',['user_det','mySer','$scope','$location',function(user_det,mySer,$scope,$location){
	$scope.uid=mySer.get();
	$scope.toPersonal=function(){
		$location.path('/per');
	}
	$scope.logout=function(){
		alert("You have logged out");
		$location.path('/login');
	}
}]);
app.controller('myCtrl3',['$scope','$location','user_prof','mySer',function($scope,$location,user_prof,mySer){
	$scope.show_t=false;
	$scope.toSubmit=function(){
		 if(mySer.getMob().match(/\d/g).length===10){
		 	alert("Thank you.Data saved successfully");
		$location.path('/login');
	}	else{alert("Enter valid mobile");}	
	}
	$scope.show_profile=function(){
	$scope.show_t=true;
	$scope.but=true;
		console.log("gis");
		$scope.details=user_prof.getData();
		console.log($scope.details.data.employee_data);
	}
	$scope.hide=function(){
		$scope.show_t=false;
		$scope.but=false;
	}
	
}]);				
 app.provider('greeting', function() {
  var text="Welcome";
  this.$get = function() {
    return{
    	hello: function(name) {
    return (text + name);
    }
    }
  };
});
 app.controller('myCtrl4',['$scope','mySer',function($scope,mySer){
	
 $scope.mobile_fun=function(){
 	mySer.setMob($scope.mobile);
 }
 }]);
app.run(function(greeting) {  
 alert(greeting.hello(' To AngularApp'));
}); 
