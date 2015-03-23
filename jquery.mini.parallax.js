/*!
 * jQuery mini parallax
 * @author: me@habibhadi.com
 * @version v1.0.0
 */

;(function ( $, window, document, undefined ) {
    var pluginName = 'miniParallax';
    var ticking = false;
    var win = $(window);

    var defaults = {
            inset : 1
        };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

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

        requestAnimFrame(_this.parallax);
        // _this.parallax();
        $(window).scroll(function() {
            // console.log('ticking ' + ticking);
            if (!ticking) {
                requestAnimFrame(_this.parallax);
                //_this.parallax();
                ticking = true;
            }
        });
    };

    Plugin.prototype.parallax = function () {
        var _this = this;
        var parallaxSection = _this.element;

        var a = _this.test();

        if (a) {

            var speed = 0.5;
            var wTop = $(window).scrollTop();
            var wHeight = $(window).height();
            var amount = 0;
            var eHeight = 0;

            // amount  = - (wTop * speed);
            // amount  = - (eHeight - wTop) * speed;
            // amount  = - ((wTop + $(window).height()) - $(parallaxSection).offset().top) * speed;

            eHeight = $(parallaxSection).height();

            var parallaxItem = $(parallaxSection).data('parallax-item');
            if (typeof parallaxItem !== undefined && parallaxItem !== null) {
                amount = -(($(parallaxSection).height() + $(parallaxSection).offset().top) - (wHeight + wTop)) * speed;
                $(parallaxItem).css('transform', 'translateY(' + amount + 'px)');
            } else {
                // for background parallax
                // amount  = - (eHeight - wTop) * speed;
            }
        }

        ticking = false;
    };

    Plugin.prototype.test = function(){
        return true;
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