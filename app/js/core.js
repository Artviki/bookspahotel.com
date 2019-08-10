'use strict';

$(document).ready(function() {
  // Welcome Console
  console.log(
    '%cBookSpaHotel',
    'color: #0063a7; font-size: 28px; text-shadow: -1px 0 #9bba23, 0 1px #9bba23, 1px 0 #9bba23, 0 -1px #9bba23;'
  );

  // ScrollTop
  $('body').materialScrollTop();

  //  Isotope function to check if filters have some results
  function checkResults(grid, div) {
    let visibleItemsCount = grid.data('isotope').filteredItems.length;
    visibleItemsCount > 0 ? div.hide() : div.show();
  }

  //  Isotope
  const isotopeHandler = className => {
    const grid = $(`${className} .grid`);
    grid.isotope({
      itemSelector: '.spa-hotels-list-item',
      filter: '.all',
    });

    $(`${className}`).on('click', 'li', function() {
      const filterValue = $(this).attr('data-filter');
      grid.isotope({ filter: filterValue });
      $(`${className} li`).removeClass('active');
      $(this).addClass('active');
      checkResults(grid, $(`${className} .no-results`));
    });
  };

  isotopeHandler('.spa-hotels-by-country');
  isotopeHandler('.spa-hotels');
  $('.search-select').select2();

  const i18n = {
    previousMonth: 'Предыдущий Месяц',
    nextMonth: 'Следующий Иесяц',
    months: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    weekdays: [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ],
    weekdaysShort: ['Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт', 'Вск'],
  };
  const picker1 = new Pikaday({
    field: $('.search-datapicker.arrival')[0],
    minDate: new Date($.now()),
    i18n: i18n,
  });

  const picker2 = new Pikaday({
    field: $('.search-datapicker.departure')[0],
    minDate: new Date($.now()),
    i18n: i18n,
  });

  $('.number-of-people .toggler').on('click', function() {
    $('.dropdown').slideToggle();
  });

  $('#childCounter').handleCounter({
    minimum: 0,
    maximize: 10,
    onChange: function() {},
    onMinimum: function() {},
    onMaximize: function() {},
  });

  $('#adultCounter').handleCounter({
    minimum: 0,
    maximize: 10,
    onChange: function() {},
    onMinimum: function() {},
    onMaximize: function() {},
  });

  //
  $('.feeding-type').on('click', function() {
    $('body').addClass('modal-opened');
  });

  $('.overlay').click(function() {
    $('body').removeClass('modal-opened');
  });

  $('.adults-add').click(function() {
    const lastField = $('.adults .input-group:last');
    const intId =
      (lastField && lastField.length && lastField.data('idx') + 1) || 2;
    const fieldWrapper = $(`<div class="input-group" id="field-${intId}"/>`);
    fieldWrapper.data('idx', intId);
    const fName = $(`<span class="number">${intId}</span>`);

    const fType = $(
      `<select name="adults-select" id="adults-select-1">
          <option>3-х разовое питание с лечением</option>
          <option>3-х разовое питание без лечения</option>
          <option>2-х разовое питание с лечением</option>
          <option>2-х разовое питание без лечения</option>
        </select>`
    );
    const removeButton = $(
      ` <button class="input-action-btn remove" type="button"><span>&#8722;</span></button>`
    );

    removeButton.click(function() {
      $(this)
        .parent()
        .remove();
    });
    fieldWrapper.append(fName);
    fieldWrapper.append(fType);
    fieldWrapper.append(removeButton);
    if (intId <= 4) {
      $('.adults').append(fieldWrapper);
    }
  });
});
