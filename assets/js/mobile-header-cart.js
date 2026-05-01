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
        
        // Insert as the first item in the logo icons area for top-left placement
        logoSubIcons.insertBefore(cartClone, logoSubIcons.firstChild);
        
        // Hide original cart
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
