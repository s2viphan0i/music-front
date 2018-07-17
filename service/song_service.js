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