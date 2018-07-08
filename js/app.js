$(document).on('click', 'a[id^="navtoggle"]', function(e){
    $("#nav").toggleClass("nav-xs");
    $(".navbar-header").toggleClass("nav-xs");
});
$(document).on('click', 'a[id^="profiletoggle"]', function(e){
    $(".nav>.dropdown").toggleClass("open");
});
$(document).on('click', 'a[id^="dropuptoggle"]', function(e){
    $("footer>.dropdown").toggleClass("open");
});
$(document).on('click', 'a[id^="notitoggle"]', function(e){

});