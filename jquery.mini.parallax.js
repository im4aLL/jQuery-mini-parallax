/*!
 * jQuery mini parallax
 * @author: me@habibhadi.com
 * @version v1.0.0
 */

;(function ( $, window, document, undefined ) {
    var pluginName = 'miniParallax';
    var win = $(window);

    var defaults = {
            inset : 1,
            speed : 0.5
        };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.__ = {
            initial : {}
        };

        this.ticking = false;
        this.fetchedTransformValue = false;
        this.fetchedBackgroundValue = false;

        this.init();
    }

    Plugin.prototype.init = function () {
        window.requestAnimFrame = (function(){
            return  window.requestAnimationFrame       ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame    ||
                    function( callback ){
                        window.setTimeout(callback, 1000 / 60);
                    };
        })();


        var _this = this;

        requestAnimFrame(function(){
            _this.parallax();
        });

        $(window).scroll(function() {
            if (!_this.ticking) {
                requestAnimFrame(function(){
                    _this.parallax();
                });

                _this.ticking = true;
            }
        });
    };

    Plugin.prototype.getTransformValue = function(parallaxItem){
        var _this = this;
        var getTransform = $(parallaxItem).css('transform');
        
        if(getTransform !== 'none') {
            getTransform = getTransform.match(/(-?[0-9\.]+)/g);
            _this.__.initial.tY = parseInt(getTransform[5], 10);
        }
        else {
            _this.__.initial.tY = 0;
        }

        _this.fetchedTransformValue = true;
    };

    Plugin.prototype.getBpValue = function(){
        var _this = this;
        var backgroundPos = $(_this.element).css('backgroundPosition').split(" ");
        var xPos = backgroundPos[0];
        var yPos = backgroundPos[1];

        if(yPos.indexOf('%') !== -1) {
            yPos = parseFloat(yPos.substr(0, (yPos.length - 1))).toFixed(2);
            yPos = ($(_this.element).outerHeight() / 100) * yPos;
        }
        else {
            yPos = parseFloat(yPos.replace(/[^0-9.]/g, '')).toFixed(2);
        }

        _this.__.initial.bpX = xPos;
        _this.__.initial.bpY = yPos;

        _this.fetchedBackgroundValue = true;
    };

    Plugin.prototype.parallax = function () {
        var _this = this;
        var parallaxSection = _this.element;

        if (_this.inViewport()) {

            var speed = _this.options.speed;
            var wTop = $(window).scrollTop();
            var wHeight = $(window).height();
            var amount = 0;
            var eHeight = 0;

            // amount  = - (wTop * speed);
            // amount  = - (eHeight - wTop) * speed;
            // amount  = - ((wTop + $(window).height()) - $(parallaxSection).offset().top) * speed;

            eHeight = $(parallaxSection).height();

            var parallaxItem = $(parallaxSection).data('parallax-item');
            if (typeof parallaxItem !== 'undefined' && parallaxItem !== null) {
                amount = -(($(parallaxSection).height() + $(parallaxSection).offset().top) - (wHeight + wTop)) * speed;
                
                if(!_this.fetchedTransformValue) {
                    _this.getTransformValue(parallaxItem);
                }
                amount -= _this.__.initial.tY;

                $(parallaxItem).css('transform', 'translateY(' + amount + 'px)');
            } else {
                amount  = - (eHeight - wTop) * speed;

                if(!_this.fetchedBackgroundValue) {
                    _this.getBpValue();
                }
                amount -= _this.__.initial.bpY;

                $(parallaxSection).css('background-position', _this.__.initial.bpX + ' ' + amount + 'px');
            }
        }

        _this.ticking = false;
    };

    Plugin.prototype.inViewport = function(){
        var _this = this;

        var targetElem = $(_this.element);
        var inset = _this.options.inset < 1 ? _this.options.inset * targetElem.height() : 0;

        var viewport = {
            top: win.scrollTop(),
            left: win.scrollLeft()
        };

        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height() - inset;

        var bounds = targetElem.offset();
        bounds.right = bounds.left + targetElem.outerWidth();
        bounds.bottom = bounds.top + targetElem.outerHeight();

        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );
