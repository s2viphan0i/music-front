myApp.factory('commentService', ['$http', '$cookies', '$location', function ($http, $cookies, $location) {
    var commentService = {};
    var host = "http://localhost:8080";
    commentService.doUserAddComment = function (data, callback) {
        var auth = $cookies.get("auth");
        return $http({
            headers: {
                'Authorization': 'Basic ' + auth
            },
            data: {
                content: escape(data.comment.content)
            },
            url: host + '/user/songs/' + data.song.id + '/comments',
            withCredentials: true,
            method: 'POST'
        }).then(function (response) {
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.c = response.data.content;
            callback();
        }, function (error) {
            if (error.status == 404) {
                data.success = false;
                data.msg = "Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    }
    commentService.doGetCommentBySongId = function (data, callback) {
        // $("#mostfavorite-spinner").addClass("fa-spin");
        return $http({
            data: {
                page: data.page,
                results: 10
            },
            url: host + '/songs/' + data.songId + '/comments/list',
            withCredentials: true,
            method: 'POST'
        }).then(function (response) {
            // $("#mostfavorite-spinner").removeClass("fa-spin");
            data.success = response.data.success;
            data.msg = response.data.msg;
            data.total = response.data.total;
            data.listComment = response.data.content;
            callback();
        }, function (error) {
            // $("#mostfavorite-spinner").removeClass("fa-spin");
            if (error.status == 404) {
                data.success = false;
                data.msg = "Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    };
    commentService.doUserDeleteComment = function (data, callback) {
        var auth = $cookies.get("auth");
        return $http({
            headers: {
                'Authorization': 'Basic ' + auth
            },
            url: host + '/user/comments/' + data.comment.id,
            withCredentials: true,
            method: 'DELETE'
        }).then(function (response) {
            data.success = response.data.success;
            data.msg = response.data.msg;
            callback();
        }, function (error) {
            if (error.status == 404) {
                data.success = false;
                data.msg = "Có lỗi xảy ra! Vui lòng thử lại";
            }
        });
    }
    return commentService;
}])