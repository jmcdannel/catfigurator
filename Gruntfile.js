module.exports = function(grunt) {

  "use strict";
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['build'],

    handlebars: {
      compile: {
        options: {
          namespace: 'app.templates',
          processName: function(filePath) {
            return filePath.replace(/^src\/templates\//, '').replace(/\.hbs$/, '');
          }
        },
        files: {
          'build/js/templates/compiled-templates.js': ['src/templates/*.hbs']
        }
      }
    },

    express: {
        all: {
            options: {
                bases: ['./build/'],
                port: 8080,
                hostname: '0.0.0.0',
                livereload: true
            }
        }
    },

    open: {
      all: {
        path: 'http://localhost:8080/index.html'
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: "src/js/app",
          mainConfigFile: "src/js/app.js",
          out: "build/js/app.min.js",
          name : "../app"
        }
      }
    },

    cssmin: {
        build: {
            src: 'src/css/styles-<%= pkg.version %>.css',
            dest: 'build/css/styles-<%= pkg.version %>.min.css'
        }
    },

    sass: {
        build: {
            options: {
              require: "sass-json-vars"
            },
            files: {
                'build/css/styles-<%= pkg.version %>.css': 'src/sass/styles.scss'
            }
        }
    },

    watch: {
      css: {
          files: ['src/sass/**/*.scss'],
          tasks: ['sass'],
          options: {
            livereload: true,
          }
      },
      html: {
        files: ['src/templates/*.hbs'],
        tasks: ['handlebars'],
        options: {
          livereload: true,
        }
      },
      js: {
        files: ['src/js/app/**/*.js', 'src/js/app.js'],
        tasks: ['copy:javascript'],
        options: {
          livereload: true,
        }
      }
    },

    copy: {
      index: {
        src: 'src/index.template.html',
        dest: 'build/index.html',
        options: {
          process: function(content, path) {
            return grunt.template.process(content);
          }
        }
      },
      resources: {
        files: [
          { expand: true, cwd: 'src/', src: 'data/**',   dest: 'build/' },
          { expand: true, cwd: 'src/', src: 'js/lib/**',   dest: 'build/' },
          { expand: true, cwd: 'src/', src: 'images/**',   dest: 'build/' },
          { expand: true, cwd: 'src/', src: '.htaccess',   dest: 'build/' }
        ]
      },
      javascript: {
        files: [
          { expand: true, cwd: 'src/', src: 'js/app.js',   dest: 'build/' },
          { expand: true, cwd: 'src/', src: 'js/app/**',   dest: 'build/' }
        ]
      }
    },

    /*
    includes: {
      files: {
        src: ["src/*.html"],
        dest: "build",
        flatten: true,
        cwd: '.',
        options: {
          silent: true
        }
      }
    }
    */

  });

  grunt.registerTask('default', ['dev']);
  grunt.registerTask('dev', [
    'clean',
    'handlebars',
    'sass',
    'copy:index',
    'copy:resources',
    'copy:javascript',
    'express',
    'open',
    'watch'
  ]);
  grunt.registerTask('build', ['clean', 'handlebars', 'sass', 'cssmin', 'requirejs']);

};
