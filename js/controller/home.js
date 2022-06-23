app.controller("home", ['$scope','$http','$controller', '$compile', "$parse", 'moment', function($scope,$http,$controller,$compile,$parse,moment) {   
    

    //Importation des controllers
    $controller('interaction',{$scope: $scope}); 


    /* This fonction is used in order to load json file to initialize the localStorage.
     *
     * /!!!!!!!!!\ WARNING /!!!!!!!!!\
     * I had a problem when I want use $scope variables in html code since this js file.
     * This case is special, because I initialize LocalStorage before to load my html code.
     * This action it's relized only once and creat this problem. 
     * When I want to use $scope variables with html code load since js file, my $scope variable are not existing or are not integrated. 
     * I see this beacause I look my $scope variable like this {{name of $scope variable}} since js (in variable who will be add in html). 
     * However, if I look my $scope variable like this {{name of $scope variable}} since html file. I see it's existing and integrated by system.
     * But, when this page have an event like a reload or a screen resize or click on ng-click, this $scope variable that has not been  interpreted, it's updated and works.
     * 
     * So, my solution it's to reload my page and break after initLocalStorage function end in order to not load my html code. 
     * This has the effect to have $scope variable interpreted by web navigator when my page it's reload. My code have just to load html code and not initialize LocalStorage. 
     * 
     * I’ve never encountered this problem with AngularJS. It's the first time I use AngularJS that way (Add html code since js file). 
     */
    function initLocalStrorage(){
        return new Promise((resolve,reject)=>{
            $http.get('data.json').then((dataJSON) => {
                localStorage.setItem("dataJSON",JSON.stringify(dataJSON))
            }).then( () => {
                window.location.reload();
                resolve();
            });
        })
    }




    window.onresize = function(){
        window.screen.width > 500 ? $scope.$apply(function(){ $scope.mobileDesign = false }) : $scope.$apply(function(){$scope.mobileDesign = true} );
    }




    $scope.initComment = async function (){
        if(window.localStorage.length === 0){
            await initLocalStrorage()
            return 
        }
        dataJSON = JSON.parse(localStorage.getItem("dataJSON"))
        console.log(dataJSON)
        let bodyHTML = ""

        //Empty content of Body 
        let rst = document.getElementById("app")
        let child = rst.lastChild 
        while (child) {
            rst.removeChild(child)
            child = rst.lastChild
        }

        //Sort of main comment
        dataJSON.data.comments.sort(function(a,b){
            return b.score - a.score
        })

        //Case if there is comment
        if(dataJSON.data.comments.length != 0){
            $scope.currentUser = dataJSON.data.currentUser
            $scope.commentReply =`  <div class="row d-flex bg-white rounded-3 mt-4 p-3 px-4" role="commentReplu">
                                        <div class="col-3 col-sm-2 col-lg-1">
                                            <img src="`+$scope.currentUser.image.png+`" class="img-fluid w-60" alt="profilCurrentUserReply">
                                        </div>
                                        <div class="col-5 col-sm-7 col-lg-9">
                                            <textarea class="h-100 w-100" ng-model="contentComment"></textarea>
                                        </div>
                                        <div class="row col-4 col-sm-3 col-lg-2 d-flex justify-content-evenly">
                                            <button type="button" class="btn btn-soft-red fw-bold my-1" ng-click="deleteReplyview()">Dell</button> 
                                            <button type="button" class="btn btn-moderate-blue fw-bold my-1" ng-click="submitReplyView($event,true)" ng-disabled="contentComment == ''">Reply</button>
                                        </div>
                                    </div>`

            $scope.commentUnderReply =` <div class="row d-flex bg-white rounded-3 mt-1 mb-3 p-3 px-4" role="underCommentReply">
                                            <div class="col-3 col-sm-2 col-lg-1">
                                                <img src="`+$scope.currentUser.image.png+`" class="img-fluid w-50" alt="profilCurrentUserUnderReply">
                                            </div>
                                            <div class="col-5 col-sm-7 col-lg-9">
                                                <textarea class="h-100 w-100" ng-model="contentComment"></textarea>
                                            </div>
                                            <div class="row col-4 col-sm-3 col-lg-2">
                                                <button type="button" class="btn btn-sm btn-soft-red fw-bold my-1" ng-click="deleteReplyview()">Dell</button> 
                                                <button type="button" class="btn btn-sm btn-moderate-blue fw-bold my-1" ng-click="submitReplyView($event,false)" ng-disabled="contentComment =='' ">Reply</button> 
                                            </div>
                                        </div>`
            $scope.idMax = 0
            $scope.autorisationReplyView = false
            $scope.autorisationEditView = false
            window.screen.width > 500 ? $scope.mobileDesign = false : $scope.mobileDesign = true

            //Generat HTML
            dataJSON.data.comments.forEach(function(comment){

                //Define dynamically track the time since the comment was posted
                var dataCurrent = moment(comment.createdAt, "DD.MM.YYYY HH:mm:ss");
                var model = $parse("date"+comment.id)
                model.assign($scope,dataCurrent)

                $scope.idMax = comment.id > $scope.idMax ? comment.id : $scope.idMax ;
                var authorizationCurrentUser = ($scope.currentUser.username == comment.user.username ? true : false)
                bodyHTML = bodyHTML + ` <div class="mt-3"> 
                                            <div class="row bg-white rounded-1 p-3" ng-class="`+authorizationCurrentUser+` ? 'border-moderate-blue' : ''" id="`+comment.id+`" role="main">
                                                <div class="col-sm-8 col-md-10 col-lg-10 col-xl-10 order-sm-1">
                                                    <div class="row d-flex align-items-center">
                                                        <div class="col-2 col-sm-3">
                                                            <img src="`+comment.user.image.png+`" class="img-fluid" alt="userProfileComment`+comment.id+`">
                                                        </div>
                                                        <div class="col-5 col-sm-4 fw-bold">
                                                            `+comment.user.username+`
                                                        </div>
                                                        <div class="col-5 col-sm-5 d-flex justify-content-end">
                                                            <span am-time-ago="date`+comment.id+`" ng-model="date`+comment.id+`" ></span>
                                                        </div>
                                                        <div class="col-12 d-flex justify-content-end" ng-show="!mobileDesign">`+
                                                            
                                                            (authorizationCurrentUser ? 
                                                                `<button type="button" class="btn btn-white fw-bold text-soft-red" ng-click="deleteCommentLocation($event)" data-bs-toggle="modal" data-bs-target="#dellModal">
                                                                    <img src="./images/icon-delete.svg" alt="commentDell`+comment.id+`" class="d-inline-block align-items-center mx-2 mb-1">
                                                                    Dell
                                                                </button>
                                                                
                                                                <button type="button" class="btn btn-white fw-bold text-moderate-blue mx-1" ng-click="askEditComment($event)" ng-disabled="autorisationReplyView || autorisationEditView">
                                                                    <img src="./images/icon-edit.svg" alt="commentEdit`+comment.id+`" class="d-inline-block align-items-center mx-2 mb-1">
                                                                    Edit
                                                                </button>`
                                                                : 
                                                                `<button type="button" class="btn btn-white fw-bold text-moderate-blue mx-1" ng-click="askReplyView($event,true)" ng-disabled="autorisationReplyView || autorisationEditView">
                                                                    <img src="./images/icon-reply.svg" alt="commentReply`+comment.id+`" class="d-inline-block align-items-center mx-2 mb-1">
                                                                    Reply
                                                                </button>`)

                                                        +`</div>
                                                        <div class="col-12 mt-1" id="text`+comment.id+`">
                                                            <p class="w-100 fs-6">`+comment.content+`</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-4 col-md-2 col-lg-2 col-xl-2 order-sm-0">
                                                    <div class="row">
                                                        <div class="col-5 col-sm-12 bg-very-light-gray rounded-1 d-flex justify-content-evenly align-items-center p-1">
                                                            <button type="button" class="btn btn-sm btn-very-light-gray d-flex align-items-center" ng-click="modifyScore($event,true)" ng-disabled="`+authorizationCurrentUser+` || '`+comment.scoreModified+`' == 'up'" >
                                                                <img ng-src="./images/icon-plus.svg" alt="commentPlus`+comment.id+`">
                                                            </button>
                                                            <div class="text-moderate-blue fw-bold ">
                                                                `+comment.score+`
                                                            </div>
                                                            <button type="button" class="btn btn-sm btn-very-light-gray d-flex align-items-center" ng-click="modifyScore($event,false)"ng-disabled="`+authorizationCurrentUser+` || '`+comment.scoreModified+`' == 'down'" >
                                                                <img src="./images/icon-minus.svg" alt="commentMinus`+comment.id+`">
                                                            </button> 
                                                        </div>
                                                        <div class="col-7 d-flex justify-content-end" ng-show="mobileDesign">`+
                                                            
                                                        (authorizationCurrentUser ? 
                                                            `<button type="button" class="btn btn-white fw-bold text-soft-red" ng-click="deleteCommentLocation($event)" data-bs-toggle="modal" data-bs-target="#dellModal">
                                                                <img src="./images/icon-delete.svg" alt="commentDell`+comment.id+`V2" class="d-inline-block align-items-center mx-2 mb-1">
                                                                Dell
                                                            </button>
                                                            <button type="button" class="btn btn-white fw-bold text-moderate-blue mx-1" ng-click="askEditComment($event)" ng-disabled="autorisationReplyView || autorisationEditView">
                                                                <img src="./images/icon-edit.svg" alt="commentEdit`+comment.id+`V2" class="d-inline-block align-items-center mx-2 mb-1">
                                                                Edit
                                                            </button>`
                                                            : 
                                                            `<button type="button" class="btn btn-white fw-bold text-moderate-blue mx-1" ng-click="askReplyView($event,true)" ng-disabled="autorisationReplyView || autorisationEditView">
                                                                <img src="./images/icon-reply.svg" alt="commentReply`+comment.id+`" class="d-inline-block align-items-center mx-2 mb-1">
                                                                Reply
                                                            </button>`)

                                                        +`</div>
                                                    </div>
                                                </div>
                                            </div>`

                if(comment.replies.length != 0){
                    bodyHTML = bodyHTML + ` <div class="row mt-5">
                                                <!-- Start under comment -->
                                                <div class="col-2 d-flex">
                                                    <!-- vertical line -->
                                                    <div class="vr m-1 mb-3 position-relative top-0 start-50">
                                                </div>
                                            </div>
                                            <div class="col-10">`
                    comment.replies.forEach(function(underComment){
                        var authorizationCurrentUser = ($scope.currentUser.username == underComment.user.username ? true : false)
                        $scope.idMax = underComment.id > $scope.idMax ? underComment.id : $scope.idMax ; 
                        
                        //Define dynamically track the time since the reply was posted
                        var dataCurrent = moment(underComment.createdAt, "DD.MM.YYYY HH:mm:ss");
                        var model = $parse("date"+underComment.id)
                        model.assign($scope,dataCurrent)

                        bodyHTML = bodyHTML + `<div class="row bg-white rounded-3 p-3 mb-3" id="`+underComment.id+`" ng-class="`+authorizationCurrentUser+` ? 'border-moderate-blue' : ''" id="`+comment.id+`" role="article">
                                                    <div class="col-sm-8 col-md-9 col-lg-10 col-xl-10 order-sm-1">
                                                        <div class="row d-flex align-items-center"><div class="col-3 col-sm-3 col-md-3">
                                                            <img src="`+underComment.user.image.png+`" class="img-fluid" alt="userProfileUnderComment`+underComment.id+`">
                                                        </div>
                                                        <div class="col-5 col-sm-5 col-md-4 fw-bold">
                                                            `+underComment.user.username+`
                                                        </div>
                                                        <div class="col-4 col-sm-4 col-md-5 d-flex justify-content-end">
                                                            <span am-time-ago="date`+underComment.id+`" ng-model="date`+underComment.id+`" ></span>
                                                        </div>
                                                        <div class="col-12 d-flex justify-content-end" ng-show="!mobileDesign">`+
                                                            
                                                        (authorizationCurrentUser ? 
                                                            `<button type="button" class="btn btn-white fw-bold text-soft-red" ng-click="deleteCommentLocation($event)" data-bs-toggle="modal" data-bs-target="#dellModal">
                                                                <img src="./images/icon-delete.svg" alt="underCommentDell`+underComment.id+`" class="d-inline-block align-items-center mx-2 mb-1">
                                                                Dell
                                                            </button>
                                                            <button type="button" class="btn btn-white fw-bold text-moderate-blue mx-1" ng-click="askEditComment($event)" ng-disabled="autorisationReplyView || autorisationEditView">
                                                                <img src="./images/icon-edit.svg" alt="underCommentEdit`+underComment.id+`" class="d-inline-block align-items-center mx-2 mb-1">
                                                                Edit
                                                            </button>`

                                                            :

                                                            `<button type="button" class="btn btn-white fw-bold text-moderate-blue mx-1" ng-click="askReplyView($event,false)" ng-disabled="autorisationReplyView || autorisationEditView">
                                                                <img src="./images/icon-reply.svg" alt="underCommentReply`+underComment.id+`" class="d-inline-block align-items-center mx-2 mb-1">
                                                                Reply
                                                            </button>`)

                                                        +`</div>
                                                        <div class="col-12 mt-1" id="text`+underComment.id+`">
                                                            <p class="w-100 fs-6">
                                                                <strong class="text-moderate-blue">@`+underComment.replyingTo+`</strong> `+underComment.content+`
                                                            </p>
                                                        </div> 
                                                    </div>
                                                </div>
                                                <div class="col-sm-4 col-md-3 col-lg-2 col-xl-2 order-sm-0">
                                                    <div class="row row-cols-sm-1">
                                                        <div class="col-5 bg-very-light-gray rounded-1 d-flex justify-content-evenly align-items-center p-1">
                                                            <button type="button" class="btn btn-sm btn-very-light-gray d-flex align-items-center" ng-click="modifyScore($event,true)" ng-disabled="`+authorizationCurrentUser+` || '`+underComment.scoreModified+`' == 'up'">
                                                                <img src="./images/icon-plus.svg" alt="underCommentPlus`+underComment.id+`">
                                                            </button> 
                                                            <div class="text-moderate-blue fw-bold">
                                                                `+underComment.score+`
                                                            </div>
                                                            <button type="button" class="btn btn-sm btn-very-light-gray d-flex align-items-center" ng-click="modifyScore($event,false)" ng-disabled="`+authorizationCurrentUser+` || '`+underComment.scoreModified+`' == 'down'">
                                                                <img src="./images/icon-minus.svg" alt="underCommentMinus`+underComment.id+`">
                                                            </button>
                                                        </div>
                                                        <div class="col-7 d-flex justify-content-end" ng-show="mobileDesign">
                                                        `+
                                                            
                                                        (authorizationCurrentUser ? 
                                                            `<button type="button" class="btn btn-white fw-bold text-soft-red" ng-click="deleteCommentLocation($event)" data-bs-toggle="modal" data-bs-target="#dellModal">
                                                                <img src="./images/icon-delete.svg" alt="underCommentDell`+underComment.id+`V2" class="d-inline-block align-items-center mx-2 mb-1">
                                                                Dell
                                                            </button>
                                                            <button type="button" class="btn btn-white fw-bold text-moderate-blue mx-1" ng-click="askEditComment($event)" ng-disabled="autorisationReplyView || autorisationEditView">
                                                                <img src="./images/icon-edit.svg" alt="underCommentEdit`+underComment.id+`V2" class="d-inline-block align-items-center mx-2 mb-1">
                                                                Edit
                                                            </button>`

                                                            :

                                                            `<button type="button" class="btn btn-white fw-bold text-moderate-blue mx-1" ng-click="askReplyView($event,false)" ng-disabled="autorisationReplyView || autorisationEditView">
                                                                <img src="./images/icon-reply.svg" alt="underCommentReply`+underComment.id+`V2" class="d-inline-block align-items-center mx-2 mb-1">
                                                                Reply
                                                            </button>`)

                                                        +`
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`
                    })  
                    bodyHTML = bodyHTML + `</div>
                                            <!-- Modal -->
                                            <div class="modal fade" id="dellModal" tabindex="-1" aria-labelledby="dellModalLabel" aria-hidden="true">
                                                <div class="modal-dialog modal-sm">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="dellModalLabel">Delete Comment</h5>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            Are you sure you want to delete this comment ? This will remove the comment and can't be undone.
                                                        </div>
                                                        <div class="modal-footer d-flex justify-content-evenly">
                                                            <button type="button" class="btn btn-secondary fw-bold" ng-click="deleteCommentConfirme(false)" data-bs-dismiss="modal">NO, CANCEL</button>
                                                            <button type="button" class="btn btn-soft-red fw-bold" ng-click="deleteCommentConfirme(true)" data-bs-dismiss="modal">Save changes</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>`
                }
                bodyHTML = bodyHTML + "</div>"
            })
        }
        bodyHTML = bodyHTML + ` <div class="row d-flex bg-white rounded-3 mt-4 p-3 px-4" role="newComment">
                                    <div class="col-3 col-sm-2 col-md-2 col-lg-1">
                                        <img src="`+$scope.currentUser.image.png+`" class="img-fluid w-60" alt="userProfileCommentToAdd">
                                    </div>
                                    <div class="col-6 col-sm-8 col-md-8 col-lg-10">
                                        <textarea class="h-100 w-100" ng-model="contentMainComment"></textarea>
                                    </div>
                                    <div class="col-3 col-sm-2 col-md-2 col-lg-1">
                                        <button type="button" class="btn btn-moderate-blue fw-bold" ng-click="newComment($event)" ng-disabled="contentMainComment == null">Send</button>
                                    </div>
                                </div>`
        bodyHTML = $compile(bodyHTML)($scope)
        angular.element(document.getElementById("app")).append(bodyHTML)
    } 

        
}]);