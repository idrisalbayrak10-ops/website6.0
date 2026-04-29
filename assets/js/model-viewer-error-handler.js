/**
 * Model Viewer Error Handler
 * Attaches error handling to model-viewer elements
 */
(function() {
  'use strict';

  // Function to enhance a model-viewer element
  const enhanceViewer = (viewer) => {
    if (!viewer || viewer.__enhanced) return;
    viewer.__enhanced = true;

    // Add error listener
    viewer.addEventListener('error', (event) => {
      console.warn('[model-viewer] Load error:', event);
      // Try to recover by reloading the model after a delay
      setTimeout(() => {
        const src = viewer.getAttribute('src');
        if (src) {
          console.log('[model-viewer] Attempting to recover by reloading...');
          viewer.removeAttribute('src');
          setTimeout(() => viewer.setAttribute('src', src), 100);
        }
      }, 2000);
    }, false);

    // Add load listener
    viewer.addEventListener('load', (event) => {
      console.log('[model-viewer] Model loaded successfully');
    }, false);

    // Add progress listener
    viewer.addEventListener('progress', (event) => {
      if (event.detail && typeof event.detail.totalProgress === 'number') {
        const percent = Math.round(event.detail.totalProgress * 100);
        if (percent === 100) {
          console.log('[model-viewer] Loading complete: 100%');
        }
      }
    }, false);
  };

  // Enhance existing viewers
  const enhanceAllViewers = () => {
    const viewers = document.querySelectorAll('model-viewer');
    viewers.forEach(enhanceViewer);
  };

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceAllViewers, { once: true });
  } else {
    setTimeout(enhanceAllViewers, 100);
  }

  // Also watch for dynamically added viewers
  if (window.MutationObserver) {
    const observer = new MutationObserver((mutations) => {
      let hasNewViewers = false;
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(node => {
            if (node.tagName === 'MODEL-VIEWER') {
              enhanceViewer(node);
              hasNewViewers = true;
            } else if (node.querySelectorAll) {
              node.querySelectorAll('model-viewer').forEach(enhanceViewer);
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  window.__modelViewerEnhanced = true;
  console.log('[model-viewer] Error handler initialized');

})();
