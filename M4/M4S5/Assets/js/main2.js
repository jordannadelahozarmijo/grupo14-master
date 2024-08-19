//
$(function () {
    $("h4").click(function () {
        $(this).fadeOut();
    });
});

$(function () {
    $("h3").mouseenter(function () {
        $(this).animate({marginLeft: '50px'}, "slow", function () {
            $(this).css({ "color": "blue", "backgroundColor": "yellow"})
        })
    });
    $("h3").mouseleave(function () {
        $(this).animate({marginRight: '50px',width: '10em'}, "fast", function () {
            $(this).css({ "color": "white", "backgroundColor": "black"})
        })
    });
});
   