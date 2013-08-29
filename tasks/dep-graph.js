'use strict';
module.exports = function (grunt) {
	grunt.registerTask('depgraph', "Generate Dependancy Graph and Generate dependancy List", function() {

		var moduleMap = {};
		var layerMap = {};
		var options = this.options({
			
		});
		
		//console.log(options);
		
		options.files.map(function(v,i){
			var FileName = v;
			grunt.verbose.writeln("using File : "+FileName);
			var a = grunt.file.read(FileName);
			var M = a.match(/define\(\{[ ,\n,\t,\/,\.,a-z,A-Z,0-9,\",\',\:,\[,\],-]*\}\)*/g);
			//console.log(M);
			if(M !== null){
				for(var gp in M){
					var F = M[gp]
					.match(/\{[ ,\n,\t,\/,\.,a-z,A-Z,0-9,\",\',\:,\[,\],-]*\}*/g)[0];
					var m = JSON.parse(F);
					if(m.fileSrc === undefined){
						m.fileSrc = FileName ;
					}
				
				
					if(m.layer !== "" && m.layer !== undefined ){
						if(layerMap[m.layer] === undefined){
							layerMap[m.layer] = [];
						}
						layerMap[m.layer].push(m.fileName);
					}
					moduleMap[m.fileName] = m;
				}
			}
		});
		function ResolveDepList(moduleName){
			var fileList = [];
			//resolve Deplist first 
		
			if(moduleMap[moduleName] === undefined){
				console.log("Unable to find module == " + moduleName);
				return undefined;
			}
			for (var i=0; i< moduleMap[moduleName].dependsOn.length;i++){
				ResolveDepList(moduleMap[moduleName].dependsOn[i]).map(function(v){
					fileList.push(v);
				});	
			}
			fileList.push(moduleMap[moduleName].fileSrc);
			return fileList;
		}
		//TODO - Sort this array
	
	
		function GenerateDotFile(){
			var str = "";
			var p=0;
			for(var j in layerMap){
				str = str + '\tsubgraph cluster_'+p+' {\n\t\tlabel="'+j+'";\n\t\t' + 
						layerMap[j].join(";") + ";\n\t}\n";
				p=p+1;
			}
			str = str + "\n\n";
			for(var i in moduleMap){
				for(var j in moduleMap[i].dependsOn){
					str = str + "	" + moduleMap[i].dependsOn[j] + " -> " + i + " ;\n";
				}
			}
			str = "digraph {\n	rankdir=RL;\n"+str+"\n}";
			console.log("Writing " + options.dotFile);
			grunt.file.write(options.dotFile, str + '\n');
		}
		function GenerateOutFiles(){
			var exec = require('child_process').exec;
			
			options.outputFilesExt.map(function(v,i){
				var ext = v;
				grunt.verbose.writeln("Craeating file with format : "+ext);
				var cmd = "dot -T" + ext + " " + options.dotFile + " -o " + options.outputFilePath + "." + ext;
				var cp = exec(cmd, "", function (err, stdout, stderr) {
					//
				});
				cp.stdout.pipe(process.stdout);
				cp.stderr.pipe(process.stderr);
				console.log("\n\n=====\nFile " + options.outputFilePath + "." + ext + " Generated");
			});
			
			
			
		
		}
	
		//console.log(layerMap);
		//console.log(ResolveDepList("RouterModule"));
		GenerateDotFile();
		GenerateOutFiles();
	

	});

}
