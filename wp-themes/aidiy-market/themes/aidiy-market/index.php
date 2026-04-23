<?php
/**
 * AiDIY Market — Main Index Template
 * Serves as the homepage and fallback template.
 *
 * @package AiDIY_Market
 */

get_header(); ?>

<?php if ( is_front_page() ) : ?>

<!-- ============================================================
     HERO SECTION
     ============================================================ -->
<section class="hero" id="hero" aria-label="Hero">

  <!-- Animated Background -->
  <div class="hero-bg" aria-hidden="true">
    <div class="hero-blob hero-blob-1"></div>
    <div class="hero-blob hero-blob-2"></div>
    <div class="hero-blob hero-blob-3"></div>
    <div class="hero-noise"></div>
  </div>

  <div class="hero-inner">

    <!-- Hero Content -->
    <div class="hero-content">

      <div class="hero-eyebrow">
        <span class="dot" aria-hidden="true"></span>
        <span>✨ The Global DIY Creative Platform</span>
      </div>

      <h1 class="hero-title">
        <span>Create.</span>
        <span class="line-highlight">Share.</span>
        <span class="line-accent">Make It Real.</span>
      </h1>

      <p class="hero-subtitle">
        Join <strong>500K+ makers</strong> worldwide. Share your DIY creations, discover unique material kits, vote for the next big production — powered by AI.
      </p>

      <div class="hero-cta-group">
        <a href="<?php echo esc_url( home_url( '/explore' ) ); ?>"
           class="btn btn-primary btn-lg"
           aria-label="Start exploring DIY creations">
          <span>🚀</span>
          <span>Explore Creations</span>
        </a>
        <a href="<?php echo esc_url( home_url( '/share' ) ); ?>"
           class="btn btn-outline btn-lg"
           aria-label="Share your own DIY creation">
          <span>✏️</span>
          <span>Share Yours</span>
        </a>
      </div>

      <!-- Social Proof Stats -->
      <div class="hero-social-proof" role="list" aria-label="Platform statistics">
        <div class="hero-stat" role="listitem">
          <span class="hero-stat-number">500K+</span>
          <span class="hero-stat-label">Makers</span>
        </div>
        <div class="hero-stat-divider" aria-hidden="true"></div>
        <div class="hero-stat" role="listitem">
          <span class="hero-stat-number">2M+</span>
          <span class="hero-stat-label">Creations</span>
        </div>
        <div class="hero-stat-divider" aria-hidden="true"></div>
        <div class="hero-stat" role="listitem">
          <span class="hero-stat-number">120+</span>
          <span class="hero-stat-label">Countries</span>
        </div>
      </div>

    </div><!-- .hero-content -->

    <!-- Hero Visual — Masonry Preview -->
    <div class="hero-visual" aria-hidden="true">

      <!-- Floating Cards -->
      <div class="hero-float-card hero-float-card-1">
        <span>🔥</span>
        <span>Trending Now: Resin Art</span>
      </div>
      <div class="hero-float-card hero-float-card-2">
        <span>🗳️</span>
        <span>1,240 votes today!</span>
      </div>

      <!-- Masonry Grid Preview -->
      <div class="hero-masonry" role="img" aria-label="Sample DIY creations">
        <?php
        // Display recent featured creations in hero
        $hero_posts = new WP_Query( [
            'post_type'      => [ 'diy_creation', 'post' ],
            'posts_per_page' => 9,
            'post_status'    => 'publish',
            'meta_key'       => '_featured',
            'meta_value'     => '1',
            'orderby'        => 'rand',
        ] );

        if ( $hero_posts->have_posts() ) :
            while ( $hero_posts->have_posts() ) : $hero_posts->the_post();
                $thumb = get_the_post_thumbnail_url( get_the_ID(), 'aidiy-card' );
                if ( ! $thumb ) $thumb = aidiy_placeholder( 200, 280, get_the_title() );
        ?>
        <div class="hero-masonry-item">
          <img src="<?php echo esc_url( $thumb ); ?>"
               alt="<?php echo esc_attr( get_the_title() ); ?>"
               width="200" height="280"
               loading="lazy" decoding="async">
        </div>
        <?php
            endwhile;
            wp_reset_postdata();
        else :
            // Placeholder items for fresh install
            $placeholders = [
                ['Resin Art', '200', '280'],
                ['Macramé', '200', '220'],
                ['LED Lamp', '200', '320'],
                ['Clay Pot', '200', '260'],
                ['Embroidery', '200', '240'],
                ['Origami', '200', '300'],
                ['Tie-Dye', '200', '270'],
                ['Candle', '200', '250'],
                ['Jewelry', '200', '290'],
            ];
            foreach ( $placeholders as $ph ) : ?>
            <div class="hero-masonry-item">
              <img src="<?php echo esc_url( aidiy_placeholder( $ph[1], $ph[2], $ph[0] ) ); ?>"
                   alt="<?php echo esc_attr( $ph[0] ); ?> DIY creation"
                   width="<?php echo esc_attr( $ph[1] ); ?>"
                   height="<?php echo esc_attr( $ph[2] ); ?>"
                   loading="lazy" decoding="async">
            </div>
            <?php endforeach;
        endif; ?>
      </div><!-- .hero-masonry -->

    </div><!-- .hero-visual -->

  </div><!-- .hero-inner -->
