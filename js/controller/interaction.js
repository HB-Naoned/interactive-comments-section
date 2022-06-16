app.controller('interaction', ['$scope','$compile', function($scope,$compile) {   



    $scope.askReplyView = function($e,$boolTypeReply){
        if($boolTypeReply){
            var html = $compile($scope.commentReply)($scope);
        }else{
            var html = $compile($scope.commentUnderReply)($scope);
        }
        angular.element(document.getElementById($e.target.parentElement.parentElement.parentElement.parentElement.id)).after(html);
        $scope.autorisationReplyView = true;
        $scope.contentComment = null;
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




    $scope.deleteComment = function($e){
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





    $scope.newComment = function($e){
        var comment = {
                        "id": $scope.idMax + 1,
                        "content": $scope.contentComment,
                        "createdAt": moment().format("DD.MM.YYYY HH:mm:ss"),
                        "score": 0,
                        "user": {
                            "image": { 
                                "png": "./images/avatars/image-juliusomo.png",
                                "webp": "./images/avatars/image-juliusomo.webp"
                            },
                            "username": "juliusomo"
                        },
                        "replies": []
        }
        console.log(comment)
        console.log($e.target.parentElement.parentElement)
        let dataJSON = JSON.parse(localStorage.getItem("dataJSON"))
        dataJSON.data.comments.push(comment)

        //Update LocalStorage
        localStorage.setItem("dataJSON",JSON.stringify(dataJSON))
        $scope.contentComment = null;
        $scope.initComment() 
    }





    $scope.modifyScore = function($e,$boolTypeModify){
        var score = ($e.target.tagName == "IMG" ? parseInt($e.target.parentElement.parentElement.children[1].innerText) : parseInt($e.target.parentElement.children[1].innerText))  
        var id = ($e.target.tagName == "IMG" ? parseInt($e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id) : parseInt($e.target.parentElement.parentElement.parentElement.parentElement.id)) 
        score = $boolTypeModify ? score+1 : score-1

        let dataJSON = JSON.parse(localStorage.getItem("dataJSON"))
        for(let commentNumber in dataJSON.data.comments){
            if(dataJSON.data.comments[commentNumber].id == id){
                dataJSON.data.comments[commentNumber].score = score
                break
            }
            if(dataJSON.data.comments[commentNumber].replies.length != 0){
                for(let underCommentNumber in dataJSON.data.comments[commentNumber].replies){
                    if(dataJSON.data.comments[commentNumber].replies[underCommentNumber].id == id){
                        dataJSON.data.comments[commentNumber].replies[underCommentNumber].score = score
                        break
                    }   
                }
            }
        }
        localStorage.setItem("dataJSON",JSON.stringify(dataJSON))
        console.log(dataJSON)
        $scope.initComment()      
    }




}]);