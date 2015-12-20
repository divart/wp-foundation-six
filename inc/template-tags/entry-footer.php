<?php

if ( ! function_exists( 'wp_foundation_six_entry_footer' ) ) {
	/**
	 * Prints HTML with meta information for the categories, tags and comments.
	 */
	function wp_foundation_six_entry_footer() {
		// Hide category and tag text for pages.
		if ( 'post' === get_post_type() ) {
			/* translators: used between list items, there is a space after the comma */
			$categories_list = get_the_category_list( ', ' );
			if ( $categories_list && wp_foundation_six_categorized_blog() ) {
				printf( '<span class="cat-links">Posted in %1$s</span>', $categories_list ); // WPCS: XSS OK.
			}

			/* translators: used between list items, there is a space after the comma */
			$tags_list = get_the_tag_list( '', ', ' );
			if ( $tags_list ) {
				printf( '<span class="tags-links">Tagged %1$s</span>', $tags_list ); // WPCS: XSS OK.
			}
		}

		if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
			echo '<span class="comments-link">';
			comments_popup_link( 'Leave a comment', '1 Comment', '% Comments' );
			echo '</span>';
		}

		edit_post_link(
			/* translators: %s: Name of current post */
			sprintf( 'Edit %s', the_title( '<span class="screen-reader-text">"', '"</span>', false ) ),
			'<span class="edit-link">',
			'</span>'
		);
	}
}