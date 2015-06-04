; (function ($, window, document, undefined) {

    "use strict";

    var pluginName = "submenu";
    var defaults = {};
    var MIN_CLASS = 'sidebar-min';

    function Plugin(element, options) {
        this.element = element;
        this.minimized = $(this.element).hasClass(MIN_CLASS);
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.icons = ['fa-angle-double-left', 'fa-angle-double-right'];
        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function () {
            var $navlist = $(this.element).find('.nav-list');
            var $toggle = $(this.element).find('.sidebar-toggle');
            var me = this;

            $navlist.on('click', 'a', function (e) {
                var $link = $(e.currentTarget);
                var $li = $link.parent();

                if ($li.children('.submenu').length === 0) {
                    me.active($li);
                }

                if ($link.hasClass('dropdown-toggle')) {
                    if ($li.parent().hasClass('nav-list') && me.minimized || $li.hasClass('hover')) {
                        return;
                    }
                    me.toggleDisplay($li);
                }

            });
            $toggle.on('click', function (e) {
                e.preventDefault();
                if (me.minimized) {
                    $(me.element).removeClass(MIN_CLASS);
                    $toggle.children().removeClass(me.icons[1]).addClass(me.icons[0]);
                } else {
                    $(me.element).addClass(MIN_CLASS);
                    $toggle.children().removeClass(me.icons[0]).addClass(me.icons[1]);
                    // 隐藏所有submenu
                    //$(me.element).find('.submenu').hide();
                }
                me.minimized = !me.minimized;
            });
        },
        toggleDisplay: function ($li) {
            var me = this;
            $li.hasClass('open') ? this._hideSubmenu($li) :
            this._showSubmenu($li, function () {
                me._hideSubmenu($li.siblings('.open'));
            });
        },
        _showSubmenu: function ($item, callback) {
            callback || (callback = function () { });
            $item.addClass('open')
            .children('.submenu').slideDown('fast', callback);
            return this;
        },
        _hideSubmenu: function ($item, callback) {
            callback || (callback = function () { });
            $item.removeClass('open')
                        .children('.submenu').slideUp('fast', callback);
            return this;
        },
        active: function (selector) {
            $(this.element).find('.active').removeClass('active');
            $(selector).addClass('active')
                .parentsUntil(this.element, 'li').addClass('active');
        }
    });

    $.fn[pluginName] = function (options) {
        return this.each(function () {

            var $this = $(this);
            var data = $this.data('plugin_' + pluginName);

            if (!data) {
                $this.data('plugin_' + pluginName, (data = new Plugin(this, options)))
            }

            if (typeof options == 'string') {
                data[options]();
            }

        });
    };

})(jQuery, window, document);

; (function ($, window, document, undefined) {

    "use strict";

    // Box class IE bugfix
    var pluginName = "boxBugfix";

    // isIE('lte IE 9')
    var isIE = function (condition) {
        var b = document.createElement('b');
        b.innerHTML = '<!--[if ' + condition + ']><i></i><![endif]-->';
        return b.getElementsByTagName('i').length === 1;
    }

    var now = Date.now || function () {
        return new Date().getTime();
    };

    // thx: https://github.com/jashkenas/underscore
    var debounce = function (func, wait, immediate) {
        var timeout, args, context, timestamp, result;

        var later = function () {
            var last = now() - timestamp;

            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                }
            }
        };

        return function () {
            context = this;
            args = arguments;
            timestamp = now();
            var callNow = immediate && !timeout;
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }

            return result;
        };
    };

    var relayout = function ($el) {
        $el.length || ($el = $('body'));
        $.each($el.find('.box-cell'), function (i, el) {
            $(el).height(0);
            setTimeout(function () {
                console.log($(el).parent().height());
                $(el).height($(el).parent().height());
            }, 0);
        });
    };

    $.fn[pluginName] = function () { };

    /*@cc_on $('body').addClass('oldie'); @*/

    if ($('body').hasClass('oldie')) {
        $.fn[pluginName] = function () {
            relayout($(this));
        };

        $(window).resize(debounce(relayout, 300));
    }
    setTimeout(function () {
        $('body')[pluginName]();
    }, 0);

})(jQuery, window, document);