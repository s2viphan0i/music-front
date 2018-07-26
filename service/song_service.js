myApp.factory('songService', ['$http', '$cookies', '$location', function($http, $cookies, $location){
    var songService = {};
    var host = "http://localhost:8080";
    songService.doGetAllGenres = function(data){
        var auth = $cookies.get("auth");
        $http({
            headers:{
                'Authorization' : 'Basic ' + auth,
                'Content-Type': undefined
            },
            url: host+'/user/genre/genres',
            withCredentials: true,
            method: 'GET'
        }).then(function (response){
            data.genres = response.data.content;
        });
    };
    songService.doGetListNewSong = function(data){
        $("#new-spinner").removeClass("hidden");
        return $http({
            data: { 
                sortField: "id",
                sortOrder: "descend",
                results: 6,
                page: 1
            },
            url: host+'/song/get-list',
            withCredentials: true,
            method: 'POST'
        }).then(function (response){
            $("#new-spinner").addClass("hidden");
            console.log(response);
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.listNewSong = response.data.content;
        },function (error){
            $("#new-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    songService.doGetSongById = function(data, callback){
        return $http({
            url: host+'/song?id='+data.songId,
            withCredentials: true,
            method: 'GET'
        }).then(function (response){
            // $("#new-spinner").addClass("hidden");
            console.log(response);
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.song = response.data.content;
            callback();
        },function (error){
            // $("#new-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    songService.doUserGetSongById = function(data, callback){
        var auth = $cookies.get("auth");
        return $http({
            headers:{
                'Authorization' : 'Basic ' + auth,
            },
            url: host+'/user/song?id='+data.songId,
            withCredentials: true,
            method: 'GET'
        }).then(function (response){
            // $("#new-spinner").addClass("hidden");
            console.log(response);
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.song = response.data.content;
            callback();
        },function (error){
            // $("#new-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    songService.doGetListMostViewSong = function(data){
        $("#mostview-spinner").removeClass("hidden");
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var firstDayString = moment(firstDay.toString()).format("DD-MM-YYYY")
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var lastDayString = moment(lastDay.toString()).format("DD-MM-YYYY");
        return $http({
            data: { 
                sortField: "views",
                sortOrder: "descend",
                results: 5,
                page: 1,
                favoriteStartDate : firstDayString,
                favoriteEndDate : lastDayString
            },
            url: host+'/song/get-list',
            withCredentials: true,
            method: 'POST'
        }).then(function (response){
            $("#mostview-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.listMostViewSong = response.data.content;
        },function (error){
            $("#mostview-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    songService.doUserGetListNewSong = function(data){
        $("#new-spinner").removeClass("hidden");
        var auth = $cookies.get("auth");
        return $http({
            headers:{
                'Authorization' : 'Basic ' + auth,
            },
            data: { 
                sortField: "id",
                sortOrder: "descend",
                results: 6,
                page: 1
            },
            url: host+'/user/song/get-list',
            withCredentials: true,
            method: 'POST'
        }).then(function (response){
            $("#new-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.listNewSong = response.data.content;
        },function (error){
            $("#new-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    songService.doGetListMostFavoriteSong = function(data){
        $("#mostfavorite-spinner").removeClass("hidden");
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var firstDayString = moment(firstDay.toString()).format("DD-MM-YYYY")
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var lastDayString = moment(lastDay.toString()).format("DD-MM-YYYY")
        console.log(firstDayString);
        console.log(lastDayString);
        return $http({
            data: { 
                sortField: "favorites",
                sortOrder: "descend",
                results: 6,
                page: 1,
                favoriteStartDate : firstDayString,
                favoriteEndDate : lastDayString
            },
            url: host+'/song/get-list',
            withCredentials: true,
            method: 'POST'
        }).then(function (response){
            $("#mostfavorite-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.listMostFavoriteSong = response.data.content;
        },function (error){
            $("#mostfavorite-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    songService.doUserGetListMostFavoriteSong = function(data){
        $("#mostfavorite-spinner").removeClass("hidden");
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var firstDayString = moment(firstDay.toString()).format("DD-MM-YYYY")
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var lastDayString = moment(lastDay.toString()).format("DD-MM-YYYY")
        var auth = $cookies.get("auth");
        return $http({
            headers:{
                'Authorization' : 'Basic ' + auth,
            },
            data: { 
                sortField: "favorites",
                sortOrder: "descend",
                results: 6,
                page: 1,
                favoriteStartDate : firstDayString,
                favoriteEndDate : lastDayString
            },
            url: host+'/user/song/get-list',
            withCredentials: true,
            method: 'POST'
        }).then(function (response){
            $("#mostfavorite-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.listMostFavoriteSong = response.data.content;
        },function (error){
            $("#mostfavorite-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    songService.doAddSong = function(data){
        if(data.mode === undefined){
            data.mode = true;
        }
        $("#add-spinner").removeClass("hidden");
        var auth = $cookies.get("auth");
        if(data.lyric==undefined){
            data.lyric="";
        }
        return $http({
            headers:{
                'Authorization' : 'Basic ' + auth,
                'Content-Type': undefined
            },
            data: { 
                file: data.file,
                image: data.image,
                song: '{"title":"'+data.title+'", "genre": {"id":"'+data.genre.id+'"}, "lyric":"'+escape(data.lyric)+
                '", "mode":"'+data.mode+'"}'
            },
            transformRequest: function (data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });
                return formData;
            },
            url: host+'/user/song/add',
            withCredentials: true,
            method: 'POST'
        }).then(function (response){
            $("#add-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
        },function (error){
            $("#add-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    return songService;
}])