$(document).on('click', 'a[id^="navtoggle"]', function (e) {
    $("#nav").toggleClass("nav-xs");
    $(".navbar-header").toggleClass("nav-xs");
});

$(document).on('click', 'i[id^="more"]', function (e) {
    $('.lyric').toggleClass("height");
    $('#more').toggleClass("fa-chevron-down fa-chevron-up");
});
$(document).on("mouseenter", "i.remove-hover", function() {
    $(this).removeClass('text-success icon-check');
    $(this).addClass('text-danger icon-close');
});

$(document).on("mouseleave", "i.remove-hover", function() {
    $(this).removeClass('text-danger icon-close');
        $(this).addClass('text-success icon-check');
});