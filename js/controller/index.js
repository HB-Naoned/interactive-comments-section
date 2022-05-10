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





        // var dateStringCreat = new Date('May 1, 2022 00:00:00');
        // var dateStringModule = new Date('September 10, 2022 19:59:59');
        // // var dateStringNow = Date.now();

        // console.log(dateStringCreat)

        // console.log(dateStringCreat.getTime()/ 1000)

        // //Affichage du temps passé depuis 1970
        // console.log(dateStringModule / 1000)
        // var dateNow = new Date(dateStringModule)
        // console.log(dateNow)


        // console.log((dateStringModule - dateStringCreat.getTime())/ 1000)

        // //Avec /1000 ça deviens des mili sec | sans c'est des sec 
        // var dateStringSince = (dateStringModule - dateStringCreat.getTime())
        // console.log("format mili sec : " + dateStringSince / 1000)
        // console.log("format sec : " +dateStringSince)
        // var dateF = new Date(dateStringSince)

        // // let date = dateF.getDate()
        // let days = dateF.getDay() - 1 
        // let hours = dateF.getHours() - 1
        // let minutes = dateF.getMinutes()
        // let seconds = dateF.getSeconds()
        // let formattedTime = ':'+ days +':'+ hours +':'+ minutes +':'+ seconds
        // console.log(formattedTime)

        // var startDate = new Date('January 1, 2020 00:00:00');
        // // Do your operations
        // var endDate   = new Date();
        // var seconds = (endDate.getTime() - startDate.getTime());
        // console.log(seconds)

        // //year relative since tody = 365 * 86400 (86400 = 24h en sec)
        // // console.log(365 * 86400)

        // var dateTowork = new Date(seconds)
        // console.log(dateTowork)
        // let date = dateTowork.getDate()
        // let days = dateTowork.getDay() 
        // let hours = dateTowork.getHours()
        // let minutes = dateTowork.getMinutes()
        // let seconds = dateTowork.getSeconds()
        // let formattedTime = date  + ':'+ days +':'+ hours +':'+ minutes +':'+ seconds


        // var today = new Date();
        // var Christmas = new Date(today.getFullYear() + "-12-25");
        // var diffMs = (Christmas - today); // milliseconds between now & Christmas
        // var diffDays = Math.floor(diffMs / 86400000); // days
        // var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
        // var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        // alert(diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes until Christmas =)");


        $scope.exampleDate = moment().endOf('hour').fromNow();
        console.log($scope.exampleDate)     

    }
        
    



    
}]);