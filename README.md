# css3Animo

---

CSS3动画助手,提供方便的api管理CSS3动画及其回调,spm插件

---

## 使用说明

```javascript
    $('.div').css3Animo(options, callback);
```

###options的可选参数:

####animateClass (string)
CSS动画的类名.

不会写CSS动画?看看<http://daneden.me/animate/>

####originClass (string)
初始类名,options.originClass不是String,则取该元素的data-originClass值,若此值仍不是String,则取该元素的className
另见overwrite解释

####finalClass (string)
最后类名,详细见overwrite解释

####overwrite (boolean)
默认为false
* 若overwrite为true, 则动画结束时该元素类名为`finalClass`
* 若overWrite为false, 则动画结束是该元素类名为`originClass + '' + finalClass`

####namespace (string)
相同namespace下若有动画在进行,则将该namespace下所有动画按定义顺序依次停止(此时为元素类型为之前设定的`finalClass`或`origin + '' + finalClass`),然后执行该次定义的动画.

###callback (function)
回调中第一个参数为动画元素自身


