app.controller('interaction', ['$scope','$compile', function($scope,$compile) {   




    $scope.askReplyView = function($e,$boolTypeReply){
        if($boolTypeReply){
            var html = $compile($scope.commentReply)($scope);
        }else{
            var html = $compile($scope.commentUnderReply)($scope);
        }
        var id = ($e.target.tagName == "IMG" ? parseInt($e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id) : parseInt($e.target.parentElement.parentElement.parentElement.parentElement.id))

        
        if($scope.mobileDesign){
            $scope.replyingTo = ($e.target.tagName == "IMG" ? $e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[0].children[1].innerText : $e.target.parentElement.parentElement.parentElement.parentElement.children[0].children[0].children[1].innerText)
        }else{
            $scope.replyingTo = ($e.target.tagName == "IMG" ? $e.target.parentElement.parentElement.parentElement.children[1].innerText : $e.target.parentElement.parentElement.children[1].innerText)
        }
        angular.element(document.getElementById(id)).after(html);
        $scope.autorisationReplyView = true;
        $scope.contentComment = "";
    };





    $scope.submitReplyView = function($e,$boolTypeReply){
        console.log($boolTypeReply)
        if($boolTypeReply){
            var id = $e.target.parentElement.parentElement.parentElement.children[0].id;
        }else{
            var id = $e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].id;
            console.log($e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].id)
        }
        console.log(id)
        let dataJSON = JSON.parse(localStorage.getItem("dataJSON"))
        dataJSON.data.comments.forEach(function(comment){
            if(comment.id == id){
                var myObjToAdd = {
                    "id": $scope.idMax + 1,
                    "content": $scope.contentComment,
                    "createdAt" : moment().format("DD.MM.YYYY HH:mm:ss"),
                    "score": 0,
                    "replyingTo": $scope.replyingTo,
                    "user": $scope.currentUser
                }
                console.log($scope.replyingTo)
                comment.replies.push(myObjToAdd)
            }
        })
        console.log(dataJSON)
        $scope.replyingTo = ""

        //Update LocalStorage
        localStorage.setItem("dataJSON",JSON.stringify(dataJSON))
        $scope.initComment()
    }



   
   
    $scope.deleteReplyview = function(){
        $scope.initComment()
    }





    $scope.askEditComment = function($e){
        var id = ($e.target.tagName == "IMG" ? parseInt($e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id) : parseInt($e.target.parentElement.parentElement.parentElement.parentElement.id))
        
        var html = document.getElementById("text"+id)
        html.removeChild(html.children[0])
        $scope.autorisationEditView = true;


        let dataJSON = JSON.parse(localStorage.getItem("dataJSON"))
        for(let commentNumber in dataJSON.data.comments){
            if(dataJSON.data.comments[commentNumber].id == id){
                $scope.contentEditContent = dataJSON.data.comments[commentNumber].content
                break
            }
            if(dataJSON.data.comments[commentNumber].replies.length != 0){
                for(let underCommentNumber in dataJSON.data.comments[commentNumber].replies){
                    if(dataJSON.data.comments[commentNumber].replies[underCommentNumber].id == id){
                        $scope.contentEditContent = dataJSON.data.comments[commentNumber].replies[underCommentNumber].content
                        break
                    }   
                }
            }
        }
            
        //Gerated html code for update part
        var htmlPART1 = `<textarea class="w-100 fs-6 p-1" ng-model="contentEditContent"></textarea>`
        var htmlPART1 = $compile(htmlPART1)($scope)
        angular.element(html).append(htmlPART1);


        var htmlPART2 = ` <div class="col-12 col-sm-12 col-md-12 col-lg-12 my-2 d-flex justify-content-end">
                            <button type="button" class="btn btn-moderate-blue fw-bold" ng-click="submitEditComment($event)">Update</button>
                          </div>`
        var htmlPART2 = $compile(htmlPART2)($scope)
        angular.element(html).after(htmlPART2);    
    }





    $scope.submitEditComment = function($e){
        var id = parseInt($e.target.parentElement.parentElement.parentElement.parentElement.id)
        let dataJSON = JSON.parse(localStorage.getItem("dataJSON"))
        for(let commentNumber in dataJSON.data.comments){
            if(dataJSON.data.comments[commentNumber].id == id){
                dataJSON.data.comments[commentNumber].content = $scope.contentEditContent
                break
            }
            if(dataJSON.data.comments[commentNumber].replies.length != 0){
                for(let underCommentNumber in dataJSON.data.comments[commentNumber].replies){
                    if(dataJSON.data.comments[commentNumber].replies[underCommentNumber].id == id){
                        dataJSON.data.comments[commentNumber].replies[underCommentNumber].content = $scope.contentEditContent
                        break
                    }   
                }
            }
        }
        //Update LocalStorage
        $scope.autorisationEditView = false;
        localStorage.setItem("dataJSON",JSON.stringify(dataJSON))
        $scope.initComment()
    }





    $scope.deleteComment = function($e){
        var id = ($e.target.tagName == "IMG" ? parseInt($e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id) : parseInt($e.target.parentElement.parentElement.parentElement.parentElement.id)) 
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

        //Update LocalStorage
        localStorage.setItem("dataJSON",JSON.stringify(dataJSON))
        $scope.initComment()
    }





    $scope.newComment = function($e){
        var comment = {
                        "id": $scope.idMax + 1,
                        "content": $scope.contentMainComment,
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
        let dataJSON = JSON.parse(localStorage.getItem("dataJSON"))
        dataJSON.data.comments.push(comment)

        //Update LocalStorage
        localStorage.setItem("dataJSON",JSON.stringify(dataJSON))
        $scope.contentMainComment = null;
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
        $scope.initComment()      
    }





}]);