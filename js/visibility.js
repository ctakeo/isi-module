/**
 * @file
 * Script responsible to hiding/showing form elements.
 */

(function($) {
  $(document).ready(function() {
    // Positioning related;
    bindISIPosition();

    // Position effects related.
    bindScrollToSelector();

    // General.
    showInitialDivs();
  });

  /**
   * Hides/show the expand effect attributes.
   */
  function bindScrollToSelector() {
    $('.form-item-scrollto-selector').hide();
    $('.form-item-scrollto-duration').hide();
    $('input[name="expand_effect"]').change(function() {
      switch ($(this).val()) {
        case 'scroll_to':
          $('.form-item-scrollto-selector').show();
          //$('.form-item-scrollto-duration').show();
          $('.form-item-expand-time').hide();
          break;
        case 'expand_horizontal':
          $('.form-item-scrollto-selector').hide();
          $('.form-item-scrollto-duration').hide();
          $('.form-item-expand-time').show();
          break;
      }
    });
  }

  /**
   * Hides/shows containers for isi positioning effects
   * based on the position chosen.
   */
  function bindISIPosition() {
    if ($('#edit-isi-common-properties').find('.error').length == 0 && $('input[name="isi_type"]:checked').length == 0)
      $('.isi-properties-common').hide();
    $('input[name="isi_type"]').change(function() {
      if (!$('.isi-properties-common').is(':visible'))
        $('.isi-properties-common').show();
      switch ($(this).val()) {
        case 'bottom':
          $('#edit-isi-properties-bottom').show();
          $('#edit-isi-properties-sides').hide();
          break;
        case 'side_left':
          $('#edit-isi-properties-bottom').hide();
          $('#edit-isi-properties-sides').show();
          break;
        case 'side_right':
          $('#edit-isi-properties-bottom').hide();
          $('#edit-isi-properties-sides').show();
          break;
      }
    });
  }

  /**
   * Auxiliar function to clean form fields.
   * @param (String) container
   *   Container selector where the fields will be cleaned.
   */
  function cleanFields(container) {
    $(container).find('input[type="radio"]:checked').each(function() {
      $(this).prop('checked', false);
    });

    $(container).find('input[type="text"]').each(function() {
      $(this).val('');
    });
  }

  /**
   * Auxiliar function to show correc divs in case
   * a validation error occurred.
   */
  function showInitialDivs() {
    switch ($('input[name="expand_effect"]:checked').val()) {
      case 'scroll_to':
        $('.form-item-scrollto-selector').show();
        //$('.form-item-scrollto-duration').show();
        $('.form-item-expand-time').hide();
        break;
      case 'expand_horizontal':
        $('.form-item-scrollto-selector').hide();
        $('.form-item-scrollto-duration').hide();
        $('.form-item-expand-time').show();
        break;
    } 
  }
})(jQuery);
