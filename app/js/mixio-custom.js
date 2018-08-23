// ------------------------------------------------
// Project Name: Mixio Coming Soon Template
// Project Description: Mixio - awesome coming soon template to kick-start your project
// Tags: mixio, coming soon, under construction, template, coming soon page, html5, css3
// Version: 1.0.0
// Build Date: July 2018
// Last Update: July 2018
// This product is available exclusively on Themeforest
// Author: mix_design
// Author URI: http://mixdesign.club
// File name: mixio-custom.js
// ------------------------------------------------

// ------------------------------------------------
// Table of Contents
// ------------------------------------------------
//
//  1. Loader
//  2. Main Section Loading Animation
//  3. Fullpage.js Plugin Settings
//  4. YTPlayer Plugin Video Background Settings
//  5. Vegas Plugin Kenburns Background Settings
//  6. KBW-Countdown Settings
//  7. Swiper Slider Settings
//  8. Mailchimp Notify Form
//  9. Contact Form
//  10. Write-a-Line Form
//
// ------------------------------------------------
// Table of Contents End
// ------------------------------------------------

$(window).on("load", function() {

  "use strict";

  // --------------------------------------------- //
  // Loader Start
  // --------------------------------------------- //
  setTimeout(function(){
    $(".loader").addClass('fade-dark');
    $(".loader-logo").removeClass('slideInDown').addClass('flipOutY');
    $(".loader-caption").removeClass('slideInUp').addClass('fadeOutDown');
  },600);

  setTimeout(function(){
    $('body').removeClass('overflow-hidden');
    $(".loader").addClass('loaded');
  },1200);
  // --------------------------------------------- //
  // Loader End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Main Section Loading Animation Start
  // --------------------------------------------- //
  setTimeout(function(){
    if ($('body').hasClass('split')) {
      $('body').addClass('split-loaded');
    };
    if ($('body').hasClass('fullscreen')) {
      $('body').addClass('fullscreen-loaded');
    };
  },1200);
  // --------------------------------------------- //
  // Main Section Loading Animation End
  // --------------------------------------------- //

});

$(function() {

  // --------------------------------------------- //
  // Fullpage.js Plugin Settings Start
  // --------------------------------------------- //
  var fullpageNormalScroll = $('#fullpage-scroll'),
      fullpage             = $('#fullpage');

      if (fullpage.length) {
        fullpage.fullpage({
          sectionsColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
          menu: '#menu',
          scrollingSpeed: 1000,
          responsiveWidth: 1200,
          navigation: true,
          loopBottom: true,
      		verticalCentered: false
        });
      };

      if (fullpageNormalScroll.length) {
        fullpageNormalScroll.fullpage({
          sectionsColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
          menu: '#menu',
          responsiveWidth: 1183,
          navigation: false,
          autoScrolling: false,
          fitToSection: false,
    		  verticalCentered: false
        });
      };
  // --------------------------------------------- //
  // Fullpage.js Plugin Settings End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // YTPlayer Start
  // --------------------------------------------- //
  var bgndVideo = $("#bgndVideo");
  if(bgndVideo.length){
    bgndVideo.mb_YTPlayer({
      mute: true,
      containment: '#video-wrapper',
      showControls:false,
      autoPlay:true,
      loop:true,
      startAt:0,
      quality:'default'
    });
  }
  // --------------------------------------------- //
  // YTPlayer End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Vegas Kenburns Start
  // --------------------------------------------- //
  var bgndKenburns = $('#bgndKenburns');
  if(bgndKenburns.length){
    bgndKenburns.vegas({
      timer: false,
      delay: 8000,
      transition: 'fade2',
      transitionDuration: 2000,
      slides: [
        { src: "http://via.placeholder.com/1920x1280" },
        { src: "http://via.placeholder.com/1920x1280" },
        { src: "http://via.placeholder.com/1920x1280" }
      ],
      animation: [ 'kenburnsUp', 'kenburnsDown', 'kenburnsLeft', 'kenburnsRight' ]
    });
  }
  // --------------------------------------------- //
  // Vegas Kenburns End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // KBW-Countdown Start
  // --------------------------------------------- //
  $('#countdown').countdown({until: $.countdown.UTCDate(+10, 2018, 2, 16), format: 'D'});
  $('#countdown-large').countdown({until: $.countdown.UTCDate(+0, 2019, 2, 16), format: 'DHMS'});
  // --------------------------------------------- //
  // KBW-Countdown End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Swiper Slider Start
  // --------------------------------------------- //
  $(window).on("load", function() {

    setTimeout(function(){

      var swiper = new Swiper('.swiper-container', {
          spaceBetween: 0,
          speed: 600,
          centeredSlides: true,
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        });

    },1900);

  });
  // --------------------------------------------- //
  // Swiper Slider End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Mailchimp Notify Form Start
  // --------------------------------------------- //
  $('.notify-form').ajaxChimp({
    callback: mailchimpCallback,
    url: 'https://besaba.us10.list-manage.com/subscribe/post?u=e8d650c0df90e716c22ae4778&amp;id=18f865dbf3'
  });

  function mailchimpCallback(resp) {
    if(resp.result === 'success') {
      $('.notify').find('.form').addClass('is-hidden');
      $('.notify').find('.subscription-ok').addClass('is-visible');
      setTimeout(function() {
        // Done Functions
        $('.notify').find('.subscription-ok').removeClass('is-visible');
        $('.notify').find('.form').delay(300).removeClass('is-hidden');
        $('.notify-form').trigger("reset");
      }, 5000);
    } else if(resp.result === 'error') {
      $('.notify').find('.form').addClass('is-hidden');
      $('.notify').find('.subscription-error').addClass('is-visible');
      setTimeout(function() {
        // Done Functions
        $('.notify').find('.subscription-error').removeClass('is-visible');
        $('.notify').find('.form').delay(300).removeClass('is-hidden');
        $('.notify-form').trigger("reset");
      }, 5000);
    }
  };
  // --------------------------------------------- //
  // Mailchimp Notify Form End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Contact Form Start
  // --------------------------------------------- //
  $("#contact-form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
      $('.contact').find('.form').addClass('is-hidden');
      $('.contact').find('.reply-group').addClass('is-visible');
			setTimeout(function() {
				// Done Functions
        $('.contact').find('.reply-group').removeClass('is-visible');
        $('.contact').find('.form').delay(300).removeClass('is-hidden');
				th.trigger("reset");
			}, 5000);
		});
		return false;
	});
  // --------------------------------------------- //
  // Contact Form End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Write-a-Line Form Start
  // --------------------------------------------- //
  $("#writealine-form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
      $('.writealine').find('.form').addClass('is-hidden');
      $('.writealine').find('.reply-group').addClass('is-visible');
			setTimeout(function() {
				// Done Functions
        $('.writealine').find('.reply-group').removeClass('is-visible');
        $('.writealine').find('.form').delay(300).removeClass('is-hidden');
				th.trigger("reset");
			}, 5000);
		});
		return false;
	});
  // --------------------------------------------- //
  // Write-a-Line Form End
  // --------------------------------------------- //

});