</section><!-- .hero -->


<!-- ============================================================
     STATS BAR
     ============================================================ -->
<section class="stats-bar" aria-label="Platform statistics">
  <div class="stats-bar-inner container">
    <div class="stat-item animate-on-scroll">
      <span class="stat-number" data-count="500000">500K+</span>
      <span class="stat-label">Global Makers</span>
    </div>
    <div class="stat-item animate-on-scroll delay-1">
      <span class="stat-number" data-count="2000000">2M+</span>
      <span class="stat-label">DIY Creations Shared</span>
    </div>
    <div class="stat-item animate-on-scroll delay-2">
      <span class="stat-number" data-count="50000">50K+</span>
      <span class="stat-label">Material Kits Sold</span>
    </div>
    <div class="stat-item animate-on-scroll delay-3">
      <span class="stat-number" data-count="1200">1,200+</span>
      <span class="stat-label">Projects Funded</span>
    </div>
    <div class="stat-item animate-on-scroll delay-4">
      <span class="stat-number" data-count="120">120+</span>
      <span class="stat-label">Countries</span>
    </div>
  </div>
</section>


<!-- ============================================================
     CATEGORY TAGS SCROLL
     ============================================================ -->
<nav class="categories-scroll" aria-label="Browse by category">
  <div class="categories-track" role="list">
    <?php
    $categories = [
        [ 'emoji' => '🎨', 'name' => 'All',        'slug' => '' ],
        [ 'emoji' => '🪡', 'name' => 'Textile',    'slug' => 'textile' ],
        [ 'emoji' => '🏺', 'name' => 'Clay & Resin','slug' => 'clay-resin' ],
        [ 'emoji' => '💡', 'name' => 'Electronics', 'slug' => 'electronics' ],
        [ 'emoji' => '🌿', 'name' => 'Eco & Green', 'slug' => 'eco' ],
        [ 'emoji' => '📦', 'name' => 'Paper & Print','slug' => 'paper' ],
        [ 'emoji' => '🪵', 'name' => 'Wood & Metal', 'slug' => 'wood-metal' ],
        [ 'emoji' => '💎', 'name' => 'Jewelry',     'slug' => 'jewelry' ],
        [ 'emoji' => '🕯️', 'name' => 'Candle & Soap','slug' => 'candle-soap' ],
        [ 'emoji' => '🖼️', 'name' => 'Wall Art',    'slug' => 'wall-art' ],
        [ 'emoji' => '🤖', 'name' => 'AI-Assisted', 'slug' => 'ai-assisted' ],
        [ 'emoji' => '🧩', 'name' => 'Kits',        'slug' => 'kits' ],
    ];
    foreach ( $categories as $i => $cat ) : ?>
    <button class="category-pill <?php echo $i === 0 ? 'active' : ''; ?>"
            role="listitem"
            data-category="<?php echo esc_attr( $cat['slug'] ); ?>"
            aria-pressed="<?php echo $i === 0 ? 'true' : 'false'; ?>">
      <span class="emoji" aria-hidden="true"><?php echo $cat['emoji']; ?></span>
      <span><?php echo esc_html( $cat['name'] ); ?></span>
    </button>
    <?php endforeach; ?>
  </div>
