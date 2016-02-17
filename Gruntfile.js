module.exports = function(grunt) {
  // Time various grunt tasks.
  require('time-grunt')(grunt);
  // Load grunt tasks just-in-time.
  require('jit-grunt')(grunt);

  /* 
   * Project configuration.
   */
  
  // Configurable paths
  var config = {
    app: 'app',
    build: 'build' // release path - final endpoint
  };
  
  grunt.initConfig({
    // Setup basic project metadata
    pkg: grunt.file.readJSON('package.json'),
    
    // Add configuration paths
    config: config,
    
    // Copy Task Configuration
    copy: {
      build: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>',
        dest: '<%= config.build %>',
        src: [
          '{,*/}*.html'
        ]
      }
    },
    // Clean Task Configuration
    clean: ['build'],
    // Wire Dependencies
    wiredep: {
      build: {
        src: [
          '<%= config.app %>/**/*.html',   // .html support...
          '<%= config.app %>/styles/**/*.scss',   // .scss support...
        ]
      }
    },
    // Compile SASS
    sass: {
      options: {
        sourceMap: true
      },
      build: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '<%= config.build %>/styles',
          ext: '.css'
        }]
      }
    },
    // Add PostCSS Grunt task and run autoprefixer & css minifier
    postcss: {
      options: {
        map: true, // continue with sourcemaps
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'}), // autoprefix css 
          require('cssnano')() // minify css
        ]
      },
      build: {
        src: '<%= config.build %>/{,*/}*.css'
      }
    },
    // Add Uglify Grunt task to compress JavaScript.
    uglify: {
      options: {
        sourceMap: true
      },
      build: {
         files: [{
          expand: true,
          cwd: '<%=config.app %>/scripts',
          src: '**/*.js',
          dest: '<%= config.build %>/scripts'
        }]
      }
    }, 
    // Add a HTML minifier
    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: '<%=config.app %>/',
          src: '**/*.html',
          dest: '<%= config.build %>/'
        }]
      }
    },
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep', 'htmlmin']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass', 'postcss']
      }, 
      html: {
        files: ['<%= config.app %>/{,*/}*.html'],
        tasks: ['htmlmin']
      }, 
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['uglify']
      }
    }
  });
  
  // Register Tasks
  // Register build task chain
  grunt.registerTask('build', ['clean', 'wiredep', 'sass', 'postcss', 'uglify', 'htmlmin']);

  // Default task(s).
  grunt.registerTask('default', ['watch']);
};
