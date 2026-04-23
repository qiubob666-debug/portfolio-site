<?php
/**
 * AiDIY Market — 404 Error Page
 *
 * @package AiDIY_Market
 */

get_header(); ?>

<main id="main" role="main" style="
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-hero);
  text-align: center;
  padding: var(--nav-height) var(--space-xl) var(--space-xl);
">
  <div>
    <div style="font-size:6rem; margin-bottom:var(--space-md);" aria-hidden="true">✂️</div>
    <h1 style="
      font-family: var(--font-display);
      font-size: clamp(4rem, 10vw, 8rem);
      font-weight: 800;
      background: var(--gradient-primary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
      margin-bottom: var(--space-md);
    ">404</h1>
    <h2 style="color:#fff; font-size:1.5rem; font-weight:700; margin-bottom:var(--space-md);">
      Oops! This page got crafted away.
    </h2>
    <p style="color:rgba(255,255,255,0.6); font-size:1rem; max-width:400px; margin:0 auto var(--space-2xl);">
      The page you're looking for doesn't exist or has been moved. Let's get you back to creating!
    </p>
    <div style="display:flex; gap:var(--space-md); justify-content:center; flex-wrap:wrap;">
      <a href="<?php echo esc_url( home_url('/') ); ?>" class="btn btn-primary btn-lg">
        🏠 Go Home
      </a>
      <a href="<?php echo esc_url( home_url('/explore') ); ?>" class="btn btn-outline btn-lg">
        🔍 Explore Creations
      </a>
    </div>
  </div>
</main>

<?php get_footer(); ?>
