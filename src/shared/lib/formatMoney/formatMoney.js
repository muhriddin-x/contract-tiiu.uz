export const formatMoney = function (money = 0) {
  let str = (money + "").split("");
  for (let i = str.length - 3; i > 0; i) {
    str.splice(i, 0, " ");
    i = i - 3;
  }
  return str.join("");
};
