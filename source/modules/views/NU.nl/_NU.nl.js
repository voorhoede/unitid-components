var InView = (function(document) {
	'use strict';

	var hasClassList = 'classList' in document.documentElement;

	function InView(elements) {

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
				el.classList.add('inview');
			} else {
				el.className += ' inview';
			}
		}
	}

	return InView;
}(document));

(function(window) {
	window.inView = new InView(u.qsa('.numbers > li, .bullets > li'));
})(window);
