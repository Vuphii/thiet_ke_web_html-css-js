$(document).ready(function(){
    $(window).scroll(function(){
        if($(this).scrollTop()){
            $('header').addClass('sticky');
        }else{
            $('header').removeClass('sticky');
        }
    })
});



$(document).ready(function(){
    $(window).scroll(function(){
        if ($(this).scrollTop()){
            $('#backtop').fadeIn();
        } else{
            $('#backtop').fadeOut();
        }
    });
    $("#backtop").click(function(){
        $('html, body').animate({scrollTop: 0}, 1000);
    });
});