$(document).ready(function () {
  var isMobileMenuActive = false;
  // HEADER
  $('#menu-burger-btn').click(function () {
    isMobileMenuActive = !isMobileMenuActive;

    $('.header__nav').toggleClass('active');
    $(document).scrollTop(0);
    $(this).toggleClass('active');
    if(isMobileMenuActive) {
      bodyScrollLock.disableBodyScroll($(document.body));
    }
    else {
      bodyScrollLock.clearAllBodyScrollLocks();
    }
    // $(document.body).toggleClass('overflow-hidden');
  });

  // LOAD REPORT
  var loadedLabels = {};
  function loadFile(event) {
    var selectedFile = event.target.files[0];
    var selectedFileName = selectedFile.name;

    if (
      ~selectedFileName.indexOf('.xls') ||
      ~selectedFileName.indexOf('.xlsx')
    ) {
      var label = $(event.target).parents('label')[0];
      $(label).children('.load__close').show();
      var dropzoneId = label.dataset.dropzoneId;
      loadedLabels[dropzoneId] = true;

      var loadBlock = $(this).parent();
      $(this).remove();

      var button = loadBlock.find($('.load__button'));
      button.addClass('active');
      button.text('Файл загружен');
    }
  }

  $('.load__input').change(loadFile);

  $('.load__close').click(function () {
    var loadBlock = $(this).parent();
    var button = loadBlock.find($('.load__button'));

    if (button.hasClass('active')) {
      var loadInput = document.createElement('input');
      loadInput.type = 'file';
      loadInput.accept = '.xls, .xlsx';
      loadInput.className = 'load__input';
      loadInput.addEventListener('change', loadFile);

      var dropzoneId = $(event.target).parents('label')[0].dataset.dropzoneId;
      delete loadedLabels[dropzoneId];

      button.removeClass('active');
      button.text('Выбрать файлы');

      loadBlock.append(loadInput);

      $(this).hide();
    }
  });

  $('.files').submit(function (event) {
    event.preventDefault();

    if(loadedLabels[1] || loadedLabels[2]) {
      var filesLoadBlock = $('.files__label');
      filesLoadBlock.hide();
      $('.schema').hide();
      $('.files__button').hide();
    
      filesLoadBlock.empty();
      
      var filesLoader = $('.files__loader');
      filesLoader.addClass('active');
      var loadText = document.createElement('div');
      loadText.classList.add('load__text', 'load__text--loading');
      loadText.innerHTML = 'Отчет формируется и будет готов через пару минут. Статус отчета вы можете посмотреть на <a href="reports-list.html" class="load__link">странице отчетов</a>';
    
      var animation = document.createElement('img');
      animation.src = 'assets/images/report-load-animation.gif';
    
      filesLoader.append(loadText);
      filesLoader.append(animation);
    
      var formData = new FormData(event.target);
      // files__labels
    
      // SEND DATA
      var xhr = new XMLHttpRequest();
      var url = '';
      xhr.open('POST', url, true);
      xhr.send(formData);
    }
  });

  $('.nav__link[href="#auth-modal"]').click(function () {
    $(document.body).css('overflow', 'hidden');
    $('.modal').css('display', 'flex');

    var headerModalLink = $('#menu-burger-btn');
    if (headerModalLink.hasClass('active')) {
      headerModalLink.removeClass('active');
      $('.header__nav').removeClass('active');
    }
  });

  // MODAL
  $('.modal__link').click(function () {
    var targetPage = $(this).attr('href');

    if (targetPage === '#login') {
      $('.modal__title').text('Войти в сервис');

      $('.modal__input[placeholder="Ваше имя"]').hide();
      $('.modal__input[placeholder="+ 8 999 6524 4"]').hide();
      $('.modal__input[placeholder="Повторить пароль"]').hide();

      $('.modal__submit').val('Вход');

      $('.modal__text').text('Нет аккаунта?');

      $('.modal__link').text('Создайте учетную запись');
      $('.modal__link').attr('href', '#registration');
    } else if (targetPage === '#registration') {
      $('.modal__title').text('Регистрация в сервисе');

      $('.modal__input[placeholder="Ваше имя"]').show();
      $('.modal__input[placeholder="+ 8 999 6524 4"]').show();
      $('.modal__input[placeholder="Повторить пароль"]').show();

      $('.modal__submit').val('Регистрация');

      $('.modal__text').text('Уже есть аккаунт?');

      $('.modal__link').text('Войдите в учетную запись');
      $('.modal__link').attr('href', '#login');
    }
  });

  $('.modal').click(function (event) {
    if (
      event.target == $('.modal')[0] ||
      event.target == $('.modal__close')[0] ||
      event.target == $('.modal-wrap')[0]
    ) {
      $('.modal').hide();
      $(document.body).css('overflow', 'visible');
    }
  });

  $(document.body).keydown(function (event) {
    if (event.key === 'Escape') {
      $('.modal').hide();
      $(document.body).css('overflow', 'visible');
    }
  });

  // REPORT PAGE
  $('#report-search-filters-btn').on('click', function () {
    $(this).parent().parent().toggleClass('active');
  });

  var parentOffset = $('.catalog-wrap').offset();
  $(window).resize(function () {
    parentOffset = $('.catalog-wrap').offset();
  });
  $('.product-details > table > tbody > tr > td:nth-child(3)').hover(
    function (e) {
      var div = $(this).children('div');
      var divMiddleX = div.width() / 2;
      var offset = div.offset();
      var detailsInfo = div.children('.details-info');

      detailsInfo.show();
      detailsInfo.css('top', offset.top - parentOffset.top + 25 + 'px');
      detailsInfo.css(
        'left',
        offset.left - parentOffset.left + divMiddleX + 'px',
      );
    },
    function (e) {
      var div = $(this).children('div');
      var detailsInfo = div.children('.details-info');
      detailsInfo.hide();
    },
  );

  $('.user__submit').on('click', function (event) {
    event.preventDefault();

    $('.popup').addClass('popup--visible');
  });
});
