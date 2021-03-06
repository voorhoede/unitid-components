module.exports = function (grunt) {
    'use strict';
    grunt.registerTask(
        'develop-server',
        'Setup web dir for development and watch source',
        function (mode) {

            var tasks = [
                'copy:development',
                'compile-html:development',
                'compile-previews:development',
                'compile-index:development',
                'sass:developmentServer',
                'concat:development',
                'karma:singlerun'
            ];

            if(mode !== 'no-watch'){
                tasks.push('watch');
            }

            grunt.task.run(tasks);
        }
    );
};
