/**
 * 将phpjs函数转换为node.js模块，每个函数输出到一个独立的模块文件
 */

var fs = require("fs"),
  path = require("path"),
  phpjs = require("phpjs"),

  phpjsDir = require.resolve("phpjs").replace(/[^/\\]*$/, ""),
  phpjsBuildFile = phpjsDir + "build" + path.sep + "npm.js",
  phpjsFnDir = phpjsDir + "functions" + path.sep,

  moduleDir = path.dirname(__dirname) + path.sep,
  moduleName = path.basename(moduleDir),

  defaultFSMode = 500, //parseInt("764", 8)
  charset = "utf-8";

function isPHPJS(fnName) {
  return phpjs.hasOwnProperty(fnName) && typeof phpjs[fnName] == "function";
}

function listPHPJS() {
  if (listPHPJS.list) {
    return listPHPJS.list;
  }

  var list = listPHPJS.list = {}, count = 0;

  fs.readdirSync(phpjsFnDir).forEach(function(dir){
    var _dir = phpjsFnDir + dir;

    if (fs.statSync(_dir).isDirectory()) {
      fs.readdirSync(_dir).forEach(function(file){
        if (file.substr(-3).toLowerCase() === '.js') {
          var fnName = file.substring(0, file.length - 3);
          list[fnName] = _dir + path.sep + file;
          count ++;
        }
      });
    }
  });

  listPHPJS.count = count;

  return list;
}

function getDependenciesParser(regParse, matchOffset){
  var regS = /\\\\/g;

  // 从模块源码分析依赖关系
  return function(code) {
    var ret = [], cache = {};

    code.replace(regS, "")
      .replace(regParse, function() {
        var name = arguments[matchOffset];

        if ( ! name || cache[name]) {
          return
        }

        cache[name] = true;
        ret.push(name);
      });

    return ret
  }
}

var phpjsDeps = getDependenciesParser(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*(?:this|that)|(?:^|[^$])\b(?:this|that)\s*\.\s*([a-zA-Z_$][\w$]*)/g, 1);

function getPHPJS(fnName, callback) {
  var list = listPHPJS(),
    file = list[fnName];

  if (!file) {
    return callback(new Error("Function file not found."));
  }

  fs.readFile(file, charset, function(err, code){
    if (err) {
      return callback(err)
    }

    var deps = [];

    phpjsDeps(code).forEach(function(fn){
      if (isPHPJS(fn) && list[fn] && fn !== fnName) {
        deps.push(fn);
      }
    });

    callback(null, fnName, moduleCode(fnName, code, deps));
  });
}

function moduleCode(fnName, code, deps) {
  var d = "";
  deps.length && deps.forEach(function(fn){
    d += "exports." + fn + "=require(\"./"+fn+"\");\n";
  });
//  d && console.log(fnName);
  return d + "module.exports=function(){ return "+fnName+".apply(exports,arguments) };\n\n" + code;
}

function exportTo(target, callback){
  if (!target || typeof target !== "string") {
    return callback(new Error("Target directory undefined."));
  }

  target += path.sep;

  var markFile = target + moduleName + ".md";

  if (fs.existsSync(target)) {
    if (!fs.existsSync(markFile)) {
      return callback(new Error("Target exists: \""+target+"\". Do nothing."));
    }
  } else {
    try {
      fs.mkdirSync(target, defaultFSMode);
    } catch(e) {
      return callback(new Error("Make directory error: \""+target+"\"."));
    }
  }

  var list = listPHPJS(), count = listPHPJS.count;

  function end(){
    if (--count === 0) {
      //fs.readFile(phpjsBuildFile, function(err, code){
      //  fs.writeFile(markFile, code || "", callback);
      //});
	  fs.writeFile(markFile, "Exported @" + phpjs.date('Y-m-d H:i:s'), callback);
    }
  }

  for (var fn in list) {
    getPHPJS(fn, function(err, fnName, code){
      if (err) {
        end()
      } else {
        fs.writeFile(target + fnName + ".js", code, charset, function(err){
          end()
        })
      }
    })
  }
}

exports.to = exportTo;

if (module.parent === null) {
  if (process.argv[2]) {
    var dir = path.resolve(process.cwd(), process.argv[2]);
   
    exportTo(dir, function(err){
      if (err) {
        console.error(err.message || err);
      } else {
        console.log("Export to \""+dir+"\" complete.");
      }
    });
  } else {
    console.log('Usage:\n\n  node ' + __filename + ' targetDirPath');
  }
}