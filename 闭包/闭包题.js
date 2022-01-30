// for(var i = 0; i< 5 ;i++){
//   setTimeout(function(){
//     console.log(i);
//   },1000);
// }
// console.log(i);
/* for(var i = 0; i< 5;i++){
  setTimeout(function(j){
    console.log(j);
  },1000,i)
} */
/* function output(j){
  setTimeout(function(){
    console.log(j);
  },1000)
}

for(var i = 0; i< 5;i++){
  output(i)
} */
/* 
for (var i = 0; i < 5; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j);
    }, 1000);
  })(i);
} */
/* 
function bibao1() {
  var num = [];
  var i;
  for (i = 0; i < 10; i++) {
    num[i] = function () {
      console.log(i);
    };
  }
  return num[9];
}
bibao1()(); 
*/

/* var bibao2 = (function(){
  var num = 0;
  return () => {
    return num++
  }
}())

for(var i = 0; i < 10; i++){
 console.log(bibao2());
}
console.log(bibao2()); */

/* var a = 1;
function test(){
  a = 2; //函数内的变量也会提升 此时为 var a = 2; 
  return function(){
    console.log(a);
  }
  var a  = 3; 
}
test()(); */

function foo(a, b) {
  console.log(b);
  return {
    foo: function (c) {
      return foo(c, a);
    },
  };
}
var func1 = foo(0);
func1.foo(1);
func1.foo(2);
func1.foo(3);
var func2 = foo(0).foo(1).foo(2).foo(3);
var func3 = foo(0).foo(1);
func3.foo(2);
func3.foo(3);
