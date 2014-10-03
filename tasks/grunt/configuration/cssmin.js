/**
 * Grunt configuration for cssmin task
 */
function getConfiguration(grunt) {
    'use strict';
    return {
		distribution: {
		    options: {
			    banner: '/* unitid-components */'
		    },
		    files: {
			    'distribution/assets/style/main.css': ['distribution/assets/style/*.css']
		    }
	    }
    };
}

module.exports = getConfiguration;