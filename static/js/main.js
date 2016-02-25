$(document).ready(function(){
    var w = window.innerWidth;
    if (w < 768) {
        $('nav').removeClass('navbar-fixed-top');
        $('.main-cont').css('padding-top','0');
        $('#minihr').hide();
        $('#to-top').hide();
    }
    $('.races, .candidates').hide();
    $('.race-btn').click(function(){
        if($('.races').css('display') == 'none' ) {
            $('.races').slideDown('fast');
            $('#ico1').removeClass('fa-caret-right').addClass('fa-caret-down');
        } else {
            $('.races').slideUp('fast');
            $('#ico1').removeClass('fa-caret-down').addClass('fa-caret-right');
        }
    });
    $('.cand-btn').click(function(){
        if($('.candidates').css('display') == 'none' ) {
            $('.candidates').slideDown("fast");
            $('#ico2').removeClass('fa-caret-right').addClass('fa-caret-down');
        } else {
            $('.candidates').slideUp("fast");
            $('#ico2').removeClass('fa-caret-down').addClass('fa-caret-right');
        }
    });
    $('.race-link').click(function(){
        $('races').slideUp('fast');
        $('#ico1').removeClass('fa-caret-down').addClass('fa-caret-right');
    });
});