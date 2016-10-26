<?php
/**
 * @file
 * Implements the forms for the module configuration.
 */

/**
 * Creates a custom page for the module configuration.
 */
function isi_config_form() {
  // #STATES IS BUGGED WITH RADIO BUTTONS.
  // http://drupal.stackexchange.com/questions/159853/use-drupal-states-to-check-a-radio

  drupal_add_js(drupal_get_path('module', 'isi') . '/js/visibility.js');

  $form['isi_activate'] = array(
    '#type' => 'checkbox',
    '#title' => t('Use ISI'),
    '#default_value' => variable_get('isi_use', FALSE),
  );

  // Containers.
  $form['isi_properties'] = array(
    '#type' => 'container',
    '#attributes' => array(
      'class' => array(
        'isi-properties',
      ),
    ),
    '#states' => array(
      'visible' => array(
        '#edit-isi-activate' => array('checked' => TRUE),
      )
    ),
  );

  $form['isi_properties']['isi_type'] = array(
    '#type' => 'radios',
    '#title' => t('ISI Position'),
    '#description' => t('Select where the ISI will be positioned.'),
    '#options' => array(
                    'side_right' => t('Right'),
                    'side_left' => t('Left'),
                    'bottom' => t('Bottom'),
                  ),
    '#default_value' => variable_get('isi_type', 'side_right'),
    '#required' => TRUE,
  );

  $form['isi_properties']['isi_properties_sides'] = array(
    '#type' => 'container',
    '#attributes' => array(
      'class' => array(
        'isi-properties-sides',
      ),
    ),
  );

  $form['isi_properties']['isi_properties_bottom'] = array(
    '#type' => 'container',
    '#attributes' => array(
      'class' => array(
        'isi-properties-bottom',
      ),
    ),
  );
  // Containers.

  // Properties common to all positioning.
  $form['isi_properties']['isi_common_properties'] = array(
    '#type' => 'container',
    '#attributes' => array(
      'class' => array(
        'isi-properties-common',
      ),
    ),
  );

  $form['isi_properties']['isi_common_properties']['expand_effect'] = array(
    '#type' => 'radios',
    '#title' => t('Expand ISI Effect'),
    '#description' => t('Define which kind of effect will take place once the isi is expanded.'),
    '#options' => array(
      'expand_horizontal' => t('Expand Horizontally'),
      'scroll_to' => t('Scroll to'),
    ),
    '#default_value' => variable_get('isi_expand_effect', 'expand_horizontal'),
    '#states' => array(
      'visible' => array(
        'input[name="isi_type"]' => array('checked' => TRUE),
      )
    ),
  );

  $form['isi_properties']['isi_common_properties']['scrollto_selector'] = array(
    '#type' => 'textfield',
    '#title' => t('Scroll to selector'),
    '#default_value' => variable_get('isi_scrollto_selector', ''),
    '#description' => t('The window will scroll to this selector when you click to expand the ISI.'),
  );

  $form['isi_properties']['isi_common_properties']['scrollto_duration'] = array(
    '#type' => 'textfield',
    '#title' => t('Scroll To Duration'),
    '#default_value' => variable_get('isi_scrollto_duration', '1500'),
    '#description' => t('How much time the scroll effect will take (the value is in MS). If no value is provided the default 1500 will be used.'),
    '#states' => array(
      'visible' => array(
        'input[name="scrollto_selector"]' => array('empty' => FALSE),
      ),
    ),
  );

  $form['isi_properties']['isi_common_properties']['expand_time'] = array(
    '#type' => 'textfield',
    '#title' => t('Expand Effect Duration'),
    '#default_value' => variable_get('isi_expand_duration', '1500'),
    '#description' => t('How much time the expand effect will take (the value is in MS). If no value is provided the default 1500 will be used.'),
  );
  // Properties common to all positioning

  $form['isi_properties']['isi_body'] = array(
    '#type' => 'textarea',
    '#title' => t('ISI Body'),
    '#description' => t('Do not insert the isi structure here, use only the content structure.'),
    '#default_value' => variable_get('isi_body', '<h2>Insert your ISI text here.</h2>'),
  );

  $form['#validate'][] = 'isi_config_form_validate';
  $form['#submit'][] = 'isi_config_form_submit';

  return system_settings_form($form);
}

/**
 * Implements validation for the config form.
 */
function isi_config_form_validate($form, &$form_state) {
  if ($form_state['values']['isi_activate'] == 1) {
    if ($form_state['values']['expand_effect'] == 'scroll_to') {
      if (strlen($form_state['values']['scrollto_selector']) == 0) {
        form_set_error('scrollto_selector', t('This field must not be empty.'));
      }
    }

    if (preg_match('/\D/', $form_state['values']['scrollto_duration'])) {
      form_set_error('scrollto_duration', t('Please remove any letters or symbols.'));
    }
    if (preg_match('/\D/', $form_state['values']['expand_time'])) {
      form_set_error('expand_time', t('Please remove any letters or symbols.'));
    }
  }
}

/**
 * Implements submit for the config form.
 */
function isi_config_form_submit($form, &$form_state) {
  if ($form_state['values']['isi_activate'] == 1) {
    variable_set('isi_use', TRUE);
    if ($form_state['values']['expand_effect'] == 'expand_horizontal') {
      if ($form_state['values']['expand_time'] == '') {
        variable_set('isi_expand_duration', 1500);
      }
      else {
        variable_set('isi_expand_duration', $form_state['values']['expand_time']);
      }
    }
    else if ($form_state['values']['expand_effect'] == 'scroll_to') {
      variable_set('isi_scrollto_selector', $form_state['values']['scrollto_selector']);

      if ($form_state['values']['scrollto_duration'] == '') {
        variable_set('isi_scrollto_duration', 1500);
      }
      else {
        variable_set('isi_scrollto_duration', $form_state['values']['scrollto_duration']);
      }
    }

    variable_set('isi_body', $form_state['values']['isi_body']);

    variable_set('isi_expand_effect', $form_state['values']['expand_effect']);
  }
  else {
    variable_set('isi_use', FALSE);
  }
}
