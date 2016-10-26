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
          else
            scrollTo(Drupal.settings.isi_module.effect_selector, Drupal.settings.isi_module.effect_duration)
        }
      });
    },
  }

  /**
   * Used for the scrollTo effect configured int he admin.
   */
  function scrollTo(selector, duration) {
    $(bodyScrollElement).animate({ scrollTop: $(selector).offset().top }, parseInt(duration));
  }

  /**
   * Used for the expand effect.
   */
  function expandHorizontal(effect, duration) {

  }
})(jQuery);
