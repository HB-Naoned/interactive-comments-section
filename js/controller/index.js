app.controller("index", ['$scope','$http','$controller', '$compile', function($scope,$http,$controller,$compile) {   
    
    $scope.test = "ici"




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



    //----------------Get Current User----------------------------------------
    let dataJSON = JSON.parse(localStorage.getItem("dataJSON"))
    const currentUser = dataJSON.data.currentUser
    // console.log(currentUser)



    //----------------Ajout comment-------------------------------------------
    $scope.autorisationReplyView = false;
    $scope.commentReply ='<div class="row d-flex bg-very-light-gray rounded-3 mt-4 p-3 px-4" id="response"><div class="col-3 col-sm-2 col-lg-1"><img src="./images/avatars/image-amyrobson.png" class="img-fluid w-60" alt="plus"></div><div class="col-6 col-sm-8 col-lg-10"><textarea class="h-100 w-100" ng-model="contentComment"></textarea></div><div class="col-3 col-sm-2 col-lg-1"> <button type="button" class="btn btn-moderate-blue fw-bold" ng-click="submitReplyView($event,true)">Reply</button></div></div>';
    $scope.commentUnderReply ='<div class="row d-flex bg-very-light-gray rounded-3 mt-1 mb-3 p-3 px-4" id="response"><div class="col-3 col-sm-2 col-lg-1"><img src="./images/avatars/image-amyrobson.png" class="img-fluid w-50" alt="plus"></div><div class="col-6 col-sm-8 col-lg-10"><textarea class="h-100 w-100" ng-model="contentComment"></textarea></div><div class="col-3 col-sm-2 col-lg-1"><button type="button" class="btn btn-sm btn-moderate-blue fw-bold" ng-click="submitReplyView($event,false)">Reply</button> </div></div>'








































    
    $scope.askReplyView = function($e,$boolTypeReply){
        //Attention chemin potentiellement différent sur le cas sous comment
        console.log($e.target.parentElement.parentElement.parentElement.parentElement.id)
        console.log($boolTypeReply)
        if($boolTypeReply){
            var html = $compile($scope.commentReply)($scope);
        }else{
            var html = $compile($scope.commentUnderReply)($scope);
        }
        angular.element(document.getElementById($e.target.parentElement.parentElement.parentElement.parentElement.id)).after(html);
        $scope.autorisationReplyView = true;
        $scope.contentComment = "";
    };



    $scope.submitReplyView = function($e,$boolTypeReply){
        if($boolTypeReply){
            console.log($e.target.parentElement.parentElement.parentElement.children[0].id)
            var id = $e.target.parentElement.parentElement.parentElement.children[0].id;
        }else{
            console.log($e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].id)
            var id = $e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].id;
        }

        let dataJSON = JSON.parse(localStorage.getItem("dataJSON"))
        console.log(dataJSON)
        dataJSON.data.comments.forEach(function(comment){
            if(comment.id == id){
                // console.log("trouvé : " + comment.id)
                // console.log(comment.replies)
                var myObjToAdd = {
                    "id": 19,
                    "content": $scope.contentComment,
                    "createdAt": "x ago",
                    "date" : moment().format("DD.MM.YYYY HH:mm:ss"),
                    "score": 0,
                    "replyingTo": "ramsesmiron",
                    "user": currentUser
                }
                comment.replies.push(myObjToAdd)
                console.log(comment.replies)
            }
        })

        console.log(dataJSON)
        document.getElementById("response").remove();
        $scope.autorisationReplyView = false;
    }
















    // //-----------------------LocalStorage----------------------------------
    // if(window.localStorage.length === 0){
    //     $http.get('data.json').then((dataJSON) => {
    //         console.log(dataJSON)
    //         localStorage.setItem("dataJSON",JSON.stringify(dataJSON))
    //     })
    // }else{
    //     let dataJSON = JSON.parse(localStorage.getItem("dataJSON"))
    //     console.log(dataJSON)

    //     $scope.jsonEx = localStorage.getItem("dataJSON")
    //     // Modifier attribut
    //     // console.log(dataJSON.data.currentUser.username)
    //     // dataJSON.data.currentUser.username = "Helori"
    //     // localStorage.setItem("dataJSON",JSON.stringify(dataJSON))
    //     // console.log(dataJSON.data.currentUser.username)
    //     // juliusomo
    
        
        




















    //     //-----------------------MomentJS----------------------------------
        
    //     $scope.exampleDate = moment().hour(8).minute(0).second(0).toDate();


    //     //Charger createdAt
    //     dataJSON.data.comments[0].createdAt = moment(dataJSON.data.comments[0].date, "DD.MM.YYYY HH:mm:ss").fromNow()
    //     localStorage.setItem("dataJSON",JSON.stringify(dataJSON))
        
    
    //     //Création date
    //     // dataJSON.data.comments[0].createdAt = moment().format("DD.MM.YYYY HH:mm:ss")


    //     $scope.getDate = function(){
    //         console.log("ici")
    //         console.log(moment(dataJSON.data.comments[0].date, "DD.MM.YYYY HH:mm:ss").fromNow())
    //         var d1 = document.getElementById('1');
    //         d1.insertAdjacentHTML('afterend', '<div id="two">two</div>');
    //     };



    // }
        
    
    
}]);