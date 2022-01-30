// 利用闭包生成IIFE,返回User类
const User = (function () {
  // 定义私有变量_password
  let _password;
  class User {
    constructor(username, password) {
      // 初始化私有变量_password
      _password = password;
      this.username = username;
    }
    login() {
      // 这里验证console输出账号密码
      console.log(this.username, _password);
    }
  }
  return User;
})();

let user = new User("qingsds", "123456");
console.log(user.username); //qingsds
console.log(user._password); //undefined
console.log(user.password);//undefined
user.login() //qingsds,123456