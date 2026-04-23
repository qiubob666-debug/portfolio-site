/**
 * AiDIY Market — Main JavaScript
 *
 * Performance-optimized interactions:
 * - Scroll-triggered animations (Intersection Observer)
 * - Sticky header with scroll detection
 * - Mobile navigation toggle
 * - Search overlay
 * - Category filter with AJAX
 * - Load more posts
 * - Masonry layout
 * - Micro-interactions
 *
 * @package AiDIY_Market
 * @version 1.0.0
 */

(function() {
  'use strict';

  // ============================================================
  // UTILITY FUNCTIONS
  // ============================================================

  /**
   * Debounce function for performance
   */
  function debounce(fn, delay) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  /**
   * Throttle function for scroll events
   */
  function throttle(fn, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Safe querySelector with null check
   */
  function qs(selector, parent = document) {
    return parent.querySelector(selector);
  }

  function qsa(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
  }


  // ============================================================
  // STICKY HEADER
  // ============================================================

  const header = qs('#site-header');

  if (header) {
    const handleScroll = throttle(() => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run on init
  }


  // ============================================================
  // MOBILE NAVIGATION
  // ============================================================

  const navToggle = qs('#nav-toggle');
  const navMenu   = qs('#nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen.toString());
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');

      // Animate hamburger to X
      const spans = navToggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }

      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
        document.body.style.overflow = '';
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(s => s.style.transform = s.style.opacity = '');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
        document.body.style.overflow = '';
      }
    });
  }


  // ============================================================
  // SEARCH OVERLAY
  // ============================================================

  const searchToggle  = qs('#search-toggle');
  const searchOverlay = qs('#search-overlay');
  const searchClose   = qs('#search-close');
  const searchInput   = qs('#search-input');

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.add('active');
    searchOverlay.setAttribute('aria-hidden', 'false');
    searchToggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput?.focus(), 100);
  }

  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('active');
    searchOverlay.setAttribute('aria-hidden', 'true');
    searchToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    searchToggle?.focus();
  }

  searchToggle?.addEventListener('click', openSearch);
  searchClose?.addEventListener('click', closeSearch);

  searchOverlay?.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay?.classList.contains('active')) {
      closeSearch();
    }
    // Cmd/Ctrl + K to open search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });


  // ============================================================
  // SCROLL-TRIGGERED ANIMATIONS (Intersection Observer)
  // ============================================================

  const animateElements = qsa('.animate-on-scroll');

  if (animateElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Animate once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    });

    animateElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all elements immediately
    animateElements.forEach(el => el.classList.add('is-visible'));
  }


  // ============================================================
  // CATEGORY FILTER
  // ============================================================

  const categoryPills = qsa('.category-pill');
  const masonryFeed   = qs('#masonry-feed');

  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Update active state
      categoryPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-pressed', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-pressed', 'true');

      const category = pill.dataset.category;

      // AJAX filter if aidiyData is available
      if (typeof aidiyData !== 'undefined' && masonryFeed) {
        filterByCategory(category);
      }
    });
  });

  function filterByCategory(category) {
    if (!masonryFeed) return;

    // Show loading state
    masonryFeed.style.opacity = '0.5';
    masonryFeed.style.pointerEvents = 'none';

    const formData = new FormData();
    formData.append('action', 'aidiy_load_more');
    formData.append('nonce', aidiyData.nonce);
    formData.append('page', '1');
    formData.append('category', category);

    fetch(aidiyData.ajaxUrl, {
      method: 'POST',
      body: formData,
    })
    .then(r => r.json())
    .then(data => {
      if (data.success && data.data.posts) {
        renderPosts(data.data.posts, true);

        // Update load more button
        const loadMoreBtn = qs('#load-more-btn');
        if (loadMoreBtn) {
          loadMoreBtn.dataset.page = '2';
          loadMoreBtn.dataset.category = category;
          loadMoreBtn.style.display = data.data.hasMore ? '' : 'none';
        }
      }
    })
    .catch(err => console.warn('Filter error:', err))
    .finally(() => {
      masonryFeed.style.opacity = '';
      masonryFeed.style.pointerEvents = '';
    });
  }


  // ============================================================
  // LOAD MORE POSTS
  // ============================================================

  const loadMoreBtn = qs('#load-more-btn');

  if (loadMoreBtn && typeof aidiyData !== 'undefined') {
    loadMoreBtn.addEventListener('click', () => {
      const page     = parseInt(loadMoreBtn.dataset.page) || 2;
      const category = loadMoreBtn.dataset.category || '';

      // Loading state
      loadMoreBtn.disabled = true;
      loadMoreBtn.innerHTML = '<span>Loading...</span>';

      const formData = new FormData();
      formData.append('action', 'aidiy_load_more');
      formData.append('nonce', aidiyData.nonce);
      formData.append('page', page);
      formData.append('category', category);

      fetch(aidiyData.ajaxUrl, {
        method: 'POST',
        body: formData,
      })
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          renderPosts(data.data.posts, false);
          loadMoreBtn.dataset.page = page + 1;

          if (!data.data.hasMore) {
            loadMoreBtn.style.display = 'none';
          } else {
            loadMoreBtn.disabled = false;
            loadMoreBtn.innerHTML = '<span>Load More Creations</span><span aria-hidden="true">↓</span>';
          }
        }
      })
      .catch(err => {
        console.warn('Load more error:', err);
        loadMoreBtn.disabled = false;
        loadMoreBtn.innerHTML = '<span>Load More Creations</span><span>↓</span>';
      });
    });
  }

  function renderPosts(posts, replace = false) {
    if (!masonryFeed || !posts) return;

    const html = posts.map(post => `
      <article class="masonry-item animate-on-scroll is-visible">
        <a href="${post.permalink}" aria-label="View ${post.title}">
          <img src="${post.thumbnail || ''}"
               alt="${post.title}"
               loading="lazy" decoding="async">
          <div class="masonry-overlay">
            <div class="masonry-overlay-content">
              <div class="masonry-creator">
                <div class="masonry-avatar" aria-hidden="true"></div>
                <span class="masonry-creator-name">${post.author}</span>
              </div>
              <h3 class="masonry-title">${post.title}</h3>
            </div>
          </div>
        </a>
      </article>
    `).join('');

    if (replace) {
      masonryFeed.innerHTML = html;
    } else {
      masonryFeed.insertAdjacentHTML('beforeend', html);
    }
  }


  // ============================================================
  // VOTE BUTTON INTERACTIONS
  // ============================================================

  qsa('.vote-card-footer .btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Optimistic UI update
      const card       = this.closest('.vote-card');
      const progressFill = card?.querySelector('.vote-progress-fill');
      const voteCount  = card?.querySelector('.vote-count');

      if (progressFill && voteCount) {
        const currentWidth = parseFloat(progressFill.style.width) || 0;
        const newWidth = Math.min(100, currentWidth + 0.5);
        progressFill.style.width = newWidth + '%';

        // Update count display
        const currentText = voteCount.textContent;
        const num = parseInt(currentText.replace(/[^0-9]/g, '')) || 0;
        voteCount.textContent = formatNumber(num + 1) + ' votes';
      }

      // Visual feedback
      this.innerHTML = '✅ Voted!';
      this.style.background = 'linear-gradient(135deg, #10B981, #059669)';
      this.disabled = true;
    });
  });


  // ============================================================
  // WISHLIST BUTTON INTERACTIONS
  // ============================================================

  qsa('.product-wishlist').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const isWished = this.classList.toggle('wished');
      this.textContent = isWished ? '♥' : '♡';
      this.style.color = isWished ? 'var(--color-primary)' : '';

      // Animate
      this.style.transform = 'scale(1.4)';
      setTimeout(() => this.style.transform = '', 200);
    });
  });


  // ============================================================
  // ADD TO CART MICRO-INTERACTION
  // ============================================================

  qsa('.product-add-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Skip if it's a link (WooCommerce)
      if (this.tagName === 'A') return;

      e.preventDefault();

      // Pulse animation
      this.style.transform = 'scale(1.3)';
      this.textContent = '✓';
      this.style.background = 'linear-gradient(135deg, #10B981, #059669)';

      setTimeout(() => {
        this.style.transform = '';
        this.textContent = '+';
        this.style.background = '';
      }, 1500);
    });
  });


  // ============================================================
  // HERO MASONRY STAGGER ANIMATION
  // ============================================================

  const heroMasonryItems = qsa('.hero-masonry-item');
  heroMasonryItems.forEach((item, i) => {
    item.style.animationDelay = (i * 0.08) + 's';
    item.style.animation = `fadeInUp 0.5s ease ${i * 0.08}s both`;
  });


  // ============================================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================================

  qsa('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').slice(1);
      const target   = document.getElementById(targetId);

      if (target) {
        e.preventDefault();
        const navHeight = header ? header.offsetHeight : 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth',
        });
      }
    });
  });


  // ============================================================
  // LAZY IMAGE LOADING ENHANCEMENT
  // ============================================================

  if ('IntersectionObserver' in window) {
    const lazyImages = qsa('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px',
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }


  // ============================================================
  // PROGRESS BAR ANIMATION ON SCROLL
  // ============================================================

  const progressBars = qsa('.vote-progress-fill');

  if (progressBars.length > 0 && 'IntersectionObserver' in window) {
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, 100);
          progressObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => progressObserver.observe(bar));
  }


  // ============================================================
  // COUNTER ANIMATION FOR STATS
  // ============================================================

  function animateCounter(el, target, duration = 2000) {
    const start     = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      const current  = Math.floor(start + (target - start) * eased);

      el.textContent = formatNumber(current) + (target >= 1000 ? '+' : '');

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  const statNumbers = qsa('.stat-number[data-count]');

  if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.dataset.count);
          animateCounter(el, target);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
  }


  // ============================================================
  // HELPER: Format numbers
  // ============================================================

  function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000)    return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  }


  // ============================================================
  // CATEGORIES HORIZONTAL SCROLL (drag to scroll)
  // ============================================================

  const categoriesTrack = qs('.categories-track');

  if (categoriesTrack) {
    let isDown   = false;
    let startX;
    let scrollLeft;

    categoriesTrack.addEventListener('mousedown', (e) => {
      isDown = true;
      categoriesTrack.style.cursor = 'grabbing';
      startX     = e.pageX - categoriesTrack.offsetLeft;
      scrollLeft = categoriesTrack.scrollLeft;
    });

    categoriesTrack.addEventListener('mouseleave', () => {
      isDown = false;
      categoriesTrack.style.cursor = '';
    });

    categoriesTrack.addEventListener('mouseup', () => {
      isDown = false;
      categoriesTrack.style.cursor = '';
    });

    categoriesTrack.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x    = e.pageX - categoriesTrack.offsetLeft;
      const walk = (x - startX) * 2;
      categoriesTrack.scrollLeft = scrollLeft - walk;
    });
  }


  // ============================================================
  // PERFORMANCE: Preload next page on hover
  // ============================================================

  qsa('a[href]').forEach(link => {
    link.addEventListener('mouseenter', debounce(() => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('/') && !href.startsWith('//')) {
        const preload = document.createElement('link');
        preload.rel   = 'prefetch';
        preload.href  = href;
        document.head.appendChild(preload);
      }
    }, 100));
  });


  // ============================================================
  // INIT
  // ============================================================

  document.addEventListener('DOMContentLoaded', () => {
    // Mark JS as loaded
    document.documentElement.classList.add('js-loaded');

    // Initialize any third-party widgets
    console.log('AiDIY Market — Theme loaded ✓');
  });

})();
