var fs = require('fs');
var Worker = require('webworker-threads').Worker;

var LuaVMSource;
var LuaVM;

var workers = new Array();
var worker1 = new Worker(__dirname + '/testWebWorkerThreads.worker.js');
worker1.onmessage = function(event) {
  console.log("1234");
};
workers.push(worker1);

function loadLuaVM() {
  fs.readFile( __dirname + '/../libluavmjs/lua.vm.js', function (err, data) {
    if (err) {
      console.log(err.toString());
      throw err;
    }
    LuaVMSource = data.toString();

    eval(LuaVMSource);
    LuaVM = Module;

    loadLuaScripts();
  });
}

function loadLuaScripts() {
  var l = new LuaVM.Lua.State();
  l.execute('print("Hello, world")');
  for (worker of workers) {
    worker.postMessage({
      action: "init",
      source: LuaVMSource
    });
  }
}

loadLuaVM();
