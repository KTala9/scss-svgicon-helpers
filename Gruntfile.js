'use strict';

module.exports = function(grunt) {

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-sass');

	// Project configuration.
	grunt.initConfig({
		watch: {
			scss: {
				files: './icon-helpers.scss',
				tasks: ['default']
			}
		},
		sass: {
			options: {
				sourceMap: false,
				sourceMapContents: false
			},
			dist: {
				files: {
					'./.temp/icon-helpers.css': './icon-helpers.scss'
				}
			}
		},
		postcss: {
			options: {
				map: false,
				failOnError: true,
				processors: [
					// https://www.npmjs.com/package/postcss-svgicon
					require('postcss-svgicon')({
						path: './svgs'
					}),
					// Optimize the SVGs in the css
					require('postcss-svgo')({
						encode: true
					})
				]
			},
			dist: {
				expand: true,
				cwd: './.temp',
				src: ['*.css'],
				dest: './.temp'
			}
		}
	});

	// Default task.
	grunt.registerTask('default', ['sass', 'postcss']);
};
