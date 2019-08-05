'use strict';

(function () {
  $(document).ready(function () {
    // Welcome Console
    console.log(
      '%cBookSpaHotel',
      'color: #0063a7; font-size: 28px; text-shadow: -1px 0 #9bba23, 0 1px #9bba23, 1px 0 #9bba23, 0 -1px #9bba23;'
    );
    $('body').materialScrollTop();


  //  Isotope
  const grid = $('.grid');
  grid.isotope({
    itemSelector: '.spa-hotels-list-item',
    filter: '.all'
  });

  $('#filter').on('change', function () {
    grid.isotope({ filter: this.value });
    checkResults();
  });

  //  Function to check if filters have some results
  function checkResults() {
    let visibleItemsCount = grid.data('isotope').filteredItems.length;
    if (visibleItemsCount > 0) {
      $('.no-results').hide();
    } else {
      $('.no-results').show();
    }
  }

  $('.spa-hotels').on('click', 'li', function () {
    const filterValue = $(this).attr('data-filter');
    grid.isotope({ filter: filterValue });
    $('.spa-hotels li').removeClass('active');
    $(this).addClass('active');
    checkResults();
  });
  });
})();
