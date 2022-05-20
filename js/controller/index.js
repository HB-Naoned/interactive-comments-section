app.controller("index", ['$scope','$http','$controller', '$compile', function($scope,$http,$controller,$compile) {   
    


    //---------------------Sizing responsive-------------------------------
    window.onresize = function(){
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






    $scope.initCommrent = function (){
        if(window.localStorage.length === 0){
            $http.get('data.json').then((dataJSON) => {
                console.log(dataJSON)
                localStorage.setItem("dataJSON",JSON.stringify(dataJSON))
            })
        }else{
            dataJSON = JSON.parse(localStorage.getItem("dataJSON"))
            console.log(dataJSON)
            $scope.currentUser = dataJSON.data.currentUser
            $scope.autorisationReplyView = false;
            $scope.commentReply ='<div class="row d-flex bg-very-light-gray rounded-3 mt-4 p-3 px-4" id="response"><div class="col-3 col-sm-2 col-lg-1"><img src="./images/avatars/image-amyrobson.png" class="img-fluid w-60" alt="plus"></div><div class="col-6 col-sm-8 col-lg-10"><textarea class="h-100 w-100" ng-model="contentComment"></textarea></div><div class="col-3 col-sm-2 col-lg-1"> <button type="button" class="btn btn-moderate-blue fw-bold" ng-click="submitReplyView($event,true)">Reply</button></div></div>';
            $scope.commentUnderReply ='<div class="row d-flex bg-very-light-gray rounded-3 mt-1 mb-3 p-3 px-4" id="response"><div class="col-3 col-sm-2 col-lg-1"><img src="./images/avatars/image-amyrobson.png" class="img-fluid w-50" alt="plus"></div><div class="col-6 col-sm-8 col-lg-10"><textarea class="h-100 w-100" ng-model="contentComment"></textarea></div><div class="col-3 col-sm-2 col-lg-1"><button type="button" class="btn btn-sm btn-moderate-blue fw-bold" ng-click="submitReplyView($event,false)">Reply</button> </div></div>'
            $scope.idMax = 0
            let bodyHTML = ""
            dataJSON.data.comments.forEach(function(comment){
                $scope.idMax = comment.id > $scope.idMax ? comment.id : $scope.idMax ;
                bodyHTML = bodyHTML + '<div class="mt-3"> <div class="row bg-very-light-gray rounded-1 p-3" id="'+comment.id+'"><div class="col-sm-8 col-md-10 col-lg-10 col-xl-10 order-sm-1"><div class="row d-flex align-items-center"><div class="col-2 col-sm-3"><img src="'+comment.user.image.png+'" class="img-fluid" alt="plus"></div><div class="col-5 col-sm-4 fw-bold">'+comment.user.username+'</div><div class="col-5 col-sm-5 d-flex justify-content-end">'+comment.createdAt+'</div><div class="col-12 d-flex justify-content-end" ng-show="!mobileDesign"><button type="button" class="btn btn-very-light-gray fw-bold text-soft-red"><img src="./images/icon-delete.svg" alt="dell" class="d-inline-block align-items-center mx-2" >Dell</button><button type="button" class="btn btn-very-light-gray fw-bold text-moderate-blue mx-1" ng-click="askReplyView($event,true)" ng-disabled="autorisationReplyView"><img src="./images/icon-reply.svg" alt="edit" class="d-inline-block align-items-center mx-2">Reply</button></div><div class="col-12 mt-1"><p class="w-100 fs-6">'+comment.content+'</p></div></div></div><div class="col-sm-4 col-md-2 col-lg-2 col-xl-2 order-sm-0"><div class="row"><div class="col-5 col-sm-12 bg-light-gray rounded-1 d-flex justify-content-evenly align-items-center p-1"><button type="button" class="btn btn-sm btn-light-gray d-flex align-items-center"><img src="./images/icon-plus.svg" class="" alt="plus"></button> <div class="text-moderate-blue fw-bold ">'+comment.score+'</div><button type="button" class="btn btn-sm btn-light-gray d-flex align-items-center" ><img src="./images/icon-minus.svg" class="" alt="minus"></button> </div><div class="col-7 d-flex justify-content-end" ng-show="mobileDesign"><button type="button" class="btn btn-sm btn-very-light-gray fw-bold text-soft-red"><img src="./images/icon-delete.svg" alt="dell" class="d-inline-block align-items-center mx-2">Dell</button><button type="button" class="btn btn-sm btn-very-light-gray fw-bold text-moderate-blue mx-1" ng-click="askReplyView($event,true)" ng-disabled="autorisationReplyView"><img src="./images/icon-reply.svg" alt="edit" class="d-inline-block align-items-center mx-2">Reply</button></div></div></div></div>';
                if(comment.replies.length != 0){
                    bodyHTML = bodyHTML + '<div class="row mt-5"><!-- Start under comment --><div class="col-2 d-flex"><!-- vertical line --><div class="vr m-2 mb-3 position-relative top-0 start-50"></div></div><div class="col-10">'
                    comment.replies.forEach(function(underComment){
                        $scope.idMax = underComment.id > $scope.idMax ? underComment.id : $scope.idMax ; 
                        bodyHTML = bodyHTML + '<div class="row bg-very-light-gray rounded-3 p-3 mb-3" id="'+underComment.id+'"><div class="col-sm-8 col-md-9 col-lg-10 col-xl-10 order-sm-1"><div class="row d-flex align-items-center"><div class="col-3 col-sm-3 col-md-3"><img src="'+underComment.user.image.png+'" class="img-fluid" alt="plus"></div><div class="col-5 col-sm-4 col-md-4 fw-bold">'+underComment.user.username+'</div><div class="col-4 col-sm-5 col-md-5 d-flex justify-content-end">'+underComment.createdAt+'</div><div class="col-12 d-flex justify-content-end"  ng-show="!mobileDesign"><button type="button" class="btn btn-very-light-gray fw-bold text-soft-red"><img src="./images/icon-delete.svg" alt="dell"  class="d-inline-block align-items-center mx-2">Dell</button><button type="button" class="btn btn-very-light-gray fw-bold text-moderate-blue mx-1" ng-click="askReplyView($event,false)" ng-disabled="autorisationReplyView"><img src="./images/icon-reply.svg" alt="edit" class="d-inline-block align-items-center mx-2">Reply</button></div><div class="col-12 mt-1"><p class="w-100">'+underComment.content+'</p></div>    </div></div><div class="col-sm-4 col-md-3 col-lg-2 col-xl-2 order-sm-0"><div class="row row-cols-sm-1"><div class="col-5 bg-light-gray rounded-1 d-flex justify-content-evenly align-items-center p-1"><button type="button" class="btn btn-sm btn-light-gray d-flex align-items-center"><img src="./images/icon-plus.svg" class=""    alt="plus"></button>                <div class="text-moderate-blue fw-bold">'+underComment.score+'</div><button type="button" class="btn btn-sm btn-light-gray d-flex align-items-center" ><img src="./images/icon-minus.svg" class=""  alt="minus"></button>  </div><div class="col-7 d-flex justify-content-end" ng-show="mobileDesign"><button type="button" class="btn btn-sm btn-very-light-gray fw-bold text-soft-red"><img src="./images/icon-delete.svg" alt="dell"   class="d-inline-block align-items-center mx-2">Dell</button><button type="button" class="btn btn-sm btn-very-light-gray fw-bold text-moderate-blue mx-1" ng-click="askReplyView($event,false)"  ng-disabled="autorisationReplyView"><img src="./images/icon-reply.svg" alt="edit" class="d-inline-block align-items-center mx-2  fw-bold">Reply</button></div></div></div></div>' ; 
                    })  
                    bodyHTML = bodyHTML + "</div></div>";
                }
                bodyHTML = bodyHTML + "</div>";
            })
            bodyHTML = $compile(bodyHTML)($scope);
            angular.element(document.getElementById("app")).append(bodyHTML);
        } 
    }









    


















    $scope.askReplyView = function($e,$boolTypeReply){
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
            var id = $e.target.parentElement.parentElement.parentElement.children[0].id;
        }else{
            var id = $e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].id;
        }
        let dataJSON = JSON.parse(localStorage.getItem("dataJSON"))
        dataJSON.data.comments.forEach(function(comment){
            if(comment.id == id){
                var myObjToAdd = {
                    "id": 19,
                    "content": $scope.contentComment,
                    "createdAt" : moment().format("DD.MM.YYYY HH:mm:ss"),
                    "score": 0,
                    "replyingTo": comment.user.username,
                    "user": $scope.currentUser
                }
                comment.replies.push(myObjToAdd)
            }
        })

        console.log(dataJSON)

        //A continuer pour ajouter dans JSON localS

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
    //     console.log(dataJSON)}

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