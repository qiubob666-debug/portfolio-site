<?php
/**
 * AiDIY Market — Generic Page Template
 *
 * @package AiDIY_Market
 */

get_header(); ?>

<main id="main" class="site-main" role="main">

  <!-- Page Hero -->
  <section style="
    background: var(--gradient-hero);
    padding: calc(var(--nav-height) + var(--space-3xl)) 0 var(--space-3xl);
    text-align: center;
  ">
    <div class="container">
      <?php while ( have_posts() ) : the_post(); ?>
      <h1 style="
        font-family: var(--font-display);
        font-size: clamp(2rem, 4vw, 3.5rem);
        font-weight: 800;
        color: #fff;
        margin-bottom: var(--space-md);
      "><?php the_title(); ?></h1>
      <?php if ( has_excerpt() ) : ?>
      <p style="
        font-size: 1.125rem;
        color: rgba(255,255,255,0.65);
        max-width: 600px;
        margin: 0 auto;
      "><?php the_excerpt(); ?></p>
      <?php endif; ?>
      <?php endwhile; ?>
    </div>
  </section>

  <!-- Page Content -->
  <section class="section">
    <div class="container" style="max-width:800px;">
      <?php while ( have_posts() ) : the_post(); ?>
      <div class="entry-content" style="font-size:1.0625rem; line-height:1.8;">
        <?php the_content(); ?>
      </div>
      <?php endwhile; ?>
    </div>
  </section>

</main>

<?php get_footer(); ?>
