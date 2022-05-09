app.controller("index", ['$scope','$http','$controller', function($scope,$http,$controller) {   
    $scope.helloTo = {};
    $scope.helloTo.title = "AngularJS";



    $http.get('data.json').then((date) => {
        $scope.data = data;
    })

    console.log($scope.data)

    let nom = "Belbeoch"
    let prenom = "Helori"

    // stockage local 
    localStorage.setItem("nom", nom)
    localStorage.setItem("prenom", prenom)


    // if(localStorage.length() == 0){
    //     //LocalStorage empty
    // }else{

    // }







}]);