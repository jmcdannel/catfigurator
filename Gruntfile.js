module.exports = function(grunt) {

  "use strict";
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    handlebars: {
      compile: {
        options: {
          namespace: 'app.templates',
          processName: function(filePath) {
            return filePath.replace(/^www\/templates\//, '').replace(/\.hbs$/, '');
          }
        },
        files: {
          'www/js/app/compiled-templates.js': ['www/templates/*.hbs']
        }
      }
    },

    express: {
        all: {
            options: {
                bases: ['./www/'],
                port: 8080,
                hostname: '0.0.0.0',
                livereload: true
            }
        }
    },

    open: {
      all: {
        path: 'http://localhost:8080/index.dev.html'
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: "www/js/app",
          mainConfigFile: "www/js/app.js",
          out: "www/js/app.min.js",
          name : "../app"
        }
      }
    },

    cssmin: {
        build: {
            src: 'www/css/styles-<%= pkg.version %>.css',
            dest: 'www/css/styles-<%= pkg.version %>.min.css'
        }
    },

    sass: {
        build: {
            files: {
                'www/css/styles-<%= pkg.version %>.css': 'www/sass/styles.scss'
            }
        }
    },

    watch: {
      css: {
          files: ['www/sass/**/*.scss'],
          tasks: ['sass'],
          options: {
            livereload: true,
          }
      },
      html: {
        files: ['www/templates/*.hbs'],
        tasks: ['handlebars'],
        options: {
          livereload: true,
        }
      }
    },

    copy: {
      main: {
        src: 'www/index.template.html',
        dest: 'www/index.dev.html',
        options: {
            process: function(content, path) {
                return grunt.template.process(content);
            }
        }
      }
    }

  });

  grunt.registerTask('default', ['dev']);
  grunt.registerTask('dev', ['handlebars', 'sass', 'copy', 'express', 'open', 'watch']);
  grunt.registerTask('build', ['handlebars', 'sass', 'cssmin', 'requirejs']);

};
