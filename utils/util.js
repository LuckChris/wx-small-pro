
// 问候语
const getGreetings = () => {
  let h = new Date().getHours()
  let w = ''
  if (h > 0 && h <= 5) {
    w = '深夜'
  } else if (h > 5 && h <= 9) {
    w = '早上'
  } else if (h > 9 && h <= 11) {
    w = '上午'
  } else if (h > 11 && h <= 13) {
    w = '中午'
  } else if (h > 13 && h <= 15) {
    w = '下午'
  } else if (h > 15 && h <= 17) {
    w = '傍晚'
  } else {
    w = '晚上'
  }
  return `${w}好`

}
const delEmptyObj = (obj) => {
  for (let i in obj) {
    let val = obj[i]
    if (typeof val === 'object' && Array.isArray(val)) {
      if (val.length === 0) {
        delete obj[i];
      }
      continue
    }
  }
}
module.exports = {
  getGreetings,
  delEmptyObj
}