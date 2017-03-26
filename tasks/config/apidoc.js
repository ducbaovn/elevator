module.exports = function(grunt) {
  grunt.config.set('apidoc', {
    myapp: {
      src: 'api/controllers',
      dest: 'assets/apidocs'
    }
  });
  grunt.loadNpmTasks('grunt-apidoc');
};