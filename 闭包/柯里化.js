function generateName(prefix) {
  return function (type) {
    return function (itemName) {
      return prefix + type + itemName;
    };
  };
}

// 生成dou prefix的专属函数
var salesName = generateName("dou");
// 记住prefix 生成商品类
var salesBabyName = salesName("母婴");
// 填写商品
var itemName = salesBabyName("轮椅");
console.log(itemName); //dou母婴轮椅
var itemName1 = salesBabyName("吃的");
console.log(itemName1); //dou母婴吃的
