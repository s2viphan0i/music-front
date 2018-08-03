$(document).on('click', 'a[id^="navtoggle"]', function(e){
    $("#nav").toggleClass("nav-xs");
    $(".navbar-header").toggleClass("nav-xs");
});

$(document).on('click', 'i[id^="more"]', function(e){
    console.log("a");
    $('.lyric').toggleClass("height");
    $('#more').toggleClass("fa-chevron-down fa-chevron-up");
});