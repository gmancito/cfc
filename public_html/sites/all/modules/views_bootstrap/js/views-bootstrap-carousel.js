(function ($) {
  Drupal.behaviors.viewsBootstrapCarousel = {
    attach: function(context, settings) {
      $.each(settings.viewsBootstrap.carousel, function(id, carousel) {
        try {
          // Does the view have more than 1 item?
          // If not, hide the indicators and controls.
          if ($('#views-bootstrap-carousel-' + carousel.id + ' .carousel-inner .item').length > 1) {
            $('#views-bootstrap-carousel-' + carousel.id, context).carousel(carousel.attributes);
          }
          else {
            $('#views-bootstrap-carousel-' + carousel.id, context).find('.carousel-indicators').hide();
            $('#views-bootstrap-carousel-' + carousel.id, context).find('.carousel-control').hide();
          }
        }
        catch(err) {
          console.log(err);
        }

        var myCarousel = $('#views-bootstrap-carousel-' + carousel.id, context);

        // If the carousel is not set to wrap hide the left control on the
        // first slide and the right control on the last slide.
        if (!myCarousel.carousel.attributes.wrap) {
          // Update the carousel controls when the page loads.
          updateControls(myCarousel);

          // Update the carousel controls each time the slide changes.
          myCarousel.on("slid.bs.carousel", "", function(event) {
            updateControls(myCarousel)
          });
        }
      });
    }
  };

  /**
   * Update carousel controls.
   *
   * Hide the left control on the first slide.
   * Hide the right control on the last slide.
   * For all other slides, show both controls.
   *
   * @param carousel
   *   The carousel to update.
   */
  function updateControls(carousel) {
    if ($(".carousel-inner .item:first", carousel).hasClass("active")) {
      carousel.children(".carousel-control.left").hide();
      carousel.children(".carousel-control.right").show();
    } else if ($(".carousel-inner .item:last", carousel).hasClass("active")) {
      carousel.children(".carousel-control.right").hide();
      carousel.children(".carousel-control.left").show();
    } else {
      carousel.children(".carousel-control").show();
    }
  }

})(jQuery);
