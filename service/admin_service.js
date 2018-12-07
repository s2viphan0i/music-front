myApp.factory('adminService', ['$http', '$cookies', '$location', function ($http, $cookies, $location) {
    var adminService = {};
    var host = "http://localhost:8080";
    adminService.doReportUpload = function (data) {
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token'),
                'Content-Type': undefined
            },
            data: {
                from: moment().subtract(9, 'days').format("DD-MM-YYYY"),
                to : moment().format("DD-MM-YYYY")
            },
            transformRequest: function (data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });
                return formData;
            },
            url: host + '/admin/report/songs',
            method: 'POST'
        }).then(function (response) {
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.uploads = response.data.content;
        }, function (error) {
            if (error.status == 404) {
                data.success = false;
                data.msg = "Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    }
    adminService.doReportView = function (data) {
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token'),
                'Content-Type': undefined
            },
            data: {
                from: moment().subtract(9, 'days').format("DD-MM-YYYY"),
                to : moment().format("DD-MM-YYYY")
            },
            transformRequest: function (data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });
                return formData;
            },
            url: host + '/admin/report/views',
            method: 'POST'
        }).then(function (response) {
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.views = response.data.content;
        }, function (error) {
            if (error.status == 404) {
                data.success = false;
                data.msg = "Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    }
    adminService.doReportFavorite = function (data) {
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token'),
                'Content-Type': undefined
            },
            data: {
                from: moment().subtract(9, 'days').format("DD-MM-YYYY"),
                to : moment().format("DD-MM-YYYY")
            },
            transformRequest: function (data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });
                return formData;
            },
            url: host + '/admin/report/favorites',
            method: 'POST'
        }).then(function (response) {
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.favorites = response.data.content;
        }, function (error) {
            if (error.status == 404) {
                data.success = false;
                data.msg = "Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    }
    adminService.doReportFollow = function (data) {
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token'),
                'Content-Type': undefined
            },
            data: {
                from: moment().subtract(9, 'days').format("DD-MM-YYYY"),
                to : moment().format("DD-MM-YYYY")
            },
            transformRequest: function (data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });
                return formData;
            },
            url: host + '/admin/report/follows',
            method: 'POST'
        }).then(function (response) {
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.follows = response.data.content;
        }, function (error) {
            if (error.status == 404) {
                data.success = false;
                data.msg = "Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    }
    adminService.doReportUser = function (data) {
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token'),
                'Content-Type': undefined
            },
            data: {
                from: moment().subtract(9, 'days').format("DD-MM-YYYY"),
                to : moment().format("DD-MM-YYYY")
            },
            transformRequest: function (data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });
                return formData;
            },
            url: host + '/admin/report/users',
            method: 'POST'
        }).then(function (response) {
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.users = response.data.content;
        }, function (error) {
            if (error.status == 404) {
                data.success = false;
                data.msg = "Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    }
    adminService.doGetSongByKeyword = function(data){
        return $http({
            data: { 
                keyword : data.keywordSong,
                sortField : "create_time",
                sortOrder: "descend",
                results: 10,
                page: data.pageSong
            },
            url: host+'/songs/list',
            method: 'POST'
        }).then(function (response){
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.totalSong = response.data.total;
            data.totalSongPage = Math.ceil(data.totalSong/10);
            data.listResultSong = response.data.content;
        },function (error){
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    adminService.doGetUserByKeyword = function(data){
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            data: { 
                keyword : data.keywordUser,
                sortField: "create_time",
                sortOrder: "descend",
                results: 10,
                page: data.pageUser
            },
            url: host+'/users/list',
            method: 'POST'
        }).then(function (response){
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.totalUser = response.data.total;
            data.totalUserPage = Math.ceil(data.totalUser/18);
            data.listResultUser = response.data.content;
        },function (error){
            $(".search-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    adminService.doEditSong = function(data){
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
            url: host+'/admin/songs/'+data.selected.song.id,
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
    adminService.doDeleteSong = function(data){
        $("#delete-spinner").removeClass("hidden");
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            url: host+'/admin/songs/'+data.selected.song.id,
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
    adminService.doEditUser = function(data){
        $(".edit-spinner").removeClass("hidden");
        if(data.user.note==undefined){
            data.user.note=""
        }
        if(data.user.phone==undefined){
            data.user.phone=""
        }
        var user = '{"fullname":"'+data.user.fullname+'", "birthdate":"'+moment(data.user.birthdate).format("YYYY-MM-DD")+'", "phone":"'+data.user.phone+
        '", "note":"'+data.user.note+'"}'
        if(data.user.birthdate==undefined){
            var user = '{"fullname":"'+data.user.fullname+'", "phone":"'+data.user.phone+
                '", "note":"'+data.user.note+'"}'
        }
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token'),
                'Content-Type': undefined
            },
            data: { 
                file: data.user.avatar,
                user: user
            },
            transformRequest: function (data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });
                return formData;
            },
            url: host+'/admin/users/'+data.user.id,
            method: 'PUT'
        }).then(function (response){
            $(".edit-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.user = response.data.content
        },function (error){
            $(".edit-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    return adminService;
}])