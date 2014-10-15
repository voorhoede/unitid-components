/**
 * App object
 */
var UnitidApp = (function() {
	"use strict";

	var defaults = {},
		uApp = {
			components: []
		};

	uApp.init = function(options) {
		console.log(options);
		u.each(uApp.components, function(component) {
			uApp[component].init(options);
		});
	}

	uApp.addComponent = function(name) {
		this.components.push(name);
	}

	return uApp;
}());

window.onload = function() {
	UnitidApp.init();
}