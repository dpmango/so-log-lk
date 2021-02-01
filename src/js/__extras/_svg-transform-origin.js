////////////
// SVG FUNCTIONS
////////////

function parseSvg() {
  let _this = $('.header__logo svg');
  if (_this.length > 0) {
    centerTransformOrigin(_this, 'logo-mark');
  }
}

// sets transform origin to center for a target class (inside svg target_el)
function centerTransformOrigin(targetEl, targetClass) {
  let findClass = '.' + targetClass;
  let myElement = targetEl.find(findClass);

  let bb = myElement.get(0).getBBox();
  let cx = bb.x + bb.width / 2;
  let cy = bb.y + bb.height / 2;

  let bodyStyle =
    '<style>' +
    '.' +
    $(target_el)
      .parent()
      .parent()
      .attr('class') +
    ' .' +
    targetClass +
    ' { transform-origin: ' +
    cx +
    'px ' +
    cy +
    'px' +
    '; }</style>';
  $(bodyStyle).appendTo('body');
}
