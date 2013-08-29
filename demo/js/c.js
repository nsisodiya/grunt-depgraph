define({
	"fileName" : "SubModule",
	"dependsOn" : ["MyLib"],
	"layer" : "Module Layer"
}).content(function(Lib){
	document.write("<p>2 - 3 = " + Lib.sub(2,3)+"</p>");
});
