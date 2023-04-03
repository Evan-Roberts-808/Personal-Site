// @codekit-prepend "/vendor/hammer-2.0.8.js";

$( document ).ready(function() {

  // DOMMouseScroll included for firefox support
  var canScroll = true,
      scrollController = null;
  $(this).on('mousewheel DOMMouseScroll', function(e){

    if (!($('.outer-nav').hasClass('is-vis'))) {

      e.preventDefault();

      var delta = (e.originalEvent.wheelDelta) ? -e.originalEvent.wheelDelta : e.originalEvent.detail * 20;

      if (delta > 50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function(){
          canScroll = true;
        }, 800);
        updateHelper(1);
      }
      else if (delta < -50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function(){
          canScroll = true;
        }, 800);
        updateHelper(-1);
      }

    }

  });

  $('.side-nav li, .outer-nav li').click(function(){

    if (!($(this).hasClass('is-active'))) {

      var $this = $(this),
          curActive = $this.parent().find('.is-active'),
          curPos = $this.parent().children().index(curActive),
          nextPos = $this.parent().children().index($this),
          lastItem = $(this).parent().children().length - 1;

      updateNavs(nextPos);
      updateContent(curPos, nextPos, lastItem);

    }

  });

  $('.cta').click(function(){

    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 1,
        nextPos = lastItem;

    updateNavs(lastItem);
    updateContent(curPos, nextPos, lastItem);

  });

  // swipe support for touch devices
  var targetElement = document.getElementById('viewport'),
      mc = new Hammer(targetElement);
  mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  mc.on('swipeup swipedown', function(e) {

    updateHelper(e);

  });

  $(document).keyup(function(e){

    if (!($('.outer-nav').hasClass('is-vis'))) {
      e.preventDefault();
      updateHelper(e);
    }

  });

  // determine scroll, swipe, and arrow key direction
  function updateHelper(param) {

    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 1,
        nextPos = 0;

    if (param.type === "swipeup" || param.keyCode === 40 || param > 0) {
      if (curPos !== lastItem) {
        nextPos = curPos + 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
      else {
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    }
    else if (param.type === "swipedown" || param.keyCode === 38 || param < 0){
      if (curPos !== 0){
        nextPos = curPos - 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
      else {
        nextPos = lastItem;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    }

  }

  // sync side and outer navigations
  function updateNavs(nextPos) {

    $('.side-nav, .outer-nav').children().removeClass('is-active');
    $('.side-nav').children().eq(nextPos).addClass('is-active');
    $('.outer-nav').children().eq(nextPos).addClass('is-active');

  }

  // update main content area
  function updateContent(curPos, nextPos, lastItem) {

    $('.main-content').children().removeClass('section--is-active');
    $('.main-content').children().eq(nextPos).addClass('section--is-active');
    $('.main-content .section').children().removeClass('section--next section--prev');

    if (curPos === lastItem && nextPos === 0 || curPos === 0 && nextPos === lastItem) {
      $('.main-content .section').children().removeClass('section--next section--prev');
    }
    else if (curPos < nextPos) {
      $('.main-content').children().eq(curPos).children().addClass('section--next');
    }
    else {
      $('.main-content').children().eq(curPos).children().addClass('section--prev');
    }

    if (nextPos !== 0 && nextPos !== lastItem) {
      $('.header--cta').addClass('is-active');
    }
    else {
      $('.header--cta').removeClass('is-active');
    }

  }

  function outerNav() {

    $('.header--nav-toggle').click(function(){

      $('.perspective').addClass('perspective--modalview');
      setTimeout(function(){
        $('.perspective').addClass('effect-rotate-left--animate');
      }, 25);
      $('.outer-nav, .outer-nav li, .outer-nav--return').addClass('is-vis');

    });

    $('.outer-nav--return, .outer-nav li').click(function(){

      $('.perspective').removeClass('effect-rotate-left--animate');
      setTimeout(function(){
        $('.perspective').removeClass('perspective--modalview');
      }, 400);
      $('.outer-nav, .outer-nav li, .outer-nav--return').removeClass('is-vis');

    });

  }

// Web Work

  function webWorkSlider() {

    $('.web-slider--prev, .web-slider--next').click(function() {

      var $this = $(this),
          curLeft = $('.web-slider').find('.web-slider--item-left'),
          curLeftPos = $('.web-slider').children().index(curLeft),
          curCenter = $('.web-slider').find('.web-slider--item-center'),
          curCenterPos = $('.web-slider').children().index(curCenter),
          curRight = $('.web-slider').find('.sweb-lider--item-right'),
          curRightPos = $('.web-slider').children().index(curRight),
          totalWorks = $('.web-slider').children().length,
          $left = $('.web-slider--item-left'),
          $center = $('.web-slider--item-center'),
          $right = $('.web-slider--item-right'),
          $item = $('.web-slider--item');

      $('.web-slider').animate({ opacity : 0 }, 400);

      setTimeout(function(){

      if ($this.hasClass('web-slider--next')) {
        if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
          $left.removeClass('web-slider--item-left').next().addClass('web-slider--item-left');
          $center.removeClass('web-slider--item-center').next().addClass('web-slider--item-center');
          $right.removeClass('web-slider--item-right').next().addClass('web-slider--item-right');
        }
        else {
          if (curLeftPos === totalWorks - 1) {
            $item.removeClass('web-slider--item-left').first().addClass('web-slider--item-left');
            $center.removeClass('web-slider--item-center').next().addClass('web-slider--item-center');
            $right.removeClass('web-slider--item-right').next().addClass('web-slider--item-right');
          }
          else if (curCenterPos === totalWorks - 1) {
            $left.removeClass('web-slider--item-left').next().addClass('web-slider--item-left');
            $item.removeClass('web-slider--item-center').first().addClass('web-slider--item-center');
            $right.removeClass('web-slider--item-right').next().addClass('web-slider--item-right');
          }
          else {
            $left.removeClass('web-slider--item-left').next().addClass('web-slider--item-left');
            $center.removeClass('web-slider--item-center').next().addClass('web-slider--item-center');
            $item.removeClass('web-slider--item-right').first().addClass('web-slider--item-right');
          }
        }
      }
      else {
        if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
          $left.removeClass('web-slider--item-left').prev().addClass('web-slider--item-left');
          $center.removeClass('web-slider--item-center').prev().addClass('web-slider--item-center');
          $right.removeClass('web-slider--item-right').prev().addClass('web-slider--item-right');
        }
        else {
          if (curLeftPos === 0) {
            $item.removeClass('web-slider--item-left').last().addClass('web-slider--item-left');
            $center.removeClass('web-slider--item-center').prev().addClass('web-slider--item-center');
            $right.removeClass('web-slider--item-right').prev().addClass('web-slider--item-right');
          }
          else if (curCenterPos === 0) {
            $left.removeClass('web-slider--item-left').prev().addClass('web-slider--item-left');
            $item.removeClass('web-slider--item-center').last().addClass('web-slider--item-center');
            $right.removeClass('web-slider--item-right').prev().addClass('web-slider--item-right');
          }
          else {
            $left.removeClass('web-slider--item-left').prev().addClass('web-slider--item-left');
            $center.removeClass('web-slider--item-center').prev().addClass('web-slider--item-center');
            $item.removeClass('web-slider--item-right').last().addClass('web-slider--item-right');
          }
        }
      }

    }, 400);

    $('.web-slider').animate({ opacity : 1 }, 400);

    });

  }

  // Graphic Work

  function graphicWorkSlider() {

    $('.graphic-slider--prev, .graphic-slider--next').click(function() {

      var $this = $(this),
          curLeft = $('.graphic-slider').find('.graphic-slider--item-left'),
          curLeftPos = $('.graphic-slider').children().index(curLeft),
          curCenter = $('.graphic-slider').find('.graphic-slider--item-center'),
          curCenterPos = $('.graphic-slider').children().index(curCenter),
          curRight = $('.graphic-slider').find('.graphic-slider--item-right'),
          curRightPos = $('.graphic-slider').children().index(curRight),
          totalWorks = $('.graphic-slider').children().length,
          $left = $('.graphic-slider--item-left'),
          $center = $('.graphic-slider--item-center'),
          $right = $('.graphic-slider--item-right'),
          $item = $('.graphic-slider--item');

      $('.graphic-slider').animate({ opacity : 0 }, 400);

      setTimeout(function(){

      if ($this.hasClass('graphic-slider--next')) {
        if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
          $left.removeClass('graphic-slider--item-left').next().addClass('graphic-slider--item-left');
          $center.removeClass('graphic-slider--item-center').next().addClass('graphic-slider--item-center');
          $right.removeClass('graphic-slider--item-right').next().addClass('graphic-slider--item-right');
        }
        else {
          if (curLeftPos === totalWorks - 1) {
            $item.removeClass('graphic-slider--item-left').first().addClass('graphic-slider--item-left');
            $center.removeClass('graphic-slider--item-center').next().addClass('graphic-slider--item-center');
            $right.removeClass('graphic-slider--item-right').next().addClass('graphic-slider--item-right');
          }
          else if (curCenterPos === totalWorks - 1) {
            $left.removeClass('graphic-slider--item-left').next().addClass('graphic-slider--item-left');
            $item.removeClass('graphic-slider--item-center').first().addClass('graphic-slider--item-center');
            $right.removeClass('graphic-slider--item-right').next().addClass('graphic-slider--item-right');
          }
          else {
            $left.removeClass('graphic-slider--item-left').next().addClass('graphic-slider--item-left');
            $center.removeClass('graphic-slider--item-center').next().addClass('graphic-slider--item-center');
            $item.removeClass('graphic-slider--item-right').first().addClass('graphic-slider--item-right');
          }
        }
      }
      else {
        if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
          $left.removeClass('graphic-slider--item-left').prev().addClass('graphic-slider--item-left');
          $center.removeClass('graphic-slider--item-center').prev().addClass('graphic-slider--item-center');
          $right.removeClass('graphic-slider--item-right').prev().addClass('graphic-slider--item-right');
        }
        else {
          if (curLeftPos === 0) {
            $item.removeClass('graphic-slider--item-left').last().addClass('graphic-slider--item-left');
            $center.removeClass('graphic-slider--item-center').prev().addClass('graphic-slider--item-center');
            $right.removeClass('graphic-slider--item-right').prev().addClass('graphic-slider--item-right');
          }
          else if (curCenterPos === 0) {
            $left.removeClass('graphic-slider--item-left').prev().addClass('graphic-slider--item-left');
            $item.removeClass('graphic-slider--item-center').last().addClass('graphic-slider--item-center');
            $right.removeClass('graphic-slider--item-right').prev().addClass('graphic-slider--item-right');
          }
          else {
            $left.removeClass('graphic-slider--item-left').prev().addClass('graphic-slider--item-left');
            $center.removeClass('graphic-slider--item-center').prev().addClass('graphic-slider--item-center');
            $item.removeClass('graphic-slider--item-right').last().addClass('graphic-slider--item-right');
          }
        }
      }

    }, 400);

    $('.graphic-slider').animate({ opacity : 1 }, 400);

    });

  }


  function transitionLabels() {

    $('.work-request--information input').focusout(function(){

      var textVal = $(this).val();

      if (textVal === "") {
        $(this).removeClass('has-value');
      }
      else {
        $(this).addClass('has-value');
      }

      // correct mobile device window position
      window.scrollTo(0, 0);

    });

  }

  outerNav();
  webWorkSlider();
  graphicWorkSlider();
  transitionLabels();

});
