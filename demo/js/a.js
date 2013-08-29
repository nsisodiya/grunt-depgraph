define({
	"fileName" : "MyLib",
	"dependsOn" : [],
	"layer" : "Lib Layer"
}).content(function(){
	return {
		add : function(a,b){
			return a+b;
		},
		sub : function(a,b){
			return a-b;
		}
	}
});
