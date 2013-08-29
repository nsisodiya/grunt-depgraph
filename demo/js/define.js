var define = (function(){
	var lib = {};
	//window.Lib = lib;
	var define = function(FileObj){
		return {
			content : function(callback){
				//console.log("Registering " + FileObj.fileName);
//						console.log(lib);
				var depList = FileObj.dependsOn;
				if(typeof callback === "function"){
					var depListResolve = [];
					for(var i=0; i< depList.length; i++){
						if(lib[depList[i]] === undefined){
							//TODO throw Error
							console.error("Unable to resolve dependancy : " + depList[i] + " for fileName :" + FileObj.fileName);
							depListResolve.push(undefined);
						}else{
							depListResolve.push(lib[depList[i]].content);
						}
						
						//depListResolve.push(i);
					}
					lib[FileObj.fileName] = {
						depList : depList,
						content : callback.apply(this,depListResolve)
					};
				}else{
					//Throw Error #TODO
				}
			}
		};
	};
	return define;
})();
