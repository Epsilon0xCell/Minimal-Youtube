// ==UserScript==
// @name         Minimal YouTube (local)
// @namespace    https://github.com/Epsilon0xCell/Minimal-Youtube
// @version      1.0.0
// @description  Hides YouTube clutter in the browser: the watch-page sidebar and recommendations, comments, Shorts shelves and Shorts nav entry, and end-screen cards. The video and its own controls stay untouched.
// @match        https://www.youtube.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  var css = [
    /* Watch page: related videos sidebar */
    '#secondary, #related { display: none !important; }',
    /* Watch page: comments */
    'ytd-comments, #comments { display: none !important; }',
    /* Shorts: shelves on home and search, nav entry, shorts in results */
    'ytd-reel-shelf-renderer, ytd-rich-shelf-renderer[is-shorts],',
    'ytd-guide-entry-renderer a[href^="/shorts"],',
    'ytd-mini-guide-entry-renderer a[href^="/shorts"],',
    'ytd-video-renderer a[href^="/shorts"],',
    'ytd-grid-video-renderer a[href^="/shorts"] { display: none !important; }',
    /* End-screen cards and annotations over the player */
    '.ytp-ce-element, .ytp-cards-teaser, .annotation { display: none !important; }',
    /* Let the watch page use the width the sidebar gave up */
    'ytd-watch-flexy[flexy] #primary { max-width: none !important; }'
  ].join('\n');

  function inject() {
    if (document.getElementById('minimal-youtube-style')) return;
    var style = document.createElement('style');
    style.id = 'minimal-youtube-style';
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

  inject();
  /* YouTube is a single-page app; re-check after each in-app navigation. */
  window.addEventListener('yt-navigate-finish', inject);
  new MutationObserver(inject).observe(document.documentElement, { childList: true });
})();
