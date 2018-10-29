myApp.factory('songService', ['$http', '$cookies', '$location', function($http, $cookies, $location){
    var songService = {};
    var host = "http://localhost:8080";
    songService.doGetAllGenres = function(data){
        $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            url: host+'/user/genre/genres',
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
    songService.doGetListRecommendSong = function(data){
        return $http({
            url: host+'/songs/'+data.song.id+'/recommends',
            method: 'GET'
        }).then(function (response){
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.listRecommendSong = response.data.content;
        },function (error){
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    songService.doGetSongById = function(data, callback){
        return $http({
            url: host+'/songs/'+data.song.id,
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
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            url: host+'/user/songs/'+data.song.id,
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
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            data: { 
                keyword : data.keyword,
                sortField: "views",
                sortOrder: "descend",
                results: 18,
                page: data.page
            },
            url: host+'/user/songs/list',
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
    songService.doUserGetSongByUserId = function(data){
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
            url: host+'/user/songs/list',
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
    songService.doGetSongByUserId = function(data){
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
            url: host+'/songs/list',
            withCredentials: true,
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
    songService.doUserViewSong = function(id){
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            url: host+'/user/songs/'+id+'/views',
            method: 'POST'
        }).then(function (response){
            console.log(response);
        },function (error){

        });
    };
    songService.doUserFavoriteSong = function(songId){
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            url: host+'/user/songs/'+songId+'/favorites',
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
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            data: { 
                sortField: "id",
                sortOrder: "descend",
                results: 6,
                page: 1
            },
            url: host+'/user/songs/list',
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
    songService.doUserGetListFollowingSong = function(data){
        $("#following-spinner").addClass("fa-spin");
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            data: { 
                sortField: "create_time",
                sortOrder: "descend",
                results: 6,
                page: 1
            },
            url: host+'/user/songs/following/list',
            method: 'POST'
        }).then(function (response){
            $("#following-spinner").removeClass("fa-spin");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.listFollowingSong = response.data.content;
        },function (error){
            $("#following-spinner").removeClass("fa-spin");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    songService.doUserGetListFavoriteSong = function(data){
        $("#favorite-spinner").addClass("fa-spin");
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            data: { 
                sortField: "timestamp",
                sortOrder: "descend",
                results: 6,
                page: 1
            },
            url: host+'/user/songs/favorite/list',
            method: 'POST'
        }).then(function (response){
            $("#favorite-spinner").removeClass("fa-spin");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.listFavoriteSong = response.data.content;
        },function (error){
            $("#favorite-spinner").removeClass("fa-spin");
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
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
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
        if(data.lyric==undefined){
            data.lyric="";
        }
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token'),
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
    songService.doEditSong = function(data){
        $("#edit-spinner").removeClass("hidden");
        if(data.selected.song.lyric==undefined){
            data.selected.song.lyric="";
        }
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token'),
                'Content-Type': undefined
            },
            data: { 
                image: data.selected.song.image,
                song: '{"title":"'+data.selected.song.title+'", "genre": {"id":"'+data.selected.song.genre.id+'"}, "lyric":"'+escape(data.selected.song.lyric)+'"}'
            },
            transformRequest: function (data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });
                return formData;
            },
            url: host+'/user/songs/'+data.selected.song.id,
            method: 'PUT'
        }).then(function (response){
            $("#edit-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
        },function (error){
            $("#edit-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    songService.doDeleteSong = function(data){
        $("#delete-spinner").removeClass("hidden");
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            url: host+'/user/songs/'+data.selected.song.id,
            method: 'DELETE'
        }).then(function (response){
            $("#delete-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
        },function (error){
            $("#delete-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    return songService;
}])