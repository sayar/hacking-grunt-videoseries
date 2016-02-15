module.exports = function(grunt) {
  // Time various grunt tasks.
  require('time-grunt')(grunt);
  // Load grunt tasks just-in-time.
  require('jit-grunt')(grunt);

  /* 
   * Project configuration.
   */
  grunt.initConfig({
    // Setup basic project metadata
    pkg: grunt.file.readJSON('package.json'),
    // Copy Task Configuration
    copy: {
      build: {
        src: ['app/**'],
        dest: 'build/'
      }
    }, 
    // Clean Task Configuration
    clean: ['build']
  });
  
  // Register Tasks
  // Default task(s).
  grunt.registerTask('default', ['clean', 'copy']);
};
