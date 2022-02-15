setTimeout(() => {
  console.log(1);
  Promise.resolve(3).then((data) => console.log(data));
});
setTimeout(() => {
  console.log(2);
});
