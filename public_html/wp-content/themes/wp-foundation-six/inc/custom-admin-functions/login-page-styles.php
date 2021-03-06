<?php

/**
 * Login page style sheet
 *
 * @link https://codex.wordpress.org/Customizing_the_Login_Form
 * @link https://css-tricks.com/snippets/wordpress/apply-custom-css-to-admin-area/
 */
if ( ! function_exists( 'wp_foundation_six_login_page_styles' ) ) {
	function wp_foundation_six_login_page_styles() {
		wp_enqueue_style( 'login_page_styles', get_template_directory_uri() . '/assets/css/login-admin.min.css' );
	}
}
add_action( 'login_enqueue_scripts', 'wp_foundation_six_login_page_styles' );
add_action( 'admin_head', 'wp_foundation_six_login_page_styles' );
