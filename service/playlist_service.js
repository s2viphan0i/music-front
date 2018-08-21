myApp.factory('playlistService', ['$http', '$cookies', '$location', function($http, $cookies, $location){
    var playlistService = {};
    var host = "http://localhost:8080";
    playlistService.doCreatePlaylist = function(data){
        $("#add-spinner").removeClass("hidden");
        var auth = $cookies.get("auth");
        return $http({
            headers:{
                'Authorization' : 'Basic ' + auth,
                'Content-Type': undefined
            },
            data: { 
                image: data.playlist.image,
                playlist: '{"title":"'+data.playlist.title+'"}'
            },
            transformRequest: function (data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });
                return formData;
            },
            url: host+'/user/playlists',
            withCredentials: true,
            method: 'POST'
        }).then(function (response){
            $("#add-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.created = response.data.content;
        },function (error){
            $("#add-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    playlistService.doGetAllUserPlaylist = function(data){
        $("#playlist-spinner").removeClass("hidden");
        var auth = $cookies.get("auth");
        return $http({
            headers:{
                'Authorization' : 'Basic ' + auth,
                'Content-Type': undefined
            },
            url: host+'/user/playlists/list',
            withCredentials: true,
            method: 'POST'
        }).then(function (response){
            $("#playlist-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.userPlaylists = response.data.content;
        },function (error){
            $("#playlist-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    playlistService.doAddSongToPlaylist = function(song, playlist, data){
        var auth = $cookies.get("auth");
        return $http({
            headers:{
                'Authorization' : 'Basic ' + auth
            },
            data: { 
                id: song.id
            },
            url: host+'/user/playlists/'+playlist.id+'/songs',
            withCredentials: true,
            method: 'POST'
        }).then(function (response){
            data.success = response.data.success;
            data.msg = response.data.msg;
        },function (error){
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    return playlistService;
}]);