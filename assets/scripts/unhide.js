var UnHide = (function(document) {
  'use strict';

  var hasClassList = 'classList' in document.documentElement;

  function UnHide(elements) {

    var box;

    window.onscroll = u.throttle(function() {
      u.each(elements, function(el) {
        box = el.getBoundingClientRect();
        if (box.top < document.documentElement.clientHeight - 200) {
          makeActive(el);
        }
      })
    }, 100);

    function makeActive(el) {
      if (hasClassList) {
        el.classList.remove('js-hide');
      } else {
        el.className = el.className.replace(/js\-hide/g, '');
      }
    }
  }

  return UnHide;
}(document));

(function(window) {
  window.UnHide = new UnHide(u.qsa('.js-hide'));
})(window);

