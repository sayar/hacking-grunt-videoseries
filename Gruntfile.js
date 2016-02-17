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
          '{,*/}*.html',
          '{,*/}*.js'
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
    }
  });
  
  // Register Tasks
  // Default task(s).
  grunt.registerTask('default', ['clean', 'wiredep', 'sass', 'postcss', 'copy']);
};
