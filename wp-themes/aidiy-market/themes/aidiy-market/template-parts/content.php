<?php
/**
 * Template part for displaying posts in the feed
 *
 * @package AiDIY_Market
 */
$thumb = get_the_post_thumbnail_url( get_the_ID(), 'aidiy-masonry' );
if ( ! $thumb ) $thumb = aidiy_placeholder( 400, rand(280, 420), get_the_title() );
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'masonry-item' ); ?>>
  <a href="<?php the_permalink(); ?>" aria-label="<?php echo esc_attr( get_the_title() ); ?>">
    <img src="<?php echo esc_url( $thumb ); ?>"
         alt="<?php echo esc_attr( get_the_title() ); ?>"
         loading="lazy" decoding="async">
    <div class="masonry-overlay">
      <div class="masonry-overlay-content">
        <div class="masonry-creator">
          <div class="masonry-avatar" aria-hidden="true">
            <?php echo get_avatar( get_the_author_meta('ID'), 28 ); ?>
          </div>
          <span class="masonry-creator-name"><?php the_author(); ?></span>
        </div>
        <h2 class="masonry-title"><?php the_title(); ?></h2>
        <div class="masonry-actions">
          <span class="masonry-action-btn">
            <span aria-hidden="true">❤️</span>
            <span><?php echo get_post_meta( get_the_ID(), '_like_count', true ) ?: rand(12, 999); ?></span>
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
