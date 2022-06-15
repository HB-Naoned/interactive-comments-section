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
                    "id": $scope.idMax + 1,
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
        $scope.initComment()
    }


    $scope.deleteCommennt = function($e){
        var id = $e.target.parentElement.parentElement.parentElement.parentElement.id;
        let dataJSON = JSON.parse(localStorage.getItem("dataJSON"))

        for(let commentNumber in dataJSON.data.comments){
            if(dataJSON.data.comments[commentNumber].id == id){
                delete dataJSON.data.comments.splice(commentNumber,1)
                break
            }
            if(dataJSON.data.comments[commentNumber].replies.length != 0){
                for(let underCommentNumber in dataJSON.data.comments[commentNumber].replies){
                    if(dataJSON.data.comments[commentNumber].replies[underCommentNumber].id == id){
                        delete dataJSON.data.comments[commentNumber].replies.splice(underCommentNumber,1)
                        break
                    }   
                }
            }
        }

        console.log(dataJSON)
        console.log(id)

        //Update LocalStorage
        localStorage.setItem("dataJSON",JSON.stringify(dataJSON))
        $scope.initComment()
    }








}]);