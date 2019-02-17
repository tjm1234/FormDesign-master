define("form/component/agendalist", ["form/tplutil"], function(n, y, u) {
    var m = n("form/tplutil");
    n = Backbone.View.extend({
    });
    u.exports = n
});
define("form/component/departselecter", ["form/tplutil"], function(n, y, u) {
    var m = n("form/tplutil");
    n = Backbone.View.extend({
        
    });
    u.exports = n
});

define("form/component/department", ["form/editablecomponent", "form/tplutil", "form/component/departselecter", "form/abposview"], function(n, y, u) {
    var m = n("form/editablecomponent")
      , h = n("form/tplutil")
      , g = n("form/component/departselecter")
      , f = n("form/abposview");
    window.Department = m.extend({
    });
    u.exports = window.Department
});

define("form/component/customercomponent", "form/relatecomponent form/tplutil form/componentmodel form/component/entityselecter form/component/customerlist form/component/typeahead form/component/relevancecontrol form/abposview".split(" "), function(n, y, u) {
    var m = n("form/relatecomponent")
      , h = n("form/tplutil")
      , g = n("form/componentmodel")
      , f = n("form/component/entityselecter")
      , d = n("form/component/customerlist")
      , b = n("form/component/typeahead")
      , c = n("form/component/relevancecontrol")
      , l = n("form/abposview");
    window.CustomerComponent = m.extend({
        initialize: function(e) {
            m.prototype.initialize.call(this, e);
            var a = {
                componentKey: "CustomerComponent",
                title: "\u5173\u8054\u5ba2\u6237",
                cusfields: [],
                cusCustomFields: [],
                newSortColumn: [],
                selectColumn: [],
                orderContent: ""
            };
            null != e && (a.title = e.title,
            a.cusfields = e.cusfields,
            a.newSortColumn = e.newSortColumn,
            a.selectColumn = e.selectColumn,
            a.orderContent = e.orderContent,
            a.cusCustomFields = e.cusCustomFields);
            this.componentSetup = $.extend(this.componentSetup, a);
            this.basefields = {
                manager: "\u5ba2\u6237\u7ecf\u7406",
                status: "\u5ba2\u6237\u72b6\u6001",
                fax: "\u5ba2\u6237\u4f20\u771f",
                email: "\u5ba2\u6237\u90ae\u4ef6",
                zipCode: "\u5ba2\u6237\u90ae\u7f16",
                telphone: "\u5ba2\u6237\u7535\u8bdd",
                type: "\u5ba2\u6237\u7c7b\u578b",
                industry: "\u5ba2\u6237\u884c\u4e1a",
                region: "\u5ba2\u6237\u5730\u533a",
                site: "\u5ba2\u6237\u7f51\u7ad9",
                address: "\u5ba2\u6237\u5730\u5740"
            };
            this.tpl = h.get("customercomponent", {
                isMobileForm: this.isMobileForm
            });
            this.componentModel = new g
        },
        setCusCustomFields: function(e) {
            this.componentSetup.cusCustomFields = e
        },
        setCusfields: function(e) {
            this.componentSetup.cusfields = e
        },
        setNewSortColumn: function(e) {
            this.componentSetup.newSortColumn = e
        },
        setSelectColumn: function(e) {
            this.componentSetup.selectColumn = e
        },
        setOrderContent: function(e) {
            this.componentSetup.orderContent = e
        },
        render: function(e) {
            var a = this
              , c = $(this.tpl).siblings("#form-customer");
            if (1 == e.parents("div[componentKey\x3d'TableLayout']").length || 1 == e.parents("div[componentKey\x3d'ColumnPanel']").length)
                e.removeClass("field-hoz"),
                this.componentSetup.titleLayout = "";
            this.componentModel.generatorId(function(c) {
                c = c.generatorId;
                a.componentSetup.tempId = c;
                e.attr("tempId", c)
            });
            m.prototype.render.call(this, e, c);
            e.html(c.html())
        },
        renderEditPreview: function(e, a) {
            var c = $(this.tpl).siblings("#form-customer");
            m.prototype.renderEditPreview.call(this, e, c);
            a ? e.replaceWith(c) : e.append(c)
        },
        renderEditor: function() {
            var e = this
              , a = $(this.tpl).siblings("#editor-customer")
              , c = !1;
            if ("true" == this.componentSetup.isUnique || 1 == this.componentSetup.isUnique)
                c = !0;
            a.find("#isUnique").attr("checked", c);
            if (1 == $("#widget-control .field-active").parents("div[componentKey\x3d'TableLayout']").length || 1 == $("#widget-control .field-active").parents("div[componentKey\x3d'ColumnPanel']").length)
                $("#widget-control .field-active").removeClass("field-hoz"),
                this.componentSetup.titleLayout = "";
            e.getFormIdByModule("customer", a);
            a.find(".j_showField .j_customer-field-ul").empty();
            var d = this.componentSetup.cusfields;
            if (d && 0 < d.length) {
                for (c = 0; c < d.length; c++) {
                    var f = d[c]
                      , l = a.find(".j_clone .j_customer-field-li").clone();
                    l.find("#" + f).attr("selected", "selected");
                    a.find(".j_showField .j_customer-field-ul").append(l)
                }
                a.find(".j_showField").removeClass("hide");
                a.find(".j_batch_edit").removeClass("hide");
                a.find(".j_cardConf").addClass("hide")
            }
            m.prototype.renderEditor.call(this, a);
            $("#editor-component").html(a.html());
            new b({
                remote: "/customer/suggestion.json",
                entity: "customer",
                changeValue: function() {
                    e.setDefaultValue()
                }
            });
            if ((a = this.componentSetup.content) && 0 < a.length)
                for (d = $("#editor-component").find(".js_entity_container"),
                c = 0; c < a.length; c++)
                    f = {
                        id: a[c].optionId,
                        name: a[c].content
                    },
                    l = $('\x3cspan name\x3d"js_entity_item" class\x3d"js_entity_item employee-item j_component"\x3e\x3ca data-id\x3d"' + f.id + '" data-module\x3d"" id\x3d"' + f.id + '" class\x3d"entitybox-toggle" title\x3d"' + f.name + '"\x3e' + f.name + '\x3c/a\x3e\x3ca class\x3d"close js_deleteItem" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e'),
                    l.data("obj", f),
                    d.append(l)
        },
        getFormIdByModule: function(e, a) {
            var c = this;
            $.ajax({
                type: TEAMS.ajaxMethod,
                dataType: "json",
                async: !1,
                url: TEAMS.api.getFormId,
                data: {
                    module: e
                },
                success: function(b) {
                    (b = b.data) && c.getFieldsByFormId(b, e, a)
                }
            })
        },
        getFieldsByFormId: function(e, a, c) {
            var b = {};
            b.formId = e;
            b.module = a;
            e = [];
            e.push("0");
            b.statusList = e;
            $.ajax({
                contentType: "application/json",
                type: TEAMS.ajaxMethod,
                async: !1,
                data: JSON.stringify(b),
                dataType: "json",
                url: TEAMS.api.queryFormFieldsByFormId,
                success: function(a) {
                    if (a && a.formField)
                        for (var e = 0; e < a.formField.length; e++) {
                            var b = a.formField[e];
                            b["delete"] || "SignatureComponent" == b.componentKey || c.find(".j_clone .j_customer-field-li select").append('\x3coption class\x3d"j_option j_custom_option" value\x3d"' + b.id + '" id\x3d"' + b.id + '"\x3e' + b.title + "\x3c/option\x3e")
                        }
                }
            })
        },
        setDefaultValue: function() {
            var e = $("#editor-component").find(".js_entity_container .js_entity_item")
              , a = [];
            0 < e.length && e.each(function(e) {
                var c = $(this).data("obj");
                a[e] = {
                    optionId: c.id,
                    content: c.name
                }
            });
            this.componentSetup.content = a
        },
        renderPreview: function(e, a, c, b, d) {
            var f = $(this.tpl);
            b = null;
            (b = $("body").find("#formTenantKey").val()) ? b = b.toUpperCase() : null != TEAMS.currentTenant && (b = TEAMS.currentTenant.tenantKey.toUpperCase());
            if ($("body").find("#scanReport").val() || null != TEAMS.currentUser && TEAMS.currentTenant.tenantKey.toUpperCase() == b)
                if (b = this.getCurrentModuleIsPay(d),
                0 == b || "false" == b) {
                    d = formPlugin.moduleIsPay("customer");
                    var l = $('\x3cspan class\x3d"employee-item"\x3e\u60a8\u7684\u56e2\u961f\u76ee\u524d\u662f\u514d\u8d39\u7248\u672c\uff0c\u4e0d\u652f\u6301\u6b64\u529f\u80fd\uff01\x3c/span\x3e');
                    "mobile" != window.systemInfo_form ? (b = f.siblings("#preview-customer"),
                    d || (b.find(".js_customeritem_container").empty().append(l),
                    b.find(".js_form-customer-add").addClass("hide"),
                    b.find(".typeahead-wrapper").remove())) : (b = f.siblings("#mobile-preview"),
                    d || b.find(".js_customeritem_container").removeClass("customer-seleted").empty().append(l))
                } else
                    b = "mobile" != window.systemInfo_form ? f.siblings("#preview-customer") : f.siblings("#mobile-preview");
            else
                b = f.siblings("#nocustomer-preview"),
                b.find(".field_message_js").attr("cid", this.cid);
            if ((f = TEAMS.disableModules) && 0 < f.length)
                for (d = 0; d < f.length; d++)
                    if (l = f[d],
                    l.module && "customer" == l.module) {
                        b.addClass("hide");
                        break
                    }
            b.find(".widget-title .widget-title_js").text(this.componentSetup.title);
            "true" != this.componentSetup.isHideTitle && 1 != this.componentSetup.isHideTitle || b.addClass("field-notitle").find(".widget-title .widget-title_js").addClass("hide");
            "true" != this.componentSetup.required && 1 != this.componentSetup.required || b.find(".widget-title .widget-required_js").text(" *");
            "" != this.componentSetup.describe && b.find(".field-description").text(this.componentSetup.describe).show();
            b.find(".check_js").data("componentData", this).attr("cid", this.cid).attr("id", (this.componentSetup.fieldId || this.componentSetup.tempId) + this.cid).attr("name", this.componentSetup.fieldId || this.componentSetup.tempId);
            b.attr("fieldId", this.componentSetup.fieldId || this.componentSetup.tempId).attr("id", "field_" + (this.componentSetup.fieldId || this.componentSetup.tempId)).attr("tempId", "field_" + (this.componentSetup.fieldId || this.componentSetup.tempId));
            "mobile" == window.systemInfo_form && b.find(".customer-seleted").attr("id", this.componentSetup.fieldId || this.componentSetup.tempId);
            f = this.componentSetup.isUnique;
            if ("true" == f || 1 == f)
                "mobile" != window.systemInfo_form ? b.find("#searchcustomer").removeAttr("data-multi") : b.find(".js_customeritem_container").attr("data-multi", "false");
            b.addClass(this.componentSetup.titleLayout);
            "true" != this.componentSetup.isDefault && 1 != this.componentSetup.isDefault || a || (a = this.componentSetup.content) && 0 < a.length && null != TEAMS.currentUser && this.setValue(b, {
                dataOptions: a
            });
            if (c || "true" == c)
                "mobile" != window.systemInfo_form ? this.readOnly(b, !0) : b.find(".js_customeritem_container").removeClass("customer-seleted").text("");
            if ("true" == this.componentSetup.isReadOnly || 1 == this.componentSetup.isReadOnly)
                "mobile" != window.systemInfo_form ? this.readOnly(b, !0) : (b.find(".js_customeritem_container").removeClass("customer-seleted"),
                (a = this.componentSetup.content) && 0 != a.length || b.find(".js_customeritem_container").text(""));
            this.getValue(b);
            this.el = e;
            e.append(b)
        },
        getCurrentModuleIsPay: function(e) {
            var a = !1;
            e && (a = formPlugin.moduleIsPay(e));
            return a
        },
        renderStatSearch: function(e) {
            var a = this
              , c = $(this.tpl)
              , b = e.parentEl
              , d = e.container
              , f = null
              , l = e.fieldId
              , g = e.subFormId
              , h = e.filterEl
              , m = e.fieldTitle
              , A = e.condition
              , x = e.ids
              , n = e.term
              , B = b.find(".j_formField-select select").find("option:selected").attr("module") || e.module;
            if ("mobile" != window.systemInfo_form) {
                f = c.siblings("#statsearch-entity");
                f.find(".control-btn").attr("mod", B);
                if (x)
                    for (f.find(".entity-container").empty(),
                    m = 0; m < x.length; m++)
                        e = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d"' + x[m].id + '" title\x3d"' + x[m].text + '"\x3e' + x[m].text + "\x3c/a\x3e\x3c/span\x3e",
                        f.find(".entity-container").append(e);
                n && f.find("select:first option[value\x3d" + n + "]").attr("selected", "true");
                x = (new Date).getTime();
                f.find(".j_entityContainer").attr("id", "j_customer" + x);
                b.attr("class", "sch-group j_formFieldSearchGroup");
                b.find(".j_formField-condition").html(f);
                if ("biaoge" == B) {
                    var D = $(d + " #j_customer" + x + " #typeahead-customer");
                    D.attr("fieldId", l).attr("pageNo", "1").attr("pageSize", "10");
                    D.parents(".j_entityContainer").find(".typeahead-search").attr("url", "/formdata/queryRelevanceDataOptions.json").attr("fieldId", l);
                    window.typeahead && window.typeahead.init && window.typeahead.init({
                        el: d + " #j_customer" + x + " #typeahead-customer",
                        remote: "/formdata/queryRelevanceDataOptions.json",
                        callback: function(e) {
                            if (e && !$.isEmptyObject(e)) {
                                var c = D.parents(".j_entityContainer").find(".j_selected");
                                a.renderTypeheader(c, e)
                            }
                        }
                    })
                }
            } else
                f = c.siblings("#statsearch-customer-mobile"),
                A && (f.find(".j_condition").find('option[value\x3d"' + A + '"]').attr("selected", !0),
                "null" != A && "notnull" != A || f.find(".j_control").hide()),
                h && (f.find("#seleted-list").empty(),
                h.find(".j_filterList .selectd #comp-val span").each(function() {
                    var a = $(this).attr("optionId")
                      , e = $(this).text()
                      , c = $("\x3cspan\x3e\x3c/span\x3e");
                    c.attr("id", a).text(e);
                    f.find("#seleted-list").append(c)
                })),
                d = {},
                d.fieldId = l,
                d.pageNo = 1,
                d.pageSize = "20",
                d.module = B,
                a.searchCustomer(d, f, l, m, b, g),
                b.off("change", "#statsearch-customer-mobile .j_condition").on("change", "#statsearch-customer-mobile .j_condition", function() {
                    var a = $(this).val();
                    "null" == a || "notnull" == a ? b.find("#statsearch-customer-mobile .j_control").hide() : b.find("#statsearch-customer-mobile .j_control").show()
                }),
                b.off("tap", "#statsearch-customer-mobile .j_optionli").on("tap", "#statsearch-customer-mobile .j_optionli", function() {
                    var a = $(this);
                    a.hasClass("selected") ? a.removeClass("selected") : a.addClass("selected");
                    var e = a.find(".j_optionname").text()
                      , a = a.attr("id")
                      , e = '\x3cspan id\x3d"' + a + '"\x3e' + e + "\x3c/span\x3e";
                    0 < b.find("#statsearch-customer-mobile #seleted-list #" + a).length ? b.find("#statsearch-customer-mobile #seleted-list #" + a).remove() : b.find("#statsearch-customer-mobile #seleted-list").append(e)
                }),
                b.off("tap", "#statsearch-customer-mobile .j_more").on("tap", "#statsearch-customer-mobile .j_more", function() {
                    var e = $(this)
                      , c = e.attr("pageNo")
                      , d = e.attr("fieldId")
                      , e = e.attr("title")
                      , k = {};
                    k.fieldId = d;
                    k.pageSize = "20";
                    k.pageNo = c;
                    k.module = B;
                    a.searchCustomer(k, f, d, e, b, g)
                })
        },
        renderTypeheader: function(e, a) {
            var c = a.name
              , b = a.id;
            if (c && b) {
                var d = '\x3cspan id\x3d"' + b + '" class\x3d"entity-item j_entity_item" name\x3d"j_entity_item"\x3e\x3ca title\x3d"' + c + '" id\x3d"' + b + '" class\x3d"entitybox-toggle" data-module\x3d"customer" data-value\x3d"' + b + '" data-id\x3d"' + b + '"\x3e' + c + "\x3c/a\x3e\x3c/span\x3e";
                e.find(".entity-item").each(function(a) {
                    b == $(this).find("a").attr("id") && (d = null)
                });
                e.append(d);
                e.find(".j_entity_item").data("object", a)
            }
        },
        searchCustomer: function(e, a, c, b, d, f) {
            $.ajax({
                type: TEAMS.ajaxMethod,
                url: "freeform/queryFormDataOptions.json",
                dataType: "json",
                data: e,
                success: function(e) {
                    var l = e.dataOptionPage;
                    if (0 == l.totalCount)
                        a.find(".j_noresult").removeClass("hide"),
                        a.find(".eui-cells").addClass("hide");
                    else
                        for (l.hasNext && a.find(".j_more").removeClass("hide").attr("pageNo", l.pageNo + 1).attr("fieldId", c).attr("title", b),
                        e = l.result,
                        1 == l.pageNo && a.find(".j_optionUl").empty(),
                        a.find("#seleted-list").attr("fieldId", c),
                        l = 0; l < e.length; l++) {
                            var g = e[l]
                              , h = g.content
                              , g = g.optionId
                              , m = a.find("#li-clone li").clone();
                            0 < a.find("#seleted-list").find("#" + g).length && m.addClass("selected");
                            m.find(".j_optionname").text(h);
                            m.attr("id", g);
                            a.find(".j_optionUl").append(m)
                        }
                    d.find("#component-div").html(a);
                    d.find(".j_comp-ok").attr("comKey", "CustomerComponent").attr("fieldId", c).attr("title", b).attr("subFormId", f)
                }
            })
        },
        submitCheck: function(e, a) {
            var c = this.check(e);
            a(c)
        },
        checkEvents: function(e) {
            var a = this
              , b = a.el || $(document)
              , l = (a.componentSetup.fieldId || a.componentSetup.tempId) + this.cid
              , g = a.componentSetup.newSortColumn
              , h = a.componentSetup.selectColumn
              , p = a.componentSetup.orderContent
              , w = a.componentSetup.isAddForRelation;
            (new this.customerAhead({})).initAhead(l, g, h, p, w);
            var m = a.componentSetup.isUnique;
            if ("mobile" == window.systemInfo_form)
                b.on("click", "#" + l + " .customer-seleted", function(e) {
                    e = $(this).attr("data-module");
                    var b = $(this).attr("data-multi")
                      , d = $(this).attr("data-noempty") && "true" == $(this).attr("data-noempty") ? !0 : !1
                      , k = $(this).parents(".j_page-view")
                      , g = k.attr("id")
                      , h = $(this);
                    if (!$(this).parents(".j_formpreview").hasClass("form-noedit")) {
                        var r = $("#" + l + " .customer-seleted .j_customer_detail")
                          , q = [];
                        r && 0 < r.length && r.each(function(a) {
                            a = $(this).find(".j_customer").attr("id");
                            var e = $(this).find(".j_customer").text();
                            q.push({
                                name: e,
                                id: a,
                                module: "customer"
                            })
                        });
                        "true" == m || 1 == m ? (h = new f,
                        h.render("mb", {
                            targetEl: $(this),
                            module: e,
                            multi: b,
                            preEl: "#" + g,
                            noempty: d,
                            seletedList: q,
                            cusfields: a.componentSetup.cusfields,
                            order: p
                        })) : 0 == q.length ? (h = new f,
                        h.render("mb", {
                            targetEl: $(this),
                            module: e,
                            multi: b,
                            preEl: "#" + g,
                            noempty: d,
                            seletedList: q,
                            cusfields: a.componentSetup.cusfields,
                            order: p
                        })) : (new c({
                            targetEl: h,
                            module: e,
                            multi: b,
                            preEl: "#" + g,
                            noempty: d,
                            seletedList: q,
                            cusfields: a.componentSetup.cusfields,
                            order: p
                        })).render();
                        k.addClass("hide")
                    }
                });
            b.off("entitySelected", "#" + l + " #searchcustomer").on("entitySelected", "#" + l + " #searchcustomer", function(e) {
                1 != m && "true" != m || $("#" + l + " .js_customeritem_container").empty();
                for (var c = 1; c < arguments.length; c++) {
                    var b = $("#" + l);
                    b.parents(".field_js").find(".form-error").text("");
                    b.parents(".field_js").find(".form-error").hide();
                    a.renderSelectItem(l, arguments[c], a.componentSetup.cusfields, b)
                }
                a.triggerFillRelate($(this))
            });
            b.on("click", "#" + l + " #searchcustomer", function(e) {
                window.abposview && window.abposview.remove();
                e.stopPropagation();
                $("#" + l + " .control-input").trigger("focusout", "tt");
                var c = [];
                (e = $("#" + l + " .js_customeritem_container .j_customer_detail")) && 0 < e.length && e.each(function(a) {
                    a = $(this).find(".j_customer").attr("id");
                    var e = $(this).find(".j_customer").text()
                      , b = $(this).find(".j_customer").data("customer");
                    null == b && (b = {
                        name: e,
                        id: a
                    });
                    c.push({
                        name: e,
                        id: a,
                        customer: b
                    })
                });
                e = $(this);
                (new d).render("pc", {
                    targetEl: e,
                    keyword: "",
                    isUnique: m,
                    seletedList: c,
                    selectColumn: a.componentSetup.selectColumn,
                    order: a.componentSetup.orderContent,
                    isAddForRelation: w
                })
            });
            b.on("mouseenter.typeahead", "#" + l + " .typeahead-wrapper", function(a) {
                $(this).data("enter", !0)
            }).on("mouseleave.typeahead", "#" + l + " .typeahead-wrapper", function(a) {
                $(this).data("enter", !1)
            });
            b.on("click", "#" + l + " .control-btn", function(a) {
                a.stopPropagation();
                $(this).addClass("hide");
                $(this).prev(".typeahead-wrapper").removeClass("hide");
                $(this).prev(".typeahead-wrapper").find(".control-input").focus()
            });
            b.on("focusout", "#" + l + " .control-input", function(a, e) {
                var c = $(this).parents(".typeahead-wrapper");
                c.data("enter") && "tt" != e || (c.addClass("hide"),
                c.next(".control-btn").removeClass("hide"))
            });
            b.on("click.tt", "#" + l + " #searchList\x3ep", function() {
                var e = $("#" + l);
                e.parents(".field_js").find(".form-error").text("");
                e.parents(".field_js").find(".form-error").hide();
                var c = a.componentSetup.cusfields
                  , b = a.componentSetup.isUnique;
                "true" != b && 1 != b || e.find(".js_customeritem_container").empty();
                $(this).hasClass("creat-new") ? (b = $(this).attr("title"),
                null != b && "" != b && $.ajax({
                    type: TEAMS.ajaxMethod,
                    url: "/customer/create",
                    async: !1,
                    dataType: "json",
                    data: {
                        entity: JSON.stringify({
                            name: b,
                            mainlines: [{}],
                            openSea: 0
                        })
                    },
                    success: function(b) {
                        b && b.message && 0 != b.message.code || (a.renderSelectItem(l, b.data, c, e),
                        a.triggerFillRelate(e))
                    }
                })) : (b = $(this).data("customer"),
                a.renderSelectItem(l, b, c, e),
                a.triggerFillRelate(e))
            });
            b.on("click", "#" + l + " .js_deleteCustomer", function() {
                var c = $(this).parents("#" + l)
                  , b = a.componentSetup.cusfields;
                null == b || 0 == b.length ? $(this).parent().remove() : $(this).parent().parent().parent().remove();
                a.triggerFillRelate(c);
                c = a.check(c, "change");
                e(c)
            });
            "mobile" == window.systemInfo_form && (b.on("objsComfirm", "#" + l + " .customer-seleted", function(e, c) {
                var b = $("#" + l + " .js_customeritem_container")
                  , d = a.componentSetup.isUnique;
                b.text("");
                b.parents("#field_" + a.componentSetup.fieldId).find(".form-error").text("");
                "true" != d && 1 != d || b.empty();
                if (0 < c.objs.length) {
                    var d = c.objs, f;
                    for (f in d) {
                        var k = d[f];
                        if (k) {
                            var g = $('\x3cspan id\x3d"' + k.id + '" class\x3d"j_customer_detail j_component employee-item j_customer_detail"\x3e\x3ca id\x3d"' + k.id + '" data-module\x3d"customer" data-value\x3d"' + k.id + '" data-id\x3d"' + k.id + '" class\x3d"j_customer entitybox-toggle"\x3e' + k.name + "\x3c/a\x3e\x3c/span\x3e");
                            b.append(g)
                        }
                    }
                } else
                    k = c.objs,
                    g = $('\x3cspan id\x3d"' + k.id + '" class\x3d"j_customer_detail j_component employee-item j_customer_detail"\x3e\x3ca id\x3d"' + k.id + '" data-module\x3d"customer" data-value\x3d"' + k.id + '" data-id\x3d"' + k.id + '" class\x3d"j_customer entitybox-toggle"\x3e' + k.name + "\x3c/a\x3e\x3c/span\x3e"),
                    0 == k.length ? b.html('\x3cdiv class\x3d"widget-link-holder"\x3e\x3ci class\x3d"icon-plus2"\x3e\x3c/i\x3e\u9009\u62e9\u5ba2\u6237\x3c/div\x3e') : b.append(g);
                a.triggerFillRelate(b)
            }),
            b.on("deleteObj", "#" + l + " .customer-seleted", function(e, c) {
                var b = $("#" + l + " .js_customeritem_container");
                b.find('span[id\x3d"' + c + '"]').remove();
                0 == b.find("span").length && b.html('\x3cdiv class\x3d"widget-link-holder"\x3e\x3ci class\x3d"icon-plus2"\x3e\x3c/i\x3e\u9009\u62e9\u5ba2\u6237\x3c/div\x3e');
                a.triggerFillRelate(b)
            }))
        },
        autoSaveEvents: function(e) {
            var a = this
              , c = a.el || $(document)
              , b = (a.componentSetup.fieldId || a.componentSetup.tempId) + this.cid;
            c.on("click", "#" + b + " .js_deleteCustomer", function() {
                a.saveComponentValue(c.find("#" + b), e)
            });
            "mobile" == window.systemInfo_form ? (c.on("objsComfirm", "#" + b + " .customer-seleted", function(c, b) {
                a.saveComponentValue($(this), e)
            }),
            c.on("deleteObj", "#" + b + " .customer-seleted", function(c, b) {
                a.saveComponentValue($(this), e)
            })) : (c.on("click", "#" + b + " #searchList\x3ep", function() {
                a.saveComponentValue($(this), e)
            }),
            c.on("entitySelected", "#" + b + " #searchcustomer", function(c) {
                a.saveComponentValue($(this), e)
            }))
        },
        renderSelectItem: function(e, a, c, b) {
            if (!(0 < b.find(".js_customeritem_container").find(".j_customer[id\x3d'" + a.id + "']").length))
                if (null == c || 0 == c.length) {
                    var d = '\x3cspan id\x3d"' + a.id + '" name\x3d"j_customer_detail" class\x3d"j_customer_detail j_component employee-item"\x3e\x3ca id\x3d"' + a.id + '" data-id\x3d"' + a.id + '" data-module\x3d"customer" class\x3d"entitybox-toggle j_customer" title\x3d"' + a.name + '"\x3e' + a.name + '\x3c/a\x3e\x3ca class\x3d"close js_deleteCustomer" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e';
                    (e = $("#" + e + " .js_customeritem_container .j_customer_detail")) && e.each(function(e) {
                        a.id == $(this).find(".j_customer").attr("id") && $(this).remove()
                    });
                    b.find(".js_customeritem_container").append(d);
                    b.find(".js_customeritem_container").find(".j_customer[id\x3d'" + a.id + "']").data("customer", a)
                } else {
                    d = b.find(".j_customer_detail_clone .j_customer_detail").clone();
                    d.attr("id", a.id).attr("data-value", a.id).attr("data-id", a.id);
                    d.find(".j_customer").attr("id", a.id).text(a.name).attr("data-original-title", a.name);
                    d.find(".j_customer").data("customer", a);
                    for (var f = 0; f < c.length; f++) {
                        var l = c[f]
                          , g = b.find(".j_customer_detail_clone .j_field").clone();
                        g.attr("id", l);
                        g.find(".j_field_title").text(this.basefields[l]);
                        var h = "";
                        if ("manager" == l)
                            h = a[l] ? a[l].username : "",
                            g.find(".j_field_value").prop("title", h).text(h);
                        else if ("status" == l || "type" == l || "industry" == l || "region" == l)
                            h = a[l] ? a[l].name : "",
                            g.find(".j_field_value").prop("title", h).text(h);
                        else if ("address" == l)
                            h = a[l] ? a[l] : "",
                            g.find(".j_field_value").prop("title", h).text(h);
                        else if ("fax" == l || "email" == l || "zipCode" == l || "telphone" == l || "site" == l)
                            h = a[l] ? a[l] : "",
                            g.find(".j_field_value").prop("title", h).text(h);
                        else
                            continue;
                        d.find(".j_part .j_line").append(g)
                    }
                    var m = {};
                    if (a.formDataId && this.componentSetup.cusCustomFields) {
                        g = [];
                        for (c = 0; c < this.componentSetup.cusCustomFields.length; c++)
                            f = this.componentSetup.cusCustomFields[c],
                            g.push(f.substring(0, f.indexOf("_")));
                        c = {};
                        c.formDataId = a.formDataId;
                        c.module = "customer";
                        c.fieldIds = g;
                        $.ajax({
                            contentType: "application/json",
                            type: TEAMS.ajaxMethod,
                            async: !1,
                            data: JSON.stringify(c),
                            dataType: "json",
                            url: "freeform/findAllFormDataFields.json",
                            success: function(a) {
                                if (a && a.formData && a.formData.dataDetails)
                                    for (var e = 0; e < a.formData.dataDetails.length; e++) {
                                        var c = a.formData.dataDetails[e]
                                          , b = c.content;
                                        !b && c.dataText && (b = c.dataText.content);
                                        if (!b && 0 < c.dataOptions.length) {
                                            for (var b = "", d = 0; d < c.dataOptions.length; d++)
                                                b += c.dataOptions[d].content + ",";
                                            b = b.substring(0, b.length - 1)
                                        }
                                        m[c.formField.id] = b
                                    }
                            }
                        })
                    }
                    if (this.componentSetup.cusCustomFields)
                        for (c = 0; c < this.componentSetup.cusCustomFields.length; c++)
                            f = this.componentSetup.cusCustomFields[c],
                            g = b.find(".j_customer_detail_clone .j_field").clone(),
                            g.attr("id", f.substring(0, f.indexOf("_"))),
                            g.find(".j_field_title").text(f.substring(f.indexOf("_") + 1, f.length)),
                            g.find(".j_field_value").prop("title", m[f.substring(0, f.indexOf("_"))]).text(m[f.substring(0, f.indexOf("_"))]),
                            d.find(".j_part .j_line").append(g);
                    d.find(".j_title").append('\x3ca class\x3d"close js_deleteCustomer" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e');
                    $("#" + e + " .js_customeritem_container").append(d)
                }
        },
        customerAhead: Backbone.View.extend({
            defaults: function() {
                this.remote = this.suggestion = "";
                this.entity = "customer";
                this.tpl = h.get("customercomponent")
            },
            initAhead: function(e, a, c, b, d) {
                this.defaults();
                this.fieldId = e;
                this.newSortColumn = a;
                this.selectColumn = c;
                this.orderContent = b;
                this.isAddForRelation = d;
                this.$continer = $("#" + this.fieldId);
                this._htmlEvents()
            },
            _htmlEvents: function() {
                var e = this
                  , a = e.$continer
                  , c = $("#" + e.fieldId + " #typeahead-customer");
                c.off("focus.tt").on("focus.tt", function(a) {
                    e._search($(this))
                });
                c.off("click.tt").on("click.tt", function(a) {
                    a.stopPropagation()
                });
                c.off("keyup.tt").on("keyup.tt", function(b) {
                    b = b.which;
                    0 < $("body").find("#form-abposselect").length && (a = $("body").find("#form-abposselect").find(".field_js"));
                    13 == b ? (a.find("#customer-typeahead-div p.active").trigger("click.tt"),
                    window.abposview && window.abposview.remove()) : 27 == b ? (c.trigger("focusout", "tt"),
                    window.abposview && window.abposview.remove()) : 38 == b ? (b = $("#customer-typeahead-div p.active"),
                    1 > b.length ? a.find("#customer-typeahead-div p").last().addClass("active") : (b.removeClass("active"),
                    (0 < b.prev().length ? b.prev() : a.find("#customer-typeahead-div p").last()).addClass("active"))) : 40 == b ? (b = a.find("#customer-typeahead-div p.active"),
                    1 > b.length ? a.find("#customer-typeahead-div p").first().addClass("active") : (b.removeClass("active"),
                    (0 < b.next().length ? b.next() : a.find("#customer-typeahead-div p").first()).addClass("active"))) : e._search($(this))
                });
                a.find("#customer-typeahead-div").off("mouseenter.tt", "p").on("mouseenter.tt", "p", function() {
                    0 < $("body").find("#form-abposselect").length && (a = $("body").find("#form-abposselect").find(".field_js"));
                    $(this).addClass("active");
                    a.find("#customer-typeahead-div p.active").removeClass("active")
                });
                a.off("click.tt", "#customer-typeahead-div p").on("click.tt", "#customer-typeahead-div p", function(a) {
                    c.trigger("focusout", "tt")
                })
            },
            _search: function(e) {
                var a = this
                  , c = a.$continer
                  , b = $.trim(e.val());
                b == e.attr("placeholder") && (b = "");
                c.find("#customer-typeahead-div #searchList").html("");
                0 < $("body").find("#form-abposselect").length ? ($("body").find("#form-abposselect").find(".field_js").find("#customer-typeahead-div .loading_small").show(),
                c.find("#customer-typeahead-div .loading_small").hide()) : c.find("#customer-typeahead-div .loading_small").show();
                window.abposview && window.abposview.remove();
                e = {};
                e.keywords = b;
                e.searchType = "relevance";
                b && a.orderContent && (e.property = a.orderContent.property,
                e.direction = a.orderContent.direction);
                $.ajax({
                    type: TEAMS.ajaxMethod,
                    url: TEAMS.api.suggestion,
                    dataType: "json",
                    data: e,
                    success: function(e) {
                        e && e.message && 0 != e.message.code || a.renderCustomer(e.relevances, b)
                    }
                })
            },
            renderCustomer: function(e, a) {
                var c = this.$continer;
                c.find("#customer-typeahead-div #searchList").html("");
                0 < $("body").find("#form-abposselect").length ? $("body").find("#form-abposselect").find(".field_js").find("#customer-typeahead-div .loading_small").hide() : c.find("#customer-typeahead-div .loading_small").hide();
                if (null != e && 0 < e.length)
                    for (var b = 0; b < e.length; b++) {
                        var d = e[b]
                          , f = d.name
                          , g = $(this.tpl).siblings("#customer-clone").find(".j_customer").clone();
                        g.text(f);
                        g.attr("title", f).attr("id", d.id);
                        g.data("customer", d);
                        c.find("#customer-typeahead-div #searchList").append(g).show()
                    }
                else {
                    if (null == a || "" == a)
                        return;
                    0 != this.isAddForRelation && "false" != this.isAddForRelation && (g = $('\x3cp class\x3d"customer creat-new"\x3e\x3ci class\x3d"icon-plus-thin"\x3e\x3c/i\x3e \u6dfb\u52a0\u5ba2\u6237\uff1a' + a + "\x3c/p\x3e"),
                    g.attr("title", a),
                    c.find("#customer-typeahead-div #searchList").find(".creat-new").remove(),
                    c.find("#customer-typeahead-div #searchList").append(g))
                }
                c.find("#customer-typeahead-div #searchList").show();
                window.abposview && window.abposview.remove();
                window.abposview = new l({
                    continer: c,
                    entity: this.entity
                });
                window.abposview.render()
            }
        }),
        check: function(e) {
            var a = $(e).find(".js_customeritem_container .j_customer_detail").length
              , c = {};
            c.element = e;
            0 != a || "true" != this.componentSetup.required && 1 != this.componentSetup.required || (c.message = this.componentSetup.title + "\u4e0d\u80fd\u4e3a\u7a7a");
            return c
        },
        getValue: function(e, a) {
            var c = {
                formField: {
                    id: this.componentSetup.fieldId
                }
            }
              , b = e.find(".js_customeritem_container .j_customer_detail");
            if (0 < b.length) {
                var d = [];
                b.each(function(a) {
                    var e = $(this).find(".j_customer").attr("id")
                      , c = $(this).find(".j_customer").text();
                    d[a] = {
                        optionId: e,
                        content: c,
                        type: "customer"
                    }
                });
                c.dataOptions = d
            } else
                a || (c = null);
            return c
        },
        setValue: function(e, a) {
            e.find(".js_customeritem_container").empty();
            var c = this
              , b = this.componentSetup.cusfields;
            if (null != a && null != a.dataOptions) {
                for (var d = "", f = [], l = 0; l < a.dataOptions.length; l++) {
                    var g = a.dataOptions[l]
                      , h = null == g.content ? "" : g.content
                      , g = g.optionId
                      , d = d + (g + ",");
                    f.push({
                        id: g,
                        name: h
                    })
                }
                if (TEAMS.currentUser && TEAMS.currentUser.id)
                    null == b || 0 == b.length ? c.renderCustomers(f, e, b, a) : (d = d.substring(0, d.length - 1),
                    $.ajax({
                        type: TEAMS.ajaxMethod,
                        data: "",
                        dataType: "json",
                        async: !1,
                        url: "/customer/getCustomersByIds?customerIds\x3d" + d,
                        success: function(d) {
                            if (!d || !d.message || 0 == d.message.code) {
                                d = d.data;
                                for (var l = [], g = 0; g < f.length; g++) {
                                    for (var h = f[g], r = !0, p = 0; p < d.length; p++) {
                                        var w = d[p];
                                        if (w.id == h.id) {
                                            l.push(w);
                                            r = !1;
                                            break
                                        }
                                    }
                                    r && l.push(h)
                                }
                                c.renderCustomers(l, e, b, a)
                            }
                        }
                    }));
                else
                    for (l = 0; l < f.length; l++)
                        d = f[l],
                        "mobile" == window.systemInfo_form && (d = $('\x3cspan href\x3d"/mobile/crms/' + d.id + "?module\x3dkey_customer\x26info\x3dview_CustomerCover|id_" + d.id + '" id\x3d"' + d.id + '" class\x3d"router j_component employee-item j_customer_detail"\x3e\x3ca class\x3d"j_customer" id\x3d"' + d.id + '"\x3e' + d.name + "\x3c/a\x3e\x3c/span\x3e"),
                        e.find(".js_customeritem_container").append(d))
            }
        },
        renderCustomers: function(e, a, c, b) {
            for (b = 0; b < e.length; b++) {
                var d = e[b];
                if ("mobile" == window.systemInfo_form)
                    var f = $('\x3cspan href\x3d"/mobile/crms/' + d.id + "?module\x3dkey_customer\x26info\x3dview_CustomerCover|id_" + d.id + '" id\x3d"' + d.id + '" class\x3d"router j_component employee-item j_customer_detail"\x3e\x3ca class\x3d"j_customer" id\x3d"' + d.id + '"\x3e' + d.name + "\x3c/a\x3e\x3c/span\x3e");
                else if (null == c || 0 == c.length)
                    f = "",
                    f = null != a.find(".js_form-customer-add").get(0) ? '\x3cspan id\x3d"' + d.id + '" name\x3d"j_customer_detail" class\x3d"j_customer_detail j_component employee-item"\x3e\x3ca id\x3d"' + d.id + '" data-id\x3d"' + d.id + '" data-module\x3d"customer" class\x3d"entitybox-toggle j_customer" title\x3d"' + d.name + '"\x3e' + d.name + '\x3c/a\x3e\x3ca class\x3d"close js_deleteCustomer" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e' : '\x3cspan id\x3d"' + d.id + '" name\x3d"j_customer_detail" class\x3d"j_customer_detail j_component employee-item"\x3e\x3ca id\x3d"' + d.id + '" data-id\x3d"' + d.id + '" data-module\x3d"customer" class\x3d"entitybox-toggle j_customer" title\x3d"' + d.name + '"\x3e' + d.name + "\x3c/a\x3e\x3c/span\x3e";
                else {
                    f = a.find(".j_customer_detail_clone .j_customer_detail").clone();
                    f.attr("id", d.id).attr("data-value", d.id).attr("data-id", d.id);
                    f.find(".j_customer").attr("id", d.id).text(d.name).attr("data-original-title", d.name);
                    for (var l = 0; l < c.length; l++) {
                        var g = c[l]
                          , h = a.find(".j_customer_detail_clone .j_field").clone();
                        h.attr("id", g);
                        h.find(".j_field_title").text(this.basefields[g]);
                        if ("manager" == g)
                            h.find(".j_field_value").text(d[g] ? d[g].username : "");
                        else if ("status" == g || "type" == g || "industry" == g || "region" == g)
                            h.find(".j_field_value").text(d[g] ? d[g].name : "");
                        else if ("address" == g)
                            h.find(".j_field_value").text(d[g] ? d[g] : "").attr("data-placement", "top").attr("data-toggle", "tooltip").attr("data-original-title", d[g] ? d[g] : "");
                        else if ("fax" == g || "email" == g || "zipCode" == g || "telphone" == g || "site" == g)
                            h.find(".j_field_value").text(d[g] ? d[g] : "");
                        else
                            continue;
                        f.find(".j_part .j_line").append(h)
                    }
                    var m = {};
                    if (d.formDataId && this.componentSetup.cusCustomFields) {
                        h = [];
                        for (l = 0; l < this.componentSetup.cusCustomFields.length; l++)
                            g = this.componentSetup.cusCustomFields[l],
                            h.push(g.substring(0, g.indexOf("_")));
                        l = {};
                        l.formDataId = d.formDataId;
                        l.module = "customer";
                        l.fieldIds = h;
                        $.ajax({
                            contentType: "application/json",
                            type: TEAMS.ajaxMethod,
                            async: !1,
                            data: JSON.stringify(l),
                            dataType: "json",
                            url: "freeform/findAllFormDataFields.json",
                            success: function(a) {
                                if (a && a.formData && a.formData.dataDetails)
                                    for (var e = 0; e < a.formData.dataDetails.length; e++) {
                                        var c = a.formData.dataDetails[e]
                                          , b = c.content;
                                        !b && c.dataText && (b = c.dataText.content);
                                        if (!b && 0 < c.dataOptions.length) {
                                            for (var b = "", d = 0; d < c.dataOptions.length; d++)
                                                b += c.dataOptions[d].content + ",";
                                            b = b.substring(0, b.length - 1)
                                        }
                                        m[c.formField.id] = b
                                    }
                            }
                        })
                    }
                    if (this.componentSetup.cusCustomFields)
                        for (d = 0; d < this.componentSetup.cusCustomFields.length; d++)
                            l = this.componentSetup.cusCustomFields[d],
                            h = a.find(".j_customer_detail_clone .j_field").clone(),
                            h.attr("id", l.substring(0, l.indexOf("_"))),
                            h.find(".j_field_title").text(l.substring(l.indexOf("_") + 1, l.length)),
                            h.find(".j_field_value").prop("title", m[l.substring(0, l.indexOf("_"))]).text(m[l.substring(0, l.indexOf("_"))]),
                            f.find(".j_part .j_line").append(h);
                    null != a.find(".js_form-customer-add").get(0) && f.find(".j_title").append('\x3ca class\x3d"close js_deleteCustomer" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e')
                }
                a.find(".js_customeritem_container").append(f)
            }
        },
        empty: function(e) {
            e.find(".js_customeritem_container").html("")
        },
        readOnly: function(e, a) {
            var c = this.componentSetup.fieldId + this.cid
              , b = e.find('div[id\x3d"' + c + '"] span[name\x3d"js_form-customer-add"]')
              , d = e.find('div[id\x3d"' + c + '"] .js_customeritem_container .j_customer_detail')
              , f = e.find('div[id\x3d"' + c + '"] .js_deleteCustomer');
            a ? (b.remove(),
            f.remove()) : b && 0 != b.length && null != b || (b = $(this.tpl).siblings("#preview-form").find('span[name\x3d"js_form-customer-add"]'),
            e.find('div[id\x3d"' + c + '"]').find(".js_customeritem_container").after(b),
            d.find(".j_title").append('\x3ca class\x3d"close js_deleteCustomer" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e'))
        }
    });
    u.exports = window.CustomerComponent
});

define("form/component/formdatalist", ["form/tplutil", "form/componentmodel", "form/component/formsearchview"], function(n, y, u) {
    var m = n("form/tplutil")
      , h = n("form/componentmodel")
      , g = n("form/component/formsearchview");
    n = Backbone.View.extend({
        initialize: function() {},
        render: function(f, d) {
            "pc" == f ? this.initPC.init(d) : this.initMb.init(d)
        },
        initPC: {
            init: function(f) {
                this.el = "#formdata_list";
                this.targetEl = f.targetEl;
                this.keyword = f.keyword;
                this.isKeyword = !0;
                this._module = f.module;
                this.type = f.type;
                this.isUnique = f.isUnique;
                this.seletedList = f.seletedList;
                this.fieldIds = f.fieldIds;
                this.formId = f.formId;
                this.columnFields = f.columnFields;
                this.fileds = [{
                    title: "\u7c7b\u578b",
                    position: "left"
                }, {
                    title: "\u6807\u9898",
                    position: "left"
                }];
                this.model = new h;
                this.dataRowList = [];
                this.allData = f.allData;
                this.filterParams = f.filterParams;
                this.order = f.order;
                this.tpl = m.get("formdatalist");
                $("body").append($(this.tpl));
                this.render();
                this.delegateEvents()
            },
            delegateEvents: function() {
                var f = this
                  , d = $(f.el);
                d.off(".FormdataList");
                d.on("keyup.FormdataList", ".j_advsearch .j_search-input", function(b) {
                    13 === b.keyCode && d.find(".j_advsearch .j_search-btn").trigger("click")
                });
                d.on("keyup.FormdataList", ".j_basesearch .j_search-input", function(b) {
                    13 === b.keyCode && d.find(".j_basesearch .j_search-btn").trigger("click")
                });
                d.on("click.FormdataList", ".j_advsearch .j_search-btn", function() {
                    f.isKeyword = !0;
                    $(this).hasClass("locked") || ($(this).addClass("locked"),
                    f.renderListStatByRow(1))
                });
                d.on("click.FormdataList", ".j_basesearch .j_search-btn", function() {
                    f.isKeyword = !0;
                    $(this).hasClass("locked") || ($(this).addClass("locked"),
                    f.renderListStatByRow(1))
                });
                d.on("click.FormdataList", "#formAdvanceSearch", function(b) {
                    b = $(this);
                    b.data("open") ? (b.find("i").attr("class", "icon-angle-down cs-p"),
                    d.find(".j_advanceSearch").hide(),
                    b.data("open", !1)) : ($(this).find("i").attr("class", "icon-angle-up cs-p"),
                    null != d.find(".j_advanceSearch .j_formstat-search").get(0) ? d.find(".j_advanceSearch").show() : (f.searchView && f.searchView.remove(),
                    f.model.findAdvSearchField({
                        formId: f.formId
                    }, function(c) {
                        f.searchView = new g({
                            formId: f.formId,
                            el: f.el + " .j_advanceSearch",
                            formFields: c.formFields,
                            parentObj: f
                        });
                        f.searchView.render();
                        d.find(".j_advanceSearch").show()
                    })),
                    b.data("open", !0))
                });
                d.on("CLOSE.FormdataList", "#formAdvanceSearch", function(b) {
                    d.find(".j_advanceSearch").hide();
                    d.find("#formAdvanceSearch").data("open", !1);
                    d.find("#formAdvanceSearch i").attr("class", "icon-angle-down cs-p")
                });
                d.off("formSearch").on("formSearch", function(b) {
                    f.renderListStatByRow(1)
                });
                d.on("click.FormdataList", ".j_btn-cancel", function() {
                    f.close()
                });
                d.on("click.FormdataList", ".j_closelist", function() {
                    f.close()
                });
                d.on("click.FormdataList", ".j_btn-ok", function() {
                    for (var b = [], c = d.find(".j_opt .j_select .j_select_data"), l = 0; l < c.length; l++) {
                        var e = c[l]
                          , a = $(e).data("dataRow")
                          , k = a.FORM_DATA
                          , e = $(e).text()
                          , a = f.getSelectObjs(k, e, f.fieldIds, a);
                        b.push(a)
                    }
                    $(f.targetEl).trigger("entitySelected", b);
                    f.close()
                });
                d.on("click.FormdataList", "tbody tr", function() {
                    var b = $(this)
                      , c = $(this).data("dataRow")
                      , l = c.FORM_DATA
                      , e = $(this).find(".j_formdataName").text();
                    b.hasClass("active") ? ($(this).find('input[name\x3d"formdataselect"]').prop("checked", !1),
                    $(this).removeClass("active"),
                    $(this).find('input[name\x3d"formdataselect"]').css("display", ""),
                    d.find(".j_opt .j_select").find("#" + l).remove()) : ($(this).find('input[name\x3d"formdataselect"]').prop("checked", !0),
                    $(this).addClass("active"),
                    $(this).find('input[name\x3d"formdataselect"]').css("display", "inline-block"),
                    0 == d.find(".j_opt .j_select").find("#" + l).length && (d.find(".j_opt .j_select").append('\x3ca class\x3d"j_select_data" id\x3d"' + l + '"\x3e' + e + "\x3c/a\x3e"),
                    d.find(".j_opt .j_select").find("#" + l).data("dataRow", c)));
                    b = f.fieldIds;
                    if (1 == f.isUnique || "true" == f.isUnique)
                        c = f.getSelectObjs(l, e, b, c),
                        $(f.targetEl).trigger("entitySelected", c),
                        f.close()
                });
                d.on("click.FormdataList", ".page-first", function() {
                    $(this).hasClass("disabled") || ($(f.el).find(".page-next").addClass("disabled"),
                    $(f.el).find(".page-last").addClass("disabled"),
                    $(f.el).find(".page-pre").addClass("disabled"),
                    $(f.el).find(".page-first").addClass("disabled"),
                    f.renderListStatByRow(1))
                });
                d.on("click.FormdataList", ".page-pre:not(.disabled)", function() {
                    if (!$(this).hasClass("disabled")) {
                        $(f.el).find(".page-next").addClass("disabled");
                        $(f.el).find(".page-last").addClass("disabled");
                        $(f.el).find(".page-pre").addClass("disabled");
                        $(f.el).find(".page-first").addClass("disabled");
                        var b = $(f.el).find(".pagination").data("pageDatas");
                        f.renderListStatByRow(b.pageNo - 1)
                    }
                });
                d.on("click.FormdataList", ".page-next:not(.disabled)", function() {
                    if (!$(this).hasClass("disabled")) {
                        $(f.el).find(".page-next").addClass("disabled");
                        $(f.el).find(".page-last").addClass("disabled");
                        $(f.el).find(".page-pre").addClass("disabled");
                        $(f.el).find(".page-first").addClass("disabled");
                        var b = $(f.el).find(".pagination").data("pageDatas");
                        f.renderListStatByRow(b.pageNo + 1)
                    }
                });
                d.on("click.FormdataList", ".pagination .page-last", function() {
                    $(this).hasClass("disabled") || ($(f.el).find(".page-next").addClass("disabled"),
                    $(f.el).find(".page-last").addClass("disabled"),
                    $(f.el).find(".page-pre").addClass("disabled"),
                    $(f.el).find(".page-first").addClass("disabled"),
                    $(f.el).find(".pagination").data("pageDatas"),
                    f.renderListStatByRow(f.totalPages))
                });
                d.on("hidden.bs.modal.FormdataList", function() {
                    f.remove()
                })
            },
            getSelectObjs: function(f, d, b, c) {
                var l = {};
                l.id = f;
                l.name = d;
                l.dataRow = c;
                f = [];
                for (d = 0; d < b.length; d++) {
                    var e = b[d]
                      , a = e.substring(0, e.indexOf("_"))
                      , e = e.substring(e.indexOf("_") + 1)
                      , k = c["C_" + a] || ""
                      , g = "";
                    try {
                        g = JSON.parse(k)
                    } catch (h) {}
                    var q = "";
                    if (0 < g.length && null != g[0].optionId) {
                        for (k = 0; k < g.length; k++)
                            option = g[k],
                            q += option.content + ",";
                        k = q.substring(0, q.length - 1)
                    }
                    g = {};
                    g.fieldId = a;
                    g.fieldTitle = e;
                    g.fieldValue = k;
                    f.push(g)
                }
                l.showList = f;
                return l
            },
            render: function() {
                var f = this
                  , d = $(f.el);
                formPlugin.destroyLayout(".j_formstarScrX");
                formPlugin.layout(".j_formstarScrX", {
                    whileScrolling: function() {
                        f.mcsTopPct = this.mcs.topPct;
                        100 == f.mcsTopPct && $(f.el).find(".page-next").trigger("click")
                    }
                }, [{
                    gotoTopButton: !0,
                    scrollInertia: 394
                }]);
                var b = f.formId
                  , c = f.columnFields;
                null != c && 0 < c.length && c[0].substring(c[0].indexOf("#") + 1) != b && (f.columnFields = []);
                (b = $("body").find("#formTenantKey").val()) ? b = b.toUpperCase() : null != TEAMS.currentTenant && (b = TEAMS.currentTenant.tenantKey.toUpperCase());
                $("#formEdit_js").get(0) || null == TEAMS.currentUser || TEAMS.currentTenant.tenantKey.toUpperCase() != b ? (d.find(".j_basesearch").removeClass("hide"),
                d.find(".j_advsearch").addClass("hide")) : (d.find(".j_basesearch").addClass("hide"),
                d.find(".j_advsearch").removeClass("hide"));
                f.renderSelect(f.seletedList);
                f.renderListStatByRow(1);
                d.modal()
            },
            renderSelect: function(f) {
                for (var d = $(this.el), b = 0; b < f.length; b++) {
                    var c = f[b];
                    0 == d.find(".j_opt .j_select").find("#" + c.id).length && (d.find(".j_opt .j_select").append('\x3ca class\x3d"j_select_data" id\x3d"' + c.id + '"\x3e' + c.name + "\x3c/a\x3e"),
                    d.find(".j_opt .j_select").find("#" + c.id).data("dataRow", c.dataRow))
                }
            },
            getParam: function(f) {
                var d = $(this.el)
                  , b = {};
                b.pageNo = f;
                b.pageSize = 20;
                b.formId = this.formId;
                (f = $.trim(d.find(".j_advsearch .j_search-input").val())) || (f = $.trim(d.find(".j_basesearch .j_search-input").val()));
                var d = []
                  , c = {};
                c.content = f;
                c.term = "like";
                d.push(c);
                var c = this.filterParams
                  , l = "";
                c && "object" == typeof c ? (l = JSON.stringify(c).replace(/com_key/g, "componentKey"),
                l = JSON.parse(l)) : c && "string" == typeof c && (l = c.replace(/com_key/g, "componentKey"),
                l = JSON.parse(l));
                this.isKeyword ? l ? 0 == l.names.length && 0 == l.operators.length && 0 == l.types.length && 0 == l.datastatus.length && 0 == l.createTimes.length && 0 == l.filterFormDatas.length ? b.keywords = f : (l.names && 0 < l.names.length && (d = d.concat(l.names)),
                l.operators && 0 < l.operators.length && (b.operators = l.operators),
                l.types && 0 < l.types.length && (b.types = l.types),
                l.datastatus && 0 < l.datastatus.length && (b.datastatus = l.datastatus),
                l.createTimes && 0 < l.createTimes.length && (b.createTimes = l.createTimes),
                l.filterFormDatas && 0 < l.filterFormDatas.length && (b.filterFormDatas = l.filterFormDatas),
                b.names = d) : b.keywords = f : this.searchView && ($.extend(b, this.searchView.assembleParam()),
                !l || 0 == l.names.length && 0 == l.operators.length && 0 == l.types.length && 0 == l.datastatus.length && 0 == l.createTimes.length && 0 == l.filterFormDatas.length || (l.names && 0 < l.names.length && (b.names = l.names.concat(b.names)),
                l.operators && 0 < l.operators.length && (b.operators = l.operators.concat(b.operators)),
                l.types && 0 < l.types.length && (b.types = l.types.concat(b.types)),
                l.datastatus && 0 < l.datastatus.length && (b.datastatus = l.datastatus.concat(b.datastatus)),
                l.createTimes && 0 < l.createTimes.length && (b.createTimes = l.createTimes.concat(b.createTimes)),
                l.filterFormDatas && 0 < l.filterFormDatas.length && (b.filterFormDatas = l.filterFormDatas.concat(b.filterFormDatas))));
                b.fromComponent = !0;
                f = [];
                var d = []
                  , e = this.fieldIds;
                if ("nofields" == e[0])
                    l = {},
                    f = [];
                else
                    for (c = 0; c < e.length; c++) {
                        var l = e[c]
                          , a = l.substring(0, l.indexOf("_"))
                          , l = {};
                        l.id = a;
                        f.push(l)
                    }
                for (c = 0; c < this.columnFields.length; c++) {
                    var k = this.columnFields[c]
                      , e = k.substring(0, k.indexOf("_"))
                      , a = k.substring(k.indexOf("_") + 1, k.indexOf("-"))
                      , l = k.substring(k.indexOf("-") + 1, k.indexOf("*"))
                      , k = k.substring(k.indexOf("\x26") + 1, k.indexOf("#"));
                    if (1 == l || "true" == l)
                        l = {},
                        l.id = e,
                        l.title = a,
                        l.componentKey = k,
                        f.push(l),
                        d.push(l)
                }
                f && 0 == f.length && (f = null);
                b.formFields = f;
                b.showColumnFields = d;
                this.order && (this.order.fieldId ? (f = [],
                d = {},
                d.fieldId = this.order.fieldId,
                d.componentKey = this.order.comKey,
                d.content = this.order.content) : (f = [],
                d = {},
                d.content = this.order.property + " " + this.order.direction),
                f.push(d),
                b.orderFormDatas = f);
                return b
            },
            getNewFields: function(f, d) {
                var b = [];
                if (d && 0 < d.length)
                    for (var c = 0; c < d.length; c++) {
                        var l = d[c];
                        0 > $.inArray(l.id, b) && b.push(l.id)
                    }
                l = [];
                if (f && 0 < f.length)
                    for (c = 0; c < f.length; c++) {
                        var e = f[c];
                        -1 < $.inArray(e.id, b) && l.push(e)
                    }
                return l
            },
            renderListStatByRow: function(f) {
                var d = this
                  , b = $(d.el).find(".j_search-btn")
                  , c = $(d.el)
                  , l = d.getParam(f);
                l.allData = d.allData;
                1 == f && ($(d.el).find("#statbody").hide(),
                $(d.el).find("#stat_table tbody").empty());
                $(d.el).find("#list-loading").show();
                $(d.el).find("#more_data").hide();
                var e = "/formdatastat/findRowListStatForReport.json";
                d.allData && (e = TEAMS.service.baseUrl + "/datasources/formComponentQuery.json");
                $.ajax({
                    contentType: "application/json",
                    type: TEAMS.ajaxMethod,
                    url: e,
                    dataType: "json",
                    data: JSON.stringify(l),
                    success: function(a) {
                        b.removeClass("locked");
                        $(d.el).find(".j_search-submit").removeClass("locked");
                        if (!a.message || !a.message) {
                            var e = d.getNewFields(l.showColumnFields, a.formFields)
                              , g = a.formDatas
                              , h = a.listStats
                              , q = a.pageDatas
                              , p = a.form;
                            if (p)
                                if (1 == f && (d.totalPages = q.totalPages),
                                d.form = p,
                                $(d.el).find("#list-loading").hide(),
                                $(d.el).find("#statbody").show(),
                                1 == f && d.talbeScrollbar(),
                                p.permission)
                                    if (a.message)
                                        c.find("#formDatas").html('\x3cdiv class\x3d"formstat-noresult"\x3e' + a.message + "\x3c/div\x3e");
                                    else if (null == p)
                                        c.find("#formDatas").html('\x3cdiv class\x3d"formstat-noresult" style\x3d"color:#e60000;"\x3e\u8868\u5355\u4e0d\u5b58\u5728\x3c/div\x3e');
                                    else {
                                        if (0 == c.find("#stat_table thead tr th").length) {
                                            p = c.find("#stat_table thead tr");
                                            for (a = 0; a < e.length; a++) {
                                                var w = e[a];
                                                p.append("\x3cth title\x3d'" + w.title + "'\x3e\x3cdiv\x3e" + w.title + "\x3c/div\x3e\x3c/th\x3e")
                                            }
                                            for (a = 0; a < d.fileds.length; a++)
                                                w = d.fileds[a],
                                                "left" === w.position ? p.prepend("\x3cth title\x3d'" + w.title + "'\x3e\x3cdiv\x3e" + w.title + "\x3c/div\x3e\x3c/th\x3e") : p.append("\x3cth title\x3d'" + w.title + "'\x3e\x3cdiv\x3e" + w.title + "\x3c/div\x3e\x3c/th\x3e");
                                            p.prepend("\x3cth\x3e\x3c/th\x3e")
                                        }
                                        p = {};
                                        if (h)
                                            for (a = 0; a < h.length; a++)
                                                w = h[a],
                                                p[w.FORM_DATA + "_" + w.DATA_INDEX] = w;
                                        d.renderDataReport(g, p, e, null != l.formFields ? l.formFields : [], q);
                                        if (q && ($(d.el).find(".pagination").data("pageDatas", q),
                                        $(d.el).find(".active a").html("\u7b2c" + q.pageNo + "/" + d.totalPages + "\u9875"),
                                        q.hasNext ? ($(d.el).find(".page-next").removeClass("disabled"),
                                        $(d.el).find(".page-last").removeClass("disabled")) : ($(d.el).find(".page-next").addClass("disabled"),
                                        $(d.el).find(".page-last").addClass("disabled")),
                                        q.hasPre ? ($(d.el).find(".page-pre").removeClass("disabled"),
                                        $(d.el).find(".page-first").removeClass("disabled")) : ($(d.el).find(".page-pre").addClass("disabled"),
                                        $(d.el).find(".page-first").addClass("disabled")),
                                        1 == q.pageNo)) {
                                            if (null == g || 1 > g.length) {
                                                c.find(".j_form_empty").removeClass("hide");
                                                return
                                            }
                                            c.find(".j_form_empty").addClass("hide")
                                        }
                                        d.layout(d.el + " #js_customerTable_wrapper")
                                    }
                                else
                                    c.html(utils.template("base.nopermission", {
                                        msg: null
                                    }))
                        }
                    }
                });
                d.talbeScrollbar()
            },
            renderDataReport: function(f, d, b, c, l) {
                for (var e = this.el, a = $(this.el), k = 0; k < f.length; k++) {
                    var g = f[k]
                      , h = g.id;
                    Date.create(g.createTime);
                    var q = g.name ? g.name : ""
                      , p = "\u6570\u636e\u4e0a\u62a5";
                    g.reportSource && "external" == g.reportSource && (p = "\u5916\u90e8\u5206\u53d1");
                    if (!(0 < $(e + " stat_table tr #" + h).length))
                        for (g = 0; 1 > g; g++) {
                            var w = d[h + "_" + (g + 1)];
                            if (null == w) {
                                w = {};
                                w.FORM_DATA = h;
                                for (var m = 0, s = c.length; m < s; m++)
                                    w["C_" + c[m].id] = ""
                            }
                            m = $("\x3ctr style\x3d'cursor:pointer;' id\x3d" + h + "\x3e\x3c/tr\x3e");
                            m.data("dataRow", w);
                            m.append('\x3ctd\x3e\x3cdiv class\x3d"sn"\x3e' + (l.first + k) + '\x3c/div\x3e\x3cdiv class\x3d"checkbox-div"\x3e\x3cinput name\x3d"formdataselect" type\x3d"checkbox"\x3e\x3c/input\x3e\x3c/div\x3e\x3c/td\x3e');
                            m.append("\x3ctd class\x3d'j_formdataName noSub_name_" + h + "'\x3e" + q + "\x3c/td\x3e");
                            m.append("\x3ctd class\x3d'noSub_type_" + h + "'\x3e" + p + "\x3c/td\x3e");
                            for (s = 0; s < b.length; s++) {
                                var A = b[s]
                                  , x = A.id
                                  , n = A.componentKey
                                  , B = "";
                                w && (B = w["C_" + x] || "");
                                var D = "noSub_" + h + "_" + x;
                                A.subForm && (D = "");
                                A = "";
                                if ("Money" == n || "NumberComponent" == n)
                                    A = "ta-r";
                                x = h + "_" + (g + 1) + "_" + x;
                                n = !0;
                                try {
                                    var E = JSON.parse(B);
                                    ocount = "";
                                    if (0 < E.length && null != E[0].optionId) {
                                        for (var G = 0; G < E.length; G++)
                                            option = E[G],
                                            "image" == option.type || "imageFile" == option.type ? (ocount += '\x3cp class\x3d"ellipsis" title\x3d"' + option.content + '"\x3e\x3ca target\x3d"_blank" rel\x3d"fancybox_js" href\x3d"/base/download/img/' + option.optionId + '/image" class\x3d"fancybox_js" type\x3d"image"\x3e' + option.content + "\x3c/a\x3e\x3c/p\x3e",
                                            n = !1) : "file" == option.type ? (ocount += '\x3cp class\x3d"ellipsis" title\x3d"' + option.content + '"\x3e\x3ca target\x3d"_blank" data-value\x3d"' + option.optionId + '" href\x3d"/base/download/' + option.optionId + '"\x3e' + option.content + "\x3c/a\x3e\x3c/p\x3e",
                                            n = !1) : ocount += option.content + ",";
                                        B = ocount.substring(0, ocount.length - 1)
                                    }
                                } catch (u) {}
                                n ? m.append("\x3ctd id\x3d" + x + " class\x3d'" + D + " " + A + "' title\x3d'" + B + "'\x3e" + B + "\x3c/td\x3e") : m.append("\x3ctd id\x3d" + x + " class\x3d'" + D + " " + A + "'\x3e" + B + "\x3c/td\x3e");
                                $("#" + x).find(".fancybox_js").fancybox({
                                    closeBtn: !0,
                                    nextEffect: "fade",
                                    prevEffect: "fade",
                                    afterLoad: function() {
                                        this.title = "Image " + (this.index + 1) + " of " + this.group.length + (this.title ? " - " + this.title : "")
                                    }
                                })
                            }
                            a.find("#stat_table tbody").append(m);
                            0 < a.find(".j_opt .j_select").find("#" + h).length && (a.find("#stat_table tbody").find('tr[id\x3d"' + h + '"]').find('input[name\x3d"formdataselect"]').prop("checked", !0).css("display", "inline-block"),
                            a.find("#stat_table tbody").find('tr[id\x3d"' + h + '"]').addClass("active"))
                        }
                }
            },
            layout: function(f, d, b) {
                if (0 == f.indexOf("#print"))
                    $(f).removeClass("scrollwrapper");
                else {
                    var c = $(f);
                    if (c.get(0)) {
                        var l = c.attr("height")
                          , e = c.attr("auto-scroll");
                        if (!l)
                            var l = c.attr("marginbottom") || 0
                              , a = c.offset().top
                              , l = $(window).height() - a - l;
                        a = c.attr("theme") ? c.attr("theme") : "darkblue";
                        if (!c.hasClass("mCustomScrollbar")) {
                            var k = {
                                onScroll: function() {
                                    $("body .goto-top").removeClass("hide")
                                },
                                onTotalScrollBack: function() {
                                    $("body .goto-top").addClass("hide")
                                }
                            };
                            if (d) {
                                $.isArray(d) && (b = d);
                                b && !b[0].gotoTopButton && (k.onScroll = null,
                                k.onTotalScrollBack = null);
                                var g = $.extend(k, d)
                            }
                            d = {
                                theme: a,
                                callbacks: g ? g : k
                            };
                            if (b)
                                var h = $.extend(d, b[0]);
                            b && "x" == b[0].axis && (e = "yes");
                            l && "yes" != e && c.css("height", l);
                            c.mCustomScrollbar(h ? h : d);
                            b && !b[0].bottomBlank && null != c.parents("#entitybox").get(0) && c.children().children(".mCSB_container").addClass("pb-0");
                            "#chat-container" == f && (c.mCustomScrollbar("update"),
                            c.mCustomScrollbar("scrollTo", "bottom"));
                            setTimeout(function() {
                                $("body .goto-top").addClass("hide")
                            }, 200)
                        }
                    }
                }
            },
            talbeScrollbar: function() {
                $(this.el).find(".j_formstarScrX").mCustomScrollbar({
                    axis: "x",
                    theme: "darkblue",
                    scrollButtons: {
                        enable: !0
                    },
                    mouseWheel: "false",
                    advanced: {
                        autoExpandHorizontalScroll: !0
                    }
                })
            },
            close: function() {
                $(this.el).modal("hide")
            },
            remove: function() {
                var f = $(this.el);
                f.modal("hide");
                f.off(".FormdataList");
                f.remove()
            }
        },
        initMb: {}
    });
    u.exports = n
});
define("form/component/chartcomponent", ["form/component", "form/componentmodel", "form/tplutil"], function(n, y, u) {
    y = n("form/component");
    var m = n("form/componentmodel")
      , h = n("form/tplutil")
      , g = "#5CBAE3 #E5CF0D #B6A2DE #8D98B3 #95706D #E4B600 #89B600 #D87A80".split(" ")
      , f = {
        etitle: "\u6807\u9898",
        eoptions: [{
            content: "\u9009\u9879\u4e00",
            percentage: "50.00%",
            bgcolor: g[0],
            votes: "50"
        }, {
            content: "\u9009\u9879\u4e8c",
            percentage: "25.00%",
            bgcolor: g[1],
            votes: "25"
        }, {
            content: "\u9009\u9879\u4e09",
            percentage: "10.00%",
            bgcolor: g[2],
            votes: "10"
        }, {
            content: "\u9009\u9879\u56db",
            percentage: "5.00%",
            bgcolor: g[3],
            votes: "5"
        }, {
            content: "\u9009\u9879\u4e94",
            percentage: "2.00%",
            bgcolor: g[4],
            votes: "2"
        }, {
            content: "\u9009\u9879\u516d",
            percentage: "8.00%",
            bgcolor: g[5],
            votes: "8"
        }],
        etotalvotes: 100,
        statfields: []
    }
      , d = [{
        name: "\u540d\u79f0",
        key: "name"
    }, {
        name: "\u63d0\u4ea4\u4eba",
        key: "creator"
    }, {
        name: "\u63d0\u4ea4\u65f6\u95f4",
        key: "create_time",
        type: "DateComponent"
    }, {
        name: "\u7ed3\u675f\u65f6\u95f4",
        key: "finish_time",
        type: "DateComponent"
    }]
      , b = [{
        name: "\u540d\u79f0",
        key: "name"
    }, {
        name: "\u63d0\u4ea4\u4eba",
        key: "reporter"
    }, {
        name: "\u63d0\u4ea4\u65f6\u95f4",
        key: "create_time",
        type: "DateComponent"
    }];
    window.ChartComponent = y.extend({
        initialize: function(c) {
            this.componentSetup = {
                fieldId: "",
                componentKey: "ChartComponent",
                title: "\u81ea\u5b9a\u4e49\u7edf\u8ba1",
                titleLayout: "field-hoz",
                order: 0,
                index: 0,
                yAixs: [],
                xAixs: [],
                chartType: "",
                statType: "",
                orderBy: "",
                groupType: "",
                xGroupType: "",
                formatType: "yType"
            };
            if (null != c) {
                this.componentSetup.fieldId = c.fieldId;
                this.componentSetup.title = c.title;
                this.componentSetup.order = c.order;
                this.componentSetup.index = c.index;
                this.componentSetup.yAixs = c.yAixs;
                if ("string" == typeof c.xAixs) {
                    var b = [];
                    b.push(c.xAixs);
                    this.componentSetup.xAixs = b
                } else
                    this.componentSetup.xAixs = c.xAixs;
                this.componentSetup.chartType = c.chartType;
                this.componentSetup.statType = c.statType;
                this.componentSetup.orderBy = c.orderBy;
                this.componentSetup.groupType = c.groupType;
                this.componentSetup.xGroupType = c.xGroupType;
                c.formatType && (this.componentSetup.formatType = c.formatType)
            }
            this.componentmodel = new m;
            this.tpl = h.get("chart")
        },
        setTitle: function(c) {
            this.componentSetup.title = c
        },
        setType: function(c) {
            this.componentSetup.chartType = c
        },
        setxAixs: function(c) {
            this.componentSetup.xAixs = c
        },
        setyAixs: function(c) {
            this.componentSetup.yAixs = c
        },
        setStatType: function(c) {
            this.componentSetup.statType = c
        },
        setTitleLayout: function(c) {
            this.componentSetup.titleLayout = c
        },
        setOrderBy: function(c) {
            this.componentSetup.orderBy = c
        },
        setGroupType: function(c) {
            this.componentSetup.groupType = c
        }, 
        setFormatType: function(c) {
            this.componentSetup.formatType = c
        },
        setXGroupType: function(c) {
            this.componentSetup.xGroupType = c
        },
        setRelatDataTableId: function(c) {
            this.componentSetup.tableId = c
        },
        setRelatDataUnitId: function(c) {
            this.componentSetup.colId = c
        },
        setIsOrgtiqu: function(c) {
            this.componentSetup.isOrgtiqu = c
        },
        setIsOrgtiqulist: function(c) {
            this.componentSetup.isOrgtiqulist = c
        },
        render: function(c) {
            var b = $(this.tpl)
              , e = null;
            "table" != this.componentSetup.chartType ? (e = b.siblings("#form-chart"),
            e.find(".statimg").attr("src", "/static/img/form/" + this.componentSetup.chartType + ".png")) : (e = b.siblings("#form-tablestat"),
            this.rendertabel(f, e));
            c.attr("class", e.attr("class"));
            c.html(e.html())
        },
        renderEditPreview: function(c) {
            var b = $(this.tpl)
              , e = null;
            "table" != this.componentSetup.chartType ? (e = b.siblings("#form-chart"),
            e.find(".statimg").attr("src", "/static/img/form/" + this.componentSetup.chartType + ".png")) : (e = b.siblings("#form-tablestat"),
            e.find(".widget-title .widget-title_js").text(this.componentSetup.title).attr("title", this.componentSetup.title),
            this.rendertabel(f, e));
            e.attr("id", this.componentSetup.fieldId);
            e.data("componentData", this);
            e.addClass(this.componentSetup.titleLayout);
            c.append(e)
        },
        renderEditor: function() {
            var c = this;
            c.formFields ? c.renderEditorValue() : this.componentmodel.findFormAllFields(function(f) {
                f.message && f.message ? formPlugin.notify(f.message) : (c.form = f.form,
                "biaoge" == c.form.module ? c.fixField = b : "workflow" == c.form.module && (c.fixField = d),
                c.formFields = f.formFieldList,
                c.renderEditorValue())
            })
        },
        renderEditorValue: function() {
            var c = $(this.tpl).siblings("#editor-chart")
              , b = c.find(".j-chart-xaixs")
              , e = "";
            this.fixField && $.each(this.fixField, function() {
                e += "\x3coption value\x3d'" + this.key + "' componentKey\x3d'" + this.type + "'\x3e" + this.name + "\x3c/option\x3e"
            });
            var a = this.formFields;
            $.each(a, function() {
                if ("FileComponent" == this.componentKey || "ImageComponent" == this.componentKey)
                    return !0;
                e = this.subForm && this.subForm.id ? e + ("\x3coption value\x3d'" + this.id + "' componentKey\x3d'" + this.componentKey + "' subFormId\x3d'" + this.subForm.id + "'\x3e" + this.title + (this["delete"] ? "(\u5df2\u5220\u9664)" : "") + "\x3c/option\x3e") : e + ("\x3coption value\x3d'" + this.id + "' componentKey\x3d'" + this.componentKey + "' \x3e" + this.title + (this["delete"] ? "(\u5df2\u5220\u9664)" : "") + "\x3c/option\x3e")
            });
            b.html(e);
            "task" == this.form.module && c.find(".j-xaixs-add").remove();
            if (this.componentSetup.formatType && "xType" == this.componentSetup.formatType) {
                c.find(".j_sort_chart").addClass("hide");
                c.find(".j-chart-xaixs").find("option[value\x3d'" + this.componentSetup.xAixs[0] + "']").attr("selected", !0);
                c.find(".j_chart_txaixs_choose").removeClass("hide");
                a = this.formFields;
                e = "";
                b = c.find(".j-chart-xaixs");
                b.find("option:selected").attr("componentKey");
                var d = b.find("option:selected").attr("subFormId")
                  , f = b.val();
                c.find(".j_chart_txaixs_choose").find(".j-chart-xaixs_two").html("");
                !d && this.fixField && $.each(this.fixField, function() {
                    this.key != f && (e += "\x3coption value\x3d'" + this.key + "' componentKey\x3d'" + this.type + "'\x3e" + this.name + "\x3c/option\x3e")
                });
                d ? $.each(a, function() {
                    this.subForm && this.subForm.id && this.subForm.id == d && this.id != f && (e += "\x3coption value\x3d'" + this.id + "' componentKey\x3d'" + this.componentKey + "' subFormId\x3d'" + this.subForm.id + "'\x3e" + this.title + (this["delete"] ? "(\u5df2\u5220\u9664)" : "") + "\x3c/option\x3e")
                }) : $.each(a, function() {
                    this.subForm || this.id == f || (e += "\x3coption value\x3d'" + this.id + "' componentKey\x3d'" + this.componentKey + "' \x3e" + this.title + (this["delete"] ? "(\u5df2\u5220\u9664)" : "") + "\x3c/option\x3e")
                });
                c.find(".j_chart_txaixs_choose").find(".j-chart-xaixs_two").html(e);
                c.find(".j_chart_txaixs_choose .j-chart-xaixs_two").find("option[value\x3d'" + this.componentSetup.xAixs[1] + "']").attr("selected", !0);
                this.componentSetup.xGroupType && 1 < this.componentSetup.xGroupType.length && ("DateComponent" == c.find(".j-chart-xaixs").find("option:selected").attr("componentKey") ? (c.find(".j-chart-grouptype").removeClass("hide"),
                c.find(".j_xaixs-date").addClass("group-xaixs-date"),
                c.find(".j-chart-grouptype").find("option[value\x3d'" + this.componentSetup.xGroupType[0] + "']").attr("selected", !0)) : (c.find(".j-chart-grouptype").addClass("hide"),
                c.find(".j_xaixs-date").removeClass("group-xaixs-date")),
                "DateComponent" == c.find(".j-chart-xaixs_two").find("option:selected").attr("componentKey") ? (c.find(".j-chart-grouptype-two").removeClass("hide"),
                c.find(".j_xaixs-date_two").addClass("group-xaixs-date"),
                c.find(".j-chart-grouptype-two").find("option[value\x3d'" + this.componentSetup.xGroupType[1] + "']").attr("selected", !0)) : (c.find(".j-chart-grouptype-two").addClass("hide"),
                c.find(".j_xaixs-date_two").removeClass("group-xaixs-date")))
            } else
                c.find(".j-chart-xaixs").find("option[value\x3d'" + this.componentSetup.xAixs[0] + "']").attr("selected", !0),
                "DateComponent" == c.find(".j-chart-xaixs").find("option[value\x3d'" + this.componentSetup.xAixs[0] + "']").attr("componentKey") ? (c.find(".j-chart-grouptype").removeClass("hide"),
                c.find(".j_xaixs-date").addClass("group-xaixs-date"),
                c.find(".j-chart-grouptype").find("option[value\x3d'" + this.componentSetup.groupType + "']").attr("selected", !0)) : (c.find(".j-chart-grouptype").addClass("hide"),
                c.find(".j_xaixs-date").removeClass("group-xaixs-date"));
            c.find("#component-title").attr("value", this.componentSetup.title);
            c.find(".j-chart-orderby").find("option[value\x3d'" + this.componentSetup.orderBy + "']").attr("selected", !0);
            c.find(".j-chart-charttype").find("a[value\x3d'" + this.componentSetup.chartType + "']").addClass("active").siblings().removeClass("active");
            (this.componentSetup.yAixs instanceof Array && 1 < this.componentSetup.yAixs.length || this.componentSetup.xAixs instanceof Array && 1 < this.componentSetup.xAixs.length) && c.find(".j-chart-charttype").find("a[value\x3d'pie'],a[value\x3d'table']").addClass("disabled");
            "pie" == this.componentSetup.chartType || "table" == this.componentSetup.chartType || this.componentSetup.formatType && "xType" == this.componentSetup.formatType ? (c.find(".j-yaixs-add").addClass("hide"),
            c.find(".j-xaixs-add").addClass("hide")) : (c.find(".j-yaixs-add").removeClass("hide"),
            c.find(".j-xaixs-add").removeClass("hide"));
            $("#editor-component").html(c.html());
            this.renderYaixs($("#editor-component").find(".j-chart-xaixs"));
            $("#editor-component").find(".j-chart-yaixs").change();
            this.setxAixs(this.bulidxAixs());
            this.setyAixs(this.bulidyAixs());
            this.componentSetup.formatType && "xType" == this.componentSetup.formatType && this.setXGroupType(this.bullidXGroupType())
        },
        bulidxAixs: function() {
            var c = [];
            c.push($("#editor-component").find(".j-chart-xaixs").val());
            this.componentSetup.formatType && "xType" == this.componentSetup.formatType && c.push($("#editor-component").find(".j_chart_txaixs_choose .j-chart-xaixs_two").val());
            return c
        },
        bulidyAixs: function() {
            var c = [];
            $(".j-yaixs-list li").each(function() {
                var b = $(this);
                c.push({
                    fieldId: b.find(".j-chart-yaixs").val(),
                    statType: b.find(".j-chart-stattype").val()
                })
            });
            return c
        },
        bullidXGroupType: function() {
            var c = [];
            $("#editor-component").find(".j-chart-grouptype").hasClass("hide") ? c.push("") : c.push($("#editor-component").find(".j-chart-grouptype").val());
            $("#editor-component").find(".j-chart-grouptype-two").hasClass("hide") ? c.push("") : c.push($("#editor-component").find(".j-chart-grouptype-two").val());
            return c
        },
        addYaixs: function(c) {
            var b = this.formFields
              , e = $(this.tpl).siblings("#yaixs-clone").children("li").clone()
              , a = $("#editor-component").find(".j-chart-xaixs");
            a.find("option:selected").attr("componentKey");
            var d = a.find("option:selected").attr("subFormId")
              , f = "";
            !d && this.fixField && $.each(this.fixField, function() {
                f += "\x3coption value\x3d'" + this.key + "' componentKey\x3d'" + this.type + "'\x3e" + this.name + "\x3c/option\x3e"
            });
            $.each(b, function() {
                d ? this.subForm && this.subForm.id && this.subForm.id == d && (f += "\x3coption value\x3d'" + this.id + "' componentKey\x3d'" + this.componentKey + "' subFormId\x3d'" + this.subForm.id + "'\x3e" + this.title + (this["delete"] ? "(\u5df2\u5220\u9664)" : "") + "\x3c/option\x3e") : f += "\x3coption value\x3d'" + this.id + "' componentKey\x3d'" + this.componentKey + "' \x3e" + this.title + (this["delete"] ? "(\u5df2\u5220\u9664)" : "") + "\x3c/option\x3e"
            });
            e.find(".j-chart-yaixs").html(f);
            this.renderstatType(e.find(".j-chart-yaixs"), e.find(".j-chart-stattype"));
            c ? c.after(e) : $(".j-yaixs-list").append(e)
        },
        renderxAixsTwo: function() {
            var c = this.formFields
              , b = ""
              , e = $("#editor-component").find(".j-chart-xaixs");
            e.find("option:selected").attr("componentKey");
            var a = e.find("option:selected").attr("subFormId")
              , d = e.val();
            $("#editor-component").find(".j_chart_txaixs_choose").find(".j-chart-xaixs_two").html("");
            !a && this.fixField && $.each(this.fixField, function() {
                this.key != d && (b += "\x3coption value\x3d'" + this.key + "' componentKey\x3d'" + this.type + "'\x3e" + this.name + "\x3c/option\x3e")
            });
            a ? $.each(c, function() {
                this.subForm && this.subForm.id && this.subForm.id == a && this.id != d && (b += "\x3coption value\x3d'" + this.id + "' componentKey\x3d'" + this.componentKey + "' subFormId\x3d'" + this.subForm.id + "'\x3e" + this.title + (this["delete"] ? "(\u5df2\u5220\u9664)" : "") + "\x3c/option\x3e")
            }) : $.each(c, function() {
                this.subForm || this.id == d || (b += "\x3coption value\x3d'" + this.id + "' componentKey\x3d'" + this.componentKey + "' \x3e" + this.title + (this["delete"] ? "(\u5df2\u5220\u9664)" : "") + "\x3c/option\x3e")
            });
            $("#editor-component").find(".j_chart_txaixs_choose").find(".j-chart-xaixs_two").html(b);
            "DateComponent" == $("#editor-component").find(".j_chart_txaixs_choose").find(".j-chart-xaixs_two").find("option:selected").attr("componentKey") ? ($("#editor-component").find(".j-chart-grouptype-two").removeClass("hide"),
            $("#editor-component").find(".j_xaixs-date_two").addClass("group-xaixs-date")) : ($("#editor-component").find(".j-chart-grouptype-two").addClass("hide"),
            $("#editor-component").find(".j_xaixs-date_two").removeClass("group-xaixs-date"));
            this.setXGroupType(this.bullidXGroupType())
        },
        addxAixs: function(c) {
            this.renderxAixsTwo();
            $("#editor-component").find(".j-xaixs-add").addClass("hide");
            $("#editor-component").find(".j_chart_txaixs_choose").removeClass("hide");
            $("#editor-component").find(".j-yaixs-add").addClass("hide");
            $("#editor-component").find(".j-yaixs-list").find("li:gt(0)").remove();
            $("#editor-component").find(".form-group-hasli").removeClass("form-group-moreli");
            this.setxAixs(this.bulidxAixs());
            this.setyAixs(this.bulidyAixs());
            this.setFormatType("xType")
        },
        renderstatType: function(c, b) {
            var e = b.find("option:selected").attr("componentKey");
            0 <= "MoneyMonitorRatyNumberComponent".indexOf(e) ? 6 != c.find("option").length && c.append("\x3coption value\x3d'sum'\x3e\u5408\u8ba1\x3c/option\x3e\x3coption value\x3d'max'\x3e\u6700\u5927\u503c\x3c/option\x3e\x3coption value\x3d'min'\x3e\u6700\u5c0f\u503c\x3c/option\x3e\x3coption value\x3d'avg'\x3e\u5e73\u5747\u503c\x3c/option") : c.find("option[value\x3d'sum'],option[value\x3d'max'],option[value\x3d'min'],option[value\x3d'avg']").remove()
        },
        renderYaixs: function(c) {
            var b = this.formFields;
            c.find("option:selected").attr("componentKey");
            var e = c.find("option:selected").attr("subFormId");
            c = $(this.tpl).siblings("#yaixs-clone").children("li").clone();
            var a = $(".j-yaixs-list").html("")
              , d = "";
            !e && this.fixField && $.each(this.fixField, function() {
                d += "\x3coption value\x3d'" + this.key + "' componentKey\x3d'" + this.type + "'\x3e" + this.name + "\x3c/option\x3e"
            });
            $.each(b, function() {
                e ? this.subForm && this.subForm.id && this.subForm.id == e && (d += "\x3coption value\x3d'" + this.id + "' componentKey\x3d'" + this.componentKey + "' subFormId\x3d'" + this.subForm.id + "'\x3e" + this.title + (this["delete"] ? "(\u5df2\u5220\u9664)" : "") + "\x3c/option\x3e") : d += "\x3coption value\x3d'" + this.id + "' componentKey\x3d'" + this.componentKey + "' \x3e" + this.title + (this["delete"] ? "(\u5df2\u5220\u9664)" : "") + "\x3c/option\x3e"
            });
            if (this.componentSetup.yAixs instanceof Array && 0 < this.componentSetup.yAixs.length) {
                for (b = 0; b < this.componentSetup.yAixs.length; b++) {
                    var f = c.clone();
                    f.find(".j-chart-yaixs").html(d).find("option[value\x3d'" + this.componentSetup.yAixs[b].fieldId + "']").attr("selected", !0);
                    this.renderstatType(f.find(".j-chart-yaixs"), f.find(".j-chart-stattype"));
                    f.find(".j-chart-stattype").find("option[value\x3d'" + this.componentSetup.yAixs[b].statType + "']").attr("selected", !0);
                    a.append(f)
                }
                1 < this.componentSetup.yAixs.length && $(".form-group-hasli").addClass("form-group-moreli")
            } else
                c.find(".j-chart-yaixs").html(d).find("option[value\x3d'" + this.componentSetup.yAixs + "']").attr("selected", !0),
                this.renderstatType(c.find(".j-chart-yaixs"), c.find(".j-chart-stattype")),
                c.find(".j-chart-stattype").find("option[value\x3d'" + this.componentSetup.statType + "']").attr("selected", !0),
                a.append(c)
        },
        renderPreview: function(c, b, e) {
            var a = this;
            b = $(a.tpl).siblings("#preview-chart");
            "pie" != a.componentSetup.chartType && "bar" != a.componentSetup.chartType && "line" != a.componentSetup.chartType || b.find(".pieview").height("400px");
            c.append(b);
            e = [];
            a.componentSetup.yAixs instanceof Array ? e = a.componentSetup.yAixs : e.push({
                fieldId: a.componentSetup.yAixs,
                statType: a.componentSetup.statType
            });
            e = {
                yAixsList: e,
                orderBy: a.componentSetup.orderBy,
                formType: a.componentSetup.formatType
            };
            this.componentSetup.formatType && "xType" == this.componentSetup.formatType ? (e.xAixsList = a.componentSetup.xAixs,
            e.xGroupTypeList = a.componentSetup.xGroupType) : (e.xAixs = a.componentSetup.xAixs[0],
            e.groupType = a.componentSetup.groupType);
            a.el = b;
            b.data("componentData", a);
            a.componentmodel.getFieldChartStat({
                chartParam: e,
                param: c.closest(".form-view_js").data("param")
            }, function(e) {
                a.componentSetup.formatType && "xType" == a.componentSetup.formatType && e.fieldChartDatas && 0 < e.fieldChartDatas.length ? a.renderChartViewByXtype(e, !0) : e.fieldChartDatas && 0 < e.fieldChartDatas.length && e.fieldChartDatas[0].chartDatas && 0 < e.fieldChartDatas[0].chartDatas.length ? a.renderChartView(e, !1, !0) : c.hasClass("form-view_js") ? c.html("\x3cdiv class\x3d'form-preview-nodata'\x3e\x3cdiv\x3e\x3ci\x3e\x3c/i\x3e\x3cspan\x3e\u6682\u65e0\u6570\u636e\x3c/span\x3e\x3c/div\x3e\x3c/div\x3e") : c.html("\x3cdiv class\x3d'nodata'\x3e\x3cdiv\x3e\x3ci\x3e\x3c/i\x3e\x3cspan\x3e\u6682\u65e0\u6570\u636e\x3c/span\x3e\x3c/div\x3e\x3c/div\x3e")
            })
        },
        renderChartPreview: function(c) {
            var b = this
              , e = $(b.tpl).siblings("#preview-chart")
              , a = [];
            b.componentSetup.yAixs instanceof Array ? a = b.componentSetup.yAixs : a.push({
                fieldId: b.componentSetup.yAixs,
                statType: b.componentSetup.statType
            });
            a = {
                yAixsList: a,
                orderBy: b.componentSetup.orderBy,
                formType: b.componentSetup.formatType
            };
            this.componentSetup.formatType && "xType" == this.componentSetup.formatType ? (a.xAixsList = b.componentSetup.xAixs,
            a.xGroupTypeList = b.componentSetup.xGroupType) : (a.xAixs = b.componentSetup.xAixs[0],
            a.groupType = b.componentSetup.groupType);
            b.el = e;
            b.componentmodel.getFieldChartStat({
                chartParam: a
            }, function(a) {
                b.componentSetup.formatType && "xType" == b.componentSetup.formatType && a.fieldChartDatas && 0 < a.fieldChartDatas.length ? (c.html(e),
                b.renderChartViewByXtype(a, !1)) : a.fieldChartDatas && 0 < a.fieldChartDatas.length && a.fieldChartDatas[0].chartDatas && 0 < a.fieldChartDatas[0].chartDatas.length ? (c.html(e),
                b.renderChartView(a, !1, !1)) : c.hasClass("form-view_js") ? c.html("\x3cdiv class\x3d'form-preview-nodata'\x3e\x3cdiv\x3e\x3ci\x3e\x3c/i\x3e\x3cspan\x3e\u6682\u65e0\u6570\u636e\x3c/span\x3e\x3c/div\x3e\x3c/div\x3e") : c.html("\x3cdiv class\x3d'nodata'\x3e\x3cdiv\x3e\x3ci\x3e\x3c/i\x3e\x3cspan\x3e\u6682\u65e0\u6570\u636e\x3c/span\x3e\x3c/div\x3e\x3c/div\x3e")
            })
        },
        rendertabel: function(c, b) {
            var e = b.find("tbody");
            b.find(".widget-title_js").text(this.componentSetup.title).attr("title", this.componentSetup.title);
            b.find(".j-total-count").text(c.etotalvotes).attr("title", c.etotalvotes);
            $.each(c.eoptions, function() {
                var a = e.find("tr:first").clone().show();
                a.find(".j_content").text(this.content).attr("title", this.content);
                a.find(".j_prograssbar").css({
                    width: this.percentage,
                    "background-color": this.bgcolor
                });
                a.find(".j_percentage").text(this.percentage).attr("title", this.percentage);
                a.find(".j_votes").text(this.votes).attr("title", this.votes);
                a.data("chartData", this.chartData);
                e.find("tr:last").before(a)
            })
        },
        rendertabelPreview: function(c, b) {
            var e = b.find("tbody");
            $.each(c.eoptions, function(a) {
                if (4 > a)
                    a = e.find("tr:first").clone().show(),
                    a.find(".j_content").text(this.content).attr("title", this.content),
                    a.find(".j_prograssbar").css({
                        width: this.percentage,
                        "background-color": this.bgcolor
                    }),
                    a.find(".j_percentage").text(this.percentage).attr("title", this.percentage),
                    a.find(".j_votes").text(this.votes).attr("title", this.votes),
                    e.append(a);
                else
                    return !1
            })
        },
        renderChartViewByXtype: function(c, b) {
            var e = this
              , a = c.fieldChartDatas;
            if (null != a && 0 != a.length) {
                e.xField = c.xField;
                e.xFieldSecond = c.xFieldSecond;
                var d = []
                  , f = []
                  , g = ""
                  , g = e.componentSetup.yAixs instanceof Array ? e.componentSetup.yAixs[0].statType : e.componentSetup.statType;
                if (a && 0 < a.length)
                    for (var h = 0, p = a.length; h < p; h++) {
                        var f = a[h].chartDatas
                          , w = "";
                        if (f && 0 < f.length) {
                            for (var m = 0; m < f.length; m++)
                                f[m].name && (w = f[m].name);
                            w && 11 < w.length && (w = w.substring(0, 10) + "\u2026");
                            d.push(w)
                        }
                    }
                for (var s = {
                    tooltip: {
                        trigger: "axis"
                    },
                    color: "#57b5e3 #53a93f #d73d32 #f4b400 #11a9cc #6f85bf #ffce55 #ed4e2a #bc5679 #7e3794 #981b48 #cc324b".split(" "),
                    series: []
                }, f = [], h = w = p = 0; h < a.length; h++)
                    p <= a[h].chartDatas.length && (p = a[h].chartDatas.length,
                    w = h);
                for (h = 0; h < p; h++) {
                    c = [];
                    for (m = 0; m < a.length; m++)
                        a[m].chartDatas[h] ? c.push(a[m].chartDatas[h]) : c.push(0);
                    f.push(a[w].chartDatas[h].secondXName);
                    s.series.push({
                        name: a[w].chartDatas[h].secondXName,
                        type: e.componentSetup.chartType,
                        data: c
                    })
                }
                h = "";
                a && 0 < a.length && (h = a[0].yAxis);
                b ? ((a = e.componentSetup.title) && 20 < a.length && (a = a.substring(0, 19) + "\u2026"),
                s.title = {
                    text: a,
                    x: "center"
                },
                s.legend = {
                    show: !0,
                    orient: "horizontal",
                    data: f,
                    formatter: function(a) {
                        return echarts3.format.truncateText(a, 80, "14px Microsoft Yahei", "\u2026")
                    },
                    bottom: 0,
                    x: "center",
                    tooltip: {
                        show: !0
                    }
                },
                h && 8 < h.length && (h = h.substring(0, 7) + "\u2026")) : h && 3 < h.length && (h = h.substring(0, 2) + "\u2026");
                s.xAxis = "line" == e.componentSetup.chartType ? [{
                    type: "category",
                    data: d,
                    boundaryGap: !1
                }] : [{
                    type: "category",
                    data: d
                }];
                s.yAxis = [{
                    type: "value",
                    name: h ? h + e.getStatTypeName(g) : ""
                }];
                s.toolbox = {
                    show: b,
                    feature: {
                        magicType: {
                            type: ["line", "bar"]
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                };
                n.async("plugins/echarts3.2.3.min.js", function() {
                    var a = e.el.find(".pieview");
                    this.pieChart = echarts3.init(a.get(0));
                    if (a.parents().hasClass("j-chart-detail"))
                        $(window).on("resize", pieChart.resize);
                    this.pieChart.setOption(s)
                })
            }
        },
        renderChartView: function(c, b, e) {
            var a = c.fieldChartDatas;
            if (null != a && 0 != a.length) {
                var d = this;
                d.xField = c.xField;
                var f = [];
                c = [];
                var g = []
                  , h = this.componentSetup.chartType
                  , p = ""
                  , p = d.componentSetup.yAixs instanceof Array ? d.componentSetup.yAixs[0].statType : d.componentSetup.statType;
                if ("table" == h)
                    g = a[0],
                    e = d.processData(a[0].chartDatas),
                    f = null,
                    b ? (f = $(d.tpl).siblings("#form-tablestat-preview"),
                    d.rendertabelPreview(e, f)) : (f = $(d.tpl).siblings("#form-tablestat").removeClass("field_js"),
                    f.find(".j_widgetDele").remove(),
                    d.rendertabel(e, f)),
                    f.find("th:eq(0)").text(g.xAxis).attr("title", g.xAxis),
                    f.find("th:eq(2)").text(g.yAxis + d.getStatTypeName(p)).attr("title", g.yAxis + d.getStatTypeName(p)),
                    d.el.html(f);
                else {
                    if ((g = a[0].chartDatas) && 0 < g.length)
                        for (var h = 0, w = g.length; h < w; h++)
                            g[h].name && 11 < g[h].name.length && (g[h].name = g[h].name.substring(0, 10) + "\u2026"),
                            f.push(g[h].name),
                            "pie" == d.componentSetup.chartType && c.push(g[h]);
                    for (h = 0; h < a.length; h++)
                        g = a[h],
                        g.yAxis && 11 < g.yAxis.length && (g.yAxis = g.yAxis.substring(0, 10) + "\u2026");
                    var m = {
                        tooltip: {
                            trigger: "axis"
                        },
                        color: "#57b5e3 #53a93f #d73d32 #f4b400 #11a9cc #6f85bf #ffce55 #ed4e2a #bc5679 #7e3794 #981b48 #cc324b".split(" ")
                    };
                    if ("pie" == d.componentSetup.chartType)
                        m.series = [{
                            name: a[0].yAxis + d.getStatTypeName(p),
                            type: d.componentSetup.chartType,
                            data: c
                        }];
                    else
                        for (m.series = [],
                        h = 0; h < a.length; h++) {
                            c = [];
                            for (g = 0; g < a[h].chartDatas.length; g++)
                                c.push(a[h].chartDatas[g]);
                            m.series.push({
                                name: a[h].yAxis + d.getStatTypeName(1 < a.length ? d.componentSetup.yAixs[h].statType : p),
                                type: d.componentSetup.chartType,
                                data: c
                            })
                        }
                    b || ((p = d.componentSetup.title) && 20 < p.length && (p = p.substring(0, 19) + "\u2026"),
                    e && (m.title = {
                        text: p,
                        x: "center"
                    }),
                    m.toolbox = {
                        show: e,
                        feature: {
                            saveAsImage: {
                                show: !0
                            }
                        }
                    },
                    m.legend = {
                        orient: "vertical",
                        x: "left",
                        data: f,
                        show: e,
                        formatter: function(a) {
                            return echarts3.format.truncateText(a, 80, "14px Microsoft Yahei", "\u2026")
                        },
                        tooltip: {
                            show: !0
                        }
                    });
                    "pie" != d.componentSetup.chartType ? (m.xAxis = "line" == d.componentSetup.chartType ? [{
                        type: "category",
                        data: f,
                        boundaryGap: !1
                    }] : [{
                        type: "category",
                        data: f
                    }],
                    m.yAxis = [{
                        type: "value"
                    }],
                    b ? m.grid = {
                        left: "2%",
                        right: "2%",
                        bottom: "5%",
                        top: "5%",
                        containLabel: !0
                    } : m.toolbox = {
                        show: e,
                        feature: {
                            magicType: {
                                type: ["line", "bar"]
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    }) : m.tooltip = {
                        trigger: "item",
                        formatter: "{a} \x3cbr/\x3e{b} : {c} ({d}%)"
                    };
                    n.async("plugins/echarts3.2.3.min.js", function() {
                        var a = d.el.find(".pieview");
                        this.pieChart = echarts3.init(a.get(0));
                        if (a.parents().hasClass("j-chart-detail"))
                            $(window).on("resize", pieChart.resize);
                        this.pieChart.setOption(m)
                    })
                }
            }
        },
        processData: function(c) {
            var b = []
              , e = 0
              , a = {};
            if (c && 0 < c.length) {
                for (var d = 0, f = c.length; d < f; d++)
                    e += Number(c[d].value);
                d = 0;
                for (f = c.length; d < f; d++) {
                    var h = {
                        percentage: 0 == e ? "0%" : (100 * c[d].value / e).toFixed(2) + "%",
                        bgcolor: g[d % g.length],
                        content: c[d].name,
                        votes: c[d].value
                    };
                    h.chartData = c[d];
                    b.push(h)
                }
            }
            a.etotalvotes = e;
            a.eoptions = b;
            a.etitle = this.componentSetup.title;
            a.statfields = [];
            return a
        },
        renderStatSearch: function(c) {
            var b = $(this.tpl).siblings("#statsearch-text")
              , e = c.value;
            e && b.find("input").val(e);
            (e = c.term) && b.find("select:first option[value\x3d" + e + "]").attr("selected", "true");
            c = c.parentEl;
            c.attr("class", "sch-group j_formFieldSearchGroup");
            c.find(".j_formField-condition").html(b)
        },
        getStatTypeName: function(c) {
            var b = "";
            switch (c) {
            case "countall":
                b = "(\u8ba1\u6570)";
                break;
            case "count":
                b = "(\u8ba1\u6570\u53bb\u91cd)";
                break;
            case "sum":
                b = "(\u5408\u8ba1)";
                break;
            case "max":
                b = "(\u6700\u5927\u503c)";
                break;
            case "min":
                b = "(\u6700\u5c0f\u503c)";
                break;
            case "avg":
                b = "(\u5e73\u5747\u503c)"
            }
            return b
        },
        submitCheck: function(c, b) {},
        checkEvents: function(c) {},
        check: function(c) {},
        getValue: function(c, b) {},
        setValue: function(c, b) {},
        empty: function(c) {},
        readOnly: function(c, b) {}
    });
    u.exports = window.ChartComponent
});
define("form/component/productioncomponent", "form/relatecomponent form/tplutil form/componentmodel form/component/productionlist form/component/entityselecter form/component/typeahead form/component/relevancecontrol form/abposview".split(" "), function(n, y, u) {
    var m = n("form/relatecomponent")
      , h = n("form/tplutil")
      , g = n("form/componentmodel")
      , f = n("form/component/productionlist")
      , d = n("form/component/entityselecter")
      , b = n("form/component/typeahead")
      , c = n("form/component/relevancecontrol")
      , l = n("form/abposview");
    window.ProductionComponent = m.extend({
        initialize: function(e) {
            m.prototype.initialize.call(this, e);
            var a = {
                componentKey: "ProductionComponent",
                title: "\u5173\u8054\u4ea7\u54c1",
                showfields: [],
                cusCustomFields: [],
                newSortColumn: [],
                selectColumn: [],
                orderContent: ""
            };
            null != e && (a.title = e.title,
            a.showfields = e.showfields,
            a.newSortColumn = e.newSortColumn,
            a.selectColumn = e.selectColumn,
            a.orderContent = e.orderContent,
            a.cusCustomFields = e.cusCustomFields);
            this.componentSetup = $.extend(this.componentSetup, a);
            this.basefields = {
                manager: "\u8d1f\u8d23\u4eba",
                price: "\u5355\u4ef7",
                unit: "\u5355\u4f4d",
                description: "\u5907\u6ce8"
            };
            this.tpl = h.get("productioncomponent", {
                isMobileForm: this.isMobileForm
            });
            this.componentModel = new g
        },
        setCusCustomFields: function(e) {
            this.componentSetup.cusCustomFields = e
        },
        setShowfields: function(e) {
            this.componentSetup.showfields = e
        },
        setNewSortColumn: function(e) {
            this.componentSetup.newSortColumn = e
        },
        setSelectColumn: function(e) {
            this.componentSetup.selectColumn = e
        },
        setOrderContent: function(e) {
            this.componentSetup.orderContent = e
        },
        render: function(e) {
            var a = this
              , c = $(this.tpl).siblings("#form-production");
            if (1 == e.parents("div[componentKey\x3d'TableLayout']").length || 1 == e.parents("div[componentKey\x3d'ColumnPanel']").length)
                e.removeClass("field-hoz"),
                this.componentSetup.titleLayout = "";
            this.componentModel.generatorId(function(c) {
                a.componentSetup.tempId = c.generatorId;
                e.attr("tempId", c.generatorId)
            });
            m.prototype.render.call(this, e, c);
            e.html(c.html())
        },
        renderEditPreview: function(e, a) {
            var c = $(this.tpl).siblings("#form-production");
            m.prototype.renderEditPreview.call(this, e, c);
            a ? e.replaceWith(c) : e.append(c)
        },
        renderEditor: function() {
            var e = this
              , a = $(this.tpl).siblings("#editor-production")
              , c = !1;
            if ("true" == this.componentSetup.isUnique || 1 == this.componentSetup.isUnique)
                c = !0;
            a.find("#isUnique").attr("checked", c);
            if (1 == $("#widget-control .field-active").parents("div[componentKey\x3d'TableLayout']").length || 1 == $("#widget-control .field-active").parents("div[componentKey\x3d'ColumnPanel']").length)
                $("#widget-control .field-active").removeClass("field-hoz"),
                this.componentSetup.titleLayout = "";
            e.getFormIdByModule("production", a);
            a.find(".j_showField .j_production-field-ul").empty();
            var d = this.componentSetup.showfields;
            if (d && 0 < d.length) {
                for (c = 0; c < d.length; c++) {
                    var f = d[c]
                      , l = a.find(".j_clone .j_production-field-li").clone();
                    l.find("#" + f).attr("selected", "selected");
                    a.find(".j_showField .j_production-field-ul").append(l)
                }
                a.find(".j_showField").removeClass("hide");
                a.find(".j_batch_edit").removeClass("hide");
                a.find(".j_cardConf").addClass("hide")
            }
            m.prototype.renderEditor.call(this, a);
            $("#editor-component").html(a.html());
            new b({
                remote: "/production/getAllProductions",
                entity: "production",
                changeValue: function() {
                    e.setDefaultValue()
                }
            });
            if ((a = this.componentSetup.content) && 0 < a.length)
                for (d = $("#editor-component").find(".js_entity_container"),
                c = 0; c < a.length; c++)
                    f = {
                        id: a[c].optionId,
                        name: a[c].content
                    },
                    l = $('\x3cspan name\x3d"js_entity_item" class\x3d"js_entity_item employee-item j_component"\x3e\x3ca data-id\x3d"' + f.id + '" data-module\x3d"" id\x3d"' + f.id + '" class\x3d"entitybox-toggle" title\x3d"' + f.name + '"\x3e' + f.name + '\x3c/a\x3e\x3ca class\x3d"close js_deleteItem" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e'),
                    l.data("obj", f),
                    d.append(l)
        },
        getFormIdByModule: function(e, a) {
            var c = this;
            $.ajax({
                type: TEAMS.ajaxMethod,
                dataType: "json",
                async: !1,
                url: TEAMS.api.getFormId,
                data: {
                    module: e
                },
                success: function(b) {
                    (b = b.data) && c.getFieldsByFormId(b, e, a)
                }
            })
        },
        getFieldsByFormId: function(e, a, c) {
            var b = {};
            b.formId = e;
            b.module = a;
            e = [];
            e.push("0");
            b.statusList = e;
            $.ajax({
                contentType: "application/json",
                type: TEAMS.ajaxMethod,
                async: !1,
                data: JSON.stringify(b),
                dataType: "json",
                url: TEAMS.api.queryFormFieldsByFormId,
                success: function(a) {
                    if (a && a.formField)
                        for (var e = 0; e < a.formField.length; e++) {
                            var b = a.formField[e];
                            b["delete"] || "SignatureComponent" == b.componentKey || c.find(".j_clone .j_production-field-li select").append('\x3coption class\x3d"j_option j_custom_option" value\x3d"' + b.id + '" id\x3d"' + b.id + '"\x3e' + b.title + "\x3c/option\x3e")
                        }
                }
            })
        },
        setDefaultValue: function() {
            var e = $("#editor-component").find(".js_entity_container .js_entity_item")
              , a = [];
            0 < e.length && e.each(function(e) {
                var c = $(this).data("obj");
                a[e] = {
                    optionId: c.id,
                    content: c.name
                }
            });
            this.componentSetup.content = a
        },
        renderPreview: function(e, a, c, b, d) {
            var f = $(this.tpl);
            b = null;
            (b = $("body").find("#formTenantKey").val()) ? b = b.toUpperCase() : null != TEAMS.currentTenant && (b = TEAMS.currentTenant.tenantKey.toUpperCase());
            if ($("body").find("#scanReport").val() || null != TEAMS.currentUser && TEAMS.currentTenant.tenantKey.toUpperCase() == b)
                if (b = this.getCurrentModuleIsPay(d),
                0 == b || "false" == b) {
                    d = formPlugin.moduleIsPay("production");
                    var l = $('\x3cspan class\x3d"employee-item"\x3e\u60a8\u7684\u56e2\u961f\u76ee\u524d\u662f\u514d\u8d39\u7248\u672c\uff0c\u4e0d\u652f\u6301\u6b64\u529f\u80fd\uff01\x3c/span\x3e');
                    "mobile" != window.systemInfo_form ? (b = f.siblings("#preview-production"),
                    d || (b.find(".js_productionitem_container").empty().append(l),
                    b.find(".js_form-production-add").addClass("hide"),
                    b.find(".typeahead-wrapper").remove())) : (b = f.siblings("#mobile-preview"),
                    d || b.find(".js_productionitem_container").removeClass("production-seleted").empty().append(l))
                } else
                    b = "mobile" != window.systemInfo_form ? f.siblings("#preview-production") : f.siblings("#mobile-preview");
            else
                b = f.siblings("#noproduction-preview"),
                b.find(".field_message_js").attr("cid", this.cid);
            if ((f = TEAMS.disableModules) && 0 < f.length)
                for (d = 0; d < f.length; d++)
                    if (l = f[d],
                    l.module && "production" == l.module) {
                        b.addClass("hide");
                        break
                    }
            b.find(".widget-title .widget-title_js").text(this.componentSetup.title);
            "true" != this.componentSetup.isHideTitle && 1 != this.componentSetup.isHideTitle || b.addClass("field-notitle").find(".widget-title .widget-title_js").addClass("hide");
            "true" != this.componentSetup.required && 1 != this.componentSetup.required || b.find(".widget-title .widget-required_js").text(" *");
            "" != this.componentSetup.describe && b.find(".field-description").text(this.componentSetup.describe).show();
            b.find(".check_js").data("componentData", this).attr("id", this.componentSetup.fieldId + this.cid).attr("name", this.componentSetup.fieldId).attr("cid", this.cid);
            b.attr("fieldId", this.componentSetup.fieldId).attr("id", "field_" + (this.componentSetup.fieldId || this.componentSetup.tempId));
            "mobile" == window.systemInfo_form && b.find(".production-seleted").attr("id", this.componentSetup.fieldId);
            f = this.componentSetup.isUnique;
            if ("true" == f || 1 == f)
                "mobile" != window.systemInfo_form ? b.find("#searchproduction").removeAttr("data-multi") : b.find(".js_productionitem_container").attr("data-multi", "false");
            b.addClass(this.componentSetup.titleLayout);
            "true" != this.componentSetup.isDefault && 1 != this.componentSetup.isDefault || a || (a = this.componentSetup.content) && 0 < a.length && null != TEAMS.currentUser && this.setValue(b, {
                dataOptions: a
            });
            if (c || "true" == c)
                "mobile" != window.systemInfo_form ? this.readOnly(b, !0) : b.find(".js_productionitem_container").removeClass("production-seleted").text("");
            if ("true" == this.componentSetup.isReadOnly || 1 == this.componentSetup.isReadOnly)
                "mobile" != window.systemInfo_form ? this.readOnly(b, !0) : (b.find(".js_productionitem_container").removeClass("production-seleted"),
                (a = this.componentSetup.content) && 0 != a.length || b.find(".js_productionitem_container").text(""));
            this.getValue(b);
            this.el = e;
            e.append(b)
        },
        getCurrentModuleIsPay: function(e) {
            var a = !1;
            e && (a = formPlugin.moduleIsPay(e));
            return a
        },
        renderStatSearch: function(e) {
            var a = this
              , c = $(this.tpl)
              , b = e.parentEl
              , d = e.container
              , f = null
              , l = e.fieldId
              , g = e.subFormId
              , h = e.filterEl
              , m = e.fieldTitle
              , A = e.condition
              , x = e.ids
              , n = e.term
              , B = b.find(".j_formField-select select").find("option:selected").attr("module") || e.module;
            if ("mobile" != window.systemInfo_form) {
                f = c.siblings("#statsearch-entity");
                f.find(".control-btn").attr("mod", B);
                if (x)
                    for (f.find(".entity-container").empty(),
                    m = 0; m < x.length; m++)
                        e = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d"' + x[m].id + '" title\x3d"' + x[m].text + '"\x3e' + x[m].text + "\x3c/a\x3e\x3c/span\x3e",
                        f.find(".entity-container").append(e);
                n && f.find("select:first option[value\x3d" + n + "]").attr("selected", "true");
                x = (new Date).getTime();
                f.find(".j_entityContainer").attr("id", "j_production" + x);
                b.attr("class", "sch-group j_formFieldSearchGroup");
                b.find(".j_formField-condition").html(f);
                if ("biaoge" == B) {
                    var D = $(d + " #j_production" + x + " #typeahead-production");
                    D.attr("fieldId", l).attr("pageNo", "1").attr("pageSize", "10");
                    D.parents(".j_entityContainer").find(".typeahead-search").attr("url", "/formdata/queryRelevanceDataOptions.json").attr("fieldId", l);
                    window.typeahead && window.typeahead.init && window.typeahead.init({
                        el: d + " #j_production" + x + " #typeahead-production",
                        remote: "/formdata/queryRelevanceDataOptions.json",
                        callback: function(e) {
                            if (e && !$.isEmptyObject(e)) {
                                var c = D.parents(".j_entityContainer").find(".j_selected");
                                a.renderTypeheader(c, e)
                            }
                        }
                    })
                }
            } else
                f = c.siblings("#statsearch-production-mobile"),
                A && (f.find(".j_condition").find('option[value\x3d"' + A + '"]').attr("selected", !0),
                "null" != A && "notnull" != A || f.find(".j_control").hide()),
                h && (f.find("#seleted-list").empty(),
                h.find(".j_filterList .selectd #comp-val span").each(function() {
                    var a = $(this).attr("optionId")
                      , e = $(this).text()
                      , c = $("\x3cspan\x3e\x3c/span\x3e");
                    c.attr("id", a).text(e);
                    f.find("#seleted-list").append(c)
                })),
                d = {},
                d.fieldId = l,
                d.pageNo = 1,
                d.pageSize = "20",
                d.module = B,
                a.searchProduction(d, f, l, m, b, g),
                b.off("change", "#statsearch-production-mobile .j_condition").on("change", "#statsearch-production-mobile .j_condition", function() {
                    var a = $(this).val();
                    "null" == a || "notnull" == a ? b.find("#statsearch-production-mobile .j_control").hide() : b.find("#statsearch-production-mobile .j_control").show()
                }),
                b.off("tap", "#statsearch-production-mobile .j_optionli").on("tap", "#statsearch-production-mobile .j_optionli", function() {
                    var a = $(this);
                    a.hasClass("selected") ? a.removeClass("selected") : a.addClass("selected");
                    var e = a.find(".j_optionname").text()
                      , a = a.attr("id")
                      , e = '\x3cspan id\x3d"' + a + '"\x3e' + e + "\x3c/span\x3e";
                    0 < b.find("#statsearch-production-mobile #seleted-list #" + a).length ? b.find("#statsearch-production-mobile #seleted-list #" + a).remove() : b.find("#statsearch-production-mobile #seleted-list").append(e)
                }),
                b.off("tap", "#statsearch-production-mobile .j_more").on("tap", "#statsearch-production-mobile .j_more", function() {
                    var e = $(this)
                      , c = e.attr("pageNo")
                      , d = e.attr("fieldId")
                      , e = e.attr("title")
                      , k = {};
                    k.fieldId = d;
                    k.pageSize = "20";
                    k.pageNo = c;
                    k.module = B;
                    a.searchProduction(k, f, d, e, b, g)
                })
        },
        renderTypeheader: function(e, a) {
            var c = a.name
              , b = a.id;
            if (c && b) {
                var d = '\x3cspan id\x3d"' + b + '" class\x3d"entity-item j_entity_item" name\x3d"j_entity_item"\x3e\x3ca title\x3d"' + c + '" id\x3d"' + b + '" class\x3d"entitybox-toggle" data-module\x3d"production" data-value\x3d"' + b + '" data-id\x3d"' + b + '"\x3e' + c + "\x3c/a\x3e\x3c/span\x3e";
                e.find(".entity-item").each(function(a) {
                    b == $(this).find("a").attr("id") && (d = null)
                });
                e.append(d);
                e.find(".j_entity_item").data("object", a)
            }
        },
        searchProduction: function(e, a, c, b, d, f) {
            $.ajax({
                type: TEAMS.ajaxMethod,
                url: "freeform/queryFormDataOptions.json",
                dataType: "json",
                data: e,
                success: function(e) {
                    var l = e.dataOptionPage;
                    if (0 == l.totalCount)
                        a.find(".j_noresult").removeClass("hide"),
                        a.find(".eui-cells").addClass("hide");
                    else
                        for (l.hasNext && a.find(".j_more").removeClass("hide").attr("pageNo", l.pageNo + 1).attr("fieldId", c).attr("title", b),
                        e = l.result,
                        1 == l.pageNo && a.find(".j_optionUl").empty(),
                        a.find("#seleted-list").attr("fieldId", c),
                        l = 0; l < e.length; l++) {
                            var g = e[l]
                              , h = g.content
                              , g = g.optionId
                              , m = a.find("#li-clone li").clone();
                            0 < a.find("#seleted-list").find("#" + g).length && m.addClass("selected");
                            m.find(".j_optionname").text(h);
                            m.attr("id", g);
                            a.find(".j_optionUl").append(m)
                        }
                    d.find("#component-div").html(a);
                    d.find(".j_comp-ok").attr("comKey", "ProductionComponent").attr("fieldId", c).attr("title", b).attr("subFormId", f)
                }
            })
        },
        submitCheck: function(e, a) {
            var c = this.check(e);
            a(c)
        },
        checkEvents: function(e) {
            var a = this
              , b = a.el || $(document)
              , l = a.componentSetup.fieldId + this.cid
              , g = a.componentSetup.newSortColumn
              , h = a.componentSetup.selectColumn
              , p = a.componentSetup.orderContent
              , w = a.componentSetup.isAddForRelation;
            (new this.productionAhead({})).initAhead(l, g, h, p, w);
            var m = a.componentSetup.isUnique;
            if ("mobile" == window.systemInfo_form)
                b.on("click", "#" + l + " .production-seleted", function(e) {
                    e = $(this).attr("data-module");
                    var b = $(this).attr("data-multi")
                      , f = $(this).attr("data-noempty") && "true" == $(this).attr("data-noempty") ? !0 : !1
                      , k = $(this).parents(".j_page-view")
                      , g = k.attr("id")
                      , h = $(this);
                    if (!$(this).parents(".j_formpreview").hasClass("form-noedit")) {
                        var r = $("#" + l + " .production-seleted .j_production_detail")
                          , q = [];
                        r && 0 < r.length && r.each(function(a) {
                            a = $(this).find(".j_production").attr("id");
                            var e = $(this).find(".j_production").text();
                            q.push({
                                name: e,
                                id: a,
                                module: "production"
                            })
                        });
                        "true" == m || 1 == m ? (h = new d,
                        h.render("mb", {
                            targetEl: $(this),
                            module: e,
                            multi: b,
                            preEl: "#" + g,
                            noempty: f,
                            seletedList: q,
                            showfields: a.componentSetup.showfields,
                            order: p
                        })) : 0 == q.length ? (h = new d,
                        h.render("mb", {
                            targetEl: $(this),
                            module: e,
                            multi: b,
                            preEl: "#" + g,
                            noempty: f,
                            seletedList: q,
                            showfields: a.componentSetup.showfields,
                            order: p
                        })) : (new c({
                            targetEl: h,
                            module: e,
                            multi: b,
                            preEl: "#" + g,
                            noempty: f,
                            seletedList: q,
                            showfields: a.componentSetup.showfields,
                            order: p
                        })).render();
                        k.addClass("hide")
                    }
                });
            b.off("entitySelected", "#" + l + " #searchproduction").on("entitySelected", "#" + l + " #searchproduction", function(e) {
                var c = $("#" + l);
                1 != m && "true" != m || $("#" + l + " .js_productionitem_container").empty();
                for (var b = 1; b < arguments.length; b++)
                    c.parents(".field_js").find(".form-error").text(""),
                    c.parents(".field_js").find(".form-error").hide(),
                    a.renderSelectItem(l, arguments[b], a.componentSetup.showfields, c);
                a.triggerFillRelate(c)
            });
            b.on("click", "#" + l + " #searchproduction", function(e) {
                window.abposview && window.abposview.remove();
                e.stopPropagation();
                $("#" + l + " .control-input").trigger("focusout", "tt");
                var c = [];
                (e = $("#" + l + " .js_productionitem_container .j_production_detail")) && 0 < e.length && e.each(function(a) {
                    a = $(this).find(".j_production").attr("id");
                    var e = $(this).find(".j_production").text()
                      , b = $(this).find(".j_production").data("production");
                    null == b && (b = {
                        name: e,
                        id: a
                    });
                    c.push({
                        name: e,
                        id: a,
                        production: b
                    })
                });
                e = $(this);
                (new f).render("pc", {
                    targetEl: e,
                    keyword: "",
                    isUnique: m,
                    seletedList: c,
                    selectColumn: a.componentSetup.selectColumn,
                    order: a.componentSetup.orderContent,
                    isAddForRelation: w
                })
            });
            b.on("mouseenter.typeahead", "#" + l + " .typeahead-wrapper", function(a) {
                $(this).data("enter", !0)
            }).on("mouseleave.typeahead", "#" + l + " .typeahead-wrapper", function(a) {
                $(this).data("enter", !1)
            });
            b.on("click", "#" + l + " .control-btn", function(a) {
                a.stopPropagation();
                $(this).addClass("hide");
                $(this).prev(".typeahead-wrapper").removeClass("hide");
                $(this).prev(".typeahead-wrapper").find(".control-input").focus()
            });
            b.on("focusout", "#" + l + " .control-input", function(a, e) {
                var c = $(this).parents(".typeahead-wrapper");
                c.data("enter") && "tt" != e || (c.addClass("hide"),
                c.next(".control-btn").removeClass("hide"))
            });
            b.on("click.tt", "#" + l + " #searchList\x3ep", function() {
                var e = $("#" + l);
                e.parents(".field_js").find(".form-error").text("");
                e.parents(".field_js").find(".form-error").hide();
                var c = a.componentSetup.showfields
                  , b = a.componentSetup.isUnique;
                "true" != b && 1 != b || e.find(".js_productionitem_container").empty();
                if ($(this).hasClass("creat-new")) {
                    b = $(this).attr("title");
                    if (null == b || "" == b)
                        return;
                    $.ajax({
                        type: TEAMS.ajaxMethod,
                        async: !1,
                        url: "/production/createProduction",
                        dataType: "json",
                        data: {
                            production: JSON.stringify({
                                name: b,
                                manager: {
                                    id: TEAMS.currentUser.id
                                }
                            })
                        },
                        success: function(b) {
                            b && b.message && 0 != b.message.code || a.renderSelectItem(l, b.data, c, e)
                        }
                    })
                } else
                    b = $(this).data("production"),
                    a.renderSelectItem(l, b, c, e);
                a.triggerFillRelate(e)
            });
            b.on("click", "#" + l + " .js_deleteProduction", function() {
                var c = $(this).parents("#" + l)
                  , b = a.componentSetup.showfields;
                null == b || 0 == b.length ? $(this).parent().remove() : $(this).parent().parent().parent().remove();
                a.triggerFillRelate(c);
                c = a.check(c, "change");
                e(c)
            });
            "mobile" == window.systemInfo_form && (b.on("objsComfirm", "#" + l + " .production-seleted", function(e, c) {
                var b = $("#" + l + " .js_productionitem_container")
                  , d = a.componentSetup.isUnique;
                b.text("");
                b.parents("#field_" + a.componentSetup.fieldId).find(".form-error").text("");
                "true" != d && 1 != d || b.empty();
                if (0 < c.objs.length) {
                    var d = c.objs, f;
                    for (f in d) {
                        var k = d[f];
                        if (k) {
                            var g = $('\x3cspan id\x3d"' + k.id + '" class\x3d"j_production_detail j_component employee-item j_production_detail"\x3e\x3ca id\x3d"' + k.id + '" data-module\x3d"production" data-value\x3d"' + k.id + '" data-id\x3d"' + k.id + '" class\x3d"j_production entitybox-toggle"\x3e' + k.name + "\x3c/a\x3e\x3c/span\x3e");
                            b.append(g)
                        }
                    }
                } else
                    k = c.objs,
                    g = $('\x3cspan id\x3d"' + k.id + '" class\x3d"j_production_detail j_component employee-item j_production_detail"\x3e\x3ca id\x3d"' + k.id + '" data-module\x3d"production" data-value\x3d"' + k.id + '" data-id\x3d"' + k.id + '" class\x3d"j_production entitybox-toggle"\x3e' + k.name + "\x3c/a\x3e\x3c/span\x3e"),
                    0 == k.length ? b.html('\x3cdiv class\x3d"widget-link-holder"\x3e\x3ci class\x3d"icon-plus2"\x3e\x3c/i\x3e\u9009\u62e9\u4ea7\u54c1\x3c/div\x3e') : b.append(g);
                a.triggerFillRelate(b)
            }),
            b.on("deleteObj", "#" + l + " .production-seleted", function(e, c) {
                var b = $("#" + l + " .js_productionitem_container");
                b.find('span[id\x3d"' + c + '"]').remove();
                0 == b.find("span").length && b.html('\x3cdiv class\x3d"widget-link-holder"\x3e\x3ci class\x3d"icon-plus2"\x3e\x3c/i\x3e\u9009\u62e9\u4ea7\u54c1\x3c/div\x3e');
                a.triggerFillRelate(b)
            }))
        },
        autoSaveEvents: function(e) {
            var a = this
              , c = a.el || $(document)
              , b = a.componentSetup.fieldId + this.cid;
            c.on("click", "#" + b + " .js_deleteProduction", function() {
                a.saveComponentValue(c.find("#" + b), e)
            });
            if ("mobile" == window.systemInfo_form)
                c.on("objsComfirm", "#" + b + " .production-seleted", function(c, b) {
                    a.saveComponentValue($(this), e)
                });
            else
                c.on("click", "#" + b + " #searchList\x3ep", function() {
                    a.saveComponentValue($(this), e)
                }),
                c.on("entitySelected", "#" + b + " #searchproduction", function(c) {
                    a.saveComponentValue($(this), e)
                })
        },
        renderSelectItem: function(e, a, c, b) {
            if (!(0 < b.find(".js_productionitem_container").find(".j_production[id\x3d'" + a.id + "']").length))
                if (null == c || 0 == c.length) {
                    var d = '\x3cspan id\x3d"' + a.id + '" name\x3d"j_production_detail" class\x3d"j_production_detail j_component employee-item"\x3e\x3ca id\x3d"' + a.id + '" data-id\x3d"' + a.id + '" data-module\x3d"production" class\x3d"entitybox-toggle j_production" title\x3d"' + a.name + '"\x3e' + a.name + '\x3c/a\x3e\x3ca class\x3d"close js_deleteProduction" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e';
                    (e = $("#" + e + " .js_productionitem_container .j_production_detail")) && e.each(function(e) {
                        a.id == $(this).find(".j_production").attr("id") && $(this).remove()
                    });
                    b.find(".js_productionitem_container").append(d);
                    b.find(".js_productionitem_container").find(".j_production[id\x3d'" + a.id + "']").data("production", a)
                } else {
                    d = b.find(".j_production_detail_clone .j_production_detail").clone();
                    d.attr("id", a.id).attr("data-value", a.id).attr("data-id", a.id);
                    d.find(".j_production").attr("id", a.id).text(a.name).attr("data-original-title", a.name);
                    d.find(".j_production").data("production", a);
                    for (var f = 0; f < c.length; f++) {
                        var l = c[f]
                          , g = b.find(".j_production_detail_clone .j_field").clone();
                        g.attr("id", l);
                        g.find(".j_field_title").text(this.basefields[l]);
                        if ("manager" == l)
                            g.find(".j_field_value").prop("title", a[l] ? a[l].username : "").text(a[l] ? a[l].username : "");
                        else if ("price" == l || "unit" == l || "description" == l)
                            g.find(".j_field_value").prop("title", a[l] ? a[l] : "").text(a[l] ? a[l] : "");
                        else
                            continue;
                        d.find(".j_part .j_line").append(g)
                    }
                    var h = {};
                    if (a.formDataId && this.componentSetup.cusCustomFields) {
                        g = [];
                        for (c = 0; c < this.componentSetup.cusCustomFields.length; c++)
                            f = this.componentSetup.cusCustomFields[c],
                            g.push(f.substring(0, f.indexOf("_")));
                        c = {};
                        c.formDataId = a.formDataId;
                        c.module = "production";
                        c.fieldIds = g;
                        $.ajax({
                            contentType: "application/json",
                            type: TEAMS.ajaxMethod,
                            async: !1,
                            data: JSON.stringify(c),
                            dataType: "json",
                            url: "freeform/findAllFormDataFields.json",
                            success: function(a) {
                                if (a && a.formData && a.formData.dataDetails)
                                    for (var e = 0; e < a.formData.dataDetails.length; e++) {
                                        var c = a.formData.dataDetails[e]
                                          , b = c.content;
                                        !b && c.dataText && (b = c.dataText.content);
                                        if (!b && 0 < c.dataOptions.length) {
                                            for (var b = "", d = 0; d < c.dataOptions.length; d++)
                                                b += c.dataOptions[d].content + ",";
                                            b = b.substring(0, b.length - 1)
                                        }
                                        h[c.formField.id] = b
                                    }
                            }
                        })
                    }
                    if (this.componentSetup.cusCustomFields)
                        for (c = 0; c < this.componentSetup.cusCustomFields.length; c++)
                            f = this.componentSetup.cusCustomFields[c],
                            g = b.find(".j_production_detail_clone .j_field").clone(),
                            g.attr("id", f.substring(0, f.indexOf("_"))),
                            g.find(".j_field_title").text(f.substring(f.indexOf("_") + 1, f.length)),
                            g.find(".j_field_value").prop("title", h[f.substring(0, f.indexOf("_"))]).text(h[f.substring(0, f.indexOf("_"))]),
                            d.find(".j_part .j_line").append(g);
                    d.find(".j_title").append('\x3ca class\x3d"close js_deleteProduction" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e');
                    $("#" + e + " .js_productionitem_container").append(d)
                }
        },
        productionAhead: Backbone.View.extend({
            defaults: function() {
                this.remote = this.suggestion = "";
                this.entity = "production";
                this.tpl = h.get("productioncomponent")
            },
            initAhead: function(e, a, c, b, d) {
                this.defaults();
                this.fieldId = e;
                this.newSortColumn = a;
                this.selectColumn = c;
                this.orderContent = b;
                this.isAddForRelation = d;
                this.$continer = $("#" + this.fieldId);
                this._htmlEvents()
            },
            _htmlEvents: function() {
                var e = this
                  , a = e.$continer
                  , c = $("#" + e.fieldId + " #typeahead-production");
                c.off("focus.tt").on("focus.tt", function(a) {
                    e._search($(this))
                });
                c.off("click.tt").on("click.tt", function(a) {
                    a.stopPropagation()
                });
                c.off("keyup.tt").on("keyup.tt", function(b) {
                    b = b.which;
                    0 < $("body").find("#form-abposselect").length && (a = $("body").find("#form-abposselect").find(".field_js"));
                    13 == b ? (a.find("#production-typeahead-div p.active").trigger("click.tt"),
                    window.abposview && window.abposview.remove()) : 27 == b ? (c.trigger("focusout", "tt"),
                    window.abposview && window.abposview.remove()) : 38 == b ? (b = $("#production-typeahead-div p.active"),
                    1 > b.length ? a.find("#production-typeahead-div p").last().addClass("active") : (b.removeClass("active"),
                    (0 < b.prev().length ? b.prev() : a.find("#production-typeahead-div p").last()).addClass("active"))) : 40 == b ? (b = a.find("#production-typeahead-div p.active"),
                    1 > b.length ? a.find("#production-typeahead-div p").first().addClass("active") : (b.removeClass("active"),
                    (0 < b.next().length ? b.next() : a.find("#production-typeahead-div p").first()).addClass("active"))) : e._search($(this))
                });
                a.find("#production-typeahead-div").off("mouseenter.tt", "p").on("mouseenter.tt", "p", function() {
                    0 < $("body").find("#form-abposselect").length && (a = $("body").find("#form-abposselect").find(".field_js"));
                    $(this).addClass("active");
                    a.find("#production-typeahead-div p.active").removeClass("active")
                });
                a.off("click.tt", "#production-typeahead-div p").on("click.tt", "#production-typeahead-div p", function(a) {
                    c.trigger("focusout", "tt")
                })
            },
            _search: function(e) {
                var a = this
                  , c = a.$continer
                  , b = $.trim(e.val());
                b == e.attr("placeholder") && (b = "");
                c.find("#production-typeahead-div #searchList").html("");
                0 < $("body").find("#form-abposselect").length ? ($("body").find("#form-abposselect").find(".field_js").find("#production-typeahead-div .loading_small").show(),
                c.find("#production-typeahead-div .loading_small").hide()) : c.find("#production-typeahead-div .loading_small").show();
                window.abposview && window.abposview.remove();
                e = {};
                var c = "updateTime"
                  , d = "desc";
                a.orderContent && (c = a.orderContent.property,
                d = a.orderContent.direction);
                e.queryStr = JSON.stringify({
                    darw: 1,
                    pageNo: 1,
                    pageSize: 10,
                    orderWay: d,
                    orderBy: c,
                    conditions: [{
                        id: "name",
                        type: "string",
                        value: b
                    }],
                    filter: {
                        type: "all"
                    },
                    customConditions: []
                });
                e.employeeId = TEAMS.currentUser.id;
                $.ajax({
                    type: TEAMS.ajaxMethod,
                    url: "/production/getAllProductions",
                    dataType: "json",
                    data: e,
                    success: function(e) {
                        e && e.message && 0 != e.message.code || a.renderProductions(e.data, b)
                    }
                })
            },
            renderProductions: function(e, a) {
                var c = this.$continer;
                0 < $("body").find("#form-abposselect").length ? $("body").find("#form-abposselect").find(".field_js").find("#production-typeahead-div .loading_small").hide() : c.find("#production-typeahead-div .loading_small").hide();
                if (null != e && 0 < e.length)
                    for (var b = 0; b < e.length; b++) {
                        var d = e[b]
                          , f = d.name
                          , g = $(this.tpl).siblings("#production-clone").find(".j_production").clone();
                        g.text(f);
                        g.attr("title", f).attr("id", d.id);
                        g.data("production", d);
                        c.find("#production-typeahead-div #searchList").append(g).show()
                    }
                else {
                    if (null == a || "" == a)
                        return;
                    "false" != this.isAddForRelation && 0 != this.isAddForRelation && (g = $('\x3cp class\x3d"production creat-new"\x3e\x3ci class\x3d"icon-plus-thin"\x3e\x3c/i\x3e \u6dfb\u52a0\u4ea7\u54c1\uff1a' + a + "\x3c/p\x3e"),
                    g.attr("title", a),
                    c.find("#production-typeahead-div #searchList").find(".creat-new").remove(),
                    c.find("#production-typeahead-div #searchList").append(g))
                }
                c.find("#production-typeahead-div #searchList").show();
                window.abposview && window.abposview.remove();
                window.abposview = new l({
                    continer: c,
                    entity: this.entity
                });
                window.abposview.render()
            }
        }),
        check: function(e) {
            var a = $(e).find(".js_productionitem_container .j_production_detail").length
              , c = {};
            c.element = e;
            0 != a || "true" != this.componentSetup.required && 1 != this.componentSetup.required || (c.message = this.componentSetup.title + "\u4e0d\u80fd\u4e3a\u7a7a");
            return c
        },
        getValue: function(e, a) {
            var c = {
                formField: {
                    id: this.componentSetup.fieldId
                }
            }
              , b = e.find(".js_productionitem_container .j_production_detail");
            if (0 < b.length) {
                var d = [];
                b.each(function(a) {
                    var e = $(this).find(".j_production").attr("id")
                      , c = $(this).find(".j_production").text();
                    d[a] = {
                        optionId: e,
                        content: c,
                        type: "production"
                    }
                });
                c.dataOptions = d
            } else
                a || (c = null);
            return c
        },
        setValue: function(e, a) {
            e.find(".js_productionitem_container").empty();
            var c = this
              , b = this.componentSetup.showfields;
            if (null != a && null != a.dataOptions) {
                for (var d = [], f = [], l = 0; l < a.dataOptions.length; l++) {
                    var g = a.dataOptions[l]
                      , h = null == g.content ? "" : g.content
                      , g = g.optionId;
                    d.push(g);
                    f.push({
                        id: g,
                        name: h
                    })
                }
                if (TEAMS.currentUser && TEAMS.currentUser.id)
                    null == b || 0 == b.length ? c.renderProductions(f, e, b, a) : (l = {},
                    l.ids = d,
                    $.ajax({
                        contentType: "application/json",
                        type: TEAMS.ajaxMethod,
                        data: JSON.stringify(l),
                        dataType: "json",
                        async: !1,
                        url: "/form/queryProductionsByIds.json",
                        success: function(d) {
                            if (!d || !d.message || 0 == d.message.code) {
                                d = d.productions;
                                for (var l = [], g = 0; g < f.length; g++) {
                                    for (var h = f[g], r = !0, p = 0; p < d.length; p++) {
                                        var w = d[p];
                                        if (w.id == h.id) {
                                            l.push(w);
                                            r = !1;
                                            break
                                        }
                                    }
                                    r && l.push(h)
                                }
                                c.renderProductions(l, e, b, a)
                            }
                        }
                    }));
                else
                    for (l = 0; l < f.length; l++)
                        d = f[l],
                        "mobile" == window.systemInfo_form && (d = $('\x3cspan href\x3d"/mobile/crms/' + d.id + "?module\x3dkey_production\x26info\x3dview_ProductionView|id_" + d.id + '" id\x3d"' + d.id + '" class\x3d"router j_component employee-item j_production_detail"\x3e\x3ca class\x3d"j_production" id\x3d"' + d.id + '"\x3e' + d.name + "\x3c/a\x3e\x3c/span\x3e"),
                        e.find(".js_productionitem_container").append(d))
            }
        },
        renderProductions: function(e, a, c, b) {
            for (b = 0; b < e.length; b++) {
                var d = e[b];
                if ("mobile" == window.systemInfo_form)
                    var f = $('\x3cspan href\x3d"/mobile/crms/' + d.id + "?module\x3dkey_production\x26info\x3dview_ProductionView|id_" + d.id + '" id\x3d"' + d.id + '" class\x3d"router j_component employee-item j_production_detail"\x3e\x3ca class\x3d"j_production" id\x3d"' + d.id + '"\x3e' + d.name + "\x3c/a\x3e\x3c/span\x3e");
                else if (null == c || 0 == c.length)
                    f = "",
                    f = null != a.find(".js_form-production-add").get(0) ? '\x3cspan id\x3d"' + d.id + '" name\x3d"j_production_detail" class\x3d"j_production_detail j_component employee-item"\x3e\x3ca id\x3d"' + d.id + '" data-id\x3d"' + d.id + '" data-module\x3d"production" class\x3d"entitybox-toggle j_production" title\x3d"' + d.name + '"\x3e' + d.name + '\x3c/a\x3e\x3ca class\x3d"close js_deleteProduction" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e' : '\x3cspan id\x3d"' + d.id + '" name\x3d"j_production_detail" class\x3d"j_production_detail j_component employee-item"\x3e\x3ca id\x3d"' + d.id + '" data-id\x3d"' + d.id + '" data-module\x3d"production" class\x3d"entitybox-toggle j_production" title\x3d"' + d.name + '"\x3e' + d.name + "\x3c/a\x3e\x3c/span\x3e";
                else {
                    f = a.find(".j_production_detail_clone .j_production_detail").clone();
                    f.attr("id", d.id).attr("data-value", d.id).attr("data-id", d.id);
                    f.find(".j_production").attr("id", d.id).text(d.name).attr("data-original-title", d.name);
                    for (var l = 0; l < c.length; l++) {
                        var g = c[l]
                          , h = a.find(".j_production_detail_clone .j_field").clone();
                        h.attr("id", g);
                        h.find(".j_field_title").text(this.basefields[g]);
                        if ("manager" == g)
                            h.find(".j_field_value").prop("title", d[g] ? d[g].username : "").text(d[g] ? d[g].username : "");
                        else if ("price" == g || "unit" == g || "description" == g)
                            h.find(".j_field_value").prop("title", d[g] ? d[g] : "").text(d[g] ? d[g] : "");
                        else
                            continue;
                        f.find(".j_part .j_line").append(h)
                    }
                    var m = {};
                    if (d.formDataId && this.componentSetup.cusCustomFields) {
                        h = [];
                        for (l = 0; l < this.componentSetup.cusCustomFields.length; l++)
                            g = this.componentSetup.cusCustomFields[l],
                            h.push(g.substring(0, g.indexOf("_")));
                        l = {};
                        l.formDataId = d.formDataId;
                        l.module = "production";
                        l.fieldIds = h;
                        $.ajax({
                            contentType: "application/json",
                            type: TEAMS.ajaxMethod,
                            async: !1,
                            data: JSON.stringify(l),
                            dataType: "json",
                            url: "freeform/findAllFormDataFields.json",
                            success: function(a) {
                                if (a && a.formData && a.formData.dataDetails)
                                    for (var e = 0; e < a.formData.dataDetails.length; e++) {
                                        var c = a.formData.dataDetails[e]
                                          , b = c.content;
                                        !b && c.dataText && (b = c.dataText.content);
                                        if (!b && 0 < c.dataOptions.length) {
                                            for (var b = "", d = 0; d < c.dataOptions.length; d++)
                                                b += c.dataOptions[d].content + ",";
                                            b = b.substring(0, b.length - 1)
                                        }
                                        m[c.formField.id] = b
                                    }
                            }
                        })
                    }
                    if (this.componentSetup.cusCustomFields)
                        for (d = 0; d < this.componentSetup.cusCustomFields.length; d++)
                            l = this.componentSetup.cusCustomFields[d],
                            h = a.find(".j_production_detail_clone .j_field").clone(),
                            h.attr("id", l.substring(0, l.indexOf("_"))),
                            h.find(".j_field_title").text(l.substring(l.indexOf("_") + 1, l.length)),
                            h.find(".j_field_value").prop("title", m[l.substring(0, l.indexOf("_"))]).text(m[l.substring(0, l.indexOf("_"))]),
                            f.find(".j_part .j_line").append(h);
                    null != a.find(".js_form-production-add").get(0) && f.find(".j_title").append('\x3ca class\x3d"close js_deleteProduction" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e')
                }
                a.find(".js_productionitem_container").append(f)
            }
        },
        empty: function(e) {
            e.find(".js_productionitem_container").html("")
        },
        readOnly: function(e, a) {
            var c = this.componentSetup.fieldId + this.cid
              , b = e.find('div[id\x3d"' + c + '"] span[name\x3d"js_form-production-add"]')
              , d = e.find('div[id\x3d"' + c + '"] .js_productionitem_container .j_production_detail')
              , f = e.find('div[id\x3d"' + c + '"] .js_deleteProduction');
            a ? (b.remove(),
            f.remove()) : b && 0 != b.length && null != b || (b = $(this.tpl).siblings("#preview-form").find('span[name\x3d"js_form-production-add"]'),
            e.find('div[id\x3d"' + c + '"]').find(".js_productionitem_container").after(b),
            d.find(".j_title").append('\x3ca class\x3d"close js_deleteProduction" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e'))
        }
    });
    u.exports = window.ProductionComponent
});

define("form/component/contractlist", ["form/tplutil", "form/component/formfilter"], function(n, y, u) {
    var m = n("form/tplutil")
      , h = n("form/component/formfilter");
    n = Backbone.View.extend({
        initialize: function() {},
        render: function(g, f) {
            "pc" == g ? this.initPC.init(f) : this.initMb.init(f)
        },
        initPC: {
            init: function(g) {
                this.el = "#contract_list";
                this.targetEl = g.targetEl;
                this.keyword = g.keyword;
                this.isUnique = g.isUnique;
                this.seletedList = g.seletedList;
                this.selectColumn = g.selectColumn;
                this.order = g.order;
                this.isAddForRelation = g.isAddForRelation;
                this.fileds = [{
                    title: "\u521b\u5efa\u65f6\u95f4",
                    position: "left"
                }, {
                    title: "\u5408\u540c\u540d\u79f0",
                    position: "left"
                }];
                this.tpl = m.get("contractlist");
                $("body").append($(this.tpl));
                this.render();
                this.delegateEvents()
            },
            delegateEvents: function() {
                var g = this
                  , f = $(g.el);
                f.off(".ContractList");
                f.on("keyup.ContractList", ".j_search-input", function(d) {
                    13 === d.keyCode && f.find(".j_search-btn").trigger("click")
                });
                f.on("click.ContractList", ".j_search-btn", function() {
                    $(this).hasClass("locked") || ($(this).addClass("locked"),
                    g.querycontract(1))
                });
                f.on("click.ContractList", ".j_btn-cancel", function() {
                    g.close()
                });
                f.on("click.ContractList", ".j_closelist", function() {
                    g.close()
                });
                f.on("click.ContractList", ".j_btn-ok", function() {
                    for (var d = [], b = f.find(".j_opt .j_select .j_select_data"), c = 0; c < b.length; c++) {
                        var l = $(b[c]).data("contract");
                        d.push(l)
                    }
                    $(g.targetEl).trigger("entitySelected", d);
                    g.close()
                });
                f.on("click.ContractList", "tbody tr", function() {
                    var d = $(this)
                      , b = $(this).data("contract")
                      , c = $(this).attr("id")
                      , l = $(this).find(".j_contractName").text();
                    d.hasClass("active") ? ($(this).find('input[name\x3d"contractselect"]').prop("checked", !1),
                    $(this).removeClass("active"),
                    $(this).find('input[name\x3d"contractselect"]').css("display", ""),
                    f.find(".j_opt .j_select").find("#" + c).remove()) : ($(this).find('input[name\x3d"contractselect"]').prop("checked", !0),
                    $(this).addClass("active"),
                    $(this).find('input[name\x3d"contractselect"]').css("display", "inline-block"),
                    0 == f.find(".j_opt .j_select").find("#" + c).length && (f.find(".j_opt .j_select").append('\x3ca class\x3d"j_select_data" id\x3d"' + c + '"\x3e' + l + "\x3c/a\x3e"),
                    f.find(".j_opt .j_select").find("#" + c).data("contract", b)));
                    if (1 == g.isUnique || "true" == g.isUnique)
                        $(g.targetEl).trigger("entitySelected", b),
                        g.close()
                });
                f.on("click.ContractList", ".page-first", function() {
                    $(this).hasClass("disabled") || g.querycontract(1)
                });
                f.on("click.ContractList", ".page-pre:not(.disabled)", function() {
                    if (!$(this).hasClass("disabled")) {
                        var d = $(g.el).find(".pagination").data("page");
                        g.querycontract(d.pageNo - 1)
                    }
                });
                f.on("click.ContractList", ".page-next:not(.disabled)", function() {
                    if (!$(this).hasClass("disabled")) {
                        var d = $(g.el).find(".pagination").data("page");
                        g.querycontract(d.pageNo + 1)
                    }
                });
                f.on("click.ContractList", ".pagination .page-last", function() {
                    if (!$(this).hasClass("disabled")) {
                        var d = $(g.el).find(".pagination").data("page");
                        g.querycontract(d.totalPages)
                    }
                });
                f.on("hidden.bs.modal.ContractList", function() {
                    g.remove()
                });
                f.off("mouseenter.ContractList", "#rel-filter").on("mouseenter.ContractList", "#rel-filter", function(d) {
                    $(this).addClass("open");
                    var b = $(this).attr("data-toggle");
                    g.reldropdownFilter || (g.reldropdownFilter = new h({
                        el: b,
                        module: "contract",
                        targetObj: $(this),
                        userId: TEAMS.currentUser.id,
                        scroll: !0,
                        scrollheight: 395
                    }),
                    g.reldropdownFilter.render(d));
                    d = setTimeout(function() {
                        $(b).parents(".dropdown-filter").slideDown("fast")
                    }, 300);
                    $(this).data("showTimer", d)
                }).off("mouseleave.ContractList", "#rel-filter").on("mouseleave.ContractList", "#rel-filter", function(d) {
                    if (!$(d.toElement).hasClass("datetimepicker")) {
                        $(this).removeClass("open");
                        d = $(this).attr("data-toggle");
                        var b = $(this).data("showTimer");
                        b && clearTimeout(b);
                        $(this).removeData("showTimer");
                        $(d).parents(".dropdown-filter").slideUp(100)
                    }
                }).off("filter.ContractList", "#rel-filter").on("filter.ContractList", "#rel-filter", function(d) {
                    g.loadDataType = null;
                    g.querycontract(1);
                    $(this).removeClass("open")
                })
            },
            render: function() {
                var g = this;
                formPlugin.destroyLayout(".eui-scroll.statbody");
                formPlugin.layout(".eui-scroll.statbody", {
                    onTotalScroll: function() {
                        var f = parseInt(g.pageNo) + 1;
                        f && !$(".eui-scroll.statbody").hasClass("lock") && ($(".eui-scroll.statbody").addClass("lock"),
                        g.querycontract(f, function(d) {
                            $(".eui-scroll.statbody").removeClass("lock")
                        }))
                    }
                }, [{
                    axis: "yx",
                    gotoTopButton: !0,
                    scrollInertia: 394
                }]);
                $(g.el).find(".j_contract.contract").data("targetEl", g.targetEl);
                g.renderSelect(g.seletedList);
                g.querycontract(1);
                0 < $("body").find(".form-preview-wrapper").length && $("#contract_list").find("#contract-create-fast").remove();
                0 != g.isAddForRelation && "false" != g.isAddForRelation || $("#contract_list").find("#contract-create-fast").remove();
                $(g.el).modal()
            },
            renderSelect: function(g) {
                for (var f = $(this.el), d = 0; d < g.length; d++) {
                    var b = g[d];
                    0 == f.find(".j_opt .j_select").find("#" + b.id).length && (f.find(".j_opt .j_select").append('\x3ca class\x3d"j_select_data" id\x3d"' + b.id + '"\x3e' + b.name + "\x3c/a\x3e"),
                    f.find(".j_opt .j_select").find("#" + b.id).data("contract", b.contract))
                }
            },
            querycontract: function(g) {
                var f = this
                  , d = $(f.el).find(".j_search-btn")
                  , b = $(f.el)
                  , c = $.trim(b.find(".j_search-input").val())
                  , b = b.find(".j_search-input").attr("placeholder");
                if (c != b) {
                    var b = void 0 == $("#rel-filter").data("data-filter") ? "" : $("#rel-filter").data("data-filter")
                      , l = '"type":"all"';
                    b && "" != b && (l += "," + b);
                    filteStr = "{" + l + "}";
                    filteStr = jQuery.parseJSON(filteStr);
                    b = "updateTime";
                    l = "desc";
                    f.order && (b = f.order.property,
                    l = f.order.direction);
                    c = {
                        darw: 1,
                        pageNo: g,
                        pageSize: 20,
                        orderWay: l,
                        orderBy: b,
                        conditions: [{
                            id: "name",
                            type: "string",
                            value: c
                        }],
                        filter: filteStr,
                        customConditions: []
                    };
                    1 == g && $(f.el).find("#stat_table tbody").empty();
                    $(f.el).find("#more_data").hide();
                    $.ajax({
                        type: TEAMS.ajaxMethod,
                        url: "/contract/datatable",
                        dataType: "json",
                        data: {
                            queryStr: JSON.stringify(c),
                            employeeId: TEAMS.currentUser.id
                        },
                        success: function(e) {
                            if (!e.message || !e.message) {
                                var a = {};
                                g = parseInt(g);
                                a.result = e.data;
                                a.pageNo = g;
                                a.pageSize = 20;
                                e = e.recordsTotal;
                                a.totalCount = e;
                                a.hasPre = 1 <= g - 1;
                                var c = parseInt(e / 20);
                                0 < e % 20 && c++;
                                a.totalPages = c;
                                a.hasNext = g + 1 <= c;
                                f.renderPage(a);
                                f.rendercontract(a);
                                f.pageNo = a.pageNo;
                                d.removeClass("locked")
                            }
                        }
                    })
                }
            },
            rendercontract: function(g) {
                var f = $(this.el);
                if (1 == g.pageNo) {
                    if (null == g.result || 1 > g.result.length) {
                        $(this.el).find(".j_contract_empty").removeClass("hide");
                        return
                    }
                    $(this.el).find(".j_contract_empty").addClass("hide")
                }
                var d = this.selectColumn;
                null == d && (d = []);
                $(this.el).find("#list-loading").hide();
                $(this.el).find("#statbody").show();
                if (0 == f.find("#stat_table thead tr th").length) {
                    for (var b = f.find("#stat_table thead tr"), c = 0; c < d.length; c++) {
                        var l = d[c]
                          , e = l.substring(0, l.indexOf("_"))
                          , a = l.substring(l.indexOf("_") + 1);
                        b.append("\x3cth title\x3d'" + a + "'\x3e\x3cdiv\x3e" + a + "\x3c/div\x3e\x3c/th\x3e")
                    }
                    for (c = 0; c < this.fileds.length; c++)
                        a = this.fileds[c],
                        "left" === a.position && b.prepend("\x3cth title\x3d'" + a.title + "'\x3e\x3cdiv\x3e" + a.title + "\x3c/div\x3e\x3c/th\x3e");
                    b.prepend("\x3cth\x3e\x3c/th\x3e")
                }
                b = g.result;
                if (null != b && 0 != b.length)
                    for (c = 0; c < b.length; c++) {
                        var a = b[c]
                          , k = a.id
                          , e = a.name
                          , h = Date.create(a.createTime).format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}");
                        if (!(0 < f.find("#stat_table tr").find("#" + k).length)) {
                            var r = $("\x3ctr style\x3d'cursor:pointer;' id\x3d" + k + "\x3e\x3c/tr\x3e");
                            r.data("contract", a);
                            r.append('\x3ctd\x3e\x3cdiv class\x3d"sn"\x3e' + ((g.pageNo - 1) * g.pageSize + c + 1) + '\x3c/div\x3e\x3cdiv class\x3d"checkbox-div"\x3e\x3cinput name\x3d"contractselect" type\x3d"checkbox"\x3e\x3c/input\x3e\x3c/div\x3e\x3c/td\x3e');
                            r.append("\x3ctd class\x3d'j_contractName noSub_name_" + k + "'\x3e" + e + "\x3c/td\x3e");
                            r.append("\x3ctd class\x3d'j_createTime noSub_name_" + k + "'\x3e" + h + "\x3c/td\x3e");
                            for (h = 0; h < d.length; h++)
                                l = d[h],
                                e = l.substring(0, l.indexOf("_")),
                                l.substring(l.indexOf("_") + 1),
                                "manager" == e ? (l = "",
                                a[e] && a[e] && (l = a[e].username ? a[e].username : "")) : "number" == e || "selfSigner" == e || "description" == e || "stage" == e ? l = a[e] ? a[e] : "" : "contractcontent" == e ? l = a.content ? a.content : "" : "startTime" == e || "endTime" == e || "signTime" == e ? (l = a[e] ? a[e] : "",
                                "" != l && null != l && (l = Date.create(l).format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}"))) : l = "type" == e || "payMethod" == e ? a[e] ? a[e].name : "" : "contractStatus" == e ? a.status ? a.status.name : "" : "totalMoney" == e || "receiveMoney" == e || "invoiceMoney" == e ? null != a[e] ? a[e] : "" : "customerSigner" == e ? a[e] ? a[e] : "" : "",
                                r.append("\x3ctd class\x3d'j_column' id\x3d'" + e + "' title\x3d'" + l + "'\x3e" + l + "\x3c/td\x3e");
                            f.find("#stat_table tbody").append(r);
                            0 < f.find(".j_opt .j_select").find("#" + k).length && (f.find("#stat_table tbody").find('tr[id\x3d"' + k + '"]').find('input[name\x3d"contractselect"]').prop("checked", !0).css("display", "inline-block"),
                            f.find("#stat_table tbody").find('tr[id\x3d"' + k + '"]').addClass("active"))
                        }
                    }
            },
            renderPage: function(g) {
                g && ($(this.el).find(".pagination").data("page", g),
                $(this.el).find(".active a").html("\u7b2c" + g.pageNo + "/" + g.totalPages + "\u9875"),
                g.hasNext ? ($(this.el).find(".page-next").removeClass("disabled"),
                $(this.el).find(".page-last").removeClass("disabled")) : ($(this.el).find(".page-next").addClass("disabled"),
                $(this.el).find(".page-last").addClass("disabled")),
                g.hasPre ? ($(this.el).find(".page-pre").removeClass("disabled"),
                $(this.el).find(".page-first").removeClass("disabled")) : ($(this.el).find(".page-pre").addClass("disabled"),
                $(this.el).find(".page-first").addClass("disabled")),
                $(this.el).find(".j_page").find("ul").hide())
            },
            talbeScrollbar: function() {
                $(this.el).find(".j_contractScrX").mCustomScrollbar({
                    axis: "x",
                    theme: "darkblue",
                    scrollButtons: {
                        enable: !0
                    },
                    mouseWheel: "false",
                    advanced: {
                        autoExpandHorizontalScroll: !0
                    }
                })
            },
            close: function() {
                $(this.el).modal("hide")
            },
            remove: function() {
                var g = $(this.el);
                g.modal("hide");
                g.off(".contractList");
                g.remove();
                this.reldropdownFilter = null
            }
        }
    });
    u.exports = n
});

define("form/component/customerlist", ["form/tplutil", "form/component/formfilter"], function(n, y, u) {
    var m = n("form/tplutil")
      , h = n("form/component/formfilter");
    n = Backbone.View.extend({
        initialize: function() {},
        render: function(g, f) {
            "pc" == g ? this.initPC.init(f) : this.initMb.init(f)
        },
        initPC: {
            init: function(g) {
                this.el = "#customer_list";
                this.targetEl = g.targetEl;
                this.keyword = g.keyword;
                this.isUnique = g.isUnique;
                this.seletedList = g.seletedList;
                this.selectColumn = g.selectColumn;
                this.order = g.order;
                this.fileds = [{
                    title: "\u521b\u5efa\u65f6\u95f4",
                    position: "left"
                }, {
                    title: "\u5ba2\u6237\u540d\u79f0",
                    position: "left"
                }];
                this.tpl = m.get("customerlist");
                this.isAddForRelation = g.isAddForRelation;
                $("body").append($(this.tpl));
                this.render();
                this.delegateEvents()
            },
            delegateEvents: function() {
                var g = this
                  , f = $(g.el);
                f.off(".CustomerList");
                f.on("keyup.CustomerList", ".j_search-input", function(d) {
                    13 === d.keyCode && f.find(".j_search-btn").trigger("click")
                });
                f.on("click.CustomerList", ".j_search-btn", function() {
                    $(this).hasClass("locked") || ($(this).addClass("locked"),
                    g.queryCustomer(1))
                });
                f.on("click.CustomerList", ".j_btn-cancel", function() {
                    g.close()
                });
                f.on("click.CustomerList", ".j_closelist", function() {
                    g.close()
                });
                f.on("click.CustomerList", ".j_btn-ok", function() {
                    for (var d = [], b = f.find(".j_opt .j_select .j_select_data"), c = 0; c < b.length; c++) {
                        var l = $(b[c]).data("customer");
                        d.push(l)
                    }
                    $(g.targetEl).trigger("entitySelected", d);
                    g.close()
                });
                f.on("click.CustomerList", "tbody tr", function() {
                    var d = $(this)
                      , b = $(this).data("customer")
                      , c = $(this).attr("id")
                      , l = $(this).find(".j_customerName").text();
                    d.hasClass("active") ? ($(this).find('input[name\x3d"customerselect"]').prop("checked", !1),
                    $(this).removeClass("active"),
                    $(this).find('input[name\x3d"customerselect"]').css("display", ""),
                    f.find(".j_opt .j_select").find("#" + c).remove()) : ($(this).find('input[name\x3d"customerselect"]').prop("checked", !0),
                    $(this).addClass("active"),
                    $(this).find('input[name\x3d"customerselect"]').css("display", "inline-block"),
                    0 == f.find(".j_opt .j_select").find("#" + c).length && (f.find(".j_opt .j_select").append('\x3ca class\x3d"j_select_data" id\x3d"' + c + '"\x3e' + l + "\x3c/a\x3e"),
                    f.find(".j_opt .j_select").find("#" + c).data("customer", b)));
                    if (1 == g.isUnique || "true" == g.isUnique)
                        $(g.targetEl).trigger("entitySelected", b),
                        g.close()
                });
                f.on("click.CustomerList", ".page-first", function() {
                    $(this).hasClass("disabled") || g.queryCustomer(1)
                });
                f.on("click.CustomerList", ".page-pre:not(.disabled)", function() {
                    if (!$(this).hasClass("disabled")) {
                        var d = $(g.el).find(".pagination").data("page");
                        g.queryCustomer(d.pageNo - 1)
                    }
                });
                f.on("click.CustomerList", ".page-next:not(.disabled)", function() {
                    if (!$(this).hasClass("disabled")) {
                        var d = $(g.el).find(".pagination").data("page");
                        g.queryCustomer(d.pageNo + 1)
                    }
                });
                f.on("click.CustomerList", ".pagination .page-last", function() {
                    if (!$(this).hasClass("disabled")) {
                        var d = $(g.el).find(".pagination").data("page");
                        g.queryCustomer(d.totalPages)
                    }
                });
                f.on("hidden.bs.modal.CustomerList", function() {
                    g.remove()
                });
                f.off("mouseenter.CustomerList", "#rel-filter").on("mouseenter.CustomerList", "#rel-filter", function(d) {
                    $(this).addClass("open");
                    var b = $(this).attr("data-toggle");
                    g.reldropdownFilter || (g.reldropdownFilter = new h({
                        el: b,
                        module: "customer",
                        targetObj: $(this),
                        userId: TEAMS.currentUser.id,
                        scroll: !0,
                        scrollheight: 395
                    }),
                    g.reldropdownFilter.render(d));
                    d = setTimeout(function() {
                        $(b).parents(".dropdown-filter").slideDown("fast")
                    }, 300);
                    $(this).data("showTimer", d)
                }).off("mouseleave.CustomerList", "#rel-filter").on("mouseleave.CustomerList", "#rel-filter", function(d) {
                    if (!$(d.toElement).hasClass("datetimepicker")) {
                        $(this).removeClass("open");
                        d = $(this).attr("data-toggle");
                        var b = $(this).data("showTimer");
                        b && clearTimeout(b);
                        $(this).removeData("showTimer");
                        $(d).parents(".dropdown-filter").slideUp(100)
                    }
                }).off("filter.CustomerList", "#rel-filter").on("filter.CustomerList", "#rel-filter", function(d) {
                    g.loadDataType = null;
                    g.queryCustomer(1);
                    $(this).removeClass("open")
                })
            },
            render: function() {
                var g = this;
                formPlugin.destroyLayout(".eui-scroll.statbody");
                formPlugin.layout(".eui-scroll.statbody", {
                    onTotalScroll: function() {
                        var f = parseInt(g.pageNo) + 1;
                        f && !$(".eui-scroll.statbody").hasClass("lock") && ($(".eui-scroll.statbody").addClass("lock"),
                        g.queryCustomer(f, function(d) {
                            $(".eui-scroll.statbody").removeClass("lock")
                        }))
                    }
                }, [{
                    axis: "yx",
                    gotoTopButton: !0,
                    scrollInertia: 394
                }]);
                $(g.el).find(".j_customer.customer").data("targetEl", g.targetEl);
                g.renderSelect(g.seletedList);
                g.queryCustomer(1);
                0 < $("body").find(".form-preview-wrapper").length && $("#customer_list").find("#customer-create-fast").remove();
                "false" != g.isAddForRelation && 0 != g.isAddForRelation || $("#customer_list").find("#customer-create-fast").remove();
                $(g.el).modal()
            },
            renderSelect: function(g) {
                for (var f = $(this.el), d = 0; d < g.length; d++) {
                    var b = g[d];
                    0 == f.find(".j_opt .j_select").find("#" + b.id).length && (f.find(".j_opt .j_select").append('\x3ca class\x3d"j_select_data" id\x3d"' + b.id + '"\x3e' + b.name + "\x3c/a\x3e"),
                    f.find(".j_opt .j_select").find("#" + b.id).data("customer", b.customer))
                }
            },
            queryCustomer: function(g, f) {
                var d = this
                  , b = $(d.el).find(".j_search-btn")
                  , c = $(d.el)
                  , l = $.trim(c.find(".j_search-input").val())
                  , c = c.find(".j_search-input").attr("placeholder");
                if (l != c) {
                    var c = void 0 == $("#rel-filter").data("data-filter") ? "" : $("#rel-filter").data("data-filter")
                      , e = '"type":"noShare"';
                    c && "" != c && (e += "," + c);
                    filteStr = "{" + e + "}";
                    filteStr = jQuery.parseJSON(filteStr);
                    c = "";
                    e = "desc";
                    d.order && (c = d.order.property,
                    e = d.order.direction);
                    l = {
                        pageNo: g,
                        pageSize: 20,
                        orderBy: c,
                        orderWay: e,
                        conditions: [{
                            id: "name",
                            type: "string",
                            value: l
                        }],
                        filter: filteStr
                    };
                    1 == g && $(d.el).find("#stat_table tbody").empty();
                    $(d.el).find("#more_data").hide();
                    $.ajax({
                        type: TEAMS.ajaxMethod,
                        url: "/customer/getCustomers",
                        dataType: "json",
                        data: {
                            queryStr: JSON.stringify(l),
                            employeeId: TEAMS.currentUser.id
                        },
                        success: function(a) {
                            if (!a.message || !a.message) {
                                var e = {};
                                g = parseInt(g);
                                e.result = a.data;
                                e.pageNo = g;
                                e.pageSize = 20;
                                a = a.recordsTotal;
                                e.totalCount = a;
                                e.hasPre = 1 <= g - 1;
                                var c = parseInt(a / 20);
                                0 < a % 20 && c++;
                                e.totalPages = c;
                                e.hasNext = g + 1 <= c;
                                d.renderCustomer(e, f);
                                d.pageNo = e.pageNo;
                                b.removeClass("locked")
                            }
                        }
                    })
                }
            },
            renderCustomer: function(g, f) {
                var d = $(this.el);
                if (1 == g.pageNo) {
                    if (null == g.result || 1 > g.result.length) {
                        $(this.el).find(".j_customer_empty").removeClass("hide");
                        return
                    }
                    $(this.el).find(".j_customer_empty").addClass("hide")
                }
                var b = this.selectColumn;
                null == b && (b = []);
                $(this.el).find("#list-loading").hide();
                $(this.el).find("#statbody").show();
                if (0 == d.find("#stat_table thead tr th").length) {
                    for (var c = d.find("#stat_table thead tr"), l = 0; l < b.length; l++) {
                        var e = b[l]
                          , a = e.substring(0, e.indexOf("_"))
                          , k = e.substring(e.indexOf("_") + 1);
                        c.append("\x3cth title\x3d'" + k + "'\x3e\x3cdiv\x3e" + k + "\x3c/div\x3e\x3c/th\x3e")
                    }
                    for (l = 0; l < this.fileds.length; l++)
                        k = this.fileds[l],
                        "left" === k.position && c.prepend("\x3cth title\x3d'" + k.title + "'\x3e\x3cdiv\x3e" + k.title + "\x3c/div\x3e\x3c/th\x3e");
                    c.prepend("\x3cth\x3e\x3c/th\x3e")
                }
                c = g.result;
                for (l = 0; l < c.length; l++) {
                    var k = c[l]
                      , h = k.id
                      , a = k.name
                      , e = Date.create(k.createTime).format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}");
                    if (!(0 < d.find("#stat_table tr").find("#" + h).length)) {
                        var r = $("\x3ctr style\x3d'cursor:pointer;' id\x3d" + h + "\x3e\x3c/tr\x3e");
                        r.data("customer", k);
                        r.append('\x3ctd\x3e\x3cdiv class\x3d"sn"\x3e' + ((g.pageNo - 1) * g.pageSize + l + 1) + '\x3c/div\x3e\x3cdiv class\x3d"checkbox-div"\x3e\x3cinput name\x3d"customerselect" type\x3d"checkbox"\x3e\x3c/input\x3e\x3c/div\x3e\x3c/td\x3e');
                        r.append("\x3ctd class\x3d'j_customerName noSub_name_" + h + "'\x3e" + a + "\x3c/td\x3e");
                        r.append("\x3ctd class\x3d'j_createTime noSub_name_" + h + "'\x3e" + e + "\x3c/td\x3e");
                        for (var q = 0; q < b.length; q++)
                            e = b[q],
                            a = e.substring(0, e.indexOf("_")),
                            e.substring(e.indexOf("_") + 1),
                            e = "manager" == a ? k[a] ? k[a].username : "" : "status" == a || "type" == a || "industry" == a || "region" == a ? k[a] ? k[a].name : "" : k[a] ? k[a] : "",
                            r.append("\x3ctd class\x3d'j_column' id\x3d'" + a + "' title\x3d'" + e + "'\x3e" + e + "\x3c/td\x3e");
                        d.find("#stat_table tbody").append(r);
                        0 < d.find(".j_opt .j_select").find("#" + h).length && (d.find("#stat_table tbody").find('tr[id\x3d"' + h + '"]').find('input[name\x3d"customerselect"]').prop("checked", !0).css("display", "inline-block"),
                        d.find("#stat_table tbody").find('tr[id\x3d"' + h + '"]').addClass("active"))
                    }
                }
                g.result.length && g.result.length == g.pageSize && f && f()
            },
            renderPage: function(g) {
                if (g) {
                    var f = g.result;
                    $(this.el).find(".pagination").data("page", g);
                    $(this.el).find(".active a").html("\u7b2c" + g.pageNo + "/" + g.totalPages + "\u9875");
                    g.hasNext ? ($(this.el).find(".page-next").removeClass("disabled"),
                    $(this.el).find(".page-last").removeClass("disabled")) : ($(this.el).find(".page-next").addClass("disabled"),
                    $(this.el).find(".page-last").addClass("disabled"));
                    g.hasPre ? ($(this.el).find(".page-pre").removeClass("disabled"),
                    $(this.el).find(".page-first").removeClass("disabled")) : ($(this.el).find(".page-pre").addClass("disabled"),
                    $(this.el).find(".page-first").addClass("disabled"));
                    1 == g.pageNo && (null == f || 1 > f.length ? ($(this.el).find(".j_customer_empty").removeClass("hide"),
                    $(this.el).find(".j_page").hide()) : ($(this.el).find(".j_customer_empty").addClass("hide"),
                    $(this.el).find(".j_page").show()))
                }
            },
            close: function() {
                $(this.el).modal("hide")
            },
            remove: function() {
                var g = $(this.el);
                g.modal("hide");
                g.off(".CustomerList");
                g.remove();
                this.reldropdownFilter = null
            }
        }
    });
    u.exports = n
});
define("form/component/employee", ["form/editablecomponent", "form/tplutil", "form/component/userselecter", "form/abposview"], function(n, y, u) {
    var m = n("form/editablecomponent")
      , h = n("form/tplutil")
      , g = n("form/component/userselecter")
      , f = n("form/abposview");
    window.Employee = m.extend({
        initialize: function(d) {
            m.prototype.initialize.call(this, d);
            var b = {
                componentKey: "Employee",
                title: "\u6dfb\u52a0\u4eba\u5458",
                isUnique: !1,
                isCurrentEmployee: !1,
                isReadonly: !1
            };
            null != d && (b.title = d.title,
            b.isUnique = d.isUnique,
            b.isCurrentEmployee = d.isCurrentEmployee,
            b.isReadonly = d.isReadonly,
            b.isReadOnly = d.isReadonly);
            this.componentSetup = $.extend(this.componentSetup, b);
            this.tpl = h.get("employee", {
                isMobileForm: this.isMobileForm
            })
        },
        setIsUnique: function(d) {
            this.componentSetup.isUnique = d
        },
        setIsCurrentEmployee: function(d) {
            this.componentSetup.isCurrentEmployee = d
        },
        setIsReadonly: function(d) {
            this.componentSetup.isReadonly = d;
            this.componentSetup.isReadOnly = d
        },
        render: function(d) {
            var b = $(this.tpl).siblings("#form-employee");
            m.prototype.render.call(this, d, b);
            d.html(b.html())
        },
        renderEditPreview: function(d) {
            var b = $(this.tpl).siblings("#form-employee");
            m.prototype.renderEditPreview.call(this, d, b);
            d.append(b)
        },
        renderEditor: function() {
            var d = $(this.tpl).siblings("#editor-employee");
            m.prototype.renderEditor.call(this, d);
            var b = !1
              , c = !1
              , f = !1;
            if ("true" == this.componentSetup.isUnique || 1 == this.componentSetup.isUnique)
                b = !0;
            if ("true" == this.componentSetup.isCurrentEmployee || 1 == this.componentSetup.isCurrentEmployee)
                c = !0;
            if ("true" == this.componentSetup.isReadonly || 1 == this.componentSetup.isReadonly)
                f = !0;
            d.find("#isUnique").attr("checked", b);
            d.find("#isCurrentEmployee").attr("checked", c);
            d.find("#isReadonly").attr("checked", f);
            $("#editor-component").html(d.html())
        },
        renderPreview: function(d, b, c) {
            var f = $(this.tpl)
              , e = null;
            (e = $("body").find("#formTenantKey").val()) ? e = e.toUpperCase() : null != TEAMS.currentTenant && (e = TEAMS.currentTenant.tenantKey.toUpperCase());
            $("body").find("#scanReport").val() || null != TEAMS.currentUser && TEAMS.currentTenant.tenantKey.toUpperCase() == e ? e = "mobile" != window.systemInfo_form ? f.siblings("#preview-employee") : f.siblings("#mobile-preview") : (e = f.siblings("#nouser-preview"),
            e.find(".field_message_js").attr("cid", this.cid));
            e.find(".widget-title .widget-title_js").text(this.componentSetup.title);
            "true" != this.componentSetup.isHideTitle && 1 != this.componentSetup.isHideTitle || e.addClass("field-notitle").find(".widget-title .widget-title_js").addClass("hide");
            "true" != this.componentSetup.required && 1 != this.componentSetup.required || e.find(".widget-title .widget-required_js").text(" *");
            "" != this.componentSetup.describe && (e.find(".field-description").text(this.componentSetup.describe),
            e.find(".field-description").show());
            e.find(".check_js").attr("id", this.componentSetup.fieldId + this.cid).attr("name", this.componentSetup.fieldId);
            e.attr("id", "field_" + (this.componentSetup.fieldId || this.componentSetup.tempId));
            e.find(".check_js").data("componentData", this);
            e.find(".check_js").attr("cid", this.cid);
            "mobile" == window.systemInfo_form && e.find(".employee-seleted").attr("id", this.componentSetup.fieldId);
            var a = this.componentSetup.isUnique
              , f = this.componentSetup.fieldId + this.cid
              , k = this.componentSetup.isReadonly;
            if ("true" == a || 1 == a)
                "mobile" != window.systemInfo_form ? e.find("#searchemployee").removeAttr("data-multi") : e.find(".js_adduser").attr("data-multi", "false");
            if ("true" == k || 1 == k || c)
                "mobile" != window.systemInfo_form ? this.readOnly(e, !0) : e.find(".js_adduser").remove();
            b || (b = "true" == this.componentSetup.isCurrentEmployee || 1 == this.componentSetup.isCurrentEmployee,
            this.initCurrentSystemUser(e.find("#" + f), b, k));
            e.addClass(this.componentSetup.titleLayout);
            this.el = d;
            d.append(e);
            this.getValue(e)
        },
        renderStatSearch: function(d) {
            var b = this
              , c = $(this.tpl).siblings("#statsearch-employee")
              , f = d.ids
              , e = d.term
              , a = d.parentEl
              , k = d.container
              , h = d.condition
              , r = d.pel;
            d = d.parEl;
            if ("mobile" != window.systemInfo_form) {
                if (f)
                    for (h = 0; h < f.length; h++)
                        r = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d"' + f[h].id + '" title\x3d"' + f[h].text + '"\x3e' + f[h].text + "\x3c/a\x3e\x3c/span\x3e",
                        c.find(".entity-container").append(r);
                e && c.find("select:first option[value\x3d" + e + "]").attr("selected", "true");
                f = (new Date).getTime();
                c.find(".j_usercontainer").attr("id", "j_employee" + f);
                a.attr("class", "sch-group j_formFieldSearchGroup");
                a.find(".j_formField-condition").html(c);
                var q = $(k + " #j_employee" + f + " #typeahead-employee");
                window.typeahead && window.typeahead.init && window.typeahead.init({
                    el: k + " #j_employee" + f + " #typeahead-employee",
                    callback: function(a) {
                        if (a && !$.isEmptyObject(a)) {
                            var e = q.parents(".j_usercontainer").find(".j_selected");
                            b.renderTypeheader(e, a)
                        }
                    }
                })
            } else
                (new g).render("mb", {
                    el: r,
                    preEl: d,
                    showCondition: !0,
                    condition: h
                }),
                d.addClass("hide"),
                $("#employee-seleted").removeClass("hide")
        },
        checkEvents: function(d) {
            var b = this
              , c = b.el || $(document)
              , f = b.componentSetup.fieldId + this.cid
              , e = b.componentSetup.isUnique;
            (new this.employeeAhead({})).initAhead(f);
            var a = $("#" + f + " #searchemployee");
            if ("mobile" == window.systemInfo_form)
                c.on("click", "#" + f + " .employee-seleted", function(a) {
                    if ($(this).attr("disabled"))
                        utils.notify("\u6ca1\u6709\u6743\u9650");
                    else {
                        a = $(this).attr("data-module");
                        var e = $(this).attr("data-targetId")
                          , c = $(this).attr("data-multi")
                          , b = $(this).attr("data-noempty") && "true" == $(this).attr("data-noempty") ? !0 : !1
                          , d = $(this).parents(".j_page-view")
                          , f = $(this).attr("data-title")
                          , l = d.attr("id")
                          , h = $(this);
                        $(this).parents(".j_formpreview").hasClass("form-noedit") || ((new g).render("mb", {
                            el: h,
                            targetId: e,
                            module: a,
                            multi: c,
                            preEl: "#" + l,
                            noempty: b,
                            title: f
                        }),
                        d.addClass("hide"),
                        $("#employee-seleted").removeClass("hide"))
                    }
                });
            else
                a && 0 < a.size() && a.click(function() {
                    window.abposview && window.abposview.remove();
                    var c = $("#" + f + " .js_useritem_container .js_form-userItem");
                    $("#" + f + " .control-input").trigger("focusout", "tt");
                    var b = [];
                    c && 0 < c.length && c.each(function(a) {
                        a = $(this).find(".usercard-toggle").attr("userid");
                        var e = $(this).find(".usercard-toggle").text();
                        b.push({
                            username: e,
                            id: a
                        })
                    });
                    (new g).render("pc", {
                        isMulti: "true" == e || 1 == e ? !1 : !0,
                        users: b,
                        target: a
                    })
                });
            c.on("mouseenter.typeahead", "#" + f + " .typeahead-wrapper", function(a) {
                $(this).data("enter", !0)
            }).on("mouseleave.typeahead", "#" + f + " .typeahead-wrapper", function(a) {
                $(this).data("enter", !1)
            });
            c.on("click", "#" + f + " .control-btn", function(a) {
                a.stopPropagation();
                $(this).addClass("hide");
                $(this).prev(".typeahead-wrapper").removeClass("hide");
                $(this).prev(".typeahead-wrapper").find(".control-input").focus()
            });
            c.on("focusout", "#" + f + " .control-input", function(a, e) {
                var c = $(this).parents(".typeahead-wrapper");
                c.data("enter") && "tt" != e || (c.addClass("hide"),
                c.next(".control-btn").removeClass("hide"))
            });
            c.on("click.tt", "#" + f + " #searchList\x3ep", function() {
                var a = $("#" + f);
                a.parents(".field_js").find(".form-error").text("");
                a.parents(".field_js").find(".form-error").hide();
                var e = $(this).data("obj")
                  , c = e.id
                  , e = '\x3cspan name\x3d"js_form-userItem" class\x3d"js_form-userItem employee-item"\x3e\x3ca userid\x3d' + c + ' class\x3d"usercard-toggle"\x3e' + e.username + '\x3c/a\x3e\x3ca class\x3d"close js_deleteEmployee" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e'
                  , d = b.componentSetup.isUnique
                  , g = $("#" + f + " .js_useritem_container .js_form-userItem");
                "true" == d || 1 == d ? a.find(".js_useritem_container").empty() : g && g.each(function(a) {
                    c == $(this).find(".usercard-toggle").attr("userid") && $(this).remove()
                });
                a.find(".js_useritem_container").append(e);
                a.closest(".field_js").trigger("fillRelate")
            });
            c.on("click", "#" + f + " .js_deleteEmployee", function() {
                var a = $(this).parents("#" + f);
                $(this).parent().remove();
                var e = b.check(a, "change");
                a.closest(".field_js").trigger("fillRelate");
                d(e)
            });
            c.on("confirmHandler", "#" + f + " #searchemployee", function(a, e) {
                var c = $("#" + f);
                c.parents(".field_js").find(".form-error").text("");
                c.parents(".field_js").find(".form-error").hide();
                var b = $("#" + f + " .js_useritem_container").html("");
                if (0 < e.objs.length) {
                    var d = e.objs, g;
                    for (g in d) {
                        var h = d[g]
                          , h = $('\x3cspan name\x3d"js_form-userItem" class\x3d"js_form-userItem employee-item"\x3e\x3ca userid\x3d' + h.id + ' class\x3d"usercard-toggle"\x3e' + h.username + '\x3c/a\x3e\x3ca class\x3d"close js_deleteEmployee" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e');
                        b.append(h)
                    }
                }
                c.closest(".field_js").trigger("fillRelate")
            });
            if ("mobile" == window.systemInfo_form)
                c.on("employeeComfirm", "#" + f + " .employee-seleted", function(a, e) {
                    var c = $("#" + f + " .js_useritem_container")
                      , d = b.componentSetup.isUnique;
                    c.html("");
                    c.parents("#field_" + b.componentSetup.fieldId).find(".form-error").text("");
                    "true" != d && 1 != d || c.empty();
                    if (0 < e.objs.length) {
                        var d = e.objs, g;
                        for (g in d) {
                            var h = d[g];
                            if (h) {
                                if (b.isMobileForm)
                                    var m = h.avatar ? "/base/download/" + h.avatar.p5 : "/static/images/avatar.png"
                                      , m = $("\x3cspan data-id\x3d" + h.id + ' name\x3d"js_form-userItem" class\x3d"js_form-userItem employee-item"\x3e\x3cimg class\x3d"avatar" src\x3d"' + m + '" /\x3e\x3ca userid\x3d' + h.id + ' class\x3d"usercard-toggle"\x3e' + h.name + "\x3c/a\x3e\x3c/span\x3e");
                                else
                                    m = $("\x3cspan data-id\x3d" + h.id + ' name\x3d"js_form-userItem" class\x3d"js_form-userItem employee-item"\x3e\x3ca userid\x3d' + h.id + ' class\x3d"usercard-toggle"\x3e' + h.name + "\x3c/a\x3e\x3c/span\x3e");
                                c.append(m)
                            }
                        }
                    } else
                        h = e.objs,
                        b.isMobileForm ? (m = h.avatar ? "/base/download/" + h.avatar.p5 : "/static/images/avatar.png",
                        m = $("\x3cspan data-id\x3d" + h.id + ' name\x3d"js_form-userItem" class\x3d"js_form-userItem employee-item"\x3e\x3cimg class\x3d"avatar" src\x3d"' + m + '" /\x3e\x3ca userid\x3d' + h.id + ' class\x3d"usercard-toggle"\x3e' + h.name + "\x3c/a\x3e\x3c/span\x3e")) : m = $("\x3cspan data-id\x3d" + h.id + ' name\x3d"js_form-userItem" class\x3d"js_form-userItem employee-item"\x3e\x3ca userid\x3d' + h.id + ' class\x3d"usercard-toggle"\x3e' + h.name + "\x3c/a\x3e\x3c/span\x3e"),
                        0 == h.length ? c.html("") : c.append(m);
                    c.closest(".field_js").trigger("fillRelate")
                })
        },
        autoSaveEvents: function(d) {
            var b = this
              , c = b.el || $(document)
              , f = (b.componentSetup.fieldId || b.componentSetup.tempId) + this.cid;
            c.on("click", "#" + f + " .js_deleteEmployee", function() {
                b.saveComponentValue(c.find("#" + f), d)
            });
            if ("mobile" == window.systemInfo_form)
                c.on("employeeComfirm", "#" + f, function(e, a) {
                    b.saveComponentValue($(this), d)
                });
            else
                c.on("click", "#" + f + " #searchList\x3ep", function() {
                    b.saveComponentValue($(this), d)
                }),
                c.on("confirmHandler", "#" + f + " #searchemployee", function(e, a) {
                    b.saveComponentValue($(this), d)
                })
        },
        check: function(d, b) {
            var c = $(d).find('span[name\x3d"js_form-userItem"]').length
              , f = {};
            f.element = d;
            0 != c || "true" != this.componentSetup.required && 1 != this.componentSetup.required || (f.message = this.componentSetup.title + "\u4e0d\u80fd\u4e3a\u7a7a");
            return f
        },
        getValue: function(d, b) {
            var c = {
                formField: {
                    id: this.componentSetup.fieldId
                }
            }
              , f = d.find(".js_useritem_container .js_form-userItem");
            if (0 < f.length) {
                var e = [];
                f.each(function(a) {
                    var c = $(this).find(".usercard-toggle").attr("userid")
                      , b = $(this).find(".usercard-toggle").text();
                    e[a] = {
                        optionId: c,
                        content: b
                    }
                });
                c.dataOptions = e
            } else
                b || (c = null);
            return c
        },
        setValue: function(d, b) {
            d.find(".js_useritem_container").empty();
            if (null != b && null != b.dataOptions) {
                for (var c = {
                    pageNo: 1,
                    pageSize: 1E3,
                    isContainsSub: !0,
                    "employee.status": "normal"
                }, f = 0; f < b.dataOptions.length; f++) {
                    var e = b.dataOptions[f]
                      , a = null == e.content ? "" : e.content
                      , e = e.optionId;
                    null != d.find(".js_form-userItem-add").get(0) ? d.find(".js_useritem_container").append($('\x3cspan name\x3d"js_form-userItem" class\x3d"js_form-userItem employee-item" data-id\x3d' + e + "\x3e\x3ca userid\x3d" + e + ' class\x3d"usercard-toggle"\x3e' + a + '\x3c/a\x3e\x3ca class\x3d"close js_deleteEmployee" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e')) : d.find(".js_useritem_container").append($('\x3cspan name\x3d"js_form-userItem" class\x3d"js_form-userItem employee-item" data-id\x3d' + e + "\x3e\x3ca userid\x3d" + e + ' class\x3d"usercard-toggle"\x3e' + a + "\x3c/a\x3e\x3c/span\x3e"))
                }
                this.isMobileForm && $.ajax({
                    type: TEAMS.ajaxMethod,
                    url: "/app/base/employee/pageQuery.json",
                    dataType: "json",
                    data: c,
                    success: function(a) {
                        if ((a = a.page) && a.result && 0 < a.result.length) {
                            a = a.result;
                            for (var e = 0; e < a.length; e++) {
                                var c = a[e];
                                d.find(".js_useritem_container .employee-item").each(function() {
                                    if ($(this).data("id") == c.id) {
                                        var a = c.avatar ? "/base/download/" + c.avatar.p5 : "/static/images/avatar.png";
                                        $(this).prepend('\x3cimg class\x3d"avatar" src\x3d"' + a + '"/\x3e')
                                    }
                                })
                            }
                        }
                    }
                })
            }
        },
        empty: function(d) {
            d.find(".js_useritem_container").html("")
        },
        readOnly: function(d, b) {
            var c = this.componentSetup.fieldId + this.cid
              , f = d.find('div[id\x3d"' + c + '"] span[name\x3d"js_form-userItem-add"]')
              , e = d.find('div[id\x3d"' + c + '"] span[name\x3d"js_form-userItem"]')
              , a = d.find('div[id\x3d"' + c + '"] .js_deleteEmployee');
            if ("true" == this.componentSetup.isReadonly || 1 == this.componentSetup.isReadonly)
                b = !0;
            b ? (f.remove(),
            a.remove(),
            this.isMobileForm && d.find('div[id\x3d"' + c + '"] .js_adduser').remove()) : f && 0 != f.length && null != f || (f = $(this.tpl).siblings("#preview-employee").find('span[name\x3d"js_form-userItem-add"]'),
            d.find('div[id\x3d"' + c + '"]').find(".js_useritem_container").after(f),
            e.append('\x3ca class\x3d"close js_deleteEmployee" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e'))
        },
        getIdArray: function(d) {
            var b = [];
            d && d.each(function(c) {
                c = $(this).find(".usercard-toggle").attr("userid");
                b.push(c)
            });
            return b
        },
        initCurrentSystemUser: function(d, b, c) {
            b && $(document).trigger("currentUser", function(b) {
                if (b) {
                    var e = b.username
                      , a = b.id
                      , f = d.find(".js_useritem_container")
                      , g = $('\x3cspan name\x3d"js_form-userItem" class\x3d"js_form-userItem employee-item"\x3e\x3ca userid\x3d' + a + ' class\x3d"usercard-toggle"\x3e' + e + '\x3c/a\x3e\x3ca class\x3d"close js_deleteEmployee" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e');
                    if ("true" == c || 1 == c)
                        g = $('\x3cspan name\x3d"js_form-userItem" class\x3d"js_form-userItem employee-item"\x3e\x3ca userid\x3d' + a + ' class\x3d"usercard-toggle"\x3e' + e + "\x3c/a\x3e");
                    "mobile" == window.systemInfo_form && (f.text(""),
                    g = $("\x3cspan data-id\x3d" + a + ' name\x3d"js_form-userItem" class\x3d"js_form-userItem employee-item"\x3e\x3cimg class\x3d"avatar" src\x3d"' + (b.avatar ? "/base/download/" + b.avatar.p5 : "/static/images/avatar.png") + '" /\x3e\x3ca userid\x3d' + a + ' class\x3d"usercard-toggle"\x3e' + e + "\x3c/a\x3e"));
                    f.append(g)
                }
            })
        },
        renderTypeheader: function(d, b) {
            if (b.length)
                for (var c = 0; c < b.length; c++) {
                    var f = b[c]
                      , e = f.name
                      , a = f.id;
                    if (e && a) {
                        var k = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d' + a + ' title\x3d"' + e + '"\x3e' + e + "\x3c/a\x3e\x3c/span\x3e";
                        d.find(".entity-item").each(function(e) {
                            a == $(this).find("a").attr("id") && (k = null)
                        });
                        d.append(k)
                    }
                }
            else
                e = b.name,
                a = b.id,
                e && a && (k = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d' + a + ' title\x3d"' + e + '"\x3e' + e + "\x3c/a\x3e\x3c/span\x3e",
                d.find(".entity-item").each(function(e) {
                    a == $(this).find("a").attr("id") && (k = null)
                }),
                d.append(k))
        },
        employeeAhead: Backbone.View.extend({
            defaults: function() {
                this.suggestion = "";
                this.remote = TEAMS.api.suggestion;
                this.entity = "employee";
                this.tpl = h.get("employee")
            },
            initAhead: function(d) {
                this.defaults();
                this.fieldId = d;
                this.$continer = $("#" + this.fieldId);
                this._htmlEvents()
            },
            _htmlEvents: function() {
                var d = this
                  , b = d.$continer
                  , c = $("#" + d.fieldId + " #typeahead-form-employee");
                c.off("focus.tt").on("focus.tt", function(c) {
                    d._search($(this))
                });
                c.off("click.tt").on("click.tt", function(c) {
                    c.stopPropagation()
                });
                c.off("keyup.tt").on("keyup.tt", function(f) {
                    f = f.which;
                    0 < $("body").find("#form-abposselect").length && (b = $("body").find("#form-abposselect").find(".field_js"));
                    13 == f ? (b.find("#form-typeahead-div p.active").trigger("click.tt"),
                    window.abposview && window.abposview.remove()) : 27 == f ? (c.trigger("focusout", "tt"),
                    window.abposview && window.abposview.remove()) : 38 == f ? (f = $("#form-typeahead-div p.active"),
                    1 > f.length ? b.find("#form-typeahead-div p").last().addClass("active") : (f.removeClass("active"),
                    (0 < f.prev().length ? f.prev() : b.find("#form-typeahead-div p").last()).addClass("active"))) : 40 == f ? (f = b.find("#form-typeahead-div p.active"),
                    1 > f.length ? b.find("#form-typeahead-div p").first().addClass("active") : (f.removeClass("active"),
                    (0 < f.next().length ? f.next() : b.find("#form-typeahead-div p").first()).addClass("active"))) : d._search($(this))
                });
                b.find("#form-typeahead-div").off("mouseenter.tt", "p").on("mouseenter.tt", "p", function() {
                    0 < $("body").find("#form-abposselect").length && (b = $("body").find("#form-abposselect").find(".field_js"));
                    $(this).addClass("active");
                    b.find("#form-typeahead-div p.active").removeClass("active")
                });
                b.off("click.tt", "#form-typeahead-div p").on("click.tt", "#form-typeahead-div p", function(b) {
                    c.trigger("focusout", "tt")
                })
            },
            _search: function(d) {
                var b = this
                  , c = b.$continer
                  , f = $.trim(d.val());
                f == d.attr("placeholder") && (f = "");
                c.find("#form-typeahead-div #searchList").html("");
                0 < $("body").find("#form-abposselect").length ? ($("body").find("#form-abposselect").find(".field_js").find("#form-typeahead-div .loading_small").addClass(e).show(),
                c.find("#form-typeahead-div .loading_small").hide()) : c.find("#form-typeahead-div .loading_small").addClass(e).show();
                window.abposview && window.abposview.remove();
                if (b.list && b.suggestion === f)
                    b._loadList(b.list);
                else {
                    var e = b.entity;
                    d = b.remote;
                    c = {};
                    this.suggestion = f;
                    c.keywords = f;
                    c.searchType = b.entity;
                    $.ajax({
                        type: TEAMS.ajaxMethod,
                        url: d,
                        dataType: "json",
                        data: c,
                        success: function(a) {
                            a = a[e + "s"];
                            b.list = a;
                            b._loadList(a)
                        }
                    })
                }
            },
            _loadList: function(d) {
                var b = this.$continer;
                0 < $("body").find("#form-abposselect").length ? $("body").find("#form-abposselect").find(".field_js").find("#form-typeahead-div .loading_small").hide() : b.find("#form-typeahead-div .loading_small").hide();
                b.find("#form-typeahead-div #searchList").empty();
                for (var c = 0, l = d.length; c < l; c++) {
                    var e = d[c];
                    e.name = e.name.replace(/</g, "\x26lt").replace(/>/g, "\x26gt").replace("/[\r\n]/g", " ");
                    var a = $(this.tpl).siblings(".employee");
                    a.find(".j_name").text(e.name);
                    e.avatar && e.avatar.p5 && a.find(".avatar").attr("src", "/base/download/" + e.avatar.p5);
                    a.attr("id", e.id);
                    a.attr("title", e.name);
                    a.data("obj", e);
                    0 == b.find("#form-typeahead-div #searchList").find("#" + e.id).length && b.find("#form-typeahead-div #searchList").append(a)
                }
                b.find("#form-typeahead-div #searchList").show();
                window.abposview && window.abposview.remove();
                window.abposview = new f({
                    continer: b,
                    entity: this.entity
                });
                window.abposview.render()
            }
        })
    });
    u.exports = window.Employee
});
define("form/component/signcomview", ["form/componentmodel", "form/tplutil"], function(n, y, u) {
    var m = n("form/componentmodel")
      , h = n("form/tplutil");
    y = Backbone.View.extend({
        initialize: function() {},
        render: function(g, f) {
            "pc" == g ? this.initPC.init(f) : this.initMb.init(f)
        },
        initPC: {
            init: function(g) {
                this.el = "#sign-config";
                this.model = new m;
                this.type = "draw";
                this.preEl = g.preEl;
                this.formId = g.formId;
                this.tpl = h.get("signcom");
                $("body").append($(this.tpl));
                this.render();
                this.delegateEvents()
            },
            delegateEvents: function() {
                var g = $(this.el)
                  , f = this;
                $(document).on("hidden.bs.modal", "#sign-config", function(d) {
                    f.remove();
                    $("#sign-config").remove()
                });
                g.on("click.signcom", ".j_pen_size\x3ea", function() {
                    $(".j_penOrEras").removeClass("active");
                    $(this).addClass("active").siblings().removeClass("active");
                    f.sketchpad.pen().width($(this).data("size"));
                    f.sketchpad.editing(!0)
                });
                g.on("click.signcom", ".j_color_box span", function() {
                    var d = g.find(".j_color_box span:first").data("color");
                    g.find(".j_color_box span:first").css("background", $(this).data("color")).data("color", $(this).data("color"));
                    $(this).css("background", d).data("color", d);
                    var d = f.sketchpad.pen()
                      , b = g.find(".j_color_box span:first").data("color");
                    d.color(b)
                });
                g.on("click.signcom", ".j_penOrEras", function() {
                    $(".j_pen_size\x3ea").removeClass("active");
                    $(this).addClass("active");
                    f.sketchpad.editing("erase")
                });
                g.on("mousedown.signcom", "#signEditor svg", function() {
                    Raphael && (Raphael.mouseDownStatus = !0);
                    $(document).off("mouseup.signcom").on("mouseup.signcom", function() {
                        Raphael.mouseDownStatus = null
                    })
                });
                g.on("click.signcom", "#sign-confirm", function() {
                    var d = $(this);
                    "draw" == f.type ? 0 == JSON.parse(f.sketchpad.json()).length ? formPlugin.notify("\u8bf7\u7ed8\u5236\u7b7e\u540d\u3002") : (d.removeAttr("id"),
                    f.saveSignImg()) : "esign" == f.type && TEAMS.fixedSignature && TEAMS.fixedSignature.signauterImage && (f.preEl.trigger("signatureSave_E", {
                        imageId: TEAMS.fixedSignature.signauterImage.imageUrl,
                        name: TEAMS.fixedSignature.signauterImage.name
                    }),
                    f.remove(),
                    g.modal("hide"))
                });
                g.on("click.signcom", "#sign-cancel", function() {
                    f.remove();
                    g.modal("hide")
                });
                g.on("click.signcom", ".j_sign_close", function() {
                    f.remove();
                    g.modal("hide")
                });
                g.on("click.signcom", ".j_signature-list a", function() {
                    f.type = $(this).attr("data-type");
                    var d = $(this).parent();
                    d.hasClass("active") || d.addClass("active").siblings().removeClass("active");
                    "scan" == f.type ? (g.find(".j_signature_content #codeContent").removeClass("hide").siblings().addClass("hide"),
                    g.find(".j_footBtn").addClass("hide")) : "draw" == f.type ? (g.find(".j_signature_content #drawContent").removeClass("hide").siblings().addClass("hide"),
                    g.find(".j_footBtn").removeClass("hide")) : "esign" == f.type && (g.find(".j_signature_content #e-sign").removeClass("hide").siblings().addClass("hide"),
                    g.find(".j_footBtn").removeClass("hide"),
                    TEAMS.fixedSignature && TEAMS.fixedSignature.signature || (g.find("#e-sign").empty().append('\x3cspan class\x3d"c-999 text-center ds-ib w-full pv-20"\x3e\u6682\u65e0\u7535\u5b50\u7b7e\u540d\x3c/span\x3e'),
                    g.find(".j_footBtn").addClass("hide")))
                });
                $("body").off("signatureForScanCodeOnCallback").on("signatureForScanCodeOnCallback", function(d, b) {
                    var c = b.track;
                    b.token != f.token ? (formPlugin.notify("\u4e8c\u7ef4\u7801\u5df2\u5931\u6548\uff0c\u8bf7\u91cd\u65b0\u626b\u7801\u3002"),
                    setTimeout(function() {
                        f.qrcode = null;
                        f.render()
                    })) : (f.token = null,
                    c && f.saveSignTrack(JSON.stringify(c), function(b) {
                        $.ajax({
                            type: TEAMS.ajaxMethod,
                            url: "/app/base/upload/saveBase64Image.json?optType\x3dsignature\x26module\x3dformdatareport",
                            dataType: "json",
                            data: b,
                            success: function(e) {
                                f.preEl.trigger("signatureSave", [e, c]);
                                f.remove();
                                g.modal("hide");
                                setTimeout(function() {
                                    var a = $(".j_signPrevDiv");
                                    0 == c.length ? a.addClass("hide") : a.removeClass("hide")
                                })
                            }
                        })
                    }))
                })
            },
            render: function(g) {
                var f = this;
                $(this.el);
                f.renderSignature();
                setTimeout(function() {
                    f.renderView()
                })
            },
            renderView: function() {
                var g = this
                  , f = $(this.el);
                g.timer && (clearTimeout(g.timer),
                g.timer = null);
                n.async(["/static/js/lib/base64.js"], function() {
                    g.token = Base64.encode((new Date).getTime() + "");
                    var b = "";
                    if (0 < window.location.href.indexOf("/form/edit") || 0 < window.location.href.indexOf("/form/preview"))
                        b = "preview";
                    var c = "";
                    window.imCurrentUser && window.imCurrentUser.uid && (c = window.imCurrentUser.uid);
                    var d = "";
                    window.imCurrentUser && window.imCurrentUser.cid && (d = window.imCurrentUser.cid);
                    g.qrcode = window.location.protocol + "//" + window.location.host + "/remote/signscan?tenantKey\x3d" + TEAMS.currentTenant.tenantKey + "\x26imUID\x3d" + c + "\x26imCID\x3d" + d + "\x26token\x3d" + g.token + "\x26preview\x3d" + b;
                    f.find("#signCode").html("");
                    f.find("#signCode").qrcode({
                        width: 160,
                        height: 160,
                        correctLevel: 0,
                        text: g.qrcode
                    })
                });
                g.timer = setTimeout(function() {
                    g.renderView()
                }, 3E5);
                "scan" == g.type ? (f.find("#codeContent").removeClass("hide"),
                f.find("#drawContent").addClass("hide"),
                f.find(".j_footBtn").addClass("hide"),
                f.find("#e-sign").addClass("hide")) : "draw" == g.type ? (f.find("#codeContent").addClass("hide"),
                f.find("#drawContent").removeClass("hide"),
                f.find(".j_footBtn").removeClass("hide"),
                f.find("#e-sign").addClass("hide")) : "esign" == g.type && (f.find("#codeContent").addClass("hide"),
                f.find("#drawContent").addClass("hide"),
                f.find(".j_footBtn").removeClass("hide"),
                f.find("#e-sign").removeClass("hide"));
                if (TEAMS.fixedSignature && TEAMS.fixedSignature.signauterImage && TEAMS.fixedSignature.signature) {
                    var d = $("\x3cimg\x3e");
                    d.attr("src", TEAMS.api.downImgUrl+"/" + TEAMS.fixedSignature.signauterImage.imageUrl);
                    d.css({
                        "max-height": "100%",
                        margin: "0 auto"
                    });
                    f.find("#e-sign .j_edit").empty().append(d)
                } else
                    $.ajax({
                        contentType: "application/json",
                        type: TEAMS.ajaxMethod,
                        url: "freeform/queryFixSignature.json",
                        dataType: "json",
                        data: "",
                        success: function(b) {
                            if (b.message)
                                formPlugin.notify(b.message);
                            else if (b && b.signauterImage && b.signature) {
                                window.TEAMS.fixedSignature = {
                                    signauterImage: b.signauterImage,
                                    signature: b.signature
                                };
                                var c = $("\x3cimg\x3e");
                                c.attr("src", TEAMS.api.downImgUrl+"/" + b.signauterImage.imageUrl);
                                c.css({
                                    "max-height": "100%",
                                    margin: "0 auto"
                                });
                                f.find("#e-sign .j_edit").empty().append(c)
                            } else
                                f.find("#e-sign").empty().append('\x3cspan class\x3d"c-999 text-center ds-ib w-full pv-20"\x3e\u6682\u65e0\u7535\u5b50\u7b7e\u540d\x3c/span\x3e')
                        }
                    });
                f.modal("show")
            },
            renderSignature: function() {
                var g = this;
                $(this.el).find("#signEditor").html("");
                n.async(["/static/js/lib/raphael-2.2.1.min.js", "/static/js/lib/base64.js"], function() {
                    n.async(["/static/js/lib/raphael.sketchpad.js", "/static/js/lib/rgbcolor.js", "/static/js/lib/canvg.min.js", "/static/js/lib/svg_todataurl.js"], function() {
                        g.sketchpad = Raphael.sketchpad("signEditor", {
                            height: 9 * $("#signEditor").width() / 16,
                            width: $("#signEditor").width(),
                            editing: !0
                        })
                    })
                })
            },
            saveSignImg: function() {
                var g = this
                  , f = $(this.el);
                $("#normSizeSign").html("");
                g.sketchpad_normSize = Raphael.sketchpad("normSizeSign", {
                    width: 960,
                    height: 540,
                    editing: !1
                });
                g.sketchpad_normSize.json(g.sketchpad.json(), $("#signEditor").width(), 9 * $("#signEditor").width() / 16);
                0 <= navigator.userAgent.indexOf("MSIE") && 0 > navigator.userAgent.indexOf("Opera") && ($("#normSize4ie svg").children().remove(),
                $("#normSize4ie svg").html($("#normSizeSign svg").children()),
                $("#normSizeSign").html($("#normSize4ie svg").clone()));
                document.getElementById("normSizeSign").firstChild.toDataURL("image/png", {
                    callback: function(d) {
                        g.model.saveSignImage({
                            base64Str: d.split(",")[1]
                        }, function(b) {
                            g.preEl.trigger("signatureSave", [b, JSON.parse(g.sketchpad_normSize.json())]);
                            g.remove();
                            f.modal("hide")
                        })
                    }
                })
            },
            saveSignTrack: function(g, f) {
                $(this.el);
                $("#normSizeSign").html("");
                this.sketchpad_normSize = Raphael.sketchpad("normSizeSign", {
                    width: 960,
                    height: 540,
                    editing: !1
                });
                this.sketchpad_normSize.json(g, 960, 540);
                0 <= navigator.userAgent.indexOf("MSIE") && 0 > navigator.userAgent.indexOf("Opera") && ($("#normSize4ie svg").children().remove(),
                $("#normSize4ie svg").html($("#normSizeSign svg").children()),
                $("#normSizeSign").html($("#normSize4ie svg").clone()));
                document.getElementById("normSizeSign").firstChild.toDataURL("image/png", {
                    callback: function(d) {
                        f({
                            base64Str: d.split(",")[1]
                        })
                    }
                })
            },
            remove: function() {
                $(this.el).off(".signatureCom")
            }
        },
        initMb: {
            init: function(g) {
                this.sketchpad = g.sketchpad;
                this.el = g.parentEl;
                this.fieldId = g.fieldId;
                this.cid = g.cid;
                this.canvasWidth = $(document).width();
                this.canvasHeight = 9 * $(document).width() / 16;
                window.parent != window.self && window.parent.client && (window.client = window.parent.client);
                0 < window.top.$("#mobileIframe").length && "en_US" == window.top.TEAMS.perLang && $(document).find(".j_btns a").css("font-size", "13px");
                this.render();
                this.delegateEvents()
            },
            delegateEvents: function() {
                var g = this;
                $(document).on("tap", ".js_infoactionsheet_toggle", function(f) {
                    if ($(this).hasClass("brush"))
                        var d = 0 != $(this).parents(".j_page-view").size ? $(this).parents(".j_page-view").find(".foot-actionsheet-brush") : $("body").find(".foot-actionsheet-brush");
                    else
                        $(this).hasClass("color") && (d = 0 != $(this).parents(".j_page-view").size ? $(this).parents(".j_page-view").find(".foot-actionsheet-color") : $("body").find(".foot-actionsheet-color"));
                    d.hasClass("open") ? d.removeClass("open") : d.addClass("open").siblings(".foot-actionsheet").removeClass("open");
                    $(document).one("tap", function() {
                        d.removeClass("open")
                    });
                    f.stopPropagation()
                });
                $(document).on("tap", ".action-menus-color .menu-item span", function() {
                    var f = g.sketchpad.pen();
                    g.nowColor = $(this).data("color");
                    f.color(g.nowColor)
                });
                $(document).on("tap", ".prev", function() {
                    g.sketchpad.redo()
                });
                $(document).on("tap", ".next", function() {
                    g.sketchpad.undo()
                });
                $(document).on("tap", ".foot-actionsheet-brush .menu-item", function() {
                    var f = $(this).index();
                    g.penSize = 5;
                    g.sketchpad.editing(!0);
                    switch (f) {
                    case 0:
                        g.penSize = 12;
                        break;
                    case 1:
                        g.penSize = 10;
                        break;
                    case 2:
                        g.penSize = 8;
                        break;
                    case 3:
                        g.penSize = 6;
                        break;
                    case 4:
                        g.penSize = 4;
                        break;
                    case 5:
                        g.penSize = 2
                    }
                    g.sketchpad.pen().width(g.penSize)
                });
                $(document).on("tap", ".eraser", function() {
                    $(document).find(".foot-actionsheet-brush").removeClass("open");
                    $(document).find(".foot-actionsheet-color").removeClass("open");
                    g.sketchpad.editing("erase")
                });
                $(document).on("tap", ".foot-actionsheet .menu-item", function(f) {
                    $(this).parents(".foot-actionsheet").hasClass("foot-actionsheet-brush") ? $(this).parents(".foot-actionsheet-brush").removeClass("open") : $(this).parents(".foot-actionsheet").hasClass("foot-actionsheet-color") && $(this).parents(".foot-actionsheet-color").removeClass("open")
                });
                $(document).on("tap", "#signcomContainer .j_left-back", function() {
                    "mobileWeb" == window.client && window.parent.closeSignView();
                    "remoteWeb" == window.client && window.parent.closeSignScan()
                });
                $(document).on("tap", "#signcomContainer .j_esign", function() {
                    if (window.top.TEAMS.fixedSignature && window.top.TEAMS.fixedSignature.signauterImage && window.top.TEAMS.fixedSignature.signature) {
                        var f = {
                            imageId: window.top.TEAMS.fixedSignature.signauterImage.imageUrl,
                            name: window.top.TEAMS.fixedSignature.signauterImage.name
                        };
                        window.parent.$("body").find("#field_" + g.fieldId + '[cid\x3d"' + g.cid + '"]').trigger("signatureSave_e", f);
                        g.sketchpad.clear();
                        $(document).find(".j_signatureSaving").addClass("hide")
                    } else
                        $.ajax({
                            contentType: "application/json",
                            type: TEAMS.ajaxMethod,
                            url: "freeform/queryFixSignature.json",
                            dataType: "json",
                            data: "",
                            success: function(d) {
                                d.message ? formPlugin.notify(d.message) : d.signauterImage ? (window.top.TEAMS.fixedSignature = {
                                    signauterImage: d.signauterImage,
                                    signature: d.signature
                                },
                                d = {
                                    imageId: d.signauterImage.imageUrl,
                                    name: d.signauterImage.name
                                },
                                window.parent.$("body").find("#field_" + g.fieldId + '[cid\x3d"' + g.cid + '"]').trigger("signatureSave_e", d),
                                g.sketchpad.clear(),
                                $(document).find(".j_signatureSaving").addClass("hide")) : g.notify("\u6682\u65e0\u7535\u5b50\u7b7e\u540d")
                            }
                        })
                });
                $(document).on("tap", "#signcomContainer .j_right-save", function() {
                    var f = $(this);
                    if (0 == JSON.parse(g.sketchpad.json()).length)
                        "mobileWeb" == window.client && g.notify("\u8bf7\u7ed8\u5236\u7b7e\u540d\u3002"),
                        "remoteWeb" == window.client && g.notify("\u8bf7\u7ed8\u5236\u7b7e\u540d\u3002");
                    else {
                        f.removeClass("j_right-save");
                        $(document).find(".j_signatureSaving").removeClass("hide");
                        g.sketchpad_normSize || (g.sketchpad_normSize = Raphael.sketchpad("normSizeSign", {
                            width: 960,
                            height: 540,
                            editing: !1
                        }));
                        g.sketchpad_normSize.json(g.sketchpad.json(), $("#signEditor").width(), 9 * $("#signEditor").width() / 16);
                        canvg("canvasContainer", $("#normSizeSign").html());
                        var d = document.getElementById("canvasContainer").toDataURL("image/png");
                        "remoteWeb" == window.client ? window.parent && !window.parent.saved ? (window.parent.$("body").trigger("signatureSaveScan", [{
                            base64Str: d.split(",")[1]
                        }, JSON.parse(g.sketchpad_normSize.json())]),
                        g.sketchpad.clear(),
                        f.addClass("j_right-save")) : ($(document).find(".j_signatureSaving").addClass("hide"),
                        window.parent && (g.notify("\u7b7e\u540d\u5df2\u5b58\u5728"),
                        f.addClass("j_right-save"))) : $.ajax({
                            type: TEAMS.ajaxMethod,
                            url: "/app/base/upload/saveBase64Image.json?optType\x3dsignature\x26module\x3dformdatareport",
                            dataType: "json",
                            data: {
                                base64Str: d.split(",")[1]
                            },
                            success: function(b) {
                                f.addClass("j_right-save");
                                "mobileWeb" == window.client && (window.parent.$("body").find("#field_" + g.fieldId + '[cid\x3d"' + g.cid + '"]').trigger("signatureSave", [b, JSON.parse(g.sketchpad_normSize.json())]),
                                g.sketchpad.clear(),
                                $(document).find(".j_signatureSaving").addClass("hide"))
                            }
                        })
                    }
                });
                window.addEventListener("onorientationchange"in window ? "orientationchange" : "resize", function() {
                    clearTimeout(g.orientationChangedTimeout);
                    var f = g.sketchpad.json();
                    g.sketchpad = null;
                    $("#signEditor").html("");
                    g.orientationChangedTimeout = setTimeout(function() {
                        var d = $(window).width();
                        g.sketchpad = Raphael.sketchpad("signEditor", {
                            height: 9 * d / 16,
                            width: d,
                            editing: !0
                        });
                        var b = g.sketchpad.pen();
                        b.width(g.penSize);
                        b.color(g.nowColor);
                        g.sketchpad.json(f, g.canvasWidth, g.canvasHeight);
                        g.canvasWidth = d;
                        g.height = 9 * d / 16
                    }, 300)
                }, !1)
            },
            render: function(g) {
                if ("remoteWeb" == window.client) {
                    if (window.parent.preview) {
                        $(document).find("#signcomContainer .j_left-back").removeClass("hide");
                        this.notify("\u9884\u89c8\u9875\u9762\u4e0d\u80fd\u7b7e\u540d\uff0c\u8bf7\u5728\u7cfb\u7edf\u5185\u4f7f\u7528\u54e6");
                        return
                    }
                } else
                    $(document).find("#signcomContainer .eui-foot-tools .sys-btn .j_left-back").removeClass("hide"),
                    $(document).find("#signcomContainer .eui-foot-tools .sys-btn .j_esign").removeClass("hide");
                $(document).find("#signcomContainer .eui-foot-tools .sys-btn .j_right-save").removeClass("hide");
                g && this.redrawSignature(g)
            },
            notify: function(g) {
                $(document).find("#signatureNotify").removeClass("hide").html(g);
                setTimeout(function() {
                    $(document).find("#signatureNotify").addClass("hide").html("")
                }, 2E3)
            }
        }
    });
    u.exports = y
});

define("form/component/relevancecontrol", ["form/tplutil", "form/component/entityselecter"], function(n, y, u) {
    var m = n("form/tplutil")
      , h = n("form/component/entityselecter");
    n = Backbone.View.extend({
        initialize: function(g) {
            this.targetId = g.targetId;
            this.targetEl = g.targetEl;
            this._module = g.module;
            this.preEl = g.preEl;
            this.seletedList = g.seletedList;
            this.multi = g.multi;
            this.fieldIds = g.fieldIds;
            this.formId = g.formId;
            this.allData = g.allData;
            this.cusfields = g.cusfields;
            this.linkedIds = g.linkedIds;
            this.sourceModule = g.sourceModule;
            this.order = g.order;
            this.filterParams = g.filterParams;
            this.dataTemplateId = g.dataTemplateId;
            this.el = ".j_page_relevance_control";
            this.tpl = m.get("relevancecontrol");
            $("body").append($(this.tpl))
        },
        delegateEvents: function() {
            var g = this
              , f = $(g.el);
            f.on("click.RelevanceControl", "#j_a-back", function(d) {
                $(g.preEl).removeClass("hide");
                f.remove()
            });
            f.on("click.RelevanceControl", ".j_addRelevanceBtn", function(d) {
                var b = g._module
                  , c = [];
                f.find("#seleted-list span").each(function() {
                    var d = $(this).attr("data-id")
                      , e = $(this).text();
                    c.push({
                        id: d,
                        name: e,
                        module: b
                    })
                });
                (new h).render("mb", {
                    targetId: g.targetId,
                    targetEl: $(this),
                    module: b,
                    multi: g.multi,
                    preEl: g.el,
                    seletedList: c,
                    order: g.order,
                    fieldIds: g.fieldIds,
                    formId: g.formId,
                    allData: g.allData,
                    filterParams: g.filterParams,
                    linkedIds: g.linkedIds,
                    cusfields: g.cusfields,
                    sourceModule: g.sourceModule,
                    dataTemplateId: g.dataTemplateId
                });
                f.addClass("hide")
            });
            f.on("tap.RelevanceControl", ".j_deleitem", function() {
                var d = $(this).parent();
                formPlugin.confirm("\u662f\u5426\u786e\u8ba4\u5220\u9664", function(b) {
                    b && (b = d.attr("id"),
                    f.find("#seleted-list").find('span[data-id\x3d"' + b + '"]').remove(),
                    d.remove(),
                    g.notify("\u6570\u636e\u5df2\u5220\u9664"),
                    $("body").find(".bootbox.modal.fade.in").modal("hide"),
                    $("body").find(".bootbox.modal.fade.in").remove(),
                    $("body").find(".modal-backdrop.fade.in").remove(),
                    $("body").removeClass("modal-open"),
                    $(g.targetEl).trigger("deleteObj", b))
                })
            });
            f.on("objsComfirm.RelevanceControl", ".j_addRelevanceBtn", function(d, b) {
                var c = b.objs;
                f.find("#seleted-list").empty();
                f.find("#relevanceSelectedlist ul").empty();
                g.renderSelected(b.objs);
                $(g.targetEl).trigger("objsComfirm", {
                    objs: c
                })
            });
            f.on("click.RelevanceControl", "#relevanceSelectedlist ul .j_comlisttxt", function(d, b) {
                var c = $(this).parent().attr("href");
                c && window.open(TEAMS.service.base + c + "")
            })
        },
        notify: function(g, f, d, b) {
            void 0 == b && (b = !0);
            g = {
                sticker: !1,
                shadow: !1,
                history: !1,
                hide: b,
                opacity: .95,
                animation: {
                    effect_in: "slide",
                    effect_out: "none"
                },
                text: g,
                title: f
            };
            switch (d) {
            case "error":
                g.type = "error";
                break;
            case "info":
                g.type = "info";
                break;
            case "success":
                g.type = "success"
            }
            $.pnotify_remove_all();
            $.pnotify(g)
        },
        render: function() {
            var g = this.getModuleName(this._module);
            $(this.el).find(".j_header_title").text("\u5173\u8054" + g);
            g = this.seletedList;
            $("html,body").animate({
                scrollTop: 0
            }, 200);
            this.renderSelected(g)
        },
        renderSelected: function(g) {
            if (g && 0 < g.length)
                for (var f = 0; f < g.length; f++) {
                    var d = g[f]
                      , b = "";
                    1 != window.isEDist && (b = this.renderInfoUrl(d.module, d.id),
                    "contact" == d.module && (b = "null",
                    d.customerId && "" != d.customerId && (b = d.customerId),
                    b = "/mobile/crms?module\x3dkey_contact\x26info\x3dview_ContactView|id_" + d.id + "|customerId_" + b + "|preView_ContactListView"));
                    var c = $(this.el).find("#relevance-clone").clone();
                    c.find(".j_title").text(d.name);
                    c.attr({
                        id: d.id,
                        "data-id": d.id,
                        "data-title": d.name,
                        href: b
                    });
                    0 == $(this.el).find("#relevanceSelectedlist ul").find("#" + d.id).length && $(this.el).find("#relevanceSelectedlist ul").append(c);
                    b = $('\x3cspan id\x3d"seleted' + d.id + '" data-id\x3d"' + d.id + '"\x3e' + d.name + "\x3c/span\x3e");
                    b.data("domain", d);
                    0 == $(this.el).find("#seleted-list").find("#seleted" + d.id).length && $(this.el).find("#seleted-list").append(b);
                    $(this.el).find("#relevanceSelectedlist").find(".j_holder").addClass("hide")
                }
            else
                g = this.getModuleName(this._module),
                $(this.el).find("#relevanceSelectedlist").find(".j_holder .j_no_relevance").text("\u6682\u65e0\u5173\u8054" + g),
                $(this.el).find("#relevanceSelectedlist").find(".j_holder").removeClass("hide")
        },
        renderInfoUrl: function(g, f) {
            var d = TEAMS.currentUser.id;
            switch (g) {
            case "task":
                return "/mobile/task/" + f;
            case "customer":
                return "/mobile/crms?module\x3dkey_customer\x26info\x3dview_CustomerCover|id_" + f;
            case "document":
                return "/mobile/documents/" + d + "/" + f;
            case "workflow":
                return "/mobile/workflows/" + d + "/" + f;
            case "mainline":
                return "/mobile/mainline/cover/" + f;
            case "workreport":
                return "/mobile/workreport/info/" + f;
            case "calendar":
                return "/mobile/calendar/" + d + "/" + f;
            case "formdatareport":
                return "/mobile/formdatadetail/formdatareport/" + f;
            case "chance":
                return "/mobile/crms/" + f + "?module\x3dkey_salechance\x26info\x3dview_SaleChanceView|id_" + f;
            case "production":
                return "/mobile/crms/" + f + "?module\x3dkey_production\x26info\x3dview_ProductionView|id_" + f;
            case "competitor":
                return "/mobile/crms/" + f + "?module\x3dkey_competitor\x26info\x3dview_CompetitorView|id_" + f;
            case "marketactivity":
                return "/mobile/crms/" + f + "?module\x3dkey_marketactivity\x26info\x3dview_MarketactivityView|id_" + f;
            case "contract":
                return "/mobile/crms/" + f + "?module\x3dkey_contract\x26info\x3dview_ContractView|id_" + f;
            case "clue":
                return "/mobile/crms/" + f + "?module\x3dkey_clue\x26info\x3dview_ClueView|id_" + f;
            case "agenda":
                return "/mobile/calendar/" + d + "/" + f
            }
        },
        getModuleName: function(g) {
            switch (g) {
            case "task":
                return "\u4efb\u52a1";
            case "document":
                return "\u6587\u6863";
            case "mainline":
                return "\u9879\u76ee";
            case "customer":
                return "\u5ba2\u6237";
            case "contact":
                return "\u5ba2\u6237\u8054\u7cfb\u4eba";
            case "workflow":
                return "\u5ba1\u6279";
            case "form":
                return "\u8868\u5355\u6570\u636e";
            case "datasource":
                return "\u6570\u636e\u6e90";
            case "chance":
                return "\u5546\u673a";
            case "production":
                return "\u4ea7\u54c1";
            case "contract":
                return "\u5408\u540c";
            case "agenda":
                return "\u65e5\u7a0b"
            }
        },
        remove: function() {
            $(".j_page_relevance_control").off(".RelevanceControl");
            $(".j_page_relevance_control").remove()
        }
    });
    u.exports = n
});

define("form/component/agendacomponent", "form/relatecomponent form/tplutil form/componentmodel form/component/agendalist form/component/entityselecter form/component/typeahead form/component/relevancecontrol form/abposview".split(" "), function(n, y, u) {
    var m = n("form/relatecomponent")
      , h = n("form/tplutil")
      , g = n("form/componentmodel")
      , f = n("form/component/agendalist")
      , d = n("form/component/entityselecter")
      , b = n("form/component/typeahead")
      , c = n("form/component/relevancecontrol")
      , l = n("form/abposview");
    window.AgendaComponent = m.extend({
        initialize: function(e) {
            m.prototype.initialize.call(this, e);
            var a = {
                componentKey: "AgendaComponent",
                title: "\u5173\u8054\u65e5\u7a0b",
                showfields: [],
                newSortColumn: [],
                selectColumn: [],
                orderContent: ""
            };
            null != e && (a.title = e.title,
            a.showfields = e.showfields,
            a.newSortColumn = e.newSortColumn,
            a.selectColumn = e.selectColumn,
            a.orderContent = e.orderContent);
            this.componentSetup = $.extend(this.componentSetup, a);
            this.basefields = {
                name: "\u540d\u79f0",
                creator: "\u521b\u5efa\u4eba",
                startDate: "\u8d77\u59cb\u65f6\u95f4",
                endDate: "\u7ed3\u675f\u65f6\u95f4",
                allDay: "\u662f\u5426\u5168\u5929",
                repeat: "\u662f\u5426\u91cd\u590d",
                result: "\u91cd\u590d\u7ed3\u679c",
                particis: "\u53c2\u4e0e\u4eba",
                place: "\u5730\u70b9",
                agendacontent: "\u65e5\u7a0b\u8be6\u60c5",
                secret: "\u516c\u5f00\u7a0b\u5ea6"
            };
            this.tpl = h.get("agendacomponent", {
                isMobileForm: this.isMobileForm
            });
            this.componentModel = new g
        },
        setShowfields: function(e) {
            this.componentSetup.showfields = e
        },
        setNewSortColumn: function(e) {
            this.componentSetup.newSortColumn = e
        },
        setSelectColumn: function(e) {
            this.componentSetup.selectColumn = e
        },
        setOrderContent: function(e) {
            this.componentSetup.orderContent = e
        },
        render: function(e) {
            var a = this
              , c = $(this.tpl).siblings("#form-agenda");
            if (1 == e.parents("div[componentKey\x3d'TableLayout']").length || 1 == e.parents("div[componentKey\x3d'ColumnPanel']").length)
                e.removeClass("field-hoz"),
                this.componentSetup.titleLayout = "";
            this.componentModel.generatorId(function(c) {
                a.componentSetup.tempId = c.generatorId;
                e.attr("tempId", c.generatorId)
            });
            m.prototype.render.call(this, e, c);
            e.html(c.html())
        },
        renderEditPreview: function(e, a) {
            var c = $(this.tpl).siblings("#form-agenda");
            m.prototype.renderEditPreview.call(this, e, c);
            a ? e.replaceWith(c) : e.append(c)
        },
        renderEditor: function() {
            var e = this
              , a = $(this.tpl).siblings("#editor-agenda")
              , c = !1;
            if ("true" == this.componentSetup.isUnique || 1 == this.componentSetup.isUnique)
                c = !0;
            a.find("#isUnique").attr("checked", c);
            if (1 == $("#widget-control .field-active").parents("div[componentKey\x3d'TableLayout']").length || 1 == $("#widget-control .field-active").parents("div[componentKey\x3d'ColumnPanel']").length)
                $("#widget-control .field-active").removeClass("field-hoz"),
                this.componentSetup.titleLayout = "";
            a.find(".j_showField .j_agenda-field-ul").empty();
            var d = this.componentSetup.showfields;
            if (d && 0 < d.length) {
                for (c = 0; c < d.length; c++) {
                    var f = d[c]
                      , l = a.find(".j_clone .j_agenda-field-li").clone();
                    l.find("#" + f).attr("selected", "selected");
                    a.find(".j_showField .j_agenda-field-ul").append(l)
                }
                a.find(".j_showField").removeClass("hide");
                a.find(".j_batch_edit").removeClass("hide");
                a.find(".j_cardConf").addClass("hide")
            }
            m.prototype.renderEditor.call(this, a);
            $("#editor-component").html(a.html());
            new b({
                remote: "/agendas/searchAgendas.json",
                entity: "agenda",
                changeValue: function() {
                    e.setDefaultValue()
                }
            });
            if ((a = this.componentSetup.content) && 0 < a.length)
                for (d = $("#editor-component").find(".js_entity_container"),
                c = 0; c < a.length; c++)
                    f = {
                        id: a[c].optionId,
                        name: a[c].content
                    },
                    l = $('\x3cspan name\x3d"js_entity_item" class\x3d"js_entity_item employee-item j_component"\x3e\x3ca data-id\x3d"' + f.id + '" data-module\x3d"" id\x3d' + f.id + ' class\x3d"entitybox-toggle" title\x3d"' + f.name + '"\x3e' + f.name + '\x3c/a\x3e\x3ca class\x3d"close js_deleteItem" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e'),
                    l.data("obj", f),
                    d.append(l)
        },
        setDefaultValue: function() {
            var e = $("#editor-component").find(".js_entity_container .js_entity_item")
              , a = [];
            0 < e.length && e.each(function(e) {
                var c = $(this).data("obj");
                a[e] = {
                    optionId: c.id,
                    content: c.name
                }
            });
            this.componentSetup.content = a
        },
        renderPreview: function(e, a, c, b, d) {
            var f = $(this.tpl);
            b = null;
            (b = $("body").find("#formTenantKey").val()) ? b = b.toUpperCase() : null != TEAMS.currentTenant && (b = TEAMS.currentTenant.tenantKey.toUpperCase());
            if ($("body").find("#scanReport").val() || null != TEAMS.currentUser && TEAMS.currentTenant.tenantKey.toUpperCase() == b)
                if (b = this.getCurrentModuleIsPay(d),
                0 == b || "false" == b) {
                    d = formPlugin.moduleIsPay("calendar");
                    var l = $('\x3cspan class\x3d"employee-item"\x3e\u60a8\u7684\u56e2\u961f\u76ee\u524d\u662f\u514d\u8d39\u7248\u672c\uff0c\u4e0d\u652f\u6301\u6b64\u529f\u80fd\uff01\x3c/span\x3e');
                    "mobile" != window.systemInfo_form ? (b = f.siblings("#preview-agenda"),
                    d || (b.find(".js_agendaitem_container").empty().append(l),
                    b.find(".js_form-agenda-add").addClass("hide"),
                    b.find(".typeahead-wrapper").remove())) : (b = f.siblings("#mobile-preview"),
                    d || b.find(".js_agendaitem_container").removeClass("agenda-seleted").empty().append(l))
                } else
                    b = "mobile" != window.systemInfo_form ? f.siblings("#preview-agenda") : f.siblings("#mobile-preview");
            else
                b = f.siblings("#noagenda-preview"),
                b.find(".field_message_js").attr("cid", this.cid);
            if ((f = TEAMS.disableModules) && 0 < f.length)
                for (d = 0; d < f.length; d++)
                    if (l = f[d],
                    l.module && "calendar" == l.module) {
                        b.addClass("hide");
                        break
                    }
            b.find(".widget-title .widget-title_js").text(this.componentSetup.title);
            "true" != this.componentSetup.isHideTitle && 1 != this.componentSetup.isHideTitle || b.addClass("field-notitle").find(".widget-title .widget-title_js").addClass("hide");
            "true" != this.componentSetup.required && 1 != this.componentSetup.required || b.find(".widget-title .widget-required_js").text(" *");
            "" != this.componentSetup.describe && b.find(".field-description").text(this.componentSetup.describe).show();
            b.find(".check_js").data("componentData", this).attr("id", this.componentSetup.fieldId + this.cid).attr("name", this.componentSetup.fieldId).attr("cid", this.cid);
            b.attr("fieldId", this.componentSetup.fieldId).attr("id", "field_" + (this.componentSetup.fieldId || this.componentSetup.tempId));
            "mobile" == window.systemInfo_form && b.find(".agenda-seleted").attr("id", this.componentSetup.fieldId);
            f = this.componentSetup.isUnique;
            if ("true" == f || 1 == f)
                "mobile" != window.systemInfo_form ? b.find("#searchagenda").removeAttr("data-multi") : b.find(".js_agendaitem_container").attr("data-multi", "false");
            b.addClass(this.componentSetup.titleLayout);
            "true" != this.componentSetup.isDefault && 1 != this.componentSetup.isDefault || a || (a = this.componentSetup.content) && 0 < a.length && null != TEAMS.currentUser && this.setValue(b, {
                dataOptions: a
            });
            if (c || "true" == c)
                "mobile" != window.systemInfo_form ? this.readOnly(b, !0) : b.find(".js_agendaitem_container").removeClass("agenda-seleted").text("");
            if ("true" == this.componentSetup.isReadOnly || 1 == this.componentSetup.isReadOnly)
                "mobile" != window.systemInfo_form ? this.readOnly(b, !0) : (b.find(".js_agendaitem_container").removeClass("agenda-seleted"),
                (a = this.componentSetup.content) && 0 != a.length || b.find(".js_agendaitem_container").text(""));
            this.getValue(b);
            this.el = e;
            e.append(b)
        },
        getCurrentModuleIsPay: function(e) {
            var a = !1;
            e && (a = formPlugin.moduleIsPay(e));
            return a
        },
        renderStatSearch: function(e) {
            var a = this
              , c = $(this.tpl)
              , b = e.parentEl
              , d = e.container
              , f = null
              , l = e.fieldId
              , g = e.subFormId
              , h = e.filterEl
              , m = e.fieldTitle
              , n = e.condition
              , x = e.ids
              , C = e.term
              , B = b.find(".j_formField-select select").find("option:selected").attr("module") || e.module;
            if ("mobile" != window.systemInfo_form) {
                f = c.siblings("#statsearch-entity");
                f.find(".control-btn").attr("mod", B);
                if (x)
                    for (f.find(".entity-container").empty(),
                    m = 0; m < x.length; m++)
                        e = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d"' + x[m].id + '" title\x3d"' + x[m].text + '"\x3e' + x[m].text + "\x3c/a\x3e\x3c/span\x3e",
                        f.find(".entity-container").append(e);
                C && f.find("select:first option[value\x3d" + C + "]").attr("selected", "true");
                x = (new Date).getTime();
                f.find(".j_entityContainer").attr("id", "j_agenda" + x);
                b.attr("class", "sch-group j_formFieldSearchGroup");
                b.find(".j_formField-condition").html(f);
                if ("biaoge" == B) {
                    var D = $(d + " #j_agenda" + x + " #typeahead-agenda");
                    D.attr("fieldId", l).attr("pageNo", "1").attr("pageSize", "10");
                    D.parents(".j_entityContainer").find(".typeahead-search").attr("url", "/formdata/queryRelevanceDataOptions.json").attr("fieldId", l);
                    window.typeahead && window.typeahead.init && window.typeahead.init({
                        el: d + " #j_agenda" + x + " #typeahead-agenda",
                        remote: "/formdata/queryRelevanceDataOptions.json",
                        callback: function(e) {
                            if (e && !$.isEmptyObject(e)) {
                                var c = D.parents(".j_entityContainer").find(".j_selected");
                                a.renderTypeheader(c, e)
                            }
                        }
                    })
                }
            } else
                f = c.siblings("#statsearch-agenda-mobile"),
                n && (f.find(".j_condition").find('option[value\x3d"' + n + '"]').attr("selected", !0),
                "null" != n && "notnull" != n || f.find(".j_control").hide()),
                h && (f.find("#seleted-list").empty(),
                h.find(".j_filterList .selectd #comp-val span").each(function() {
                    var a = $(this).attr("optionId")
                      , e = $(this).text()
                      , c = $("\x3cspan\x3e\x3c/span\x3e");
                    c.attr("id", a).text(e);
                    f.find("#seleted-list").append(c)
                })),
                d = {},
                d.fieldId = l,
                d.pageNo = 1,
                d.pageSize = "20",
                d.module = B,
                a.searchAgenda(d, f, l, m, b, g),
                b.off("change", "#statsearch-agenda-mobile .j_condition").on("change", "#statsearch-agenda-mobile .j_condition", function() {
                    var a = $(this).val();
                    "null" == a || "notnull" == a ? b.find("#statsearch-agenda-mobile .j_control").hide() : b.find("#statsearch-agenda-mobile .j_control").show()
                }),
                b.off("tap", "#statsearch-agenda-mobile .j_optionli").on("tap", "#statsearch-agenda-mobile .j_optionli", function() {
                    var a = $(this);
                    a.hasClass("selected") ? a.removeClass("selected") : a.addClass("selected");
                    var e = a.find(".j_optionname").text()
                      , a = a.attr("id")
                      , e = '\x3cspan id\x3d"' + a + '"\x3e' + e + "\x3c/span\x3e";
                    0 < b.find("#statsearch-agenda-mobile #seleted-list #" + a).length ? b.find("#statsearch-agenda-mobile #seleted-list #" + a).remove() : b.find("#statsearch-agenda-mobile #seleted-list").append(e)
                }),
                b.off("tap", "#statsearch-agenda-mobile .j_more").on("tap", "#statsearch-agenda-mobile .j_more", function() {
                    var e = $(this)
                      , c = e.attr("pageNo")
                      , d = e.attr("fieldId")
                      , e = e.attr("title")
                      , k = {};
                    k.fieldId = d;
                    k.pageSize = "20";
                    k.pageNo = c;
                    k.module = B;
                    a.searchAgenda(k, f, d, e, b, g)
                })
        },
        renderTypeheader: function(e, a) {
            var c = a.name
              , b = a.id;
            if (c && b) {
                var d = '\x3cspan id\x3d"' + b + '" class\x3d"entity-item j_entity_item" name\x3d"j_entity_item"\x3e\x3ca title\x3d"' + c + '" id\x3d"' + b + '" class\x3d"entitybox-toggle" data-module\x3d"agenda" data-value\x3d"' + b + '" data-id\x3d"' + b + '"\x3e' + c + "\x3c/a\x3e\x3c/span\x3e";
                e.find(".entity-item").each(function(a) {
                    b == $(this).find("a").attr("id") && (d = null)
                });
                e.append(d);
                e.find(".j_entity_item").data("object", a)
            }
        },
        searchAgenda: function(e, a, c, b, d, f) {
            $.ajax({
                type: TEAMS.ajaxMethod,
                url: "freeform/queryFormDataOptions.json",
                dataType: "json",
                data: e,
                success: function(e) {
                    var l = e.dataOptionPage;
                    if (0 == l.totalCount)
                        a.find(".j_noresult").removeClass("hide"),
                        a.find(".eui-cells").addClass("hide");
                    else
                        for (l.hasNext && a.find(".j_more").removeClass("hide").attr("pageNo", l.pageNo + 1).attr("fieldId", c).attr("title", b),
                        e = l.result,
                        1 == l.pageNo && a.find(".j_optionUl").empty(),
                        a.find("#seleted-list").attr("fieldId", c),
                        l = 0; l < e.length; l++) {
                            var g = e[l]
                              , h = g.content
                              , g = g.optionId
                              , m = a.find("#li-clone li").clone();
                            0 < a.find("#seleted-list").find("#" + g).length && m.addClass("selected");
                            m.find(".j_optionname").text(h);
                            m.attr("id", g);
                            a.find(".j_optionUl").append(m)
                        }
                    d.find("#component-div").html(a);
                    d.find(".j_comp-ok").attr("comKey", "AgendaComponent").attr("fieldId", c).attr("title", b).attr("subFormId", f)
                }
            })
        },
        submitCheck: function(e, a) {
            var c = this.check(e);
            a(c)
        },
        checkEvents: function(e) {
            var a = this
              , b = a.el || $(document)
              , l = a.componentSetup.fieldId + this.cid
              , g = a.componentSetup.newSortColumn
              , h = a.componentSetup.selectColumn
              , m = a.componentSetup.orderContent
              , w = a.componentSetup.isAddForRelation;
            (new this.agendaAhead({})).initAhead(l, g, h, m, w);
            var v = a.componentSetup.isUnique;
            if ("mobile" == window.systemInfo_form)
                b.on("click", "#" + l + " .agenda-seleted", function(e) {
                    e = $(this).attr("data-module");
                    var b = $(this).attr("data-multi")
                      , f = $(this).attr("data-noempty") && "true" == $(this).attr("data-noempty") ? !0 : !1
                      , k = $(this).parents(".j_page-view")
                      , g = k.attr("id")
                      , h = $(this);
                    if (!$(this).parents(".j_formpreview").hasClass("form-noedit")) {
                        var r = $("#" + l + " .agenda-seleted .j_agenda_detail")
                          , q = [];
                        r && 0 < r.length && r.each(function(a) {
                            a = $(this).find(".j_agenda").attr("id");
                            var e = $(this).find(".j_agenda").text();
                            q.push({
                                name: e,
                                id: a,
                                module: "agenda"
                            })
                        });
                        "true" == v || 1 == v ? (h = new d,
                        h.render("mb", {
                            targetEl: $(this),
                            module: e,
                            multi: b,
                            preEl: "#" + g,
                            noempty: f,
                            seletedList: q,
                            showfields: a.componentSetup.showfields,
                            order: m
                        })) : 0 == q.length ? (h = new d,
                        h.render("mb", {
                            targetEl: $(this),
                            module: e,
                            multi: b,
                            preEl: "#" + g,
                            noempty: f,
                            seletedList: q,
                            showfields: a.componentSetup.showfields,
                            order: m
                        })) : (new c({
                            targetEl: h,
                            module: e,
                            multi: b,
                            preEl: "#" + g,
                            noempty: f,
                            seletedList: q,
                            showfields: a.componentSetup.showfields,
                            order: m
                        })).render();
                        k.addClass("hide")
                    }
                });
            b.off("entitySelected", "#" + l + " #searchagenda").on("entitySelected", "#" + l + " #searchagenda", function(e) {
                var c = $("#" + l);
                1 != v && "true" != v || $("#" + l + " .js_agendaitem_container").empty();
                for (var b = 1; b < arguments.length; b++)
                    c.parents(".field_js").find(".form-error").text(""),
                    c.parents(".field_js").find(".form-error").hide(),
                    a.renderSelectItem(l, arguments[b], a.componentSetup.showfields, c);
                a.triggerFillRelate(c)
            });
            b.on("click", "#" + l + " #searchagenda", function(e) {
                window.abposview && window.abposview.remove();
                e.stopPropagation();
                $("#" + l + " .control-input").trigger("focusout", "tt");
                var c = [];
                (e = $("#" + l + " .js_agendaitem_container .j_agenda_detail")) && 0 < e.length && e.each(function(a) {
                    a = $(this).find(".j_agenda").attr("id");
                    var e = $(this).find(".j_agenda").text()
                      , b = $(this).find(".j_agenda").data("agenda");
                    null == b && (b = {
                        name: e,
                        id: a
                    });
                    c.push({
                        name: e,
                        id: a,
                        agenda: b
                    })
                });
                e = $(this);
                (new f).render("pc", {
                    targetEl: e,
                    keyword: "",
                    isUnique: v,
                    seletedList: c,
                    selectColumn: a.componentSetup.selectColumn,
                    order: a.componentSetup.orderContent,
                    isAddForRelation: w
                })
            });
            b.on("mouseenter.typeahead", "#" + l + " .typeahead-wrapper", function(a) {
                $(this).data("enter", !0)
            }).on("mouseleave.typeahead", "#" + l + " .typeahead-wrapper", function(a) {
                $(this).data("enter", !1)
            });
            b.on("click", "#" + l + " .control-btn", function(a) {
                a.stopPropagation();
                $(this).addClass("hide");
                $(this).prev(".typeahead-wrapper").removeClass("hide");
                $(this).prev(".typeahead-wrapper").find(".control-input").focus()
            });
            b.on("focusout", "#" + l + " .control-input", function(a, e) {
                var c = $(this).parents(".typeahead-wrapper");
                c.data("enter") && "tt" != e || (c.addClass("hide"),
                c.next(".control-btn").removeClass("hide"))
            });
            b.on("click.tt", "#" + l + " #searchList\x3ep", function() {
                var e = $("#" + l);
                e.parents(".field_js").find(".form-error").text("");
                e.parents(".field_js").find(".form-error").hide();
                var c = a.componentSetup.showfields
                  , b = a.componentSetup.isUnique;
                "true" != b && 1 != b || e.find(".js_agendaitem_container").empty();
                if ($(this).hasClass("creat-new")) {
                    var d = $(this).attr("title");
                    if (null == d || "" == d)
                        return;
                    b = {};
                    b.title = d;
                    b.content = "";
                    b.place = "";
                    d = new Date;
                    b.start = d.getTime();
                    b.end = Date.create(d.format("{yyyy}-{MM}-{dd}") + " 23:59").getTime();
                    b.allDay = !0;
                    b.visibleType = "normal";
                    b.repeat = !1;
                    b.frequency = 0;
                    d = {};
                    d.webAgenda = b;
                    $.ajax({
                        contentType: "application/json",
                        type: TEAMS.ajaxMethod,
                        async: !1,
                        url: "/agenda.json",
                        dataType: "json",
                        data: JSON.stringify(d),
                        success: function(b) {
                            b && b.message || (b = b.agenda,
                            b.secret = "normal",
                            a.renderSelectItem(l, b, c, e))
                        }
                    })
                } else
                    b = $(this).data("agenda"),
                    a.renderSelectItem(l, b, c, e);
                a.triggerFillRelate(e)
            });
            b.on("click", "#" + l + " .js_deleteAgenda", function() {
                var c = $(this).parents("#" + l)
                  , b = a.componentSetup.showfields;
                null == b || 0 == b.length ? $(this).parent().remove() : $(this).parent().parent().parent().remove();
                a.triggerFillRelate(c);
                c = a.check(c, "change");
                e(c)
            });
            "mobile" == window.systemInfo_form && (b.on("objsComfirm", "#" + l + " .agenda-seleted", function(e, c) {
                var b = $("#" + l + " .js_agendaitem_container")
                  , d = a.componentSetup.isUnique;
                b.text("");
                b.parents("#field_" + a.componentSetup.fieldId).find(".form-error").text("");
                "true" != d && 1 != d || b.empty();
                if (0 < c.objs.length) {
                    var d = c.objs, f;
                    for (f in d) {
                        var k = d[f];
                        if (k) {
                            var g = $("\x3cspan id\x3d" + k.id + ' class\x3d"j_agenda_detail j_component employee-item j_agenda_detail"\x3e\x3ca id\x3d' + k.id + ' data-module\x3d"agenda" data-value\x3d' + k.id + " data-id\x3d" + k.id + ' class\x3d"j_agenda entitybox-toggle"\x3e' + k.name + "\x3c/a\x3e\x3c/span\x3e");
                            b.append(g)
                        }
                    }
                } else
                    k = c.objs,
                    g = $("\x3cspan id\x3d" + k.id + ' class\x3d"j_agenda_detail j_component employee-item j_agenda_detail"\x3e\x3ca id\x3d' + k.id + ' data-module\x3d"agenda" data-value\x3d' + k.id + " data-id\x3d" + k.id + ' class\x3d"j_agenda entitybox-toggle"\x3e' + k.name + "\x3c/a\x3e\x3c/span\x3e"),
                    0 == k.length ? b.html('\x3cdiv class\x3d"widget-link-holder"\x3e\x3ci class\x3d"icon-plus2"\x3e\x3c/i\x3e\u9009\u62e9\u65e5\u7a0b\x3c/div\x3e') : b.append(g);
                a.triggerFillRelate(b)
            }),
            b.on("deleteObj", "#" + l + " .agenda-seleted", function(e, c) {
                var b = $("#" + l + " .js_agendaitem_container");
                b.find('span[id\x3d"' + c + '"]').remove();
                0 == b.find("span").length && b.html('\x3cdiv class\x3d"widget-link-holder"\x3e\x3ci class\x3d"icon-plus2"\x3e\x3c/i\x3e\u9009\u62e9\u65e5\u7a0b\x3c/div\x3e');
                a.triggerFillRelate(b)
            }))
        },
        autoSaveEvents: function(e) {
            var a = this
              , c = a.el || $(document)
              , b = a.componentSetup.fieldId + this.cid;
            c.on("click", "#" + b + " .js_deleteAgenda", function() {
                a.saveComponentValue(c.find("#" + b), e)
            });
            if ("mobile" == window.systemInfo_form)
                c.on("objsComfirm", "#" + b + " .agenda-seleted", function(c, b) {
                    a.saveComponentValue($(this), e)
                });
            else
                c.on("click", "#" + b + " #searchList\x3ep", function() {
                    a.saveComponentValue($(this), e)
                }),
                c.on("entitySelected", "#" + b + " #searchagenda", function(c) {
                    a.saveComponentValue($(this), e)
                })
        },
        renderSelectItem: function(e, a, c, b) {
            if (!(0 < b.find(".js_agendaitem_container").find(".j_agenda[id\x3d'" + a.id + "']").length))
                if (null == c || 0 == c.length)
                    c = '\x3cspan id\x3d"' + a.id + '" name\x3d"j_agenda_detail" class\x3d"j_agenda_detail j_component employee-item"\x3e\x3ca id\x3d"' + a.id + '" data-id\x3d"' + a.id + '" data-module\x3d"agenda" class\x3d"entitybox-toggle j_agenda" title\x3d"' + a.name + '"\x3e' + a.name + '\x3c/a\x3e\x3ca class\x3d"close js_deleteAgenda" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e',
                    (e = $("#" + e + " .js_agendaitem_container .j_agenda_detail")) && e.each(function(e) {
                        a.id == $(this).find(".j_agenda").attr("id") && $(this).remove()
                    }),
                    b.find(".js_agendaitem_container").append(c),
                    b.find(".js_agendaitem_container").find(".j_agenda[id\x3d'" + a.id + "']").data("agenda", a);
                else {
                    var d = b.find(".j_agenda_detail_clone .j_agenda_detail").clone();
                    d.attr("id", a.id).attr("data-value", a.id).attr("data-id", a.id);
                    d.find(".j_agenda").attr("id", a.id).text(a.name).attr("data-original-title", a.name);
                    d.find(".j_agenda").data("agenda", a);
                    for (var f = 0; f < c.length; f++) {
                        var l = c[f]
                          , g = b.find(".j_agenda_detail_clone .j_field").clone();
                        g.attr("id", l);
                        g.find(".j_field_title").text(this.basefields[l]);
                        if ("name" == l || "place" == l)
                            g.find(".j_field_value").prop("title", a[l] ? a[l] : "").text(a[l] ? a[l] : "");
                        else if ("agendacontent" == l)
                            g.find(".j_field_value").prop("title", a.content ? a.content : "").text(a.content ? a.content : "");
                        else if ("creator" == l)
                            a.creator && a.creator.username ? g.find(".j_field_value").prop("title", a.creator.username).text(a.creator.username) : g.find(".j_field_value").prop("title", "").text("");
                        else if ("startDate" == l || "endDate" == l)
                            g.find(".j_field_value").prop("title", a[l] ? Date.create(a[l]).format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}") : "").text(a[l] ? Date.create(a[l]).format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}") : "");
                        else if ("allDay" == l || "repeat" == l) {
                            var h = ""
                              , h = 1 == a[l] || "true" == a[l] ? "\u662f" : "\u5426";
                            g.find(".j_field_value").prop("title", h).text(h)
                        } else if ("result" == l)
                            (l = a.repeatSetting) && l.result && g.find(".j_field_value").prop("title", l.result).text(l.result);
                        else if ("particis" == l) {
                            h = a.particis;
                            l = "";
                            if (h && (h = h.split(",")) && 0 < h.length) {
                                for (var m = 0; m < h.length; m++)
                                    var n = h[m]
                                      , n = n.substring(n.indexOf("_") + 1)
                                      , l = l + n + ",";
                                l = l.substring(0, l.length - 1)
                            }
                            g.find(".j_field_value").prop("title", l).text(l)
                        } else
                            "secret" == l && (h = "",
                            "self" == a[l] ? h = "\u4ec5\u81ea\u5df1\u53ef\u89c1" : "normal" == a[l] ? h = "\u4e0a\u7ea7\u53ef\u89c1" : "all" == a[l] && (h = "\u516c\u5f00"),
                            g.find(".j_field_value").prop("title", h).text(h));
                        d.find(".j_part .j_line").append(g)
                    }
                    d.find(".j_title").append('\x3ca class\x3d"close js_deleteAgenda" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e');
                    $("#" + e + " .js_agendaitem_container").append(d)
                }
        },
        agendaAhead: Backbone.View.extend({
            defaults: function() {
                this.remote = this.suggestion = "";
                this.entity = "agenda";
                this.tpl = h.get("agendacomponent")
            },
            initAhead: function(e, a, c, b, d) {
                this.defaults();
                this.fieldId = e;
                this.newSortColumn = a;
                this.selectColumn = c;
                this.orderContent = b;
                this.isAddForRelation = d;
                this.$continer = $("#" + this.fieldId);
                this._htmlEvents()
            },
            _htmlEvents: function() {
                var e = this
                  , a = e.$continer
                  , c = $("#" + e.fieldId + " #typeahead-agenda");
                c.off("focus.tt").on("focus.tt", function(a) {
                    e._search($(this))
                });
                c.off("click.tt").on("click.tt", function(a) {
                    a.stopPropagation()
                });
                c.off("keyup.tt").on("keyup.tt", function(b) {
                    b = b.which;
                    0 < $("body").find("#form-abposselect").length && (a = $("body").find("#form-abposselect").find(".field_js"));
                    13 == b ? (a.find("#agenda-typeahead-div p.active").trigger("click.tt"),
                    window.abposview && window.abposview.remove()) : 27 == b ? (c.trigger("focusout", "tt"),
                    window.abposview && window.abposview.remove()) : 38 == b ? (b = $("#agenda-typeahead-div p.active"),
                    1 > b.length ? a.find("#agenda-typeahead-div p").last().addClass("active") : (b.removeClass("active"),
                    (0 < b.prev().length ? b.prev() : a.find("#agenda-typeahead-div p").last()).addClass("active"))) : 40 == b ? (b = a.find("#agenda-typeahead-div p.active"),
                    1 > b.length ? a.find("#agenda-typeahead-div p").first().addClass("active") : (b.removeClass("active"),
                    (0 < b.next().length ? b.next() : a.find("#agenda-typeahead-div p").first()).addClass("active"))) : e._search($(this))
                });
                a.find("#agenda-typeahead-div").off("mouseenter.tt", "p").on("mouseenter.tt", "p", function() {
                    0 < $("body").find("#form-abposselect").length && (a = $("body").find("#form-abposselect").find(".field_js"));
                    $(this).addClass("active");
                    a.find("#agenda-typeahead-div p.active").removeClass("active")
                });
                a.off("click.tt", "#agenda-typeahead-div p").on("click.tt", "#agenda-typeahead-div p", function(a) {
                    c.trigger("focusout", "tt")
                })
            },
            _search: function(e) {
                var a = this
                  , c = a.$continer
                  , b = $.trim(e.val());
                b == e.attr("placeholder") && (b = "");
                c.find("#agenda-typeahead-div #searchList").html("");
                0 < $("body").find("#form-abposselect").length ? ($("body").find("#form-abposselect").find(".field_js").find("#agenda-typeahead-div .loading_small").show(),
                c.find("#agenda-typeahead-div .loading_small").hide()) : c.find("#agenda-typeahead-div .loading_small").show();
                window.abposview && window.abposview.remove();
                e = {};
                c = {};
                c.property = a.orderContent.property;
                c.direction = a.orderContent.direction;
                e.order = c;
                e.pageSize = "10";
                e.pageNo = "1";
                e.keywords = b;
                $.ajax({
                    contentType: "application/json",
                    type: TEAMS.ajaxMethod,
                    url: "/agendas/searchAgendas.json",
                    dataType: "json",
                    data: JSON.stringify(e),
                    success: function(e) {
                        e.message && e.message || a.renderAgendas(e.page.result, b)
                    }
                })
            },
            renderAgendas: function(e, a) {
                var c = this.$continer;
                0 < $("body").find("#form-abposselect").length ? $("body").find("#form-abposselect").find(".field_js").find("#agenda-typeahead-div .loading_small").hide() : c.find("#agenda-typeahead-div .loading_small").hide();
                if (null != e && 0 < e.length)
                    for (var b = 0; b < e.length; b++) {
                        var d = e[b]
                          , f = d.name
                          , g = $(this.tpl).siblings("#agenda-clone").find(".j_agenda").clone();
                        g.text(f);
                        g.attr("title", f).attr("id", d.id);
                        g.data("agenda", d);
                        c.find("#agenda-typeahead-div #searchList").append(g).show()
                    }
                else {
                    if (null == a || "" == a)
                        return;
                    "false" != this.isAddForRelation && 0 != this.isAddForRelation && (g = $('\x3cp class\x3d"agenda creat-new"\x3e\x3ci class\x3d"icon-plus-thin"\x3e\x3c/i\x3e \u6dfb\u52a0\u65e5\u7a0b\uff1a' + a + "\x3c/p\x3e"),
                    g.attr("title", a),
                    c.find("#agenda-typeahead-div #searchList").find(".creat-new").remove(),
                    c.find("#agenda-typeahead-div #searchList").append(g))
                }
                c.find("#agenda-typeahead-div #searchList").show();
                window.abposview && window.abposview.remove();
                window.abposview = new l({
                    continer: c,
                    entity: this.entity
                });
                window.abposview.render()
            }
        }),
        check: function(e) {
            var a = $(e).find(".js_agendaitem_container .j_agenda_detail").length
              , c = {};
            c.element = e;
            0 != a || "true" != this.componentSetup.required && 1 != this.componentSetup.required || (c.message = this.componentSetup.title + "\u4e0d\u80fd\u4e3a\u7a7a");
            return c
        },
        getValue: function(e, a) {
            var c = {
                formField: {
                    id: this.componentSetup.fieldId
                }
            }
              , b = e.find(".js_agendaitem_container .j_agenda_detail");
            if (0 < b.length) {
                var d = [];
                b.each(function(a) {
                    var e = $(this).find(".j_agenda").attr("id")
                      , c = $(this).find(".j_agenda").text();
                    d[a] = {
                        optionId: e,
                        content: c,
                        type: "agenda"
                    }
                });
                c.dataOptions = d
            } else
                a || (c = null);
            return c
        },
        setValue: function(e, a) {
            e.find(".js_agendaitem_container").empty();
            var c = this
              , b = this.componentSetup.showfields;
            if (null != a && null != a.dataOptions) {
                for (var d = [], f = [], l = 0; l < a.dataOptions.length; l++) {
                    var g = a.dataOptions[l]
                      , h = null == g.content ? "" : g.content
                      , g = g.optionId;
                    d.push(g);
                    f.push({
                        id: g,
                        name: h
                    })
                }
                if (TEAMS.currentUser && TEAMS.currentUser.id)
                    null == b || 0 == b.length ? c.renderAgendas(f, e, b, a) : (l = {},
                    l.ids = d,
                    $.ajax({
                        contentType: "application/json",
                        type: TEAMS.ajaxMethod,
                        data: JSON.stringify(l),
                        dataType: "json",
                        async: !1,
                        url: "/agendas/searchAgendas.json",
                        success: function(d) {
                            if (!d || !d.message) {
                                d = d.page.result;
                                for (var l = [], g = 0; g < f.length; g++) {
                                    for (var h = f[g], r = !0, m = 0; m < d.length; m++) {
                                        var p = d[m];
                                        if (p.id == h.id) {
                                            l.push(p);
                                            r = !1;
                                            break
                                        }
                                    }
                                    r && l.push(h)
                                }
                                c.renderAgendas(l, e, b, a)
                            }
                        }
                    }));
                else
                    for (l = 0; l < f.length; l++)
                        d = f[l],
                        "mobile" == window.systemInfo_form && (d = $('\x3cspan href\x3d"/mobile/calendar/' + TEAMS.currentUser.id + "/" + d.id + '" id\x3d' + d.id + ' class\x3d"router j_component employee-item j_agenda_detail"\x3e\x3ca class\x3d"j_agenda" id\x3d' + d.id + "\x3e" + d.name + "\x3c/a\x3e\x3c/span\x3e"),
                        e.find(".js_agendaitem_container").append(d))
            }
        },
        renderAgendas: function(e, a, c, b) {
            for (b = 0; b < e.length; b++) {
                var d = e[b];
                if ("mobile" == window.systemInfo_form)
                    d = $('\x3cspan href\x3d"/mobile/calendar/' + TEAMS.currentUser.id + "/" + d.id + '" id\x3d' + d.id + ' class\x3d"router j_component employee-item j_agenda_detail"\x3e\x3ca class\x3d"j_agenda" id\x3d' + d.id + "\x3e" + d.name + "\x3c/a\x3e\x3c/span\x3e"),
                    a.find(".js_agendaitem_container").append(d);
                else if (null == c || 0 == c.length)
                    d = null != a.find(".js_form-agenda-add").get(0) ? '\x3cspan id\x3d"' + d.id + '" name\x3d"j_agenda_detail" class\x3d"j_agenda_detail j_component employee-item"\x3e\x3ca id\x3d"' + d.id + '" data-id\x3d"' + d.id + '" data-module\x3d"agenda" class\x3d"entitybox-toggle j_agenda" title\x3d"' + d.name + '"\x3e' + d.name + '\x3c/a\x3e\x3ca class\x3d"close js_deleteAgenda" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e' : '\x3cspan id\x3d"' + d.id + '" name\x3d"j_agenda_detail" class\x3d"j_agenda_detail j_component employee-item"\x3e\x3ca id\x3d"' + d.id + '" data-id\x3d"' + d.id + '" data-module\x3d"agenda" class\x3d"entitybox-toggle j_agenda" title\x3d"' + d.name + '"\x3e' + d.name + "\x3c/a\x3e\x3c/span\x3e",
                    a.find(".js_agendaitem_container").append(d);
                else {
                    var f = a.find(".j_agenda_detail_clone .j_agenda_detail").clone();
                    f.attr("id", d.id).attr("data-value", d.id).attr("data-id", d.id);
                    f.find(".j_agenda").attr("id", d.id).text(d.name).attr("data-original-title", d.name);
                    for (var l = 0; l < c.length; l++) {
                        var g = c[l]
                          , h = a.find(".j_agenda_detail_clone .j_field").clone();
                        h.attr("id", g);
                        h.find(".j_field_title").text(this.basefields[g]);
                        if ("name" == g || "place" == g)
                            h.find(".j_field_value").prop("title", d[g] ? d[g] : "").text(d[g] ? d[g] : "");
                        else if ("agendacontent" == g)
                            h.find(".j_field_value").prop("title", d.content ? d.content : "").text(d.content ? d.content : "");
                        else if ("creator" == g)
                            d.creator && d.creator.username ? h.find(".j_field_value").prop("title", d.creator.username).text(d.creator.username) : h.find(".j_field_value").prop("title", "").text("");
                        else if ("startDate" == g || "endDate" == g)
                            h.find(".j_field_value").prop("title", d[g] ? Date.create(d[g]).format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}") : "").text(d[g] ? Date.create(d[g]).format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}") : "");
                        else if ("allDay" == g || "repeat" == g) {
                            var m = ""
                              , m = 1 == d[g] || "true" == d[g] ? "\u662f" : "\u5426";
                            h.find(".j_field_value").prop("title", m).text(m)
                        } else if ("result" == g)
                            (g = d.repeatSetting) && g.result && h.find(".j_field_value").prop("title", g.result).text(g.result);
                        else if ("particis" == g) {
                            m = d.particis;
                            g = "";
                            if (m && (m = m.split(",")) && 0 < m.length) {
                                for (b = 0; b < m.length; b++)
                                    var n = m[b]
                                      , n = n.substring(n.indexOf("_") + 1)
                                      , g = g + n + ",";
                                g = g.substring(0, g.length - 1)
                            }
                            h.find(".j_field_value").prop("title", g).text(g)
                        } else if ("secret" == g)
                            m = "",
                            "self" == d[g] ? m = "\u4ec5\u81ea\u5df1\u53ef\u89c1" : "normal" == d[g] ? m = "\u4e0a\u7ea7\u53ef\u89c1" : "all" == d[g] && (m = "\u516c\u5f00"),
                            h.find(".j_field_value").prop("title", m).text(m);
                        else
                            continue;
                        f.find(".j_part .j_line").append(h)
                    }
                    null != a.find(".js_form-agenda-add").get(0) && f.find(".j_title").append('\x3ca class\x3d"close js_deleteAgenda" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e');
                    a.find(".js_agendaitem_container").append(f)
                }
            }
        },
        empty: function(e) {
            e.find(".js_agendaitem_container").html("")
        },
        readOnly: function(e, a) {
            var c = this.componentSetup.fieldId + this.cid
              , b = e.find('div[id\x3d"' + c + '"] span[name\x3d"js_form-agenda-add"]')
              , d = e.find('div[id\x3d"' + c + '"] .js_agendaitem_container .j_agenda_detail')
              , f = e.find('div[id\x3d"' + c + '"] .js_deleteAgenda');
            a ? (b.remove(),
            f.remove()) : b && 0 != b.length && null != b || (b = $(this.tpl).siblings("#preview-form").find('span[name\x3d"js_form-agenda-add"]'),
            e.find('div[id\x3d"' + c + '"]').find(".js_agendaitem_container").after(b),
            d.find(".j_title").append('\x3ca class\x3d"close js_deleteAgenda" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e'))
        }
    });
    u.exports = window.AgendaComponent
});
define("form/component/barcomponent", ["form/component", "form/tplutil"], function(n, y, u) {
    y = n("form/component");
    var m = n("form/tplutil");
    window.BarComponent = y.extend({
        initialize: function(h) {
            this.componentSetup = {
                componentKey: "BarComponent",
                title: "\u67f1\u72b6\u56fe",
                titleLayout: "field-hoz",
                order: 0,
                index: 0,
                fieldId: "",
                dataSetId: ""
            };
            null != h && (this.componentSetup.title = h.title,
            this.componentSetup.order = h.order,
            this.componentSetup.index = h.index,
            this.componentSetup.fieldId = h.fieldId,
            this.componentSetup.dataSetId = h.dataSetId);
            this.tpl = m.get("bar")
        },
        setTitle: function(h) {
            this.componentSetup.title = h
        },
        setTitleLayout: function(h) {
            this.componentSetup.titleLayout = h
        },
        setRelatDataTableId: function(h) {
            this.componentSetup.tableId = h
        },
        setRelatDataUnitId: function(h) {
            this.componentSetup.colId = h
        },
        setIsOrgtiqu: function(h) {
            this.componentSetup.isOrgtiqu = h
        },
        setIsOrgtiqulist: function(h) {
            this.componentSetup.isOrgtiqulist = h
        },
        setDataSetId: function(h) {
            this.componentSetup.dataSetId = h
        },
        render: function(h) {
            var g = $(this.tpl).siblings("#form-bar");
            h.attr("class", g.attr("class"));
            h.html(g.html())
        },
        renderEditor: function() {
            var h = this, g;
            h.statFields ? h.renderEditorValue() : this.componentmodel.getFormSelectFields(function(f) {
                g = $(_.template(h.tpl, f)).siblings("#editor-bar");
                h.statFields = f;
                null != f.statfields && 0 < f.statfields.length && (h.componentSetup.dataSetId = h.componentSetup.dataSetId ? h.componentSetup.dataSetId : f.statfields[0].fieldId);
                h.el = g;
                h.renderEditorValue()
            })
        },
        renderEditorValue: function() {
            var h = this.el;
            h.find("#component-title").attr("value", this.componentSetup.title);
            $("#editor-component").html(h.html());
            var g = $("#component-dataset");
            $.each(this.statFields.statfields, function() {
                var f = g.find("option:first").clone().show();
                f.val(this.fieldId).text(this.title);
                g.append(f)
            });
            $("#editor-component").find("#component-dataset").val(this.componentSetup.dataSetId)
        },
        renderPreview: function(h, g, f) {
            var d = this;
            g = $(this.tpl).siblings("#preview-bar");
            h.append(g);
            this.viewcon = g;
            this.componentmodel.getFieldStat(this.componentSetup.dataSetId, function(b) {
                d.renderBarView(d, b.fieldChartStatData)
            })
        },
        renderBarView: function(h, g) {
            var f = []
              , d = [];
            h = this;
            for (var b, c = 0, l = g.length; c < l; c++)
                f.push(g[c].name),
                d.push(g[c].total);
            0 == g.length && (f.push(""),
            d.push(""));
            b = {
                title: {
                    text: h.componentSetup.title,
                    x: "center"
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["\u6b21\u6570"],
                    x: "left"
                },
                toolbox: {
                    show: !0,
                    feature: {
                        magicType: {
                            show: !0,
                            type: ["line", "bar"]
                        },
                        restore: {
                            show: !0
                        },
                        saveAsImage: {
                            show: !0
                        }
                    }
                },
                calculable: !0,
                xAxis: [{
                    type: "category",
                    data: f
                }],
                yAxis: [{
                    type: "value"
                }],
                noDataLoadingOption: {
                    text: "\u6682\u65e0\u6570\u636e",
                    effect: "bar",
                    textStyle: {
                        fontSize: 32,
                        fontWeight: "bold"
                    }
                },
                series: [{
                    name: "\u603b\u6570",
                    type: "bar",
                    data: d,
                    markPoint: {
                        data: [{
                            type: "max",
                            name: "\u6700\u5927\u503c"
                        }, {
                            type: "min",
                            name: "\u6700\u5c0f\u503c"
                        }]
                    },
                    markLine: {
                        data: [{
                            type: "average",
                            name: "\u5e73\u5747\u503c"
                        }]
                    }
                }]
            };
            n.async("https://static.smartheer.cn/js/echarts.min.js", function() {
                var e = h.viewcon.find(".barview");
                this.barChart = echarts.init(e.get(0));
                this.barChart.setOption(b)
            })
        },
        renderEditPreview: function(h) {
            var g = $(this.tpl).siblings("#form-bar");
            g.attr("id", this.componentSetup.fieldId);
            g.data("componentData", this);
            g.addClass(this.componentSetup.titleLayout);
            h.append(g)
        },
        renderStatSearch: function(h) {
            var g = $(this.tpl).siblings("#statsearch-text")
              , f = h.value;
            f && g.find("input").val(f);
            (f = h.term) && g.find("select:first option[value\x3d" + f + "]").attr("selected", "true");
            h = h.parentEl;
            h.attr("class", "sch-group j_formFieldSearchGroup");
            h.find(".j_formField-condition").html(g)
        },
        submitCheck: function(h, g) {},
        checkEvents: function(h) {},
        check: function(h) {},
        getValue: function(h, g) {},
        setValue: function(h, g) {},
        empty: function(h) {},
        readOnly: function(h, g) {}
    });
    u.exports = window.BarComponent
});
define("form/component/mainline", "form/relatecomponent form/tplutil form/component/entityselecter form/component/relevancecontrol form/componentmodel form/abposview".split(" "), function(n, y, u) {
    var m = n("form/relatecomponent")
      , h = n("form/tplutil")
      , g = n("form/component/entityselecter")
      , f = n("form/component/relevancecontrol")
      , d = n("form/componentmodel")
      , b = n("form/abposview");
    window.Mainline = m.extend({
        initialize: function(c) {
            m.prototype.initialize.call(this, c);
            var b = {
                componentKey: "Mainline",
                title: "\u5173\u8054\u9879\u76ee",
                orderContent: "",
                filterParams: "",
                filterQueryParams: ""
            };
            null != c && (b.title = c.title,
            b.orderContent = c.orderContent,
            b.filterParams = c.filterParams,
            b.filterQueryParams = c.filterQueryParams);
            this.componentSetup = $.extend(this.componentSetup, b);
            this.componentModel = new d;
            this.tpl = h.get("mainline", {
                isMobileForm: this.isMobileForm
            })
        },
        setOrderContent: function(c) {
            this.componentSetup.osrderContent = c
        },
        setFilterParams: function(c) {
            this.componentSetup.filterParams = c
        },
        setFilterQueryParams: function(c) {
            this.componentSetup.filterQueryParams = c
        },
        render: function(c) {
            var b = this
              , e = $(this.tpl).siblings("#form-mainline");
            m.prototype.render.call(this, c, e);
            this.componentModel.generatorId(function(a) {
                b.componentSetup.tempId = a.generatorId;
                c.attr("tempId", a.generatorId)
            });
            c.html(e.html())
        },
        renderEditor: function() {
            var c = $(this.tpl).siblings("#editor-mainline");
            c.find(".j_default_container").attr("id", this.componentSetup.fieldId + this.cid);
            "true" != this.componentSetup.isUnique && 1 != this.componentSetup.isUnique || c.find("#isUnique").attr("checked", !0);
            m.prototype.renderEditor.call(this, c);
            $("#editor-component").html(c.html());
            if ((c = this.componentSetup.content) && 0 < c.length)
                for (var b = $("#editor-component").find(".js_mainlineitem_container"), e = 0; e < c.length; e++)
                    b.append('\x3cspan name\x3d"js_form-mainlineItem" class\x3d"js_form-mainlineItem j_component employee-item"\x3e\x3ca data-id\x3d"' + c[e].optionId + '" data-module\x3d"mainline" mainlineId\x3d' + c[e].optionId + ' class\x3d"entitybox-toggle" title\x3d"' + c[e].content + '"\x3e' + c[e].content + '\x3c/a\x3e\x3ca class\x3d"close js_deleteMainline" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e');
            this.selectEvents()
        },
        selectEvents: function() {
            var c = this
              , b = $("#editor-component").find("#j_default_value")
              , e = this.componentSetup.fieldId + this.cid
              , a = this.componentSetup.orderContent;
            (new this.mainlineAhead({})).initAhead({
                fieldId: e,
                el: b,
                isDefault: !0,
                orderContent: a,
                callback: function() {
                    c.setDefaultValue()
                }
            });
            b.find("#" + e + " #searchmainline").click(function() {
                var c = b.find("#" + e + " .js_mainlineitem_container .js_form-mainlineItem");
                b.find("#" + e + " .control-input").trigger("focusout", "tt");
                var d = [];
                c && 0 < c.length && c.each(function(a) {
                    a = $(this).find(".entitybox-toggle").attr("mainlineId");
                    var e = $(this).find(".entitybox-toggle").text();
                    d.push({
                        name: e,
                        id: a
                    })
                });
                var c = $(this).attr("data-entity")
                  , f = $(this)
                  , h = f.parent().find("input");
                (new g).render("pc", {
                    targetEl: f,
                    keyword: h ? h.val() : "",
                    module: c,
                    type: f.attr("data-type"),
                    isUnique: isUnique,
                    seletedList: d,
                    order: a
                })
            });
            b.off("entitySelected", "#" + e + " #searchmainline").on("entitySelected", "#" + e + " #searchmainline", function(a) {
                b.find("#" + e + " .js_mainlineitem_container").empty();
                for (var d = 1; d < arguments.length; d++) {
                    var f = arguments[d]
                      , g = $("#" + e);
                    g.parents(".field_js").find(".form-error").text("");
                    g.parents(".field_js").find(".form-error").hide();
                    var h = f.id
                      , f = f.name
                      , f = '\x3cspan name\x3d"js_form-mainlineItem" class\x3d"js_form-mainlineItem j_component employee-item"\x3e\x3ca data-id\x3d"' + h + '" data-module\x3d"mainline" mainlineId\x3d' + h + ' class\x3d"entitybox-toggle" title\x3d"' + f + '"\x3e' + f + '\x3c/a\x3e\x3ca class\x3d"close js_deleteMainline" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e'
                      , m = $("#" + e + " .js_mainlineitem_container .js_form-mainlineItem");
                    m && m.each(function(a) {
                        h == $(this).find(".entitybox-toggle").attr("mainlineId") && ($(this).remove(),
                        flag = !1)
                    });
                    g.find(".js_mainlineitem_container").append(f)
                }
                c.setDefaultValue()
            })
        },
        setDefaultValue: function() {
            var c = $("#editor-component").find(".js_mainlineitem_container .js_form-mainlineItem")
              , b = [];
            0 < c.length && c.each(function(e) {
                var a = $(this).find(".entitybox-toggle").attr("mainlineId")
                  , c = $(this).find(".entitybox-toggle").text();
                b[e] = {
                    optionId: a,
                    content: c
                }
            });
            this.componentSetup.content = b
        },
        renderPreview: function(c, b, e, a, d) {
            var f = $(this.tpl);
            a = null;
            (a = $("body").find("#formTenantKey").val()) ? a = a.toUpperCase() : null != TEAMS.currentTenant && (a = TEAMS.currentTenant.tenantKey.toUpperCase());
            if ($("body").find("#scanReport").val() || null != TEAMS.currentUser && TEAMS.currentTenant.tenantKey.toUpperCase() == a)
                if (a = this.getCurrentModuleIsPay(d),
                0 == a || "false" == a) {
                    d = formPlugin.moduleIsPay("mainline");
                    var g = $('\x3cspan class\x3d"employee-item"\x3e\u60a8\u7684\u56e2\u961f\u76ee\u524d\u662f\u514d\u8d39\u7248\u672c\uff0c\u4e0d\u652f\u6301\u6b64\u529f\u80fd\uff01\x3c/span\x3e');
                    "mobile" != window.systemInfo_form ? (a = f.siblings("#preview-mainline"),
                    d || (a.find(".js_mainlineitem_container").empty().append(g),
                    a.find(".js_form-mainline-add").addClass("hide"),
                    a.find(".typeahead-wrapper").remove())) : (a = f.siblings("#mobile-preview"),
                    d || a.find(".js_formitem_container").removeClass("mainline-seleted").empty().append(g))
                } else
                    a = "mobile" != window.systemInfo_form ? f.siblings("#preview-mainline") : f.siblings("#mobile-preview");
            else
                a = f.siblings("#nomainline-preview"),
                a.find(".field_message_js").attr("cid", this.cid);
            if ((f = TEAMS.disableModules) && 0 < f.length)
                for (d = 0; d < f.length; d++)
                    if (g = f[d],
                    g.module && "mainline" == g.module) {
                        a.addClass("hide");
                        break
                    }
            a.find(".widget-title .widget-title_js").text(this.componentSetup.title);
            "true" != this.componentSetup.isHideTitle && 1 != this.componentSetup.isHideTitle || a.addClass("field-notitle").find(".widget-title .widget-title_js").addClass("hide");
            "true" != this.componentSetup.required && 1 != this.componentSetup.required || a.find(".widget-title .widget-required_js").text(" *");
            "" != this.componentSetup.describe && a.find(".field-description").text(this.componentSetup.describe).show();
            a.find(".check_js").attr("cid", this.cid).attr("id", this.componentSetup.fieldId + this.cid).attr("name", this.componentSetup.fieldId).data("componentData", this);
            a.attr("id", "field_" + (this.componentSetup.fieldId || this.componentSetup.tempId));
            "mobile" == window.systemInfo_form && a.find(".mainline-seleted").attr("id", this.componentSetup.fieldId);
            f = this.componentSetup.isUnique;
            if ("true" == f || 1 == f)
                "mobile" != window.systemInfo_form ? a.find("#searchmainline").removeAttr("data-multi") : a.find(".js_mainlineitem_container").attr("data-multi", "false");
            a.addClass(this.componentSetup.titleLayout);
            "true" != this.componentSetup.isDefault && 1 != this.componentSetup.isDefault || b || (b = this.componentSetup.content) && 0 < b.length && null != TEAMS.currentUser && this.setValue(a, {
                dataOptions: b
            });
            if (e || "true" == e)
                "mobile" != window.systemInfo_form ? this.readOnly(a, !0) : a.find(".js_mainlineitem_container").removeClass("mainline-seleted").text("");
            if ("true" == this.componentSetup.isReadOnly || 1 == this.componentSetup.isReadOnly)
                "mobile" != window.systemInfo_form ? this.readOnly(a, !0) : (a.find(".js_mainlineitem_container").removeClass("mainline-seleted"),
                (b = this.componentSetup.content) && 0 != b.length || a.find(".js_mainlineitem_container").text(""));
            this.getValue(a);
            this.el = c;
            c.append(a)
        },
        getCurrentModuleIsPay: function(c) {
            var b = !1;
            c && (b = formPlugin.moduleIsPay(c));
            return b
        },
        renderEditPreview: function(c, b) {
            var e = $(this.tpl).siblings("#form-mainline");
            m.prototype.renderEditPreview.call(this, c, e);
            b ? c.replaceWith(e) : c.append(e)
        },
        renderStatSearch: function(c) {
            var b = this
              , e = $(this.tpl)
              , a = c.parentEl
              , d = c.fieldId
              , f = c.fieldTitle
              , g = c.subFormId
              , h = c.container
              , m = c.filterEl
              , w = c.condition
              , v = c.term
              , s = c.ids
              , n = null
              , x = a.find(".j_formField-select select").find("option:selected").attr("module") || c.module;
            if ("mobile" != window.systemInfo_form) {
                n = e.siblings("#statsearch-entity");
                if (s)
                    for (n.find(".entity-container").empty(),
                    f = 0; f < s.length; f++)
                        c = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d"' + s[f].id + '" title\x3d"' + s[f].text + '"\x3e' + s[f].text + "\x3c/a\x3e\x3c/span\x3e",
                        n.find(".entity-container").append(c);
                v && n.find("select:first option[value\x3d" + v + "]").attr("selected", "true");
                v = (new Date).getTime();
                n.find(".j_entityContainer").attr("id", "j_mainline" + v);
                a.attr("class", "sch-group j_formFieldSearchGroup");
                a.find(".j_formField-condition").html(n);
                var C = $(h + " #j_mainline" + v + " #typeahead-mainline")
                  , s = "";
                "biaoge" == x && (s = "/formdata/queryRelevanceDataOptions.json",
                C.attr("fieldId", d).attr("pageNo", "1").attr("pageSize", "10"),
                C.parents(".j_entityContainer").find(".typeahead-search").attr("url", s).attr("fieldId", d));
                window.typeahead && window.typeahead.init && window.typeahead.init({
                    el: h + " #j_mainline" + v + " #typeahead-mainline",
                    remote: s,
                    callback: function(a) {
                        if (a && !$.isEmptyObject(a)) {
                            var e = C.parents(".j_entityContainer").find(".j_selected");
                            b.renderTypeheader(e, a)
                        }
                    }
                })
            } else
                n = e.siblings("#statsearch-mainline-mobile"),
                w && (n.find(".j_condition").find('option[value\x3d"' + w + '"]').attr("selected", !0),
                "null" != w && "notnull" != w || n.find(".j_control").hide()),
                m && (n.find("#seleted-list").empty(),
                m.find(".j_filterList .selectd #comp-val span").each(function() {
                    var a = $(this).attr("optionId")
                      , e = $(this).text()
                      , c = $("\x3cspan\x3e\x3c/span\x3e");
                    c.attr("id", a).text(e);
                    n.find("#seleted-list").append(c)
                })),
                h = {},
                h.fieldId = d,
                h.pageNo = 1,
                h.module = x,
                h.pageSize = "20",
                b.searchMainline(h, n, d, f, a, g),
                a.off("change", "#statsearch-mainline-mobile .j_condition").on("change", "#statsearch-mainline-mobile .j_condition", function() {
                    var e = $(this).val();
                    "null" == e || "notnull" == e ? a.find("#statsearch-mainline-mobile .j_control").hide() : a.find("#statsearch-mainline-mobile .j_control").show()
                }),
                a.off("tap", "#statsearch-mainline-mobile .j_optionli").on("tap", "#statsearch-mainline-mobile .j_optionli", function() {
                    var e = $(this);
                    e.hasClass("selected") ? e.removeClass("selected") : e.addClass("selected");
                    var c = e.find(".j_optionname").text()
                      , e = e.attr("id")
                      , c = '\x3cspan id\x3d"' + e + '"\x3e' + c + "\x3c/span\x3e";
                    0 < a.find("#statsearch-mainline-mobile #seleted-list #" + e).length ? a.find("#statsearch-mainline-mobile #seleted-list #" + e).remove() : a.find("#statsearch-mainline-mobile #seleted-list").append(c)
                }),
                a.off("tap", "#statsearch-mainline-mobile .j_more").on("tap", "#statsearch-mainline-mobile .j_more", function() {
                    var e = $(this)
                      , c = e.attr("pageNo")
                      , d = e.attr("fieldId")
                      , e = e.attr("title")
                      , f = {};
                    f.fieldId = d;
                    f.pageNo = c;
                    f.pageSize = "20";
                    f.module = x;
                    b.searchMainline(f, n, d, e, a, g)
                })
        },
        searchMainline: function(c, b, e, a, d, f) {
            $.ajax({
                contentType: "application/json",
                type: TEAMS.ajaxMethod,
                url: "freeform/queryFormDataOptions.json",
                dataType: "json",
                data: JSON.stringify(c),
                success: function(c) {
                    var g = c.dataOptionPage;
                    if (0 == g.totalCount)
                        b.find(".j_noresult").removeClass("hide"),
                        b.find(".eui-cells").addClass("hide");
                    else
                        for (g.hasNext && b.find(".j_more").removeClass("hide").attr("pageNo", g.pageNo + 1).attr("fieldId", e).attr("title", a),
                        c = g.result,
                        1 == g.pageNo && b.find(".j_optionUl").empty(),
                        b.find("#seleted-list").attr("fieldId", e),
                        g = 0; g < c.length; g++) {
                            var h = c[g]
                              , m = h.content
                              , h = h.optionId
                              , v = b.find("#li-clone li").clone();
                            0 < b.find("#seleted-list").find("#" + h).length && v.addClass("selected");
                            v.find(".j_optionname").text(m);
                            v.attr("id", h);
                            b.find(".j_optionUl").append(v)
                        }
                    d.find("#component-div").html(b);
                    d.find(".j_comp-ok").attr("comKey", "Mainline").attr("fieldId", e).attr("title", a).attr("subFormId", f)
                }
            })
        },
        renderTypeheader: function(c, b) {
            var e = b.name
              , a = b.id;
            if (e && a) {
                var d = '\x3cspan id\x3d"' + a + '" class\x3d"entity-item j_entity_item" name\x3d"j_entity_item"\x3e\x3ca title\x3d"' + e + '" id\x3d"' + a + '" class\x3d"entitybox-toggle" data-module\x3d"mainline" data-value\x3d"' + a + '" data-id\x3d"' + a + '"\x3e' + e + "\x3c/a\x3e\x3c/span\x3e";
                c.find(".entity-item").each(function(e) {
                    a == $(this).find("a").attr("id") && (d = null)
                });
                c.append(d);
                c.find(".j_entity_item").data("object", b)
            }
        },
        checkEvents: function(c) {
            var b = this
              , e = b.el || $(document)
              , a = b.componentSetup.fieldId + this.cid
              , d = b.componentSetup.isUnique
              , h = b.componentSetup.orderContent
              , r = b.componentSetup.filterParams
              , m = b.componentSetup.isAddForRelation;
            (new this.mainlineAhead({})).initAhead({
                fieldId: a,
                el: e,
                isUnique: d,
                orderContent: h,
                filterParams: r,
                isAddForRelation: m
            });
            e.on("click", "#" + a + " .js_deleteMainline", function() {
                var d = e.find("#" + a);
                b.triggerFillRelate(d);
                d = b.check(d);
                c(d)
            });
            e.on("click", "#" + a + " #searchList\x3ep", function() {
                b.triggerFillRelate(e.find("#" + a))
            });
            var p = e.find("#" + a + " #searchmainline");
            if ("mobile" == window.systemInfo_form)
                e.on("click", "#" + a + " .mainline-seleted", function(e) {
                    e = $(this).attr("data-module");
                    var c = $(this).attr("data-multi");
                    $(this).attr("data-noempty") && $(this).attr("data-noempty");
                    var b = $(this).parents(".j_page-view")
                      , l = b.attr("id")
                      , m = $(this);
                    if (!$(this).parents(".j_formpreview").hasClass("form-noedit")) {
                        var q = $("#" + a + " .mainline-seleted .js_form-mainlineItem")
                          , p = [];
                        q && 0 < q.length && q.each(function(a) {
                            a = $(this).find(".entitybox-toggle").attr("mainlineId");
                            var e = $(this).find(".entitybox-toggle").text();
                            p.push({
                                name: e,
                                id: a,
                                module: "mainline"
                            })
                        });
                        "true" == d || 1 == d ? (q = new g,
                        q.render("mb", {
                            targetEl: m,
                            module: e,
                            multi: c,
                            preEl: "#" + l,
                            seletedList: p,
                            order: h,
                            filterParams: r
                        })) : 0 == p.length ? (q = new g,
                        q.render("mb", {
                            targetEl: m,
                            module: e,
                            multi: c,
                            preEl: "#" + l,
                            seletedList: p,
                            order: h,
                            filterParams: r
                        })) : (new f({
                            targetEl: m,
                            module: e,
                            multi: c,
                            preEl: "#" + l,
                            seletedList: p,
                            order: h,
                            filterParams: r
                        })).render();
                        b.addClass("hide")
                    }
                });
            else
                p && 0 < p.size() && p.click(function() {
                    var c = e.find("#" + a + " .js_mainlineitem_container .js_form-mainlineItem");
                    e.find("#" + a + " .control-input").trigger("focusout", "tt");
                    var b = [];
                    c && 0 < c.length && c.each(function(a) {
                        a = $(this).find(".entitybox-toggle").attr("mainlineId");
                        var e = $(this).find(".entitybox-toggle").text();
                        b.push({
                            name: e,
                            id: a
                        })
                    });
                    var c = $(this).attr("data-entity")
                      , f = $(this)
                      , l = f.parent().find("input");
                    (new g).render("pc", {
                        targetEl: f,
                        keyword: l ? l.val() : "",
                        module: c,
                        type: f.attr("data-type"),
                        isUnique: d,
                        seletedList: b,
                        order: h,
                        filterParams: r,
                        isAddForRelation: m
                    })
                });
            e.off("entitySelected", "#" + a + " #searchmainline").on("entitySelected", "#" + a + " #searchmainline", function(c) {
                var f = $("#" + a);
                1 != d && "true" != d || e.find("#" + a + " .js_mainlineitem_container").empty();
                for (var g = 1; g < arguments.length; g++) {
                    var h = arguments[g];
                    f.parents(".field_js").find(".form-error").text("").hide();
                    var z = h.id
                      , h = h.name
                      , h = '\x3cspan name\x3d"js_form-mainlineItem" class\x3d"js_form-mainlineItem j_component employee-item"\x3e\x3ca data-id\x3d"' + z + '" data-module\x3d"mainline" mainlineId\x3d' + z + ' class\x3d"entitybox-toggle" title\x3d"' + h + '"\x3e' + h + '\x3c/a\x3e\x3ca class\x3d"close js_deleteMainline" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e'
                      , r = $("#" + a + " .js_mainlineitem_container .js_form-mainlineItem");
                    r && r.each(function(a) {
                        z == $(this).find(".entitybox-toggle").attr("mainlineId") && ($(this).remove(),
                        flag = !1)
                    });
                    f.find(".js_mainlineitem_container").append(h)
                }
                b.triggerFillRelate(f)
            });
            "mobile" == window.systemInfo_form && (e.on("objsComfirm", "#" + a + " .mainline-seleted", function(e, c) {
                var d = $("#" + a + " .js_mainlineitem_container")
                  , f = b.componentSetup.isUnique;
                d.text("");
                d.parents("#field_" + b.componentSetup.fieldId).find(".form-error").text("");
                "true" != f && 1 != f || d.empty();
                if (0 < c.objs.length) {
                    var f = c.objs, k;
                    for (k in f) {
                        var g = f[k];
                        if (g) {
                            var h = $("\x3cspan id\x3d" + g.id + ' name\x3d"js_form-mainlineItem" class\x3d"js_form-mainlineItem j_component employee-item"\x3e\x3ca mainlineId\x3d' + g.id + ' data-module\x3d"mainline" data-value\x3d' + g.id + " data-id\x3d" + g.id + ' class\x3d"entitybox-toggle"\x3e' + g.name + "\x3c/a\x3e\x3c/span\x3e");
                            d.append(h)
                        }
                    }
                } else
                    g = c.objs,
                    h = $("\x3cspan id\x3d" + g.id + ' name\x3d"js_form-mainlineItem" class\x3d"js_form-mainlineItem j_component employee-item"\x3e\x3ca mainlineId\x3d' + g.id + ' data-module\x3d"mainline" data-value\x3d' + g.id + " data-id\x3d" + g.id + ' class\x3d"entitybox-toggle"\x3e' + g.name + "\x3c/a\x3e\x3c/span\x3e"),
                    0 == g.length ? d.html('\x3cdiv class\x3d"widget-link-holder"\x3e\x3ci class\x3d"icon-plus2"\x3e\x3c/i\x3e\u9009\u62e9\u9879\u76ee\x3c/div\x3e') : d.append(h);
                b.triggerFillRelate(d)
            }),
            e.on("deleteObj", "#" + a + " .mainline-seleted", function(e, c) {
                var d = $("#" + a + " .js_mainlineitem_container");
                d.find('span[id\x3d"' + c + '"]').remove();
                0 == d.find("span").length && d.html('\x3cdiv class\x3d"widget-link-holder"\x3e\x3ci class\x3d"icon-plus2"\x3e\x3c/i\x3e\u9009\u62e9\u9879\u76ee\x3c/div\x3e');
                b.triggerFillRelate(d)
            }))
        },
        autoSaveEvents: function(c) {
            var b = this
              , e = b.el || $(document)
              , a = (b.componentSetup.fieldId || b.componentSetup.tempId) + this.cid;
            e.on("click", "#" + a + " .js_deleteMainline", function() {
                b.saveComponentValue(e.find("#" + a), c)
            });
            "mobile" == window.systemInfo_form ? (e.on("objsComfirm", "#" + a + " .mainline-seleted", function(a, e) {
                b.saveComponentValue($(this), c)
            }),
            e.on("deleteObj", "#" + a + " .mainline-seleted", function(a, e) {
                b.saveComponentValue($(this), c)
            })) : (e.on("click", "#" + a + " #searchList\x3ep", function() {
                b.saveComponentValue($(this), c)
            }),
            e.on("entitySelected", "#" + a + " #searchmainline", function(a) {
                b.saveComponentValue($(this), c)
            }))
        },
        mainlineAhead: Backbone.View.extend({
            defaults: function() {
                this.suggestion = "";
                this.remote = "/mainline/suggestion.json";
                this.entity = "mainline";
                this.tpl = h.get("mainline")
            },
            initAhead: function(c) {
                this.defaults();
                this.fieldId = c.fieldId;
                this.isUnique = c.isUnique;
                this.isDefault = c.isDefault;
                this.orderContent = c.orderContent;
                this.filterParams = c.filterParams;
                this.isAddForRelation = c.isAddForRelation;
                this.el = c.el;
                this.$continer = this.el.find("#" + this.fieldId);
                this._htmlEvents(c.callback)
            },
            _htmlEvents: function(c) {
                var b = this
                  , e = b.$continer
                  , a = b.fieldId
                  , d = this.el
                  , f = this.isUnique
                  , g = this.isDefault
                  , h = d.find("#" + b.fieldId + " #typeahead-form-mainline");
                d.on("mouseenter.typeahead", "#" + a + " .typeahead-wrapper", function(a) {
                    $(this).data("enter", !0)
                }).on("mouseleave.typeahead", "#" + a + " .typeahead-wrapper", function(a) {
                    $(this).data("enter", !1)
                });
                d.on("click", "#" + a + " .control-btn", function(a) {
                    a.stopPropagation();
                    $(this).addClass("hide");
                    $(this).prev(".typeahead-wrapper").removeClass("hide");
                    $(this).prev(".typeahead-wrapper").find(".control-input").focus()
                });
                d.on("focusout", "#" + a + " .control-input", function(a, e) {
                    var c = $(this).parents(".typeahead-wrapper");
                    c.data("enter") && "tt" != e || (c.addClass("hide"),
                    c.next(".control-btn").removeClass("hide"))
                });
                d.on("click", "#" + a + " #searchList\x3ep", function() {
                    var e = $("#" + a);
                    g || (e.parents(".field_js").find(".form-error").text(""),
                    e.parents(".field_js").find(".form-error").hide());
                    if ($(this).hasClass("creat-new")) {
                        var d = $(this).attr("title");
                        if (null != d && "" != d) {
                            h = {
                                name: d,
                                description: "",
                                startTime: "",
                                endTime: "",
                                icon: "/static/img/icon/goal/14.png"
                            };
                            d = [];
                            d.push(TEAMS.currentUser.id);
                            var k = {};
                            k.mainline = h;
                            k.manager = d;
                            $.ajax({
                                contentType: "application/json",
                                type: TEAMS.ajaxMethod,
                                async: !1,
                                url: "/mainline.json",
                                dataType: "json",
                                data: JSON.stringify(k),
                                success: function(d) {
                                    d && d.message || b.appendSelect(d.mainline.id, d.mainline.name, a, e, f, c)
                                }
                            })
                        }
                    } else {
                        var h = $(this).data("obj");
                        b.appendSelect(h.id, h.name, a, e, f, c)
                    }
                });
                d.on("click", "#" + a + " .js_deleteMainline", function() {
                    $(this).parent().remove();
                    "function" == typeof c && c()
                });
                h.off("focus.tt").on("focus.tt", function(a) {
                    b._search($(this))
                });
                h.off("click.tt").on("click.tt", function(a) {
                    a.stopPropagation()
                });
                h.off("keyup.tt").on("keyup.tt", function(a) {
                    a = a.which;
                    0 < $("body").find("#form-abposselect").length && (e = $("body").find("#form-abposselect").find(".field_js"));
                    13 == a ? (e.find("#mainline-typeahead-div p.active").click(),
                    window.abposview && window.abposview.remove()) : 27 == a ? (h.trigger("focusout", "tt"),
                    window.abposview && window.abposview.remove()) : 38 == a ? (a = $("#mainline-typeahead-div p.active"),
                    1 > a.length ? e.find("#mainline-typeahead-div p").last().addClass("active") : (a.removeClass("active"),
                    (0 < a.prev().length ? a.prev() : e.find("#mainline-typeahead-div p").last()).addClass("active"))) : 40 == a ? (a = e.find("#mainline-typeahead-div p.active"),
                    1 > a.length ? e.find("#mainline-typeahead-div p").first().addClass("active") : (a.removeClass("active"),
                    (0 < a.next().length ? a.next() : e.find("#mainline-typeahead-div p").first()).addClass("active"))) : b._search($(this))
                });
                e.find("#mainline-typeahead-div").off("mouseenter.tt", "p").on("mouseenter.tt", "p", function() {
                    0 < $("body").find("#form-abposselect").length && (e = $("body").find("#form-abposselect").find(".field_js"));
                    $(this).addClass("active");
                    e.find("#mainline-typeahead-div p.active").removeClass("active")
                });
                e.off("click.tt", "#mainline-typeahead-div p").on("click.tt", "#mainline-typeahead-div p", function(a) {
                    h.trigger("focusout", "tt")
                })
            },
            appendSelect: function(c, b, e, a, d, f) {
                b = '\x3cspan name\x3d"js_form-mainlineItem" class\x3d"js_form-mainlineItem j_component employee-item"\x3e\x3ca data-id\x3d"' + c + '" data-module\x3d"mainline" mainlineId\x3d' + c + ' class\x3d"entitybox-toggle" title\x3d"' + b + '"\x3e' + b + '\x3c/a\x3e\x3ca class\x3d"close js_deleteMainline" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e';
                e = $("#" + e + " .js_mainlineitem_container .js_form-mainlineItem");
                "true" == d || 1 == d ? (a.find(".js_mainlineitem_container").empty(),
                a.find(".js_mainlineitem_container").append(b)) : (e && e.each(function(a) {
                    c == $(this).find(".entitybox-toggle").attr("mainlineId") && $(this).remove()
                }),
                a.find(".js_mainlineitem_container").append(b),
                "function" == typeof f && f())
            },
            _search: function(c) {
                var b = this
                  , e = b.$continer
                  , a = $.trim(c.val());
                a == c.attr("placeholder") && (a = "");
                e.find("#mainline-typeahead-div #searchList").html("");
                0 < $("body").find("#form-abposselect").length ? ($("body").find("#form-abposselect").find(".field_js").find("#mainline-typeahead-div .loading_small").addClass(d).show(),
                e.find("#mainline-typeahead-div .loading_small").hide()) : e.find("#mainline-typeahead-div .loading_small").addClass(d).show();
                window.abposview && window.abposview.remove();
                var d = b.entity;
                c = b.remote;
                b.filterParams && (c = "/mainline/search.json");
                e = b.getParam(1, a);
                $.ajax({
                    contentType: "application/json",
                    type: TEAMS.ajaxMethod,
                    url: c,
                    dataType: "json",
                    data: JSON.stringify(e),
                    success: function(e) {
                        var c = e.relevances;
                        b.filterParams && (c = e.page.result);
                        b._loadList(c, a)
                    }
                })
            },
            getParam: function(c, b) {
                var e = {};
                if (this.filterParams) {
                    e.pageNo = c;
                    e.pageSize = 10;
                    var a = this.filterParams
                      , d = "";
                    a && "object" == typeof a ? (d = JSON.stringify(a).replace(/com_key/g, "componentKey"),
                    d = JSON.parse(d)) : a && "string" == typeof a && (d = a.replace(/com_key/g, "componentKey"),
                    d = JSON.parse(d));
                    var a = {
                        advFilter: {}
                    }
                      , f = [];
                    if (b) {
                        var g = {};
                        g.content = b;
                        g.term = "like";
                        f.push(g)
                    }
                    d && (d.names && 0 < d.names.length && (f = f.concat(d.names)),
                    d.descriptions && d.descriptions.length && (a.advFilter.description = d.descriptions),
                    d.createTimes && 0 < d.createTimes.length && (a.advFilter.createdates = d.createTimes),
                    d.progress && 0 < d.progress.length && (a.advFilter.progress = d.progress),
                    d.isFinished && 0 < d.isFinished.length && (a.advFilter.isFinished = d.isFinished),
                    d.shareMans && 0 < d.shareMans.length && (a.advFilter.shareMan = d.shareMans),
                    d.creators && 0 < d.creators.length && (a.advFilter.creator = d.creators),
                    d.managers && 0 < d.managers.length && (a.advFilter.managers = d.managers),
                    d.participants && 0 < d.participants.length && (a.advFilter.participants = d.participants),
                    d.duedates && 0 < d.duedates.length && (a.advFilter.duedates = this.queryDefultCheange(d.duedates)),
                    d.startTimes && 0 < d.startTimes.length && (a.advFilter.startTime = this.queryDefultCheange(d.startTimes)),
                    d.filterFormDatas && 0 < d.filterFormDatas.length && (a.advFilter.releOthers = d.filterFormDatas),
                    a.advFilter.names = f);
                    a.type = "all";
                    a.keywords = b;
                    e.userId = TEAMS.currentUser.id;
                    e.noPageCount = !0;
                    e.mainlineFilter = a
                } else
                    e.keywords = b,
                    e.searchType = this.entity;
                this.orderContent && (e.order = this.orderContent);
                return e
            },
            queryDefultCheange: function(c) {
                var b = [];
                if (c && 0 < c.length)
                    for (var e = 0; e < c.length; e++) {
                        var a = c[e];
                        a.selectedOption && ("three_day-no" == a.selectedOption ? (a = {},
                        a.content = this.getDateTime(0),
                        a.endContent = this.getDateTime(3)) : "one-weak-no" == a.selectedOption ? (a = {},
                        a.content = this.getDateTime(0),
                        a.endContent = this.getDateTime(7)) : (a = {},
                        a.content = this.getDateTime(0),
                        a.endContent = this.getDateTime(30)));
                        b.push(a)
                    }
                return b
            },
            getDateTime: function(c) {
                var b = new Date;
                b.setDate(b.getDate() + c);
                c = b.getFullYear();
                var e = 10 > b.getMonth() + 1 ? "0" + (b.getMonth() + 1) : b.getMonth() + 1
                  , b = 10 > b.getDate() ? "0" + b.getDate() : b.getDate();
                return c + "-" + e + "-" + b
            },
            _loadList: function(c, d) {
                var e = this.$continer;
                0 < $("body").find("#form-abposselect").length ? $("body").find("#form-abposselect").find(".field_js").find("#mainline-typeahead-div .loading_small").hide() : e.find("#mainline-typeahead-div .loading_small").hide();
                if (null != c && 0 < c.length)
                    for (var a = 0, f = c.length; a < f; a++) {
                        var g = c[a];
                        g.name = g.name.replace(/</g, "\x26lt").replace(/>/g, "\x26gt").replace("/[\r\n]/g", " ");
                        var h = $(this.tpl).siblings("#mainline-clone").find(".j_mainline").clone();
                        h.text(g.name);
                        h.attr("title", g.name);
                        h.data("obj", g);
                        e.find("#mainline-typeahead-div #searchList").append(h)
                    }
                else {
                    if (null == d || "" == d)
                        return;
                    0 != this.isAddForRelation && "false" != this.isAddForRelation && (h = $('\x3cp class\x3d"mainline creat-new"\x3e\x3ci class\x3d"icon-plus-thin"\x3e\x3c/i\x3e \u6dfb\u52a0\u9879\u76ee\uff1a' + d + "\x3c/p\x3e"),
                    h.attr("title", d),
                    e.find("#mainline-typeahead-div #searchList").find(".creat-new").remove(),
                    e.find("#mainline-typeahead-div #searchList").append(h))
                }
                e.find("#mainline-typeahead-div #searchList").show();
                window.abposview && window.abposview.remove();
                window.abposview = new b({
                    continer: e,
                    entity: this.entity
                });
                window.abposview.render()
            }
        }),
        check: function(c) {
            var b = $(c).find('span[name\x3d"js_form-mainlineItem"]').length
              , e = {};
            e.element = c;
            0 != b || "true" != this.componentSetup.required && 1 != this.componentSetup.required || (e.message = this.componentSetup.title + "\u4e0d\u80fd\u4e3a\u7a7a");
            return e
        },
        getValue: function(c, b) {
            var e = {
                formField: {
                    id: this.componentSetup.fieldId
                }
            }
              , a = c.find(".js_mainlineitem_container .js_form-mainlineItem");
            if (0 < a.length) {
                var d = [];
                a.each(function(a) {
                    var e = $(this).find(".entitybox-toggle").attr("mainlineId")
                      , c = $(this).find(".entitybox-toggle").text();
                    d[a] = {
                        optionId: e,
                        content: c,
                        type: "mainline"
                    }
                });
                e.dataOptions = d
            } else
                b || (e = null);
            return e
        },
        setValue: function(c, b) {
            $(this.tpl).siblings("#mainline-clone");
            c.find(".js_mainlineitem_container").empty();
            if (null != b && null != b.dataOptions)
                for (var e = 0; e < b.dataOptions.length; e++) {
                    var a = b.dataOptions[e]
                      , d = null == a.content ? "" : a.content
                      , a = a.optionId
                      , f = null
                      , f = "mobile" == window.systemInfo_form ? '\x3cspan href\x3d"/mobile/mainline/cover/' + a + '" name\x3d"js_form-mainlineItem" id\x3d"' + a + '" class\x3d"router js_form-mainlineItem j_component employee-item"\x3e\x3ca data-module\x3d"mainline" data-id\x3d"' + a + '" data-value\x3d"' + a + '" mainlineId\x3d' + a + ' class\x3d"entitybox-toggle"\x3e' + d + "\x3c/a\x3e\x3c/span\x3e" : null != c.find(".js_form-mainline-add").get(0) ? '\x3cspan name\x3d"js_form-mainlineItem" id\x3d"' + a + '" class\x3d"js_form-mainlineItem j_component employee-item"\x3e\x3ca data-module\x3d"mainline" data-id\x3d"' + a + '" data-value\x3d"' + a + '" mainlineId\x3d' + a + ' class\x3d"entitybox-toggle" title\x3d"' + d + '"\x3e' + d + '\x3c/a\x3e\x3ca class\x3d"close js_deleteMainline" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e' : '\x3cspan name\x3d"js_form-mainlineItem" id\x3d"' + a + '" class\x3d"js_form-mainlineItem j_component employee-item"\x3e\x3ca data-module\x3d"mainline" data-id\x3d"' + a + '" data-value\x3d"' + a + '" mainlineId\x3d' + a + ' class\x3d"entitybox-toggle" title\x3d"' + d + '"\x3e' + d + "\x3c/a\x3e\x3c/span\x3e";
                    c.find(".js_mainlineitem_container").append(f)
                }
        },
        empty: function(c) {
            c.find(".js_mainlineitem_container").html("")
        },
        readOnly: function(c, b) {
            var e = this.componentSetup.fieldId + this.cid
              , a = c.find('div[id\x3d"' + e + '"] span[name\x3d"js_form-mainline-add"]')
              , d = c.find('div[id\x3d"' + e + '"] span[name\x3d"js_form-mainlineItem"]')
              , f = c.find('div[id\x3d"' + e + '"] .js_deleteMainline');
            b ? (a.remove(),
            f.remove()) : a && 0 != a.length && null != a || (a = $(this.tpl).siblings("#preview-mainline").find('span[name\x3d"js_form-mainline-add"]'),
            c.find('div[id\x3d"' + e + '"]').find(".js_mainlineitem_container").after(a),
            d.append('\x3ca class\x3d"close js_deleteMainline" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e'))
        }
    });
    u.exports = window.Mainline
});
define("form/component/formcomponent", "form/relatecomponent form/tplutil form/component/formdatalist form/component/entityselecter form/component/typeahead form/component/relevancecontrol form/componentmodel form/abposview".split(" "), function(n, y, u) {
    var m = n("form/relatecomponent")
      , h = n("form/tplutil")
      , g = n("form/component/formdatalist")
      , f = n("form/component/entityselecter")
      , d = n("form/component/typeahead")
      , b = n("form/component/relevancecontrol")
      , c = n("form/componentmodel")
      , l = n("form/abposview");
    window.FormComponent = m.extend({
        initialize: function(e) {
            m.prototype.initialize.call(this, e);
            var a = {
                componentKey: "FormComponent",
                title: "\u5173\u8054\u8868\u5355\u6570\u636e",
                sformId: "",
                formName: "",
                fieldIds: [],
                columnFields: [],
                isAllFormData: !1,
                filterParams: "",
                filterQueryParams: "",
                orderContent: ""
            };
            null != e && (a.title = e.title,
            a.sformId = e.sformId,
            a.formName = e.formName,
            a.fieldIds = e.fieldIds,
            a.columnFields = e.columnFields,
            a.isAllFormData = e.isAllFormData,
            a.filterParams = e.filterParams,
            a.filterQueryParams = e.filterQueryParams,
            a.orderContent = e.orderContent);
            this.componentSetup = $.extend(this.componentSetup, a);
            this.tpl = h.get("formcomponent", {
                isMobileForm: this.isMobileForm
            });
            this.componentModel = new c
        },
        setSformId: function(e) {
            this.componentSetup.sformId = e
        },
        setFormName: function(e) {
            this.componentSetup.formName = e
        },
        setFieldIds: function(e) {
            this.componentSetup.fieldIds = e
        },
        setColumnFields: function(e) {
            this.componentSetup.columnFields = e
        },
        setIsAllFormData: function(e) {
            this.componentSetup.isAllFormData = e
        },
        setFilterParams: function(e) {
            this.componentSetup.filterParams = e
        },
        setFilterQueryParams: function(e) {
            this.componentSetup.filterQueryParams = e
        },
        setOrderContent: function(e) {
            this.componentSetup.orderContent = e
        },
        render: function(e) {
            var a = this
              , c = $(this.tpl).siblings("#form-form");
            c.find(".widget-title .widget-title_js").text(this.componentSetup.title);
            "true" != this.componentSetup.required && 1 != this.componentSetup.required || c.find(".widget-title .widget-required_js").text(" *");
            "" != this.componentSetup.describe && (c.find(".field-description").text(this.componentSetup.describe),
            c.find(".field-description").show());
            e.attr("class", c.attr("class"));
            e.addClass(this.componentSetup.titleLayout);
            if (1 == e.parents("div[componentKey\x3d'TableLayout']").length || 1 == e.parents("div[componentKey\x3d'ColumnPanel']").length)
                e.removeClass("field-hoz"),
                this.componentSetup.titleLayout = "";
            this.componentModel.generatorId(function(c) {
                a.componentSetup.tempId = c.generatorId;
                e.attr("tempId", c.generatorId)
            });
            e.html(c.html())
        },
        renderEditor: function() {
            var e = this
              , a = $(this.tpl).siblings("#editor-form")
              , c = !1;
            if ("true" == this.componentSetup.isUnique || 1 == this.componentSetup.isUnique)
                c = !0;
            a.find("#isUnique").attr("checked", c);
            m.prototype.renderEditor.call(this, a);
            c = !1;
            if ("true" == this.componentSetup.isAllFormData || 1 == this.componentSetup.isAllFormData)
                c = !0;
            a.find("#isAllFormData").attr("checked", c);
            if (1 == $("#widget-control .field-active").parents("div[componentKey\x3d'TableLayout']").length || 1 == $("#widget-control .field-active").parents("div[componentKey\x3d'ColumnPanel']").length)
                $("#widget-control .field-active").removeClass("field-hoz"),
                this.componentSetup.titleLayout = "";
            var b = this.componentSetup.sformId
              , c = this.componentSetup.formName
              , f = this.componentSetup.fieldIds
              , g = this.componentSetup.columnFields;
            null != g && 0 < g.length && g[0].substring(g[0].indexOf("#") + 1) != b && (this.componentSetup.columnFields = []);
            var l = this;
            null != b && "" != b && null != c ? (a.find("#form_select_input").attr("value", c).attr("formId", b),
            null != f && 0 < f.length ? "nofields" == f[0] ? (c = a.find(".j_clone .j_form-field-li").clone(),
            c.find(".j_form-field-select").append("\x3coption value\x3d'nofields' id\x3d'nofields'\x3e\u65e0\u5b57\u6bb5\u5185\u5bb9\uff01\x3c/option\x3e"),
            a.find(".j_showField .j_form-field-ul").append(c),
            a.find(".j_cardConf").addClass("hide"),
            a.find(".j_showField").removeClass("hide"),
            a.find(".j_batch_edit").addClass("hide"),
            $("#editor-component").html(a.html())) : (a.find(".j_cardConf").addClass("hide"),
            a.find(".j_showField").removeClass("hide"),
            a.find(".j_showField .j_form-field-ul").empty(),
            a.find(".j_batch_edit").attr("formId", b).removeClass("hide"),
            c = $("#widget-control .field-active").data("formId"),
            g = $("#widget-control .field-active").data("fields"),
            null != c && c == b ? l.renderSelectedAndAllFields(f, g, a) : (c = {},
            c.formId = b,
            g = [],
            g.push("0"),
            c.statusList = g,
            $.ajax({
                contentType: "application/json",
                type: TEAMS.ajaxMethod,
                data: JSON.stringify(c),
                dataType: "json",
                url: "/form/queryFormFieldByFormId.json",
                async: !1,
                success: function(e) {
                    var c = [];
                    if (e.formField)
                        for (var d = 0; d < e.formField.length; d++) {
                            var k = e.formField[d];
                            "SignatureComponent" != k.componentKey && c.push(k)
                        }
                    $("#widget-control .field-active").data("formId", b);
                    $("#widget-control .field-active").data("fields", c);
                    l.renderSelectedAndAllFields(f, c, a)
                }
            }))) : (a.find(".j_cardConf").removeClass("hide"),
            a.find(".j_showField").addClass("hide"),
            a.find(".j_batch_edit").addClass("hide"),
            $("#editor-component").html(a.html()))) : this.renderForm(a);
            this.typeAhead = new d({
                remote: TEAMS.service.baseUrl + "/datasources/formComponentQuery.json",
                entity: "form",
                formId: this.componentSetup.sformId,
                changeValue: function() {
                    e.setDefaultValue()
                }
            });
            if ((c = this.componentSetup.content) && 0 < c.length)
                for (var g = $("#editor-component").find(".js_entity_container"), h = 0; h < c.length; h++) {
                    var v = {
                        id: c[h].optionId,
                        name: c[h].content
                    }
                      , s = $('\x3cspan name\x3d"js_entity_item" class\x3d"js_entity_item employee-item j_component"\x3e\x3ca data-id\x3d"' + v.id + '" data-module\x3d"" id\x3d"' + v.id + '" class\x3d"entitybox-toggle" title\x3d"' + v.name + '"\x3e' + v.name + '\x3c/a\x3e\x3ca class\x3d"close js_deleteItem" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e');
                    s.data("obj", v);
                    g.append(s)
                }
        },
        setDefaultValue: function() {
            var e = $("#editor-component").find(".js_entity_container .js_entity_item")
              , a = [];
            0 < e.length && e.each(function(e) {
                var c = $(this).data("obj");
                a[e] = {
                    optionId: c.id,
                    content: c.name
                }
            });
            this.componentSetup.content = a
        },
        renderSelectedAndAllFields: function(e, a, c) {
            if (null == a || 0 == a.length) {
                var b = c.find(".j_clone .j_form-field-li").clone()
                  , d = c.find(".j_clone .j_option").clone();
                d.attr("value", "nofields").attr("id", "nofields").text("\u65e0\u5b57\u6bb5\u5185\u5bb9\uff01");
                b.find(".j_form-field-select").append(d);
                b.find("select").find("option[value\x3d'nofields']").attr("selected", !0);
                c.find(".j_showField .j_form-field-ul").append(b);
                c.find(".j_showField").removeClass("hide");
                this.componentSetup.fieldIds = ["nofields"];
                c.find(".j_batch_edit").attr("formId", formId).addClass("hide")
            } else
                for (var f = 0, g = e.length; f < g; f++) {
                    for (var b = c.find(".j_clone .j_form-field-li").clone(), l = 0, h = a.length; l < h; l++) {
                        var d = c.find(".j_clone .j_option").clone()
                          , m = a[l];
                        d.attr("value", m.id).attr("id", m.id).attr("title", m.title);
                        d.text(m.title);
                        0 == b.find(".j_form-field-select").find("#" + m.id).length && b.find(".j_form-field-select").append(d)
                    }
                    d = e[f].substring(0, e[f].indexOf("_"));
                    (d = b.find("select").find("option[value\x3d'" + d + "']")) && 0 < d.length && d.attr("selected", !0);
                    c.find(".j_showField .j_form-field-ul").append(b)
                }
            $("#editor-component").html(c.html())
        },
        renderForm: function(e) {
            var a = this
              , c = {
                module: "biaoge",
                pageSize: 10,
                pageNo: 1
            }
              , b = $("#ownership").val()
              , d = $("#sysMenuId").val();
            url = TEAMS.service.formreport + "/reportform/queryFormsByTenantKey.json";
            "cloud" == b && d && (c.ownership = "cloud",
            c.sysMenuId = d,
            url = "/form/queryFormsBySysMenuId.json");
            $.ajax({
                type: TEAMS.ajaxMethod,
                data: c,
                dataType: "json",
                async: !1,
                url: url,
                success: function(c) {
                    c = c.formPage.result;
                    $("#widget-control .field-active").data("formInfo", c);
                    0 == c.length ? (e.find("#form_select_input").val("\u6682\u65e0\u8868\u5355").attr("noform", "0001"),
                    a.componentSetup.sformId = "0001",
                    a.componentSetup.formName = "\u6682\u65e0\u8868\u5355") : (c = c[0],
                    e.find("#form_select_input").attr("value", c.name).attr("formId", c.id),
                    a.componentSetup.sformId = c.id,
                    a.componentSetup.formName = c.name);
                    $("#editor-component").html(e.html())
                }
            })
        },
        renderPreview: function(e, a, c, b, d) {
            var f = this
              , g = $(this.tpl)
              , l = null
              , h = $("body").find("#formTenantKey").val();
            h ? h = h.toUpperCase() : null != TEAMS.currentTenant && (h = TEAMS.currentTenant.tenantKey.toUpperCase());
            b = this.componentSetup.isAllFormData;
            if (1 != b && "true" != b) {
                $("body").find("#scanReport").val() || null != TEAMS.currentUser && TEAMS.currentTenant.tenantKey.toUpperCase() == h ? (d = f.getCurrentModuleIsPay(d),
                h = formPlugin.moduleIsPay("form"),
                b = $('\x3cspan class\x3d"employee-item"\x3e\u60a8\u7684\u56e2\u961f\u76ee\u524d\u662f\u514d\u8d39\u7248\u672c\uff0c\u4e0d\u652f\u6301\u6b64\u529f\u80fd\uff01\x3c/span\x3e'),
                l = f.addNoPayTips(l, b, g, h, d)) : (l = g.siblings("#noform-preview"),
                l.find(".field_message_js").attr("cid", this.cid));
                d = f.isDisableModules();
                1 != d && "true" != d || l.addClass("hide");
                var m = $("body").find(".form-border-view.form-view_js").not("#maximizePreview");
                b = d = "";
                0 < m.length && (d = m.data("noAuthArray"),
                b = m.data("authArray"));
                d && -1 < $.inArray(f.componentSetup.sformId, d) ? ("mobile" != window.systemInfo_form ? (l.find(".js_form-form-add").addClass("hide"),
                (d = l.find(".j_nopermission")) && d.text("\u65e0\u6743\u9650\uff0c\u8bf7\u8054\u7cfb\u8868\u5355\u6240\u6709\u4eba!").removeClass("hide")) : l.find(".js_formitem_container").html('\x3cdiv class\x3d"widget-placeholder-warning"\x3e\u65e0\u6743\u9650\uff0c\u8bf7\u8054\u7cfb\u8868\u5355\u6240\u6709\u4eba!\x3c/div\x3e').removeClass("form-seleted"),
                f.renderPreviewDetail(l, e, a, c)) : b && -1 < $.inArray(f.componentSetup.sformId, b) ? f.renderPreviewDetail(l, e, a, c) : (d = {},
                d.formId = this.componentSetup.sformId,
                $.ajax({
                    type: TEAMS.ajaxMethod,
                    data: d,
                    dataType: "json",
                    async: !1,
                    url: TEAMS.service.formreport + "/reportform/queryFormAuthByFormId.json",
                    success: function(b) {
                        null == b.permission || "" == b.permission ? (0 < m.length && ((b = m.data("noAuthArray")) && 0 > $.inArray(f.componentSetup.sformId, b) || (b = []),
                        b.push(f.componentSetup.sformId),
                        m.data("noAuthArray", b)),
                        "mobile" != window.systemInfo_form ? (l.find(".js_form-form-add").addClass("hide"),
                        (b = l.find(".j_nopermission")) && b.text("\u65e0\u6743\u9650\uff0c\u8bf7\u8054\u7cfb\u8868\u5355\u6240\u6709\u4eba!").removeClass("hide")) : l.find(".js_formitem_container").html('\x3cdiv class\x3d"widget-placeholder-warning"\x3e\u65e0\u6743\u9650\uff0c\u8bf7\u8054\u7cfb\u8868\u5355\u6240\u6709\u4eba!\x3c/div\x3e').removeClass("form-seleted")) : 0 < m.length && ((b = m.data("authArray")) && 0 > $.inArray(f.componentSetup.sformId, b) || (b = []),
                        b.push(f.componentSetup.sformId),
                        m.data("authArray", b));
                        f.renderPreviewDetail(l, e, a, c)
                    }
                }))
            } else
                b = $('\x3cspan class\x3d"employee-item"\x3e\u60a8\u7684\u56e2\u961f\u76ee\u524d\u662f\u514d\u8d39\u7248\u672c\uff0c\u4e0d\u652f\u6301\u6b64\u529f\u80fd\uff01\x3c/span\x3e'),
                null == TEAMS.currentUser || TEAMS.currentTenant.tenantKey.toUpperCase() != h ? (d = e.data("form").formId,
                f.queryFormCreatorPay(d, function(b) {
                    var d = !1;
                    if (b && b.message)
                        h.text("\u672a\u67e5\u8be2\u5230\u8868\u5355\u521b\u5efa\u8005\u4fe1\u606f\uff01"),
                        l = f.addNoPayTips(l, h, g, !1, !1);
                    else {
                        var d = b.pay
                          , h = $('\x3cspan class\x3d"employee-item"\x3e\u8be5\u8868\u5355\u6240\u5728\u56e2\u961f\u76ee\u524d\u662f\u514d\u8d39\u7248\u672c\uff0c\u4e0d\u652f\u6301\u6b64\u529f\u80fd\uff01\x3c/span\x3e');
                        l = f.addNoPayTips(l, h, g, d, !1);
                        if ((b = b.disableModules) && 0 < b.length)
                            for (d = 0; d < b.length; d++)
                                if (h = b[d],
                                h.module && "form" == h.module && h.moduleId && 3 >= h.moduleId.length) {
                                    l.addClass("hide");
                                    break
                                }
                    }
                    f.renderPreviewDetail(l, e, a, c)
                })) : (d = f.getCurrentModuleIsPay(d),
                h = formPlugin.moduleIsPay("form"),
                l = f.addNoPayTips(l, b, g, h, d),
                d = f.isDisableModules(),
                1 != d && "true" != d || l.addClass("hide"),
                f.renderPreviewDetail(l, e, a, c))
        },
        getCurrentModuleIsPay: function(e) {
            var a = !1;
            e && (a = formPlugin.moduleIsPay(e));
            return a
        },
        queryFormCreatorPay: function(e, a) {
            var c = {};
            c.formId = e;
            c.entityType = "form";
            $.ajax({
                type: TEAMS.ajaxMethod,
                data: c,
                dataType: "json",
                async: !1,
                url: TEAMS.service.baseUrl + "/datasources/queryFormCreatorPay.json",
                success: function(e) {
                    a && a(e)
                }
            })
        },
        addNoPayTips: function(e, a, c, b, d) {
            0 == d || "false" == d ? "mobile" != window.systemInfo_form ? (e = c.siblings("#preview-form"),
            b || (e.find(".js_formitem_container").empty().append(a),
            e.find(".js_form-form-add").addClass("hide"),
            e.find(".typeahead-wrapper").remove(),
            e.find(".j_nopermission").remove())) : (e = c.siblings("#mobile-preview"),
            b || e.find(".js_formitem_container").removeClass("form-seleted").empty().append(a)) : e = "mobile" != window.systemInfo_form ? c.siblings("#preview-form") : c.siblings("#mobile-preview");
            return e
        },
        isDisableModules: function() {
            var e = !1
              , a = TEAMS.disableModules;
            if (a && 0 < a.length)
                for (var c = 0; c < a.length; c++) {
                    var b = a[c]
                      , d = b.moduleId;
                    if (b.module && "form" == b.module && d && 3 >= d.length) {
                        e = !0;
                        break
                    }
                }
            return e
        },
        renderPreviewDetail: function(e, a, c, b) {
            e.find(".widget-title .widget-title_js").text(this.componentSetup.title);
            "true" != this.componentSetup.isHideTitle && 1 != this.componentSetup.isHideTitle || e.addClass("field-notitle").find(".widget-title .widget-title_js").addClass("hide");
            "true" != this.componentSetup.required && 1 != this.componentSetup.required || e.find(".widget-title .widget-required_js").text(" *");
            "" != this.componentSetup.describe && e.find(".field-description").text(this.componentSetup.describe).show();
            e.find(".check_js").data("componentData", this).attr("id", this.componentSetup.fieldId + this.cid).attr("name", this.componentSetup.fieldId).attr("cid", this.cid);
            e.attr("id", "field_" + (this.componentSetup.fieldId || this.componentSetup.tempId));
            "mobile" == window.systemInfo_form && e.find(".form-seleted").attr("id", this.componentSetup.fieldId);
            var d = this.componentSetup.isUnique;
            if ("true" == d || 1 == d)
                "mobile" != window.systemInfo_form ? e.find("#searchform").removeAttr("data-multi") : e.find(".js_formitem_container").attr("data-multi", "false");
            e.addClass(this.componentSetup.titleLayout);
            "true" != this.componentSetup.isDefault && 1 != this.componentSetup.isDefault || c || (c = this.componentSetup.content) && 0 < c.length && this.setValue(e, {
                dataOptions: c
            });
            if (b || "true" == b)
                "mobile" != window.systemInfo_form ? this.readOnly(e, !0) : e.find(".js_formitem_container").removeClass("form-seleted").text("");
            if ("true" == this.componentSetup.isReadOnly || 1 == this.componentSetup.isReadOnly)
                "mobile" != window.systemInfo_form ? this.readOnly(e, !0) : (e.find(".js_formitem_container").removeClass("form-seleted"),
                (c = this.componentSetup.content) && 0 != c.length || e.find(".js_formitem_container").text(""));
            this.getValue(e);
            this.el = a;
            a.append(e)
        },
        renderStatSearch: function(e) {
            var a = this
              , c = $(this.tpl)
              , b = e.fieldId
              , d = e.module
              , f = e.fieldTitle
              , g = e.subFormId
              , l = e.ids
              , h = e.term
              , m = e.parentEl
              , n = e.filterEl
              , x = e.container;
            e = e.condition;
            var C = null;
            if ("mobile" != window.systemInfo_form) {
                C = c.siblings("#statsearch-entity");
                if (l)
                    for (C.find(".entity-container").empty(),
                    f = 0; f < l.length; f++)
                        c = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d"' + l[f].id + '" title\x3d"' + l[f].text + '"\x3e' + l[f].text + "\x3c/a\x3e\x3c/span\x3e",
                        C.find(".entity-container").append(c);
                h && C.find("select:first option[value\x3d" + h + "]").attr("selected", "true");
                l = (new Date).getTime();
                C.find(".j_entityContainer").attr("id", "j_formdata" + l);
                m.attr("class", "sch-group j_formFieldSearchGroup");
                m.find(".j_formField-condition").html(C);
                var B = $(x + " #j_formdata" + l + " #typeahead-formdata");
                B.attr("fieldId", b).attr("pageNo", "1").attr("pageSize", "10").attr("mod", d);
                h = B.parents(".j_entityContainer").find(".typeahead-search");
                f = "";
                f = "biaoge" == d ? "/formdata/queryRelevanceDataOptions.json" : "freeform/queryFormDataOptions.json";
                h.attr("url", f).attr("fieldId", b).attr("mod", d);
                window.typeahead && window.typeahead.init && window.typeahead.init({
                    el: x + " #j_formdata" + l + " #typeahead-formdata",
                    remote: f,
                    module: d,
                    callback: function(e) {
                        if (e && !$.isEmptyObject(e)) {
                            var c = B.parents(".j_entityContainer").find(".j_selected");
                            a.renderTypeheader(c, e)
                        }
                    }
                })
            } else
                C = c.siblings("#statsearch-formdata-mobile"),
                e && (C.find(".j_condition").find('option[value\x3d"' + e + '"]').attr("selected", !0),
                "null" != e && "notnull" != e || C.find(".j_control").hide()),
                n && (C.find("#seleted-list").empty(),
                n.find(".j_filterList .selectd #comp-val span").each(function() {
                    var a = $(this).attr("optionId")
                      , e = $(this).text()
                      , c = $("\x3cspan\x3e\x3c/span\x3e");
                    c.attr("id", a).text(e);
                    C.find("#seleted-list").append(c)
                })),
                x = {},
                x.fieldId = b,
                x.module = d,
                x.pageNo = 1,
                x.pageSize = "20",
                a.searchFormData(x, C, b, f, m, g),
                m.off("change", "#statsearch-formdata-mobile .j_condition").on("change", "#statsearch-formdata-mobile .j_condition", function() {
                    var a = $(this).val();
                    "null" == a || "notnull" == a ? m.find("#statsearch-formdata-mobile .j_control").hide() : m.find("#statsearch-formdata-mobile .j_control").show()
                }),
                m.off("tap", "#statsearch-formdata-mobile .j_optionli").on("tap", "#statsearch-formdata-mobile .j_optionli", function() {
                    var a = $(this);
                    a.hasClass("selected") ? a.removeClass("selected") : a.addClass("selected");
                    var e = a.find(".j_optionname").text()
                      , a = a.attr("id")
                      , e = '\x3cspan id\x3d"' + a + '"\x3e' + e + "\x3c/span\x3e";
                    0 < m.find("#statsearch-formdata-mobile #seleted-list #" + a).length ? m.find("#statsearch-formdata-mobile #seleted-list #" + a).remove() : m.find("#statsearch-formdata-mobile #seleted-list").append(e)
                }),
                m.off("tap", "#statsearch-formdata-mobile .j_more").on("tap", "#statsearch-formdata-mobile .j_more", function() {
                    var e = $(this)
                      , c = e.attr("pageNo")
                      , b = e.attr("fieldId")
                      , e = e.attr("title")
                      , f = {};
                    f.pageNo = c;
                    f.fieldId = b;
                    f.pageSize = "20";
                    f.module = d;
                    a.searchFormData(f, C, b, e, m, g)
                })
        },
        searchFormData: function(e, a, c, b, d, f) {
            $.ajax({
                contentType: "application/json",
                type: TEAMS.ajaxMethod,
                url: "freeform/queryFormDataOptions.json",
                dataType: "json",
                data: JSON.stringify(e),
                success: function(e) {
                    var g = e.dataOptionPage;
                    if (0 == g.totalCount)
                        a.find(".j_noresult").removeClass("hide"),
                        a.find(".eui-cells").addClass("hide");
                    else
                        for (g.hasNext && a.find(".j_more").removeClass("hide").attr("pageNo", g.pageNo + 1).attr("fieldId", c).attr("title", b),
                        e = g.result,
                        1 == g.pageNo && a.find(".j_optionUl").empty(),
                        a.find("#seleted-list").attr("fieldId", c),
                        g = 0; g < e.length; g++) {
                            var l = e[g]
                              , h = l.content
                              , l = l.optionId
                              , m = a.find("#li-clone li").clone();
                            0 < a.find("#seleted-list").find("#" + l).length && m.addClass("selected");
                            m.find(".j_optionname").text(h);
                            m.attr("id", l);
                            a.find(".j_optionUl").append(m)
                        }
                    d.find("#component-div").html(a);
                    d.find(".j_comp-ok").attr("comKey", "FormComponent").attr("fieldId", c).attr("title", b).attr("subFormId", f)
                }
            })
        },
        renderTypeheader: function(e, a) {
            var c = a.name
              , b = a.id;
            if (c && b) {
                var d = '\x3cspan id\x3d"' + b + '" class\x3d"entity-item j_entity_item" name\x3d"j_entity_item"\x3e\x3ca title\x3d"' + c + '" id\x3d"' + b + '" class\x3d"entitybox-toggle" data-module\x3d"formdata" data-value\x3d"' + b + '" data-id\x3d"' + b + '"\x3e' + c + "\x3c/a\x3e\x3c/span\x3e";
                e.find(".entity-item").each(function(a) {
                    b == $(this).find("a").attr("id") && (d = null)
                });
                e.append(d);
                e.find(".j_entity_item").data("object", a)
            }
        },
        renderEditPreview: function(e, a) {
            var c = $(this.tpl).siblings("#form-form");
            m.prototype.renderEditPreview.call(this, e, c);
            a ? e.replaceWith(c) : e.append(c)
        },
        submitCheck: function(e, a) {
            var c = this.check(e);
            a(c)
        },
        checkEvents: function(e) {
            var a = this
              , c = a.el || $(document)
              , d = a.componentSetup.fieldId + this.cid
              , l = a.componentSetup.sformId
              , h = a.componentSetup.fieldIds
              , m = a.componentSetup.isAllFormData
              , w = a.componentSetup.filterParams
              , v = a.componentSetup.orderContent;
            (new this.formAhead({})).initAhead(d, l, h, m, w, v);
            var s = a.componentSetup.isUnique;
            if ("mobile" == window.systemInfo_form)
                c.on("click", "#" + d + " .form-seleted", function(e) {
                    e = $(this).attr("data-module");
                    var c = $(this).attr("data-multi")
                      , k = $(this).parents(".j_page-view")
                      , g = k.attr("id")
                      , l = $(this);
                    if (!$(this).parents(".j_formpreview").hasClass("form-noedit")) {
                        var h = $("#" + d + " .form-seleted .j_formdata_detail")
                          , m = [];
                        h && 0 < h.length && h.each(function(a) {
                            a = $(this).find(".j_formdata").attr("id");
                            var e = $(this).find(".j_formdata").text();
                            m.push({
                                name: e,
                                id: a,
                                module: "formdatareport"
                            })
                        });
                        for (var h = [], r = a.componentSetup.fieldIds, q = 0; q < r.length; q++) {
                            var p = r[q].substring(0, r[q].indexOf("_"));
                            h.push(p)
                        }
                        r = !1;
                        if (1 == a.componentSetup.isAllFormData || "true" == a.componentSetup.isAllFormData)
                            r = !0;
                        "true" == s || 1 == s ? (l = new f,
                        l.render("mb", {
                            targetEl: $(this),
                            module: e,
                            multi: c,
                            preEl: "#" + g,
                            seletedList: m,
                            fieldIds: h,
                            formId: a.componentSetup.sformId,
                            allData: r,
                            filterParams: w,
                            order: v
                        })) : 0 == m.length ? (l = new f,
                        l.render("mb", {
                            targetEl: $(this),
                            module: e,
                            multi: c,
                            preEl: "#" + g,
                            seletedList: m,
                            fieldIds: h,
                            formId: a.componentSetup.sformId,
                            allData: r,
                            filterParams: w,
                            order: v
                        })) : (new b({
                            targetEl: l,
                            module: e,
                            multi: c,
                            preEl: "#" + g,
                            seletedList: m,
                            fieldIds: h,
                            formId: a.componentSetup.sformId,
                            allData: r,
                            filterParams: w,
                            order: v
                        })).render();
                        k.addClass("hide")
                    }
                });
            c.off("entitySelected", "#" + d + " #searchform").on("entitySelected", "#" + d + " #searchform", function(e) {
                $("#" + d + " .js_formitem_container").empty();
                for (var c = 1; c < arguments.length; c++) {
                    var b = $("#" + d);
                    b.parents(".field_js").find(".form-error").text("");
                    b.parents(".field_js").find(".form-error").hide();
                    a.renderCallBack(arguments[c], a, b, d)
                }
                a.triggerFillRelate($(this))
            });
            c.on("click", "#" + d + " #searchform", function(e) {
                window.abposview && window.abposview.remove();
                e.stopPropagation();
                $("#" + d + " .control-input").trigger("focusout", "tt");
                var c = [];
                (e = $("#" + d + " .js_formitem_container .j_formdata_detail")) && 0 < e.length && e.each(function(a) {
                    a = $(this).find(".j_formdata").data("dataRow");
                    var e = $(this).find(".j_formdata").attr("id")
                      , b = $(this).find(".j_formdata").text();
                    c.push({
                        name: b,
                        id: e,
                        dataRow: a
                    })
                });
                e = $(this);
                var b = new g
                  , f = !1;
                if (1 == a.componentSetup.isAllFormData || "true" == a.componentSetup.isAllFormData)
                    f = !0;
                b.render("pc", {
                    targetEl: e,
                    keyword: "",
                    module: "form",
                    type: "",
                    isUnique: s,
                    seletedList: c,
                    fieldIds: a.componentSetup.fieldIds,
                    formId: a.componentSetup.sformId,
                    columnFields: a.componentSetup.columnFields || [],
                    allData: f,
                    filterParams: w,
                    order: v
                })
            });
            c.on("mouseenter.typeahead", "#" + d + " .typeahead-wrapper", function(a) {
                $(this).data("enter", !0)
            }).on("mouseleave.typeahead", "#" + d + " .typeahead-wrapper", function(a) {
                $(this).data("enter", !1)
            });
            c.on("click", "#" + d + " .control-btn", function(a) {
                a.stopPropagation();
                $(this).addClass("hide");
                $(this).prev(".typeahead-wrapper").removeClass("hide");
                $(this).prev(".typeahead-wrapper").find(".control-input").focus()
            });
            c.on("focusout", "#" + d + " .control-input", function(a, e) {
                var c = $(this).parents(".typeahead-wrapper");
                c.data("enter") && "tt" != e || (c.addClass("hide"),
                c.next(".control-btn").removeClass("hide"))
            });
            c.on("click.tt", "#" + d + " #searchList\x3ep", function() {
                var e = $("#" + d);
                e.parents(".field_js").find(".form-error").text("");
                e.parents(".field_js").find(".form-error").hide();
                var c = $(this).data("dataRow")
                  , b = c.FORM_DATA
                  , f = $(this).text()
                  , c = a.getSelectObjs(b, f, h, c)
                  , b = a.componentSetup.isUnique;
                "true" != b && 1 != b || e.find(".js_formitem_container").empty();
                a.renderCallBack(c, a, e, d);
                a.triggerFillRelate(e)
            });
            c.on("click", "#" + d + " .js_deleteFormData", function() {
                var c = a.componentSetup.fieldIds
                  , b = $(this).parents("#" + d);
                null == c || 0 == c.length || "nofields" == c[0] ? $(this).parent().remove() : $(this).parent().parent().parent().remove();
                a.triggerFillRelate(b);
                c = a.check(b, "change");
                e(c)
            });
            "mobile" == window.systemInfo_form && (c.on("objsComfirm", "#" + d + " .form-seleted", function(e, c) {
                var b = $("#" + d + " .js_formitem_container")
                  , f = a.componentSetup.isUnique;
                b.text("");
                b.parents("#field_" + a.componentSetup.fieldId).find(".form-error").text("");
                "true" != f && 1 != f || b.empty();
                if (0 < c.objs.length) {
                    var f = c.objs, k;
                    for (k in f) {
                        var g = f[k];
                        if (g) {
                            var l = $('\x3cspan id\x3d"' + g.id + '" class\x3d"j_component employee-item j_formdata_detail"\x3e\x3ca id\x3d"' + g.id + '" data-module\x3d"form" data-value\x3d"' + g.id + '" data-id\x3d"' + g.id + '" class\x3d"j_formdata entitybox-toggle"\x3e' + g.name + "\x3c/a\x3e\x3c/span\x3e");
                            b.append(l)
                        }
                    }
                } else
                    g = c.objs,
                    l = $('\x3cspan id\x3d"' + g.id + '" class\x3d"j_component employee-item j_formdata_detail"\x3e\x3ca id\x3d"' + g.id + '" data-module\x3d"form" data-value\x3d"' + g.id + '\u201c data-id\x3d"' + g.id + '" class\x3d"j_formdata entitybox-toggle"\x3e' + g.name + "\x3c/a\x3e\x3c/span\x3e"),
                    0 == g.length ? b.html('\x3cdiv class\x3d"widget-link-holder"\x3e\x3ci class\x3d"icon-plus2"\x3e\x3c/i\x3e\u9009\u62e9\u8868\u5355\u6570\u636e\x3c/div\x3e') : b.append(l);
                a.triggerFillRelate(b)
            }),
            c.on("deleteObj", "#" + d + " .form-seleted", function(e, c) {
                var b = $("#" + d + " .js_formitem_container");
                b.find('span[id\x3d"' + c + '"]').remove();
                0 == b.find("span").length && b.html('\x3cdiv class\x3d"widget-link-holder"\x3e\x3ci class\x3d"icon-plus2"\x3e\x3c/i\x3e\u9009\u62e9\u8868\u5355\u6570\u636e\x3c/div\x3e');
                a.triggerFillRelate(b)
            }))
        },
        autoSaveEvents: function(e) {
            var a = this
              , c = a.el || $(document)
              , b = (a.componentSetup.fieldId || a.componentSetup.tempId) + this.cid;
            c.on("click", "#" + b + " .js_deleteFormData", function() {
                a.saveComponentValue(c.find("#" + b), e)
            });
            "mobile" == window.systemInfo_form ? (c.on("objsComfirm", "#" + b + " .form-seleted", function(c, b) {
                a.saveComponentValue($(this), e)
            }),
            c.on("deleteObj", "#" + b + " .form-seleted", function(c, b) {
                a.saveComponentValue($(this), e)
            })) : (c.on("click", "#" + b + " #searchList\x3ep", function() {
                a.saveComponentValue($(this), e)
            }),
            c.on("entitySelected", "#" + b + " #searchform", function(c) {
                a.saveComponentValue($(this), e)
            }))
        },
        getSelectObjs: function(e, a, c, b) {
            var d = {};
            d.id = e;
            d.name = a;
            d.dataRow = b;
            e = [];
            for (a = 0; a < c.length; a++) {
                var f = c[a]
                  , g = f.substring(0, f.indexOf("_"))
                  , f = f.substring(f.indexOf("_") + 1)
                  , l = b["C_" + g] || ""
                  , h = "";
                try {
                    h = JSON.parse(l)
                } catch (m) {}
                var n = "";
                if (0 < h.length && null != h[0].optionId) {
                    for (l = 0; l < h.length; l++)
                        option = h[l],
                        n += option.content + ",";
                    l = n.substring(0, n.length - 1)
                }
                h = {};
                h.fieldId = g;
                h.fieldTitle = f;
                h.fieldValue = l;
                e.push(h)
            }
            d.showList = e;
            return d
        },
        renderCallBack: function(e, a, c, b) {
            var d = e.showList;
            a = a.componentSetup.fieldIds;
            var f = e.dataRow;
            if (!(0 < c.find(".js_formitem_container").find(".j_formdata[id\x3d'" + e.id + "']").length))
                if (null == a || 0 == a.length || "nofields" == a[0])
                    d = '\x3cspan id\x3d"' + e.id + '" name\x3d"j_formdata_detail" class\x3d"j_formdata_detail j_component employee-item"\x3e\x3ca id\x3d"' + e.id + '" data-id\x3d"' + e.id + '" data-module\x3d"formdatareport" formdata\x3d"' + e.id + '" class\x3d"entitybox-toggle j_formdata" title\x3d"' + e.name + '"\x3e' + e.name + '\x3c/a\x3e\x3ca class\x3d"close js_deleteFormData" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e',
                    (b = $("#" + b + " .js_formitem_container .j_formdata_detail")) && b.each(function(a) {
                        e.id == $(this).find(".j_formdata").attr("formdata") && ($(this).remove(),
                        flag = !1)
                    }),
                    c.find(".js_formitem_container").append(d),
                    c.find(".js_formitem_container").find(".j_formdata[formdata\x3d'" + e.id + "']").data("dataRow", f);
                else {
                    a = c.find(".j_formdata_detail_clone .j_formdata_detail").clone();
                    a.attr("id", e.id).attr("data-id", e.id).attr("formdata", e.id);
                    a.find(".j_formdata").attr("id", e.id).text(e.name).attr("data-original-title", e.name).data("dataRow", f);
                    for (var f = 0, g = d.length; f < g; f++) {
                        var l = d[f].fieldId
                          , h = d[f].fieldTitle
                          , m = d[f].fieldValue
                          , n = c.find(".j_formdata_detail_clone .j_field").clone();
                        n.attr("id", l);
                        n.find(".j_field_title").text(h);
                        n.find(".j_field_value").text(m);
                        a.find(".j_part .j_line").append(n)
                    }
                    a.find(".j_title").append('\x3ca class\x3d"close js_deleteFormData" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e');
                    $("#" + b + " .js_formitem_container").append(a)
                }
        },
        formAhead: Backbone.View.extend({
            defaults: function() {
                this.remote = this.suggestion = "";
                this.entity = "formdata";
                this.tpl = h.get("formcomponent")
            },
            initAhead: function(e, a, c, b, d, f) {
                this.defaults();
                this.fieldId = e;
                this.formId = a;
                this.fieldIds = c;
                this.isAllFormData = b;
                this.filterParams = d;
                this.orderContent = f;
                this.$continer = $("#" + this.fieldId);
                this._htmlEvents()
            },
            _htmlEvents: function() {
                var e = this
                  , a = e.$continer
                  , c = $("#" + e.fieldId + " #typeahead-form-form");
                c.off("focus.tt").on("focus.tt", function(a) {
                    e._search($(this))
                });
                c.off("click.tt").on("click.tt", function(a) {
                    a.stopPropagation()
                });
                c.off("keyup.tt").on("keyup.tt", function(b) {
                    b = b.which;
                    0 < $("body").find("#form-abposselect").length && (a = $("body").find("#form-abposselect").find(".field_js"));
                    13 == b ? (a.find("#formdata-typeahead-div p.active").trigger("click.tt"),
                    window.abposview && window.abposview.remove()) : 27 == b ? (c.trigger("focusout", "tt"),
                    window.abposview && window.abposview.remove()) : 38 == b ? (b = $("#formdata-typeahead-div p.active"),
                    1 > b.length ? a.find("#formdata-typeahead-div p").last().addClass("active") : (b.removeClass("active"),
                    (0 < b.prev().length ? b.prev() : a.find("#formdata-typeahead-div p").last()).addClass("active"))) : 40 == b ? (b = a.find("#formdata-typeahead-div p.active"),
                    1 > b.length ? a.find("#formdata-typeahead-div p").first().addClass("active") : (b.removeClass("active"),
                    (0 < b.next().length ? b.next() : a.find("#formdata-typeahead-div p").first()).addClass("active"))) : formPlugin.delayLast(e._search, 300, e, [$(this)])
                });
                a.find("#formdata-typeahead-div").off("mouseenter.tt", "p").on("mouseenter.tt", "p", function() {
                    0 < $("body").find("#form-abposselect").length && (a = $("body").find("#form-abposselect").find(".field_js"));
                    $(this).addClass("active");
                    a.find("#formdata-typeahead-div p.active").removeClass("active")
                });
                a.off("click.tt", "#formdata-typeahead-div p").on("click.tt", "#formdata-typeahead-div p", function(a) {
                    c.trigger("focusout", "tt")
                })
            },
            _search: function(e) {
                var a = this
                  , c = a.$continer
                  , b = $.trim(e.val());
                b == e.attr("placeholder") && (b = "");
                c.find("#formdata-typeahead-div #searchList").html("");
                0 < $("body").find("#form-abposselect").length ? ($("body").find("#form-abposselect").find(".field_js").find("#formdata-typeahead-div .loading_small").show(),
                c.find("#formdata-typeahead-div .loading_small").hide()) : c.find("#formdata-typeahead-div .loading_small").show();
                window.abposview && window.abposview.remove();
                a.keywords = b;
                var d = a.getParam(1, b, a.orderContent);
                e = "/formdatastat/findRowListStatForReport.json";
                if (1 == a.isAllFormData || "true" == a.isAllFormData)
                    e = TEAMS.service.baseUrl + "/datasources/formComponentQuery.json";
                $.ajax({
                    contentType: "application/json",
                    type: TEAMS.ajaxMethod,
                    url: e,
                    dataType: "json",
                    data: JSON.stringify(d),
                    success: function(e) {
                        if (!e.message || !e.message) {
                            var c = null != d.formFields ? d.formFields : [];
                            a.data = e;
                            a.allformFields = c;
                            a.renderFormDataReport(e, c)
                        }
                    }
                })
            },
            getParam: function(e, a, c) {
                var b = {};
                b.pageNo = e;
                b.pageSize = 10;
                b.formId = this.formId;
                if (1 == this.isAllFormData || "true" == this.isAllFormData)
                    b.allData = !0;
                var d = this.filterParams;
                e = "";
                if (d && "object" == typeof d) {
                    var f = JSON.stringify(d).replace(/com_key/g, "componentKey");
                    e = JSON.parse(f)
                } else
                    d && "string" == typeof d && (f = d.replace(/com_key/g, "componentKey"),
                    e = JSON.parse(f));
                d = [];
                f = {};
                f.content = a;
                f.term = "like";
                d.push(f);
                e ? 0 == e.names.length && 0 == e.operators.length && 0 == e.types.length && 0 == e.datastatus.length && 0 == e.createTimes.length && 0 == e.filterFormDatas.length ? b.keywords = a : (e.names && 0 < e.names.length && (d = d.concat(e.names)),
                e.operators && 0 < e.operators.length && (b.operators = e.operators),
                e.types && 0 < e.types.length && (b.types = e.types),
                e.datastatus && 0 < e.datastatus.length && (b.datastatus = e.datastatus),
                e.createTimes && 0 < e.createTimes.length && (b.createTimes = e.createTimes),
                e.filterFormDatas && 0 < e.filterFormDatas.length && (b.filterFormDatas = e.filterFormDatas),
                b.names = d) : b.keywords = a;
                b.fromComponent = !0;
                a = [];
                e = this.fieldIds;
                if ("nofields" == e[0])
                    f = {},
                    a = null;
                else
                    for (d = 0; d < e.length; d++) {
                        var f = e[d]
                          , g = f.substring(0, f.indexOf("_"))
                          , f = {};
                        f.id = g;
                        a.push(f)
                    }
                a && 0 == a.length && (a = null);
                b.formFields = a;
                c && (c.fieldId ? (a = [],
                e = {},
                e.fieldId = c.fieldId,
                e.componentKey = c.comKey,
                e.content = c.content) : (a = [],
                e = {},
                e.content = c.property + " " + c.direction),
                a.push(e),
                b.orderFormDatas = a);
                return b
            },
            renderFormDataReport: function(e, a) {
                var c = e.formDatas
                  , b = e.listStats
                  , d = {};
                if (b)
                    for (var f = 0; f < b.length; f++) {
                        var g = b[f]
                          , h = g.FORM_DATA + "_" + g.DATA_INDEX;
                        d[h] = g
                    }
                b = this.$continer;
                0 < $("body").find("#form-abposselect").length ? $("body").find("#form-abposselect").find(".field_js").find("#formdata-typeahead-div .loading_small").hide() : b.find("#formdata-typeahead-div .loading_small").hide();
                for (f = 0; f < c.length; f++) {
                    var m = c[f]
                      , g = m.id
                      , m = m.name ? m.name : ""
                      , h = g + "_1"
                      , h = d[h];
                    if (null == h) {
                        h = {};
                        h.FORM_DATA = g;
                        for (var s = 0, n = a.length; s < n; s++)
                            h["C_" + a[s].id] = ""
                    }
                    m = m.replace(/</g, "\x26lt").replace(/>/g, "\x26gt").replace("/[\r\n]/g", " ");
                    s = $(this.tpl).siblings("#formdata-clone").find(".j_formdata").clone();
                    s.text(m);
                    s.attr("title", m).attr("id", g);
                    s.data("dataRow", h);
                    b.find("#formdata-typeahead-div #searchList").append(s);
                    b.find("#formdata-typeahead-div #searchList").show();
                    window.abposview && window.abposview.remove();
                    window.abposview = new l({
                        continer: b,
                        entity: this.entity
                    });
                    window.abposview.render()
                }
            }
        }),
        getNewShowList: function(e, a) {
            for (var c = [], b = 0, d = e.length; b < d; b++)
                if ("nofields" != e[b]) {
                    for (var f = e[b].substring(0, e[b].indexOf("_")), g = e[b].substring(e[b].indexOf("_") + 1), l = "", h = 0, m = a.length; h < m; h++)
                        if (a[h] && a[h].formField && f == a[h].formField.id) {
                            if ("" != a[h].content && null != a[h].content)
                                l = a[h].content;
                            else if (a[h].dataText && "" != a[h].dataText.content && null != a[h].dataText.content)
                                l = a[h].dataText.content;
                            else if ("" != a[h].dataOptions && null != a[h].dataOptions && 0 < a[h].dataOptions.length) {
                                for (m = 0; m < a[h].dataOptions.length; m++)
                                    l += a[h].dataOptions[m].content + ",";
                                l = l.substring(0, l.length - 1)
                            }
                            break
                        }
                    c.push(f + "_" + g + "-" + l)
                }
            return c
        },
        check: function(e) {
            var a = $(e).find(".js_formitem_container .j_formdata_detail").length
              , c = {};
            c.element = e;
            0 != a || "true" != this.componentSetup.required && 1 != this.componentSetup.required || (c.message = this.componentSetup.title + "\u4e0d\u80fd\u4e3a\u7a7a");
            return c
        },
        getValue: function(e, a) {
            var c = {
                formField: {
                    id: this.componentSetup.fieldId
                }
            }
              , b = e.find(".js_formitem_container .j_formdata_detail");
            if (0 < b.length) {
                var d = [];
                b.each(function(a) {
                    var e = $(this).find(".j_formdata").attr("id")
                      , c = $(this).find(".j_formdata").text();
                    d[a] = {
                        optionId: e,
                        content: c,
                        type: "form"
                    }
                });
                c.dataOptions = d
            } else
                a || (c = null);
            return c
        },
        setValue: function(e, a) {
            $("body").find(".form-border-view.form-view_js").not("#maximizePreview");
            e.find(".js_formitem_container").empty();
            for (var c = this, b = [], d = this.componentSetup.fieldId, f = this.componentSetup.fieldIds, g = 0; g < f.length; g++) {
                var l = f[g].substring(0, f[g].indexOf("_"));
                b.push(l)
            }
            if (null != a && null != a.dataOptions) {
                for (var l = [], h = [], g = 0; g < a.dataOptions.length; g++) {
                    var m = a.dataOptions[g]
                      , n = null == m.content ? "" : m.content
                      , m = m.optionId;
                    l.push(m);
                    h.push([{
                        formData: {
                            id: m,
                            name: n
                        }
                    }])
                }
                if (0 == b.length)
                    c.renderFormDatas(h, b, e, f, a);
                else {
                    var x = d + "-" + l.toString();
                    (d = window.valMap[x]) && 0 < d.length ? c.renderFormDatas(d, b, e, f, a) : (d = {},
                    d.dataIds = l,
                    d.fieldIds = b,
                    $.ajax({
                        contentType: "application/json",
                        type: TEAMS.ajaxMethod,
                        data: JSON.stringify(d),
                        dataType: "json",
                        async: !1,
                        url: TEAMS.service.baseUrl + "/datasources/queryDetailByFormDataAndFieldId.json",
                        success: function(d) {
                            if (!d || !d.message) {
                                d = d.dataList;
                                for (var g = [], l = 0; l < h.length; l++) {
                                    for (var m = h[l], r = !0, p = 0; p < d.length; p++) {
                                        var w = d[p];
                                        if (m[0].formData.id == w[0].formData.id) {
                                            g.push(w);
                                            r = !1;
                                            break
                                        }
                                    }
                                    r && g.push(m)
                                }
                                window.valMap[x] = g;
                                c.renderFormDatas(g, b, e, f, a)
                            }
                        }
                    }))
                }
            }
        },
        renderFormDatas: function(e, a, c, b, d) {
            for (d = 0; d < e.length; d++) {
                var f = e[d]
                  , g = f[0].formData
                  , l = this.getDataRow(g, f, a);
                if ("mobile" == window.systemInfo_form)
                    f = $('\x3cspan href\x3d"/mobile/formdatadetail/formdatareport/' + g.id + '" id\x3d"' + g.id + '" class\x3d"router j_component employee-item j_formdata_detail"\x3e\x3ca class\x3d"j_formdata" id\x3d"' + g.id + '"\x3e' + g.name + "\x3c/a\x3e\x3c/span\x3e"),
                    c.find(".j_nopermission").remove(),
                    c.find(".js_formitem_container").append(f);
                else if (null == b || 0 == b.length || "nofields" == b[0])
                    f = '\x3cspan id\x3d"' + g.id + '" name\x3d"j_formdata_detail" class\x3d"j_formdata_detail j_component employee-item"\x3e\x3ca id\x3d"' + g.id + '" data-id\x3d"' + g.id + '" data-module\x3d"formdatareport" formdata\x3d"' + g.id + '" class\x3d"entitybox-toggle j_formdata" title\x3d"' + g.name + '"\x3e' + g.name + "\x3c/a\x3e",
                    f = null != c.find(".js_form-form-add").get(0) ? f + '\x3ca class\x3d"close js_deleteFormData" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e' : f + "\x3c/span\x3e",
                    c.find(".j_nopermission").remove(),
                    c.find(".js_formitem_container").append(f),
                    c.find(".js_formitem_container").find(".j_formdata").data("dataRow", l);
                else {
                    var f = this.getNewShowList(b, f)
                      , h = c.find(".j_formdata_detail_clone .j_formdata_detail").clone();
                    h.attr("id", g.id).attr("data-id", g.id).attr("formdata", g.id);
                    h.attr("data-module", "formdatareport");
                    h.find(".j_formdata").attr("id", g.id).text(g.name).attr("data-original-title", g.name).data("dataRow", l);
                    for (l = 0; l < f.length; l++) {
                        var g = f[l].substring(0, f[l].indexOf("_"))
                          , m = f[l].substring(f[l].indexOf("_") + 1, f[l].indexOf("-"))
                          , n = f[l].substring(f[l].indexOf("-") + 1)
                          , x = c.find(".j_formdata_detail_clone .j_field").clone();
                        x.attr("id", g);
                        x.find(".j_field_title").text(m);
                        x.find(".j_field_value").text(n);
                        h.find(".j_part .j_line").append(x)
                    }
                    null != c.find(".js_form-form-add").get(0) && h.find(".j_title").append('\x3ca class\x3d"close js_deleteFormData" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e');
                    c.find(".j_nopermission").remove();
                    c.find(".js_formitem_container").append(h)
                }
            }
        },
        getDataRow: function(e, a, c) {
            var b = {};
            b.FORM_DATA = e.id;
            e = [];
            for (var d = 0, f = a.length; d < f; d++) {
                var g = a[d];
                if (null != g.formField) {
                    var l = "C_" + g.formField.id;
                    e.push(g.formField.id);
                    var h = "";
                    if (g.dataOptions && 0 < g.dataOptions.length) {
                        for (var h = [], m = 0, n = g.dataOptions.length; m < n; m++) {
                            var x = {}
                              , C = g.dataOptions[m];
                            x.content = C.content;
                            x.optionId = C.optionId;
                            x.type = C.type;
                            h.push(x)
                        }
                        h = JSON.stringify(h)
                    } else
                        h = g.content;
                    b[l] = h
                }
            }
            a = 0;
            for (d = c.length; a < d; a++) {
                l = c[a];
                f = !0;
                g = 0;
                for (h = e.length; g < h; g++)
                    if (l == e[g]) {
                        f = !1;
                        break
                    }
                f && (l = "C_" + l,
                b[l] = "")
            }
            return b
        },
        empty: function(e) {
            e.find(".js_formitem_container").html("")
        },
        readOnly: function(e, a) {
            var c = this.componentSetup.fieldId + this.cid
              , b = e.find('div[id\x3d"' + c + '"] span[name\x3d"js_form-form-add"]')
              , d = e.find('div[id\x3d"' + c + '"] .js_formitem_container .j_formdata_detail')
              , f = e.find('div[id\x3d"' + c + '"] .js_deleteFormData');
            a ? (b.remove(),
            f.remove()) : b && 0 != b.length && null != b || (b = $(this.tpl).siblings("#preview-form").find('span[name\x3d"js_form-form-add"]'),
            e.find('div[id\x3d"' + c + '"]').find(".js_formitem_container").after(b),
            d.find(".j_title").append('\x3ca class\x3d"close js_deleteFormData" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e'))
        }
    });
    u.exports = window.FormComponent
});

define("form/component/documentselecter", ["form/tplutil", "form/componentmodel"], function(n, y, u) {
    var m = n("form/tplutil")
      , h = n("form/componentmodel");
    n = Backbone.View.extend({
        initialize: function(g) {
            this.$el = g.$el;
            this.module = "document";
            this.userId = g.userId;
            this.toggleType = g.toggleType;
            this.order = g.order;
            this.componentModel = new h
        },
        render: function() {
            var g = this;
            $("#selector-relevance .j_list_loading").addClass("hide");
            $(".pagination-centered").addClass("hide");
            var f = m.get("documentselecter");
            g.$el.html(f);
            f = {};
            f.userId = g.userId;
            g.componentModel.queryList(f, function(d) {
                g.renderFolders(d, g.$el.find(".folderParent"))
            })
        },
        delegateEvents: function() {
            var g = this;
            g.$el.on("click.DocumentSelecter", ".treeview-node em", function(f) {
                f.stopPropagation();
                var d = $(this).parent(".treeview-node");
                if (d.hasClass("treeview-node-on"))
                    d.removeClass("treeview-node-on"),
                    d.next("ul").css("display", "none");
                else if (d.next("ul").css("display", "block"),
                d.addClass("treeview-node-on"),
                !d.hasClass("opened") && 0 == d.next().children().length) {
                    var b = d.parent().data();
                    f = {};
                    b.id ? f = {
                        folder: {
                            id: b.id
                        }
                    } : b.type && (f = {
                        folder: {
                            type: b.type
                        }
                    });
                    $ul = d.next("ul");
                    d = $(".doclist123").css("padding-left");
                    $ul.css("padding-left", parseInt(null == d ? 0 : d) + 20);
                    g.componentModel.queryFolder(f, function(c) {
                        g.renderFolders(c, $ul, b)
                    })
                }
            });
            g.$el.on("click.DocumentSelecter", ".j_moredocument", function(f) {
                f.stopPropagation();
                g.$parentEl = $(this).parent();
                var d = $(this).data("folder")
                  , b = parseInt($(this).attr("pageNo")) + 1;
                f = g.getSearchDocParam(g.userId, d, b);
                g.componentModel.search(f, function(c) {
                    g.renderDocument(c, g.$parentEl, d, b)
                })
            })
        },
        renderFolders: function(g, f, d) {
            var b = this;
            g = g.folders;
            for (var c = 0; g && c < g.length; c++) {
                var l = g[c]
                  , e = b.$el.find("#js_folder-item-clone").clone();
                e.attr("id", l.id);
                e.find(".tree-txt").text(l.name);
                e.data(l);
                f.append(e)
            }
            g = b.getSearchDocParam(b.userId, d);
            b.$parentEl = f;
            f.append("\x3cul class\x3d'e-list nobd'\x3e\x3c/ul\x3e");
            b.componentModel.search(g, function(a) {
                b.renderDocument(a, b.$parentEl.find(".e-list"), d)
            });
            b.$el.find("ul").css("display", "block")
        },
        renderDocument: function(g, f, d, b) {
            if (0 == f.children(".j_moredocument").length) {
                var c = this.$el.find("#copyHide .j_moredocument").clone();
                f.append(c)
            }
            10 <= g.page.result.length ? (f.children(".j_moredocument").show(),
            f.children(".j_moredocument").data("folder", d),
            f.children(".j_moredocument").attr("pageNo", b ? b : 1)) : f.children(".j_moredocument").hide();
            d = g.page.result;
            for (b = 0; d && b < d.length; b++) {
                var l = d[b];
                if (l && (l.author || l.creator)) {
                    c = this.$el.find("#js_doc-item-clone").clone();
                    "entity-toggle-selector" == this.toggleType && (c.addClass("j_check-entity"),
                    c.find(".sn").text(parseInt(g.pageSize * (g.pageNo - 1)) + b + 1),
                    c.find(".sn").css("display", "block"),
                    c.find(".checkbox").remove());
                    c.data("entity", l);
                    c.attr("id", l.id);
                    c.find(".title .text").text(l.name);
                    var e = l.author ? l.author.username : l.creator.username;
                    c.find(".right .user").text(e);
                    e = l.createTime ? Date.create(l.createTime).format("{yyyy}-{MM}-{dd}") : "";
                    c.find(".right .date").text(e);
                    1 <= $("#selector-relevance .selected-relevances #" + l.id).size() && (c.addClass("selected"),
                    c.find(".checkbox i").removeClass("icon-checkbox-unchecked").addClass("icon-checkbox-checked"));
                    f.children(".j_moredocument").before(c)
                }
            }
            "entity-toggle-selector" == this.toggleType && $("#selector-relevance").find(".icon-checkbox-unchecked").addClass("hide");
            this.$el.find("ul").css("display", "block")
        },
        getSearchDocParam: function(g, f, d) {
            var b = "";
            f ? f.id ? b = '"filter":{"type":"mine","keywords":""},' + ('"folder":{"id":"' + f.id + '"},') : f.type && (b = '"filter":{"type":"searchAll","keywords":""},',
            b = "attachment" == f.type ? b + ('"folder":{"type":"' + f.type + '"},"createType":"attach",') : b + ('"folder":{"type":"' + f.type + '"},"createType":"' + f.type + '",')) : b += '"filter":{"type":"mine","keywords":""},"folder":{"type":"privy"},"createType":"newcreate",';
            b += '"userId":"' + g + '","pageNo":"' + (d ? d : 1) + '","pageSize":"10"';
            b = this.order ? b + (',"order":{"property":"' + this.order.property + '","direction":"' + this.order.direction + '"}') : b + ',"order":{"property":"default"}';
            return b = ("{" + b + "}").replace(/\\/g, "\\\\")
        },
        remove: function() {
            this.$el.off(".DocumentSelecter");
            this.$el.remove()
        }
    });
    u.exports = n
});
define("form/component/formsearchview", ["form/tplutil"], function(n, y, u) {
    var m = n("form/tplutil");
    y = Backbone.View.extend({
        initialize: function(h) {
            this.el = h.el ? h.el : ".j_advanceSearch";
            this.formFields = h.formFields;
            this.formId = h.formId;
            this.module = "biaoge";
            this.parentObj = h.parentObj;
            $(this.el).html(m.get("formsearch"))
        },
        delegateEvents: function() {
            var h = this
              , g = $(h.el);
            $("body").on("click.FormSearchView", function(f) {
                0 == $(f.target).closest(".j_comboselect_ul").length && $(".j_comboselect_ul").removeClass("open")
            });
            g.on("change.FormSearchView", ".j_condition", function() {
                var f = $(this)
                  , d = f.val()
                  , b = f.closest(".j_formField-condition");
                "null" == d || "notnull" == d ? (f.next().addClass("hide"),
                b.find(".j_selected,.j_control").addClass("hide")) : (f.next().removeClass("hide"),
                b.find(".j_selected,.j_control").removeClass("hide"))
            });
            g.on("click.FormSearchView", ".j_ok_btn", function() {
                var f = $(this).closest(".j_formField-condition")
                  , d = f.find("li.active:last")
                  , b = d.attr("selectionId")
                  , c = d.attr("title")
                  , d = d.closest(".combo_select_js").attr("id")
                  , g = f.find(".j_selected");
                if (c && b) {
                    var e = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d' + b + ' title\x3d"' + c + '" selectId\x3d"' + d + '"\x3e' + c + "\x3c/a\x3e\x3c/span\x3e";
                    g.find(".entity-item").each(function(a) {
                        b == $(this).find("a").attr("id") && (e = null)
                    });
                    g.append(e)
                }
                f.find(".j_comboselect_ul").removeClass("open")
            });
            g.off("entitySelected", "#statsearch-entity .typeahead-search").on("entitySelected", "#statsearch-entity .typeahead-search", function(f) {
                var d = $(this).parents(".j_entityContainer").find(".j_selected");
                d.data("noEmpty") || d.empty();
                for (var b = 1; b < arguments.length; b++) {
                    var c = arguments[b]
                      , g = c.name || c.shareName
                      , e = c.id
                      , a = c.module;
                    if (g && e) {
                        var k = '\x3cspan id\x3d"' + e + '" class\x3d"entity-item j_entity_item" name\x3d"j_entity_item"\x3e\x3ca status\x3d"' + e + '" title\x3d"' + g + '" id\x3d"' + e + '" class\x3d"entitybox-toggle" data-module\x3d"' + a + '" data-value\x3d"' + e + '" data-id\x3d"' + e + '"\x3e' + g + "\x3c/a\x3e\x3c/span\x3e";
                        d.find(".entity-item").each(function(a) {
                            e == $(this).find("a").attr("id") && (k = null)
                        });
                        d.append(k);
                        d.find(".j_entity_item").data("object", c)
                    }
                }
            });
            g.off("entitySelected", "#statsearch-entity .j_customer,.j_contact,.j_chance,.j_production,.j_contract").on("entitySelected", "#statsearch-entity .j_customer,.j_contact,.j_chance,.j_production,.j_contract", function(f) {
                var d = $(this).parents(".j_entityContainer").find(".j_selected");
                d.empty();
                for (var b = 1; b < arguments.length; b++) {
                    var c = arguments[b]
                      , g = c.module
                      , e = ""
                      , e = "contact" == g ? c.username : c.name
                      , a = c.id;
                    if (e && a) {
                        var k = '\x3cspan id\x3d"' + a + '" class\x3d"entity-item j_entity_item" name\x3d"j_entity_item"\x3e\x3ca title\x3d"' + e + '" id\x3d"' + a + '" class\x3d"entitybox-toggle" data-module\x3d"' + g + '" data-value\x3d"' + a + '" data-id\x3d"' + a + '"\x3e' + e + "\x3c/a\x3e\x3c/span\x3e";
                        d.find(".entity-item").each(function(e) {
                            a == $(this).find("a").attr("id") && (k = null)
                        });
                        d.append(k);
                        d.find(".j_entity_item").data("object", c)
                    }
                }
            });
            g.on("change.FormSearchView", ".j_formField-select select", function() {
                var f = $(this)
                  , d = (new Date).getTime()
                  , b = $(this).find("option:selected")
                  , c = b.attr("id")
                  , l = b.attr("key")
                  , e = b.data("layoutDetail")
                  , a = b.attr("module")
                  , b = b.attr("format")
                  , k = "";
                switch (l) {
                case "name":
                    k = g.find("#name-clone").clone();
                    f.parent().parent().attr("class", "sch-group j_nameSearchGroup");
                    f.parent().parent().find(".j_formField-condition").html(k.html());
                    break;
                case "createTime":
                    k = g.find("#createTime-clone").clone();
                    k.find(".j_datetime").attr("id", "j_datetime" + d);
                    f.parent().parent().attr("class", "sch-group j_createTimeSearchGroup");
                    f.parent().parent().find(".j_formField-condition").html(k.html());
                    n.async("develop" == TEAMS.runMode ? "teams/utils" : "smartheer.js?t_\x3d" + TEAMS.version, function() {
                        n.async("teams/utils", function(a) {
                            a.datepicker({
                                el: h.el + " #j_datetime" + d + " #startTime",
                                callback: function(e) {
                                    e = Date.create(e.date).format("{yyyy}-{MM}-{dd} {HH}:{mm}");
                                    var c = $(h.el + " #j_datetime" + d).find("#startTime")
                                      , b = $(h.el + " #j_datetime" + d).find("#endTime");
                                    b.val() && e > b.val() && (a.notify("\u5f00\u59cb\u65e5\u671f\u4e0d\u80fd\u5927\u4e8e\u7ed3\u675f\u65e5\u671f"),
                                    c.val(""))
                                }
                            });
                            a.datepicker({
                                el: h.el + " #j_datetime" + d + " #endTime",
                                callback: function(e) {
                                    e = Date.create(e.date).format("{yyyy}-{MM}-{dd} {HH}:{mm}");
                                    var c = $(h.el + " #j_datetime" + d).find("#startTime")
                                      , b = $(h.el + " #j_datetime" + d).find("#endTime");
                                    c.val() && e < c.val() && (a.notify("\u7ed3\u675f\u65e5\u671f\u4e0d\u80fd\u5c0f\u4e8e\u5f00\u59cb\u65e5\u671f"),
                                    b.val(""))
                                }
                            })
                        })
                    });
                    break;
                case "type":
                    k = g.find("#distribute-clone").clone();
                    k.find(".j_optcontainer").attr("id", "j_opt" + d);
                    f.parent().parent().attr("class", "sch-group j_typeSearchGroup");
                    f.parent().parent().find(".j_formField-condition").html(k.html());
                    f.parent().parent().find("#typeahead-distribute").attr("formId", h.formId);
                    c = "develop" == TEAMS.runMode ? "teams/component/typeahead" : "smartheer.js?t_\x3d" + TEAMS.version;
                    n.async(c, function() {
                        n.async("teams/component/typeahead", function(a) {
                            a({
                                el: h.el + " #j_opt" + d + " #typeahead-distribute",
                                callback: function(a) {
                                    if (a && !$.isEmptyObject(a)) {
                                        var e = g.find("#j_opt" + d + " .j_selected");
                                        h.renderTypeheader(e, a)
                                    }
                                }
                            })
                        })
                    });
                    break;
                case "operator":
                    k = g.find("#operator-clone").clone();
                    k.find(".j_optcontainer").attr("id", "j_opt" + d);
                    f.parent().parent().attr("class", "sch-group j_optSearchGroup");
                    f.parent().parent().find(".j_formField-condition").html(k.html());
                    c = "develop" == TEAMS.runMode ? "teams/component/typeahead" : "smartheer.js?t_\x3d" + TEAMS.version;
                    n.async(c, function() {
                        n.async("teams/component/typeahead", function(a) {
                            a({
                                el: h.el + " #j_opt" + d + " #typeahead-flow-employee",
                                callback: function(a) {
                                    if (a && !$.isEmptyObject(a)) {
                                        var e = g.find("#j_opt" + d + " .j_selected");
                                        h.renderTypeheader(e, a)
                                    }
                                }
                            })
                        })
                    });
                    break;
                default:
                    f = f.parent().parent(),
                    formPlugin.renderStatSearch({
                        parentEl: f,
                        fieldId: c,
                        componentKey: l,
                        container: h.el,
                        layoutDetail: e,
                        module: a,
                        format: b
                    })
                }
            });
            g.on("change.FormSearchView", ".j_formField-condition .j_resultList", function() {
                var f = $(this)
                  , d = $(this).find("option:selected")
                  , b = d.attr("id")
                  , c = null;
                d.hasClass("finished-line") && (c = "finished-line");
                var d = f.val()
                  , g = f.next().find(".j_selected");
                if (d && b) {
                    var e = '\x3cspan class\x3d"entity-item"\x3e\x3ca class\x3d' + c + " id\x3d" + b + ' title\x3d"' + d + '"\x3e' + d + "\x3c/a\x3e\x3c/span\x3e";
                    g.find(".entity-item").each(function(a) {
                        b == $(this).find("a").attr("id") && (e = null)
                    });
                    g.append(e)
                }
                f.find("option").eq(0).prop("selected", !0)
            });
            g.on("change.FormSearchView", ".j_formField-condition .j_multipleSelect", function() {
                var f = $(this)
                  , d = $(this).find("option:selected").attr("id")
                  , b = f.val()
                  , c = f.next().find(".j_selected");
                if (b) {
                    var g = '\x3cspan class\x3d"entity-item"\x3e\x3ca status\x3d' + d + ' title\x3d"' + b + '"\x3e' + b + "\x3c/a\x3e\x3c/span\x3e";
                    c.find(".entity-item").each(function(e) {
                        d == $(this).find("a").attr("status") && (g = null)
                    });
                    c.append(g)
                }
                f.find("option").eq(0).prop("selected", !0)
            });
            g.on("click.FormSearchView", ".j_addCondition", function() {
                g.find(".j_search-submit").trigger("addCondition")
            });
            g.on("addCondition.FormSearchView", ".j_search-submit", function() {
                var f = h.formFields
                  , d = g.find("#form-search-clone").clone();
                g.find("#search-group-list").append(d.removeAttr("id").removeClass("hide"));
                d = d.find(".j_formField-select select");
                h.renderSearchComponent(f, d)
            });
            g.on("click.FormSearchView", ".j_deletesearch", function() {
                $(this).parents(".sch-group").remove()
            });
            g.on("click.FormSearchView", ".j_search-submit", function() {
                h.parentObj && (h.parentObj.isKeyword = !1);
                $(this).hasClass("locked") || ($(this).addClass("locked"),
                $("#formdata_list").trigger("formSearch"))
            });
            g.on("click.FormSearchView", ".j_search_close", function() {
                $("#formAdvanceSearch").trigger("CLOSE.FormdataList")
            });
            g.on("keyup.FormSearchView", ".j_formFieldSearchGroup .j_numberCheck", function(f) {
                f = $(this).val();
                $(this).val(f.replace(/[^\d.-]/g, ""))
            });
            g.on("blur.FormSearchView", ".j_formFieldSearchGroup .j_numberCheck", function(f) {
                $(this).trigger("keyup.FormSearchView")
            });
            g.on("keydown.FormSearchView", ".j_formFieldSearchGroup .j_numberCheck", function(f) {
                f = parseInt(f.keyCode);
                var d = $(this).val();
                if ((110 == f || 190 == f) && 0 <= d.indexOf(".") || (109 == f || 173 == f) && 0 <= d.indexOf("-"))
                    return !1
            });
            g.off("entitySelected", "#statsearch-mainline .entity-toggle").on("entitySelected", "#statsearch-mainline .entity-toggle", function(f) {
                g.find("#statsearch-mainline").find(".entity-container").empty();
                for (var d = 1; d < arguments.length; d++) {
                    var b = arguments[d]
                      , c = b.name
                      , l = b.id;
                    if (c && l) {
                        var e = '\x3cspan id\x3d"' + l + '" class\x3d"entity-item j_entity_item" name\x3d"j_entity_item"\x3e\x3ca id\x3d"' + l + '" class\x3d"entitybox-toggle" data-module\x3d"mainline" data-value\x3d"' + l + '" data-id\x3d"' + l + '" title\x3d"' + c + '"\x3e' + c + "\x3c/a\x3e\x3c/span\x3e";
                        g.find("#statsearch-mainline").find(".entity-item").each(function(a) {
                            l == $(this).find("a").attr("id") && (e = null)
                        });
                        g.find("#statsearch-mainline").find(".entity-container").append(e);
                        g.find("#statsearch-mainline").find(".entity-container").find(".j_entity_item").data("object", b)
                    }
                }
            })
        },
        render: function() {
            var h = $(this.el)
              , g = h.find("#search-group-list .j_formField-select select");
            h.find(".j_filterSub").data("isFilterSub", "false").removeClass("open");
            this.renderSearchComponent(this.formFields, g)
        },
        renderSearchComponent: function(h, g) {
            var f = this;
            $(f.el);
            _.each(h, function(d) {
                var b = d.id
                  , c = d.componentKey
                  , l = d.title
                  , e = $("\x3coption id\x3d" + b + " key\x3d" + c + "\x3e" + l + "\x3c/option\x3e");
                d.subForm && d.subForm.id && (e = $("\x3coption id\x3d" + b + " subFormId\x3d" + d.subForm.id + " key\x3d" + c + "\x3e" + l + "\x3c/option\x3e"));
                0 != d["delete"] && (e.addClass("option-line"),
                e.text(e.text() + "(\u5df2\u5220\u9664)"));
                e.attr("module", d.form.module);
                "ImageComponent" != c && "FileComponent" != c && "SignatureComponent" != c && (e.data("layoutDetail", d.layoutDetail),
                "DateComponent" == c && d.layoutDetail && (d = JSON.parse(d.layoutDetail),
                e.attr("format", d.format)),
                f.moduleDisable(c) || g.append(e))
            });
            g.trigger("change.FormSearchView")
        },
        moduleDisable: function(h) {
            if ("Mainline" == h)
                return this.isDisableModule("mainline");
            if ("Task" == h)
                return this.isDisableModule("task");
            if ("Document" == h)
                return this.isDisableModule("document");
            if ("Workflow" == h)
                return this.isDisableModule("workflow");
            if ("FormComponent" == h)
                return this.isDisableModule("form");
            if ("CustomerComponent" == h)
                return this.isDisableModule("customer");
            if ("ContactComponent" == h)
                return this.isDisableModule("contact");
            if ("ChanceComponent" == h)
                return this.isDisableModule("saleChance");
            if ("ProductionComponent" == h)
                return this.isDisableModule("production");
            if ("ContractComponent" == h)
                return this.isDisableModule("contract")
        },
        isDisableModule: function(h) {
            if (h)
                return _.some(TEAMS.disableModules, function(g) {
                    return g.moduleId == h || g.module == h && 100 > g.moduleId
                })
        },
        assembleParam: function() {
            var h = this
              , g = $(h.el)
              , f = {}
              , d = [];
            g.find("#search-group-list .j_nameSearchGroup").each(function(a) {
                var e = $(this).find(".j_formField-condition select option:selected");
                a = $(this).find(".j_formField-condition");
                var e = e.attr("value")
                  , c = ""
                  , c = $.trim(a.find("input").val());
                "" == c && (c = null);
                if (null == c)
                    return !0;
                d.push({
                    content: c,
                    term: e
                })
            });
            f.names = d;
            var b = [];
            g.find("#search-group-list .j_createTimeSearchGroup").each(function(a) {
                var e = $(this).find(".j_formField-condition select option:selected");
                a = $(this).find(".j_formField-condition");
                var e = e.attr("value")
                  , c = ""
                  , d = ""
                  , c = $.trim(a.find("input").eq(0).val())
                  , d = $.trim(a.find("input").eq(1).val());
                "" == c && (c = null);
                "" == d && (d = null);
                if (null == c && null == d)
                    return !0;
                b.push({
                    content: c,
                    endContent: d,
                    term: e
                })
            });
            f.createTimes = b;
            var c = [];
            g.find("#search-group-list .j_typeSearchGroup").each(function(a) {
                var e = $(this).find(".j_formField-condition select option:selected");
                a = $(this).find(".j_formField-condition .j_selected");
                var e = e.attr("value")
                  , b = [];
                a.find(".entity-item").each(function(a) {
                    a = $(this).find("a").attr("status");
                    b.push(a)
                });
                if (0 == b.length)
                    return !0;
                c.push({
                    ids: b,
                    term: e
                })
            });
            f.types = c;
            var l = [];
            g.find("#search-group-list .j_optSearchGroup").each(function(a) {
                var e = $(this).find(".j_formField-condition select option:selected");
                a = $(this).find(".j_formField-condition .j_selected");
                var e = e.attr("value")
                  , c = [];
                a.find(".entity-item").each(function(a) {
                    a = $(this).find("a").attr("id");
                    c.push(a)
                });
                if (0 == c.length)
                    return !0;
                l.push({
                    ids: c,
                    term: e
                })
            });
            f.operators = l;
            var e = [];
            g.find("#search-group-list .j_formFieldSearchGroup").each(function(a) {
                var c = $(this).find(".j_formField-select select option:selected")
                  , b = $(this).find(".j_formField-condition .j_condition option:selected");
                a = $(this).find(".j_formField-condition");
                var d = $(this).find(".j_formField-condition .j_selected")
                  , f = c.attr("id")
                  , g = c.attr("subformid")
                  , c = c.attr("key")
                  , b = b.attr("value")
                  , l = ""
                  , m = ""
                  , s = []
                  , l = "Text TextArea Email Phone Mobile FileComponent SerialNumber PositionComponent".split(" ")
                  , m = ["DateComponent", "Money", "NumberComponent", "Monitor", "Raty"]
                  , f = {
                    fieldId: f,
                    subFormId: g,
                    componentKey: c,
                    term: b
                };
                if ("null" != b && "notnull" != b)
                    if (h.getType(c, l)) {
                        l = $.trim(a.find("input").val());
                        if ("" == l)
                            return !0;
                        f.content = l
                    } else if (h.getType(c, m)) {
                        l = $.trim(a.find("input").eq(0).val());
                        m = $.trim(a.find("input").eq(1).val());
                        "" == l && (l = null);
                        "" == m && (m = null);
                        if (null == l && null == m)
                            return !0;
                        f.content = l;
                        f.endContent = m
                    } else if ("ComboSelect" == c) {
                        var n = [];
                        d.find(".entity-item").each(function(a) {
                            a = $(this).find("a").attr("selectId");
                            var e;
                            a: {
                                for (e = 0; e < n.length; e++)
                                    if (n[e].fieldId == a) {
                                        e = !0;
                                        break a
                                    }
                                e = !1
                            }
                            e || n.push({
                                fieldId: a,
                                componentKey: "Select"
                            })
                        });
                        for (a = 0; a < n.length; a++)
                            g = n[a],
                            s = [],
                            d.find("a[selectId\x3d'" + g.fieldId + "']").each(function(a) {
                                a = $(this).attr("id");
                                s.push(a)
                            }),
                            g.ids = s;
                        if (0 == n.length)
                            return !0;
                        f.children = n
                    } else {
                        d.find(".entity-item").each(function(a) {
                            a = $(this).find("a").attr("id");
                            s.push(a)
                        });
                        if (0 == s.length)
                            return !0;
                        f.ids = s
                    }
                e.push(f)
            });
            f.filterFormDatas = e;
            0 < g.find(".j_filterSub").length && (f.isFilterSub = g.find(".j_filterSub").data("isFilterSub"));
            return f
        },
        renderTypeheader: function(h, g) {
            if (g.length)
                for (var f = 0; f < g.length; f++) {
                    var d = g[f]
                      , b = d.name
                      , c = d.id;
                    if (b && c) {
                        var l = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d' + c + ' title\x3d"' + b + '"\x3e' + b + "\x3c/a\x3e\x3c/span\x3e";
                        h.data("isPerTag") ? l = '\x3cspan class\x3d"entity-item" id\x3d' + c + "\x3e\x3ca id\x3d" + c + ' data-id\x3d"' + c + '" data-value\x3d"' + c + '" title\x3d"' + b + '"\x3e' + b + "\x3c/a\x3e\x3c/span\x3e" : h.data("isComTag") ? l = '\x3cspan class\x3d"entity-item" id\x3d' + c + "\x3e\x3ca id\x3d" + c + ' data-id\x3d"' + c + '" data-value\x3d"' + c + '" title\x3d"' + b + '"\x3e' + b + "\x3c/a\x3e\x3c/span\x3e" : h.data("isSetData") && (d = h.data("module"),
                        l = '\x3cspan class\x3d"entity-item" id\x3d' + c + '\x3e\x3ca class\x3d"entitybox-toggle" id\x3d' + c + ' data-id\x3d"' + c + '" data-value\x3d"' + c + '" data-module\x3d"' + d + '" title\x3d"' + b + '"\x3e' + b + "\x3c/a\x3e\x3c/span\x3e");
                        h.find(".entity-item").each(function(e) {
                            c == $(this).find("a").attr("id") && (l = null)
                        });
                        h.append(l)
                    }
                }
            else
                b = g.name || g.shareName,
                c = g.id,
                b && c && (l = '\x3cspan class\x3d"entity-item"\x3e\x3ca status\x3d ' + c + " id\x3d" + c + ' title\x3d"' + b + '"\x3e' + b + "\x3c/a\x3e\x3c/span\x3e",
                h.data("isPerTag") ? l = '\x3cspan class\x3d"entity-item" id\x3d' + c + "\x3e\x3ca id\x3d" + c + ' data-id\x3d"' + c + '" data-value\x3d"' + c + '" title\x3d"' + b + '"\x3e' + b + "\x3c/a\x3e\x3c/span\x3e" : h.data("isComTag") ? l = '\x3cspan class\x3d"entity-item" id\x3d' + c + "\x3e\x3ca id\x3d" + c + ' data-id\x3d"' + c + '" data-value\x3d"' + c + '" title\x3d"' + b + '"\x3e' + b + "\x3c/a\x3e\x3c/span\x3e" : h.data("isSetData") && (d = h.data("module"),
                l = '\x3cspan class\x3d"entity-item" id\x3d' + c + '\x3e\x3ca class\x3d"entitybox-toggle" id\x3d' + c + ' data-id\x3d"' + c + '" data-value\x3d"' + c + '" data-module\x3d"' + d + '" title\x3d"' + b + '"\x3e' + b + "\x3c/a\x3e\x3c/span\x3e"),
                h.find(".entity-item").each(function(e) {
                    c == $(this).find("a").attr("id") && (l = null)
                }),
                h.append(l))
        },
        getType: function(h, g) {
            return -1 < g.toString().indexOf(h) ? !0 : !1
        },
        remove: function() {
            $(this.el).off(".FormSearchView");
            $("body").off(".FormSearchView");
            $(this.el).find(".j_formstat-search").remove()
        }
    });
    u.exports = y
});
define("form/component/productionlist", ["form/tplutil", "form/component/formfilter"], function(n, y, u) {
    var m = n("form/tplutil")
      , h = n("form/component/formfilter");
    n = Backbone.View.extend({
        initialize: function() {},
        render: function(g, f) {
            "pc" == g ? this.initPC.init(f) : this.initMb.init(f)
        },
        initPC: {
            init: function(g) {
                this.el = "#production_list";
                this.targetEl = g.targetEl;
                this.keyword = g.keyword;
                this.isUnique = g.isUnique;
                this.seletedList = g.seletedList;
                this.selectColumn = g.selectColumn;
                this.order = g.order;
                this.isAddForRelation = g.isAddForRelation;
                this.fileds = [{
                    title: "\u521b\u5efa\u65f6\u95f4",
                    position: "left"
                }, {
                    title: "\u4ea7\u54c1\u540d\u79f0",
                    position: "left"
                }];
                this.tpl = m.get("productionlist");
                $("body").append($(this.tpl));
                this.render();
                this.delegateEvents()
            },
            delegateEvents: function() {
                var g = this
                  , f = $(g.el);
                f.off(".ProductionList");
                f.on("keyup.ProductionList", ".j_search-input", function(d) {
                    13 === d.keyCode && f.find(".j_search-btn").trigger("click")
                });
                f.on("click.ProductionList", ".j_search-btn", function() {
                    $(this).hasClass("locked") || ($(this).addClass("locked"),
                    g.queryProduction(1))
                });
                f.on("click.ProductionList", ".j_btn-cancel", function() {
                    g.close()
                });
                f.on("click.ProductionList", ".j_closelist", function() {
                    g.close()
                });
                f.on("click.ProductionList", ".j_btn-ok", function() {
                    for (var d = [], b = f.find(".j_opt .j_select .j_select_data"), c = 0; c < b.length; c++) {
                        var l = $(b[c]).data("production");
                        d.push(l)
                    }
                    $(g.targetEl).trigger("entitySelected", d);
                    g.close()
                });
                f.on("click.ProductionList", "tbody tr", function() {
                    var d = $(this)
                      , b = $(this).data("production")
                      , c = $(this).attr("id")
                      , l = $(this).find(".j_productionName").text();
                    d.hasClass("active") ? ($(this).find('input[name\x3d"productionselect"]').prop("checked", !1),
                    $(this).removeClass("active"),
                    $(this).find('input[name\x3d"productionselect"]').css("display", ""),
                    f.find(".j_opt .j_select").find("#" + c).remove()) : ($(this).find('input[name\x3d"productionselect"]').prop("checked", !0),
                    $(this).addClass("active"),
                    $(this).find('input[name\x3d"productionselect"]').css("display", "inline-block"),
                    0 == f.find(".j_opt .j_select").find("#" + c).length && (f.find(".j_opt .j_select").append('\x3ca class\x3d"j_select_data" id\x3d"' + c + '"\x3e' + l + "\x3c/a\x3e"),
                    f.find(".j_opt .j_select").find("#" + c).data("production", b)));
                    if (1 == g.isUnique || "true" == g.isUnique)
                        $(g.targetEl).trigger("entitySelected", b),
                        g.close()
                });
                f.on("click.ProductionList", ".page-first", function() {
                    $(this).hasClass("disabled") || g.queryProduction(1)
                });
                f.on("click.ProductionList", ".page-pre:not(.disabled)", function() {
                    if (!$(this).hasClass("disabled")) {
                        var d = $(g.el).find(".pagination").data("page");
                        g.queryProduction(d.pageNo - 1)
                    }
                });
                f.on("click.ProductionList", ".page-next:not(.disabled)", function() {
                    if (!$(this).hasClass("disabled")) {
                        var d = $(g.el).find(".pagination").data("page");
                        g.queryProduction(d.pageNo + 1)
                    }
                });
                f.on("click.ProductionList", ".pagination .page-last", function() {
                    if (!$(this).hasClass("disabled")) {
                        var d = $(g.el).find(".pagination").data("page");
                        g.queryProduction(d.totalPages)
                    }
                });
                f.on("hidden.bs.modal.ProductionList", function() {
                    g.remove()
                });
                f.off("mouseenter.ProductionList", "#rel-filter").on("mouseenter.ProductionList", "#rel-filter", function(d) {
                    $(this).addClass("open");
                    var b = $(this).attr("data-toggle");
                    g.reldropdownFilter || (g.reldropdownFilter = new h({
                        el: b,
                        module: "production",
                        targetObj: $(this),
                        userId: TEAMS.currentUser.id,
                        scroll: !0,
                        scrollheight: 395
                    }),
                    g.reldropdownFilter.render(d));
                    d = setTimeout(function() {
                        $(b).parents(".dropdown-filter").slideDown("fast")
                    }, 300);
                    $(this).data("showTimer", d)
                }).off("mouseleave.ProductionList", "#rel-filter").on("mouseleave.ProductionList", "#rel-filter", function(d) {
                    if (!$(d.toElement).hasClass("datetimepicker")) {
                        $(this).removeClass("open");
                        d = $(this).attr("data-toggle");
                        var b = $(this).data("showTimer");
                        b && clearTimeout(b);
                        $(this).removeData("showTimer");
                        $(d).parents(".dropdown-filter").slideUp(100)
                    }
                }).off("filter.ProductionList", "#rel-filter").on("filter.ProductionList", "#rel-filter", function(d) {
                    g.loadDataType = null;
                    g.queryProduction(1);
                    $(this).removeClass("open")
                })
            },
            render: function() {
                var g = this;
                formPlugin.destroyLayout(".eui-scroll.statbody");
                formPlugin.layout(".eui-scroll.statbody", {
                    onTotalScroll: function() {
                        var f = parseInt(g.pageNo) + 1;
                        f && !$(".eui-scroll.statbody").hasClass("lock") && ($(".eui-scroll.statbody").addClass("lock"),
                        g.queryProduction(f, function(d) {
                            $(".eui-scroll.statbody").removeClass("lock")
                        }))
                    }
                }, [{
                    axis: "yx",
                    gotoTopButton: !0,
                    scrollInertia: 394
                }]);
                $(g.el).find(".j_production.production").data("targetEl", g.targetEl);
                g.renderSelect(g.seletedList);
                g.queryProduction(1);
                0 < $("body").find(".form-preview-wrapper").length && $("#production_list").find("#production-create-fast").remove();
                0 != g.isAddForRelation && "false" != g.isAddForRelation || $("#production_list").find("#production-create-fast").remove();
                $(g.el).modal()
            },
            renderSelect: function(g) {
                for (var f = $(this.el), d = 0; d < g.length; d++) {
                    var b = g[d];
                    0 == f.find(".j_opt .j_select").find("#" + b.id).length && (f.find(".j_opt .j_select").append('\x3ca class\x3d"j_select_data" id\x3d"' + b.id + '"\x3e' + b.name + "\x3c/a\x3e"),
                    f.find(".j_opt .j_select").find("#" + b.id).data("production", b.production))
                }
            },
            queryProduction: function(g, f) {
                $(".j_page").hide();
                var d = this
                  , b = $(d.el).find(".j_search-btn")
                  , c = $(d.el)
                  , l = $.trim(c.find(".j_search-input").val())
                  , c = c.find(".j_search-input").attr("placeholder");
                if (l != c) {
                    var c = void 0 == $("#rel-filter").data("data-filter") ? "" : $("#rel-filter").data("data-filter")
                      , e = '"type":"all"';
                    c && "" != c && (e += "," + c);
                    filteStr = "{" + e + "}";
                    filteStr = jQuery.parseJSON(filteStr);
                    c = "updateTime";
                    e = "desc";
                    d.order && (c = d.order.property,
                    e = d.order.direction);
                    l = {
                        darw: 1,
                        pageNo: g,
                        pageSize: 20,
                        orderWay: e,
                        orderBy: c,
                        conditions: [{
                            id: "name",
                            type: "string",
                            value: l
                        }],
                        filter: filteStr,
                        customConditions: []
                    };
                    1 == g && $(d.el).find("#stat_table tbody").empty();
                    $(d.el).find("#more_data").hide();
                    $.ajax({
                        type: TEAMS.ajaxMethod,
                        url: "/production/getAllProductions",
                        dataType: "json",
                        data: {
                            queryStr: JSON.stringify(l),
                            employeeId: TEAMS.currentUser.id
                        },
                        success: function(a) {
                            if (!a.message || !a.message) {
                                var e = {};
                                g = parseInt(g);
                                e.result = a.data;
                                e.pageNo = g;
                                e.pageSize = 20;
                                a = a.recordsTotal;
                                e.totalCount = a;
                                e.hasPre = 1 <= g - 1;
                                var c = parseInt(a / 20);
                                0 < a % 20 && c++;
                                e.totalPages = c;
                                e.hasNext = g + 1 <= c;
                                d.renderProduction(e, f);
                                d.pageNo = e.pageNo;
                                b.removeClass("locked")
                            }
                        }
                    })
                }
            },
            renderProduction: function(g, f) {
                var d = $(this.el);
                if (1 == g.pageNo) {
                    if (null == g.result || 1 > g.result.length) {
                        $(this.el).find(".j_production_empty").removeClass("hide");
                        return
                    }
                    $(this.el).find(".j_production_empty").addClass("hide")
                }
                var b = this.selectColumn;
                null == b && (b = []);
                $(this.el).find("#list-loading").hide();
                $(this.el).find("#statbody").show();
                if (0 == d.find("#stat_table thead tr th").length) {
                    for (var c = d.find("#stat_table thead tr"), l = 0; l < b.length; l++) {
                        var e = b[l]
                          , a = e.substring(0, e.indexOf("_"))
                          , k = e.substring(e.indexOf("_") + 1);
                        c.append("\x3cth title\x3d'" + k + "'\x3e\x3cdiv\x3e" + k + "\x3c/div\x3e\x3c/th\x3e")
                    }
                    for (l = 0; l < this.fileds.length; l++)
                        k = this.fileds[l],
                        "left" === k.position && c.prepend("\x3cth title\x3d'" + k.title + "'\x3e\x3cdiv\x3e" + k.title + "\x3c/div\x3e\x3c/th\x3e");
                    c.prepend("\x3cth\x3e\x3c/th\x3e")
                }
                c = g.result;
                if (null != c && 0 != c.length) {
                    for (l = 0; l < c.length; l++) {
                        var k = c[l]
                          , h = k.id
                          , a = k.name
                          , m = Date.create(k.createDate).format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}");
                        if (!(0 < d.find("#stat_table tr").find("#" + h).length)) {
                            var q = $("\x3ctr style\x3d'cursor:pointer;' id\x3d" + h + "\x3e\x3c/tr\x3e");
                            q.data("production", k);
                            q.append('\x3ctd\x3e\x3cdiv class\x3d"sn"\x3e' + ((g.pageNo - 1) * g.pageSize + l + 1) + '\x3c/div\x3e\x3cdiv class\x3d"checkbox-div"\x3e\x3cinput name\x3d"productionselect" type\x3d"checkbox"\x3e\x3c/input\x3e\x3c/div\x3e\x3c/td\x3e');
                            q.append("\x3ctd class\x3d'j_productionName noSub_name_" + h + "'\x3e" + a + "\x3c/td\x3e");
                            q.append("\x3ctd class\x3d'j_createTime noSub_name_" + h + "'\x3e" + m + "\x3c/td\x3e");
                            for (m = 0; m < b.length; m++)
                                if (e = b[m],
                                a = e.substring(0, e.indexOf("_")),
                                e.substring(e.indexOf("_") + 1),
                                "manager" == a)
                                    e = "",
                                    k[a] && k[a] && (e = k[a].username ? k[a].username : ""),
                                    q.append("\x3ctd class\x3d'j_column' id\x3d'" + a + "' title\x3d'" + e + "'\x3e" + e + "\x3c/td\x3e");
                                else if ("price" == a || "unit" == a || "description" == a)
                                    e = k[a] ? k[a] : "",
                                    q.append("\x3ctd class\x3d'j_column' id\x3d'" + a + "' title\x3d'" + e + "'\x3e" + e + "\x3c/td\x3e");
                            d.find("#stat_table tbody").append(q);
                            0 < d.find(".j_opt .j_select").find("#" + h).length && (d.find("#stat_table tbody").find('tr[id\x3d"' + h + '"]').find('input[name\x3d"productionselect"]').prop("checked", !0).css("display", "inline-block"),
                            d.find("#stat_table tbody").find('tr[id\x3d"' + h + '"]').addClass("active"))
                        }
                    }
                    g.result.length && g.result.length == g.pageSize && f && f()
                }
            },
            renderPage: function(g) {
                if (g) {
                    var f = g.result;
                    $(this.el).find(".pagination").data("page", g);
                    $(this.el).find(".active a").html("\u7b2c" + g.pageNo + "/" + g.totalPages + "\u9875");
                    g.hasNext ? ($(this.el).find(".page-next").removeClass("disabled"),
                    $(this.el).find(".page-last").removeClass("disabled")) : ($(this.el).find(".page-next").addClass("disabled"),
                    $(this.el).find(".page-last").addClass("disabled"));
                    g.hasPre ? ($(this.el).find(".page-pre").removeClass("disabled"),
                    $(this.el).find(".page-first").removeClass("disabled")) : ($(this.el).find(".page-pre").addClass("disabled"),
                    $(this.el).find(".page-first").addClass("disabled"));
                    1 == g.pageNo && (null == f || 1 > f.length ? ($(this.el).find(".j_production_empty").removeClass("hide"),
                    $(this.el).find(".j_page").hide()) : ($(this.el).find(".j_production_empty").addClass("hide"),
                    $(this.el).find(".j_page").show()))
                }
            },
            close: function() {
                $(this.el).modal("hide")
            },
            remove: function() {
                var g = $(this.el);
                g.modal("hide");
                g.off(".ProductionList");
                g.remove();
                this.reldropdownFilter = null
            }
        }
    });
    u.exports = n
});

define("form/component/monitor", ["form/component", "form/tplutil", "form/componentmodel", "form/component/monitoreditor", "form/editablecomponent"], function(n, y, u) {
    function m(b, c, d, e) {
        this.value = b;
        this.type = c;
        this.monitorFields = d;
        this.monitorType = e
    }
    n("form/component");
    var h = n("form/tplutil")
      , g = n("form/componentmodel")
      , f = n("form/component/monitoreditor")
      , d = n("form/editablecomponent");
    window.Monitor = d.extend({
        initialize: function(b) {
            this.componentSetup = {
                componentKey: "Monitor",
                title: "\u8fd0\u7b97\u63a7\u4ef6",
                titleLayout: "field-hoz",
                order: 0,
                index: 0,
                describe: "",
                fieldId: "",
                monitorType: "number",
                value: "",
                format: "",
                tempId: 0,
                monitorFields: [],
                required: !1,
                isHideTitle: !1,
                isEdit: !0,
                pointSize: "",
                condition: null,
                dateType: "calendar",
                tableId: "",
                colId: "",
                isOrgtiqu: !1,
                isOrgtiqulist: !1,
                isCapital: !1
            };
            null != b && (this.componentSetup.title = b.title,
            this.componentSetup.titleLayout = b.titleLayout,
            this.componentSetup.order = b.order,
            this.componentSetup.index = b.index,
            this.componentSetup.describe = b.describe,
            this.componentSetup.fieldId = b.fieldId,
            this.componentSetup.monitorType = b.monitorType || this.componentSetup.monitorType,
            this.componentSetup.componentIds = _.filter(b.componentIds, function(c) {
                return "" != c
            }),
            this.componentSetup.value = b.value,
            this.componentSetup.format = b.format,
            this.componentSetup.tempId = b.tempId || b.fieldId,
            this.componentSetup.monitorFields = b.monitorFields,
            this.componentSetup.isHideTitle = b.isHideTitle,
            this.componentSetup.isEdit = b.isEdit,
            this.componentSetup.condition = b.condition,
            this.componentSetup.pointSize = b.pointSize,
            this.componentSetup.dateType = b.dateType,
            this.componentSetup.tableId = b.tableId,
            this.componentSetup.colId = b.colId,
            this.componentSetup.isOrgtiqu = b.isOrgtiqu,
            this.componentSetup.isOrgtiqulist = b.isOrgtiqulist,
            this.componentSetup.isCapital = b.isCapital);
            b = h.get("monitor", {
                isMobileForm: "mobile" == window.systemInfo_form
            });
            this.editTpl = h.get("editablecomponent");
            this.tpl = b;
            this.componentModel = new g;
            this.eventFiled = [];
            this.autoFiled = [];
            this.monitors = []
        },
        setCondition: function(b) {
            this.componentSetup.condition = b
        },
        setPointSize: function(b) {
            this.componentSetup.pointSize = b
        },
        setTitle: function(b) {
            this.componentSetup.title = b
        },
        setDescribe: function(b) {
            this.componentSetup.describe = b
        },
        setRequired: function(b) {
            this.componentSetup.required = b
        },
        setSize: function(b) {
            this.componentSetup.size = b
        },
        setTitleLayout: function(b) {
            this.componentSetup.titleLayout = b
        },
        setMonitorType: function(b) {
            this.componentSetup.monitorType = b
        },
        setComponentIds: function(b) {
            this.componentSetup.componentIds = b
        },
        setText: function(b) {
            this.componentSetup.value = b
        },
        setMonitorFields: function(b) {
            this.componentSetup.monitorFields = b
        },
        setIsEdit: function(b) {
            this.componentSetup.isEdit = b
        },
        setIsHideTitle: function(b) {
            this.componentSetup.isHideTitle = b
        },
        setDateType: function(b) {
            this.componentSetup.dateType = b
        },
        setIsCapital: function(b) {
            this.componentSetup.isCapital = b
        },
        getComponentKey: function() {
            return this.componentSetup.componentKey
        },
        setRelatDataTableId: function(b) {
            this.componentSetup.tableId = b
        },
        setRelatDataUnitId: function(b) {
            this.componentSetup.colId = b
        },
        setIsOrgtiqu: function(b) {
            this.componentSetup.isOrgtiqu = b
        },
        setIsOrgtiqulist: function(b) {
            this.componentSetup.isOrgtiqulist = b
        },
        render: function(b) {
            var c = this
              , d = $(this.tpl).siblings("#form-monitor");
            d.find(".widget-title .widget-title_js").text(this.componentSetup.title);
            "true" != this.componentSetup.isHideTitle && 1 != this.componentSetup.isHideTitle || d.addClass("field-notitle").find(".widget-title .widget-title_js").addClass("hide");
            "" != this.componentSetup.describe && (d.find(".field-description").text(this.componentSetup.describe),
            d.find(".field-description").show());
            b.attr("class", d.attr("class"));
            b.addClass(this.componentSetup.titleLayout);
            this.componentModel.generatorId(function(e) {
                e = e.generatorId;
                c.componentSetup.tempId = e;
                b.attr("tempId", e)
            });
            b.html(d.html())
        },
        renderEditPreview: function(b) {
            var c = $(this.tpl).siblings("#form-monitor");
            c.find(".widget-title .widget-title_js").text(this.componentSetup.title);
            "true" != this.componentSetup.isHideTitle && 1 != this.componentSetup.isHideTitle || b.hasClass("subtd_js") || c.addClass("field-notitle").find(".widget-title .widget-title_js").addClass("hide");
            "true" != this.componentSetup.required && 1 != this.componentSetup.required || c.find(".widget-title .widget-required_js").text(" *");
            "" != this.componentSetup.describe && (c.find(".field-description").text(this.componentSetup.describe),
            c.find(".field-description").show());
            c.find(".form-control").attr("class", "form-control " + this.componentSetup.size);
            var d = "true" === this.componentSetup.isEdit ? !1 : !0;
            c.find(".check_js").attr("disabled", d);
            c.attr("id", this.componentSetup.fieldId);
            c.attr("tempId", this.componentSetup.tempId);
            c.data("componentData", this);
            c.addClass(this.componentSetup.titleLayout);
            b.append(c)
        },
        renderEditor: function() {
            var b = $(this.tpl)
              , c = this.componentSetup
              , f = c.monitorType
              , e = b.siblings("#editor-monitor")
              , b = this.componentSetup.pointSize;
            "" != b && null != b && "sel" != b ? e.find(".j_monitor_point-select option[value\x3d'" + b + "']").attr("selected", !0) : e.find(".j_monitor_point-select option[value\x3d'sel']").attr("selected", !0);
            d.prototype.renderEditor.call(this, e);
            e.find("input:radio[name\x3d'monitor-type'][value\x3d'" + f + "']").attr("checked", !0);
            e.find("input:radio[name\x3d'date-type'][value\x3d'" + c.dateType + "']").attr("checked", !0);
            e.find("div[type\x3d'" + f + "']").show();
            e.find("input:radio[name\x3d'isedit'][value\x3d'" + c.isEdit + "']").attr("checked", !0);
            c = this.componentSetup.isCapital;
            1 != c && "true" != c || e.find("#isCapital").attr("checked", "true");
            c = this.getAllNumberField();
            b = this.componentSetup.monitorFields;
            "number" === f && (e.find(".j_choicelistEdit_number").html("\x3ca class\x3d'j_edit_number'\x3e\u70b9\u51fb\u8bbe\u7f6e\x3c/a\x3e"),
            e.find(".j_isCapital_Div").removeClass("hide"));
            "date" === f && (e.find(".j_isCapital_Div").addClass("hide"),
            e.find(".j_select_date").html(c),
            b && 0 < b.length && ($.each(b, function(a, c) {
                "string" == typeof c && (c = JSON.parse(c));
                "field" === c.type && e.find(".j_select_date option[value\x3d'" + c.value + "']").attr("selected", !0);
                "operate" === c.type && e.find("input[value\x3d'" + c.value + "']").attr("checked", !0);
                "number" === c.type && e.find(".j_number_input").attr("value", c.value)
            }),
            e.find("input[name\x3d'format'][value\x3d'" + this.componentSetup.format + "']").attr("checked", !0)));
            $("#editor-component").html(e.html());
            "number" === f && $(".j_operate_show").show();
            "date" === f && ($(".j_format_show").show(),
            $(".j_datetype").show());
            this.getFormula()
        },
        renderPreview: function(b, c, d) {
            c = $(this.tpl).siblings("#preview-monitor");
            this.isLogin = !0;
            var e = $("body").find("#formTenantKey").val();
            e ? e = e.toUpperCase() : null != TEAMS.currentTenant && (e = TEAMS.currentTenant.tenantKey.toUpperCase());
            if (null == TEAMS.currentUser || TEAMS.currentTenant.tenantKey.toUpperCase() != e)
                this.isLogin = !1;
            c.find(".widget-title .widget-title_js").text(this.componentSetup.title);
            "true" != this.componentSetup.isHideTitle && 1 != this.componentSetup.isHideTitle || c.addClass("field-notitle").find(".widget-title .widget-title_js").addClass("hide");
            "" != this.componentSetup.describe && (c.find(".field-description").text(this.componentSetup.describe),
            c.find(".field-description").show());
            c.addClass(this.componentSetup.titleLayout);
            c.attr("id", "field_" + this.componentSetup.tempId);
            c.attr("tempId", "field_" + this.componentSetup.tempId);
            c.attr("fieldid", this.componentSetup.tempId);
            c.find(".check_js").data("componentData", this);
            c.find(".check_js").attr("id", this.componentSetup.fieldId || this.componentSetup.tempId).attr("name", this.componentSetup.fieldId || this.componentSetup.tempId);
            c.find(".check_js").attr("cid", this.cid);
            0 != this.componentSetup.isEdit && "false" != this.componentSetup.isEdit || c.find(".check_js").attr("disabled", !0);
            this.el = b;
            this.readOnly(c, d);
            b.append(c)
        },
        setMonitorTitle: function(b, c) {
            var d = this
              , e = d.componentSetup.monitorFields
              , a = c.closest(".subtr_js");
            if (a && 0 < a.length) {
                var f = c.parent().index()
                  , g = a.parent().children(":first")
                  , a = g.find(".widget-title").eq(f);
                if (!a.attr("title") && e && 0 < e.length) {
                    var h = a.text() + "\x3d";
                    $.each(e, function(a, e) {
                        "string" === typeof e && (e = JSON.parse(e));
                        if (e && e.type)
                            if ("field" === e.type) {
                                var c = b.find("div[id\x3d'field_" + e.value + "']").parent().index();
                                h += g.find(".widget-title").eq(c).text()
                            } else if ("number" === d.componentSetup.monitorType || d.componentSetup.format)
                                h += e.value
                    });
                    a.attr("title", h)
                }
            } else
                e && 0 < e.length && (h = c.find(".widget-title_js").text() + "\x3d",
                $.each(e, function(a, e) {
                    "string" === typeof e && (e = JSON.parse(e));
                    if (e && e.type)
                        if ("field" === e.type) {
                            var c = b.find("div[id\x3d'field_" + e.value + "']").eq(0);
                            if (c.parent().hasClass("subtd_js")) {
                                var f = c.parent().index();
                                h += c.closest(".subtable_js").children(":first").find(".widget-title").eq(f).text() + "(\u5408\u8ba1)"
                            } else
                                h += c.find(".widget-title_js").text()
                        } else if ("number" === d.componentSetup.monitorType || d.componentSetup.format)
                            h += e.value
                }),
                c.attr("title", h))
        },
        renderStatSearch: function(b) {
            var c = $(this.tpl)
              , d = b.parentEl
              , e = b.term;
            d.attr("class", "sch-group j_formFieldSearchGroup statsearch-page");
            d.find(".j_formField-condition").html(a);
            var a = null;
            if ("mobile" != window.systemInfo_form) {
                var a = c.siblings("#statsearch-monitor")
                  , f = b.startValue;
                f && a.find("input:first").val(f);
                (f = b.endValue) && a.find("input:last").val(f);
                e && a.find("select:first option[value\x3d" + e + "]").attr("selected", "true");
                d.attr("class", "sch-group j_formFieldSearchGroup statsearch-page");
                d.find(".j_formField-condition").html(a)
            } else {
                var e = b.fieldId
                  , f = b.fieldTitle
                  , g = b.subFormId
                  , a = c.siblings("#statsearch-monitor-mobile")
                  , c = b.filterEl;
                b = b.condition;
                if (c) {
                    var h = c.find(".j_filterList .selectd #comp-val span").eq(0).text()
                      , c = c.find(".j_filterList .selectd #comp-val span").eq(1).text();
                    a.find(".j_numberCheck").eq(0).val(h);
                    a.find(".j_numberCheck").eq(1).val(c)
                }
                b && (a.find(".j_condition").find('option[value\x3d"' + b + '"]').attr("selected", !0),
                "null" != b && "notnull" != b || a.find(".j_control").hide());
                a.find(".j_inputName").text(f + ":");
                d.find("#component-div").html(a);
                d.find(".j_comp-ok").attr("comKey", "Monitor").attr("fieldId", e).attr("title", f).attr("subFormId", g);
                d.off("change", "#statsearch-monitor-mobile .j_condition").on("change", "#statsearch-monitor-mobile .j_condition", function() {
                    var a = $(this).val();
                    "null" == a || "notnull" == a ? d.find("#statsearch-monitor-mobile .j_control").hide() : d.find("#statsearch-monitor-mobile .j_control").show()
                });
                d.on("keydown", ".j_numberCheck", function(a) {
                    a = parseInt(a.keyCode);
                    var e = $(this).val();
                    if ((110 == a || 190 == a) && 0 <= e.indexOf(".") || (109 == a || 173 == a) && 0 <= e.indexOf("-"))
                        return !1
                });
                d.on("keyup", ".j_numberCheck", function(a) {
                    a = $(this).val();
                    isNaN(a) && "-" != a && $(this).val(parseFloat(a));
                    "." == a.charAt(0) && $(this).val(0 + parseFloat(a))
                });
                d.on("keyup", ".j_numberCheck", function(a) {
                    a = $(this).val();
                    $(this).val(a.replace(/[^\d.-]/g, ""))
                })
            }
        },
        getValue: function(b, c) {
            var d = $.trim(b.val());
            0 < d.length && (d = parseFloat(b.val().replace(/[^\d.-]/g, "")));
            var e = {
                formField: {
                    id: this.componentSetup.fieldId
                },
                content: d
            };
            return "" !== d && !isNaN(d) || c ? e : null
        },
        setValue: function(b, c) {
            var d = this.componentSetup.isCapital
              , e = this.componentSetup.monitorType
              , a = "";
            if (null != c) {
                var f = c.content;
                this.componentSetup.pointSize && (f = parseFloat(f + "").toFixed(this.componentSetup.pointSize) + "");
                f && 0 < (f + "").length && ("mobile" == window.systemInfo_form || "number" != e || 1 != d && "true" != d || (a = this.numberToChinese(f),
                b.find(".j_capital_num").text(a).removeClass("hide-im")),
                b.find("#" + this.componentSetup.fieldId).val(f),
                b.find(".j_readOnly").html(f))
            }
        },
        dateDiff: function(b) {
            if (0 == b)
                return "";
            var c = 0
              , d = 0
              , d = d = 0
              , c = Math.floor(b / 864E5)
              , d = Math.floor(b % 864E5 / 36E5)
              , c = "" + (0 == c ? "" : c + "\u5929") + (0 == d ? "" : d + "\u5c0f\u65f6")
              , d = Math.floor(b % 864E5 % 36E5 / 6E4)
              , c = c + (0 == d ? "" : d + "\u5206")
              , d = Math.floor(b % 864E5 % 36E5 % 6E4 / 1E3);
            return c += 0 == d ? "" : d + "\u79d2"
        },
        getDateValue: function(b, c) {
            var d = "";
            if (0 == b)
                return "0";
            switch (c) {
            case "d":
                d = b / 864E5;
                break;
            case "h":
                d = b / 36E5;
                break;
            case "m":
                d = b / 6E4;
                break;
            case "s":
                d = b / 1E3
            }
            return d ? d.toFixed(2) : ""
        },
        formatMoney: function(b, c) {
            c = 2 < c && 20 >= c ? c : 2;
            b = parseFloat((b + "").replace(/[^\d\.-]/g, "")).toFixed(c) + "";
            var d = b.split(".")[0].split("").reverse()
              , e = b.split(".")[1];
            t = "";
            for (i = 0; i < d.length; i++)
                t += d[i] + (0 == (i + 1) % 3 && i + 1 != d.length ? "," : "");
            return t.split("").reverse().join("") + "." + e
        },
        checkEvents: function(b, c) {
            var d = this
              , e = this.componentSetup.monitorFields
              , a = this.componentSetup.monitorType
              , f = ".monitor_" + (this.componentSetup.fieldId || this.componentSetup.tempId)
              , g = $("input[id\x3d'" + (this.componentSetup.fieldId || this.componentSetup.tempId) + "'][cid\x3d'" + this.cid + "']")
              , h = g.closest(".subtr_js")
              , h = 1 == h.length ? h : g.closest(".form-view_js")
              , h = 1 > h.length ? $(document) : h;
            this.componentSetup.isEdit && (g.keydown(function(a) {
                a = parseInt(a.keyCode);
                var e = $(this).val();
                if ((110 == a || 190 == a) && 0 <= e.indexOf(".") || (109 == a || 173 == a) && 0 <= e.indexOf("-"))
                    return !1
            }),
            g.keyup(function(a) {
                a = $(this).val();
                isNaN(a) && "-" != a && $(this).val(parseFloat(a));
                "." == a.charAt(0) && $(this).val(0 + parseFloat(a))
            }),
            g.keyup(function(a) {
                a = $(this).val();
                var e = d.componentSetup.pointSize;
                if (null != e && "" != e && "sel" != e)
                    if (0 < e) {
                        if (0 < a.indexOf(".")) {
                            var c = a.substring(0, a.indexOf("."))
                              , b = a.substring(a.indexOf(".") + 1);
                            0 < b.length && b.length > e && (b = b.substring(0, e),
                            a = c + "." + b)
                        }
                    } else
                        0 < a.indexOf(".") && (a = a.substring(0, a.indexOf(".")));
                $(this).val(a.replace(/[^\d.-]/g, ""))
            }),
            g.blur(function(a) {
                a = $(this).val();
                if ("-" == a)
                    $(this).val("");
                else {
                    var e = d.componentSetup.isCapital
                      , f = d.componentSetup.monitorType;
                    "mobile" == window.systemInfo_form || "number" != f || 1 != e && "true" != e || (e = d.numberToChinese(a),
                    g.parent().find(".j_capital_num").text(e).removeClass("hide-im"));
                    e = d.componentSetup.pointSize;
                    if (a && null != e && "" != e && 0 < e)
                        if (0 > a.indexOf(".")) {
                            for (var f = "", k = 0; k < e; k++)
                                f += "0";
                            a = a + "." + f
                        } else {
                            var h = a.substring(0, a.indexOf("."));
                            a = a.substring(a.indexOf(".") + 1);
                            f = "";
                            for (k = 0; k < e - a.length; k++)
                                f += "0";
                            a = h + "." + (a + f)
                        }
                    $(this).val(a.replace(/[^\d.-]/g, ""));
                    c && d.saveComponentValue($(this), c);
                    a = d.check($(this));
                    b(a)
                }
            }));
            d.changeEvent(h, a, e, f)
        },
        changeEvent: function(b, c, d, e) {
            var a = this, f = b.closest(".form-view_js").data("form"), g;
            f && (g = f.formFields);
            d && 0 < d.length && $.each(d, function(d, f) {
                "string" == typeof f && (f = JSON.parse(f));
                if ("field" == f.type && 0 > $.inArray(f.value, a.eventFiled)) {
                    a.eventFiled.push(f.value);
                    if ("number" == c) {
                        if (b.hasClass("subtr_js") && g) {
                            var k = !1;
                            for (d = 0; d < g.length; d++)
                                if (g[d].id == f.value) {
                                    k = g[d].subForm ? !1 : !0;
                                    break
                                }
                            if (k)
                                b.closest(".form-view_js").on("blur", "input[id\x3d'" + f.value + "']", function() {
                                    a.getMonitorValue(f.value)
                                });
                            else
                                b.on("blur", "input[id\x3d'" + f.value + "']", function() {
                                    a.getMonitorValue(f.value)
                                })
                        } else
                            b.on("blur", "input[id\x3d'" + f.value + "']", function() {
                                a.getMonitorValue(f.value)
                            });
                        f.monitorFields && 0 < f.monitorFields.length && a.changeEvent(b, f.monitorType, f.monitorFields, e)
                    }
                    if ("date" == c)
                        if ("mobile" == window.systemInfo_form)
                            b.on("monitor_change", "div[fieldId\x3d'" + f.value + "'] input", function() {
                                a.getMonitorValue(f.value)
                            });
                        else
                            b.on("change", "div[fieldId\x3d'" + f.value + "'] input", function() {
                                a.getMonitorValue(f.value)
                            })
                }
            })
        },
        autoSaveEvents: function(b) {
            var c = this.componentSetup.monitorFields
              , d = this.componentSetup.monitorType
              , e = $("input[id\x3d'" + this.componentSetup.fieldId + "'][cid\x3d'" + this.cid + "']")
              , a = e.closest(".subtr_js")
              , e = 1 == a.length ? a : e.closest(".form-view_js")
              , e = 1 > e.length ? $(document) : e;
            this.autoChangesEvent(e, d, c, b)
        },
        autoChangesEvent: function(b, c, d, e) {
            var a = this
              , f = $("input[id\x3d'" + a.componentSetup.fieldId + "'][cid\x3d'" + a.cid + "']");
            d && 0 < d.length && $.each(d, function(d, g) {
                "string" == typeof g && (g = JSON.parse(g));
                if ("field" === g.type && 0 > $.inArray(g.value, a.autoFiled) && (a.autoFiled.push(g.value),
                "number" === c && (b.on("blur", "input[id\x3d'" + g.value + "']", function() {
                    a.saveComponentValue(f, e)
                }),
                g.monitorFields && 0 < g.monitorFields.length && a.autoChangesEvent(b, g.monitorType, g.monitorFields, e)),
                "date" === c))
                    if ("mobile" == window.systemInfo_form)
                        b.on("monitor_change", "div[fieldId\x3d'" + g.value + "'] input", function() {
                            a.saveComponentValue(f, e)
                        });
                    else
                        b.on("change", "div[fieldId\x3d'" + g.value + "'] input", function() {
                            a.saveComponentValue(f, e)
                        })
            })
        },
        readOnly: function(b, c) {
            var d = b.find("input[id\x3d'" + this.componentSetup.fieldId + "'][cid\x3d'" + this.cid + "']")
              , d = "mobile" == window.systemInfo_form ? d.parent() : d;
            c ? (d.addClass("hide"),
            d.siblings(".j_readOnly").removeClass("hide")) : (d.removeClass("hide"),
            d.siblings(".j_readOnly").addClass("hide"))
        },
        getFormula: function() {
            var b = ""
              , c = []
              , d = this.componentSetup.monitorType;
            if ("number" === d) {
                for (var e = $("div[tempId\x3d'" + this.componentSetup.tempId + "']").closest(".subtr_js"), c = this.componentSetup.monitorFields, a = 0; a < c.length; a++) {
                    var f = c[a];
                    "string" == typeof f && (f = JSON.parse(f));
                    if ("field" == f.type)
                        if (f = $("#formContainer_js").find("div[tempid\x3d'" + f.value + "']"),
                        0 < f.length) {
                            var g = f.find(".widget-title_js").text();
                            1 != e.length && f.parent().hasClass("subtd_js") && (g += "(\u5408\u8ba1)");
                            b += g
                        } else
                            b += "\x3cspan style\x3d'color:red'\x3e\u672a\u77e5\u63a7\u4ef6\x3c/span\x3e";
                    else
                        b += f.value
                }
                $("#operate_show").html(b)
            }
            "date" === d && (c.push(new m($(".j_choicelistEdit_date .j_select_date").val(),"field")),
            b = $(".j_choicelistEdit_date input[name\x3d'operate-type']:checked").val(),
            d = $(".j_choicelistEdit_date .j_number_input").val(),
            b && d && (c.push(new m(b,"operate")),
            c.push(new m(d,"number"))),
            this.componentSetup.format = $(".j_operate input[name\x3d'format']:checked").val());
            b = $("#widget-control .field-active").data("componentData");
            b.setMonitorFields(c);
            b.changeMonitorsFields(c);
            b.changeClass(c)
        },
        changeClass: function(b) {
            $(".field_js").removeClass("monitor");
            b && 0 < b.length && $.each(b, function(c, b) {
                "string" == typeof b && (b = JSON.parse(b));
                b && "field" === b.type && $("#formContainer_js").find("div[tempId\x3d'" + b.value + "']").addClass("monitor")
            })
        },
        changeMonitorsFields: function(b) {
            var c = this.monitors
              , d = this.componentSetup.tempId;
            if (c && 0 < c.length)
                for (var e = 0; e < c.length; e++) {
                    var a = c[e];
                    a.changeFields(d, b, a.componentSetup.monitorFields)
                }
        },
        changeFields: function(b, c, d) {
            for (var e = 0; e < d.length; e++) {
                var a = d[e];
                a.value == b ? a.monitorFields = c : a.monitorFields && 0 < a.monitorFields.length && this.changeFields(b, c, a.monitorFields)
            }
        },
        getAllNumberField: function() {
            var b, c, d, e, a, f = $("div[tempId\x3d'" + this.componentSetup.tempId + "']").closest(".subtr_js");
            1 == f.length ? "number" === this.componentSetup.monitorType ? (c = f.find(".field_js[componentkey\x3dNumberComponent]"),
            d = f.find(".field_js[componentkey\x3dMoney]"),
            e = f.find(".field_js[componentkey\x3dMonitor]:not([tempid\x3d'" + this.componentSetup.tempId + "'])"),
            $("#formContent .field_js").not($("#formContent .form-databox-wrap").find(".field_js")),
            b = $("#formContent .field_js[componentkey\x3dNumberComponent]").not($("#formContent .form-databox-wrap").find(".field_js")),
            a = $("#formContent .field_js[componentkey\x3dMoney]").not($("#formContent .form-databox-wrap").find(".field_js")),
            $("#formContent .field_js[componentkey\x3dMonitor]").not($("#formContent .form-databox-wrap").find(".field_js")),
            c = $.merge(c, d),
            b = $.merge(b, a),
            b = $.merge(c, b)) : b = f.find(".field_js[componentkey\x3dDateInterval]") : "number" === this.componentSetup.monitorType ? (c = $("#formContainer_js").find(".field_js[componentkey\x3dNumberComponent]"),
            d = $("#formContainer_js").find(".field_js[componentkey\x3dMoney]"),
            e = $("#formContainer_js").find(".field_js[componentkey\x3dMonitor]:not([tempid\x3d'" + this.componentSetup.tempId + "'])"),
            b = $.merge(c, d)) : b = $("#formContainer_js").find(".field_js[componentkey\x3dDateInterval]:not(.subtd_js\x3e.field_js)");
            var g = ""
              , h = [];
            $.each(b, function() {
                var a = $(this)
                  , e = a.attr("tempid")
                  , c = a.find(".widget-title_js").text();
                1 != f.length && a.parent().hasClass("subtd_js") && (c += "(\u5408\u8ba1)");
                g += '\x3coption value\x3d"' + e + '"\x3e' + c + "\x3c/option\x3e";
                h.push({
                    fieldId: e,
                    title: c
                })
            });
            $.each(this.filterMonitorComponents(e), function() {
                var a = $(this)
                  , e = a.attr("tempid")
                  , c = a.data("componentData").componentSetup.monitorType
                  , b = a.find(".widget-title_js").text();
                1 != f.length && a.parent().hasClass("subtd_js") && (b += "(\u5408\u8ba1)");
                g += '\x3coption value\x3d"' + e + '" type\x3d"' + c + '"\x3e' + b + "\x3c/option\x3e";
                h.push({
                    fieldId: e,
                    title: b,
                    monitorType: c
                })
            });
            this.optionsArray = h;
            return g
        },
        getMonitorComponents: function(b, c) {
            if (c && 0 < c.length)
                for (var d = 0; d < c.length; d++) {
                    var e = c[d];
                    "string" == typeof e && (e = JSON.parse(e));
                    "field" == e.type && 0 > $.inArray(e.value, b) && b.push(e.value);
                    e && e.monitorFields && this.getMonitorComponents(b, e.monitorFields)
                }
        },
        getFilterMonitorComponents: function() {
            var b = [];
            this.getMonitorComponents(b, this.componentSetup.monitorFields);
            return b
        },
        filterMonitorComponents: function(b) {
            var c = []
              , d = this.componentSetup.tempId;
            if (b && 0 < b.length)
                for (var e = 0; e < b.length; e++) {
                    var a = $(b[e]).data("componentData")
                      , f = a.getFilterMonitorComponents();
                    0 > $.inArray(d, f) ? c.push(b[e]) : 0 > $.inArray(a, this.monitors) && this.monitors.push(a)
                }
            return c
        },
        check: function(b) {
            $.trim(b.val());
            b.attr("placeholder");
            var c = {};
            c.element = b;
            return c
        },
        getMonitorValue: function(b) {
            var c = this
              , d = this.componentSetup.monitorFields
              , e = this.componentSetup.monitorType
              , a = this.componentSetup.isCapital
              , f = ""
              , g = $("input[id\x3d'" + (this.componentSetup.fieldId || this.componentSetup.tempId) + "'][cid\x3d'" + this.cid + "']")
              , h = g.closest(".subtr_js")
              , m = 1 == h.length ? h : g.closest(".form-view_js")
              , p = [];
            d && 0 < d.length && ("number" === e && $.each(d, function(a, e) {
                "string" == typeof e && (e = JSON.parse(e));
                if (e.monitorFields && 0 < e.monitorFields.length) {
                    var d = [];
                    c.getMonitorComponents(d, e.monitorFields);
                    b ? -1 < $.inArray(b, d) && (d = m.find("input[id\x3d'" + e.value + "']:not(.number_component_js)"),
                    (0 != h.length || 0 == d.closest(".subtr_js").length) && (d = d.data("componentData")) && d.getMonitorValue(b)) : (d = m.find("input[id\x3d'" + e.value + "']").data("componentData")) && d.getMonitorValue()
                }
                if ("field" === e.type) {
                    d = m.find("input[id\x3d'" + e.value + "']");
                    0 == d.length && (d = g.closest(".form-view_js").find("input[id\x3d'" + e.value + "']"),
                    0 == d.length && (d = $("input[id\x3d'" + e.value + "']")),
                    0 == d.length && (d = $("#form-preview").find("input[id\x3d'" + e.value + "']")));
                    var l = 0;
                    d && 0 < d.length ? (d.each(function() {
                        $this = $(this);
                        var a = $this.val();
                        0 < a.length && (a = parseFloat(a.replace(/[^\d.-]/g, "")),
                        l += a,
                        p.push(a))
                    }),
                    l || (l = "0"),
                    f += "(" + l + ")") : f += "0"
                } else
                    "number" === e.type ? e.value && (f += "(" + e.value + ")") : f = e.value ? f + e.value : f + "\u672a\u77e5\u63a7\u4ef6"
            }),
            "date" === e && (isCount = !1,
            $.each(d, function(a, e) {
                "string" == typeof e && (e = JSON.parse(e));
                if ("field" === e.type) {
                    var b = m.find("div[fieldId\x3d'" + e.value + "']")
                      , d = b.find("input:first").val()
                      , b = b.find("input:last").val();
                    if (d && b)
                        if (isCount = !0,
                        c.componentSetup.dateType && "calendar" != c.componentSetup.dateType && c.isLogin) {
                            var g = "day";
                            "d" == c.componentSetup.format ? g = "day" : "h" == c.componentSetup.format ? g = "hour" : "m" == c.componentSetup.format && (g = "minute");
                            c.componentModel.queryWorkingTime({
                                beginTimeStr: d,
                                endTimeStr: b,
                                resultType: g
                            }, function(a) {
                                f = a.workingTime + ""
                            })
                        } else
                            d = (new Date(Date.parse(d.replace(" ", "T")))).getTime(),
                            f = (new Date(Date.parse(b.replace(" ", "T")))).getTime() - d,
                            c.componentSetup.format && (f = c.getDateValue(f, c.componentSetup.format));
                    else
                        f = "0"
                }
                "operate" === e.type && e.value && (c.componentSetup.format ? f && 0 < f.length && (f += e.value) : f = c.getDateValue(f, e.value));
                "number" === e.type && e.value && (f += "(" + e.value + ")")
            })));
            f && 0 < f.length && (f = -1 < (eval(f) + "").indexOf("Infinity") ? 0 : eval(f),
            f = isNaN(f) ? 0 : f,
            0 < (f + "").length && (f = (new Number(f)).toFixed(c.getMaxPlace(p))),
            g.val(f),
            "mobile" == window.systemInfo_form && g.closest(".subtd_js").find(".j_subField").html("\x3cspan class\x3d'mr-10'\x3e" + f + "\x3c/span\x3e"),
            g.siblings(".j_readOnly").text(f),
            "mobile" == window.systemInfo_form || "number" != e || 1 != a && "true" != a || (d = c.numberToChinese(f),
            g.siblings(".j_capital_num").text(d).removeClass("hide-im")));
            1 == h.length && h.closest(".subtable_js").data("componentData").countTotal(g)
        },
        submitCheck: function(b, c) {
            var d = this.check(b);
            c(d)
        },
        getMaxPlace: function(b) {
            b = this.componentSetup.pointSize;
            return null != b && "" != b && "sel" != b ? b : 2
        },
        monitoreditor: function() {
            var b = this;
            null == b.optionsArray || 0 == b.optionsArray.length ? formPlugin.notify("\u6682\u65e0\u53ef\u76d1\u63a7\u7684\u5b57\u6bb5") : (new f({
                fields: b.optionsArray,
                monitorFields: b.componentSetup.monitorFields.slice(),
                callback: function(c) {
                    b.reditorCallBack(c)
                }
            })).render()
        },
        reditorCallBack: function(b) {
            this.componentSetup.monitorFields = b;
            this.getFormula()
        },
        checkFormula: function() {
            for (var b = this.componentSetup.monitorFields, c = "", d = 0; d < b.length; d++) {
                var e = b[d];
                "string" == typeof e && (e = JSON.parse(e));
                c = "field" == e.type ? 0 < $("#formContainer_js").find("div[tempid\x3d'" + e.value + "']").length ? c + "1" : c + "\u672a\u77e5\u63a7\u4ef6" : "number" == e.type ? c + ("(" + e.value + ")") : c + e.value
            }
            try {
                return eval(c),
                !0
            } catch (a) {
                return formPlugin.notify(this.componentSetup.title + "\u516c\u5f0f\u683c\u5f0f\u4e0d\u6b63\u786e"),
                !1
            }
        },
        empty: function(b) {
            b.find(".j_capital_num").text("");
            b.find("#" + (this.componentSetup.fieldId || this.componentSetup.tempId)).val("");
            b.find(".j_readOnly").html("")
        },
        numberToChinese: function(b) {
            var c = parseFloat(b)
              , d = parseFloat("10000000000000000");
            if (c >= d)
                return "\u8d85\u51fa\u6700\u5927\u5904\u7406\u6570\u5b57";
            c = "";
            0 == (b + "").indexOf("-") && (c += "\u8d1f",
            b = b.substring(1));
            strUnit = "\u4edf\u4f70\u62fe\u4e07\u4edf\u4f70\u62fe\u4ebf\u4edf\u4f70\u62fe\u4e07\u4edf\u4f70\u62fe\u5143\u89d2\u5206";
            b += "00";
            d = b.indexOf(".");
            0 <= d && (b = b.substring(0, d) + b.substr(d + 1, 2));
            strUnit = strUnit.substr(strUnit.length - b.length);
            for (d = 0; d < b.length; d++)
                c += "\u96f6\u58f9\u8d30\u53c1\u8086\u4f0d\u9646\u67d2\u634c\u7396".substr(b.substr(d, 1), 1) + strUnit.substr(d, 1);
            return c.replace(/\u96f6\u5206$/, "").replace(/\u96f6\u89d2\u96f6\u5206$/, "").replace(/\u96f6[\u4edf\u4f70\u62fe]/g, "\u96f6").replace(/\u96f6{2,}/g, "\u96f6").replace(/\u96f6([\u4ebf|\u4e07])/g, "$1").replace(/\u96f6+\u5143/, "\u5143").replace(/\u4ebf\u96f6{0,3}\u4e07/, "\u4ebf").replace(/^\u5143/, "\u96f6\u5143").replace(/\u96f6\u89d2$/, "").replace(/\u96f6\u5143$/, "")
        }
    });
    u.exports = window.Monitor
});

define("form/component/chancelist", ["form/tplutil", "form/component/formfilter"], function(n, y, u) {
    var m = n("form/tplutil")
      , h = n("form/component/formfilter");
    n = Backbone.View.extend({
        initialize: function() {},
        render: function(g, f) {
            "pc" == g ? this.initPC.init(f) : this.initMb.init(f)
        },
        initPC: {
            init: function(g) {
                this.el = "#chance_list";
                this.targetEl = g.targetEl;
                this.keyword = g.keyword;
                this.isUnique = g.isUnique;
                this.seletedList = g.seletedList;
                this.selectColumn = g.selectColumn;
                this.order = g.order;
                this.fileds = [{
                    title: "\u521b\u5efa\u65f6\u95f4",
                    position: "left"
                }, {
                    title: "\u5546\u673a\u540d\u79f0",
                    position: "left"
                }];
                this.tpl = m.get("chancelist");
                $("body").append($(this.tpl));
                this.render();
                this.delegateEvents()
            },
            delegateEvents: function() {
                var g = this
                  , f = $(g.el);
                f.off(".ChanceList");
                f.on("keyup.ChanceList", ".j_search-input", function(d) {
                    13 === d.keyCode && f.find(".j_search-btn").trigger("click")
                });
                f.on("click.ChanceList", ".j_search-btn", function() {
                    $(this).hasClass("locked") || ($(this).addClass("locked"),
                    g.queryChance(1))
                });
                f.on("click.ChanceList", ".j_btn-cancel", function() {
                    g.close()
                });
                f.on("click.ChanceList", ".j_closelist", function() {
                    g.close()
                });
                f.on("click.ChanceList", ".j_btn-ok", function() {
                    for (var d = [], b = f.find(".j_opt .j_select .j_select_data"), c = 0; c < b.length; c++) {
                        var h = $(b[c]).data("chance");
                        d.push(h)
                    }
                    $(g.targetEl).trigger("entitySelected", d);
                    g.close()
                });
                f.on("click.ChanceList", "tbody tr", function() {
                    var d = $(this)
                      , b = $(this).data("chance")
                      , c = $(this).attr("id")
                      , h = $(this).find(".j_chanceName").text();
                    d.hasClass("active") ? ($(this).find('input[name\x3d"chanceselect"]').prop("checked", !1),
                    $(this).removeClass("active"),
                    $(this).find('input[name\x3d"chanceselect"]').css("display", ""),
                    f.find(".j_opt .j_select").find("#" + c).remove()) : ($(this).find('input[name\x3d"chanceselect"]').prop("checked", !0),
                    $(this).addClass("active"),
                    $(this).find('input[name\x3d"chanceselect"]').css("display", "inline-block"),
                    0 == f.find(".j_opt .j_select").find("#" + c).length && (f.find(".j_opt .j_select").append('\x3ca class\x3d"j_select_data" id\x3d"' + c + '"\x3e' + h + "\x3c/a\x3e"),
                    f.find(".j_opt .j_select").find("#" + c).data("chance", b)));
                    if (1 == g.isUnique || "true" == g.isUnique)
                        $(g.targetEl).trigger("entitySelected", b),
                        g.close()
                });
                f.on("click.ChanceList", ".page-first", function() {
                    $(this).hasClass("disabled") || g.queryChance(1)
                });
                f.on("click.ChanceList", ".page-pre:not(.disabled)", function() {
                    if (!$(this).hasClass("disabled")) {
                        var d = $(g.el).find(".pagination").data("page");
                        g.queryChance(d.pageNo - 1)
                    }
                });
                f.on("click.ChanceList", ".page-next:not(.disabled)", function() {
                    if (!$(this).hasClass("disabled")) {
                        var d = $(g.el).find(".pagination").data("page");
                        g.queryChance(d.pageNo + 1)
                    }
                });
                f.on("click.ChanceList", ".pagination .page-last", function() {
                    if (!$(this).hasClass("disabled")) {
                        var d = $(g.el).find(".pagination").data("page");
                        g.queryChance(d.totalPages)
                    }
                });
                f.on("hidden.bs.modal.ChanceList", function() {
                    g.remove()
                });
                f.off("mouseenter.ChanceList", "#rel-filter").on("mouseenter.ChanceList", "#rel-filter", function(d) {
                    $(this).addClass("open");
                    var b = $(this).attr("data-toggle");
                    g.reldropdownFilter || (g.reldropdownFilter = new h({
                        el: b,
                        module: "saleChance",
                        targetObj: $(this),
                        userId: TEAMS.currentUser.id,
                        scroll: !0,
                        scrollheight: 395
                    }),
                    g.reldropdownFilter.render(d));
                    d = setTimeout(function() {
                        $(b).parents(".dropdown-filter").slideDown("fast")
                    }, 300);
                    $(this).data("showTimer", d)
                }).off("mouseleave.ChanceList", "#rel-filter").on("mouseleave.ChanceList", "#rel-filter", function(d) {
                    if (!$(d.toElement).hasClass("datetimepicker")) {
                        $(this).removeClass("open");
                        d = $(this).attr("data-toggle");
                        var b = $(this).data("showTimer");
                        b && clearTimeout(b);
                        $(this).removeData("showTimer");
                        $(d).parents(".dropdown-filter").slideUp(100)
                    }
                }).off("filter.ChanceList", "#rel-filter").on("filter.ChanceList", "#rel-filter", function(d) {
                    g.loadDataType = null;
                    g.queryChance(1);
                    $(this).removeClass("open")
                })
            },
            render: function() {
                var g = this;
                formPlugin.destroyLayout(".eui-scroll.statbody");
                formPlugin.layout(".eui-scroll.statbody", {
                    onTotalScroll: function() {
                        var f = parseInt(g.pageNo) + 1;
                        f && !$(".eui-scroll.statbody").hasClass("lock") && ($(".eui-scroll.statbody").addClass("lock"),
                        g.queryChance(f, function(d) {
                            $(".eui-scroll.statbody").removeClass("lock")
                        }))
                    }
                }, [{
                    axis: "yx",
                    gotoTopButton: !0,
                    scrollInertia: 394
                }]);
                $(g.el).find(".j_chance.chance").data("targetEl", g.targetEl);
                g.renderSelect(g.seletedList);
                g.queryChance(1);
                0 < $("body").find(".form-preview-wrapper").length && $("#chance_list").find("#saleChance-create-fast").remove();
                $(g.el).modal()
            },
            renderSelect: function(g) {
                for (var f = $(this.el), d = 0; d < g.length; d++) {
                    var b = g[d];
                    0 == f.find(".j_opt .j_select").find("#" + b.id).length && (f.find(".j_opt .j_select").append('\x3ca class\x3d"j_select_data" id\x3d"' + b.id + '"\x3e' + b.name + "\x3c/a\x3e"),
                    f.find(".j_opt .j_select").find("#" + b.id).data("chance", b.chance))
                }
            },
            queryChance: function(g, f) {
                var d = this
                  , b = $(d.el).find(".j_search-btn")
                  , c = $(d.el)
                  , h = $.trim(c.find(".j_search-input").val())
                  , c = c.find(".j_search-input").attr("placeholder");
                if (h != c) {
                    var c = void 0 == $("#rel-filter").data("data-filter") ? "" : $("#rel-filter").data("data-filter")
                      , e = '"type":"noShare"';
                    c && "" != c && (e += "," + c);
                    filteStr = "{" + e + "}";
                    filteStr = jQuery.parseJSON(filteStr);
                    c = "";
                    e = "desc";
                    d.order && (c = d.order.property,
                    e = d.order.direction);
                    h = {
                        pageNo: g,
                        pageSize: 20,
                        orderBy: c,
                        orderWay: e,
                        conditions: [{
                            id: "name",
                            type: "string",
                            value: h
                        }],
                        filter: filteStr
                    };
                    1 == g && $(d.el).find("#stat_table tbody").empty();
                    $(d.el).find("#more_data").hide();
                    $.ajax({
                        type: TEAMS.ajaxMethod,
                        url: TEAMS.api.datatable,
                        dataType: "json",
                        data: {
                            queryStr: JSON.stringify(h),
                            employeeId: TEAMS.currentUser.id
                        },
                        success: function(a) {
                            if (!a.message || !a.message) {
                                var e = {};
                                g = parseInt(g);
                                e.result = a.data;
                                e.pageNo = g;
                                e.pageSize = 20;
                                a = a.recordsTotal;
                                e.totalCount = a;
                                e.hasPre = 1 <= g - 1;
                                var c = parseInt(a / 20);
                                0 < a % 20 && c++;
                                e.totalPages = c;
                                e.hasNext = g + 1 <= c;
                                d.renderChance(e, f);
                                d.pageNo = e.pageNo;
                                b.removeClass("locked")
                            }
                        }
                    })
                }
            },
            renderChance: function(g, f) {
                var d = $(this.el);
                if (1 == g.pageNo) {
                    if (null == g.result || 1 > g.result.length) {
                        $(this.el).find(".j_chance_empty").removeClass("hide");
                        return
                    }
                    $(this.el).find(".j_chance_empty").addClass("hide")
                }
                var b = this.selectColumn;
                null == b && (b = []);
                $(this.el).find("#list-loading").hide();
                $(this.el).find("#statbody").show();
                if (0 == d.find("#stat_table thead tr th").length) {
                    for (var c = d.find("#stat_table thead tr"), h = 0; h < b.length; h++) {
                        var e = b[h]
                          , a = e.substring(0, e.indexOf("_"))
                          , k = e.substring(e.indexOf("_") + 1);
                        c.append("\x3cth title\x3d'" + k + "'\x3e\x3cdiv\x3e" + k + "\x3c/div\x3e\x3c/th\x3e")
                    }
                    for (h = 0; h < this.fileds.length; h++)
                        k = this.fileds[h],
                        "left" === k.position && c.prepend("\x3cth title\x3d'" + k.title + "'\x3e\x3cdiv\x3e" + k.title + "\x3c/div\x3e\x3c/th\x3e");
                    c.prepend("\x3cth\x3e\x3c/th\x3e")
                }
                c = g.result;
                for (h = 0; h < c.length; h++) {
                    var k = c[h]
                      , m = k.id
                      , a = k.name
                      , r = Date.create(k.createTime).format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}");
                    if (!(0 < d.find("#stat_table tr").find("#" + m).length)) {
                        var q = $("\x3ctr style\x3d'cursor:pointer;' id\x3d" + m + "\x3e\x3c/tr\x3e");
                        q.data("chance", k);
                        q.append('\x3ctd\x3e\x3cdiv class\x3d"sn"\x3e' + ((g.pageNo - 1) * g.pageSize + h + 1) + '\x3c/div\x3e\x3cdiv class\x3d"checkbox-div"\x3e\x3cinput name\x3d"chanceselect" type\x3d"checkbox"\x3e\x3c/input\x3e\x3c/div\x3e\x3c/td\x3e');
                        q.append("\x3ctd class\x3d'j_chanceName noSub_name_" + m + "'\x3e" + a + "\x3c/td\x3e");
                        q.append("\x3ctd class\x3d'j_createTime noSub_name_" + m + "'\x3e" + r + "\x3c/td\x3e");
                        for (r = 0; r < b.length; r++)
                            e = b[r],
                            a = e.substring(0, e.indexOf("_")),
                            e.substring(e.indexOf("_") + 1),
                            "manager" == a ? (e = "",
                            k[a] && k[a] && (e = k[a].username ? k[a].username : ""),
                            q.append("\x3ctd class\x3d'j_column' id\x3d'" + a + "' title\x3d'" + e + "'\x3e" + e + "\x3c/td\x3e")) : "saleStage" == a ? (e = k.stage ? k.stage.name : "",
                            q.append("\x3ctd class\x3d'j_column' id\x3d'" + a + "' title\x3d'" + e + "'\x3e" + e + "\x3c/td\x3e")) : "saleSource" == a ? (e = k.source ? k.source.name : "",
                            q.append("\x3ctd class\x3d'j_column' id\x3d'" + a + "' title\x3d'" + e + "'\x3e" + e + "\x3c/td\x3e")) : "saleType" == a ? (e = k.type ? k.type.name : "",
                            q.append("\x3ctd class\x3d'j_column' id\x3d'" + a + "' title\x3d'" + e + "'\x3e" + e + "\x3c/td\x3e")) : "customer" == a ? (e = k[a] ? k[a].name : "",
                            q.append("\x3ctd class\x3d'j_column' id\x3d'" + a + "' title\x3d'" + e + "'\x3e" + e + "\x3c/td\x3e")) : "money" == a || "winRate" == a || "remark" == a ? (e = k[a] ? k[a] : "",
                            q.append("\x3ctd class\x3d'j_column' id\x3d'" + a + "' title\x3d'" + e + "'\x3e" + e + "\x3c/td\x3e")) : "orderTime" == a && (e = k[a] ? k[a] : "",
                            "" != e && null != e && (e = Date.create(e).format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}")),
                            q.append("\x3ctd class\x3d'j_column' id\x3d'" + a + "' title\x3d'" + e + "'\x3e" + e + "\x3c/td\x3e"));
                        d.find("#stat_table tbody").append(q);
                        0 < d.find(".j_opt .j_select").find("#" + m).length && (d.find("#stat_table tbody").find('tr[id\x3d"' + m + '"]').find('input[name\x3d"chanceselect"]').prop("checked", !0).css("display", "inline-block"),
                        d.find("#stat_table tbody").find('tr[id\x3d"' + m + '"]').addClass("active"))
                    }
                }
                g.result.length && g.result.length == g.pageSize && f && f()
            },
            close: function() {
                $(this.el).modal("hide")
            },
            remove: function() {
                var g = $(this.el);
                g.modal("hide");
                g.off(".ChanceList");
                g.remove();
                this.reldropdownFilter = null
            }
        }
    });
    u.exports = n
});

define("form/component/serialnumber", ["form/editablecomponent", "form/tplutil", "form/componentmodel"], function(n, y, u) {
    var m = n("form/editablecomponent")
      , h = n("form/tplutil")
      , g = n("form/componentmodel");
    window.SerialNumber = m.extend({
        initialize: function(f) {
            m.prototype.initialize.call(this, f);
            var d = {
                componentKey: "SerialNumber",
                title: "\u7f16\u53f7",
                format: "",
                length: "4",
                cycle: "",
                before: [],
                after: []
            };
            null != f && (d.title = f.title,
            d.format = f.format,
            d.length = f.length,
            d.cycle = f.cycle,
            d.before = f.before,
            d.after = f.after);
            this.componentSetup = $.extend(this.componentSetup, d);
            this.tpl = h.get("serialnumber");
            this.componentModel = new g
        },
        setFormat: function(f) {
            this.componentSetup.format = f
        },
        setLength: function(f) {
            this.componentSetup.length = f
        },
        setCycle: function(f) {
            this.componentSetup.cycle = f
        },
        setBefore: function(f) {
            this.componentSetup.before = f
        },
        setAfter: function(f) {
            this.componentSetup.after = f
        },
        render: function(f) {
            var d = $(this.tpl).siblings("#form-serial");
            d.find(".length-js").find("option[value\x3d'" + this.componentSetup.length + "']").attr("selected", "selected");
            m.prototype.render.call(this, f, d);
            f.html(d.html())
        },
        renderEditPreview: function(f) {
            var d = $(this.tpl).siblings("#form-serial");
            m.prototype.renderEditPreview.call(this, f, d);
            f.append(d)
        },
        renderEditor: function() {
            var f = $(this.tpl).siblings("#editor-serial");
            m.prototype.renderEditor.call(this, f);
            f.find(".format-js").find("option[value\x3d'" + this.componentSetup.format + "']").attr("selected", "selected");
            f.find(".length-js").find("option[value\x3d'" + this.componentSetup.length + "']").attr("selected", "selected");
            var d = this.getFormFieds()
              , b = this.componentSetup.after;
            this.renderFieds(d, f.find(".after-js"), b);
            b = this.componentSetup.before;
            this.renderFieds(d, f.find(".before-js"), b);
            $("#editor-component").html(f.html());
            this.bulidExpression();
            this.renderCycle(this.componentSetup.cycle)
        },
        renderPreview: function(f, d, b) {
            var c = $(this.tpl).siblings("#preview-serial");
            m.prototype.renderPreview.call(this, f, d, b, c);
            c.addClass("hide");
            f.append(c)
        },
        bulidExpression: function() {
            var f = "";
            $container = $("#editor-component");
            $container.find(".before-js .serial-field-js").each(function() {
                var c = $(this).find("select")
                  , b = c.next()
                  , e = c.val();
                if (!e)
                    return !0;
                "constant" == e ? (c = b.val().trim()) && (f += c + "_") : f += c.find("option:selected").text() + "_"
            });
            var d = $container.find(".format-js").val()
              , b = "";
            "%Y" == d ? b += "{yyyy}" : "%Y%m" == d ? b += "{yyyy}{MM}" : "%Y%m%d" == d && (b += "{yyyy}{MM}{dd}");
            b && (f += Date.create().format(b));
            d = parseInt($container.find(".length-js").val());
            for (b = 0; b < d - 1; b++)
                f += "0";
            f += "1_";
            $container.find(".after-js .serial-field-js").each(function() {
                var c = $(this).find("select")
                  , b = c.next()
                  , e = c.val();
                if (!e)
                    return !0;
                "constant" == e ? (c = b.val().trim()) && (f += c + "_") : f += c.find("option:selected").text() + "_"
            });
            $container.find(".expression-js").html(f.slice(0, -1))
        },
        renderCycle: function(f) {
            var d = $("#editor-component").find(".format-js").val()
              , b = $("#editor-component").find(".cycle-js").html("\x3coption value\x3d''\x3e\u8bf7\u9009\u62e9\x3c/option\x3e");
            "%Y" == d ? b.append("\x3coption value\x3d'%Y' selected\x3d'selected'\x3e\u5e74\x3c/option\x3e") : "%Y%m" == d ? (b.append("\x3coption value\x3d'%Y'\x3e\u5e74\x3c/option\x3e"),
            b.append(" \x3coption value\x3d'%Y-%m' selected\x3d'selected'\x3e\u6708\x3c/option\x3e")) : "%Y%m%d" == d && (b.append("\x3coption value\x3d'%Y'\x3e\u5e74\x3c/option\x3e"),
            b.append(" \x3coption value\x3d'%Y-%m'\x3e\u6708\x3c/option\x3e"),
            b.append(" \x3coption value\x3d'%Y-%m-%d' selected\x3d'selected'\x3e\u65e5\x3c/option\x3e"));
            f && b.val(f);
            this.setCycle(b.val())
        },
        renderMenu: function(f) {
            1 < f.find(".serial-field-js").length ? (f.find(".field-minus-js").show(),
            f.find(".field-plus-js").hide()) : (f.find(".field-minus-js").hide(),
            f.find(".field-plus-js").show())
        },
        bulidFields: function(f) {
            var d = null
              , d = "before" == f ? $("#editor-component").find(".before-js") : $("#editor-component").find(".after-js")
              , b = [];
            d.find(".serial-field-js").each(function() {
                var c = $(this).find("select")
                  , d = c.next().addClass("hide")
                  , c = c.val();
                if (!c)
                    return !0;
                "constant" == c ? (d.removeClass("hide"),
                (d = d.val().trim()) && b.push({
                    type: "constant",
                    value: d
                })) : b.push({
                    type: "variable",
                    value: c
                })
            });
            "before" == f ? this.componentSetup.before = b : this.componentSetup.after = b
        },
        renderFieds: function(f, d, b) {
            if (b && 0 < b.length)
                for (var c = 0; c < b.length; c++) {
                    var g = b[c];
                    this.renderSelect(f, d);
                    var e = d.find("select:last");
                    "constant" == g.type ? (e.val("constant"),
                    e.find("option[value\x3d'constant']").attr("selected", "selected"),
                    e.next().attr("value", g.value).removeClass("hide")) : (e.find("option[value\x3d'" + g.value + "']").attr("selected", "selected"),
                    e.next().addClass("hide"))
                }
            else
                this.renderSelect(f, d);
            this.renderMenu(d)
        },
        getFormFieds: function() {
            var f = [];
            $("#formContainer_js").find(".field_js:not(.subtd_js\x3e.field_js)").each(function() {
                var d = $(this).data("componentData");
                d && "SerialNumber" != d.componentSetup.componentKey && "Paragraph" != d.componentSetup.componentKey && "DividingLine" != d.componentSetup.componentKey && f.push(d)
            });
            return f
        },
        renderSelect: function(f, d) {
            for (var b = $(this.tpl).siblings("#editor-fields").children().clone(), c = b.find("select"), g = 0; g < f.length; g++) {
                var e = f[g];
                c.append("\x3coption value\x3d'" + (e.componentSetup.fieldId || e.componentSetup.tempId) + "'\x3e" + e.componentSetup.title + "\x3c/option\x3e")
            }
            d.append(b)
        },
        checkEvents: function(f, d) {
            this.el || $(document)
        },
        getValue: function(f, d) {},
        setValue: function(f, d) {
            if (null != d) {
                var b = d.content;
                f.find("#" + (this.componentSetup.fieldId || this.componentSetup.tempId)).html(b).attr("title", b);
                f.find(".j_readOnly").html(b).attr("title", b);
                f.closest(".field_js").removeClass("hide");
                f.closest("tr").show()
            }
        },
        check: function(f) {
            $.trim(f.val());
            f.attr("placeholder");
            var d = {};
            d.element = f;
            return d
        },
        readOnly: function(f, d) {},
        empty: function(f) {},
        renderStatSearch: function(f) {
            var d = $(this.tpl)
              , b = f.term
              , c = f.parentEl
              , g = f.value
              , e = null;
            if ("mobile" != window.systemInfo_form)
                e = d.siblings("#statsearch-serial"),
                g && e.find("input").val(g),
                b && e.find("select:first option[value\x3d" + b + "]").attr("selected", "true"),
                c.attr("class", "sch-group j_formFieldSearchGroup"),
                c.find(".j_formField-condition").html(e);
            else {
                var e = d.siblings("#statsearch-serial-mobile")
                  , d = f.fieldId
                  , b = f.subFormId
                  , g = f.fieldTitle
                  , a = f.filterEl;
                f = f.condition;
                a && (a = a.find(".j_filterList .selectd #comp-val span").text(),
                e.find(".j_compVal").val(a));
                f && (e.find(".j_condition").find('option[value\x3d"' + f + '"]').attr("selected", !0),
                "null" != f && "notnull" != f || e.find(".j_control").hide());
                e.find(".j_inputName").text(g + ":");
                c.find("#component-div").html(e);
                c.find(".j_comp-ok").attr("comKey", "SerialNumber").attr("fieldId", d).attr("title", g).attr("subFormId", b);
                c.off("change", "#statsearch-serial-mobile .j_condition").on("change", "#statsearch-serial-mobile .j_condition", function() {
                    var a = $(this).val();
                    "null" == a || "notnull" == a ? c.find("#statsearch-serial-mobile .j_control").hide() : c.find("#statsearch-serial-mobile .j_control").show()
                })
            }
        }
    });
    u.exports = window.SerialNumber
});
define("form/component/contractcomponent", "form/relatecomponent form/tplutil form/componentmodel form/component/contractlist form/component/entityselecter form/component/typeahead form/component/relevancecontrol form/abposview".split(" "), function(n, y, u) {
    var m = n("form/relatecomponent")
      , h = n("form/tplutil")
      , g = n("form/componentmodel")
      , f = n("form/component/contractlist")
      , d = n("form/component/entityselecter")
      , b = n("form/component/typeahead")
      , c = n("form/component/relevancecontrol")
      , l = n("form/abposview");
    window.ContractComponent = m.extend({
        initialize: function(e) {
            m.prototype.initialize.call(this, e);
            var a = {
                componentKey: "ContractComponent",
                title: "\u5173\u8054\u5408\u540c",
                showfields: [],
                cusCustomFields: [],
                newSortColumn: [],
                selectColumn: [],
                orderContent: ""
            };
            null != e && (a.title = e.title,
            a.showfields = e.showfields,
            a.newSortColumn = e.newSortColumn,
            a.selectColumn = e.selectColumn,
            a.orderContent = e.orderContent,
            a.cusCustomFields = e.cusCustomFields);
            this.componentSetup = $.extend(this.componentSetup, a);
            this.basefields = {
                manager: "\u8d1f\u8d23\u4eba",
                number: "\u5408\u540c\u7f16\u53f7",
                type: "\u5408\u540c\u7c7b\u578b",
                totalMoney: "\u603b\u91d1\u989d",
                contractStatus: "\u5408\u540c\u72b6\u6001",
                startTime: "\u5f00\u59cb\u65e5\u671f",
                endTime: "\u7ed3\u675f\u65e5\u671f",
                customerSigner: "\u5ba2\u6237\u7b7e\u7ea6\u4eba",
                payMethod: "\u4ed8\u6b3e\u65b9\u5f0f",
                selfSigner: "\u6211\u65b9\u7b7e\u7ea6\u4eba",
                signTime: "\u7b7e\u7ea6\u65e5\u671f",
                contractcontent: "\u5408\u540c\u5185\u5bb9",
                description: "\u5907\u6ce8",
                stage: "\u671f\u6b21",
                receiveMoney: "\u56de\u6b3e",
                invoiceMoney: "\u5f00\u7968"
            };
            this.tpl = h.get("contractcomponent");
            this.componentModel = new g
        },
        setCusCustomFields: function(e) {
            this.componentSetup.cusCustomFields = e
        },
        setShowfields: function(e) {
            this.componentSetup.showfields = e
        },
        setNewSortColumn: function(e) {
            this.componentSetup.newSortColumn = e
        },
        setSelectColumn: function(e) {
            this.componentSetup.selectColumn = e
        },
        setOrderContent: function(e) {
            this.componentSetup.orderContent = e
        },
        render: function(e) {
            var a = this
              , c = $(this.tpl).siblings("#form-contract", {
                isMobileForm: this.isMobileForm
            });
            if (1 == e.parents("div[componentKey\x3d'TableLayout']").length || 1 == e.parents("div[componentKey\x3d'ColumnPanel']").length)
                e.removeClass("field-hoz"),
                this.componentSetup.titleLayout = "";
            this.componentModel.generatorId(function(c) {
                a.componentSetup.tempId = c.generatorId;
                e.attr("tempId", c.generatorId)
            });
            m.prototype.render.call(this, e, c);
            e.html(c.html())
        },
        renderEditPreview: function(e, a) {
            var c = $(this.tpl).siblings("#form-contract");
            m.prototype.renderEditPreview.call(this, e, c);
            a ? e.replaceWith(c) : e.append(c)
        },
        renderEditor: function() {
            var e = this
              , a = $(this.tpl).siblings("#editor-contract")
              , c = !1;
            if ("true" == this.componentSetup.isUnique || 1 == this.componentSetup.isUnique)
                c = !0;
            a.find("#isUnique").attr("checked", c);
            if (1 == $("#widget-control .field-active").parents("div[componentKey\x3d'TableLayout']").length || 1 == $("#widget-control .field-active").parents("div[componentKey\x3d'ColumnPanel']").length)
                $("#widget-control .field-active").removeClass("field-hoz"),
                this.componentSetup.titleLayout = "";
            e.getFormIdByModule("contract", a);
            a.find(".j_showField .j_contract-field-ul").empty();
            var d = this.componentSetup.showfields;
            if (d && 0 < d.length) {
                for (c = 0; c < d.length; c++) {
                    var f = d[c]
                      , g = a.find(".j_clone .j_contract-field-li").clone();
                    g.find("#" + f).attr("selected", "selected");
                    a.find(".j_showField .j_contract-field-ul").append(g)
                }
                a.find(".j_showField").removeClass("hide");
                a.find(".j_batch_edit").removeClass("hide");
                a.find(".j_cardConf").addClass("hide")
            }
            m.prototype.renderEditor.call(this, a);
            $("#editor-component").html(a.html());
            new b({
                remote: "/contract/datatable",
                entity: "contract",
                changeValue: function() {
                    e.setDefaultValue()
                }
            });
            if ((a = this.componentSetup.content) && 0 < a.length)
                for (d = $("#editor-component").find(".js_entity_container"),
                c = 0; c < a.length; c++)
                    f = {
                        id: a[c].optionId,
                        name: a[c].content
                    },
                    g = $('\x3cspan name\x3d"js_entity_item" class\x3d"js_entity_item employee-item j_component"\x3e\x3ca data-id\x3d"' + f.id + '" data-module\x3d"" id\x3d' + f.id + ' class\x3d"entitybox-toggle" title\x3d"' + f.name + '"\x3e' + f.name + '\x3c/a\x3e\x3ca class\x3d"close js_deleteItem" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e'),
                    g.data("obj", f),
                    d.append(g)
        },
        getFormIdByModule: function(e, a) {
            var c = this;
            $.ajax({
                type: TEAMS.ajaxMethod,
                dataType: "json",
                async: !1,
                url: TEAMS.api.getFormId,
                data: {
                    module: e
                },
                success: function(b) {
                    (b = b.data) && c.getFieldsByFormId(b, e, a)
                }
            })
        },
        getFieldsByFormId: function(e, a, c) {
            var b = {};
            b.formId = e;
            b.module = a;
            e = [];
            e.push("0");
            b.statusList = e;
            $.ajax({
                contentType: "application/json",
                type: TEAMS.ajaxMethod,
                async: !1,
                data: JSON.stringify(b),
                dataType: "json",
                url: TEAMS.api.queryFormFieldsByFormId,
                success: function(a) {
                    if (a && a.formField)
                        for (var e = 0; e < a.formField.length; e++) {
                            var b = a.formField[e];
                            b["delete"] || "SignatureComponent" == b.componentKey || c.find(".j_clone .j_contract-field-li select").append('\x3coption class\x3d"j_option j_custom_option" value\x3d"' + b.id + '" id\x3d"' + b.id + '"\x3e' + b.title + "\x3c/option\x3e")
                        }
                }
            })
        },
        setDefaultValue: function() {
            var e = $("#editor-component").find(".js_entity_container .js_entity_item")
              , a = [];
            0 < e.length && e.each(function(e) {
                var c = $(this).data("obj");
                a[e] = {
                    optionId: c.id,
                    content: c.name
                }
            });
            this.componentSetup.content = a
        },
        renderPreview: function(e, a, c, b, d) {
            var f = $(this.tpl);
            b = null;
            (b = $("body").find("#formTenantKey").val()) ? b = b.toUpperCase() : null != TEAMS.currentTenant && (b = TEAMS.currentTenant.tenantKey.toUpperCase());
            if ($("body").find("#scanReport").val() || null != TEAMS.currentUser && TEAMS.currentTenant.tenantKey.toUpperCase() == b)
                if (b = this.getCurrentModuleIsPay(d),
                0 == b || "false" == b) {
                    d = formPlugin.moduleIsPay("contract");
                    var g = $('\x3cspan class\x3d"employee-item"\x3e\u60a8\u7684\u56e2\u961f\u76ee\u524d\u662f\u514d\u8d39\u7248\u672c\uff0c\u4e0d\u652f\u6301\u6b64\u529f\u80fd\uff01\x3c/span\x3e');
                    "mobile" != window.systemInfo_form ? (b = f.siblings("#preview-contract"),
                    d || (b.find(".js_contractitem_container").empty().append(g),
                    b.find(".js_form-contract-add").addClass("hide"),
                    b.find(".typeahead-wrapper").remove())) : (b = f.siblings("#mobile-preview"),
                    d || b.find(".js_contractitem_container").removeClass("contract-seleted").empty().append(g))
                } else
                    b = "mobile" != window.systemInfo_form ? f.siblings("#preview-contract") : f.siblings("#mobile-preview");
            else
                b = f.siblings("#nocontract-preview"),
                b.find(".field_message_js").attr("cid", this.cid);
            if ((f = TEAMS.disableModules) && 0 < f.length)
                for (d = 0; d < f.length; d++)
                    if (g = f[d],
                    g.module && "contract" == g.module) {
                        b.addClass("hide");
                        break
                    }
            b.find(".widget-title .widget-title_js").text(this.componentSetup.title);
            "true" != this.componentSetup.isHideTitle && 1 != this.componentSetup.isHideTitle || b.addClass("field-notitle").find(".widget-title .widget-title_js").addClass("hide");
            "true" != this.componentSetup.required && 1 != this.componentSetup.required || b.find(".widget-title .widget-required_js").text(" *");
            "" != this.componentSetup.describe && b.find(".field-description").text(this.componentSetup.describe).show();
            b.find(".check_js").data("componentData", this).attr("id", this.componentSetup.fieldId + this.cid).attr("name", this.componentSetup.fieldId).attr("cid", this.cid);
            b.attr("fieldId", this.componentSetup.fieldId).attr("id", "field_" + (this.componentSetup.fieldId || this.componentSetup.tempId));
            "mobile" == window.systemInfo_form && b.find(".contract-seleted").attr("id", this.componentSetup.fieldId);
            f = this.componentSetup.isUnique;
            if ("true" == f || 1 == f)
                "mobile" != window.systemInfo_form ? b.find("#searchcontract").removeAttr("data-multi") : b.find(".js_contractitem_container").attr("data-multi", "false");
            b.addClass(this.componentSetup.titleLayout);
            "true" != this.componentSetup.isDefault && 1 != this.componentSetup.isDefault || a || (a = this.componentSetup.content) && 0 < a.length && null != TEAMS.currentUser && this.setValue(b, {
                dataOptions: a
            });
            if (c || "true" == c)
                "mobile" != window.systemInfo_form ? this.readOnly(b, !0) : b.find(".js_contractitem_container").removeClass("contract-seleted").text("");
            if ("true" == this.componentSetup.isReadOnly || 1 == this.componentSetup.isReadOnly)
                "mobile" != window.systemInfo_form ? this.readOnly(b, !0) : (b.find(".js_contractitem_container").removeClass("contract-seleted"),
                (a = this.componentSetup.content) && 0 != a.length || b.find(".js_contractitem_container").text(""));
            this.getValue(b);
            this.el = e;
            e.append(b)
        },
        getCurrentModuleIsPay: function(e) {
            var a = !1;
            e && (a = formPlugin.moduleIsPay(e));
            return a
        },
        renderStatSearch: function(e) {
            var a = this
              , c = $(this.tpl)
              , b = e.parentEl
              , d = e.container
              , f = null
              , g = e.fieldId
              , h = e.subFormId
              , l = e.filterEl
              , m = e.fieldTitle
              , n = e.condition
              , x = e.ids
              , C = e.term
              , B = b.find(".j_formField-select select").find("option:selected").attr("module") || e.module;
            if ("mobile" != window.systemInfo_form) {
                f = c.siblings("#statsearch-entity");
                f.find(".control-btn").attr("mod", B);
                if (x)
                    for (f.find(".entity-container").empty(),
                    m = 0; m < x.length; m++)
                        e = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d"' + x[m].id + '" title\x3d"' + x[m].text + '"\x3e' + x[m].text + "\x3c/a\x3e\x3c/span\x3e",
                        f.find(".entity-container").append(e);
                C && f.find("select:first option[value\x3d" + C + "]").attr("selected", "true");
                x = (new Date).getTime();
                f.find(".j_entityContainer").attr("id", "j_contract" + x);
                b.attr("class", "sch-group j_formFieldSearchGroup");
                b.find(".j_formField-condition").html(f);
                if ("biaoge" == B) {
                    var u = $(d + " #j_contract" + x + " #typeahead-contract");
                    u.attr("fieldId", g).attr("pageNo", "1").attr("pageSize", "10");
                    u.parents(".j_entityContainer").find(".typeahead-search").attr("url", "/formdata/queryRelevanceDataOptions.json").attr("fieldId", g);
                    window.typeahead && window.typeahead.init && window.typeahead.init({
                        el: d + " #j_contract" + x + " #typeahead-contract",
                        remote: "/formdata/queryRelevanceDataOptions.json",
                        callback: function(e) {
                            if (e && !$.isEmptyObject(e)) {
                                var c = u.parents(".j_entityContainer").find(".j_selected");
                                a.renderTypeheader(c, e)
                            }
                        }
                    })
                }
            } else
                f = c.siblings("#statsearch-contract-mobile"),
                n && (f.find(".j_condition").find('option[value\x3d"' + n + '"]').attr("selected", !0),
                "null" != n && "notnull" != n || f.find(".j_control").hide()),
                l && (f.find("#seleted-list").empty(),
                l.find(".j_filterList .selectd #comp-val span").each(function() {
                    var a = $(this).attr("optionId")
                      , e = $(this).text()
                      , c = $("\x3cspan\x3e\x3c/span\x3e");
                    c.attr("id", a).text(e);
                    f.find("#seleted-list").append(c)
                })),
                d = {},
                d.fieldId = g,
                d.pageNo = 1,
                d.pageSize = "20",
                d.module = B,
                a.searchContract(d, f, g, m, b, h),
                b.off("change", "#statsearch-contract-mobile .j_condition").on("change", "#statsearch-contract-mobile .j_condition", function() {
                    var a = $(this).val();
                    "null" == a || "notnull" == a ? b.find("#statsearch-contract-mobile .j_control").hide() : b.find("#statsearch-contract-mobile .j_control").show()
                }),
                b.off("tap", "#statsearch-contract-mobile .j_optionli").on("tap", "#statsearch-contract-mobile .j_optionli", function() {
                    var a = $(this);
                    a.hasClass("selected") ? a.removeClass("selected") : a.addClass("selected");
                    var e = a.find(".j_optionname").text()
                      , a = a.attr("id")
                      , e = '\x3cspan id\x3d"' + a + '"\x3e' + e + "\x3c/span\x3e";
                    0 < b.find("#statsearch-contract-mobile #seleted-list #" + a).length ? b.find("#statsearch-contract-mobile #seleted-list #" + a).remove() : b.find("#statsearch-contract-mobile #seleted-list").append(e)
                }),
                b.off("tap", "#statsearch-contract-mobile .j_more").on("tap", "#statsearch-contract-mobile .j_more", function() {
                    var e = $(this)
                      , c = e.attr("pageNo")
                      , d = e.attr("fieldId")
                      , e = e.attr("title")
                      , g = {};
                    g.fieldId = d;
                    g.pageSize = "20";
                    g.pageNo = c;
                    g.module = B;
                    a.searchContract(g, f, d, e, b, h)
                })
        },
        renderTypeheader: function(e, a) {
            var c = a.name
              , b = a.id;
            if (c && b) {
                var d = '\x3cspan id\x3d"' + b + '" class\x3d"entity-item j_entity_item" name\x3d"j_entity_item"\x3e\x3ca title\x3d"' + c + '" id\x3d"' + b + '" class\x3d"entitybox-toggle" data-module\x3d"contract" data-value\x3d"' + b + '" data-id\x3d"' + b + '"\x3e' + c + "\x3c/a\x3e\x3c/span\x3e";
                e.find(".entity-item").each(function(a) {
                    b == $(this).find("a").attr("id") && (d = null)
                });
                e.append(d);
                e.find(".j_entity_item").data("object", a)
            }
        },
        searchContract: function(e, a, c, b, d, f) {
            $.ajax({
                type: TEAMS.ajaxMethod,
                url: "freeform/queryFormDataOptions.json",
                dataType: "json",
                data: e,
                success: function(e) {
                    var g = e.dataOptionPage;
                    if (0 == g.totalCount)
                        a.find(".j_noresult").removeClass("hide"),
                        a.find(".eui-cells").addClass("hide");
                    else
                        for (g.hasNext && a.find(".j_more").removeClass("hide").attr("pageNo", g.pageNo + 1).attr("fieldId", c).attr("title", b),
                        e = g.result,
                        1 == g.pageNo && a.find(".j_optionUl").empty(),
                        a.find("#seleted-list").attr("fieldId", c),
                        g = 0; g < e.length; g++) {
                            var h = e[g]
                              , l = h.content
                              , h = h.optionId
                              , m = a.find("#li-clone li").clone();
                            0 < a.find("#seleted-list").find("#" + h).length && m.addClass("selected");
                            m.find(".j_optionname").text(l);
                            m.attr("id", h);
                            a.find(".j_optionUl").append(m)
                        }
                    d.find("#component-div").html(a);
                    d.find(".j_comp-ok").attr("comKey", "ContractComponent").attr("fieldId", c).attr("title", b).attr("subFormId", f)
                }
            })
        },
        submitCheck: function(e, a) {
            var c = this.check(e);
            a(c)
        },
        checkEvents: function(e) {
            var a = this
              , b = a.el || $(document)
              , g = a.componentSetup.fieldId + this.cid
              , h = a.componentSetup.newSortColumn
              , l = a.componentSetup.selectColumn
              , m = a.componentSetup.orderContent
              , w = a.componentSetup.isAddForRelation;
            (new this.contractAhead({})).initAhead(g, h, l, m, w);
            var n = a.componentSetup.isUnique;            
            if ("mobile" == window.systemInfo_form) 
                b.on("click", "#" + g + " .contract-seleted", function(e) {
                    e = $(this).attr("data-module");
                    var b = $(this).attr("data-multi")
                      , f = $(this).attr("data-noempty") && "true" == $(this).attr("data-noempty") ? !0 : !1
                      , h = $(this).parents(".j_page-view")
                      , k = h.attr("id")
                      , l = $(this);
                    if (!$(this).parents(".j_formpreview").hasClass("form-noedit")) {
                        var r = $("#" + g + " .contract-seleted .j_contract_detail")
                          , q = [];
                        r && 0 < r.length && r.each(function(a) {
                            a = $(this).find(".j_contract").attr("id");
                            var e = $(this).find(".j_contract").text();
                            q.push({
                                name: e,
                                id: a,
                                module: "contract"
                            })
                        });
                        "true" == n || 1 == n ? (l = new d,
                        l.render("mb", {
                            targetEl: $(this),
                            module: e,
                            multi: b,
                            preEl: "#" + k,
                            noempty: f,
                            seletedList: q,
                            showfields: a.componentSetup.showfields,
                            order: m
                        })) : 0 == q.length ? (l = new d,
                        l.render("mb", {
                            targetEl: $(this),
                            module: e,
                            multi: b,
                            preEl: "#" + k,
                            noempty: f,
                            seletedList: q,
                            showfields: a.componentSetup.showfields,
                            order: m
                        })) : (new c({
                            targetEl: l,
                            module: e,
                            multi: b,
                            preEl: "#" + k,
                            noempty: f,
                            seletedList: q,
                            showfields: a.componentSetup.showfields,
                            order: m
                        })).render();
                        h.addClass("hide")
                    }
                });
            b.off("entitySelected", "#" + g + " #searchcontract").on("entitySelected", "#" + g + " #searchcontract", function(e) {
                var c = $("#" + g);
                1 != n && "true" != n || $("#" + g + " .js_contractitem_container").empty();
                for (var b = 1; b < arguments.length; b++)
                    c.parents(".field_js").find(".form-error").text(""),
                    c.parents(".field_js").find(".form-error").hide(),
                    a.renderSelectItem(g, arguments[b], a.componentSetup.showfields, c);
                a.triggerFillRelate(c)
            });
            b.on("click", "#" + g + " #searchcontract", function(e) {
                window.abposview && window.abposview.remove();
                e.stopPropagation();
                $("#" + g + " .control-input").trigger("focusout", "tt");
                var c = [];
                (e = $("#" + g + " .js_contractitem_container .j_contract_detail")) && 0 < e.length && e.each(function(a) {
                    a = $(this).find(".j_contract").attr("id");
                    var e = $(this).find(".j_contract").text()
                      , b = $(this).find(".j_contract").data("contract");
                    null == b && (b = {
                        name: e,
                        id: a
                    });
                    c.push({
                        name: e,
                        id: a,
                        contract: b
                    })
                });
                e = $(this);
                (new f).render("pc", {
                    targetEl: e,
                    keyword: "",
                    isUnique: n,
                    seletedList: c,
                    selectColumn: a.componentSetup.selectColumn,
                    order: m,
                    isAddForRelation: w
                })
            });
            b.on("mouseenter.typeahead", "#" + g + " .typeahead-wrapper", function(a) {
                $(this).data("enter", !0)
            }).on("mouseleave.typeahead", "#" + g + " .typeahead-wrapper", function(a) {
                $(this).data("enter", !1)
            });
            b.on("click", "#" + g + " .control-btn", function(a) {
                a.stopPropagation();
                $(this).addClass("hide");
                $(this).prev(".typeahead-wrapper").removeClass("hide");
                $(this).prev(".typeahead-wrapper").find(".control-input").focus()
            });
            b.on("focusout", "#" + g + " .control-input", function(a, e) {
                var c = $(this).parents(".typeahead-wrapper");
                c.data("enter") && "tt" != e || (c.addClass("hide"),
                c.next(".control-btn").removeClass("hide"))
            });
            b.on("click.tt", "#" + g + " #searchList\x3ep", function() {
                var e = $("#" + g);
                e.parents(".field_js").find(".form-error").text("");
                e.parents(".field_js").find(".form-error").hide();
                var c = a.componentSetup.showfields
                  , b = a.componentSetup.isUnique;
                "true" != b && 1 != b || e.find(".js_contractitem_container").empty();
                if ($(this).hasClass("creat-new")) {
                    b = $(this).attr("title");
                    if (null == b || "" == b)
                        return;
                    $.ajax({
                        type: TEAMS.ajaxMethod,
                        async: !1,
                        url: "/contract/datatable",
                        dataType: "json",
                        data: {
                            contract: JSON.stringify({
                                name: b,
                                manager: {
                                    id: TEAMS.currentUser.id
                                }
                            })
                        },
                        success: function(b) {
                            b && b.message && 0 != b.message.code || a.renderSelectItem(g, b.data, c, e)
                        }
                    })
                } else
                    b = $(this).data("contract"),
                    a.renderSelectItem(g, b, c, e);
                a.triggerFillRelate(e)
            });
            b.on("click", "#" + g + " .js_deleteContract", function() {
                var c = $(this).parents("#" + g)
                  , b = a.componentSetup.showfields;
                null == b || 0 == b.length ? $(this).parent().remove() : $(this).parent().parent().parent().remove();
                a.triggerFillRelate(c);
                c = a.check(c, "change");
                e(c)
            });
            "mobile" == window.systemInfo_form && (b.on("objsComfirm", "#" + g + " .contract-seleted", function(e, c) {
                var b = $("#" + g + " .js_contractitem_container")
                  , d = a.componentSetup.isUnique;
                b.text("");
                b.parents("#field_" + a.componentSetup.fieldId).find(".form-error").text("");
                "true" != d && 1 != d || b.empty();
                if (0 < c.objs.length) {
                    var d = c.objs, f;
                    for (f in d) {
                        var h = d[f];
                        if (h) {
                            var k = $('\x3cspan id\x3d"' + h.id + '" class\x3d"j_contract_detail j_component employee-item j_contract_detail"\x3e\x3ca id\x3d"' + h.id + '" data-module\x3d"contract" data-value\x3d"' + h.id + '" data-id\x3d"' + h.id + '" class\x3d"j_contract entitybox-toggle"\x3e' + h.name + "\x3c/a\x3e\x3c/span\x3e");
                            b.append(k)
                        }
                    }
                } else
                    h = c.objs,
                    k = $('\x3cspan id\x3d"' + h.id + '" class\x3d"j_contract_detail j_component employee-item j_contract_detail"\x3e\x3ca id\x3d"' + h.id + '" data-module\x3d"contract" data-value\x3d"' + h.id + '" data-id\x3d"' + h.id + '" class\x3d"j_contract entitybox-toggle"\x3e' + h.name + "\x3c/a\x3e\x3c/span\x3e"),
                    0 == h.length ? b.html('\x3cdiv class\x3d"widget-link-holder"\x3e\x3ci class\x3d"icon-plus2"\x3e\x3c/i\x3e\u9009\u62e9\u5408\u540c\x3c/div\x3e') : b.append(k);
                a.triggerFillRelate(b)
            }),
            b.on("deleteObj", "#" + g + " .contract-seleted", function(e, c) {
                var b = $("#" + g + " .js_contractitem_container");
                b.find('span[id\x3d"' + c + '"]').remove();
                0 == b.find("span").length && b.html('\x3cdiv class\x3d"widget-link-holder"\x3e\x3ci class\x3d"icon-plus2"\x3e\x3c/i\x3e\u9009\u62e9\u5408\u540c\x3c/div\x3e');
                a.triggerFillRelate(b)
            }))
        },
        autoSaveEvents: function(e) {
            var a = this
              , c = a.el || $(document)
              , b = a.componentSetup.fieldId + this.cid;
            c.on("click", "#" + b + " .js_deleteContract", function() {
                a.saveComponentValue(c.find("#" + b), e)
            });
            if ("mobile" == window.systemInfo_form)
                c.on("objsComfirm", "#" + b + " .contract-seleted", function(c, b) {
                    a.saveComponentValue($(this), e)
                });
            else
                c.on("click", "#" + b + " #searchList\x3ep", function() {
                    a.saveComponentValue($(this), e)
                }),
                c.on("entitySelected", "#" + b + " #searchcontract", function(c) {
                    a.saveComponentValue($(this), e)
                })
        },
        renderSelectItem: function(e, a, c, b) {
            if (!(0 < b.find(".js_contractitem_container").find(".j_contract[id\x3d'" + a.id + "']").length))
                if (null == c || 0 == c.length) {
                    var d = '\x3cspan id\x3d"' + a.id + '" name\x3d"j_contract_detail" class\x3d"j_contract_detail j_component employee-item"\x3e\x3ca id\x3d"' + a.id + '" data-id\x3d"' + a.id + '" data-module\x3d"contract" class\x3d"entitybox-toggle j_contract" title\x3d"' + a.name + '"\x3e' + a.name + '\x3c/a\x3e\x3ca class\x3d"close js_deleteContract" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e';
                    (e = $("#" + e + " .js_contractitem_container .j_contract_detail")) && e.each(function(e) {
                        a.id == $(this).find(".j_contract").attr("id") && $(this).remove()
                    });
                    b.find(".js_contractitem_container").append(d);
                    b.find(".js_contractitem_container").find(".j_contract[id\x3d'" + a.id + "']").data("contract", a)
                } else {
                    d = b.find(".j_contract_detail_clone .j_contract_detail").clone();
                    d.attr("id", a.id).attr("data-value", a.id).attr("data-id", a.id);
                    d.find(".j_contract").attr("id", a.id).text(a.name).attr("data-original-title", a.name);
                    d.find(".j_contract").data("contract", a);
                    for (var f = 0; f < c.length; f++) {
                        var g = c[f]
                          , h = b.find(".j_contract_detail_clone .j_field").clone();
                        h.attr("id", g);
                        h.find(".j_field_title").text(this.basefields[g]);
                        if ("manager" == g)
                            h.find(".j_field_value").prop("title", a[g] ? a[g].username : "").text(a[g] ? a[g].username : "");
                        else if ("number" == g || "customerSigner" == g || "selfSigner" == g || "description" == g || "stage" == g || "receiveMoney" == g || "invoiceMoney" == g)
                            h.find(".j_field_value").prop("title", a[g] ? a[g] : "").text(a[g] ? a[g] : "");
                        else if ("contractcontent" == g)
                            h.find(".j_field_value").prop("title", a.content ? a.content : "").text(a.content ? a.content : "");
                        else if ("startTime" == g || "endTime" == g || "signTime" == g)
                            g = a[g] ? a[g] : "",
                            "" != g && null != g && (g = Date.create(g).format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}")),
                            h.find(".j_field_value").prop("title", g).text(g);
                        else if ("totalMoney" == g)
                            h.find(".j_field_value").prop("title", a[g]).text(a[g]);
                        else if ("contractStatus" == g)
                            h.find(".j_field_value").prop("title", a.status ? a.status.name : "").text(a.status ? a.status.name : "");
                        else if ("payMethod" == g || "type" == g)
                            h.find(".j_field_value").prop("title", a[g] ? a[g].name : "").text(a[g] ? a[g].name : "");
                        else
                            continue;
                        d.find(".j_part .j_line").append(h)
                    }
                    var l = {};
                    if (a.formDataId && this.componentSetup.cusCustomFields) {
                        h = [];
                        for (c = 0; c < this.componentSetup.cusCustomFields.length; c++)
                            f = this.componentSetup.cusCustomFields[c],
                            h.push(f.substring(0, f.indexOf("_")));
                        c = {};
                        c.formDataId = a.formDataId;
                        c.module = "contract";
                        c.fieldIds = h;
                        $.ajax({
                            contentType: "application/json",
                            type: TEAMS.ajaxMethod,
                            async: !1,
                            data: JSON.stringify(c),
                            dataType: "json",
                            url: "freeform/findAllFormDataFields.json",
                            success: function(a) {
                                if (a && a.formData && a.formData.dataDetails)
                                    for (var e = 0; e < a.formData.dataDetails.length; e++) {
                                        var c = a.formData.dataDetails[e]
                                          , b = c.content;
                                        !b && c.dataText && (b = c.dataText.content);
                                        if (!b && 0 < c.dataOptions.length) {
                                            for (var b = "", d = 0; d < c.dataOptions.length; d++)
                                                b += c.dataOptions[d].content + ",";
                                            b = b.substring(0, b.length - 1)
                                        }
                                        l[c.formField.id] = b
                                    }
                            }
                        })
                    }
                    if (this.componentSetup.cusCustomFields)
                        for (c = 0; c < this.componentSetup.cusCustomFields.length; c++)
                            f = this.componentSetup.cusCustomFields[c],
                            h = b.find(".j_contract_detail_clone .j_field").clone(),
                            h.attr("id", f.substring(0, f.indexOf("_"))),
                            h.find(".j_field_title").text(f.substring(f.indexOf("_") + 1, f.length)),
                            h.find(".j_field_value").prop("title", l[f.substring(0, f.indexOf("_"))]).text(l[f.substring(0, f.indexOf("_"))]),
                            d.find(".j_part .j_line").append(h);
                    d.find(".j_title").append('\x3ca class\x3d"close js_deleteContract" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e');
                    $("#" + e + " .js_contractitem_container").append(d)
                }
        },
        contractAhead: Backbone.View.extend({
            defaults: function() {
                this.remote = this.suggestion = "";
                this.entity = "contract";
                this.tpl = h.get("contractcomponent")
            },
            initAhead: function(e, a, c, b, d) {
                this.defaults();
                this.fieldId = e;
                this.newSortColumn = a;
                this.selectColumn = c;
                this.orderContent = b;
                this.isAddForRelation = d;
                this.$continer = $("#" + this.fieldId);
                this._htmlEvents()
            },
            _htmlEvents: function() {
                var e = this
                  , a = e.$continer
                  , c = $("#" + e.fieldId + " #typeahead-contract");
                c.off("focus.tt").on("focus.tt", function(a) {
                    e._search($(this))
                });
                c.off("click.tt").on("click.tt", function(a) {
                    a.stopPropagation()
                });
                c.off("keyup.tt").on("keyup.tt", function(b) {
                    b = b.which;
                    0 < $("body").find("#form-abposselect").length && (a = $("body").find("#form-abposselect").find(".field_js"));
                    13 == b ? (a.find("#contract-typeahead-div p.active").trigger("click.tt"),
                    window.abposview && window.abposview.remove()) : 27 == b ? (c.trigger("focusout", "tt"),
                    window.abposview && window.abposview.remove()) : 38 == b ? (b = $("#contract-typeahead-div p.active"),
                    1 > b.length ? a.find("#contract-typeahead-div p").last().addClass("active") : (b.removeClass("active"),
                    (0 < b.prev().length ? b.prev() : a.find("#contract-typeahead-div p").last()).addClass("active"))) : 40 == b ? (b = a.find("#contract-typeahead-div p.active"),
                    1 > b.length ? a.find("#contract-typeahead-div p").first().addClass("active") : (b.removeClass("active"),
                    (0 < b.next().length ? b.next() : a.find("#contract-typeahead-div p").first()).addClass("active"))) : e._search($(this))
                });
                a.find("#contract-typeahead-div").off("mouseenter.tt", "p").on("mouseenter.tt", "p", function() {
                    0 < $("body").find("#form-abposselect").length && (a = $("body").find("#form-abposselect").find(".field_js"));
                    $(this).addClass("active");
                    a.find("#contract-typeahead-div p.active").removeClass("active")
                });
                a.off("click.tt", "#contract-typeahead-div p").on("click.tt", "#contract-typeahead-div p", function(a) {
                    c.trigger("focusout", "tt")
                })
            },
            _search: function(e) {
                var a = this
                  , c = a.$continer
                  , b = $.trim(e.val());
                b == e.attr("placeholder") && (b = "");
                c.find("#contract-typeahead-div #searchList").html("");
                0 < $("body").find("#form-abposselect").length ? ($("body").find("#form-abposselect").find(".field_js").find("#contract-typeahead-div .loading_small").show(),
                c.find("#contract-typeahead-div .loading_small").hide()) : c.find("#contract-typeahead-div .loading_small").show();
                window.abposview && window.abposview.remove();
                e = {};
                var c = "updateTime"
                  , d = "desc";
                a.orderContent && (c = a.orderContent.property,
                d = a.orderContent.direction);
                e.queryStr = JSON.stringify({
                    darw: 1,
                    pageNo: 1,
                    pageSize: 10,
                    orderWay: d,
                    orderBy: c,
                    conditions: [{
                        id: "name",
                        type: "string",
                        value: b
                    }],
                    filter: {
                        type: "all"
                    },
                    customConditions: []
                });
                e.filter = {
                    type: "all"
                };
                e.employeeId = TEAMS.currentUser.id;
                $.ajax({
                    type: TEAMS.ajaxMethod,
                    url: "/contract/datatable",
                    dataType: "json",
                    data: e,
                    success: function(e) {
                        e && e.message && 0 != e.message.code || a.renderContracts(e.data, b)
                    }
                })
            },
            renderContracts: function(e, a) {
                var c = this.$continer;
                0 < $("body").find("#form-abposselect").length ? $("body").find("#form-abposselect").find(".field_js").find("#contract-typeahead-div .loading_small").hide() : c.find("#contract-typeahead-div .loading_small").hide();
                if (null != e && 0 < e.length)
                    for (var b = 0; b < e.length; b++) {
                        var d = e[b]
                          , f = d.name
                          , g = $(this.tpl).siblings("#contract-clone").find(".j_contract").clone();
                        g.text(f);
                        g.attr("title", f).attr("id", d.id);
                        g.data("contract", d);
                        c.find("#contract-typeahead-div #searchList").append(g).show()
                    }
                else {
                    if (null == a || "" == a)
                        return;
                    0 != this.isAddForRelation && "false" != this.isAddForRelation && (g = $('\x3cp class\x3d"contract creat-new"\x3e\x3ci class\x3d"icon-plus-thin"\x3e\x3c/i\x3e \u6dfb\u52a0\u5408\u540c\uff1a' + a + "\x3c/p\x3e"),
                    g.attr("title", a),
                    c.find("#contract-typeahead-div #searchList").find(".creat-new").remove(),
                    c.find("#contract-typeahead-div #searchList").append(g))
                }
                c.find("#contract-typeahead-div #searchList").show();
                window.abposview && window.abposview.remove();
                window.abposview = new l({
                    continer: c,
                    entity: this.entity
                });
                window.abposview.render()
            }
        }),
        check: function(e) {
            var a = $(e).find(".js_contractitem_container .j_contract_detail").length
              , c = {};
            c.element = e;
            0 != a || "true" != this.componentSetup.required && 1 != this.componentSetup.required || (c.message = this.componentSetup.title + "\u4e0d\u80fd\u4e3a\u7a7a");
            return c
        },
        getValue: function(e, a) {
            var c = {
                formField: {
                    id: this.componentSetup.fieldId
                }
            }
              , b = e.find(".js_contractitem_container .j_contract_detail");
            if (0 < b.length) {
                var d = [];
                b.each(function(a) {
                    var e = $(this).find(".j_contract").attr("id")
                      , c = $(this).find(".j_contract").text();
                    d[a] = {
                        optionId: e,
                        content: c,
                        type: "contract"
                    }
                });
                c.dataOptions = d
            } else
                a || (c = null);
            return c
        },
        setValue: function(e, a) {
            e.find(".js_contractitem_container").empty();
            var c = this
              , b = this.componentSetup.showfields;
            if (null != a && null != a.dataOptions) {
                for (var d = [], f = [], g = 0; g < a.dataOptions.length; g++) {
                    var h = a.dataOptions[g]
                      , l = null == h.content ? "" : h.content
                      , h = h.optionId;
                    d.push(h);
                    f.push({
                        id: h,
                        name: l
                    })
                }
                if (TEAMS.currentUser && TEAMS.currentUser.id)
                    null == b || 0 == b.length ? c.renderContracts(f, e, b, a) : (g = {},
                    g.ids = d,
                    $.ajax({
                        contentType: "application/json",
                        type: TEAMS.ajaxMethod,
                        data: JSON.stringify(g),
                        dataType: "json",
                        async: !1,
                        url: "/form/queryContractsByIds.json",
                        success: function(d) {
                            if (!d || !d.message || 0 == d.message.code) {
                                d = d.contracts;
                                for (var g = [], h = 0; h < f.length; h++) {
                                    for (var l = f[h], m = !0, r = 0; r < d.length; r++) {
                                        var p = d[r];
                                        if (p.id == l.id) {
                                            g.push(p);
                                            m = !1;
                                            break
                                        }
                                    }
                                    m && g.push(l)
                                }
                                c.renderContracts(g, e, b, a)
                            }
                        }
                    }));
                else
                    for (g = 0; g < f.length; g++)
                        d = f[g],
                        "mobile" == window.systemInfo_form && (d = $('\x3cspan href\x3d"/mobile/crms/' + d.id + "?module\x3dkey_contract\x26info\x3dview_ContractView|id_" + d.id + '" id\x3d"' + d.id + '" class\x3d"router j_component employee-item j_contract_detail"\x3e\x3ca class\x3d"j_contract" id\x3d"' + d.id + '"\x3e' + d.name + "\x3c/a\x3e\x3c/span\x3e"),
                        e.find(".js_contractitem_container").append(d))
            }
        },
        renderContracts: function(e, a, c, b) {
            for (b = 0; b < e.length; b++) {
                var d = e[b];
                if ("mobile" == window.systemInfo_form)
                    var f = $('\x3cspan href\x3d"/mobile/crms/' + d.id + "?module\x3dkey_contract\x26info\x3dview_ContractView|id_" + d.id + '" id\x3d"' + d.id + '" class\x3d"router j_component employee-item j_contract_detail"\x3e\x3ca class\x3d"j_contract" id\x3d"' + d.id + '"\x3e' + d.name + "\x3c/a\x3e\x3c/span\x3e");
                else if (null == c || 0 == c.length)
                    f = "",
                    f = null != a.find(".js_form-contract-add").get(0) ? '\x3cspan id\x3d"' + d.id + '" name\x3d"j_contract_detail" class\x3d"j_contract_detail j_component employee-item"\x3e\x3ca id\x3d"' + d.id + '" data-id\x3d"' + d.id + '" data-module\x3d"contract" class\x3d"entitybox-toggle j_contract" title\x3d"' + d.name + '"\x3e' + d.name + '\x3c/a\x3e\x3ca class\x3d"close js_deleteContract" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e' : '\x3cspan id\x3d"' + d.id + '" name\x3d"j_contract_detail" class\x3d"j_contract_detail j_component employee-item"\x3e\x3ca id\x3d"' + d.id + '" data-id\x3d"' + d.id + '" data-module\x3d"contract" class\x3d"entitybox-toggle j_contract" title\x3d"' + d.name + '"\x3e' + d.name + "\x3c/a\x3e\x3c/span\x3e";
                else {
                    f = a.find(".j_contract_detail_clone .j_contract_detail").clone();
                    f.attr("id", d.id).attr("data-value", d.id).attr("data-id", d.id);
                    f.find(".j_contract").attr("id", d.id).text(d.name).attr("data-original-title", d.name);
                    for (var g = 0; g < c.length; g++) {
                        var h = c[g]
                          , l = a.find(".j_contract_detail_clone .j_field").clone();
                        l.attr("id", h);
                        l.find(".j_field_title").text(this.basefields[h]);
                        if ("manager" == h)
                            l.find(".j_field_value").prop("title", d[h] ? d[h].username : "").text(d[h] ? d[h].username : "");
                        else if ("number" == h || "customerSigner" == h || "selfSigner" == h || "description" == h || "stage" == h || "receiveMoney" == h || "invoiceMoney" == h)
                            l.find(".j_field_value").prop("title", d[h] ? d[h] : "").text(d[h] ? d[h] : "");
                        else if ("contractcontent" == h)
                            l.find(".j_field_value").prop("title", d.content ? d.content : "").text(d.content ? d.content : "");
                        else if ("startTime" == h || "endTime" == h || "signTime" == h)
                            h = d[h] ? d[h] : "",
                            "" != h && null != h && (h = Date.create(h).format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}")),
                            l.find(".j_field_value").prop("title", h).text(h);
                        else if ("totalMoney" == h)
                            l.find(".j_field_value").prop("title", d[h]).text(d[h]);
                        else if ("contractStatus" == h)
                            l.find(".j_field_value").prop("title", d.simpleContractStatus ? d.simpleContractStatus.name : "").text(d.simpleContractStatus ? d.simpleContractStatus.name : "");
                        else if ("payMethod" == h)
                            l.find(".j_field_value").prop("title", d.simpleContractPayMethod ? d.simpleContractPayMethod.name : "").text(d.simpleContractPayMethod ? d.simpleContractPayMethod.name : "");
                        else if ("type" == h)
                            l.find(".j_field_value").prop("title", d.simpleContractType ? d.simpleContractType.name : "").text(d.simpleContractType ? d.simpleContractType.name : "");
                        else
                            continue;
                        f.find(".j_part .j_line").append(l)
                    }
                    var m = {};
                    if (d.formDataId && this.componentSetup.cusCustomFields) {
                        l = [];
                        for (g = 0; g < this.componentSetup.cusCustomFields.length; g++)
                            h = this.componentSetup.cusCustomFields[g],
                            l.push(h.substring(0, h.indexOf("_")));
                        g = {};
                        g.formDataId = d.formDataId;
                        g.module = "contract";
                        g.fieldIds = l;
                        $.ajax({
                            contentType: "application/json",
                            type: TEAMS.ajaxMethod,
                            async: !1,
                            data: JSON.stringify(g),
                            dataType: "json",
                            url: "freeform/findAllFormDataFields.json",
                            success: function(a) {
                                if (a && a.formData && a.formData.dataDetails)
                                    for (var e = 0; e < a.formData.dataDetails.length; e++) {
                                        var c = a.formData.dataDetails[e]
                                          , b = c.content;
                                        !b && c.dataText && (b = c.dataText.content);
                                        if (!b && 0 < c.dataOptions.length) {
                                            for (var b = "", d = 0; d < c.dataOptions.length; d++)
                                                b += c.dataOptions[d].content + ",";
                                            b = b.substring(0, b.length - 1)
                                        }
                                        m[c.formField.id] = b
                                    }
                            }
                        })
                    }
                    if (this.componentSetup.cusCustomFields)
                        for (d = 0; d < this.componentSetup.cusCustomFields.length; d++)
                            g = this.componentSetup.cusCustomFields[d],
                            l = a.find(".j_contract_detail_clone .j_field").clone(),
                            l.attr("id", g.substring(0, g.indexOf("_"))),
                            l.find(".j_field_title").text(g.substring(g.indexOf("_") + 1, g.length)),
                            l.find(".j_field_value").prop("title", m[g.substring(0, g.indexOf("_"))]).text(m[g.substring(0, g.indexOf("_"))]),
                            f.find(".j_part .j_line").append(l);
                    null != a.find(".js_form-contract-add").get(0) && f.find(".j_title").append('\x3ca class\x3d"close js_deleteContract" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e')
                }
                a.find(".js_contractitem_container").append(f)
            }
        },
        empty: function(e) {
            e.find(".js_contractitem_container").html("")
        },
        readOnly: function(e, a) {
            var c = this.componentSetup.fieldId + this.cid
              , b = e.find('div[id\x3d"' + c + '"] span[name\x3d"js_form-contract-add"]')
              , d = e.find('div[id\x3d"' + c + '"] .js_contractitem_container .j_contract_detail')
              , f = e.find('div[id\x3d"' + c + '"] .js_deleteContract');
            a ? (b.remove(),
            f.remove()) : b && 0 != b.length && null != b || (b = $(this.tpl).siblings("#preview-form").find('span[name\x3d"js_form-contract-add"]'),
            e.find('div[id\x3d"' + c + '"]').find(".js_contractitem_container").after(b),
            d.find(".j_title").append('\x3ca class\x3d"close js_deleteContract" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e'))
        }
    });
    u.exports = window.ContractComponent
});
define("form/component/document", "form/relatecomponent form/tplutil form/component/entityselecter form/component/relevancecontrol form/componentmodel form/abposview".split(" "), function(n, y, u) {
    var m = n("form/relatecomponent")
      , h = n("form/tplutil")
      , g = n("form/component/entityselecter")
      , f = n("form/component/relevancecontrol")
      , d = n("form/componentmodel")
      , b = n("form/abposview");
    window.Document = m.extend({
        initialize: function(c) {
            m.prototype.initialize.call(this, c);
            var b = {
                componentKey: "Document",
                title: "\u5173\u8054\u6587\u6863",
                orderContent: "",
                filterParams: "",
                filterQueryParams: ""
            };
            null != c && (b.title = c.title,
            b.orderContent = c.orderContent,
            b.filterParams = c.filterParams,
            b.filterQueryParams = c.filterQueryParams);
            this.componentSetup = $.extend(this.componentSetup, b);
            this.tpl = h.get("document", {
                isMobileForm: this.isMobileForm
            });
            this.componentModel = new d
        },
        setOrderContent: function(c) {
            this.componentSetup.orderContent = c
        },
        setFilterParams: function(c) {
            this.componentSetup.filterParams = c
        },
        setFilterQueryParams: function(c) {
            this.componentSetup.filterQueryParams = c
        },
        render: function(c) {
            var b = this
              , e = $(this.tpl).siblings("#form-document");
            m.prototype.render.call(this, c, e);
            this.componentModel.generatorId(function(a) {
                b.componentSetup.tempId = a.generatorId;
                c.attr("tempId", a.generatorId)
            });
            c.html(e.html())
        },
        renderEditor: function() {
            var c = $(this.tpl).siblings("#editor-document");
            c.find(".j_default_container").attr("id", this.componentSetup.fieldId + this.cid);
            "true" != this.componentSetup.isUnique && 1 != this.componentSetup.isUnique || c.find("#isUnique").attr("checked", !0);
            m.prototype.renderEditor.call(this, c);
            $("#editor-component").html(c.html());
            if ((c = this.componentSetup.content) && 0 < c.length)
                for (var b = $("#editor-component").find(".js_documentitem_container"), e = 0; e < c.length; e++)
                    b.append('\x3cspan name\x3d"js_form-documentItem" class\x3d"js_form-documentItem j_component employee-item"\x3e\x3ca data-id\x3d"' + c[e].optionId + '" data-module\x3d"document" documentId\x3d' + c[e].optionId + ' class\x3d"entitybox-toggle" title\x3d"' + c[e].content + '"\x3e' + c[e].content + '\x3c/a\x3e\x3ca class\x3d"close js_deleteDocument" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e');
            this.selectEvents()
        },
        selectEvents: function() {
            var c = this
              , b = $("#editor-component").find("#j_default_value")
              , e = this.componentSetup.fieldId + this.cid
              , a = this.componentSetup.orderContent;
            (new this.documentAhead({})).initAhead({
                fieldId: e,
                el: b,
                isDefault: !0,
                orderContent: a,
                callback: function() {
                    c.setDefaultValue()
                }
            });
            b.find("#" + e + " #searchdocument").click(function() {
                var c = b.find("#" + e + " .js_documentitem_container .js_form-documentItem");
                b.find("#" + e + " .control-input").trigger("focusout", "tt");
                var d = [];
                c && 0 < c.length && c.each(function(a) {
                    a = $(this).find(".entitybox-toggle").attr("documentId");
                    var e = $(this).find(".entitybox-toggle").text();
                    d.push({
                        name: e,
                        id: a
                    })
                });
                var c = $(this).attr("data-entity")
                  , f = $(this)
                  , h = f.parent().find("input");
                (new g).render("pc", {
                    targetEl: f,
                    keyword: h ? h.val() : "",
                    module: c,
                    type: f.attr("data-type"),
                    isUnique: isUnique,
                    seletedList: d,
                    order: a
                })
            });
            b.off("entitySelected", "#" + e + " #searchdocument").on("entitySelected", "#" + e + " #searchdocument", function(a) {
                b.find("#" + e + " .js_documentitem_container").empty();
                for (var d = 1; d < arguments.length; d++) {
                    var f = arguments[d]
                      , g = $("#" + e);
                    g.parents(".field_js").find(".form-error").text("");
                    g.parents(".field_js").find(".form-error").hide();
                    var h = f.id
                      , f = f.name
                      , f = '\x3cspan name\x3d"js_form-documentItem" class\x3d"js_form-documentItem j_component employee-item"\x3e\x3ca data-id\x3d"' + h + '" data-module\x3d"document" documentId\x3d' + h + ' class\x3d"entitybox-toggle" title\x3d"' + f + '"\x3e' + f + '\x3c/a\x3e\x3ca class\x3d"close js_deleteDocument" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e'
                      , m = $("#" + e + " .js_documentitem_container .js_form-documentItem");
                    m && m.each(function(a) {
                        h == $(this).find(".entitybox-toggle").attr("documentId") && ($(this).remove(),
                        flag = !1)
                    });
                    g.find(".js_documentitem_container").append(f)
                }
                c.setDefaultValue()
            })
        },
        setDefaultValue: function() {
            var c = $("#editor-component").find(".js_documentitem_container .js_form-documentItem")
              , b = [];
            0 < c.length && c.each(function(e) {
                var a = $(this).find(".entitybox-toggle").attr("documentId")
                  , c = $(this).find(".entitybox-toggle").text();
                b[e] = {
                    optionId: a,
                    content: c
                }
            });
            this.componentSetup.content = b
        },
        renderPreview: function(c, b, e, a, d) {
            var f = $(this.tpl);
            a = null;
            (a = $("body").find("#formTenantKey").val()) ? a = a.toUpperCase() : null != TEAMS.currentTenant && (a = TEAMS.currentTenant.tenantKey.toUpperCase());
            if ($("body").find("#scanReport").val() || null != TEAMS.currentUser && TEAMS.currentTenant.tenantKey.toUpperCase() == a)
                if (a = this.getCurrentModuleIsPay(d),
                0 == a || "false" == a) {
                    d = formPlugin.moduleIsPay("document");
                    var g = $('\x3cspan class\x3d"employee-item"\x3e\u60a8\u7684\u56e2\u961f\u76ee\u524d\u662f\u514d\u8d39\u7248\u672c\uff0c\u4e0d\u652f\u6301\u6b64\u529f\u80fd\uff01\x3c/span\x3e');
                    "mobile" != window.systemInfo_form ? (a = f.siblings("#preview-document"),
                    d || (a.find(".js_documentitem_container").empty().append(g),
                    a.find(".js_form-document-add").addClass("hide"),
                    a.find(".typeahead-wrapper").remove())) : (a = f.siblings("#mobile-preview"),
                    d || a.find(".js_documentitem_container").removeClass("document-seleted").empty().append(g))
                } else
                    a = "mobile" != window.systemInfo_form ? f.siblings("#preview-document") : f.siblings("#mobile-preview");
            else
                a = f.siblings("#nodoc-preview"),
                a.find(".field_message_js").attr("cid", this.cid);
            if ((f = TEAMS.disableModules) && 0 < f.length)
                for (d = 0; d < f.length; d++)
                    if (g = f[d],
                    g.module && "document" == g.module) {
                        a.addClass("hide");
                        break
                    }
            a.find(".widget-title .widget-title_js").text(this.componentSetup.title);
            "true" != this.componentSetup.isHideTitle && 1 != this.componentSetup.isHideTitle || a.addClass("field-notitle").find(".widget-title .widget-title_js").addClass("hide");
            "true" != this.componentSetup.required && 1 != this.componentSetup.required || a.find(".widget-title .widget-required_js").text(" *");
            "" != this.componentSetup.describe && a.find(".field-description").text(this.componentSetup.describe).show();
            a.find(".check_js").attr("id", this.componentSetup.fieldId + this.cid).attr("name", this.componentSetup.fieldId).attr("cid", this.cid).data("componentData", this);
            a.attr("id", "field_" + (this.componentSetup.fieldId || this.componentSetup.tempId));
            "mobile" == window.systemInfo_form && a.find(".document-seleted").attr("id", this.componentSetup.fieldId);
            f = this.componentSetup.isUnique;
            if ("true" == f || 1 == f)
                "mobile" != window.systemInfo_form ? a.find("#searchdocument").removeAttr("data-multi") : a.find(".js_documentitem_container").attr("data-multi", "false");
            a.addClass(this.componentSetup.titleLayout);
            "true" != this.componentSetup.isDefault && 1 != this.componentSetup.isDefault || b || (b = this.componentSetup.content) && 0 < b.length && null != TEAMS.currentUser && this.setValue(a, {
                dataOptions: b
            });
            if (e || "true" == e)
                "mobile" != window.systemInfo_form ? this.readOnly(a, !0) : a.find(".js_documentitem_container").removeClass("document-seleted").text("");
            if ("true" == this.componentSetup.isReadOnly || 1 == this.componentSetup.isReadOnly)
                "mobile" != window.systemInfo_form ? this.readOnly(a, !0) : (a.find(".js_documentitem_container").removeClass("document-seleted"),
                (b = this.componentSetup.content) && 0 != b.length || a.find(".js_documentitem_container").text(""));
            this.getValue(a);
            this.el = c;
            c.append(a)
        },
        getCurrentModuleIsPay: function(c) {
            var b = !1;
            c && (b = formPlugin.moduleIsPay(c));
            return b
        },
        renderEditPreview: function(c, b) {
            var e = $(this.tpl).siblings("#form-document");
            m.prototype.renderEditPreview.call(this, c, e);
            b ? c.replaceWith(e) : c.append(e)
        },
        renderStatSearch: function(c) {
            var b = this
              , e = $(this.tpl)
              , a = null
              , d = c.ids
              , f = c.term
              , g = c.parentEl
              , h = c.subFormId
              , m = c.container
              , n = c.filterEl
              , v = c.fieldId
              , s = c.fieldTitle
              , A = c.condition
              , x = g.find(".j_formField-select select").find("option:selected").attr("module") || c.module;
            if ("mobile" != window.systemInfo_form) {
                a = e.siblings("#statsearch-entity");
                if (d)
                    for (a.find(".entity-container").empty(),
                    s = 0; s < d.length; s++)
                        c = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d"' + d[s].id + '" title\x3d"' + d[s].text + '"\x3e' + d[s].text + "\x3c/a\x3e\x3c/span\x3e",
                        a.find(".entity-container").append(c);
                f && a.find("select:first option[value\x3d" + f + "]").attr("selected", "true");
                d = (new Date).getTime();
                a.find(".j_entityContainer").attr("id", "j_document" + d);
                g.attr("class", "sch-group j_formFieldSearchGroup");
                g.find(".j_formField-condition").html(a);
                var C = $(m + " #j_document" + d + " #typeahead-document")
                  , f = TEAMS.service.docUrl + "/documents/suggestion.json";
                "biaoge" == x && (f = "/formdata/queryRelevanceDataOptions.json",
                C.attr("fieldId", v).attr("pageNo", "1").attr("pageSize", "10"),
                C.parents(".j_entityContainer").find(".typeahead-search").attr("url", f).attr("fieldId", v));
                window.typeahead && window.typeahead.init && window.typeahead.init({
                    el: m + " #j_document" + d + " #typeahead-document",
                    remote: f,
                    callback: function(a) {
                        if (a && !$.isEmptyObject(a)) {
                            var e = C.parents(".j_entityContainer").find(".j_selected");
                            b.renderTypeheader(e, a)
                        }
                    }
                })
            } else
                a = e.siblings("#statsearch-document-mobile"),
                A && (a.find(".j_condition").find('option[value\x3d"' + A + '"]').attr("selected", !0),
                "null" != A && "notnull" != A || a.find(".j_control").hide()),
                n && (a.find("#seleted-list").empty(),
                n.find(".j_filterList .selectd #comp-val span").each(function() {
                    var e = $(this).attr("optionId")
                      , c = $(this).text()
                      , b = $("\x3cspan\x3e\x3c/span\x3e");
                    b.attr("id", e).text(c);
                    a.find("#seleted-list").append(b)
                })),
                m = {},
                m.fieldId = v,
                m.pageNo = 1,
                m.module = x,
                m.pageSize = "20",
                b.searchDocument(m, a, v, s, g, h),
                g.off("change", "#statsearch-document-mobile .j_condition").on("change", "#statsearch-document-mobile .j_condition", function() {
                    var a = $(this).val();
                    "null" == a || "notnull" == a ? g.find("#statsearch-document-mobile .j_control").hide() : g.find("#statsearch-document-mobile .j_control").show()
                }),
                g.off("tap", "#statsearch-document-mobile .j_optionli").on("tap", "#statsearch-document-mobile .j_optionli", function() {
                    var a = $(this);
                    a.hasClass("selected") ? a.removeClass("selected") : a.addClass("selected");
                    var e = a.find(".j_optionname").text()
                      , a = a.attr("id")
                      , e = '\x3cspan id\x3d"' + a + '"\x3e' + e + "\x3c/span\x3e";
                    0 < g.find("#statsearch-document-mobile #seleted-list #" + a).length ? g.find("#statsearch-document-mobile #seleted-list #" + a).remove() : g.find("#statsearch-document-mobile #seleted-list").append(e)
                }),
                g.off("tap", "#statsearch-document-mobile .j_more").on("tap", "#statsearch-document-mobile .j_more", function() {
                    var e = $(this)
                      , c = e.attr("pageNo")
                      , d = e.attr("fieldId")
                      , e = e.attr("title")
                      , f = {};
                    f.fieldId = d;
                    f.pageNo = c;
                    f.pageSize = "20";
                    f.module = x;
                    b.searchDocument(f, a, d, e, g, h)
                })
        },
        searchDocument: function(c, b, e, a, d, f) {
            $.ajax({
                contentType: "application/json",
                type: TEAMS.ajaxMethod,
                url: "freeform/queryFormDataOptions.json",
                dataType: "json",
                data: JSON.stringify(c),
                success: function(c) {
                    var g = c.dataOptionPage;
                    if (0 == g.totalCount)
                        b.find(".j_noresult").removeClass("hide"),
                        b.find(".eui-cells").addClass("hide");
                    else
                        for (g.hasNext && b.find(".j_more").removeClass("hide").attr("pageNo", g.pageNo + 1).attr("fieldId", e).attr("title", a),
                        c = g.result,
                        1 == g.pageNo && b.find(".j_optionUl").empty(),
                        b.find("#seleted-list").attr("fieldId", e),
                        g = 0; g < c.length; g++) {
                            var h = c[g]
                              , m = h.content
                              , h = h.optionId
                              , n = b.find("#li-clone li").clone();
                            0 < b.find("#seleted-list").find("#" + h).length && n.addClass("selected");
                            n.find(".j_optionname").text(m);
                            n.attr("id", h);
                            b.find(".j_optionUl").append(n)
                        }
                    d.find("#component-div").html(b);
                    d.find(".j_comp-ok").attr("comKey", "Document").attr("fieldId", e).attr("title", a).attr("subFormId", f)
                }
            })
        },
        renderTypeheader: function(c, b) {
            var e = b.name
              , a = b.id;
            if (e && a) {
                var d = '\x3cspan id\x3d"' + a + '" class\x3d"entity-item j_entity_item" name\x3d"j_entity_item"\x3e\x3ca title\x3d"' + e + '" id\x3d"' + a + '" class\x3d"entitybox-toggle" data-module\x3d"document" data-value\x3d"' + a + '" data-id\x3d"' + a + '"\x3e' + e + "\x3c/a\x3e\x3c/span\x3e";
                c.find(".entity-item").each(function(e) {
                    a == $(this).find("a").attr("id") && (d = null)
                });
                c.append(d);
                c.find(".j_entity_item").data("object", b)
            }
        },
        checkEvents: function(c) {
            var b = this
              , e = b.el || $(document)
              , a = b.componentSetup.fieldId + this.cid
              , d = b.componentSetup.isUnique
              , h = b.componentSetup.orderContent
              , m = b.componentSetup.filterParams
              , q = b.componentSetup.isAddForRelation;
            (new this.documentAhead({})).initAhead({
                fieldId: a,
                el: e,
                isUnique: d,
                orderContent: h,
                filterParams: m,
                isAddForRelation: q
            });
            e.on("click", "#" + a + " .js_deleteDocument", function() {
                var d = e.find("#" + a);
                b.triggerFillRelate(d);
                d = b.check(d);
                c(d)
            });
            e.on("click", "#" + a + " #searchList\x3ep", function() {
                b.triggerFillRelate(e.find("#" + a))
            });
            var p = e.find("#" + a + " #searchdocument");
            if ("mobile" == window.systemInfo_form)
                e.on("click", "#" + a + " .document-seleted", function(e) {
                    var c = $(this).attr("data-module");
                    e = $(this).attr("data-multi");
                    $(this).attr("data-noempty") && $(this).attr("data-noempty");
                    var b = $(this).parents(".j_page-view")
                      , l = b.attr("id")
                      , q = $(this);
                    if (!$(this).parents(".j_formpreview").hasClass("form-noedit")) {
                        var p = $("#" + a + " .document-seleted .js_form-documentItem")
                          , n = [];
                        p && 0 < p.length && p.each(function(a) {
                            a = $(this).find(".entitybox-toggle").attr("documentId");
                            var e = $(this).find(".entitybox-toggle").text();
                            n.push({
                                name: e,
                                id: a,
                                module: c
                            })
                        });
                        "true" == d || 1 == d ? (p = new g,
                        p.render("mb", {
                            targetEl: q,
                            module: c,
                            multi: e,
                            preEl: "#" + l,
                            seletedList: n,
                            order: h,
                            filterParams: m
                        })) : 0 == n.length ? (p = new g,
                        p.render("mb", {
                            targetEl: q,
                            module: c,
                            multi: e,
                            preEl: "#" + l,
                            seletedList: n,
                            order: h,
                            filterParams: m
                        })) : (new f({
                            targetEl: q,
                            module: c,
                            multi: e,
                            preEl: "#" + l,
                            seletedList: n,
                            order: h,
                            filterParams: m
                        })).render();
                        b.addClass("hide")
                    }
                });
            else
                p && 0 < p.size() && p.click(function() {
                    var c = e.find("#" + a + " .js_documentitem_container .js_form-documentItem");
                    $("#" + a + " .control-input").trigger("focusout", "tt");
                    var b = [];
                    c && 0 < c.length && c.each(function(a) {
                        a = $(this).find(".entitybox-toggle").attr("documentId");
                        var e = $(this).find(".entitybox-toggle").text();
                        b.push({
                            name: e,
                            id: a
                        })
                    });
                    var c = $(this).attr("data-entity")
                      , f = $(this)
                      , l = f.parent().find("input");
                    (new g).render("pc", {
                        targetEl: f,
                        keyword: l ? l.val() : "",
                        module: c,
                        type: f.attr("data-type"),
                        isUnique: d,
                        seletedList: b,
                        order: h,
                        filterParams: m,
                        isAddForRelation: q
                    })
                });
            e.off("entitySelected", "#" + a + " #searchdocument").on("entitySelected", "#" + a + " #searchdocument", function(e) {
                var c = $("#" + a);
                1 != d && "true" != d || $("#" + a + " .js_documentitem_container").empty();
                for (var f = 1; f < arguments.length; f++) {
                    var g = arguments[f];
                    c.parents(".field_js").find(".form-error").text("");
                    c.parents(".field_js").find(".form-error").hide();
                    var h = g.id
                      , g = g.name
                      , g = '\x3cspan name\x3d"js_form-documentItem" class\x3d"js_form-documentItem j_component employee-item"\x3e\x3ca data-id\x3d"' + h + '" data-module\x3d"document" documentId\x3d' + h + ' class\x3d"entitybox-toggle" title\x3d"' + g + '"\x3e' + g + '\x3c/a\x3e\x3ca class\x3d"close js_deleteDocument" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e'
                      , m = $("#" + a + " .js_documentitem_container .js_form-documentItem");
                    m && m.each(function(a) {
                        h == $(this).find(".entitybox-toggle").attr("documentId") && $(this).remove()
                    });
                    c.find(".js_documentitem_container").append(g)
                }
                b.triggerFillRelate(c)
            });
            "mobile" == window.systemInfo_form && (e.on("objsComfirm", "#" + a + " .document-seleted", function(e, c) {
                var d = $("#" + a + " .js_documentitem_container")
                  , f = b.componentSetup.isUnique;
                d.text("");
                d.parents("#field_" + b.componentSetup.fieldId).find(".form-error").text("");
                "true" != f && 1 != f || d.empty();
                if (0 < c.objs.length) {
                    var f = c.objs, g;
                    for (g in f) {
                        var h = f[g];
                        if (h) {
                            var k = $("\x3cspan id\x3d" + h.id + ' name\x3d"js_form-documentItem" class\x3d"js_form-documentItem j_component employee-item"\x3e\x3ca documentId\x3d' + h.id + ' data-module\x3d"document" data-value\x3d' + h.id + " data-id\x3d" + h.id + ' class\x3d"entitybox-toggle"\x3e' + h.name + "\x3c/a\x3e\x3c/span\x3e");
                            d.append(k)
                        }
                    }
                } else
                    h = c.objs,
                    k = $("\x3cspan id\x3d" + h.id + ' name\x3d"js_form-documentItem" class\x3d"js_form-documentItem j_component employee-item"\x3e\x3ca documentId\x3d' + h.id + ' data-module\x3d"document" data-value\x3d' + h.id + " data-id\x3d" + h.id + ' class\x3d"entitybox-toggle"\x3e' + h.name + "\x3c/a\x3e\x3c/span\x3e"),
                    0 == h.length ? d.html('\x3cdiv class\x3d"widget-link-holder"\x3e\x3ci class\x3d"icon-plus2"\x3e\x3c/i\x3e\u9009\u62e9\u6587\u6863\x3c/div\x3e') : d.append(k);
                b.triggerFillRelate(d)
            }),
            e.on("deleteObj", "#" + a + " .document-seleted", function(e, c) {
                var d = $("#" + a + " .js_documentitem_container");
                d.find('span[id\x3d"' + c + '"]').remove();
                0 == d.find("span").length && d.html('\x3cdiv class\x3d"widget-link-holder"\x3e\x3ci class\x3d"icon-plus2"\x3e\x3c/i\x3e\u9009\u62e9\u6587\u6863\x3c/div\x3e');
                b.triggerFillRelate(d)
            }))
        },
        autoSaveEvents: function(c) {
            var b = this
              , e = b.el || $(document)
              , a = (b.componentSetup.fieldId || b.componentSetup.tempId) + this.cid;
            e.on("click", "#" + a + " .js_deleteDocument", function() {
                b.saveComponentValue(e.find("#" + a), c)
            });
            "mobile" == window.systemInfo_form ? (e.on("objsComfirm", "#" + a + " .document-seleted", function(a, e) {
                b.saveComponentValue($(this), c)
            }),
            e.on("deleteObj", "#" + a + " .document-seleted", function(a, e) {
                b.saveComponentValue($(this), c)
            })) : (e.on("click", "#" + a + " #searchList\x3ep", function() {
                b.saveComponentValue($(this), c)
            }),
            e.on("entitySelected", "#" + a + " #searchdocument", function(a) {
                b.saveComponentValue($(this), c)
            }))
        },
        documentAhead: Backbone.View.extend({
            defaults: function() {
                this.remote = this.suggestion = "";
                this.entity = "document";
                this.tpl = h.get("document")
            },
            initAhead: function(c) {
                this.defaults();
                this.fieldId = c.fieldId;
                this.isUnique = c.isUnique;
                this.isDefault = c.isDefault;
                this.orderContent = c.orderContent;
                this.filterParams = c.filterParams;
                this.isAddForRelation = c.isAddForRelation;
                this.el = c.el;
                this.$continer = this.el.find("#" + this.fieldId);
                this._htmlEvents(c.callback)
            },
            _htmlEvents: function(c) {
                var b = this
                  , e = b.$continer
                  , a = b.fieldId
                  , d = this.el
                  , f = this.isUnique
                  , g = this.isDefault
                  , h = d.find("#" + b.fieldId + " #typeahead-form-document");
                d.on("mouseenter.typeahead", "#" + a + " .typeahead-wrapper", function(a) {
                    $(this).data("enter", !0)
                }).on("mouseleave.typeahead", "#" + a + " .typeahead-wrapper", function(a) {
                    $(this).data("enter", !1)
                });
                d.on("click", "#" + a + " .control-btn", function(a) {
                    a.stopPropagation();
                    $(this).addClass("hide");
                    $(this).prev(".typeahead-wrapper").removeClass("hide");
                    $(this).prev(".typeahead-wrapper").find(".control-input").focus()
                });
                d.on("focusout", "#" + a + " .control-input", function(a, e) {
                    var c = $(this).parents(".typeahead-wrapper");
                    c.data("enter") && "tt" != e || (c.addClass("hide"),
                    c.next(".control-btn").removeClass("hide"))
                });
                d.on("click", "#" + a + " #searchList\x3ep", function() {
                    var e = $("#" + a);
                    g || (e.parents(".field_js").find(".form-error").text(""),
                    e.parents(".field_js").find(".form-error").hide());
                    if ($(this).hasClass("creat-new"))
                        h = $(this).attr("title"),
                        null != h && "" != h && (d = {
                            name: h
                        },
                        h = {},
                        h.document = d,
                        $.ajax({
                            contentType: "application/json",
                            type: TEAMS.ajaxMethod,
                            async: !1,
                            url: TEAMS.service.docUrl + "/km/document/htmlCreate.json",
                            dataType: "json",
                            data: JSON.stringify(h),
                            success: function(d) {
                                d && d.message || b.appendSelect(d.document.id, d.document.name, a, e, f, c)
                            }
                        }));
                    else {
                        var d = $(this).data("obj")
                          , h = d.name;
                        b.appendSelect(d.id, h, a, e, f, c)
                    }
                });
                d.on("click", "#" + a + " .js_deleteDocument", function() {
                    $(this).parent().remove();
                    "function" == typeof c && c()
                });
                h.off("focus.tt").on("focus.tt", function(a) {
                    b._search($(this))
                });
                h.off("click.tt").on("click.tt", function(a) {
                    a.stopPropagation()
                });
                h.off("keyup.tt").on("keyup.tt", function(a) {
                    a = a.which;
                    0 < $("body").find("#form-abposselect").length && (e = $("body").find("#form-abposselect").find(".field_js"));
                    13 == a ? (e.find("#document-typeahead-div p.active").click(),
                    window.abposview && window.abposview.remove()) : 27 == a ? (h.trigger("focusout", "tt"),
                    window.abposview && window.abposview.remove()) : 38 == a ? (a = $("#document-typeahead-div p.active"),
                    1 > a.length ? e.find("#document-typeahead-div p").last().addClass("active") : (a.removeClass("active"),
                    (0 < a.prev().length ? a.prev() : e.find("#document-typeahead-div p").last()).addClass("active"))) : 40 == a ? (a = e.find("#document-typeahead-div p.active"),
                    1 > a.length ? e.find("#document-typeahead-div p").first().addClass("active") : (a.removeClass("active"),
                    (0 < a.next().length ? a.next() : e.find("#document-typeahead-div p").first()).addClass("active"))) : b._search($(this))
                });
                e.find("#document-typeahead-div").off("mouseenter.tt", "p").on("mouseenter.tt", "p", function() {
                    0 < $("body").find("#form-abposselect").length && (e = $("body").find("#form-abposselect").find(".field_js"));
                    $(this).addClass("active");
                    e.find("#document-typeahead-div p.active").removeClass("active")
                });
                e.off("click.tt", "#document-typeahead-div p").on("click.tt", "#document-typeahead-div p", function(a) {
                    h.trigger("focusout", "tt")
                })
            },
            appendSelect: function(c, b, e, a, d, f) {
                b = '\x3cspan name\x3d"js_form-documentItem" class\x3d"js_form-documentItem j_component employee-item"\x3e\x3ca data-id\x3d"' + c + '" data-module\x3d"document" documentId\x3d' + c + ' class\x3d"entitybox-toggle" title\x3d"' + b + '"\x3e' + b + '\x3c/a\x3e\x3ca class\x3d"close js_deleteDocument" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e';
                e = $("#" + e + " .js_documentitem_container .js_form-documentItem");
                "true" == d || 1 == d ? (a.find(".js_documentitem_container").empty(),
                a.find(".js_documentitem_container").append(b)) : (e && e.each(function(a) {
                    c == $(this).find(".entitybox-toggle").attr("documentId") && $(this).remove()
                }),
                a.find(".js_documentitem_container").append(b),
                "function" == typeof f && f())
            },
            _search: function(c) {
                var b = this
                  , e = b.$continer
                  , a = $.trim(c.val());
                a == c.attr("placeholder") && (a = "");
                e.find("#document-typeahead-div #searchList").html("");
                0 < $("body").find("#form-abposselect").length ? ($("body").find("#form-abposselect").find(".field_js").find("#document-typeahead-div .loading_small").addClass(d).show(),
                e.find("#document-typeahead-div .loading_small").hide()) : e.find("#document-typeahead-div .loading_small").addClass(d).show();
                window.abposview && window.abposview.remove();
                var d = b.entity;
                c = TEAMS.service.docUrl + "/documents/suggestion.json";
                b.filterParams && (c = TEAMS.service.docUrl + "/documents/pcSearch.json");
                e = b.getParam(1, a);
                $.ajax({
                    contentType: "application/json",
                    type: TEAMS.ajaxMethod,
                    url: c,
                    dataType: "json",
                    data: JSON.stringify(e),
                    success: function(e) {
                        var c = e.relevances;
                        b.filterParams && (c = e.page.result);
                        b._loadList(c, a)
                    }
                })
            },
            getParam: function(c, b) {
                var e = {};
                if (this.filterParams) {
                    e.pageNo = c;
                    e.pageSize = 10;
                    var a = this.filterParams
                      , d = "";
                    a && "object" == typeof a ? (d = JSON.stringify(a).replace(/com_key/g, "componentKey"),
                    d = JSON.parse(d)) : a && "string" == typeof a && (d = a.replace(/com_key/g, "componentKey"),
                    d = JSON.parse(d));
                    var a = []
                      , f = [];
                    if (b) {
                        var g = {
                            id: "name",
                            type: "string"
                        };
                        g.value = b;
                        a.push(g)
                    }
                    g = {};
                    g.keywords = b;
                    g.type = "all";
                    if (d) {
                        if (d.createdates && 0 < d.createdates.length)
                            for (var h = 0; h < d.createdates.length; h++) {
                                var m = d.createdates[h];
                                a.push(this.queryDefultCheange(m, "create_time"))
                            }
                        if (d.lastUpdateTimes && 0 < d.lastUpdateTimes.length)
                            for (h = 0; h < d.lastUpdateTimes.length; h++)
                                m = d.lastUpdateTimes[h],
                                a.push(this.queryDefultCheange(m, "last_update_time"));
                        if (d.names && 0 < d.names.length)
                            for (h = 0; h < d.names.length; h++) {
                                var n = d.names[h];
                                b || (g.keywords = n.content)
                            }
                        if (d.managers && 0 < d.managers.length)
                            for (h = 0; h < d.managers.length; h++) {
                                var n = d.managers[h]
                                  , v = {
                                    id: "author",
                                    type: "array"
                                };
                                v.operate = n.term;
                                v.value = this.getStringForUser(n.ids);
                                a.push(v)
                            }
                        if (d.creators && 0 < d.creators.length)
                            for (h = 0; h < d.creators.length; h++)
                                n = d.creators[h],
                                v = {
                                    id: "creator",
                                    type: "array"
                                },
                                v.operate = n.term,
                                v.value = this.getStringForUser(n.ids),
                                a.push(v);
                        if (d.filterFormDatas && 0 < d.filterFormDatas.length)
                            for (h = 0; h < d.filterFormDatas.length; h++) {
                                var n = d.filterFormDatas[h]
                                  , v = {}
                                  , s = {};
                                "Text" == n.componentKey && (v.id = "custom_" + n.fieldId,
                                v.operate = n.term,
                                v.type = "string",
                                v.value = n.content,
                                a.push(v),
                                s.id = n.fieldId,
                                s.operate = n.term,
                                s.type = "Text",
                                s.value = n.content,
                                f.push(s));
                                "TextArea" == n.componentKey && (v.id = "custom_" + n.fieldId,
                                v.operate = n.term,
                                v.type = "string",
                                v.value = n.content,
                                a.push(v),
                                s.id = n.fieldId,
                                s.operate = n.term,
                                s.type = "TextArea",
                                s.value = n.content,
                                f.push(s));
                                "RadioBox" == n.componentKey && (v.id = n.fieldId,
                                v.operate = n.term,
                                v.type = "RadioBox",
                                v.value = this.getStringForUser(n.ids),
                                f.push(v));
                                "CheckBox" == n.componentKey && (v.id = n.fieldId,
                                v.operate = n.term,
                                v.type = "CheckBox",
                                v.value = this.getStringForUser(n.ids),
                                f.push(v));
                                "Select" == n.componentKey && (v.id = n.fieldId,
                                v.operate = n.term,
                                v.type = "Select",
                                v.value = this.getStringForUser(n.ids),
                                f.push(v));
                                "DateComponent" == n.componentKey && (a.push(this.queryDefultCheange(m, "custom_" + n.fieldId)),
                                f.push(this.queryDefultCheange(m, n.fieldId)));
                                "NumberComponent" == n.componentKey && (v.id = "custom_" + n.fieldId,
                                v.operate = n.term,
                                v.operate && (v.operate = "range"),
                                v.type = "number",
                                v.endNumber = n.endContent,
                                v.startNumber = n.content,
                                a.push(v),
                                s.operate = n.term,
                                s.operate && (s.operate = "range"),
                                s.type = "NumberComponent",
                                s.endNumber = n.endContent,
                                s.startNumber = n.content,
                                s.id = n.fieldId,
                                f.push(s));
                                "Money" == n.componentKey && (v.id = "custom_" + n.fieldId,
                                v.operate = n.term,
                                v.operate && (v.operate = "range"),
                                v.type = "number",
                                v.endNumber = n.endContent,
                                v.startNumber = n.content,
                                a.push(v),
                                s.operate = n.term,
                                s.operate && (s.operate = "range"),
                                s.type = "Money",
                                s.endNumber = n.endContent,
                                s.startNumber = n.content,
                                s.id = n.fieldId,
                                f.push(s));
                                "Mobile" == n.componentKey && (v.id = "custom_" + n.fieldId,
                                v.operate = n.term,
                                v.type = "string",
                                v.value = n.content,
                                a.push(v),
                                s.operate = n.term,
                                s.type = "Mobile",
                                s.value = n.content,
                                s.id = n.fieldId,
                                f.push(s));
                                "Phone" == n.componentKey && (v.id = "custom_" + n.fieldId,
                                v.operate = n.term,
                                v.type = "string",
                                v.value = n.content,
                                a.push(v),
                                s.operate = n.term,
                                s.type = "Phone",
                                s.value = n.content,
                                s.id = n.fieldId,
                                f.push(s));
                                "Email" == n.componentKey && (v.id = "custom_" + n.fieldId,
                                v.operate = n.term,
                                v.type = "string",
                                v.value = n.content,
                                a.push(v),
                                s.operate = n.term,
                                s.type = "Email",
                                s.value = n.content,
                                s.id = n.fieldId,
                                f.push(s))
                            }
                    }
                    e.conditions = a;
                    e.customConditions = f;
                    e.filter = g;
                    e.searchType = "all";
                    e.userId = TEAMS.currentUser.id
                } else
                    e.keywords = b,
                    e.searchType = this.entity;
                this.orderContent && (e.order = this.orderContent);
                return e
            },
            queryDefultCheange: function(c, b) {
                var e = {};
                e.id = b;
                e.type = "date";
                e.value = c.selectedOption ? "three_day-no" == c.selectedOption ? this.getDateTime(0) + "~" + this.getDateTime(3) : "one-weak-no" == c.selectedOption ? this.getDateTime(0) + "~" + this.getDateTime(7) : this.getDateTime(0) + "~" + this.getDateTime(30) : c.content && c.endContent ? c.content + "~" + c.endContent : c.content ? c.content + "~all" : "all~" + c.endContent;
                return e
            },
            getStringForUser: function(c) {
                for (var b = "", e = 0; e < c.length; e++)
                    b += c[e] + ",";
                return b = b.substring(0, b.length - 1)
            },
            getDateTime: function(c) {
                var b = new Date;
                b.setDate(b.getDate() + c);
                c = b.getFullYear();
                var e = 10 > b.getMonth() + 1 ? "0" + (b.getMonth() + 1) : b.getMonth() + 1
                  , b = 10 > b.getDate() ? "0" + b.getDate() : b.getDate();
                return c + "-" + e + "-" + b
            },
            _loadList: function(c, d) {
                var e = this.$continer;
                0 < $("body").find("#form-abposselect").length ? $("body").find("#form-abposselect").find(".field_js").find("#document-typeahead-div .loading_small").hide() : e.find("#document-typeahead-div .loading_small").hide();
                if (null != c && 0 < c.length)
                    for (var a = 0, f = c.length; a < f; a++) {
                        var g = c[a];
                        g.name = g.name.replace(/</g, "\x26lt").replace(/>/g, "\x26gt").replace("/[\r\n]/g", " ");
                        var h = $(this.tpl).siblings("#document-clone").find(".j_document").clone();
                        h.text(g.name);
                        h.attr("title", g.name);
                        h.data("obj", g);
                        e.find("#document-typeahead-div #searchList").append(h)
                    }
                else {
                    if (null == d || "" == d)
                        return;
                    0 != this.isAddForRelation && "false" != this.isAddForRelation && (h = $('\x3cp class\x3d"document creat-new"\x3e\x3ci class\x3d"icon-plus-thin"\x3e\x3c/i\x3e \u6dfb\u52a0\u6587\u6863\uff1a' + d + "\x3c/p\x3e"),
                    h.attr("title", d),
                    e.find("#document-typeahead-div #searchList").find(".creat-new").remove(),
                    e.find("#document-typeahead-div #searchList").append(h))
                }
                e.find("#document-typeahead-div #searchList").show();
                window.abposview && window.abposview.remove();
                window.abposview = new b({
                    continer: e,
                    entity: this.entity
                });
                window.abposview.render()
            }
        }),
        check: function(c) {
            var b = $(c).find('span[name\x3d"js_form-documentItem"]').length
              , e = {};
            e.element = c;
            0 != b || "true" != this.componentSetup.required && 1 != this.componentSetup.required || (e.message = this.componentSetup.title + "\u4e0d\u80fd\u4e3a\u7a7a");
            return e
        },
        getValue: function(c, b) {
            var e = {
                formField: {
                    id: this.componentSetup.fieldId
                }
            }
              , a = c.find(".js_documentitem_container .js_form-documentItem");
            if (0 < a.length) {
                var d = [];
                a.each(function(a) {
                    var e = $(this).find(".entitybox-toggle").attr("documentId")
                      , c = $(this).find(".entitybox-toggle").text();
                    d[a] = {
                        optionId: e,
                        content: c,
                        type: "document"
                    }
                });
                e.dataOptions = d
            } else
                b || (e = null);
            return e
        },
        setValue: function(c, b) {
            $(this.tpl).siblings("#document-clone");
            c.find(".js_documentitem_container").empty();
            if (null != b && null != b.dataOptions)
                for (var e = 0; e < b.dataOptions.length; e++) {
                    var a = b.dataOptions[e]
                      , d = null == a.content ? "" : a.content
                      , a = a.optionId
                      , f = null;
                    "mobile" == window.systemInfo_form ? (f = TEAMS.currentUser && TEAMS.currentUser.id ? '\x3cspan href\x3d"/mobile/documents/' + TEAMS.currentUser.id : '\x3cspan href\x3d"/mobile/documents',
                    f = f + "/" + a + '" name\x3d"js_form-documentItem" id\x3d"' + a + '" class\x3d"router js_form-documentItem j_component employee-item"\x3e\x3ca data-module\x3d"document" data-id\x3d"' + a + '" data-value\x3d"' + a + '" documentId\x3d' + a + ' class\x3d"entitybox-toggle"\x3e' + d + "\x3c/a\x3e\x3c/span\x3e") : f = null != c.find(".js_form-document-add").get(0) ? '\x3cspan name\x3d"js_form-documentItem" id\x3d"' + a + '" class\x3d"js_form-documentItem j_component employee-item"\x3e\x3ca data-module\x3d"document" data-id\x3d"' + a + '" data-value\x3d"' + a + '" documentId\x3d' + a + ' class\x3d"entitybox-toggle" title\x3d"' + d + '"\x3e' + d + '\x3c/a\x3e\x3ca class\x3d"close js_deleteDocument" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e' : '\x3cspan name\x3d"js_form-documentItem" id\x3d"' + a + '" class\x3d"js_form-documentItem j_component employee-item"\x3e\x3ca data-module\x3d"document" data-id\x3d"' + a + '" data-value\x3d"' + a + '" documentId\x3d' + a + ' class\x3d"entitybox-toggle" title\x3d"' + d + '"\x3e' + d + "\x3c/a\x3e\x3c/span\x3e";
                    c.find(".js_documentitem_container").append(f)
                }
        },
        empty: function(c) {
            c.find(".js_documentitem_container").html("")
        },
        readOnly: function(c, b) {
            var e = this.componentSetup.fieldId + this.cid
              , a = c.find('div[id\x3d"' + e + '"] span[name\x3d"js_form-document-add"]')
              , d = c.find('div[id\x3d"' + e + '"] span[name\x3d"js_form-documentItem"]')
              , f = c.find('div[id\x3d"' + e + '"] .js_deleteDocument');
            b ? (a.remove(),
            f.remove()) : a && 0 != a.length && null != a || (a = $(this.tpl).siblings("#preview-document").find('span[name\x3d"js_form-document-add"]'),
            c.find('div[id\x3d"' + e + '"]').find(".js_documentitem_container").after(a),
            d.append('\x3ca class\x3d"close js_deleteDocument" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e'))
        }
    });
    u.exports = window.Document
});
define("form/component/userselecter", ["form/tplutil"], function(n, y, u) {
    var m = n("form/tplutil");
    n = Backbone.View.extend({
        initialize: function() {},
        render: function(h, g) {
            "pc" == h ? this.initPC.init(g) : this.initMb.init(g)
        },
        initPC: {
            lightClass: "selected",
            fold: "icon-caret-right",
            unfold: "icon-caret-down",
            init: function(h) {
                this.isMulti = h.isMulti || !1;
                this.target = h.target;
                this.height = h.height;
                this.rangeIds = h.rangeIds;
                this.userOrg = !1;
                this.tpl = m.get("userselecter");
                $("body").append($(this.tpl).siblings("#selector-employee"));
                this.el = "#selector-employee";
                this.$el = $(this.el);
                this.render(h.users);
                this.delegateEvents();
                this.height && $(this.el).find(".j_userlistScr").attr("height", this.height)
            },
            delegateEvents: function() {
                var h = this
                  , g = h.$el;
                $("body").off("keydown.user").on("keydown.user", function(f) {
                    27 == f.which && g.modal("hide")
                });
                g.on("click", ".j_user_cancel", function() {
                    g.find(".j_close").click()
                });
                $("#selector-employee").on("hidden.bs.modal", function() {
                    $("#selector-employee").remove()
                });
                g.on("click", "#organization-users", function(f) {
                    $(this).addClass("active");
                    $(this).siblings().removeClass("active");
                    g.find("#organization-users").parent().addClass("active");
                    g.find("#group-users").parent().removeClass("active");
                    g.find("#org-tree-list").removeClass("hide");
                    g.find("#org-group-list").addClass("hide");
                    g.find("#org-other-list").addClass("hide");
                    g.find(".j_pinyin_list .active").removeClass("active");
                    h.userOrg = !1;
                    h.userOther = !1;
                    g.find(".root").trigger("click")
                });
                g.on("click", "#group-users", function(f) {
                    $(this).addClass("active");
                    $(this).siblings().removeClass("active");
                    g.find("#organization-users").parent().removeClass("active");
                    g.find("#group-users").parent().addClass("active");
                    g.find("#org-tree-list").addClass("hide");
                    g.find("#org-other-list").addClass("hide");
                    g.find("#org-group-list").removeClass("hide");
                    g.find(".j_pinyin_list .active").removeClass("active");
                    h.userOrg = !0;
                    h.userOther = !1;
                    h.groupPage = 1;
                    h.initGroup(h.groupPage)
                });
                $(h.el).on("click", "#other-users", function(f) {
                    $(this).addClass("active");
                    $(this).siblings().removeClass("active");
                    $(".onlyadmin").hide();
                    $(h.el).find("#organization-users").parent().removeClass("active");
                    $(h.el).find("#group-users").parent().addClass("active");
                    $(h.el).find("#org-tree-list").addClass("hide");
                    $(h.el).find("#org-group-list").addClass("hide");
                    $(h.el).find("#org-other-list").removeClass("hide");
                    h.userOrg = !1;
                    h.userOther = !0
                });
                g.on("click", "#org-other-list .j_other-type li", function() {
                    $("#org-group-list #group-message li").removeClass("selected");
                    $("#org-other-list .j_other-user").removeClass("selected");
                    $(this).addClass("selected");
                    h.othertype = $(this).find("a").attr("id");
                    $("#org-user-info").addClass("hide");
                    $("#group-user-info").addClass("hide");
                    h.initPinyin(1)
                });
                g.on("click", ".list-tit .col-4.item.dept", function() {
                    $(this).attr("flag") ? $(this).removeAttr("flag") : $(this).attr("flag", 0);
                    0 == $(this).attr("flag") ? (h.sort = "asc",
                    $(this).addClass("sorting_asc").removeClass("sorting_desc")) : (h.sort = "desc",
                    $(this).addClass("sorting_desc").removeClass("sorting_asc"));
                    h.initPinyin(1)
                });
                g.on("click", "#org-tree-list .treenode", function(f) {
                    if (!$(f.target).hasClass("nodeicon")) {
                        g.find(".j_pinyin_list .active").removeClass("active");
                        $("#org-tree-list").find(".selected").removeClass("selected");
                        $(this).addClass("selected");
                        f = $(this).attr("id");
                        var d = $(this).find(".nodeicon");
                        d.hasClass("icon-caret-right") && (d.toggleClass("icon-caret-right"),
                        d.toggleClass("icon-caret-down"),
                        d.hasClass("unload") && (h.initTree(f),
                        d.removeClass("unload")),
                        $(this).next().slideToggle("fast"))
                    }
                });
                g.on("click", ".nodeicon", function(f) {
                    $(this).toggleClass("icon-caret-right");
                    $(this).toggleClass("icon-caret-down");
                    f = $(this).parent(".treenode").attr("id");
                    $(this).hasClass("unload") && (h.initTree(f),
                    $(this).removeClass("unload"));
                    $(this).parent(".treenode").next().slideToggle("fast")
                });
                g.on("click", "#org-group-list li", function(f) {
                    g.find(".j_pinyin_list .active").removeClass("active");
                    h.$el.find(".selected").removeClass("selected");
                    $(this).addClass("selected");
                    h.initPinyin(1)
                });
                g.on("click", "#org-tree-list a", function() {
                    $("#org-tree-list").find(".selected").removeClass("selected");
                    $(this).parent().addClass("selected");
                    $(this).parent().attr("id");
                    h.initPinyin(1)
                });
                g.on("click", "#chk2", function(f) {
                    h.initUsers()
                });
                g.on("click", "." + h.unfold, function(f) {
                    f.stopPropagation();
                    $(this).removeClass(h.unfold).addClass(h.fold)
                });
                g.on("click", "." + h.fold, function(f) {
                    f.stopPropagation();
                    $(this).removeClass(h.fold).addClass(h.unfold)
                });
                g.on("addUser", "#all-group-users", function(f, d) {
                    var b = $("\x3ca\x3e " + d.username + " \x3c/a\x3e");
                    b.attr("id", d.id);
                    b.data("user", d);
                    0 == $("#userSelector-multi .selected-users #" + d.id).size() && $("#userSelector-multi .selected-users").prepend(b)
                });
                g.on("deleteUser", "#all-group-users", function(f, d) {
                    $("#userSelector-multi .selected-users #" + d.id).remove()
                });
                g.on("click", "#employee-container li", function(f) {
                    if (h.isMulti)
                        $(this).find(".j_user-id_check").trigger("click");
                    else if (f = $(this).data("user"))
                        $(h.el).modal("hide"),
                        f.sourceId = $(this).attr("id"),
                        h.target.trigger("confirmHandler", {
                            objs: [f]
                        })
                });
                g.on("click", "#employee-container .j_user-id_check", function(f) {
                    var d = $(this).parents(".clearfix").data("user");
                    len = $(this).filter(":checked").length;
                    0 < len ? ($(this).parents(".clearfix").addClass("selected"),
                    $(this).trigger("addUser", [d, h.id])) : ($(this).parents(".clearfix").removeClass("selected"),
                    $(this).trigger("deleteUser", [d, h.id]));
                    var d = $(h.el + " #employee-container .clearfix div.username input:checked").length
                      , b = $(h.el + " #employee-container .clearfix div.username input").length;
                    0 == d && $(h.el + " #checkAll").prop("checked", !1);
                    d == b ? $(h.el + " #checkAll").prop("checked", !0) : $(h.el + " #checkAll").prop("checked", !1);
                    f.stopPropagation()
                });
                g.off("click", "#checkAll").on("click", "#checkAll", function() {
                    $(this).is(":checked") ? (g.find("#userlistCon li").find('input[type\x3d"checkbox"]').prop("checked", !0),
                    g.find("#userlistCon li").addClass("selected"),
                    h.selectAll()) : (g.find("#userlistCon li").find('input[type\x3d"checkbox"]').prop("checked", !1),
                    g.find("#userlistCon li").removeClass("selected"),
                    h.removeSelected())
                });
                g.on("click", "#userSelector-multi .selected-users a", function(f, d) {
                    var b = $(this).attr("id");
                    g.find("#userlistCon #" + b + " .j_user-id_check").trigger("click")
                });
                g.on("click.user-win", ".j_user_ok", function() {
                    var f = [];
                    $("#userSelector-multi .selected-users\x3ea").each(function() {
                        var d = $(this).data("user");
                        f.push(d)
                    });
                    h.target.trigger("confirmHandler", {
                        objs: f
                    });
                    $(h.el).modal("hide")
                });
                g.off("search", "#groupSearch-keywords").on("search", "#groupSearch-keywords", function(f) {
                    h.initGroup(1)
                });
                g.off("keyup", "#groupSearch-keywords").on("keyup", "#groupSearch-keywords", function(f) {
                    13 == f.which && $(this).trigger("search")
                });
                g.on("click", ".j_simpleSearchGroup", function() {
                    g.find("#groupSearch-keywords").trigger("search")
                });
                g.on("click", ".j_simpleSearch", function() {
                    $(h.el).find("#usersearch-keywords").trigger("search")
                });
                g.off("search", "#usersearch-keywords").on("search", "#usersearch-keywords", function(f) {
                    h.initUsers()
                });
                g.off("keyup", "#usersearch-keywords").on("keyup", "#usersearch-keywords", function(f) {
                    13 == f.which && $(this).trigger("search")
                })
            },
            selectAll: function() {
                var h = $(this.el)
                  , g = h.find(".selected-container .selected-users");
                h.find("#userlistCon .selected").not(".existed").each(function(f, d) {
                    var b = $(this).attr("id");
                    if (0 >= g.find("#" + b).length) {
                        var c = $(this).find(".name").text()
                          , h = {
                            id: b,
                            username: c,
                            name: c
                        }
                          , c = $("\x3ca\x3e " + c + " \x3c/a\x3e");
                        c.attr("id", b);
                        c.attr("title", "\u70b9\u51fb\u5220\u9664");
                        c.data("user", h);
                        g.prepend(c)
                    }
                })
            },
            removeSelected: function() {
                $(this.el).find(".selected-container .selected-users").empty()
            },
            render: function(h) {
                var g = this
                  , f = g.$el;
                $("body").find("#selector-employee").modal();
                g.isMulti ? (f.find("#userSelector-multi .j_user-id_check").removeClass("hide"),
                f.find("#userSelector-multi #checkAll").removeClass("hide"),
                f.find("#userSelector-multi .user-wrapper").removeClass("hide"),
                f.find(".selector-btns .j_user_ok").removeClass("hide")) : (f.find("#userSelector-multi .j_user-id_check").addClass("hide"),
                f.find("#userSelector-multi #checkAll").addClass("hide"),
                f.find("#userSelector-multi .user-wrapper").addClass("hide"),
                f.find(".selector-btns .j_user_ok").addClass("hide"));
                if (h && 0 < h.length)
                    for (f = 0; f < h.length; f++) {
                        var d = h[f]
                          , b = $("\x3ca\x3e " + d.username + " \x3c/a\x3e");
                        b.attr("id", d.id);
                        b.data("user", d);
                        0 == $("#userSelector-multi .selected-users #" + d.id).size() && $("#userSelector-multi .selected-users").prepend(b)
                    }
                g.initTree();
                formPlugin.destroyLayout(g.el + " #org-tree");
                formPlugin.layout(g.el + " #org-tree", {
                    onTotalScroll: function() {
                        $(g.el).find("#group-users").hasClass("active") && (g.groupPage++,
                        g.initGroup(g.groupPage))
                    }
                }, [{
                    gotoTopButton: !0,
                    scrollInertia: 100
                }]);
                formPlugin.layout("#employee-container .j_userlistScr", {
                    onTotalScrollOffset: 300,
                    onTotalScroll: function() {
                        $(g.el).find("#list-loading").removeClass("hide");
                        var c = parseInt(g.pageNo) + 1;
                        g.initUsers(c)
                    }
                }, [{
                    gotoTopButton: !0,
                    scrollInertia: 100
                }]);
                formPlugin.layout(".j_selectedUsersScr", {
                    onTotalScrollOffset: 300
                }, [{
                    gotoTopButton: !0,
                    scrollInertia: 100
                }])
            },
            initTree: function(h) {
                var g = this;
                g.id = h;
                $.ajax({
                    url: "/base/tree/department.json",
                    type: TEAMS.ajaxMethod,
                    dataType: "json",
                    data: {
                        id: h,
                        hasUrl: g.hasUrl
                    },
                    success: function(f) {
                        g.renderTree(f.nodes)
                    }
                })
            },
            renderTree: function(h) {
                var g = this.getRoot(h);
                h = this.createRootTree(g, h);
                this.id ? (g = $("#org-tree-list").find("#" + this.id).find(".j_numps").text(),
                0 < $("#org-tree-list").find("#" + this.id).length ? ($("#org-tree-list").find("#" + this.id).parent("li").html(h),
                $("#org-tree-list").find("#" + this.id).find(".j_numps").text(g)) : $("#org-tree-list").html(h)) : $("#org-tree-list").html(h);
                this.highLight(this.id);
                this.initPinyin(1)
            },
            initPinyin: function(h) {
                var g = this;
                h || (h = 1);
                g.userOrg ? g.findGroupPinyinIndexs(g.getParam(h), function(f) {
                    g.loadPinyin(f)
                }) : g.userOther ? g.findOtherUserPinyinIndexs(g.getParam(h), function(f) {
                    g.loadPinyin(f)
                }) : g.findPinyinIndexs(g.getParam(h), function(f) {
                    g.loadPinyin(f)
                });
                g.initUsers(h)
            },
            initGroup: function(h) {
                var g = this
                  , f = $.trim($(g.el).find("#groupSearch-keywords").val());
                $.ajax({
                    url: "/group/group.json",
                    type: TEAMS.ajaxMethod,
                    dataType: "json",
                    data: {
                        employeeId: TEAMS.currentUser.id,
                        pageNo: h,
                        keyword: f
                    },
                    success: function(d) {
                        g.renderGroup(d)
                    }
                })
            },
            initUsers: function(h) {
                var g = this;
                h || (h = 1);
                1 == h && $(g.el + " #userlistCon").empty();
                g.userOrg ? g.queryGroupEmp(g.getParam(h), function(f) {
                    g.renderUserList(f)
                }) : g.userOther ? g.queryOtherUserEmp(g.getParam(h), function(f) {
                    g.renderUserList(f)
                }) : g.queryEmp(g.getParam(h), function(f) {
                    g.renderUserList(f)
                })
            },
            getRoot: function(h) {
                for (var g = 0, f = h.length; g < f; g++) {
                    var d = h[g];
                    if (this.id) {
                        if (d.id == this.id)
                            return d
                    } else if (!d.nodeObj.parent)
                        return d
                }
            },
            createRootTree: function(h, g) {
                var f = "\x3cul\x3e"
                  , d = this.createChild(h, g);
                return f = f + d + "\x3c/ul\x3e"
            },
            createChild: function(h, g) {
                if (h) {
                    var f = "root" == h.parentId ? "root" : ""
                      , d = "padding-left:" + 20 * h.rank + "px"
                      , b = this.createTree(h, g)
                      , c = b ? this.unfold : "";
                    "root" != h.parentId && h.hasSubs && (c = this.fold + " unload");
                    this.id && this.id == h.id && (c = this.unfold);
                    f = "\x3cli\x3e" + ('\x3cdiv class\x3d"treenode router ' + f + '" style\x3d"' + d + '" id\x3d"' + h.id + '"\x3e');
                    nameTmp = '\x3ca class\x3d"router" title\x3d"' + h.name + '"\x3e\x3cspan class\x3d"tree-name"\x3e' + h.name + "\x3c/span\x3e\x3c/a\x3e";
                    f += "\x3ci class\x3d'nodeicon " + c + "'\x3e\x3c/i\x3e";
                    f += nameTmp;
                    f = f + "\x3c/div\x3e" + b;
                    return f += "\x3c/li\x3e"
                }
            },
            createTree: function(h, g) {
                for (var f = "\x3cul class\x3d'ftl-child-ul'\x3e", d = 0, b = 0, c = g.length; b < c; b++) {
                    var l = g[b];
                    if (!l)
                        break;
                    var e = l.nodeObj.parent;
                    e && e.id == h.id && l.id != h.id && (l = this.createChild(l, g),
                    f += l,
                    d++)
                }
                return 0 == d ? "" : f + "\x3c/ul\x3e"
            },
            renderGroup: function(h) {
                if ((h = h.groups || h) && 0 < h.length) {
                    $("#group-message #no-result").addClass("hide");
                    1 == this.groupPage && $("#group-message ul").empty();
                    for (var g = 0, f = h.length; g < f; g++) {
                        var d = ""
                          , b = h[g].createTime ? Date.create(h[g].createTime).format("{yyyy}-{MM}-{dd}") : ""
                          , c = null == h[g].member ? 0 : h[g].member.length;
                        h[g].creator && 0 == h[g].isPrivate && (d += "\x3cli\x3e\x3cdiv class\x3d'j_avatar avatar'\x3e\x3cimg src\x3d'/static/images/group.png'\x3e\x3c/div\x3e\x3ca id\x3d'" + h[g].id + "' class\x3d'router' title\x3d'" + h[g].name + "\u3010" + c + "\u4eba\u3011' href\x3d'#'\x3e" + h[g].name + "\u3010" + c + "\u4eba\u3011\x3c/a\x3e\x3ci class\x3d'sys-public-mark'\x3e\u516c\u5171\x3c/i\x3e\x3cspan class\x3d'info' title\x3d'" + h[g].creator.username + "\u521b\u5efa\u4e8e" + b + "'\x3e" + h[g].creator.username + "\u521b\u5efa\u4e8e" + b + "\x3c/span\x3e\x3c/li\x3e");
                        !h[g].creator || 1 != h[g].isPrivate && null != h[g].isPrivate || (d += "\x3cli\x3e\x3cdiv class\x3d'j_avatar avatar'\x3e\x3cimg src\x3d'/static/images/group.png'\x3e\x3c/div\x3e\x3ca id\x3d'" + h[g].id + "' class\x3d'router' title\x3d'" + h[g].name + "\u3010" + c + "\u4eba\u3011' href\x3d'#'\x3e" + h[g].name + "\u3010" + c + "\u4eba\u3011\x3c/a\x3e\x3cspan class\x3d'info' title\x3d'" + h[g].creator.username + "\u521b\u5efa\u4e8e" + b + "'\x3e" + h[g].creator.username + "\u521b\u5efa\u4e8e" + b + "\x3c/span\x3e\x3c/li\x3e");
                        $("#group-message ul").append(d)
                    }
                    $("#group-message").find("ul\x3eli:first").addClass("selected");
                    1 == this.groupPage && this.initPinyin(1)
                } else
                    1 == this.groupPage && ($("#group-message ul").empty(),
                    $("#group-message #no-result").removeClass("hide"))
            },
            loadPinyin: function(h) {
                var g = this;
                h = h.indexs;
                var f = /[0-9]$/
                  , d = /^[A-Za-z]+$/
                  , b = $(g.el).find(".j_pinyin_list");
                b.find("a").addClass("hide-im");
                b.find("a.highlight").removeClass("highlight");
                for (var c = 0; c < h.length; c++) {
                    var l = h[c].toLocaleUpperCase();
                    f.test(l) ? l = "degit" : d.test(l) || (l = "special");
                    l && 0 < l.trim().length && b.find("#" + l).removeClass("hide-im").addClass("highlight");
                    b.find("#ALL").removeClass("hide-im").addClass("highlight")
                }
                b.off("click", "a.highlight").on("click", "a.highlight", function(e) {
                    e = $(this);
                    e.addClass("active");
                    e.siblings().removeClass("active");
                    g.initUsers(1)
                })
            },
            findPinyinIndexs: function(h, g) {
                $.ajax({
                    type: TEAMS.ajaxMethod,
                    url: "/base/employee/findPinyinIndexs.json",
                    dataType: "json",
                    data: h,
                    success: function(f) {
                        g && g(f)
                    }
                })
            },
            findGroupPinyinIndexs: function(h, g) {
                $.ajax({
                    type: TEAMS.ajaxMethod,
                    url: "/base/employee/findGroupPinyinIndexs.json",
                    dataType: "json",
                    data: h,
                    success: function(f) {
                        g && g(f)
                    }
                })
            },
            findOtherUserPinyinIndexs: function(h, g) {
                $.ajax({
                    type: TEAMS.ajaxMethod,
                    url: "/base/employee/findOtherUserPinyinIndexs.json",
                    dataType: "json",
                    data: h,
                    success: function(f) {
                        g && g(f)
                    }
                })
            },
            queryEmp: function(h, g) {
                $.ajax({
                    url: "/base/employee/pageQuery.json",
                    type: TEAMS.ajaxMethod,
                    dataType: "json",
                    data: h,
                    success: function(f) {
                        g && g(f)
                    }
                })
            },
            queryGroupEmp: function(h, g) {
                $.ajax({
                    url: "/base/employee/queryGroupEmp.json",
                    type: TEAMS.ajaxMethod,
                    dataType: "json",
                    data: h,
                    success: function(f) {
                        g && g(f)
                    }
                })
            },
            queryOtherUserEmp: function(h, g) {
                $.ajax({
                    url: "/base/employee/queryOtherUserEmp.json",
                    type: TEAMS.ajaxMethod,
                    dataType: "json",
                    data: h,
                    success: function(f) {
                        g && g(f)
                    }
                })
            },
            renderUserList: function(h) {
                var g = this.getAllChecked();
                h = h.page;
                this.pageNo = h.pageNo;
                $(this.el).find(".j_nondata").addClass("hide");
                $(this.el).find(".j_no-more").addClass("hide");
                1 != h.pageNo || null != h.result && 0 != h.result.length ? h.hasNext || $(this.el).find(".j_nondata").removeClass("hide") : $(this.el).find(".j_no-more").removeClass("hide");
                for (var f = 0; f < h.result.length; f++)
                    this.renderUser(h.result[f], !1, g);
                0 < h.result.length && h.result.length == this.checkCount ? $(this.el + " #checkAll").prop("checked", !0) : $(this.el + " #checkAll").prop("checked", !1);
                g = $(this.el).find(".center-more");
                h.hasNext ? g.removeClass("hide") : g.addClass("hide");
                this.checkCount = 0
            },
            renderUser: function(h, g, f) {
                var d = $(this.tpl).siblings("#usersListClone").children("li").clone();
                this.isMulti ? (d.find("div.username input").removeClass("hide"),
                $(this.el).find("#group-user-checkall").removeClass("hide"),
                h.checked && 1 == h.checked && d.find("div.username input").prop("checked", !0)) : (d.find("div.username input").addClass("hide"),
                $(this.el).find("#group-user-checkall").addClass("hide"));
                if (f)
                    for (var b = 0; b < f.length; b++)
                        f[b].id == h.id && (this.checkCount += 1,
                        d.find("div.username input").prop("checked", !0));
                d.data("user", h);
                d.attr("id", h.id);
                h.mobile ? d.find(".call").html(h.mobile) : d.find(".call").html(h.email);
                d.find(".dept").html(h.department.name);
                h.avatar && h.avatar.p4 && (d.find("a.avatar img").attr("src", "/base/download/" + h.avatar.p4),
                this.editable && (d.find("a.avatar img").attr("id", h.id),
                d.find("a.avatar img").data("user", h)));
                f = "";
                f = "normal" == h.status ? "" : "invited" == h.status ? "(\u672a\u6fc0\u6d3b)" : "(\u79bb\u804c)";
                f = "\x3cfont color\x3d'red'\x3e" + f + "\x3c/font\x3e";
                d.find("a.name").text(h.username);
                d.find("a.name").after(f);
                this.isMulti || (d.find("a.name").attr("id", h.id),
                d.find("a.name").data("user", h));
                f = h.email ? h.email : h.mobile;
                d.find("span.email").attr("title", f).html(f);
                $(this.el).find("#userlistCon");
                h.department && 1 == h.department.rank ? d.find("span.department").text("") : d.find("span.department").attr("title", h.department.name).html(h.department.name);
                TEAMS.currentUser.id != h.id ? d.find("span." + h.relation).removeClass("hide") : "editgroup" == this.userOrg && d.find("div.username input").attr("disabled", "disabled");
                g ? $(this.el).find("#userlistCon").prepend(d) : $(this.el).find("#userlistCon").append(d)
            },
            getParam: function(h) {
                var g = {
                    pageSize: 50
                };
                g.pageNo = h;
                g.isGroupEdit = 0;
                g.isContainsSub = !0;
                g.sort = this.sort;
                h = $(this.el).find("#group-message .selected");
                g.groupId = 0 < h.length ? h.children("a").attr("id") : "";
                g["employee.status"] = "normal";
                0 < $(this.el).find("#chk2:checked").length && (g["employee.status"] = "");
                h = $(this.el).find("#org-tree-list .selected");
                g["employee.department"] = 0 < h.length ? h.attr("id") : "";
                g.othertype = this.othertype ? this.othertype : "";
                g.userId = TEAMS.currentUser.id;
                this.rangeIds && (g["employee.rangeIds"] = this.rangeIds);
                (h = $.trim($(this.el).find("#usersearch-keywords").val())) && (g["employee.username"] = h);
                h = "";
                0 < $(this.el).find(".j_pinyin_list .active").length && (h = $(this.el).find(".j_pinyin_list .active").attr("id").toLocaleLowerCase(),
                "all" == h && (h = ""));
                g["employee.index"] = h;
                return g
            },
            isExistUser: function(h) {
                var g = !1;
                $("#userSelector-multi .selected-users\x3ea").each(function() {
                    var f = $(this).data("user");
                    h.id == f.id && (g = !0)
                });
                return g
            },
            isChecked: function() {
                var h = []
                  , h = this.getAllChecked();
                return 0 < h.length ? !0 : !1
            },
            getAllChecked: function() {
                var h = [];
                $("#userSelector-multi .selected-users\x3ea").each(function() {
                    var g = $(this).data("user");
                    h.push(g)
                });
                return h
            },
            highLight: function(h) {
                var g = $("#org-tree-list")
                  , f = this.lightClass;
                g.find(".treenode").removeClass(f);
                g.find("#" + h).addClass(f);
                h || g.find(".root").addClass(f)
            }
        },
        initMb: {
            init: function(h) {
                this.container = h.el;
                this.container.data("listel") ? this.listcontainer = this.container.parents(".field_js").find(this.container.data("listel")) : this.listcontainer = this.container;
                this.targetId = h.targetId;
                this.preEl = h.preEl;
                this.multi = h.multi && "false" == h.multi ? !1 : !0;
                this.title = h.title;
                this.rangeIds = h.rangeIds;
                this.noempty = h.noempty;
                this.showCondition = h.showCondition;
                this.condition = h.condition;
                this.tpl = m.get("userselecter");
                this.reload = !1;
                $("body").append($(this.tpl).siblings("#employee-container"));
                $("#seleted-title").html(this.title);
                this.delegateEvents();
                this.render()
            },
            delegateEvents: function() {
                var h = this
                  , g = $("#employee-container");
                $("#employee-container").off(".seleted");
                g.on("change", ".j_condition", function(f) {
                    f = $(this).val();
                    "null" == f || "notnull" == f ? (g.find("#j_memb-names").hide(),
                    g.find("#j_memb-list-container").hide()) : (g.find("#j_memb-names").show(),
                    g.find("#j_memb-list-container").show())
                });
                if (h.multi)
                    g.on("click.seleted", ".j_employee-info", function(f) {
                        $(this).toggleClass("selected");
                        f = $(this).data("employee");
                        1 == $("#j_memb-names #seleted" + f.id).size() ? ($("#j_memb-names #seleted" + f.id).remove(),
                        $("#j_memb-list-container #" + f.id).removeClass("selected")) : ($("#j_memb-list-container #" + f.id).addClass("selected"),
                        $("#j_memb-names").append('\x3cspan id\x3d"seleted' + f.id + '" data-id\x3d"' + f.id + '"\x3e' + f.username + "\x3c/span\x3e"))
                    });
                else
                    g.on("click.seleted", ".j_employee-info", function(f) {
                        f = $(this).data("employee");
                        h.noempty ? ($(this).toggleClass("selected"),
                        f = $(this).data("employee"),
                        1 == $("#j_memb-names #seleted" + f.id).size() ? ($("#j_memb-names #seleted" + f.id).remove(),
                        $("#j_memb-list-container #" + f.id).removeClass("selected")) : ($("#j_memb-list-container .selected").removeClass("selected"),
                        $("#j_memb-list-container #" + f.id).addClass("selected"),
                        $("#j_memb-names").html('\x3cspan id\x3d"seleted' + f.id + '" data-id\x3d"' + f.id + '"\x3e' + f.username + "\x3c/span\x3e"))) : ($(this).hasClass("selected") ? ($(this).removeClass("selected"),
                        h.container.trigger("employeeComfirm", {
                            objs: ""
                        })) : ($(this).addClass("selected"),
                        h.container.trigger("employeeComfirm", {
                            objs: f
                        })),
                        $(h.preEl).removeClass("hide").parents(".j_page-view").removeClass("hide"),
                        $("#employee-seleted").addClass("hide"),
                        h.remove())
                    });
                g.on("click.seleted", "#j_a-comfirm", function(f) {
                    f = h.getAllChecked();
                    h.container.trigger("employeeComfirm", {
                        objs: f
                    });
                    $(h.preEl).removeClass("hide").parents(".j_page-view").removeClass("hide");
                    $("#employee-seleted").addClass("hide");
                    h.remove()
                });
                g.on("tap.seleted", "#search-keyword-tap", function(f) {
                    setTimeout(function() {
                        $("#employee-seleted").hide();
                        $("#searchResult-employee").show();
                        $("#search-keyword-employee").focus()
                    }, 100)
                });
                g.on("tap.seleted", ".j_icon-cancel-circle", function(f) {
                    $("#search-keyword-employee").val("");
                    $("#j_memb-list-container-search").empty()
                });
                g.on("tap.seleted", ".j_cancle-search", function(f) {
                    f.stopPropagation();
                    setTimeout(function() {
                        $("#employee-seleted").show();
                        $("#searchResult-employee").hide;
                        $("#search-keyword-employee").val("");
                        $("#j_memb-list-container-search").empty()
                    }, 100)
                });
                g.on("change", $("#search-keyword-employee"), function(f) {
                    (f = $("#search-keyword-employee").val()) && 0 < $.trim(f).length && h.searchUser($("#j_memb-list-container-search"), f)
                });
                $("#employee-form").submit(function() {
                    var f = $("#search-keyword-employee").val();
                    f && 0 < $.trim(f).length && h.searchUser($("#j_memb-list-container-search"), f);
                    return !1
                });
                g.on("click.seleted", "#j_a-back", function(f) {
                    $(h.preEl).removeClass("hide").parents(".j_page-view").removeClass("hide");
                    $(h.preEl).find("#field-page").removeClass("hide");
                    $("#employee-seleted").addClass("hide");
                    $("#formstat-datatable").removeClass("hide");
                    h.container && h.container.trigger("employeeComfirm_back");
                    h.remove()
                })
            },
            render: function() {
                this.showCondition && $("#employee-container").find(".j_eui_cells").removeClass("hide");
                "false" != this.multi && 0 != this.multi || $("#employee-container").find("#j_a-comfirm").remove();
                this.condition && ($("#employee-container").find(".j_condition").find('option[value\x3d"' + this.condition + '"]').attr("selected", !0),
                "null" == this.condition || "notnull" == this.condition) && ($("#employee-container").find("#j_memb-names").addClass("hide"),
                $("#employee-container").find("#j_memb-list-container").addClass("hide"));
                this.renderUserList();
                this.reload || (this.searchUser($("#j_memb-list-container")),
                this.reload = !0)
            },
            searchUser: function(h, g) {
                var f = this
                  , d = "";
                h.append($("#data-loading-clone").clone().removeAttr("id"));
                var b = {
                    pageNo: 1,
                    pageSize: 1E3,
                    isContainsSub: !0,
                    "employee.status": "normal"
                };
                g && (b["employee.username"] = g);
                "timecard" == f.module ? (d = "/users/others.json",
                b.id = TEAMS.currentUser.id,
                $("#seleted-title").html("\u4eba\u5458\u9009\u62e9"),
                $(".invite-row").remove()) : "subs" == f.shareType ? (d = "/users/allsubordinate/" + TEAMS.currentUser.id + ".json",
                b.allSubordinate = !0,
                $(".invite-row").remove()) : d = "/base/employee/pageQuery.json";
                $.ajax({
                    type: TEAMS.ajaxMethod,
                    url: d,
                    dataType: "json",
                    data: b,
                    success: function(c) {
                        h.find(".j_data-loading").remove();
                        if ((c = c.page) && c.result && 0 < c.result.length) {
                            h.empty();
                            c = c.result;
                            for (var b = 0; b < c.length; b++) {
                                var e = c[b]
                                  , a = e.id
                                  , d = "";
                                e.pinyin ? (d = e.pinyin.substring(0, 1).toLocaleUpperCase(),
                                /^[A-Za-z]+$/.test(d) || (d = "degit")) : d = "degit";
                                var g = h.find("#user-list-" + d);
                                if (1 == g.size()) {
                                    var m = $("#employee-info-clone").clone().attr("id", a);
                                    m.find(".j_name").html(e.username);
                                    m.data("employee", e);
                                    e.avatar && m.find("img").attr("src", "/base/download/" + e.avatar.p5);
                                    m = f.isSeleted(e, m);
                                    g.append(m)
                                } else
                                    m = $("#employee-clone").clone(),
                                    m.find(".j_com-list").attr("id", "user-list-" + d),
                                    m.find(".j_letter-hd").html("degit" == d ? "#" : d),
                                    h.append(m.html()),
                                    a = $("#employee-info-clone").clone().attr("id", a),
                                    a.find(".j_name").html(e.username),
                                    a.data("employee", e),
                                    e.avatar && a.find("img").attr("src", "/base/download/" + e.avatar.p5),
                                    a = f.isSeleted(e, a),
                                    h.find("#user-list-" + d).append(a)
                            }
                            "false" != f.multi && 0 != f.multi || $("#employee-container").find(".j_ico-add").removeClass("ico-check").addClass("ico-radio")
                        } else
                            h.empty(),
                            h.append($("#load-tip-employee").clone().removeAttr("id"));
                        1 >= TEAMS.currentTenant.usedLicense ? h.append($("#invite-clone").clone().removeAttr("id").removeClass("hide")) : h.append($("#invite-b-clone").clone().removeAttr("id").removeClass("hide"))
                    }
                })
            },
            renderUserList: function() {
                this.listcontainer.find("span").each(function(h) {
                    $(this).attr("data-id") && ($(this).hasClass("nochange") ? $("#j_memb-names").append('\x3cspan class\x3d"nochange" id\x3d"seleted' + $(this).attr("data-id") + '" data-id\x3d"' + $(this).attr("data-id") + '"\x3e' + $(this).text() + "\x3c/span\x3e") : $("#j_memb-names").append('\x3cspan id\x3d"seleted' + $(this).attr("data-id") + '" data-id\x3d"' + $(this).attr("data-id") + '"\x3e' + $(this).text() + "\x3c/span\x3e"))
                })
            },
            isSeleted: function(h, g) {
                for (var f = $("#j_memb-names").children(), d = 0; d < f.length; d++) {
                    var b = $(f[d]);
                    if (b.attr("data-id") == h.id) {
                        g.addClass("selected");
                        b.hasClass("nochange") && g.addClass("nochange");
                        break
                    }
                }
                return g
            },
            getAllChecked: function() {
                var h = [];
                if (1 == this.showCondition) {
                    var g = $("#employee-container").find(".j_condition").val();
                    $("#j_memb-list-container .j_employee-info.selected").each(function() {
                        var f = $(this).data("employee");
                        h.push({
                            id: f.id,
                            name: f.username,
                            condition: g
                        })
                    });
                    0 == h.length && h.push({
                        condition: g
                    })
                } else
                    $("#j_memb-list-container .j_employee-info.selected").each(function() {
                        var f = $(this).data("employee");
                        $(this).hasClass("nochange") && (f.nochange = !0);
                        h.push(f)
                    });
                return h
            },
            remove: function() {
                $("#employee-container").off(".seleted");
                $("#employee-container").remove()
            }
        }
    });
    u.exports = n
});
define("form/component/chancecomponent", "form/relatecomponent form/tplutil form/componentmodel form/component/chancelist form/component/entityselecter form/component/typeahead form/component/relevancecontrol form/abposview".split(" "), function(n, y, u) {
    var m = n("form/relatecomponent")
      , h = n("form/tplutil")
      , g = n("form/componentmodel")
      , f = n("form/component/chancelist")
      , d = n("form/component/entityselecter")
      , b = n("form/component/typeahead")
      , c = n("form/component/relevancecontrol")
      , l = n("form/abposview");
    window.ChanceComponent = m.extend({
        initialize: function(e) {
            m.prototype.initialize.call(this, e);
            var a = {
                componentKey: "ChanceComponent",
                title: "\u5173\u8054\u5546\u673a",
                showfields: [],
                cusCustomFields: [],
                newSortColumn: [],
                selectColumn: [],
                orderContent: ""
            };
            null != e && (a.title = e.title,
            a.showfields = e.showfields,
            a.newSortColumn = e.newSortColumn,
            a.selectColumn = e.selectColumn,
            a.orderContent = e.orderContent,
            a.cusCustomFields = e.cusCustomFields);
            this.componentSetup = $.extend(this.componentSetup, a);
            this.basefields = {
                manager: "\u8d1f\u8d23\u4eba",
                saleStage: "\u5546\u673a\u9636\u6bb5",
                money: "\u9500\u552e\u91d1\u989d",
                winRate: "\u5546\u673a\u8d62\u7387",
                saleSource: "\u5546\u673a\u6765\u6e90",
                saleType: "\u5546\u673a\u7c7b\u578b",
                orderTime: "\u7ed3\u5355\u65e5\u671f",
                customer: "\u6240\u5c5e\u5ba2\u6237",
                remark: "\u5907\u6ce8"
            };
            this.tpl = h.get("chancecomponent", {
                isMobileForm: this.isMobileForm
            });
            this.componentModel = new g
        },
        setCusCustomFields: function(e) {
            this.componentSetup.cusCustomFields = e
        },
        setShowfields: function(e) {
            this.componentSetup.showfields = e
        },
        setNewSortColumn: function(e) {
            this.componentSetup.newSortColumn = e
        },
        setSelectColumn: function(e) {
            this.componentSetup.selectColumn = e
        },
        setOrderContent: function(e) {
            this.componentSetup.orderContent = e
        },
        render: function(e) {
            var a = this
              , c = $(this.tpl).siblings("#form-chance");
            if (1 == e.parents("div[componentKey\x3d'TableLayout']").length || 1 == e.parents("div[componentKey\x3d'ColumnPanel']").length)
                e.removeClass("field-hoz"),
                this.componentSetup.titleLayout = "";
            this.componentModel.generatorId(function(c) {
                a.componentSetup.tempId = c.generatorId;
                e.attr("tempId", c.generatorId)
            });
            m.prototype.render.call(this, e, c);
            e.html(c.html())
        },
        renderEditPreview: function(e, a) {
            var c = $(this.tpl).siblings("#form-chance");
            m.prototype.renderEditPreview.call(this, e, c);
            a ? e.replaceWith(c) : e.append(c)
        },
        renderEditor: function() {
            var e = this
              , a = $(this.tpl).siblings("#editor-chance")
              , c = !1;
            if ("true" == this.componentSetup.isUnique || 1 == this.componentSetup.isUnique)
                c = !0;
            a.find("#isUnique").attr("checked", c);
            if (1 == $("#widget-control .field-active").parents("div[componentKey\x3d'TableLayout']").length || 1 == $("#widget-control .field-active").parents("div[componentKey\x3d'ColumnPanel']").length)
                $("#widget-control .field-active").removeClass("field-hoz"),
                this.componentSetup.titleLayout = "";
            e.getFormIdByModule("saleChance", a);
            a.find(".j_showField .j_chance-field-ul").empty();
            var d = this.componentSetup.showfields;
            if (d && 0 < d.length) {
                for (c = 0; c < d.length; c++) {
                    var f = d[c]
                      , g = a.find(".j_clone .j_chance-field-li").clone();
                    g.find("#" + f).attr("selected", "selected");
                    a.find(".j_showField .j_chance-field-ul").append(g)
                }
                a.find(".j_showField").removeClass("hide");
                a.find(".j_batch_edit").removeClass("hide");
                a.find(".j_cardConf").addClass("hide")
            }
            m.prototype.renderEditor.call(this, a);
            $("#editor-component").html(a.html());
            new b({
                remote: TEAMS.api.suggestion,
                entity: "chance",
                changeValue: function() {
                    e.setDefaultValue()
                }
            });
            if ((a = this.componentSetup.content) && 0 < a.length)
                for (d = $("#editor-component").find(".js_entity_container"),
                c = 0; c < a.length; c++)
                    f = {
                        id: a[c].optionId,
                        name: a[c].content
                    },
                    g = $('\x3cspan name\x3d"js_entity_item" class\x3d"js_entity_item employee-item j_component"\x3e\x3ca data-id\x3d"' + f.id + '" data-module\x3d"" id\x3d' + f.id + ' class\x3d"entitybox-toggle" title\x3d"' + f.name + '"\x3e' + f.name + '\x3c/a\x3e\x3ca class\x3d"close js_deleteItem" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e'),
                    g.data("obj", f),
                    d.append(g)
        },
        getFormIdByModule: function(e, a) {
            var c = this;
            $.ajax({
                type: TEAMS.ajaxMethod,
                dataType: "json",
                async: !1,
                url: TEAMS.api.getFormId,
                data: {
                    module: e
                },
                success: function(b) {
                    (b = b.data) && c.getFieldsByFormId(b, e, a)
                }
            })
        },
        getFieldsByFormId: function(e, a, c) {
            var b = {};
            b.formId = e;
            b.module = a;
            e = [];
            e.push("0");
            b.statusList = e;
            $.ajax({
                contentType: "application/json",
                type: TEAMS.ajaxMethod,
                async: !1,
                data: JSON.stringify(b),
                dataType: "json",
                url: TEAMS.api.queryFormFieldsByFormId,
                success: function(a) {
                    if (a && a.formField)
                        for (var e = 0; e < a.formField.length; e++) {
                            var b = a.formField[e];
                            b["delete"] || "SignatureComponent" == b.componentKey || c.find(".j_clone .j_chance-field-li select").append('\x3coption class\x3d"j_option j_custom_option" value\x3d"' + b.id + '" id\x3d"' + b.id + '"\x3e' + b.title + "\x3c/option\x3e")
                        }
                }
            })
        },
        setDefaultValue: function() {
            var e = $("#editor-component").find(".js_entity_container .js_entity_item")
              , a = [];
            0 < e.length && e.each(function(e) {
                var c = $(this).data("obj");
                a[e] = {
                    optionId: c.id,
                    content: c.name
                }
            });
            this.componentSetup.content = a
        },
        renderPreview: function(e, a, c, b, d) {
            var f = $(this.tpl);
            b = null;
            (b = $("body").find("#formTenantKey").val()) ? b = b.toUpperCase() : null != TEAMS.currentTenant && (b = TEAMS.currentTenant.tenantKey.toUpperCase());
            if ($("body").find("#scanReport").val() || null != TEAMS.currentUser && TEAMS.currentTenant.tenantKey.toUpperCase() == b)
                if (b = this.getCurrentModuleIsPay(d),
                0 == b || "false" == b) {
                    d = formPlugin.moduleIsPay("saleChance");
                    var g = $('\x3cspan class\x3d"employee-item"\x3e\u60a8\u7684\u56e2\u961f\u76ee\u524d\u662f\u514d\u8d39\u7248\u672c\uff0c\u4e0d\u652f\u6301\u6b64\u529f\u80fd\uff01\x3c/span\x3e');
                    "mobile" != window.systemInfo_form ? (b = f.siblings("#preview-chance"),
                    d || (b.find(".js_chanceitem_container").empty().append(g),
                    b.find(".js_form-chance-add").addClass("hide"),
                    b.find(".typeahead-wrapper").remove())) : (b = f.siblings("#mobile-preview"),
                    d || b.find(".js_chanceitem_container").removeClass("chance-seleted").empty().append(g))
                } else
                    b = "mobile" != window.systemInfo_form ? f.siblings("#preview-chance") : f.siblings("#mobile-preview");
            else
                b = f.siblings("#nochance-preview"),
                b.find(".field_message_js").attr("cid", this.cid);
            if ((f = TEAMS.disableModules) && 0 < f.length)
                for (d = 0; d < f.length; d++)
                    if (g = f[d],
                    g.module && "saleChance" == g.module) {
                        b.addClass("hide");
                        break
                    }
            b.find(".widget-title .widget-title_js").text(this.componentSetup.title);
            "true" != this.componentSetup.isHideTitle && 1 != this.componentSetup.isHideTitle || b.addClass("field-notitle").find(".widget-title .widget-title_js").addClass("hide");
            "true" != this.componentSetup.required && 1 != this.componentSetup.required || b.find(".widget-title .widget-required_js").text(" *");
            "" != this.componentSetup.describe && b.find(".field-description").text(this.componentSetup.describe).show();
            b.find(".check_js").data("componentData", this).attr("id", this.componentSetup.fieldId + this.cid).attr("name", this.componentSetup.fieldId).attr("cid", this.cid);
            b.attr("fieldId", this.componentSetup.fieldId).attr("id", "field_" + (this.componentSetup.fieldId || this.componentSetup.tempId));
            "mobile" == window.systemInfo_form && b.find(".chance-seleted").attr("id", this.componentSetup.fieldId);
            f = this.componentSetup.isUnique;
            if ("true" == f || 1 == f)
                "mobile" != window.systemInfo_form ? b.find("#searchchance").removeAttr("data-multi") : b.find(".js_chanceitem_container").attr("data-multi", "false");
            b.addClass(this.componentSetup.titleLayout);
            "true" != this.componentSetup.isDefault && 1 != this.componentSetup.isDefault || a || (a = this.componentSetup.content) && 0 < a.length && null != TEAMS.currentUser && this.setValue(b, {
                dataOptions: a
            });
            if (c || "true" == c)
                "mobile" != window.systemInfo_form ? this.readOnly(b, !0) : b.find(".js_chanceitem_container").removeClass("chance-seleted").text("");
            if ("true" == this.componentSetup.isReadOnly || 1 == this.componentSetup.isReadOnly)
                "mobile" != window.systemInfo_form ? this.readOnly(b, !0) : (b.find(".js_chanceitem_container").removeClass("chance-seleted"),
                (a = this.componentSetup.content) && 0 != a.length || b.find(".js_chanceitem_container").text(""));
            this.getValue(b);
            this.el = e;
            e.append(b)
        },
        getCurrentModuleIsPay: function(e) {
            var a = !1;
            e && (a = formPlugin.moduleIsPay(e));
            return a
        },
        renderStatSearch: function(e) {
            var a = this
              , c = $(this.tpl)
              , b = e.parentEl
              , d = e.container
              , f = null
              , g = e.fieldId
              , h = e.subFormId
              , l = e.filterEl
              , m = e.fieldTitle
              , n = e.condition
              , x = e.ids
              , u = e.term
              , B = b.find(".j_formField-select select").find("option:selected").attr("module") || e.module;
            if ("mobile" != window.systemInfo_form) {
                f = c.siblings("#statsearch-entity");
                f.find(".control-btn").attr("mod", B);
                if (x)
                    for (f.find(".entity-container").empty(),
                    m = 0; m < x.length; m++)
                        e = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d"' + x[m].id + '" title\x3d"' + x[m].text + '"\x3e' + x[m].text + "\x3c/a\x3e\x3c/span\x3e",
                        f.find(".entity-container").append(e);
                u && f.find("select:first option[value\x3d" + u + "]").attr("selected", "true");
                x = (new Date).getTime();
                f.find(".j_entityContainer").attr("id", "j_chance" + x);
                b.attr("class", "sch-group j_formFieldSearchGroup");
                b.find(".j_formField-condition").html(f);
                if ("biaoge" == B) {
                    var D = $(d + " #j_chance" + x + " #typeahead-chance");
                    D.attr("fieldId", g).attr("pageNo", "1").attr("pageSize", "10");
                    D.parents(".j_entityContainer").find(".typeahead-search").attr("url", "/formdata/queryRelevanceDataOptions.json").attr("fieldId", g);
                    window.typeahead && window.typeahead.init && window.typeahead.init({
                        el: d + " #j_chance" + x + " #typeahead-chance",
                        remote: "/formdata/queryRelevanceDataOptions.json",
                        callback: function(e) {
                            if (e && !$.isEmptyObject(e)) {
                                var c = D.parents(".j_entityContainer").find(".j_selected");
                                a.renderTypeheader(c, e)
                            }
                        }
                    })
                }
            } else
                f = c.siblings("#statsearch-chance-mobile"),
                n && (f.find(".j_condition").find('option[value\x3d"' + n + '"]').attr("selected", !0),
                "null" != n && "notnull" != n || f.find(".j_control").hide()),
                l && (f.find("#seleted-list").empty(),
                l.find(".j_filterList .selectd #comp-val span").each(function() {
                    var a = $(this).attr("optionId")
                      , e = $(this).text()
                      , c = $("\x3cspan\x3e\x3c/span\x3e");
                    c.attr("id", a).text(e);
                    f.find("#seleted-list").append(c)
                })),
                d = {},
                d.fieldId = g,
                d.pageNo = 1,
                d.pageSize = "20",
                d.module = B,
                a.searchChance(d, f, g, m, b, h),
                b.off("change", "#statsearch-chance-mobile .j_condition").on("change", "#statsearch-chance-mobile .j_condition", function() {
                    var a = $(this).val();
                    "null" == a || "notnull" == a ? b.find("#statsearch-chance-mobile .j_control").hide() : b.find("#statsearch-chance-mobile .j_control").show()
                }),
                b.off("tap", "#statsearch-chance-mobile .j_optionli").on("tap", "#statsearch-chance-mobile .j_optionli", function() {
                    var a = $(this);
                    a.hasClass("selected") ? a.removeClass("selected") : a.addClass("selected");
                    var e = a.find(".j_optionname").text()
                      , a = a.attr("id")
                      , e = '\x3cspan id\x3d"' + a + '"\x3e' + e + "\x3c/span\x3e";
                    0 < b.find("#statsearch-chance-mobile #seleted-list #" + a).length ? b.find("#statsearch-chance-mobile #seleted-list #" + a).remove() : b.find("#statsearch-chance-mobile #seleted-list").append(e)
                }),
                b.off("tap", "#statsearch-chance-mobile .j_more").on("tap", "#statsearch-chance-mobile .j_more", function() {
                    var e = $(this)
                      , c = e.attr("pageNo")
                      , d = e.attr("fieldId")
                      , e = e.attr("title")
                      , g = {};
                    g.fieldId = d;
                    g.pageSize = "20";
                    g.pageNo = c;
                    g.module = B;
                    a.searchChance(g, f, d, e, b, h)
                })
        },
        renderTypeheader: function(e, a) {
            var c = a.name
              , b = a.id;
            if (c && b) {
                var d = '\x3cspan id\x3d"' + b + '" class\x3d"entity-item j_entity_item" name\x3d"j_entity_item"\x3e\x3ca title\x3d"' + c + '" id\x3d"' + b + '" class\x3d"entitybox-toggle" data-module\x3d"chance" data-value\x3d"' + b + '" data-id\x3d"' + b + '"\x3e' + c + "\x3c/a\x3e\x3c/span\x3e";
                e.find(".entity-item").each(function(a) {
                    b == $(this).find("a").attr("id") && (d = null)
                });
                e.append(d);
                e.find(".j_entity_item").data("object", a)
            }
        },
        searchChance: function(e, a, c, b, d, f) {
            $.ajax({
                type: TEAMS.ajaxMethod,
                url: "freeform/queryFormDataOptions.json",
                dataType: "json",
                data: e,
                success: function(e) {
                    var g = e.dataOptionPage;
                    if (0 == g.totalCount)
                        a.find(".j_noresult").removeClass("hide"),
                        a.find(".eui-cells").addClass("hide");
                    else
                        for (g.hasNext && a.find(".j_more").removeClass("hide").attr("pageNo", g.pageNo + 1).attr("fieldId", c).attr("title", b),
                        e = g.result,
                        1 == g.pageNo && a.find(".j_optionUl").empty(),
                        a.find("#seleted-list").attr("fieldId", c),
                        g = 0; g < e.length; g++) {
                            var h = e[g]
                              , l = h.content
                              , h = h.optionId
                              , m = a.find("#li-clone li").clone();
                            0 < a.find("#seleted-list").find("#" + h).length && m.addClass("selected");
                            m.find(".j_optionname").text(l);
                            m.attr("id", h);
                            a.find(".j_optionUl").append(m)
                        }
                    d.find("#component-div").html(a);
                    d.find(".j_comp-ok").attr("comKey", "ChanceComponent").attr("fieldId", c).attr("title", b).attr("subFormId", f)
                }
            })
        },
        submitCheck: function(e, a) {
            var c = this.check(e);
            a(c)
        },
        checkEvents: function(e) {
            var a = this
              , b = a.el || $(document)
              , g = a.componentSetup.fieldId + this.cid
              , h = a.componentSetup.newSortColumn
              , l = a.componentSetup.selectColumn
              , m = a.componentSetup.orderContent;
            (new this.chanceAhead({})).initAhead(g, h, l, m);
            var n = a.componentSetup.isUnique;
            if ("mobile" == window.systemInfo_form)
                b.on("click", "#" + g + " .chance-seleted", function(e) {
                    e = $(this).attr("data-module");
                    var b = $(this).attr("data-multi")
                      , f = $(this).attr("data-noempty") && "true" == $(this).attr("data-noempty") ? !0 : !1
                      , h = $(this).parents(".j_page-view")
                      , k = h.attr("id")
                      , l = $(this);
                    if (!$(this).parents(".j_formpreview").hasClass("form-noedit")) {
                        var q = $("#" + g + " .chance-seleted .j_chance_detail")
                          , r = [];
                        q && 0 < q.length && q.each(function(a) {
                            a = $(this).find(".j_chance").attr("id");
                            var e = $(this).find(".j_chance").text();
                            r.push({
                                name: e,
                                id: a,
                                module: "chance"
                            })
                        });
                        "true" == n || 1 == n ? (l = new d,
                        l.render("mb", {
                            targetEl: $(this),
                            module: e,
                            multi: b,
                            preEl: "#" + k,
                            noempty: f,
                            seletedList: r,
                            showfields: a.componentSetup.showfields,
                            order: m
                        })) : 0 == r.length ? (l = new d,
                        l.render("mb", {
                            targetEl: $(this),
                            module: e,
                            multi: b,
                            preEl: "#" + k,
                            noempty: f,
                            seletedList: r,
                            showfields: a.componentSetup.showfields,
                            order: m
                        })) : (new c({
                            targetEl: l,
                            module: e,
                            multi: b,
                            preEl: "#" + k,
                            noempty: f,
                            seletedList: r,
                            showfields: a.componentSetup.showfields,
                            order: m
                        })).render();
                        h.addClass("hide")
                    }
                });
            b.off("entitySelected", "#" + g + " #searchchance").on("entitySelected", "#" + g + " #searchchance", function(e) {
                1 != n && "true" != n || $("#" + g + " .js_chanceitem_container").empty();
                for (var c = 1; c < arguments.length; c++) {
                    var b = $("#" + g);
                    b.parents(".field_js").find(".form-error").text("");
                    b.parents(".field_js").find(".form-error").hide();
                    a.renderSelectItem(g, arguments[c], a.componentSetup.showfields, b)
                }
                a.triggerFillRelate($(this))
            });
            b.on("click", "#" + g + " #searchchance", function(e) {
                window.abposview && window.abposview.remove();
                e.stopPropagation();
                $("#" + g + " .control-input").trigger("focusout", "tt");
                var c = [];
                (e = $("#" + g + " .js_chanceitem_container .j_chance_detail")) && 0 < e.length && e.each(function(a) {
                    a = $(this).find(".j_chance").attr("id");
                    var e = $(this).find(".j_chance").text()
                      , b = $(this).find(".j_chance").data("chance");
                    null == b && (b = {
                        name: e,
                        id: a
                    });
                    c.push({
                        name: e,
                        id: a,
                        chance: b
                    })
                });
                e = $(this);
                (new f).render("pc", {
                    targetEl: e,
                    keyword: "",
                    isUnique: n,
                    seletedList: c,
                    selectColumn: a.componentSetup.selectColumn,
                    order: a.componentSetup.orderContent
                })
            });
            b.on("mouseenter.typeahead", "#" + g + " .typeahead-wrapper", function(a) {
                $(this).data("enter", !0)
            }).on("mouseleave.typeahead", "#" + g + " .typeahead-wrapper", function(a) {
                $(this).data("enter", !1)
            });
            b.on("click", "#" + g + " .control-btn", function(a) {
                a.stopPropagation();
                $(this).addClass("hide");
                $(this).prev(".typeahead-wrapper").removeClass("hide");
                $(this).prev(".typeahead-wrapper").find(".control-input").focus()
            });
            b.on("focusout", "#" + g + " .control-input", function(a, e) {
                var c = $(this).parents(".typeahead-wrapper");
                c.data("enter") && "tt" != e || (c.addClass("hide"),
                c.next(".control-btn").removeClass("hide"))
            });
            b.on("click.tt", "#" + g + " #searchList\x3ep", function() {
                var e = $("#" + g);
                e.parents(".field_js").find(".form-error").text("");
                e.parents(".field_js").find(".form-error").hide();
                var c = a.componentSetup.showfields
                  , b = a.componentSetup.isUnique;
                "true" != b && 1 != b || e.find(".js_chanceitem_container").empty();
                if ($(this).hasClass("creat-new")) {
                    if (c = $(this).attr("title"),
                    null == c || "" == c)
                        return
                } else
                    b = $(this).data("chance"),
                    a.renderSelectItem(g, b, c, e);
                a.triggerFillRelate(e)
            });
            b.on("click", "#" + g + " .js_deleteChance", function() {
                var c = $(this).closest("#" + g)
                  , b = a.componentSetup.showfields;
                null == b || 0 == b.length ? $(this).parent().remove() : $(this).parent().parent().parent().remove();
                a.triggerFillRelate(c);
                c = a.check(c, "change");
                e(c)
            });
            "mobile" == window.systemInfo_form && (b.on("objsComfirm", "#" + g + " .chance-seleted", function(e, c) {
                var b = $("#" + g + " .js_chanceitem_container")
                  , d = a.componentSetup.isUnique;
                b.text("");
                b.parents("#field_" + a.componentSetup.fieldId).find(".form-error").text("");
                "true" != d && 1 != d || b.empty();
                if (0 < c.objs.length) {
                    var d = c.objs, f;
                    for (f in d) {
                        var h = d[f];
                        if (h) {
                            var k = $('\x3cspan id\x3d"' + h.id + '" class\x3d"j_chance_detail j_component employee-item j_chance_detail"\x3e\x3ca id\x3d"' + h.id + '" data-module\x3d"chance" data-value\x3d"' + h.id + '" data-id\x3d"' + h.id + '" class\x3d"j_chance entitybox-toggle"\x3e' + h.name + "\x3c/a\x3e\x3c/span\x3e");
                            b.append(k)
                        }
                    }
                } else
                    h = c.objs,
                    k = $('\x3cspan id\x3d"' + h.id + '" class\x3d"j_chance_detail j_component employee-item j_chance_detail"\x3e\x3ca id\x3d"' + h.id + '" data-module\x3d"chance" data-value\x3d"' + h.id + '" data-id\x3d"' + h.id + '" class\x3d"j_chance entitybox-toggle"\x3e' + h.name + "\x3c/a\x3e\x3c/span\x3e"),
                    0 == h.length ? b.html('\x3cdiv class\x3d"widget-link-holder"\x3e\x3ci class\x3d"icon-plus2"\x3e\x3c/i\x3e\u9009\u62e9\u5546\u673a\x3c/div\x3e') : b.append(k);
                a.triggerFillRelate(b)
            }),
            b.on("deleteObj", "#" + g + " .chance-seleted", function(e, c) {
                var b = $("#" + g + " .js_chanceitem_container");
                b.find('span[id\x3d"' + c + '"]').remove();
                0 == b.find("span").length && b.html('\x3cdiv class\x3d"widget-link-holder"\x3e\x3ci class\x3d"icon-plus2"\x3e\x3c/i\x3e\u9009\u62e9\u5546\u673a\x3c/div\x3e');
                a.triggerFillRelate(b)
            }))
        },
        autoSaveEvents: function(e) {
            var a = this
              , c = a.el || $(document)
              , b = a.componentSetup.fieldId + this.cid;
            c.on("click", "#" + b + " .js_deleteChance", function() {
                a.saveComponentValue(c.find("#" + b), e)
            });
            if ("mobile" == window.systemInfo_form)
                c.on("objsComfirm", "#" + b + " .chance-seleted", function(c, b) {
                    a.saveComponentValue($(this), e)
                });
            else
                c.on("click", "#" + b + " #searchList\x3ep", function() {
                    a.saveComponentValue($(this), e)
                }),
                c.on("entitySelected", "#" + b + " #searchchance", function(c) {
                    a.saveComponentValue($(this), e)
                })
        },
        renderSelectItem: function(e, a, c, b) {
            if (!(0 < b.find(".js_chanceitem_container").find(".j_chance[id\x3d'" + a.id + "']").length))
                if (null == c || 0 == c.length) {
                    var d = '\x3cspan id\x3d"' + a.id + '" name\x3d"j_chance_detail" class\x3d"j_chance_detail j_component employee-item"\x3e\x3ca id\x3d"' + a.id + '" data-id\x3d"' + a.id + '" data-module\x3d"saleChance" class\x3d"entitybox-toggle j_chance" title\x3d"' + a.name + '"\x3e' + a.name + '\x3c/a\x3e\x3ca class\x3d"close js_deleteChance" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e';
                    (e = $("#" + e + " .js_chanceitem_container .j_chance_detail")) && e.each(function(c) {
                        a.id == $(this).find(".j_chance").attr("id") && $(this).remove()
                    });
                    b.find(".js_chanceitem_container").append(d);
                    b.find(".js_chanceitem_container").find(".j_chance[id\x3d'" + a.id + "']").data("chance", a)
                } else {
                    d = b.find(".j_chance_detail_clone .j_chance_detail").clone();
                    d.attr("id", a.id).attr("data-value", a.id).attr("data-id", a.id);
                    d.find(".j_chance").attr("id", a.id).text(a.name).attr("data-original-title", a.name);
                    d.find(".j_chance").data("chance", a);
                    for (var f = 0; f < c.length; f++) {
                        var g = c[f]
                          , h = b.find(".j_chance_detail_clone .j_field").clone();
                        h.attr("id", g);
                        h.find(".j_field_title").text(this.basefields[g]);
                        var l = "";
                        if ("manager" == g)
                            l = a[g] ? a[g].username : "",
                            h.find(".j_field_value").prop("title", l).text(l);
                        else if ("saleStage" == g)
                            l = a.stageName,
                            h.find(".j_field_value").prop("title", l).text(l);
                        else if ("saleSource" == g)
                            l = a.sourceName,
                            h.find(".j_field_value").prop("title", l).text(l);
                        else if ("saleType" == g)
                            l = a.typeName,
                            h.find(".j_field_value").prop("title", l).text(l);
                        else if ("customer" == g)
                            l = a[g] ? a[g].name : "",
                            h.find(".j_field_value").prop("title", l).text(l);
                        else if ("money" == g || "winRate" == g || "remark" == g)
                            l = a[g] ? a[g] : "",
                            h.find(".j_field_value").prop("title", l).text(l);
                        else if ("orderTime" == g)
                            g = a[g] ? a[g] : "",
                            "" != g && null != g && (g = Date.create(g).format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}")),
                            h.find(".j_field_value").prop("title", g).text(g);
                        else
                            continue;
                        d.find(".j_part .j_line").append(h)
                    }
                    var m = {};
                    if (a.formDataId && this.componentSetup.cusCustomFields) {
                        h = [];
                        for (c = 0; c < this.componentSetup.cusCustomFields.length; c++)
                            f = this.componentSetup.cusCustomFields[c],
                            h.push(f.substring(0, f.indexOf("_")));
                        c = {};
                        c.formDataId = a.formDataId;
                        c.module = "saleChance";
                        c.fieldIds = h;
                        $.ajax({
                            contentType: "application/json",
                            type: TEAMS.ajaxMethod,
                            async: !1,
                            data: JSON.stringify(c),
                            dataType: "json",
                            url: "freeform/findAllFormDataFields.json",
                            success: function(a) {
                                if (a && a.formData && a.formData.dataDetails)
                                    for (var c = 0; c < a.formData.dataDetails.length; c++) {
                                        var e = a.formData.dataDetails[c]
                                          , b = e.content;
                                        !b && e.dataText && (b = e.dataText.content);
                                        if (!b && 0 < e.dataOptions.length) {
                                            for (var b = "", d = 0; d < e.dataOptions.length; d++)
                                                b += e.dataOptions[d].content + ",";
                                            b = b.substring(0, b.length - 1)
                                        }
                                        m[e.formField.id] = b
                                    }
                            }
                        })
                    }
                    if (this.componentSetup.cusCustomFields)
                        for (c = 0; c < this.componentSetup.cusCustomFields.length; c++)
                            f = this.componentSetup.cusCustomFields[c],
                            h = b.find(".j_chance_detail_clone .j_field").clone(),
                            h.attr("id", f.substring(0, f.indexOf("_"))),
                            h.find(".j_field_title").text(f.substring(f.indexOf("_") + 1, f.length)),
                            h.find(".j_field_value").prop("title", m[f.substring(0, f.indexOf("_"))]).text(m[f.substring(0, f.indexOf("_"))]),
                            d.find(".j_part .j_line").append(h);
                    d.find(".j_title").append('\x3ca class\x3d"close js_deleteChance" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e');
                    $("#" + e + " .js_chanceitem_container").append(d)
                }
        },
        chanceAhead: Backbone.View.extend({
            defaults: function() {
                this.remote = this.suggestion = "";
                this.entity = "chance";
                this.tpl = h.get("chancecomponent")
            },
            initAhead: function(c, a, b, d) {
                this.defaults();
                this.fieldId = c;
                this.newSortColumn = a;
                this.selectColumn = b;
                this.orderContent = d;
                this.$continer = $("#" + this.fieldId);
                this._htmlEvents()
            },
            _htmlEvents: function() {
                var c = this
                  , a = c.$continer
                  , b = $("#" + c.fieldId + " #typeahead-chance");
                b.off("focus.tt").on("focus.tt", function(a) {
                    c._search($(this))
                });
                b.off("click.tt").on("click.tt", function(a) {
                    a.stopPropagation()
                });
                b.off("keyup.tt").on("keyup.tt", function(d) {
                    d = d.which;
                    0 < $("body").find("#form-abposselect").length && (a = $("body").find("#form-abposselect").find(".field_js"));
                    13 == d ? (a.find("#chance-typeahead-div p.active").trigger("click.tt"),
                    window.abposview && window.abposview.remove()) : 27 == d ? (b.trigger("focusout", "tt"),
                    window.abposview && window.abposview.remove()) : 38 == d ? (d = $("#chance-typeahead-div p.active"),
                    1 > d.length ? a.find("#chance-typeahead-div p").last().addClass("active") : (d.removeClass("active"),
                    (0 < d.prev().length ? d.prev() : a.find("#chance-typeahead-div p").last()).addClass("active"))) : 40 == d ? (d = a.find("#chance-typeahead-div p.active"),
                    1 > d.length ? a.find("#chance-typeahead-div p").first().addClass("active") : (d.removeClass("active"),
                    (0 < d.next().length ? d.next() : a.find("#chance-typeahead-div p").first()).addClass("active"))) : c._search($(this))
                });
                a.find("#chance-typeahead-div").off("mouseenter.tt", "p").on("mouseenter.tt", "p", function() {
                    0 < $("body").find("#form-abposselect").length && (a = $("body").find("#form-abposselect").find(".field_js"));
                    $(this).addClass("active");
                    a.find("#chance-typeahead-div p.active").removeClass("active")
                });
                a.off("click.tt", "#chance-typeahead-div p").on("click.tt", "#chance-typeahead-div p", function(a) {
                    b.trigger("focusout", "tt")
                })
            },
            _search: function(c) {
                var a = this
                  , b = a.$continer
                  , d = $.trim(c.val());
                d == c.attr("placeholder") && (d = "");
                b.find("#chance-typeahead-div #searchList").html("");
                0 < $("body").find("#form-abposselect").length ? ($("body").find("#form-abposselect").find(".field_js").find("#chance-typeahead-div .loading_small").show(),
                b.find("#chance-typeahead-div .loading_small").hide()) : b.find("#chance-typeahead-div .loading_small").show();
                window.abposview && window.abposview.remove();
                c = {};
                c.keywords = d;
                c.searchType = "relevance";
                d && a.orderContent && (c.property = a.orderContent.property,
                c.direction = a.orderContent.direction);
                $.ajax({
                    type: TEAMS.ajaxMethod,
                    url: TEAMS.api.suggestion,
                    dataType: "json",
                    data: c,
                    success: function(c) {
                        c && c.message && 0 != c.message.code || a.renderChance(c.relevances, d)
                    }
                })
            },
            renderChance: function(c, a) {
                var b = this.$continer;
                0 < $("body").find("#form-abposselect").length ? $("body").find("#form-abposselect").find(".field_js").find("#chance-typeahead-div .loading_small").hide() : b.find("#chance-typeahead-div .loading_small").hide();
                if (null != c && 0 < c.length)
                    for (var d = 0; d < c.length; d++) {
                        var f = c[d]
                          , g = f.name;
                        if (!(0 < b.find("#chance-typeahead-div #searchList").find("#" + f.id).length)) {
                            var h = $(this.tpl).siblings("#chance-clone").find(".j_chance").clone();
                            h.text(g);
                            h.attr("title", g).attr("id", f.id);
                            h.data("chance", f);
                            b.find("#chance-typeahead-div #searchList").append(h).show()
                        }
                    }
                b.find("#chance-typeahead-div #searchList").show();
                window.abposview && window.abposview.remove();
                window.abposview = new l({
                    continer: b,
                    entity: this.entity
                });
                window.abposview.render()
            }
        }),
        check: function(c) {
            var a = $(c).find(".js_chanceitem_container .j_chance_detail").length
              , b = {};
            b.element = c;
            0 != a || "true" != this.componentSetup.required && 1 != this.componentSetup.required || (b.message = this.componentSetup.title + "\u4e0d\u80fd\u4e3a\u7a7a");
            return b
        },
        getValue: function(c, a) {
            var b = {
                formField: {
                    id: this.componentSetup.fieldId
                }
            }
              , d = c.find(".js_chanceitem_container .j_chance_detail");
            if (0 < d.length) {
                var f = [];
                d.each(function(a) {
                    var c = $(this).find(".j_chance").attr("id")
                      , e = $(this).find(".j_chance").text();
                    f[a] = {
                        optionId: c,
                        content: e,
                        type: "saleChance"
                    }
                });
                b.dataOptions = f
            } else
                a || (b = null);
            return b
        },
        setValue: function(c, a) {
            c.find(".js_chanceitem_container").empty();
            var b = this
              , d = this.componentSetup.showfields;
            if (null != a && null != a.dataOptions) {
                for (var f = [], g = [], h = 0; h < a.dataOptions.length; h++) {
                    var l = a.dataOptions[h]
                      , m = null == l.content ? "" : l.content
                      , l = l.optionId;
                    f.push(l);
                    g.push({
                        id: l,
                        name: m
                    })
                }
                if (TEAMS.currentUser && TEAMS.currentUser.id)
                    null == d || 0 == d.length ? b.renderChances(g, c, d, a) : (h = {},
                    h.ids = f,
                    $.ajax({
                        contentType: "application/json",
                        type: TEAMS.ajaxMethod,
                        data: JSON.stringify(h),
                        dataType: "json",
                        async: !1,
                        url: "/form/querySaleChancesByIds.json",
                        success: function(f) {
                            if (!f || !f.message || 0 == f.message.code) {
                                f = f.saleChances;
                                for (var h = [], l = 0; l < g.length; l++) {
                                    for (var m = g[l], r = !0, p = 0; p < f.length; p++) {
                                        var n = f[p];
                                        if (n.id == m.id) {
                                            h.push(n);
                                            r = !1;
                                            break
                                        }
                                    }
                                    r && h.push(m)
                                }
                                b.renderChances(h, c, d, a)
                            }
                        }
                    }));
                else
                    for (h = 0; h < g.length; h++)
                        f = g[h],
                        "mobile" == window.systemInfo_form && (f = $('\x3cspan href\x3d"/mobile/crms/' + f.id + "?module\x3dkey_salechance\x26info\x3dview_SaleChanceView|id_" + f.id + '" id\x3d' + f.id + ' class\x3d"router j_component employee-item j_chance_detail"\x3e\x3ca class\x3d"j_chance" id\x3d' + f.id + "\x3e" + f.name + "\x3c/a\x3e\x3c/span\x3e"),
                        c.find(".js_chanceitem_container").append(f))
            }
        },
        renderChances: function(c, a, b, d) {
            for (d = 0; d < c.length; d++) {
                var f = c[d];
                if ("mobile" == window.systemInfo_form)
                    var g = $('\x3cspan href\x3d"/mobile/crms/' + f.id + "?module\x3dkey_salechance\x26info\x3dview_SaleChanceView|id_" + f.id + '" id\x3d' + f.id + ' class\x3d"router j_component employee-item j_chance_detail"\x3e\x3ca class\x3d"j_chance" id\x3d' + f.id + "\x3e" + f.name + "\x3c/a\x3e\x3c/span\x3e");
                else if (null == b || 0 == b.length)
                    g = "",
                    g = null != a.find(".js_form-chance-add").get(0) ? '\x3cspan id\x3d"' + f.id + '" name\x3d"j_chance_detail" class\x3d"j_chance_detail j_component employee-item"\x3e\x3ca id\x3d"' + f.id + '" data-id\x3d"' + f.id + '" data-module\x3d"saleChance" class\x3d"entitybox-toggle j_chance" title\x3d"' + f.name + '"\x3e' + f.name + '\x3c/a\x3e\x3ca class\x3d"close js_deleteChance" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e' : '\x3cspan id\x3d"' + f.id + '" name\x3d"j_chance_detail" class\x3d"j_chance_detail j_component employee-item"\x3e\x3ca id\x3d"' + f.id + '" data-id\x3d"' + f.id + '" data-module\x3d"saleChance" class\x3d"entitybox-toggle j_chance" title\x3d"' + f.name + '"\x3e' + f.name + "\x3c/a\x3e\x3c/span\x3e";
                else {
                    g = a.find(".j_chance_detail_clone .j_chance_detail").clone();
                    g.attr("id", f.id).attr("data-value", f.id).attr("data-id", f.id);
                    g.find(".j_chance").attr("id", f.id).text(f.name).attr("data-original-title", f.name);
                    for (var h = 0; h < b.length; h++) {
                        var l = b[h]
                          , m = a.find(".j_chance_detail_clone .j_field").clone();
                        m.attr("id", l);
                        m.find(".j_field_title").text(this.basefields[l]);
                        var n = "";
                        if ("manager" == l)
                            n = f[l] ? f[l].username : "",
                            m.find(".j_field_value").prop("title", n).text(n);
                        else if ("saleStage" == l)
                            n = f.stageName,
                            m.find(".j_field_value").prop("title", n).text(n);
                        else if ("saleSource" == l)
                            n = f.sourceName,
                            m.find(".j_field_value").prop("title", n).text(n);
                        else if ("saleType" == l)
                            n = f.typeName,
                            m.find(".j_field_value").prop("title", n).text(n);
                        else if ("customer" == l)
                            n = f[l] ? f[l].name : "",
                            m.find(".j_field_value").prop("title", n).text(n);
                        else if ("money" == l || "winRate" == l || "remark" == l)
                            n = f[l] ? f[l] : "",
                            m.find(".j_field_value").prop("title", n).text(n);
                        else if ("orderTime" == l)
                            l = f[l] ? f[l] : "",
                            "" != l && null != l && (l = Date.create(l).format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}")),
                            m.find(".j_field_value").prop("title", l).text(l);
                        else
                            continue;
                        g.find(".j_part .j_line").append(m)
                    }
                    var A = {};
                    if (f.formDataId && this.componentSetup.cusCustomFields) {
                        m = [];
                        for (h = 0; h < this.componentSetup.cusCustomFields.length; h++)
                            l = this.componentSetup.cusCustomFields[h],
                            m.push(l.substring(0, l.indexOf("_")));
                        h = {};
                        h.formDataId = f.formDataId;
                        h.module = "saleChance";
                        h.fieldIds = m;
                        $.ajax({
                            contentType: "application/json",
                            type: TEAMS.ajaxMethod,
                            async: !1,
                            data: JSON.stringify(h),
                            dataType: "json",
                            url: "freeform/findAllFormDataFields.json",
                            success: function(a) {
                                if (a && a.formData && a.formData.dataDetails)
                                    for (var c = 0; c < a.formData.dataDetails.length; c++) {
                                        var e = a.formData.dataDetails[c]
                                          , b = e.content;
                                        !b && e.dataText && (b = e.dataText.content);
                                        if (!b && 0 < e.dataOptions.length) {
                                            for (var b = "", d = 0; d < e.dataOptions.length; d++)
                                                b += e.dataOptions[d].content + ",";
                                            b = b.substring(0, b.length - 1)
                                        }
                                        A[e.formField.id] = b
                                    }
                            }
                        })
                    }
                    if (this.componentSetup.cusCustomFields)
                        for (f = 0; f < this.componentSetup.cusCustomFields.length; f++)
                            h = this.componentSetup.cusCustomFields[f],
                            m = a.find(".j_chance_detail_clone .j_field").clone(),
                            m.attr("id", h.substring(0, h.indexOf("_"))),
                            m.find(".j_field_title").text(h.substring(h.indexOf("_") + 1, h.length)),
                            m.find(".j_field_value").prop("title", A[h.substring(0, h.indexOf("_"))]).text(A[h.substring(0, h.indexOf("_"))]),
                            g.find(".j_part .j_line").append(m);
                    null != a.find(".js_form-chance-add").get(0) && g.find(".j_title").append('\x3ca class\x3d"close js_deleteChance" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e')
                }
                a.find(".js_chanceitem_container").append(g)
            }
        },
        empty: function(c) {
            c.find(".js_chanceitem_container").html("")
        },
        readOnly: function(c, a) {
            var b = this.componentSetup.fieldId + this.cid
              , d = c.find('div[id\x3d"' + b + '"] span[name\x3d"js_form-chance-add"]')
              , f = c.find('div[id\x3d"' + b + '"] .js_chanceitem_container .j_chance_detail')
              , g = c.find('div[id\x3d"' + b + '"] .js_deleteChance');
            a ? (d.remove(),
            g.remove()) : d && 0 != d.length && null != d || (d = $(this.tpl).siblings("#preview-form").find('span[name\x3d"js_form-chance-add"]'),
            c.find('div[id\x3d"' + b + '"]').find(".js_chanceitem_container").after(d),
            f.find(".j_title").append('\x3ca class\x3d"close js_deleteChance" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e'))
        }
    });
    u.exports = window.ChanceComponent
});

define("form/component/piecomponent", ["form/component", "form/tplutil"], function(n, y, u) {
    y = n("form/component");
    var m = n("form/tplutil");
    window.PieComponent = y.extend({
        initialize: function(h) {
            this.componentSetup = {
                componentKey: "PieComponent",
                title: "\u997c\u56fe",
                titleLayout: "field-hoz",
                order: 0,
                index: 0,
                fieldId: "",
                dataSetId: ""
            };
            null != h && (this.componentSetup.title = h.title,
            this.componentSetup.order = h.order,
            this.componentSetup.index = h.index,
            this.componentSetup.fieldId = h.fieldId,
            this.componentSetup.dataSetId = h.dataSetId);
            this.tpl = m.get("pie")
        },
        setTitle: function(h) {
            this.componentSetup.title = h
        },
        setTitleLayout: function(h) {
            this.componentSetup.titleLayout = h
        },
        setRelatDataTableId: function(h) {
            this.componentSetup.tableId = h
        },
        setRelatDataUnitId: function(h) {
            this.componentSetup.colId = h
        },
        setIsOrgtiqu: function(h) {
            this.componentSetup.isOrgtiqu = h
        },
        setIsOrgtiqulist: function(h) {
            this.componentSetup.isOrgtiqulist = h
        },
        setDataSetId: function(h) {
            this.componentSetup.dataSetId = h
        },
        render: function(h) {
            var g = $(this.tpl).siblings("#form-pie");
            h.attr("class", g.attr("class"));
            h.html(g.html())
        },
        renderEditor: function() {
            var h = this, g;
            h.statFields ? h.renderEditorValue() : this.componentmodel.getFormSelectFields(function(f) {
                g = $(_.template(h.tpl, f)).siblings("#editor-pie");
                h.statFields = f;
                null != f.statfields && 0 < f.statfields.length && (h.componentSetup.dataSetId = h.componentSetup.dataSetId ? h.componentSetup.dataSetId : f.statfields[0].fieldId);
                h.el = g;
                h.renderEditorValue()
            })
        },
        renderEditorValue: function() {
            var h = this.el;
            h.find("#component-title").attr("value", this.componentSetup.title);
            $("#editor-component").html(h.html());
            var g = $("#component-dataset");
            $.each(this.statFields.statfields, function() {
                var f = g.find("option:first").clone().show();
                f.val(this.fieldId).text(this.title);
                g.append(f)
            });
            $("#editor-component").find("#component-dataset").val(this.componentSetup.dataSetId)
        },
        renderPreview: function(h, g, f) {
            var d = this;
            g = $(this.tpl).siblings("#preview-pie");
            h.append(g);
            this.viewcon = g;
            this.componentmodel.getFieldStat(this.componentSetup.dataSetId, function(b) {
                d.renderpieView(d, b.fieldChartStatData)
            })
        },
        renderpieView: function(h, g) {
            var f = []
              , d = [];
            h = this;
            for (var b, c = 0, l = g.length; c < l; c++)
                f.push(g[c].name),
                d.push({
                    value: g[c].total,
                    name: g[c].name
                });
            b = {
                title: {
                    text: h.componentSetup.title,
                    x: "center"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} \x3cbr/\x3e{b} : {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    x: "left",
                    data: f
                },
                toolbox: {
                    show: !0,
                    feature: {
                        magicType: {
                            show: !1,
                            type: ["pie"]
                        },
                        restore: {
                            show: !0
                        },
                        saveAsImage: {
                            show: !0
                        }
                    }
                },
                calculable: !0,
                series: [{
                    name: "\u6b21\u6570",
                    type: "pie",
                    radius: "55%",
                    center: ["50%", "60%"],
                    data: d
                }]
            };
            n.async("https://static.smartheer.cn/js/echarts.min.js", function() {
                var c = h.viewcon.find(".pieview");
                this.pieChart = echarts.init(c.get(0));
                this.pieChart.setOption(b)
            })
        },
        renderEditPreview: function(h) {
            var g = $(this.tpl).siblings("#form-pie");
            g.attr("id", this.componentSetup.fieldId);
            g.data("componentData", this);
            g.addClass(this.componentSetup.titleLayout);
            h.append(g)
        },
        renderStatSearch: function(h) {
            var g = $(this.tpl).siblings("#statsearch-text")
              , f = h.value;
            f && g.find("input").val(f);
            (f = h.term) && g.find("select:first option[value\x3d" + f + "]").attr("selected", "true");
            h = h.parentEl;
            h.attr("class", "sch-group j_formFieldSearchGroup");
            h.find(".j_formField-condition").html(g)
        },
        submitCheck: function(h, g) {},
        checkEvents: function(h) {},
        check: function(h) {},
        getValue: function(h, g) {},
        setValue: function(h, g) {},
        empty: function(h) {},
        readOnly: function(h, g) {}
    });
    u.exports = window.PieComponent
});
define("form/component/contactlist", ["form/tplutil"], function(n, y, u) {
    var m = n("form/tplutil");
    n = Backbone.View.extend({
        initialize: function() {},
        render: function(h, g) {
            "pc" == h ? this.initPC.init(g) : this.initMb.init(g)
        },
        initPC: {
            init: function(h) {
                this.el = "#contact_list";
                this.targetEl = h.targetEl;
                this.isUnique = h.isUnique;
                this.seletedList = h.seletedList;
                this.selectColumn = h.selectColumn;
                this.linkedIds = h.linkedIds;
                this.order = h.order;
                this.fileds = [{
                    title: "\u521b\u5efa\u65f6\u95f4",
                    position: "left"
                }, {
                    title: "\u8054\u7cfb\u4eba\u540d\u79f0",
                    position: "left"
                }];
                this.tpl = m.get("contactlist");
                $("body").append($(this.tpl));
                this.render();
                this.delegateEvents()
            },
            delegateEvents: function() {
                var h = this
                  , g = $(h.el);
                g.off(".ContactList");
                g.on("keyup.ContactList", ".j_search-input", function(f) {
                    13 === f.keyCode && g.find(".j_search-btn").trigger("click")
                });
                g.on("click.ContactList", ".j_search-btn", function() {
                    $(this).hasClass("locked") || ($(this).addClass("locked"),
                    h.queryContact(1))
                });
                g.on("click.ContactList", ".j_btn-cancel", function() {
                    h.close()
                });
                g.on("click.ContactList", ".j_closelist", function() {
                    h.close()
                });
                g.on("click.ContactList", ".j_btn-ok", function() {
                    for (var f = [], d = g.find(".j_opt .j_select .j_select_data"), b = 0; b < d.length; b++) {
                        var c = $(d[b]).data("contact");
                        f.push(c)
                    }
                    $(h.targetEl).trigger("entitySelected", f);
                    h.close()
                });
                g.on("click.ContactList", "tbody tr", function() {
                    var f = $(this)
                      , d = $(this).data("contact")
                      , b = $(this).attr("id")
                      , c = $(this).find(".j_contactName").text();
                    f.hasClass("active") ? ($(this).find('input[name\x3d"contactselect"]').prop("checked", !1),
                    $(this).removeClass("active"),
                    $(this).find('input[name\x3d"contactselect"]').css("display", ""),
                    g.find(".j_opt .j_select").find("#" + b).remove()) : ($(this).find('input[name\x3d"contactselect"]').prop("checked", !0),
                    $(this).addClass("active"),
                    $(this).find('input[name\x3d"contactselect"]').css("display", "inline-block"),
                    0 == g.find(".j_opt .j_select").find("#" + b).length && (g.find(".j_opt .j_select").append('\x3ca class\x3d"j_select_data" id\x3d"' + b + '"\x3e' + c + "\x3c/a\x3e"),
                    g.find(".j_opt .j_select").find("#" + b).data("contact", d)));
                    if (1 == h.isUnique || "true" == h.isUnique)
                        $(h.targetEl).trigger("entitySelected", d),
                        h.close()
                });
                g.on("click.ContactList", ".page-first", function() {
                    $(this).hasClass("disabled") || h.queryContact(1)
                });
                g.on("click.ContactList", ".page-pre:not(.disabled)", function() {
                    if (!$(this).hasClass("disabled")) {
                        var f = $(h.el).find(".pagination").data("page");
                        h.queryContact(f.pageNo - 1)
                    }
                });
                g.on("click.ContactList", ".page-next:not(.disabled)", function() {
                    if (!$(this).hasClass("disabled")) {
                        var f = $(h.el).find(".pagination").data("page");
                        h.queryContact(f.pageNo + 1)
                    }
                });
                g.on("click.ContactList", ".pagination .page-last", function() {
                    if (!$(this).hasClass("disabled")) {
                        var f = $(h.el).find(".pagination").data("page");
                        h.queryContact(f.totalPages)
                    }
                });
                g.on("hidden.bs.modal.ContactList", function() {
                    h.remove()
                })
            },
            render: function() {
                var h = this;
                formPlugin.destroyLayout(".eui-scroll.statbody");
                h.renderSelect(h.seletedList);
                h.queryContact(1);
                $(h.el).find(".eui-scroll.statbody").mCustomScrollbar({
                    theme: "darkblue",
                    scrollButtons: {
                        enable: !1
                    },
                    callbacks: {
                        onTotalScroll: function() {
                            var g = parseInt(h.pageNo) + 1;
                            g && !$(".eui-scroll.statbody").hasClass("lock") && ($(".eui-scroll.statbody").addClass("lock"),
                            h.queryContact(g, function(f) {
                                $(".eui-scroll.statbody").removeClass("lock")
                            }))
                        },
                        onTotalScrollOffset: 20,
                        alwaysTriggerOffsets: !1
                    }
                });
                $(h.el).modal()
            },
            renderSelect: function(h) {
                for (var g = $(this.el), f = 0; f < h.length; f++) {
                    var d = h[f];
                    0 == g.find(".j_opt .j_select").find("#" + d.id).length && (g.find(".j_opt .j_select").append('\x3ca class\x3d"j_select_data" id\x3d"' + d.id + '"\x3e' + d.name + "\x3c/a\x3e"),
                    g.find(".j_opt .j_select").find("#" + d.id).data("contact", d.contact))
                }
            },
            queryContact: function(h, g) {
                $(".j_page").hide();
                var f = this
                  , d = $(f.el).find(".j_search-btn")
                  , b = $(f.el);
                $(f.el).find("#more_data").hide();
                var c = {}
                  , l = $.trim(b.find(".j_search-input").val())
                  , b = b.find(".j_search-input").attr("placeholder");
                if (l != b) {
                    1 == h && $(f.el).find("#stat_table tbody").empty();
                    var b = ""
                      , e = "desc";
                    f.order && (b = f.order.property,
                    e = f.order.direction);
                    e = {
                        pageNo: h,
                        pageSize: 20,
                        orderBy: b,
                        orderWay: e,
                        conditions: [{
                            id: "username",
                            type: "string",
                            operate: "like",
                            value: l
                        }]
                    };
                    b = "";
                    b = f.linkedIds;
                    if (null != b && 0 < b.length) {
                        for (var e = "", a = 0; a < b.length; a++)
                            e = e + b[a] + ",";
                        e = e.substring(0, e.length - 1);
                        c.customerIds = e;
                        c.keyword = l;
                        f.order && (l = f.order.property,
                        "createTime" == l && (l = "createtime"),
                        "updateTime" == l && (l = "updatetime"),
                        c.property = l,
                        c.direction = f.order.direction);
                        b = "/mobile/contact/getCustomersContacts"
                    } else
                        b = "/contact/search",
                        c.queryStr = JSON.stringify(e),
                        c.userId = TEAMS.currentUser.id;
                    $.ajax({
                        type: TEAMS.ajaxMethod,
                        url: b,
                        dataType: "json",
                        data: c,
                        success: function(a) {
                            if (!a || !a.message || 0 == a.message.code) {
                                var c = {};
                                h = parseInt(h);
                                c.result = a.data;
                                c.pageNo = h;
                                c.pageSize = 20;
                                a = a.recordsTotal ? a.recordsTotal : a.data.length;
                                c.totalCount = a;
                                c.hasPre = 1 <= h - 1;
                                var e = parseInt(a / 20);
                                0 < a % 20 && e++;
                                c.totalPages = e;
                                c.hasNext = h + 1 <= e;
                                f.renderContact(c, g);
                                f.pageNo = c.pageNo;
                                d.removeClass("locked")
                            }
                        }
                    })
                }
            },
            renderContact: function(h, g) {
                var f = $(this.el);
                $(this.el).find("#list-loading").hide();
                if (1 == h.pageNo) {
                    if (null == h.result || 1 > h.result.length) {
                        $(this.el).find(".j_contact_empty").removeClass("hide");
                        return
                    }
                    $(this.el).find(".j_contact_empty").addClass("hide")
                }
                var d = this.selectColumn;
                null == d && (d = []);
                $(this.el).find("#statbody").show();
                if (0 == f.find("#stat_table thead tr th").length) {
                    for (var b = f.find("#stat_table thead tr"), c = 0; c < d.length; c++) {
                        var l = d[c]
                          , e = l.substring(0, l.indexOf("_"))
                          , a = l.substring(l.indexOf("_") + 1);
                        b.append("\x3cth title\x3d'" + a + "'\x3e\x3cdiv\x3e" + a + "\x3c/div\x3e\x3c/th\x3e")
                    }
                    for (c = 0; c < this.fileds.length; c++)
                        a = this.fileds[c],
                        "left" === a.position && b.prepend("\x3cth title\x3d'" + a.title + "'\x3e\x3cdiv\x3e" + a.title + "\x3c/div\x3e\x3c/th\x3e");
                    b.prepend("\x3cth\x3e\x3c/th\x3e")
                }
                b = h.result;
                if (null != b && 0 != b.length) {
                    for (c = 0; c < b.length; c++) {
                        var a = b[c]
                          , k = a.id
                          , e = a.username
                          , l = Date.create(a.createTime).format("{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}");
                        if (!(0 < f.find("#stat_table tr").find("#" + k).length)) {
                            var m = $("\x3ctr style\x3d'cursor:pointer;' id\x3d" + k + "\x3e\x3c/tr\x3e");
                            m.data("contact", a);
                            m.append('\x3ctd\x3e\x3cdiv class\x3d"sn"\x3e' + ((h.pageNo - 1) * h.pageSize + c + 1) + '\x3c/div\x3e\x3cdiv class\x3d"checkbox-div"\x3e\x3cinput name\x3d"contactselect" type\x3d"checkbox"\x3e\x3c/input\x3e\x3c/div\x3e\x3c/td\x3e');
                            m.append("\x3ctd class\x3d'j_contactName noSub_name_" + k + "'\x3e" + e + "\x3c/td\x3e");
                            m.append("\x3ctd class\x3d'j_createTime noSub_name_" + k + "'\x3e" + l + "\x3c/td\x3e");
                            for (var n = 0; n < d.length; n++)
                                l = d[n],
                                e = l.substring(0, l.indexOf("_")),
                                l.substring(l.indexOf("_") + 1),
                                l = a[e] ? a[e] : "",
                                m.append("\x3ctd class\x3d'j_column' id\x3d'" + e + "' title\x3d'" + l + "'\x3e" + l + "\x3c/td\x3e");
                            f.find("#stat_table tbody").append(m);
                            0 < f.find(".j_opt .j_select").find("#" + k).length && (f.find("#stat_table tbody").find('tr[id\x3d"' + k + '"]').find('input[name\x3d"contactselect"]').prop("checked", !0).css("display", "inline-block"),
                            f.find("#stat_table tbody").find('tr[id\x3d"' + k + '"]').addClass("active"))
                        }
                    }
                    h.result.length && h.result.length == h.pageSize && g && g()
                }
            },
            close: function() {
                $(this.el).modal("hide")
            },
            remove: function() {
                var h = $(this.el);
                h.modal("hide");
                h.off(".ContactList");
                h.remove()
            }
        }
    });
    u.exports = n
});
define("form/component/signaturecomponent", ["form/editablecomponent", "form/tplutil", "form/componentmodel", "form/component/imageviewer", "form/component/signcomview"], function(m, y, w) {
    var k = m("form/editablecomponent")
      , e = m("form/tplutil")
      , d = m("form/componentmodel")
      , a = m("form/component/imageviewer")
      , b = m("form/component/signcomview");
    window.SignatureComponent = k.extend({
        initialize: function(c) {
            k.prototype.initialize.call(this, c);
            var f = {
                componentKey: "SignatureComponent",
                title: "\u7b7e\u540d",
                formId: "",
                size: ""
            };
            null != c && (f.title = c.title,
            f.formId = c.formId);
            this.componentSetup = $.extend(this.componentSetup, f);
            this.tpl = e.get("signaturecomponent", {
                isMobileForm: this.isMobileForm
            });
            this.componentModel = new d
        },
        render: function(c) {
            var f = $(this.tpl).siblings("#form-signature");
            this.componentSetup.formId = $("#formId").val();
            k.prototype.render.call(this, c, f);
            c.html(f.html())
        },
        renderEditPreview: function(c) {
            var f = $(this.tpl).siblings("#form-signature");
            k.prototype.renderEditPreview.call(this, c, f);
            c.append(f)

        },
        renderEditor: function() {
            var c = $(this.tpl).siblings("#editor-signature");
            k.prototype.renderEditor.call(this, c);
            $("#editor-component").html(c.html())
        },
        renderPreview: function(c, f, a, g, h) {
            g = $(this.tpl);
            var b = null;
            this.el = c;
            (b = $("body").find("#formTenantKey").val()) ? b = b.toUpperCase() : null != TEAMS.currentTenant && (b = TEAMS.currentTenant.tenantKey.toUpperCase());
            $("body").find("#scanReport").val() || null != TEAMS.currentUser && TEAMS.currentTenant.tenantKey.toUpperCase() == b ? b = "mobile" != window.systemInfo_form ? g.siblings("#preview-signature") : g.siblings("#mobile-preview") : (b = g.siblings("#nosign-preview"),
            b.find(".field_message_js").attr("cid", this.cid));
            b.attr("cid", this.cid);
            b.find(".check_js").attr("curmodule", h);
            this.el = c;
            k.prototype.renderPreview.call(this, c, f, a, b);
            c.append(b);
            if ("true" == this.componentSetup.isReadOnly || 1 == this.componentSetup.isReadOnly)
                this.readOnly(b, !0),
                this.isReadOnly = !0;
            a ? "mobile" == window.systemInfo_form && (b.find(".j_readOnly").removeClass("hide"),
            b.find(".widget-content").css("margin", "0px")) : "mobile" == window.systemInfo_form && (b.find(".j_readOnly").addClass("hide"),
            b.find(".widget-content").css("margin", "-5px"));
            this.isMobileForm && this.calcImgHeight()
        },
        calcImgHeight: function() {
            var c = ($(window).width() - 20) / 3
              , f = this.componentSetup.fieldId || this.componentSetup.tempId;
            this.el.find("#field_" + f + "[cid\x3d" + this.cid + "] .j_signaddwrap").height(c);
            this.el.find("#field_" + f + "[cid\x3d" + this.cid + "] .j_imageItem").height(c - 10)
        },
        checkEvents: function(c, f) {
            var l = this
              , g = l.el || $(document)
              , h = l.componentSetup.fieldId || l.componentSetup.tempId
              , n = l.componentSetup.formId
              , p = "";
            TEAMS.currentUser && (p = TEAMS.currentUser.username);
            var d = Date.create(new Date).format("{yyyy}/{MM}/{dd}");
            "mobile" != window.systemInfo_form ? (g.on("click", "#field_" + h + "[cid\x3d" + l.cid + "] .j_addSign", function(g) {
                g = $(this);
                (new b).render("pc", {
                    preEl: g,
                    formId: n
                })
            }),
            g.on("signatureSave", "#field_" + h + "[cid\x3d" + l.cid + "] .j_addSign", function(f, c, a) {
                f = g.find("#field_" + h + "[cid\x3d" + l.cid + "] .j_signContainer");
                a = c.fileObj.id;
                c = c.fileObj.name;
                a = $('\x3cdiv id\x3d"' + a + '" class\x3d"img-item j_imageItem"\x3e\x3cdiv class\x3d"img-box"\x3e\x3ca type\x3d"image" class\x3d"gallery-pic" onclick\x3d"$.openPhotoGallery(this)" imghref\x3d"'+TEAMS.api.downImgUrl+'/' + a + '?module\x3dform"\x3e\x3cimg src\x3d"'+TEAMS.api.downImgUrl+'/' + a + '?module\x3dform" imageId\x3d"' + a + '"\x3e\x3c/div\x3e\x3cdiv class\x3d"img-opt"\x3e\x3ca class\x3d"delet"\x3e\x3ci class\x3d"icon-minus-sign j_deleteImage"\x3e\x3c/i\x3e\x3c/a\x3e\x3c/div\x3e\x3cdiv class\x3d"img-info"\x3e\x3cspan\x3e' + p + "\x3c/span\x3e\x3cspan\x3e" + d + "\x3c/span\x3e\x3c/div\x3e\x3c/div\x3e");
                a.data("name", c);
                f.empty().append(a);
                f.triggerHandler("changeVaule");
                g.find("#field_" + h + "[cid\x3d" + l.cid + "] .j_signaddwrap").addClass("hide")
            }),
            g.on("signatureSave_E", "#field_" + h + "[cid\x3d" + l.cid + "] .j_addSign", function(f, c) {
                var a = g.find("#field_" + h + "[cid\x3d" + l.cid + "] .j_signContainer")
                  , b = c.imageId
                  , e = c.name
                  , b = $('\x3cdiv id\x3d"' + b + '" class\x3d"img-item j_imageItem"\x3e\x3cdiv class\x3d"img-box"\x3e\x3ca type\x3d"image" class\x3d"gallery-pic" onclick\x3d"$.openPhotoGallery(this)" imghref\x3d"'+TEAMS.api.downImgUrl+'/' + '?module\x3dform"\x3e\x3cimg src\x3d"'+TEAMS.api.downImgUrl+'/' + b  + '?module\x3dform" imageId\x3d"' + b + '"\x3e\x3c/div\x3e\x3cdiv class\x3d"img-opt"\x3e\x3ca class\x3d"delet"\x3e\x3ci class\x3d"icon-minus-sign j_deleteImage"\x3e\x3c/i\x3e\x3c/a\x3e\x3c/div\x3e\x3cdiv class\x3d"img-info"\x3e\x3cspan\x3e' + p + "\x3c/span\x3e\x3cspan\x3e" + d + "\x3c/span\x3e\x3c/div\x3e\x3c/div\x3e");
                b.data("name", e);
                a.empty().append(b);
                a.triggerHandler("changeVaule");
                g.find("#field_" + h + "[cid\x3d" + l.cid + "] .j_signaddwrap").addClass("hide")
            }),
            g.on("click", "#field_" + h + "[cid\x3d" + l.cid + "] .j_signContainer .j_deleteImage", function(f, c, a) {
                $(this).parents(".j_imageItem").remove();
                g.find("#field_" + h + "[cid\x3d" + l.cid + "] .j_signContainer").triggerHandler("changeVaule");
                g.find("#field_" + h + "[cid\x3d" + l.cid + "] .j_signaddwrap").removeClass("hide")
            })) : (g.parents(".page-view").on("click", function(h) {
                null == $(h.target).parents(".j_quicktools").get(0) && null == $(h.target).closest(".j_quicktools").get(0) && g.find(".j_quicktools").hide()
            }),
            g.on("tap", "#field_" + h + "[cid\x3d" + l.cid + "] .j_imageItem", function(g) {
                $(this).find(".j_quicktools").show()
            }),
            g.on("tap", "#field_" + h + "[cid\x3d" + l.cid + "] .j_imageView", function(g) {
                g = $(this).attr("imageid");
                (new a({
                    preEl: $(this).parents(".j_page-view"),
                    imageId: g,
                    imageUrl: TEAMS.api.downImgUrl+"/" + g
                })).render()
            }),
            g.on("tap", "#field_" + h + "[cid\x3d" + l.cid + "] .j_m_deleteImage", function(f) {
                var c = $(this);
                formPlugin.confirm("\u786e\u5b9a\u8981\u5220\u9664\u5417\uff1f", function(f) {
                    var a = c.parents(".j_imageItem");
                    f && (a.remove(),
                    formPlugin.notify("\u6570\u636e\u5df2\u5220\u9664"),
                    g.find("#field_" + h + "[cid\x3d" + l.cid + "] .j_signContainer").triggerHandler("changeVaule"),
                    $(document).find("#field_" + h + "[cid\x3d" + l.cid + "] .j_signaddwrap").show())
                })
            }),
            g.on("click", "#field_" + h + "[cid\x3d" + l.cid + "] .j_addSign", function(g) {
                parent = $(this).parents(".j_page-view");
                window.client = "mobileWeb";
                g = $('\x3cdiv id\x3d"signiframe" fieldId\x3d"' + h + '" cid\x3d"' + l.cid + '" class\x3d"j_signiframe sign-iframe"\x3e\x3ciframe style\x3d"position:absolute;width:100%;height:100%;"\x3e\x3c/iframe\x3e\x3c/div\x3e');
                g.find("iframe").attr("src", TEAMS.service.form + "/signcom.html");
                parent.addClass("hide j_currentView");
                parent.after(g)
            }),
            $("body").on("signatureSave", "#field_" + h + "[cid\x3d" + l.cid + "]", function(g, f, c) {
                g = $(document).find("#field_" + h + "[cid\x3d" + l.cid + "] .j_signContainer");
                c = f.fileObj.id;
                f = f.fileObj.name;
                c = $('\x3cdiv id\x3d"' + c + '" class\x3d"img-item j_imageItem"\x3e' + ('\x3cdiv class\x3d"form-quick-tools j_quicktools"\x3e\x3ca imageid\x3d"' + c + '" formid\x3d"' + n + '" class\x3d"preview j_imageView"\x3e\x3ci class\x3d"graph"\x3e\x3c/i\x3e\x3cspan\x3e\u9884\u89c8\x3c/span\x3e\x3c/a\x3e\x3ca class\x3d"j_m_deleteImage delete"\x3e\x3ci class\x3d"graph"\x3e\x3c/i\x3e\x3cspan\x3e\u5220\u9664\x3cspan\x3e\x3c/a\x3e\x3c/div\x3e') + '\x3cdiv class\x3d"img-box"\x3e\x3cimg src\x3d"'+TEAMS.api.downImgUrl+'/' + c + '?module\x3dform"\x3e\x3c/div\x3e\x3cdiv class\x3d"img-info"\x3e\x3cspan\x3e' + p + "\x3c/span\x3e\x3cspan\x3e" + d + "\x3c/span\x3e\x3c/div\x3e\x3c/div\x3e");
                c.data("name", f);
                g.empty().append(c);
                g.triggerHandler("changeVaule");
                $(document).find(".j_page-view.j_currentView").removeClass("hide j_currentView");
                $(document).find("#signiframe[fieldId]").remove();
                l.calcImgHeight();
                $(document).find("#field_" + h + "[cid\x3d" + l.cid + "] .j_signaddwrap").hide()
            }),
            $("body").on("signatureSave_e", "#field_" + h + "[cid\x3d" + l.cid + "]", function(g, f) {
                var c = $(document).find("#field_" + h + "[cid\x3d" + l.cid + "] .j_signContainer")
                  , a = f.imageId
                  , b = f.name
                  , a = $('\x3cdiv id\x3d"' + a + '" class\x3d"img-item j_imageItem"\x3e' + ('\x3cdiv class\x3d"form-quick-tools j_quicktools"\x3e\x3ca imageid\x3d"' + a + '" formid\x3d"' + n + '" class\x3d"preview j_imageView"\x3e\x3ci class\x3d"graph"\x3e\x3c/i\x3e\x3cspan\x3e\u9884\u89c8\x3c/span\x3e\x3c/a\x3e\x3ca class\x3d"j_m_deleteImage delete"\x3e\x3ci class\x3d"graph"\x3e\x3c/i\x3e\x3cspan\x3e\u5220\u9664\x3cspan\x3e\x3c/a\x3e\x3c/div\x3e') + '\x3cdiv class\x3d"img-box"\x3e\x3cimg src\x3d"'+TEAMS.api.downImgUrl+'/' + a + '?module\x3dform"\x3e\x3c/div\x3e\x3cdiv class\x3d"img-info"\x3e\x3cspan\x3e' + p + "\x3c/span\x3e\x3cspan\x3e" + d + "\x3c/span\x3e\x3c/div\x3e\x3c/div\x3e");
                a.data("name", b);
                c.empty().append(a);
                c.triggerHandler("changeVaule");
                $(document).find(".j_page-view.j_currentView").removeClass("hide j_currentView");
                $(document).find("#signiframe[fieldId]").remove();
                l.calcImgHeight();
                $(document).find("#field_" + h + "[cid\x3d" + l.cid + "] .j_signaddwrap").hide()
            }),
            window.closeSignView = function() {
                $(document).find(".j_page-view.j_currentView").removeClass("hide j_currentView");
                $(document).find("#signiframe[fieldId]").remove()
            }
            );
            if (this.isMobileForm)
                $(window).on("resize.imagecomponent", function() {
                    l.calcImgHeight()
                })
        },
        autoSaveEvents: function(c) {
            var f = this
              , a = f.el || $(document)
              , g = f.componentSetup.fieldId || f.componentSetup.tempId;
            $(document).find("#field_" + g + "[cid\x3d" + f.cid + "] .j_signContainer").on("changeVaule", function() {
                f.saveComponentValue($(this), c)
            });
            if ("mobile" != window.systemInfo_form)
                a.on("click", "#" + g + " .j_deleteImage", function() {
                    f.saveComponentValue(a.find("#" + g), c)
                })
        },
        check: function(c) {
            var f = $(c).find(".j_imageItem")
              , a = f.length
              , g = {};
            g.element = c;
            0 != a || "true" != this.componentSetup.required && 1 != this.componentSetup.required || (g.message = this.componentSetup.title + "\u4e0d\u80fd\u4e3a\u7a7a");
            f.each(function(h) {
                $(this).attr("id") || (g.message = "\u7b7e\u540d\u5c1a\u672a\u751f\u6210\uff0c\u8bf7\u8010\u5fc3\u7b49\u5f85")
            });
            return g
        },
        getValue: function(c, f) {
            var a = {
                formField: {
                    id: this.componentSetup.fieldId,
                    componentKey: "SignatureComponent"
                }
            }
              , g = c.find(".j_imageItem");
            if (0 < g.length) {
                var h = [];
                g.each(function(g) {
                    var f = $(this).attr("id")
                      , c = $(this).data("name");
                    h[g] = {
                        optionId: f,
                        content: c,
                        type: "imageFile"
                    }
                });
                a.dataOptions = h
            } else
                f || (a = null);
            return a
        },
        setValue: function(c, f) {
            var a = this.componentSetup.formId
              , g = this.componentSetup.fieldId
              , h = $(document).find("#field_" + g + "[cid\x3d" + this.cid + "] .j_signContainer");
            if (null != f && null != f.dataOptions) {
                c.find(".check_js").html("");
                for (var b = 0; b < f.dataOptions.length; b++) {
                    var p = f.dataOptions[b];
                    "string" == typeof p && (p = JSON.parse(p));
                    var d = null == p.content ? "" : p.content
                      , e = "";
                    if (d) {
                        var r = d.substring(9, 28) + ""
                          , s = Date.create(d.substring(28, 36) + "").format("{yyyy}/{MM}/{dd}")
                          , u = {};
                        u.userId = r;
                        $.ajax({
                            contentType: "application/json",
                            async: !1,
                            type: "post",
                            url: "/base/employee/queryByUserId.json",
                            dataType: "json",
                            data: JSON.stringify(u),
                            success: function(g) {
                                g.message && g.message || (g = g.employee) && g.username && (e = g.username)
                            }
                        })
                    }
                    p = p.optionId;
                    r = null;
                    "mobile" != window.systemInfo_form ? (r = window.systemInfo_print ? $('\x3cdiv id\x3d"' + p + '" imageid\x3d"' + p + '" class\x3d"img-item j_imageItem j_imgSizeChange"\x3e\x3cdiv class\x3d"img-box"\x3e\x3cimg id\x3d"' + p + '" count\x3d"1" imageid\x3d"' + p + '" src\x3d"'+TEAMS.api.downImgUrl+'/' + p + '"\x3e\x3c/div\x3e\x3cdiv class\x3d"img-opt"\x3e\x3ca class\x3d"delet"\x3e\x3ci class\x3d"icon-minus-sign j_deleteImage"\x3e\x3c/i\x3e\x3c/a\x3e\x3c/div\x3e\x3cdiv class\x3d"img-info"\x3e\x3cspan class\x3d"j_name"\x3e' + e + "\x3c/span\x3e\x3cspan\x3e" + s + "\x3c/span\x3e\x3c/div\x3e\x3c/div\x3e") : $('\x3cdiv id\x3d"' + p + '" class\x3d"img-item j_imageItem"\x3e\x3cdiv class\x3d"img-box"\x3e\x3ca type\x3d"image" class\x3d"gallery-pic" onclick\x3d"$.openPhotoGallery(this)" imghref\x3d"'+TEAMS.api.downImgUrl+'/' + p + "?imgFormat\x3dimage\x26refId\x3d" + a + '\x26module\x3dform"\x3e\x3cimg src\x3d"'+TEAMS.api.downImgUrl+'/' + p + "?imgFormat\x3dsmall\x26refId\x3d" + a + '\x26module\x3dform" imageId\x3d"' + p + '"\x3e\x3c/div\x3e\x3cdiv class\x3d"img-opt"\x3e\x3ca class\x3d"delet"\x3e\x3ci class\x3d"icon-minus-sign j_deleteImage"\x3e\x3c/i\x3e\x3c/a\x3e\x3c/div\x3e\x3cdiv class\x3d"img-info"\x3e\x3cspan\x3e' + e + "\x3c/span\x3e\x3cspan\x3e" + s + "\x3c/span\x3e\x3c/div\x3e\x3c/div\x3e"),
                    r.data("name", d),
                    $(document).find("#field_" + g + "[cid\x3d" + this.cid + "] .j_signaddwrap").addClass("hide"),
                    null == c.find(".j_signaddwrap").get(0) && r.find(".j_deleteImage").parent().remove()) : (r = $('\x3cdiv id\x3d"' + p + '" class\x3d"img-item j_imageItem"\x3e' + ('\x3cdiv class\x3d"form-quick-tools j_quicktools"\x3e\x3ca imageid\x3d"' + p + '" formid\x3d"' + a + '" class\x3d"preview j_imageView"\x3e\x3ci class\x3d"graph"\x3e\x3c/i\x3e\x3cspan\x3e\u9884\u89c8\x3c/span\x3e\x3c/a\x3e\x3ca class\x3d"j_m_deleteImage delete"\x3e\x3ci class\x3d"graph"\x3e\x3c/i\x3e\x3cspan\x3e\u5220\u9664\x3cspan\x3e\x3c/a\x3e\x3c/div\x3e') + '\x3cdiv class\x3d"img-box"\x3e\x3cimg src\x3d"'+TEAMS.api.downImgUrl+'/' + p),
                    r.data("name", d),
                    $(document).find("#field_" + g + "[cid\x3d" + this.cid + "] .j_signaddwrap").hide());
                    h.append(r)
                }
                this.isMobileForm && this.calcImgHeight()
            }
        },
        empty: function(c) {
            c.find(".j_imageItem").remove()
        },
        readOnly: function(c, f) {
            var a = c.find(".j_signaddwrap")
              , g = c.find(".j_signContainer.check_js");
            f && (a.remove(),
            "mobile" == window.systemInfo_form && c.find(".j_deleteImage").remove(),
            c.addClass("form-widget-readonly"),
            g.find(".j_imageItem .j_deleteImage").parent().html(""))
        }
    });
    w.exports = window.SignatureComponent
});
define("form/component/contactcomponent", "form/relatecomponent form/tplutil form/componentmodel form/component/contactlist form/component/entityselecter form/component/typeahead form/component/relevancecontrol form/abposview".split(" "), function(n, y, u) {
    var m = n("form/relatecomponent")
      , h = n("form/tplutil")
      , g = n("form/componentmodel")
      , f = n("form/component/contactlist")
      , d = n("form/component/entityselecter")
      , b = n("form/component/typeahead")
      , c = n("form/component/relevancecontrol")
      , l = n("form/abposview");
    window.ContactComponent = m.extend({
        initialize: function(c) {
            m.prototype.initialize.call(this, c);
            var a = {
                componentKey: "ContactComponent",
                title: "\u5ba2\u6237\u8054\u7cfb\u4eba",
                showfields: [],
                cusCustomFields: [],
                isLinkCustomer: !1,
                relvCustomer: "",
                newSortColumn: [],
                selectColumn: [],
                orderContent: ""
            };
            null != c && (a.title = c.title,
            a.showfields = c.showfields,
            a.isLinkCustomer = c.isLinkCustomer,
            a.relvCustomer = c.relvCustomer,
            a.newSortColumn = c.newSortColumn,
            a.selectColumn = c.selectColumn,
            a.orderContent = c.orderContent,
            a.cusCustomFields = c.cusCustomFields);
            this.componentSetup = $.extend(this.componentSetup, a);
            this.basefields = {
                title: "\u5934\u8854",
                call: "\u79f0\u547c",
                telephone: "\u7535\u8bdd",
                mobile: "\u624b\u673a",
                email: "\u90ae\u4ef6"
            };
            this.tpl = h.get("contactcomponent", {
                isMobileForm: this.isMobileForm
            });
            this.componentModel = new g
        },
        setCusCustomFields: function(c) {
            this.componentSetup.cusCustomFields = c
        },
        setShowfields: function(c) {
            this.componentSetup.showfields = c
        },
        setIsLinkCustomer: function(c) {
            this.componentSetup.isLinkCustomer = c
        },
        setRelvCustomer: function(c) {
            this.componentSetup.relvCustomer = c
        },
        setNewSortColumn: function(c) {
            this.componentSetup.newSortColumn = c
        },
        setSelectColumn: function(c) {
            this.componentSetup.selectColumn = c
        },
        setOrderContent: function(c) {
            this.componentSetup.orderContent = c
        },
        render: function(c) {
            var a = this
              , b = $(this.tpl).siblings("#form-contact");
            b.find(".widget-title .widget-title_js").text(this.componentSetup.title);
            "true" != this.componentSetup.required && 1 != this.componentSetup.required || b.find(".widget-title .widget-required_js").text(" *");
            "" != this.componentSetup.describe && (b.find(".field-description").text(this.componentSetup.describe),
            b.find(".field-description").show());
            c.attr("class", b.attr("class"));
            c.addClass(this.componentSetup.titleLayout);
            if (1 == c.parents("div[componentKey\x3d'TableLayout']").length || 1 == c.parents("div[componentKey\x3d'ColumnPanel']").length)
                c.removeClass("field-hoz"),
                this.componentSetup.titleLayout = "";
            this.componentModel.generatorId(function(b) {
                a.componentSetup.tempId = b.generatorId;
                c.attr("tempId", b.generatorId)
            });
            c.html(b.html())
        },
        renderEditPreview: function(c, a) {
            var b = $(this.tpl).siblings("#form-contact");
            m.prototype.renderEditPreview.call(this, c, b);
            a ? c.replaceWith(b) : c.append(b)
        },
        renderEditor: function() {
            var c = this
              , a = $(this.tpl).siblings("#editor-contact");
            a.find(".j_default_container").attr("id", this.componentSetup.fieldId + this.cid);
            "true" != this.componentSetup.isUnique && 1 != this.componentSetup.isUnique || a.find("#isUnique").attr("checked", "true");
            m.prototype.renderEditor.call(this, a);
            var d = !1;
            if ("true" == this.componentSetup.isLinkCustomer || 1 == this.componentSetup.isLinkCustomer) {
                var d = !0
                  , f = this.componentSetup.relvCustomer;
                null != f && (this.renderAllCustomer(a),
                a.find(".j_customer_link").find("option[value\x3d'" + f + "']") && a.find(".j_customer_link").find("option[value\x3d'" + f + "']").attr("selected", !0))
            }
            a.find("#isLinkCustomer").attr("checked", d);
            if (1 == $("#widget-control .field-active").parents("div[componentKey\x3d'TableLayout']").length || 1 == $("#widget-control .field-active").parents("div[componentKey\x3d'ColumnPanel']").length)
                $("#widget-control .field-active").removeClass("field-hoz"),
                this.componentSetup.titleLayout = "";
            c.getFormIdByModule("contact", a);
            a.find(".j_showField .j_contact-field-ul").empty();
            if ((f = this.componentSetup.showfields) && 0 < f.length) {
                for (d = 0; d < f.length; d++) {
                    var g = f[d]
                      , h = a.find(".j_clone .j_contact-field-li").clone();
                    h.find("#" + g).attr("selected", "selected");
                    a.find(".j_showField .j_contact-field-ul").append(h)
                }
                a.find(".j_showField").removeClass("hide");
                a.find(".j_batch_edit").removeClass("hide");
                a.find(".j_cardConf").addClass("hide")
            }
            $("#editor-component").html(a.html());
            new b({
                remote: "/contact/search",
                entity: "contact",
                changeValue: function() {
                    c.setDefaultValue()
                }
            });
            if ((a = this.componentSetup.content) && 0 < a.length)
                for (f = $("#editor-component").find(".js_entity_container"),
                d = 0; d < a.length; d++)
                    g = {
                        id: a[d].optionId,
                        name: a[d].content
                    },
                    h = $('\x3cspan name\x3d"js_entity_item" class\x3d"js_entity_item j_component employee-item"\x3e\x3ca data-id\x3d"' + g.id + '" data-module\x3d"" id\x3d"' + g.id + '" class\x3d"entitybox-toggle" title\x3d"' + g.name + '"\x3e' + g.name + '\x3c/a\x3e\x3ca class\x3d"close js_deleteItem" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e'),
                    h.data("obj", g),
                    f.append(h)
        },
        getFormIdByModule: function(c, a) {
            var b = this;
            $.ajax({
                type: TEAMS.ajaxMethod,
                dataType: "json",
                async: !1,
                url: TEAMS.api.getFormId,
                data: {
                    module: c
                },
                success: function(d) {
                    (d = d.data) && b.getFieldsByFormId(d, c, a)
                }
            })
        },
        getFieldsByFormId: function(c, a, b) {
            var d = {};
            d.formId = c;
            d.module = a;
            c = [];
            c.push("0");
            d.statusList = c;
            $.ajax({
                contentType: "application/json",
                type: TEAMS.ajaxMethod,
                async: !1,
                data: JSON.stringify(d),
                dataType: "json",
                url: TEAMS.api.queryFormFieldsByFormId,
                success: function(a) {
                    if (a && a.formField)
                        for (var c = 0; c < a.formField.length; c++) {
                            var e = a.formField[c];
                            e["delete"] || "SignatureComponent" == e.componentKey || b.find(".j_clone .j_contact-field-li select").append('\x3coption class\x3d"j_option j_custom_option" value\x3d"' + e.id + '" id\x3d"' + e.id + '"\x3e' + e.title + "\x3c/option\x3e")
                        }
                }
            })
        },
        setDefaultValue: function() {
            var c = $("#editor-component").find(".js_entity_container .js_entity_item")
              , a = [];
            0 < c.length && c.each(function(c) {
                var e = $(this).data("obj");
                a[c] = {
                    optionId: e.id,
                    content: e.name
                }
            });
            this.componentSetup.content = a
        },
        renderPreview: function(c, a, b, d, f) {
            var g = $(this.tpl);
            d = null;
            (d = $("body").find("#formTenantKey").val()) ? d = d.toUpperCase() : null != TEAMS.currentTenant && (d = TEAMS.currentTenant.tenantKey.toUpperCase());
            if ($("body").find("#scanReport").val() || null != TEAMS.currentUser && TEAMS.currentTenant.tenantKey.toUpperCase() == d)
                if (d = this.getCurrentModuleIsPay(f),
                0 == d || "false" == d) {
                    f = formPlugin.moduleIsPay("contact");
                    var h = $('\x3cspan class\x3d"employee-item"\x3e\u60a8\u7684\u56e2\u961f\u76ee\u524d\u662f\u514d\u8d39\u7248\u672c\uff0c\u4e0d\u652f\u6301\u6b64\u529f\u80fd\uff01\x3c/span\x3e');
                    "mobile" != window.systemInfo_form ? (d = g.siblings("#preview-contact"),
                    f || (d.find(".js_contactitem_container").empty().append(h),
                    d.find(".js_form-contact-add").addClass("hide"),
                    d.find(".typeahead-wrapper").remove())) : (d = g.siblings("#mobile-preview"),
                    f || d.find(".js_contactitem_container").removeClass("contact-seleted").empty().append(h))
                } else
                    d = "mobile" != window.systemInfo_form ? g.siblings("#preview-contact") : g.siblings("#mobile-preview");
            else
                d = g.siblings("#nocontact-preview"),
                d.find(".field_message_js").attr("cid", this.cid);
            if ((g = TEAMS.disableModules) && 0 < g.length)
                for (f = 0; f < g.length; f++)
                    if (h = g[f],
                    h.module && "contact" == h.module) {
                        d.addClass("hide");
                        break
                    }
            d.find(".widget-title .widget-title_js").text(this.componentSetup.title);
            "true" != this.componentSetup.isHideTitle && 1 != this.componentSetup.isHideTitle || d.addClass("field-notitle").find(".widget-title .widget-title_js").addClass("hide");
            "true" != this.componentSetup.required && 1 != this.componentSetup.required || d.find(".widget-title .widget-required_js").text(" *");
            "" != this.componentSetup.describe && d.find(".field-description").text(this.componentSetup.describe).show();
            d.find(".check_js").data("componentData", this).attr("cid", this.cid).attr("id", (this.componentSetup.fieldId || this.componentSetup.tempId) + this.cid).attr("name", this.componentSetup.fieldId || this.componentSetup.tempId);
            d.attr("id", "field_" + this.componentSetup.tempId).attr("tempId", "field_" + this.componentSetup.tempId).attr("fieldId", this.componentSetup.tempId);
            "mobile" == window.systemInfo_form && d.find(".contact-seleted").attr("id", this.componentSetup.fieldId || this.componentSetup.tempId);
            g = this.componentSetup.isUnique;
            if ("true" == g || 1 == g)
                "mobile" != window.systemInfo_form ? d.find("#searchcontact").removeAttr("data-multi") : d.find(".js_contactitem_container").attr("data-multi", "false");
            d.addClass(this.componentSetup.titleLayout);
            "true" != this.componentSetup.isDefault && 1 != this.componentSetup.isDefault || a || (a = this.componentSetup.content) && 0 < a.length && null != TEAMS.currentUser && this.setValue(d, {
                dataOptions: a
            });
            if (b || "true" == b)
                "mobile" != window.systemInfo_form ? this.readOnly(d, !0) : d.find(".js_contactitem_container").removeClass("contact-seleted").text("");
            if ("true" == this.componentSetup.isReadOnly || 1 == this.componentSetup.isReadOnly)
                "mobile" != window.systemInfo_form ? this.readOnly(d, !0) : (d.find(".js_contactitem_container").removeClass("contact-seleted"),
                (a = this.componentSetup.content) && 0 != a.length || d.find(".js_contactitem_container").text(""));
            this.getValue(d);
            this.el = c;
            c.append(d)
        },
        getCurrentModuleIsPay: function(c) {
            var a = !1;
            c && (a = formPlugin.moduleIsPay(c));
            return a
        },
        renderAllCustomer: function(c) {
            var a = ""
              , a = 1 == $("#widget-control .field-active").parents("div[componentKey\x3d'DataTable']").length ? $("#widget-control .field-active").parents("div[componentKey\x3d'DataTable']").find("tr div[componentKey\x3d'CustomerComponent']") : $("#widget-control").find("div[componentKey\x3d'CustomerComponent']:not(.subtd_js\x3e.field_js)")
              , b = $("\x3coption class\x3d'j_option'\x3e\x3c/option\x3e");
            a && 0 < a.length ? a.each(function() {
                var a = b.clone()
                  , d = $(this).attr("tempId")
                  , f = $(this).find(".widget-title_js").text();
                a.attr("value", d).text(f);
                c.find(".j_customer_link").append(a)
            }) : (a = b.clone(),
            a.text("\u5bf9\u5e94\u533a\u57df\u65e0\u5ba2\u6237\u63a7\u4ef6!"),
            c.find(".j_customer_link").append(a));
            c.find(".j_customer_link").removeClass("hide")
        },
        renderStatSearch: function(c) {
            var a = this
              , b = $(this.tpl)
              , d = c.parentEl
              , f = c.container
              , g = null
              , h = c.subFormId
              , l = c.fieldId
              , m = c.filterEl
              , n = c.fieldTitle
              , A = c.condition
              , x = c.ids
              , u = c.term
              , B = d.find(".j_formField-select select").find("option:selected").attr("module") || c.module;
            if ("mobile" != window.systemInfo_form) {
                g = b.siblings("#statsearch-entity");
                g.find(".control-btn").attr("mod", B);
                n = (new Date).getTime();
                if (x)
                    for (g.find(".entity-container").empty(),
                    c = 0; c < x.length; c++)
                        b = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d"' + x[c].id + '" title\x3d"' + x[c].text + '"\x3e' + x[c].text + "\x3c/a\x3e\x3c/span\x3e",
                        g.find(".entity-container").append(b);
                u && g.find("select:first option[value\x3d" + u + "]").attr("selected", "true");
                g.find(".j_entityContainer").attr("id", "j_contact" + n);
                d.attr("class", "sch-group j_formFieldSearchGroup");
                d.find(".j_formField-condition").html(g);
                if ("biaoge" == B) {
                    var y = $(f + " #j_contact" + n + " #typeahead-contact");
                    y.attr("fieldId", l).attr("pageNo", "1").attr("pageSize", "10");
                    y.parents(".j_entityContainer").find(".typeahead-search").attr("url", "/formdata/queryRelevanceDataOptions.json").attr("fieldId", l);
                    window.typeahead && window.typeahead.init && window.typeahead.init({
                        el: f + " #j_contact" + n + " #typeahead-contact",
                        remote: "/formdata/queryRelevanceDataOptions.json",
                        callback: function(c) {
                            if (c && !$.isEmptyObject(c)) {
                                var e = y.parents(".j_entityContainer").find(".j_selected");
                                a.renderTypeheader(e, c)
                            }
                        }
                    })
                }
            } else
                g = b.siblings("#statsearch-contact-mobile"),
                A && (g.find(".j_condition").find('option[value\x3d"' + A + '"]').attr("selected", !0),
                "null" != A && "notnull" != A || g.find(".j_control").hide()),
                m && (g.find("#seleted-list").empty(),
                m.find(".j_filterList .selectd #comp-val span").each(function() {
                    var a = $(this).attr("optionId")
                      , c = $(this).text()
                      , e = $("\x3cspan\x3e\x3c/span\x3e");
                    e.attr("id", a).text(c);
                    g.find("#seleted-list").append(e)
                })),
                f = {},
                f.fieldId = l,
                f.pageNo = 1,
                f.module = B,
                f.pageSize = "20",
                a.searchContact(f, g, l, n, d, h),
                d.off("change", "#statsearch-contact-mobile .j_condition").on("change", "#statsearch-contact-mobile .j_condition", function() {
                    var a = $(this).val();
                    "null" == a || "notnull" == a ? d.find("#statsearch-contact-mobile .j_control").hide() : d.find("#statsearch-contact-mobile .j_control").show()
                }),
                d.off("tap", "#statsearch-contact-mobile .j_optionli").on("tap", "#statsearch-contact-mobile .j_optionli", function() {
                    var a = $(this);
                    a.hasClass("selected") ? a.removeClass("selected") : a.addClass("selected");
                    var c = a.find(".j_optionname").text()
                      , a = a.attr("id")
                      , c = '\x3cspan id\x3d"' + a + '"\x3e' + c + "\x3c/span\x3e";
                    0 < d.find("#statsearch-contact-mobile #seleted-list #" + a).length ? d.find("#statsearch-contact-mobile #seleted-list #" + a).remove() : d.find("#statsearch-contact-mobile #seleted-list").append(c)
                }),
                d.off("tap", "#statsearch-contact-mobile .j_more").on("tap", "#statsearch-contact-mobile .j_more", function() {
                    var c = $(this)
                      , e = c.attr("pageNo")
                      , b = c.attr("fieldId")
                      , c = c.attr("title")
                      , f = {};
                    f.fieldId = b;
                    f.pageSize = "20";
                    f.pageNo = e;
                    f.module = B;
                    a.searchContact(f, g, b, c, d, h)
                })
        },
        renderTypeheader: function(c, a) {
            var b = a.name
              , d = a.id;
            if (b && d) {
                var f = '\x3cspan id\x3d"' + d + '" class\x3d"entity-item j_entity_item" name\x3d"j_entity_item"\x3e\x3ca title\x3d"' + b + '" id\x3d"' + d + '" class\x3d"entitybox-toggle" data-module\x3d"contact" data-value\x3d"' + d + '" data-id\x3d"' + d + '"\x3e' + b + "\x3c/a\x3e\x3c/span\x3e";
                c.find(".entity-item").each(function(a) {
                    d == $(this).find("a").attr("id") && (f = null)
                });
                c.append(f);
                c.find(".j_entity_item").data("object", a)
            }
        },
        searchContact: function(c, a, b, d, f, g) {
            $.ajax({
                type: TEAMS.ajaxMethod,
                url: "freeform/queryFormDataOptions.json",
                dataType: "json",
                data: c,
                success: function(c) {
                    var e = c.dataOptionPage;
                    if (0 == e.totalCount)
                        a.find(".j_noresult").removeClass("hide");
                    else
                        for (e.hasNext && a.find(".j_more").removeClass("hide").attr("pageNo", e.pageNo + 1).attr("fieldId", b).attr("title", d),
                        c = e.result,
                        1 == e.pageNo && a.find(".j_optionUl").empty(),
                        a.find("#seleted-list").attr("fieldId", b),
                        e = 0; e < c.length; e++) {
                            var h = c[e]
                              , l = h.content
                              , h = h.optionId
                              , m = a.find("#li-clone li").clone();
                            0 < a.find("#seleted-list").find("#" + h).length && m.addClass("selected");
                            m.find(".j_optionname").text(l);
                            m.attr("id", h);
                            a.find(".j_optionUl").append(m)
                        }
                    f.find("#component-div").html(a);
                    f.find(".j_comp-ok").attr("comKey", "ContactComponent").attr("fieldId", b).attr("title", d).attr("subFormId", g)
                }
            })
        },
        checkEvents: function(e) {
            var a = this
              , b = a.el || $(document)
              , g = (a.componentSetup.fieldId || a.componentSetup.tempId) + this.cid
              , h = a.componentSetup.isUnique
              , l = a.componentSetup.orderContent;
            a.selectEvents(g, a.componentSetup.relvCustomer, b, h, l);
            b.on("mouseenter.typeahead", "#" + g + " .typeahead-wrapper", function(a) {
                $(this).data("enter", !0)
            }).on("mouseleave.typeahead", "#" + g + " .typeahead-wrapper", function(a) {
                $(this).data("enter", !1)
            });
            b.on("click", "#" + g + " .control-btn", function(a) {
                a.stopPropagation();
                $(this).addClass("hide");
                $(this).prev(".typeahead-wrapper").removeClass("hide");
                $(this).prev(".typeahead-wrapper").find(".control-input").focus()
            });
            b.on("focusout", "#" + g + " .control-input", function(a, c) {
                var e = $(this).parents(".typeahead-wrapper");
                e.data("enter") && "tt" != c || (e.addClass("hide"),
                e.next(".control-btn").removeClass("hide"))
            });
            b.on("click.tt", "#" + g + " #searchList\x3ep", function() {
                var c = $("#" + g);
                c.parents(".field_js").find(".form-error").text("");
                c.parents(".field_js").find(".form-error").hide();
                var e = $(this).data("contact")
                  , b = a.componentSetup.showfields
                  , d = a.componentSetup.isUnique;
                "true" != d && 1 != d || c.find(".js_contactitem_container").empty();
                a.renderSelectItem(g, e, b, c);
                a.triggerFillRelate(c)
            });
            if ("mobile" == window.systemInfo_form)
                b.on("click", "#" + g + " .contact-seleted", function(e) {
                    e = $(this);
                    var b = []
                      , f = a.componentSetup.relvCustomer;
                    if (f) {
                        var k = "";
                        (k = 1 == e.parents("#subForm-fill-detail").length ? e.parents("#subForm-fill-detail").find("div[componentkey\x3d'CustomerComponent'][fieldId\x3d'" + f + "']") : e.parents("#write-report").find("div[componentkey\x3d'CustomerComponent'][fieldId\x3d'" + f + "']")) && k.find(".js_customeritem_container .j_customer_detail").each(function() {
                            b.push($(this).attr("id"))
                        })
                    }
                    var f = $(this).attr("data-module")
                      , k = $(this).attr("data-multi")
                      , m = $(this).attr("data-noempty") && "true" == $(this).attr("data-noempty") ? !0 : !1
                      , n = $(this).parents(".j_page-view")
                      , u = n.attr("id");
                    if (!$(this).parents(".j_formpreview").hasClass("form-noedit")) {
                        var B = $("#" + g + " .contact-seleted .j_contact_detail")
                          , y = [];
                        B && 0 < B.length && B.each(function(a) {
                            a = $(this).find(".j_contact").attr("id");
                            var c = $(this).find(".j_contact").text()
                              , e = $(this).find(".j_contact").attr("customerId");
                            y.push({
                                name: c,
                                id: a,
                                module: "contact",
                                customerId: e
                            })
                        });
                        "true" == h || 1 == h ? (e = new d,
                        e.render("mb", {
                            targetEl: $(this),
                            module: f,
                            multi: k,
                            preEl: "#" + u,
                            noempty: m,
                            seletedList: y,
                            linkedIds: b,
                            order: l
                        })) : 0 == y.length ? (e = new d,
                        e.render("mb", {
                            targetEl: $(this),
                            module: f,
                            multi: k,
                            preEl: "#" + u,
                            noempty: m,
                            seletedList: y,
                            linkedIds: b,
                            order: l
                        })) : (new c({
                            targetEl: e,
                            module: f,
                            multi: k,
                            preEl: "#" + u,
                            noempty: m,
                            seletedList: y,
                            linkedIds: b,
                            order: l
                        })).render();
                        n.addClass("hide")
                    }
                });
            b.off("entitySelected", "#" + g + " #searchcontact").on("entitySelected", "#" + g + " #searchcontact", function(c) {
                1 != h && "true" != h || $("#" + g + " .js_contactitem_container").empty();
                for (var e = 1; e < arguments.length; e++) {
                    var b = $("#" + g);
                    b.parents(".field_js").find(".form-error").text("");
                    b.parents(".field_js").find(".form-error").hide();
                    a.renderSelectItem(g, arguments[e], a.componentSetup.showfields, b)
                }
                a.triggerFillRelate($(this))
            });
            b.on("click", "#" + g + " #searchcontact", function(c) {
                window.abposview && window.abposview.remove();
                c.stopPropagation();
                $("#" + g + " .control-input").trigger("focusout", "tt");
                c = $(this);
                var e = []
                  , b = a.componentSetup.relvCustomer;
                if (b) {
                    var d = "";
                    (d = 1 == c.parents("div[componentKey\x3d'DataTable']").length ? c.parents("tr").find("td div[componentkey\x3d'CustomerComponent'][fieldId\x3d'" + b + "']") : c.parents(".form-preview").find("div[componentkey\x3d'CustomerComponent'][fieldId\x3d'" + b + "']")) && d.find(".js_customeritem_container .j_customer_detail").each(function() {
                        e.push($(this).attr("id"))
                    })
                }
                var b = $("#" + g + " .js_contactitem_container .j_contact_detail")
                  , k = [];
                b && 0 < b.length && b.each(function(a) {
                    a = $(this).find(".j_contact").attr("id");
                    var c = $(this).find(".j_contact").text()
                      , e = $(this).find(".j_contact").data("contact");
                    null == e && (e = {
                        name: c,
                        id: a
                    });
                    k.push({
                        name: c,
                        id: a,
                        contact: e
                    })
                });
                (new f).render("pc", {
                    targetEl: c,
                    isUnique: h,
                    seletedList: k,
                    linkedIds: e,
                    selectColumn: a.componentSetup.selectColumn,
                    order: a.componentSetup.orderContent
                })
            });
            b.on("click", "#" + g + " .js_deleteContact", function() {
                var c = a.componentSetup.showfields
                  , b = $(this).parents("#" + g);
                null == c || 0 == c.length ? $(this).parent().remove() : $(this).parent().parent().parent().remove();
                a.triggerFillRelate(b);
                c = a.check(b, "change");
                e(c)
            });
            "mobile" == window.systemInfo_form && (b.on("objsComfirm", "#" + g + " .contact-seleted", function(c, e) {
                var b = $("#" + g + " .js_contactitem_container")
                  , d = a.componentSetup.isUnique;
                b.text("");
                b.parents("#field_" + a.componentSetup.fieldId).find(".form-error").text("");
                "true" != d && 1 != d || b.empty();
                if (0 < e.objs.length) {
                    var d = e.objs, f;
                    for (f in d) {
                        var h = d[f];
                        if (h) {
                            var k = $('\x3cspan id\x3d"' + h.id + '" class\x3d"j_component employee-item j_contact_detail"\x3e\x3ca customerId\x3d"' + h.customerId + '" id\x3d"' + h.id + '" data-module\x3d"contact" data-value\x3d"' + h.id + '" data-id\x3d"' + h.id + '" class\x3d"j_contact entitybox-toggle"\x3e' + h.name + "\x3c/a\x3e\x3c/span\x3e");
                            b.append(k)
                        }
                    }
                } else
                    h = e.objs,
                    k = $('\x3cspan id\x3d"' + h.id + '" class\x3d"j_component employee-item j_contact_detail"\x3e\x3ca customerId\x3d"' + h.customerId + '" id\x3d"' + h.id + '" data-module\x3d"contact" data-value\x3d"' + h.id + '" data-id\x3d"' + h.id + '" class\x3d"j_contact entitybox-toggle"\x3e' + h.username + "\x3c/a\x3e\x3c/span\x3e"),
                    0 == h.length ? b.html('\x3cdiv class\x3d"widget-link-holder"\x3e\x3ci class\x3d"icon-plus2"\x3e\x3c/i\x3e\u9009\u62e9\u5ba2\u6237\u8054\u7cfb\u4eba\x3c/div\x3e') : b.append(k);
                a.triggerFillRelate(b)
            }),
            b.on("deleteObj", "#" + g + " .contact-seleted", function(c, e) {
                var b = $("#" + g + " .js_contactitem_container");
                b.find('span[id\x3d"' + e + '"]').remove();
                0 == b.find("span").length && b.html('\x3cdiv class\x3d"widget-link-holder"\x3e\x3ci class\x3d"icon-plus2"\x3e\x3c/i\x3e\u9009\u62e9\u5ba2\u6237\u8054\u7cfb\u4eba\x3c/div\x3e');
                a.triggerFillRelate(b)
            }))
        },
        selectEvents: function(c, a, b, d, f) {
            (new this.contactAhead({})).initAhead(c, a, b, d, f)
        },
        autoSaveEvents: function(c) {
            var a = this
              , b = a.el || $(document)
              , d = (a.componentSetup.fieldId || a.componentSetup.tempId) + this.cid;
            b.on("click", "#" + d + " .js_deleteContact", function() {
                a.saveComponentValue(b.find("#" + d), c)
            });
            "mobile" == window.systemInfo_form ? (b.on("objsComfirm", "#" + d + " .contact-seleted", function(b, d) {
                a.saveComponentValue($(this), c)
            }),
            b.on("deleteObj", "#" + d + " .contact-seleted", function(b, d) {
                a.saveComponentValue($(this), c)
            })) : (b.on("click", "#" + d + " #searchList\x3ep", function() {
                a.saveComponentValue($(this), c)
            }),
            b.on("entitySelected", "#" + d + " #searchcontact", function(b) {
                a.saveComponentValue($(this), c)
            }))
        },
        renderSelectItem: function(c, a, b, d) {
            if (!(0 < d.find(".js_contactitem_container").find(".j_contact[id\x3d'" + a.id + "']").length))
                if (null == b || 0 == b.length) {
                    var f = '\x3cspan id\x3d"' + a.id + '" name\x3d"j_contact_detail" class\x3d"j_contact_detail j_component employee-item"\x3e\x3ca id\x3d"' + a.id + '" data-id\x3d"' + a.id + '" data-module\x3d"contact" class\x3d"entitybox-toggle j_contact" title\x3d"' + a.username + '"\x3e' + a.username + '\x3c/a\x3e\x3ca class\x3d"close js_deleteContact" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e';
                    (c = $("#" + c + " .js_contactitem_container .j_contact_detail")) && c.each(function(c) {
                        a.id == $(this).find(".j_contact").attr("id") && $(this).remove()
                    });
                    d.find(".js_contactitem_container").append(f);
                    d.find(".js_contactitem_container").find(".j_contact[id\x3d'" + a.id + "']").data("contact", a)
                } else {
                    f = d.find(".j_contact_detail_clone .j_contact_detail").clone();
                    f.attr("id", a.id).attr("data-value", a.id).attr("data-id", a.id);
                    f.find(".j_contact").attr("id", a.id).text(a.username).data("contact", a);
                    for (var g = 0; g < b.length; g++) {
                        var h = b[g]
                          , l = d.find(".j_contact_detail_clone .j_field").clone();
                        l.attr("id", h);
                        l.find(".j_field_title").text(this.basefields[h]);
                        if ("title" == h || "call" == h || "telephone" == h || "mobile" == h || "email" == h)
                            l.find(".j_field_value").prop("title", a[h] ? a[h] : "").text(a[h] ? a[h] : ""),
                            f.find(".j_part .j_line").append(l)
                    }
                    var m = {};
                    if (a.formDataId && this.componentSetup.cusCustomFields) {
                        l = [];
                        for (b = 0; b < this.componentSetup.cusCustomFields.length; b++)
                            g = this.componentSetup.cusCustomFields[b],
                            l.push(g.substring(0, g.indexOf("_")));
                        b = {};
                        b.formDataId = a.formDataId;
                        b.module = "contact";
                        b.fieldIds = l;
                        $.ajax({
                            contentType: "application/json",
                            type: TEAMS.ajaxMethod,
                            async: !1,
                            data: JSON.stringify(b),
                            dataType: "json",
                            url: "freeform/findAllFormDataFields.json",
                            success: function(a) {
                                if (a && a.formData && a.formData.dataDetails)
                                    for (var c = 0; c < a.formData.dataDetails.length; c++) {
                                        var e = a.formData.dataDetails[c]
                                          , b = e.content;
                                        !b && e.dataText && (b = e.dataText.content);
                                        if (!b && 0 < e.dataOptions.length) {
                                            for (var b = "", d = 0; d < e.dataOptions.length; d++)
                                                b += e.dataOptions[d].content + ",";
                                            b = b.substring(0, b.length - 1)
                                        }
                                        m[e.formField.id] = b
                                    }
                            }
                        })
                    }
                    if (this.componentSetup.cusCustomFields)
                        for (b = 0; b < this.componentSetup.cusCustomFields.length; b++)
                            g = this.componentSetup.cusCustomFields[b],
                            l = d.find(".j_contact_detail_clone .j_field").clone(),
                            l.attr("id", g.substring(0, g.indexOf("_"))),
                            l.find(".j_field_title").text(g.substring(g.indexOf("_") + 1, g.length)),
                            l.find(".j_field_value").prop("title", m[g.substring(0, g.indexOf("_"))]).text(m[g.substring(0, g.indexOf("_"))]),
                            f.find(".j_part .j_line").append(l);
                    f.find(".j_title").append('\x3ca class\x3d"close js_deleteContact" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e');
                    $("#" + c + " .js_contactitem_container").append(f)
                }
        },
        contactAhead: Backbone.View.extend({
            defaults: function() {
                this.remote = this.suggestion = "";
                this.entity = "contact";
                this.tpl = h.get("contactcomponent")
            },
            initAhead: function(c, a, b, d, f) {
                this.defaults();
                this.fieldId = c;
                this.rCustomer = a;
                this.orderContent = f;
                this.$continer = b.find("#" + this.fieldId);
                this._htmlEvents(b)
            },
            _htmlEvents: function(c) {
                var a = this
                  , b = a.$continer
                  , d = a.rCustomer
                  , f = c.find("#" + a.fieldId + " #typeahead-contact");
                f.off("focus.tt").on("focus.tt", function(c) {
                    a._search($(this), d)
                });
                f.off("click.tt").on("click.tt", function(a) {
                    a.stopPropagation()
                });
                f.off("keyup.tt").on("keyup.tt", function(c) {
                    c = c.which;
                    0 < $("body").find("#form-abposselect").length && (b = $("body").find("#form-abposselect").find(".field_js"));
                    13 == c ? (b.find("#contact-typeahead-div p.active").trigger("click.tt"),
                    window.abposview && window.abposview.remove()) : 27 == c ? (f.trigger("focusout", "tt"),
                    window.abposview && window.abposview.remove()) : 38 == c ? (c = $("#contact-typeahead-div p.active"),
                    1 > c.length ? b.find("#contact-typeahead-div p").last().addClass("active") : (c.removeClass("active"),
                    (0 < c.prev().length ? c.prev() : b.find("#contact-typeahead-div p").last()).addClass("active"))) : 40 == c ? (c = b.find("#contact-typeahead-div p.active"),
                    1 > c.length ? b.find("#contact-typeahead-div p").first().addClass("active") : (c.removeClass("active"),
                    (0 < c.next().length ? c.next() : b.find("#contact-typeahead-div p").first()).addClass("active"))) : a._search($(this), d)
                });
                b.find("#contact-typeahead-div").off("mouseenter.tt", "p").on("mouseenter.tt", "p", function() {
                    0 < $("body").find("#form-abposselect").length && (b = $("body").find("#form-abposselect").find(".field_js"));
                    $(this).addClass("active");
                    b.find("#contact-typeahead-div p.active").removeClass("active")
                });
                b.off("click.tt", "#contact-typeahead-div p").on("click.tt", "#contact-typeahead-div p", function(a) {
                    f.trigger("focusout", "tt")
                })
            },
            _search: function(c, a) {
                var b = this
                  , d = b.$continer
                  , f = [];
                if (a) {
                    var g = "";
                    (g = 1 == c.parents("div[componentKey\x3d'DataTable']").length ? c.parents("tr").find("td div[componentkey\x3d'CustomerComponent'][fieldId\x3d'" + a + "']") : c.parents(".form-preview").find("div[componentkey\x3d'CustomerComponent'][fieldId\x3d'" + a + "']")) && g.find(".js_customeritem_container .j_customer_detail").each(function() {
                        f.push($(this).attr("id"))
                    })
                }
                g = $.trim(c.val());
                d.find("#contact-typeahead-div #searchList").html("");
                0 < $("body").find("#form-abposselect").length ? ($("body").find("#form-abposselect").find(".field_js").find("#contact-typeahead-div .loading_small").show(),
                d.find("#contact-typeahead-div .loading_small").hide()) : d.find("#contact-typeahead-div .loading_small").show();
                window.abposview && window.abposview.remove();
                b.keywords = g;
                var d = {}
                  , h = ""
                  , l = "desc";
                b.orderContent && (h = b.orderContent.property,
                l = b.orderContent.direction);
                l = {
                    pageNo: 1,
                    pageSize: 10,
                    orderBy: h,
                    orderWay: l,
                    conditions: [{
                        id: "CON.USERNAME",
                        type: "string",
                        operate: "like",
                        value: g
                    }]
                };
                h = "";
                if (null != f && 0 < f.length) {
                    l = "";
                    for (h = 0; h < f.length; h++)
                        l = l + f[h] + ",";
                    l = l.substring(0, l.length - 1);
                    h = "/mobile/contact/getCustomersContacts";
                    d.customerIds = l;
                    d.keyword = g;
                    b.orderContent && (g = b.orderContent.property,
                    "createTime" == g && (g = "createtime"),
                    "updateTime" == g && (g = "updatetime"),
                    d.property = g,
                    d.direction = b.orderContent.direction)
                } else
                    h = "/contact/search",
                    d.queryStr = JSON.stringify(l),
                    d.userId = TEAMS.currentUser.id;
                $.ajax({
                    type: TEAMS.ajaxMethod,
                    url: h,
                    dataType: "json",
                    data: d,
                    success: function(a) {
                        if (!a || !a.message || 0 == a.message.code) {
                            var c = {};
                            c.result = a.data;
                            c.pageNo = 1;
                            c.pageSize = 10;
                            a = a.recordsTotal ? a.recordsTotal : a.data.length;
                            c.totalCount = a;
                            c.hasPre = !1;
                            var e = parseInt(a / 15);
                            0 < a % 15 && e++;
                            c.totalPages = e;
                            c.hasNext = 2 <= e;
                            b.renderContact(c)
                        }
                    }
                })
            },
            renderContact: function(c) {
                var a = this.$continer;
                0 < $("body").find("#form-abposselect").length ? $("body").find("#form-abposselect").find(".field_js").find("#contact-typeahead-div .loading_small").hide() : a.find("#contact-typeahead-div .loading_small").hide();
                c = c.result;
                for (var b = 0; b < c.length; b++) {
                    var d = c[b]
                      , f = d.username
                      , g = $(this.tpl).siblings("#contact-clone").find(".j_contact").clone();
                    g.text(f);
                    g.attr("title", f).attr("id", d.id);
                    g.data("contact", d);
                    a.find("#contact-typeahead-div #searchList").append(g).show();
                    window.abposview && window.abposview.remove();
                    window.abposview = new l({
                        continer: a,
                        entity: this.entity
                    });
                    window.abposview.render()
                }
            }
        }),
        check: function(c) {
            var a = $(c).find(".js_contactitem_container .j_contact_detail").length
              , b = {};
            b.element = c;
            0 != a || "true" != this.componentSetup.required && 1 != this.componentSetup.required || (b.message = this.componentSetup.title + "\u4e0d\u80fd\u4e3a\u7a7a");
            return b
        },
        getValue: function(c, a) {
            var b = {
                formField: {
                    id: this.componentSetup.fieldId
                }
            }
              , d = c.find(".js_contactitem_container .j_contact_detail");
            if (0 < d.length) {
                var f = [];
                d.each(function(a) {
                    var c = $(this).find(".j_contact").attr("id")
                      , b = $(this).find(".j_contact").text();
                    f[a] = {
                        optionId: c,
                        content: b,
                        type: "contact"
                    }
                });
                b.dataOptions = f
            } else
                a || (b = null);
            return b
        },
        setValue: function(c, a) {
            c.find(".js_contactitem_container").empty();
            var b = this
              , d = this.componentSetup.showfields;
            if (null != a && null != a.dataOptions) {
                for (var f = [], g = "", h = 0; h < a.dataOptions.length; h++) {
                    var l = a.dataOptions[h]
                      , m = l.optionId;
                    f.push({
                        id: m,
                        username: null == l.content ? "" : l.content
                    });
                    g += m + ","
                }
                if (TEAMS.currentUser && TEAMS.currentUser.id)
                    null == d || 0 == d.length ? b.renderContacts(c, f, d, a) : (g = g.substring(0, g.length - 1),
                    $.ajax({
                        type: TEAMS.ajaxMethod,
                        data: "",
                        dataType: "json",
                        async: !1,
                        url: "/contact/getContactsByIds?contactIds\x3d" + g,
                        error: function(g) {
                            b.renderContacts(c, f, d, a)
                        },
                        success: function(g) {
                            if (!g || !g.message || 0 == g.message.code) {
                                g = g.data;
                                for (var h = [], l = 0; l < f.length; l++) {
                                    for (var m = f[l], n = !0, q = 0; q < g.length; q++) {
                                        var p = g[q];
                                        if (p.id == m.id) {
                                            h.push(p);
                                            n = !1;
                                            break
                                        }
                                    }
                                    n && h.push(m)
                                }
                                b.renderContacts(c, h, d, a)
                            }
                        }
                    }));
                else
                    for (h = 0; h < f.length; h++)
                        g = f[h],
                        "mobile" == window.systemInfo_form && (g = $('\x3cspan href\x3d"/mobile/crms?module\x3dkey_contact\x26info\x3dview_ContactView|id_' + g.id + '|customerId_|preView_ContactListView" id\x3d"' + g.id + '" class\x3d"router j_component employee-item j_contact_detail"\x3e\x3ca class\x3d"j_contact" id\x3d"' + g.id + '"\x3e' + g.username + "\x3c/a\x3e\x3c/span\x3e"),
                        c.find(".js_contactitem_container").append(g))
            }
        },
        renderContacts: function(c, a, b, d) {
            for (d = 0; d < a.length; d++) {
                var f = a[d];
                if ("mobile" == window.systemInfo_form)
                    var g = $('\x3cspan href\x3d"/mobile/crms?module\x3dkey_contact\x26info\x3dview_ContactView|id_' + f.id + "|customerId_" + (f.customer ? f.customer.id : "null") + '|preView_ContactListView" id\x3d"' + f.id + '" class\x3d"router j_component employee-item j_contact_detail"\x3e\x3ca class\x3d"j_contact" id\x3d"' + f.id + '"\x3e' + f.username + "\x3c/a\x3e\x3c/span\x3e");
                else if (null == b || 0 == b.length)
                    g = "",
                    g = null != c.find(".js_form-contact-add").get(0) ? '\x3cspan id\x3d"' + f.id + '" name\x3d"j_contact_detail" class\x3d"j_contact_detail j_component employee-item"\x3e\x3ca id\x3d"' + f.id + '" data-id\x3d"' + f.id + '" data-module\x3d"contact" class\x3d"entitybox-toggle j_contact" title\x3d"' + f.username + '"\x3e' + f.username + '\x3c/a\x3e\x3ca class\x3d"close js_deleteContact" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e' : '\x3cspan id\x3d"' + f.id + '" name\x3d"j_contact_detail" class\x3d"j_contact_detail j_component employee-item"\x3e\x3ca id\x3d"' + f.id + '" data-id\x3d"' + f.id + '" data-module\x3d"contact" class\x3d"entitybox-toggle j_contact" title\x3d"' + f.username + '"\x3e' + f.username + "\x3c/a\x3e\x3c/span\x3e";
                else {
                    g = c.find(".j_contact_detail_clone .j_contact_detail").clone();
                    g.attr("id", f.id).attr("data-value", f.id).attr("data-id", f.id);
                    g.find(".j_contact").attr("id", f.id).text(f.username).attr("data-original-title", f.username);
                    for (var h = 0; h < b.length; h++) {
                        var l = b[h]
                          , m = c.find(".j_contact_detail_clone .j_field").clone();
                        m.attr("id", l);
                        m.find(".j_field_title").text(this.basefields[l]);
                        if ("title" == l || "call" == l || "telephone" == l || "mobile" == l || "email" == l)
                            m.find(".j_field_value").prop("title", f[l] ? f[l] : "").text(f[l] ? f[l] : ""),
                            g.find(".j_part .j_line").append(m)
                    }
                    var n = {};
                    if (f.formDataId && this.componentSetup.cusCustomFields) {
                        m = [];
                        for (h = 0; h < this.componentSetup.cusCustomFields.length; h++)
                            l = this.componentSetup.cusCustomFields[h],
                            m.push(l.substring(0, l.indexOf("_")));
                        h = {};
                        h.formDataId = f.formDataId;
                        h.module = "contact";
                        h.fieldIds = m;
                        $.ajax({
                            contentType: "application/json",
                            type: TEAMS.ajaxMethod,
                            async: !1,
                            data: JSON.stringify(h),
                            dataType: "json",
                            url: "freeform/findAllFormDataFields.json",
                            success: function(a) {
                                if (a && a.formData && a.formData.dataDetails)
                                    for (var c = 0; c < a.formData.dataDetails.length; c++) {
                                        var b = a.formData.dataDetails[c]
                                          , e = b.content;
                                        !e && b.dataText && (e = b.dataText.content);
                                        if (!e && 0 < b.dataOptions.length) {
                                            for (var e = "", d = 0; d < b.dataOptions.length; d++)
                                                e += b.dataOptions[d].content + ",";
                                            e = e.substring(0, e.length - 1)
                                        }
                                        n[b.formField.id] = e
                                    }
                            }
                        })
                    }
                    if (this.componentSetup.cusCustomFields)
                        for (h = 0; h < this.componentSetup.cusCustomFields.length; h++)
                            f = this.componentSetup.cusCustomFields[h],
                            m = c.find(".j_contact_detail_clone .j_field").clone(),
                            m.attr("id", f.substring(0, f.indexOf("_"))),
                            m.find(".j_field_title").text(f.substring(f.indexOf("_") + 1, f.length)),
                            m.find(".j_field_value").prop("title", n[f.substring(0, f.indexOf("_"))]).text(n[f.substring(0, f.indexOf("_"))]),
                            g.find(".j_part .j_line").append(m);
                    null != c.find(".js_form-contact-add").get(0) && g.find(".j_title").append('\x3ca class\x3d"close js_deleteContact" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e')
                }
                c.find(".js_contactitem_container").append(g)
            }
        },
        empty: function(c) {
            c.find(".js_contactitem_container").html("")
        },
        readOnly: function(c, a) {
            var b = this.componentSetup.fieldId + this.cid
              , d = c.find('div[id\x3d"' + b + '"] span[name\x3d"js_form-contact-add"]')
              , f = c.find('div[id\x3d"' + b + '"] .js_contactitem_container .j_contact_detail')
              , g = c.find('div[id\x3d"' + b + '"] .js_deleteContact');
            a ? (d.remove(),
            g.remove()) : d && 0 != d.length && null != d || (d = $(this.tpl).siblings("#preview-form").find('span[name\x3d"js_form-contact-add"]'),
            c.find('div[id\x3d"' + b + '"]').find(".js_contactitem_container").after(d),
            f.find(".j_title").append('\x3ca class\x3d"close js_deleteContact" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e'))
        }
    });
    u.exports = window.ContactComponent
});
define("form/component/task", "form/relatecomponent form/tplutil form/component/entityselecter form/component/relevancecontrol form/componentmodel form/abposview".split(" "), function(n, y, u) {
    var m = n("form/relatecomponent")
      , h = n("form/tplutil")
      , g = n("form/component/entityselecter")
      , f = n("form/component/relevancecontrol")
      , d = n("form/componentmodel")
      , b = n("form/abposview");
    window.Task = m.extend({
        initialize: function(c) {
            m.prototype.initialize.call(this, c);
            var b = {
                componentKey: "Task",
                title: "\u5173\u8054\u4efb\u52a1",
                orderContent: "",
                sformId: "",
                formName: "",
                filterParams: "",
                filterQueryParams: "",
                formEntity: ""
            };
            null != c && (b.sformId = c.sformId,
            b.formName = c.formName,
            b.title = c.title,
            b.orderContent = c.orderContent,
            b.filterParams = c.filterParams,
            b.filterQueryParams = c.filterQueryParams,
            b.formEntity = c.formEntity);
            this.componentSetup = $.extend(this.componentSetup, b);
            this.tpl = h.get("task", {
                isMobileForm: this.isMobileForm
            });
            this.componentModel = new d
        },
        setSformId: function(c) {
            this.componentSetup.sformId = c
        },
        setFormName: function(c) {
            this.componentSetup.formName = c
        },
        setOrderContent: function(c) {
            this.componentSetup.orderContent = c
        },
        setFilterParams: function(c) {
            this.componentSetup.filterParams = c
        },
        setFilterQueryParams: function(c) {
            this.componentSetup.filterQueryParams = c
        },
        setFormEntity: function(c) {
            this.componentSetup.formEntity = c
        },
        render: function(c) {
            var b = this
              , e = $(this.tpl).siblings("#form-task");
            m.prototype.render.call(this, c, e);
            this.componentModel.generatorId(function(a) {
                b.componentSetup.tempId = a.generatorId;
                c.attr("tempId", a.generatorId)
            });
            c.html(e.html())
        },
        renderEditor: function() {
            var c = $(this.tpl).siblings("#editor-task");
            c.find(".j_default_container").attr("id", this.componentSetup.fieldId + this.cid);
            "true" != this.componentSetup.required && 1 != this.componentSetup.required || c.find("#required").attr("checked", "true");
            var b = !1;
            if ("true" == this.componentSetup.isUnique || 1 == this.componentSetup.isUnique)
                b = !0;
            var e = this.componentSetup.sformId
              , a = this.componentSetup.formName;
            null != e && "" != e && null != a && (c.find("#form_select_input").attr("value", a).attr("formId", e),
            c.find(".j_filterCondition").removeClass("hide"),
            c.find(".j_delete-box").removeClass("hide"));
            c.find("#isUnique").attr("checked", b);
            m.prototype.renderEditor.call(this, c);
            $("#editor-component").html(c.html());
            if ((c = this.componentSetup.content) && 0 < c.length)
                for (b = $("#editor-component").find(".js_taskitem_container"),
                e = 0; e < c.length; e++)
                    b.append('\x3cspan name\x3d"js_form-taskItem" class\x3d"js_form-taskItem j_component employee-item"\x3e\x3ca data-id\x3d"' + c[e].optionId + '" data-module\x3d"task" taskId\x3d' + c[e].optionId + ' class\x3d"entitybox-toggle" title\x3d"' + c[e].content + '"\x3e' + c[e].content + '\x3c/a\x3e\x3ca class\x3d"close js_deleteMainline" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e');
            this.selectEvents()
        },
        selectEvents: function() {
            var c = this
              , b = $("#editor-component").find("#j_default_value")
              , e = this.componentSetup.fieldId + this.cid
              , a = this.componentSetup.orderContent
              , d = this.componentSetup.formEntity
              , f = c.componentSetup.isAddForRelation;
            (new this.taskAhead({})).initAhead({
                fatherObj: c,
                fieldId: e,
                el: b,
                isDefault: !0,
                orderContent: a,
                callback: function() {
                    c.setDefaultValue()
                }
            });
            b.find("#" + e + " #searchtask").click(function() {
                var c = b.find("#" + e + " .js_taskitem_container .js_form-taskItem");
                b.find("#" + e + " .control-input").trigger("focusout", "tt");
                var h = [];
                c && 0 < c.length && c.each(function(a) {
                    a = $(this).find(".entitybox-toggle").attr("taskId");
                    var c = $(this).find(".entitybox-toggle").text();
                    h.push({
                        name: c,
                        id: a
                    })
                });
                var c = $(this).attr("data-entity")
                  , m = $(this)
                  , n = m.parent().find("input");
                (new g).render("pc", {
                    targetEl: m,
                    keyword: n ? n.val() : "",
                    module: c,
                    type: m.attr("data-type"),
                    isUnique: isUnique,
                    seletedList: h,
                    order: a,
                    formEntity: d,
                    isAddForRelation: f
                })
            });
            b.off("entitySelected", "#" + e + " #searchtask").on("entitySelected", "#" + e + " #searchtask", function(a) {
                b.find("#" + e + " .js_taskitem_container").empty();
                for (var d = 1; d < arguments.length; d++) {
                    var f = arguments[d]
                      , g = $("#" + e);
                    g.parents(".field_js").find(".form-error").text("");
                    g.parents(".field_js").find(".form-error").hide();
                    var h = f.id
                      , f = f.name
                      , f = '\x3cspan name\x3d"js_form-taskItem" class\x3d"js_form-taskItem j_component employee-item"\x3e\x3ca data-id\x3d"' + h + '" data-module\x3d"task" taskId\x3d' + h + ' class\x3d"entitybox-toggle" title\x3d"' + f + '"\x3e' + f + '\x3c/a\x3e\x3ca class\x3d"close js_deleteMainline" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e'
                      , k = $("#" + e + " .js_taskitem_container .js_form-taskItem");
                    k && k.each(function(a) {
                        h == $(this).find(".entitybox-toggle").attr("taskId") && ($(this).remove(),
                        flag = !1)
                    });
                    g.find(".js_taskitem_container").append(f)
                }
                c.setDefaultValue()
            })
        },
        setDefaultValue: function() {
            var c = $("#editor-component").find(".js_taskitem_container .js_form-taskItem")
              , b = [];
            0 < c.length && c.each(function(c) {
                var a = $(this).find(".entitybox-toggle").attr("taskId")
                  , d = $(this).find(".entitybox-toggle").text();
                b[c] = {
                    optionId: a,
                    content: d
                }
            });
            this.componentSetup.content = b
        },
        renderPreview: function(c, b, e, a, d) {
            var f = $(this.tpl);
            a = null;
            (a = $("body").find("#formTenantKey").val()) ? a = a.toUpperCase() : null != TEAMS.currentTenant && (a = TEAMS.currentTenant.tenantKey.toUpperCase());
            if ($("body").find("#scanReport").val() || null != TEAMS.currentUser && TEAMS.currentTenant.tenantKey.toUpperCase() == a)
                if (a = this.getCurrentModuleIsPay(d),
                0 == a || "false" == a) {
                    d = formPlugin.moduleIsPay("task");
                    var g = $('\x3cspan class\x3d"employee-item"\x3e\u60a8\u7684\u56e2\u961f\u76ee\u524d\u662f\u514d\u8d39\u7248\u672c\uff0c\u4e0d\u652f\u6301\u6b64\u529f\u80fd\uff01\x3c/span\x3e');
                    "mobile" != window.systemInfo_form ? (a = f.siblings("#preview-task"),
                    d || (a.find(".js_taskitem_container").empty().append(g),
                    a.find(".js_form-task-add").addClass("hide"),
                    a.find(".typeahead-wrapper").remove())) : (a = f.siblings("#mobile-preview"),
                    d || a.find(".js_taskitem_container").removeClass("task-seleted").empty().append(g))
                } else
                    a = "mobile" != window.systemInfo_form ? f.siblings("#preview-task") : f.siblings("#mobile-preview");
            else
                a = f.siblings("#notask-preview"),
                a.find(".field_message_js").attr("cid", this.cid);
            if ((f = TEAMS.disableModules) && 0 < f.length)
                for (d = 0; d < f.length; d++)
                    if (g = f[d],
                    g.module && "task" == g.module) {
                        a.addClass("hide");
                        break
                    }
            a.find(".widget-title .widget-title_js").text(this.componentSetup.title);
            "true" != this.componentSetup.isHideTitle && 1 != this.componentSetup.isHideTitle || a.addClass("field-notitle").find(".widget-title .widget-title_js").addClass("hide");
            "true" != this.componentSetup.required && 1 != this.componentSetup.required || a.find(".widget-title .widget-required_js").text(" *");
            "" != this.componentSetup.describe && a.find(".field-description").text(this.componentSetup.describe).show();
            a.find(".check_js").attr("id", this.componentSetup.fieldId + this.cid).attr("name", this.componentSetup.fieldId).attr("cid", this.cid).data("componentData", this);
            a.attr("id", "field_" + (this.componentSetup.fieldId || this.componentSetup.tempId));
            "mobile" == window.systemInfo_form && a.find(".task-seleted").attr("id", this.componentSetup.fieldId);
            f = this.componentSetup.isUnique;
            if ("true" == f || 1 == f)
                "mobile" != window.systemInfo_form ? a.find("#searchtask").removeAttr("data-multi") : a.find(".js_taskitem_container").attr("data-multi", "false");
            a.addClass(this.componentSetup.titleLayout);
            "true" != this.componentSetup.isDefault && 1 != this.componentSetup.isDefault || b || (b = this.componentSetup.content) && 0 < b.length && null != TEAMS.currentUser && this.setValue(a, {
                dataOptions: b
            });
            if (e || "true" == e)
                "mobile" != window.systemInfo_form ? this.readOnly(a, !0) : a.find(".js_taskitem_container").removeClass("task-seleted").text("");
            if ("true" == this.componentSetup.isReadOnly || 1 == this.componentSetup.isReadOnly)
                "mobile" != window.systemInfo_form ? this.readOnly(a, !0) : (a.find(".js_taskitem_container").removeClass("task-seleted"),
                (b = this.componentSetup.content) && 0 != b.length || a.find(".js_taskitem_container").text(""));
            this.getValue(a);
            this.el = c;
            c.append(a)
        },
        getCurrentModuleIsPay: function(c) {
            var b = !1;
            c && (b = formPlugin.moduleIsPay(c));
            return b
        },
        renderEditPreview: function(c, b) {
            var e = $(this.tpl).siblings("#form-task");
            m.prototype.renderEditPreview.call(this, c, e);
            b ? c.replaceWith(e) : c.append(e)
        },
        renderStatSearch: function(c) {
            var b = this
              , e = $(this.tpl)
              , a = c.fieldId
              , d = c.fieldTitle
              , f = c.subFormId
              , g = c.ids
              , h = c.term
              , m = c.parentEl
              , n = c.filterEl
              , v = c.container
              , s = c.condition
              , u = null
              , x = m.find(".j_formField-select select").find("option:selected").attr("module") || c.module;
            if ("mobile" != window.systemInfo_form) {
                u = e.siblings("#statsearch-entity");
                if (g)
                    for (u.find(".entity-container").empty(),
                    d = 0; d < g.length; d++)
                        c = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d"' + g[d].id + '" title\x3d"' + g[d].text + '"\x3e' + g[d].text + "\x3c/a\x3e\x3c/span\x3e",
                        u.find(".entity-container").append(c);
                h && u.find("select:first option[value\x3d" + h + "]").attr("selected", "true");
                g = (new Date).getTime();
                u.find(".j_entityContainer").attr("id", "j_task" + g);
                m.attr("class", "sch-group j_formFieldSearchGroup");
                m.find(".j_formField-condition").html(u);
                var y = $(v + " #j_task" + g + " #typeahead-task")
                  , B = "/tasks/suggestion.json";
                this.componentSetup.filterQueryParams && (B = "/tasks/search.json");
                "biaoge" == x && (B = "/formdata/queryRelevanceDataOptions.json",
                y.attr("fieldId", a).attr("pageNo", "1").attr("pageSize", "10"),
                y.parents(".j_entityContainer").find(".typeahead-search").attr("url", B).attr("fieldId", a));
                window.typeahead && window.typeahead.init && window.typeahead.init({
                    el: v + " #j_task" + g + " #typeahead-task",
                    remote: B,
                    callback: function(a) {
                        if (a && !$.isEmptyObject(a)) {
                            var c = y.parents(".j_entityContainer").find(".j_selected");
                            b.renderTypeheader(c, a)
                        }
                    }
                })
            } else
                u = e.siblings("#statsearch-task-mobile"),
                s && (u.find(".j_condition").find('option[value\x3d"' + s + '"]').attr("selected", !0),
                "null" != s && "notnull" != s || u.find(".j_control").hide()),
                n && (u.find("#seleted-list").empty(),
                n.find(".j_filterList .selectd #comp-val span").each(function() {
                    var a = $(this).attr("optionId")
                      , c = $(this).text()
                      , b = $("\x3cspan\x3e\x3c/span\x3e");
                    b.attr("id", a).text(c);
                    u.find("#seleted-list").append(b)
                })),
                v = {},
                v.fieldId = a,
                v.pageNo = 1,
                v.module = x,
                v.pageSize = "20",
                B = "freeform/queryFormDataOptions.json",
                b.searchTask(v, u, a, d, m, f, B),
                m.off("change", "#statsearch-task-mobile .j_condition").on("change", "#statsearch-task-mobile .j_condition", function() {
                    var a = $(this).val();
                    "null" == a || "notnull" == a ? m.find("#statsearch-task-mobile .j_control").hide() : m.find("#statsearch-task-mobile .j_control").show()
                }),
                m.off("tap", "#statsearch-task-mobile .j_optionli").on("tap", "#statsearch-task-mobile .j_optionli", function() {
                    var a = $(this);
                    a.hasClass("selected") ? a.removeClass("selected") : a.addClass("selected");
                    var c = a.find(".j_optionname").text()
                      , a = a.attr("id")
                      , c = '\x3cspan id\x3d"' + a + '"\x3e' + c + "\x3c/span\x3e";
                    0 < m.find("#statsearch-task-mobile #seleted-list #" + a).length ? m.find("#statsearch-task-mobile #seleted-list #" + a).remove() : m.find("#statsearch-task-mobile #seleted-list").append(c)
                }),
                m.off("tap", "#statsearch-task-mobile .j_more").on("tap", "#statsearch-task-mobile .j_more", function() {
                    var a = $(this)
                      , c = a.attr("pageNo")
                      , e = a.attr("fieldId")
                      , a = a.attr("title")
                      , d = {};
                    d.fieldId = e;
                    d.pageNo = c;
                    d.pageSize = "20";
                    d.module = x;
                    b.searchTask(d, u, e, a, m, f, B)
                })
        },
        searchTask: function(c, b, e, a, d, f, g) {
            $.ajax({
                contentType: "application/json",
                type: TEAMS.ajaxMethod,
                url: g,
                dataType: "json",
                data: JSON.stringify(c),
                success: function(c) {
                    var g = c.dataOptionPage;
                    if (0 == g.totalCount)
                        b.find(".j_noresult").removeClass("hide"),
                        b.find(".eui-cells").addClass("hide");
                    else
                        for (g.hasNext && b.find(".j_more").removeClass("hide").attr("pageNo", g.pageNo + 1).attr("fieldId", e).attr("title", a),
                        c = g.result,
                        1 == g.pageNo && b.find(".j_optionUl").empty(),
                        b.find("#seleted-list").attr("fieldId", e),
                        g = 0; g < c.length; g++) {
                            var h = c[g]
                              , m = h.content
                              , h = h.optionId
                              , n = b.find("#li-clone li").clone();
                            0 < b.find("#seleted-list").find("#" + h).length && n.addClass("selected");
                            n.find(".j_optionname").text(m);
                            n.attr("id", h);
                            b.find(".j_optionUl").append(n)
                        }
                    d.find("#component-div").html(b);
                    d.find(".j_comp-ok").attr("comKey", "Task").attr("fieldId", e).attr("title", a).attr("subFormId", f)
                }
            })
        },
        renderTypeheader: function(c, b) {
            var e = b.name
              , a = b.id;
            if (e && a) {
                var d = '\x3cspan id\x3d"' + a + '" class\x3d"entity-item j_entity_item" name\x3d"j_entity_item"\x3e\x3ca title\x3d"' + e + '" id\x3d"' + a + '" class\x3d"entitybox-toggle" data-module\x3d"task" data-value\x3d"' + a + '" data-id\x3d"' + a + '"\x3e' + e + "\x3c/a\x3e\x3c/span\x3e";
                c.find(".entity-item").each(function(c) {
                    a == $(this).find("a").attr("id") && (d = null)
                });
                c.append(d);
                c.find(".j_entity_item").data("object", b)
            }
        },
        submitCheck: function(c, b) {
            var e = this.check(c);
            b(e)
        },
        checkEvents: function(c) {
            var b = this
              , e = b.el || $(document)
              , a = b.componentSetup.fieldId + this.cid
              , d = b.componentSetup.isUnique
              , h = b.componentSetup.orderContent
              , m = b.componentSetup.filterParams
              , n = b.componentSetup.formEntity
              , p = b.componentSetup.isAddForRelation;
            (new this.taskAhead({})).initAhead({
                fatherObj: b,
                fieldId: a,
                el: e,
                isUnique: d,
                orderContent: h,
                isAddForRelation: p
            });
            e.on("click", "#" + a + " .js_deleteTask", function() {
                var d = e.find("#" + a);
                b.triggerFillRelate(d);
                d = b.check(d);
                c(d)
            });
            e.on("click", "#" + a + " #searchList\x3ep", function() {
                b.triggerFillRelate(e.find("#" + a))
            });
            var w = e.find("#" + a + " #searchtask");
            if ("mobile" == window.systemInfo_form)
                e.on("click", "#" + a + " .task-seleted", function(c) {
                    var b = $(this).attr("data-module");
                    c = $(this).attr("data-multi");
                    $(this).attr("data-noempty") && $(this).attr("data-noempty");
                    var e = $(this).parents(".j_page-view")
                      , l = e.attr("id")
                      , w = $(this);
                    if (!$(this).parents(".j_formpreview").hasClass("form-noedit")) {
                        var u = $("#" + a + " .task-seleted .js_form-taskItem")
                          , y = [];
                        u && 0 < u.length && u.each(function(a) {
                            a = $(this).find(".entitybox-toggle").attr("taskId");
                            var c = $(this).find(".entitybox-toggle").text();
                            y.push({
                                name: c,
                                id: a,
                                module: b
                            })
                        });
                        "true" == d || 1 == d ? (u = new g,
                        u.render("mb", {
                            targetEl: w,
                            module: b,
                            multi: c,
                            preEl: "#" + l,
                            seletedList: y,
                            order: h,
                            filterParams: m,
                            isAddForRelation: p,
                            formEntity: n
                        })) : 0 == y.length ? (u = new g,
                        u.render("mb", {
                            targetEl: w,
                            module: b,
                            multi: c,
                            preEl: "#" + l,
                            seletedList: y,
                            order: h,
                            filterParams: m,
                            isAddForRelation: p,
                            formEntity: n
                        })) : (new f({
                            targetEl: w,
                            module: b,
                            multi: c,
                            preEl: "#" + l,
                            seletedList: y,
                            order: h,
                            filterParams: m,
                            isAddForRelation: p,
                            formEntity: n
                        })).render();
                        e.addClass("hide")
                    }
                });
            else
                w && 0 < w.size() && w.click(function() {
                    var c = e.find("#" + a + " .js_taskitem_container .js_form-taskItem");
                    e.find("#" + a + " .control-input").trigger("focusout", "tt");
                    var b = [];
                    c && 0 < c.length && c.each(function(a) {
                        a = $(this).find(".entitybox-toggle").attr("taskId");
                        var c = $(this).find(".entitybox-toggle").text();
                        b.push({
                            name: c,
                            id: a
                        })
                    });
                    var c = $(this).attr("data-entity")
                      , f = $(this)
                      , l = f.parent().find("input");
                    (new g).render("pc", {
                        targetEl: f,
                        keyword: l ? l.val() : "",
                        module: c,
                        type: f.attr("data-type"),
                        isUnique: d,
                        seletedList: b,
                        order: h,
                        filterParams: m,
                        formEntity: n,
                        isAddForRelation: p
                    })
                });
            e.off("entitySelected", "#" + a + " #searchtask").on("entitySelected", "#" + a + " #searchtask", function(c) {
                var e = $("#" + a);
                1 != d && "true" != d || $("#" + a + " .js_taskitem_container").empty();
                for (var f = 1; f < arguments.length; f++) {
                    var g = arguments[f];
                    e.parents(".field_js").find(".form-error").text("");
                    e.parents(".field_js").find(".form-error").hide();
                    var h = g.id
                      , g = g.name
                      , g = '\x3cspan name\x3d"js_form-taskItem" class\x3d"js_form-taskItem j_component employee-item"\x3e\x3ca data-id\x3d"' + h + '" data-module\x3d"task" taskId\x3d' + h + ' class\x3d"entitybox-toggle" title\x3d"' + g + '"\x3e' + g + '\x3c/a\x3e\x3ca class\x3d"close js_deleteTask" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e'
                      , m = $("#" + a + " .js_taskitem_container .js_form-taskItem");
                    m && m.each(function(a) {
                        h == $(this).find(".entitybox-toggle").attr("taskId") && $(this).remove()
                    });
                    e.find(".js_taskitem_container").append(g)
                }
                b.triggerFillRelate(e)
            });
            "mobile" == window.systemInfo_form && (e.on("objsComfirm", "#" + a + " .task-seleted", function(c, e) {
                var d = $("#" + a + " .js_taskitem_container")
                  , f = b.componentSetup.isUnique;
                d.text("");
                d.parents("#field_" + b.componentSetup.fieldId).find(".form-error").text("");
                "true" != f && 1 != f || d.empty();
                if (0 < e.objs.length) {
                    var f = e.objs, g;
                    for (g in f) {
                        var h = f[g];
                        if (h) {
                            var k = $("\x3cspan id\x3d" + h.id + ' name\x3d"js_form-taskItem" class\x3d"js_form-taskItem j_component employee-item"\x3e\x3ca taskId\x3d' + h.id + ' data-module\x3d"task" data-value\x3d' + h.id + " data-id\x3d" + h.id + ' class\x3d"entitybox-toggle"\x3e' + h.name + "\x3c/a\x3e\x3c/span\x3e");
                            d.append(k)
                        }
                    }
                } else
                    h = e.objs,
                    k = $("\x3cspan id\x3d" + h.id + ' name\x3d"js_form-taskItem" class\x3d"js_form-taskItem j_component employee-item"\x3e\x3ca taskId\x3d' + h.id + ' data-module\x3d"task" data-value\x3d' + h.id + " data-id\x3d" + h.id + ' class\x3d"entitybox-toggle"\x3e' + h.name + "\x3c/a\x3e\x3c/span\x3e"),
                    0 == h.length ? d.html('\x3cdiv class\x3d"widget-link-holder"\x3e\x3ci class\x3d"icon-plus2"\x3e\x3c/i\x3e\u9009\u62e9\u4efb\u52a1\x3c/div\x3e') : d.append(k);
                b.triggerFillRelate(d)
            }),
            e.on("deleteObj", "#" + a + " .task-seleted", function(c, e) {
                var d = $("#" + a + " .js_taskitem_container");
                d.find('span[id\x3d"' + e + '"]').remove();
                0 == d.find("span").length && d.html('\x3cdiv class\x3d"widget-link-holder"\x3e\x3ci class\x3d"icon-plus2"\x3e\x3c/i\x3e\u9009\u62e9\u4efb\u52a1\x3c/div\x3e');
                b.triggerFillRelate(d)
            }))
        },
        autoSaveEvents: function(c) {
            var b = this
              , e = b.el || $(document)
              , a = (b.componentSetup.fieldId || b.componentSetup.tempId) + this.cid;
            e.on("click", "#" + a + " .js_deleteTask", function() {
                b.saveComponentValue(e.find("#" + a), c)
            });
            "mobile" == window.systemInfo_form ? (e.on("objsComfirm", "#" + a + " .task-seleted", function(a, e) {
                b.saveComponentValue($(this), c)
            }),
            e.on("deleteObj", "#" + a + " .task-seleted", function(a, e) {
                b.saveComponentValue($(this), c)
            })) : (e.on("click", "#" + a + " #searchList\x3ep", function() {
                b.saveComponentValue($(this), c)
            }),
            e.on("entitySelected", "#" + a + " #searchtask", function(a) {
                b.saveComponentValue($(this), c)
            }))
        },
        taskAhead: Backbone.View.extend({
            defaults: function() {
                this.suggestion = "";
                this.remote = "/tasks/suggestion.json";
                this.entity = "task";
                this.tpl = h.get("task")
            },
            initAhead: function(c) {
                this.defaults();
                this.fatherObj = c.fatherObj;
                this.fieldId = c.fieldId;
                this.isUnique = c.isUnique;
                this.isDefault = c.isDefault;
                this.orderContent = c.orderContent;
                this.isAddForRelation = c.isAddForRelation;
                this.el = c.el;
                this.$continer = this.el.find("#" + this.fieldId);
                this._htmlEvents(c.callback)
            },
            _htmlEvents: function(c) {
                var b = this
                  , e = b.$continer
                  , a = b.fieldId
                  , d = this.el
                  , f = this.isUnique
                  , g = this.isDefault
                  , h = d.find("#" + b.fieldId + " #typeahead-form-task");
                d.on("mouseenter.typeahead", "#" + a + " .typeahead-wrapper", function(a) {
                    $(this).data("enter", !0)
                }).on("mouseleave.typeahead", "#" + a + " .typeahead-wrapper", function(a) {
                    $(this).data("enter", !1)
                });
                d.on("click", "#" + a + " .control-btn", function(a) {
                    a.stopPropagation();
                    $(this).addClass("hide");
                    $(this).prev(".typeahead-wrapper").removeClass("hide");
                    $(this).prev(".typeahead-wrapper").find(".control-input").focus()
                });
                d.on("focusout", "#" + a + " .control-input", function(a, c) {
                    var b = $(this).parents(".typeahead-wrapper");
                    b.data("enter") && "tt" != c || (b.addClass("hide"),
                    b.next(".control-btn").removeClass("hide"))
                });
                d.on("click.tt", "#" + a + " #searchList\x3ep", function() {
                    var e = $("#" + a);
                    g || (e.parents(".field_js").find(".form-error").text(""),
                    e.parents(".field_js").find(".form-error").hide());
                    if ($(this).hasClass("creat-new"))
                        h = $(this).attr("title"),
                        null != h && "" != h && (d = {
                            name: h,
                            content: ""
                        },
                        h = {
                            group: "today"
                        },
                        h.task = d,
                        $.ajax({
                            contentType: "application/json",
                            async: !1,
                            type: TEAMS.ajaxMethod,
                            url: "/task.json",
                            dataType: "json",
                            data: JSON.stringify(h),
                            success: function(d) {
                                d && d.message || b.appendSelect(d.task.id, d.task.name, a, e, f, c)
                            }
                        }));
                    else {
                        var d = $(this).data("obj")
                          , h = d.name;
                        b.appendSelect(d.id, h, a, e, f, c)
                    }
                });
                d.on("click", "#" + a + " .js_deleteTask", function() {
                    $(this).parent().remove();
                    "function" == typeof c && c()
                });
                h.off("focus.tt").on("focus.tt", function(a) {
                    b._search($(this))
                });
                h.off("click.tt").on("click.tt", function(a) {
                    a.stopPropagation()
                });
                h.off("keyup.tt").on("keyup.tt", function(a) {
                    a = a.which;
                    0 < $("body").find("#form-abposselect").length && (e = $("body").find("#form-abposselect").find(".field_js"));
                    13 == a ? (e.find("#task-typeahead-div p.active").trigger("click.tt"),
                    window.abposview && window.abposview.remove()) : 27 == a ? (h.trigger("focusout", "tt"),
                    window.abposview && window.abposview.remove()) : 38 == a ? (a = $("#task-typeahead-div p.active"),
                    1 > a.length ? e.find("#task-typeahead-div p").last().addClass("active") : (a.removeClass("active"),
                    (0 < a.prev().length ? a.prev() : e.find("#task-typeahead-div p").last()).addClass("active"))) : 40 == a ? (a = e.find("#task-typeahead-div p.active"),
                    1 > a.length ? e.find("#task-typeahead-div p").first().addClass("active") : (a.removeClass("active"),
                    (0 < a.next().length ? a.next() : e.find("#task-typeahead-div p").first()).addClass("active"))) : b._search($(this))
                });
                e.find("#task-typeahead-div").off("mouseenter.tt", "p").on("mouseenter.tt", "p", function() {
                    0 < $("body").find("#form-abposselect").length && (e = $("body").find("#form-abposselect").find(".field_js"));
                    $(this).addClass("active");
                    e.find("#task-typeahead-div p.active").removeClass("active")
                });
                e.off("click.tt", "#task-typeahead-div p").on("click.tt", "#task-typeahead-div p", function(a) {
                    h.trigger("focusout", "tt")
                })
            },
            appendSelect: function(c, b, e, a, d, f) {
                b = '\x3cspan name\x3d"js_form-taskItem" class\x3d"js_form-taskItem j_component employee-item"\x3e\x3ca data-id\x3d"' + c + '" data-module\x3d"task" taskId\x3d' + c + ' class\x3d"entitybox-toggle" title\x3d"' + b + '"\x3e' + b + '\x3c/a\x3e\x3ca class\x3d"close js_deleteTask" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e';
                e = $("#" + e + " .js_taskitem_container .js_form-taskItem");
                "true" == d || 1 == d ? (a.find(".js_taskitem_container").empty(),
                a.find(".js_taskitem_container").append(b)) : (e && e.each(function(a) {
                    c == $(this).find(".entitybox-toggle").attr("taskId") && $(this).remove()
                }),
                a.find(".js_taskitem_container").append(b),
                "function" == typeof f && f())
            },
            _search: function(c) {
                var b = this
                  , e = b.$continer
                  , a = $.trim(c.val());
                a == c.attr("placeholder") && (a = "");
                e.find("#task-typeahead-div #searchList").html("");
                0 < $("body").find("#form-abposselect").length ? ($("body").find("#form-abposselect").find(".field_js").find("#task-typeahead-div .loading_small").addClass(d).show(),
                e.find("#task-typeahead-div .loading_small").hide()) : e.find("#task-typeahead-div .loading_small").addClass(d).show();
                window.abposview && window.abposview.remove();
                var d = b.entity;
                c = b.remote;
                if (b.fatherObj.componentSetup.sformId || b.fatherObj.componentSetup.filterParams)
                    c = "/tasks/search.json";
                e = b.getParam(1, a, b.orderContent);
                $.ajax({
                    contentType: "application/json",
                    type: TEAMS.ajaxMethod,
                    url: c,
                    dataType: "json",
                    data: JSON.stringify(e),
                    success: function(c) {
                        var e = c.relevances;
                        if (b.fatherObj.componentSetup.sformId || b.fatherObj.componentSetup.filterParams)
                            e = c.page.result;
                        b._loadList(e, a)
                    }
                })
            },
            getParam: function(c, b, e) {
                e = {};
                if (this.fatherObj.componentSetup.sformId || this.fatherObj.componentSetup.filterParams) {
                    e.pageNo = c;
                    e.pageSize = 10;
                    var a = this.fatherObj.componentSetup.filterParams;
                    c = "";
                    a && "object" == typeof a ? (c = JSON.stringify(a).replace(/com_key/g, "componentKey"),
                    c = JSON.parse(c)) : a && "string" == typeof a && (c = a.replace(/com_key/g, "componentKey"),
                    c = JSON.parse(c));
                    var a = {
                        advFilter: {}
                    }
                      , d = [];
                    if (b) {
                        var f = {};
                        f.content = b;
                        f.term = "like";
                        d.push(f)
                    }
                    if (c && (c.names && 0 < c.names.length && (d = d.concat(c.names)),
                    c.creators && 0 < c.creators.length && (a.advFilter.creator = c.creators),
                    c.managers && 0 < c.managers.length && (a.advFilter.managers = c.managers),
                    c.participants && 0 < c.participants.length && (a.advFilter.participants = c.participants),
                    c.prioritys && 0 < c.prioritys.length && (a.advFilter.prioritys = c.prioritys),
                    c.createdates && 0 < c.createdates.length && (a.advFilter.createdates = this.queryDefultCheange(c.createdates)),
                    c.startTimes && 0 < c.startTimes.length && (a.advFilter.startTime = this.queryDefultCheange(c.startTimes)),
                    c.duedates && 0 < c.duedates.length && (a.advFilter.duedates = this.queryDefultCheange(c.duedates)),
                    c.commentTimes && 0 < c.commentTimes.length && (a.advFilter.commentTime = this.queryDefultCheange(c.commentTimes)),
                    c.types && 0 < c.types.length && (a.advFilter.types = c.types),
                    c.filterFormDatas && 0 < c.filterFormDatas.length)) {
                        b = [];
                        for (var f = [], g = [], h = [], m = 0; m < c.filterFormDatas.length; m++) {
                            var n = c.filterFormDatas[m];
                            "personalTag" == n.componentKey ? b.push(n) : "mainline" == n.componentKey ? h.push(n) : "publicTag" == n.componentKey ? f.push(n) : g.push(n)
                        }
                        a.advFilter.mainlines = h;
                        a.advFilter.personalTags = b;
                        a.advFilter.publicTags = f;
                        a.advFilter.releOthers = g
                    }
                    a.advFilter.names = d;
                    this.fatherObj.componentSetup.formEntity && (a.advFilter.taskForm = this.fatherObj.componentSetup.formEntity);
                    a.advFilter.isFilterSub = !1;
                    a.type = "all";
                    e.userId = TEAMS.currentUser.id;
                    e.noPageCount = !0;
                    e.viewState = "list";
                    e.filter = a
                } else
                    e.keywords = b,
                    e.searchType = this.entity;
                this.orderContent ? e.order = this.orderContent : (e.order = {},
                e.order.direction = "DESC",
                e.order.property = "default");
                return e
            },
            queryDefultCheange: function(c) {
                var b = [];
                if (c && 0 < c.length)
                    for (var e = 0; e < c.length; e++) {
                        var a = c[e];
                        a.selectedOption && ("three_day-no" == a.selectedOption ? (a = {},
                        a.content = this.getDateTime(0),
                        a.endContent = this.getDateTime(3)) : "one-weak-no" == a.selectedOption ? (a = {},
                        a.content = this.getDateTime(0),
                        a.endContent = this.getDateTime(7)) : (a = {},
                        a.content = this.getDateTime(0),
                        a.endContent = this.getDateTime(30)));
                        b.push(a)
                    }
                return b
            },
            getDateTime: function(c) {
                var b = new Date;
                b.setDate(b.getDate() + c);
                c = b.getFullYear();
                var e = 10 > b.getMonth() + 1 ? "0" + (b.getMonth() + 1) : b.getMonth() + 1
                  , b = 10 > b.getDate() ? "0" + b.getDate() : b.getDate();
                return c + "-" + e + "-" + b
            },
            _loadList: function(c, d) {
                var e = this.$continer;
                e.find("#task-typeahead-div #searchList").html("");
                0 < $("body").find("#form-abposselect").length ? $("body").find("#form-abposselect").find(".field_js").find("#task-typeahead-div .loading_small").hide() : e.find("#task-typeahead-div .loading_small").hide();
                if (null != c && 0 < c.length)
                    for (var a = 0, f = c.length; a < f; a++) {
                        var g = c[a];
                        g.name = g.name.replace(/</g, "\x26lt").replace(/>/g, "\x26gt").replace("/[\r\n]/g", " ");
                        var h = $(this.tpl).siblings("#task-clone").find(".j_task").clone();
                        h.text(g.name);
                        h.attr("title", g.name);
                        h.data("obj", g);
                        e.find("#task-typeahead-div #searchList").append(h)
                    }
                else {
                    if (null == d || "" == d)
                        return;
                    0 != this.isAddForRelation && "false" != this.isAddForRelation && (h = $('\x3cp class\x3d"task creat-new"\x3e\x3ci class\x3d"icon-plus-thin"\x3e\x3c/i\x3e \u6dfb\u52a0\u4efb\u52a1\uff1a' + d + "\x3c/p\x3e"),
                    h.attr("title", d),
                    e.find("#task-typeahead-div #searchList").find(".creat-new").remove(),
                    e.find("#task-typeahead-div #searchList").append(h))
                }
                e.find("#task-typeahead-div #searchList").show();
                window.abposview && window.abposview.remove();
                window.abposview = new b({
                    continer: e,
                    entity: this.entity
                });
                window.abposview.render()
            }
        }),
        check: function(c) {
            var b = $(c).find('span[name\x3d"js_form-taskItem"]').length
              , e = {};
            e.element = c;
            0 != b || "true" != this.componentSetup.required && 1 != this.componentSetup.required || (e.message = this.componentSetup.title + "\u4e0d\u80fd\u4e3a\u7a7a");
            return e
        },
        getValue: function(c, b) {
            var e = {
                formField: {
                    id: this.componentSetup.fieldId
                }
            }
              , a = c.find(".js_taskitem_container .js_form-taskItem");
            if (0 < a.length) {
                var d = [];
                a.each(function(a) {
                    var c = $(this).find(".entitybox-toggle").attr("taskId")
                      , b = $(this).find(".entitybox-toggle").text();
                    d[a] = {
                        optionId: c,
                        content: b,
                        type: "task"
                    }
                });
                e.dataOptions = d
            } else
                b || (e = null);
            return e
        },
        setValue: function(c, b) {
            $(this.tpl).siblings("#task-clone");
            c.find(".js_taskitem_container").empty();
            if (null != b && null != b.dataOptions)
                for (var e = 0; e < b.dataOptions.length; e++) {
                    var a = b.dataOptions[e]
                      , d = null == a.content ? "" : a.content
                      , a = a.optionId
                      , f = null
                      , f = "mobile" == window.systemInfo_form ? '\x3cspan href\x3d"/mobile/task/' + a + '" name\x3d"js_form-taskItem" id\x3d"' + a + '" class\x3d"router js_form-taskItem j_component employee-item"\x3e\x3ca data-module\x3d"task" data-id\x3d"' + a + '" data-value\x3d"' + a + '" taskId\x3d' + a + ' class\x3d"entitybox-toggle"\x3e' + d + "\x3c/a\x3e\x3c/span\x3e" : null != c.find(".js_form-task-add").get(0) ? '\x3cspan name\x3d"js_form-taskItem" id\x3d"' + a + '" class\x3d"js_form-taskItem j_component employee-item"\x3e\x3ca data-module\x3d"task" data-id\x3d"' + a + '" data-value\x3d"' + a + '" taskId\x3d' + a + ' class\x3d"entitybox-toggle" title\x3d"' + d + '"\x3e' + d + '\x3c/a\x3e\x3ca class\x3d"close js_deleteTask" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e' : '\x3cspan name\x3d"js_form-taskItem" id\x3d"' + a + '" class\x3d"js_form-taskItem j_component employee-item"\x3e\x3ca data-module\x3d"task" data-id\x3d"' + a + '" data-value\x3d"' + a + '" taskId\x3d' + a + ' class\x3d"entitybox-toggle" title\x3d"' + d + '"\x3e' + d + "\x3c/a\x3e\x3c/span\x3e";
                    c.find(".js_taskitem_container").append(f)
                }
        },
        empty: function(c) {
            c.find(".js_taskitem_container").html("")
        },
        readOnly: function(c, b) {
            var e = this.componentSetup.fieldId + this.cid
              , a = c.find('div[id\x3d"' + e + '"] span[name\x3d"js_form-task-add"]')
              , d = c.find('div[id\x3d"' + e + '"] span[name\x3d"js_form-taskItem"]')
              , f = c.find('div[id\x3d"' + e + '"] .js_deleteTask');
            b ? (a.remove(),
            f.remove()) : a && 0 != a.length && null != a || (a = $(this.tpl).siblings("#preview-task").find('span[name\x3d"js_form-task-add"]'),
            c.find('div[id\x3d"' + e + '"]').find(".js_taskitem_container").after(a),
            d.append('\x3ca class\x3d"close js_deleteTask" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e'))
        }
    });
    u.exports = window.Task
});
define("form/component/workflow", "form/relatecomponent form/tplutil form/component/entityselecter form/component/relevancecontrol form/componentmodel form/abposview".split(" "), function(n, y, u) {
    var m = n("form/relatecomponent")
      , h = n("form/tplutil")
      , g = n("form/component/entityselecter")
      , f = n("form/component/relevancecontrol")
      , d = n("form/componentmodel")
      , b = n("form/abposview");
    window.Workflow = m.extend({
        initialize: function(c) {
            m.prototype.initialize.call(this, c);
            var b = {
                componentKey: "Workflow",
                title: "\u5173\u8054\u5ba1\u6279",
                sformId: "",
                formName: "",
                orderContent: "",
                filterParams: "",
                filterQueryParams: ""
            };
            null != c && (b.title = c.title,
            b.sformId = c.sformId,
            b.formName = c.formName,
            b.orderContent = c.orderContent,
            b.filterParams = c.filterParams,
            b.filterQueryParams = c.filterQueryParams);
            this.componentSetup = $.extend(this.componentSetup, b);
            this.tpl = h.get("workflow", {
                isMobileForm: this.isMobileForm
            });
            this.componentModel = new d
        },
        setSformId: function(c) {
            this.componentSetup.sformId = c
        },
        setFormName: function(c) {
            this.componentSetup.formName = c
        },
        setOrderContent: function(c) {
            this.componentSetup.orderContent = c
        },
        setFilterParams: function(c) {
            this.componentSetup.filterParams = c
        },
        setFilterQueryParams: function(c) {
            this.componentSetup.filterQueryParams = c
        },
        render: function(c) {
            var b = this
              , e = $(this.tpl).siblings("#form-workflow");
            m.prototype.render.call(this, c, e);
            this.componentModel.generatorId(function(a) {
                b.componentSetup.tempId = a.generatorId;
                c.attr("tempId", a.generatorId)
            });
            c.html(e.html())
        },
        renderEditor: function() {
            var c = $(this.tpl).siblings("#editor-workflow");
            c.find(".j_default_container").attr("id", this.componentSetup.fieldId + this.cid);
            var b = !1;
            if ("true" == this.componentSetup.isUnique || 1 == this.componentSetup.isUnique)
                b = !0;
            c.find("#isUnique").attr("checked", b);
            var b = this.componentSetup.sformId
              , e = this.componentSetup.formName;
            b && (c.find("#form_select_input").attr("value", e).attr("formId", b),
            c.find(".j_delete-box").removeClass("hide"));
            m.prototype.renderEditor.call(this, c);
            $("#editor-component").html(c.html());
            if ((c = this.componentSetup.content) && 0 < c.length)
                for (b = $("#editor-component").find(".js_workflowitem_container"),
                e = 0; e < c.length; e++)
                    b.append('\x3cspan name\x3d"js_form-workflowItem" class\x3d"js_form-workflowItem j_component employee-item"\x3e\x3ca data-id\x3d"' + c[e].optionId + '" data-module\x3d"workflow" workflowId\x3d' + c[e].optionId + ' class\x3d"entitybox-toggle" title\x3d"' + c[e].content + '"\x3e' + c[e].content + '\x3c/a\x3e\x3ca class\x3d"close js_deleteWorkflow" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e');
            this.selectEvents()
        },
        selectEvents: function() {
            var c = this
              , b = $("#editor-component").find("#j_default_value")
              , e = this.componentSetup.fieldId + this.cid
              , a = this.componentSetup.sformId
              , d = this.componentSetup.orderContent
              , f = c.componentSetup.filterParams;
            this.typeAhead = new this.workflowAhead({});
            this.typeAhead.initAhead({
                fieldId: e,
                el: b,
                formId: a,
                orderContent: d,
                filterParams: f,
                isDefault: !0,
                callback: function() {
                    c.setDefaultValue()
                }
            });
            b.find("#" + e + " #searchworkflow").click(function() {
                var c = b.find("#" + e + " .js_workflowitem_container .js_form-workflowItem");
                b.find("#" + e + " .control-input").trigger("focusout", "tt");
                var h = [];
                c && 0 < c.length && c.each(function(a) {
                    a = $(this).find(".entitybox-toggle").attr("workflowId");
                    var c = $(this).find(".entitybox-toggle").text();
                    h.push({
                        name: c,
                        id: a
                    })
                });
                var c = $(this).attr("data-entity")
                  , m = $(this)
                  , n = m.parent().find("input");
                (new g).render("pc", {
                    targetEl: m,
                    keyword: n ? n.val() : "",
                    formId: a,
                    module: c,
                    type: m.attr("data-type"),
                    isUnique: isUnique,
                    seletedList: h,
                    order: d,
                    filterParams: f
                })
            });
            b.off("entitySelected", "#" + e + " #searchworkflow").on("entitySelected", "#" + e + " #searchworkflow", function(a) {
                b.find("#" + e + " .js_workflowitem_container").empty();
                for (var d = 1; d < arguments.length; d++) {
                    var f = arguments[d]
                      , g = $("#" + e);
                    g.parents(".field_js").find(".form-error").text("");
                    g.parents(".field_js").find(".form-error").hide();
                    var h = f.id
                      , k = f.name
                      , k = k + (null == f.serNum ? "" : f.serNum) + ""
                      , f = '\x3cspan name\x3d"js_form-workflowItem" class\x3d"js_form-workflowItem j_component employee-item"\x3e\x3ca data-id\x3d"' + h + '" data-module\x3d"workflow" workflowId\x3d' + h + ' class\x3d"entitybox-toggle" title\x3d"' + k + '"\x3e' + k + '\x3c/a\x3e\x3ca class\x3d"close js_deleteWorkflow" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e';
                    (k = $("#" + e + " .js_workflowitem_container .js_form-workflowItem")) && k.each(function(a) {
                        h == $(this).find(".entitybox-toggle").attr("workflowId") && ($(this).remove(),
                        flag = !1)
                    });
                    g.find(".js_workflowitem_container").append(f)
                }
                c.setDefaultValue()
            })
        },
        setDefaultValue: function() {
            var c = $("#editor-component").find(".js_workflowitem_container .js_form-workflowItem")
              , b = [];
            0 < c.length && c.each(function(c) {
                var a = $(this).find(".entitybox-toggle").attr("workflowId")
                  , d = $(this).find(".entitybox-toggle").text();
                b[c] = {
                    optionId: a,
                    content: d
                }
            });
            this.componentSetup.content = b
        },
        renderPreview: function(c, b, e, a, d) {
            var f = $(this.tpl);
            a = null;
            (a = $("body").find("#formTenantKey").val()) ? a = a.toUpperCase() : null != TEAMS.currentTenant && (a = TEAMS.currentTenant.tenantKey.toUpperCase());
            if ($("body").find("#scanReport").val() || null != TEAMS.currentUser && TEAMS.currentTenant.tenantKey.toUpperCase() == a)
                if (a = this.getCurrentModuleIsPay(d),
                0 == a || "false" == a) {
                    d = formPlugin.moduleIsPay("workflow");
                    var g = $('\x3cspan class\x3d"employee-item"\x3e\u60a8\u7684\u56e2\u961f\u76ee\u524d\u662f\u514d\u8d39\u7248\u672c\uff0c\u4e0d\u652f\u6301\u6b64\u529f\u80fd\uff01\x3c/span\x3e');
                    "mobile" != window.systemInfo_form ? (a = f.siblings("#preview-workflow"),
                    d || (a.find(".js_workflowitem_container").empty().append(g),
                    a.find(".js_form-workflow-add").addClass("hide"),
                    a.find(".typeahead-wrapper").remove())) : (a = f.siblings("#mobile-preview"),
                    d || a.find(".js_workflowitem_container").removeClass("workflow-seleted").empty().append(g))
                } else
                    a = "mobile" != window.systemInfo_form ? f.siblings("#preview-workflow") : f.siblings("#mobile-preview");
            else
                a = f.siblings("#noworkflow-preview"),
                a.find(".field_message_js").attr("cid", this.cid);
            if ((f = TEAMS.disableModules) && 0 < f.length)
                for (d = 0; d < f.length; d++) {
                    var g = f[d]
                      , h = g.moduleId;
                    if (g.module && "workflow" == g.module && h && 3 >= h.length) {
                        a.addClass("hide");
                        break
                    }
                }
            a.find(".widget-title .widget-title_js").text(this.componentSetup.title);
            "true" != this.componentSetup.isHideTitle && 1 != this.componentSetup.isHideTitle || a.addClass("field-notitle").find(".widget-title .widget-title_js").addClass("hide");
            "true" != this.componentSetup.required && 1 != this.componentSetup.required || a.find(".widget-title .widget-required_js").text(" *");
            "" != this.componentSetup.describe && a.find(".field-description").text(this.componentSetup.describe).show();
            a.find(".check_js").attr("id", this.componentSetup.fieldId + this.cid).attr("name", this.componentSetup.fieldId).attr("cid", this.cid).data("componentData", this);
            a.attr("id", "field_" + (this.componentSetup.fieldId || this.componentSetup.tempId));
            "mobile" == window.systemInfo_form && a.find(".workflow-seleted").attr("id", this.componentSetup.fieldId);
            f = this.componentSetup.isUnique;
            if ("true" == f || 1 == f)
                "mobile" != window.systemInfo_form ? a.find("#searchworkflow").removeAttr("data-multi") : a.find(".js_workflowitem_container").attr("data-multi", "false");
            a.addClass(this.componentSetup.titleLayout);
            "true" != this.componentSetup.isDefault && 1 != this.componentSetup.isDefault || b || (b = this.componentSetup.content) && 0 < b.length && null != TEAMS.currentUser && this.setValue(a, {
                dataOptions: b
            });
            if (e || "true" == e)
                "mobile" != window.systemInfo_form ? this.readOnly(a, !0) : a.find(".js_workflowitem_container").removeClass("workflow-seleted").text("");
            if ("true" == this.componentSetup.isReadOnly || 1 == this.componentSetup.isReadOnly)
                "mobile" != window.systemInfo_form ? this.readOnly(a, !0) : (a.find(".js_workflowitem_container").removeClass("workflow-seleted"),
                (b = this.componentSetup.content) && 0 != b.length || a.find(".js_workflowitem_container").text(""));
            this.getValue(a);
            this.el = c;
            c.append(a)
        },
        getCurrentModuleIsPay: function(c) {
            var b = !1;
            c && (b = formPlugin.moduleIsPay(c));
            return b
        },
        renderEditPreview: function(c, b) {
            var e = $(this.tpl).siblings("#form-workflow");
            m.prototype.renderEditPreview.call(this, c, e);
            b ? c.replaceWith(e) : c.append(e)
        },
        renderStatSearch: function(c) {
            var b = this
              , e = $(this.tpl)
              , a = null
              , d = c.ids
              , f = c.term
              , g = c.parentEl
              , h = c.container
              , m = c.subFormId
              , n = c.filterEl
              , v = c.fieldId
              , s = c.fieldTitle
              , u = c.condition
              , x = g.find(".j_formField-select select").find("option:selected").attr("module") || c.module;
            if ("mobile" != window.systemInfo_form) {
                a = e.siblings("#statsearch-entity");
                if (d)
                    for (a.find(".entity-container").empty(),
                    s = 0; s < d.length; s++)
                        c = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d"' + d[s].id + '" title\x3d"' + d[s].text + '"\x3e' + d[s].text + "\x3c/a\x3e\x3c/span\x3e",
                        a.find(".entity-container").append(c);
                f && a.find("select:first option[value\x3d" + f + "]").attr("selected", "true");
                d = (new Date).getTime();
                a.find(".j_entityContainer").attr("id", "j_workflow" + d);
                g.attr("class", "sch-group j_formFieldSearchGroup");
                g.find(".j_formField-condition").html(a);
                var y = $(h + " #j_workflow" + d + " #typeahead-workflow")
                  , f = TEAMS.service.flow + "/workflowlist/suggestion.json";
                "biaoge" == x && (f = "/formdata/queryRelevanceDataOptions.json",
                y.attr("fieldId", v).attr("pageNo", "1").attr("pageSize", "10"),
                y.parents(".j_entityContainer").find(".typeahead-search").attr("url", f).attr("fieldId", v));
                window.typeahead && window.typeahead.init && window.typeahead.init({
                    el: h + " #j_workflow" + d + " #typeahead-workflow",
                    remote: f,
                    callback: function(a) {
                        if (a && !$.isEmptyObject(a)) {
                            var c = y.parents(".j_entityContainer").find(".j_selected");
                            b.renderTypeheader(c, a)
                        }
                    }
                })
            } else
                a = e.siblings("#statsearch-workflow-mobile"),
                u && (a.find(".j_condition").find('option[value\x3d"' + u + '"]').attr("selected", !0),
                "null" != u && "notnull" != u || a.find(".j_control").hide()),
                n && (a.find("#seleted-list").empty(),
                n.find(".j_filterList .selectd #comp-val span").each(function() {
                    var c = $(this).attr("optionId")
                      , b = $(this).text()
                      , e = $("\x3cspan\x3e\x3c/span\x3e");
                    e.attr("id", c).text(b);
                    a.find("#seleted-list").append(e)
                })),
                h = {},
                h.module = x,
                h.pageNo = 1,
                h.pageSize = "20",
                h.fieldId = v,
                b.searchWorkflow(h, a, v, s, g, m),
                g.off("change", "#statsearch-workflow-mobile .j_condition").on("change", "#statsearch-workflow-mobile .j_condition", function() {
                    var a = $(this).val();
                    "null" == a || "notnull" == a ? g.find("#statsearch-workflow-mobile .j_control").hide() : g.find("#statsearch-workflow-mobile .j_control").show()
                }),
                g.off("tap", "#statsearch-workflow-mobile .j_optionli").on("tap", "#statsearch-workflow-mobile .j_optionli", function() {
                    var a = $(this);
                    a.hasClass("selected") ? a.removeClass("selected") : a.addClass("selected");
                    var c = a.find(".j_optionname").text()
                      , a = a.attr("id")
                      , c = '\x3cspan id\x3d"' + a + '"\x3e' + c + "\x3c/span\x3e";
                    0 < g.find("#statsearch-workflow-mobile #seleted-list #" + a).length ? g.find("#statsearch-workflow-mobile #seleted-list #" + a).remove() : g.find("#statsearch-workflow-mobile #seleted-list").append(c)
                }),
                g.off("tap", "#statsearch-workflow-mobile .j_more").on("tap", "#statsearch-workflow-mobile .j_more", function() {
                    var c = $(this)
                      , e = c.attr("pageNo")
                      , d = c.attr("fieldId")
                      , c = c.attr("title")
                      , f = {
                        pageSize: "20"
                    };
                    f.fieldId = d;
                    f.pageNo = e;
                    f.module = x;
                    b.searchWorkflow(f, a, d, c, g, m)
                })
        },
        searchWorkflow: function(c, b, e, a, d, f) {
            $.ajax({
                contentType: "application/json",
                type: TEAMS.ajaxMethod,
                url: "freeform/queryFormDataOptions.json",
                dataType: "json",
                data: JSON.stringify(c),
                success: function(c) {
                    var g = c.dataOptionPage;
                    if (0 == g.totalCount)
                        b.find(".j_noresult").removeClass("hide"),
                        b.find(".eui-cells").addClass("hide");
                    else
                        for (g.hasNext && b.find(".j_more").removeClass("hide").attr("pageNo", g.pageNo + 1).attr("fieldId", e).attr("title", a),
                        c = g.result,
                        1 == g.pageNo && b.find(".j_optionUl").empty(),
                        b.find("#seleted-list").attr("fieldId", e),
                        g = 0; g < c.length; g++) {
                            var h = c[g]
                              , m = h.content
                              , h = h.optionId
                              , n = b.find("#li-clone li").clone();
                            0 < b.find("#seleted-list").find("#" + h).length && n.addClass("selected");
                            n.find(".j_optionname").text(m);
                            n.attr("id", h);
                            b.find(".j_optionUl").append(n)
                        }
                    d.find("#component-div").html(b);
                    d.find(".j_comp-ok").attr("comKey", "Workflow").attr("fieldId", e).attr("title", a).attr("subFormId", f)
                }
            })
        },
        renderTypeheader: function(c, b) {
            var e = b.name
              , a = b.id;
            if (e && a) {
                var d = '\x3cspan id\x3d"' + a + '" class\x3d"entity-item j_entity_item" name\x3d"j_entity_item"\x3e\x3ca title\x3d"' + e + '" id\x3d"' + a + '" class\x3d"entitybox-toggle" data-module\x3d"workflow" data-value\x3d"' + a + '" data-id\x3d"' + a + '"\x3e' + e + "\x3c/a\x3e\x3c/span\x3e";
                c.find(".entity-item").each(function(c) {
                    a == $(this).find("a").attr("id") && (d = null)
                });
                c.append(d);
                c.find(".j_entity_item").data("object", b)
            }
        },
        submitCheck: function(c, b) {
            var e = this.check(c);
            b(e)
        },
        checkEvents: function(c) {
            var b = this
              , e = b.el || $(document)
              , a = b.componentSetup.fieldId + this.cid
              , d = b.componentSetup.sformId
              , h = b.componentSetup.isUnique
              , m = b.componentSetup.orderContent
              , n = b.componentSetup.filterParams
              , p = b.componentSetup.isAddForRelation;
            (new this.workflowAhead({})).initAhead({
                fieldId: a,
                el: e,
                formId: d,
                orderContent: m,
                isUnique: h,
                filterParams: n
            });
            e.on("click", "#" + a + " .js_deleteWorkflow", function() {
                var d = e.find("#" + a);
                b.triggerFillRelate(d);
                d = b.check(d);
                c(d)
            });
            e.on("click", "#" + a + " #searchList\x3ep", function() {
                b.triggerFillRelate(e.find("#" + a))
            });
            var u = e.find("#" + a + " #searchworkflow");
            if ("mobile" == window.systemInfo_form)
                e.on("click", "#" + a + " .workflow-seleted", function(c) {
                    var b = $(this).attr("data-module");
                    c = $(this).attr("data-multi");
                    $(this).attr("data-noempty") && $(this).attr("data-noempty");
                    var e = $(this).parents(".j_page-view")
                      , l = e.attr("id")
                      , p = $(this);
                    if (!$(this).parents(".j_formpreview").hasClass("form-noedit")) {
                        var u = $("#" + a + " .workflow-seleted .js_form-workflowItem")
                          , w = [];
                        u && 0 < u.length && u.each(function(a) {
                            a = $(this).find(".entitybox-toggle").attr("workflowId");
                            var c = $(this).find(".entitybox-toggle").text();
                            w.push({
                                name: c,
                                id: a,
                                module: b
                            })
                        });
                        "true" == h || 1 == h ? (u = new g,
                        u.render("mb", {
                            targetEl: p,
                            module: b,
                            multi: c,
                            formId: d,
                            preEl: "#" + l,
                            seletedList: w,
                            order: m,
                            filterParams: n
                        })) : 0 == w.length ? (u = new g,
                        u.render("mb", {
                            targetEl: p,
                            module: b,
                            multi: c,
                            formId: d,
                            preEl: "#" + l,
                            seletedList: w,
                            order: m,
                            filterParams: n
                        })) : (new f({
                            targetEl: p,
                            module: b,
                            multi: c,
                            formId: d,
                            preEl: "#" + l,
                            seletedList: w,
                            order: m
                        })).render();
                        e.addClass("hide")
                    }
                });
            else
                u && 0 < u.size() && u.click(function() {
                    var c = $("#" + a + " .js_workflowitem_container .js_form-workflowItem");
                    $("#" + a + " .control-input").trigger("focusout", "tt");
                    var b = [];
                    c && 0 < c.length && c.each(function(a) {
                        a = $(this).find(".entitybox-toggle").attr("workflowId");
                        var c = $(this).find(".entitybox-toggle").text();
                        b.push({
                            name: c,
                            id: a
                        })
                    });
                    var c = $(this).attr("data-entity")
                      , e = $(this)
                      , f = e.parent().find("input");
                    (new g).render("pc", {
                        targetEl: e,
                        keyword: f ? f.val() : "",
                        module: c,
                        formId: d,
                        type: e.attr("data-type"),
                        isUnique: h,
                        seletedList: b,
                        order: m,
                        filterParams: n,
                        isAddForRelation: p
                    })
                });
            e.off("entitySelected", "#" + a + " #searchworkflow").on("entitySelected", "#" + a + " #searchworkflow", function(c) {
                var d = $("#" + a);
                1 != h && "true" != h || e.find("#" + a + " .js_workflowitem_container").empty();
                for (var f = 1; f < arguments.length; f++) {
                    var g = arguments[f];
                    d.parents(".field_js").find(".form-error").text("");
                    d.parents(".field_js").find(".form-error").hide();
                    var k = g.id
                      , m = g.name
                      , m = m + (null == g.serNum ? "" : g.serNum) + ""
                      , g = '\x3cspan name\x3d"js_form-workflowItem" class\x3d"js_form-workflowItem j_component employee-item"\x3e\x3ca data-id\x3d"' + k + '" data-module\x3d"workflow" workflowId\x3d' + k + ' class\x3d"entitybox-toggle" title\x3d"' + m + '"\x3e' + m + '\x3c/a\x3e\x3ca class\x3d"close js_deleteWorkflow" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e';
                    (m = $("#" + a + " .js_workflowitem_container .js_form-workflowItem")) && m.each(function(a) {
                        k == $(this).find(".entitybox-toggle").attr("workflowId") && $(this).remove()
                    });
                    d.find(".js_workflowitem_container").append(g)
                }
                b.triggerFillRelate(d)
            });
            "mobile" == window.systemInfo_form && (e.on("objsComfirm", "#" + a + " .workflow-seleted", function(c, e) {
                var d = $("#" + a + " .js_workflowitem_container")
                  , f = b.componentSetup.isUnique;
                d.text("");
                d.parents("#field_" + b.componentSetup.fieldId).find(".form-error").text("");
                "true" != f && 1 != f || d.empty();
                if (0 < e.objs.length) {
                    var f = e.objs, g;
                    for (g in f) {
                        var h = f[g];
                        if (h) {
                            var k = h.name
                              , m = null == h.serNum ? "" : h.serNum
                              , k = k + m + ""
                              , k = $("\x3cspan id\x3d" + h.id + ' name\x3d"js_form-workflowItem" class\x3d"js_form-workflowItem j_component employee-item"\x3e\x3ca workflowId\x3d' + h.id + ' data-module\x3d"workflow" data-value\x3d' + h.id + " data-id\x3d" + h.id + ' class\x3d"entitybox-toggle"\x3e' + k + "\x3c/a\x3e\x3c/span\x3e");
                            d.append(k)
                        }
                    }
                } else
                    h = e.objs,
                    k = h.name,
                    m = null == h.serNum ? "" : h.serNum,
                    k = $("\x3cspan id\x3d" + h.id + ' name\x3d"js_form-workflowItem" class\x3d"js_form-workflowItem j_component employee-item"\x3e\x3ca workflowId\x3d' + h.id + ' data-module\x3d"workflow" data-value\x3d' + h.id + " data-id\x3d" + h.id + ' class\x3d"entitybox-toggle"\x3e' + (k + m + "") + "\x3c/a\x3e\x3c/span\x3e"),
                    0 == h.length ? d.html('\x3cdiv class\x3d"widget-link-holder"\x3e\x3ci class\x3d"icon-plus2"\x3e\x3c/i\x3e\u9009\u62e9\u5ba1\u6279\x3c/div\x3e') : d.append(k);
                b.triggerFillRelate(d)
            }),
            e.on("deleteObj", "#" + a + " .workflow-seleted", function(c, e) {
                var d = $("#" + a + " .js_workflowitem_container");
                d.find('span[id\x3d"' + e + '"]').remove();
                0 == d.find("span").length && d.html('\x3cdiv class\x3d"widget-link-holder"\x3e\x3ci class\x3d"icon-plus2"\x3e\x3c/i\x3e\u9009\u62e9\u5ba1\u6279\x3c/div\x3e');
                b.triggerFillRelate(d)
            }))
        },
        autoSaveEvents: function(c) {
            var b = this
              , e = b.el || $(document)
              , a = (b.componentSetup.fieldId || b.componentSetup.tempId) + this.cid;
            e.on("click", "#" + a + " .js_deleteWorkflow", function() {
                b.saveComponentValue(e.find("#" + a), c)
            });
            "mobile" == window.systemInfo_form ? (e.on("objsComfirm", "#" + a + " .workflow-seleted", function(a, e) {
                b.saveComponentValue($(this), c)
            }),
            e.on("deleteObj", "#" + a + " .workflow-seleted", function(a, e) {
                b.saveComponentValue($(this), c)
            })) : (e.on("click", "#" + a + " #searchList\x3ep", function() {
                b.saveComponentValue($(this), c)
            }),
            e.on("entitySelected", "#" + a + " #searchworkflow", function(a) {
                b.saveComponentValue($(this), c)
            }))
        },
        workflowAhead: Backbone.View.extend({
            defaults: function() {
                this.remote = this.suggestion = "";
                this.entity = "workflow";
                this.tpl = h.get("workflow")
            },
            initAhead: function(c) {
                this.defaults();
                this.options = c;
                this.fieldId = c.fieldId;
                this.isUnique = c.isUnique;
                this.isDefault = c.isDefault;
                this.formId = c.formId;
                this.orderContent = c.orderContent;
                this.filterParams = c.filterParams;
                this.el = c.el;
                this.$continer = this.el.find("#" + this.fieldId);
                this._htmlEvents(c.callback)
            },
            _htmlEvents: function(c) {
                var b = this
                  , e = b.$continer
                  , a = b.fieldId
                  , d = this.el
                  , f = this.isUnique
                  , g = $("#" + b.fieldId + " #typeahead-form-workflow");
                d.on("mouseenter.typeahead", "#" + a + " .typeahead-wrapper", function(a) {
                    $(this).data("enter", !0)
                }).on("mouseleave.typeahead", "#" + a + " .typeahead-wrapper", function(a) {
                    $(this).data("enter", !1)
                });
                d.on("click", "#" + a + " .control-btn", function(a) {
                    a.stopPropagation();
                    $(this).addClass("hide");
                    $(this).prev(".typeahead-wrapper").removeClass("hide");
                    $(this).prev(".typeahead-wrapper").find(".control-input").focus()
                });
                d.on("focusout", "#" + a + " .control-input", function(a, c) {
                    var b = $(this).parents(".typeahead-wrapper");
                    b.data("enter") && "tt" != c || (b.addClass("hide"),
                    b.next(".control-btn").removeClass("hide"))
                });
                d.on("click.tt", "#" + a + " #searchList\x3ep", function() {
                    var b = $("#" + a);
                    b.parents(".field_js").find(".form-error").text("");
                    b.parents(".field_js").find(".form-error").hide();
                    var e = $(this).data("obj")
                      , d = e.id
                      , g = e.name
                      , g = g + (null == e.serNum ? "" : e.serNum) + ""
                      , e = '\x3cspan name\x3d"js_form-workflowItem" class\x3d"js_form-workflowItem j_component employee-item"\x3e\x3ca data-id\x3d"' + d + '" data-module\x3d"workflow" workflowId\x3d' + d + ' class\x3d"entitybox-toggle" title\x3d"' + g + '"\x3e' + g + '\x3c/a\x3e\x3ca class\x3d"close js_deleteWorkflow" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e'
                      , g = $("#" + a + " .js_workflowitem_container .js_form-workflowItem");
                    "true" == f || 1 == f ? (b.find(".js_workflowitem_container").empty(),
                    b.find(".js_workflowitem_container").append(e)) : (g && g.each(function(a) {
                        d == $(this).find(".entitybox-toggle").attr("workflowId") && $(this).remove()
                    }),
                    b.find(".js_workflowitem_container").append(e),
                    "function" == typeof c && c())
                });
                d.on("click", "#" + a + " .js_deleteWorkflow", function() {
                    $(this).parent().remove();
                    "function" == typeof c && c()
                });
                g.off("focus.tt").on("focus.tt", function(a) {
                    b._search($(this))
                });
                g.off("click.tt").on("click.tt", function(a) {
                    a.stopPropagation()
                });
                g.off("keyup.tt").on("keyup.tt", function(a) {
                    a = a.which;
                    0 < $("body").find("#form-abposselect").length && (e = $("body").find("#form-abposselect").find(".field_js"));
                    13 == a ? (e.find("#workflow-typeahead-div p.active").trigger("click.tt"),
                    window.abposview && window.abposview.remove()) : 27 == a ? (g.trigger("focusout", "tt"),
                    window.abposview && window.abposview.remove()) : 38 == a ? (a = $("#workflow-typeahead-div p.active"),
                    1 > a.length ? e.find("#workflow-typeahead-div p").last().addClass("active") : (a.removeClass("active"),
                    (0 < a.prev().length ? a.prev() : e.find("#workflow-typeahead-div p").last()).addClass("active"))) : 40 == a ? (a = e.find("#workflow-typeahead-div p.active"),
                    1 > a.length ? e.find("#workflow-typeahead-div p").first().addClass("active") : (a.removeClass("active"),
                    (0 < a.next().length ? a.next() : e.find("#workflow-typeahead-div p").first()).addClass("active"))) : b._search($(this))
                });
                e.find("#workflow-typeahead-div").off("mouseenter.tt", "p").on("mouseenter.tt", "p", function() {
                    0 < $("body").find("#form-abposselect").length && (e = $("body").find("#form-abposselect").find(".field_js"));
                    $(this).addClass("active");
                    e.find("#workflow-typeahead-div p.active").removeClass("active")
                });
                e.off("click.tt", "#workflow-typeahead-div p").on("click.tt", "#workflow-typeahead-div p", function(a) {
                    g.trigger("focusout", "tt")
                })
            },
            _search: function(c) {
                var b = this
                  , e = b.$continer
                  , a = $.trim(c.val());
                a == c.attr("placeholder") && (a = "");
                e.find("#workflow-typeahead-div #searchList").html("");
                0 < $("body").find("#form-abposselect").length ? ($("body").find("#form-abposselect").find(".field_js").find("#workflow-typeahead-div .loading_small").addClass(d).show(),
                e.find("#workflow-typeahead-div .loading_small").hide()) : e.find("#workflow-typeahead-div .loading_small").addClass(d).show();
                window.abposview && window.abposview.remove();
                if (b.list && b.suggestion === a)
                    b._loadList(b.list);
                else {
                    var d = b.entity;
                    c = TEAMS.service.flow + "/workflowlist/suggestion.json";
                    b.filterParams && (c = TEAMS.service.flow + "/flowdatastat/advanceFlowSearch.json");
                    a = b.getParam(1, a, b.orderContent);
                    b.orderContent && (a.order = b.orderContent);
                    $.ajax({
                        contentType: "application/json",
                        type: TEAMS.ajaxMethod,
                        url: c,
                        dataType: "json",
                        data: JSON.stringify(a),
                        success: function(a) {
                            if (!a.message) {
                                var c = a.relevances;
                                b.filterParams && a && a.flowPage && (c = a.flowPage.result);
                                b.list = c;
                                b._loadList(c)
                            }
                        }
                    })
                }
            },
            getParam: function(c, b, e) {
                e = {};
                if (this.filterParams) {
                    e.pageNo = c;
                    e.pageSize = 10;
                    var a = this.filterParams;
                    c = "";
                    a && "object" == typeof a ? (c = JSON.stringify(a).replace(/com_key/g, "componentKey"),
                    c = JSON.parse(c)) : a && "string" == typeof a && (c = a.replace(/com_key/g, "componentKey"),
                    c = JSON.parse(c));
                    a = [];
                    if (b) {
                        var d = {};
                        d.content = b;
                        d.term = "like";
                        a.push(d)
                    }
                    if (c) {
                        if (c.flowNames && 0 < c.flowNames.length) {
                            for (b = 0; b < c.flowNames.length; b++)
                                "eq" == c.flowNames[b].term && (c.flowNames[b].term = "like");
                            e.names = a.concat(c.flowNames)
                        }
                        c.flowSubmitTimes && 0 < c.flowSubmitTimes.length && (e.createTimes = this.queryDefultCheange(c.flowSubmitTimes));
                        c.flowFinishTime && 0 < c.flowFinishTime.length && (e.finishTimes = this.queryDefultCheange(c.flowFinishTime));
                        if (c.flowStatuss && 0 < c.flowStatuss.length)
                            for (e.types = [],
                            b = 0; b < c.flowStatuss.length; b++) {
                                a = {};
                                if (c.flowStatuss[b].ids) {
                                    for (var d = [], f = 0; f < c.flowStatuss[b].ids.length; f++)
                                        d.push(c.flowStatuss[b].ids[f]);
                                    a.ids = d
                                }
                                a.term = c.flowStatuss[b].term;
                                e.types.push(a)
                            }
                        if (c.flowOperators && 0 < c.flowOperators.length) {
                            e.operators = [];
                            for (b = 0; b < c.flowOperators.length; b++) {
                                var g = {};
                                if (c.flowOperators[b].ids) {
                                    d = [];
                                    for (f = 0; f < c.flowOperators[b].ids.length; f++)
                                        d.push(c.flowOperators[b].ids[f]);
                                    g.ids = d
                                }
                                g.term = c.flowOperators[b].term
                            }
                            e.operators.push(g)
                        }
                        if (c.filterFormDatas && 0 < c.filterFormDatas.length)
                            for (e.filterFormDatas = [],
                            b = 0; b < c.filterFormDatas.length; b++)
                                e.filterFormDatas.push(this.getFilterByFlow(c.filterFormDatas[b]))
                    }
                    e.formId = this.options.formId;
                    e.module = "workflow"
                } else
                    e.formId = this.options.formId,
                    e.keywords = b,
                    e.searchType = this.entity;
                this.orderContent && (e.order = this.orderContent);
                return e
            },
            getFilterByFlow: function(c) {
                var b = {};
                if ("DateComponent" == c.com_key || "NumberComponent" == c.com_key || "Monitor" == c.com_key || "Raty" == c.com_key)
                    b.content = c.content,
                    b.endContent = c.endContent;
                else if (c.ids) {
                    b.ids = [];
                    for (var e = 0; e < c.ids.length; e++)
                        b.ids.push(c.ids[e])
                }
                b.term = c.term;
                b.componentKey = c.com_key;
                b.fieldId = c.fieldId;
                b.fieldTitle = c.fieldTitle;
                return b
            },
            queryDefultCheange: function(c) {
                var b = [];
                if (c && 0 < c.length)
                    for (var e = 0; e < c.length; e++) {
                        var a = c[e];
                        a.selectedOption && ("three_day-no" == a.selectedOption ? (a = {},
                        a.content = this.getDateTime(0),
                        a.endContent = this.getDateTime(3)) : "one-weak-no" == a.selectedOption ? (a = {},
                        a.content = this.getDateTime(0),
                        a.endContent = this.getDateTime(7)) : (a = {},
                        a.content = this.getDateTime(0),
                        a.endContent = this.getDateTime(30)));
                        b.push(a)
                    }
                return b
            },
            getDateTime: function(c) {
                var b = new Date;
                b.setDate(b.getDate() + c);
                c = b.getFullYear();
                var e = 10 > b.getMonth() + 1 ? "0" + (b.getMonth() + 1) : b.getMonth() + 1
                  , b = 10 > b.getDate() ? "0" + b.getDate() : b.getDate();
                return c + "-" + e + "-" + b
            },
            _loadList: function(c) {
                var d = this.$continer;
                0 < $("body").find("#form-abposselect").length ? $("body").find("#form-abposselect").find(".field_js").find("#workflow-typeahead-div .loading_small").hide() : d.find("#workflow-typeahead-div .loading_small").hide();
                for (var e = 0, a = c.length; e < a; e++) {
                    var f = c[e];
                    f.name = f.name.replace(/</g, "\x26lt").replace(/>/g, "\x26gt").replace("/[\r\n]/g", " ");
                    var g = $(this.tpl).siblings("#workflow-clone").find(".j_workflow").clone()
                      , h = null == f.serNum ? "" : f.serNum;
                    g.text(f.name + h + "");
                    g.attr("title", f.name + h + "");
                    g.data("obj", f);
                    d.find("#workflow-typeahead-div #searchList").append(g)
                }
                d.find("#workflow-typeahead-div #searchList").show();
                window.abposview && window.abposview.remove();
                window.abposview = new b({
                    continer: d,
                    entity: this.entity
                });
                window.abposview.render()
            }
        }),
        check: function(c) {
            var b = $(c).find('span[name\x3d"js_form-workflowItem"]').length
              , e = {};
            e.element = c;
            0 != b || "true" != this.componentSetup.required && 1 != this.componentSetup.required || (e.message = this.componentSetup.title + "\u4e0d\u80fd\u4e3a\u7a7a");
            return e
        },
        getValue: function(c, b) {
            var e = {
                formField: {
                    id: this.componentSetup.fieldId
                }
            }
              , a = c.find(".js_workflowitem_container .js_form-workflowItem");
            if (0 < a.length) {
                var d = [];
                a.each(function(a) {
                    var c = $(this).find(".entitybox-toggle").attr("workflowId")
                      , b = $(this).find(".entitybox-toggle").text();
                    d[a] = {
                        optionId: c,
                        content: b,
                        type: "workflow"
                    }
                });
                e.dataOptions = d
            } else
                b || (e = null);
            return e
        },
        setValue: function(c, b) {
            $(this.tpl).siblings("#workflow-clone");
            c.find(".js_workflowitem_container").empty();
            if (null != b && null != b.dataOptions)
                for (var e = 0; e < b.dataOptions.length; e++) {
                    var a = b.dataOptions[e]
                      , d = null == a.content ? "" : a.content
                      , a = a.optionId
                      , f = null;
                    "mobile" == window.systemInfo_form ? (f = TEAMS.currentUser && TEAMS.currentUser.id ? '\x3cspan href\x3d"/mobile/workflows/' + TEAMS.currentUser.id : '\x3cspan href\x3d"/mobile/workflows',
                    f = f + "/" + a + '" name\x3d"js_form-workflowItem" id\x3d"' + a + '" class\x3d"router js_form-workflowItem j_component employee-item"\x3e\x3ca data-module\x3d"workflow" data-id\x3d"' + a + '" data-value\x3d"' + a + '" workflowId\x3d' + a + ' class\x3d"entitybox-toggle"\x3e' + d + "\x3c/a\x3e\x3c/span\x3e") : f = null != c.find(".js_form-workflow-add").get(0) ? '\x3cspan name\x3d"js_form-workflowItem" id\x3d"' + a + '" class\x3d"js_form-workflowItem j_component employee-item"\x3e\x3ca data-module\x3d"workflow" data-id\x3d"' + a + '" data-value\x3d"' + a + '" workflowId\x3d' + a + ' class\x3d"entitybox-toggle" title\x3d"' + d + '"\x3e' + d + '\x3c/a\x3e\x3ca class\x3d"close js_deleteWorkflow" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e\x3c/span\x3e' : '\x3cspan name\x3d"js_form-workflowItem" id\x3d"' + a + '" class\x3d"js_form-workflowItem j_component employee-item"\x3e\x3ca data-module\x3d"workflow" data-id\x3d"' + a + '" data-value\x3d"' + a + '" workflowId\x3d' + a + ' class\x3d"entitybox-toggle" title\x3d"' + d + '"\x3e' + d + "\x3c/a\x3e\x3c/span\x3e";
                    c.find(".js_workflowitem_container").append(f)
                }
        },
        empty: function(c) {
            c.find(".js_workflowitem_container").html("")
        },
        readOnly: function(c, b) {
            var e = this.componentSetup.fieldId + this.cid
              , a = c.find('div[id\x3d"' + e + '"] span[name\x3d"js_form-workflow-add"]')
              , d = c.find('div[id\x3d"' + e + '"] span[name\x3d"js_form-workflowItem"]')
              , f = c.find('div[id\x3d"' + e + '"] .js_deleteWorkflow');
            b ? (a.remove(),
            f.remove()) : a && 0 != a.length && null != a || (a = $(this.tpl).siblings("#preview-workflow").find('span[name\x3d"js_form-workflow-add"]'),
            c.find('div[id\x3d"' + e + '"]').find(".js_workflowitem_container").after(a),
            d.append('\x3ca class\x3d"close js_deleteWorkflow" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e'))
        }
    });
    u.exports = window.Workflow
});