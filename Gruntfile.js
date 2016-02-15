module.exports = function(grunt) {
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
    }
  });

  /* 
   * Load all the grunt plugins
   */
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Register Tasks
  // Default task(s).
  grunt.registerTask('default', ['copy']);
};
