var contentUrl = "https://static.midi.is";
yepnope(contentUrl + "/js/libs/jquery.events.js");
yepnope({
    test: $(".tab-container").length,
    yep: contentUrl + "/js/libs/jquery.tabs.js",
    callback: function() {
        $(".tab-container").tabs({
            collapse: !0,
            animate: 250,
            defaultTitle: "Tab nr %s",
            disill: !1,
            callback: !1,
            collapse: !1
        })
    }
});
yepnope([{
    test: $("select").length,
    yep: contentUrl + "/js/libs/jquery.select.js",
    callback: function() {
        $("select").select({
            wrapClass: "dropdown",
            triggerClass: "trigger",
            labelClass: "label",
            callback: !1,
            debug: !1
        })
    }
}, {
    test: $('input[type="checkbox"]').length || $('input[type="radio"]').length,
    yep: contentUrl + "/js/libs/jquery.checkradio.js",
    callback: function() {
        $('input[type="checkbox"]').checkradio();
        $('input[type="radio"]').checkradio()
    }
}]);
yepnope([{
    test: $("#sidebar").length,
    yep: contentUrl + "/js/libs/jquery.sidebar.js",
    callback: function() {
        var n = navigator.userAgent.search("Windows") !== -1,
            t = navigator.userAgent.search("Firefox") !== -1,
            i = $("embed").length > 0 || $("object").length > 0;
        if (n && t && i) {
            $("#sidebar").css("display", "none");
            return
        }
        $(".site-wrap").sidebar({
                sideEl: $(".sidebar"),
                bodyEl: $(".page-wrap"),
                toggleEl: $(".sidenav-toggle"),
                sideNavWidth: 260,
                sideNavSide: "left",
                transitionDuration: 300
            }),
            function() {
                var n = $("#sidebar"),
                    t, i;
                if (!(n.length < 1)) {
                    t = n.find("ul.main");
                    i = n.find(".slide");
                    t.on("click", 'a[href^="#"]', function(n) {
                        n.preventDefault();
                        var t = $(this),
                            i = t.attr("href"),
                            r = $(i);
                        r.addClass("open")
                    });
                    n.on("click", ".close-slide", function(n) {
                        n.preventDefault();
                        var t = $(this);
                        t.closest(".slide").removeClass("open")
                    })
                }
            }()
    }
}]);
yepnope([{
    test: $(".modal-trigger").length,
    yep: contentUrl + "/js/libs/jquery.fancybox.pack.js",
    callback: function() {
        $(".modal-trigger").fancybox()
    }
}]);
yepnope([{
    test: $(".faq").length,
    yep: contentUrl + "/js/faq.js",
    callback: function() {}
}]);
yepnope([{
    test: $("#dropdown-navigation").length,
    yep: contentUrl + "/js/navigation.js",
    callback: function() {}
}]);
yepnope([{
    test: $("#search-segment").length,
    yep: contentUrl + "/js/search.js",
    callback: function() {}
}]);
yepnope([{
    test: $(".tablesorter").length,
    yep: contentUrl + "/js/libs/jquery.tablesorter.min.js",
    callback: function() {
        $(".tablesorter").each(function() {
            $(this).tablesorter()
        })
    }
}]);
yepnope([{
    test: Modernizr.svg,
    nope: contentUrl + "/js/svg.js"
}]);
yepnope([{
    test: $(".flexslider").length,
    yep: contentUrl + "/js/libs/jquery.flexslider-min.js",
    callback: function() {
        var t = [],
            i = !1,
            n = function() {
                return window.innerWidth < 320 ? 1 : window.innerWidth < 480 ? 2 : window.innerWidth < 600 ? 3 : window.innerWidth < 720 ? 4 : window.innerWidth < 840 ? 5 : window.innerWidth < 960 ? 6 : 7
            },
            r = function(r, f, e) {
                $(r).is(":visible") && $(r).flexslider({
                    animation: "slide",
                    nextText: "<i class='icon-chevron-right'><\/i>",
                    prevText: "<i class='icon-chevron-left'><\/i>",
                    controlNav: !1,
                    animationLoop: !1,
                    itemWidth: 327,
                    slideshow: !1,
                    maxItems: n(),
                    minItems: n(),
                    start: function(n) {
                        t.push(n);
                        i = !0;
                        u();
                        f || e.css({
                            display: "none",
                            visibility: "visible"
                        })
                    }
                })
            },
            u = function() {
                if (i) {
                    var r = n();
                    $(t).each(function() {
                        this.vars.minItems = r;
                        this.vars.maxItems = r
                    })
                }
            };
        $(".flexslider").each(function(n, t) {
            var i = $(t).closest(".panel"),
                u = i.is(":visible");
            u || i.css({
                display: "block",
                visibility: "hidden"
            });
            r(this, u, i)
        });
        $(window).on("resize", function() {
            u()
        });
        $(".panel").on("openpanel", function() {
            var n = $(this),
                t = n.find(".flexslider");
            t.removeData("flexslider");
            r(t, !0, n)
        })
    }
}]);
yepnope(contentUrl + "/js/libs/jquery.formatCurrency-1.4.0.min.js");
yepnope(contentUrl + "/js/libs/jquery.formatCurrency.is-IS.js"),
    function() {
        (function() {
            var n = $(".buy-fixed");
            if (!(n.length < 1)) {
                $(window).on("sideNavOpen", function() {
                    n.addClass("hidden")
                });
                $(window).on("sideNavHidden", function() {
                    n.removeClass("hidden")
                });
                $(window).on("scroll", function() {
                    $(this).scrollTop() >= 180 ? n.addClass("visible") : n.removeClass("visible")
                })
            }
        })()
    }();
