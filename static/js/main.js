$(document).ready(function(){
    (function($){

        $.fn.detachTemp = function() {
            this.data('dt_placeholder',$('<span style="display: none;" />').insertAfter( this ));
            return this.detach();
        }

        $.fn.reattach = function() {
            if(this.data('dt_placeholder')){
                this.insertBefore( this.data('dt_placeholder') );
                this.data('dt_placeholder').remove();
                this.removeData('dt_placeholder');
            }
            else if(window.console && console.error)
                console.error("Unable to append this element "
                    + "because its placeholder is not available.");
            return this;
        }

    })(jQuery);
//FIXME make sure that we can append elements back after we remove them from DOM FIXME
    //FIXME why does the append calls not get called the first time? make sure that they work on first try without refresh. if person refreshes the screen w already on the page then they should not get kicked to start. localstorage may be good here?
    //FIXME include google analytics
    //FIXME make
    function showCand() {
        var anchor = document.location.hash;
        if( anchor === '#exec' ) {
            $('#race-descriptor').text("There is 1 position available in this race. 4 candidates are running.");
            $('.executive_alliance:last').nextAll().detach();
            $('.candidate_executive_alliance').show();
        }else if ( anchor === '#uwide' ) {
            $('.university_wide_representative:first').prevAll().detach()
            $('.university_wide_representative:last').nextAll().detach()
            $('.candidate-contain:not(".candidate_university_wide_representative")').hide();
            $('.candidate_university_wide_representative').show();
            $('#race-descriptor').text("There are 8 positions available in this race. 18 candidates are running.");
        } else if (anchor === "#arch"){
            $('.architecture_representative:first').prevAll().detach()
            $('.architecture_representative:last').nextAll().detach()
            $('#race-descriptor').text("There is 1 position available in this race. 1 candidate is running.");
        } else if (anchor === "#mccombs") {
            $('.mccombs_representative:first').prevAll().detach()
            $('.mccombs_representative:last').nextAll().detach()
            $('#race-descriptor').text("There are 3 positions available in this race. 9 candidates are running.");
        } else if (anchor === "#comm") {
            $('.communications_representative:first').prevAll().detach()
            $('.communications_representative:last').nextAll().detach()
            $('#race-descriptor').text("There are 2 positions available in this race. 3 candidates are running.");
        } else if (anchor === "#edu") {
            $('.education_school_representative:first').prevAll().detach()
            $('.education_school_representative:last').nextAll().detach()
            $('#race-descriptor').text("There is 1 position available in this race. 2 candidates are running.");
        } else if (anchor === "#engineering"){
            $('.engineering_school_representative:first').prevAll().detach()
            $('.engineering_school_representative:last').nextAll().detach()
            $('#race-descriptor').text("There is 3 positions available in this race. 4 candidates are running.");
        } else if (anchor === "#fa"){
            $('.fine_arts_representative:first').prevAll().detach()
            $('.fine_arts_representative:last').nextAll().detach()
            $('#race-descriptor').text("There is 1 position available in this race. 1 candidate is running.");
        } else if (anchor === "#geo"){
            $('.geosciences_school_representative:first').prevAll().detach()
            $('.geosciences_school_representative:last').nextAll().detach()
            $('#race-descriptor').text("There is 1 position available in this race. 1 candidate is running.");
        } else if (anchor === "#gradatlarge"){
            $('.graduate_at_large_representative:first').prevAll().detach()
            $('.graduate_at_large_representative:last').nextAll().detach()
            $('#race-descriptor').text("There are 2 positions available in this race. 1 candidate is running.");
        } else if (anchor === "#law"){
            $('.law_school_representative:first').prevAll().detach()
            $('.law_school_representative:last').nextAll().detach()
            $('#race-descriptor').text("There is 1 position available in this race. 1 candidate is running.");
        } else if (anchor === "#cola"){
            $('.liberal_arts_representative:first').prevAll().detach()
            $('.liberal_arts_representative:last').nextAll().detach()
            $('#race-descriptor').text("There are 4 positions available in this race. 11 candidates are running.");
        } else if (anchor === "#cns"){
            $('.natural_sciences_representative:first').prevAll().detach()
            $('.natural_sciences_representative:last').nextAll().detach()
            $('#race-descriptor').text("There are 5 positions available in this race. 6 candidates are running.");
        } else if (anchor === "#nursing"){
        $('.nursing_school_representative:first').prevAll().detach()
        $('.nursingschool_representative:last').nextAll().detach()
        $('#race-descriptor').text("There is 1 position available in this race. 1 candidate is running.");
        } else if (anchor === "#sw"){
            $('.social_work_school_representative:first').prevAll().detach()
            $('.social_work_school_representative:last').nextAll().detach()
            $('#race-descriptor').text("There is 1 position available in this race. 1 candidate is running.");
        } else if (anchor === "#ugs"){
            $('.school_of_undergraduate_studies_representative:first').prevAll().detach()
            $('.school_of_undergraduate_studies_representative:last').nextAll().detach()
            $('#race-descriptor').text("There is 1 position available in this race. 1 candidate is running.");
        } else {
            $('.info').hide();
        }
    };
    window.addEventListener("hashchange", showCand, true);
    var w = window.innerWidth;
    if (w < 768) {
        $('nav').removeClass('navbar-fixed-top');
        $('.main-cont').css('padding-top', '0');
        $('#minihr').hide();
        $('#to-top').hide();
    }
    $('#to-top').click(function(){
        $('html, body').animate({scrollTop:$('#top').position().top}, 'slow');
    });
    $('.elections, .races, .candidates, .info, .candidate-contain, hr:not("#not-first")').hide();
    $('hr:first-of-type').show();
    $('.cand-btn').addClass('disabled');
    $('.elections-btn').click(function(){

        if($('.elections').css('display') == 'none' ) {
            $('.elections').slideDown('fast');
            $('#ico0').removeClass('fa-caret-right').addClass('fa-caret-down');
        } else {
            $('.elections').slideUp('fast');
            $('#ico0').removeClass('fa-caret-down').addClass('fa-caret-right');
        }
    });
    $('.race-btn').click(function(){
        $('.cand-link').append();
        $('.candidate-contain').append();
        $('.cand-btn').removeClass('disabled');
        if($('.races').css('display') == 'none' ) {
            $('.races').slideDown('fast');
            $('#ico1').removeClass('fa-caret-right').addClass('fa-caret-down');
        } else if ($('.candidates').css('display') !== 'none'){
            $('.candidates').css('display', 'none');
            $('.races').slideUp('fast');
            $('#ico1').removeClass('fa-caret-down').addClass('fa-caret-right')
        } else {
            $('.races').slideUp('fast');
            $('#ico1').removeClass('fa-caret-down').addClass('fa-caret-right');
        }
    });
    if($('.cand-btn').hasClass('disabled')){
        //
    } else {
        $('.cand-btn').click(function(){
            if($('.candidates').css('display') == 'none' ) {
                $('.candidates').slideDown("fast");
                $('#ico2').removeClass('fa-caret-right').addClass('fa-caret-down');
            } else {
                $('.candidates').slideUp("fast");
                $('#ico2').removeClass('fa-caret-down').addClass('fa-caret-right');
            }
        });
    }
    $('.race-link').click(function(e){
        e.preventDefault();
        var href = $(this).attr('href');
        $('.races').slideUp('500', function() {
            $('#ico1').removeClass('fa-caret-down').addClass('fa-caret-right');
            $('.candidates').slideDown('500');
            $('#ico2').removeClass('fa-caret-right').addClass('fa-caret-down');
            window.location = href;
        });
    });
    $('.race-link').click(function(){
        var txt = $(this).text();
        $('#race-contain').text(txt);
        $('.info').slideDown("fast");
    });
    $('.cand-link').click(function(){
        $('.cand-link').append();
    })
});