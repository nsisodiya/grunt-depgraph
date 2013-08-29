# grunt-depgraph

> Generate module to module dependancy graph and resolve dependancy at build time



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-depgraph --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-depgraph');
```




## Watch task
_Run this task with the `grunt depgraph` command._


### Settings

#### files
Type: `Array`

This defines what file patterns this task will watch. It will be an array of files.

#### dotFile
Type: `String`

imtermediate generated dot file.

#### outputFilePath
Type: `String`

path of the output file.

#### outputFilesExt
Type: `Array`

typeof output files. Example png, pdf


Example:
```js
depgraph:{
	options:{
		files : ['src/js/modules/a.js',
				'src/js/modules/b.js',
				'src/js/modules/c.js']
		dotFile: "build/depGraph.dot",
		outputFilePath: "build/depGraph",
		outputFilesExt: ["png","pdf"],
	}
},
```

```js
//src/js/modules/a.js
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

```


```js
//src/js/modules/b.js
define({
	"fileName" : "AddModule",
	"dependsOn" : ["MyLib"],
	"layer" : "Module Layer"
}).content(function(Lib){
	console.log("2 + 3 = " + Lib.add(2,3));
});

```

```js
//src/js/modules/c.js
define({
	"fileName" : "SubModule",
	"dependsOn" : ["MyLib"],
	"layer" : "Module Layer"
}).content(function(Lib){
	console.log("2 - 3 = " + Lib.sub(2,3));
});

```

When you run ```grunt depgraph```, this will generate this image
<img src="http://www.team-bhp.com/forum/attachments/shifting-gears/1033178d1356977973-official-non-auto-image-thread-_mg_0143.jpg">
 
### Run the demo

```bash
sudo apt-get install graphviz
git clone https://github.com/nsisodiya/grunt-depgraph.git
cd grunt-depgraph/demo
grunt depgraph

```
This will generate "depGraph.png" 
### FAQs

#### What is the purpose of depgraph?
as you can see the example, this will generate depgraph!
images your codebase has 1000 javascript files, you do not want to load all 1000 files, you only want to load 5 modules to your homepage and these 5 modules has some dependancy, then you can use this tool to generate a list of files which will be needed to load homepage



## Release History

 * 2013-08-29   v0.0.1   Intial base version.