$(function() {
        var n = $(".lightbox");
        n
    }),
    function() {
        var r = $("#mainFeatures"),
            s = navigator.language,
            t, n = 0,
            i = 1,
            u = 12,
            f = $(".no-boxsizing").length > 0,
            e = function() {
                var r = t.length;
                if (!(r - n < u)) {
                    for (n; n < r; n++) o(t[n]);
                    n = 0;
                    i++
                }
            },
            o = function(t) {
                var v = n % 9 == 0,
                    s, u = $("<li><\/li>", {
                        "class": "item " + s
                    }),
                    e = $("<a><\/a>", {
                        href: t.urlString + "/" + t.source + "/" + t.eventId,
                        "class": "feature"
                    }),
                    h = $("<div><\/div>", {
                        "class": "artwork",
                        html: "<div id=" + t.divZoomImgId + ' class="zoom" style="background-image: url(\'' + t.imagesource + "');\"><img onerror=\"this.onerror=null;this.src='" + t.missingImage + "';setMissingImg('" + t.divZoomImgId + "', '" + t.missingImage + '\');" src="' + t.imagesource + '" alt="Poster for ' + t.title + '" class="image"><\/div>'
                    }),
                    i = $("<div><\/div>", {
                        "class": "caption"
                    }),
                    c = $("<div><\/div>", {
                        "class": "type " + t.typeEN,
                        text: t.type
                    }),
                    l = $("<div><\/div>", {
                        "class": "title",
                        html: "<h2>" + t.title + "<\/h2>"
                    }),
                    a = $("<div><\/div>", {
                        "class": "venue",
                        html: t.place
                    }),
                    o;
                e.append(h);
                i.append(c);
                i.append(l);
                i.append(a);
                e.append(i);
                u.append(e);
                f && (o = $("<div><\/div>", {
                    "class": "padbox"
                }), u.wrapInner(o));
                r.append(u)
            };
        $("#get-main").on("click", function(n) {
            n.defaultPrevented;
            i < 3 && ($.ajax({
                url: $(this).data("url"),
                dataType: "json",
                cache: !1,
                success: function(n) {
                    t = n;
                    e()
                }
            }), i == 2 && $("#get-main").hide())
        })
    }(),
    function() {
        var e = $("#categoryView"),
            h = navigator.language,
            t, n = 0,
            r = 1,
            i = 12,
            o = 1,
            s = $(".no-boxsizing").length > 0,
            c = function() {
                var u = t.length;
                for (u - n < i && $("#get-by-category").hide(), n; n < u; n++) f(t[n]);
                n = 0;
                r++
            },
            u = function() {
                var u = t.length;
                for (u - n < i && $("#get-by-category").hide(), n; n < i; n++) f(t[n]);
                t = t.slice(12);
                n = 0;
                r++
            },
            f = function(t) {
                var v = n % 9 == 0,
                    o, u = $("<li><\/li>", {
                        "class": "item " + o
                    }),
                    i, f;
                i = t.fullUrl == null || t.fullUrl == "" ? $("<a><\/a>", {
                    href: t.urlString + "/" + t.source + "/" + t.eventId,
                    "class": "feature"
                }) : $("<a><\/a>", {
                    href: t.fullUrl,
                    "class": "feature"
                });
                var h = $("<div><\/div>", {
                        "class": "artwork",
                        html: "<div id=" + t.divZoomImgId + ' class="zoom" style="background-image: url(\'' + t.imagesource + "');\"><img onerror=\"this.onerror=null;this.src='" + t.missingImage + "';setMissingImg('" + t.divZoomImgId + "', '" + t.missingImage + '\');" src="' + t.imagesource + '" alt="Poster for ' + t.title + '" class="image"><\/div>'
                    }),
                    r = $("<div><\/div>", {
                        "class": "caption"
                    }),
                    c = $("<div><\/div>", {
                        "class": "type " + t.typeEN,
                        text: t.type
                    }),
                    l = $("<div><\/div>", {
                        "class": "title",
                        html: "<h2>" + t.title + "<\/h2>"
                    }),
                    a = $("<div><\/div>", {
                        "class": "venue",
                        html: t.place
                    });
                i.append(h);
                r.append(c);
                r.append(l);
                r.append(a);
                i.append(r);
                u.append(i);
                s && (f = $("<div><\/div>", {
                    "class": "padbox"
                }), u.wrapInner(f));
                e.append(u)
            };
        $("#get-by-category").on("click", function(n) {
            n.defaultPrevented;
            t == null ? (o = 1, $.ajax({
                url: $(this).data("url"),
                dataType: "json",
                cache: !1,
                success: function(n) {
                    t = n;
                    u()
                }
            })) : u()
        })
    }(),
    function() {
        var f = $("#frontMovieView"),
            s = navigator.language,
            t, n = 0,
            i = 1,
            r = 6,
            e = $(".no-boxsizing").length > 0,
            u = function() {
                var u = t.length;
                if (!(u - n < r)) {
                    for (n; n < r * i && n < u; n++) o(t[n]);
                    i++
                }
            },
            o = function(t) {
                var l = n % 9 == 0,
                    i = $("<li><\/li>", {
                        "class": "item"
                    }),
                    r = $("<a><\/a>", {
                        href: t.urlString + "/" + t.source + "/" + t.eventId,
                        "class": "feature"
                    }),
                    s = $("<div><\/div>", {
                        "class": "artwork aspect poster",
                        html: '<div class="zoom" style="background-image: url(\'' + t.imagesource + '\');"><img src="' + t.imagesource + '" alt="Poster for ' + t.title + '" class="image"><\/div>'
                    }),
                    u = $("<div><\/div>", {
                        "class": "caption"
                    }),
                    h = $("<div><\/div>", {
                        "class": "title",
                        html: "<h2>" + t.title + "<\/h2>"
                    }),
                    c = $("<div><\/div>", {
                        "class": "genre",
                        html: t.category
                    }),
                    o;
                r.append(s);
                u.append(h);
                u.append(c);
                r.append(u);
                i.append(r);
                e && (o = $("<div><\/div>", {
                    "class": "padbox"
                }), i.wrapInner(o));
                f.append(i)
            };
        $("#get-main-movies").on("click", function(n) {
            n.defaultPrevented;
            t ? (u(), $("#get-main-movies").hide()) : ($.ajax({
                url: $(this).data("url"),
                dataType: "json",
                success: function(n) {
                    t = n;
                    u()
                }
            }), $("#get-main-movies").hide())
        })
    }(),
    function() {
        var u = $("#categoryView"),
            c = navigator.language,
            i, n = 0,
            e = 1,
            o = 12,
            r = 2,
            t = new Date(2e3, 1, 1, 0, 0, 0, 0),
            s = $(".no-boxsizing").length > 0,
            h = function() {
                var t = i.length;
                for (r = r + 1, t - n < o && $("#get-by-date").hide(), n; n < t; n++) f(i[n]);
                n = 0;
                e++
            },
            f;
        String.prototype.lpad = function(n, t) {
            for (var i = this; i.length < t;) i = n + i;
            return i
        };
        f = function(n) {
            var o = new Date(n.dateOfShow),
                a = new Date(n.dateOfShow),
                f, i, y;
            if (a.setHours(0, 0, 0, 0), t.setHours(0, 0, 0, 0), t.getTime() < a.getTime()) {
                t = o;
                var v = $("<li><\/li>", {
                        "class": "item"
                    }),
                    h = $("<div><\/div>", {
                        "class": "date"
                    }),
                    p = $("<h2><\/h2>", {
                        "class": "long",
                        text: n.splitDate
                    }),
                    c = $("<h2><\/h2>", {
                        "class": "short"
                    }),
                    w = $("<span><\/span>", {
                        "class": "weekday",
                        text: n.htmlDayOfWeek
                    }),
                    r = $("<div><\/div>", {
                        "class": "middle"
                    }),
                    b = $("<span><\/span>", {
                        "class": "day",
                        text: t.getUTCDate().toString().lpad("0", 2)
                    }),
                    k = $("<span><\/span>", {
                        "class": "month",
                        text: n.htmlMonth
                    }),
                    d = $("<span><\/span>", {
                        "class": "year",
                        text: " " + t.getUTCFullYear()
                    });
                r.append(b);
                r.append(k);
                r.append(d);
                c.append(w);
                c.append(r);
                h.append(p);
                h.append(c);
                v.append(h);
                u.append(v)
            }
            f = $("<li><\/li>", {
                "class": "item"
            });
            i = n.fullUrl == null || n.fullUrl == "" ? $("<a><\/a>", {
                href: n.urlString + "/" + n.source + "/" + n.eventId,
                "class": "feature"
            }) : $("<a><\/a>", {
                href: n.fullUrl,
                "class": "feature"
            });
            var g = $("<div><\/div>", {
                    "class": "time",
                    text: o.getUTCHours().toString().lpad("0", 2) + ":" + o.getUTCMinutes().toString().lpad("0", 2)
                }),
                nt = $("<div><\/div>", {
                    "class": "artwork",
                    html: "<div id=" + n.divZoomImgId + ' class="zoom" style="background-image: url(\'' + n.imageSource + "');\"><img onerror=\"this.onerror=null;this.src='" + n.missingImage + "';setMissingImg('" + n.divZoomImgId + "', '" + n.missingImage + '\');" src="' + n.imageSource + '" alt="Poster for ' + n.eventModel.title + '" class="image"><\/div>'
                }),
                e = $("<div><\/div>", {
                    "class": "caption"
                }),
                tt = $("<div><\/div>", {
                    "class": "type-marker " + n.typeEN,
                    text: n.type
                }),
                it = $("<div><\/div>", {
                    "class": "title",
                    html: "<h3>" + n.eventModel.title + "<\/h3>"
                }),
                rt = $("<div><\/div>", {
                    "class": "description",
                    html: n.name
                }),
                l = $("<div><\/div>", {
                    "class": "information"
                }),
                ut = $("<div><\/div>", {
                    "class": "venue",
                    text: n.userGroupName
                }),
                ft = $("<div><\/div>", {
                    "class": "location",
                    text: n.eventHallName
                });
            i.append(nt);
            i.append(g);
            e.append(tt);
            e.append(it);
            e.append(rt);
            i.append(e);
            i.append(l);
            l.append(ut);
            l.append(ft);
            f.append(i);
            s && (y = $("<div><\/div>", {
                "class": "padbox"
            }), f.wrapInner(y));
            u.append(f)
        };
        $("#get-by-date").on("click", function(n) {
            n.defaultPrevented;
            var t = $(this).data("url");
            t = t.replace("1", r);
            $.ajax({
                url: t,
                dataType: "json",
                cache: !1,
                success: function(n) {
                    i = n;
                    h()
                }
            })
        })
    }()