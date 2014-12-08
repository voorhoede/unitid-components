/**
 * Grunt configuration for copy task
 */
function getConfiguration(grunt) {
    'use strict';

    return {
        development: {
            files: [{
                src: 'web/modules/views/_style-guide/_style-guide.html',
                dest: 'web/guide/style-guide.html'
            },
            {
                expand: true,
                cwd: 'source/assets/images/',
                src: ['**'],
                dest: 'web/assets/images/'
            }, {
                expand: true,
                cwd: 'source/vendor/unitid-site/',
                src: ['**'],
                dest: 'web/vendor/unitid-site/'
            }, {
                expand: true,
                cwd: 'source/vendor/',
                src: ['**', '!unitid-site'],
                dest: 'web/guide/vendor/'
            }, {
                expand: true,
                cwd: 'source/modules/',
                src: ['**'],
                dest: 'web/modules/'
            }]
        },
        distribution: {
            files: [{
                expand: true,
                cwd: 'source/',
                src: ['**'],
                dest: 'distribution/'
            }, {
                expand: true,
                cwd: 'source/',
                src: [
                    'vendor/prismjs/**'
                ],
                dest: 'distribution/guide/'
            }]
        },
        guide: {
            files: [{
                expand: true,
                cwd: 'source/',
                src: ['vendor/app-guide-font/**'],
                dest: 'distribution/guide/'
            }, {
                expand: true,
                cwd: 'distribution/assets/style/',
                src: ['guide.css', 'debug.css'],
                dest: 'distribution/guide/'
            }, {
                src: 'distribution/modules/views/_style-guide/_style-guide.html',
                dest: 'distribution/guide/style-guide.html'
            }]
        }
    };
}

module.exports = getConfiguration;
