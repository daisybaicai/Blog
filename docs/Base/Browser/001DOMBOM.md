<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-11 14:37:29
 * @LastEditTime: 2019-09-11 14:49:50
 * @LastEditors: Please set LastEditors
 -->
# BOM与DOM的区别与联系

## BOM（Browser Object Model）  

BOM 即**浏览器对象模型**，BOM没有相关标准，BOM的最核心对象是window对象。  


## DOM（Document Object Model）  

> 文档对象模型 (DOM) 是HTML和XML文档的编程接口。它提供了对文档的结构化的表述，并定义了一种方式可以使从程序中对该结构进行访问，从而改变文档的结构，样式和内容。DOM 将文档解析为一个由节点和对象（包含属性和方法的对象）组成的结构集合。简言之，它会将web页面和脚本或程序语言连接起来。  --MDN

DOM即**文档对象模型**，DOM是W3C标准，DOM的最根本对象是document（window.document），这个对象实际上是window对象的属性，这个对象的独特之处是这个是唯一一个既属于BOM又属于DOM的对象。



**参考：**  
- <https://www.jianshu.com/p/86acc95f1eb8> 
- <https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Introduction> 
