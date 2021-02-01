// wait till image is loaded
// could be useful for barba custom animations
let targetImage = $newContainer.find('.one-member__photo').find('[js-lazy]');
let targetImageLazyInstance = targetImage.Lazy({
  chainable: false,
  afterLoad: function(element) {
    let img = new Image();
    img.onload = function() {
      callbackFunction();
    };
    img.src = element.attr('src');
  },
});
targetImageLazyInstance.force(targetImage);