</nav>


<!-- ============================================================
     CREATOR CHANNEL — MASONRY FEED
     ============================================================ -->
<section class="feed-section section" id="explore" aria-labelledby="feed-title">
  <div class="container">

    <div class="section-header">
      <div>
        <h2 class="section-title" id="feed-title">
          Trending <span class="highlight">Creations</span>
        </h2>
        <p class="text-muted" style="margin-top:8px;">Discover what makers around the world are creating right now</p>
      </div>
      <a href="<?php echo esc_url( home_url( '/explore' ) ); ?>"
         class="btn btn-ghost"
         aria-label="View all DIY creations">
        View All →
      </a>
    </div>

    <!-- Masonry Grid -->
    <div class="masonry-grid" id="masonry-feed" role="feed" aria-label="DIY creations feed">
      <?php
      $feed_query = new WP_Query( [
          'post_type'      => [ 'diy_creation', 'post' ],
          'posts_per_page' => 12,
          'post_status'    => 'publish',
          'orderby'        => 'date',
          'order'          => 'DESC',
      ] );

      if ( $feed_query->have_posts() ) :
          while ( $feed_query->have_posts() ) : $feed_query->the_post();
              $thumb = get_the_post_thumbnail_url( get_the_ID(), 'aidiy-masonry' );
              if ( ! $thumb ) $thumb = aidiy_placeholder( 400, rand(300, 500), get_the_title() );
              $author_id = get_the_author_meta( 'ID' );
      ?>
      <article class="masonry-item animate-on-scroll" role="article">
        <a href="<?php the_permalink(); ?>" aria-label="View <?php the_title(); ?>">
          <img src="<?php echo esc_url( $thumb ); ?>"
               alt="<?php echo esc_attr( get_the_title() ); ?>"
               loading="lazy" decoding="async">
          <div class="masonry-overlay">
            <div class="masonry-overlay-content">
              <div class="masonry-creator">
                <div class="masonry-avatar" aria-hidden="true">
                  <?php echo get_avatar( $author_id, 28 ); ?>
                </div>
                <span class="masonry-creator-name"><?php the_author(); ?></span>
              </div>
              <h3 class="masonry-title"><?php the_title(); ?></h3>
              <div class="masonry-actions">
                <span class="masonry-action-btn">
                  <span aria-hidden="true">❤️</span>
                  <span><?php echo rand(12, 999); ?></span>
                </span>
                <span class="masonry-action-btn">
                  <span aria-hidden="true">💬</span>
                  <span><?php echo get_comments_number(); ?></span>
                </span>
              </div>
            </div>
          </div>
        </a>
      </article>
      <?php
          endwhile;
          wp_reset_postdata();
      else :
          // Placeholder items for fresh install
          $sample_titles = [
              'Macramé Wall Hanging', 'LED Resin Lamp', 'Clay Succulent Pot',
              'Embroidered Tote Bag', 'Origami Mobile', 'Tie-Dye Hoodie',
              'Pressed Flower Frame', 'Wooden Shelf', 'Candle Set',
              'Wire Jewelry', 'Paper Lantern', 'Terrarium Kit',
          ];
          foreach ( $sample_titles as $i => $title ) :
              $heights = [320, 280, 380, 260, 340, 300, 360, 290, 310, 350, 270, 330];
      ?>
      <article class="masonry-item animate-on-scroll" style="animation-delay:<?php echo $i * 0.05; ?>s">
        <img src="<?php echo esc_url( aidiy_placeholder( 400, $heights[$i], $title ) ); ?>"
             alt="<?php echo esc_attr( $title ); ?> — DIY creation"
             width="400" height="<?php echo $heights[$i]; ?>"
             loading="lazy" decoding="async">
        <div class="masonry-overlay">
          <div class="masonry-overlay-content">
            <div class="masonry-creator">
              <div class="masonry-avatar" aria-hidden="true"></div>
              <span class="masonry-creator-name">maker_<?php echo $i + 1; ?></span>
            </div>
            <h3 class="masonry-title"><?php echo esc_html( $title ); ?></h3>
            <div class="masonry-actions">
              <span class="masonry-action-btn">❤️ <?php echo rand(12, 999); ?></span>
              <span class="masonry-action-btn">💬 <?php echo rand(2, 48); ?></span>
            </div>
          </div>
        </div>
      </article>
      <?php endforeach;
      endif; ?>
    </div><!-- .masonry-grid -->

    <!-- Load More -->
    <div style="text-align:center; margin-top:var(--space-2xl);">
      <button class="btn btn-ghost btn-lg" id="load-more-btn"
              data-page="2" aria-label="Load more DIY creations">
        <span>Load More Creations</span>
        <span aria-hidden="true">↓</span>
      </button>
    </div>

  </div>
