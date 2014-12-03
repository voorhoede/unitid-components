var Slider = (function() {

	var defaults = {
		sliderSelector: '[data-slider]',
		sliderOptions: {
			auto: 3000
		}
	};

	function Slider(elements, options) {
		config = u.extend(defaults, options || {});

		function init() {
			u.each(elements, function(element) {
				initSwipe(element, config);
				attachHandlers(element);
			});
		}

		function initSwipe(element, config) {
			if (typeof Swipe === 'function' && Swipe) {
				element.swipe = new Swipe(element.querySelector(config.sliderSelector), config.sliderOptions);
			}
		}

		function attachHandlers(element) {
      u.listen(element.querySelector('.prev'), 'click', function(event) {
				event.preventDefault();
				moveAlong(element.swipe, 'prev');
			});
      u.listen(element.querySelector('.next'), 'click', function(event) {
				event.preventDefault();
				moveAlong(element.swipe, 'next');
			});
		}

		function moveAlong(swipeObj, action) {
			swipeObj[action]();
		}

		init();
	}

	return Slider;
}());

(function(window) {
	window.slider = new Slider(u.qsa('[data-component=uc-slider]'), { sliderOptions: { auto: 0 } });
})(window);
