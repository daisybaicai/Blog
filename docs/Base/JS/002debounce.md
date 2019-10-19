<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-18 11:28:10
 * @LastEditTime: 2019-09-18 11:36:24
 * @LastEditors: Please set LastEditors
 -->
# 防抖和节流

## 防抖
  最后一个上公车的人
```javascript
function debounce(fn) {
  let timeout = null;
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout( ()=> {
      fn.apply(this, arguments);
    }, 500)
  }
}
```

## 节流
  打开水龙头
```javascript
function throttle(fn) {
  let canRun = true;
  return function () {
    if(!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    })
  }
}
```
