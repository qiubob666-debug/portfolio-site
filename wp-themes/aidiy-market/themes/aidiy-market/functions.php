<?php
/**
 * AiDIY Market Theme Functions
 *
 * Performance-optimized WordPress theme functions for AiDIY Market.
 * Implements Core Web Vitals best practices, SEO optimization,
 * and Hostinger/LiteSpeed Cache compatibility.
 *
 * @package AiDIY_Market
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// ============================================================
// THEME SETUP
// ============================================================

function aidiy_setup() {
    // Make theme available for translation
    load_theme_textdomain( 'aidiy-market', get_template_directory() . '/languages' );

    // Add default posts and comments RSS feed links to head
    add_theme_support( 'automatic-feed-links' );

    // Let WordPress manage the document title
    add_theme_support( 'title-tag' );

    // Enable support for Post Thumbnails
    add_theme_support( 'post-thumbnails' );

    // Add custom image sizes
    add_image_size( 'aidiy-card',        400, 400, true );
    add_image_size( 'aidiy-card-wide',   800, 600, true );
    add_image_size( 'aidiy-masonry',     400, 0,   false ); // Variable height
    add_image_size( 'aidiy-hero',        1440, 900, true );
    add_image_size( 'aidiy-thumb',       80,  80,  true );

    // Register navigation menus
    register_nav_menus( [
        'primary'   => __( 'Primary Navigation', 'aidiy-market' ),
        'footer-1'  => __( 'Footer Column 1', 'aidiy-market' ),
        'footer-2'  => __( 'Footer Column 2', 'aidiy-market' ),
        'footer-3'  => __( 'Footer Column 3', 'aidiy-market' ),
        'footer-4'  => __( 'Footer Column 4', 'aidiy-market' ),
    ] );

    // Switch default core markup to output valid HTML5
    add_theme_support( 'html5', [
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ] );

    // Add theme support for selective refresh for widgets
    add_theme_support( 'customize-selective-refresh-widgets' );

    // Add support for Block Styles
    add_theme_support( 'wp-block-styles' );

    // Add support for full and wide align images
    add_theme_support( 'align-wide' );

    // Add support for editor styles
    add_theme_support( 'editor-styles' );

    // Add support for responsive embeds
    add_theme_support( 'responsive-embeds' );

    // Custom logo
    add_theme_support( 'custom-logo', [
        'height'      => 60,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ] );

    // WooCommerce support
    add_theme_support( 'woocommerce' );
    add_theme_support( 'wc-product-gallery-zoom' );
    add_theme_support( 'wc-product-gallery-lightbox' );
    add_theme_support( 'wc-product-gallery-slider' );
}
add_action( 'after_setup_theme', 'aidiy_setup' );


// ============================================================
// CONTENT WIDTH
// ============================================================

function aidiy_content_width() {
    $GLOBALS['content_width'] = apply_filters( 'aidiy_content_width', 1280 );
}
add_action( 'after_setup_theme', 'aidiy_content_width', 0 );


// ============================================================
// ENQUEUE SCRIPTS & STYLES (Performance Optimized)
// ============================================================

function aidiy_scripts() {
    $theme_version = wp_get_theme()->get( 'Version' );
    $theme_uri     = get_template_directory_uri();

    // ---- STYLES ----

    // Google Fonts — Space Grotesk + Inter + Syne (subset, display=swap)
    wp_enqueue_style(
        'aidiy-google-fonts',
        'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Syne:wght@700;800&display=swap',
        [],
        null
    );

    // Main theme stylesheet
    wp_enqueue_style(
        'aidiy-style',
        get_stylesheet_uri(),
        [ 'aidiy-google-fonts' ],
        $theme_version
    );

    // ---- SCRIPTS ----

    // Dequeue jQuery from footer if not needed on front page
    if ( ! is_admin() && ! is_singular() ) {
        wp_deregister_script( 'jquery' );
    }

    // Main theme JS (deferred)
    wp_enqueue_script(
        'aidiy-main',
        $theme_uri . '/js/main.js',
        [],
        $theme_version,
        true // Load in footer
    );

    // Intersection Observer polyfill for older browsers (async)
    wp_enqueue_script(
        'aidiy-io-polyfill',
        'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver',
        [],
        null,
        true
    );

    // Pass PHP data to JS
    wp_localize_script( 'aidiy-main', 'aidiyData', [
        'ajaxUrl'   => admin_url( 'admin-ajax.php' ),
        'nonce'     => wp_create_nonce( 'aidiy_nonce' ),
        'siteUrl'   => get_site_url(),
        'themeUrl'  => $theme_uri,
        'isLoggedIn'=> is_user_logged_in() ? 'true' : 'false',
    ] );

    // Comments script
    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }
}
add_action( 'wp_enqueue_scripts', 'aidiy_scripts' );


// ============================================================
// PERFORMANCE: Add resource hints (preconnect, dns-prefetch)
// ============================================================

function aidiy_resource_hints( $hints, $relation_type ) {
    if ( 'preconnect' === $relation_type ) {
        $hints[] = [ 'href' => 'https://fonts.googleapis.com' ];
        $hints[] = [ 'href' => 'https://fonts.gstatic.com', 'crossorigin' => 'anonymous' ];
    }

    if ( 'dns-prefetch' === $relation_type ) {
        $hints[] = 'https://fonts.googleapis.com';
        $hints[] = 'https://fonts.gstatic.com';
    }

    return $hints;
}
add_filter( 'wp_resource_hints', 'aidiy_resource_hints', 10, 2 );


// ============================================================
// PERFORMANCE: Add defer/async to scripts
// ============================================================

function aidiy_script_loader_tag( $tag, $handle, $src ) {
    // Scripts to defer
    $defer_scripts = [ 'aidiy-main' ];
    // Scripts to load async
    $async_scripts = [ 'aidiy-io-polyfill' ];

    if ( in_array( $handle, $defer_scripts ) ) {
        return str_replace( ' src', ' defer src', $tag );
    }

    if ( in_array( $handle, $async_scripts ) ) {
        return str_replace( ' src', ' async src', $tag );
    }

    return $tag;
}
add_filter( 'script_loader_tag', 'aidiy_script_loader_tag', 10, 3 );


// ============================================================
// PERFORMANCE: Inline Critical CSS
// ============================================================

function aidiy_inline_critical_css() {
    $critical_css_file = get_template_directory() . '/css/critical.css';
    if ( file_exists( $critical_css_file ) ) {
        echo '<style id="aidiy-critical-css">';
        echo file_get_contents( $critical_css_file );
        echo '</style>';
    }
}
add_action( 'wp_head', 'aidiy_inline_critical_css', 1 );


// ============================================================
// SEO: Custom meta tags
// ============================================================

function aidiy_meta_tags() {
    global $post;

    // Default values
    $title       = get_bloginfo( 'name' ) . ' — Create. Share. Make It Real.';
    $description = get_bloginfo( 'description' ) ?: 'AiDIY Market is the global creative DIY community where you can share your creations, discover materials, shop unique products, and vote for the next big DIY production.';
    $image       = get_template_directory_uri() . '/images/og-default.jpg';
    $url         = home_url( $_SERVER['REQUEST_URI'] );
    $type        = 'website';

    if ( is_singular() && isset( $post ) ) {
        $title       = get_the_title( $post ) . ' — ' . get_bloginfo( 'name' );
        $description = has_excerpt( $post ) ? get_the_excerpt( $post ) : wp_trim_words( get_the_content(), 30 );
        $url         = get_permalink( $post );
        $type        = 'article';

        if ( has_post_thumbnail( $post ) ) {
            $img   = wp_get_attachment_image_src( get_post_thumbnail_id( $post ), 'aidiy-hero' );
            $image = $img ? $img[0] : $image;
        }
    }

    $description = esc_attr( wp_strip_all_tags( $description ) );
    $title       = esc_attr( $title );

    echo "\n<!-- AiDIY Market SEO Meta Tags -->\n";
    echo '<meta name="description" content="' . $description . '">' . "\n";
    echo '<meta name="robots" content="index, follow, max-image-preview:large">' . "\n";

    // Open Graph
    echo '<meta property="og:type" content="' . $type . '">' . "\n";
    echo '<meta property="og:title" content="' . $title . '">' . "\n";
    echo '<meta property="og:description" content="' . $description . '">' . "\n";
    echo '<meta property="og:image" content="' . esc_url( $image ) . '">' . "\n";
    echo '<meta property="og:image:width" content="1440">' . "\n";
    echo '<meta property="og:image:height" content="900">' . "\n";
    echo '<meta property="og:url" content="' . esc_url( $url ) . '">' . "\n";
    echo '<meta property="og:site_name" content="' . esc_attr( get_bloginfo( 'name' ) ) . '">' . "\n";
    echo '<meta property="og:locale" content="en_US">' . "\n";

    // Twitter Card
    echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
    echo '<meta name="twitter:title" content="' . $title . '">' . "\n";
    echo '<meta name="twitter:description" content="' . $description . '">' . "\n";
    echo '<meta name="twitter:image" content="' . esc_url( $image ) . '">' . "\n";
    echo '<meta name="twitter:site" content="@aidiymarket">' . "\n";

    // Canonical
    echo '<link rel="canonical" href="' . esc_url( $url ) . '">' . "\n";
}
add_action( 'wp_head', 'aidiy_meta_tags', 5 );


// ============================================================
// SEO: Schema.org Structured Data
// ============================================================

function aidiy_schema_org() {
    $schema = [
        '@context'  => 'https://schema.org',
        '@type'     => 'Organization',
        'name'      => 'AiDIY Market',
        'url'       => home_url(),
        'logo'      => get_template_directory_uri() . '/images/logo.png',
        'sameAs'    => [
            'https://www.instagram.com/aidiymarket',
            'https://www.tiktok.com/@aidiymarket',
            'https://www.pinterest.com/aidiymarket',
            'https://twitter.com/aidiymarket',
        ],
        'description' => 'The global creative DIY community marketplace with AI-powered design tools and crowdfunding.',
    ];

    if ( is_singular( 'product' ) ) {
        global $post;
        $price = get_post_meta( $post->ID, '_price', true );
        $schema = [
            '@context'    => 'https://schema.org',
            '@type'       => 'Product',
            'name'        => get_the_title(),
            'description' => wp_strip_all_tags( get_the_excerpt() ),
            'url'         => get_permalink(),
            'image'       => get_the_post_thumbnail_url( $post, 'full' ),
            'offers'      => [
                '@type'         => 'Offer',
                'price'         => $price ?: '0',
                'priceCurrency' => 'USD',
                'availability'  => 'https://schema.org/InStock',
                'url'           => get_permalink(),
            ],
        ];
    }

    echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
}
add_action( 'wp_head', 'aidiy_schema_org', 6 );


// ============================================================
// PERFORMANCE: Remove unnecessary WordPress head bloat
// ============================================================

function aidiy_cleanup_head() {
    remove_action( 'wp_head', 'wp_generator' );                    // WordPress version
    remove_action( 'wp_head', 'wlwmanifest_link' );               // Windows Live Writer
    remove_action( 'wp_head', 'rsd_link' );                       // Really Simple Discovery
    remove_action( 'wp_head', 'wp_shortlink_wp_head' );           // Shortlink
    remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head' ); // Prev/next links
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'admin_print_styles', 'print_emoji_styles' );
}
add_action( 'init', 'aidiy_cleanup_head' );


// ============================================================
// PERFORMANCE: Optimize image output (WebP, lazy loading)
// ============================================================

function aidiy_image_attributes( $attr, $attachment, $size ) {
    // Add loading="lazy" to all images except hero
    if ( ! isset( $attr['loading'] ) ) {
        $attr['loading'] = 'lazy';
    }

    // Add decoding="async"
    $attr['decoding'] = 'async';

    return $attr;
}
add_filter( 'wp_get_attachment_image_attributes', 'aidiy_image_attributes', 10, 3 );


// ============================================================
// WIDGETS
// ============================================================

function aidiy_widgets_init() {
    register_sidebar( [
        'name'          => __( 'Sidebar', 'aidiy-market' ),
        'id'            => 'sidebar-1',
        'description'   => __( 'Add widgets here.', 'aidiy-market' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ] );

    register_sidebar( [
        'name'          => __( 'Footer Widget Area', 'aidiy-market' ),
        'id'            => 'footer-widgets',
        'description'   => __( 'Footer widget area.', 'aidiy-market' ),
        'before_widget' => '<div id="%1$s" class="footer-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="footer-widget-title">',
        'after_title'   => '</h3>',
    ] );
}
add_action( 'widgets_init', 'aidiy_widgets_init' );


// ============================================================
// AJAX: Load more posts (masonry feed)
// ============================================================

function aidiy_load_more_posts() {
    check_ajax_referer( 'aidiy_nonce', 'nonce' );

    $page     = intval( $_POST['page'] ?? 1 );
    $category = sanitize_text_field( $_POST['category'] ?? '' );
    $per_page = 12;

    $args = [
        'post_type'      => 'post',
        'posts_per_page' => $per_page,
        'paged'          => $page,
        'post_status'    => 'publish',
        'orderby'        => 'date',
        'order'          => 'DESC',
    ];

    if ( $category ) {
        $args['category_name'] = $category;
    }

    $query = new WP_Query( $args );
    $posts = [];

    if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
            $query->the_post();
            $posts[] = [
                'id'        => get_the_ID(),
                'title'     => get_the_title(),
                'permalink' => get_permalink(),
                'excerpt'   => wp_trim_words( get_the_excerpt(), 20 ),
                'thumbnail' => get_the_post_thumbnail_url( get_the_ID(), 'aidiy-masonry' ),
                'author'    => get_the_author(),
                'date'      => get_the_date( 'M j, Y' ),
            ];
        }
        wp_reset_postdata();
    }

    wp_send_json_success( [
        'posts'    => $posts,
        'hasMore'  => $query->max_num_pages > $page,
        'maxPages' => $query->max_num_pages,
    ] );
}
add_action( 'wp_ajax_aidiy_load_more', 'aidiy_load_more_posts' );
add_action( 'wp_ajax_nopriv_aidiy_load_more', 'aidiy_load_more_posts' );


// ============================================================
// CUSTOM POST TYPES: DIY Creation
// ============================================================

function aidiy_register_post_types() {
    // DIY Creations
    register_post_type( 'diy_creation', [
        'labels' => [
            'name'               => __( 'DIY Creations', 'aidiy-market' ),
            'singular_name'      => __( 'DIY Creation', 'aidiy-market' ),
            'add_new'            => __( 'Add New Creation', 'aidiy-market' ),
            'add_new_item'       => __( 'Add New DIY Creation', 'aidiy-market' ),
            'edit_item'          => __( 'Edit DIY Creation', 'aidiy-market' ),
            'new_item'           => __( 'New DIY Creation', 'aidiy-market' ),
            'view_item'          => __( 'View DIY Creation', 'aidiy-market' ),
            'search_items'       => __( 'Search DIY Creations', 'aidiy-market' ),
            'not_found'          => __( 'No DIY Creations found', 'aidiy-market' ),
            'not_found_in_trash' => __( 'No DIY Creations found in Trash', 'aidiy-market' ),
        ],
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => [ 'slug' => 'creations' ],
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-art',
        'supports'           => [ 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' ],
        'show_in_rest'       => true,
    ] );

    // Vote/Crowdfunding Projects
    register_post_type( 'vote_project', [
        'labels' => [
            'name'          => __( 'Vote Projects', 'aidiy-market' ),
            'singular_name' => __( 'Vote Project', 'aidiy-market' ),
        ],
        'public'          => true,
        'show_ui'         => true,
        'show_in_menu'    => true,
        'rewrite'         => [ 'slug' => 'vote' ],
        'capability_type' => 'post',
        'has_archive'     => true,
        'menu_icon'       => 'dashicons-chart-bar',
        'supports'        => [ 'title', 'editor', 'author', 'thumbnail', 'excerpt' ],
        'show_in_rest'    => true,
    ] );
}
add_action( 'init', 'aidiy_register_post_types' );


// ============================================================
// CUSTOM TAXONOMIES
// ============================================================

function aidiy_register_taxonomies() {
    // DIY Category
    register_taxonomy( 'diy_category', [ 'diy_creation', 'post' ], [
        'labels' => [
            'name'          => __( 'DIY Categories', 'aidiy-market' ),
            'singular_name' => __( 'DIY Category', 'aidiy-market' ),
        ],
        'hierarchical'      => true,
        'public'            => true,
        'show_ui'           => true,
        'show_admin_column' => true,
        'rewrite'           => [ 'slug' => 'diy-category' ],
        'show_in_rest'      => true,
    ] );

    // DIY Tags
    register_taxonomy( 'diy_tag', [ 'diy_creation', 'post' ], [
        'labels' => [
            'name'          => __( 'DIY Tags', 'aidiy-market' ),
            'singular_name' => __( 'DIY Tag', 'aidiy-market' ),
        ],
        'hierarchical'      => false,
        'public'            => true,
        'show_ui'           => true,
        'show_admin_column' => true,
        'rewrite'           => [ 'slug' => 'diy-tag' ],
        'show_in_rest'      => true,
    ] );
}
add_action( 'init', 'aidiy_register_taxonomies' );


// ============================================================
// HOSTINGER / LITESPEED CACHE COMPATIBILITY
// ============================================================

function aidiy_litespeed_cache_hints() {
    // Tell LiteSpeed Cache to cache this page
    if ( function_exists( 'litespeed_tag_add' ) ) {
        litespeed_tag_add( 'homepage' );
    }
}
add_action( 'wp', 'aidiy_litespeed_cache_hints' );


// ============================================================
// SECURITY: Remove WordPress version from scripts/styles
// ============================================================

function aidiy_remove_version_from_assets( $src ) {
    if ( strpos( $src, 'ver=' ) ) {
        $src = remove_query_arg( 'ver', $src );
    }
    return $src;
}
add_filter( 'style_loader_src', 'aidiy_remove_version_from_assets' );
add_filter( 'script_loader_src', 'aidiy_remove_version_from_assets' );


// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Get star rating HTML
 */
function aidiy_star_rating( $rating = 5, $max = 5 ) {
    $html = '<div class="product-stars" aria-label="' . $rating . ' out of ' . $max . ' stars">';
    for ( $i = 1; $i <= $max; $i++ ) {
        if ( $i <= $rating ) {
            $html .= '<span aria-hidden="true">★</span>';
        } else {
            $html .= '<span aria-hidden="true" style="opacity:0.3">★</span>';
        }
    }
    $html .= '</div>';
    return $html;
}

/**
 * Format large numbers (1000 → 1K, 1000000 → 1M)
 */
function aidiy_format_number( $num ) {
    if ( $num >= 1000000 ) {
        return round( $num / 1000000, 1 ) . 'M';
    } elseif ( $num >= 1000 ) {
        return round( $num / 1000, 1 ) . 'K';
    }
    return $num;
}

/**
 * Get placeholder image URL for development
 */
function aidiy_placeholder( $width = 400, $height = 400, $text = '' ) {
    return "https://placehold.co/{$width}x{$height}/F8F4FF/7B2FFF?text=" . urlencode( $text ?: 'AiDIY' );
}