</section><!-- .feed-section -->


<!-- ============================================================
     FEATURES SECTION
     ============================================================ -->
<section class="features-section section" aria-labelledby="features-title">
  <div class="container">

    <div class="text-center" style="margin-bottom:var(--space-3xl);">
      <div class="badge badge-secondary" style="margin-bottom:var(--space-md);">Why AiDIY Market</div>
      <h2 class="section-title text-white" id="features-title">
        Everything you need to<br>
        <span class="text-gradient">create, share & earn</span>
      </h2>
    </div>

    <div class="features-grid">

      <div class="feature-card animate-on-scroll">
        <div class="feature-icon feature-icon-1" aria-hidden="true">🎨</div>
        <h3 class="feature-title">Share Your Creations</h3>
        <p class="feature-desc">Upload photos and videos of your DIY projects. Build your creator profile and grow a global following of fellow makers.</p>
      </div>

      <div class="feature-card animate-on-scroll delay-1">
        <div class="feature-icon feature-icon-2" aria-hidden="true">🛒</div>
        <h3 class="feature-title">Shop Material Kits</h3>
        <p class="feature-desc">Browse curated DIY kits from official brands and verified sellers. Everything you need to start your next project, delivered to your door.</p>
      </div>

      <div class="feature-card animate-on-scroll delay-2">
        <div class="feature-icon feature-icon-3" aria-hidden="true">🤖</div>
        <h3 class="feature-title">AI Design Studio</h3>
        <p class="feature-desc">Use our AI tools to design your dream creation. No design skills needed — describe your idea and let AI bring it to life.</p>
      </div>

      <div class="feature-card animate-on-scroll delay-3">
        <div class="feature-icon feature-icon-4" aria-hidden="true">🗳️</div>
        <h3 class="feature-title">Vote & Fund</h3>
        <p class="feature-desc">Vote for the DIY creations you want to see produced. The most popular designs get manufactured and sold — creators earn royalties.</p>
      </div>

      <div class="feature-card animate-on-scroll delay-4">
        <div class="feature-icon feature-icon-5" aria-hidden="true">🏭</div>
        <h3 class="feature-title">Supply Chain Magic</h3>
        <p class="feature-desc">We connect winning designs with our global supply chain partners. Your idea becomes a real product without the manufacturing headache.</p>
      </div>

      <div class="feature-card animate-on-scroll delay-1">
        <div class="feature-icon feature-icon-6" aria-hidden="true">🌍</div>
        <h3 class="feature-title">Global Community</h3>
        <p class="feature-desc">Connect with 500K+ makers from 120+ countries. Share techniques, collaborate on projects, and celebrate creativity together.</p>
      </div>

    </div><!-- .features-grid -->

  </div>
</section><!-- .features-section -->


<!-- ============================================================
     SHOP SECTION
     ============================================================ -->
