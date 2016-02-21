var LuaVMSource;
var LuaVM;

onmessage = function(event) {
  var data = event.data;
  var action = data.action;
  if (action == "init") {
    console.log(action);
    LuaVMSource = data.source;

    eval(LuaVMSource);
    LuaVM = this;

    loadLuaScripts();
  }
};

function loadLuaScripts() {
  try {
    var l = new LuaVM.Lua.State();
  } catch (e) {
    console.log(e.toString());
  } finally {}

  l.execute('print("321")');
  console.log("ok");
  postMessage();

  close();
}
