module.exports = function(grunt) {

  // Initializes the Grunt tasks with the following settings
  grunt.initConfig({
    // Project configuration.
    // Files to be concatenated … (source and destination files)
    concat: {
      css: {
        src: ['public/css/normalize.css', 'public/css/foundation.css', 'public/css/interzonas.css', 'public/css/media.css'],
        dest: 'public/css/screen.css'
      }
    },
    cssmin: {
        dist:{
          src:['<%= concat.css.dest  %>'],
          dest: 'public/css/screen.min.css'
        }
    },
    uglify: {
      dist: {
          src: ['public/js/app.js'],
          dest: 'public/js/app.min.js'
      }
    }
  });

  // Load the plugins that provide the tasks we specified in package.json.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // This is the default task being executed if Grunt
  // is called without any further parameter.
  grunt.registerTask('default', ['concat', 'cssmin', 'uglify']);

};

