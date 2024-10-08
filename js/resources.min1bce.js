! function(e) {
    "use strict";
    e.fn.fitVids = function(t) {
        var i = {
            customSelector: null,
            ignore: null
        };
        if (!document.getElementById("fit-vids-style")) {
            var o = document.head || document.getElementsByTagName("head")[0],
                s = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",
                n = document.createElement("div");
            n.innerHTML = '<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>', o.appendChild(n.childNodes[1])
        }
        return t && e.extend(i, t), this.each(function() {
            var t = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
            i.customSelector && t.push(i.customSelector);
            var o = ".fitvidsignore";
            i.ignore && (o = o + ", " + i.ignore);
            var s = e(this).find(t.join(","));
            s = s.not("object object"), s = s.not(o), s.each(function() {
                var t = e(this);
                if (!(t.parents(o).length > 0 || "embed" === this.tagName.toLowerCase() && t.parent("object").length || t.parent(".fluid-width-video-wrapper").length)) {
                    t.css("height") || t.css("width") || !isNaN(t.attr("height")) && !isNaN(t.attr("width")) || (t.attr("height", 9), t.attr("width", 16));
                    var i = "object" === this.tagName.toLowerCase() || t.attr("height") && !isNaN(parseInt(t.attr("height"), 10)) ? parseInt(t.attr("height"), 10) : t.height(),
                        s = isNaN(parseInt(t.attr("width"), 10)) ? t.width() : parseInt(t.attr("width"), 10),
                        n = i / s;
                    if (!t.attr("id")) {
                        var r = "fitvid" + Math.floor(999999 * Math.random());
                        t.attr("id", r)
                    }
                    t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * n + "%"), t.removeAttr("height").removeAttr("width")
                }
            })
        })
    }
}(window.jQuery || window.Zepto),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(e) {
    var t, i, o, s, n, r, a = "Close",
        l = "BeforeClose",
        d = "AfterClose",
        c = "BeforeAppend",
        p = "MarkupParse",
        u = "Open",
        f = "Change",
        h = "mfp",
        m = "." + h,
        v = "mfp-ready",
        g = "mfp-removing",
        w = "mfp-prevent-close",
        y = function() {},
        k = !!window.jQuery,
        T = e(window),
        b = function(e, i) {
            t.ev.on(h + e + m, i)
        },
        S = function(t, i, o, s) {
            var n = document.createElement("div");
            return n.className = "mfp-" + t, o && (n.innerHTML = o), s ? i && i.appendChild(n) : (n = e(n), i && n.appendTo(i)), n
        },
        C = function(i, o) {
            t.ev.triggerHandler(h + i, o), t.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1), t.st.callbacks[i] && t.st.callbacks[i].apply(t, e.isArray(o) ? o : [o]))
        },
        $ = function(i) {
            return i === r && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)), r = i), t.currTemplate.closeBtn
        },
        x = function() {
            e.magnificPopup.instance || (t = new y, t.init(), e.magnificPopup.instance = t)
        },
        P = function() {
            var e = document.createElement("p").style,
                t = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== e.transition) return !0;
            for (; t.length;)
                if (t.pop() + "Transition" in e) return !0;
            return !1
        };
    y.prototype = {
        constructor: y,
        init: function() {
            var i = navigator.appVersion;
            t.isLowIE = t.isIE8 = document.all && !document.addEventListener, t.isAndroid = /android/gi.test(i), t.isIOS = /iphone|ipad|ipod/gi.test(i), t.supportsTransition = P(), t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), o = e(document), t.popupsCache = {}
        },
        open: function(i) {
            var s;
            if (!1 === i.isObj) {
                t.items = i.items.toArray(), t.index = 0;
                var r, a = i.items;
                for (s = 0; s < a.length; s++)
                    if (r = a[s], r.parsed && (r = r.el[0]), r === i.el[0]) {
                        t.index = s;
                        break
                    }
            } else t.items = e.isArray(i.items) ? i.items : [i.items], t.index = i.index || 0;
            if (t.isOpen) return void t.updateItemHTML();
            t.types = [], n = "", i.mainEl && i.mainEl.length ? t.ev = i.mainEl.eq(0) : t.ev = o, i.key ? (t.popupsCache[i.key] || (t.popupsCache[i.key] = {}), t.currTemplate = t.popupsCache[i.key]) : t.currTemplate = {}, t.st = e.extend(!0, {}, e.magnificPopup.defaults, i), t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = S("bg").on("click" + m, function() {
                t.close()
            }), t.wrap = S("wrap").attr("tabindex", -1).on("click" + m, function(e) {
                t._checkIfClose(e.target) && t.close()
            }), t.container = S("container", t.wrap)), t.contentContainer = S("content"), t.st.preloader && (t.preloader = S("preloader", t.container, t.st.tLoading));
            var l = e.magnificPopup.modules;
            for (s = 0; s < l.length; s++) {
                var d = l[s];
                d = d.charAt(0).toUpperCase() + d.slice(1), t["init" + d].call(t)
            }
            C("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (b(p, function(e, t, i, o) {
                i.close_replaceWith = $(o.type)
            }), n += " mfp-close-btn-in") : t.wrap.append($())), t.st.alignTop && (n += " mfp-align-top"), t.fixedContentPos ? t.wrap.css({
                overflow: t.st.overflowY,
                overflowX: "hidden",
                overflowY: t.st.overflowY
            }) : t.wrap.css({
                top: T.scrollTop(),
                position: "absolute"
            }), (!1 === t.st.fixedBgPos || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
                height: o.height(),
                position: "absolute"
            }), t.st.enableEscapeKey && o.on("keyup" + m, function(e) {
                27 === e.keyCode && t.close()
            }), T.on("resize" + m, function() {
                t.updateSize()
            }), t.st.closeOnContentClick || (n += " mfp-auto-cursor"), n && t.wrap.addClass(n);
            var c = t.wH = T.height(),
                f = {};
            if (t.fixedContentPos && t._hasScrollBar(c)) {
                var h = t._getScrollbarSize();
                h && (f.marginRight = h)
            }
            t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : f.overflow = "hidden");
            var g = t.st.mainClass;
            return t.isIE7 && (g += " mfp-ie7"), g && t._addClassToMFP(g), t.updateItemHTML(), C("BuildControls"), e("html").css(f), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)), t._lastFocusedEl = document.activeElement, setTimeout(function() {
                t.content ? (t._addClassToMFP(v), t._setFocus()) : t.bgOverlay.addClass(v), o.on("focusin" + m, t._onFocusIn)
            }, 16), t.isOpen = !0, t.updateSize(c), C(u), i
        },
        close: function() {
            t.isOpen && (C(l), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(g), setTimeout(function() {
                t._close()
            }, t.st.removalDelay)) : t._close())
        },
        _close: function() {
            C(a);
            var i = g + " " + v + " ";
            if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (i += t.st.mainClass + " "), t._removeClassFromMFP(i), t.fixedContentPos) {
                var s = {
                    marginRight: ""
                };
                t.isIE7 ? e("body, html").css("overflow", "") : s.overflow = "", e("html").css(s)
            }
            o.off("keyup.mfp focusin" + m), t.ev.off(m), t.wrap.attr("class", "mfp-wrap").removeAttr("style"), t.bgOverlay.attr("class", "mfp-bg"), t.container.attr("class", "mfp-container"), !t.st.showCloseBtn || t.st.closeBtnInside && !0 !== t.currTemplate[t.currItem.type] || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(), t.st.autoFocusLast && t._lastFocusedEl && e(t._lastFocusedEl).focus(), t.currItem = null, t.content = null, t.currTemplate = null, t.prevHeight = 0, C("AfterClose")
        },
        updateSize: function(e) {
            if (t.isIOS) {
                var i = document.documentElement.clientWidth / window.innerWidth,
                    o = window.innerHeight * i;
                t.wrap.css("height", o), t.wH = o
            } else t.wH = e || T.height();
            t.fixedContentPos || t.wrap.css("height", t.wH), C("Resize")
        },
        updateItemHTML: function() {
            var i = t.items[t.index];
            t.contentContainer.detach(), t.content && t.content.detach(), i.parsed || (i = t.parseEl(t.index));
            var o = i.type;
            if (C("BeforeChange", [t.currItem ? t.currItem.type : "", o]), t.currItem = i, !t.currTemplate[o]) {
                var n = !!t.st[o] && t.st[o].markup;
                C("FirstMarkupParse", n), t.currTemplate[o] = !n || e(n)
            }
            s && s !== i.type && t.container.removeClass("mfp-" + s + "-holder");
            var r = t["get" + o.charAt(0).toUpperCase() + o.slice(1)](i, t.currTemplate[o]);
            t.appendContent(r, o), i.preloaded = !0, C(f, i), s = i.type, t.container.prepend(t.contentContainer), C("AfterChange")
        },
        appendContent: function(e, i) {
            t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside && !0 === t.currTemplate[i] ? t.content.find(".mfp-close").length || t.content.append($()) : t.content = e : t.content = "", C("BeforeAppend"), t.container.addClass("mfp-" + i + "-holder"), t.contentContainer.append(t.content)
        },
        parseEl: function(i) {
            var o, s = t.items[i];
            if (s.tagName ? s = {
                    el: e(s)
                } : (o = s.type, s = {
                    data: s,
                    src: s.src
                }), s.el) {
                for (var n = t.types, r = 0; r < n.length; r++)
                    if (s.el.hasClass("mfp-" + n[r])) {
                        o = n[r];
                        break
                    }
                s.src = s.el.attr("data-mfp-src"), s.src || (s.src = s.el.attr("href"))
            }
            return s.type = o || t.st.type || "inline", s.index = i, s.parsed = !0, t.items[i] = s, C("ElementParse", s), t.items[i]
        },
        addGroup: function(e, i) {
            var o = function(o) {
                o.mfpEl = this, t._openClick(o, e, i)
            };
            i || (i = {});
            var s = "click.magnificPopup";
            i.mainEl = e, i.items ? (i.isObj = !0, e.off(s).on(s, o)) : (i.isObj = !1, i.delegate ? e.off(s).on(s, i.delegate, o) : (i.items = e, e.off(s).on(s, o)))
        },
        _openClick: function(i, o, s) {
            if ((void 0 !== s.midClick ? s.midClick : e.magnificPopup.defaults.midClick) || !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)) {
                var n = void 0 !== s.disableOn ? s.disableOn : e.magnificPopup.defaults.disableOn;
                if (n)
                    if (e.isFunction(n)) {
                        if (!n.call(t)) return !0
                    } else if (T.width() < n) return !0;
                i.type && (i.preventDefault(), t.isOpen && i.stopPropagation()), s.el = e(i.mfpEl), s.delegate && (s.items = o.find(s.delegate)), t.open(s)
            }
        },
        updateStatus: function(e, o) {
            if (t.preloader) {
                i !== e && t.container.removeClass("mfp-s-" + i), o || "loading" !== e || (o = t.st.tLoading);
                var s = {
                    status: e,
                    text: o
                };
                C("UpdateStatus", s), e = s.status, o = s.text, t.preloader.html(o), t.preloader.find("a").on("click", function(e) {
                    e.stopImmediatePropagation()
                }), t.container.addClass("mfp-s-" + e), i = e
            }
        },
        _checkIfClose: function(i) {
            if (!e(i).hasClass(w)) {
                var o = t.st.closeOnContentClick,
                    s = t.st.closeOnBgClick;
                if (o && s) return !0;
                if (!t.content || e(i).hasClass("mfp-close") || t.preloader && i === t.preloader[0]) return !0;
                if (i === t.content[0] || e.contains(t.content[0], i)) {
                    if (o) return !0
                } else if (s && e.contains(document, i)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(e) {
            t.bgOverlay.addClass(e), t.wrap.addClass(e)
        },
        _removeClassFromMFP: function(e) {
            this.bgOverlay.removeClass(e), t.wrap.removeClass(e)
        },
        _hasScrollBar: function(e) {
            return (t.isIE7 ? o.height() : document.body.scrollHeight) > (e || T.height())
        },
        _setFocus: function() {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
        },
        _onFocusIn: function(i) {
            return i.target === t.wrap[0] || e.contains(t.wrap[0], i.target) ? void 0 : (t._setFocus(), !1)
        },
        _parseMarkup: function(t, i, o) {
            var s;
            o.data && (i = e.extend(o.data, i)), C(p, [t, i, o]), e.each(i, function(i, o) {
                if (void 0 === o || !1 === o) return !0;
                if (s = i.split("_"), s.length > 1) {
                    var n = t.find(m + "-" + s[0]);
                    if (n.length > 0) {
                        var r = s[1];
                        "replaceWith" === r ? n[0] !== o[0] && n.replaceWith(o) : "img" === r ? n.is("img") ? n.attr("src", o) : n.replaceWith(e("<img>").attr("src", o).attr("class", n.attr("class"))) : n.attr(s[1], o)
                    }
                } else t.find(m + "-" + i).html(o)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === t.scrollbarSize) {
                var e = document.createElement("div");
                e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), t.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
            }
            return t.scrollbarSize
        }
    }, e.magnificPopup = {
        instance: null,
        proto: y.prototype,
        modules: [],
        open: function(t, i) {
            return x(), t = t ? e.extend(!0, {}, t) : {}, t.isObj = !0, t.index = i || 0, this.instance.open(t)
        },
        close: function() {
            return e.magnificPopup.instance && e.magnificPopup.instance.close()
        },
        registerModule: function(t, i) {
            i.options && (e.magnificPopup.defaults[t] = i.options), e.extend(this.proto, i.proto), this.modules.push(t)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, e.fn.magnificPopup = function(i) {
        x();
        var o = e(this);
        if ("string" == typeof i)
            if ("open" === i) {
                var s, n = k ? o.data("magnificPopup") : o[0].magnificPopup,
                    r = parseInt(arguments[1], 10) || 0;
                n.items ? s = n.items[r] : (s = o, n.delegate && (s = s.find(n.delegate)), s = s.eq(r)), t._openClick({
                    mfpEl: s
                }, o, n)
            } else t.isOpen && t[i].apply(t, Array.prototype.slice.call(arguments, 1));
        else i = e.extend(!0, {}, i), k ? o.data("magnificPopup", i) : o[0].magnificPopup = i, t.addGroup(o, i);
        return o
    };
    var I, O, A, z = "inline",
        E = function() {
            A && (O.after(A.addClass(I)).detach(), A = null)
        };
    e.magnificPopup.registerModule(z, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                t.types.push(z), b(a + "." + z, function() {
                    E()
                })
            },
            getInline: function(i, o) {
                if (E(), i.src) {
                    var s = t.st.inline,
                        n = e(i.src);
                    if (n.length) {
                        var r = n[0].parentNode;
                        r && r.tagName && (O || (I = s.hiddenClass, O = S(I), I = "mfp-" + I), A = n.after(O).detach().removeClass(I)), t.updateStatus("ready")
                    } else t.updateStatus("error", s.tNotFound), n = e("<div>");
                    return i.inlineElement = n, n
                }
                return t.updateStatus("ready"), t._parseMarkup(o, {}, i), o
            }
        }
    });
    var M, L = "ajax",
        H = function() {
            M && e(document.body).removeClass(M)
        },
        j = function() {
            H(), t.req && t.req.abort()
        };
    e.magnificPopup.registerModule(L, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                t.types.push(L), M = t.st.ajax.cursor, b(a + "." + L, j), b("BeforeChange." + L, j)
            },
            getAjax: function(i) {
                M && e(document.body).addClass(M), t.updateStatus("loading");
                var o = e.extend({
                    url: i.src,
                    success: function(o, s, n) {
                        var r = {
                            data: o,
                            xhr: n
                        };
                        C("ParseAjax", r), t.appendContent(e(r.data), L), i.finished = !0, H(), t._setFocus(), setTimeout(function() {
                            t.wrap.addClass(v)
                        }, 16), t.updateStatus("ready"), C("AjaxContentAdded")
                    },
                    error: function() {
                        H(), i.finished = i.loadError = !0, t.updateStatus("error", t.st.ajax.tError.replace("%url%", i.src))
                    }
                }, t.st.ajax.settings);
                return t.req = e.ajax(o), ""
            }
        }
    });
    var W, D = function(i) {
        if (i.data && void 0 !== i.data.title) return i.data.title;
        var o = t.st.image.titleSrc;
        if (o) {
            if (e.isFunction(o)) return o.call(t, i);
            if (i.el) return i.el.attr(o) || ""
        }
        return ""
    };
    e.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var i = t.st.image,
                    o = ".image";
                t.types.push("image"), b(u + o, function() {
                    "image" === t.currItem.type && i.cursor && e(document.body).addClass(i.cursor)
                }), b(a + o, function() {
                    i.cursor && e(document.body).removeClass(i.cursor), T.off("resize" + m)
                }), b("Resize" + o, t.resizeImage), t.isLowIE && b("AfterChange", t.resizeImage)
            },
            resizeImage: function() {
                var e = t.currItem;
                if (e && e.img && t.st.image.verticalFit) {
                    var i = 0;
                    t.isLowIE && (i = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", t.wH - i)
                }
            },
            _onImageHasSize: function(e) {
                e.img && (e.hasSize = !0, W && clearInterval(W), e.isCheckingImgSize = !1, C("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), e.imgHidden = !1))
            },
            findImageSize: function(e) {
                var i = 0,
                    o = e.img[0],
                    s = function(n) {
                        W && clearInterval(W), W = setInterval(function() {
                            return o.naturalWidth > 0 ? void t._onImageHasSize(e) : (i > 200 && clearInterval(W), i++, void(3 === i ? s(10) : 40 === i ? s(50) : 100 === i && s(500)))
                        }, n)
                    };
                s(1)
            },
            getImage: function(i, o) {
                var s = 0,
                    n = function() {
                        i && (i.img[0].complete ? (i.img.off(".mfploader"), i === t.currItem && (t._onImageHasSize(i), t.updateStatus("ready")), i.hasSize = !0, i.loaded = !0, C("ImageLoadComplete")) : (s++, 200 > s ? setTimeout(n, 100) : r()))
                    },
                    r = function() {
                        i && (i.img.off(".mfploader"), i === t.currItem && (t._onImageHasSize(i), t.updateStatus("error", a.tError.replace("%url%", i.src))), i.hasSize = !0, i.loaded = !0, i.loadError = !0)
                    },
                    a = t.st.image,
                    l = o.find(".mfp-img");
                if (l.length) {
                    var d = document.createElement("img");
                    d.className = "mfp-img", i.el && i.el.find("img").length && (d.alt = i.el.find("img").attr("alt")), i.img = e(d).on("load.mfploader", n).on("error.mfploader", r), d.src = i.src, l.is("img") && (i.img = i.img.clone()), d = i.img[0], d.naturalWidth > 0 ? i.hasSize = !0 : d.width || (i.hasSize = !1)
                }
                return t._parseMarkup(o, {
                    title: D(i),
                    img_replaceWith: i.img
                }, i), t.resizeImage(), i.hasSize ? (W && clearInterval(W), i.loadError ? (o.addClass("mfp-loading"), t.updateStatus("error", a.tError.replace("%url%", i.src))) : (o.removeClass("mfp-loading"), t.updateStatus("ready")), o) : (t.updateStatus("loading"), i.loading = !0, i.hasSize || (i.imgHidden = !0, o.addClass("mfp-loading"), t.findImageSize(i)), o)
            }
        }
    });
    var _, N = function() {
        return void 0 === _ && (_ = void 0 !== document.createElement("p").style.MozTransform), _
    };
    e.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 200,
            opener: function(e) {
                return e.is("img") ? e : e.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var e, i = t.st.zoom,
                    o = ".zoom";
                if (i.enabled && t.supportsTransition) {
                    var s, n, r = i.duration,
                        d = function(e) {
                            var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                o = "all " + i.duration / 1e3 + "s " + i.easing,
                                s = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                n = "transition";
                            return s["-webkit-" + n] = s["-moz-" + n] = s["-o-" + n] = s[n] = o, t.css(s), t
                        },
                        c = function() {
                            t.content.css("visibility", "visible")
                        };
                    b("BuildControls" + o, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(s), t.content.css("visibility", "hidden"), !(e = t._getItemToZoom())) return void c();
                            n = d(e), n.css(t._getOffset()), t.wrap.append(n), s = setTimeout(function() {
                                n.css(t._getOffset(!0)), s = setTimeout(function() {
                                    c(), setTimeout(function() {
                                        n.remove(), e = n = null, C("ZoomAnimationEnded")
                                    }, 16)
                                }, r)
                            }, 16)
                        }
                    }), b(l + o, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(s), t.st.removalDelay = r, !e) {
                                if (!(e = t._getItemToZoom())) return;
                                n = d(e)
                            }
                            n.css(t._getOffset(!0)), t.wrap.append(n), t.content.css("visibility", "hidden"), setTimeout(function() {
                                n.css(t._getOffset())
                            }, 16)
                        }
                    }), b(a + o, function() {
                        t._allowZoom() && (c(), n && n.remove(), e = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === t.currItem.type
            },
            _getItemToZoom: function() {
                return !!t.currItem.hasSize && t.currItem.img
            },
            _getOffset: function(i) {
                var o;
                o = i ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
                var s = o.offset(),
                    n = parseInt(o.css("padding-top"), 10),
                    r = parseInt(o.css("padding-bottom"), 10);
                s.top -= e(window).scrollTop() - n;
                var a = {
                    width: o.width(),
                    height: (k ? o.innerHeight() : o[0].offsetHeight) - r - n
                };
                return N() ? a["-moz-transform"] = a.transform = "translate(" + s.left + "px," + s.top + "px)" : (a.left = s.left, a.top = s.top), a
            }
        }
    });
    var B = "iframe",
        F = "//about:blank",
        q = function(e) {
            if (t.currTemplate[B]) {
                var i = t.currTemplate[B].find("iframe");
                i.length && (e || (i[0].src = "//about:blank"), t.isIE8 && i.css("display", e ? "block" : "none"))
            }
        };
    e.magnificPopup.registerModule(B, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                t.types.push(B), b("BeforeChange", function(e, t, i) {
                    t !== i && (t === B ? q() : i === B && q(!0))
                }), b(a + "." + B, function() {
                    q()
                })
            },
            getIframe: function(i, o) {
                var s = i.src,
                    n = t.st.iframe;
                e.each(n.patterns, function() {
                    return s.indexOf(this.index) > -1 ? (this.id && (s = "string" == typeof this.id ? s.substr(s.lastIndexOf(this.id) + this.id.length, s.length) : this.id.call(this, s)), s = this.src.replace("%id%", s), !1) : void 0
                });
                var r = {};
                return n.srcAction && (r[n.srcAction] = s), t._parseMarkup(o, r, i), t.updateStatus("ready"), o
            }
        }
    });
    var U = function(e) {
            var i = t.items.length;
            return e > i - 1 ? e - i : 0 > e ? i + e : e
        },
        R = function(e, t, i) {
            return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, i)
        };
    e.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var i = t.st.gallery,
                    s = ".mfp-gallery";
                return t.direction = !0, !(!i || !i.enabled) && (n += " mfp-gallery", b(u + s, function() {
                    i.navigateByImgClick && t.wrap.on("click" + s, ".mfp-img", function() {
                        return t.items.length > 1 ? (t.next(), !1) : void 0
                    }), o.on("keydown" + s, function(e) {
                        37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
                    })
                }), b("UpdateStatus" + s, function(e, i) {
                    i.text && (i.text = R(i.text, t.currItem.index, t.items.length))
                }), b(p + s, function(e, o, s, n) {
                    var r = t.items.length;
                    s.counter = r > 1 ? R(i.tCounter, n.index, r) : ""
                }), b("BuildControls" + s, function() {
                    if (t.items.length > 1 && i.arrows && !t.arrowLeft) {
                        var o = i.arrowMarkup,
                            s = t.arrowLeft = e(o.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass(w),
                            n = t.arrowRight = e(o.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass(w);
                        s.click(function() {
                            t.prev()
                        }), n.click(function() {
                            t.next()
                        }), t.container.append(s.add(n))
                    }
                }), b(f + s, function() {
                    t._preloadTimeout && clearTimeout(t._preloadTimeout), t._preloadTimeout = setTimeout(function() {
                        t.preloadNearbyImages(), t._preloadTimeout = null
                    }, 16)
                }), void b(a + s, function() {
                    o.off(s), t.wrap.off("click" + s), t.arrowRight = t.arrowLeft = null
                }))
            },
            next: function() {
                t.direction = !0, t.index = U(t.index + 1), t.updateItemHTML()
            },
            prev: function() {
                t.direction = !1, t.index = U(t.index - 1), t.updateItemHTML()
            },
            goTo: function(e) {
                t.direction = e >= t.index, t.index = e, t.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var e, i = t.st.gallery.preload,
                    o = Math.min(i[0], t.items.length),
                    s = Math.min(i[1], t.items.length);
                for (e = 1; e <= (t.direction ? s : o); e++) t._preloadItem(t.index + e);
                for (e = 1; e <= (t.direction ? o : s); e++) t._preloadItem(t.index - e)
            },
            _preloadItem: function(i) {
                if (i = U(i), !t.items[i].preloaded) {
                    var o = t.items[i];
                    o.parsed || (o = t.parseEl(i)), C("LazyLoad", o), "image" === o.type && (o.img = e('<img class="mfp-img" />').on("load.mfploader", function() {
                        o.hasSize = !0
                    }).on("error.mfploader", function() {
                        o.hasSize = !0, o.loadError = !0, C("LazyLoadError", o)
                    }).attr("src", o.src)), o.preloaded = !0
                }
            }
        }
    });
    var X = "retina";
    e.magnificPopup.registerModule(X, {
        options: {
            replaceSrc: function(e) {
                return e.src.replace(/\.\w+$/, function(e) {
                    return "@2x" + e
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var e = t.st.retina,
                        i = e.ratio;
                    (i = isNaN(i) ? i() : i) > 1 && (b("ImageHasSize." + X, function(e, t) {
                        t.img.css({
                            "max-width": t.img[0].naturalWidth / i,
                            width: "100%"
                        })
                    }), b("ElementParse." + X, function(t, o) {
                        o.src = e.replaceSrc(o, i)
                    }))
                }
            }
        }
    }), x()
}),
function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    "use strict";
    var t = window.Slick || {};
    t = function() {
            function t(t, o) {
                var s, n = this;
                n.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: e(t),
                    appendDots: e(t),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                    nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function(t, i) {
                        return e('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1)
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: .35,
                    fade: !1,
                    focusOnSelect: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnFocus: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    useTransform: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3
                }, n.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1
                }, e.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = e(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = e(t).data("slick") || {}, n.options = e.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = e.proxy(n.autoPlay, n), n.autoPlayClear = e.proxy(n.autoPlayClear, n), n.autoPlayIterator = e.proxy(n.autoPlayIterator, n), n.changeSlide = e.proxy(n.changeSlide, n), n.clickHandler = e.proxy(n.clickHandler, n), n.selectHandler = e.proxy(n.selectHandler, n), n.setPosition = e.proxy(n.setPosition, n), n.swipeHandler = e.proxy(n.swipeHandler, n), n.dragHandler = e.proxy(n.dragHandler, n), n.keyHandler = e.proxy(n.keyHandler, n), n.instanceUid = i++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
            }
            var i = 0;
            return t
        }(), t.prototype.activateADA = function() {
            this.$slideTrack.find(".slick-active").attr({
                "aria-hidden": "false"
            }).find("a, input, button, select").attr({
                tabindex: "0"
            })
        }, t.prototype.addSlide = t.prototype.slickAdd = function(t, i, o) {
            var s = this;
            if ("boolean" == typeof i) o = i, i = null;
            else if (0 > i || i >= s.slideCount) return !1;
            s.unload(), "number" == typeof i ? 0 === i && 0 === s.$slides.length ? e(t).appendTo(s.$slideTrack) : o ? e(t).insertBefore(s.$slides.eq(i)) : e(t).insertAfter(s.$slides.eq(i)) : !0 === o ? e(t).prependTo(s.$slideTrack) : e(t).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function(t, i) {
                e(i).attr("data-slick-index", t)
            }), s.$slidesCache = s.$slides, s.reinit()
        }, t.prototype.animateHeight = function() {
            var e = this;
            if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
                var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
                e.$list.animate({
                    height: t
                }, e.options.speed)
            }
        }, t.prototype.animateSlide = function(t, i) {
            var o = {},
                s = this;
            s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (t = -t), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
                left: t
            }, s.options.speed, s.options.easing, i) : s.$slideTrack.animate({
                top: t
            }, s.options.speed, s.options.easing, i) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), e({
                animStart: s.currentLeft
            }).animate({
                animStart: t
            }, {
                duration: s.options.speed,
                easing: s.options.easing,
                step: function(e) {
                    e = Math.ceil(e), !1 === s.options.vertical ? (o[s.animType] = "translate(" + e + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + e + "px)", s.$slideTrack.css(o))
                },
                complete: function() {
                    i && i.call()
                }
            })) : (s.applyTransition(), t = Math.ceil(t), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + t + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + t + "px, 0px)", s.$slideTrack.css(o), i && setTimeout(function() {
                s.disableTransition(), i.call()
            }, s.options.speed))
        }, t.prototype.getNavTarget = function() {
            var t = this,
                i = t.options.asNavFor;
            return i && null !== i && (i = e(i).not(t.$slider)), i
        }, t.prototype.asNavFor = function(t) {
            var i = this,
                o = i.getNavTarget();
            null !== o && "object" == typeof o && o.each(function() {
                var i = e(this).slick("getSlick");
                i.unslicked || i.slideHandler(t, !0)
            })
        }, t.prototype.applyTransition = function(e) {
            var t = this,
                i = {};
            !1 === t.options.fade ? i[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : i[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
        }, t.prototype.autoPlay = function() {
            var e = this;
            e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
        }, t.prototype.autoPlayClear = function() {
            var e = this;
            e.autoPlayTimer && clearInterval(e.autoPlayTimer)
        }, t.prototype.autoPlayIterator = function() {
            var e = this,
                t = e.currentSlide + e.options.slidesToScroll;
            e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 == 0 && (e.direction = 1))), e.slideHandler(t))
        }, t.prototype.buildArrows = function() {
            var t = this;
            !0 === t.options.arrows && (t.$prevArrow = e(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = e(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), !0 !== t.options.infinite && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        }, t.prototype.buildDots = function() {
            var t, i, o = this;
            if (!0 === o.options.dots && o.slideCount > o.options.slidesToShow) {
                for (o.$slider.addClass("slick-dotted"), i = e("<ul />").addClass(o.options.dotsClass), t = 0; t <= o.getDotCount(); t += 1) i.append(e("<li />").append(o.options.customPaging.call(this, o, t)));
                o.$dots = i.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
            }
        }, t.prototype.buildOut = function() {
            var t = this;
            t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slides.each(function(t, i) {
                e(i).attr("data-slick-index", t).data("originalStyling", e(i).attr("style") || "")
            }), t.$slider.addClass("slick-slider"), t.$slideTrack = 0 === t.slideCount ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), (!0 === t.options.centerMode || !0 === t.options.swipeToSlide) && (t.options.slidesToScroll = 1), e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), !0 === t.options.draggable && t.$list.addClass("draggable")
        }, t.prototype.buildRows = function() {
            var e, t, i, o, s, n, r, a = this;
            if (o = document.createDocumentFragment(), n = a.$slider.children(), a.options.rows > 1) {
                for (r = a.options.slidesPerRow * a.options.rows, s = Math.ceil(n.length / r), e = 0; s > e; e++) {
                    var l = document.createElement("div");
                    for (t = 0; t < a.options.rows; t++) {
                        var d = document.createElement("div");
                        for (i = 0; i < a.options.slidesPerRow; i++) {
                            var c = e * r + (t * a.options.slidesPerRow + i);
                            n.get(c) && d.appendChild(n.get(c))
                        }
                        l.appendChild(d)
                    }
                    o.appendChild(l)
                }
                a.$slider.empty().append(o), a.$slider.children().children().children().css({
                    width: 100 / a.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        }, t.prototype.checkResponsive = function(t, i) {
            var o, s, n, r = this,
                a = !1,
                l = r.$slider.width(),
                d = window.innerWidth || e(window).width();
            if ("window" === r.respondTo ? n = d : "slider" === r.respondTo ? n = l : "min" === r.respondTo && (n = Math.min(d, l)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
                s = null;
                for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
                null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || i) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = e.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === t && (r.currentSlide = r.options.initialSlide), r.refresh(t)), a = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = e.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === t && (r.currentSlide = r.options.initialSlide), r.refresh(t)), a = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === t && (r.currentSlide = r.options.initialSlide), r.refresh(t), a = s), t || !1 === a || r.$slider.trigger("breakpoint", [r, a])
            }
        },
        t.prototype.changeSlide = function(t, i) {
            var o, s, n, r = this,
                a = e(t.currentTarget);
            switch (a.is("a") && t.preventDefault(), a.is("li") || (a = a.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, t.data.message) {
                case "previous":
                    s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, i);
                    break;
                case "next":
                    s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, i);
                    break;
                case "index":
                    var l = 0 === t.data.index ? 0 : t.data.index || a.index() * r.options.slidesToScroll;
                    r.slideHandler(r.checkNavigable(l), !1, i), a.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, t.prototype.checkNavigable = function(e) {
            var t, i;
            if (t = this.getNavigableIndexes(), i = 0, e > t[t.length - 1]) e = t[t.length - 1];
            else
                for (var o in t) {
                    if (e < t[o]) {
                        e = i;
                        break
                    }
                    i = t[o]
                }
            return e
        }, t.prototype.cleanUpEvents = function() {
            var t = this;
            t.options.dots && null !== t.$dots && e("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", e.proxy(t.interrupt, t, !0)).off("mouseleave.slick", e.proxy(t.interrupt, t, !1)), t.$slider.off("focus.slick blur.slick"), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide)), t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler), t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler), t.$list.off("touchend.slick mouseup.slick", t.swipeHandler), t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler), t.$list.off("click.slick", t.clickHandler), e(document).off(t.visibilityChange, t.visibility), t.cleanUpSlideEvents(), !0 === t.options.accessibility && t.$list.off("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().off("click.slick", t.selectHandler), e(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange), e(window).off("resize.slick.slick-" + t.instanceUid, t.resize), e("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault), e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition), e(document).off("ready.slick.slick-" + t.instanceUid, t.setPosition)
        }, t.prototype.cleanUpSlideEvents = function() {
            var t = this;
            t.$list.off("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.off("mouseleave.slick", e.proxy(t.interrupt, t, !1))
        }, t.prototype.cleanUpRows = function() {
            var e, t = this;
            t.options.rows > 1 && (e = t.$slides.children().children(), e.removeAttr("style"), t.$slider.empty().append(e))
        }, t.prototype.clickHandler = function(e) {
            !1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
        }, t.prototype.destroy = function(t) {
            var i = this;
            i.autoPlayClear(), i.touchObject = {}, i.cleanUpEvents(), e(".slick-cloned", i.$slider).detach(), i.$dots && i.$dots.remove(), i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()), i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()), i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                e(this).attr("style", e(this).data("originalStyling"))
            }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides)), i.cleanUpRows(), i.$slider.removeClass("slick-slider"), i.$slider.removeClass("slick-initialized"), i.$slider.removeClass("slick-dotted"), i.unslicked = !0, t || i.$slider.trigger("destroy", [i])
        }, t.prototype.disableTransition = function(e) {
            var t = this,
                i = {};
            i[t.transitionType] = "", !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
        }, t.prototype.fadeSlide = function(e, t) {
            var i = this;
            !1 === i.cssTransitions ? (i.$slides.eq(e).css({
                zIndex: i.options.zIndex
            }), i.$slides.eq(e).animate({
                opacity: 1
            }, i.options.speed, i.options.easing, t)) : (i.applyTransition(e), i.$slides.eq(e).css({
                opacity: 1,
                zIndex: i.options.zIndex
            }), t && setTimeout(function() {
                i.disableTransition(e), t.call()
            }, i.options.speed))
        }, t.prototype.fadeSlideOut = function(e) {
            var t = this;
            !1 === t.cssTransitions ? t.$slides.eq(e).animate({
                opacity: 0,
                zIndex: t.options.zIndex - 2
            }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({
                opacity: 0,
                zIndex: t.options.zIndex - 2
            }))
        }, t.prototype.filterSlides = t.prototype.slickFilter = function(e) {
            var t = this;
            null !== e && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
        }, t.prototype.focusHandler = function() {
            var t = this;
            t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(i) {
                i.stopImmediatePropagation();
                var o = e(this);
                setTimeout(function() {
                    t.options.pauseOnFocus && (t.focussed = o.is(":focus"), t.autoPlay())
                }, 0)
            })
        }, t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
            return this.currentSlide
        }, t.prototype.getDotCount = function() {
            var e = this,
                t = 0,
                i = 0,
                o = 0;
            if (!0 === e.options.infinite)
                for (; t < e.slideCount;) ++o, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            else if (!0 === e.options.centerMode) o = e.slideCount;
            else if (e.options.asNavFor)
                for (; t < e.slideCount;) ++o, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            else o = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
            return o - 1
        }, t.prototype.getLeft = function(e) {
            var t, i, o, s = this,
                n = 0;
            return s.slideOffset = 0, i = s.$slides.first().outerHeight(!0), !0 === s.options.infinite ? (s.slideCount > s.options.slidesToShow && (s.slideOffset = s.slideWidth * s.options.slidesToShow * -1, n = i * s.options.slidesToShow * -1), s.slideCount % s.options.slidesToScroll != 0 && e + s.options.slidesToScroll > s.slideCount && s.slideCount > s.options.slidesToShow && (e > s.slideCount ? (s.slideOffset = (s.options.slidesToShow - (e - s.slideCount)) * s.slideWidth * -1, n = (s.options.slidesToShow - (e - s.slideCount)) * i * -1) : (s.slideOffset = s.slideCount % s.options.slidesToScroll * s.slideWidth * -1, n = s.slideCount % s.options.slidesToScroll * i * -1))) : e + s.options.slidesToShow > s.slideCount && (s.slideOffset = (e + s.options.slidesToShow - s.slideCount) * s.slideWidth, n = (e + s.options.slidesToShow - s.slideCount) * i), s.slideCount <= s.options.slidesToShow && (s.slideOffset = 0, n = 0), !0 === s.options.centerMode && !0 === s.options.infinite ? s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2) - s.slideWidth : !0 === s.options.centerMode && (s.slideOffset = 0, s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2)), t = !1 === s.options.vertical ? e * s.slideWidth * -1 + s.slideOffset : e * i * -1 + n, !0 === s.options.variableWidth && (o = s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(e) : s.$slideTrack.children(".slick-slide").eq(e + s.options.slidesToShow), t = !0 === s.options.rtl ? o[0] ? -1 * (s.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === s.options.centerMode && (o = s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(e) : s.$slideTrack.children(".slick-slide").eq(e + s.options.slidesToShow + 1), t = !0 === s.options.rtl ? o[0] ? -1 * (s.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, t += (s.$list.width() - o.outerWidth()) / 2)), t
        }, t.prototype.getOption = t.prototype.slickGetOption = function(e) {
            return this.options[e]
        }, t.prototype.getNavigableIndexes = function() {
            var e, t = this,
                i = 0,
                o = 0,
                s = [];
            for (!1 === t.options.infinite ? e = t.slideCount : (i = -1 * t.options.slidesToScroll, o = -1 * t.options.slidesToScroll, e = 2 * t.slideCount); e > i;) s.push(i), i = o + t.options.slidesToScroll, o += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            return s
        }, t.prototype.getSlick = function() {
            return this
        }, t.prototype.getSlideCount = function() {
            var t, i, o, s = this;
            return o = !0 === s.options.centerMode ? s.slideWidth * Math.floor(s.options.slidesToShow / 2) : 0, !0 === s.options.swipeToSlide ? (s.$slideTrack.find(".slick-slide").each(function(t, n) {
                return n.offsetLeft - o + e(n).outerWidth() / 2 > -1 * s.swipeLeft ? (i = n, !1) : void 0
            }), t = Math.abs(e(i).attr("data-slick-index") - s.currentSlide) || 1) : s.options.slidesToScroll
        }, t.prototype.goTo = t.prototype.slickGoTo = function(e, t) {
            this.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(e)
                }
            }, t)
        }, t.prototype.init = function(t) {
            var i = this;
            e(i.$slider).hasClass("slick-initialized") || (e(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler()), t && i.$slider.trigger("init", [i]), !0 === i.options.accessibility && i.initADA(), i.options.autoplay && (i.paused = !1, i.autoPlay())
        }, t.prototype.initADA = function() {
            var t = this;
            t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            }), t.$slideTrack.attr("role", "listbox"), t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(i) {
                e(this).attr({
                    role: "option",
                    "aria-describedby": "slick-slide" + t.instanceUid + i
                })
            }), null !== t.$dots && t.$dots.attr("role", "tablist").find("li").each(function(i) {
                e(this).attr({
                    role: "presentation",
                    "aria-selected": "false",
                    "aria-controls": "navigation" + t.instanceUid + i,
                    id: "slick-slide" + t.instanceUid + i
                })
            }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), t.activateADA()
        }, t.prototype.initArrowEvents = function() {
            var e = this;
            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
                message: "previous"
            }, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {
                message: "next"
            }, e.changeSlide))
        }, t.prototype.initDotEvents = function() {
            var t = this;
            !0 === t.options.dots && t.slideCount > t.options.slidesToShow && e("li", t.$dots).on("click.slick", {
                message: "index"
            }, t.changeSlide), !0 === t.options.dots && !0 === t.options.pauseOnDotsHover && e("li", t.$dots).on("mouseenter.slick", e.proxy(t.interrupt, t, !0)).on("mouseleave.slick", e.proxy(t.interrupt, t, !1))
        }, t.prototype.initSlideEvents = function() {
            var t = this;
            t.options.pauseOnHover && (t.$list.on("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", e.proxy(t.interrupt, t, !1)))
        }, t.prototype.initializeEvents = function() {
            var t = this;
            t.initArrowEvents(), t.initDotEvents(), t.initSlideEvents(), t.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, t.swipeHandler), t.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, t.swipeHandler), t.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, t.swipeHandler), t.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, t.swipeHandler), t.$list.on("click.slick", t.clickHandler), e(document).on(t.visibilityChange, e.proxy(t.visibility, t)), !0 === t.options.accessibility && t.$list.on("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), e(window).on("orientationchange.slick.slick-" + t.instanceUid, e.proxy(t.orientationChange, t)), e(window).on("resize.slick.slick-" + t.instanceUid, e.proxy(t.resize, t)), e("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault), e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), e(document).on("ready.slick.slick-" + t.instanceUid, t.setPosition)
        }, t.prototype.initUI = function() {
            var e = this;
            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show()
        }, t.prototype.keyHandler = function(e) {
            var t = this;
            e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === t.options.accessibility ? t.changeSlide({
                data: {
                    message: !0 === t.options.rtl ? "next" : "previous"
                }
            }) : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({
                data: {
                    message: !0 === t.options.rtl ? "previous" : "next"
                }
            }))
        }, t.prototype.lazyLoad = function() {
            function t(t) {
                e("img[data-lazy]", t).each(function() {
                    var t = e(this),
                        i = e(this).attr("data-lazy"),
                        o = document.createElement("img");
                    o.onload = function() {
                        t.animate({
                            opacity: 0
                        }, 100, function() {
                            t.attr("src", i).animate({
                                opacity: 1
                            }, 200, function() {
                                t.removeAttr("data-lazy").removeClass("slick-loading")
                            }), r.$slider.trigger("lazyLoaded", [r, t, i])
                        })
                    }, o.onerror = function() {
                        t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, t, i])
                    }, o.src = i
                })
            }
            var i, o, s, n, r = this;
            !0 === r.options.centerMode ? !0 === r.options.infinite ? (s = r.currentSlide + (r.options.slidesToShow / 2 + 1), n = s + r.options.slidesToShow + 2) : (s = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), n = r.options.slidesToShow / 2 + 1 + 2 + r.currentSlide) : (s = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, n = Math.ceil(s + r.options.slidesToShow), !0 === r.options.fade && (s > 0 && s--, n <= r.slideCount && n++)), i = r.$slider.find(".slick-slide").slice(s, n), t(i), r.slideCount <= r.options.slidesToShow ? (o = r.$slider.find(".slick-slide"), t(o)) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? (o = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow), t(o)) : 0 === r.currentSlide && (o = r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow), t(o))
        }, t.prototype.loadSlider = function() {
            var e = this;
            e.setPosition(), e.$slideTrack.css({
                opacity: 1
            }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
        }, t.prototype.next = t.prototype.slickNext = function() {
            this.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, t.prototype.orientationChange = function() {
            var e = this;
            e.checkResponsive(), e.setPosition()
        }, t.prototype.pause = t.prototype.slickPause = function() {
            var e = this;
            e.autoPlayClear(), e.paused = !0
        }, t.prototype.play = t.prototype.slickPlay = function() {
            var e = this;
            e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1
        }, t.prototype.postSlide = function(e) {
            var t = this;
            t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && t.initADA())
        }, t.prototype.prev = t.prototype.slickPrev = function() {
            this.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, t.prototype.preventDefault = function(e) {
            e.preventDefault()
        }, t.prototype.progressiveLazyLoad = function(t) {
            t = t || 1;
            var i, o, s, n = this,
                r = e("img[data-lazy]", n.$slider);
            r.length ? (i = r.first(), o = i.attr("data-lazy"), s = document.createElement("img"), s.onload = function() {
                i.attr("src", o).removeAttr("data-lazy").removeClass("slick-loading"), !0 === n.options.adaptiveHeight && n.setPosition(), n.$slider.trigger("lazyLoaded", [n, i, o]), n.progressiveLazyLoad()
            }, s.onerror = function() {
                3 > t ? setTimeout(function() {
                    n.progressiveLazyLoad(t + 1)
                }, 500) : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, i, o]), n.progressiveLazyLoad())
            }, s.src = o) : n.$slider.trigger("allImagesLoaded", [n])
        }, t.prototype.refresh = function(t) {
            var i, o, s = this;
            o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), i = s.currentSlide, s.destroy(!0), e.extend(s, s.initials, {
                currentSlide: i
            }), s.init(), t || s.changeSlide({
                data: {
                    message: "index",
                    index: i
                }
            }, !1)
        }, t.prototype.registerBreakpoints = function() {
            var t, i, o, s = this,
                n = s.options.responsive || null;
            if ("array" === e.type(n) && n.length) {
                s.respondTo = s.options.respondTo || "window";
                for (t in n)
                    if (o = s.breakpoints.length - 1, i = n[t].breakpoint, n.hasOwnProperty(t)) {
                        for (; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === i && s.breakpoints.splice(o, 1), o--;
                        s.breakpoints.push(i), s.breakpointSettings[i] = n[t].settings
                    }
                s.breakpoints.sort(function(e, t) {
                    return s.options.mobileFirst ? e - t : t - e
                })
            }
        }, t.prototype.reinit = function() {
            var t = this;
            t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.registerBreakpoints(), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.cleanUpSlideEvents(), t.initSlideEvents(), t.checkResponsive(!1, !0), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), t.setPosition(), t.focusHandler(), t.paused = !t.options.autoplay, t.autoPlay(), t.$slider.trigger("reInit", [t])
        }, t.prototype.resize = function() {
            var t = this;
            e(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
                t.windowWidth = e(window).width(), t.checkResponsive(), t.unslicked || t.setPosition()
            }, 50))
        }, t.prototype.removeSlide = t.prototype.slickRemove = function(e, t, i) {
            var o = this;
            return "boolean" == typeof e ? (t = e, e = !0 === t ? 0 : o.slideCount - 1) : e = !0 === t ? --e : e, !(o.slideCount < 1 || 0 > e || e > o.slideCount - 1) && (o.unload(), !0 === i ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(e).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, void o.reinit())
        }, t.prototype.setCSS = function(e) {
            var t, i, o = this,
                s = {};
            !0 === o.options.rtl && (e = -e), t = "left" == o.positionProp ? Math.ceil(e) + "px" : "0px", i = "top" == o.positionProp ? Math.ceil(e) + "px" : "0px", s[o.positionProp] = e, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + t + ", " + i + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + t + ", " + i + ", 0px)", o.$slideTrack.css(s)))
        }, t.prototype.setDimensions = function() {
            var e = this;
            !1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({
                padding: "0px " + e.options.centerPadding
            }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), !0 === e.options.centerMode && e.$list.css({
                padding: e.options.centerPadding + " 0px"
            })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
            var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
            !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
        }, t.prototype.setFade = function() {
            var t, i = this;
            i.$slides.each(function(o, s) {
                t = i.slideWidth * o * -1, !0 === i.options.rtl ? e(s).css({
                    position: "relative",
                    right: t,
                    top: 0,
                    zIndex: i.options.zIndex - 2,
                    opacity: 0
                }) : e(s).css({
                    position: "relative",
                    left: t,
                    top: 0,
                    zIndex: i.options.zIndex - 2,
                    opacity: 0
                })
            }), i.$slides.eq(i.currentSlide).css({
                zIndex: i.options.zIndex - 1,
                opacity: 1
            })
        }, t.prototype.setHeight = function() {
            var e = this;
            if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
                var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
                e.$list.css("height", t)
            }
        }, t.prototype.setOption = t.prototype.slickSetOption = function() {
            var t, i, o, s, n, r = this,
                a = !1;
            if ("object" === e.type(arguments[0]) ? (o = arguments[0], a = arguments[1], n = "multiple") : "string" === e.type(arguments[0]) && (o = arguments[0], s = arguments[1], a = arguments[2], "responsive" === arguments[0] && "array" === e.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s;
            else if ("multiple" === n) e.each(o, function(e, t) {
                r.options[e] = t
            });
            else if ("responsive" === n)
                for (i in s)
                    if ("array" !== e.type(r.options.responsive)) r.options.responsive = [s[i]];
                    else {
                        for (t = r.options.responsive.length - 1; t >= 0;) r.options.responsive[t].breakpoint === s[i].breakpoint && r.options.responsive.splice(t, 1), t--;
                        r.options.responsive.push(s[i])
                    }
            a && (r.unload(), r.reinit())
        }, t.prototype.setPosition = function() {
            var e = this;
            e.setDimensions(), e.setHeight(), !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
        }, t.prototype.setProps = function() {
            var e = this,
                t = document.body.style;
            e.positionProp = !0 === e.options.vertical ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), (void 0 !== t.WebkitTransition || void 0 !== t.MozTransition || void 0 !== t.msTransition) && !0 === e.options.useCSS && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
        }, t.prototype.setSlideClasses = function(e) {
            var t, i, o, s, n = this;
            i = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(e).addClass("slick-current"), !0 === n.options.centerMode ? (t = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (e >= t && e <= n.slideCount - 1 - t ? n.$slides.slice(e - t, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + e, i.slice(o - t + 1, o + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? i.eq(i.length - 1 - n.options.slidesToShow).addClass("slick-center") : e === n.slideCount - 1 && i.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(e).addClass("slick-center")) : e >= 0 && e <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(e, e + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= n.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + e : e, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - e < n.options.slidesToShow ? i.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : i.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === n.options.lazyLoad && n.lazyLoad()
        }, t.prototype.setupInfinite = function() {
            var t, i, o, s = this;
            if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (i = null, s.slideCount > s.options.slidesToShow)) {
                for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, t = s.slideCount; t > s.slideCount - o; t -= 1) i = t - 1, e(s.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
                for (t = 0; o > t; t += 1) i = t, e(s.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
                s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    e(this).attr("id", "")
                })
            }
        }, t.prototype.interrupt = function(e) {
            var t = this;
            e || t.autoPlay(), t.interrupted = e
        }, t.prototype.selectHandler = function(t) {
            var i = this,
                o = e(t.target).is(".slick-slide") ? e(t.target) : e(t.target).parents(".slick-slide"),
                s = parseInt(o.attr("data-slick-index"));
            return s || (s = 0), i.slideCount <= i.options.slidesToShow ? (i.setSlideClasses(s), void i.asNavFor(s)) : void i.slideHandler(s)
        }, t.prototype.slideHandler = function(e, t, i) {
            var o, s, n, r, a, l = null,
                d = this;
            return t = t || !1, !0 === d.animating && !0 === d.options.waitForAnimate || !0 === d.options.fade && d.currentSlide === e || d.slideCount <= d.options.slidesToShow ? void 0 : (!1 === t && d.asNavFor(e), o = e, l = d.getLeft(o), r = d.getLeft(d.currentSlide), d.currentLeft = null === d.swipeLeft ? r : d.swipeLeft, !1 === d.options.infinite && !1 === d.options.centerMode && (0 > e || e > d.getDotCount() * d.options.slidesToScroll) ? void(!1 === d.options.fade && (o = d.currentSlide, !0 !== i ? d.animateSlide(r, function() {
                d.postSlide(o)
            }) : d.postSlide(o))) : !1 === d.options.infinite && !0 === d.options.centerMode && (0 > e || e > d.slideCount - d.options.slidesToScroll) ? void(!1 === d.options.fade && (o = d.currentSlide, !0 !== i ? d.animateSlide(r, function() {
                d.postSlide(o)
            }) : d.postSlide(o))) : (d.options.autoplay && clearInterval(d.autoPlayTimer), s = 0 > o ? d.slideCount % d.options.slidesToScroll != 0 ? d.slideCount - d.slideCount % d.options.slidesToScroll : d.slideCount + o : o >= d.slideCount ? d.slideCount % d.options.slidesToScroll != 0 ? 0 : o - d.slideCount : o, d.animating = !0, d.$slider.trigger("beforeChange", [d, d.currentSlide, s]), n = d.currentSlide, d.currentSlide = s, d.setSlideClasses(d.currentSlide), d.options.asNavFor && (a = d.getNavTarget(), a = a.slick("getSlick"), a.slideCount <= a.options.slidesToShow && a.setSlideClasses(d.currentSlide)), d.updateDots(), d.updateArrows(), !0 === d.options.fade ? (!0 !== i ? (d.fadeSlideOut(n), d.fadeSlide(s, function() {
                d.postSlide(s)
            })) : d.postSlide(s), void d.animateHeight()) : void(!0 !== i ? d.animateSlide(l, function() {
                d.postSlide(s)
            }) : d.postSlide(s))))
        }, t.prototype.startLoad = function() {
            var e = this;
            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
        }, t.prototype.swipeDirection = function() {
            var e, t, i, o, s = this;
            return e = s.touchObject.startX - s.touchObject.curX, t = s.touchObject.startY - s.touchObject.curY, i = Math.atan2(t, e), o = Math.round(180 * i / Math.PI), 0 > o && (o = 360 - Math.abs(o)), 45 >= o && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : 360 >= o && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && 225 >= o ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && 135 >= o ? "down" : "up" : "vertical"
        }, t.prototype.swipeEnd = function(e) {
            var t, i, o = this;
            if (o.dragging = !1, o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
            if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
                switch (i = o.swipeDirection()) {
                    case "left":
                    case "down":
                        t = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                        break;
                    case "right":
                    case "up":
                        t = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
                }
                "vertical" != i && (o.slideHandler(t), o.touchObject = {}, o.$slider.trigger("swipe", [o, i]))
            } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
        }, t.prototype.swipeHandler = function(e) {
            var t = this;
            if (!(!1 === t.options.swipe || "ontouchend" in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), e.data.action) {
                case "start":
                    t.swipeStart(e);
                    break;
                case "move":
                    t.swipeMove(e);
                    break;
                case "end":
                    t.swipeEnd(e)
            }
        }, t.prototype.swipeMove = function(e) {
            var t, i, o, s, n, r = this;
            return n = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !(!r.dragging || n && 1 !== n.length) && (t = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== n ? n[0].pageX : e.clientX, r.touchObject.curY = void 0 !== n ? n[0].pageY : e.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), !0 === r.options.verticalSwiping && (r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2)))), i = r.swipeDirection(), "vertical" !== i ? (void 0 !== e.originalEvent && r.touchObject.swipeLength > 4 && e.preventDefault(), s = (!1 === r.options.rtl ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), !0 === r.options.verticalSwiping && (s = r.touchObject.curY > r.touchObject.startY ? 1 : -1), o = r.touchObject.swipeLength, r.touchObject.edgeHit = !1, !1 === r.options.infinite && (0 === r.currentSlide && "right" === i || r.currentSlide >= r.getDotCount() && "left" === i) && (o = r.touchObject.swipeLength * r.options.edgeFriction, r.touchObject.edgeHit = !0), !1 === r.options.vertical ? r.swipeLeft = t + o * s : r.swipeLeft = t + o * (r.$list.height() / r.listWidth) * s, !0 === r.options.verticalSwiping && (r.swipeLeft = t + o * s), !0 !== r.options.fade && !1 !== r.options.touchMove && (!0 === r.animating ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft))) : void 0)
        }, t.prototype.swipeStart = function(e) {
            var t, i = this;
            return i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow ? (i.touchObject = {}, !1) : (void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, void(i.dragging = !0))
        }, t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
            var e = this;
            null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
        }, t.prototype.unload = function() {
            var t = this;
            e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(), t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, t.prototype.unslick = function(e) {
            var t = this;
            t.$slider.trigger("unslick", [t, e]), t.destroy()
        }, t.prototype.updateArrows = function() {
            var e, t = this;
            e = Math.floor(t.options.slidesToShow / 2), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && !t.options.infinite && (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - t.options.slidesToShow && !1 === t.options.centerMode ? (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - 1 && !0 === t.options.centerMode && (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }, t.prototype.updateDots = function() {
            var e = this;
            null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
        }, t.prototype.visibility = function() {
            var e = this;
            e.options.autoplay && (document[e.hidden] ? e.interrupted = !0 : e.interrupted = !1)
        }, e.fn.slick = function() {
            var e, i, o = this,
                s = arguments[0],
                n = Array.prototype.slice.call(arguments, 1),
                r = o.length;
            for (e = 0; r > e; e++)
                if ("object" == typeof s || void 0 === s ? o[e].slick = new t(o[e], s) : i = o[e].slick[s].apply(o[e].slick, n), void 0 !== i) return i;
            return o
        }
}), window.svgeezy = function() {
    return {
        init: function(e, t) {
            this.avoid = e || !1, this.filetype = t || "png", this.svgSupport = this.supportsSvg(), this.svgSupport || (this.images = document.getElementsByTagName("img"), this.imgL = this.images.length, this.fallbacks())
        },
        fallbacks: function() {
            for (; this.imgL--;)
                if (!this.hasClass(this.images[this.imgL], this.avoid) || !this.avoid) {
                    var e = this.images[this.imgL].getAttribute("src");
                    if (null === e) continue;
                    if ("svg" == this.getFileExt(e)) {
                        var t = e.replace(".svg", "." + this.filetype);
                        this.images[this.imgL].setAttribute("src", t)
                    }
                }
        },
        getFileExt: function(e) {
            var t = e.split(".").pop();
            return -1 !== t.indexOf("?") && (t = t.split("?")[0]), t
        },
        hasClass: function(e, t) {
            return (" " + e.className + " ").indexOf(" " + t + " ") > -1
        },
        supportsSvg: function() {
            return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")
        }
    }
}();
var repsol;
$(document).ready(function() {
    function e() {
        this.device = "", this.pageName = "", this.menuClosed = !0
    }

    function t() {
        return $("html, body").animate({
            scrollTop: $("#ez-map").offset().top
        }, "slow"), !1
    }
    e.prototype.init = function() {
        this.mobileSubMenu(this.device), this.mobileMenu(), this.checkViewportWidth(), this.modal(), this.swapVideo(), this.showAssetContent(), this.loadMore(), this.interactiveMapDropdown(), this.svgeezy(), this.toggleSearch()
    }, e.prototype.swapVideo = function() {
        $(".swap-video").click(function() {
            video = '<div class="video-wrapper"><iframe width="752" height="423" src="' + $(this).attr("data-video") + '" frameborder="0" allowfullscreen></iframe></div>', $(this).replaceWith(video), $(".video-wrapper").fitVids()
        })
    }, e.prototype.lazyLoad = function() {
        $(" img.lazy").lazyload({
            skip_invisible: !0,
            threshold: 200,
            effect: "fadeIn"
        })
    }, e.prototype.svgeezy = function() {
        svgeezy.init(!1, "png")
    }, e.prototype.checkViewportWidth = function() {
        var e = function() {
                var e = 0;
                return function(t, i) {
                    clearTimeout(e), e = setTimeout(t, i)
                }
            }(),
            t = 200,
            i;
        if (null == window.webkitConvertPointFromNodeToPage) void 0 === window.innerWidth ? repsol.viewportWidth = document.documentElement.clientWidth : repsol.viewportWidth = window.innerWidth;
        else {
            var o = document.createElement("div");
            o.style.cssText = "width:100% !important; margin:0 !important; padding:0 !important; border:none !important;", document.documentElement.insertBefore(o, document.documentElement.firstChild), i = o.offsetWidth, repsol.viewportWidth = o.offsetWidth, document.documentElement.removeChild(o)
        }
        $(window).resize(function() {
            e(function() {
                var e;
                if (null == window.webkitConvertPointFromNodeToPage) void 0 === window.innerWidth ? repsol.viewportWidth = document.documentElement.clientWidth : repsol.viewportWidth = window.innerWidth;
                else {
                    var t = document.createElement("div");
                    t.style.cssText = "width:100% !important; margin:0 !important; padding:0 !important; border:none !important;", document.documentElement.insertBefore(t, document.documentElement.firstChild), e = t.offsetWidth, repsol.viewportWidth = e, document.documentElement.removeChild(t)
                }
                repsol.setDevice()
            }, 200)
        }), repsol.setDevice()
    }, e.prototype.setDevice = function() {
        this.viewportWidth >= 1050 ? "desktop" == this.device || (this.device = "desktop") : "mobile" == this.device || (this.device = "mobile")
    }, e.prototype.mobileSubMenu = function(e) {
        console.log("mobile Menu loaded"), $(".toggle-dropdown").on("click", function(e) {
            e.preventDefault(), $(this).parent().hasClass("active") ? ($(".toggle-dropdown").parent().removeClass("active"), $(this).parent().removeClass("active")) : ($(".toggle-dropdown").parent().removeClass("active"), $(this).parent().addClass("active"))
        }), $(".main-navigation-wrap").mouseleave(function() {
            $(".with-dropdown").removeClass("active")
        })
    }, e.prototype.interactiveMapDropdown = function() {
        $(".selected-title").on("click", function(e) {
            e.preventDefault(), $(".map-select ul").hasClass("active") ? $(".map-select ul").removeClass("active") : $(".map-select ul").addClass("active"), $(".map-select ul").mouseleave(function() {
                $(".map-select ul").removeClass("active")
            })
        }), $(".map-select ul li a").on("click", function() {
            $(".map-select ul li a").removeClass("active"), $(this).addClass("active"), t()
        })
    }, e.prototype.getPageName = function() {
        return this.pageName = location.pathname.substring(1), this.pageName
    }, e.prototype.modal = function() {
        $(".lightbox-item-text").magnificPopup({
            type: "inline",
            fixedContentPos: !0,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 300,
            mainClass: "my-mfp-zoom-in"
        }), $(".lightbox-item-image").magnificPopup({
            type: "image",
            closeOnContentClick: !0,
            closeBtnInside: !1,
            fixedContentPos: !0,
            mainClass: "mfp-no-margins mfp-with-zoom",
            image: {
                verticalFit: !0
            },
            zoom: {
                enabled: !0,
                duration: 200
            }
        })
    }, e.prototype.loadMore = function() {
        $(".load-more-button").on("click", function() {
            console.log("Load more click."), $getURL = "http://repsol.dev/fetch/", $filters = "", $("select.filter").length ? ($filterText = $("select.filter").val(), isSearchPage = !1) : $(".search-box-field .search-query").length && ($filterText = $(".search-box-field .search-query").val(), isSearchPage = !0), $.ajax({
                type: "GET",
                url: $getURL + lmFetch,
                data: "offset=" + lmOffset + "&limit=" + lmLimit + "&filter=" + $filterText,
                success: function(e) {
                    var t = $(e);
                    if (isSearchPage) {
                        console.log("is search page"), t.appendTo($(".search-results-content"));
                        var i = $(".search-results-content li").length
                    } else {
                        t.insertBefore($(".load-more-button"));
                        var i = $(".listing-news-wrap a").length
                    }
                    console.log(i), lmOffset = i, $(".lm-loading").hide(), $.ajax({
                        type: "GET",
                        url: $getURL + lmFetch,
                        data: "offset=" + lmOffset + "&limit=" + lmLimit + "&filter=" + $filterText + "&nextTotal=true",
                        success: function(e) {
                            0 === parseInt(e) ? $(".load-more-button").fadeOut() : $(".load-more-button").fadeIn()
                        }
                    })
                }
            })
        })
    }, e.prototype.showAssetContent = function(e) {
        $(".asset-content").length && (e || window.location.hash && ($hash = window.location.hash.substring(1), e = $('.asset-content[data-asset-name="' + $hash + '"]').attr("data-asset-id"), console.log("Set assetID to " + e)), e && (console.log("Showing asset " + e + " content."), $(".image-gallery-content.slick-slider").slick("unslick"), $(".asset-content:not('.asset-" + e + "')").hide(), $(".asset-" + e).show(), assetName = $(".asset-" + e).attr("data-asset-name"), window.location.hash = assetName, $(".asset-" + e + " .image-gallery-content").slick({
            dots: !1,
            draggable: !1
        })))
    }, e.prototype.mobileMenu = function() {
        $(".mobile-trigger").on("click", function(e) {
            $(".main-navigation").hasClass("active") ? $(".main-navigation").removeClass("active") : $(".main-navigation").addClass("active"), e.preventDefault()
        })
    }, e.prototype.toggleSearch = function() {
        $(".search-trigger").on("click", function(e) {
            $(".search-box").hasClass("active") ? $(".search-box").removeClass("active") : $(".search-box").addClass("active"), e.preventDefault()
        })
    }, repsol = new e, repsol.init(), navigator.userAgent.match(/Trident.*rv:11\./) && $("html").addClass("ie11")
});