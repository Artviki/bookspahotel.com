'use strict';

$(document).ready(function() {
  // Welcome Console
  console.log('%cBookSpaHotel.com', 'color: #9aba22; font-size: 28px;');

  // ScrollTop
  $('body').materialScrollTop();
  // Select2
  $('.search-select').select2();

  // START -- Isotope Filtering
  const checkResults = (grid, div) => {
    let visibleItemsCount = grid.data('isotope').filteredItems.length;
    visibleItemsCount > 0 ? div.hide() : div.show();
  };

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
  // END   -- Isotope Filtering

  // START -- DateTime Picker
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
  // END   -- DateTime Picker

  // START -- Number Of People Inputs
  let adultInput = false;
  let childInput = false;
  const toggler = '.number-of-people .toggler';

  $(toggler).on('click', function() {
    $('.dropdown').slideToggle();
  });

  const showDefault = (adultInput, childInput) => {
    if (adultInput && childInput) {
      $(`${toggler} .default`).show();
      $(`${toggler} .adult`).hide();
      $(`${toggler} .child`).hide();
    } else {
      $(`${toggler} .default`).hide();
      $(`${toggler} .adult`).show();
      $(`${toggler} .child`).show();
    }
  };

  $('#adultCounter').handleCounter({
    minimum: 0,
    maximize: 4,
    onChange: function(value) {
      $(`${toggler} .adult .sum`).text(value);
      if (parseInt(value) === 0) {
        adultInput = true;
        showDefault(adultInput, childInput);
      } else {
        adultInput = false;
        showDefault(adultInput, childInput);
      }
    },
  });

  $('#childCounter').handleCounter({
    minimum: 0,
    maximize: 4,
    onChange: function(value) {
      $(`${toggler} .child .sum`).text(value);
      if (parseInt(value) === 0) {
        childInput = true;
        showDefault(adultInput, childInput);
      } else {
        childInput = false;
        showDefault(adultInput, childInput);
      }
    },
  });
  // END   -- Number Of People Inputs

  // START -- Feeding Type Modal
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
  $('.child-add').click(function() {
    const lastField = $('.children .input-group:last');
    const intId =
      (lastField && lastField.length && lastField.data('idx') + 1) || 1;
    const inputGroup = $(`<div class="input-group" id="field-${intId}"/>`);
    inputGroup.data('idx', intId);
    const number = $(`<span class="number">${intId}</span>`);

    const mainSelect = $(
      `<select name="child-select" id="child-select-1">
          <option>3-х разовое питание с лечением</option>
          <option>3-х разовое питание без лечения</option>
          <option>2-х разовое питание с лечением</option>
          <option>2-х разовое питание без лечения</option>
        </select>`
    );

    const ageSelect = $(
      `<select name="child-age-select" id="child-age-select-1">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
        </select>`
    );

    const removeBtn = $(
      ` <button class="input-action-btn remove" type="button"><span>&#8722;</span></button>`
    );

    removeBtn.click(function() {
      $(this)
        .parent()
        .remove();
    });
    inputGroup.append(number);
    inputGroup.append(mainSelect);
    inputGroup.append(ageSelect);
    inputGroup.append(removeBtn);
    if (intId <= 4) {
      $('.children').append(inputGroup);
    }
  });
  // END   -- Feeding Type Modal
});
