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
      // Mobile: Move cart to logo icons area (after alien icon)
      const existingCart = logoSubIcons.querySelector('.header-cart-link.mobile-positioned');
      
      if (!existingCart) {
        // Clone the cart link for mobile positioning
        const cartClone = cartLink.cloneNode(true);
        cartClone.classList.add('mobile-positioned');
        cartClone.style.display = 'flex';
        cartClone.style.alignItems = 'center';
        cartClone.style.justifyContent = 'center';
        cartClone.style.marginLeft = '8px';
        
        // Insert after alien container
        alienContainer.parentNode.insertBefore(cartClone, alienContainer.nextSibling);
        
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
