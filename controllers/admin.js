var myApp = angular.module('myApp');
myApp.controller('AdminController', ['$scope', '$http', '$cookies', 'adminService', 'userService', 'songService', '$location', '$routeParams', function ($scope, $http, $cookies, adminService, userService, songService, $location, $routeParams) {
    console.log('AdminController loaded...');
    $scope.data = [];
    var d1 = [];
    $scope.dateOptions = {
		onClose: (value, picker, $element) => {
			$element.focus()
		},
		dateFormat: 'dd-mm-yy'
	}
    $scope.init = function(){
        $scope.reportUpload();
        $scope.reportView();
        $scope.reportFavorite();
        $scope.reportFollow();
        $scope.reportUser();
        $scope.search(1,"song");
        $scope.search(1,"user");
    }
    $scope.reportView = function(){
        adminService.doReportView($scope.data);
    }
    $scope.reportFavorite = function(){
        adminService.doReportFavorite($scope.data);
    }
    $scope.reportFollow = function(){
        adminService.doReportFollow($scope.data);
    }
    $scope.reportUser = function(){
        adminService.doReportUser($scope.data);
    }  
    $scope.reportUpload = function () {
        if ($cookies.get('role') == 'ROLE_ADMIN') {
            adminService.doReportUpload($scope.data).then(function(){
                var date = new Date();
                var j = new Date();
                j.setDate(j.getDate()-9)
                d1.labels = [];
                d1.datasets = [{
                    label: 'uploads',
                    data: [],
                    borderColor: "#1ab667",
                    pointColor: "#fff",
                    backgroundColor : "rgba(32,201,116,0.4)",
                    pointBackgroundColor: "#fff",
                    pointRadius: 5,
                    pointBorder: 2
                }]
                for(j;j<=date; j.setDate(j.getDate()+1)){
                    var temp = _.findLastIndex($scope.data.uploads, {create_time: moment(j.toString()).format("MM-DD-YYYY")});
                    d1.labels.push(moment(j.toString()).format('DD-MM-YYYY'));
                    if(temp!=-1){
                        d1.datasets[0].data.push($scope.data.uploads[temp].uploads);
                    }else{
                        d1.datasets[0].data.push(0);
                    }
                }
                var myLineChart = new Chart(document.getElementById("line-chart"), {
                    type: 'line',
                    data: d1,
                    options: {
                        elements: {
                            line: {
                                tension: 0
                            }
                        },
                        scales: {
                            yAxes: [{
                                    display: true,
                                    ticks: {
                                        beginAtZero: true,
                                        minStepSize: 1
                                    }
                                }]
                        },
                    }
                });
            })
        }
    }
	$scope.search = function(page, type){
		switch(type){
            case "song":
                $scope.data.pageSong = page;
                adminService.doGetSongByKeyword($scope.data);
				break;
            case "user":
                $scope.data.pageUser = page;
                adminService.doGetUserByKeyword($scope.data);
				break;
		}
    }
    $scope.editSong = function(){
		adminService.doEditSong($scope.data);
	}
	$scope.deleteSong = function(){
		adminService.doDeleteSong($scope.data).then(function(){
            if($scope.data.success){
                var i = _.findLastIndex($scope.data.listResultSong, {
                    id: $scope.data.selected.song.id
                })
                $scope.data.listResultSong.splice(i, 1);
            }
        })
	}
    $scope.showEditSong = function(song){
		$scope.data.msg = '';
        $scope.data.success = undefined;
        $scope.data.song = song;
        songService.doGetSongById($scope.data).then(function(){
            $scope.data.song.lyric = unescape($scope.data.song.lyric);
            $scope.data.success = null;
            if($scope.data.song){
                $scope.data.selected = {
                    song : angular.copy($scope.data.song)
                }
            }
        })
		$scope.showEditSongModal=true;
	}
	$scope.hideEditSong = function(){
		$scope.showEditSongModal=false;
    }
    $scope.editUser = function(){
		adminService.doEditUser($scope.data);
	}
	$scope.deleteUser = function(){
		adminService.doDeleteUser($scope.data).then(function(){
            if($scope.data.success){
                var i = _.findLastIndex($scope.data.listResultUser, {
                    id: $scope.data.selected.user.id
                })
                $scope.data.listResultUser.splice(i, 1);
            }
        })
	}
    $scope.showEditUser = function(user){
        $scope.data.user = user;
        userService.doGetUserById($scope.data).then(function(){
            $scope.data.success = null;
        })
		$scope.showEditUserModal=true;
	}
	$scope.hideEditUser = function(){
		$scope.showEditUserModal=false;
	}
}]);