'use strict';

var app = angular.module('electionApp',['ngRoute']);

app.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
}]);

app.controller('selectionController', function($scope){
    $scope.initialize = function() {
        //declares

        this.exec = false;
        this.uwide = false;
        this.arch = false;
        this.mccombs = false;
        this.comm = false;
        this.edu = false;
        this.engineering = false;
        this.fa = false;
        this.geo = false;
        this.gradatlarge = false;
        this.law = false;
        this.cola = false;
        this.cns = false;
        this.nursing = false;
        this.sw = false;
        this.ugs = false;
        this.gsapres = false;
        this.gsavp = false;
        this.board = false;
        this.unionboard = false;
        this.unionpres = false;
        this.eic = false;
        this.tsmboard = false;

        //returns

        return this.exec;
        return this.uwide;
        return this.arch;
        return this.mccombs;
        return this.comm;
        return this.edu;
        return this.engineering;
        return this.fa;
        return this.geo;
        return this.gradatlarge;
        return this.law;
        return this.cola;
        return this.cns;
        return this.nursing;
        return this.sw;
        return this.ugs;
        return this.gsapres;
        return this.gsavp;
        return this.board;
        return this.unionboard;
        return this.unionpres;
        return this.eic;
        return this.tsmboard;
    }
    $scope.showElection = function($scope){
        if($('.elections').css('display') == 'none' ) {
            $('.elections').slideDown('fast');
            $('#ico0').removeClass('fa-caret-right').addClass('fa-caret-down');
        } else {
            $('.elections').slideUp('fast');
            $('#ico0').removeClass('fa-caret-down').addClass('fa-caret-right');
        }
    };
    $scope.showRace = function($scope){
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
    };
    $scope.grabRace = function($scope) {
        $('.races').slideUp('500', function () {
            $('#ico1').removeClass('fa-caret-down').addClass('fa-caret-right');
            $('.candidates').slideDown('500');
            $('#ico2').removeClass('fa-caret-right').addClass('fa-caret-down');
        });
    };
    $scope.showCandidate = function($scope) {
        if ($('.cand-btn').hasClass('disabled')) {
            return false;
        } else {
            $('.cand-btn').click(function () {
                if ($('.candidates').css('display') == 'none') {
                    $('.candidates').slideDown("fast");
                    $('#ico2').removeClass('fa-caret-right').addClass('fa-caret-down');
                } else {
                    $('.candidates').slideUp("fast");
                    $('#ico2').removeClass('fa-caret-down').addClass('fa-caret-right');
                }
            });
        }
    };
    $scope.updateView = function($scope){

    };
});

$(document).ready(function(){
    //FIXME make sure that we can append elements back after we remove them from DOM FIXME
    //FIXME why does the append calls not get called the first time? make sure that they work on first try without refresh. if person refreshes the screen w already on the page then they should not get kicked to start. localstorage may be good here?
    //FIXME include google analytics
    //FIXME make
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
    $('.elections, .races, .candidates, .info').hide();
    $('.race-link').click(function(){
        var txt = $(this).text();
        $('#race-contain').text(txt);
        $('.info').slideDown("fast");
    });
    //WORKING IMPLEMENTATION OF HASHCHANGE
    (function(){
        $(window).hashchange(function(){
            if( location.hash === '#exec' ) {
                $('#race-descriptor').text("There is 1 position available in this race. 4 candidates are running.");
            }else if ( location.hash === '#uwide' ) {
                $('#race-descriptor').text("There are 8 positions available in this race. 18 candidates are running.");
            } else if (location.hash === "#arch"){
                $('#race-descriptor').text("There is 1 position available in this race. 1 candidate is running.");
            } else if (location.hash === "#mccombs") {
                $('#race-descriptor').text("There are 3 positions available in this race. 9 candidates are running.");
            } else if (location.hash === "#comm") {
                $('#race-descriptor').text("There are 2 positions available in this race. 3 candidates are running.");
            } else if (location.hash === "#edu") {
                $('#race-descriptor').text("There is 1 position available in this race. 2 candidates are running.");
            } else if (location.hash === "#engineering"){
                $('#race-descriptor').text("There are 3 positions available in this race. 4 candidates are running.");
            } else if (location.hash === "#fa"){
                $('#race-descriptor').text("There is 1 position available in this race. 1 candidate is running.");
            } else if (location.hash === "#geo"){
                $('#race-descriptor').text("There is 1 position available in this race. 1 candidate is running.");
            } else if (location.hash === "#gradatlarge"){
                $('#race-descriptor').text("There are 2 positions available in this race. 1 candidate is running.");
            } else if (location.hash === "#law"){
                $('#race-descriptor').text("There is 1 position available in this race. 1 candidate is running.");
            } else if (location.hash === "#cola"){
                $('#race-descriptor').text("There are 4 positions available in this race. 11 candidates are running.");
            } else if (location.hash === "#cns"){
                $('#race-descriptor').text("There are 5 positions available in this race. 6 candidates are running.");
            } else if (location.hash === "#nursing"){
                $('#race-descriptor').text("There is 1 position available in this race. 1 candidate is running.");
            } else if (location.hash === "#sw"){
                $('#race-descriptor').text("There is 1 position available in this race. 1 candidate is running.");
            } else if (location.hash === "#ugs"){
                $('#race-descriptor').text("There is 1 position available in this race. 1 candidate is running.");
            } else if (location.hash === "#gsapres"){
                $('#race-descriptor').text("There is 1 position available in this race. 3 candidates are running.");
            } else if (location.hash === "#gsavp"){
                $('#race-descriptor').text("There is 1 position available in this race. 3 candidates are running.");
            } else if (location.hash === "#board"){
                $('#race-descriptor').text("There are 2 positions available in this race. 4 candidates are running.");
            } else {
                $('.info').hide();
            }
        });
        $(window).hashchange();
    }());
});