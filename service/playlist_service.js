myApp.factory('playlistService', ['$http', '$cookies', '$location', function($http, $cookies, $location){
    var playlistService = {};
    var host = "http://localhost:8080";
    playlistService.doCreatePlaylist = function(data){
        $("#add-spinner").removeClass("hidden");
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token'),
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
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            url: host+'/user/playlists/list',
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
                'x-auth-token' : $cookies.get('token')
            },
            data: { 
                id: song.id
            },
            url: host+'/user/playlists/'+playlist.id+'/songs/',
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
    playlistService.doRemoveSongFromPlaylist = function(song, playlist, data){
        var auth = $cookies.get("auth");
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            url: host+'/user/playlists/'+playlist.id+'/songs/'+song.id,
            method: 'DELETE'
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
    playlistService.doGetPlaylistById = function(data){
        return $http({
            url: host+'/playlists/'+data.playlist.id,
            method: 'GET'
        }).then(function (response){
            // $("#new-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.playlist = response.data.content;
        },function (error){
            // $("#new-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    playlistService.doUserGetPlaylistByUserId = function(data){
        $(".song-spinner").removeClass("hidden");
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            data: { 
                keyword : data.keyword,
                sortField: "create_time",
                userId: data.user.id,
                sortOrder: "descend",
                results: 18,
                page: data.page
            },
            url: host+'/playlists/list',
            method: 'POST'
        }).then(function (response){
            $(".song-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.total = response.data.total;
            data.totalPage = Math.ceil(data.total/18);
            for(var i=0; i<response.data.content.length;i++){
                data.listResult.push(response.data.content[i]);
            }
        },function (error){
            $(".song-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    playlistService.doGetPlaylistByKeyWord = function(data){
        $(".playlist-spinner").removeClass("hidden");
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            data: { 
                keyword : data.keyword,
                sortField: "create_time",
                sortOrder: "descend",
                results: 18,
                page: data.page
            },
            url: host+'/playlists/list',
            method: 'POST'
        }).then(function (response){
            $(".playlist-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.total = response.data.total;
            data.totalPage = Math.ceil(data.total/18);
            data.listResultPlaylist = response.data.content;
        },function (error){
            $(".playlist-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    playlistService.doGetPlaylistByUserId = function(data){
        $(".search-spinner").removeClass("hidden");
        return $http({
            data: { 
                keyword : data.keyword,
                sortField: "create_time",
                userId: data.user.id,
                sortOrder: "descend",
                results: 18,
                page: data.page
            },
            url: host+'/playlists/list',
            method: 'POST'
        }).then(function (response){
            $(".search-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.total = response.data.total;
            data.totalPage = Math.ceil(data.total/18);
            for(var i=0; i<response.data.content.length;i++){
                data.listResult.push(response.data.content[i]);
            }
        },function (error){
            $(".search-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    return playlistService;
}]);