<?php
/**
 * Plugin Name:     WP Three.js
 * Plugin URI:      https://github.com/mykedean/wp-three-js.git
 * Description:     Load three.js scenes into canvas elements in a WordPress theme
 * Author:          Michael GaryDean <contact@michaeldean.ca>
 * Author URI:      https://github.com/mykedean/
 * Text Domain:     wp-three-js
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         Wp_Three_Js
 */

/* @OTOD
 * Upload the scene as json and provide shortcode/gutenberg block such as [3dscene id=4]
 */

/**
 * Enqueue scripts and styles.
 *
 * @TODO
 * OrbitControls and scene file(s) be optional. Need a menu in the WordPress interface.
 */
function wtj_scripts() {
	wp_enqueue_style( 'wtj-style', get_stylesheet_uri(), array(), _S_VERSION );
	wp_style_add_data( 'wtj-style', 'rtl', 'replace' );

	/* Get the three.js CDN library */ 
	wp_enqueue_script( 'wtj-three-library', 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r122/three.min.js', array(), _S_VERSION, true );

	/* Load the OrbitControls */ 
	//wp_enqueue_script( 'wtj-orbit-controls', plugin_dir_url( __FILE__ ) . 'js/OrbitControls.js', array(), _S_VERSION, true );

	/* Load the scene */
	wp_enqueue_script( 'wtj-scene', plugin_dir_url( __FILE__ ) . 'js/scene.js', array(), _S_VERSION, true );
}

add_action( 'wp_enqueue_scripts', 'wtj_scripts' );