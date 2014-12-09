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

/**
 * Draggable Background plugin for jQuery
 *
 * v1.2.3
 *
 * Copyright (c) 2014 Kenneth Chung
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
;(function($) {
  var $window = $(window);

  // Helper function to guarantee a value between low and hi unless bool is false
  var limit = function(low, hi, value, bool) {
    if (arguments.length === 3 || bool) {
      if (value < low) return low;
      if (value > hi) return hi;
    }
    return value;
  };

  // Adds clientX and clientY properties to the jQuery's event object from touch
  var modifyEventForTouch = function(e) {
    e.clientX = e.originalEvent.touches[0].clientX;
    e.clientY = e.originalEvent.touches[0].clientY;
  };

  var getBackgroundImageDimensions = function($el) {
    var bgSrc = ($el.css('background-image').match(/^url\(['"]?(.*?)['"]?\)$/i) || [])[1];
    if (!bgSrc) return;

    var imageDimensions = { width: 0, height: 0 },
      image = new Image();

    image.onload = function() {
      if ($el.css('background-size') == "cover") {
        var elementWidth = $el.innerWidth(),
          elementHeight = $el.innerHeight(),
          elementAspectRatio = elementWidth / elementHeight;
        imageAspectRatio = image.width / image.height,
          scale = 1;

        if (imageAspectRatio >= elementAspectRatio) {
          scale = elementHeight / image.height;
        } else {
          scale = elementWidth / image.width;
        }

        imageDimensions.width = image.width * scale;
        imageDimensions.height = image.height * scale;
      } else {
        imageDimensions.width = image.width;
        imageDimensions.height = image.height;
      }
    };

    image.src = bgSrc;

    return imageDimensions;
  };

  function Plugin(element, options) {
    this.element = element;
    this.options = options;
    this.init();
  }

  Plugin.prototype.init = function() {
    var $el = $(this.element),
      bgSrc = ($el.css('background-image').match(/^url\(['"]?(.*?)['"]?\)$/i) || [])[1],
      options = this.options;

    if (!bgSrc) return;

    // Get the image's width and height if bound
    var imageDimensions = { width: 0, height: 0 };
    if (options.bound) {
      imageDimensions = getBackgroundImageDimensions($el);
    }

    $el.on('mousedown.dbg touchstart.dbg', function(e) {
      if (e.target !== $el[0]) {
        return;
      }
      e.preventDefault();

      if (e.originalEvent.touches) {
        modifyEventForTouch(e);
      } else if (e.which !== 1) {
        return;
      }

      var x0 = e.clientX,
        y0 = e.clientY,
        pos = $el.css('background-position').match(/(-?\d+).*?\s(-?\d+)/) || [],
        xPos = parseInt(pos[1]) || 0,
        yPos = parseInt(pos[2]) || 0;

      $window.on('mousemove.dbg touchmove.dbg', function(e) {
        e.preventDefault();

        if (e.originalEvent.touches) {
          modifyEventForTouch(e);
        }

        var x = e.clientX,
          y = e.clientY;

        xPos = options.axis === 'y' ? xPos : limit($el.innerWidth()-imageDimensions.width, 0, xPos+x-x0, options.bound);
        yPos = options.axis === 'x' ? yPos : limit($el.innerHeight()-imageDimensions.height, 0, yPos+y-y0, options.bound);
        x0 = x;
        y0 = y;

        $el.css('background-position', xPos + 'px ' + yPos + 'px');
      });

      $window.one('mouseup.dbg touchend.dbg mouseleave.dbg', function() {
        if (options.done) {
          options.done();
        }

        $window.off('mousemove.dbg touchmove.dbg');
      });
    });
  };

  Plugin.prototype.disable = function() {
    var $el = $(this.element);
    $el.off('mousedown.dbg touchstart.dbg');
    $window.off('mousemove.dbg touchmove.dbg mouseup.dbg touchend.dbg mouseleave.dbg');
  }

  $.fn.backgroundDraggable = function(options) {
    var options = options;
    var args = Array.prototype.slice.call(arguments, 1);

    return this.each(function() {
      var $this = $(this);

      if (typeof options == 'undefined' || typeof options == 'object') {
        options = $.extend({}, $.fn.backgroundDraggable.defaults, options);
        var plugin = new Plugin(this, options);
        $this.data('dbg', plugin);
      } else if (typeof options == 'string' && $this.data('dbg')) {
        var plugin = $this.data('dbg');
        Plugin.prototype[options].apply(plugin, args);
      }
    });
  };

  $.fn.backgroundDraggable.defaults = {
    bound: true,
    axis: undefined
  };
}(jQuery));

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

$(function() {
  $('[data-dragme]').backgroundDraggable();
});
