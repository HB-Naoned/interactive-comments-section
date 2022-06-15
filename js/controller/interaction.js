app.controller('interaction', ['$scope','$compile', function($scope,$compile) {   



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
                    "id": 4,
                    "content": $scope.contentComment,
                    "createdAt" : moment().format("DD.MM.YYYY HH:mm:ss"),
                    "score": 0,
                    "replyingTo": comment.user.username,
                    "user": $scope.currentUser
                }
                comment.replies.push(myObjToAdd)
            }
        })

        //Update LocalStorage
        localStorage.setItem("dataJSON",JSON.stringify(dataJSON))

        //Format fr des heures


        $scope.initComment()
    }









}]);