<section class="shop-section section" id="shop" aria-labelledby="shop-title">
  <div class="container">

    <div class="section-header">
      <div>
        <h2 class="section-title" id="shop-title">
          Featured <span class="highlight">Kits & Products</span>
        </h2>
        <p class="text-muted" style="margin-top:8px;">Handpicked material kits from top creators and brands</p>
      </div>
      <a href="<?php echo esc_url( home_url( '/shop' ) ); ?>"
         class="btn btn-ghost"
         aria-label="Browse all products in the shop">
        Shop All →
      </a>
    </div>

    <div class="product-grid">
      <?php
      // WooCommerce products or fallback
      if ( class_exists( 'WooCommerce' ) ) :
          $products = wc_get_products( [
              'limit'    => 8,
              'status'   => 'publish',
              'featured' => true,
              'orderby'  => 'popularity',
          ] );
          foreach ( $products as $product ) :
              $img = wp_get_attachment_image_src( $product->get_image_id(), 'aidiy-card' );
      ?>
      <article class="product-card animate-on-scroll">
        <div class="product-card-image">
          <img src="<?php echo esc_url( $img ? $img[0] : aidiy_placeholder( 400, 400, $product->get_name() ) ); ?>"
               alt="<?php echo esc_attr( $product->get_name() ); ?>"
               width="400" height="400"
               loading="lazy" decoding="async">
          <?php if ( $product->is_on_sale() ) : ?>
          <div class="product-badge">
            <span class="badge badge-new">Sale</span>
          </div>
          <?php endif; ?>
          <button class="product-wishlist" aria-label="Add <?php echo esc_attr( $product->get_name() ); ?> to wishlist">♡</button>
        </div>
        <div class="product-card-body">
          <h3 class="product-title"><?php echo esc_html( $product->get_name() ); ?></h3>
          <div class="product-rating">
            <?php echo aidiy_star_rating( round( $product->get_average_rating() ) ?: 5 ); ?>
            <span class="product-rating-count">(<?php echo $product->get_review_count(); ?>)</span>
          </div>
          <div class="product-card-footer">
            <div>
              <span class="product-price"><?php echo $product->get_price_html(); ?></span>
            </div>
            <a href="<?php echo esc_url( $product->add_to_cart_url() ); ?>"
               class="product-add-btn"
               aria-label="Add <?php echo esc_attr( $product->get_name() ); ?> to cart">+</a>
          </div>
        </div>
      </article>
      <?php
          endforeach;
      else :
          // Placeholder products for fresh install
          $sample_products = [
              [ 'name' => 'Resin Art Starter Kit',      'price' => '$24.99', 'old' => '$34.99', 'rating' => 5, 'reviews' => 128, 'badge' => 'Best Seller' ],
              [ 'name' => 'Macramé Wall Art Bundle',     'price' => '$18.99', 'old' => '',       'rating' => 4, 'reviews' => 87,  'badge' => '' ],
              [ 'name' => 'LED Resin Lamp Kit',          'price' => '$32.99', 'old' => '$42.99', 'rating' => 5, 'reviews' => 203, 'badge' => 'Hot 🔥' ],
              [ 'name' => 'Air-Dry Clay Set (12 colors)','price' => '$15.99', 'old' => '',       'rating' => 4, 'reviews' => 64,  'badge' => 'New' ],
              [ 'name' => 'Embroidery Starter Pack',     'price' => '$21.99', 'old' => '$28.99', 'rating' => 5, 'reviews' => 156, 'badge' => 'Sale' ],
              [ 'name' => 'Tie-Dye Ultimate Kit',        'price' => '$27.99', 'old' => '',       'rating' => 4, 'reviews' => 92,  'badge' => '' ],
              [ 'name' => 'Candle Making Bundle',        'price' => '$19.99', 'old' => '$26.99', 'rating' => 5, 'reviews' => 178, 'badge' => 'Sale' ],
              [ 'name' => 'Wire Jewelry Tool Set',       'price' => '$29.99', 'old' => '',       'rating' => 4, 'reviews' => 43,  'badge' => 'New' ],
          ];
          foreach ( $sample_products as $i => $product ) : ?>
          <article class="product-card animate-on-scroll" style="animation-delay:<?php echo $i * 0.08; ?>s">
            <div class="product-card-image">
              <img src="<?php echo esc_url( aidiy_placeholder( 400, 400, $product['name'] ) ); ?>"
                   alt="<?php echo esc_attr( $product['name'] ); ?>"
                   width="400" height="400"
                   loading="lazy" decoding="async">
              <?php if ( $product['badge'] ) : ?>
              <div class="product-badge">
                <span class="badge badge-new"><?php echo esc_html( $product['badge'] ); ?></span>
              </div>
              <?php endif; ?>
              <button class="product-wishlist" aria-label="Add to wishlist">♡</button>
            </div>
            <div class="product-card-body">
              <div class="product-seller">
                <div class="product-seller-avatar"></div>
                <span class="product-seller-name">Official Store</span>
              </div>
              <h3 class="product-title"><?php echo esc_html( $product['name'] ); ?></h3>
              <div class="product-rating">
                <?php echo aidiy_star_rating( $product['rating'] ); ?>
                <span class="product-rating-count">(<?php echo $product['reviews']; ?>)</span>
              </div>
              <div class="product-card-footer">
                <div>
                  <span class="product-price"><?php echo esc_html( $product['price'] ); ?></span>
                  <?php if ( $product['old'] ) : ?>
                  <span class="product-price-original"><?php echo esc_html( $product['old'] ); ?></span>
                  <?php endif; ?>
                </div>
                <button class="product-add-btn" aria-label="Add <?php echo esc_attr( $product['name'] ); ?> to cart">+</button>
              </div>
            </div>
          </article>
          <?php endforeach;
      endif; ?>
    </div><!-- .product-grid -->

  </div>
