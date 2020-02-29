# 判断是否是回文字符串
```javascript
function isResverse(str) {
    if(typeof str!== 'string') return false;
    return str.split('').reverse().join('') === str;
}
```