/**
 * Toolbox for common JS tools
 * Mostly borrowed from Underscore (http://underscorejs.org/docs/underscore.html)
 */
var u = {
	clone: function(obj) {
		if (!this.isObject(obj)) {
			return obj;
		}
		return this.isArray(obj) ? obj.slice() : this.extend(obj);
	},
  /**
   * Source: https://github.com/voorhoede/airhooks/blob/master/airhooks/forEach.js
   */
	each: function(obj, fn) {
    var nativeForEach = Array.prototype.forEach;
    if (nativeForEach && obj.foreach === nativeForEach) {
      [].forEach.call(obj, fn);
    } else {
      for (var i = 0, length = obj.length; i < length; i++) {
        fn.call(this, obj[i], i, obj);
      }
    }
	},
	extend: function(obj) {
		var i = 1,
			numArgs = arguments.length,
			source,
			property;

		if (typeof obj !== "object") {
			return obj;
		}

		for (i; i < numArgs; i++) {
			source = arguments[i];
			for (property in source) {
				if (source.hasOwnProperty(property)) {
					obj[property] = source[property];
				}
			}
		}

		return obj;
	},
	/**
	 * Wait for timer until debounced function fires
	 * Source: http://remysharp.com/2010/07/21/throttling-function-calls
	 */
	debounce: function(fn, delay) {
		var timer = null;
		return function () {
			var context = this,
				args = arguments;
			clearTimeout(timer);
			timer = setTimeout(function() {
				fn.apply(context, args);
			}, delay);
		};
	},
	/**
	 * Fire function every <delay>ms and discard function calls
	 *   that happen while the delay is active
	 * Source: http://remysharp.com/2010/07/21/throttling-function-calls
	 */
	throttle: function(fn, delay, scope) {
		delay || (delay = 250);
		var last,
			deferTimer;
		return function () {
			var context = scope || this;
			var now = +new Date,
				args = arguments;
			if (last && now < last + delay) {
				clearTimeout(deferTimer);
				deferTimer = setTimeout(function () {
					last = now;
					fn.apply(context, args);
				}, delay);
			} else {
				last = now;
				fn.apply(context, args);
			}
		};
	},
	isArray: function(obj) {
		return toString.call(obj) === "[object Array]";
	},
	isObject: function(obj) {
		var type = typeof obj;
		return type === 'function' || type === 'object' && !!obj;
	},
	qsa: function(selector) {
		return document.querySelectorAll(selector)
	},
  listen: function(el, type, fn) {
    if (el.addEventListener) {
      el.addEventListener(type, fn, false);
    } else {
      el.attachEvent("on" + type, fn);
    }
  }
};

window.u = u;


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
