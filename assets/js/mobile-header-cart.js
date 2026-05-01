/**
 * Mobile Header: Move cart icon next to alien icon on mobile devices
 * This script repositions the cart icon from the language switch to the logo icons area
 */

function repositionCartIconOnMobile() {
  const mediaQuery = window.matchMedia('(max-width: 1023px)');
  
  function handleMediaChange(e) {
    const cartLink = document.querySelector('.header-cart-link');
    const logoSubIcons = document.querySelector('.logo-sub-icons');
    const alienContainer = document.querySelector('.alien-dropdown-container');
    
    if (!cartLink || !logoSubIcons || !alienContainer) return;
    
    if (e.matches || mediaQuery.matches) {
      // Mobile: Move cart to logo icons area (top-left placement)
      const existingCart = logoSubIcons.querySelector('.header-cart-link.mobile-positioned');
      
      if (!existingCart) {
        // Clone the cart link for mobile positioning
        const cartClone = cartLink.cloneNode(true);
        cartClone.classList.add('mobile-positioned', 'mobile-cart-icon');
        cartClone.style.display = 'flex';
        cartClone.style.alignItems = 'center';
        cartClone.style.justifyContent = 'center';
        cartClone.style.marginLeft = '0';

        // Prefer inserting directly to the left of the Alba logo image
        const headerLogoIcon = logoSubIcons.querySelector('.header-logo-icon');
        if (headerLogoIcon) {
          // Adjust cloned cart image to match logo image dimensions when possible
          const logoImg = headerLogoIcon.querySelector('img');
          const cartImg = cartClone.querySelector('img');
          if (logoImg && cartImg) {
            const w = logoImg.getAttribute('width') || logoImg.width || 32;
            const h = logoImg.getAttribute('height') || logoImg.height || 32;
            cartImg.setAttribute('width', w);
            cartImg.setAttribute('height', h);
            cartImg.style.width = (w || 32) + 'px';
            cartImg.style.height = (h || 32) + 'px';
          }

          logoSubIcons.insertBefore(cartClone, headerLogoIcon);
        } else {
          // Fallback: insert as first child
          logoSubIcons.insertBefore(cartClone, logoSubIcons.firstChild);
        }

        // Hide original cart (on the right)
        cartLink.style.display = 'none';
      }
    } else {
      // Desktop: Remove mobile cart clone and show original
      const mobileCart = logoSubIcons.querySelector('.header-cart-link.mobile-positioned');
      if (mobileCart) {
        mobileCart.remove();
      }
      cartLink.style.display = '';
    }
  }
  
  // Initial check
  handleMediaChange(mediaQuery);
  
  // Listen for media query changes
  mediaQuery.addEventListener('change', handleMediaChange);
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', repositionCartIconOnMobile);
} else {
  repositionCartIconOnMobile();
}
