'use strict';

$(document).ready(function () {
  // Welcome Console
  console.log('%cBookSpaHotel.com', 'color: #9aba22; font-size: 28px;'); // ScrollTop

  $('body').materialScrollTop(); // Select2

  $('.search-select').select2(); // START -- Isotope Filtering

  var checkResults = function checkResults(grid, div) {
    var visibleItemsCount = grid.data('isotope').filteredItems.length;
    visibleItemsCount > 0 ? div.hide() : div.show();
  };

  var isotopeHandler = function isotopeHandler(className) {
    var grid = $("".concat(className, " .grid"));
    grid.isotope({
      itemSelector: '.spa-hotels-list-item',
      filter: '.all'
    });
    $("".concat(className)).on('click', 'li', function () {
      var filterValue = $(this).attr('data-filter');
      grid.isotope({
        filter: filterValue
      });
      $("".concat(className, " li")).removeClass('active');
      $(this).addClass('active');
      checkResults(grid, $("".concat(className, " .no-results")));
    });
  };

  isotopeHandler('.spa-hotels-by-country');
  isotopeHandler('.spa-hotels'); // END   -- Isotope Filtering
  // START -- DateTime Picker

  var i18n = {
    previousMonth: 'Предыдущий Месяц',
    nextMonth: 'Следующий Иесяц',
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    weekdaysShort: ['Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт', 'Вск']
  };
  var picker1 = new Pikaday({
    field: $('.search-datapicker.arrival')[0],
    minDate: new Date($.now()),
    // i18n: i18n,
    position: 'bottom left',
    reposition: 'bottom-aligned'
  });
  var picker2 = new Pikaday({
    field: $('.search-datapicker.departure')[0],
    minDate: new Date($.now()),
    // i18n: i18n,
    position: 'bottom left',
    reposition: 'bottom-aligned'
  }); // END   -- DateTime Picker

  var feedingToggler = '.feeding-type .toggler';
  $(feedingToggler).on('click', function () {
    $('.feeding-type .dropdown').slideToggle();
  });
  $('.feeding-type li').on('click', function () {
    $("".concat(feedingToggler, " .text")).text($(this).text());
    $('.feeding-type .dropdown').slideToggle();
  }); // START -- Number Of People Inputs

  var adultInput = false;
  var childInput = false;
  var peopleToggler = '.number-of-people .toggler';
  $(peopleToggler).on('click', function () {
    $('.number-of-people .dropdown').slideToggle();
  });

  var showDefault = function showDefault(adultInput, childInput) {
    if (adultInput && childInput) {
      $("".concat(peopleToggler, " .default")).show();
      $("".concat(peopleToggler, " .adult")).hide();
      $("".concat(peopleToggler, " .child")).hide();
    } else {
      $("".concat(peopleToggler, " .default")).hide();
      $("".concat(peopleToggler, " .adult")).show();
      $("".concat(peopleToggler, " .child")).show();
    }
  };

  $('#adultCounter').handleCounter({
    minimum: 0,
    maximize: 4,
    onChange: function onChange(value) {
      $("".concat(peopleToggler, " .adult .sum")).text(value);

      if (parseInt(value) === 0) {
        adultInput = true;
        showDefault(adultInput, childInput);
      } else {
        adultInput = false;
        showDefault(adultInput, childInput);
      }
    }
  });
  $('#childCounter').handleCounter({
    minimum: 0,
    maximize: 4,
    onChange: function onChange(value) {
      $("".concat(peopleToggler, " .child .sum")).text(value);

      if (parseInt(value) === 0) {
        childInput = true;
        showDefault(adultInput, childInput);
      } else {
        childInput = false;
        showDefault(adultInput, childInput);
      }
    }
  }); // END   -- Number Of People Inputs
  // START -- Feeding Type Modal

  $('.other').on('click', function () {
    $('body').addClass('modal-opened');
  });
  $('.overlay').click(function () {
    $('body').removeClass('modal-opened');
  });
  $('.adults-add').click(function () {
    var lastField = $('.adults .input-group:last');
    var intId = lastField && lastField.length && lastField.data('idx') + 1 || 2;
    var fieldWrapper = $("<div class=\"input-group\" id=\"field-".concat(intId, "\"/>"));
    fieldWrapper.data('idx', intId);
    var fName = $("<span class=\"number\">".concat(intId, "</span>"));
    var fType = $("<select name=\"adults-select\" id=\"adults-select-1\">\n          <option>3-\u0445 \u0440\u0430\u0437\u043E\u0432\u043E\u0435 \u043F\u0438\u0442\u0430\u043D\u0438\u0435 \u0441 \u043B\u0435\u0447\u0435\u043D\u0438\u0435\u043C</option>\n          <option>3-\u0445 \u0440\u0430\u0437\u043E\u0432\u043E\u0435 \u043F\u0438\u0442\u0430\u043D\u0438\u0435 \u0431\u0435\u0437 \u043B\u0435\u0447\u0435\u043D\u0438\u044F</option>\n          <option>2-\u0445 \u0440\u0430\u0437\u043E\u0432\u043E\u0435 \u043F\u0438\u0442\u0430\u043D\u0438\u0435 \u0441 \u043B\u0435\u0447\u0435\u043D\u0438\u0435\u043C</option>\n          <option>2-\u0445 \u0440\u0430\u0437\u043E\u0432\u043E\u0435 \u043F\u0438\u0442\u0430\u043D\u0438\u0435 \u0431\u0435\u0437 \u043B\u0435\u0447\u0435\u043D\u0438\u044F</option>\n        </select>");
    var removeButton = $(" <button class=\"input-action-btn remove\" type=\"button\"><span>&#8722;</span></button>");
    removeButton.click(function () {
      $(this).parent().remove();
    });
    fieldWrapper.append(fName);
    fieldWrapper.append(fType);
    fieldWrapper.append(removeButton);

    if (intId <= 4) {
      $('.adults').append(fieldWrapper);
    }
  });
  $('.child-add').click(function () {
    var lastField = $('.children .input-group:last');
    var intId = lastField && lastField.length && lastField.data('idx') + 1 || 1;
    var inputGroup = $("<div class=\"input-group\" id=\"field-".concat(intId, "\"/>"));
    inputGroup.data('idx', intId);
    var number = $("<span class=\"number\">".concat(intId, "</span>"));
    var mainSelect = $("<select name=\"child-select\" id=\"child-select-1\">\n          <option>3-\u0445 \u0440\u0430\u0437\u043E\u0432\u043E\u0435 \u043F\u0438\u0442\u0430\u043D\u0438\u0435 \u0441 \u043B\u0435\u0447\u0435\u043D\u0438\u0435\u043C</option>\n          <option>3-\u0445 \u0440\u0430\u0437\u043E\u0432\u043E\u0435 \u043F\u0438\u0442\u0430\u043D\u0438\u0435 \u0431\u0435\u0437 \u043B\u0435\u0447\u0435\u043D\u0438\u044F</option>\n          <option>2-\u0445 \u0440\u0430\u0437\u043E\u0432\u043E\u0435 \u043F\u0438\u0442\u0430\u043D\u0438\u0435 \u0441 \u043B\u0435\u0447\u0435\u043D\u0438\u0435\u043C</option>\n          <option>2-\u0445 \u0440\u0430\u0437\u043E\u0432\u043E\u0435 \u043F\u0438\u0442\u0430\u043D\u0438\u0435 \u0431\u0435\u0437 \u043B\u0435\u0447\u0435\u043D\u0438\u044F</option>\n        </select>");
    var ageSelect = $("<select name=\"child-age-select\" id=\"child-age-select-1\">\n          <option value=\"1\">1</option>\n          <option value=\"2\">2</option>\n          <option value=\"3\">3</option>\n          <option value=\"4\">4</option>\n          <option value=\"5\">5</option>\n          <option value=\"6\">6</option>\n          <option value=\"7\">7</option>\n          <option value=\"8\">8</option>\n          <option value=\"9\">9</option>\n          <option value=\"10\">10</option>\n          <option value=\"11\">11</option>\n          <option value=\"12\">12</option>\n          <option value=\"13\">13</option>\n          <option value=\"14\">14</option>\n        </select>");
    var removeBtn = $(" <button class=\"input-action-btn remove\" type=\"button\"><span>&#8722;</span></button>");
    removeBtn.click(function () {
      $(this).parent().remove();
    });
    inputGroup.append(number);
    inputGroup.append(mainSelect);
    inputGroup.append(ageSelect);
    inputGroup.append(removeBtn);

    if (intId <= 4) {
      $('.children').append(inputGroup);
    }
  }); // END   -- Feeding Type Modal

  $('.select-tabs .btns').on('click', function () {
    $('.btns.active').removeClass('active');
    $(this).addClass('active');
    $('.search-select').removeClass('active');
    $(".search-select.".concat($(this).data().type)).addClass('active');
  });
});