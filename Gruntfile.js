/// <binding AfterBuild='default' />
module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        ts: {
            dev: {
                src: ["src/*.ts"],          // The source typescript files, http://gruntjs.com/configuring-tasks#files
                out: 'script/script.js',             // If specified, generate an out.js file which is the merged js file
              /*Task "watch" cause the troubles with compiling in VS*/
              //watch: 'src'                  // If specified, watches this directory for changes, and re-runs the current target
            }
        }
    });
    
    grunt.loadNpmTasks("grunt-ts");
    grunt.registerTask("default", ["ts:dev"]);
};