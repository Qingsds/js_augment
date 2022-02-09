function CutePromise(executor) {
  // value 记录异步任务成功的执行结果
  this.value = null;
  // reason 记录任务失败的原因
  this.reason = null;
  // status 记录当前的状态, 初始化是pending
  this.status = "pending";

  // 缓存两个队列,维护resolved和rejected 各自对应的处理函数
  this.onResolvedQueue = [];
  this.onRejectedQueue = [];

  // 把this 存下来
  var self = this;

  // 定义resolve函数
  function resolve(value) {
    // 如果不是pending的状态, 直接返回
    if (self.status !== "pending") {
      return;
    }
    // 异步任务成功 把结果赋值给value
    self.value = value;
    // 切换状态为resolve;
    self.status = "resolved";

    // 批量执行resolved 队列里的任务
    self.onResolvedQueue.forEach((resolved) => resolved(self.value));
  }

  // 定义reject函数
  function reject(reason) {
    // 如果不是pending的状态, 直接返回
    if (self.status !== "pending") {
      return;
    }
    // 异步任务失败, 原因赋值给reason
    self.reason = reason;
    // 切换状态为reject
    self.status = "rejected";

    self.onRejectedQueue.forEach((rejected) => rejected(self.reason));
  }

  // 把 resolve 和 reject 赋予执行器
  executor(resolve, reject);
}

// then 接受两个入参,可选
CutePromise.prototype.then = function (onResolved, onRejected) {
  // 注意，onResolved 和 onRejected必须是函数；如果不是，我们此处用一个透传来兜底
  if (typeof onResolved !== "function") {
    onResolved = function (x) {
      return x;
    };
  }
  if (typeof onRejected !== "function") {
    onRejected = function (e) {
      throw e;
    };
  }

  // 保存this
  let self = this;
  // 这个变量用来存返回值x
  let x;

  // resolve 状态的处理函数
  function resolveByStatus(resolve, reject) {
    // 包装称异步任务 确保决议程序在then后执行
    setTimeout(function () {
      try {
        // 返回值赋给x
        x = onResolved(self.value);
        // 进入决议程序
        resolutionProcedure(promise2, x, resolve, reject);
      } catch (e) {
        // 如果onResolved或者onRejected抛出异常error，则promise2必须被rejected，用error做reason
        reject(e);
      }
    });
  }

  // reject 状态处理函数
  function rejectByStatus(resolve, reject) {
    setTimeout(function () {
      try {
        // 返回值赋给x
        x = onRejected(self.reason);
        // 进入决议程序
        resolutionProcedure(promise2, x, resolve, reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  var promise2 = new CutePromise(function (resolve, reject) {
    // 判断状态,分配对应处理函数
    if (self.status === "resolved") {
      resolveByStatus(resolve, reject);
    } else if (self.status === "rejected") {
      rejectByStatus(resolve, reject);
    } else if (self.status === "pending") {
      self.onResolvedQueue.push(function () {
        resolveByStatus(resolve, reject);
      });
      self.onRejectedQueue.push(function () {
        rejectByStatus(resolve, reject);
      });
    }
  });
  return promise2;
};

/**
 *
 * @param {*} promise2
 * @param {*} x
 * @param {*} resolve
 * @param {*} reject
 * @returns
 */
function resolutionProcedure(promise2, x, resolve, reject) {
  // 这里的 hasCalled 标识 ,是为了确保 resolve, reject 不被重复执行
  let hasCalled;
  if (x === promise2) {
    // 决议程序规范: 如果resolve结果和 promise2相同则reject 为了避免死循环
    return reject(new TypeError("为避免死循环,此处抛错"));
  } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
    // 决议程序规范:如果x是对象或函数 需要额外处理
    try {
      // 首先看看有没有then方法
      let then = x.then;
      if (typeof then === "function") {
        // 如果then是一个函数, 那么用x为this来调用它 第一个参数为 resolvePromise，第二个参数为rejectPromise
        then.call(
          x,
          (y) => {
            // 如果已经被resolve/reject过了 那么直接return
            if (hasCalled) return;
            hasCalled = true;
            // 进入决议程序 递归自身
            resolutionProcedure(promise2, y, resolve, reject);
          },
          (err) => {
            // 这里 hasCalled 用法和上面意思一样
            if (hasCalled) return;
            hasCalled = true;
            reject(err);
          }
        );
      } else {
        // 如果then不是function 用x为参数执行promise
        resolve(x);
      }
    } catch (error) {
      if (hasCalled) return;
      hasCalled = true;
      reject(e);
    }
  } else {
    // 如果x不是一个object或者function，用x为参数执行promise
    resolve(x);
  }
}