</section><!-- .shop-section -->


<!-- ============================================================
     VOTE & FUND SECTION
     ============================================================ -->
<section class="vote-section section" id="vote" aria-labelledby="vote-title">
  <div class="container">

    <div class="section-header">
      <div>
        <div class="badge badge-primary" style="margin-bottom:var(--space-sm);">Community Powered</div>
        <h2 class="section-title" id="vote-title">
          Vote for the <span class="highlight">Next Big DIY</span>
        </h2>
        <p class="text-muted" style="margin-top:8px;">Top voted creations get manufactured — creators earn royalties</p>
      </div>
      <a href="<?php echo esc_url( home_url( '/vote' ) ); ?>"
         class="btn btn-ghost"
         aria-label="View all voting projects">
        See All Projects →
      </a>
    </div>

    <div class="vote-grid">
      <?php
      $vote_projects = new WP_Query( [
          'post_type'      => 'vote_project',
          'posts_per_page' => 3,
          'post_status'    => 'publish',
          'orderby'        => 'meta_value_num',
          'meta_key'       => '_vote_count',
          'order'          => 'DESC',
      ] );

      if ( $vote_projects->have_posts() ) :
          while ( $vote_projects->have_posts() ) : $vote_projects->the_post();
              $votes    = get_post_meta( get_the_ID(), '_vote_count', true ) ?: rand(500, 2000);
              $goal     = get_post_meta( get_the_ID(), '_vote_goal', true ) ?: 2500;
              $progress = min( 100, round( ( $votes / $goal ) * 100 ) );
              $thumb    = get_the_post_thumbnail_url( get_the_ID(), 'aidiy-card-wide' );
              if ( ! $thumb ) $thumb = aidiy_placeholder( 400, 300, get_the_title() );
      ?>
      <article class="vote-card animate-on-scroll">
        <div class="vote-card-image">
          <img src="<?php echo esc_url( $thumb ); ?>"
               alt="<?php echo esc_attr( get_the_title() ); ?>"
               width="400" height="300"
               loading="lazy" decoding="async">
          <span class="vote-status-badge vote-status-active">Active</span>
        </div>
        <div class="vote-card-body">
          <div class="vote-creator">
            <div class="vote-creator-avatar"><?php echo get_avatar( get_the_author_meta('ID'), 32 ); ?></div>
            <div class="vote-creator-info">
              <div class="vote-creator-name"><?php the_author(); ?></div>
              <div class="vote-creator-label">Creator</div>
            </div>
          </div>
          <h3 class="vote-title"><?php the_title(); ?></h3>
          <p class="vote-desc"><?php echo wp_trim_words( get_the_excerpt(), 20 ); ?></p>
          <div class="vote-progress">
            <div class="vote-progress-bar" role="progressbar"
                 aria-valuenow="<?php echo $progress; ?>"
                 aria-valuemin="0" aria-valuemax="100">
              <div class="vote-progress-fill" style="width:<?php echo $progress; ?>%"></div>
            </div>
            <div class="vote-progress-stats">
              <span class="vote-count"><?php echo aidiy_format_number( $votes ); ?> votes</span>
              <span class="vote-goal">Goal: <?php echo aidiy_format_number( $goal ); ?></span>
            </div>
          </div>
          <div class="vote-card-footer">
            <a href="<?php the_permalink(); ?>" class="btn btn-primary" style="flex:1; justify-content:center;">
              🗳️ Vote Now
            </a>
            <a href="<?php the_permalink(); ?>" class="btn btn-ghost">Details</a>
          </div>
        </div>
      </article>
      <?php
          endwhile;
          wp_reset_postdata();
      else :
          $sample_votes = [
              [ 'title' => 'Smart LED Terrarium Kit', 'desc' => 'A self-contained ecosystem with programmable LED lighting and automatic watering. Perfect for plant lovers and tech enthusiasts.', 'votes' => 1847, 'goal' => 2500, 'status' => 'trending' ],
              [ 'title' => 'Modular Macramé System',  'desc' => 'Interchangeable macramé panels that let you create infinite wall art combinations. Includes 20 base patterns.', 'votes' => 1203, 'goal' => 2000, 'status' => 'active' ],
              [ 'title' => 'AI Embroidery Plotter',   'desc' => 'Upload any image and our AI converts it to an embroidery pattern. Comes with starter thread kit and hoop.', 'votes' => 2156, 'goal' => 2500, 'status' => 'trending' ],
          ];
          foreach ( $sample_votes as $i => $project ) :
              $progress = round( ( $project['votes'] / $project['goal'] ) * 100 );
      ?>
      <article class="vote-card animate-on-scroll" style="animation-delay:<?php echo $i * 0.1; ?>s">
        <div class="vote-card-image">
          <img src="<?php echo esc_url( aidiy_placeholder( 400, 300, $project['title'] ) ); ?>"
               alt="<?php echo esc_attr( $project['title'] ); ?>"
               width="400" height="300"
               loading="lazy" decoding="async">
          <span class="vote-status-badge <?php echo $project['status'] === 'trending' ? 'vote-status-trending' : 'vote-status-active'; ?>">
            <?php echo $project['status'] === 'trending' ? '🔥 Trending' : '✅ Active'; ?>
          </span>
        </div>
        <div class="vote-card-body">
          <div class="vote-creator">
            <div class="vote-creator-avatar" style="background:var(--gradient-primary);"></div>
            <div class="vote-creator-info">
              <div class="vote-creator-name">maker_<?php echo $i + 1; ?></div>
              <div class="vote-creator-label">Creator</div>
            </div>
          </div>
          <h3 class="vote-title"><?php echo esc_html( $project['title'] ); ?></h3>
          <p class="vote-desc"><?php echo esc_html( $project['desc'] ); ?></p>
          <div class="vote-progress">
            <div class="vote-progress-bar" role="progressbar"
                 aria-valuenow="<?php echo $progress; ?>"
                 aria-valuemin="0" aria-valuemax="100">
              <div class="vote-progress-fill" style="width:<?php echo $progress; ?>%"></div>
            </div>
            <div class="vote-progress-stats">
              <span class="vote-count"><?php echo aidiy_format_number( $project['votes'] ); ?> votes</span>
              <span class="vote-goal">Goal: <?php echo aidiy_format_number( $project['goal'] ); ?></span>
            </div>
          </div>
          <div class="vote-card-footer">
            <button class="btn btn-primary" style="flex:1; justify-content:center;" aria-label="Vote for <?php echo esc_attr( $project['title'] ); ?>">
              🗳️ Vote Now
            </button>
            <button class="btn btn-ghost" aria-label="View details of <?php echo esc_attr( $project['title'] ); ?>">Details</button>
          </div>
        </div>
      </article>
      <?php endforeach;
      endif; ?>
    </div><!-- .vote-grid -->

  </div>
