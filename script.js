(function () {
  const mql = window.matchMedia('(max-width: 1024px)');

  const header = document.querySelector('header');
  const nav = header.querySelector('nav');
  const cta = header.querySelector('.secondary-cta-btn');

  // Create a placeholder so we can put CTA back exactly where it was
  const ctaPlaceholder = document.createComment('cta-original-position');
  cta.parentNode.insertBefore(ctaPlaceholder, cta.nextSibling);

  // Create the hamburger button (no HTML changes needed)
  const btn = document.createElement('button');
  btn.className = 'nav-toggle';
  btn.setAttribute('aria-label', 'Menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';

  // Insert the button right before the nav
  header.querySelector('.main-navigation').insertBefore(btn, nav);

  let ctaMoved = false;

  function applyLayout(e) {
    const isMobile = mql.matches;

    // Move CTA into nav on mobile; move it back on desktop
    if (isMobile && !ctaMoved) {
      nav.appendChild(cta);
      ctaMoved = true;
    } else if (!isMobile && ctaMoved) {
      // Return CTA to its original position
      ctaPlaceholder.parentNode.insertBefore(cta, ctaPlaceholder);
      ctaMoved = false;
      // Also make sure nav is closed on desktop
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }

    // Show/hide the toggle button based on breakpoint (CSS also handles this)
    btn.style.display = isMobile ? '' : 'none';
  }

  function closeOnEscape(ev) {
    if (ev.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }
  }

  // Toggle handler
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
  });

  // Close on ESC
  document.addEventListener('keydown', closeOnEscape);

  // React to breakpoint changes and on load
  mql.addEventListener ? mql.addEventListener('change', applyLayout)
                       : mql.addListener(applyLayout); // older Safari
  applyLayout();
})();
