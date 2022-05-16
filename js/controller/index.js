app.controller("index", ['$scope','$http','$controller', function($scope,$http,$controller) {   
    





    //---------------------Sizing responsive-------------------------------
    if(window.screen.width > 500){
            $scope.mobileDesign = false
    }else{
            $scope.mobileDesign = true
    }

    window.onresize = function(){
        // console.log(window.screen.height)
        // console.log(window.screen.width)
        if(window.screen.width > 500){
            $scope.$apply(function(){
                $scope.mobileDesign = false
            })
        }else{
            $scope.$apply(function(){
                $scope.mobileDesign = true
            })
        }
    }
























    //-----------------------LocalStorage----------------------------------
    if(window.localStorage.length === 0){
        $http.get('data.json').then((dataJSON) => {
            console.log(dataJSON)
            localStorage.setItem("dataJSON",JSON.stringify(dataJSON))
        })
    }else{
        let dataJSON = JSON.parse(localStorage.getItem("dataJSON"))
        console.log(dataJSON)

        $scope.jsonEx = localStorage.getItem("dataJSON")
        // Modifier attribut
        // console.log(dataJSON.data.currentUser.username)
        // dataJSON.data.currentUser.username = "Helori"
        // localStorage.setItem("dataJSON",JSON.stringify(dataJSON))
        // console.log(dataJSON.data.currentUser.username)
        // juliusomo
    
        
        




















        //-----------------------MomentJS----------------------------------
        
        $scope.exampleDate = moment().hour(8).minute(0).second(0).toDate();


        //Charger createdAt
        dataJSON.data.comments[0].createdAt = moment(dataJSON.data.comments[0].date, "DD.MM.YYYY HH:mm:ss").fromNow()
        localStorage.setItem("dataJSON",JSON.stringify(dataJSON))
        
    
        //Création date
        // dataJSON.data.comments[0].createdAt = moment().format("DD.MM.YYYY HH:mm:ss")


        $scope.getDate = function(){
            console.log("ici")
            console.log(moment(dataJSON.data.comments[0].date, "DD.MM.YYYY HH:mm:ss").fromNow())
            var d1 = document.getElementById('1');
            d1.insertAdjacentHTML('afterend', '<div id="two">two</div>');
        };



    }
        
    
    
}]);