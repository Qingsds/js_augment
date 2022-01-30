function showName(str) {
  eval(str);
  console.log(name1);
}
var name1 = "qingsds";
var str = 'var name1 = "dou"';

showName(str); //这里输出dou

var me = {
  name: "qingsds",
  career: "coder",
  hobbies: ["coding,game"],
};
with(me){
  console.log(name);
  console.log(career);
  console.log(hobbies);
}


function changeName(person){
  with(person){
    name = 'qingsds'
  }
}

var you = {
  career:'student'
}

changeName(me);
changeName(you)
console.log(name);//qingsds
