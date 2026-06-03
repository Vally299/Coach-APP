/* ============================================
   LOADER — Page intro animation
   ============================================ */

(function () {
  "use strict";

  function init() {
    const loader = document.getElementById("loader");
    if (!loader) return;

    const minDuration = 1400;
    const start = Date.now();

    function hide() {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, minDuration - elapsed);
      setTimeout(() => {
        loader.classList.add("is-out");
        document.body.classList.add("is-ready");
        document.body.classList.remove("is-loading");
        // Dispatch event for other modules
        window.dispatchEvent(new Event("domino:loaded"));
      }, wait);
    }

    // Wait for window load OR fallback
    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
      // Safety fallback
      setTimeout(hide, 3000);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
