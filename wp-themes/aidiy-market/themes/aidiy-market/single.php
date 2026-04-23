<?php
/**
 * AiDIY Market — Single Post / Creation Detail Template
 *
 * @package AiDIY_Market
 */

get_header(); ?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'single-creation' ); ?>>

  <!-- ============================================================
       CREATION HERO
       ============================================================ -->
  <section class="creation-hero" style="
    background: var(--gradient-hero);
    padding: calc(var(--nav-height) + var(--space-2xl)) 0 var(--space-3xl);
  ">
    <div class="container">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-3xl); align-items:start;">

        <!-- Image Gallery -->
        <div>
          <?php if ( has_post_thumbnail() ) : ?>
          <div style="border-radius:var(--radius-xl); overflow:hidden; aspect-ratio:1;">
            <?php the_post_thumbnail( 'aidiy-hero', [
              'loading' => 'eager',
              'decoding' => 'async',
              'style' => 'width:100%; height:100%; object-fit:cover;',
            ] ); ?>
          </div>
          <?php endif; ?>
        </div>

        <!-- Creation Info -->
        <div style="color:#fff;">

          <!-- Breadcrumb -->
          <nav aria-label="Breadcrumb" style="margin-bottom:var(--space-md);">
            <ol style="display:flex; gap:8px; font-size:0.8125rem; color:rgba(255,255,255,0.5); list-style:none;">
              <li><a href="<?php echo esc_url( home_url() ); ?>" style="color:rgba(255,255,255,0.5);">Home</a></li>
              <li aria-hidden="true">/</li>
              <li><a href="<?php echo esc_url( home_url('/explore') ); ?>" style="color:rgba(255,255,255,0.5);">Explore</a></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" style="color:rgba(255,255,255,0.8);"><?php the_title(); ?></li>
            </ol>
          </nav>

          <!-- Category Tags -->
          <div style="display:flex; gap:var(--space-sm); flex-wrap:wrap; margin-bottom:var(--space-md);">
            <?php
            $tags = get_the_tags();
            if ( $tags ) :
              foreach ( array_slice($tags, 0, 3) as $tag ) :
            ?>
            <a href="<?php echo esc_url( get_tag_link( $tag->term_id ) ); ?>"
               class="badge badge-secondary">
              <?php echo esc_html( $tag->name ); ?>
            </a>
            <?php endforeach; endif; ?>
          </div>

          <h1 style="
            font-family: var(--font-display);
            font-size: clamp(1.75rem, 3vw, 3rem);
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: var(--space-md);
          "><?php the_title(); ?></h1>

          <!-- Author Info -->
          <div style="display:flex; align-items:center; gap:var(--space-md); margin-bottom:var(--space-xl); padding-bottom:var(--space-xl); border-bottom:1px solid rgba(255,255,255,0.1);">
            <div style="width:48px; height:48px; border-radius:50%; overflow:hidden; border:2px solid rgba(255,255,255,0.3);">
              <?php echo get_avatar( get_the_author_meta('ID'), 48 ); ?>
            </div>
            <div>
              <div style="font-weight:700; font-size:1rem;"><?php the_author(); ?></div>
              <div style="font-size:0.8125rem; color:rgba(255,255,255,0.5);">
                <?php echo get_the_date( 'M j, Y' ); ?> · <?php echo get_the_category_list(', '); ?>
              </div>
            </div>
            <a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta('ID') ) ); ?>"
               class="btn btn-outline btn-sm" style="margin-left:auto;">
              Follow
            </a>
          </div>

          <!-- Excerpt / Description -->
          <div style="color:rgba(255,255,255,0.75); line-height:1.7; margin-bottom:var(--space-xl);">
            <?php the_excerpt(); ?>
          </div>

          <!-- Action Buttons -->
          <div style="display:flex; gap:var(--space-md); flex-wrap:wrap;">
            <button class="btn btn-primary btn-lg" aria-label="Like this creation">
              ❤️ Like
              <span style="
                background:rgba(255,255,255,0.2);
                padding:2px 8px;
                border-radius:var(--radius-pill);
                font-size:0.8125rem;
              "><?php echo get_post_meta( get_the_ID(), '_like_count', true ) ?: rand(12, 999); ?></span>
            </button>
            <button class="btn btn-outline btn-lg" aria-label="Share this creation">
              📤 Share
            </button>
            <a href="<?php echo esc_url( home_url('/vote') ); ?>"
               class="btn btn-ghost btn-lg"
               aria-label="Vote for this creation to be produced">
              🗳️ Vote to Produce
            </a>
          </div>

        </div>
      </div>
    </div>
  </section>

  <!-- ============================================================
       CREATION CONTENT
       ============================================================ -->
  <section class="section">
    <div class="container">
      <div style="display:grid; grid-template-columns:2fr 1fr; gap:var(--space-3xl);">

        <!-- Main Content -->
        <div>
          <div class="entry-content" style="
            font-size:1.0625rem;
            line-height:1.8;
            color:var(--color-text);
          ">
            <?php the_content(); ?>
          </div>

          <!-- Tags -->
          <?php if ( has_tag() ) : ?>
          <div style="margin-top:var(--space-2xl); padding-top:var(--space-xl); border-top:1px solid var(--color-border);">
            <h3 style="font-size:0.875rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:var(--color-text-muted); margin-bottom:var(--space-sm);">Tags</h3>
            <div style="display:flex; gap:var(--space-sm); flex-wrap:wrap;">
              <?php the_tags( '', '', '' ); ?>
            </div>
          </div>
          <?php endif; ?>

          <!-- Comments -->
          <?php if ( comments_open() || get_comments_number() ) : ?>
          <div style="margin-top:var(--space-3xl);">
            <?php comments_template(); ?>
          </div>
          <?php endif; ?>
        </div>

        <!-- Sidebar -->
        <aside>

          <!-- Materials Used -->
          <div class="card" style="padding:var(--space-xl); margin-bottom:var(--space-lg);">
            <h3 style="font-size:1rem; font-weight:700; margin-bottom:var(--space-md);">🧰 Materials Used</h3>
            <?php
            $materials = get_post_meta( get_the_ID(), '_materials', true );
            if ( $materials ) :
              echo wp_kses_post( $materials );
            else : ?>
            <p style="color:var(--color-text-muted); font-size:0.875rem;">No materials listed yet.</p>
            <?php endif; ?>
            <a href="<?php echo esc_url( home_url('/shop') ); ?>"
               class="btn btn-primary w-full"
               style="margin-top:var(--space-md); justify-content:center;">
              🛒 Shop Similar Kits
            </a>
          </div>

          <!-- Creator Profile Card -->
          <div class="card" style="padding:var(--space-xl); margin-bottom:var(--space-lg);">
            <h3 style="font-size:1rem; font-weight:700; margin-bottom:var(--space-md);">👤 About the Creator</h3>
            <div style="display:flex; align-items:center; gap:var(--space-md); margin-bottom:var(--space-md);">
              <div style="width:56px; height:56px; border-radius:50%; overflow:hidden; flex-shrink:0;">
                <?php echo get_avatar( get_the_author_meta('ID'), 56 ); ?>
              </div>
              <div>
                <div style="font-weight:700;"><?php the_author(); ?></div>
                <div style="font-size:0.8125rem; color:var(--color-text-muted);">
                  <?php echo count_user_posts( get_the_author_meta('ID') ); ?> creations
                </div>
              </div>
            </div>
            <p style="font-size:0.875rem; color:var(--color-text-muted); line-height:1.6; margin-bottom:var(--space-md);">
              <?php echo get_the_author_meta('description') ?: 'Creative maker sharing DIY inspiration with the world.'; ?>
            </p>
            <a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta('ID') ) ); ?>"
               class="btn btn-ghost w-full"
               style="justify-content:center;">
              View Profile →
            </a>
          </div>

          <!-- Vote CTA -->
          <div style="
            background: var(--gradient-hero);
            border-radius: var(--radius-xl);
            padding: var(--space-xl);
            text-align: center;
            color: #fff;
          ">
            <div style="font-size:2rem; margin-bottom:var(--space-sm);">🗳️</div>
            <h3 style="font-size:1rem; font-weight:700; margin-bottom:var(--space-sm);">Love this creation?</h3>
            <p style="font-size:0.875rem; color:rgba(255,255,255,0.65); margin-bottom:var(--space-md);">Vote to get it manufactured and sold on AiDIY Market!</p>
            <a href="<?php echo esc_url( home_url('/vote') ); ?>"
               class="btn btn-accent w-full"
               style="justify-content:center;">
              Vote to Produce
            </a>
          </div>

        </aside>
      </div>
    </div>
  </section>

  <!-- Related Creations -->
  <section class="section" style="background:var(--color-bg-light);">
    <div class="container">
      <h2 class="section-title" style="margin-bottom:var(--space-2xl);">
        More <span class="highlight">Creations</span> You'll Love
      </h2>
      <div class="masonry-grid">
        <?php
        $related = new WP_Query( [
            'post_type'      => get_post_type(),
            'posts_per_page' => 8,
            'post__not_in'   => [ get_the_ID() ],
            'orderby'        => 'rand',
        ] );
        if ( $related->have_posts() ) :
            while ( $related->have_posts() ) : $related->the_post();
                get_template_part( 'template-parts/content' );
            endwhile;
            wp_reset_postdata();
        endif; ?>
      </div>
    </div>
  </section>

</article>

<?php get_footer(); ?>