</section><!-- .vote-section -->


<!-- ============================================================
     SELLER / BRAND CTA BANNER
     ============================================================ -->
<section class="seller-cta section" aria-labelledby="seller-cta-title">
  <div class="container">
    <div class="seller-cta-inner">

      <div class="seller-cta-content animate-on-scroll">
        <div class="seller-cta-eyebrow">
          <span>🏪</span>
          <span>For Brands & Sellers</span>
        </div>
        <h2 class="seller-cta-title" id="seller-cta-title">
          Reach 500K+ passionate<br>
          <span style="color:var(--color-accent)">DIY makers</span> worldwide
        </h2>
        <p class="seller-cta-desc">
          Join our marketplace and put your products in front of the most engaged creative community on the internet. Zero listing fees for the first 3 months.
        </p>
        <div class="seller-cta-benefits">
          <div class="seller-benefit">
            <div class="seller-benefit-icon" aria-hidden="true">✓</div>
            <span>Zero commission on first $1,000 in sales</span>
          </div>
          <div class="seller-benefit">
            <div class="seller-benefit-icon" aria-hidden="true">✓</div>
            <span>Dedicated seller dashboard with real-time analytics</span>
          </div>
          <div class="seller-benefit">
            <div class="seller-benefit-icon" aria-hidden="true">✓</div>
            <span>Featured placement in creator kits and tutorials</span>
          </div>
          <div class="seller-benefit">
            <div class="seller-benefit-icon" aria-hidden="true">✓</div>
            <span>Access to community voting data for product development</span>
          </div>
        </div>
        <div class="flex gap-md" style="flex-wrap:wrap;">
          <a href="<?php echo esc_url( home_url( '/become-a-seller' ) ); ?>"
             class="btn btn-accent btn-lg"
             aria-label="Apply to become a seller on AiDIY Market">
            Apply to Sell →
          </a>
          <a href="<?php echo esc_url( home_url( '/seller-info' ) ); ?>"
             class="btn btn-outline btn-lg"
             aria-label="Learn more about selling on AiDIY Market">
            Learn More
          </a>
        </div>
      </div>

      <!-- Seller Stats Visual -->
      <div class="animate-on-scroll delay-2" style="display:flex; flex-direction:column; gap:var(--space-md); min-width:280px;">
        <?php
        $seller_stats = [
            [ 'icon' => '📦', 'number' => '10K+', 'label' => 'Products Listed' ],
            [ 'icon' => '💰', 'number' => '$2M+', 'label' => 'Seller Revenue' ],
            [ 'icon' => '⭐', 'number' => '4.9/5', 'label' => 'Avg. Seller Rating' ],
            [ 'icon' => '🚀', 'number' => '48h',   'label' => 'Avg. Approval Time' ],
        ];
        foreach ( $seller_stats as $stat ) : ?>
        <div class="card-glass" style="padding:var(--space-md) var(--space-lg); display:flex; align-items:center; gap:var(--space-md);">
          <span style="font-size:1.75rem;" aria-hidden="true"><?php echo $stat['icon']; ?></span>
          <div>
            <div style="font-size:1.5rem; font-weight:800; color:#fff; font-family:var(--font-heading);"><?php echo esc_html( $stat['number'] ); ?></div>
            <div style="font-size:0.8125rem; color:rgba(255,255,255,0.55);"><?php echo esc_html( $stat['label'] ); ?></div>
          </div>
        </div>
        <?php endforeach; ?>
      </div>

    </div>
  </div>
</section><!-- .seller-cta -->

<?php else : ?>

<!-- ============================================================
     DEFAULT BLOG/ARCHIVE LOOP
     ============================================================ -->
<main class="site-main section" id="main" role="main">
  <div class="container">
    <?php if ( have_posts() ) : ?>
      <div class="masonry-grid">
        <?php while ( have_posts() ) : the_post(); ?>
          <?php get_template_part( 'template-parts/content', get_post_format() ); ?>
        <?php endwhile; ?>
      </div>
      <?php the_posts_navigation(); ?>
    <?php else : ?>
      <?php get_template_part( 'template-parts/content', 'none' ); ?>
    <?php endif; ?>
  </div>
</main>

<?php endif; ?>

<?php get_footer(); ?>
