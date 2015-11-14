/*                          */
  // page: lifereadings.html
  /*                          */
app.controller('readingsCtrl', ['$scope', '$sce', '$http', function($scope, $sce, $http) {
	var page = app.navi.getCurrentPage(),
	    numeral = page.options.numeral;

	$http.get('reading/Numeral ' + numeral + ' App.html').success(function(data) {
	  $scope.contents = $sce.trustAsHtml(data);
	});

}]);