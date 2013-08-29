module.exports = function(grunt) {
	grunt.initConfig({
		depgraph:{
			
			options:{
				files : [
					"js/a.js",
					"js/b.js",
					"js/c.js"				
				],
				dotFile: "depGraph.dot",
				outputFilePath: "depGraph",
				outputFilesExt: ["png","pdf"],
			}
		}
	});
	grunt.loadTasks('../tasks');//Written By Narendra Sisodiya
	// Default task(s).
	grunt.registerTask('default', ['depgraph']);
};
