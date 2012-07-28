/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    clean: ["dist/"],
    lint: {
      files: ['grunt.js', 'app/**/*.js', 'test/**/*.js']
    },
    qunit: {
      files: ['test/**/*.html']
    },
    concat: {
      dist: {
        src: ['assets/js/almond.js','dist/debug/require.js'],
        dest: 'dist/debug/require.js'
      }
    },
    min: {
      dist: {
        src: ['<config:concat.dist.dest>'],
        dest: 'assets/release/require.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {},
    requirejs: {
      compile: {
        options: {
          mainConfigFile: "app/config.js",
          out: "dist/debug/require.js",
          name: "config",
          wrap: false
        }
      }
    },
    less: {
      compile: {
        options: {
          paths: ["assets/less"]
        },
        files: {
          "assets/css/jifasnif.css": "assets/less/jifasnif.less"
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint requirejs concat min');
  grunt.loadNpmTasks('grunt-contrib');

};
