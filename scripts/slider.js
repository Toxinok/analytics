$(document).ready(function () {
  var slides = $('#feedback-slider').children();
  var currentSlide = 0;
  var slidesLength = slides.length;

  var sizes = getSizes();

  var slideWidth = sizes.slideWidth;
  var styleMarginRight = sizes.styleMarginRight;
  var offset = +sizes.styleMarginRight + +sizes.slideWidth;

  $(window).resize(function () {
    slideWidth = sizes.slideWidth;
    styleMarginRight = sizes.styleMarginRight;
    offset = +sizes.styleMarginRight + +sizes.slideWidth;
  });

  function getSizes() {
    return {
      slideWidth: $($('.feedback-slider__slide')[0]).width(),
      styleMarginRight: $($('.feedback-slider__slide')[0])
        .css('marginRight')
        .replace('px', ''),
    };
  }

  if (slidesLength) {
    $('.slider-arrow-l').on('click', function () {
      prevSlide();
    });
    $('.slider-arrow-r').on('click', function () {
      nextSlide();
    });

    setIsInactive('.slider-arrow-l', true);
    var dots = addDots(slides);
  }

  function changeSlide(slideId) {
    console.log(slideId);
    console.log(offset);
    var currentOffset = -slideId * offset;
    $('.feedback-slider__slide-inner').css(
      'transform',
      'translateX(' + currentOffset + 'px)',
    );
  }

  function prevSlide() {
    setDotState(currentSlide, false);

    if (currentSlide === 0) {
      currentSlide = slidesLength - 1;
    } else currentSlide--;

    setDotState(currentSlide, true);

    changeSlide(currentSlide);

    if (currentSlide < slidesLength) {
      setIsInactive('.slider-arrow-r', false);
    }
    if (currentSlide === 0) setIsInactive('.slider-arrow-l', true);
  }

  function nextSlide() {
    setDotState(currentSlide, false);

    if (currentSlide === slidesLength - 1) {
      currentSlide = 0;
    } else currentSlide++;

    setDotState(currentSlide, true);

    changeSlide(currentSlide);

    if (currentSlide > 0) setIsInactive('.slider-arrow-l', false);
    if (currentSlide === slidesLength - 1) {
      setIsInactive('.slider-arrow-r', true);
    }
  }

  function setIsInactive(selector, state) {
    if (state) $(selector).addClass('unactive');
    else $(selector).removeClass('unactive');
  }

  function setDotState(index, state) {
    if (state) $(dots[index]).addClass('active');
    else $(dots[index]).removeClass('active');
  }

  function addDots(slides) {
    var slidesDots = [];
    for (var i = 0; i < slides.length; i++) {
      var el = document.createElement('div');

      el.setAttribute('data-slide-id', i);
      $(el).addClass('slider-dots__item');
      if (i === 0) $(el).addClass('active');

      slidesDots.push(el);
    }
    $('.slider-dots').append(slidesDots);

    return slidesDots;
  }
});
