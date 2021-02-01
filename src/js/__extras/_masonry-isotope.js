//////////
// MASONRY
//////////
function initMasonry() {
  if ($('[js-masonry]').length > 0) {
    $('[js-masonry]').each(function(i, masonry) {
      let $masonry = $(masonry);
      let $grid;
      let masonryOption = {
        // layoutMode: 'masonry',
        layoutMode: 'packery',
        itemSelector: '[js-masonry-card]',
        percentPosition: true,
        // gutter: 36,
        // masonry: {
        //   columnWidth: '[js-masonry-grid-sizer]'
        // },
        packery: {
          // https://packery.metafizzy.co/options.html
          columnWidth: '[js-masonry-grid-sizer]',
          originLeft: true,
          originTop: true,
          gutter: 0,
        },
      };
      $grid = $masonry.isotope(masonryOption);
    });
  }
}

// masonry click handlers
_document.on('click', '[js-masonry-filter] a', function() {
  let $this = $(this);
  let gridTarget = $this.closest('[js-masonry-filter]').data('target');
  let $masonryGrid = $('[js-masonry][data-for="' + gridTarget + '"]');
  let dataFilter = $this.data('filter');

  $masonryGrid.isotope({
    filter: function() {
      if (!dataFilter) return true; // if filter is blank - show all

      let cardFilters = $(this)
        .data('filter')
        .split(' ');
      return cardFilters.indexOf(dataFilter) !== -1;
    },
  });

  $this
    .parent()
    .siblings()
    .find('a')
    .removeClass('is-active');
  $this.addClass('is-active');
});
