$('.lesson').slideUp();

$('.chap_name').on('click', function() {
    $(this).siblings('.lessons').children('.lesson').slideToggle();
});

$('.auto_play_line').on('click', function() {
    if ($('.auto_play_round').css('left') != '0px') {
        $(this).css({'background-color' : '#ccc'});
        $('.auto_play_round').css({'left' : '0'});
    }
    else {
        $(this).css({'background-color' : ' #5c9cfe'});
        $('.auto_play_round').css({'left':''});
    }
});

$('.slide_button').on('click', function() {
    $('.slide_bar').toggle('slide');
    $('.appear_button').css({'display':'block'})
});

$('.appear_button').on('click', function() {
    $('.slide_bar').toggle('slide');
    $('.appear_button').css({'display':'none'})
});