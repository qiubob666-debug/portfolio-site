<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <!-- Preconnect for performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Preload critical fonts -->
  <link rel="preload" as="style"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800&family=Inter:wght@400;500;600&family=Syne:wght@800&display=swap">

  <!-- Theme color for mobile browsers -->
  <meta name="theme-color" content="#0D0D0D">
  <meta name="msapplication-TileColor" content="#0D0D0D">

  <!-- Apple touch icon -->
  <link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri(); ?>/images/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_template_directory_uri(); ?>/images/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_template_directory_uri(); ?>/images/favicon-16x16.png">
  <link rel="manifest" href="<?php echo get_template_directory_uri(); ?>/images/site.webmanifest">

  <?php wp_head(); ?>

  <!-- Inline JS: Remove no-js class, detect features -->
  <script>
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');
  </script>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Skip to content for accessibility -->
<a class="sr-only" href="#main" style="
  position:absolute;
  top:-100%;
  left:var(--space-md);
  padding:var(--space-sm) var(--space-md);
  background:var(--color-primary);
  color:#fff;
  border-radius:var(--radius-sm);
  font-weight:600;
  z-index:9999;
  transition:top 0.2s;
" onfocus="this.style.top='var(--space-md)'" onblur="this.style.top='-100%'">
  Skip to content
</a>

<!-- ============================================================
     SITE HEADER / NAVIGATION
     ============================================================ -->
<header class="site-header" id="site-header" role="banner">
  <nav class="nav-inner" aria-label="Main navigation">

    <!-- Logo -->
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>"
       class="nav-logo"
       aria-label="<?php bloginfo( 'name' ); ?> — Home">
      <?php if ( has_custom_logo() ) : ?>
        <?php the_custom_logo(); ?>
      <?php else : ?>
        <div class="nav-logo-icon" aria-hidden="true">✂️</div>
        <span>
          <span class="logo-ai">Ai</span><span class="logo-diy">DIY</span>
          <span style="color:rgba(255,255,255,0.5); font-weight:400; margin-left:4px;">Market</span>
        </span>
      <?php endif; ?>
    </a>

    <!-- Primary Navigation Menu -->
    <div class="nav-menu" id="nav-menu" role="navigation">
      <?php
      wp_nav_menu( [
          'theme_location' => 'primary',
          'menu_class'     => '',
          'container'      => false,
          'fallback_cb'    => false,
          'items_wrap'     => '%3$s',
          'walker'         => new Walker_Nav_Menu(),
          'depth'          => 2,
      ] );

      // Fallback navigation if no menu is set
      if ( ! has_nav_menu( 'primary' ) ) : ?>
        <a href="<?php echo esc_url( home_url( '/explore' ) ); ?>" class="nav-link">
          <span aria-hidden="true">🔍</span> Explore
        </a>
        <a href="<?php echo esc_url( home_url( '/shop' ) ); ?>" class="nav-link">
          <span aria-hidden="true">🛒</span> Shop
        </a>
        <a href="<?php echo esc_url( home_url( '/vote' ) ); ?>" class="nav-link">
          <span aria-hidden="true">🗳️</span> Vote
        </a>
        <a href="<?php echo esc_url( home_url( '/ai-studio' ) ); ?>" class="nav-link">
          <span aria-hidden="true">🤖</span> AI Studio
        </a>
        <a href="<?php echo esc_url( home_url( '/community' ) ); ?>" class="nav-link">
          <span aria-hidden="true">👥</span> Community
        </a>
      <?php endif; ?>
    </div><!-- .nav-menu -->

    <!-- Nav Actions -->
    <div class="nav-actions">

      <!-- Search Button -->
      <button class="nav-search-btn"
              id="search-toggle"
              aria-label="Open search"
              aria-expanded="false"
              aria-controls="search-overlay">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </button>

      <?php if ( is_user_logged_in() ) : ?>
        <!-- User Avatar -->
        <a href="<?php echo esc_url( get_edit_profile_url() ); ?>"
           class="nav-search-btn"
           aria-label="My Profile">
          <?php echo get_avatar( get_current_user_id(), 32, '', '', [ 'class' => 'rounded-full' ] ); ?>
        </a>

        <?php if ( class_exists( 'WooCommerce' ) ) : ?>
        <!-- Cart -->
        <a href="<?php echo esc_url( wc_get_cart_url() ); ?>"
           class="btn btn-ghost btn-sm"
           aria-label="Shopping cart (<?php echo WC()->cart->get_cart_contents_count(); ?> items)">
          🛒
          <?php $cart_count = WC()->cart->get_cart_contents_count(); ?>
          <?php if ( $cart_count > 0 ) : ?>
          <span style="
            background:var(--color-primary);
            color:#fff;
            border-radius:50%;
            width:18px;
            height:18px;
            font-size:0.6875rem;
            display:inline-flex;
            align-items:center;
            justify-content:center;
            font-weight:700;
          " aria-hidden="true"><?php echo $cart_count; ?></span>
          <?php endif; ?>
        </a>
        <?php endif; ?>

      <?php else : ?>
        <a href="<?php echo esc_url( wp_login_url() ); ?>"
           class="btn btn-ghost btn-sm"
           aria-label="Sign in to your account">
          Sign In
        </a>
        <a href="<?php echo esc_url( wp_registration_url() ); ?>"
           class="btn btn-primary btn-sm"
           aria-label="Create a free account">
          Get Started
        </a>
      <?php endif; ?>

      <!-- Mobile Menu Toggle -->
      <button class="nav-toggle"
              id="nav-toggle"
              aria-label="Toggle mobile menu"
              aria-expanded="false"
              aria-controls="nav-menu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>

    </div><!-- .nav-actions -->

  </nav>
</header><!-- .site-header -->


<!-- ============================================================
     SEARCH OVERLAY
     ============================================================ -->
<div class="search-overlay"
     id="search-overlay"
     role="dialog"
     aria-modal="true"
     aria-label="Search"
     aria-hidden="true">
  <div class="search-box">
    <form role="search"
          method="get"
          action="<?php echo esc_url( home_url( '/' ) ); ?>"
          aria-label="Search AiDIY Market">
      <div class="search-input-wrap">
        <label for="search-input" class="sr-only">Search for DIY creations, products, or makers</label>
        <input type="search"
               id="search-input"
               class="search-input"
               name="s"
               placeholder="Search creations, products, makers..."
               autocomplete="off"
               aria-label="Search query">
        <button type="button"
                class="search-close"
                id="search-close"
                aria-label="Close search">✕</button>
      </div>
    </form>
    <div style="display:flex; gap:var(--space-sm); flex-wrap:wrap;">
      <span style="font-size:0.8125rem; color:rgba(255,255,255,0.4);">Popular:</span>
      <?php
      $popular_searches = [ 'Resin Art', 'Macramé', 'LED Lamp', 'Clay Kit', 'Embroidery' ];
      foreach ( $popular_searches as $term ) : ?>
      <a href="<?php echo esc_url( home_url( '/?s=' . urlencode( $term ) ) ); ?>"
         class="tag"
         style="background:rgba(255,255,255,0.08); color:rgba(255,255,255,0.6); border-color:rgba(255,255,255,0.1);">
        <?php echo esc_html( $term ); ?>
      </a>
      <?php endforeach; ?>
    </div>
  </div>
</div><!-- .search-overlay -->

<!-- Main content starts -->
<div id="page" class="site">
<main id="main" role="main" tabindex="-1">
