;(function(factory)
{
    if(typeof define === 'function' && define.amd)
    {
        define(['jquery'], factory);
    }
    else if(typeof exports === 'object')
    {
        factory(require('jquery'));
    }
    else
    {
        factory(jQuery);
    }
}
(function($)
{
    var pluginName = "tinycarousel"
    ,   defaults   =
        {
            start:          0      // The starting slide
        ,   axis:           "x"    // vertical or horizontal scroller? ( x || y ).
        ,   buttons:        true   // show left and right navigation buttons.
        ,   bullets:        false  // is there a page number navigation present?
        ,   interval:       false  // move to another block on intervals.
        ,   intervalTime:   3000   // interval time in milliseconds.
        ,   animation:      true   // false is instant, true is animate.
        ,   animationTime:  1000   // how fast must the animation move in ms?
        }
    ;

    function Plugin($container, options)
    {
        this.options   = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name     = pluginName;

        var self      = this
        ,   $viewport = $container.find(".viewport:first")
        ,   $overview = $container.find(".overview:first")
        ,   $slides   = 0
        ,   $next     = $container.find(".next:first")
        ,   $prev     = $container.find(".prev:first")
        ,   $bullets  = $container.find(".bullet")

        ,   viewportSize    = 0
        ,   contentStyle    = {}
        ,   slidesVisible   = 0
        ,   slideSize       = 0

        ,   isHorizontal  = this.options.axis === 'x'
        ,   sizeLabel     = isHorizontal ? "Width" : "Height"
        ,   posiLabel     = isHorizontal ? "left" : "top"
        ,   intervalTimer = null
        ;

        this.slideCurrent = 0;
        this.slidesTotal  = 0;

        function initialize()
        {
            self.update();
            self.move();

            setEvents();

            return self;
        }

        this.update = function()
        {
            $slides          = $overview.children();
            viewportSize     = $viewport[0]["offset" + sizeLabel];
            slideSize        = $slides.first()["outer" + sizeLabel](true);
            self.slidesTotal = $slides.length;
            slideCurrent     = self.options.start || 0;
            slidesVisible    = Math.ceil(viewportSize / slideSize);

            $overview.css(sizeLabel.toLowerCase(), slideSize * self.slidesTotal);
        };

        function setEvents()
        {
            if(self.options.buttons)
            {
                $prev.click(function()
                {
                    return self.move(self.slideCurrent - 1);
                });

                $next.click(function()
                {
                    return self.move(self.slideCurrent + 1);
                });
            }

            if(self.options.bullets)
            {
                $container.on("click", ".bullet", function()
                {
                    return self.move(+$(this).attr("data-slide"));
                });
            }
        }

        this.start = function()
        {
            if(self.options.interval)
            {
                clearTimeout(intervalTimer);

                intervalTimer = setTimeout(function()
                {
                    self.move(self.slideCurrent + 1);

                }, this.options.intervalTime);
            }
        };

        this.stop = function()
        {
            clearTimeout(intervalTimer);
        };

        this.move = function(slideIndex)
        {
            self.slideCurrent = Math.max(0, Math.min(slideIndex || 0, self.slidesTotal - slidesVisible));

            contentStyle[posiLabel] = -self.slideCurrent * slideSize;

            $overview.animate(
                contentStyle
            ,   {
                    queue    : false
                ,   duration : this.options.animation ? this.options.animationTime : 0
                ,   complete : function()
                    {
                        $container.trigger("move", [$slides[self.slideCurrent], self.slideCurrent]);
                    }
            });

            setButtons();
            self.start();

            return false;
        };

        function setButtons()
        {
            if(self.options.buttons)
            {
                $prev.toggleClass("disable", self.slideCurrent <= 0);
                $next.toggleClass("disable", self.slideCurrent >= self.slidesTotal - slidesVisible);
            }

            if(self.options.bullets)
            {
                $bullets.removeClass("active");
                $($bullets[self.slideCurrent]).addClass("active");
            }
        }

        return initialize();
    }

    $.fn[pluginName] = function(options)
    {
        return this.each(function()
        {
            if(!$.data(this, "plugin_" + pluginName))
            {
                $.data(this, "plugin_" + pluginName, new Plugin($(this), options));
            }
        });
    };
}));