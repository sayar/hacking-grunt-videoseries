module.exports = function(grunt) {
  // Time various grunt tasks.
  require('time-grunt')(grunt);
  
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

  /* 
   * Load all the grunt plugins
   */
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  
  // Register Tasks
  // Default task(s).
  grunt.registerTask('default', ['clean', 'copy']);
};
