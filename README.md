# remjs
set rem in H5
## 变化

1. 修正了某些机型，rem设置字体与最终计算字体差距过大的问题；
2. 修正ios返回时，设置rem函数未正确触发的问题。
## 问题描述

1. ios微信下在包含remjs的页面跳出后并点击微信自带返回按钮后，由于返回的是上一个页面的快照，导致js不执行。此时需要监听`pageshow`事件，触发rem设置；
> 据我观察，在返回后的瞬间，`document.documentElement` 获取的值，将会是正常（我所认知的正常）乘以dpr的数值，导致设置rem的值变大。这里我采用的方案是 `setTimeout` ，延时后就能拿到正常值。
2. rem字体大小设置异常：  
> 具体原因是有手机系统字体的大小、使用了艺术字等非正常字体以及webview/内核的特殊性。

看下面机型rem测试数据：  
![image](https://img.yzcdn.cn/upload_files/2020/06/29/FvRQBqChTUOZA3H-9NZ5FLVBBj5s.jpg)  
计算出来的字体大小是39.6px，差距很大，有的机型甚至能达到2倍数的差距。  
再看看调整后的数据：
![iamge](https://img.yzcdn.cn/upload_files/2020/06/29/FjLpJk0-HTn3aQzZ5p2YTyUIA4TI.jpg)
