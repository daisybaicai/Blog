<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-18 10:30:09
 * @LastEditTime: 2019-09-18 10:34:19
 * @LastEditors: Please set LastEditors
 -->
# opacity: 0、visibility: hidden、display: none 比较

## opacity: 0
  DOM: 存在，占空间，透明度100%，不显示
  性能： 动态改变引发重绘
  点击： 不可点击

## visibility: hidden
  DOM: 存在，占空间，透明度100%，不显示
  性能： 动态改变引发重绘
  点击： 不可点击

## display: none
  DOM: 不存在，不占空间
  性能： 动态改变引发重排
  点击： 不可点击