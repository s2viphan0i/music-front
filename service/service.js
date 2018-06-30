myApp.factory('userService', ['$http', '$cookies', '$location', function($http, $cookies, $location){
    var userService = {};
    userService.doLogin = function(data){
        var auth = btoa(unescape(data.username+":"+data.password));
        return $http({
            headers:{
                'Content-Type': 'application/json',
            },
            data:{
                username:data.username,
                password:data.password
            },
            url: 'http://localhost:8080/music-api/login',
            method: 'POST'
        }).then(function (response){
            if(response.data.success){
                $cookies.put('username', response.data.content.username);
                $cookies.put('email', response.data.content.email);
                $cookies.put('auth', auth);
                $location.path('/home');
            }else{
                data.success=false;
                data.msg=response.data.msg;
            }
        },function (error){
            console.log(error);
            if(error.status==401){
                data.success=false;
                data.msg="Sai tên đăng nhập hoặc mật khẩu";
            }
        });
    };
    userService.doRegister = function(data){
        return $http({
            headers:{
                'Content-Type': 'application/json'
            },
            data: { username: data.username,
                    password: data.password,
                    fullname: data.fullname,
                    email: data.email },
            url: 'http://localhost:8080/music-api/register',
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
    userService.getAuthStatus = function(){
        var status = $cookies.get('auth');
        if(status){
            return true;
        }else{
            return false;
        }
    };
    userService.getCookie = function(){
        return $cookies.get('auth');
    }
    return userService;
}])