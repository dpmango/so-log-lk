//////////
// DatePicker
//////////
(function($, APP) {
  APP.Plugins.DatePicker = {
    init: function(fromPjax) {
      if (!fromPjax) {
        this.clickListeners();
      }
      let $datepicker = $('.js-datepicker');

      if ($datepicker.length === 0) return;

      // compare DOM cell dates with instance dates helper function
      function compareDates(origin, $cell, addClass) {
        let target = {
          day: $cell.data('date'),
          month: $cell.data('month'),
        };

        if (origin.day === target.day && origin.month === target.month) {
          return `${addClass} `;
        } else {
          return '';
        }
      }

      // initialization
      $datepicker.each(function(i, picker) {
        let $picker = $(picker);

        $picker.datepicker({
          language: 'en',
          inline: true,
          minDate: new Date(),
          // range: true,
          firstDay: 1,
          minView: 'days',
          onRenderCell: function(date, cellType) {
            if (cellType === 'day') {
              let cellDates = {
                day: date.getDate(),
                month: date.getMonth(),
              };
              // targeting cells that are focused by hover
              let $hovered = $('.datepicker--cell.-hovered-');
              let classes = '';

              if ($hovered.length > 0) {
                let $curCell = $hovered.first();
                let $lastCell = $hovered.last();

                // add classes
                $hovered.each(function(i, cell) {
                  classes += compareDates(cellDates, $(cell), '-selected-');
                });

                classes += compareDates(cellDates, $curCell, '-range-from-');
                classes += compareDates(cellDates, $lastCell, '-range-to-');
              }

              return {
                html: `<div class="cell-wrapper"><span>${cellDates.day}</span></div>`,
                classes: classes,
              };
            }
          },
          onSelect: function(formattedDate, date, inst) {
            inst.$el.blur();
            $.modal.close();
          },
        });
      });
    },
    addFocusClasses: function($curCell, withRange) {
      // clear
      let selectedRange = 4;
      let $rangeCells = $curCell.nextAll().slice(0, selectedRange - 1);
      let $lastCell = $rangeCells.last();

      $rangeCells.addClass('-hovered-');
      $curCell.addClass('-hovered-').addClass('-range-from-hover-');
      $lastCell.addClass('-range-to-hover-');
    },
    clearFocusClasses: function(withRange) {
      $('.datepicker--cell')
        .removeClass('-hovered-')
        .removeClass('-range-from-hover-')
        .removeClass('-range-to-hover-');
    },
    clickListeners: function() {
      let _this = this;

      // adds only hover classes, clear every time
      _document
        .on('mouseenter', '.datepicker--cell', function() {
          let $curCell = $(this);
          if ($curCell.is('.-disabled-')) return;
          _this.addFocusClasses($curCell);
        })
        .on('mouseleave', '.datepicker--cell', function() {
          _this.clearFocusClasses();
        });
    },
  };
})(jQuery, window.APP);
