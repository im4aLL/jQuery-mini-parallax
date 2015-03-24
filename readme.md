# jQuery mini parallax (less than 3 KB)
##### A lightweight jQuery plugin to add parallax effect

### Usage:
```javascript
$('.selector').miniParallax();

// or 

$('.selector').miniParallax({
    speed: 0.3
});
```

### Using bower?
```
bower install mini-parallax --save-dev
```

### Options:
```javascript
speed: 0.5
```

##### speed
###### default: 0.5
1 means parallax element will scroll in the same speed of browser scroll
0.5 means element will scroll 50% slower than browser scroll

#### How to use

```html
<div class="parallax">Suppose it has background image and we want to add parallax effect on it.</div>
```

So JS will be - 
```javascript
$('.parallax').miniParallax();
```

Another way is - 

```html
<section class="selector" data-parallax-item=".parallax">
    <figure><img class="parallax" src="images/2.jpg" alt=""></figure>
</section>
```

Now when `selector` section will come in view-port, then image will have parallax behavior. Now js will look like - 

```javascript
$('.selector').miniParallax();
```

You may notice data attribute `data-parallax-item` and it's value `.parallax` that means parallax behavior will be add to `.parallax` item when the viewport is `.selector` 


#### Check out the demo here - 
[http://habibhadi.com/lab/mini-parallax/](http://habibhadi.com/lab/mini-parallax/)
