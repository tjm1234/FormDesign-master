define("mobile/enter/app", function(d, l, n) {
    l = Backbone.View.extend({
        initialize: function(c) {
            function a() {
                var b = window.location.href;
                return -1 < b.indexOf("corpId") && -1 < b.indexOf("suiteId") && -1 < b.indexOf("tenantKey") && -1 < b.indexOf("code") && -1 == b.indexOf("ServiceNumber") ? "wechat" : null
            }
            this.homepageUrl = "teamsjs/home/m.homepage" + seajsClip;
            this.taskpageUrl = "teamsjs/task/m.taskpage" + seajsClip;
            this.blogpageUrl = "teamsjs/blog/m.blogpage" + seajsClip;
            this.mainlinepageUrl = "teamsjs/mainline/m.mainlinepage" + seajsClip;
            this.docpageUrl = "teamsjs/doc/m.docpage" + seajsClip;
            this.workreportpageUrl = "teamsjs/workreport/m.workreportpage" + seajsClip;
            this.agendapageUrl = "teamsjs/calendar/m.agendapage" + seajsClip;
            this.dynamicpageUrl = "teamsjs/dynamic/m.dynamicpage" + seajsClip;
            this.globalsearchUrl = "teamsjs/searchall/m.searchallpage" + seajsClip;
            this.tagpageUrl = "teamsjs/tag/m.tagpage" + seajsClip;
            this.formpageUrl = "mobile_compress/form/m.formpage" + seajsClip;
            this.flowpageUrl = "flowjs/workflow/m.flowpage" + seajsClip;
            this.datareportpageUrl = "formreportjs/formdatareport/m.datareportpage" + seajsClip;
            this.attendpageUrl = "teamsjs/timecard/m.attendpage" + seajsClip;
            this.simplepageUrl = "teamsjs/pages/m.simplepage" + seajsClip;
            this.mcpageUrl = "imjs/m.mcpage" + seajsImClip;
            this.freepageUrl = "teamsjs/free/m.freepage" + seajsClip;
            this.subscribeUrl = "teamsjs/subscribe/m.subscribepage" + seajsClip;
            this.windowfunction();
            sessionStorage.getItem("wxLoginInfo") || (c = window.location.search,
            -1 != c.indexOf("agentId") && (c = c.substring(c.indexOf("agentId"), c.length)),
            sessionStorage.setItem("wxLoginInfo", c));
            c = function(b) {
                b = new RegExp("(^|\x26)" + b + "\x3d([^\x26]*)(\x26|$)");
                b = window.location.search.substr(1).match(b);
                return null != b ? unescape(b[2]) : null
            }("oauthType");
            null == c && (c = a());
            window.webapp = null != c ? c : "mobile";
            "Android" == window.platformdevice && $("body").addClass("divice-android");
            "fetion" == TEAMS.runMode && ($("body").attr("third-party", "fetion"),
            window.inFetionClient = !0);
            c = navigator.userAgent.toLowerCase();
            if (-1 != c.indexOf("macintosh") && -1 != c.indexOf("wxwork") || -1 != c.indexOf("windowswechat"))
                window.inWechatClient = !0;
            -1 != c.indexOf("macintosh") && -1 != c.indexOf("wxwork") && (window.inMacClient = !0);
            -1 != c.indexOf("windowswechat") && (window.inWinClient = !0);
            -1 != c.indexOf("android") && -1 != c.indexOf("wxwork") && (window.inAndoridWxClient = !0);
            -1 != c.indexOf("iphone") && -1 != c.indexOf("wxwork") && (window.inIphoneWxClient = !0);
            if (window.inAndoridWxClient || window.inIphoneWxClient)
                window.inMobileWxClient = !0;
            -1 != c.indexOf("wxwork") && (window.inWxMode = !0)
        },
        delegateEvents: function() {
            var c = this;
            $("body").on("tap", ".j_openAppGuide", function(a) {
                a = $("body").find(".j_webappGuide");
                var b = a.data("src");
                a.show("fast");
                a.find("iframe")[0].contentWindow.location.replace(b);
                $("body").addClass("appguide-open")
            });
            $("body").on("click", "a[href][href!\x3d#]", function(a) {
                a = $(this).attr("href");
                var b = c.getEntityItem(a);
                if (b && (a = b.id,
                b = b.module,
                a && b))
                    return c.renderEtInfo(b, a),
                    !1
            });
            $("body").on("tap", ".j_openIMentityEvent", function() {
                var a = $(this).data("imParams");
                ETIM.trigger("entityHandler", a)
            });
            window.closeAPPGuide = function() {
                $("body").find(".j_webappGuide").fadeOut("fast");
                $("body").removeClass("appguide-open")
            }
            ;
            $("body").on("tap", ".j_a-quickmenuOpen", function() {
                $(this).parents(".page-view").find(".quick-menu").slideUp("fast")
            });
            $("body").on("tap", ".j_a-quickmenuClose", function() {
                $(this).parents(".page-view").find(".quick-menu").slideUp("fast")
            });
            $(document).on("touchmove", ".header-fixed", function(a) {
                var b = $(a.target);
                null != b.closest(".header-menu")[0] || null != b.parents(".j_header-fixed_touchable")[0] || b.hasClass("j_header-fixed_touchable") || null != b.parents(".header-menu")[0] || a.preventDefault()
            });
            $("body").on("tap", "i.a-home,a.a-home", function(a) {
                a.preventDefault();
                ROUTER.navigate("/", {
                    trigger: !0
                })
            });
            $("body").on("tap", "i.j_a-back,li.j_a-back,a.j_a-back", function(a) {
                a.preventDefault();
                a.stopPropagation();
                1 >= window.history.length ? ROUTER.navigate("/", {
                    trigger: !0
                }) : window.history.back()
            });
            $(document).on("tap", ".js_mSerchOpen", function() {
                $(this).siblings(".rt-sch-input").addClass("trans-back")
            });
            $(document).find(".dropmenu-box").addClass("dropmenu-off");
            $(document).on("tap", ".dropmenu-link", function(a) {
                a.stopPropagation();
                $(".dropmenu-box").addClass("dropmenu-off");
                $(this).data("link") ? $($(this).data("link")).fadeToggle(300).removeClass("dropmenu-off") : $(this).siblings(".dropmenu-box").fadeToggle(300).removeClass("dropmenu-off");
                $(".dropmenu-off").fadeOut(300)
            });
            $(document).on("keydown", ".placerholder-focus", function(a) {
                a = $(this).attr("data");
                $(this).attr("placeholder") == a && $(this).attr("placeholder", "")
            });
            $(document).on("blur", ".placerholder-focus", function(a) {
                a = $(this).attr("data");
                "" == $(this).attr("placeholder") && $(this).attr("placeholder", a)
            });
            $(document).on("tap", ".dropmenu\x3eli\x3ea", function() {
                var a = $(this).parents(".dropmenu-box")
                  , b = $(this).parents(".dropmenu");
                a.fadeOut(300);
                $(this).parent().addClass("active").siblings().removeClass("active");
                b.hasClass("dropmenu-gettext") && (b = $(this).text() + '\x3ci class\x3d"ico-drop"\x3e\x3c/i\x3e',
                a.prev(".dropmenu-link").html(b))
            });
            $(document).find(".header-menu-toggle").data("timer", null);
            $(document).on("tap", ".header-menu-toggle", function(a) {
                var b = $(this), e, c;
                e = b.data("link") ? $(b.data("link")) : b.parents("header").find(".header-menu");
                if (null != e.get(0)) {
                    b.data("timer") && (c = b.data("timer"),
                    clearTimeout(c),
                    b.removeData("timer"));
                    if (e.is(":hidden")) {
                        $(".header-menu").hide().removeClass("open").find("ul").slideDown(300);
                        e.show();
                        c = setTimeout(function() {
                            e.addClass("open");
                            e.find("ul").slideDown(300);
                            b.addClass("on")
                        }, 100);
                        var d = $(document).scrollTop();
                        $("body").css({
                            position: "fixed",
                            left: "0px",
                            right: "0px",
                            top: "-" + d + "px",
                            bottom: "0px"
                        })
                    } else
                        e.removeClass("open"),
                        e.find("ul").slideUp(300),
                        c = setTimeout(function() {
                            e.hide();
                            b.removeClass("on")
                        }, 300),
                        $("body").removeAttr("style");
                    b.data("timer", c);
                    a.stopPropagation()
                }
            });
            $(document).on("tap", ".header-menu .mask,.header-menu li", function(a) {
                var b = $("header .header-menu-toggle"), e = b.parents("header").find(".header-menu"), c;
                b.data("timer") && (clearTimeout(c),
                b.removeData("timer"));
                e.removeClass("open");
                e.find("ul").slideDown();
                c = setTimeout(function() {
                    e.hide();
                    b.removeClass("on")
                }, 300);
                b.data("timer", c);
                $("body").removeAttr("style")
            });
            $("body").on("tap", ".j_header-panel-toggle", function(a) {
                a.stopPropagation();
                var b = $(this).data("link") ? $($(this).data("link")) : $("header .header-panel-slider");
                b.hasClass("open") ? (b.removeClass("open"),
                setTimeout(function() {
                    b.addClass("hide")
                }, 250)) : (b.removeClass("hide"),
                setTimeout(function() {
                    b.addClass("open")
                }, 10))
            });
            $("body").on("tap", ".j_header-panel-close, .header-panel-slider .mask", function() {
                var a = $(this).data("link") ? $(this).data("link") : $(this).parents(".header-panel-slider").get(0);
                $("body").trigger("closeTopSlider", a)
            });
            $("body").on("closeTopSlider", function(a, b, e) {
                var c = $(b);
                c.removeClass("open");
                setTimeout(function() {
                    c.addClass("hide");
                    e && e()
                }, 250)
            });
            $(document).on("tap", ".js_actionsheet_toggle", function(a) {
                $(this).hasClass("readonly") || (a = $(this).parents(".j_page-view").find(".action-sheet-wrap"),
                a.hasClass("open") || ($(this).attr("name") && a.find(".action-sheet-menu").attr("name", $(this).attr("name")),
                $(this).attr("type") && a.find('.action-sheet-menu li[type\x3d"' + $(this).attr("type") + '"]').addClass("active").siblings().removeClass("active"),
                a.find(".mask").fadeIn("fast"),
                a.addClass("open")))
            });
            $(document).on("tap", ".action-sheet-wrap .js_closesheet,.action-sheet-wrap .mask,.action-sheet-menu li", function(a) {
                $(this).parents(".action-sheet-wrap").removeClass("open").find(".mask").fadeOut("fast")
            });
            $(document).on("tap", ".js_infoactionsheet_toggle", function(a) {
                a = 0 != $(this).parents(".j_page-view").size ? $(this).parents(".j_page-view").find(".foot-actionsheet") : $("body").find(".foot-actionsheet");
                a.hasClass("open") || (a.find(".mask").fadeIn("fast"),
                a.addClass("open"))
            });
            $(document).on("tap", ".foot-actionsheet .js_closesheet,.foot-actionsheet .mask,.foot-actionsheet .menu-item", function(a) {
                $(this).parents(".foot-actionsheet").removeClass("open").find(".mask").fadeOut("fast")
            });
            c.bindSidePaneSwip = function() {
                $(document).on("swiperight.sidePane", ".j_sidePanelSlider", function(a) {
                    if ($(this).hasClass("open")) {
                        $(this).removeClass("open");
                        $(document).find(".page-view").removeClass("page-side-open");
                        $(document).find(".page-view").css({
                            "-webkit-transform": "none",
                            transform: "none"
                        });
                        var b = $(this);
                        $("body").find(".mask-slidermask").fadeOut("fast", function() {
                            $("body").find(".mask-slidermask").remove()
                        });
                        setTimeout(function() {
                            b.addClass("hide")
                        }, 250);
                        $(document).off("swiperight.sidePane")
                    }
                })
            }
            ;
            $(document).on("tap", ".j_sidePanelSlider-toggle", function(a) {
                window.dropdownlist && window.dropdownlist.lock("down");
                c.bindSidePaneSwip();
                var b = $($(this).data("link"));
                b.hasClass("open") || (b.removeClass("hide"),
                setTimeout(function() {
                    b.addClass("open");
                    b.after('\x3cdiv class\x3d"mask mask-slidermask hide" style\x3d"z-index:999;"\x3e\x3c/div\x3e');
                    $("body").find(".mask-slidermask").fadeIn("fast");
                    b.parents(".page-view").addClass("page-side-open")
                }, 0))
            });
            $(document).on("tap", ".j_viewStatus", function(a) {
                c.bindSidePaneSwip();
                var b = $($(this).data("link"));
                b.hasClass("open") || (b.removeClass("hide"),
                setTimeout(function() {
                    b.addClass("open");
                    b.after('\x3cdiv class\x3d"mask mask-slidermask hide" style\x3d"z-index:999;"\x3e\x3c/div\x3e');
                    $("body").find(".mask-slidermask").fadeIn("fast");
                    b.parents(".page-view").addClass("page-side-open")
                }, 0))
            });
            $("body").on("tap", ".j_sidePanelSlider", function(a) {
                if ($(a.target).hasClass("j_sidePanelSlider")) {
                    $(this).removeClass("open");
                    $(document).find(".page-view").removeClass("page-side-open");
                    $(document).find(".page-view").css({
                        "-webkit-transform": "none",
                        transform: "none"
                    });
                    var b = $(this);
                    window.dropdownlist && window.dropdownlist.unlock();
                    $("body").find(".mask-slidermask").fadeOut("fast", function() {
                        $("body").find(".mask-slidermask").remove()
                    });
                    setTimeout(function() {
                        b.addClass("hide");
                        $(document).off("swiperight.sidePane")
                    }, 250)
                }
            });
            $(document).on("tap", ".j_closeSidePanel,.order-list:not(.j_infilter) a:not(.j_except),.mask", function(a) {
                if ($(this).parents(".j_sidePanelSlider")) {
                    $(this).parents(".j_sidePanelSlider").removeClass("open");
                    $(document).find(".page-view").removeClass("page-side-open");
                    $(document).find(".page-view").css({
                        "-webkit-transform": "none",
                        transform: "none"
                    });
                    var b = $(this);
                    window.dropdownlist && window.dropdownlist.unlock();
                    $("body").find(".mask-slidermask").fadeOut("fast", function() {
                        $("body").find(".mask-slidermask").remove()
                    });
                    setTimeout(function() {
                        b.parents(".j_sidePanelSlider").addClass("hide");
                        $(document).off("swiperight.sidePane")
                    }, 250)
                }
            });
            $(document).on("openSlider", function(a, b) {
                window.dropdownlist && window.dropdownlist.lock("down");
                b ? ($(document).find(b).removeClass("hide"),
                setTimeout(function() {
                    $(document).find(b).addClass("open");
                    $(b).parents(".page-view").addClass("page-side-open");
                    "#formstatdatafilter" == b && $("body").find("#formstat-datatable").addClass("page-side-open");
                    $(document).find(b).after('\x3cdiv class\x3d"mask mask-slidermask hide" style\x3d"z-index:999;"\x3e\x3c/div\x3e');
                    $("body").find(".mask-slidermask").fadeIn("fast")
                }, 0)) : ($(document).find(".page-view").addClass("page-side-open"),
                $(document).find(".j_sidePanelSlider").removeClass("hide").addClass("open"),
                $(document).find(".j_sidePanelSlider").after('\x3cdiv class\x3d"mask mask-slidermask hide" style\x3d"z-index:999;"\x3e\x3c/div\x3e'),
                $("body").find(".mask-slidermask").fadeIn("fast"));
                c.bindSidePaneSwip()
            });
            $(document).on("closeSlider", function(a, b) {
                b ? ($(document).find(b).removeClass("open"),
                $(b).parents(".page-view").css({
                    "-webkit-transform": "none",
                    transform: "none"
                }),
                $(b).parents(".page-view").removeClass("page-side-open"),
                setTimeout(function() {
                    $(document).find(b).addClass("hide")
                }, 250)) : ($(document).find(".page-view").css({
                    "-webkit-transform": "none",
                    transform: "none"
                }),
                $(document).find(".page-view").removeClass("page-side-open"),
                $(document).find(".j_sidePanelSlider").removeClass("open"),
                setTimeout(function() {
                    $(document).find(".j_sidePanelSlider").addClass("hide")
                }, 250));
                $("body").find(".mask-slidermask").fadeOut("fast", function() {
                    $("body").find(".mask-slidermask").remove()
                });
                $(document).off("swiperight.sidePane");
                window.dropdownlist && window.dropdownlist.unlock()
            });
            $(document).on("tap", "body", function(a) {
                a = $(a.target);
                0 != a.closest(".dropmenu-box").length || a.hasClass("dropmenu-link") || $(".dropmenu-box").fadeOut(200)
            });
            $("body").on("tap", "#appPayRemind .close", function() {
                $("#appPayRemind").fadeOut("fast")
            });
            $("body").on("click", ".js_openList", function(a) {
                $(this).data("open") ? ($(this).next(".j_info-list").slideUp(200),
                $(this).find(".j_r-link").html('\u5c55\u5f00  \x3ci class\x3d"icon-arrow-down"\x3e\x3c/i\x3e'),
                $(this).data("open", !1)) : ($(this).next(".j_info-list").slideDown(200),
                $(this).find(".j_r-link").html('\u6536\u7f29  \x3ci class\x3d"icon-arrow-up"\x3e\x3c/i\x3e'),
                $(this).data("open", !0))
            });
            $("body").on("tap", ".employee-info", function(a) {
                a = $(this).attr("data-userId");
                ROUTER.navigate("/mobile/employee/info/" + a, {
                    trigger: !0
                })
            });
            $("body").on("tap", ".confirm-flow-btn", function(a) {
                var b = $(this).attr("confirm-context-title")
                  , e = $(this).attr("confirm-context")
                  , c = $(this).attr("confirm-data-type")
                  , f = $(this).attr("confirm-placeholder")
                  , h = $(this);
                d.async("flowjs/workflow/common/confirmview" + seajsClip, function(a) {
                    (new a({
                        title: b,
                        context: e,
                        dataType: c,
                        placeholder: f,
                        thisEl: h
                    })).requireRender()
                })
            });
            $("body").on("click", ".entity-seleted", function(a) {
                var b = $(this).attr("data-module")
                  , e = $(this).attr("data-shareType")
                  , c = $(this).attr("data-targetId")
                  , f = $(this).attr("data-multi")
                  , h = $(this).attr("data-rtnAvatar")
                  , k = $(this).attr("data-noempty") && "true" == $(this).attr("data-noempty") ? !0 : !1;
                a = $(this).parents(".j_page-view");
                var m = $(this).attr("data-title")
                  , n = a.attr("id")
                  , p = $(this)
                  , l = $(this).attr("permission")
                  , s = $(this).data("rangeIds");
                "task" == b && "shareOther" == $(this).attr("id") && (p = $("#share"));
                this.employeeseleted && (this.employeeseleted.remove(),
                this.employeeseleted = null);
                var q = this;
                d.async("teamsjs/component/userselector" + seajsClip, function() {
                    q.employeeseleted = new window.UserSelector({
                        el: p,
                        targetId: c,
                        shareType: e,
                        module: b,
                        multi: f,
                        platform: window.webapp,
                        preEl: "#" + n,
                        noempty: k,
                        permission: l,
                        title: m,
                        rtnAvatar: h,
                        rangeIds: s
                    });
                    q.employeeseleted.requireRender()
                });
                "ding" == window.webapp ? (window.dingUsers = "participants" == e && null != window.dingPartis ? window.dingPartis : "sharer" == e && null != window.dingShares ? window.dingShares : [],
                dd.ready(function() {
                    dd.biz.contact.choose({
                        startWithDepartmentId: 0,
                        multiple: f,
                        users: window.dingUsers,
                        corpId: _config.corpId,
                        max: 1500,
                        onSuccess: function(b) {
                            var a = [], c, g = [], d = window.dingUserIdEmp;
                            if (d && d.result && 0 < d.result.length) {
                                for (var d = d.result, h = 0; h < b.length; h++) {
                                    for (var k = 0; k < d.length; k++) {
                                        var m = d[k];
                                        if (m.dingUserId == b[h].emplId) {
                                            0 != f && "false" != f ? a.push(m) : c = m;
                                            break
                                        }
                                    }
                                    g.push(b[h].emplId)
                                }
                                "participants" == e ? window.dingPartis = g : "sharer" == e && (window.dingShares = g);
                                0 != f && "false" != f ? p.trigger("employeeComfirm", {
                                    objs: a
                                }) : p.trigger("employeeComfirm", {
                                    objs: c
                                })
                            }
                        },
                        onFail: function(b) {
                            JSON.stringify(b)
                        }
                    })
                })) : (a.addClass("hide"),
                $("#employee-seleted").removeClass("hide"))
            });
            $("body").on("click", ".hr-entity-seleted", function(a) {
                if ($(this).attr("disabled"))
                    utils.notify("\u6ca1\u6709\u6743\u9650");
                else {
                    a = $(this);
                    var b = a.attr("data-module");
                    "flowpermissions" == b && (a = a.find(".j_selected"));
                    var e = a.attr("data-shareType");
                    a.attr("data-targetId");
                    var g = a.attr("data-multi")
                      , f = a.parents(".j_page-view");
                    a.attr("data-title");
                    var h = a.data("menus")
                      , k = f.attr("id")
                      , m = a
                      , n = a.attr("permission");
                    c.hrselector && (c.hrselector.remove(),
                    c.hrselector = null);
                    d.async("teamsjs/component/hrselector" + seajsClip, function() {
                        c.hrselector = new window.HRSelector({
                            el: m,
                            shareType: e,
                            module: b,
                            multi: g,
                            preEl: "#" + k,
                            noempty: !1,
                            permission: n,
                            menus: h
                        });
                        c.hrselector.render();
                        "ding" == window.webapp ? (window.dingUsers = [],
                        dd.ready(function() {
                            dd.biz.contact.choose({
                                startWithDepartmentId: 0,
                                multiple: g,
                                users: window.dingUsers,
                                corpId: _config.corpId,
                                max: 1500,
                                onSuccess: function(b) {
                                    var a = [], e, c = [], d = window.dingUserIdEmp;
                                    if (d && d.result && 0 < d.result.length) {
                                        for (var d = d.result, f = 0; f < b.length; f++) {
                                            for (var h = 0; h < d.length; h++) {
                                                var k = d[h];
                                                if (k.dingUserId == b[f].emplId) {
                                                    0 != g && "false" != g ? a.push(k) : e = k;
                                                    break
                                                }
                                            }
                                            c.push(b[f].emplId)
                                        }
                                        0 != g && "false" != g ? m.trigger("employeeComfirm", {
                                            objs: a
                                        }) : m.trigger("employeeComfirm", {
                                            objs: e
                                        })
                                    }
                                },
                                onFail: function(b) {
                                    JSON.stringify(b)
                                }
                            })
                        })) : (f.addClass("hide"),
                        $("#employee-seleted").removeClass("hide"))
                    })
                }
            });
            $("body").on("tap", ".insideCollect-department-select", function(a) {
                if ($(this).attr("disabled"))
                    utils.notify("\u6ca1\u6709\u6743\u9650");
                else {
                    var b = $(this).attr("data-multi")
                      , e = $(this).attr("data-hasUrl")
                      , c = $(this).parents(".j_page-view")
                      , f = c.attr("id")
                      , h = $(this);
                    this.departmentseleted && (this.departmentseleted.remove(),
                    this.departmentseleted = null);
                    var k = this;
                    d.async("teamsjs/component/departmentselector" + seajsClip, function() {
                        k.departmentseleted = new window.DepartmentSelector({
                            el: h,
                            multi: b,
                            hasUrl: e,
                            preEl: "#" + f
                        });
                        k.departmentseleted.render();
                        c.addClass("hide");
                        $("#department-component").removeClass("hide")
                    })
                }
            });
            $("body").off("click", ".share-join").on("click", ".share-join", function() {
                var a = $(this).attr("entityId")
                  , b = $(this).attr("module");
                $.ajax({
                    type: "post",
                    dataType: "json",
                    data: {
                        entityId: a,
                        module: b
                    },
                    url: "/app/blog-message/shareApply.json",
                    success: function(b) {
                        utils.notify("\u5171\u4eab\u7533\u8bf7\u5df2\u53d1\u9001")
                    }
                })
            });
            $("body").on("tap", ".department-seleted", function(a) {
                if ($(this).attr("disabled"))
                    utils.notify("\u6ca1\u6709\u6743\u9650");
                else {
                    var b = $(this).attr("data-multi")
                      , e = $(this).attr("data-hasUrl")
                      , c = $(this).parents(".j_page-view")
                      , f = c.attr("id")
                      , h = $(this);
                    this.departmentseleted && (this.departmentseleted.remove(),
                    this.departmentseleted = null);
                    var k = this;
                    d.async("teamsjs/component/departmentselector" + seajsClip, function() {
                        k.departmentseleted = new window.DepartmentSelector({
                            el: h,
                            multi: b,
                            hasUrl: e,
                            noRouter: !0,
                            preEl: "#" + f
                        });
                        k.departmentseleted.render();
                        c.addClass("hide");
                        $("#department-component").removeClass("hide")
                    })
                }
            });
            $("body").on("tap", ".position-seleted", function(a) {
                if ($(this).attr("disabled"))
                    utils.notify("\u6ca1\u6709\u6743\u9650");
                else {
                    var b = $(this).attr("data-multi")
                      , e = $(this).attr("data-hasUrl")
                      , c = $(this).parents(".j_page-view")
                      , f = c.attr("id")
                      , h = $(this);
                    this.positionseleted && (this.positionseleted.remove(),
                    this.positionseleted = null);
                    var k = this;
                    d.async("teamsjs/component/positionselector" + seajsClip, function() {
                        k.positionseleted = new window.PositionSelector({
                            el: h,
                            multi: b,
                            hasUrl: e,
                            preEl: "#" + f
                        });
                        k.positionseleted.render();
                        c.addClass("hide");
                        $("#position-component").removeClass("hide")
                    })
                }
            });
            $("body").on("tap", ".date-selected", function(a) {
                if ($(this).attr("disabled"))
                    utils.notify("\u6ca1\u6709\u6743\u9650");
                else {
                    var b = $(this)
                      , e = $(this).parents(".j_page-view")
                      , g = $(this).attr("format")
                      , f = $(this).attr("minview")
                      , h = $(this).attr("startview")
                      , k = $(this).attr("startdate")
                      , m = $(this).attr("enddate")
                      , n = $(this).attr("todayBtn")
                      , l = e.attr("id");
                    this.dateseleted && (this.dateseleted.remove(),
                    this.dateseleted = null);
                    var r = $(this).attr("initialDate");
                    d.async("teamsjs/component/datetimepicker" + seajsClip, function(a) {
                        c.dateseleted = new a({
                            el: b,
                            format: g,
                            minView: f,
                            startView: h,
                            startDate: k,
                            endDate: m,
                            todayBtn: !!n,
                            preEl: "#" + l,
                            initialDate: r
                        });
                        c.dateseleted.render();
                        e.addClass("hide")
                    })
                }
            });
            $("body").on("tap", ".j_filter", function(a) {
                var b = $(this).attr("data-caption")
                  , e = "#" + $(this).parents(".j_page-view").attr("id")
                  , c = $(this).attr("module")
                  , f = "#" + $(this).attr("id")
                  , h = $(this).attr("data-type") || null
                  , k = !1
                  , m = $(this).attr("data-sex") || "\u6211";
                $(this).hasClass("j_wrs") && (k = !0);
                var n = $(this);
                if (this.filter)
                    $(document).trigger("openSlider", "#filter");
                else {
                    var l = this;
                    d.async("teamsjs/component/filter" + seajsClip, function(a) {
                        l.filter = new a({
                            button: n,
                            caption: b,
                            oriType: h,
                            sex: m,
                            module: c,
                            el: f,
                            preEl: e,
                            wrFlag: k
                        });
                        l.filter.render()
                    })
                }
            });
            $("body").on("tap", ".j_change-password", function(a) {
                c.passwordview && (c.passwordview.remove(),
                c.passwordview = null);
                var b = $(this);
                d.async("teamsjs/user/passwordset" + seajsClip, function(a) {
                    c.passwordview = new a({
                        userId: b.attr("data-userId"),
                        type: b.attr("data-type"),
                        preEl: b.parents(".j_page-view")
                    });
                    c.passwordview.render()
                })
            });
            $("body").on("tap", ".j_change-avatar", function(a) {
                c.avatarview && (c.avatarview.remove(),
                c.avatarview = null);
                var b = $(this);
                d.async("teamsjs/user/avatarset" + seajsClip, function(a) {
                    c.avatarview = new a({
                        el: "#" + b.parents(".j_page-view").attr("id")
                    });
                    c.avatarview.render()
                })
            });
            $("body").on("tap", ".j_invite", function(a) {
                ROUTER.navigate("/mobile/invite", {
                    trigger: !0
                })
            })
        },
        render: function(c, a) {
            this.crmApp && this.crmApp.lastPage && (this.crmApp.lastPage.remove(),
            this.lastPage = this.crmApp.lastPage = null);
            this.smsApp && this.smsApp.lastPage && (this.smsApp.lastPage.remove(),
            this.lastPage = this.smsApp.lastPage = null);
            this.hrApp && this.hrApp.lastPage && (this.hrApp.lastPage.remove(),
            this.lastPage = this.hrApp.lastPage = null);
            this.portalApp && this.portalApp.lastPage && (this.portalApp.lastPage.remove(),
            this.lastPage = this.portalApp.lastPage = null);
            null == this.lastPage ? (this.lastPage = c,
            c.render()) : this.lastPage.pageKey != c.pageKey || a ? (this.lastPage.remove ? this.lastPage.remove() : this.lastPage.mainView && this.lastPage.mainView.remove(),
            this.lastPage = c,
            this.lastPage.render()) : this.update(c)
        },
        update: function(c) {
            this.lastPage.initialize(c);
            c.remove()
        },
        showSmsMobile: function(c) {
            var a = this;
            d.async(["smsjs/SmsApp" + seajsClip, "smsjs/SmsUtils" + seajsClip], function(b, e) {
                window.SmsUtils || (window.SmsUtils = e);
                a.smsApp || (a.smsApp = new b);
                a.smsApp.showPage(c, a)
            })
        },
        showCrmMobile: function(c) {
            var a = this;
            d.async(["crmjs/CrmApp" + seajsClip, "crmjs/CrmUtils" + seajsClip, "crmjs/CityUtils" + seajsClip], function(b, e, g) {
                window.CrmUtils || (window.CrmUtils = e);
                window.CityUtils || (window.CityUtils = g);
                a.crmApp || (a.crmApp = new b);
                a.crmApp.showPage(c, a)
            })
        },
        showPaasMobile: function(c, a) {
            var b = this;
            d.async(["paasjs/PaasApp" + seajsClip, "paasjs/PaasUtils" + seajsClip], function(e, g) {
                window.PaasUtils || (window.PaasUtils = g);
                b.paasApp || (b.paasApp = new e);
                b.paasApp.showPage(c, a, b)
            })
        },
        showCustomPage: function(c) {
            d.async(["portaljs/PortalUtils" + seajsClip, "portaljs/element/ElementUtils" + seajsClip, "portaljs/page/PageGroup" + seajsClip], function(a, b, e) {
                window.PortalUtils || (window.PortalUtils = a);
                window.ElementUtils || (window.ElementUtils = b);
                (new e({
                    el: $("body"),
                    pageGroupId: c
                })).render()
            })
        },
        showPortalMobile: function(c, a) {
            var b = this;
            d.async(["portaljs/PortalApp" + seajsClip, "portaljs/PortalUtils" + seajsClip, "portaljs/element/ElementUtils" + seajsClip], function(e, g, d) {
                window.PortalUtils || (window.PortalUtils = g);
                window.ElementUtils || (window.ElementUtils = d);
                b.portalApp || (b.portalApp = new e);
                b.portalApp.showPage(c, a, b)
            })
        },
        showHrMobile: function(c) {
            var a = this;
            d.async(["hrjs/HrApp" + seajsClip, "hrjs/HrUtils" + seajsClip], function(b, e) {
                window.HrUtils || (window.HrUtils = e);
                a.hrApp || (a.hrApp = new b);
                a.hrApp.showPage(c, a)
            })
        },
        renderHome: function(c) {
            var a = this;
            d.async(this.homepageUrl, function(b) {
                b = new b({
                    pageKey: "home",
                    module: c
                });
                a.render(b)
            })
        },
        renderSalary: function() {
            var c = this;
            d.async(this.simplepageUrl, function(a) {
                a = new a({
                    pageKey: "salaryview"
                });
                c.render(a)
            })
        },
        renderTasks: function(c) {
            var a = this;
            d.async(this.taskpageUrl, function(b) {
                b = new b({
                    pageKey: "mytask",
                    userId: c,
                    type: "mine"
                });
                a.render(b)
            })
        },
        renderTaskByType: function(c, a) {
            var b = this;
            d.async(this.taskpageUrl, function(e) {
                e = new e({
                    pageKey: "task-" + a,
                    userId: c,
                    type: a
                });
                b.render(e)
            })
        },
        renderTask: function(c, a) {
            var b = this;
            d.async(this.taskpageUrl, function(e) {
                e = new e({
                    pageKey: "taskinfo",
                    id: c,
                    pid: a
                });
                b.render(e, !0)
            })
        },
        renderTaskSearch: function(c) {
            var a = this;
            d.async(this.taskpageUrl, function(b) {
                b = new b({
                    pageKey: "tasksearch",
                    keyword: c
                });
                a.render(b)
            })
        },
        renderSubtasks: function(c) {
            var a = this;
            d.async(this.taskpageUrl, function(b) {
                b = new b({
                    pageKey: "subtask",
                    pid: c
                });
                a.render(b)
            })
        },
        renderSubtaskWeight: function(c, a) {
            var b = this;
            d.async(this.taskpageUrl, function(e) {
                e = new e({
                    pageKey: "subtaskweight",
                    id: c,
                    pid: a
                });
                b.render(e)
            })
        },
        renderTaskAdd: function(c, a) {
            var b = this;
            d.async(this.taskpageUrl, function(e) {
                var g = {
                    pageKey: "taskadd",
                    group: c,
                    pid: a,
                    isurl: !0
                };
                sessionStorage.getItem("taskaddInfo") && (g = JSON.parse(sessionStorage.getItem("taskaddInfo")),
                g = $.extend({}, g, {
                    pageKey: "taskadd",
                    isurl: !0
                }));
                e = new e(g);
                b.render(e)
            })
        },
        renderEtInfo: function(c, a) {
            if (-1 == $.inArray(c, ["task", "mainline"]))
                return !0;
            "task" == c ? this.renderTask(a) : "mainline" == c && this.renderMainlineInfo(a);
            "mobile" == window.webapp && /(Android)/i.test(navigator.userAgent) && (window.location.href = "smartheer://smartheer.com/detail/" + c + "?id\x3d" + a)
        },
        renderBlog: function(c, a) {
            var b = this;
            d.async(this.blogpageUrl, function(e) {
                e = new e({
                    pageKey: "blog-" + a,
                    userId: c,
                    type: a
                });
                b.render(e)
            })
        },
        renderBlogInfoId: function(c) {
            var a = this;
            d.async(this.blogpageUrl, function(b) {
                b = new b({
                    pageKey: "bloginfoid",
                    id: c
                });
                a.render(b)
            })
        },
        renderBlogInfo: function(c, a) {
            var b = this;
            this.lastPage = null;
            d.async(this.blogpageUrl, function(e) {
                e = new e({
                    pageKey: "bloginfo",
                    userId: c,
                    date: a
                });
                b.render(e)
            })
        },
        renderBlogInfo: function(c, a, b) {
            var e = this;
            this.lastPage = null;
            d.async(this.blogpageUrl, function(g) {
                g = new g({
                    pageKey: "bloginfo",
                    userId: c,
                    date: a,
                    type: b
                });
                e.render(g)
            })
        },
        renderBlogAdd: function() {
            var c = this;
            d.async(this.blogpageUrl, function(a) {
                a = new a({
                    pageKey: "blogadd",
                    urlAdd: !0
                });
                c.render(a)
            })
        },
        renderReportBlog: function() {
            var c = this;
            d.async(this.blogpageUrl, function(a) {
                a = new a({
                    pageKey: "blogreport"
                });
                c.render(a)
            })
        },
        renderMainline: function(c, a) {
            var b = this;
            d.async(this.mainlinepageUrl, function(e) {
                e = new e({
                    pageKey: "mainlines-" + a,
                    userId: c,
                    type: a
                });
                b.render(e, !0)
            })
        },
        renderMainlineSearch: function(c) {
            var a = this;
            d.async(this.mainlinepageUrl, function(b) {
                b = new b({
                    pageKey: "mainlinesearch",
                    keywords: c,
                    keysearch: !0
                });
                a.render(b)
            })
        },
        renderMainlineCover: function(c, a) {
            var b = this;
            d.async(this.mainlinepageUrl, function(e) {
                e = new e({
                    pageKey: "mainlinecover",
                    id: c,
                    mainlineType: a
                });
                b.render(e, !0)
            })
        },
        renderMainlineDynamic: function(c) {
            var a = this;
            d.async(this.mainlinepageUrl, function(b) {
                b = new b({
                    pageKey: "mainlinedynamic",
                    userId: TEAMS.currentUser.id,
                    id: c
                });
                a.render(b)
            })
        },
        renderMainlineAdd: function() {
            var c = this;
            d.async(this.mainlinepageUrl, function(a) {
                a = new a({
                    pageKey: "mainlineadd",
                    urlAdd: !0
                });
                c.render(a)
            })
        },
        renderMainlineCategory: function() {
            var c = this;
            d.async(this.mainlinepageUrl, function(a) {
                a = new a({
                    pageKey: "mainlinecategory"
                });
                c.render(a)
            })
        },
        renderMainlineNew: function(c) {
            var a = this;
            d.async(this.mainlinepageUrl, function(b) {
                b = new b({
                    pageKey: "mainlinenew",
                    id: c
                });
                a.render(b)
            })
        },
        renderMainlineReport: function(c) {
            var a = this;
            d.async(this.mainlinepageUrl, function(b) {
                b = new b({
                    pageKey: "mainlineReport",
                    id: c
                });
                a.render(b)
            })
        },
        renderMainlineReportComp: function(c, a) {
            var b = this;
            d.async(this.mainlinepageUrl, function(e) {
                e = new e({
                    pageKey: "mainlineReportComp",
                    id: c,
                    type: a
                });
                b.render(e)
            })
        },
        renderMainlineReportCompDetail: function(c, a, b) {
            var e = this;
            d.async(this.mainlinepageUrl, function(g) {
                g = new g({
                    pageKey: "mainlineReportCompDetail",
                    type: a,
                    reportId: b,
                    reportType: c
                });
                e.render(g)
            })
        },
        renderMainlineReportPlan: function(c) {
            var a = this;
            d.async(this.mainlinepageUrl, function(b) {
                b = new b({
                    pageKey: "mainlineReportPlan",
                    id: c
                });
                a.render(b)
            })
        },
        renderMainlineReportPlanDetail: function(c, a) {
            var b = this;
            d.async(this.mainlinepageUrl, function(e) {
                e = new e({
                    pageKey: "mainlineReportPlanDetail",
                    id: c,
                    reportId: a
                });
                b.render(e)
            })
        },
        renderMainlineInfo: function(c) {
            var a = this;
            d.async(this.mainlinepageUrl, function(b) {
                b = new b({
                    pageKey: "mainlineinfo",
                    id: c
                });
                a.render(b)
            })
        },
        renderMainlineLink: function(c, a) {
            var b = this;
            d.async(this.mainlinepageUrl, function(e) {
                e = new e({
                    pageKey: "mainlinelink-" + a,
                    id: c,
                    module: a
                });
                b.render(e)
            })
        },
        renderMainlineLinkSearch: function(c, a) {
            var b = this;
            d.async(this.mainlinepageUrl, function(e) {
                e = new e({
                    pageKey: "mainlinelinksearch-" + a,
                    mainlineId: c,
                    module: a
                });
                b.render(e)
            })
        },
        renderMainlineLinkPermission: function(c, a, b) {
            var e = this;
            d.async(this.mainlinepageUrl, function(g) {
                g = new g({
                    pageKey: "mainlinelink-" + a,
                    id: c,
                    permission: b,
                    module: a
                });
                e.render(g)
            })
        },
        renderDocuments: function(c, a, b, e) {
            var g = this;
            d.async(this.docpageUrl, function(d) {
                d = new d({
                    pageKey: "doclist-" + a,
                    userId: c,
                    type: a,
                    folderId: b,
                    folderType: e
                });
                g.render(d, !0)
            })
        },
        renderDocument: function(c, a) {
            var b = this;
            d.async(this.docpageUrl, function(e) {
                e = new e({
                    pageKey: "docinfo",
                    userId: c,
                    id: a
                });
                b.render(e)
            })
        },
        renderDocSearch: function(c) {
            var a = this;
            d.async(this.docpageUrl, function(b) {
                b = new b({
                    pageKey: "docsearch",
                    keywords: c
                });
                a.render(b)
            })
        },
        renderDocNew: function(c) {
            var a = this;
            d.async(this.docpageUrl, function(b) {
                b = new b({
                    pageKey: "docadd",
                    folderId: c.folderId,
                    isUrl: !0,
                    wechat: !0
                });
                a.render(b)
            })
        },
        renderWorkreport: function(c, a, b, e, g) {
            var f = this;
            d.async(this.workreportpageUrl, function(d) {
                d = new d({
                    pageKey: "workreportpage-" + b,
                    userId: c,
                    year: a,
                    type: b,
                    sn: e,
                    cate: g
                });
                f.render(d, !0)
            })
        },
        renderNewWorkreport: function(c, a, b, e, g, f) {
            var h = this;
            "oldwechatnew" == f && (b = Date.create(TEAMS.nowTime).getUTCFullYear(),
            "week" == e ? g = utils.getIsoWeekOfYear(TEAMS.nowTime) : "month" == e && (g = (new Date(TEAMS.nowTime)).getMonth() + 1));
            d.async(this.workreportpageUrl, function(a) {
                a = new a({
                    pageKey: "addnewworkreport",
                    id: c,
                    year: b,
                    type: e,
                    sn: g,
                    cate: f
                });
                h.render(a, !0)
            })
        },
        renderAddNewWorkreport: function(c, a, b, e, g) {
            var f = this;
            d.async(this.workreportpageUrl, function(d) {
                d = new d({
                    pageKey: "addnewworkreport",
                    id: c,
                    year: a,
                    type: b,
                    sn: e,
                    cate: g
                });
                f.render(d, !0)
            })
        },
        renderWorkreportInfo: function(c, a) {
            var b = this;
            d.async(this.workreportpageUrl, function(e) {
                e = new e({
                    pageKey: "workreportinfo",
                    id: c,
                    userId: a,
                    cate: "info"
                });
                b.render(e)
            })
        },
        renderWeeklyBlog: function(c, a) {
            var b = this;
            d.async(this.blogpageUrl + seajsClip, function(e) {
                e = new e({
                    pageKey: "weeklyblog",
                    userId: c,
                    date: a
                });
                b.render(e)
            })
        },
        renderWorkreports: function(c, a) {
            var b = this;
            d.async(this.workreportpageUrl, function(e) {
                e = new e({
                    pageKey: "workreportpage-" + c,
                    type: c,
                    unread: a
                });
                b.render(e)
            })
        },
        renderReportWorkreport: function() {
            var c = this;
            d.async(this.workreportpageUrl, function(a) {
                a = new a({
                    pageKey: "workreportStatistics"
                });
                c.render(a)
            })
        },
        renderWorkreportByYear: function(c) {
            var a = this;
            d.async(this.workreportpageUrl, function(b) {
                b = new b({
                    pageKey: "workreportbyyear",
                    year: c
                });
                a.render(b, !0)
            })
        },
        renderWorkreportTimeLine: function(c) {
            var a = this;
            d.async(this.workreportpageUrl, function(b) {
                b = new b({
                    pageKey: "workreporttimeline",
                    date: c
                });
                a.render(b, !0)
            })
        },
        renderCalendar: function(c) {
            var a = this;
            d.async(this.agendapageUrl, function(b) {
                b = new b({
                    pageKey: "agendas",
                    userId: c
                });
                a.render(b)
            })
        },
        renderAgendaInfo: function(c, a) {
            var b = this;
            d.async(this.agendapageUrl, function(e) {
                e = new e({
                    pageKey: "agendainfo",
                    userId: c,
                    id: a
                });
                b.render(e)
            })
        },
        renderRepeatAgendaInfo: function(c, a, b) {
            var e = this;
            d.async(this.agendapageUrl, function(g) {
                g = new g({
                    pageKey: "agendainfo",
                    userId: c,
                    id: a,
                    repeatNum: b
                });
                e.render(g)
            })
        },
        renderAgendaEdit: function(c, a) {
            var b = this;
            d.async(this.agendapageUrl, function(e) {
                e = new e({
                    pageKey: "agendaedit",
                    userId: c,
                    id: a
                });
                b.render(e)
            })
        },
        renderRepeatAgendaEdit: function(c, a, b) {
            var e = this;
            d.async(this.agendapageUrl, function(g) {
                g = new g({
                    pageKey: "agendaedit",
                    userId: c,
                    id: a,
                    repeatNum: b
                });
                e.render(g)
            })
        },
        renderAgendaAdd: function(c) {
            var a = this;
            d.async(this.agendapageUrl, function(b) {
                b = new b({
                    pageKey: "agendaadd",
                    isUrl: !0,
                    date: c
                });
                a.render(b)
            })
        },
        renderWechatAgenda: function(c) {
            var a = this;
            d.async(this.agendapageUrl, function(b) {
                b = new b({
                    pageKey: "wechatagenda",
                    id: c
                });
                a.render(b)
            })
        },
        renderCalendarSearch: function(c) {
            var a = this;
            d.async(this.agendapageUrl, function(b) {
                b = new b({
                    pageKey: "agendasearch",
                    keywords: c
                });
                a.render(b)
            })
        },
        renderDynamicList: function() {
            var c = this;
            d.async(this.dynamicpageUrl, function(a) {
                a = new a({
                    pageKey: "dynamiclist",
                    unread: 0
                });
                c.render(a)
            })
        },
        renderDynamicInfo: function(c) {
            var a = this;
            d.async(this.dynamicpageUrl, function(b) {
                b = new b({
                    pageKey: "dynamicinfo",
                    id: c
                });
                a.render(b)
            })
        },
        renderDynamicAdd: function() {
            var c = this;
            d.async(this.dynamicpageUrl, function(a) {
                a = new a({
                    pageKey: "dynamicadd",
                    isUrl: !0
                });
                c.render(a)
            })
        },
        renderSet: function() {
            var c = this;
            d.async("teamsjs/set/m.setpage" + seajsClip, function(a) {
                a = new a({});
                c.render(a)
            })
        },
        renderSignatureManage: function() {
            var c = this;
            d.async("teamsjs/set/signaturemanage" + seajsClip, function(a) {
                a = new a({});
                c.render(a)
            })
        },
        searchAll: function(c) {
            var a = this;
            d.async(this.globalsearchUrl, function(b) {
                b = new b({
                    pageKey: "searchall",
                    keywords: c
                });
                a.render(b)
            })
        },
        fullsearch: function(c) {
            var a = this;
            d.async(["fsearch/FSApp" + seajsClip, "fsearch/FSUtils" + seajsClip], function(b, e) {
                window.FSUtils || (window.FSUtils = e);
                a.fsapp || (a.fsapp = new b);
                a.fsapp.showPage(c, a)
            })
        },
        searchComment: function(c, a) {
            var b = this;
            d.async(this.globalsearchUrl, function(e) {
                e = new e({
                    pageKey: "searchcomment",
                    module: c,
                    keywords: a
                });
                b.render(e)
            })
        },
        renderTagLink: function(c, a) {
            var b = this;
            d.async(this.tagpageUrl, function(e) {
                e = new e({
                    pageKey: "taglink",
                    id: c,
                    module: a
                });
                b.render(e)
            })
        },
        renderTagList: function() {
            var c = this;
            d.async(this.tagpageUrl, function(a) {
                a = new a({
                    pageKey: "taglist"
                });
                c.render(a)
            })
        },
        renderTagSearch: function(c) {
            var a = this;
            d.async(this.tagpageUrl, function(b) {
                b = new b({
                    pageKey: "tagsearch",
                    keywords: c
                });
                a.render(b)
            })
        },
        renderBiaogeForms: function(c, a) {
            var b = this;
            d.async(this.formpageUrl, function(e) {
                e = new e({
                    pageKey: "biaogeformlistview",
                    userId: c,
                    type: a
                });
                b.render(e)
            })
        },
        renderFormById: function(c, a, b) {
            d.async(this.formpageUrl, function(e) {
                (new e({
                    pageKey: "biaogeformdetail",
                    userId: c,
                    type: a,
                    formId: b
                })).render()
            })
        },
        renderForms: function(c) {
            var a = this;
            d.async(this.formpageUrl, function(b) {
                b = new b({
                    pageKey: "flowforms",
                    ownership: c
                });
                a.render(b)
            })
        },
        renderFormsSearch: function(c) {
            var a = this;
            d.async(this.formpageUrl, function(b) {
                b = new b({
                    pageKey: "formSearch",
                    ownership: c
                });
                a.render(b)
            })
        },
        renderEbgFormList: function(c, a) {
            var b = this;
            d.async(this.formpageUrl, function(e) {
                e = new e({
                    pageKey: "ebgforms",
                    module: c,
                    ownership: a
                });
                b.render(e)
            })
        },
        renderEbgFormCateList: function(c, a) {
            var b = this;
            d.async(this.formpageUrl, function(e) {
                e = new e({
                    pageKey: "ebgformscatelist",
                    type: c,
                    module: a
                });
                b.render(e)
            })
        },
        renderEbgFormSearch: function(c) {
            var a = this;
            d.async(this.formpageUrl, function(b) {
                b = new b({
                    pageKey: "ebgformsearch",
                    keyword: c
                });
                a.render(b)
            })
        },
        renderEbgFormDetail: function(c, a) {
            var b = this;
            d.async(this.formpageUrl, function(e) {
                e = new e({
                    pageKey: "ebgforminfo",
                    module: c,
                    formId: a,
                    readOnly: !0
                });
                b.render(e)
            })
        },
        renderEbgFormCopy: function(c, a) {
            var b = this;
            d.async(this.formpageUrl, function(e) {
                e = new e({
                    pageKey: "ebgformcopy",
                    module: c,
                    formId: a
                });
                b.render(e)
            })
        },
        renderNewWorkflow: function(c, a) {
            var b = this;
            d.async(this.flowpageUrl, function(e) {
                e = new e({
                    pageKey: "newflow",
                    userId: c,
                    formId: a
                });
                b.render(e)
            })
        },
        renderWorkflows: function(c) {
            var a = this;
            d.async(this.flowpageUrl, function(b) {
                b = new b({
                    pageKey: "userflowlist",
                    userId: c
                });
                a.render(b)
            })
        },
        renderTrashbinWorkflows: function(c) {
            var a = this;
            d.async(this.flowpageUrl, function(b) {
                b = new b({
                    pageKey: "userbinflowlist",
                    userId: c,
                    isTrashbinList: !0
                });
                a.render(b)
            })
        },
        renderFilterFlows: function(c, a) {
            var b = this;
            d.async(this.flowpageUrl, function(e) {
                e = new e({
                    pageKey: "flowlist-" + a,
                    userId: c,
                    type: a
                });
                b.render(e)
            })
        },
        renderWorkflow: function(c, a) {
            var b = this;
            d.async(this.flowpageUrl, function(e) {
                e = new e({
                    pageKey: "flowinfo" + a || 1,
                    userId: c,
                    id: a
                });
                b.render(e)
            })
        },
        renderFlowSearch: function(c) {
            var a = this;
            d.async(this.flowpageUrl, function(b) {
                b = new b({
                    pageKey: "flowsearch",
                    keywords: c
                });
                a.render(b)
            })
        },
        renderFlowmanages: function(c, a) {
            var b = this;
            window.flowmanagesIndex || (window.flowmanagesIndex = 0);
            d.async(this.flowpageUrl, function(e) {
                e = new e({
                    pageKey: "flowmanages" + ++window.flowmanagesIndex,
                    type: "flowmanages",
                    ownership: a
                });
                b.render(e)
            })
        },
        renderFlowStatUser: function() {
            var c = this;
            d.async(this.flowpageUrl, function(a) {
                a = new a({
                    pageKey: "flowstatuser"
                });
                c.render(a)
            })
        },
        renderFlowDataStatListHeaderSet: function(c, a) {
            var b = this;
            d.async(this.flowpageUrl, function(e) {
                e = new e({
                    pageKey: "flowdatastatlistheaderset",
                    type: c,
                    id: a
                });
                b.render(e)
            })
        },
        renderFlowDataStatList: function(c, a, b, e, g) {
            var f = this;
            d.async(this.flowpageUrl, function(d) {
                d = new d({
                    pageKey: "flowdatastatlist" + c,
                    type: c,
                    id: a,
                    linkageType: b,
                    beginDate: e,
                    endDate: g
                });
                f.render(d)
            })
        },
        renderFlowDataStatListSearch: function(c, a, b) {
            var e = this;
            d.async(this.flowpageUrl, function(g) {
                g = new g({
                    pageKey: "flowdatastatlistsearch",
                    type: c,
                    id: a,
                    searchType: b
                });
                e.render(g)
            })
        },
        renderFlowCompreStat: function(c, a) {
            var b = this;
            d.async(this.flowpageUrl, function(e) {
                e = new e({
                    pageKey: c,
                    searchType: c,
                    type: c,
                    module: a
                });
                b.render(e)
            })
        },
        renderFlowSeniorSearch: function() {
            var c = this;
            d.async(this.flowpageUrl, function(a) {
                a = new a({
                    pageKey: "flowseniorsearch"
                });
                c.render(a)
            })
        },
        renderFlowDataStatSearch: function(c) {
            var a = this;
            d.async(this.flowpageUrl, function(b) {
                b = new b({
                    pageKey: "flowdatastatsearch",
                    ownership: c
                });
                a.render(b)
            })
        },
        renderFlowDataStat: function(c, a) {
            var b = this;
            d.async(this.flowpageUrl, function(e) {
                e = new e({
                    pageKey: "flowdatastat" + a,
                    searchType: c,
                    type: c,
                    ownership: a
                });
                b.render(e)
            })
        },
        renderFlowStat: function(c, a) {
            var b = this;
            d.async(this.flowpageUrl, function(e) {
                e = new e({
                    pageKey: "flowstat",
                    searchType: "flowstat",
                    type: "flowstat",
                    module: a
                });
                b.render(e)
            })
        },
        renderFlowmanagesSearch: function(c, a) {
            var b = this;
            d.async(this.flowpageUrl, function(e) {
                e = new e({
                    pageKey: "flowmanagessearch",
                    searchType: "flowmanagessearch",
                    ownership: a
                });
                b.render(e)
            })
        },
        renderWorkflowbatch: function(c) {
            var a = this;
            d.async(this.flowpageUrl, function(b) {
                b = new b({
                    pageKey: "workflowbatch",
                    type: c
                });
                a.render(b)
            })
        },
        renderWorkflowpre: function(c, a) {
            var b = this;
            d.async(this.flowpageUrl, function(e) {
                e = new e({
                    pageKey: "workflowpre",
                    module: c,
                    formId: a
                });
                b.render(e)
            })
        },
        renderFlowintroduce: function() {
            var c = this;
            d.async(this.flowpageUrl, function(a) {
                a = new a({
                    pageKey: "flowintroduce"
                });
                c.render(a)
            })
        },
        renderFlowpermissions: function(c) {
            var a = this;
            d.async(this.flowpageUrl, function(b) {
                b = new b({
                    pageKey: "flowpermissions",
                    formId: c
                });
                a.render(b)
            })
        },
        renderFlowTrashBinSearch: function() {
            var c = this;
            d.async(this.flowpageUrl, function(a) {
                a = new a({
                    pageKey: "flowtrashbinsearch",
                    type: "trashbin"
                });
                c.render(a)
            })
        },
        formDataReportList: function(c) {
            var a = this;
            d.async(this.datareportpageUrl, function(b) {
                b = new b({
                    pageKey: "datareportlist-" + c,
                    type: c
                });
                a.render(b)
            })
        },
        formDataReport: function(c, a) {
            var b = this;
            d.async(this.datareportpageUrl, function(e) {
                e = new e({
                    pageKey: "formdatareport",
                    userId: c,
                    id: a
                });
                b.render(e)
            })
        },
        formDataReportSearch: function(c) {
            var a = this;
            d.async(this.datareportpageUrl, function(b) {
                b = new b({
                    pageKey: "formdatareportsearch",
                    keywords: c
                });
                a.render(b)
            })
        },
        formStatDataTable: function(c) {
            var a = this;
            d.async(this.datareportpageUrl, function(b) {
                b = new b({
                    pageKey: "formstatdatatable",
                    id: c
                });
                a.render(b)
            })
        },
        formStatDataTableSearch: function(c) {
            var a = this;
            d.async(this.datareportpageUrl, function(b) {
                b = new b({
                    pageKey: "formstatdatatablesearch",
                    id: c
                });
                a.render(b)
            })
        },
        formdatadetail: function(c, a) {
            var b = this;
            d.async(this.datareportpageUrl, function(e) {
                e = new e({
                    pageKey: "formdatadetail",
                    type: c,
                    id: a
                });
                b.render(e, !0)
            })
        },
        formdataReportDetail: function(c) {
            var a = this;
            d.async(this.datareportpageUrl, function(b) {
                b = new b({
                    pageKey: "formdatadetail",
                    id: c
                });
                a.render(b, !0)
            })
        },
        writeFormSearch: function(c) {
            var a = this;
            d.async(this.datareportpageUrl, function(b) {
                b = new b({
                    pageKey: "datareportsearch",
                    type: c
                });
                a.render(b)
            })
        },
        formdatastatisticschat: function(c) {
            var a = this;
            d.async(this.datareportpageUrl, function(b) {
                b = new b({
                    pageKey: "formdatastatisticschat",
                    formId: c
                });
                a.render(b)
            })
        },
        formdatastatdetail: function(c, a) {
            var b = this;
            d.async(this.datareportpageUrl, function(e) {
                e = new e({
                    pageKey: "formstatdatadetail",
                    formId: c,
                    keywords: a
                });
                b.render(e)
            })
        },
        imsysmsg: function(c) {
            var a = this;
            d.async(this.mcpageUrl, function(b) {
                b = new b({
                    pageKey: "imsysmsg",
                    el: "#homeContent",
                    sgroup: c
                });
                a.render(b)
            })
        },
        formdatastatdetail: function(c, a) {
            var b = this;
            d.async(this.datareportpageUrl, function(e) {
                e = new e({
                    pageKey: "formstatdatadetail",
                    formId: c,
                    keywords: a
                });
                b.render(e)
            })
        },
        writereport: function(c) {
            var a = this;
            d.async(this.datareportpageUrl, function(b) {
                b = new b({
                    pageKey: "datareportwrite",
                    formId: c
                });
                a.render(b)
            })
        },
        renderTimecard: function() {
            var c = this;
            d.async(this.attendpageUrl, function(a) {
                a = new a({
                    pageKey: "attendhome"
                });
                c.render(a)
            })
        },
        renderOtherTimecard: function() {
            var c = this;
            d.async(this.attendpageUrl, function(a) {
                a = new a({
                    pageKey: "othertimecard"
                });
                c.render(a)
            })
        },
        renderOrbitchartMap: function(c, a) {
            var b = this;
            d.async(this.attendpageUrl, function(e) {
                e = new e({
                    pageKey: "orbitchartmap",
                    userId: c,
                    date: a
                });
                b.render(e)
            })
        },
        renderOrbitchartList: function(c, a) {
            var b = this;
            d.async(this.attendpageUrl, function(e) {
                e = new e({
                    pageKey: "orbitchartlist",
                    userId: c,
                    date: a
                });
                b.render(e)
            })
        },
        renderTodayattend: function() {
            var c = this;
            d.async(this.attendpageUrl, function(a) {
                a = new a({
                    pageKey: "todayattend"
                });
                c.render(a)
            })
        },
        renderAttenddetail: function(c, a) {
            var b = this;
            d.async(this.attendpageUrl, function(e) {
                e = new e({
                    pageKey: "attenddetail",
                    type: c,
                    date: a
                });
                b.render(e)
            })
        },
        renderOattend: function(c, a, b, e) {
            var g = this;
            d.async(this.attendpageUrl, function(d) {
                d = new d({
                    pageKey: "outattend-" + c,
                    type: c,
                    lng: a,
                    lat: b,
                    addr: e
                });
                g.render(d)
            })
        },
        renderMaptrack: function(c) {
            var a = this;
            d.async(this.attendpageUrl, function(b) {
                b = new b({
                    pageKey: "maptrack",
                    day: c
                });
                a.render(b)
            })
        },
        renderAttendAppeal: function(c, a, b, e, g, f) {
            var h = this;
            d.async(this.attendpageUrl, function(d) {
                d = new d({
                    pageKey: "attendappeal",
                    appealId: c,
                    attendDay: a,
                    attendPeriod: b,
                    periodName: g,
                    attendStatus: e,
                    attendRecord: f
                });
                h.render(d)
            })
        },
        renderCheckMap: function(c, a, b, e, g, f) {
            var h = this;
            d.async(this.attendpageUrl, function(d) {
                d = new d({
                    pageKey: "checkmap-" + c,
                    type: c,
                    lng: a,
                    lat: b,
                    addr: e,
                    customer: g,
                    contact: f
                });
                h.render(d)
            })
        },
        renderCommentMap: function(c, a, b) {
            var e = this;
            d.async("teamsjs/component/commentmap" + seajsClip, function(d) {
                d = new d({
                    lng: c,
                    lat: a,
                    addr: b
                });
                e.render(d)
            })
        },
        renderOattendCheckMap: function(c, a, b, e, g) {
            if ($("#attendcrmContainer").length) {
                var f = this;
                d.async(this.attendpageUrl, function(d) {
                    d = new d({
                        pageKey: "outattendcheckmap-" + c,
                        type: c,
                        lng: a,
                        lat: b,
                        addr: e,
                        oattendEl: g
                    });
                    f.render(d, !0)
                })
            } else
                ROUTER.navigate("/mobile/timecard/oattend/" + c + "/" + a + "/" + b + "/" + e, {
                    trigger: !0
                })
        },
        renderOattendTaskList: function(c, a, b, e, g) {
            if ($("#attendcrmContainer").length) {
                var f = this;
                d.async(this.attendpageUrl, function(d) {
                    d = new d({
                        pageKey: "oattendtasklist",
                        oattendEl: g,
                        type: c,
                        lng: a,
                        lat: b,
                        addr: e
                    });
                    f.render(d, !0)
                })
            } else
                ROUTER.navigate("/mobile/timecard/oattend/" + c + "/" + a + "/" + b + "/" + e, {
                    trigger: !0
                })
        },
        renderOattendTaskSearch: function(c, a, b, e, g) {
            if ($("#attendcrmContainer").length) {
                var f = this;
                d.async(this.attendpageUrl, function(d) {
                    d = new d({
                        pageKey: "oattendtasksearch",
                        oattendEl: g,
                        type: c,
                        lng: a,
                        lat: b,
                        addr: e
                    });
                    f.render(d, !0)
                })
            } else
                ROUTER.navigate("/mobile/timecard/oattend/" + c + "/" + a + "/" + b + "/" + e, {
                    trigger: !0
                })
        },
        renderOattendMainlineList: function(c, a, b, e, g) {
            if ($("#attendcrmContainer").length) {
                var f = this;
                d.async(this.attendpageUrl, function(d) {
                    d = new d({
                        pageKey: "oattendmainlinelist",
                        oattendEl: g,
                        type: c,
                        lng: a,
                        lat: b,
                        addr: e
                    });
                    f.render(d, !0)
                })
            } else
                ROUTER.navigate("/mobile/timecard/oattend/" + c + "/" + a + "/" + b + "/" + e, {
                    trigger: !0
                })
        },
        renderOattendMainlineSearch: function(c, a, b, e, g) {
            if ($("#attendcrmContainer").length) {
                var f = this;
                d.async(this.attendpageUrl, function(d) {
                    d = new d({
                        pageKey: "oattendmainlinesearch",
                        oattendEl: g,
                        type: c,
                        lng: a,
                        lat: b,
                        addr: e
                    });
                    f.render(d, !0)
                })
            } else
                ROUTER.navigate("/mobile/timecard/oattend/" + c + "/" + a + "/" + b + "/" + e, {
                    trigger: !0
                })
        },
        renderOattendWorkFlowList: function(c, a, b, e, g) {
            if ($("#attendcrmContainer").length) {
                var f = this;
                d.async(this.attendpageUrl, function(d) {
                    d = new d({
                        pageKey: "oattendworkflowlist",
                        oattendEl: g,
                        type: c,
                        lng: a,
                        lat: b,
                        addr: e
                    });
                    f.render(d, !0)
                })
            } else
                ROUTER.navigate("/mobile/timecard/oattend/" + c + "/" + a + "/" + b + "/" + e, {
                    trigger: !0
                })
        },
        renderOattendWorkFlowSearch: function(c, a, b, e, g) {
            if ($("#attendcrmContainer").length) {
                var f = this;
                d.async(this.attendpageUrl, function(d) {
                    d = new d({
                        pageKey: "oattendworkflowsearch",
                        oattendEl: g,
                        type: c,
                        lng: a,
                        lat: b,
                        addr: e
                    });
                    f.render(d, !0)
                })
            } else
                ROUTER.navigate("/mobile/timecard/oattend/" + c + "/" + a + "/" + b + "/" + e, {
                    trigger: !0
                })
        },
        renderTodayOattendMap: function(c, a, b, e, g, f, h, k) {
            var m = this;
            d.async(this.attendpageUrl, function(d) {
                d = new d({
                    pageKey: "checkmap-" + c,
                    type: c,
                    lng: a,
                    lat: b,
                    addr: e,
                    entityType: g,
                    targetId: f,
                    customer: h,
                    contact: k
                });
                m.render(d)
            })
        },
        renderOattendCalendar: function(c, a, b, e, g) {
            if ($("#attendcrmContainer").length) {
                var f = this;
                d.async(this.attendpageUrl, function(d) {
                    d = new d({
                        pageKey: "oattendcalendar",
                        oattendEl: g,
                        type: c,
                        lng: a,
                        lat: b,
                        addr: e
                    });
                    f.render(d, !0)
                })
            } else
                ROUTER.navigate("/mobile/timecard/oattend/" + c + "/" + a + "/" + b + "/" + e, {
                    trigger: !0
                })
        },
        renderAbnormal: function() {
            var c = this;
            d.async(this.attendpageUrl, function(a) {
                a = new a({
                    pageKey: "attend-abnormal"
                });
                c.render(a)
            })
        },
        renderAttendInfo: function(c) {
            var a = this;
            d.async(this.attendpageUrl, function(b) {
                b = new b({
                    pageKey: "attend-attendinfo",
                    date: c
                });
                a.render(b)
            })
        },
        renderInvite: function() {
            var c = this;
            d.async(this.simplepageUrl, function(a) {
                a = new a({
                    pageKey: "inviteview",
                    isurl: !0
                });
                c.render(a)
            })
        },
        renderInvitsmartheer: function(c) {
            var a = this;
            d.async(this.simplepageUrl, function(b) {
                b = new b({
                    pageKey: "invitsmartheer",
                    type: c
                });
                a.render(b)
            })
        },
        renderInvitsmartheerRecords: function(c) {
            var a = this;
            d.async(this.simplepageUrl, function(b) {
                b = new b({
                    pageKey: "invitsmartheerrecords",
                    type: c
                });
                a.render(b)
            })
        },
        renderTeams: function() {
            var c = this;
            d.async(this.simplepageUrl, function(a) {
                a = new a({
                    pageKey: "myteams"
                });
                c.render(a)
            })
        },
        renderEmployeeInfo: function(c) {
            var a = this;
            d.async(this.simplepageUrl, function(b) {
                b = new b({
                    pageKey: "usercard",
                    userId: c
                });
                a.render(b)
            })
        },
        renderEmployeeEdit: function(c) {
            var a = this;
            d.async(this.simplepageUrl, function(b) {
                b = new b({
                    pageKey: "employeeedit",
                    userId: c
                });
                a.render(b)
            })
        },
        renderUserCenter: function() {
            var c = this;
            d.async(this.simplepageUrl, function(a) {
                a = new a({
                    pageKey: "employeecenter"
                });
                c.render(a)
            })
        },
        renderUserList: function(c) {
            var a = this;
            d.async(this.simplepageUrl, function(b) {
                b = new b({
                    pageKey: "userlistpage",
                    departmentId: c
                });
                a.render(b)
            })
        },
        renderPositionUserList: function(c) {
            var a = this;
            d.async(this.simplepageUrl, function(b) {
                b = new b({
                    pageKey: "persitionuserlist",
                    positionId: c
                });
                a.render(b)
            })
        },
        renderUserListType: function(c) {
            var a = this;
            d.async(this.simplepageUrl, function(b) {
                b = new b({
                    pageKey: "userlisttype",
                    module: c
                });
                a.render(b)
            })
        },
        renderContactSearch: function(c) {
            var a = this;
            d.async(this.simplepageUrl, function(b) {
                b = new b({
                    pageKey: "contactsearch",
                    keywords: c
                });
                a.render(b)
            })
        },
        renderMessageBox: function() {
            var c = this;
            d.async(this.simplepageUrl, function(a) {
                a = new a({
                    pageKey: "messagescenter"
                });
                c.render(a)
            })
        },
        renderFeedSearch: function(c) {
            var a = this;
            d.async(this.simplepageUrl, function(b) {
                b = new b({
                    pageKey: "feedsearch",
                    type: c
                });
                a.render(b)
            })
        },
        renderMessageRemind: function(c) {
            var a = this;
            d.async(this.simplepageUrl, function(b) {
                b = new b({
                    pageKey: "messageremind",
                    type: c
                });
                a.render(b)
            })
        },
        renderApplyMessageRemind: function(c, a) {
            var b = this;
            d.async(this.simplepageUrl, function(e) {
                e = new e({
                    pageKey: "messageremind",
                    userId: a,
                    type: c
                });
                b.render(e)
            })
        },
        renderDepartment: function() {
            var c = this;
            d.async(this.simplepageUrl, function(a) {
                a = new a({
                    pageKey: "departmentselector",
                    hasUrl: !0
                });
                c.render(a)
            })
        },
        renderPosition: function() {
            var c = this;
            d.async(this.simplepageUrl, function(a) {
                a = new a({
                    pageKey: "positionselector",
                    hasUrl: !0
                });
                c.render(a)
            })
        },
        renderUserFollowList: function(c) {
            var a = this;
            d.async(this.simplepageUrl, function(b) {
                b = new b({
                    pageKey: "userfollowlist",
                    userId: c
                });
                a.render(b)
            })
        },
        renderUserFollowMe: function(c) {
            var a = this;
            d.async(this.simplepageUrl, function(b) {
                b = new b({
                    pageKey: "userfollowme",
                    userId: c
                });
                a.render(b)
            })
        },
        renderUserSubList: function(c) {
            var a = this;
            d.async(this.simplepageUrl, function(b) {
                b = new b({
                    pageKey: "usersublist",
                    userId: c
                });
                a.render(b)
            })
        },
        renderUserInSubList: function(c) {
            var a = this;
            d.async(this.simplepageUrl, function(b) {
                b = new b({
                    pageKey: "userinsublist",
                    userId: c
                });
                a.render(b)
            })
        },
        renderFreeApplication: function(c, a, b, e, g, f) {
            var h = this;
            c || (c = TEAMS.currentUser.id);
            d.async(this.freepageUrl, function(d) {
                d = new d({
                    pageKey: "freepage" + a + g,
                    type: a,
                    userId: c,
                    formModule: e,
                    sysMenuId: b,
                    formId: g,
                    id: f
                });
                h.render(d)
            })
        },
        relformstatdata: function(c, a, b) {
            d.async("teamsjs/formdatareport/formstatdatatableview" + seajsClip, function(e) {
                (new e({
                    id: a,
                    type: c,
                    relId: b,
                    fromRelevance: "relevance",
                    module: "form"
                })).requireRender()
            })
        },
        subscribe: function(c, a) {
            var b = this;
            d.async(this.subscribeUrl, function(e) {
                e = new e({
                    pageKey: c,
                    dataId: a
                });
                b.render(e)
            })
        },
        getEntityItem: function(c) {
            var a = c.indexOf("/etinfo/");
            if (-1 < a) {
                var b;
                if (-1 < c.indexOf("http://"))
                    b = 7;
                else if (-1 < c.indexOf("https://"))
                    b = 8;
                else
                    return null;
                var e = c.indexOf("/", b) + 1;
                if (a > e)
                    return b = c.substring(a + 8),
                    c = c.substring(e, a),
                    -1 < c.indexOf("mobile/") && (c = c.replace("mobile/", "")),
                    {
                        id: b,
                        module: c
                    }
            }
            return null
        },
        windowfunction: function() {
            window.getdatastaturl || (window.getdatastaturl = function(c, a, b) {
                b || (b = "");
                var e = window.location.href
                  , d = b + "/formdatastat" + a;
                null != c.module && ("workflow" == c.module || "workflowStat" == c.module || "workflowMenu" == c.module || "formField" == c.module && -1 < window.location.href.indexOf("workflows")) ? d = TEAMS.service.flow + b + "/flowdatastat" + a : (null == c.module || "" == c.module) && -1 < e.indexOf("workflows") ? d = TEAMS.service.flow + b + "/flowdatastat" + a : (null == c.module || "" == c.module) && -1 < e.indexOf("/freeform/edit") && -1 < e.indexOf("/workflow") && (d = TEAMS.service.flow + b + "/flowdatastat" + a);
                return d
            }
            )
        }
    });
    n.exports = l
});
    

