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
        $("#new-spinner").addClass("fa-spin");
        return $http({
            data: { 
                sortField: "id",
                sortOrder: "descend",
                results: 6,
                page: 1
            },
            url: host+'/songs/list',
            withCredentials: true,
            method: 'POST'
        }).then(function (response){
            $("#new-spinner").removeClass("fa-spin");
            console.log(response);
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.listNewSong = response.data.content;
        },function (error){
            $("#new-spinner").removeClass("fa-spin");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    songService.doGetSongById = function(data, callback){
        return $http({
            url: host+'/songs/'+data.songId,
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
            url: host+'/user/songs/'+data.songId,
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
        $("#mostview-spinner").addClass("fa-spin");
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
            url: host+'/songs/list',
            withCredentials: true,
            method: 'POST'
        }).then(function (response){
            $("#mostview-spinner").removeClass("fa-spin");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.listMostViewSong = response.data.content;
        },function (error){
            $("#mostview-spinner").removeClass("fa-spin");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    songService.doUserGetSongByKeyword = function(data){
        $(".search-spinner").removeClass("hidden");
        var auth = $cookies.get("auth");
        return $http({
            headers:{
                'Authorization' : 'Basic ' + auth,
            },
            data: { 
                keyword : data.keyword,
                sortField: "views",
                sortOrder: "descend",
                results: 18,
                page: data.page
            },
            url: host+'/user/songs/list',
            withCredentials: true,
            method: 'POST'
        }).then(function (response){
            $(".search-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.total = response.data.total;
            data.totalPage = Math.ceil(data.total/18);
            data.listResultSong = response.data.content;
        },function (error){
            $(".search-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    songService.doGetSongByKeyword = function(data){
        $(".search-spinner").removeClass("hidden");
        return $http({
            data: { 
                keyword : data.keyword,
                sortField: "views",
                sortOrder: "descend",
                results: 18,
                page: data.page
            },
            url: host+'/songs/list',
            withCredentials: true,
            method: 'POST'
        }).then(function (response){
            $(".search-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.total = response.data.total;
            data.totalPage = Math.ceil(data.total/18);
            data.listResultSong = response.data.content;
        },function (error){
            $(".search-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    songService.doUserViewSong = function(id){
        var auth = $cookies.get("auth");
        return $http({
            headers:{
                'Authorization' : 'Basic ' + auth,
            },
            url: host+'/user/songs/'+id+'/views',
            withCredentials: true,
            method: 'POST'
        }).then(function (response){
            console.log(response);
        },function (error){

        });
    };
    songService.doUserFavoriteSong = function(songId){
        var auth = $cookies.get("auth");
        return $http({
            headers:{
                'Authorization' : 'Basic ' + auth,
                'Content-Type': undefined
            },
            transformRequest: function (data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });
                return formData;
            },
            url: host+'/user/songs/'+songId+'/favorites',
            withCredentials: true,
            method: 'POST'
        }).then(function (response){
            console.log(response);
        },function (error){
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    }
    songService.doUserGetListNewSong = function(data){
        $("#new-spinner").addClass("fa-spin");
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
            url: host+'/user/songs/list',
            withCredentials: true,
            method: 'POST'
        }).then(function (response){
            $("#new-spinner").removeClass("fa-spin");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.listNewSong = response.data.content;
        },function (error){
            $("#new-spinner").removeClass("fa-spin");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    songService.doGetListMostFavoriteSong = function(data){
        $("#mostfavorite-spinner").addClass("fa-spin");
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
            url: host+'/songs/list',
            withCredentials: true,
            method: 'POST'
        }).then(function (response){
            $("#mostfavorite-spinner").removeClass("fa-spin");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.listMostFavoriteSong = response.data.content;
        },function (error){
            $("#mostfavorite-spinner").removeClass("fa-spin");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    songService.doUserGetListMostFavoriteSong = function(data){
        $("#mostfavorite-spinner").addClass("fa-spin");
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
            url: host+'/user/songs/list',
            withCredentials: true,
            method: 'POST'
        }).then(function (response){
            $("#mostfavorite-spinner").removeClass("fa-spin");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.listMostFavoriteSong = response.data.content;
        },function (error){
            $("#mostfavorite-spinner").removeClass("fa-spin");
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
            url: host+'/user/songs',
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
    songService.doUserAddComment = function(data, callback){
        var auth = $cookies.get("auth");
        return $http({
            headers:{
                'Authorization' : 'Basic ' + auth
            },
            data:{
                content : escape(data.comment.content)
            },
            url: host+'/user/songs/'+data.song.id+'/comments',
            withCredentials: true,
            method: 'POST'
        }).then(function (response){
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.c = response.data.content;
            callback();
        },function (error){
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    }
    songService.doGetCommentBySongId = function(data, callback){
        // $("#mostfavorite-spinner").addClass("fa-spin");
        return $http({
            data: { 
                page : data.page,
                results: 10
            },
            url: host+'/songs/'+data.songId+'/comments/list',
            withCredentials: true,
            method: 'POST'
        }).then(function (response){
            // $("#mostfavorite-spinner").removeClass("fa-spin");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.total = response.data.total;
            data.listComment = response.data.content;
            callback();
        },function (error){
            // $("#mostfavorite-spinner").removeClass("fa-spin");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    return songService;
}])