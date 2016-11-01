/**
 * @file
 * Script where the available behaviors are implemented.
 */

(function($) {
  var bodyScrollElement;
  Drupal.behaviors.isi_module = {
    attach: function(context, settings) {
      this.bindExpandAction();
    },
    bindExpandAction: function() {
      // Instead of using html and body to animate the scroll,
      // find out what the browser supports.
      bodyScrollElement = (navigator.userAgent.toLowerCase().indexOf('webkit') > 0 ? 'body' : 'html');
      // If the user clicks anything in the isi header it will
      // trigger the expand effect.
      $('#isi header').click(function() {
        if (Drupal.settings.isi_module.isi_type == 'side_right' || Drupal.settings.isi_module.isi_type == 'side_left') {
          if (Drupal.settings.isi_module.isi_expand_effect == 'expand_horizontal')
            expandHorizontal(Drupal.settings.isi_module.isi_expand_effect, Drupal.settings.isi_module.effect_duration);
          else {
            scrollTo(Drupal.settings.isi_module.effect_selector, Drupal.settings.isi_module.effect_duration)
          }
        }
      });

      // If the used selected the fadeout option.
      if (Drupal.settings.isi_module.isi_scrollto_fadeout == 1) {
        scrollHandler(Drupal.settings.isi_module.effect_selector, Drupal.settings.isi_module.isi_scrollto_fadeout_duration);
      }
    },
  }

  /**
   * Used for the scrollTo effect configured int he admin.
   */
  function scrollTo(selector, duration) {
    $(bodyScrollElement).animate({ scrollTop: $(selector).offset().top }, parseInt(duration));
  }

  /**
   * Used to apply a fadeout effect when the scroll reaches the
   * selector.
   */
  function scrollHandler(selector, duration) {
    var targetSelector = selector;
    $(window).scroll(function() {
      var top  = window.pageYOffset || document.documentElement.scrollTop,
          left = window.pageXOffset || document.documentElement.scrollLeft;

      if ($(selector).offset().top < (top + window.innerHeight)) {
        if ($('#block-isi-isi').is(':visible'))
          $('#block-isi-isi').fadeOut(duration);
      }
      else
        if (!$('#block-isi-isi').is(':visible'))
          $('#block-isi-isi').fadeIn(duration);
    });
  }

  /**
   * Used for the expand effect.
   */
  function expandHorizontal(effect, duration) {

  }
})(jQuery);
