myApp.factory('userService', ['$http', '$cookies', '$location', function($http, $cookies, $location){
    var userService = {};
    var host = "http://localhost:8080"
    userService.doLogin = function(data){
        var auth = btoa(unescape(data.username+":"+data.password));
        $("#login-spinner").removeClass("hidden")
        return $http({
            headers:{
                'Content-Type': 'application/json',
            },
            data:{
                username:data.username,
                password:data.password
            },
            url: host+'/login',
            method: 'POST'
        }).then(function (response){
            $("#login-spinner").addClass("hidden");
            if(response.data.success){
                $cookies.put('id', response.data.content.id);
                $cookies.put('username', response.data.content.username);
                $cookies.put('fullname', response.data.content.fullname);
                $cookies.put('avatar', response.data.content.avatar);
                $cookies.put('auth', auth);
                $location.path('/home');
            }else{
                data.success=false;
                data.msg=response.data.msg;
            }
        },function (error){
            $("#login-spinner").addClass("hidden");
            console.log(error);
            if(error.status==401){
                data.success=false;
                data.msg="Sai tên đăng nhập hoặc mật khẩu";
            }
        });
    };
    userService.doRegister = function(data){
        $("#register-spinner").removeClass("hidden");
        return $http({
            headers:{
                'Content-Type': 'application/json'
            },
            data: { username: data.username,
                    password: data.password,
                    fullname: data.fullname,
                    email: data.email },
            url: host+'/register',
            method: 'POST'
        }).then(function (response){
            $("#register-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
        },function (error){
            $("#register-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    userService.doSendForgotPIN = function(data){
        $("#send-spinner").removeClass("hidden");
        return $http({
            headers:{
                'Content-Type': 'application/json'
            },
            data: { 
                email: data.email
            },
            url: host+'/forgot',
            method: 'POST'
        }).then(function (response){
            $("#send-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
        },function (error){
            $("#send-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    userService.doChangePassword = function(data){
        $("#change-spinner").removeClass("hidden");
        return $http({
            headers:{
                'Content-Type': 'application/json'
            },
            data: { 
                code: data.code,
                user:{
                    email:data.email,
                    password:data.password
                }
            },
            url: host+'/reset-password',
            method: 'POST'
        }).then(function (response){
            $("#change-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.email="";
            data.password="";
            data.password2="";
            data.code="";
        },function (error){
            $("#change-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    userService.doGetUserByUsername = function(data){
        return $http({
            headers:{

            },
            url: host+'/get-user-by-username?username='+data.username,
            withCredentials: true,
            method: 'GET'
        }).then(function (response){
            data.id = response.data.content.id;
            data.avatar = response.data.content.avatar;
            data.fullname = response.data.content.fullname;
            data.username = response.data.content.username;
            data.phone = response.data.content.phone;
            data.birthdate = response.data.content.birthdate;
            data.note = response.data.content.note;
        },function (error){
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    userService.doGetUserById = function(data){
        return $http({
            headers:{

            },
            url: host+'/get-user-by-id?id='+data.id,
            withCredentials: true,
            method: 'GET'
        }).then(function (response){
            data.id = response.data.content.id;
            data.avatar = response.data.content.avatar;
            data.fullname = response.data.content.fullname;
            data.username = response.data.content.username;
            data.phone = response.data.content.phone;
            data.birthdate = response.data.content.birthdate;
            data.note = response.data.content.note;
        },function (error){
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    userService.doGetUserByAuth = function(data){
        var auth = $cookies.get("auth");
        var username = $cookies.get("username");
        return $http({
            headers:{
                'Authorization' : 'Basic ' + auth
            },
            url: host+'/user/get-user-by-auth',
            withCredentials: true,
            method: 'GET'
        }).then(function (response){
            console.log(response);
            data.fullname = response.data.content.fullname;
            data.username = response.data.content.username;
            data.phone = response.data.content.phone;
            data.birthdate = response.data.content.birthdate;
            data.note = response.data.content.note;
        },function (error){
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    userService.doEditUser = function(data){
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
    userService.doLogout = function(){
        $cookies.remove("auth");
        $cookies.remove("avatar");
        $cookies.remove("username");
        $cookies.remove("fullname");
        $location.path("/login");
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