/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Task configuration.
        less: {
            production: {
                options: {
                    modifyVars: {
                        'font-url': '"../fonts/fonttiny"'
                    }
                },
                files: {
                    "dist/css/tiny.css": "src/index.less"
                }
            }
        },
        copy: {
            main: {
                files: [
                  { expand: true, src: ['bower_components/smalot-bootstrap-datetimepicker/css/bootstrap-datetimepicker.css'], dest: 'dist/css/', flatten: true },
                  { expand: true, src: ['src/assets/bootstrap-theme-tiny/bootstrap.css'], dest: 'dist/css/', flatten: true },
                  { expand: true, src: ['src/assets/bootstrap-theme-tiny/bootstrap.js'], dest: 'dist/js/', flatten: true },
                  { expand: true, src: ['src/fonts/*'], dest: 'dist/fonts/', flatten: true },
                  { expand: true, src: ['src/js/*'], dest: 'dist/js/', filter: 'isFile', flatten: true }
                ]
            },
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task.
    grunt.registerTask('default', ['less', 'copy']);

};
