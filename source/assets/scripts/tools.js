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
