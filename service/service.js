myApp.factory('userService', ['$http', '$cookies', '$location', function($http, $cookies, $location){
    var userService = {};
    userService.doLogin = function(user){
        var auth = btoa(unescape(user.username+":"+user.password));
        return $http({
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Basic '+auth
            },
            url: 'http://localhost:8080/music-api/user/login',
            method: 'POST'
        }).then(function (response){
            $cookies.put('username', response.data.content.username);
            $cookies.put('email', response.data.content.email);
            $location.path('/home');
        },function (error){
            console.log(error);
            if(error.status==401){
                user.error="Đăng nhập không thành công";
            }
        });
    };
    userService.getAuthStatus = function(){
        var status = $cookies.get('username');
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