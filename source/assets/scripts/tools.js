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
	each: function(obj, fn) {
		return [].forEach.call(obj, fn);
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
	}
};

window.u = u;
