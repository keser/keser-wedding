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
// File name: app.js (main)
// ------------------------------------------------

// ------------------------------------------------
// Table of Contents
// ------------------------------------------------
//
//  1. SVG Fallback
//  2. Chrome Smooth Scroll
//  3. PhotoSwipe Gallery Images Replace
//  4. Main Menu Behavior
//  5. Popups Behavior
//
// ------------------------------------------------
// Table of Contents End
// ------------------------------------------------

$(function() {

  // SVG Fallback
  if(!Modernizr.svg) {
    $("img[src*='svg']").attr("src", function() {
      return $(this).attr("src").replace(".svg", ".png");
    });
  };

  // Chrome Smooth Scroll
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch(err) {
  };

  $("img, a").on("dragstart", function(event) { event.preventDefault(); });

  // Gallery Images Replace
  $('.works-link')
    // Background set up
    .each(function(){
    $(this)
    // Add a photo container
    .append('<div class="picture"></div>')
    // Set up a background image for each link based on data-image attribute
    .children('.picture').css({'background-image': 'url('+ $(this).attr('data-image') +')'});
  });

  // Main Menu Behavior Start
  // Declaring Variables
  var menuShadow         = $('.menu-black-layer'),
      menu               = $('nav'),
      menuTrigger        = $('#menu-trigger'),
      menuClose          = $('#menu-close'),
      homeIntro          = $('.home_intro'),
      offset             = 10;

  // Menu Open/Close
  menuTrigger.on('click', function(event){

    event.preventDefault();
    menuTrigger.addClass('animate-out');

    setTimeout(function(){
      menu.addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
        menuClose.addClass('is-scaled-up');
      });
      if($('html').hasClass('no-csstransitions')) {
        menuClose.addClass('is-scaled-up');
      }
    }, 200);

    setTimeout(function(){
      menuShadow.addClass('is-visible');
      homeIntro.addClass('is-hidden');
    }, 500);

  });

  menuClose.on('click', function(event){
    event.preventDefault();
    menuClose.removeClass('is-scaled-up');
    menuShadow.removeClass('is-visible');

    setTimeout(function(){
      menu.removeClass('is-visible');
    }, 200);

    setTimeout(function(){
      menuTrigger.removeClass('animate-out');
      homeIntro.removeClass('is-hidden');
    }, 500);
  });

  $('#menu a').on('click', function(event){
    menuClose.removeClass('is-scaled-up');
    menuShadow.removeClass('is-visible');

    setTimeout(function(){
      menu.removeClass('is-visible');
    }, 200);

    setTimeout(function(){
      menuTrigger.removeClass('animate-out');
      homeIntro.removeClass('is-hidden');
    }, 500);
  });

  $(window).scroll(function(){
		if( $(this).scrollTop() > offset ) {
      menuShadow.removeClass('is-visible');
      menuClose.removeClass('is-scaled-up');

      setTimeout(function(){
        menu.removeClass('is-visible');
        homeIntro.removeClass('is-hidden');
        menuTrigger.removeClass('animate-out');
      }, 50);
    }
	});

  // Popups Behavior Start
  // Declaring Variables
  var notify             = $('.notify'),
      notifyTrigger      = $('#notify-trigger'),
      notifyClose        = $('#notify-close'),
      writealine        = $('.writealine'),
      writealineTrigger = $('#writealine-trigger'),
      writealineClose   = $('#writealine-close');

      // Write-a-Line Popup Open/Close
      writealineTrigger.on('click', function(event){
        event.preventDefault();
        writealine.addClass('is-visible');
        $('body').addClass('overflow-hidden');

        setTimeout(function(){
          writealineClose.addClass('is-scaled-up');
        }, 1200);
      });

      writealineClose.on('click', function(event){
        event.preventDefault();
        writealineClose.removeClass('is-scaled-up');
        setTimeout(function(){
          writealine.removeClass('is-visible');
          $('body').removeClass('overflow-hidden');
        }, 100);
      });

      // Notify Popup Open/Close
      notifyTrigger.on('click', function(event){
        event.preventDefault();
        notify.addClass('is-visible');
        $('body').addClass('overflow-hidden');

        setTimeout(function(){
          notifyClose.addClass('is-scaled-up');
        }, 800);
      });

      notifyClose.on('click', function(event){
        event.preventDefault();
        notifyClose.removeClass('is-scaled-up');
        setTimeout(function(){
          notify.removeClass('is-visible');
          $('body').removeClass('overflow-hidden');
        }, 100);
      });

});
