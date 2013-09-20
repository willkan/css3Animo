define("willkan/css3Animo/1.0.0/css3Animo-debug", [ "$-debug", "modernizr-debug" ], function(require) {
    var $ = require("$-debug"), Modernizr = window.Modernizr || require("modernizr-debug");
    var namespaces = {}, animEndEventNames = {
        WebkitAnimation: "webkitAnimationEnd",
        OAnimation: "oAnimationEnd",
        msAnimation: "MSAnimationEnd",
        animation: "animationEnd"
    }, animEndEventName = animEndEventNames[Modernizr.prefixed("animation")], support = Modernizr.cssanimations;
    /*
     {
     animateClass: string,
     finalClass: string,
     overwrite: boolean,
     namespace: string
     }
     */
    $.extend($.fn, {
        css3Animo: function(options, callback) {
            var $animateTarget = $(this), animateClass = options.animateClass || "", finalClass = options.finalClass || "", originClass = options.originClass || $animateTarget.data("originClass") || $animateTarget.data("originClass", $animateTarget.attr("class")).attr("class"), namespace = options.namespace || false, queue, item;
            if (namespace) {
                namespaces[namespace] || (namespaces[namespace] = []);
                queue = namespaces[namespace];
                if (queue.length > 0) {
                    for (var i = 0, l = queue.length; i < l; i++) {
                        item = queue[i];
                        item.$element.off(animEndEventName);
                        reset(item.$element);
                    }
                    return false;
                }
            }
            if ($animateTarget.data("isAnimating")) {
                return false;
            }
            $animateTarget.data("isAnimating", true);
            queue && queue.push({
                $element: $animateTarget,
                animateClass: animateClass
            });
            $animateTarget.addClass(animateClass + " " + finalClass).on(animEndEventName, function() {
                $animateTarget.off(animEndEventName);
                reset($animateTarget);
            });
            if (!support) {
                reset($animateTarget);
            }
            function reset($target) {
                queue && queue.shift();
                $target.data("isAnimating", false);
                $target.attr("class", options.overwrite ? finalClass : originClass + " " + finalClass);
                callback instanceof Function && callback($target);
            }
        }
    });
});
