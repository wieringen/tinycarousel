;(function (factory)
{
    if (typeof define === 'function' && define.amd)
    {
        define(['jquery'], factory);
    }
    else if (typeof exports === 'object')
    {
        factory(require('jquery'));
    }
    else
    {
        factory(jQuery);
    }
}
(function ($)
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
        ,   infinite:       true   // infinite carousel.
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
        ,   slideIndex      = 0

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
            self.move(self.slideCurrent);

            setEvents();

            return self;
        }

        this.update = function()
        {
            $overview.find(".mirrored").remove();

            $slides           = $overview.children();
            viewportSize      = $viewport[0]["offset" + sizeLabel];
            slideSize         = $slides.first()["outer" + sizeLabel](true);
            self.slidesTotal  = $slides.length;
            self.slideCurrent = self.options.start || 0;
            slidesVisible     = Math.ceil(viewportSize / slideSize);

            $overview.append($slides.slice(0, slidesVisible).clone().addClass("mirrored"));
            $overview.css(sizeLabel.toLowerCase(), slideSize * (self.slidesTotal + slidesVisible));

            return self;
        };

        function setEvents()
        {
            if(self.options.buttons)
            {
                $prev.click(function()
                {
                    self.move(--slideIndex);

                    return false;
                });

                $next.click(function()
                {
                    self.move(++slideIndex);

                    return false;
                });
            }

            $(window).resize(self.update);

            if(self.options.bullets)
            {
                $container.on("click", ".bullet", function()
                {
                    self.move(slideIndex = +$(this).attr("data-slide"));

                    return false;
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
                    self.move(++slideIndex);

                }, self.options.intervalTime);
            }

            return self;
        };

        this.stop = function()
        {
            clearTimeout(intervalTimer);

            return self;
        };

        this.move = function(index)
        {
            slideIndex        = index;
            self.slideCurrent = slideIndex % self.slidesTotal;

            if(slideIndex < 0)
            {
                self.slideCurrent = slideIndex = self.slidesTotal - 1;
                $overview.css(posiLabel, -(self.slidesTotal) * slideSize);
            }

            if(slideIndex > self.slidesTotal)
            {
                self.slideCurrent = slideIndex = 1;
                $overview.css(posiLabel, 0);
            }

            contentStyle[posiLabel] = -slideIndex * slideSize;

            $overview.animate(
                contentStyle
            ,   {
                    queue    : false
                ,   duration : self.options.animation ? self.options.animationTime : 0
                ,   always : function()
                    {
                        $container.trigger("move", [$slides[self.slideCurrent], self.slideCurrent]);
                    }
            });

            setButtons();
            self.start();

            return self;
        };

        function setButtons()
        {
            if(self.options.buttons && !self.options.infinite)
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