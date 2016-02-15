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
        src: ['<%= config.app %>/**'],
        dest: '<%= config.build %>/'
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
    }
  });
  
  // Register Tasks
  // Default task(s).
  grunt.registerTask('default', ['clean', 'wiredep', 'copy']);
};
