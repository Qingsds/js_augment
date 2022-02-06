var theThing = null;
var replaceThing = function () {
  var originalThing = theThing;
  var unused = function () {
    if (originalThing) {
      console.log("qingsds");
    }
  };
  theThing = {
    longStr: new Array(10000).join("*"),
    someMethod: function () {
      console.log("dou");
    },
  };
};
setInterval(replaceThing, 1000);

const myDiv = document.getElementById("myDiv");
function handleMyDiv() {
  // 一些myDiv的逻辑
}
// 使用myDiv
handleMyDiv();
// 尝试删除myDiv
document.body.removeChild(document.getElementById("myDiv"));
