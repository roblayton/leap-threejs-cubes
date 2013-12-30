module.exports = function(grunt) {
    
    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            src: ['<%= pkg.src_dir %>/assets/js/*.js']
        },
        concat: {
            options: {
                separator: ';'
            },
            //js: {
                //src: '<%= pkg.src_dir %>/assets/js/*.js',
                //dest: '<%= pkg.build_dir %>/assets/js/concat.js'
            //},
            css: {
                src: '<%= pkg.src_dir %>/assets/css/*.css',
                dest: '<%= pkg.build_dir %>/assets/css/concat.css'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '<%= pkg.build_dir %>/assets/js/concat.js',
                dest: '<%= pkg.build_dir %>/assets/js/built.min.js'
            }
        },
        copy: {
            build_required: {
                src: '<%= pkg.src_dir %>/common/libs/require.js',
                dest: '<%= pkg.build_dir %>/common/libs/require.js'
            }
        },
        clean: {
            // If you're minifying concatenated js, clean up after
            clean_concat: {
                src: ['<%= pkg.build_dir %>/assets/js/concat.js']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-exec');

    // Default task(s).
    grunt.registerTask('build', ['jshint', 'concat', 'copy']);
};
