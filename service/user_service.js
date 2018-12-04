myApp.factory('userService', ['$http', '$cookies', '$location', function($http, $cookies, $location){
    var userService = {};
    var host = "http://localhost:8080"
    userService.doLogin = function(data){
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);
        var auth = btoa(unescape(data.username+":"+data.password));
        $("#login-spinner").removeClass("hidden")
        return $http({
            headers:{
                'Authorization' : 'Basic ' + auth,
                'Content-Type': 'application/json'
            },
            url: host+'/user/login',
            withCredentials: true,
            method: 'POST'
        }).then(function (response){
            $("#login-spinner").addClass("hidden");
            if(response.data.success){
                $cookies.put('id', response.data.content.id, {'expires': expireDate});
                $cookies.put('username', response.data.content.username, {'expires': expireDate});
                $cookies.put('fullname', response.data.content.fullname, {'expires': expireDate});
                $cookies.put('avatar', response.data.content.avatar, {'expires': expireDate});
                $cookies.put('role', response.data.content.role, {'expires': expireDate});
                $cookies.put('token', response.headers('x-auth-token'), {'expires': expireDate});
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
            url: host+'/users/username/'+data.user.username,
            withCredentials: true,
            method: 'GET'
        }).then(function (response){
            data.user = response.data.content;
        },function (error){
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    userService.doUserGetUserByUsername = function(data){
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            url: host+'/user/users/username/'+data.user.username,
            withCredentials: true,
            method: 'GET'
        }).then(function (response){
            data.user = response.data.content;
        },function (error){
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    userService.doGetUserById = function(data){
        return $http({
            url: host+'/users/'+data.user.id,
            method: 'GET'
        }).then(function (response){
            data.user = response.data.content;
            data.user.birthdate = new Date(moment(data.user.birthdate, "DD-MM-YYYY").format("MM-DD-YYYY"))
        },function (error){
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    userService.doUserGetUserById = function(data){
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            url: host+'/user/users/'+data.user.id,
            method: 'GET'
        }).then(function (response){
            data.user = response.data.content;
        },function (error){
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    userService.doGetUserByAuth = function(data){
        var username = $cookies.get("username");
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            url: host+'/user/users/auth',
            method: 'GET'
        }).then(function (response){
            data.user = response.data.content;
            data.user.birthdate = new Date(moment(data.user.birthdate, "DD-MM-YYYY").format("MM-DD-YYYY"))
            console.log(data.user.birthdate);
        },function (error){
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    userService.doEditUser = function(data){
        $("#edit-spinner").removeClass("hidden");
        console.log(data);
        if(data.user.note==undefined){
            data.user.note=""
        }
        if(data.user.phone==undefined){
            data.user.phone=""
        }
        var user = '{"fullname":"'+data.user.fullname+'", "birthdate":"'+moment(data.user.birthdate).format("DD-MM-YYYY")+'", "phone":"'+data.user.phone+
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
                file: data.avatar,
                user: user
            },
            transformRequest: function (data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });
                return formData;
            },
            url: host+'/user/users/'+data.user.id,
            method: 'PUT'
        }).then(function (response){
            $("#edit-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
            if(response.data.content&&response.data.content.avatar){
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
        $cookies.remove("token");
        $cookies.remove("id");
        $cookies.remove("avatar");
        $cookies.remove("username");
        $cookies.remove("role");
        $cookies.remove("fullname");
        $location.path("/login");
    };
    userService.doFollow = function(userId){
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            url: host+'/user/users/'+userId+'/follows',
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
    userService.getAuthStatus = function(){
        var status = $cookies.get('token');
        if(status){
            return true;
        }else{
            return false;
        }
    };
    userService.doUserGetUserByKeyword = function(data){
        $(".search-spinner").removeClass("hidden");
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            data: { 
                keyword : data.keyword,
                sortField: "followers",
                sortOrder: "descend",
                results: 18,
                page: data.page
            },
            url: host+'/user/users/list',
            method: 'POST'
        }).then(function (response){
            $(".search-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.total = response.data.total;
            data.totalPage = Math.ceil(data.total/18);
            data.listResultUser = response.data.content;
        },function (error){
            $(".search-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    userService.doUserGetMostFollowing = function(data){
        $(".search-spinner").removeClass("hidden");
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            data: { 
                sortField: "followers",
                sortOrder: "descend",
                results: 8,
                page: data.page
            },
            url: host+'/user/users/list',
            method: 'POST'
        }).then(function (response){
            $(".search-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.listMostFollowing = response.data.content;
        },function (error){
            $(".search-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    userService.doGetMostFollowing = function(data){
        $(".search-spinner").removeClass("hidden");
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            data: { 
                sortField: "followers",
                sortOrder: "descend",
                results: 8,
                page: data.page
            },
            url: host+'/users/list',
            method: 'POST'
        }).then(function (response){
            $(".search-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.listMostFollowing = response.data.content;
        },function (error){
            $(".search-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    userService.doGetUserByKeyword = function(data){
        $(".search-spinner").removeClass("hidden");
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            data: { 
                keyword : data.keyword,
                sortField: "followers",
                sortOrder: "descend",
                results: 18,
                page: data.page
            },
            url: host+'/users/list',
            method: 'POST'
        }).then(function (response){
            $(".search-spinner").addClass("hidden");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.total = response.data.total;
            data.totalPage = Math.ceil(data.total/18);
            data.listResultUser = response.data.content;
        },function (error){
            $(".search-spinner").addClass("hidden");
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    userService.getCookie = function(){
        return $cookies.get('username');
    }
    userService.doUserGetFollowing = function(data){
        return $http({
            headers:{
                'x-auth-token' : $cookies.get('token')
            },
            data: { 
                sortField: "timestamp",
                sortOrder: "descend",
                results: 10,
                page: 1
            },
            url: host+'/user/users/followings/list',
            method: 'POST'
        }).then(function (response){
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.listFollowing = response.data.content;
        },function (error){
            if(error.status==404){
                data.success=false;
                data.msg="Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    }
    return userService;
}])