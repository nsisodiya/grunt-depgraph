define({
	"fileName" : "AddModule",
	"dependsOn" : ["MyLib"],
	"layer" : "Module Layer"
}).content(function(Lib){
	document.write("<p>2 + 3 = " + Lib.add(2,3)+"</p>");
});
