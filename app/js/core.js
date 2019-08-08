'use strict';

$(document).ready(function () {
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
  const isotopeHandler = (className) => {
    const grid = $(`${className} .grid`);
    grid.isotope({
      itemSelector: '.spa-hotels-list-item',
      filter: '.all'
    });

    $(`${className}`).on('click', 'li', function () {
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
  const picker1 = new Pikaday({ field: $('.search-datapicker.arrival')[0] });
  const picker2 = new Pikaday({ field: $('.search-datapicker.departure')[0] });
});
