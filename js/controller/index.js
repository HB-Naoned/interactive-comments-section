app.controller("index", ['$scope','$http','$controller', function($scope,$http,$controller) {   
    
    $scope.helloTo = {};
    $scope.helloTo.title = "AngularJS";





    if(window.localStorage.length === 0){
        $http.get('data.json').then((dataJSON) => {
            console.log(dataJSON)
            localStorage.setItem("dataJSON",JSON.stringify(dataJSON))
        })
    }else{
        let dataJSON = JSON.parse(localStorage.getItem("dataJSON"))
        console.log(dataJSON)
        // console.log(dataJSON.data.currentUser.username)
        // dataJSON.data.currentUser.username = "Helori"
        // localStorage.setItem("dataJSON",JSON.stringify(dataJSON))
        // console.log(dataJSON.data.currentUser.username)
        // juliusomo
    
        
        
        //Year 
        $scope.exampleDate = moment("20210511", "YYYYMMDD").fromNow();
        console.log($scope.exampleDate)     
        

        //mount
        $scope.exampleDate = moment("20220311", "YYYYMMDD").fromNow();
        console.log($scope.exampleDate)     
        
        //Day
        $scope.exampleDate = moment("20220508", "YYYYMMDD").fromNow();
        console.log($scope.exampleDate) 

        //hour 
        $scope.w = moment("073501", "Hmmss").fromNow()   
        console.log($scope.w)


        //min 
        $scope.w= moment("093501", "Hmmss").fromNow()   
        console.log($scope.w)
        
        //sec
        $scope.w = moment("093901", "Hmmss").fromNow()   
        console.log($scope.w)




    

    }
        
    



    
}]);