define("mobile/enter/main", ["mobile/enter/utils", "mobile/enter/page", "mobile/enter/setting", "mobile/enter/router"], function(d) {
    window.utils = d("mobile/enter/utils");
    window.PAGE = d("mobile/enter/page");
    var l = d("mobile/enter/setting");
    d = d("mobile/enter/router");
    window.SETTING = new l;
    window.ROUTER = new d;
    Backbone.history.start({
        pushState: !0
    });
    $("body").on("tap", ".router", function(d) {
        d.preventDefault();
        if ((d = $(this).attr("href")) && "#" != d) {
            var c = navigator.userAgent.toLowerCase();
            -1 != c.indexOf("macintosh") && -1 != c.indexOf("wxwork") || -1 != c.indexOf("windowswechat") ? (1 < d.length && "/" != d.substring(0, 1) && (d = "/" + d),
            utils.wxMacLocationTo(d)) : (console.log("tt"),
            ROUTER.navigate(d, {
                trigger: !0
            }))
        }
    });
    String.prototype.I18N = function() {
        var d = arguments;
        return this.replace(/\{(\d+)\}/g, function(c, a) {
            return d[a] || ""
        })
    }
    ;
    FastClick.attach(document.body)
});
define("mobile/enter/page", function(d, l, n) {
    l = Backbone.View.extend({
        _initialize: function(c) {
            TEAMS.currentEnvironment = "web";
            "crm" == c.codeBranch ? (this.pageKey = c.info.view + this.cid,
            this.pageName = c.module.key,
            this.codeBranch = c.codeBranch,
            c.nobodyempty && (this.nobodyempty = !0),
            delete c.module.key,
            TEAMS.currentEnvironment = "crm") : "app" == c.codeBranch ? (this.pageName = this.pageKey = "app",
            this.codeBranch = c.codeBranch,
            c.nobodyempty && (this.nobodyempty = !0)) : "portal" == c.codeBranch ? (this.pageKey = c.info.view + this.cid,
            this.pageName = c.module.key,
            this.codeBranch = c.codeBranch,
            c.nobodyempty && (this.nobodyempty = !0)) : "sms" == c.codeBranch ? (this.pageKey = c.info.view + this.cid,
            this.pageName = c.module.key,
            this.codeBranch = c.codeBranch,
            c.nobodyempty && (this.nobodyempty = !0)) : "hr" == c.codeBranch ? (this.pageKey = c.info.view + this.cid,
            this.pageName = c.module.key,
            this.codeBranch = c.codeBranch,
            c.nobodyempty && (this.nobodyempty = !0),
            TEAMS.currentEnvironment = "hr") : (this.pageKey = c.pageKey,
         //   c.userId || (c.userId = TEAMS.currentUser.id),
            c.type && (this.type = c.type),
            c.nobodyempty && (this.nobodyempty = !0),
            c.module && (this.module = c.module),
            delete c.pageKey);
            return c
        },
        render: function() {
            console.error("you need to rewrite the method : render", "color:red")
        },
        _render: function(c, a) {
            var b = this
              , e = "";
            b.webTitle || (b.webTitle = "smartheer\u5e94\u7528");
            utils.setWebTitle(b.webTitle);
            window.nobodyempty || this.nobodyempty || window.teamsLoadMark || $("body").html('\x3cdiv class\x3d"data-loading"\x3e\x3c/div\x3e');
            window.teamsLoadMark = null;
            "string" != $.type(c) || a || (a = c);
            var g = this.getCssLink(a);
            $.isArray(g) || (g = [g]);
            "develop" != TEAMS.runMode && (e = "?v\x3d" + TEAMS.version,
            imConfig && imConfig.version && (e = "?v\x3d" + imConfig.version));
            !this.pageName || "home" != this.pageName && "im" != this.pageName || (g = g.concat(["/static/js/plugins/im.smartheer.v1.js" + e, "/static/js/plugins/im.smartheer.json-format.v1.js" + e, TEAMS.service.imWebapp + "/static/js_compress/imi18n/imlang.js" + e]));
            "crm" == this.codeBranch && (TEAMS.currentEnvironment = "crm",
            g = g.concat([TEAMS.service.crm + "/static/css/mobile/crm" + ("develop" == TEAMS.runMode ? ".css" : "-min.css")]));
            "sms" == this.codeBranch && (g = g.concat([TEAMS.service.sms + "/static/css/mobile/" + ("develop" == TEAMS.runMode ? "email.css" : "sms-min.css")]));
            "document" == this.pageName && (TEAMS.currentEnvironment = "docUrl");
            window.smartheerClient && (g = g.concat(["imjs/component/client" + seajsImClip]));
            d.async(g, function() {
                window.imwebsocketLoaded || !b.pageName || "home" != b.pageName && "im" != b.pageName || (window.imwebsocketLoaded = !0,
                d.async(["imjs/component/imWebsocket" + seajsImClip, "teamsjs/imextra/imSysMsgCBService" + seajsClip, "teamsjs/imextra/imRecentListCBService" + seajsClip], function(b, a, e) {
                    window.iminfoMap ? (window.ImWebsocket = new b({
                        imAppKey: window.iminfoMap.imAppKey
                    }),
                    new a,
                    new e) : $.ajax({
                        type: "POST",
                        url: "/imrequest/queryIMInfo.json",
                        async: !1,
                        dataType: "json",
                        success: function(c) {
                            window.iminfoMap = c.iminfoMap;
                            window.ImWebsocket = new b({
                                imAppKey: window.iminfoMap.imAppKey
                            });
                            new a;
                            new e
                        }
                    })
                }));
                c && "boolean" == $.type(c) ? b.mainView.requireRender() : b.mainView.render();
                setTimeout(function() {
                    d.async([_formDesign+"/static/js/plugins/bootstrap.datetimepicker.min.js", _formDesign+"/static/js/plugins/bootstrap.all.m.min.js"], function() {})
                }, 2E3);
                "wechat" != window.webapp || window.pageName && window.pageName == b.pageName || ($.ajax({
                    url: "/remote/wechatAuthApp/getQyWechatConfig?v\x3d1",
                    type: "get",
                    dataType: "jsonaccount.models",
                    data: {
                        module: b.pageName,
                        tenantKey: TEAMS.currentTenant.tenantKey,
                        url: window.qy_wehcat_url
                    },
                    contentType: "application/json",
                    async: !1,
                    success: function(a) {
                        null != a && (_wechatSign = window.eval("(" + a.responseText + ")"),
                        window.pageName = b.pageName)
                    },
                    error: function(b) {
                        _wechatSign = window.eval("(" + b.responseText + ")")
                    }
                }),
                wx.config({
                    beta: !0,
                    debug: !1,
                    appId: _wechatSign.appId,
                    timestamp: _wechatSign.timeStamp,
                    nonceStr: _wechatSign.nonceStr,
                    signature: _wechatSign.signature,
                    jsApiList: ["scanQRCode", "onHistoryBack"]
                }),
                wx.error(function(b) {}),
                wx.onHistoryBack(function() {
                    var b = $("body").find(".j_wx_back_tap")
                      , a = null;
                    1 <= b.length && b.each(function() {
                        $(this).is(":visible") && (a = $(this))
                    });
                    return a ? (a.trigger("tap"),
                    a.trigger("click"),
                    !1) : !0
                }))
            });
            "ding" == window.webapp && (window.dingPayRemind = this.dingPayRemind)
        },
        getCssLink: function(c) {
            
        },
        ddSubmit: function(c) {
            $.ajax({
                url: "/remote/getDingConfig",
                type: "get",
                dataType: "jsonaccount.models",
                data: {
                    application: c,
                    dingCor: dingCor
                },
                contentType: "application/json",
                async: !1,
                success: function(a) {
                    null != a && (_config = window.eval("(" + a.responseText + ")"))
                },
                error: function(a) {
                    _config = window.eval("(" + a.responseText + ")")
                }
            });
            dd.config({
                agentId: _config.agentId,
                corpId: _config.corpId,
                timeStamp: _config.timeStamp,
                nonceStr: _config.nonceStr,
                signature: _config.signature,
                jsApiList: ["biz.util.ut", "biz.contact.choose"]
            });
            dd.error(function(a) {
                JSON.stringify(a)
            })
        },
        dingPayRemind: function() {
            "inweek" != TEAMS.currentTenant.status && "outweek" != TEAMS.currentTenant.status || d.async("teamstpl/component/payremind" + seatplClip, function(c) {
                if ("inweek" == TEAMS.currentTenant.status) {
                    if (TEAMS.currentUser.admin) {
                        $("body").append(utils.template(c));
                        c = 12096E5;
                        c = "undefined" != typeof TEAMS.currentTenant.transfiniteDate ? c + TEAMS.currentTenant.transfiniteDate : c + (new Date).getTime();
                        var a = new Date(c);
                        c = a.getFullYear();
                        var b = a.getMonth() + 1;
                        10 > b && (b = "0" + b);
                        a = a.getDate();
                        10 > a && (a = "010");
                        startRemind = parseInt(c) + "-" + parseInt(b) + "-" + parseInt(a);
                        c = "http://www.smartheer.cn/mobileapp/payremind?isAdmin\x3dtrue\x26startRemind\x3d" + startRemind;
                        $("#appPayRemind .btn a").attr("href", c);
                        $("body").find("#appPayRemind").fadeIn("fast")
                    }
                } else
                    "outweek" == TEAMS.currentTenant.status && ($("body").append(utils.template(c)),
                    TEAMS.currentUser.admin ? (c = 12096E5,
                    c = "undefined" != typeof TEAMS.currentTenant.transfiniteDate ? c + TEAMS.currentTenant.transfiniteDate : c + (new Date).getTime(),
                    a = new Date(c),
                    c = a.getFullYear(),
                    b = a.getMonth() + 1,
                    10 > b && (b = "0" + b),
                    a = a.getDate(),
                    10 > a && (a = "010"),
                    startRemind = parseInt(c) + "-" + parseInt(b) + "-" + parseInt(a),
                    c = "http://www.smartheer.cn/mobileapp/payremind?isAdmin\x3dtrue\x26startRemind\x3d" + startRemind) : c = "http://www.smartheer.cn/mobileapp/payremind?isAdmin\x3dfalse",
                    $("#appPayRemind .btn a").attr("href", c),
                    $("body").find("#appPayRemind").fadeIn("fast"))
            })
        },
        remove: function() {
            this.mainView && (this.mainView.off(),
            window.noRemoveEvent || this.mainView.remove(),
            this.mainView = null);
            window.noRemoveEvent = null;
            window.nobodyempty = null;
            $(document).off("swiperight.sidePane")
        }
    });
    n.exports = l
});
define("mobile/enter/setting", function(d, l, n) {
    var c = {
        init: function() {
            this.setLocale("zh_CN")
        },
        setLocale: function(a) {
            bootbox.setLocale(a)
        }
    };
    n.exports = function() {
        c.init();
        return c
    }
});
define("mobile/enter/utils", function(d, l, n) {
    var c = {
        defaults: {
            el: "input.datepicker",
            callback: function(b) {},
            eventType: "focusin.datePicker"
        },
        init: function(b) {
            var a = [];
            $.isArray(b) ? a = b : a.push(b);
            for (var c = 0; c < a.length; c++) {
                b = a[c];
                if ($.isFunction(b)) {
                    var d = b;
                    b = {};
                    b.callback = d
                }
                b = $.extend(!0, this.defaults, b);
                (function(b) {
                    var a = $(b.el)
                      , e = a.attr("format") || "yyyy-mm-dd"
                      , c = a.attr("startView") || "month"
                      , d = a.attr("minView") || "month"
                      , g = a.attr("maxView") || "decade"
                      , f = a.attr("position") || "bottom-right"
                      , l = a.attr("dateGroup")
                      , n = b.callback
                      , t = a.attr("writeValue");
                    a.each(function() {
                        var b = $(this);
                        b.on("focusin.datePicker", function() {
                            b.datetimepicker({
                                format: e,
                                language: "zh-CN",
                                todayHighlight: !0,
                                todayBtn: l,
                                autoclose: !0,
                                initialDate: new Date,
                                startView: c,
                                minView: d,
                                maxView: g,
                                pickerPosition: f,
                                showMeridian: !1,
                                writeValue: t
                            });
                            b.datetimepicker("show");
                            b.off("focusin.datePicker")
                        }).on("changeDate", function(b) {
                            n(b)
                        })
                    })
                }
                )(b)
            }
        },
        remove: function(b) {
            if (arguments)
                for (var a = 0; a < arguments.length; a++)
                    $(arguments[a]).datetimepicker("remove")
        }
    }
      , a = {
        en_US: {
            year: "",
            days: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday Sunday".split(" "),
            daysShort: "Sun Mon Tue Wed Thu Fri Sat Sun".split(" "),
            daysMin: "Su Mo Tu We Th Fr Sa Su".split(" "),
            months: "January February March April May June July August September October November December".split(" "),
            monthsShort: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            monthNum: "January February March April May June July August September October November December".split(" ")
        },
        zh_CN: {
            year: "\u5e74",
            days: "\u661f\u671f\u65e5 \u661f\u671f\u4e00 \u661f\u671f\u4e8c \u661f\u671f\u4e09 \u661f\u671f\u56db \u661f\u671f\u4e94 \u661f\u671f\u516d \u661f\u671f\u65e5".split(" "),
            daysShort: "\u5468\u65e5 \u5468\u4e00 \u5468\u4e8c \u5468\u4e09 \u5468\u56db \u5468\u4e94 \u5468\u516d \u5468\u65e5".split(" "),
            daysMin: "\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u65e5".split(""),
            months: "\u4e00\u6708 \u4e8c\u6708 \u4e09\u6708 \u56db\u6708 \u4e94\u6708 \u516d\u6708 \u4e03\u6708 \u516b\u6708 \u4e5d\u6708 \u5341\u6708 \u5341\u4e00\u6708 \u5341\u4e8c\u6708".split(" "),
            monthsShort: "\u4e00\u6708 \u4e8c\u6708 \u4e09\u6708 \u56db\u6708 \u4e94\u6708 \u516d\u6708 \u4e03\u6708 \u516b\u6708 \u4e5d\u6708 \u5341\u6708 \u5341\u4e00\u6708 \u5341\u4e8c\u6708".split(" "),
            monthNum: "1\u6708 2\u6708 3\u6708 4\u6708 5\u6708 6\u6708 7\u6708 8\u6708 9\u6708 10\u6708 11\u6708 12\u6708".split(" ")
        },
        zh_TW: {
            year: "\u5e74",
            days: "\u661f\u671f\u65e5 \u661f\u671f\u4e00 \u661f\u671f\u4e8c \u661f\u671f\u4e09 \u661f\u671f\u56db \u661f\u671f\u4e94 \u661f\u671f\u516d \u661f\u671f\u65e5".split(" "),
            daysShort: "\u9031\u65e5 \u9031\u4e00 \u9031\u4e8c \u9031\u4e09 \u9031\u56db \u9031\u4e94 \u9031\u516d \u9031\u65e5".split(" "),
            daysMin: "\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u65e5".split(""),
            months: "\u4e00\u6708 \u4e8c\u6708 \u4e09\u6708 \u56db\u6708 \u4e94\u6708 \u516d\u6708 \u4e03\u6708 \u516b\u6708 \u4e5d\u6708 \u5341\u6708 \u5341\u4e00\u6708 \u5341\u4e8c\u6708".split(" "),
            monthsShort: "\u4e00\u6708 \u4e8c\u6708 \u4e09\u6708 \u56db\u6708 \u4e94\u6708 \u516d\u6708 \u4e03\u6708 \u516b\u6708 \u4e5d\u6708 \u5341\u6708 \u5341\u4e00\u6708 \u5341\u4e8c\u6708".split(" "),
            monthNum: "1\u6708 2\u6708 3\u6708 4\u6708 5\u6708 6\u6708 7\u6708 8\u6708 9\u6708 10\u6708 11\u6708 12\u6708".split(" ")
        }
    };
    n.exports = {
        template: function(b, a) {
            return a ? _.template(b, a) : b
        },
        setWebTitle: function(b) {
            document.title = b;
            if (!window.inFetionClient && /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) && !window.inMacClient) {
                b = $("body");
                var a = $('\x3ciframe src\x3d"https://www.baidu.com/favicon.ico"\x3e\x3c/iframe\x3e').on("load", function() {
                    setTimeout(function() {
                        a.off("load").remove()
                    }, 0)
                }).appendTo(b)
            }
        },
        wxMacLocationTo: function(b) {
            if (sessionStorage.getItem("wxLoginInfo")) {
                var a = sessionStorage.getItem("wxLoginInfo");
                -1 != b.indexOf("?") ? (b = b.split("?"),
                b = b[0] + "?" + a + "\x26" + b[1]) : b = b + "?" + a
            }
            window.location.href = b
        },
        addIMentityInfo: function(b, a, c, d) {
            window.smartheerClient && (b.append('\x3cdiv class\x3d"menu-item j_openIMentityEvent" data-flag\x3d"send"\x3e\x3ci class\x3d"ico-imsend"\x3e\x3c/i\x3e\x3cp\x3e\u4e8b\u9879\u8f6c\u53d1\x3c/p\x3e\x3c/div\x3e\x3cdiv class\x3d"menu-item j_openIMentityEvent" data-flag\x3d"create"\x3e\x3ci class\x3d"ico-imcreate"\x3e\x3c/i\x3e\x3cp\x3e\u521b\u5efa\u7fa4\u804a\x3c/p\x3e\x3c/div\x3e'),
            b.find(".j_openIMentityEvent").each(function() {
                $(this).data("imParams", {
                    flag: $(this).attr("data-flag"),
                    entity: {
                        id: a.id,
                        module: d ? d : a.module.toLowerCase(),
                        name: a.name,
                        stype: c
                    }
                })
            }));
            return b.find(".j_openIMentityEvent").length
        },
        datepicker: function(b) {
            c.init(b)
        },
        removeDatepicker: function(b) {
            c.remove(b)
        },
        alert: function(b, a) {
            var c = window.lang_v;
            "_en_US" == c ? bootbox.setLocale("en") : "_zh_TW" == c && bootbox.setLocale("zh_TW");
            bootbox.alert(b, a || function() {}
            )
        },
        confirm: function(b, a) {
            var c = window.lang_v;
            "_en_US" == c ? bootbox.setLocale("en") : "_zh_TW" == c && bootbox.setLocale("zh_TW");
            bootbox.confirm(b, function(b) {
                a && a(b)
            })
        },
        prompt: function(b, a) {
            var c = window.lang_v;
            "_en_US" == c ? bootbox.setLocale("en") : "_zh_TW" == c && bootbox.setLocale("zh_TW");
            bootbox.prompt(b, function(b) {
                a && a(b)
            })
        },
        notify: function(b, a, c, d) {
            void 0 == d && (d = !0);
            b = {
                sticker: !1,
                shadow: !1,
                history: !1,
                hide: d,
                opacity: .95,
                animation: {
                    effect_in: "slide",
                    effect_out: "none"
                },
                text: b,
                title: a
            };
            switch (c) {
            case "error":
                b.type = "error";
                break;
            case "info":
                b.type = "info";
                break;
            case "success":
                b.type = "success"
            }
            $.pnotify_remove_all();
            $.pnotify(b)
        },
        serialize: function(b) {
            $form = $(b);
            var a = "";
            $form.find("input[type!\x3d'radio'],textarea").each(function() {
                var b = $(this).attr("name")
                  , c = $(this).val();
                b && c && (a += b + "\x3d" + c.replace(/\r\n|\n/g, "") + "\x26")
            });
            $form.find("input[type\x3d'radio']").each(function() {
                var b = $(this).attr("name")
                  , c = $(this).val();
                b && c && $(this).prop("checked") && (a += b + "\x3d" + c + "\x26")
            });
            return a = a.substring(0, a.length - 1)
        },
        toSimpleJSONString: function(b) {
            var a = "";
            if (b) {
                b = b.split("\x26");
                for (var c = 0, d = b.length; c < d; c++) {
                    var h = b[c].split("\x3d");
                    h[1] && (a += '"' + h[0] + '":"' + h[1] + '",')
                }
                a && (a = a.substring(0, a.length - 1),
                a = "{" + a + "}")
            }
            return a
        },
        initUrl: function(b, a) {
            if (!b)
                return a;
            for (var c = "", d = 0; d < b.length; d++) {
                var h = $.trim(b[d]);
                if (!(0 <= c.indexOf(h))) {
                    if (0 == h.indexOf("http") || 0 == h.indexOf("https") || 0 == h.indexOf("ftp"))
                        var k = a.split(h)
                          , m = ""
                          , l = 0;
                    else
                        k = a.split(h),
                        m = "",
                        l = 0;
                    for (; l < k.length - 1; l++)
                        m += k[l] + '\x3ca target\x3d"_blank" href\x3d"' + h + '"\x3e' + h + "\x3c/a\x3e";
                    a = m + k[k.length - 1];
                    c += b[d] + "  "
                }
            }
            return a
        },
        initMessage: function(b) {
            var a = this;
            return b = b.replace(a.getUrlReg(), function(b) {
                return a.handleOpenUrl(b)
            }).replace(/\n/g, "\x3cbr /\x3e")
        },
        initFormMessage: function(b) {
            b = b.replace(/</g, "\x26lt").replace(/>/g, "\x26gt").replace(/\r\n|\n/g, " \x3cbr/\x3e").replace(/ /g, "  ");
            b.match(RegExp("(((ht|f)tp(s?))://)?(www.|([a-zA-Z]+[.]{1}))[a-zA-Z0-9-.]*(com|edu|gov|mil|net|org|biz|info|name|museum|us|ca|uk|cn)(/($|[a-zA-Z0-9:.;?'\\+\x26amp;%$#\x3d~_-])+)*", "g"));
            return b
        },
        handleOpenUrl: function(b) {
            return b = 0 == b.indexOf("http") || 0 == b.indexOf("https") || 0 == b.indexOf("ftp") ? "\x3ca href\x3d'" + b + "' target\x3d'_blank'\x3e" + b + "\x3c/a\x3e" : "\x3ca href\x3d'http://" + b + "' target\x3d'_blank'\x3e" + b + "\x3c/a\x3e"
        },
        getUrlReg: function() {
            return /(((http:\/\/|https:\/\/|ftp:\/\/|mms:\/\/)?((\w|=|\?|\.|\/|&|-|\||,|\*|:){1,})(\.+)(com|cn|im|xin|shop|ltd|club|top|wang|xyz|site|vip|net|cc|ren|biz|red|link|mobi|info|org|com.cn|net.cn|org\.cn|gov\.cn|name|io|tt|coop|biz|aero|travel|pub|edu|CC|ink|pro|tv|kim|group|\u6211\u7231\u4f60|\u4e2d\u56fd|\u516c\u53f8|\u7f51\u7edc|\u7f51\u5740|\u96c6\u56e2)((\w|=|\?|\.|\/|&|-|\||,|\*|:|%){0,})))|(^(http:\/\/|https:\/\/|ftp:\/\/|mms:\/\/){1,}((\w|=|\?|\.|\/|&|-|\||,|\*|:){1,})(\.+)((\w|=|\?|\.|\/|&|-|\||,|\*|:|%){1,}))/g
        },
        toJSONString: function(b) {
            $form = $(b);
            return this.toSimpleJSONString(this.serialize(b))
        },
        getList: function(b) {
            var a = ""
              , c = this;
            $(b).each(function() {
                var b = c.toJSONString(this);
                b && (a += b + ",")
            });
            a && (a = a.substring(0, a.length - 1));
            return "[" + a + "]"
        },
        getMap: function(b) {
            var a = ""
              , c = this;
            $(b).each(function() {
                var b = c.toJSONString(this);
                b && (a += b.substring(0, b.length - 1).substring(1) + ",")
            });
            a && (a = a.substring(0, a.length - 1));
            return "{" + a + "}"
        },
        getPrev: function(b) {
            var a = 0;
            b = $(b);
            b.each(function(b) {
                $(this).hasClass("active") && (a = b)
            });
            return 0 == a ? null : $(b[a - 1])
        },
        getNext: function(b) {
            var a = 0;
            b = $(b);
            b.each(function(b) {
                $(this).hasClass("active") && (a = b)
            });
            return a == b.length - 1 ? null : $(b[a + 1])
        },
        highLight: function(b, a) {
            $(b + " li.active").removeClass("active");
            $(b + " #" + a).addClass("active");
            $(b + " #" + a).find(".title").focus()
        },
        rebuildSN: function(b) {
            var a = $(b).children();
            b.data("index", a.length);
            for (b = 0; b < a.length; b++)
                $(a[b]).find(".sn").html(b + 1)
        },
        convert2Html: function(b) {
            return b ? b.replace(/\r\n|\n/g, "\x3cbr/\x3e").replace(/[ ]/g, "\x26nbsp;") : b
        },
        conver2Txt: function(b) {
            return b ? b.replace(/&nbsp;/gi, " ").replace(/<br>/gi, "\n").replace(/<br>/gi, "\r\n") : b
        },
        renderInfoUrl: function(b, a) {
            var c = TEAMS.currentUser.id;
            switch (b) {
            case "task":
                return "/mobile/task/" + a;
            case "customer":
                return "/mobile/crms?module\x3dkey_customer\x26info\x3dview_CustomerCover|id_" + a;
            case "document":
                return "/mobile/documents/" + c + "/" + a;
            case "workflow":
                return "/mobile/workflows/" + c + "/" + a;
            case "mainline":
                return "/mobile/mainline/cover/" + a;
            case "workreport":
                return "/mobile/workreport/info/" + a;
            case "calendar":
                return "/mobile/calendar/" + c + "/" + a;
            case "formdatareport":
                return "/mobile/formdatadetail/formdatareport/" + a;
            case "saleChance":
                return "/mobile/crms/" + a + "?module\x3dkey_salechance\x26info\x3dview_SaleChanceView|id_" + a;
            case "production":
                return "/mobile/crms/" + a + "?module\x3dkey_production\x26info\x3dview_ProductionView|id_" + a;
            case "competitor":
                return "/mobile/crms/" + a + "?module\x3dkey_competitor\x26info\x3dview_CompetitorView|id_" + a;
            case "marketactivity":
                return "/mobile/crms/" + a + "?module\x3dkey_marketactivity\x26info\x3dview_MarketactivityView|id_" + a;
            case "contract":
                return "/mobile/crms/" + a + "?module\x3dkey_contract\x26info\x3dview_ContractView|id_" + a;
            case "clue":
                return "/mobile/crms/" + a + "?module\x3dkey_clue\x26info\x3dview_ClueView|id_" + a;
            case "contact":
                return "/mobile/crms?module\x3dkey_contact\x26info\x3dview_ContactView|id_" + a
            }
        },
        rednerOtherModuleUrl: function(a, c) {
            switch (a) {
            case "calendar":
                return "/mobile/calendar/" + c.id;
            case "task":
                return "/mobile/task/list/" + c.id;
            case "document":
                return "/mobile/documents/" + c.id;
            case "customer":
                return "/mobile/crms?module\x3dkey_customer\x26info\x3dview_CustomerListView|userId_" + c.id + "|sex_" + (c.sex && "female" == c.sex ? 0 : 1);
            case "saleChance":
                return "/mobile/crms?module\x3dkey_salechance\x26info\x3dview_SaleChanceListView\x26menu\x3dkey_mineManager|userId_" + c.id + "|sex_" + (c.sex && "female" == c.sex ? 0 : 1);
            case "production":
                return "/mobile/crms?module\x3dkey_production\x26info\x3dview_ProductionListView\x26menu\x3dkey_mineManager|userId_" + c.id + "|sex_" + (c.sex && "female" == c.sex ? 0 : 1);
            case "competitor":
                return "/mobile/crms?module\x3dkey_competitor\x26info\x3dview_CompetitorListView\x26menu\x3dkey_mineManager|userId_" + c.id + "|sex_" + (c.sex && "female" == c.sex ? 0 : 1);
            case "marketactivity":
                return "/mobile/crms?module\x3dkey_marketactivity\x26info\x3dview_MarketactivityListView\x26menu\x3dkey_mineManager|userId_" + c.id + "|sex_" + (c.sex && "female" == c.sex ? 0 : 1);
            case "contract":
                return "/mobile/crms?module\x3dkey_contract\x26info\x3dview_ContractListView\x26menu\x3dkey_mineManager|userId_" + c.id + "|sex_" + (c.sex && "female" == c.sex ? 0 : 1);
            case "workflow":
                return "/mobile/workflows/" + c.id;
            case "mainline":
                return "/mobile/mainlines/" + c.id;
            case "blog":
                return "/mobile/blog/" + c.id;
            case "workreport":
                return "/mobile/workreport/" + c.id
            }
        },
        isCrmModule: function(a) {
            return "customer" == a || "contact" == a || "saleChance" == a || "production" == a || "competitor" == a || "marketactivity" == a || "clue" == a || "contract" == a || "orderform" == a || "saleTarget" == a || "price" == a ? !0 : !1
        },
        fixedTop: function() {
            $("html,body").animate({
                scrollTop: 0
            }, 200)
        },
        getCurParaJson: function() {
            var a = {}
              , c = decodeURI(window.location.href);
            if (-1 != c.indexOf("?"))
                for (var c = c.split("?")[1].split("|"), d = 0; d < c.length; d++)
                    a[c[d].split("_")[0]] = unescape(c[d].split("_")[1]);
            return a
        },
        getWeekDate: function(a) {
            a = a.clone().endOfISOWeek();
            return {
                year: a.getFullYear(),
                month: a.getMonth() + 1,
                week: 1 + Math.floor(a.daysSince(a.clone().beginningOfYear()) / 7)
            }
        },
        getWeeksOfYear: function(a) {
            var c = 0 == a % 4 && 0 != a % 100 || 0 == a % 400 ? 366 : 365;
            a = new Date(a,11,31);
            7 > a.getDay() && (c -= a.getDay());
            return Math.ceil(c / 7)
        },
        getIsoWeekOfYear: function(a) {
            return Date.create(a).getISOWeek()
        },
        getYearOfIsoWeek: function(a) {
            var c = Date.create(a);
            a = c.getISOWeek();
            var d = c.format("{MM}")
              , c = c.format("{yyyy}");
            return 1 == d && 50 < a ? c - 1 : 12 == d && 3 > a ? c + 1 : c
        },
        getBeginningOfIsoWeek: function(a, c) {
            "number" == typeof a && (a += "");
            "string" == typeof c && (c = Number(c));
            var d = Date.create(a + "-01-04");
            d.addDays(7 * (c - 1));
            return d = d.beginningOfISOWeek()
        },
        getEndOfIsoWeek: function(a, c) {
            "number" == typeof a && (a += "");
            "string" == typeof c && (c = Number(c));
            var d = Date.create(a + "-01-04");
            d.addDays(7 * (c - 1));
            return d = d.endOfISOWeek()
        },
        getWeekDayDate: function(a, c, d) {
            a = new Date(a,"0","4");
            var f = a.getTime();
            a.setTime(f + 6048E5 * (c - 1));
            return this.getNextDate(a, d)
        },
        getNextDate: function(a, c) {
            c %= 7;
            var d = a.getDay()
              , f = a.getTime();
            a.setTime(f + 864E5 * (c - d));
            return a
        },
        removeDisableModules: function(a) {
            _.each(TEAMS.disableModules, function(c) {
                $(a).filter('[acl-module-id\x3d"' + c.moduleId + '"]').remove()
            })
        },
        isModuleAdmin: function(a) {
            // var c = !1;
            // a && "biaoge" == a && (a = "form");
            // (TEAMS.currentUser.admin || TEAMS.currentUser.moduleAdmin) && a && -1 != $.inArray(a, TEAMS.currentUser.modules) && (c = !0);
            // return c
        },
        isDisableModule: function(a) {
            return _.some(TEAMS.disableModules, function(c) {
                return c.moduleId == a || c.module == a && 100 > c.moduleId
            })
        },
        moduleIsPay: function(a) {
            var c = !1;
            _.each(TEAMS.payModules, function(d) {
                d.module == a && (c = !0)
            });
            return c
        },
        isInside: function() {
            var a = [];
            a.push("t7akvdnf84");
            a.push("twy1tuabj9");
            a.push("tyyb04cn06");
            a.push("toc6mlwijr");
            a.push("thtgj53iuz");
            a.push("tvqn9exthz");
            return -1 < a.indexOf(TEAMS.currentTenant.tenantKey.toLowerCase()) ? !0 : !1
        },
        getCommonServerUrl: function(a, c) {
            this.isCrmModule(c) ? a = TEAMS.service.crm + a : "document" == c ? a = TEAMS.service.docUrl + a : "formdatereport" == c ? a = TEAMS.service.formreport + a : "workflow" == c ? a = TEAMS.service.flow + a : "hrcontract" == c || "hruserinfo" == c || "kpiFlow" == c || "kpiSchemeSetting" == c ? a = TEAMS.service.hr + a : "app" == c && (a = TEAMS.service.paas + a);
            return a
        },
        hasCreatePermission: function(a, c, d, f) {
            window.compCache || (window.compCache = {});
            var h = "createPermission_" + c;
            d && (h += "_" + d);
            if (void 0 != window.compCache[h])
                f && f(window.compCache[h]);
            else {
                var k = this;
                $.ajax({
                    type: "post",
                    url: a + "/comp/permission/create/hasCreatePermission",
                    dataType: "json",
                    data: {
                        module: c,
                        appId: d
                    },
                    success: function(a) {
                        0 == a.actionMsg.code ? (window.compCache[h] = a.data,
                        f && f(window.compCache[h])) : k.notify(a.actionMsg.message)
                    },
                    error: function(a) {
                        k.notify(a)
                    }
                })
            }
        },
        getFieldPermissionConfig: function(a, c, d, f, h) {
            window.compCache || (window.compCache = {});
            var k = "fieldPermissionConfig_" + c;
            d && (k += "_" + d);
            window.compCache[k] ? f && f(window.compCache[k]) : $.ajax({
                type: "post",
                url: a + "/comp/permission/field/getFieldPermissionConfig",
                dataType: "json",
                data: {
                    module: c,
                    appId: d
                },
                success: function(a) {
                    0 == a.actionMsg.code ? (window.compCache[k] = a.data,
                    f && f(window.compCache[k])) : h && h(a)
                },
                error: function(a) {
                    h && h(a)
                }
            })
        },
        getNoPermissionFields: function(a, c, d, f, h) {
            window.compCache || (window.compCache = {});
            var k = "noPermissionFields_" + c;
            d && (k += "_" + d);
            window.compCache[k] ? f && f(window.compCache[k]) : $.ajax({
                type: "post",
                url: a + "/comp/permission/field/getNoPermissionFields",
                dataType: "json",
                data: {
                    module: c,
                    appId: d
                },
                success: function(a) {
                    0 == a.actionMsg.code ? ((a = a.data) || (a = []),
                    window.compCache[k] = a,
                    f && f(window.compCache[k])) : h && h(a)
                },
                error: function(a) {
                    h && h(a)
                }
            })
        },
        getPreviewMaxSize: function() {
            return max_file_size = "undefined" == typeof TEAMS.currentTenant.previewLimit ? 0 : TEAMS.currentTenant.previewLimit
        },
        getI18nDate: function(b, c) {
            return "year" == c ? a[TEAMS.perLang][c] || "" : a[TEAMS.perLang][c][b - 1] || ""
        },
        getFsearchTenant: function() {
            if ("undefined" != typeof fullsearchOpenAll && fullsearchOpenAll())
                return console.log("true"),
                !0;
            this._loadAsyncFsearchJs();
            return !1
        },
        _loadAsyncFsearchJs: function() {
            try {
                "undefined" == typeof fsearchJs && (fsearchJs = "develop" == TEAMS.runMode ? TEAMS.service.fullsearch + "/static/js/mobile/fullsearch/mobilefullsearchview.js" : TEAMS.service.fullsearch + "/static/js/fs" + window.lang_v + ".js?v\x3d" + TEAMS.version + "\x26time\x3d" + (new Date).getTime(),
                d.async(fsearchJs, function(a) {
                    d.async(TEAMS.service.fullsearch + "/static/js/fsearch/mobileFSUtils.js", function(a) {})
                }))
            } catch (a) {}
        },
        gcj02_to_bd09: function(a, c, d) {
            var f = -1 != TEAMS.service.base.toLowerCase().indexOf("https://") ? "https://" : "http://";
            $.ajax({
                url: f + "api.map.baidu.com/geoconv/v1/?coords\x3d" + a + "," + c + "\x26from\x3d3\x26to\x3d5\x26ak\x3d5QlDX8l9izc0mHeDEsRQe1mIEGjs9nE9",
                type: "GET",
                dataType: "jsonp",
                success: function(a) {
                    d(a)
                }
            })
        },
        fetionLocation: function(a) {
            var c = 15
              , d = setInterval(function() {
                if (window.fetionReady) {
                    clearInterval(d);
                    window.fetionLocationCallback = function(c) {
                        window.fetionLocationCallback = void 0;
                        c = JSON.parse(c);
                        utils.gcj02_to_bd09(c.longitude, c.latitude, function(c) {
                            a({
                                status: c.status,
                                lng: c.result[0].x,
                                lat: c.result[0].y
                            })
                        })
                    }
                    ;
                    var f = JSON.stringify({
                        backId: "1234",
                        backFunc: "fetionLocationCallback"
                    });
                    navigator.WebContainer ? navigator.WebContainer.rcsNewGetCurrentLocation(f) : window.WebContainer.rcsNewGetCurrentLocation(f)
                } else
                    0 == c ? (window.clearInterval(d),
                    a({
                        status: -1
                    })) : c--
            }, 100)
        }
    }
});
define("mobile/enter/router", ["mobile/enter/app"], function(d, l, n) {
    var c = d("mobile/enter/app");
    d = Backbone.Router.extend({
        initialize: function(a) {
            this.app = new c;
            this.app.renderEbgFormDetail("biaoge", "mobileform")
        },
        commentMap: function(a, b, c) {
            this.app.renderCommentMap(a, b, c)
        },
        subscribe: function(a, b) {
            this.app.subscribe(a, b)
        },
        relformstatdata: function(a, b, c) {
            this.app.relformstatdata(a, b, c)
        },
        home: function(a) {
            this.app.renderHome(a)
        },
        salary: function() {
            this.app.renderSalary()
        },
        home_session: function() {},
        set: function() {
            this.app.renderSet()
        },
        signaturemanage: function() {
            this.app.renderSignatureManage()
        },
        invite: function() {
            this.app.renderInvite()
        },
        invitsmartheer: function() {
            this.app.renderInvitsmartheer()
        },
        invitsmartheerrule: function() {
            this.app.renderInvitsmartheer("rule")
        },
        invitsmartheerrecords: function() {
            this.app.renderInvitsmartheerRecords()
        },
        renderUserCenter: function(a) {
            this.app.renderUserCenter(a)
        },
        renderUserListCalendar: function() {
            this.app.renderUserListType("calendar")
        },
        renderUserList: function(a) {
            this.app.renderUserList(a)
        },
        renderUserFollowList: function(a) {
            this.app.renderUserFollowList(a)
        },
        renderUserFollowMe: function(a) {
            this.app.renderUserFollowMe(a)
        },
        renderUserSubList: function(a) {
            this.app.renderUserSubList(a)
        },
        renderUserInSubList: function(a) {
            this.app.renderUserInSubList(a)
        },
        renderPositionUserList: function(a) {
            this.app.renderPositionUserList(a)
        },
        contactSearch: function(a) {
            this.app.renderContactSearch(a)
        },
        renderEmployeeInfo: function(a) {
            this.app.renderEmployeeInfo(a)
        },
        renderEmployeeEdit: function(a) {
            this.app.renderEmployeeEdit(a)
        },
        department: function() {
            this.app.renderDepartment()
        },
        position: function() {
            this.app.renderPosition()
        },
        mainlines: function(a, b) {
            this.app.renderMainline(a, b)
        },
        mainlineSearch: function(a) {
            this.app.renderMainlineSearch(a)
        },
        mainlinelinkPermission: function(a, b, c) {
            this.app.renderMainlineLinkPermission(a, b, c)
        },
        mainlinelink: function(a, b) {
            this.app.renderMainlineLink(a, b)
        },
        mainlinelinksearch: function(a, b) {
            this.app.renderMainlineLinkSearch(a, b)
        },
        myteams: function() {
            this.app.renderTeams()
        },
        forms: function(a, b) {
            "search" == b ? this.app.renderFormsSearch(a) : this.app.renderForms(a)
        },
        biaogeforms: function() {
            this.app.renderBiaogeForms()
        },
        renderFormsType: function(a, b) {
            this.app.renderBiaogeForms(a, b)
        },
        renderFormById: function(a, b, c) {
            this.app.renderFormById(a, b, c)
        },
        ebgformList: function(a, b) {
            this.app.renderEbgFormList(a, b)
        },
        ebgformSearch: function(a) {
            this.app.renderEbgFormSearch(a)
        },
        ebgformCateList: function(a, b) {
            this.app.renderEbgFormCateList(a, b)
        },
        ebgformDetail: function(a, b) {
            "personal" == b || "company" == b ? this.ebgformList(a, b) : this.app.renderEbgFormDetail(a, b)
        },
        mobileform: function() {
            this.app.renderEbgFormDetail("biaoge", "mobileform")
        },
        workflowpre: function(a, b) {
            this.app.renderWorkflowpre(a, b)
        },
        ebgformCopy: function(a, b) {
            this.app.renderEbgFormCopy(a, b)
        },
        mainlineinfo: function(a) {
            this.app.renderMainlineInfo(a)
        },
        mainlinecover: function(a, b) {
            this.app.renderMainlineCover(a, b)
        },
        mainlinedynamic: function(a) {
            this.app.renderMainlineDynamic(a)
        },
        mainlineadd: function() {
            this.app.renderMainlineAdd()
        },
        mainlinecategory: function() {
            this.app.renderMainlineCategory()
        },
        mainlinenew: function(a) {
            this.app.renderMainlineNew(a)
        },
        mainlinereport: function(a) {
            this.app.renderMainlineReport(a)
        },
        mainlinereportcomplete: function(a, b) {
            this.app.renderMainlineReportComp(b, a)
        },
        mainlinereportcompdetail: function(a, b, c) {
            this.app.renderMainlineReportCompDetail(a, b, c)
        },
        mainlinereportplan: function(a) {
            this.app.renderMainlineReportPlan(a)
        },
        mainlinereportplandetail: function(a, b) {
            this.app.renderMainlineReportPlanDetail(b, a)
        },
        mainline_etinfo: function(a) {
            this.app.renderEtInfo("mainline", a)
        },
        taskList: function(a) {
            this.app.renderTasks(a)
        },
        taskNav: function(a, b) {
            this.app.renderTaskByType(a, b)
        },
        subtaskList: function(a) {
            this.app.renderSubtasks(a)
        },
        subtaskWeight: function(a, b) {
            this.app.renderSubtaskWeight(a, b)
        },
        taskInfo: function(a, b) {
            this.app.renderTask(a, b)
        },
        taskAdd: function(a, b) {
            this.app.renderTaskAdd(a, b)
        },
        taskSearch: function(a) {
            this.app.renderTaskSearch(a)
        },
        task_etinfo: function(a) {
            this.app.renderEtInfo("task", a)
        },
        timecard: function() {
            this.app.renderTimecard()
        },
        oattend: function(a, b, c, d) {
            this.app.renderOattend(a, b, c, d)
        },
        oattendCrm: function(a) {
            this.app.showCrmMobile(a)
        },
        todayattend: function() {
            this.app.renderTodayattend()
        },
        attenddetail: function(a, b) {
            this.app.renderAttenddetail(a, b)
        },
        maptrack: function(a) {
            this.app.renderMaptrack(a)
        },
        createappeal: function(a, b, c, d, f) {
            this.app.renderAttendAppeal("new", a, b, c, d, f)
        },
        attendappeal: function(a, b) {
            this.app.renderAttendAppeal(a, null, null, null, b)
        },
        checkMap: function(a, b, c, d) {
            this.app.renderCheckMap(a, b, c, d)
        },
        checkCrmMap: function(a, b, c, d, f, h) {
            this.app.renderCheckMap(a, b, c, d, f, h)
        },
        oattendCheckMap: function(a, b, c, d, f) {
            this.app.renderOattendCheckMap(a, b, c, d, f)
        },
        otherTimecard: function() {
            this.app.renderOtherTimecard()
        },
        orbitchartmap: function(a, b) {
            this.app.renderOrbitchartMap(a, b)
        },
        orbitchartlist: function(a, b) {
            this.app.renderOrbitchartList(a, b)
        },
        oattendtasklist: function(a, b, c, d, f) {
            this.app.renderOattendTaskList(a, b, c, d, f)
        },
        oattendtasksearch: function(a, b, c, d, f) {
            this.app.renderOattendTaskSearch(a, b, c, d, f)
        },
        oattendmainlinelist: function(a, b, c, d, f) {
            this.app.renderOattendMainlineList(a, b, c, d, f)
        },
        oattendmainlinesearch: function(a, b, c, d, f) {
            this.app.renderOattendMainlineSearch(a, b, c, d, f)
        },
        oattendworkflowlist: function(a, b, c, d, f) {
            this.app.renderOattendWorkFlowList(a, b, c, d, f)
        },
        oattendworkflowsearch: function(a, b, c, d, f) {
            this.app.renderOattendWorkFlowSearch(a, b, c, d, f)
        },
        todayOattendMap: function(a, b, c, d, f, h, k, l) {
            this.app.renderTodayOattendMap(a, b, c, d, f, h, k, l)
        },
        oattendcalendar: function(a, b, c, d, f) {
            this.app.renderOattendCalendar(a, b, c, d, f)
        },
        abnormal: function() {
            this.app.renderAbnormal()
        },
        attendinfo: function(a) {
            this.app.renderAttendInfo(a)
        },
        workreport: function(a, b, c, d) {
            this.app.renderWorkreport(a, b, c, d)
        },
        addnewworkreport: function(a, b, c, d) {
            this.app.renderAddNewWorkreport(a, b, c, d, "new")
        },
        newWorkreport: function(a) {
            this.app.renderNewWorkreport("new", null, null, a, null, "oldwechatnew")
        },
        workreportInfo: function(a, b) {
            this.app.renderWorkreportInfo(a, b)
        },
        weeklyblog: function(a, b) {
            this.app.renderWeeklyBlog(a, b)
        },
        workreports: function(a, b) {
            this.app.renderWorkreports(a, b)
        },
        reportWorkreport: function(a, b) {
            this.app.renderReportWorkreport(a, b)
        },
        workreportByYear: function(a) {
            this.app.renderWorkreportByYear(a)
        },
        workreporttimeline: function(a) {
            this.app.renderWorkreportTimeLine(a)
        },
        taglink: function(a, b) {
            this.app.renderTagLink(a, b)
        },
        taglist: function() {
            this.app.renderTagList()
        },
        tagSearch: function(a) {
            this.app.renderTagSearch(a)
        },
        documentlist: function(a, b, c, d) {
            "search" == a ? this.app.renderDocSearch() : "add" == a ? this.app.renderDocNew({
                folderId: b
            }) : this.app.renderDocuments(a, b, c, d)
        },
        document: function(a, b) {
            "search" == a ? this.app.renderDocSearch(b) : this.app.renderDocument(a, b)
        },
        documentinfo: function(a) {
            this.app.renderDocument(TEAMS.currentUser.id, a)
        },
        workflowlist: function(a) {
            "search" == a ? this.app.renderFlowSearch() : "trashbinsearch" == a ? this.app.renderFlowTrashBinSearch() : "trashbin" == a ? this.app.renderTrashbinWorkflows() : "flowintroduce" == a ? this.app.renderFlowintroduce() : this.app.renderWorkflows(a)
        },
        flowmanages: function(a, b) {
            this.app.renderFlowmanages(a, b)
        },
        flowmanagessearch: function(a, b) {
            this.app.renderFlowmanagesSearch(a, b)
        },
        flowstatuser: function() {
            this.app.renderFlowStatUser()
        },
        flowdatastatlist: function(a, b, c, d, f) {
            "headerset" == a ? this.app.renderFlowDataStatListHeaderSet(a, b) : this.app.renderFlowDataStatList(a, b, c, d, f)
        },
        flowdatastatlistsearch: function(a, b) {
            this.app.renderFlowDataStatListSearch(a, b, "keyword")
        },
        flowdatastatsearch: function(a) {
            this.app.renderFlowDataStatSearch(a)
        },
        workflowbatch: function(a) {
            this.app.renderWorkflowbatch(a)
        },
        flowseniorsearch: function() {
            this.app.renderFlowSeniorSearch()
        },
        workflow: function(a, b) {
            "flowdatastat" == a ? this.app.renderFlowDataStat("flowdatastat", b) : "flowcomprestat" == a ? this.app.renderFlowCompreStat("flowcomprestat", b) : "flowstat" == a ? this.app.renderFlowStat("flowstat", b) : "flowmanages" == a ? this.flowmanages("flowmanages", b) : "flowmanagessearch" == a ? this.flowmanagessearch("flowmanagessearch", b) : "flowpermissions" == a ? this.app.renderFlowpermissions(b) : "search" == a ? this.app.renderFlowSearch(b) : this.app.renderWorkflow(a, b)
        },
        createworkflow: function(a, b) {
            this.app.renderNewWorkflow(a, b)
        },
        renderFilterFlows: function(a) {
            this.app.renderFilterFlows(TEAMS.currentUser.id, a)
        },
        renderFilterFlows: function(a, b) {
            isNaN(a) ? this.app.renderFilterFlows(TEAMS.currentUser.id, a) : this.app.renderFilterFlows(a, b)
        },
        workflowinfo: function(a) {
            this.app.renderWorkflow(TEAMS.currentUser.id, a)
        },
        flowSearch: function(a) {
            this.app.renderFlowSearch(a)
        },
        calendar: function(a) {
            this.app.renderCalendar(a)
        },
        calendarAdd: function(a) {
            this.app.renderAgendaAdd(a)
        },
        calendarSearch: function(a) {
            this.app.renderCalendarSearch(a)
        },
        agenda: function(a, b) {
            this.app.renderAgendaEdit(a, b)
        },
        repeatAgenda: function(a, b, c) {
            this.app.renderRepeatAgendaEdit(a, b, c)
        },
        viewAgenda: function(a) {
            this.app.renderWechatAgenda(a)
        },
        blog: function(a) {
            this.app.renderBlog(a)
        },
        blogadd: function() {
            this.app.renderBlogAdd()
        },
        blogType: function(a, b) {
            this.app.renderBlog(b, a)
        },
        bloginfo: function(a, b) {
            this.app.renderBlogInfo(a, b)
        },
        bloginfoOther: function(a, b, c) {
            this.app.renderBlogInfo(a, b, c)
        },
        blogById: function(a) {
            this.app.renderBlogInfoId(a)
        },
        blogother: function() {
            this.app.renderBlog(TEAMS.currentUser.id, "other")
        },
        blogunread: function() {
            this.app.renderBlog(TEAMS.currentUser.id, "unread")
        },
        blogcomment: function() {
            this.app.renderBlog(TEAMS.currentUser.id, "comment")
        },
        blogreplay: function() {
            this.app.renderBlog(TEAMS.currentUser.id, "replay")
        },
        reportBlog: function() {
            this.app.renderReportBlog()
        },
        showCrmMobile: function(a) {
            this.app.showCrmMobile(a)
        },
        showSmsMobile: function(a) {
            this.app.showSmsMobile(a)
        },
        showPaasMobile: function(a, b) {
            this.app.showPaasMobile(a, b)
        },
        showCustomPage: function(a) {
            this.app.showCustomPage(a)
        },
        showPortalMobile: function(a, b) {
            this.app.showPortalMobile(a, b)
        },
        showHrMobile: function(a) {
            this.app.showHrMobile(a)
        },
        messagebox: function() {
            this.app.renderMessageBox()
        },
        feed: function(a) {
            this.app.renderFeedSearch(a)
        },
        remind: function(a) {
            this.app.renderMessageRemind(a)
        },
        remindApply: function(a, b) {
            this.app.renderApplyMessageRemind(a, b)
        },
        old_dynamicInfo: function() {
            this.dynamicList()
        },
        old_dynamicNew: function() {
            this.dynamicAdd()
        },
        dynamicList: function() {
            this.app.renderDynamicList()
        },
        dynamicAdd: function() {
            this.app.renderDynamicAdd()
        },
        dynamicInfo: function(a) {
            this.app.renderDynamicInfo(a)
        },
        searchall: function(a) {
            this.app.searchAll(a)
        },
        fullsearch: function(a) {
            this.app.fullsearch(a)
        },
        searchcomment: function(a, b) {
            this.app.searchComment(a, b)
        },
        wechat: function() {
            this.app.wechatlist()
        },
        wechatOne: function(a) {
            this.app.wechat("chat", a)
        },
        wechatChannel: function(a) {
            this.app.wechat("channel", a)
        },
        wechatinfo: function(a, b) {
            this.app.wechatinfo(a, b)
        },
        wechathistory: function(a, b) {
            this.app.wechathistory(a, b)
        },
        formDataReportList: function(a) {
            this.app.formDataReportList(a)
        },
        formDataReportSearchList: function(a) {
            this.app.writeFormSearch(a)
        },
        formDataReport: function(a, b) {
            "search" == a ? this.app.formDataReportSearch(b) : this.app.formDataReport(a, b)
        },
        formDataReportInfo: function(a) {
            this.app.formDataReport(TEAMS.currentUser.id, a)
        },
        formdatastatisticschat: function(a) {
            this.app.formdatastatisticschat(a)
        },
        formdatastatdetail: function(a, b) {
            this.app.formdatastatdetail(a, b)
        },
        imsysmsg: function(a, b) {
            this.app.imsysmsg(a, b)
        },
        formDataReportSearch: function(a) {
            this.app.formDataReportSearch(a)
        },
        formStatDataTable: function(a) {
            this.app.formStatDataTable(a)
        },
        formStatDataTableForUserId: function(a, b) {
            "search" == a ? this.app.formStatDataTableSearch(b) : this.app.formStatDataTable(b)
        },
        formStatDataTableSearch: function(a) {
            this.app.formStatDataTableSearch(a)
        },
        formdatadetail: function(a, b) {
            this.app.formdatadetail(a, b)
        },
        formdataReportDetail: function(a) {
            this.app.formdataReportDetail(a)
        },
        formdataReportDetailForUserId: function(a, b) {
            this.app.formdataReportDetail(b)
        },
        writereport: function(a) {
            this.app.writereport(a)
        },
        free_navigation: function(a, b, c, d, f, h) {
            this.app.renderFreeApplication(c, d, a, b, f, h)
        }
    });
    n.exports = d
});
