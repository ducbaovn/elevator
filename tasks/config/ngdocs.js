module.exports = function(grunt) {
  grunt.config.set('ngdocs', {
    options: {
      dest: 'assets/docs',
      title: 'Elevator App Docs',
      script: [
        'angular.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'dist/templates.js',
        'scripts/app.js',
        'scripts/directive.js',
        'scripts/service.js'
      ],
      html5Mode: false
    },
    all: ['assets/app/components/**/*.js']
  });
  grunt.loadNpmTasks('grunt-ngdocs');
};