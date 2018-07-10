myApp.factory('songService', ['$http', '$cookies', '$location', function($http, $cookies, $location){
    var songService = {};
    var host = "http://localhost:8080";
    songService.doEditUser = function(data){
        $("#edit-spinner").removeClass("hidden");
        var auth = $cookies.get("auth");
        if(data.note==undefined){
            data.note=""
        }
        if(data.birthdate==undefined){
            data.birthdate=""
        }
        if(data.phone==undefined){
            data.phone=""
        }
        return $http({
            headers:{
                'Authorization' : 'Basic ' + auth,
                'Content-Type': undefined
            },
            data: { 
                file: data.avatar,
                user: '{"fullname":"'+data.fullname+'", "birthdate":"'+data.birthdate+'", "phone":"'+data.phone+
                '", "note":"'+data.note+'"}'
            },
            transformRequest: function (data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });
                return formData;
            },
            url: host+'/user/edit',
            withCredentials: true,
            method: 'PUT'
        }).then(function (response){
            $("#edit-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
            if(response.data.content.avatar!=null){
                $cookies.put('avatar', response.data.content.avatar);
            }
            $cookies.put('fullname', response.data.content.fullname);
        },function (error){
            $("#edit-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    songService.doGetAllGenres = function(data){
        $http({
            url: host+'/user/genre/genres',
            withCredentials: true,
            method: 'GET'
        }).then(function (response){
            data.genres = response.data.content;
        });
    };
    songService.doAddSong = function(data){
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
                song: '{"title":"'+data.title+'", "genre": {"id":"'+data.genre.id+'"}, "lyric":"'+unescape(data.lyric)+
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