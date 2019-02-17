define("form/editDataSourcespage", ["form/editDataSourcesview"], function(n) {
    n = n("form/editDataSourcesview");
    n = new n({
        el: "#editDataSource"
    });
    n.render()
});
define("form/formlayout", "form/form-plugin form/tplutil form/componentmodel form/component/entityselecter form/component/formconditioneditorview form/component/relatefieldconfig form/componentmodel form/component/typeahead".split(" "), function(n, y, u) {
    var m = n("form/form-plugin")
      , h = n("form/tplutil")
      , g = n("form/componentmodel")
      , f = n("form/component/entityselecter")
      , d = n("form/component/formconditioneditorview")
      , b = n("form/component/relatefieldconfig")
      , g = n("form/componentmodel")
      , c = n("form/component/typeahead")
      , l = {};
    l.componentModel = new g;
    l.currentDrag = null;
    l.currentEditor = null;
    l.formId = null;
    l.layoutId = null;
    l.isSameName = !1;
    l.isShowIntro = !1;
    l.sysMenuId = $("#sysMenuId").val();
    l.ownership = $("#ownership").val();
    l.module = $("#module").val();
    l.formInfo = [];
    var e = "freeform";
    if ("workflow" == l.module || "biaoge" == l.module || "biaoge_report" == l.module)
        e = "form";
    String.prototype.I18N = function() {
        var a = arguments;
        return this.replace(/\{(\d+)\}/g, function(k, e) {
            return a[e] || ""
        })
    }
    ;
    l.beforeunload = function() {
        window.onbeforeunload = function() {
            if ($("#formContent").html() != l.bodyHtml)
                return "\u60a8\u4fee\u6539\u7684\u6570\u636e\u5c1a\u672a\u4fdd\u5b58"
        }
    }
    ;
    l.loadCommonFeild = function() {
        $.ajax({
            type: TEAMS.ajaxMethod,
            dataType: "json",
            data: {
                module: l.module
            },
            url: TEAMS.api.findCommonField,
            success: function(a) {
                if ((a = a.formCommonFields) && 0 < a.length) {
                    for (var k = 0; k < a.length; k++) {
                        var e = a[k]
                          , c = $('\x3cdiv class\x3d"widget-item" id\x3d"' + e.id + '" title\x3d"' + e.title + '" componentKey\x3d"' + e.componentKey + '"\x3e\x3cspan class\x3d"title"\x3e' + e.title + '\x3c/span\x3e\x3cspan class\x3d"delete-common_js widgetDele"\x3e\x3ci class\x3d"icon-remove-sign"\x3e\x3c/i\x3e\x3c/span\x3e\x3c/div\x3e');
                        c.data("layoutDetail", e.layoutDetail);
                        $(".j_commonfield_ul").append(c)
                    }
                    $("#commonfield-widget-list .drag-into-layout .widget-item").draggable({
                        connectToSortable: "#widget-control,.subtr_js td",
                        helper: "clone",
                        opacity: .8,
                        appendTo: "body",
                        start: function(a, k) {
                            l.currentDrag = $(this);
                            $(".ui-draggable-dragging").css({
                                height: "auto",
                                "float": "none",
                                width: "270px"
                            })
                        }
                    }).disableSelection();
                    $("#no_common_feild").addClass("hide")
                } else
                    $("#no_common_feild").removeClass("hide")
            },
            error: function() {}
        })
    }
    ;
    l.loadDeleteFeild = function(a) {
        if (null != a && "" != a) {
            var k = {};
            k.formId = a;
            k.module = l.module;
            "app" == l.module && (k.appId = $("#appId").val());
            $.ajax({
                type: TEAMS.ajaxMethod,
                data: k,
                dataType: "json",
                url: TEAMS.api.findDeleteField,
                success: function(a) {
                    var k = a.formFields;
                    if (k && 0 < k.length)
                        for (var e = 0; e < k.length; e++) {
                            var c = k[e];
                            c.layoutDetail && l.deleteField(c)
                        }
                    if ((k = a.complexFields) && 0 < k.length)
                        for (e = 0; e < k.length; e++)
                            c = k[e],
                            c.layoutDetail && l.deleteField(c);
                    l.noDeleteFeild();
                    l.subForms = a.subForms
                },
                error: function() {}
            })
        }
    }
    ;
    l.loadFormLayout = function(a) {
        if (null != a && "" != a) {
            var k = {},_data_layoutDetail = {};
            k.formId = a;
            k.module = l.module;
            "app" == l.module && (k.appId = $("#appId").val());
            $.ajax({
                type: TEAMS.ajaxMethod,
                data: k,
                dataType: "json",
                url: TEAMS.api.findPreviewFrom,
                success: function(k) {
                    
                      // if(!window.parent.m_layoutDetail && window.localStorage) {
                      //       _data_layoutDetail = window.localStorage.getItem('m_layoutDetail');
                      //       k.formLayout.layoutDetail = String(_data_layoutDetail)
                      //   }

                    l.formId = a;
                    null != k.formLayout && (l.layoutId = k.formLayout.id,
                    l.analyseLayout(k.formLayout.layoutDetail));
                    k.form && k.form.ownership && $("#edit-form #name-form").attr("ownership", k.form.ownership);
                    l.componentDraggableEvents();
                    l.calculateHeight();
                    l.bodyHtml = $("#formContent").html()
                },
                error: function() {}
            })
        }
        $(window).resize()
    }
    ;
    l.analyseLayout = function(a) {
        null != a && "" != a && (a = JSON.parse(a),
        $("#widget-control").html(""),
        l.analyseComponent(a, $("#widget-control")))
    }
    ;
    l.analyseComponent = function(a, k) {
        var e = a.componentKey;
        if (e) {
            var c = new window[e](a)
              , b = c.renderEditPreview(k);
            this.addComponentModel(c);
            if ("ColumnPanel" == e && null != a.layoutDetail)
                for (e = 0; e < a.layoutDetail.length; e++) {
                    var c = a.layoutDetail[e]
                      , d = ""
                      , d = 1 == a.size ? k : $(b[e]);
                    l.analyseComponent(c, d)
                }
        }
    }
    ;
    l.addComponentModel = function(a) {
        if (this.reportId && (!a.componentmodel || !a.componentmodel.formId)) {
            var k = new g({
                reportId: this.reportId
            });
            a.setComponentModel(k)
        }
    }
    ;
    l.calculateHeight = function() {
        var a = $(window).height()
          , k = $(window).width()
          , e = $(".form-head_js").height();
        $("#widget-control").attr("style", "min-height:" + (a - e - 115) + "px;");
        $("#form-preview").css({
            "min-height": a - 30 + "px"
        });
        $(".js_wrapperSize").css({
            width: k + "px",
            height: a - 50 + "px"
        });
        $(".js_wrapperConSize").css("height", $(window).height() - 50 + "px");
        1281 > k ? $(".js_wrapperConSize").css("width", "1280px") : $(".js_wrapperConSize").css("width", k + "px")
    }
    ;
    l.deleteField = function(a) {
        if (a) {
            var k = $("\x3cdiv class\x3d'widget-item'\x3e\x3cspan class\x3d'j_name name ellipsis'\x3e\x3c/span\x3e\x3cspan class\x3d'j_field_back field-back'\x3e\x3ci class\x3d'icon-reply2'\x3e\x3c/i\x3e \u8fd8\u539f\x3c/span\x3e\x3c/div\x3e");
            k.attr("title", a.title);
            k.attr("fieldId", a.id);
            k.find(".j_name").text(a.title);
            k.data("layoutDetail", a.layoutDetail);
            $(".j_deletefeild_ul").append(k)
        }
    }
    ;
    l.noDeleteFeild = function() {
        0 == $(".j_deletefeild_ul").children().length ? ($(".j_userbtns .j_trashbinBtn").addClass("hide"),
        $("#no_delete_feild").removeClass("hide")) : ($("#no_delete_feild").addClass("hide"),
        $(".j_userbtns .j_trashbinBtn").removeClass("hide"))
    };
    l.deleteComponent = function(a, k) {
        if (null != a.attr("id") && 0 < a.attr("id").length) {
            var e = a.data("componentData").componentSetup;
            k && (e.subFormId = k);
            var c = $("\x3cdiv class\x3d'widget-item'\x3e\x3cspan class\x3d'j_name name ellipsis'\x3e\x3c/span\x3e\x3cspan class\x3d'j_field_back field-back' style\x3d'float: right'\x3e\u8fd8\u539f\x3c/span\x3e\x3c/div\x3e");
            c.attr("title", e.title);
            c.attr("fieldId", e.fieldId);
            c.find(".j_name").text(e.title);
            c.data("layoutDetail", JSON.stringify(e));
            $(".j_deletefeild_ul").prepend(c);
            l.noDeleteFeild()
        }
    }
    ;
    l.restoreField = function(a) {
        if (a) {
            var k = JSON.parse(a);
            if (a = k.componentKey) {
                a = new window[a](k);
                if (null == k.subFormId)
                    a.renderEditPreview($("#widget-control")),
                    a = $("#widget-control").find("#" + a.componentSetup.fieldId);
                else {
                    var k = k.subFormId
                      , e = $("#widget-control").find("#" + k);
                    if (0 < e.length)
                        e.find(".addSubColum_js").click(),
                        k = e.find(".subtd_js:last");
                    else {
                        for (e = 0; e < l.subForms.length; e++) {
                            var c = l.subForms[e];
                            "string" == typeof c && (c = JSON.parse(c));
                            if (c.subFormId == k || c.id == k) {
                                c.layoutDetail = [];
                                c.subFormId = k;
                                (new window.DataTable(c)).renderEditPreview($("#widget-control"));
                                break
                            }
                        }
                        e = $("#widget-control").find("#" + k);
                        k = e.find(".subtd_js:first")
                    }
                    a.renderEditPreview(k);
                    a = k.find("#" + a.componentSetup.fieldId)
                }
                a.click()
            }
        }
    }
    ;
    l.formViewType = function() {
        $("#form-preview").removeClass("hide");
        var a = new ColumnPanel
          , k = []
          , c = 0 < $("#widget-control").children(".j-tab-control").length ? !0 : !1;
        $("#widget-control").children().each(function(a) {
            var e = l.assemComponent(a, $(this), c);
            if (null == e)
                return !0;
            k[a] = e.componentSetup
        });
        a.componentSetup.layoutDetail = k;
        a = a.toStringify();
        $("#formpreview").html("");
        var e = $("#reportId").val();
        null != e && 0 < e.length && $("#formpreview").data("reportId", e);
        m.renderForm({
            parentEl: $("#formpreview"),
            layoutDetail: a,
            callback: function(a) {}
        })
    }
    ;
    l.formEvents = function(a) {
        $(document).on("click", ".form-head_js", function() {
            $(".j_edit_tab[edit-type\x3d'form']").click()
        });
         var dataSource = l.findSourcetable();

        $(document).on("click", ".field_js", function() {
            $("#content").blur();
            $(document).trigger("renderEditor", $(this))

             
           


            if(dataSource) {
                var dataTableId,dataColId;
                if($(this).attr('dataTableId')!='')
                    dataTableId = $(this).attr('dataTableId');
                if($(this).attr('dataColId')!='')
                    dataColId = $(this).attr('dataColId');
                $(document).find('.j_relate_datatable').each(function(index, el) {
                    var _e = $(this);
                    var e = $("#widget-control .field-active").data("componentData");

                    $.each(dataSource,function(i,n){
                        _e.append('<option value='+n.id+' name='+n.name+'>'+n.comments+'</option>');

                        if(n.id == dataTableId) {
                            _e.find('option[value='+n.id+']').attr('selected','selected');
                            e.setRelatDataTableId(n.id);
                            var index = _e.get(0).selectedIndex;
                            if(index>0 && dataSource[index-1].columns && dataSource[index-1].columns.length) {
                                var _columns = dataSource[index-1].columns;
                                $.each(_columns,function(i,n){
                                    $('.j_relate_dataunit').append('<option value='+n.colid+' name='+n.name+'>'+n.comments+'</option>');
                                    if(n.colid == dataColId) {
                                        $('.j_relate_dataunit').find('option[value='+n.colid+']').attr('selected','selected');
                                        e.setRelatDataUnitId(n.colid);
                                    }

                                })
                            }

                        }
                    })

                    _e.change(function(event){
                        var tableId = $(this).find("option:selected").val();
                        e.setRelatDataTableId(tableId);
                        $('.j_relate_dataunit').html('<option value=" ">无</option>')
                        var index = _e.get(0).selectedIndex;
                        if(index>0 && dataSource[index-1] && dataSource[index-1].columns && dataSource[index-1].columns.length) {
                            var _columns = dataSource[index-1].columns;
                            $.each(_columns,function(i,n){
                                $('.j_relate_dataunit').append('<option value='+n.colid+' name='+n.name+'>'+n.comments+'</option>');
                                var colId = $('.j_relate_dataunit').find("option:selected").val();
                                e.setRelatDataUnitId(colId);
                            })
                        } else {

                        }
                          
                    });
                });

                /*回显*/
                $(".j_relate_datatable").find('option').each(function(index, el) {
                    var _e = $(this);
                    if($(this).val() == $(".j_relate_datatable").attr('datatableid')) {
                        $(this).attr('selected','selected');
                            if(index>0 && dataSource[index-1].columns && dataSource[index-1].columns.length) {
                                var _columns = dataSource[index-1].columns;
                                $.each(_columns,function(i,n){
                                    $('.j_relate_dataunit').append('<option value='+n.colid+' name='+n.name+'>'+n.comments+'</option>');
                                    if(n.colid == $(".j_relate_dataunit").attr('datacolid')) {
                                        $('.j_relate_dataunit').find('option[value='+n.colid+']').attr('selected','selected');
                                    }

                                })
                            }
                    }
                });

                

                
            }
        });
        $(document).on("click", ".j_field_back", function() {
            var a = $(this).parent();
            l.restoreField(a.data("layoutDetail"));
            a.remove();
            l.noDeleteFeild()
        });
        $(document).on("click", ".field_subform_js", function() {
            $(document).trigger("renderEditor", $(this).parents(".field"))
            $(this).parents(".field").addClass('field-active').siblings('.field').removeClass('field-active')

        });
        $(document).off("mouseenter", "li.search").on("mouseenter", "li.search", function() {
            var a = $(this).find("input");
            a.focus().addClass("on").attr("placeholder", a.next().attr("title"))
        });
        $(document).off("mouseleave", "li.search").on("mouseleave", "li.search", function() {
            var a = $(this).find("input");
            "" == $.trim(a.val()) && a.removeAttr("placeholder").blur().removeClass("on")
        });
        $(document).off("blur", "li.search input").on("blur", "li.search input", function() {
            var a = $(this);
            "" == $.trim(a.val()) && a.removeAttr("placeholder").removeClass("on")
        });
        $(document).off("renderEditor").on("renderEditor", function(a, e) {
            var c = $(e).data("componentData");

            if(c && c.componentSetup && (c.componentSetup.componentKey=="ImageRadioBox" || c.componentSetup.componentKey == "ImageCheckBox"))
            {
                var _e = c.componentSetup.options;
               
                $(e).find(".ImageRadioBox_js").each(function(index, el) {
                    var _i = $(this).index();
                    var _imageid = $(this).find('img').attr('imageid');
                    for (var i = 0; i < _e.length; i++) {
                      if(_i==i)  
                        _e[i].objId = _imageid
                    };
                });
            }

            null != c && (0 == $(e).parents("#form-preview").length && ($(".field_js").removeClass("field-active"),
            $(".subform_js").removeClass("field-active"),
            $(".tabcontrlo-layout_js").removeClass("field-active"),
            $(".field_js").removeClass("monitor"),
            $(e).addClass("field-active"),
            c.renderEditor(),
            $("#edit-widget").find("#component-describe").parent().show(),
            null != $(e).parents(".subform_js").get(0) && ($("#edit-widget").find("#component-describe").parent().hide(),
            $("#edit-widget").find("#unique").closest(".form-group").hide())),
            $(window).resize(),
            $(".j_edit_tab[edit-type\x3d'widget']").click())
        });
        $(document).on("click", ".delete-common_js", function() {
            var a = $(this).parent()
              , e = a.attr("id");
            m.confirm("\u786e\u8ba4\u5220\u9664?", function(c) {
                c && $.ajax({
                    type: TEAMS.ajaxMethod,
                    url: "freeform/deleteCommonField.json",
                    dataType: "json",
                    data: {
                        dataId: e
                    },
                    success: function(e) {
                        m.notify("\u5220\u9664\u6210\u529f");
                        0 == a.siblings().length && $("#no_common_feild").removeClass("hide");
                        a.remove()
                    }
                })
            })
        });
        $(document).on("click", ".save-common_js", function() {
            var a = $(this).closest(".field_js").data("componentData");
            m.confirm("\u662f\u5426\u4fdd\u5b58\u4e3a\u5e38\u7528\u63a7\u4ef6?", function(e) {
                if (e && a) {
                    e = JSON.parse(JSON.stringify(a.componentSetup));
                    l.processCommonLayoutDetail(e);
                    var c = JSON.stringify(e);
                    $.ajax({
                        type: TEAMS.ajaxMethod,
                        contentType: "application/json",
                        url: "freeform/saveCommonField.json",
                        dataType: "json",
                        data: JSON.stringify({
                            formCommonField: {
                                layoutDetail: c,
                                componentKey: e.componentKey,
                                title: e.title
                            }
                        }),
                        success: function(a) {
                            a.message ? m.notify(a.message) : (m.notify("\u4fdd\u5b58\u6210\u529f"),
                            a = a.formCommonField,
                            a = $('\x3cdiv class\x3d"widget-item" id\x3d"' + a.id + '" title\x3d"' + a.title + '" componentKey\x3d"' + a.componentKey + '"\x3e\x3cspan class\x3d"title"\x3e' + a.title + '\x3c/span\x3e\x3cspan class\x3d"delete-common_js widgetDele"\x3e\x3ci class\x3d"icon-remove-sign"\x3e\x3c/i\x3e\x3c/span\x3e\x3c/div\x3e'),
                            a.data("layoutDetail", c),
                            $(".j_commonfield_ul").prepend(a),
                            $("#commonfield-widget-list .drag-into-layout .widget-item:eq(0)").draggable({
                                connectToSortable: "#widget-control,.subtr_js td",
                                helper: "clone",
                                opacity: .8,
                                appendTo: "body",
                                start: function(a, k) {
                                    l.currentDrag = $(this);
                                    $(".ui-draggable-dragging").css({
                                        height: "auto",
                                        "float": "none",
                                        width: "270px"
                                    })
                                }
                            }).disableSelection(),
                            $("#no_common_feild").addClass("hide"))
                        }
                    })
                }
            })
        });
        $(document).on("click", ".j_widgetDele", function() {
            if (confirm("\u786e\u5b9a\u5220\u9664\u5417\uff1f")) {
                var a = $(this)
                  , e = a.parent(".field")
                  , c = $(a).parents(".subform_js");
                a.parent(".field").hasClass("field-active") && $("#editor-component").html('\x3cdiv class\x3d"alert alert-danger"\x3e\x3ci class\x3d"icon-exclamation-sign"\x3e\x3c/i\x3e\u8bf7\u5148\u9009\u62e9\u63a7\u4ef6\x3c/div\x3e');
                4 >= a.parents(".subform_js").find(".subtd_js").length && a.parents(".subform_js").find(".addSubColum_js").parent().attr("style", "");
                3 >= a.parents(".subform_js").find(".subtd_js").length && a.parents(".subform_js").find(".subtr_js ").removeClass("one-three");
                0 < a.parent(".field").parent(".subtd_js").siblings("td").length && a.parent(".field").parent(".subtd_js").remove();
                $(c).attr("isDran") || 3 != $(c).find(".subtr_js").find(".subtd_js").length ? $(c).attr("isDran") || 2 != $(c).find(".subtr_js").find(".subtd_js").length ? $(c).attr("isDran") || 1 != $(c).find(".subtr_js").find(".subtd_js").length || $(c).find(".subtr_js").find(".subtd_js").css("width", "100%") : $(c).find(".subtr_js").find(".subtd_js").css("width", "362px") : ($(c).find(".subtr_js").find(".subtd_js").css("width", "242px"),
                $(c).find(".subtr_js").find(".subtd_js:first").css("width", "241px"));
                e.remove()
            }
        });
        $(document).on("click", ".j_layoutDele", function() {
            if (confirm("\u786e\u5b9a\u5220\u9664\u5417\uff1f")) {
                var a = $(this)
                  , e = a.parents(".form-layout");
                if (e && 0 < e.length) {
                    for (var a = e.find(".field_js"), c = 0; c < a.length; c++) {
                        var b = $(a[c]);
                        l.deleteComponent(b)
                    }
                    e.remove()
                } else {
                    var d = a.parents(".subform_js");
                    if (d && 0 < d.length) {
                        a = d.find(".field_js");
                        for (c = 0; c < a.length; c++)
                            b = $(a[c]),
                            l.deleteComponent(b, d.attr("id"));
                        d.attr("id") && 0 < d.attr("id").length && l.subForms.push(JSON.stringify(d.data("componentData").componentSetup));
                        d.remove()
                    } else if ((d = a.parents(".table_layout_js")) && 0 < d.length) {
                        a = e.find(".field_js");
                        for (c = 0; c < a.length; c++)
                            b = $(a[c]),
                            l.deleteComponent(b);
                        d.remove()
                    } else
                        (e = a.parents(".j-tab-control")) && 0 < e.length && e.remove()
                }
            }
        });
        $(document).on("click", ".addSubColum_js", function() {
            var a = $(this);
            a.parents(".subform_js").find(".subtr_js").find(".j_notIstr").before('\x3ctd class\x3d"subtd_js" style\x3d"height: 71px;width:241px;"\x3e\x3c/td\x3e');
            a.parents(".subform_js").attr("isDran") || 3 != a.parents(".subform_js").find(".subtr_js").find(".subtd_js").length ? a.parents(".subform_js").attr("isDran") || 2 != a.parents(".subform_js").find(".subtr_js").find(".subtd_js").length || a.parents(".subform_js").find(".subtr_js").find(".subtd_js").css("width", "362px") : (a.parents(".subform_js").find(".subtr_js").find(".subtd_js").css("width", "242px"),
            a.parents(".subform_js").find(".subtr_js").find(".subtd_js:first").css("width", "241px"));
            var e = 0;
            a.parents(".subform_js").find(".subtd_js").each(function(a) {
                e += Number($(this).width())
            });
            var c = a.parents(".subform_js").find("div.j_cancel-drag").width();
            e > c && a.parent().css({
                "margin-bottom": "17px"
            });
            l.subFromSortable(a.parents(".subform_js"));
            a.parents(".subform_js").find("td:not('.j_notIstr'):last").resizable({
                handles: "e",
                minWidth: 100,
                start: function(e, c) {
                    a.parents(".subform_js").find(".j_notIstr").show()
                },
                stop: function(e, c) {
                    a.parents(".subform_js").attr("isDran", "isDran")
                }
            });
            a.parents(".subform_js").find(".ui-resizable-e").css("right", "0px")
        });
        $(document).on("click", ".j_view_exit", function() {
            $(".form-preview-wrapper").addClass("hide")
        });
        $(document).on("click", ".j_view_type", function() {


            if (!$(this).hasClass("active")) {
                $(this).addClass("active").siblings("a").removeClass("active");
                var a = $(this).attr("data-value");
                $("#mobileIframe");
                var e = $(this).parents(".form-preview-content");
                if ("pc" == a) {
                    $("body").removeClass("of-h");
                    $(".preview_js").attr("data-entity", "pc");
                    var c = new ColumnPanel
                      , b = []
                      , f = 0 < $("#widget-control").children(".j-tab-control").length ? !0 : !1;
                    $("#widget-control").children().each(function(a) {
                        var k = l.assemComponent(a, $(this), f);
                        if (null == k)
                            return !0;
                        b[a] = k.componentSetup
                    });
                    c.componentSetup.layoutDetail = b;
                    c = c.toStringify();
                    $("#formpreview").html("");
                    var d = $("#reportId").val();
                    null != d && 0 < d.length && $("#formpreview").data("reportId", d);
                    m.renderForm({
                        parentEl: $("#formpreview"),
                        layoutDetail: c,
                        callback: function(a) {
                            setTimeout(function() {
                                var a = e.find(".j-preview-tabcontrol");
                                0 < a.length && a.each(function() {
                                    var a = $(this)
                                      , b = a.find(".j-tab-ul\x3eli").length
                                      , b = 8 >= b ? 92.25 : 738 / b;
                                    a.find(".j-tab-ul\x3eli").css("width", b)
                                })
                            }, 100)
                        }
                    });
                    e.find(".j_form-viewport-mobile").hide().css({
                        right: "0px",
                        opacity: "0"
                    });
                    $("#form-preview-mobile").fadeOut(200, function() {
                        $("#form-preview").fadeIn(100, function() {
                            $("#form-preview").removeClass("hide")
                        });
                        $(window).resize();
                        setTimeout(function() {
                            e.find(".j_form-viewport-pc").show().animate({
                                right: -41,
                                opacity: 1
                            })
                        }, 100);
                        e.find('.j_form-viewport-pc a[data-value\x3d"pc"]').addClass("active").siblings().removeClass("active");
                        a = "mobile";
                        e.css({
                            "padding-top": "40px",
                            width: "1000px"
                        })
                    })
                } else
                    $("body").addClass("of-h"),
                    $(".preview_js").attr("data-entity", "mobile"),
                    e.find(".j_form-viewport-pc").hide().css({
                        right: "0px",
                        opacity: "0"
                    }),
                    $("#form-preview").fadeOut(200, function() {
                        $("#form-preview-mobile").fadeIn(100, function() {
                            $("#form-preview-mobile").removeClass("hide")
                        });
                        setTimeout(function() {
                            e.find(".j_form-viewport-mobile").show().animate({
                                right: -41,
                                opacity: 1
                            })
                        }, 100);
                        e.find('.j_form-viewport-mobile a[data-value\x3d"mobile"]').addClass("active").siblings().removeClass("active");
                        a = "pc";
                        e.css({
                            "padding-top": "40px",
                            width: "375px"
                        })
                    })
            }
        });
        $(document).on("click", ".preview_js", function() {
            $("#formpreview").parents(".form-preview-wrapper").removeClass("hide");
            $("#form-preview,#form-preview-mobile").addClass("hide");
            $(".j_view_type").removeClass("active");
            if ($(this).hasClass("not_show_mobile_js"))
                l.formViewType();
            else {
                $(".j_form-viewport-opt").removeClass("hide");
                var a = $("#mobileIframe")
                  , e = new ColumnPanel
                  , c = []
                  , f = 0 < $("#widget-control").children(".j-tab-control").length ? !0 : !1;
                $("#widget-control").children().each(function(a) {
                    var k = l.assemComponent(a, $(this), f);
                    if (null == k)
                        return !0;
                    c[a] = k.componentSetup
                });
                e.componentSetup.layoutDetail = c;
                window.m_layoutDetail = e.toStringify();
                window.m_layoutTitle = $(".form-head_js .form-name").text();
                if(window.localStorage) window.localStorage.setItem('m_layoutDetail',window.m_layoutDetail);
                if(window.localStorage) window.localStorage.setItem('m_layoutTitle',window.m_layoutTitle);
                a.attr("src", TEAMS.mobileformview);
                "mobile" == $(this).attr("data-entity") ? $('.j_view_type[data-value\x3d"mobile"]').trigger("click") : $('.j_view_type[data-value\x3d"pc"]').trigger("click")
            }
        });
        $(document).on("click", ".submit_js", function() {
            var a = $(this)
              , c = new ColumnPanel
              , b = []
              , d = []
              , e = 0 < $("#widget-control").children(".j-tab-control").length ? !0 : !1;
            $("#widget-control").children().each(function(a) {
                var k = l.assemComponent(a, $(this), e);
                if (null == k)
                    return !0;
                if ("ImageRadioBox" == k.componentSetup.componentKey || "ImageCheckBox" == k.componentSetup.componentKey) {
                    e = k.componentSetup.options;
                    $(this).find(".ImageRadioBox_js").each(function() {
                        var _i = $(this).index();
                        var _imageid = $(this).find('img').attr('imageid');
                        for(var i=0;i<e.length;i++) {
                            if(i==_i) {
                                e[i].objId = _imageid
                            }
                        }
                    })

                }
                if ("RadioBox" == k.componentSetup.componentKey || "CheckBox" == k.componentSetup.componentKey || "Select" == k.componentSetup.componentKey || "ImageRadioBox" == k.componentSetup.componentKey || "ImageCheckBox" == k.componentSetup.componentKey) {
                    var e = k.componentSetup.options;
                    if (e && 0 < e.length) {
                        for (var c = e.length - 1; 0 <= c; c--) {
                            var z = e[c];
                            "" != z.name.trim() && null != z.name || e.remove(z)
                        }
                        for (var f = 0; f < e.length; f++)
                            z = e[f],
                            z.order = f,
                            z.name = z.name.trim(),
                            k.componentModel.generatorId(function(c) {
                                z.selectionId = c.generatorId;
                            });
                        
                    }

                }
                if ("ComboSelect" == k.componentSetup.componentKey) {
                    e = k.componentSetup.options;
                    if (e && k.componentSetup.selectIds.length==3) {
                        for(var i=0;i<e.length;i++) {
                            if(!e[i].selectionId) {
                                e[i].selectionId = k.componentSetup.selectIds[i]
                            }
                        }
                    }

                    for (z = 0; z < e.length; z++) {
                        var g = e[z];
                        g.name = g.name.trim()
                    }
                    for (z = 0; z < e.length; z++)
                        if (g = e[z],
                        g.children && 0 < g.children.length)
                            for (f = 0; f < g.children.length; f++) {
                                var p = g.children[f];
                                p.name = p.name.trim()
                            }
                    for (z = 0; z < e.length; z++)
                        if (g = e[z],
                        g.children && 0 < g.children.length)
                            for (f = 0; f < g.children.length; f++) {
                                if (!g.children[f].selectionId) {
                                    k.componentModel.generatorId(function(c) {
                                        g.children[f].selectionId = c.generatorId;
                                    });
                                }
                                if (p = g.children[f],
                                p.children && 0 < p.children.length)
                                    for (c = 0; c < p.children.length; c++) {
                                        p.children[c].name = p.children[c].name.trim()
                                        if (!p.children[c].selectionId) {
                                            k.componentModel.generatorId(function(a) {
                                                p.children[c].selectionId = a.generatorId;
                                            });
                                        }

                                    }
                            }
                }
                "Monitor" == k.componentSetup.componentKey && d.push(k);
                if ("ComboSelect" == k.componentSetup.componentKey && k.componentSetup.templateId)
                    k.componentSetup.templateId && (k.componentSetup.options = [],
                    k.componentSetup.dataDetails = []);
                else if ("DataTable" == k.componentSetup.componentKey) {
                    if (k.componentSetup.layoutDetail)
                        for (c = 0; c < k.componentSetup.layoutDetail.length; c++)
                            f = k.componentSetup.layoutDetail[c],
                            "ComboSelect" == f.componentKey && f.templateId && (k.componentSetup.layoutDetail[c].options = [],
                            k.componentSetup.layoutDetail[c].dataDetails = [])
                } else if (("ColumnPanel" == k.componentSetup.componentKey || "TableLayout" == k.componentSetup.componentKey) && k.componentSetup.layoutDetail)
                    for (e = 0; e < k.componentSetup.layoutDetail.length; e++)
                        if (z = k.componentSetup.layoutDetail[e],
                        z.layoutDetail)
                            for (c = 0; c < z.layoutDetail.length; c++)
                                f = z.layoutDetail[c],
                                "ComboSelect" == f.componentKey && f.templateId && (k.componentSetup.layoutDetail[e].layoutDetail[c].options = [],
                                k.componentSetup.layoutDetail[e].layoutDetail[c].dataDetails = []);
                b[a] = k.componentSetup
            });
            for (var f = 0; f < d.length; f++)
                if (!d[f].checkFormula())
                    return $(".field_js[tempId\x3d'" + d[f].componentSetup.tempId + "']").click(),
                    !1;
            c.componentSetup.layoutDetail = b;
          

            var c = c.toStringify()
              , g = {}
              , f = $(".form-design .form-view .form-head .form-name").text()
              , h = $(".form-design .form-view .form-head .form-description").text();
            g["form.id"] = l.formId;
            g["form.name"] = f;
            g["form.describe"] = h;
            (f = $(".form-widgetEdit #edit-form .js_formownership .js_formowner input[name\x3d'ownership']:checked").val()) || (f = $(".form-widgetEdit #edit-form #name-form").attr("ownership"));
          //  g["form.ownership"] = f;
            var s = $("#module").val();
            g["form.module"] = s;
        //    g.module = s;
         //   "biaoge_report" == s ? g["form.report.id"] = $("#reportId").val() : "app" == s && (g.appId = $("#appId").val());
            g["formLayout.id"] = l.layoutId;
            g["formLayout.layoutType"] = "pc";
            g["formLayout.colorScheme"] = $("#colorScheme").val();
            g["formLayout.bgcolorScheme"] = $("#bgcolorScheme").val();
            g["formLayout.layoutDetail"] = c;
            "enable" == $(this).attr("submitType") && (g["form.status"] = "enable");
            if(!$("#name-form").val()) {
                m.notify('表单标题不能为空！');
                return false;
            }
      //      l.checkFormName(function(c) {
                c.message ? ($("#edit-form .c-danger").show(),
                $("#edit-form .c-danger").text(c.message),
                $(".j_edit_tab[edit-type\x3d'form']").click()) : $.ajax({
                    type: TEAMS.ajaxMethod,
                    data: g,
                    dataType: "json",
                    url: TEAMS.api.save,
                    success: function(c) {
                        if(c.message)
                            m.notify(c.message);
                        _saveView();
                        
                    },
                    error: function() {
                        m.notify('保存失败 ');
                    }
                })
      //      })
        });
       
        $(document).on("click", ".j_showVersion", function(a) {
            a = l.formId;
            var c = $(this).attr("id");
            "form" == e ? window.open("/" + e + "/preview/" + a + "/" + c) : "app" == l.module ? window.open("/" + e + "/preview/" + a + "/" + c + "/" + l.module + "?appId\x3d" + $("#appId").val()) : window.open("/" + e + "/preview/" + l.module + "/" + a + "/" + c)
        });
        $(document).on("click", ".j_enableVersion", function(a) {
            $("#form-historyVersions").modal("hide");
            var c = l.formId
              , b = $(this).attr("id");
            m.confirm("\u786e\u5b9a\u6062\u590d\u5230\u6b64\u5e03\u5c40\u7248\u672c\u5417\uff1f", function(a) {
                a && (a = {},
                a.formId = c,
                a.layoutId = b,
                a.module = l.module,
                "app" == l.module && (a.appId = $("#appId").val()),
                $.ajax({
                    type: TEAMS.ajaxMethod,
                    data: a,
                    dataType: "json",
                    url: "/" + e + "/enableLayout.json",
                    success: function(a) {
                        null != a.formLayout && (l.layoutId = a.formLayout.id,
                        l.analyseLayout(a.formLayout.layoutDetail))
                    }
                }))
            })
        });
        $(document).on("shown.bs.modal", "#default-position", function(a) {
            l.lng && l.lat && (a = !1,
            l.first || (a = !0),
            l.renderMap(l.lng, l.lat, l.address, l.level, a))
        });
        $(document).on("hidden.bs.modal", "#form-historyVersions", function(a) {
            $("#form-historyVersions").remove()
        });
        $(document).on("hidden.bs.modal", "#default-position", function(a) {
            $("#default-position").off(".position");
            $("#default-position #j_mapArea").empty();
            l.lng = "";
            l.lat = "";
            l.address = "";
            l.first = ""
        });
        $(document).off("mouseenter", ".entity-item").on("mouseenter", ".entity-item", function(a) {
            $(this).find("a:first").after('\x3ca class\x3d"close" title\x3d"\u5220\u9664"\x3e\x26times;\x3c/a\x3e')
        });
        $(document).off("mouseleave", ".entity-item").on("mouseleave ", ".entity-item", function(a) {
            $(this).find(".close").remove()
        });
        $(document).off("click", ".entity-item .close").on("click ", ".entity-item .close", function(a) {
            $(this).parent().remove()
        })
    }
    ;
    var aa = l;

    // l.assemComponent = function(a, k, c) {
    //     var e = k.data("componentData");
    //     if (null == e || null == e.componentSetup)
    //         return null;
    //     e.componentSetup.order = a;
    //     if ("ColumnPanel" == e.componentSetup.componentKey) {
    //         var c = [];
    //         k.find(".cell_js ").each(function(a) {
    //             var k = new ColumnPanel
    //               , e = [];
    //             $(this).children().each(function(a) {
    //                 var k = l.assemComponent(a, $(this), c);
    //                 if (null == k)
    //                     return !0;
    //                 e[a] = k.componentSetup
    //             });
    //             k.componentSetup.layoutDetail = e;
    //             k.componentSetup.index = a;
    //             c[a] = k.componentSetup
    //         });
    //         e.componentSetup.layoutDetail = c
    //     } else if ("DataTable" == e.componentSetup.componentKey) {
    //         var c = []
    //           , b = [];
    //         a = 0;
    //         k.find(".subtr_js ").children().each(function() {
    //             var k = l.assemComponent(a, $(this).find(".field_js"), c);
    //             if (null == k)
    //                 return !0;
    //             c[a] = k.componentSetup;
    //             b.push($(this).width() + 2);
    //             a++
    //         });
    //         e.componentSetup.size = c.length;
    //         e.componentSetup.layoutDetail = c;
    //         e.componentSetup.thArray = b
    //     } else if ("TableLayout" == e.componentSetup.componentKey)
    //         e.getTableSerialize(l, a, c);
    //     else if ("TabControl" == e.componentSetup.componentKey)
    //         e.getTabSerialize(aa, a, b, c);
    //     // else if (1 == c || "true" == c) {
    //     //     if ("Monitor" == e.componentSetup.componentKey && e.componentSetup.monitorFields && 0 < e.componentSetup.monitorFields.length) {
    //     //         var m = $("#widget-control").find("div[tempId\x3d'" + e.componentSetup.tempId + "']").closest(".j-tab-content-page");
    //     //         b = !1;
    //     //         var l = $("#widget-control");
    //     //         m && 0 < m.length && (l = m[0],
    //     //         b = !0);
    //     //         for (m = 0; m < e.componentSetup.monitorFields.length; m++) {
    //     //             var h = e.componentSetup.monitorFields[m];
    //     //             if (h.type && "field" == h.type) {
    //     //                 var k = $(l).find("div[tempId\x3d'" + h.value + "']:not(.j-tab-control .field_js)");
    //     //                 b && (k = $(l).find("div[tempId\x3d'" + h.value + "']"));
    //     //                 if (!(k && 0 < k.length)) {
    //     //                     e.componentSetup.monitorFields = [];
    //     //                     break
    //     //                 }
    //     //             }
    //     //         }
    //     //     }
    //     //     e.componentSetup.relateField && (m = $("#widget-control").find("div[tempId\x3d'" + e.componentSetup.tempId + "']").closest(".j-tab-content-page"),
    //     //     l = $("#widget-control"),
    //     //     b = !1,
    //     //     m && 0 < m.length && (l = m[0],
    //     //     b = !0),
    //     //     e.componentSetup.relateField && e.componentSetup.relateField.fieldId && (m = $(l).children("div[tempId\x3d'" + e.componentSetup.relateField.fieldId + "']:not(.j-tab-control .field_js)"),
    //     //     b && (m = $(l).find("div[tempId\x3d'" + e.componentSetup.relateField.fieldId + "']")),
    //     //     m && 0 < m.length || (e.componentSetup.relateField = [])))
    //     // }
    //     e.layoutCheck();
    //     return e
    // }

    l.assemComponent = function(a, b, c) {
        var d = b.data("componentData");
        if (null == d || null == d.componentSetup)
            return null;

        d.componentSetup.order = a;
        if ("ColumnPanel" == d.componentSetup.componentKey) {
            var f = [];
            b.find(".cell_js ").each(function(a) {
                var b = new ColumnPanel
                  , d = [];
                $(this).children().each(function(a) {
                    var b = l.assemComponent(a, $(this), c);
                    if (null == b)
                        return !0;
                    d[a] = b.componentSetup
                });
                b.componentSetup.layoutDetail = d;
                b.componentSetup.index = a;
                f[a] = b.componentSetup
            });
            d.componentSetup.layoutDetail = f
        } else if ("DataTable" == d.componentSetup.componentKey) {
            var f = []
              , e = [];
            a = 0;
            b.find(".subtr_js ").children().each(function() {
                var b = l.assemComponent(a, $(this).find(".field_js"), c);
                if (null == b)
                    return !0;
                f[a] = b.componentSetup;
                e.push($(this).width() + 2);
                a++
            });
            d.componentSetup.size = f.length;
            d.componentSetup.layoutDetail = f;
            d.componentSetup.thArray = e
        } else if ("TableLayout" == d.componentSetup.componentKey)
            d.getTableSerialize(aa, a, c);
        else if ("TabControl" == d.componentSetup.componentKey)
            d.getTabSerialize(aa, a, b, c);
        else if (1 == c || "true" == c) {
            // if ("Monitor" == d.componentSetup.componentKey && d.componentSetup.monitorFields && 0 < d.componentSetup.monitorFields.length) {
            //     var m = $("#widget-control").find("div[tempId\x3d'" + d.componentSetup.tempId + "']").closest(".j-tab-content-page");
            //     b = !1;
            //     var l = $("#widget-control");
            //     m && 0 < m.length && (l = m[0],
            //     b = !0);
            //     for (m = 0; m < d.componentSetup.monitorFields.length; m++) {
            //         var h = d.componentSetup.monitorFields[m];
            //         if (h.type && "field" == h.type) {
            //             var k = $(l).find("div[tempId\x3d'" + h.value + "']:not(.j-tab-control .field_js)");
            //             b && (k = $(l).find("div[tempId\x3d'" + h.value + "']"));
            //             if (!(k && 0 < k.length)) {
            //                 d.componentSetup.monitorFields = [];
            //                 break
            //             }
            //         }
            //     }
            // }
            d.componentSetup.relateField && (m = $("#widget-control").find("div[tempId\x3d'" + d.componentSetup.tempId + "']").closest(".j-tab-content-page"),
            l = $("#widget-control"),
            b = !1,
            m && 0 < m.length && (l = m[0],
            b = !0),
            d.componentSetup.relateField && d.componentSetup.relateField.fieldId && (m = $(l).children("div[tempId\x3d'" + d.componentSetup.relateField.fieldId + "']:not(.j-tab-control .field_js)"),
            b && (m = $(l).find("div[tempId\x3d'" + d.componentSetup.relateField.fieldId + "']")),
            m && 0 < m.length || (d.componentSetup.relateField = [])))
        }
        d.layoutCheck(b);

        return d
    }
    ;
    l.getAllComboSelectOptions = function(a) {
        var k = [];
        if (a && 0 < a.length)
            for (var e = 0; e < a.length; e++) {
                var c = a[e]
                  , b = new Option;
                b.setName(c.name);
                b.setOrder(c.order);
                b.setSelectionId(c.id);
                b.setIsReadonly(!0);
                c.children && 0 < c.children.length && b.setChildren(l.getAllComboSelectOptions(c.children));
                k.push(b.componentSetup)
            }
        return k
    }
    ;
    l.componentSetupEvents = function() {
        $(document).on("keydown", "#editor-component #component-title", function(a) {
            a = $.trim($(this).val());
            $("#widget-control .field-active .widget-title .widget-title_js").text(a);
            $("#widget-control .field-active .widget-title_js").text(a);
            $("#widget-control .field-active").data("componentData").setTitle(a)
        });
        $(document).on("keyup", "#editor-component #component-title", function(a) {
            a = $.trim($(this).val());
            $("#widget-control .field-active .widget-title .widget-title_js").text(a);
            $("#widget-control .field-active .widget-title_js").text(a);
            $("#widget-control .field-active").data("componentData").setTitle(a)
        });
        $(document).on("keydown", "#editor-component #component-title-datatable", function(a) {
            a = $.trim($(this).val());
            var k = $("#widget-control .field-active .form-databox-head .j_datatableTitle");
            k.text(a);
            var e = $("#widget-control .field-active").data("componentData");
            "" == a ? k.addClass("hide") : k.removeClass("hide");
            e.setTitle(a)
        });
        $(document).on("keyup", "#editor-component #component-title-datatable", function(a) {
            a = $.trim($(this).val());
            var k = $("#widget-control .field-active .form-databox-head .j_datatableTitle");
            k.text(a);
            var e = $("#widget-control .field-active").data("componentData");
            "" == a ? k.addClass("hide") : k.removeClass("hide");
            e.setTitle(a)
        });
        $(document).on("keydown", "#editor-component #component-describe-datatable", function(a) {
            a = $.trim($(this).val());
            var k = $("#widget-control .field-active .j_datatableDescription");
            "" != a ? (k.removeClass("hide"),
            k.text(a)) : k.addClass("hide");
            $("#widget-control .field-active").data("componentData").setDescribe(a)
        });
        $(document).on("keyup", "#editor-component #component-describe-datatable", function(a) {
            a = $.trim($(this).val());
            var k = $("#widget-control .field-active .j_datatableDescription");
            "" != a ? (k.removeClass("hide"),
            k.text(a)) : k.addClass("hide");
            $("#widget-control .field-active").data("componentData").setDescribe(a)
        });
        $(document).on("blur", "#editor-component #datatable-defaultRows", function(a) {
            a = $(this).val();
            var k = a.replace(/[^\d.-]/g, "");
            "" == k && (k = 0);
            var k = parseInt(k)
              , e = $("#widget-control .field-active").data("componentData");
            $(this).val(k);
            isNaN(a) && $(this).val(e.componentSetup.defaultRows);
            10 < a && $(this).val(e.componentSetup.defaultRows);
            e = $("#widget-control .field-active").data("componentData");
            e.setDefaultRows($(this).val())
        });
        $(document).on("keyup", "#editor-component #datatable-defaultRows", function(a) {
            a = $(this).val();
            var k = a.replace(/[^\d.-]/g, "");
            "" == k && (k = 0);
            var k = parseInt(k)
              , e = $("#widget-control .field-active").data("componentData");
            $(this).val(k);
            isNaN(a) && $(this).val(e.componentSetup.defaultRows);
            10 < a && $(this).val(e.componentSetup.defaultRows);
            e = $("#widget-control .field-active").data("componentData");
            e.setDefaultRows($(this).val())
        });
        $(document).off("keyup", "#editor-component #datatable-requiredRows").on("keyup", "#editor-component #datatable-requiredRows", function(a) {
            a = $(this).val();
            var k = a.replace(/[^\d.-]/g, "")
              , k = parseInt(k)
              , e = $("#widget-control .field-active").data("componentData");
            1 > k && (k = 1);
            $(this).val(k);
            isNaN(a) || "" == a ? $(this).val("") : e.setRequiredRows($(this).val())
        });
        $(document).off("blur", "#editor-component #datatable-requiredRows").on("blur", "#editor-component #datatable-requiredRows", function(a) {
            a = $(this).val();
            var k = $("#widget-control .field-active").data("componentData");
            a ? k.setRequiredRows($(this).val()) : (k.setRequiredRows("1"),
            $(this).val("1"))
        });
        $(document).on("click", "#editor-component #datatable-showSreial", function(a) {
            a = $(this).is(":checked");
            $("#widget-control .field-active").data("componentData").setShowSreial(a)
        });
        $(document).on("change", "#editor-component input:radio[name\x3d'title-layout']", function(a) {
            a = $(this).val();
            var k = $(this).attr("componentKey");
            $("#editor-component input:radio[name\x3d'title-layout']").each(function(a) {
                a = $(this).val();
                $("#widget-control .field-active").removeClass(a)
            });
            "FormComponent" == k || "CustomerComponent" == k || "ContactComponent" == k || "ProductionComponent" == k || "ChanceComponent" == k || "ContractComponent" == k ? 1 == $("#widget-control .field-active").parents("div[componentKey\x3d'TableLayout']").length || 1 == $("#widget-control .field-active").parents("div[componentKey\x3d'ColumnPanel']").length ? $("#widget-control .field-active").removeClass("field-hoz") : $("#widget-control .field-active").addClass(a) : $("#widget-control .field-active").addClass(a);
            $("#widget-control .field-active").data("componentData").setTitleLayout(a)
        });
        $(document).on("keydown", "#editor-component #component-describe", function(a) {
            null == $("#widget-control .field-active").parents(".subform_js").get(0) && (a = $.trim($(this).val()),
            "" != a ? ($("#widget-control .field-active .field-description").show(),
            $("#widget-control .field-active .field-description").text(a)) : $("#widget-control .field-active .field-description").hide(),
            $("#widget-control .field-active").data("componentData").setDescribe(a))
        });
        $(document).on("keyup", "#editor-component #component-describe", function(a) {
            null == $("#widget-control .field-active").parents(".subform_js").get(0) && (a = $.trim($(this).val()),
            "" != a ? ($("#widget-control .field-active .field-description").show(),
            $("#widget-control .field-active .field-description").text(a)) : $("#widget-control .field-active .field-description").hide(),
            $("#widget-control .field-active").data("componentData").setDescribe(a))
        });
        $(document).on("keydown", "#editor-component #input_placeholder", function(a) {
            a = $.trim($(this).val());
            var k = $("#widget-control .field-active").data("componentData");
            "Select" == k.componentSetup.componentKey && ($("#widget-control .field-active .choicelist_js option").get(0).text = a);
            k.setPlaceholder(a)
        });
        $(document).on("keyup", "#editor-component #input_placeholder", function(a) {
            a = $.trim($(this).val());
            var k = $("#widget-control .field-active").data("componentData");
            "Select" == k.componentSetup.componentKey && ($("#widget-control .field-active .choicelist_js option").get(0).text = a);
            k.setPlaceholder(a)
        });
        $(document).on("click", "#editor-component #required", function(a) {
            a = $(this).is(":checked");
            var k = $("#widget-control .field-active").data("componentData");
            a ? ($("#widget-control .field-active .widget-title .widget-required_js").text(" *"),
            $("body #formEdit_js #edit-widget .form-Edit-content .j_isRequired_Div").removeClass("hide"),
            void 0 != k.componentSetup.requiredRows && (k.setRequiredRows("1"),
            $("#edit-widget .form-Edit-content .j_isRequired_Div #datatable-requiredRows").attr("value", k.componentSetup.requiredRows)),
            "ComboSelect" == k.componentSetup.componentKey && ($("#edit-widget .form-Edit-content .j_comboselect_level").removeClass("hide"),
            k.setComponentLevel("1"),
            3 == k.componentSetup.selects.length && $("#edit-widget .form-Edit-content .j_comboselect_level .j_level_three").removeClass("hide")),
            "CheckBox" == k.componentSetup.componentKey && $("#edit-widget .form-Edit-content .j_selected_num").removeClass("hide")) : ($("#widget-control .field-active .widget-title .widget-required_js").text(""),
            $("body #formEdit_js #edit-widget .form-Edit-content .j_isRequired_Div").addClass("hide"),
            k.componentSetup.requiredRows && k.setRequiredRows(""),
            "ComboSelect" == k.componentSetup.componentKey && ($("body #formEdit_js #edit-widget .form-Edit-content .j_comboselect_level").addClass("hide"),
            k.setComponentLevel("")),
            "CheckBox" == k.componentSetup.componentKey && ($("#edit-widget .form-Edit-content .j_selected_num").addClass("hide"),
            k.setSelectedNum("")));
            k.setRequired(a)
        });
        $(document).on("click", "#editor-component #richEditor", function(a) {
            a = $(this).is(":checked");
            var k = $("#widget-control .field-active").data("componentData");
            a ? ($("body #formEdit_js #edit-widget .form-Edit-content .j_type_switch").addClass("hide"),
            $("body #formEdit_js #edit-widget .form-Edit-content .j_control_size").addClass("hide"),
            (0 < $("#widget-control .field-active").parents(".form-layout_js").length || 0 < $("#widget-control .field-active").parents(".table_layout_js").length) && $("body #formEdit_js #edit-widget .form-Edit-content .j_title_layout").find(".radio-inline:last input").trigger("click")) : ($("body #formEdit_js #edit-widget .form-Edit-content .j_type_switch").removeClass("hide"),
            $("body #formEdit_js #edit-widget .form-Edit-content .j_control_size").removeClass("hide"),
            (0 < $("#widget-control .field-active").parents(".form-layout_js").length || 0 < $("#widget-control .field-active").parents(".table_layout_js").length) && $("body #formEdit_js #edit-widget .form-Edit-content .j_title_layout").find(".radio-inline:first input").trigger("click"));
            k.setRichEditor(a)
        });
        $(document).on("click", "#editor-component #unique", function(a) {
            a = $(this).is(":checked");
            $("#widget-control .field-active").data("componentData").setUnique(a)
        });
        $(document).on("change", "#editor-component input:radio[name\x3d'tSize']", function(a) {
            a = $(this).val();
            $("#editor-component input:radio[name\x3d'tSize']").each(function(a) {
                a = $(this).val();
                $("#widget-control .field-active .form-control").removeClass(a)
            });
            $("#widget-control .field-active .form-control").addClass(a);
            $("#widget-control .field-active .form-control").parent().hasClass("input-group") && ($("#editor-component input:radio[name\x3d'tSize']").each(function(a) {
                a = $(this).val();
                $("#widget-control .field-active .form-control").parent().removeClass(a + "-box")
            }),
            $("#widget-control .field-active .form-control").parent().addClass(a + "-box"));
            $("#widget-control .field-active").find("#moneyType").removeClass(a);
            $("#widget-control .field-active").data("componentData").setSize(a)
        });
        $(document).on("change", "#editor-component input:radio[name\x3d'component-type']", function(a) {
            a = $(this).val();
            $(this).attr("checked", !0);
            "percentage" == a ? ($("#widget-control .field-active .form-control").next().removeClass("hide"),
            $("#j_default_value #content").next().removeClass("hide"),
            $("#editor-component").find(".j_isCapital_Div").addClass("hide")) : ($("#widget-control .field-active .form-control").next().addClass("hide"),
            $("#j_default_value #content").next().addClass("hide"),
            $("#editor-component").find(".j_isCapital_Div").removeClass("hide"));
            $("#widget-control .field-active").data("componentData").setNumberType(a)
        });
        $(document).on("click", ".j_raty_pic span", function(a) {
            a = $(this).attr("value");
            $("#widget-control .field-active").data("componentData").setRatypic(a);
            for (var k = $("#widget-control .field-active #star").find("img"), e = 0; e < k.length; e++) {
                var c = $(k[e])
                  , b = c.attr("src")
                  , l = b.substring(0, b.lastIndexOf("/"))
                  , b = b.substring(b.indexOf("-"));
                c.attr("src", l + "/" + a + b)
            }
        });
        $(document).on("change", "input:radio[name\x3d'half']", function(a) {
            var k = $(this).val()
              , e = $("#widget-control .field-active").data("componentData");
            a = e.componentSetup.ratypic;
            null == a && (a = "star");
            e.sethalf(k);
            e.setDefaultstar(0);
            e.renderEditor();
            k = $(h.get("raty", {
                isMobileForm: "mobile" == window.systemInfo_form
            })).siblings("#img-clone");
            $("#widget-control .field-active #star").empty();
            for (e = 1; 5 >= e; e++) {
                var c = k.find("img").clone()
                  , b = c.attr("src")
                  , l = b.substring(0, b.lastIndexOf("/"))
                  , b = b.substring(b.indexOf("-"))
                  , l = l + "/" + a + b;
                c.attr("value", e).attr("src", l);
                $("#widget-control .field-active #star").append(c)
            }
        });
        $(document).on("change", "select[name\x3d'defaultstar']", function(a) {
            a = $(this).val();
            var k = $("#widget-control .field-active").data("componentData")
              , e = k.componentSetup.ratypic;
            null == e && (e = "star");
            k.setDefaultstar(a);
            $("#widget-control .field-active #star").empty();
            var c = $(h.get("raty", {
                isMobileForm: "mobile" == window.systemInfo_form
            }))
              , k = Math.round(a)
              , c = c.siblings("#img-clone");
            if (a == k)
                for (var b = 1; 5 >= b; b++) {
                    var l = c.find("img").clone()
                      , d = l.attr("src");
                    b <= a && (d = d.replace("off", "on"));
                    var f = d.substring(0, d.lastIndexOf("/"))
                      , d = d.substring(d.indexOf("-"))
                      , f = f + "/" + e + d;
                    l.attr("src", f).attr("value", b);
                    $("#widget-control .field-active #star").append(l)
                }
            else
                for (b = 1; 5 >= b; b++)
                    l = c.find("img").clone(),
                    d = l.attr("src"),
                    b <= k - 1 ? d = d.replace("off", "on") : b == k && (d = d.replace("off", "half")),
                    f = d.substring(0, d.lastIndexOf("/")),
                    d = d.substring(d.indexOf("-")),
                    f = f + "/" + e + d,
                    l.attr("value", b).attr("src", f),
                    $("#widget-control .field-active #star").append(l)
        });
        $(document).on("change", "select[name\x3d'number-point-select']", function(a) {
            a = $(this).val();
            var k = $("#widget-control .field-active").data("componentData")
              , e = k.componentSetup.isDefault
              , c = null;
            if (1 == e || "true" == e)
                c = $("#editor-component").find('#content[comkey\x3d"NumberComponent"]').val();
            if ("sel" != a && null != a)
                if (c && 0 < c.indexOf(".")) {
                    var e = c.substring(0, c.indexOf("."))
                      , b = c.substring(c.indexOf(".") + 1);
                    if (0 < b.length)
                        if (b.length > a)
                            b = b.substring(0, a),
                            c = null != b && "" != b ? e + "." + b : e;
                        else {
                            for (var l = "", d = 0; d < a - b.length; d++)
                                l += "0";
                            c = e + "." + (b + l)
                        }
                } else if (c && 0 > c.indexOf(".")) {
                    l = "";
                    for (d = 0; d < a; d++)
                        l += "0";
                    "" != l && (c = c + "." + l)
                }
            $("#widget-control .field-active").find(".field-value_js").val(c);
            $("#editor-component").find('#content[comkey\x3d"NumberComponent"]').val(c);
            k.setContent(c);
            k.setPointSize(a)
        });
        $(document).on("change", "select[name\x3d'money-point-select']", function(a) {
            a = $(this).val();
            var k = $("#widget-control .field-active").data("componentData")
              , e = k.componentSetup.isDefault
              , c = null;
            if (1 == e || "true" == e)
                c = $("#editor-component").find('#content[comkey\x3d"Money"]').val();
            if ("sel" != a && null != a)
                if (c && 0 < c.indexOf(".")) {
                    var e = c.substring(0, c.indexOf("."))
                      , b = c.substring(c.indexOf(".") + 1);
                    if (0 < b.length)
                        if (b.length > a)
                            b = b.substring(0, a),
                            c = null != b && "" != b ? e + "." + b : e;
                        else {
                            for (var l = "", d = 0; d < a - b.length; d++)
                                l += "0";
                            c = e + "." + (b + l)
                        }
                } else if (c && 0 > c.indexOf(".")) {
                    l = "";
                    for (d = 0; d < a; d++)
                        l += "0";
                    "" != l && (c = c + "." + l)
                }
            $("#widget-control .field-active").find(".field-value_js").val(c);
            $("#editor-component").find('#content[comkey\x3d"Money"]').val(c);
            k.setContent(c);
            k.setPointSize(a)
        });
        $(document).on("change", "select[name\x3d'monitor-point-select']", function(a) {
            a = $(this).val();
            $("#widget-control .field-active").data("componentData").setPointSize(a)
        });
        $(document).off("blur", ".j_selected_min,.j_selected_max").on("blur", ".j_selected_min,.j_selected_max", function(a) {
            a = $("#widget-control .field-active").data("componentData");
            var k = $("#edit-widget .j_selected_min").val()
              , e = $("#edit-widget .j_selected_max").val();
            k && e ? Number(k) > Number(e) ? (m.notify("\u6700\u5c0f\u503c\u4e0d\u5f97\u5927\u4e8e\u6700\u5927\u503c!"),
            $(this).val("")) : a.setSelectedNum(k + "-" + e) : a.setSelectedNum(k + "-" + e)
        });
        $(document).off("keyup", ".j_selected_min,.j_selected_max").on("keyup", ".j_selected_min,.j_selected_max", function(a) {
            a = $(this).val().replace(/[^\d.-]/g, "");
            "" == a && (a = 0);
            a = parseInt(a);
            isNaN(a) ? $(this).val("") : 0 == a ? $(this).val("") : $(this).val(a)
        });
        $(document).off("focus", "#text-min-num,#text-max-num").on("focus", "#text-min-num,#text-max-num", function(a) {
            window.objText = $("#widget-control .field-active").data("componentData")
        });
        $(document).off("keyup", "#text-min-num,#text-max-num").on("keyup", "#text-min-num,#text-max-num", function(a) {
            a = $(this).val();
            isNaN(a) && ("-" != a && $(this).val(parseFloat(a)),
            "-" == a && $(this).val(a));
            "." == a.charAt(0) && (isNaN(parseFloat(a)) ? $(this).val("") : $(this).val(0 + parseFloat(a)))
        });
        $(document).off("blur", "#text-min-num").on("blur", "#text-min-num", function(a) {
            a = $(this).val();
            var k = window.objText
              , e = k.componentSetup.maxNum
              , c = k.componentSetup.content;
            "" != e && "" != a && parseInt(e) < parseInt(a) ? (m.notify("\u6700\u5c0f\u503c\u4e0d\u80fd\u5927\u4e8e\u6700\u5927\u503c!"),
            $(this).val("")) : c && a && parseInt(c) < parseInt(a) ? (m.notify("\u8303\u56f4\u5fc5\u987b\u5305\u542b\u9ed8\u8ba4\u503c,\u9ed8\u8ba4\u503c:" + c + " !"),
            $(this).val(""),
            k.setMinNum("")) : "" != a ? k.setMinNum(a) : k.setMinNum("")
        });
        $(document).off("blur", "#editor-component #text-max-num").on("blur", "#editor-component #text-max-num", function(a) {
            a = $(this).val();
            var k = window.objText;
            var e = k.componentSetup.minNum
              , c = k.componentSetup.content;
            "" != e && "" != a && parseInt(e) > parseInt(a) ? (m.notify("\u6700\u5c0f\u503c\u4e0d\u80fd\u5927\u4e8e\u6700\u5927\u503c!"),
            $(this).val("")) : c && a && parseInt(a) < parseInt(c) ? (m.notify("\u8303\u56f4\u5fc5\u987b\u5305\u542b\u9ed8\u8ba4\u503c,\u9ed8\u8ba4\u503c:" + c + " !"),
            $(this).val(""),
            k.setMaxNum("")) : "" != a ? k.setMaxNum(a) : k.setMaxNum("")
        });
        $(document).off("keyup", "#text-max-input").on("keyup", "#text-max-input", function(a) {
            a = $(this).val();
            /^[1-9]\d*$/.test(a) ? $(this).val(a) : $(this).val("")
        });
        $(document).off("blur", "#text-max-input").on("blur", "#text-max-input", function(a) {
            var k = $(this).val()
              , e = parseInt(k)
              , c = $("#widget-control .field-active").data("componentData");
            a = c.componentSetup.isDefault;
            if (1 == a || "true" == a) {
                var b = $("#editor-component").find('#content[comkey\x3d"Text"]').val();
                if (null != b && (a = b.length,
                a > e)) {
                    m.confirm("\u5f53\u524d\u9ed8\u8ba4\u503c\u7684\u957f\u5ea6\u4e3a" + a + ",\u8d85\u8fc7\u4e86\u8bbe\u7f6e\u7684\u6700\u5927\u957f\u5ea6,\u786e\u5b9a\u8981\u66f4\u6539\u5417\uff1f", function(a) {
                        a ? (c.setMaxlen(k),
                        $("#editor-component").find('#content[comkey\x3d"Text"]').val(b.substring(0, e)),
                        $("#widget-control .field-active").find(".field-value_js").val(b.substring(0, e)),
                        c.setContent(b.substring(0, e))) : $("#editor-component").find("#text-max-input").val(c.componentSetup.maxlen)
                    });
                    return
                }
            }
            200 < e ? (m.notify("\u53ea\u80fd\u8f93\u5165\u6b63\u6574\u6570\u5e76\u4e14\u957f\u5ea6\u4e0d\u80fd\u5927\u4e8e200!"),
            $(this).val("")) : 0 < e && 200 >= e ? c.setMaxlen(k) : c.setMaxlen("200")
        });

        $(document).off("keyup", "#textarea-min-height-input").on("keyup", "#textarea-min-height-input", function(a) {
            a = $(this).val();
            /^[1-9]\d*$/.test(a) ? $(this).val(a) : $(this).val("")
        });
        $(document).off("blur", "#textarea-min-height-input").on("blur", "#textarea-min-height-input", function(a) {
            var k = $(this).val()
              , e = parseInt(k)
              , c = $("#widget-control .field-active").data("componentData")
              , d = $("#widget-control .field-active").find(".field-value_js")
              , h = 80;
           
            if(d.hasClass('small')) {
                h = 60
            } else if(d.hasClass('medium')) {
                h = 80
            } else {
                h = 100
            }
            h > e ? (m.notify("只能输入正整数并且高度不能小于"+h+"!"),
            $(this).val("")) : 0 < e && h <= e ? c.setMinHg(e) : c.setMinHg(h);

            200 < e ? (m.notify("只能输入正整数并且高度不能小于200!"),
            $(this).val("")) : 0 < e && 200 >= e ? c.setMinHg(e) : c.setMinHg("200")
            c.setMinHg(e)
            d.css('min-height', e);
        });
    
        $("body").off("click").on("click", function(a) {
            a = $(a.target);
            "form_select_input" == a.attr("id") || a.hasClass("j_form") || $("#editor-component").find("#search_form_list").empty()
        });
        $(document).off("keyup", "#form_select_input").on("keyup", "#form_select_input", function(a) {
            var k = $(this);
            a = $.trim(k.val());
            k = k.attr("module");
            $("#editor-component").find("#search_form_list").empty();
            l.queryMyForms(a, k)
        });
        $(document).off("change", "#form_select_input").on("change", "#form_select_input", function(a) {
            var k = $(this);
            a = k.attr("module");
            var k = $.trim(k.val())
              , e = $("#widget-control .field-active").data("componentData");
            "workflow" == a && !k && e.componentSetup.sformId ? (e.setSformId(""),
            e.setFormName(""),
            e.setFilterParams(""),
            e.setFilterQueryParams(""),
            $("#editor-component").find(".j_delete-box").addClass("hide"),
            $("#editor-component").find(".js_entity_container").html(""),
            e.setDefaultValue(),
            e.typeAhead.options.formId = null,
            e.typeAhead.list = null) : "task" == a && !k && e.componentSetup.sformId && (e.setSformId(""),
            e.setFormName(""),
            e.setFilterParams(""),
            e.setFilterQueryParams(""),
            e.setFormEntity(""),
            $("#editor-component").find(".j_delete-box").addClass("hide"),
            $("#editor-component").find(".js_entity_container").html(""),
            e.setDefaultValue())
        });
        $(document).off("click", "#form_select_input").on("click", "#form_select_input", function(a) {
            var k = $(this);
            if ("0001" != k.attr("noform")) {
                a = $("#editor-component");
                var e = $("#widget-control .field-active").data("formInfo");
                if (null != e && "" != e && 0 < e.length) {
                    a.find("#search_form_list").empty();
                    for (var k = 0, c = e.length; k < c; k++) {
                        var b = e[k];
                        b.name = b.name.replace(/</g, "\x26lt").replace(/>/g, "\x26gt").replace("/[\r\n]/g", " ");
                        b = "\x3cp id\x3d'" + b.id + "' class\x3d'form j_form' style\x3d'width:140px;' title\x3d'" + b.name + "'\x3e" + b.name + "\x3c/p\x3e";
                        a.find("#search_form_list").append(b)
                    }
                } else
                    l.queryMyForms("", k.attr("module"))
            }
        });
        $(document).off("click", ".j_form").on("click", ".j_form", function(a) {
            var k = $(this)
              , c = $("#editor-component")
              , b = c.find(".j_showField").hasClass("hide");
            a = k.attr("id");
            var k = k.text()
              , d = c.find("#form_select_input").attr("module");
            c.find("#form_select_input").attr("value", k).attr("formId", a).val(k);
            c.find("#search_form_list").empty();
            var f = $("#widget-control .field-active").data("componentData");
            if (a != f.componentSetup.sformId) {
                f.setSformId(a);
                f.setFormName(k);
                f.setContent = [];
                c.find(".js_entity_container").html("");
                f.setDefaultValue();
                "task" != d && "workflow" != d && (f.typeAhead.options.formId = a,
                f.typeAhead.list = null,
                f.setColumnFields([]));
                "workflow" == d && $("#editor-component").find(".j_delete-box").removeClass("hide");
                if ("task" == d && ($("#editor-component").find(".j_delete-box").removeClass("hide"),
                (c = $("#widget-control .field-active").data("formInfo")) && 0 < c.length))
                    for (var g = 0; g < c.length; g++)
                        c[g].name == k && f.setFormEntity(c[g]);
                f.setFilterParams("");
                f.setFilterQueryParams("")
            }
            if ("workflow" == d || "task" == d)
                return !1;
            if (0 == b || "false" == b)
                b = $("#widget-control .field-active").data("formId"),
                null != b && b == a ? (a = $("#widget-control .field-active").data("fields"),
                l.renderFormFields(a)) : ($("#widget-control .field-active").data("formId", a),
                b = {},
                b.formId = a,
                b.module = l.module,
                a = [],
                a.push("0"),
                b.statusList = a,
                $.ajax({
                    contentType: "application/json",
                    type: TEAMS.ajaxMethod,
                    data: JSON.stringify(b),
                    dataType: "json",
                    url: "/" + e + "/queryFormFieldByFormId.json",
                    success: function(a) {
                        a = a.formField;
                        $("#widget-control .field-active").data("fields", a);
                        l.renderFormFields(a)
                    }
                }))
        });
        $(document).on("click", ".j_typeahead_wrapper_form #searchform", function(a) {
            a = $("#ownership").val();
            var k = $("#editor-component")
              , e = k.find("#form_select_input").attr("formId")
              , c = k.find("#form_select_input").attr("value")
              , k = k.find("#form_select_input").attr("module")
              , b = "formselect";
            "task" == k && (b = "taskType");
            var d = [];
            d.push({
                name: c,
                id: e
            });
            c = $(this);
            e = new f;
            k = {
                targetEl: c,
                keyword: "",
                module: b,
                type: k,
                isUnique: !0,
                seletedList: d
            };
            "cloud" == a && l.sysMenuId && (k.ownership = "cloud",
            k.sysMenuId = l.sysMenuId);
            e.render("pc", k)
        });
        $(document).on("entitySelected", ".j_typeahead_wrapper_form #searchform", function(a) {
            for (var k = $("#editor-component"), c = k.find(".j_showField").hasClass("hide"), b = k.find("#form_select_input").attr("module"), d = 1; d < arguments.length; d++) {
                var f = arguments[d];
                k.find("#form_select_input").attr("value", f.name).val(f.name);
                k.find("#form_select_input").attr("formId", f.id);
                var g = $("#widget-control .field-active").data("componentData")
                  , h = g.componentSetup.sformId;
                if (h && h == f.id)
                    break;
                g.setSformId(f.id);
                g.setFormName(f.name);
                k.find(".js_entity_container").html("");
                "workflow" != b && (g.setFilterParams(""),
                g.setFilterQueryParams(""));
                g.setDefaultValue();
                "task" != b && (g.typeAhead.options.formId = f.id,
                g.typeAhead.list = null,
                $("#editor-component").find(".j_delete-box").removeClass("hide"));
                if ("workflow" == b || "task" == b) {
                    $("#editor-component").find(".j_delete-box").removeClass("hide");
                    break
                }
                $("#widget-control .field-active").data("formId", f.id);
                if (0 == c || "false" == c)
                    g = {},
                    g.formId = f.id,
                    g.module = l.module,
                    f = [],
                    f.push("0"),
                    g.statusList = f,
                    $.ajax({
                        contentType: "application/json",
                        type: TEAMS.ajaxMethod,
                        data: JSON.stringify(g),
                        dataType: "json",
                        url: "/" + e + "/queryFormFieldByFormId.json",
                        success: function(a) {
                            a = a.formField;
                            $("#widget-control .field-active").data("fields", a);
                            l.renderFormFields(a)
                        }
                    })
            }
        });
        $(document).on("input propertychange", ".j_typeahead_wrapper_form #form_select_input", function() {
            var a = $(this).attr("module")
              , k = $(this).val();
            if ("workflow" == a || "task" == a)
                k ? $(this).siblings(".j_delete-box").removeClass("hide") : $(this).siblings(".j_delete-box").addClass("hide")
        });
        $(document).off("click", ".j_delete-box").on("click", ".j_delete-box", function(a) {
            $(this).addClass("hide");
            a = $(this).parent().find("#form_select_input");
            var k = $("#widget-control .field-active").data("componentData")
              , e = $("#editor-component").find("#form_select_input").attr("module");
            a.val("");
            "task" == e ? (k.setSformId(""),
            k.setFormName(""),
            k.setFilterParams(""),
            k.setFilterQueryParams(""),
            k.setFormEntity(""),
            $("#editor-component").find(".j_delete-box").addClass("hide"),
            $("#editor-component").find(".js_entity_container").html(""),
            k.setDefaultValue()) : (k.setSformId(""),
            k.setFormName(""),
            $("#editor-component").find(".js_entity_container").html(""),
            k.setDefaultValue(),
            k.typeAhead.options.formId = null,
            k.typeAhead.list = null,
            k.setFilterParams(""),
            k.setFilterQueryParams(""))
        });
        $(document).off("click", ".j_card_conf").on("click", ".j_card_conf", function(a) {
            a = $(this).attr("type");
            var k = $("#editor-component");
            k.find(".j_showField").removeClass("hide");
            k.find(".j_batch_edit").removeClass("hide");
            k.find(".j_cardConf").addClass("hide");
            if ("form" == a)
                k = k.find("#form_select_input").attr("formId"),
                a = {},
                a.formId = k,
                a.module = l.module,
                k = [],
                k.push("0"),
                a.statusList = k,
                $.ajax({
                    contentType: "application/json",
                    type: TEAMS.ajaxMethod,
                    data: JSON.stringify(a),
                    dataType: "json",
                    url: "/" + e + "/queryFormFieldByFormId.json",
                    success: function(a) {
                        a = a.formField;
                        $("#widget-control .field-active").data("fields", a);
                        l.renderFormFields(a)
                    }
                });
            else if ("customer" == a) {
                a = k.find(".j_clone .j_customer-field-li").clone();
                k.find(".j_showField .j_customer-field-ul").append(a);
                a = $("#widget-control .field-active").data("componentData");
                var k = k.find(".j_showField .j_customer-field-ul").find(".j_customer-field-select").val()
                  , c = [];
                c.push(k);
                a.setCusfields(c)
            } else
                "contact" == a ? (a = k.find(".j_clone .j_contact-field-li").clone(),
                k.find(".j_showField .j_contact-field-ul").append(a),
                a = $("#widget-control .field-active").data("componentData"),
                k = k.find(".j_showField .j_contact-field-ul").find(".j_contact-field-select").val(),
                c = [],
                c.push(k),
                a.setShowfields(c)) : "chance" == a ? (a = k.find(".j_clone .j_chance-field-li").clone(),
                k.find(".j_showField .j_chance-field-ul").append(a),
                a = $("#widget-control .field-active").data("componentData"),
                k = k.find(".j_showField .j_chance-field-ul").find(".j_chance-field-select").val(),
                c = [],
                c.push(k),
                a.setShowfields(c)) : "production" == a ? (a = k.find(".j_clone .j_production-field-li").clone(),
                k.find(".j_showField .j_production-field-ul").append(a),
                a = $("#widget-control .field-active").data("componentData"),
                k = k.find(".j_showField .j_production-field-ul").find(".j_production-field-select").val(),
                c = [],
                c.push(k),
                a.setShowfields(c)) : "contract" == a ? (a = k.find(".j_clone .j_contract-field-li").clone(),
                k.find(".j_showField .j_contract-field-ul").append(a),
                a = $("#widget-control .field-active").data("componentData"),
                k = k.find(".j_showField .j_contract-field-ul").find(".j_contract-field-select").val(),
                c = [],
                c.push(k),
                a.setShowfields(c)) : "agenda" == a && (a = k.find(".j_clone .j_agenda-field-li").clone(),
                k.find(".j_showField .j_agenda-field-ul").append(a),
                a = $("#widget-control .field-active").data("componentData"),
                k = k.find(".j_showField .j_agenda-field-ul").find(".j_agenda-field-select").val(),
                c = [],
                c.push(k),
                a.setShowfields(c))
        });
        $(document).on("change", "select[name\x3d'form-field-select']", function(a) {
            a = $(this).parents("#editor-component").find(".j_showField .j_form-field-li");
            if (0 < a.length) {
                for (var k = [], e = 0; e < a.length; e++) {
                    var c = a[e]
                      , b = $(c).find("select").val()
                      , c = $(c).find("select").find("option[value\x3d'" + b + "']").text();
                    "defaultSel" != b && k.push(b + "_" + c)
                }
                $("#widget-control .field-active").data("componentData").setFieldIds(k)
            }
        });
        $(document).off("click", ".j_addformfield").on("click", ".j_addformfield", function(a) {
            a = $(this).parents("#editor-component");
            var k = a.find(".j_showField .j_form-field-li");
            if (0 < k.length) {
                var e = $(k[0]).find("option");
                if (k.length == e.length) {
                    m.notify("\u4e0d\u80fd\u8d85\u8fc7\u6700\u5927\u7684\u5b57\u6bb5\u4e2a\u6570!");
                    return
                }
                k = $(k[0]).clone();
                a.find(".j_showField .j_form-field-ul").append(k)
            }
            a = a.find(".j_showField .j_form-field-li");
            k = [];
            for (e = 0; e < a.length; e++) {
                var c = a[e]
                  , b = $(c).find("select").val()
                  , c = $(c).find("select").find("option[value\x3d'" + b + "']").text();
                k.push(b + "_" + c)
            }
            $("#widget-control .field-active").data("componentData").setFieldIds(k)
        });
        $(document).off("click", ".j_delformfield").on("click", ".j_delformfield", function(a) {
            $(this).parent().parent().remove();
            a = $("#widget-control .field-active").data("componentData");
            var k = $("#editor-component").find(".j_showField .j_form-field-li")
              , e = [];
            if (0 == k.length)
                $("#editor-component").find(".j_showField").addClass("hide"),
                $("#editor-component").find(".j_batch_edit").addClass("hide"),
                $("#editor-component").find(".j_cardConf").removeClass("hide");
            else
                for (var c = 0; c < k.length; c++) {
                    var b = k[c]
                      , l = $(b).find("select").val()
                      , b = $(b).find("select").find("option[value\x3d'" + l + "']").text();
                    e.push(l + "_" + b)
                }
            a.setFieldIds(e)
        });
        $(document).on("click", "#editor-component #isAllFormData", function(a) {
            a = $(this).is(":checked");
            $("#widget-control .field-active").data("componentData").setIsAllFormData(a)
        });
        $("body").on("mouseenter.dropdownmenu", ".dropdown-menu-toggle", function(a) {
            var k = $(this);
            k.addClass("open");
            a = setTimeout(function() {
                k.children(".dropdown-menu").slideDown("fast")
            }, 300);
            k.data("showTimer", a)
        }).on("mouseleave.dropdownmenu", ".dropdown-menu-toggle", function(a) {
            a = $(this).data("showTimer");
            $(this).removeClass("open");
            a && clearTimeout(a);
            $(this).removeData("showTimer");
            $(this).children(".dropdown-menu").slideUp(100)
        });
        $(document).off("click", ".j_filterCondition_conf").on("click", ".j_filterCondition_conf", function(a) {
            $(this);
            var k = $("#editor-component")
              , e = k.find("#form_select_input").attr("module");
            a = $("#filter-condition");
            a.attr("module", e ? e : "");
            a.find("#search-group-list").empty();
            var c = $("#widget-control .field-active").data("componentData")
              , b = c.componentSetup.filterQueryParams;
            if (b) {
                var d = "";
                "object" == typeof b ? d = b : "string" == typeof b && (d = JSON.parse(b));
                if (d) {
                    k = k.find("#form_select_input").attr("formId");
                    if (k == d.formId) {
                        if (d.names && 0 < d.names.length)
                            for (k = 0; k < d.names.length; k++)
                                $(document).find("#filter-condition .j_addCondition").eq(0).trigger("click"),
                                a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"name"]').attr("selected", !0).trigger("change"),
                                a.find("#search-group-list .sch-group:last .j_formField-condition select option[value\x3d" + d.names[k].term + "]").attr("selected", !0),
                                a.find("#search-group-list .sch-group:last .j_formField-condition").find("input").val(d.names[k].content);
                        if (d.progress && 0 < d.progress.length)
                            for (k = 0; k < d.progress.length; k++)
                                $(document).find("#filter-condition .j_addCondition").eq(0).trigger("click"),
                                a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"progress"]').attr("selected", !0).trigger("change"),
                                a.find("#search-group-list .sch-group:last .j_formField-condition select option[value\x3d" + d.progress[k].term + "]").attr("selected", !0),
                                a.find("#search-group-list .sch-group:last .j_formField-condition").find("input").val(d.progress[k].content);
                        if (d.isFinished && 0 < d.isFinished.length)
                            for (k = 0; k < d.isFinished.length; k++) {
                                $(document).find("#filter-condition .j_addCondition").eq(0).trigger("click");
                                a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"isFinished"]').attr("selected", !0).trigger("change");
                                a.find("#search-group-list .sch-group:last .j_formField-condition select option[value\x3d" + d.isFinished[k].term + "]").attr("selected", !0);
                                for (var f = 0; f < d.isFinished[k].ids.length; f++) {
                                    var g = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d"' + d.isFinished[k].ids[f].id + '" title\x3d"' + d.isFinished[k].ids[f].name + '"\x3e' + d.isFinished[k].ids[f].name + "\x3c/a\x3e\x3c/span\x3e";
                                    a.find("#search-group-list .sch-group:last .j_formField-condition").find(".j_selected").append(g)
                                }
                            }
                        if (d.flowNames && 0 < d.flowNames.length)
                            for (k = 0; k < d.flowNames.length; k++)
                                $(document).find("#filter-condition .j_addCondition").eq(0).trigger("click"),
                                a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"flowName"]').attr("selected", !0).trigger("change"),
                                a.find("#search-group-list .sch-group:last .j_formField-condition select option[value\x3d" + d.flowNames[k].term + "]").attr("selected", !0),
                                a.find("#search-group-list .sch-group:last .j_formField-condition").find("input").val(d.flowNames[k].content);
                        if (d.descriptions && 0 < d.descriptions.length)
                            for (k = 0; k < d.descriptions.length; k++)
                                $(document).find("#filter-condition .j_addCondition").eq(0).trigger("click"),
                                a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"description"]').attr("selected", !0).trigger("change"),
                                a.find("#search-group-list .sch-group:last .j_formField-condition select option[value\x3d" + d.descriptions[k].term + "]").attr("selected", !0),
                                a.find("#search-group-list .sch-group:last .j_formField-condition").find("input").val(d.descriptions[k].content);
                        if (d.operators && 0 < d.operators.length)
                            for (k = 0; k < d.operators.length; k++)
                                for ($(document).find("#filter-condition .j_addCondition").eq(0).trigger("click"),
                                a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"operator"]').attr("selected", !0).trigger("change"),
                                a.find("#search-group-list .sch-group:last .j_formField-condition select option[value\x3d" + d.operators[k].term + "]").attr("selected", !0),
                                f = 0; f < d.operators[k].ids.length; f++)
                                    g = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d"' + d.operators[k].ids[f].id + '" title\x3d"' + d.operators[k].ids[f].name + '"\x3e' + d.operators[k].ids[f].name + "\x3c/a\x3e\x3c/span\x3e",
                                    a.find("#search-group-list .sch-group:last .j_formField-condition").find(".j_selected").append(g);
                        if (d.creators && 0 < d.creators.length)
                            for (k = 0; k < d.creators.length; k++)
                                for ($(document).find("#filter-condition .j_addCondition").eq(0).trigger("click"),
                                a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"creator"]').attr("selected", !0).trigger("change"),
                                a.find("#search-group-list .sch-group:last .j_formField-condition select option[value\x3d" + d.creators[k].term + "]").attr("selected", !0),
                                f = 0; f < d.creators[k].ids.length; f++)
                                    g = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d"' + d.creators[k].ids[f].id + '" title\x3d"' + d.creators[k].ids[f].name + '"\x3e' + d.creators[k].ids[f].name + "\x3c/a\x3e\x3c/span\x3e",
                                    a.find("#search-group-list .sch-group:last .j_formField-condition").find(".j_selected").append(g);
                        if (d.managers && 0 < d.managers.length)
                            for (k = 0; k < d.managers.length; k++)
                                for ($(document).find("#filter-condition .j_addCondition").eq(0).trigger("click"),
                                a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"manager"]').attr("selected", !0).trigger("change"),
                                a.find("#search-group-list .sch-group:last .j_formField-condition select option[value\x3d" + d.managers[k].term + "]").attr("selected", !0),
                                f = 0; f < d.managers[k].ids.length; f++)
                                    g = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d"' + d.managers[k].ids[f].id + '" title\x3d"' + d.managers[k].ids[f].name + '"\x3e' + d.managers[k].ids[f].name + "\x3c/a\x3e\x3c/span\x3e",
                                    a.find("#search-group-list .sch-group:last .j_formField-condition").find(".j_selected").append(g);
                        if (d.shareMans && 0 < d.shareMans.length)
                            for (k = 0; k < d.shareMans.length; k++)
                                for ($(document).find("#filter-condition .j_addCondition").eq(0).trigger("click"),
                                a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"shareMan"]').attr("selected", !0).trigger("change"),
                                a.find("#search-group-list .sch-group:last .j_formField-condition select option[value\x3d" + d.shareMans[k].term + "]").attr("selected", !0),
                                f = 0; f < d.shareMans[k].ids.length; f++)
                                    g = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d"' + d.shareMans[k].ids[f].id + '" title\x3d"' + d.shareMans[k].ids[f].name + '"\x3e' + d.shareMans[k].ids[f].name + "\x3c/a\x3e\x3c/span\x3e",
                                    a.find("#search-group-list .sch-group:last .j_formField-condition").find(".j_selected").append(g);
                        if (d.participants && 0 < d.participants.length)
                            for (k = 0; k < d.participants.length; k++)
                                for ($(document).find("#filter-condition .j_addCondition").eq(0).trigger("click"),
                                a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"participant"]').attr("selected", !0).trigger("change"),
                                a.find("#search-group-list .sch-group:last .j_formField-condition select option[value\x3d" + d.participants[k].term + "]").attr("selected", !0),
                                f = 0; f < d.participants[k].ids.length; f++)
                                    g = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d"' + d.participants[k].ids[f].id + '" title\x3d"' + d.participants[k].ids[f].name + '"\x3e' + d.participants[k].ids[f].name + "\x3c/a\x3e\x3c/span\x3e",
                                    a.find("#search-group-list .sch-group:last .j_formField-condition").find(".j_selected").append(g);
                        if (d.flowOperators && 0 < d.flowOperators.length)
                            for (k = 0; k < d.flowOperators.length; k++)
                                for ($(document).find("#filter-condition .j_addCondition").eq(0).trigger("click"),
                                a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"flowOperator"]').attr("selected", !0).trigger("change"),
                                a.find("#search-group-list .sch-group:last .j_formField-condition select option[value\x3d" + d.flowOperators[k].term + "]").attr("selected", !0),
                                f = 0; f < d.flowOperators[k].ids.length; f++)
                                    g = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d"' + d.flowOperators[k].ids[f].id + '" title\x3d"' + d.flowOperators[k].ids[f].name + '"\x3e' + d.flowOperators[k].ids[f].name + "\x3c/a\x3e\x3c/span\x3e",
                                    a.find("#search-group-list .sch-group:last .j_formField-condition").find(".j_selected").append(g);
                        if (d.flowOperatorDepts && 0 < d.flowOperatorDepts.length)
                            for (k = 0; k < d.flowOperatorDepts.length; k++)
                                for ($(document).find("#filter-condition .j_addCondition").eq(0).trigger("click"),
                                a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"flowOperatorDept"]').attr("selected", !0).trigger("change"),
                                a.find("#search-group-list .sch-group:last .j_formField-condition select option[value\x3d" + d.flowOperatorDepts[k].term + "]").attr("selected", !0),
                                f = 0; f < d.flowOperatorDepts[k].ids.length; f++)
                                    g = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d"' + d.flowOperatorDepts[k].ids[f].id + '" title\x3d"' + d.flowOperatorDepts[k].ids[f].name + '"\x3e' + d.flowOperatorDepts[k].ids[f].name + "\x3c/a\x3e\x3c/span\x3e",
                                    a.find("#search-group-list .sch-group:last .j_formField-condition").find(".j_selected").append(g);
                        if (d.prioritys && 0 < d.prioritys.length)
                            for (k = 0; k < d.prioritys.length; k++)
                                for ($(document).find("#filter-condition .j_addCondition").eq(0).trigger("click"),
                                a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"priority"]').attr("selected", !0).trigger("change"),
                                a.find("#search-group-list .sch-group:last .j_formField-condition select option[value\x3d" + d.prioritys[k].term + "]").attr("selected", !0),
                                f = 0; f < d.prioritys[k].ids.length; f++)
                                    g = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d"' + d.prioritys[k].ids[f].id + '" title\x3d"' + d.prioritys[k].ids[f].name + '"\x3e' + d.prioritys[k].ids[f].name + "\x3c/a\x3e\x3c/span\x3e",
                                    a.find("#search-group-list .sch-group:last .j_formField-condition").find(".j_selected").append(g);
                        if (d.createTimes && 0 < d.createTimes.length)
                            for (k = 0; k < d.createTimes.length; k++)
                                $(document).find("#filter-condition .j_addCondition").eq(0).trigger("click"),
                                a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"createTime"]').attr("selected", !0).trigger("change"),
                                a.find("#search-group-list .sch-group:last .j_formField-condition").find("input").eq(0).val(d.createTimes[k].content),
                                a.find("#search-group-list .sch-group:last .j_formField-condition").find("input").eq(1).val(d.createTimes[k].endContent);
                        if (d.flowSubmitTimes && 0 < d.flowSubmitTimes.length)
                            for (k = 0; k < d.flowSubmitTimes.length; k++)
                                $(document).find("#filter-condition .j_addCondition").eq(0).trigger("click"),
                                a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"flowSubmitTime"]').attr("selected", !0).trigger("change"),
                                d.flowSubmitTimes[k].selectedOption ? (a.find('#search-group-list .sch-group:last .j_formField-condition .j_search_default_date option[key\x3d"' + d.flowSubmitTimes[k].selectedOption + '"]').attr("selected", !0).trigger("change"),
                                a.find("#search-group-list .sch-group:last .j_formField-condition .j_datetime").addClass("hide")) : (a.find("#search-group-list .sch-group:last .j_formField-condition").find("input").eq(0).val(d.flowSubmitTimes[k].content),
                                a.find("#search-group-list .sch-group:last .j_formField-condition").find("input").eq(1).val(d.flowSubmitTimes[k].endContent));
                        if (d.flowFinishTimes && 0 < d.flowFinishTimes.length)
                            for (k = 0; k < d.flowFinishTimes.length; k++)
                                $(document).find("#filter-condition .j_addCondition").eq(0).trigger("click"),
                                a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"flowFinishTime"]').attr("selected", !0).trigger("change"),
                                d.flowFinishTimes[k].selectedOption ? (a.find('#search-group-list .sch-group:last .j_formField-condition .j_search_default_date option[key\x3d"' + d.flowFinishTimes[k].selectedOption + '"]').attr("selected", !0).trigger("change"),
                                a.find("#search-group-list .sch-group:last .j_formField-condition .j_datetime").addClass("hide")) : (a.find("#search-group-list .sch-group:last .j_formField-condition").find("input").eq(0).val(d.flowFinishTimes[k].content),
                                a.find("#search-group-list .sch-group:last .j_formField-condition").find("input").eq(1).val(d.flowFinishTimes[k].endContent));
                        if (d.createdates && 0 < d.createdates.length)
                            for (k = 0; k < d.createdates.length; k++)
                                $(document).find("#filter-condition .j_addCondition").eq(0).trigger("click"),
                                a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"createdate"]').attr("selected", !0).trigger("change"),
                                d.createdates[k].selectedOption ? (a.find('#search-group-list .sch-group:last .j_formField-condition .j_search_default_date option[key\x3d"' + d.createdates[k].selectedOption + '"]').attr("selected", !0).trigger("change"),
                                a.find("#search-group-list .sch-group:last .j_formField-condition .j_datetime").addClass("hide")) : (a.find("#search-group-list .sch-group:last .j_formField-condition").find("input").eq(0).val(d.createdates[k].content),
                                a.find("#search-group-list .sch-group:last .j_formField-condition").find("input").eq(1).val(d.createdates[k].endContent));
                        if (d.lastUpdateTimes && 0 < d.lastUpdateTimes.length)
                            for (k = 0; k < d.lastUpdateTimes.length; k++)
                                $(document).find("#filter-condition .j_addCondition").eq(0).trigger("click"),
                                a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"lastUpdateTime"]').attr("selected", !0).trigger("change"),
                                d.lastUpdateTimes[k].selectedOption ? (a.find('#search-group-list .sch-group:last .j_formField-condition .j_search_default_date option[key\x3d"' + d.lastUpdateTimes[k].selectedOption + '"]').attr("selected", !0).trigger("change"),
                                a.find("#search-group-list .sch-group:last .j_formField-condition .j_datetime").addClass("hide")) : (a.find("#search-group-list .sch-group:last .j_formField-condition").find("input").eq(0).val(d.lastUpdateTimes[k].content),
                                a.find("#search-group-list .sch-group:last .j_formField-condition").find("input").eq(1).val(d.lastUpdateTimes[k].endContent));
                        if (d.startTimes && 0 < d.startTimes.length)
                            for (k = 0; k < d.startTimes.length; k++)
                                $(document).find("#filter-condition .j_addCondition").eq(0).trigger("click"),
                                a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"startTime"]').attr("selected", !0).trigger("change"),
                                d.startTimes[k].selectedOption ? (a.find('#search-group-list .sch-group:last .j_formField-condition .j_search_default_date option[key\x3d"' + d.startTimes[k].selectedOption + '"]').attr("selected", !0).trigger("change"),
                                a.find("#search-group-list .sch-group:last .j_formField-condition .j_datetime").addClass("hide")) : (a.find("#search-group-list .sch-group:last .j_formField-condition").find("input").eq(0).val(d.startTimes[k].content),
                                a.find("#search-group-list .sch-group:last .j_formField-condition").find("input").eq(1).val(d.startTimes[k].endContent));
                        if (d.duedates && 0 < d.duedates.length)
                            for (k = 0; k < d.duedates.length; k++)
                                $(document).find("#filter-condition .j_addCondition").eq(0).trigger("click"),
                                a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"duedate"]').attr("selected", !0).trigger("change"),
                                d.duedates[k].selectedOption ? (a.find('#search-group-list .sch-group:last .j_formField-condition .j_search_default_date option[key\x3d"' + d.duedates[k].selectedOption + '"]').attr("selected", !0).trigger("change"),
                                a.find("#search-group-list .sch-group:last .j_formField-condition .j_datetime").addClass("hide")) : (a.find("#search-group-list .sch-group:last .j_formField-condition").find("input").eq(0).val(d.duedates[k].content),
                                a.find("#search-group-list .sch-group:last .j_formField-condition").find("input").eq(1).val(d.duedates[k].endContent));
                        if (d.commentTimes && 0 < d.commentTimes.length)
                            for (k = 0; k < d.commentTimes.length; k++)
                                $(document).find("#filter-condition .j_addCondition").eq(0).trigger("click"),
                                a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"commentTime"]').attr("selected", !0).trigger("change"),
                                d.commentTimes[k].selectedOption ? (a.find('#search-group-list .sch-group:last .j_formField-condition .j_search_default_date option[key\x3d"' + d.commentTimes[k].selectedOption + '"]').attr("selected", !0).trigger("change"),
                                a.find("#search-group-list .sch-group:last .j_formField-condition .j_datetime").addClass("hide")) : (a.find("#search-group-list .sch-group:last .j_formField-condition").find("input").eq(0).val(d.commentTimes[k].content),
                                a.find("#search-group-list .sch-group:last .j_formField-condition").find("input").eq(1).val(d.commentTimes[k].endContent));
                        if (d.types && 0 < d.types.length)
                            for (k = 0; k < d.types.length; k++)
                                for ($(document).find("#filter-condition .j_addCondition").eq(0).trigger("click"),
                                a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"type"]').attr("selected", !0).trigger("change"),
                                a.find("#search-group-list .sch-group:last .j_formField-condition select option[value\x3d" + d.types[k].term + "]").attr("selected", !0),
                                f = 0; f < d.types[k].ids.length; f++)
                                    g = '\x3cspan class\x3d"entity-item"\x3e\x3ca status\x3d"' + d.types[k].ids[f].status + '" title\x3d"' + d.types[k].ids[f].text + '"\x3e' + d.types[k].ids[f].text + "\x3c/a\x3e\x3c/span\x3e",
                                    a.find("#search-group-list .sch-group:last .j_formField-condition").find(".j_selected").append(g);
                        if (d.flowStatuss && 0 < d.flowStatuss.length)
                            for (k = 0; k < d.flowStatuss.length; k++)
                                for ($(document).find("#filter-condition .j_addCondition").eq(0).trigger("click"),
                                a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"flowStatus"]').attr("selected", !0).trigger("change"),
                                a.find("#search-group-list .sch-group:last .j_formField-condition select option[value\x3d" + d.flowStatuss[k].term + "]").attr("selected", !0),
                                f = 0; f < d.flowStatuss[k].ids.length; f++)
                                    g = '\x3cspan class\x3d"entity-item"\x3e\x3ca status\x3d"' + d.flowStatuss[k].ids[f].status + '" title\x3d"' + d.flowStatuss[k].ids[f].text + '"\x3e' + d.flowStatuss[k].ids[f].text + "\x3c/a\x3e\x3c/span\x3e",
                                    a.find("#search-group-list .sch-group:last .j_formField-condition").find(".j_selected").append(g);
                        if (d.filterFormDatas && 0 < d.filterFormDatas.length)
                            for (k = 0; k < d.filterFormDatas.length; k++) {
                                $(document).find("#filter-condition .j_addCondition").eq(0).trigger("click");
                                var h = ["DateComponent", "Money", "NumberComponent", "Monitor", "Raty"]
                                  , b = a.find("#search-group-list .sch-group:last")
                                  , A = d.filterFormDatas[k].term
                                  , c = d.filterFormDatas[k].com_key;
                                if ((f = d.filterFormDatas[k].fieldId) || "task" != e && "mainline" != e)
                                    if (0 == a.find('#search-group-list .sch-group:last .sch-item select option[id\x3d"' + f + '"]').length) {
                                        a.find("#search-group-list .sch-group:last").remove();
                                        continue
                                    } else
                                        a.find('#search-group-list .sch-group:last .sch-item select option[id\x3d"' + f + '"]').attr("selected", !0).trigger("change");
                                else
                                    a.find('#search-group-list .sch-group:last .sch-item select option[key\x3d"' + c + '"]').attr("selected", !0).trigger("change");
                                a.find("#search-group-list .sch-group:last .j_formField-condition select option[value\x3d" + A + "]").attr("selected", !0);
                                if (l.getType(c, "Text TextArea Email Phone Mobile FileComponent PositionComponent".split(" ")))
                                    h = d.filterFormDatas[k].content,
                                    a.find("#search-group-list .sch-group:last .j_formField-condition").find("input").val(h);
                                else if (l.getType(c, h))
                                    h = d.filterFormDatas[k].content,
                                    c = d.filterFormDatas[k].endContent,
                                    a.find("#search-group-list .sch-group:last .j_formField-condition").find("input").eq(0).val(h),
                                    a.find("#search-group-list .sch-group:last .j_formField-condition").find("input").eq(1).val(c);
                                else if ("ComboSelect" == c)
                                    h = d.filterFormDatas[k].children,
                                    m.renderStatSearch({
                                        parentEl: b,
                                        fieldId: f,
                                        componentKey: c,
                                        ids: h,
                                        term: A,
                                        container: "#filter-condition",
                                        module: l.module
                                    });
                                else if (h = d.filterFormDatas[k].ids)
                                    for (f = 0; f < h.length; f++)
                                        g = $('\x3cspan name\x3d"js_entity_item" class\x3d"js_entity_item employee-item j_component entity-item"\x3e\x3ca title\x3d"' + h[f].text + '" class\x3d"usercard-toggle entitybox-toggle" id\x3d"' + h[f].id + '" data-id\x3d"' + h[f].id + '"\x3e' + h[f].text + "\x3c/a\x3e\x3c/span\x3e"),
                                        c = {
                                            id: h[f].id,
                                            name: h[f].text
                                        },
                                        g.data("obj", c),
                                        a.find("#search-group-list .sch-group:last .j_formField-condition").find(".j_selected").append(g);
                                "null" == A || "notnull" == A ? (b.find(".j_condition").next().addClass("hide"),
                                b.find(".j_selected,.j_control").addClass("hide-im")) : (b.find(".j_condition").next().removeClass("hide"),
                                b.find(".j_selected,.j_control").removeClass("hide-im"))
                            }
                    } else
                        e = a.find("#filter-condition-clone").clone(),
                        e.attr("id", "").removeClass("hide"),
                        a.find("#search-group-list").append(e),
                        e = a.find("#search-group-list .j_formField-select select"),
                        d = l.queryFormFields(k),
                        l.renderFields(e, d);
                    a.modal()
                }
            } else {
                a.find("#filter-condition-clone").clone();
                k = k.find("#form_select_input").attr("formId");
                switch (e) {
                case "task":
                    e = a.find("#filter-condition-task-clone").clone();
                    d = l.queryFormFields(k);
                    e.attr("id", "").removeClass("hide");
                    a.find("#search-group-list").append(e);
                    $cloneCom = a.find("#filter-condition-commonality-clone select option").clone();
                    a.find("#search-group-list #task-clone-select").append($cloneCom);
                    e = a.find("#search-group-list .j_formField-select select");
                    l.renderFields(e, d);
                    break;
                case "mainline":
                    e = a.find("#filter-condition-mainline-clone").clone();
                    e.attr("id", "").removeClass("hide");
                    a.find("#search-group-list").append(e);
                    $cloneCom = a.find("#filter-condition-commonality-clone select option").clone();
                    a.find("#search-group-list #mainline-clone-select").append($cloneCom);
                    break;
                case "document":
                    e = a.find("#filter-condition-document-clone").clone();
                    d = l.queryDocFields();
                    e.attr("id", "").removeClass("hide");
                    a.find("#search-group-list").append(e);
                    e = a.find("#search-group-list .j_formField-select select");
                    l.renderFieldsByDoc(e, d);
                    break;
                case "workflow":
                    e = a.find("#filter-condition-workflow-clone").clone();
                    d = l.queryFormFields(k, "workflow");
                    e.attr("id", "").removeClass("hide");
                    a.find("#search-group-list").append(e);
                    e = a.find("#search-group-list .j_formField-select select");
                    l.renderFields(e, d);
                    break;
                default:
                    e = a.find("#filter-condition-clone").clone(),
                    d = l.queryFormFields(k),
                    e.attr("id", "").removeClass("hide"),
                    a.find("#search-group-list").append(e),
                    e = a.find("#search-group-list .j_formField-select select"),
                    l.renderFields(e, d)
                }
                a.modal()
            }
        });
        $(document).off("change", "#filter-condition #search-group-list .j_formField-select select").on("change", "#filter-condition #search-group-list .j_formField-select select", function(a) {
            var k = $(this)
              , e = $("#filter-condition")
              , b = $("#editor-component").find("#form_select_input").attr("module")
              , d = (new Date).getTime()
              , f = $(this).find("option:selected");
            a = f.attr("id");
            var g = f.attr("key");
            f.attr("subFormId");
            var f = f.data("layoutDetail")
              , h = "";
            switch (g) {
            case "name":
                h = "document" == b ? e.find("#name-document-clone").clone() : e.find("#name-clone").clone();
                k.parent().parent().attr("class", "sch-group j_nameSearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                break;
            case "progress":
                h = e.find("#progress-clone").clone();
                k.parent().parent().attr("class", "sch-group j_progressSearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                break;
            case "isFinished":
                h = e.find("#isFinished-clone").clone();
                k.parent().parent().attr("class", "sch-group j_isFinishedSearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                break;
            case "flowName":
                h = e.find("#name-clone").clone();
                k.parent().parent().attr("class", "sch-group j_flowNameSearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                break;
            case "flowSubmitTime":
                h = e.find("#createdate-clone").clone();
                h.find(".j_datetime").attr("id", "j_datetime" + d);
                k.parent().parent().attr("class", "sch-group j_flowSubmitTimeSearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                m.datepicker({
                    el: "#filter-condition #j_datetime" + d + " #startTime",
                    callback: function(a) {
                        a = Date.create(a.date).format("{yyyy}-{MM}-{dd}");
                        var k = $("#filter-condition #j_datetime" + d).find("#startTime")
                          , e = $("#filter-condition #j_datetime" + d).find("#endTime");
                        e.val() && a > e.val() ? (m.notify("\u5f00\u59cb\u65e5\u671f\u4e0d\u80fd\u5927\u4e8e\u7ed3\u675f\u65e5\u671f"),
                        k.val("")) : k.val(a)
                    }
                });
                m.datepicker({
                    el: "#filter-condition #j_datetime" + d + " #endTime",
                    callback: function(a) {
                        a = Date.create(a.date).format("{yyyy}-{MM}-{dd}");
                        var k = $("#filter-condition #j_datetime" + d).find("#startTime")
                          , e = $("#filter-condition #j_datetime" + d).find("#endTime");
                        k.val() && a < k.val() ? (m.notify("\u7ed3\u675f\u65e5\u671f\u4e0d\u80fd\u5c0f\u4e8e\u5f00\u59cb\u65e5\u671f"),
                        e.val("")) : e.val(a)
                    }
                });
                break;
            case "flowFinishTime":
                h = e.find("#createdate-clone").clone();
                h.find(".j_datetime").attr("id", "j_datetime" + d);
                k.parent().parent().attr("class", "sch-group j_flowFinishTimeSearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                m.datepicker({
                    el: "#filter-condition #j_datetime" + d + " #startTime",
                    callback: function(a) {
                        a = Date.create(a.date).format("{yyyy}-{MM}-{dd}");
                        var k = $("#filter-condition #j_datetime" + d).find("#startTime")
                          , e = $("#filter-condition #j_datetime" + d).find("#endTime");
                        e.val() && a > e.val() ? (m.notify("\u5f00\u59cb\u65e5\u671f\u4e0d\u80fd\u5927\u4e8e\u7ed3\u675f\u65e5\u671f"),
                        k.val("")) : k.val(a)
                    }
                });
                m.datepicker({
                    el: "#filter-condition #j_datetime" + d + " #endTime",
                    callback: function(a) {
                        a = Date.create(a.date).format("{yyyy}-{MM}-{dd}");
                        var k = $("#filter-condition #j_datetime" + d).find("#startTime")
                          , e = $("#filter-condition #j_datetime" + d).find("#endTime");
                        k.val() && a < k.val() ? (m.notify("\u7ed3\u675f\u65e5\u671f\u4e0d\u80fd\u5c0f\u4e8e\u5f00\u59cb\u65e5\u671f"),
                        e.val("")) : e.val(a)
                    }
                });
                break;
            case "flowStatus":
                h = e.find("#flow-status-clone").clone();
                k.parent().parent().attr("class", "sch-group j_flowStatusSearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                break;
            case "flowOperator":
                h = e.find("#operator-clone").clone();
                h.find(".j_optcontainer").attr("id", "j_opt" + d);
                k.parent().parent().attr("class", "sch-group j_flowOperatorSearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                new c({
                    el: "#filter-condition #j_opt" + d,
                    remote: TEAMS.api.suggestion,
                    entity: "employee",
                    source: "formcomponent"
                });
                break;
            case "flowOperatorDept":
                h = e.find("#field-clone").clone();
                h.find(".j_optcontainer").attr("id", "j_opt" + d);
                k.parent().parent().attr("class", "sch-group j_flowOperatorDeptSearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                new c({
                    el: "#filter-condition #j_opt" + d,
                    remote: TEAMS.service.flow + "/workflowlist/suggestion.json",
                    entity: s,
                    source: "formcomponent"
                });
                break;
            case "createTime":
                h = e.find("#createTime-clone").clone();
                h.find(".j_datetime").attr("id", "j_datetime" + d);
                k.parent().parent().attr("class", "sch-group j_createTimeSearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                m.datepicker({
                    el: "#filter-condition #j_datetime" + d + " #startTime",
                    callback: function(a) {
                        a = Date.create(a.date).format("{yyyy}-{MM}-{dd}");
                        var k = $("#filter-condition #j_datetime" + d).find("#startTime")
                          , e = $("#filter-condition #j_datetime" + d).find("#endTime");
                        e.val() && a > e.val() ? (m.notify("\u5f00\u59cb\u65e5\u671f\u4e0d\u80fd\u5927\u4e8e\u7ed3\u675f\u65e5\u671f"),
                        k.val("")) : k.val(a)
                    }
                });
                m.datepicker({
                    el: "#filter-condition #j_datetime" + d + " #endTime",
                    callback: function(a) {
                        a = Date.create(a.date).format("{yyyy}-{MM}-{dd}");
                        var k = $("#filter-condition #j_datetime" + d).find("#startTime")
                          , e = $("#filter-condition #j_datetime" + d).find("#endTime");
                        k.val() && a < k.val() ? (m.notify("\u7ed3\u675f\u65e5\u671f\u4e0d\u80fd\u5c0f\u4e8e\u5f00\u59cb\u65e5\u671f"),
                        e.val("")) : e.val(a)
                    }
                });
                break;
            case "type":
                h = "task" == b ? e.find("#task-type-clone").clone() : e.find("#type-clone").clone();
                k.parent().parent().attr("class", "sch-group j_typeSearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                break;
            case "status":
                h = e.find("#status-clone").clone();
                k.parent().parent().attr("class", "sch-group j_statusSearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                break;
            case "operator":
                h = e.find("#operator-clone").clone();
                h.find(".j_optcontainer").attr("id", "j_opt" + d);
                k.parent().parent().attr("class", "sch-group j_optSearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                new c({
                    el: "#filter-condition #j_opt" + d,
                    remote: TEAMS.api.suggestion,
                    entity: "employee",
                    source: "formcomponent"
                });
                break;
            case "ComboSelect":
                s = k.parent().parent();
                m.renderStatSearch({
                    parentEl: s,
                    fieldId: a,
                    componentKey: g,
                    container: "#filter-condition",
                    layoutDetail: f,
                    module: l.module
                });
                if (f)
                    s.off("click", ".j_ok_btn").on("click", ".j_ok_btn", function() {
                        var a = $(this).closest(".j_formField-condition")
                          , k = a.find("li.active:last")
                          , e = k.attr("selectionId")
                          , c = k.attr("title")
                          , k = k.closest(".combo_select_js").attr("id")
                          , b = a.find(".j_selected");
                        if (c && e) {
                            var d = '\x3cspan name\x3d"js_entity_item" class\x3d"js_entity_item employee-item j_component entity-item"\x3e\x3ca class\x3d"usercard-toggle entitybox-toggle" data-id\x3d' + e + " id\x3d" + e + ' title\x3d"' + c + '" selectId\x3d"' + k + '"\x3e' + c + "\x3c/a\x3e\x3c/span\x3e";
                            b.find(".entity-item").each(function(a) {
                                e == $(this).find("a").eq(0).attr("id") && (d = null)
                            });
                            b.append(d)
                        }
                        a.find(".j_comboselect_ul").removeClass("open")
                    });
                break;
            case "description":
                h = e.find("#name-clone").clone();
                k.parent().parent().attr("class", "sch-group j_descriptionSearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                break;
            case "shareMan":
                h = e.find("#operator-clone").clone();
                h.find(".j_optcontainer").attr("id", "j_opt" + d);
                k.parent().parent().attr("class", "sch-group j_shareManSearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                new c({
                    el: "#filter-condition #j_opt" + d,
                    remote: TEAMS.api.suggestion,
                    entity: "employee",
                    source: "formcomponent"
                });
                break;
            case "manager":
                h = e.find("#operator-clone").clone();
                h.find(".j_optcontainer").attr("id", "j_opt" + d);
                k.parent().parent().attr("class", "sch-group j_managerSearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                new c({
                    el: "#filter-condition #j_opt" + d,
                    remote: TEAMS.api.suggestion,
                    entity: "employee",
                    source: "formcomponent"
                });
                break;
            case "participant":
                h = e.find("#operator-clone").clone();
                h.find(".j_optcontainer").attr("id", "j_opt" + d);
                k.parent().parent().attr("class", "sch-group j_participantSearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                new c({
                    el: "#filter-condition #j_opt" + d,
                    remote: TEAMS.api.suggestion,
                    entity: "employee",
                    source: "formcomponent"
                });
                break;
            case "createdate":
                h = e.find("#createdate-clone").clone();
                h.find(".j_datetime").attr("id", "j_datetime" + d);
                k.parent().parent().attr("class", "sch-group j_createDateSearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                m.datepicker({
                    el: "#filter-condition #j_datetime" + d + " #startTime",
                    callback: function(a) {
                        a = Date.create(a.date).format("{yyyy}-{MM}-{dd}");
                        var k = $("#filter-condition #j_datetime" + d).find("#startTime")
                          , e = $("#filter-condition #j_datetime" + d).find("#endTime");
                        e.val() && a > e.val() ? (m.notify("\u5f00\u59cb\u65e5\u671f\u4e0d\u80fd\u5927\u4e8e\u7ed3\u675f\u65e5\u671f"),
                        k.val("")) : k.val(a)
                    }
                });
                m.datepicker({
                    el: "#filter-condition #j_datetime" + d + " #endTime",
                    callback: function(a) {
                        a = Date.create(a.date).format("{yyyy}-{MM}-{dd}");
                        var k = $("#filter-condition #j_datetime" + d).find("#startTime")
                          , e = $("#filter-condition #j_datetime" + d).find("#endTime");
                        k.val() && a < k.val() ? (m.notify("\u7ed3\u675f\u65e5\u671f\u4e0d\u80fd\u5c0f\u4e8e\u5f00\u59cb\u65e5\u671f"),
                        e.val("")) : e.val(a)
                    }
                });
                break;
            case "lastUpdateTime":
                h = e.find("#createdate-clone").clone();
                h.find(".j_datetime").attr("id", "j_datetime" + d);
                k.parent().parent().attr("class", "sch-group j_lastUpdateTimeSearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                m.datepicker({
                    el: "#filter-condition #j_datetime" + d + " #startTime",
                    callback: function(a) {
                        a = Date.create(a.date).format("{yyyy}-{MM}-{dd}");
                        var k = $("#filter-condition #j_datetime" + d).find("#startTime")
                          , e = $("#filter-condition #j_datetime" + d).find("#endTime");
                        e.val() && a > e.val() ? (m.notify("\u5f00\u59cb\u65e5\u671f\u4e0d\u80fd\u5927\u4e8e\u7ed3\u675f\u65e5\u671f"),
                        k.val("")) : k.val(a)
                    }
                });
                m.datepicker({
                    el: "#filter-condition #j_datetime" + d + " #endTime",
                    callback: function(a) {
                        a = Date.create(a.date).format("{yyyy}-{MM}-{dd}");
                        var k = $("#filter-condition #j_datetime" + d).find("#startTime")
                          , e = $("#filter-condition #j_datetime" + d).find("#endTime");
                        k.val() && a < k.val() ? (m.notify("\u7ed3\u675f\u65e5\u671f\u4e0d\u80fd\u5c0f\u4e8e\u5f00\u59cb\u65e5\u671f"),
                        e.val("")) : e.val(a)
                    }
                });
                break;
            case "duedate":
                h = e.find("#createdate-clone").clone();
                h.find(".j_datetime").attr("id", "j_datetime" + d);
                k.parent().parent().attr("class", "sch-group j_duedateSearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                m.datepicker({
                    el: "#filter-condition #j_datetime" + d + " #startTime",
                    callback: function(a) {
                        a = Date.create(a.date).format("{yyyy}-{MM}-{dd}");
                        var k = $("#filter-condition #j_datetime" + d).find("#startTime")
                          , e = $("#filter-condition #j_datetime" + d).find("#endTime");
                        e.val() && a > e.val() ? (m.notify("\u5f00\u59cb\u65e5\u671f\u4e0d\u80fd\u5927\u4e8e\u7ed3\u675f\u65e5\u671f"),
                        k.val("")) : k.val(a)
                    }
                });
                m.datepicker({
                    el: "#filter-condition #j_datetime" + d + " #endTime",
                    callback: function(a) {
                        a = Date.create(a.date).format("{yyyy}-{MM}-{dd}");
                        var k = $("#filter-condition #j_datetime" + d).find("#startTime")
                          , e = $("#filter-condition #j_datetime" + d).find("#endTime");
                        k.val() && a < k.val() ? (m.notify("\u7ed3\u675f\u65e5\u671f\u4e0d\u80fd\u5c0f\u4e8e\u5f00\u59cb\u65e5\u671f"),
                        e.val("")) : e.val(a)
                    }
                });
                break;
            case "priority":
                h = e.find("#priority-clone").clone();
                k.parent().parent().attr("class", "sch-group j_prioritySearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                break;
            case "startTime":
                h = e.find("#createdate-clone").clone();
                h.find(".j_datetime").attr("id", "j_datetime" + d);
                k.parent().parent().attr("class", "sch-group j_startTimeSearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                m.datepicker({
                    el: "#filter-condition #j_datetime" + d + " #startTime",
                    callback: function(a) {
                        a = Date.create(a.date).format("{yyyy}-{MM}-{dd}");
                        var k = $("#filter-condition #j_datetime" + d).find("#startTime")
                          , e = $("#filter-condition #j_datetime" + d).find("#endTime");
                        e.val() && a > e.val() ? (m.notify("\u5f00\u59cb\u65e5\u671f\u4e0d\u80fd\u5927\u4e8e\u7ed3\u675f\u65e5\u671f"),
                        k.val("")) : k.val(a)
                    }
                });
                m.datepicker({
                    el: "#filter-condition #j_datetime" + d + " #endTime",
                    callback: function(a) {
                        a = Date.create(a.date).format("{yyyy}-{MM}-{dd}");
                        var k = $("#filter-condition #j_datetime" + d).find("#startTime")
                          , e = $("#filter-condition #j_datetime" + d).find("#endTime");
                        k.val() && a < k.val() ? (m.notify("\u7ed3\u675f\u65e5\u671f\u4e0d\u80fd\u5c0f\u4e8e\u5f00\u59cb\u65e5\u671f"),
                        e.val("")) : e.val(a)
                    }
                });
                break;
            case "creator":
                h = e.find("#operator-clone").clone();
                h.find(".j_optcontainer").attr("id", "j_opt" + d);
                k.parent().parent().attr("class", "sch-group j_creatorSearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                new c({
                    el: "#filter-condition #j_opt" + d,
                    remote: TEAMS.api.suggestion,
                    entity: "employee",
                    source: "formcomponent"
                });
                break;
            case "commentTime":
                h = e.find("#createdate-clone").clone();
                h.find(".j_datetime").attr("id", "j_datetime" + d);
                k.parent().parent().attr("class", "sch-group j_commentTimeSearchGroup");
                k.parent().parent().find(".j_formField-condition").html(h.html());
                m.datepicker({
                    el: "#filter-condition #j_datetime" + d + " #startTime",
                    callback: function(a) {
                        a = Date.create(a.date).format("{yyyy}-{MM}-{dd}");
                        var k = $("#filter-condition #j_datetime" + d).find("#startTime")
                          , e = $("#filter-condition #j_datetime" + d).find("#endTime");
                        e.val() && a > e.val() ? (m.notify("\u5f00\u59cb\u65e5\u671f\u4e0d\u80fd\u5927\u4e8e\u7ed3\u675f\u65e5\u671f"),
                        k.val("")) : k.val(a)
                    }
                });
                m.datepicker({
                    el: "#filter-condition #j_datetime" + d + " #endTime",
                    callback: function(a) {
                        a = Date.create(a.date).format("{yyyy}-{MM}-{dd}");
                        var k = $("#filter-condition #j_datetime" + d).find("#startTime")
                          , e = $("#filter-condition #j_datetime" + d).find("#endTime");
                        k.val() && a < k.val() ? (m.notify("\u7ed3\u675f\u65e5\u671f\u4e0d\u80fd\u5c0f\u4e8e\u5f00\u59cb\u65e5\u671f"),
                        e.val("")) : e.val(a)
                    }
                });
                break;
            default:
                var s = l.getComponentModule(g);
                "employee" == s || "department" == s || "mainline" == s ? (h = e.find("#field-clone").clone(),
                h.find(".j_optcontainer").attr("id", "j_opt" + d),
                k.parent().parent().attr("class", "sch-group j_formFieldSearchGroup"),
                k.parent().parent().find(".j_formField-condition").html(h.html()),
                new c({
                    el: "#filter-condition #j_opt" + d,
                    remote: TEAMS.api.suggestion,
                    entity: s,
                    source: "formcomponent"
                })) : "workflow" == s ? (h = e.find("#field-clone").clone(),
                h.find(".j_optcontainer").attr("id", "j_opt" + d),
                k.parent().parent().attr("class", "sch-group j_formFieldSearchGroup"),
                k.parent().parent().find(".j_formField-condition").html(h.html()),
                new c({
                    el: "#filter-condition #j_opt" + d,
                    remote: TEAMS.service.flow + "/workflowlist/suggestion.json",
                    entity: s,
                    source: "formcomponent"
                })) : "document" == s ? (h = e.find("#field-clone").clone(),
                h.find(".j_optcontainer").attr("id", "j_opt" + d),
                k.parent().parent().attr("class", "sch-group j_formFieldSearchGroup"),
                k.parent().parent().find(".j_formField-condition").html(h.html()),
                new c({
                    el: "#filter-condition #j_opt" + d,
                    remote: "/documents/suggestion.json",
                    entity: s,
                    source: "formcomponent"
                })) : "task" == s ? (h = e.find("#field-clone").clone(),
                h.find(".j_optcontainer").attr("id", "j_opt" + d),
                k.parent().parent().attr("class", "sch-group j_formFieldSearchGroup"),
                k.parent().parent().find(".j_formField-condition").html(h.html()),
                new c({
                    el: "#filter-condition #j_opt" + d,
                    remote: "/tasks/suggestion.json",
                    entity: s,
                    source: "formcomponent"
                })) : "datasource" == s ? (h = e.find("#field-clone").clone(),
                h.find(".j_optcontainer").attr("id", "j_opt" + d),
                k.parent().parent().attr("class", "sch-group j_formFieldSearchGroup"),
                k.parent().parent().find(".j_formField-condition").html(h.html()),
                a = JSON.parse(f).sourceModule,
                g = JSON.parse(f).dataTemplateId,
                new c({
                    el: "#filter-condition #j_opt" + d,
                    remote: "freeform/queryDataSourceOption.json",
                    entity: s,
                    source: "formcomponent",
                    sourceModule: a,
                    dataTemplateId: g
                })) : "production" == s ? (h = e.find("#field-clone").clone(),
                h.find(".j_optcontainer").attr("id", "j_opt" + d),
                k.parent().parent().attr("class", "sch-group j_formFieldSearchGroup"),
                k.parent().parent().find(".j_formField-condition").html(h.html()),
                new c({
                    el: "#filter-condition #j_opt" + d,
                    remote: "/production/getAllProductions",
                    entity: "production",
                    source: "formcomponent"
                })) : "contract" == s ? (h = e.find("#field-clone").clone(),
                h.find(".j_optcontainer").attr("id", "j_opt" + d),
                k.parent().parent().attr("class", "sch-group j_formFieldSearchGroup"),
                k.parent().parent().find(".j_formField-condition").html(h.html()),
                new c({
                    el: "#filter-condition #j_opt" + d,
                    remote: "/contract/datatable",
                    entity: "contract",
                    source: "formcomponent"
                })) : "chance" == s ? (h = e.find("#field-clone").clone(),
                h.find(".j_optcontainer").attr("id", "j_opt" + d),
                k.parent().parent().attr("class", "sch-group j_formFieldSearchGroup"),
                k.parent().parent().find(".j_formField-condition").html(h.html()),
                new c({
                    el: "#filter-condition #j_opt" + d,
                    remote: TEAMS.api.suggestion,
                    entity: "chance",
                    source: "formcomponent"
                })) : "contact" == s ? (h = e.find("#field-clone").clone(),
                h.find(".j_optcontainer").attr("id", "j_opt" + d),
                k.parent().parent().attr("class", "sch-group j_formFieldSearchGroup"),
                k.parent().parent().find(".j_formField-condition").html(h.html()),
                new c({
                    el: "#filter-condition #j_opt" + d,
                    remote: "/contact/search",
                    entity: "contact",
                    source: "formcomponent"
                })) : "customer" == s ? (h = e.find("#field-clone").clone(),
                h.find(".j_optcontainer").attr("id", "j_opt" + d),
                k.parent().parent().attr("class", "sch-group j_formFieldSearchGroup"),
                k.parent().parent().find(".j_formField-condition").html(h.html()),
                new c({
                    el: "#filter-condition #j_opt" + d,
                    remote: "/customer/suggestion.json",
                    entity: "customer",
                    source: "formcomponent"
                })) : "form" == s ? (h = e.find("#field-clone").clone(),
                h.find(".j_optcontainer").attr("id", "j_opt" + d),
                k.parent().parent().attr("class", "sch-group j_formFieldSearchGroup"),
                k.parent().parent().find(".j_formField-condition").html(h.html()),
                new c({
                    el: "#filter-condition #j_opt" + d,
                    remote: "/form/suggestion.json",
                    entity: "forms",
                    source: "formcomponent"
                })) : (s = k.parent().parent(),
                m.renderStatSearch({
                    parentEl: s,
                    fieldId: a,
                    componentKey: g,
                    container: "#filter-condition",
                    layoutDetail: f,
                    module: l.module,
                    componentModule: $("#filter-condition").attr("module")
                }),
                a = $('\x3ca class\x3d"dele j_delCondition ds-i fn" title\x3d"\u5220\u9664\u6b64\u641c\u7d22\u9879"\x3e\x3ci class\x3d"icon-remove"\x3e\x3c/i\x3e\x3c/a\x3e'),
                s.find(".j_deletesearch").after(a),
                s.find(".j_deletesearch").remove())
            }
        });
        $(document).on("change", ".j_condition", function() {
            var a = $(this)
              , k = a.val()
              , e = a.closest(".j_formField-condition");
            "null" == k || "notnull" == k ? (a.next().addClass("hide"),
            e.find(".j_selected,.j_control").addClass("hide-im")) : (a.next().removeClass("hide"),
            e.find(".j_selected,.j_control").removeClass("hide-im"))
        });
        $(document).off("change", "#filter-condition .j_formField-condition .j_resultList").on("change", "#filter-condition .j_formField-condition .j_resultList", function() {
            var a = $(this)
              , k = $(this).find("option:selected").attr("id")
              , e = a.val()
              , c = a.next().find(".j_selected");
            if (e && k) {
                var b = '\x3cspan class\x3d"entity-item"\x3e\x3ca id\x3d' + k + ' title\x3d"' + e + '"\x3e' + e + "\x3c/a\x3e\x3c/span\x3e";
                c.find(".entity-item").each(function(a) {
                    k == $(this).find("a").attr("id") && (b = null)
                });
                c.append(b)
            }
            a.find("option").eq(0).prop("selected", !0)
        });
        $(document).off("change", "#filter-condition .j_formField-condition .j_multipleSelect").on("change", "#filter-condition .j_formField-condition .j_multipleSelect", function() {
            var a = $(this)
              , k = $(this).find("option:selected").attr("id")
              , e = a.val()
              , c = a.next().find(".j_selected");
            if (e) {
                var b = '\x3cspan class\x3d"entity-item"\x3e\x3ca status\x3d' + k + ' title\x3d"' + e + '"\x3e' + e + "\x3c/a\x3e\x3c/span\x3e";
                c.find(".entity-item").each(function(a) {
                    k == $(this).find("a").attr("status") && (b = null)
                });
                c.append(b)
            }
            a.find("option").eq(0).prop("selected", !0)
        });
        $(document).off("change", "#filter-condition #search-group-list .j_formField-condition .j_search_default_date").on("click", "#filter-condition #search-group-list .j_formField-condition .j_search_default_date", function(a) {
            $(this);
            $(this).find("option:selected").attr("key") ? $(this).parent().next().addClass("hide") : $(this).parent().next().removeClass("hide")
        });
        $(document).off("click", "#filter-condition .j_addCondition").on("click", ".j_addCondition", function() {
            var a = $("#editor-component")
              , k = a.find("#form_select_input").attr("module")
              , a = a.find("#form_select_input").attr("formId")
              , e = $("#filter-condition")
              , c = e.find("#filter-condition-clone").clone();
            "task" == k ? (c = e.find("#filter-condition-task-clone").clone(),
            $cloneCom = e.find("#filter-condition-commonality-clone select option").clone(),
            c.find("#task-clone-select").append($cloneCom),
            c.attr("id", "").removeClass("hide"),
            e.find("#search-group-list").append(c),
            k = c.find(".j_formField-select select"),
            formFields = l.queryFormFields(a),
            l.renderFields(k, formFields)) : ("mainline" == k ? (c = e.find("#filter-condition-mainline-clone").clone(),
            $cloneCom = e.find("#filter-condition-commonality-clone select option").clone(),
            c.find("#mainline-clone-select").append($cloneCom),
            c.attr("id", "").removeClass("hide")) : "document" == k ? (c = e.find("#filter-condition-document-clone").clone(),
            k = c.find(".j_formField-select select"),
            c.attr("id", "").removeClass("hide"),
            formFields = l.queryDocFields(),
            l.renderFieldsByDoc(k, formFields)) : ("workflow" == k ? (c = e.find("#filter-condition-workflow-clone").clone(),
            c.attr("id", "").removeClass("hide"),
            k = c.find(".j_formField-select select"),
            formFields = l.queryFormFields(a, "workflow")) : (c.attr("id", "").removeClass("hide"),
            k = c.find(".j_formField-select select"),
            (formFields = $("#widget-control .field-active").data("formFields")) || (formFields = l.queryFormFields(a))),
            l.renderFields(k, formFields)),
            e.find("#search-group-list").append(c))
        });
        $(document).off("click", "#filter-condition .j_delCondition,.j_deletesearch").on("click", ".j_delCondition,.j_deletesearch", function() {
            $(this).parents(".sch-group").remove()
        });
        $(document).off("click", "#filter-condition .j_close").on("click", "#filter-condition .j_close", function(a) {
            $("#filter-condition").modal("hide")
        });
        $(document).off("click", "#filter-condition .j_confirm").on("click", "#filter-condition .j_confirm", function(a) {
            var k = $("#editor-component").find("#form_select_input").attr("formId");
            a = l.assembleParam();
            var e = JSON.stringify(a);
            a = $("#widget-control .field-active").data("componentData");
            a.setFilterParams(e);
            k = l.assembleFormDataQueryParam(k);
            k = JSON.stringify(k);
            a.setFilterQueryParams(k);
            $("#filter-condition").modal("hide")
        });
        $(document).off("click", ".j_column_conf").on("click", ".j_column_conf", function(a) {
            var k = $(this).attr("type")
              , c = $("#fieldBatcEdit");
            c.find(".j_saveBatc").attr("type", k);
            c.find(".j_fieldBatcEditEr").hide();
            a = $("#editor-component");
            var b = $("#widget-control .field-active").data("componentData");
            c.find(".j_field_ul").empty();
            if ("formColumn" == k) {
                c.find(".j_select_all").prop("checked", !1);
                a = a.find("#form_select_input").attr("formId");
                var d = b.componentSetup.columnFields;
                "undefined" == typeof d && (d = []);
                b = {};
                b.formId = a;
                b.module = l.module;
                a = [];
                a.push("0");
                a.push("1");
                b.statusList = a;
                $.ajax({
                    contentType: "application/json",
                    type: TEAMS.ajaxMethod,
                    data: JSON.stringify(b),
                    dataType: "json",
                    url: "/" + e + "/queryFormFieldByFormId.json",
                    success: function(a) {
                        var k = a.formField
                          , e = a.formId
                          , b = [];
                        a = 0;
                        for (var f = k.length; a < f; a++) {
                            for (var r = k[a], g = r.id, h = r.title, p = r["delete"], r = r.componentKey, w = !0, v = 0, s = d.length; v < s; v++) {
                                var m = d[v]
                                  , n = m.substring(0, m.indexOf("_"))
                                  , u = m.substring(m.indexOf("_") + 1, m.indexOf("-"))
                                  , y = m.substring(m.indexOf("-") + 1, m.indexOf("*"));
                                m.substring(m.indexOf("*") + 1, m.indexOf("\x26"));
                                var L = m.substring(m.indexOf("\x26") + 1, m.indexOf("#"))
                                  , m = m.substring(m.indexOf("#") + 1);
                                if (g == n) {
                                    d[v] = n + "_" + u + "-" + y + "*" + p + "\x26" + L + "#" + m;
                                    w = !1;
                                    break
                                }
                            }
                            w && b.push(g + "_" + h + "-false*" + p + "\x26" + r + "#" + e)
                        }
                        null != d && 0 < d.length ? (m = d[0].substring(d[0].indexOf("#") + 1),
                        null != b && 0 < b.length && (a = b[0].substring(b[0].indexOf("#") + 1),
                        d = m == a ? b.concat(d) : b)) : d = b;
                        if (null == d || 0 == d.length)
                            $("#fieldBatcEdit").find(".j_title").html('\u5f53\u524d\u8868\u5355\u6682\u65e0\u5b57\u6bb5\u5185\u5bb9\uff01\x3cspan class\x3d"j_fieldBatcEditEr mt-5 c-danger icon-warning-sign hide"\x3e\x3c/span\x3e');
                        else {
                            b = [];
                            for (e = 0; e < k.length; e++)
                                for (r = k[e],
                                g = r.id,
                                a = 0; a < d.length; a++)
                                    m = d[a],
                                    m.substring(0, m.indexOf("_")) == g && b.push(d[a]);
                            a = 0;
                            for (f = b.length; a < f; a++) {
                                m = b[a];
                                g = m.substring(0, m.indexOf("_"));
                                k = m.substring(m.indexOf("_") + 1, m.indexOf("-"));
                                h = m.substring(m.indexOf("-") + 1, m.indexOf("*"));
                                p = m.substring(m.indexOf("*") + 1, m.indexOf("\x26"));
                                r = m.substring(m.indexOf("\x26") + 1, m.indexOf("#"));
                                e = m.substring(m.indexOf("#") + 1);
                                m = c.find(".j_clone .j_field_li").clone();
                                m.attr("id", g);
                                m.find(".j_num").text(a + 1);
                                w = !1;
                                if ("true" == h || 1 == h)
                                    w = !0;
                                m.find("input").attr("value", g).attr("title", k).prop("checked", w).attr("fieldDel", p).attr("comKey", r).attr("formId", e);
                                m.find(".j_field").text(k);
                                if (1 == p || "true" == p)
                                    m.find(".j_field").addClass("td-lt c-999"),
                                    m.find(".j_bewrite").html("\u8be5\u5b57\u6bb5\u4e3a\u5220\u9664\u5b57\u6bb5,\u4e0d\u5728\u5f53\u524d\u8868\u5355\u7248\u672c\u4e2d\uff01");
                                c.find(".j_field_ul").append(m)
                            }
                            l.drag();
                            $("#fieldBatcEdit").find(".j_title").html('\u4e0b\u65b9\u5b57\u6bb5\u4e3a\u8868\u5355\u4fe1\u606f\u4e2d\u7684\u5b57\u6bb5\uff0c\u62d6\u62fd\u5b57\u6bb5\u53ef\u4ee5\u8fdb\u884c\u6392\u5e8f\uff0c\u52fe\u9009\u7684\u5b57\u6bb5\uff0c\u5728\u9884\u89c8\u65f6\u70b9\u51fb\u653e\u5927\u955c\u5f39\u51fa\u6846\u4e2d\u663e\u793a\x3cspan class\x3d"j_fieldBatcEditEr mt-5 c-danger icon-warning-sign hide"\x3e\x3c/span\x3e')
                        }
                        $("#fieldBatcEdit").modal()
                    }
                })
            } else if ("customerColumn" == k) {
                c.find(".j_select_all").prop("checked", !1);
                k = b.componentSetup.newSortColumn;
                if (null != k && 0 < k.length)
                    for (a = 0,
                    b = k.length; a < b; a++) {
                        var f = k[a]
                          , g = f.substring(0, f.indexOf("_"))
                          , h = f.substring(f.indexOf("_") + 1, f.indexOf("-"))
                          , f = f.substring(f.indexOf("-") + 1)
                          , s = !1;
                        if (1 == f || "true" == f)
                            s = !0;
                        f = c.find(".j_clone .j_field_li").clone();
                        f.attr("id", g);
                        f.find(".j_num").text(a + 1);
                        f.find("input").attr("value", g).attr("title", h).prop("checked", s);
                        f.find(".j_field").text(h);
                        c.find(".j_field_ul").append(f)
                    }
                else
                    for (k = a.find(".j_clone .j_customer-field-select option"),
                    a = 0,
                    b = k.length; a < b; a++)
                        g = k[a],
                        f = c.find(".j_clone .j_field_li").clone(),
                        h = $(g).attr("id"),
                        f.attr("id", h),
                        f.find(".j_num").text(a + 1),
                        f.find("input").attr("value", h).attr("title", $(g).text()).prop("checked", !1),
                        f.find(".j_field").text($(g).text()),
                        c.find(".j_field_ul").append(f);
                b = c.find(".j_field_ul").find('input[name\x3d"field_select"]');
                k = b.length;
                for (a = g = 0; a < k; a++)
                    f = $(b[a]),
                    f = f.prop("checked"),
                    1 != f && "true" != f || g++;
                g == k && c.find(".j_select_all").prop("checked", !0);
                l.drag();
                $("#fieldBatcEdit").find(".j_title").html('\u4e0b\u65b9\u5b57\u6bb5\u4e3a\u5ba2\u6237\u4fe1\u606f\u4e2d\u7684\u5b57\u6bb5\uff0c\u62d6\u62fd\u5b57\u6bb5\u53ef\u4ee5\u8fdb\u884c\u6392\u5e8f\uff0c\u4ee5\u52fe\u9009\u7684\u5b57\u6bb5\u4f5c\u4e3a\u5ba2\u6237\u663e\u793a\u7684\u5b57\u6bb5\x3cspan class\x3d"j_fieldBatcEditEr mt-5 c-danger icon-warning-sign hide"\x3e\x3c/span\x3e');
                $("#fieldBatcEdit").modal()
            } else if ("contactColumn" == k) {
                c.find(".j_select_all").prop("checked", !1);
                k = b.componentSetup.newSortColumn;
                if (null != k && 0 < k.length)
                    for (a = 0,
                    b = k.length; a < b; a++) {
                        f = k[a];
                        g = f.substring(0, f.indexOf("_"));
                        h = f.substring(f.indexOf("_") + 1, f.indexOf("-"));
                        f = f.substring(f.indexOf("-") + 1);
                        s = !1;
                        if (1 == f || "true" == f)
                            s = !0;
                        f = c.find(".j_clone .j_field_li").clone();
                        f.attr("id", g);
                        f.find(".j_num").text(a + 1);
                        f.find("input").attr("value", g).attr("title", h).prop("checked", s);
                        f.find(".j_field").text(h);
                        c.find(".j_field_ul").append(f)
                    }
                else
                    for (k = a.find(".j_clone .j_contact-field-select option"),
                    a = 0,
                    b = k.length; a < b; a++)
                        g = k[a],
                        f = c.find(".j_clone .j_field_li").clone(),
                        h = $(g).attr("id"),
                        f.attr("id", h),
                        f.find(".j_num").text(a + 1),
                        f.find("input").attr("value", h).attr("title", $(g).text()).prop("checked", !1),
                        f.find(".j_field").text($(g).text()),
                        c.find(".j_field_ul").append(f);
                b = c.find(".j_field_ul").find('input[name\x3d"field_select"]');
                k = b.length;
                for (a = g = 0; a < k; a++)
                    f = $(b[a]),
                    f = f.prop("checked"),
                    1 != f && "true" != f || g++;
                g == k && c.find(".j_select_all").prop("checked", !0);
                l.drag();
                $("#fieldBatcEdit").find(".j_title").html('\u4e0b\u65b9\u5b57\u6bb5\u4e3a\u8054\u7cfb\u4eba\u7684\u5b57\u6bb5\uff0c\u62d6\u62fd\u5b57\u6bb5\u53ef\u4ee5\u8fdb\u884c\u6392\u5e8f\uff0c\u4ee5\u52fe\u9009\u7684\u5b57\u6bb5\u4f5c\u4e3a\u8054\u7cfb\u4eba\u663e\u793a\u7684\u5b57\u6bb5\x3cspan class\x3d"j_fieldBatcEditEr mt-5 c-danger icon-warning-sign hide"\x3e\x3c/span\x3e');
                $("#fieldBatcEdit").modal()
            } else if ("chanceColumn" == k) {
                c.find(".j_select_all").prop("checked", !1);
                k = b.componentSetup.newSortColumn;
                if (null != k && 0 < k.length)
                    for (a = 0,
                    b = k.length; a < b; a++) {
                        f = k[a];
                        g = f.substring(0, f.indexOf("_"));
                        h = f.substring(f.indexOf("_") + 1, f.indexOf("-"));
                        f = f.substring(f.indexOf("-") + 1);
                        s = !1;
                        if (1 == f || "true" == f)
                            s = !0;
                        f = c.find(".j_clone .j_field_li").clone();
                        f.attr("id", g);
                        f.find(".j_num").text(a + 1);
                        f.find("input").attr("value", g).attr("title", h).prop("checked", s);
                        f.find(".j_field").text(h);
                        c.find(".j_field_ul").append(f)
                    }
                else
                    for (k = a.find(".j_clone .j_chance-field-select option"),
                    a = 0,
                    b = k.length; a < b; a++)
                        g = k[a],
                        f = c.find(".j_clone .j_field_li").clone(),
                        h = $(g).attr("id"),
                        f.attr("id", h),
                        f.find(".j_num").text(a + 1),
                        f.find("input").attr("value", h).attr("title", $(g).text()).prop("checked", !1),
                        f.find(".j_field").text($(g).text()),
                        c.find(".j_field_ul").append(f);
                b = c.find(".j_field_ul").find('input[name\x3d"field_select"]');
                k = b.length;
                for (a = g = 0; a < k; a++)
                    f = $(b[a]),
                    f = f.prop("checked"),
                    1 != f && "true" != f || g++;
                g == k && c.find(".j_select_all").prop("checked", !0);
                l.drag();
                $("#fieldBatcEdit").find(".j_title").html('\u4e0b\u65b9\u5b57\u6bb5\u4e3a\u5546\u673a\u7684\u5b57\u6bb5\uff0c\u62d6\u62fd\u5b57\u6bb5\u53ef\u4ee5\u8fdb\u884c\u6392\u5e8f\uff0c\u4ee5\u52fe\u9009\u7684\u5b57\u6bb5\u4f5c\u4e3a\u5546\u673a\u663e\u793a\u7684\u5b57\u6bb5\x3cspan class\x3d"j_fieldBatcEditEr mt-5 c-danger icon-warning-sign hide"\x3e\x3c/span\x3e');
                $("#fieldBatcEdit").modal()
            } else if ("productionColumn" == k) {
                c.find(".j_select_all").prop("checked", !1);
                k = b.componentSetup.newSortColumn;
                if (null != k && 0 < k.length)
                    for (a = 0,
                    b = k.length; a < b; a++) {
                        f = k[a];
                        g = f.substring(0, f.indexOf("_"));
                        h = f.substring(f.indexOf("_") + 1, f.indexOf("-"));
                        f = f.substring(f.indexOf("-") + 1);
                        s = !1;
                        if (1 == f || "true" == f)
                            s = !0;
                        f = c.find(".j_clone .j_field_li").clone();
                        f.attr("id", g);
                        f.find(".j_num").text(a + 1);
                        f.find("input").attr("value", g).attr("title", h).prop("checked", s);
                        f.find(".j_field").text(h);
                        c.find(".j_field_ul").append(f)
                    }
                else
                    for (k = a.find(".j_clone .j_production-field-select option"),
                    a = 0,
                    b = k.length; a < b; a++)
                        g = k[a],
                        f = c.find(".j_clone .j_field_li").clone(),
                        h = $(g).attr("id"),
                        f.attr("id", h),
                        f.find(".j_num").text(a + 1),
                        f.find("input").attr("value", h).attr("title", $(g).text()).prop("checked", !1),
                        f.find(".j_field").text($(g).text()),
                        c.find(".j_field_ul").append(f);
                b = c.find(".j_field_ul").find('input[name\x3d"field_select"]');
                k = b.length;
                for (a = g = 0; a < k; a++)
                    f = $(b[a]),
                    f = f.prop("checked"),
                    1 != f && "true" != f || g++;
                g == k && c.find(".j_select_all").prop("checked", !0);
                l.drag();
                $("#fieldBatcEdit").find(".j_title").html('\u4e0b\u65b9\u5b57\u6bb5\u4e3a\u4ea7\u54c1\u7684\u5b57\u6bb5\uff0c\u62d6\u62fd\u5b57\u6bb5\u53ef\u4ee5\u8fdb\u884c\u6392\u5e8f\uff0c\u4ee5\u52fe\u9009\u7684\u5b57\u6bb5\u4f5c\u4e3a\u4ea7\u54c1\u663e\u793a\u7684\u5b57\u6bb5\x3cspan class\x3d"j_fieldBatcEditEr mt-5 c-danger icon-warning-sign hide"\x3e\x3c/span\x3e');
                $("#fieldBatcEdit").modal()
            } else if ("contractColumn" == k) {
                c.find(".j_select_all").prop("checked", !1);
                k = b.componentSetup.newSortColumn;
                if (null != k && 0 < k.length)
                    for (a = 0,
                    b = k.length; a < b; a++) {
                        f = k[a];
                        g = f.substring(0, f.indexOf("_"));
                        h = f.substring(f.indexOf("_") + 1, f.indexOf("-"));
                        f = f.substring(f.indexOf("-") + 1);
                        s = !1;
                        if (1 == f || "true" == f)
                            s = !0;
                        f = c.find(".j_clone .j_field_li").clone();
                        f.attr("id", g);
                        f.find(".j_num").text(a + 1);
                        f.find("input").attr("value", g).attr("title", h).prop("checked", s);
                        f.find(".j_field").text(h);
                        c.find(".j_field_ul").append(f)
                    }
                else
                    for (k = a.find(".j_clone .j_contract-field-select option"),
                    a = 0,
                    b = k.length; a < b; a++)
                        g = k[a],
                        f = c.find(".j_clone .j_field_li").clone(),
                        h = $(g).attr("id"),
                        f.attr("id", h),
                        f.find(".j_num").text(a + 1),
                        f.find("input").attr("value", h).attr("title", $(g).text()).prop("checked", !1),
                        f.find(".j_field").text($(g).text()),
                        c.find(".j_field_ul").append(f);
                b = c.find(".j_field_ul").find('input[name\x3d"field_select"]');
                k = b.length;
                for (a = g = 0; a < k; a++)
                    f = $(b[a]),
                    f = f.prop("checked"),
                    1 != f && "true" != f || g++;
                g == k && c.find(".j_select_all").prop("checked", !0);
                l.drag();
                $("#fieldBatcEdit").find(".j_title").html('\u4e0b\u65b9\u5b57\u6bb5\u4e3a\u4ea7\u54c1\u7684\u5b57\u6bb5\uff0c\u62d6\u62fd\u5b57\u6bb5\u53ef\u4ee5\u8fdb\u884c\u6392\u5e8f\uff0c\u4ee5\u52fe\u9009\u7684\u5b57\u6bb5\u4f5c\u4e3a\u4ea7\u54c1\u663e\u793a\u7684\u5b57\u6bb5\x3cspan class\x3d"j_fieldBatcEditEr mt-5 c-danger icon-warning-sign hide"\x3e\x3c/span\x3e');
                $("#fieldBatcEdit").modal()
            } else if ("agendaColumn" == k) {
                c.find(".j_select_all").prop("checked", !1);
                k = b.componentSetup.newSortColumn;
                if (null != k && 0 < k.length)
                    for (a = 0,
                    b = k.length; a < b; a++) {
                        f = k[a];
                        g = f.substring(0, f.indexOf("_"));
                        h = f.substring(f.indexOf("_") + 1, f.indexOf("-"));
                        f = f.substring(f.indexOf("-") + 1);
                        s = !1;
                        if (1 == f || "true" == f)
                            s = !0;
                        f = c.find(".j_clone .j_field_li").clone();
                        f.attr("id", g);
                        f.find(".j_num").text(a + 1);
                        f.find("input").attr("value", g).attr("title", h).prop("checked", s);
                        f.find(".j_field").text(h);
                        c.find(".j_field_ul").append(f)
                    }
                else
                    for (k = a.find(".j_clone .j_agenda-field-select option"),
                    a = 0,
                    b = k.length; a < b; a++)
                        g = k[a],
                        f = c.find(".j_clone .j_field_li").clone(),
                        h = $(g).attr("id"),
                        f.attr("id", h),
                        f.find(".j_num").text(a + 1),
                        f.find("input").attr("value", h).attr("title", $(g).text()).prop("checked", !1),
                        f.find(".j_field").text($(g).text()),
                        c.find(".j_field_ul").append(f);
                b = c.find(".j_field_ul").find('input[name\x3d"field_select"]');
                k = b.length;
                for (a = g = 0; a < k; a++)
                    f = $(b[a]),
                    f = f.prop("checked"),
                    1 != f && "true" != f || g++;
                g == k && c.find(".j_select_all").prop("checked", !0);
                l.drag();
                $("#fieldBatcEdit").find(".j_title").html('\u4e0b\u65b9\u5b57\u6bb5\u4e3a\u65e5\u7a0b\u7684\u5b57\u6bb5\uff0c\u62d6\u62fd\u5b57\u6bb5\u53ef\u4ee5\u8fdb\u884c\u6392\u5e8f\uff0c\u4ee5\u52fe\u9009\u7684\u5b57\u6bb5\u4f5c\u4e3a\u4ea7\u54c1\u663e\u793a\u7684\u5b57\u6bb5\x3cspan class\x3d"j_fieldBatcEditEr mt-5 c-danger icon-warning-sign hide"\x3e\x3c/span\x3e');
                $("#fieldBatcEdit").modal()
            }
        });
        $(document).off("click", ".j_batch_edit").on("click", ".j_batch_edit", function(a) {
            var k = $(this).attr("type");
            a = $("#fieldBatcEdit");
            a.find(".j_select_all").prop("checked", !1);
            a.find(".j_saveBatc").attr("type", k);
            a.find(".j_fieldBatcEditEr").hide();
            k = $("#editor-component .j_" + k + "-field-ul .j_" + k + "-field-li");
            a.find(".j_field_ul").empty();
            if (0 < k.length) {
                for (var k = $(k[0]).find(".j_option"), e = 0, c = k.length; e < c; e++) {
                    var b = k[e]
                      , d = a.find(".j_clone .j_field_li").clone()
                      , f = $(b).attr("id");
                    $(b).hasClass("j_custom_option") && d.find("input").attr("isCustom", "custom");
                    d.attr("id", f);
                    d.find(".j_num").text(e + 1);
                    d.find("input").attr("value", f).attr("title", $(b).text());
                    d.find(".j_field").text($(b).text());
                    a.find(".j_field_ul").append(d)
                }
                l.drag();
                $("#fieldBatcEdit").find(".j_title").html('\u4e0b\u65b9\u5b57\u6bb5\u4e3a\u63a7\u4ef6\u4fe1\u606f\u4e2d\u7684\u5b57\u6bb5\uff0c\u62d6\u62fd\u5b57\u6bb5\u53ef\u4ee5\u8fdb\u884c\u6392\u5e8f\uff0c\u4ee5\u52fe\u9009\u7684\u5b57\u6bb5\u4f5c\u4e3a\u63a7\u4ef6\u663e\u793a\u7684\u5b57\u6bb5\x3cspan class\x3d"j_fieldBatcEditEr mt-5 c-danger icon-warning-sign hide"\x3e\x3c/span\x3e');
                $("#fieldBatcEdit").modal()
            }
        });
        $(document).on("change", "#fieldBatcEdit .j_select_all", function(a) {
            $("#fieldBatcEdit").find(".j_select_all").prop("checked") ? $("#fieldBatcEdit").find(".j_field_ul input[name\x3d'field_select']").prop("checked", !0) : $("#fieldBatcEdit").find(".j_field_ul input[name\x3d'field_select']").prop("checked", !1)
        });
        $(document).on("click", "#fieldBatcEdit .j_saveBatc", function(a) {
            a = $(this).attr("type");
            var k = $("#fieldBatcEdit")
              , e = $("#editor-component")
              , c = k.find(".j_field_ul input[name\x3d'field_select']")
              , b = k.find(".j_field_ul input[name\x3d'field_select']:checked");
            if ("form" == a)
                if (0 < b.length) {
                    e.find(".j_showField .j_form-field-ul").empty();
                    a = 0;
                    for (var d = b.length; a < d; a++) {
                        for (var f = $(b[a]), l = e.find(".j_clone .j_form-field-li").clone(), g = 0, h = c.length; g < h; g++) {
                            var k = $(c[g])
                              , m = e.find(".j_clone .j_option").clone();
                            m.attr("value", k.attr("value")).attr("id", k.attr("value")).attr("title", k.attr("title"));
                            m.text(k.attr("title"));
                            l.find(".j_form-field-select").append(m)
                        }
                        l.find("#" + f.attr("value")).attr("selected", "selected");
                        e.find(".j_showField .j_form-field-ul").append(l)
                    }
                    c = $("#editor-component").find(".j_showField .j_form-field-li");
                    if (0 < c.length) {
                        d = [];
                        for (a = 0; a < c.length; a++)
                            k = c[a],
                            g = $(k).find("select").val(),
                            k = $(k).find("select").find("option[value\x3d'" + g + "']").text(),
                            d.push(g + "_" + k);
                        g = $("#widget-control .field-active").data("componentData");
                        g.setFieldIds(d)
                    }
                    $("#fieldBatcEdit").modal("hide")
                } else
                    k.find(".j_fieldBatcEditEr").text("\u8bf7\u9009\u62e9\u8981\u663e\u793a\u7684\u5b57\u6bb5").show();
            else if ("customer" == a) {
                g = $("#widget-control .field-active").data("componentData");
                c = k.find(".j_field_ul input[name\x3d'field_select'][isCustom\x3d'custom']:checked");
                if (0 < c.length) {
                    f = [];
                    for (a = 0; a < c.length; a++)
                        d = c[a],
                        d = $(d).val() + "_" + $(d).attr("title"),
                        f.push(d);
                    g.setCusCustomFields(f)
                }
                if (0 < b.length) {
                    e.find(".j_showField .j_customer-field-ul").empty();
                    for (a = 0; a < b.length; a++)
                        f = $(b[a]),
                        l = e.find(".j_clone .j_customer-field-li").clone(),
                        l.find("#" + f.attr("value")).attr("selected", "selected"),
                        e.find(".j_showField .j_customer-field-ul").append(l);
                    c = $("#editor-component").find(".j_showField .j_customer-field-li");
                    if (0 < c.length) {
                        f = [];
                        for (a = 0; a < c.length; a++)
                            k = c[a],
                            d = $(k).find("select").val(),
                            f.push(d);
                        g.setCusfields(f)
                    }
                    $("#fieldBatcEdit").modal("hide")
                } else
                    k.find(".j_fieldBatcEditEr").text("\u8bf7\u9009\u62e9\u8981\u663e\u793a\u7684\u5b57\u6bb5").show()
            } else if ("contact" == a) {
                g = $("#widget-control .field-active").data("componentData");
                c = k.find(".j_field_ul input[name\x3d'field_select'][isCustom\x3d'custom']:checked");
                if (0 < c.length) {
                    f = [];
                    for (a = 0; a < c.length; a++)
                        d = c[a],
                        d = $(d).val() + "_" + $(d).attr("title"),
                        f.push(d);
                    g.setCusCustomFields(f)
                }
                if (0 < b.length) {
                    e.find(".j_showField .j_contact-field-ul").empty();
                    for (a = 0; a < b.length; a++)
                        f = $(b[a]),
                        l = e.find(".j_clone .j_contact-field-li").clone(),
                        l.find("#" + f.attr("value")).attr("selected", "selected"),
                        e.find(".j_showField .j_contact-field-ul").append(l);
                    c = $("#editor-component").find(".j_showField .j_contact-field-li");
                    if (0 < c.length) {
                        d = [];
                        for (a = 0; a < c.length; a++)
                            k = c[a],
                            k = $(k).find("select").val(),
                            d.push(k);
                        g.setShowfields(d)
                    }
                    $("#fieldBatcEdit").modal("hide")
                } else
                    k.find(".j_fieldBatcEditEr").text("\u8bf7\u9009\u62e9\u8981\u663e\u793a\u7684\u5b57\u6bb5").show()
            } else if ("chance" == a) {
                g = $("#widget-control .field-active").data("componentData");
                c = k.find(".j_field_ul input[name\x3d'field_select'][isCustom\x3d'custom']:checked");
                if (0 < c.length) {
                    f = [];
                    for (a = 0; a < c.length; a++)
                        d = c[a],
                        d = $(d).val() + "_" + $(d).attr("title"),
                        f.push(d);
                    g.setCusCustomFields(f)
                }
                if (0 < b.length) {
                    e.find(".j_showField .j_chance-field-ul").empty();
                    for (a = 0; a < b.length; a++)
                        f = $(b[a]),
                        l = e.find(".j_clone .j_chance-field-li").clone(),
                        l.find("#" + f.attr("value")).attr("selected", "selected"),
                        e.find(".j_showField .j_chance-field-ul").append(l);
                    c = $("#editor-component").find(".j_showField .j_chance-field-li");
                    if (0 < c.length) {
                        d = [];
                        for (a = 0; a < c.length; a++)
                            k = c[a],
                            k = $(k).find("select").val(),
                            d.push(k);
                        g.setShowfields(d)
                    }
                    $("#fieldBatcEdit").modal("hide")
                } else
                    k.find(".j_fieldBatcEditEr").text("\u8bf7\u9009\u62e9\u8981\u663e\u793a\u7684\u5b57\u6bb5").show()
            } else if ("production" == a) {
                g = $("#widget-control .field-active").data("componentData");
                c = k.find(".j_field_ul input[name\x3d'field_select'][isCustom\x3d'custom']:checked");
                if (0 < c.length) {
                    f = [];
                    for (a = 0; a < c.length; a++)
                        d = c[a],
                        d = $(d).val() + "_" + $(d).attr("title"),
                        f.push(d);
                    g.setCusCustomFields(f)
                }
                if (0 < b.length) {
                    e.find(".j_showField .j_production-field-ul").empty();
                    for (a = 0; a < b.length; a++)
                        f = $(b[a]),
                        l = e.find(".j_clone .j_production-field-li").clone(),
                        l.find("#" + f.attr("value")).attr("selected", "selected"),
                        e.find(".j_showField .j_production-field-ul").append(l);
                    c = $("#editor-component").find(".j_showField .j_production-field-li");
                    if (0 < c.length) {
                        d = [];
                        for (a = 0; a < c.length; a++)
                            k = c[a],
                            k = $(k).find("select").val(),
                            d.push(k);
                        g.setShowfields(d)
                    }
                    $("#fieldBatcEdit").modal("hide")
                } else
                    k.find(".j_fieldBatcEditEr").text("\u8bf7\u9009\u62e9\u8981\u663e\u793a\u7684\u5b57\u6bb5").show()
            } else if ("contract" == a) {
                g = $("#widget-control .field-active").data("componentData");
                c = k.find(".j_field_ul input[name\x3d'field_select'][isCustom\x3d'custom']:checked");
                if (0 < c.length) {
                    f = [];
                    for (a = 0; a < c.length; a++)
                        d = c[a],
                        d = $(d).val() + "_" + $(d).attr("title"),
                        f.push(d);
                    g.setCusCustomFields(f)
                }
                if (0 < b.length) {
                    e.find(".j_showField .j_contract-field-ul").empty();
                    for (a = 0; a < b.length; a++)
                        f = $(b[a]),
                        l = e.find(".j_clone .j_contract-field-li").clone(),
                        l.find("#" + f.attr("value")).attr("selected", "selected"),
                        e.find(".j_showField .j_contract-field-ul").append(l);
                    c = $("#editor-component").find(".j_showField .j_contract-field-li");
                    if (0 < c.length) {
                        d = [];
                        for (a = 0; a < c.length; a++)
                            k = c[a],
                            k = $(k).find("select").val(),
                            d.push(k);
                        g.setShowfields(d)
                    }
                    $("#fieldBatcEdit").modal("hide")
                } else
                    k.find(".j_fieldBatcEditEr").text("\u8bf7\u9009\u62e9\u8981\u663e\u793a\u7684\u5b57\u6bb5").show()
            } else if ("agenda" == a)
                if (g = $("#widget-control .field-active").data("componentData"),
                0 < b.length) {
                    e.find(".j_showField .j_agenda-field-ul").empty();
                    for (a = 0; a < b.length; a++)
                        f = $(b[a]),
                        l = e.find(".j_clone .j_agenda-field-li").clone(),
                        l.find("#" + f.attr("value")).attr("selected", "selected"),
                        e.find(".j_showField .j_agenda-field-ul").append(l);
                    c = $("#editor-component").find(".j_showField .j_agenda-field-li");
                    if (0 < c.length) {
                        d = [];
                        for (a = 0; a < c.length; a++)
                            k = c[a],
                            k = $(k).find("select").val(),
                            d.push(k);
                        g.setShowfields(d)
                    }
                    $("#fieldBatcEdit").modal("hide")
                } else
                    k.find(".j_fieldBatcEditEr").text("\u8bf7\u9009\u62e9\u8981\u663e\u793a\u7684\u5b57\u6bb5").show();
            else if ("formColumn" == a)
                if (0 < c.length) {
                    g = $("#widget-control .field-active").data("componentData");
                    l = [];
                    a = 0;
                    for (d = c.length; a < d; a++)
                        k = $(c[a]),
                        e = k.attr("value"),
                        b = k.attr("title"),
                        h = k.attr("fieldDel"),
                        f = k.prop("checked"),
                        m = k.attr("comKey"),
                        k = k.attr("formId"),
                        l.push(e + "_" + b + "-" + f + "*" + h + "\x26" + m + "#" + k);
                    g.setColumnFields(l);
                    $("#fieldBatcEdit").modal("hide")
                } else
                    k.find(".j_fieldBatcEditEr").text("\u8bf7\u9009\u62e9\u8981\u663e\u793a\u7684\u5b57\u6bb5").show();
            else if (("customerColumn" == a || "contactColumn" == a || "chanceColumn" == a || "productionColumn" == a || "contractColumn" == a || "agendaColumn" == a) && 0 < c.length) {
                g = $("#widget-control .field-active").data("componentData");
                l = [];
                h = [];
                a = 0;
                for (d = c.length; a < d; a++)
                    k = $(c[a]),
                    e = k.attr("value"),
                    b = k.attr("title"),
                    (f = k.prop("checked")) && h.push(e + "_" + b),
                    l.push(e + "_" + b + "-" + f);
                g.setNewSortColumn(l);
                g.setSelectColumn(h);
                $("#fieldBatcEdit").modal("hide")
            }
        });
        $(document).on("click", "#fieldBatcEdit .j_close", function(a) {
            $("#fieldBatcEdit").modal("hide")
        });
        $(document).on("click", ".j_orderConfig", function(a) {
            a = $(this).attr("type");
            var k = $("#component-order");
            k.find(".j_orderOk").attr("type", a);
            k.find(".j_order_ul").empty();
            var c = $("#widget-control .field-active").data("componentData").componentSetup.orderContent;
            if ("task" == a) {
                var b = [{
                    orderType: "default",
                    orderWay: "DESC",
                    orderName: "\u9ed8\u8ba4"
                }, {
                    orderType: "last_comment_time",
                    orderWay: "DESC",
                    orderName: "\u6309\u53cd\u9988\u65f6\u95f4"
                }, {
                    orderType: "last_update_time",
                    orderWay: "DESC",
                    orderName: "\u6309\u4efb\u52a1\u66f4\u65b0\u65f6\u95f4"
                }, {
                    orderType: "create_time",
                    orderWay: "DESC",
                    orderName: "\u6309\u4efb\u52a1\u521b\u5efa\u65f6\u95f4(\u6700\u65b0)"
                }, {
                    orderType: "create_time",
                    orderWay: "ASC",
                    orderName: "\u6309\u4efb\u52a1\u521b\u5efa\u65f6\u95f4(\u6700\u65e9)"
                }, {
                    orderType: "due_date",
                    orderWay: "DESC",
                    orderName: "\u6309\u4efb\u52a1\u5230\u671f\u65f6\u95f4(\u6700\u65b0)"
                }, {
                    orderType: "due_date",
                    orderWay: "ASC",
                    orderName: "\u6309\u4efb\u52a1\u5230\u671f\u65f6\u95f4(\u6700\u65e9)"
                }, {
                    orderType: "manager",
                    orderWay: "ASC",
                    orderName: "\u6309\u8d1f\u8d23\u4eba"
                }, {
                    orderType: "priority",
                    orderWay: "DESC",
                    orderName: "\u6309\u7d27\u6025\u7a0b\u5ea6"
                }];
                for (a = 0; a < b.length; a++) {
                    var d = b[a]
                      , f = k.find(".j_clone .j_order_li").clone();
                    f.find("input").attr("orderType", d.orderType).attr("orderWay", d.orderWay);
                    var g = d.orderType + "," + d.orderWay;
                    if (c) {
                        var h = c.property + "," + c.direction;
                        h == g && f.find("input").prop("checked", !0)
                    }
                    f.find(".j_orderName").text(d.orderName);
                    k.find(".j_order_ul").append(f)
                }
                k.modal()
            } else if ("document" == a) {
                b = [{
                    orderType: "default",
                    orderWay: "DESC",
                    orderName: "\u9ed8\u8ba4"
                }, {
                    orderType: "name",
                    orderWay: "DESC",
                    orderName: "\u540d\u79f0"
                }, {
                    orderType: "last_comment_time",
                    orderWay: "DESC",
                    orderName: "\u53cd\u9988\u65f6\u95f4"
                }, {
                    orderType: "last_update_time",
                    orderWay: "DESC",
                    orderName: "\u6587\u6863\u66f4\u65b0\u65f6\u95f4"
                }, {
                    orderType: "create_time",
                    orderWay: "DESC",
                    orderName: "\u6587\u6863\u521b\u5efa\u65f6\u95f4"
                }, {
                    orderType: "manager",
                    orderWay: "DESC",
                    orderName: "\u8d1f\u8d23\u4eba"
                }];
                for (a = 0; a < b.length; a++)
                    d = b[a],
                    f = k.find(".j_clone .j_order_li").clone(),
                    f.find("input").attr("orderType", d.orderType).attr("orderWay", d.orderWay),
                    g = d.orderType + "," + d.orderWay,
                    c && (h = c.property + "," + c.direction,
                    h == g && f.find("input").prop("checked", !0)),
                    f.find(".j_orderName").text(d.orderName),
                    k.find(".j_order_ul").append(f);
                k.modal()
            } else if ("mainline" == a) {
                b = [{
                    orderType: "default",
                    orderWay: "DESC",
                    orderName: "\u9ed8\u8ba4"
                }, {
                    orderType: "last_comment_time",
                    orderWay: "DESC",
                    orderName: "\u6309\u53cd\u9988\u65f6\u95f4"
                }, {
                    orderType: "last_update_time",
                    orderWay: "DESC",
                    orderName: "\u6309\u9879\u76ee\u66f4\u65b0\u65f6\u95f4"
                }, {
                    orderType: "create_time",
                    orderWay: "DESC",
                    orderName: "\u6309\u9879\u76ee\u521b\u5efa\u65f6\u95f4"
                }, {
                    orderType: "end_time",
                    orderWay: "DESC",
                    orderName: "\u6309\u9879\u76ee\u7ed3\u675f\u65f6\u95f4"
                }, {
                    orderType: "name",
                    orderWay: "DESC",
                    orderName: "\u6309\u9879\u76ee\u540d\u79f0"
                }, {
                    orderType: "manager",
                    orderWay: "DESC",
                    orderName: "\u6309\u8d1f\u8d23\u4eba"
                }];
                for (a = 0; a < b.length; a++)
                    d = b[a],
                    f = k.find(".j_clone .j_order_li").clone(),
                    f.find("input").attr("orderType", d.orderType).attr("orderWay", d.orderWay),
                    g = d.orderType + "," + d.orderWay,
                    c && (h = c.property + "," + c.direction,
                    h == g && f.find("input").prop("checked", !0)),
                    f.find(".j_orderName").text(d.orderName),
                    k.find(".j_order_ul").append(f);
                k.modal()
            } else if ("agenda" == a) {
                b = [{
                    orderType: "default",
                    orderWay: "DESC",
                    orderName: "\u9ed8\u8ba4"
                }, {
                    orderType: "create_time",
                    orderWay: "DESC",
                    orderName: "\u6309\u65e5\u7a0b\u521b\u5efa\u65f6\u95f4"
                }, {
                    orderType: "name",
                    orderWay: "DESC",
                    orderName: "\u6309\u65e5\u7a0b\u540d\u79f0"
                }, {
                    orderType: "creator",
                    orderWay: "DESC",
                    orderName: "\u6309\u521b\u5efa\u4eba"
                }];
                for (a = 0; a < b.length; a++)
                    d = b[a],
                    f = k.find(".j_clone .j_order_li").clone(),
                    f.find("input").attr("orderType", d.orderType).attr("orderWay", d.orderWay),
                    g = d.orderType + "," + d.orderWay,
                    c && (h = c.property + "," + c.direction,
                    h == g && f.find("input").prop("checked", !0)),
                    f.find(".j_orderName").text(d.orderName),
                    k.find(".j_order_ul").append(f);
                k.modal()
            } else if ("workflow" == a) {
                b = [{
                    orderType: "default",
                    orderWay: "DESC",
                    orderName: "\u9ed8\u8ba4"
                }, {
                    orderType: "plan_finish_time",
                    orderWay: "DESC",
                    orderName: "\u6309\u8282\u70b9\u5230\u671f\u65f6\u95f4"
                }, {
                    orderType: "last_comment_time",
                    orderWay: "DESC",
                    orderName: "\u6309\u53cd\u9988\u65f6\u95f4"
                }, {
                    orderType: "create_time",
                    orderWay: "DESC",
                    orderName: "\u6309\u7533\u8bf7\u65f6\u95f4"
                }, {
                    orderType: "creator",
                    orderWay: "DESC",
                    orderName: "\u6309\u7533\u8bf7\u4eba"
                }];
                for (a = 0; a < b.length; a++)
                    d = b[a],
                    f = k.find(".j_clone .j_order_li").clone(),
                    f.find("input").attr("orderType", d.orderType).attr("orderWay", d.orderWay),
                    g = d.orderType + "," + d.orderWay,
                    c && (h = c.property + "," + c.direction,
                    h == g && f.find("input").prop("checked", !0)),
                    f.find(".j_orderName").text(d.orderName),
                    k.find(".j_order_ul").append(f);
                k.modal()
            } else if ("form" == a) {
                var s = [{
                    orderType: "FD.NAME",
                    orderWay: "desc",
                    orderName: "\u6807\u9898(\u5012\u5e8f)"
                }, {
                    orderType: "FD.NAME",
                    orderWay: "asc",
                    orderName: "\u6807\u9898(\u6b63\u5e8f)"
                }, {
                    orderType: "E.USERNAME",
                    orderWay: "desc",
                    orderName: "\u63d0\u4ea4\u4eba(\u5012\u5e8f)"
                }, {
                    orderType: "E.USERNAME",
                    orderWay: "asc",
                    orderName: "\u63d0\u4ea4\u4eba(\u6b63\u5e8f)"
                }, {
                    orderType: "FD.CREATE_TIME",
                    orderWay: "desc",
                    orderName: "\u63d0\u4ea4\u65f6\u95f4(\u5012\u5e8f)"
                }, {
                    orderType: "FD.CREATE_TIME",
                    orderWay: "asc",
                    orderName: "\u63d0\u4ea4\u65f6\u95f4(\u6b63\u5e8f)"
                }, {
                    orderType: "FD.OPERATOR",
                    orderWay: "desc",
                    orderName: "\u7c7b\u578b(\u5012\u5e8f)"
                }, {
                    orderType: "FD.OPERATOR",
                    orderWay: "asc",
                    orderName: "\u7c7b\u578b(\u6b63\u5e8f)"
                }, {
                    orderType: "FD.DATA_STATUS",
                    orderWay: "desc",
                    orderName: "\u72b6\u6001(\u5012\u5e8f)"
                }, {
                    orderType: "FD.DATA_STATUS",
                    orderWay: "asc",
                    orderName: "\u72b6\u6001(\u6b63\u5e8f)"
                }]
                  , m = []
                  , d = $("#editor-component").find("#form_select_input").attr("formId");
                a = {};
                a.formId = d;
                a.module = l.module;
                d = [];
                d.push("0");
                d.push("1");
                a.statusList = d;
                $.ajax({
                    contentType: "application/json",
                    type: TEAMS.ajaxMethod,
                    data: JSON.stringify(a),
                    dataType: "json",
                    url: "/" + e + "/queryFormFieldByFormId.json",
                    success: function(a) {
                        var e = a.formField;
                        for (a = 0; a < e.length; a++) {
                            var b = e[a]
                              , d = {}
                              , f = {};
                            d.fieldId = b.id;
                            d.componentKey = b.componentKey;
                            d.content = "C_" + b.id + " desc";
                            d.orderName = b.title + "(\u5012\u5e8f)";
                            f.fieldId = b.id;
                            f.componentKey = b.componentKey;
                            f.content = "C_" + b.id + " asc";
                            f.orderName = b.title + "(\u6b63\u5e8f)";
                            m.push(d);
                            m.push(f)
                        }
                        for (a = 0; a < s.length; a++)
                            e = s[a],
                            b = k.find(".j_clone .j_order_li").clone(),
                            b.find("input").attr("orderType", e.orderType).attr("orderWay", e.orderWay),
                            d = e.orderType + "," + e.orderWay,
                            c && c.property + "," + c.direction == d && b.find("input").prop("checked", !0),
                            b.find(".j_orderName").text(e.orderName),
                            k.find(".j_order_ul").append(b);
                        for (a = 0; a < m.length; a++)
                            e = m[a],
                            b = k.find(".j_clone .j_order_li").clone(),
                            b.find("input").attr("fieldId", e.fieldId).attr("componentKey", e.componentKey).attr("content", e.content),
                            c && c.content == e.content && b.find("input").prop("checked", !0),
                            b.find(".j_orderName").text(e.orderName),
                            k.find(".j_order_ul").append(b);
                        k.modal()
                    }
                })
            } else if ("customer" == a) {
                b = [{
                    orderType: "name",
                    orderWay: "DESC",
                    orderName: "\u5ba2\u6237\u540d\u79f0(\u5012\u5e8f)"
                }, {
                    orderType: "name",
                    orderWay: "ASC",
                    orderName: "\u5ba2\u6237\u540d\u79f0(\u6b63\u5e8f)"
                }, {
                    orderType: "manager.username",
                    orderWay: "DESC",
                    orderName: "\u5ba2\u6237\u7ecf\u7406(\u5012\u5e8f)"
                }, {
                    orderType: "manager.username",
                    orderWay: "ASC",
                    orderName: "\u5ba2\u6237\u7ecf\u7406(\u6b63\u5e8f)"
                }, {
                    orderType: "status.name",
                    orderWay: "DESC",
                    orderName: "\u72b6\u6001\u540d\u79f0(\u5012\u5e8f)"
                }, {
                    orderType: "status.name",
                    orderWay: "ASC",
                    orderName: "\u72b6\u6001\u540d\u79f0(\u6b63\u5e8f)"
                }, {
                    orderType: "orderTime",
                    orderWay: "DESC",
                    orderName: "\u66f4\u65b0\u65f6\u95f4(\u6700\u65b0)"
                }, {
                    orderType: "orderTime",
                    orderWay: "ASC",
                    orderName: "\u66f4\u65b0\u65f6\u95f4(\u6700\u65e9)"
                }, {
                    orderType: "lastCommentTime",
                    orderWay: "DESC",
                    orderName: "\u53cd\u9988\u65f6\u95f4(\u6700\u65b0)"
                }, {
                    orderType: "lastCommentTime",
                    orderWay: "ASC",
                    orderName: "\u53cd\u9988\u65f6\u95f4(\u6700\u65e9)"
                }, {
                    orderType: "createTime",
                    orderWay: "DESC",
                    orderName: "\u521b\u5efa\u65f6\u95f4(\u6700\u65b0)"
                }, {
                    orderType: "createTime",
                    orderWay: "ASC",
                    orderName: "\u521b\u5efa\u65f6\u95f4(\u6700\u65e9)"
                }, {
                    orderType: "industry.name",
                    orderWay: "DESC",
                    orderName: "\u884c\u4e1a(\u5012\u5e8f)"
                }, {
                    orderType: "industry.name",
                    orderWay: "ASC",
                    orderName: "\u884c\u4e1a(\u6b63\u5e8f)"
                }, {
                    orderType: "region.name",
                    orderWay: "DESC",
                    orderName: "\u5730\u533a(\u5012\u5e8f)"
                }, {
                    orderType: "region.name",
                    orderWay: "ASC",
                    orderName: "\u5730\u533a(\u6b63\u5e8f)"
                }];
                for (a = 0; a < b.length; a++)
                    d = b[a],
                    f = k.find(".j_clone .j_order_li").clone(),
                    f.find("input").attr("orderType", d.orderType).attr("orderWay", d.orderWay),
                    g = d.orderType + "," + d.orderWay,
                    c && (h = c.property + "," + c.direction,
                    h == g && f.find("input").prop("checked", !0)),
                    f.find(".j_orderName").text(d.orderName),
                    k.find(".j_order_ul").append(f);
                k.modal()
            } else if ("contact" == a) {
                b = [{
                    orderType: "username",
                    orderWay: "DESC",
                    orderName: "\u8054\u7cfb\u4eba\u540d\u79f0(\u5012\u5e8f)"
                }, {
                    orderType: "username",
                    orderWay: "ASC",
                    orderName: "\u8054\u7cfb\u4eba\u540d\u79f0(\u6b63\u5e8f)"
                }, {
                    orderType: "title",
                    orderWay: "DESC",
                    orderName: "\u5934\u8854(\u5012\u5e8f)"
                }, {
                    orderType: "title",
                    orderWay: "ASC",
                    orderName: "\u5934\u8854(\u6b63\u5e8f)"
                }, {
                    orderType: "call",
                    orderWay: "DESC",
                    orderName: "\u79f0\u547c(\u5012\u5e8f)"
                }, {
                    orderType: "call",
                    orderWay: "ASC",
                    orderName: "\u79f0\u547c(\u6b63\u5e8f)"
                }, {
                    orderType: "telephone",
                    orderWay: "DESC",
                    orderName: "\u7535\u8bdd(\u5012\u5e8f)"
                }, {
                    orderType: "telephone",
                    orderWay: "ASC",
                    orderName: "\u7535\u8bdd(\u6b63\u5e8f)"
                }, {
                    orderType: "mobile",
                    orderWay: "DESC",
                    orderName: "\u624b\u673a(\u5012\u5e8f)"
                }, {
                    orderType: "mobile",
                    orderWay: "ASC",
                    orderName: "\u624b\u673a(\u6b63\u5e8f)"
                }, {
                    orderType: "interest",
                    orderWay: "DESC",
                    orderName: "\u7231\u597d(\u5012\u5e8f)"
                }, {
                    orderType: "interest",
                    orderWay: "ASC",
                    orderName: "\u7231\u597d(\u6b63\u5e8f)"
                }, {
                    orderType: "sex",
                    orderWay: "DESC",
                    orderName: "\u6027\u522b(\u5012\u5e8f)"
                }, {
                    orderType: "sex",
                    orderWay: "ASC",
                    orderName: "\u6027\u522b(\u6b63\u5e8f)"
                }, {
                    orderType: "createTime",
                    orderWay: "DESC",
                    orderName: "\u521b\u5efa\u65f6\u95f4(\u6700\u65b0)"
                }, {
                    orderType: "createTime",
                    orderWay: "ASC",
                    orderName: "\u521b\u5efa\u65f6\u95f4(\u6700\u65e9)"
                }, {
                    orderType: "updateTime",
                    orderWay: "DESC",
                    orderName: "\u66f4\u65b0\u65f6\u95f4(\u6700\u65b0)"
                }, {
                    orderType: "updateTime",
                    orderWay: "ASC",
                    orderName: "\u66f4\u65b0\u65f6\u95f4(\u6700\u65e9)"
                }];
                for (a = 0; a < b.length; a++)
                    d = b[a],
                    f = k.find(".j_clone .j_order_li").clone(),
                    f.find("input").attr("orderType", d.orderType).attr("orderWay", d.orderWay),
                    g = d.orderType + "," + d.orderWay,
                    c && (h = c.property + "," + c.direction,
                    h == g && f.find("input").prop("checked", !0)),
                    f.find(".j_orderName").text(d.orderName),
                    k.find(".j_order_ul").append(f);
                k.modal()
            } else if ("chance" == a) {
                b = [{
                    orderType: "name",
                    orderWay: "DESC",
                    orderName: "\u5546\u673a\u540d\u79f0(\u5012\u5e8f)"
                }, {
                    orderType: "name",
                    orderWay: "ASC",
                    orderName: "\u5546\u673a\u540d\u79f0(\u6b63\u5e8f)"
                }, {
                    orderType: "stage.name",
                    orderWay: "DESC",
                    orderName: "\u5546\u673a\u9636\u6bb5(\u5012\u5e8f)"
                }, {
                    orderType: "stage.name",
                    orderWay: "ASC",
                    orderName: "\u5546\u673a\u9636\u6bb5(\u6b63\u5e8f)"
                }, {
                    orderType: "money",
                    orderWay: "DESC",
                    orderName: "\u9500\u552e\u91d1\u989d(\u5012\u5e8f)"
                }, {
                    orderType: "money",
                    orderWay: "ASC",
                    orderName: "\u9500\u552e\u91d1\u989d(\u6b63\u5e8f)"
                }, {
                    orderType: "winRate",
                    orderWay: "DESC",
                    orderName: "\u5546\u673a\u8d62\u7387(\u5012\u5e8f)"
                }, {
                    orderType: "winRate",
                    orderWay: "ASC",
                    orderName: "\u5546\u673a\u8d62\u7387(\u6b63\u5e8f)"
                }, {
                    orderType: "source.name",
                    orderWay: "DESC",
                    orderName: "\u5546\u673a\u6765\u6e90(\u5012\u5e8f)"
                }, {
                    orderType: "source.name",
                    orderWay: "ASC",
                    orderName: "\u5546\u673a\u6765\u6e90(\u6b63\u5e8f)"
                }, {
                    orderType: "orderTime",
                    orderWay: "DESC",
                    orderName: "\u7ed3\u5355\u65f6\u95f4(\u6700\u65b0)"
                }, {
                    orderType: "orderTime",
                    orderWay: "ASC",
                    orderName: "\u7ed3\u5355\u65f6\u95f4(\u6700\u65e9)"
                }, {
                    orderType: "customer.name",
                    orderWay: "DESC",
                    orderName: "\u6240\u5c5e\u5ba2\u6237(\u5012\u5e8f)"
                }, {
                    orderType: "customer.name",
                    orderWay: "ASC",
                    orderName: "\u6240\u5c5e\u5ba2\u6237(\u6b63\u5e8f)"
                }, {
                    orderType: "type.name",
                    orderWay: "DESC",
                    orderName: "\u5546\u673a\u7c7b\u578b(\u5012\u5e8f)"
                }, {
                    orderType: "type.name",
                    orderWay: "ASC",
                    orderName: "\u5546\u673a\u7c7b\u578b(\u6b63\u5e8f)"
                }, {
                    orderType: "updateTime",
                    orderWay: "DESC",
                    orderName: "\u66f4\u65b0\u65f6\u95f4(\u6700\u65b0)"
                }, {
                    orderType: "updateTime",
                    orderWay: "ASC",
                    orderName: "\u66f4\u65b0\u65f6\u95f4(\u6700\u65e9)"
                }, {
                    orderType: "createTime",
                    orderWay: "DESC",
                    orderName: "\u521b\u5efa\u65f6\u95f4(\u6700\u65b0)"
                }, {
                    orderType: "createTime",
                    orderWay: "ASC",
                    orderName: "\u521b\u5efa\u65f6\u95f4(\u6700\u65e9)"
                }];
                for (a = 0; a < b.length; a++)
                    d = b[a],
                    f = k.find(".j_clone .j_order_li").clone(),
                    f.find("input").attr("orderType", d.orderType).attr("orderWay", d.orderWay),
                    g = d.orderType + "," + d.orderWay,
                    c && (h = c.property + "," + c.direction,
                    h == g && f.find("input").prop("checked", !0)),
                    f.find(".j_orderName").text(d.orderName),
                    k.find(".j_order_ul").append(f);
                k.modal()
            } else if ("production" == a) {
                b = [{
                    orderType: "name",
                    orderWay: "desc",
                    orderName: "\u4ea7\u54c1\u540d\u79f0(\u5012\u5e8f)"
                }, {
                    orderType: "name",
                    orderWay: "asc",
                    orderName: "\u4ea7\u54c1\u540d\u79f0(\u6b63\u5e8f)"
                }, {
                    orderType: "price",
                    orderWay: "desc",
                    orderName: "\u4ef7\u683c(\u5012\u5e8f)"
                }, {
                    orderType: "price",
                    orderWay: "asc",
                    orderName: "\u4ef7\u683c(\u6b63\u5e8f)"
                }, {
                    orderType: "type.name",
                    orderWay: "desc",
                    orderName: "\u4ea7\u54c1\u7c7b\u578b(\u5012\u5e8f)"
                }, {
                    orderType: "type.name",
                    orderWay: "asc",
                    orderName: "\u4ea7\u54c1\u7c7b\u578b(\u6b63\u5e8f)"
                }, {
                    orderType: "createDate",
                    orderWay: "desc",
                    orderName: "\u521b\u5efa\u65f6\u95f4(\u6700\u65b0)"
                }, {
                    orderType: "createDate",
                    orderWay: "asc",
                    orderName: "\u521b\u5efa\u65f6\u95f4(\u6700\u65e9)"
                }, {
                    orderType: "lastCommentTime",
                    orderWay: "desc",
                    orderName: "\u53cd\u9988\u65f6\u95f4(\u6700\u65b0)"
                }, {
                    orderType: "lastCommentTime",
                    orderWay: "asc",
                    orderName: "\u53cd\u9988\u65f6\u95f4(\u6700\u65e9)"
                }, {
                    orderType: "updateTime",
                    orderWay: "desc",
                    orderName: "\u66f4\u65b0\u65f6\u95f4(\u6700\u65b0)"
                }, {
                    orderType: "updateTime",
                    orderWay: "asc",
                    orderName: "\u66f4\u65b0\u65f6\u95f4(\u6700\u65e9)"
                }];
                for (a = 0; a < b.length; a++)
                    d = b[a],
                    f = k.find(".j_clone .j_order_li").clone(),
                    f.find("input").attr("orderType", d.orderType).attr("orderWay", d.orderWay),
                    g = d.orderType + "," + d.orderWay,
                    c && (h = c.property + "," + c.direction,
                    h == g && f.find("input").prop("checked", !0)),
                    f.find(".j_orderName").text(d.orderName),
                    k.find(".j_order_ul").append(f);
                k.modal()
            } else if ("contract" == a) {
                b = [{
                    orderType: "name",
                    orderWay: "DESC",
                    orderName: "\u5408\u540c\u540d\u79f0(\u5012\u5e8f)"
                }, {
                    orderType: "name",
                    orderWay: "ASC",
                    orderName: "\u5408\u540c\u540d\u79f0(\u6b63\u5e8f)"
                }, {
                    orderType: "number",
                    orderWay: "DESC",
                    orderName: "\u5408\u540c\u7f16\u53f7(\u5012\u5e8f)"
                }, {
                    orderType: "number",
                    orderWay: "ASC",
                    orderName: "\u5408\u540c\u7f16\u53f7(\u6b63\u5e8f)"
                }, {
                    orderType: "type.name",
                    orderWay: "DESC",
                    orderName: "\u5408\u540c\u7c7b\u578b(\u5012\u5e8f)"
                }, {
                    orderType: "type.name",
                    orderWay: "ASC",
                    orderName: "\u5408\u540c\u7c7b\u578b(\u6b63\u5e8f)"
                }, {
                    orderType: "totalMoney",
                    orderWay: "DESC",
                    orderName: "\u603b\u91d1\u989d(\u5012\u5e8f)"
                }, {
                    orderType: "totalMoney",
                    orderWay: "ASC",
                    orderName: "\u603b\u91d1\u989d(\u6b63\u5e8f)"
                }, {
                    orderType: "status.name",
                    orderWay: "DESC",
                    orderName: "\u5408\u540c\u72b6\u6001(\u5012\u5e8f)"
                }, {
                    orderType: "status.name",
                    orderWay: "ASC",
                    orderName: "\u5408\u540c\u72b6\u6001(\u6b63\u5e8f)"
                }, {
                    orderType: "startTime",
                    orderWay: "DESC",
                    orderName: "\u5f00\u59cb\u65f6\u95f4(\u6700\u65b0)"
                }, {
                    orderType: "startTime",
                    orderWay: "ASC",
                    orderName: "\u5f00\u59cb\u65f6\u95f4(\u6700\u65e9)"
                }, {
                    orderType: "endTime",
                    orderWay: "DESC",
                    orderName: "\u7ed3\u675f\u65f6\u95f4(\u6700\u65b0)"
                }, {
                    orderType: "endTime",
                    orderWay: "ASC",
                    orderName: "\u7ed3\u675f\u65f6\u95f4(\u6700\u65e9)"
                }, {
                    orderType: "customerSigner",
                    orderWay: "DESC",
                    orderName: "\u5ba2\u6237\u7b7e\u7ea6\u4eba(\u5012\u5e8f)"
                }, {
                    orderType: "customerSigner",
                    orderWay: "ASC",
                    orderName: "\u5ba2\u6237\u7b7e\u7ea6\u4eba(\u6b63\u5e8f)"
                }, {
                    orderType: "payMethod.name",
                    orderWay: "DESC",
                    orderName: "\u652f\u4ed8\u65b9\u5f0f(\u5012\u5e8f)"
                }, {
                    orderType: "payMethod.name",
                    orderWay: "ASC",
                    orderName: "\u652f\u4ed8\u65b9\u5f0f(\u6b63\u5e8f)"
                }, {
                    orderType: "selfSigner",
                    orderWay: "DESC",
                    orderName: "\u6211\u65b9\u7b7e\u7ea6\u4eba(\u5012\u5e8f)"
                }, {
                    orderType: "selfSigner",
                    orderWay: "ASC",
                    orderName: "\u6211\u65b9\u7b7e\u7ea6\u4eba(\u6b63\u5e8f)"
                }, {
                    orderType: "description",
                    orderWay: "DESC",
                    orderName: "\u5907\u6ce8(\u5012\u5e8f)"
                }, {
                    orderType: "description",
                    orderWay: "ASC",
                    orderName: "\u5907\u6ce8(\u6b63\u5e8f)"
                }, {
                    orderType: "content",
                    orderWay: "DESC",
                    orderName: "\u5408\u540c\u5185\u5bb9(\u5012\u5e8f)"
                }, {
                    orderType: "content",
                    orderWay: "ASC",
                    orderName: "\u5408\u540c\u5185\u5bb9(\u6b63\u5e8f)"
                }, {
                    orderType: "signTime",
                    orderWay: "DESC",
                    orderName: "\u7b7e\u7ea6\u65f6\u95f4(\u6700\u65b0)"
                }, {
                    orderType: "signTime",
                    orderWay: "ASC",
                    orderName: "\u7b7e\u7ea6\u65f6\u95f4(\u6700\u65e9)"
                }];
                for (a = 0; a < b.length; a++)
                    d = b[a],
                    f = k.find(".j_clone .j_order_li").clone(),
                    f.find("input").attr("orderType", d.orderType).attr("orderWay", d.orderWay),
                    g = d.orderType + "," + d.orderWay,
                    c && (h = c.property + "," + c.direction,
                    h == g && f.find("input").prop("checked", !0)),
                    f.find(".j_orderName").text(d.orderName),
                    k.find(".j_order_ul").append(f);
                k.modal()
            }
        });
        $(document).off("click", "#component-order .j_orderOk").on("click", "#component-order .j_orderOk", function(a) {
            a = $(this).attr("type");
            var k = $("#component-order")
              , e = k.find(".j_order_ul").find('input[name\x3d"orderSelect"]:checked');
            if (0 == e.length)
                m.notify("\u8bf7\u9009\u62e9\u4e00\u79cd\u6392\u5e8f\u65b9\u5f0f");
            else {
                var c = {};
                "form" == a ? e.attr("fieldId") ? (c.fieldId = e.attr("fieldId"),
                c.comKey = e.attr("componentKey"),
                c.content = e.attr("content")) : (c.property = e.attr("orderType"),
                c.direction = e.attr("orderWay")) : (c.property = e.attr("orderType"),
                c.direction = e.attr("orderWay"));
                $("#widget-control .field-active").data("componentData").setOrderContent(c);
                k.modal("hide")
            }
        });
        $(document).off("click", "#component-order .j_orderCancel").on("click", "#component-order .j_orderCancel", function(a) {
            $("#component-order").modal("hide")
        });
        $(document).on("change", "select[name\x3d'production-field-select']", function(a) {
            var k = $(this).parents("#editor-component").find(".j_showField .j_production-field-li");
            if (0 < k.length) {
                a = [];
                for (var e = [], c = 0; c < k.length; c++) {
                    var b = k[c]
                      , d = $(b).find("select").val();
                    a.push(d);
                    b = $(b).find("select option:selected");
                    $(b).hasClass("j_custom_option") && e.push($(b).attr("id") + "_" + $(b).text())
                }
                k = $("#widget-control .field-active").data("componentData");
                k.setShowfields(a);
                k.setCusCustomFields(e)
            }
        });
        $(document).off("click", ".j_addproductionfield").on("click", ".j_addproductionfield", function(a) {
            a = $(this).parents("#editor-component");
            var k = a.find(".j_showField .j_production-field-li");
            if (0 < k.length) {
                var e = $(k[0]).find("option");
                if (k.length == e.length) {
                    m.notify("\u4e0d\u80fd\u8d85\u8fc7\u6700\u5927\u7684\u5b57\u6bb5\u4e2a\u6570!");
                    return
                }
                k = $(k[0]).clone();
                a.find(".j_showField .j_production-field-ul").append(k)
            }
            e = a.find(".j_showField .j_production-field-li");
            a = [];
            for (var k = [], c = 0; c < e.length; c++) {
                var b = e[c]
                  , d = $(b).find("select").val();
                a.push(d);
                b = $(b).find("select option:selected");
                $(b).hasClass("j_custom_option") && k.push($(b).attr("id") + "_" + $(b).text())
            }
            e = $("#widget-control .field-active").data("componentData");
            e.setShowfields(a);
            e.setCusCustomFields(k)
        });
        $(document).off("click", ".j_delproductionfield").on("click", ".j_delproductionfield", function(a) {
            $(this).parent().parent().remove();
            a = $("#editor-component").find(".j_showField .j_production-field-li");
            var k = $("#widget-control .field-active").data("componentData")
              , e = []
              , c = [];
            if (0 == a.length)
                $("#editor-component").find(".j_showField").addClass("hide"),
                $("#editor-component").find(".j_batch_edit").addClass("hide"),
                $("#editor-component").find(".j_cardConf").removeClass("hide"),
                k.setShowfields(e);
            else {
                for (var b = 0; b < a.length; b++) {
                    var d = a[b]
                      , f = $(d).find("select").val();
                    e.push(f);
                    d = $(d).find("select option:selected");
                    $(d).hasClass("j_custom_option") && c.push($(d).attr("id") + "_" + $(d).text())
                }
                k.setShowfields(e);
                k.setCusCustomFields(c)
            }
        });
        $(document).on("change", "select[name\x3d'agenda-field-select']", function(a) {
            a = $(this).parents("#editor-component").find(".j_showField .j_agenda-field-li");
            if (0 < a.length) {
                for (var k = [], e = 0; e < a.length; e++) {
                    var c = $(a[e]).find("select").val();
                    k.push(c)
                }
                $("#widget-control .field-active").data("componentData").setShowfields(k)
            }
        });
        $(document).off("click", ".j_addagendafield").on("click", ".j_addagendafield", function(a) {
            a = $(this).parents("#editor-component");
            var k = a.find(".j_showField .j_agenda-field-li");
            if (0 < k.length) {
                var e = $(k[0]).find("option");
                if (k.length == e.length) {
                    m.notify("\u4e0d\u80fd\u8d85\u8fc7\u6700\u5927\u7684\u5b57\u6bb5\u4e2a\u6570!");
                    return
                }
                k = $(k[0]).clone();
                a.find(".j_showField .j_agenda-field-ul").append(k)
            }
            a = a.find(".j_showField .j_agenda-field-li");
            k = [];
            for (e = 0; e < a.length; e++) {
                var c = $(a[e]).find("select").val();
                k.push(c)
            }
            $("#widget-control .field-active").data("componentData").setShowfields(k)
        });
        $(document).off("click", ".j_delagendafield").on("click", ".j_delagendafield", function(a) {
            $(this).parent().parent().remove();
            a = $("#editor-component").find(".j_showField .j_agenda-field-li");
            var k = $("#widget-control .field-active").data("componentData")
              , e = [];
            if (0 == a.length)
                $("#editor-component").find(".j_showField").addClass("hide"),
                $("#editor-component").find(".j_batch_edit").addClass("hide"),
                $("#editor-component").find(".j_cardConf").removeClass("hide");
            else
                for (var c = 0; c < a.length; c++) {
                    var b = $(a[c]).find("select").val();
                    e.push(b)
                }
            k.setShowfields(e)
        });
        $(document).on("change", "select[name\x3d'contract-field-select']", function(a) {
            var k = $(this).parents("#editor-component").find(".j_showField .j_contract-field-li");
            if (0 < k.length) {
                a = [];
                for (var e = [], c = 0; c < k.length; c++) {
                    var b = k[c]
                      , d = $(b).find("select").val();
                    a.push(d);
                    b = $(b).find("select option:selected");
                    $(b).hasClass("j_custom_option") && e.push($(b).attr("id") + "_" + $(b).text())
                }
                k = $("#widget-control .field-active").data("componentData");
                k.setShowfields(a);
                k.setCusCustomFields(e)
            }
        });
        $(document).off("click", ".j_addcontractfield").on("click", ".j_addcontractfield", function(a) {
            a = $(this).parents("#editor-component");
            var k = a.find(".j_showField .j_contract-field-li");
            if (0 < k.length) {
                var e = $(k[0]).find("option");
                if (k.length == e.length) {
                    m.notify("\u4e0d\u80fd\u8d85\u8fc7\u6700\u5927\u7684\u5b57\u6bb5\u4e2a\u6570!");
                    return
                }
                k = $(k[0]).clone();
                a.find(".j_showField .j_contract-field-ul").append(k)
            }
            e = a.find(".j_showField .j_contract-field-li");
            a = [];
            for (var k = [], c = 0; c < e.length; c++) {
                var b = e[c]
                  , d = $(b).find("select").val();
                a.push(d);
                b = $(b).find("select option:selected");
                $(b).hasClass("j_custom_option") && k.push($(b).attr("id") + "_" + $(b).text())
            }
            e = $("#widget-control .field-active").data("componentData");
            e.setShowfields(a);
            e.setCusCustomFields(k)
        });
        $(document).off("click", ".j_delcontractfield").on("click", ".j_delcontractfield", function(a) {
            $(this).parent().parent().remove();
            a = $("#editor-component").find(".j_showField .j_contract-field-li");
            var k = $("#widget-control .field-active").data("componentData")
              , e = []
              , c = [];
            if (0 == a.length)
                $("#editor-component").find(".j_showField").addClass("hide"),
                $("#editor-component").find(".j_batch_edit").addClass("hide"),
                $("#editor-component").find(".j_cardConf").removeClass("hide"),
                k.setShowfields(e);
            else {
                for (var b = 0; b < a.length; b++) {
                    var d = a[b]
                      , f = $(d).find("select").val();
                    e.push(f);
                    d = $(d).find("select option:selected");
                    $(d).hasClass("j_custom_option") && c.push($(d).attr("id") + "_" + $(d).text())
                }
                k.setShowfields(e);
                k.setCusCustomFields(c)
            }
        });
        $(document).on("change", "select[name\x3d'chance-field-select']", function(a) {
            var k = $(this).parents("#editor-component").find(".j_showField .j_chance-field-li");
            if (0 < k.length) {
                a = [];
                for (var e = [], c = 0; c < k.length; c++) {
                    var b = k[c]
                      , d = $(b).find("select").val();
                    a.push(d);
                    b = $(b).find("select option:selected");
                    $(b).hasClass("j_custom_option") && e.push($(b).attr("id") + "_" + $(b).text())
                }
                k = $("#widget-control .field-active").data("componentData");
                k.setShowfields(a);
                k.setCusCustomFields(e)
            }
        });
        $(document).off("click", ".j_addchancefield").on("click", ".j_addchancefield", function(a) {
            a = $(this).parents("#editor-component");
            var k = a.find(".j_showField .j_chance-field-li");
            if (0 < k.length) {
                var e = $(k[0]).find("option");
                if (k.length == e.length) {
                    m.notify("\u4e0d\u80fd\u8d85\u8fc7\u6700\u5927\u7684\u5b57\u6bb5\u4e2a\u6570!");
                    return
                }
                k = $(k[0]).clone();
                a.find(".j_showField .j_chance-field-ul").append(k)
            }
            e = a.find(".j_showField .j_chance-field-li");
            a = [];
            for (var k = [], c = 0; c < e.length; c++) {
                var b = e[c]
                  , d = $(b).find("select").val();
                a.push(d);
                b = $(b).find("select option:selected");
                $(b).hasClass("j_custom_option") && k.push($(b).attr("id") + "_" + $(b).text())
            }
            e = $("#widget-control .field-active").data("componentData");
            e.setShowfields(a);
            e.setCusCustomFields(k)
        });
        $(document).off("click", ".j_delchancefield").on("click", ".j_delchancefield", function(a) {
            $(this).parent().parent().remove();
            a = $("#editor-component").find(".j_showField .j_chance-field-li");
            var k = $("#widget-control .field-active").data("componentData")
              , e = []
              , c = [];
            if (0 == a.length)
                $("#editor-component").find(".j_showField").addClass("hide"),
                $("#editor-component").find(".j_batch_edit").addClass("hide"),
                $("#editor-component").find(".j_cardConf").removeClass("hide");
            else
                for (var b = 0; b < a.length; b++) {
                    var d = a[b]
                      , f = $(d).find("select").val();
                    e.push(f);
                    d = $(d).find("select option:selected");
                    $(d).hasClass("j_custom_option") && c.push($(d).attr("id") + "_" + $(d).text())
                }
            k.setShowfields(e);
            k.setCusCustomFields(c)
        });
        $(document).on("change", "select[name\x3d'customer-field-select']", function(a) {
            a = $(this).parents("#editor-component").find(".j_showField .j_customer-field-li");
            if (0 < a.length) {
                for (var k = $("#widget-control .field-active").data("componentData"), e = [], c = [], b = 0; b < a.length; b++) {
                    var d = a[b]
                      , f = $(d).find("select").val();
                    e.push(f);
                    d = $(d).find("select option:selected");
                    $(d).hasClass("j_custom_option") && c.push($(d).attr("id") + "_" + $(d).text())
                }
                k.setCusfields(e);
                k.setCusCustomFields(c)
            }
        });
        $(document).off("click", ".j_addcustomerfield").on("click", ".j_addcustomerfield", function(a) {
            var k = $(this).parents("#editor-component");
            a = k.find(".j_showField .j_customer-field-li");
            var e = [];
            if (0 < a.length) {
                e = $(a[0]).find("option");
                if (a.length == e.length) {
                    m.notify("\u4e0d\u80fd\u8d85\u8fc7\u6700\u5927\u7684\u5b57\u6bb5\u4e2a\u6570!");
                    return
                }
                e = $(a[0]).clone();
                k.find(".j_showField .j_customer-field-ul").append(e)
            }
            a = $("#widget-control .field-active").data("componentData");
            for (var k = k.find(".j_showField .j_customer-field-li"), e = [], c = [], b = 0; b < k.length; b++) {
                var d = k[b]
                  , f = $(d).find("select").val();
                e.push(f);
                d = $(d).find("select option:selected");
                $(d).hasClass("j_custom_option") && c.push($(d).attr("id") + "_" + $(d).text())
            }
            a.setCusfields(e);
            a.setCusCustomFields(c)
        });
        $(document).off("click", ".j_delcustomerfield").on("click", ".j_delcustomerfield", function(a) {
            $(this).parent().parent().remove();
            a = $("#editor-component").find(".j_showField .j_customer-field-li");
            var k = $("#widget-control .field-active").data("componentData")
              , e = []
              , c = [];
            if (0 == a.length)
                $("#editor-component").find(".j_showField").addClass("hide"),
                $("#editor-component").find(".j_batch_edit").addClass("hide"),
                $("#editor-component").find(".j_cardConf").removeClass("hide");
            else
                for (var b = 0; b < a.length; b++) {
                    var d = a[b]
                      , f = $(d).find("select").val();
                    e.push(f);
                    d = $(d).find("select option:selected");
                    $(d).hasClass("j_custom_option") && c.push($(d).attr("id") + "_" + $(d).text())
                }
            k.setCusfields(e);
            k.setCusCustomFields(c)
        });
        $(document).on("change", "select[name\x3d'contact-field-select']", function(a) {
            var k = $(this).parents("#editor-component").find(".j_showField .j_contact-field-li");
            if (0 < k.length) {
                a = [];
                for (var e = [], c = 0; c < k.length; c++) {
                    var b = k[c]
                      , d = $(b).find("select").val();
                    a.push(d);
                    b = $(b).find("select option:selected");
                    $(b).hasClass("j_custom_option") && e.push($(b).attr("id") + "_" + $(b).text())
                }
                k = $("#widget-control .field-active").data("componentData");
                k.setShowfields(a);
                k.setCusCustomFields(e)
            }
        });
        $(document).off("click", ".j_addcontactfield").on("click", ".j_addcontactfield", function(a) {
            a = $(this).parents("#editor-component");
            var k = a.find(".j_showField .j_contact-field-li");
            if (0 < k.length) {
                var e = $(k[0]).find("option");
                if (k.length == e.length) {
                    m.notify("\u4e0d\u80fd\u8d85\u8fc7\u6700\u5927\u7684\u5b57\u6bb5\u4e2a\u6570!");
                    return
                }
                k = $(k[0]).clone();
                a.find(".j_showField .j_contact-field-ul").append(k)
            }
            e = a.find(".j_showField .j_contact-field-li");
            a = [];
            for (var k = [], c = 0; c < e.length; c++) {
                var b = e[c]
                  , d = $(b).find("select").val();
                a.push(d);
                b = $(b).find("select option:selected");
                $(b).hasClass("j_custom_option") && k.push($(b).attr("id") + "_" + $(b).text())
            }
            e = $("#widget-control .field-active").data("componentData");
            e.setShowfields(a);
            e.setCusCustomFields(k)
        });
        $(document).off("click", ".j_delcontactfield").on("click", ".j_delcontactfield", function(a) {
            $(this).parent().parent().remove();
            a = $("#editor-component").find(".j_showField .j_contact-field-li");
            var k = $("#widget-control .field-active").data("componentData")
              , e = []
              , c = [];
            if (0 == a.length)
                $("#editor-component").find(".j_showField").addClass("hide"),
                $("#editor-component").find(".j_batch_edit").addClass("hide"),
                $("#editor-component").find(".j_cardConf").removeClass("hide");
            else
                for (var b = 0; b < a.length; b++) {
                    var d = a[b]
                      , f = $(d).find("select").val();
                    e.push(f);
                    d = $(d).find("select option:selected");
                    $(d).hasClass("j_custom_option") && c.push($(d).attr("id") + "_" + $(d).text())
                }
            k.setShowfields(e);
            k.setCusCustomFields(c)
        });
        $(document).on("click", "#editor-component #isLinkCustomer", function(a) {
            var k = $(this).is(":checked");
            a = $("#widget-control .field-active").data("componentData");
            a.setIsLinkCustomer(k);
            $("#editor-component").find(".j_customer_link").empty();
            if (k) {
                var e = $("\x3coption class\x3d'j_option'\x3e\x3c/option\x3e")
                  , k = "";
                (k = 1 == $("#widget-control .field-active").parents("div[componentKey\x3d'DataTable']").length ? $("#widget-control .field-active").parents("div[componentKey\x3d'DataTable']").find("tr div[componentKey\x3d'CustomerComponent']") : $("#widget-control").find("div[componentKey\x3d'CustomerComponent']:not(.subtd_js\x3e.field_js)")) && 0 < k.length ? (k.each(function() {
                    var a = e.clone()
                      , k = $(this).attr("tempId")
                      , c = $(this).find(".widget-title_js").text();
                    a.attr("value", k).text(c);
                    $("#editor-component").find(".j_customer_link").append(a)
                }),
                k = $("#editor-component").find(".j_customer_link").val(),
                a.setRelvCustomer(k)) : (a = e.clone(),
                a.text("\u5bf9\u5e94\u533a\u57df\u65e0\u5ba2\u6237\u63a7\u4ef6!"),
                $("#editor-component").find(".j_customer_link").append(a));
                $("#editor-component").find(".j_customer_link").removeClass("hide")
            } else
                $("#editor-component").find(".j_customer_link").addClass("hide"),
                a.setRelvCustomer(null)
        });
        $(document).on("change", "select[name\x3d'customer_link']", function(a) {
            $(this);
            a = $("#editor-component").find(".j_customer_link").val();
            $("#widget-control .field-active").data("componentData").setRelvCustomer(a)
        });
        $(document).on("change", "#editor-component input:radio[name\x3d'componentType']", function(a) {
            var k = $(this).val();
            a = $("#widget-control .field-active");
            var e = a.data("componentData")
              , k = new window[k];
            k.change({
                oldObj: e,
                changeEl: a
            });
            a.data("componentData", k);
            $(document).trigger("renderEditor", a)
        });
        $(document).on("change", "#editor-component input:radio[name\x3d'combotype']", function(a) {
            a = $(this).val();
            $("#widget-control .field-active").data("componentData").renderType(a)
        });
        $(document).on("click", "#editor-component input:radio[name\x3d'level']", function(a) {
            a = $(this).val();
            $("#widget-control .field-active").data("componentData").setComponentLevel(a)
        });
        $(document).on("change", "input:radio[name\x3d'data-frozen']", function(a) {
            a = $(this).val();
            $("#widget-control .field-active").data("componentData").setFrozenColumn(a)
        });
        $(document).on("change", "#editor-component ul li .option_js", function(a) {
            a = $("#widget-control .field-active").data("componentData");
            var k = a.componentSetup.componentKey;
            "CheckBox" != k && "ImageCheckBox" != k && $(this).closest("li").siblings().find(".option_js").prop("checked", !1);
            "Select" == k && null != a.componentSetup.templateId && "" != a.componentSetup.templateId && a.setDetailDefaultId($(this).val());
            l.changeFormOption()
        });
        $(document).on("click", "#editor-component .j_comboselect_tab", function(a) {
            var k = $(this);
            k.addClass("active").siblings().removeClass("active");
            a = $("#widget-control .field-active").data("componentData");
            k = k.attr("index");
            a.renderOpt(k)
        });
        $(document).on("change", "#editor-component ul li .combo_option_js", function(a) {
            $("#widget-control .field-active").data("componentData").changeDefault($(this))
        });
        $(document).on("change", "#editor-component .j_comboBatcOther input", function(a) {
            $("#widget-control .field-active").data("componentData").batchEditorOther($(this))
        });
        $(document).on("change", "#editor-component .j_comboselect_active", function(a) {
            a = $("#widget-control .field-active").data("componentData");
            var k = $(this).find("option:selected").data("option")
              , e = $("#editor-component").find(".combo_ul_js").html("");
            $("#editor-component").find(".btn-default_js").parent().show();
            for (var c = 0; c < k.children.length; c++) {
                var b = new Option(k.children[c]);
                b.renderEditor(e, a);
                "true" != b.componentSetup.other && 1 != b.componentSetup.other || $("#editor-component").find(".btn-default_js").parent().hide()
            }
        });
        $(document).on("change", ".j_comboselect_one select", function(a) {
            a = $(this);
            if (!a.hasClass("j_comboselect_active")) {
                $("#widget-control .field-active").data("componentData");
                a = a.find("option:selected").data("option");
                $select = $("#editor-component").find(".j_comboselect_two select").html("");
                for (var k = 0; k < a.children.length; k++) {
                    var e = a.children[k];
                    "false" != e.other && 0 != e.other || $select.append($("\x3coption\x3e" + e.name + "\x3c/option\x3e").data("option", e))
                }
                $select.change()
            }
        });
        $(document).on("keydown", "#editor-component ul li .optionName_js", function(a) {
            a = $(this).val();
            var k = $(this).parent()
              , k = $("#editor-component ul li").index(k)
              , e = $("#widget-control .field-active").data("componentData");
            "Select" == e.componentSetup.componentKey ? $("#widget-control .field-active .choicelist_js option").eq(k + 1).text(a) : $("#widget-control .field-active .choicelist_js li").eq(k).find("span").text(a);
            e.componentSetup.options[k].name = a
        });
        $(document).on("keyup", "#editor-component ul li .optionName_js", function(a) {
            a = $(this).val();
            var k = $(this).parent()
              , k = $("#editor-component ul li").index(k)
              , e = $("#widget-control .field-active").data("componentData");
            "Select" == e.componentSetup.componentKey ? $("#widget-control .field-active .choicelist_js select option").eq(k).text(a) : $("#widget-control .field-active .choicelist_js li").eq(k).find("span").text(a);
            e.componentSetup.options[k].name = a
        });
        $(document).on("change", "#editor-component ul li .combo_optionName_js", function(a) {
            var k = $.trim($(this).val());
            a = $.trim($(this).attr("value"));
            var e = $("#widget-control .field-active").data("componentData");
            $(this).closest("ul");
            var c = $(this).closest("li").siblings("li");
            if ("" == k || null == k) {
                for (var k = $(this).closest(".combo_ul_js").children(".ComboSelect_js"), b = c = 0; b < k.length; b++) {
                    var d = $(k[b]).find(".combo_optionName_js").eq(0).val().trim();
                    "" != d && null != d || c++
                }
                c == k.length && (m.notify("\u9009\u9879\u540d\u79f0\u4e0d\u80fd\u5168\u90e8\u4e3a\u7a7a!"),
                $(this).val(a),
                e.changeOpt($(this).closest(".choicelistEdit_js")),
                $(this).focus())
            } else {
                for (b = 0; b < c.length; b++)
                    if (d = $(c[b]),
                    d = $.trim(d.find(".combo_optionName_js").attr("value")),
                    k == d) {
                        m.notify("\u9009\u9879\u4e0d\u80fd\u91cd\u540d!");
                        $(this).val(a);
                        e.changeOpt($(this).closest(".choicelistEdit_js"));
                        $(this).focus();
                        return
                    }
                $(this).attr("value", k);
                e.changeOpt($(this).closest(".choicelistEdit_js"))
            }
        });
        $(document).on("blur", "#editor-component ul li .optionName_js", function(a) {
            a = $.trim($(this).attr("value"));
            var k = $("#widget-control .field-active").data("componentData")
              , e = $(this).parent()
              , c = $("#editor-component ul li").index(e)
              , b = $.trim($(this).val());
            if ("" == b || null == b) {
                for (var b = k.componentSetup.options, d = 0, f = 0; f < b.length; f++) {
                    var l = b[f];
                    1 != l.other && "true" != l.other && "" == l.name.trim() && d++
                }
                d == e.parent().find("." + k.componentSetup.componentKey + "_js").length && (m.notify("\u9009\u9879\u540d\u79f0\u4e0d\u80fd\u5168\u90e8\u4e3a\u7a7a!"),
                f = $("#widget-control .field-active .choicelist_js li").eq(c),
                f.find("span").text(a),
                k.componentSetup.options[c].name = a,
                $(this).val(a))
            } else {
                e = $(this).parents(".choicelistEdit_js").find("li:not(:eq(" + c + "))");
                for (f = 0; f < e.length; f++)
                    if (d = $(e[f]),
                    d = $.trim(d.find(".optionName_js").attr("value")),
                    b == d) {
                        m.notify("\u9009\u9879\u4e0d\u80fd\u91cd\u540d!");
                        $(this).val(a);
                        "Select" != k.componentSetup.componentKey && (f = $("#widget-control .field-active .choicelist_js li").eq(c),
                        f.find("span").text(a),
                        k.componentSetup.options[c].name = a);
                        return
                    }
                $(this).attr("value", b)
            }
        });
        $(document).on("change", "#editor-component input:radio[name\x3d'layout']", function(a) {
            a = $(this).val();
            var k = $("#widget-control .field-active .choicelist_js ")
              , e = $("#widget-control .field-active").data("componentData");
            k.attr("class", "choicelist choicelist_js " + a);
            e.setLayout(a)
        });
        $(document).on("click", "#editor-component .btn-default_js", function(a) {
            a = $(this);
            a.parent().hide();
            var k = $("#widget-control .field-active").data("componentData")
              , e = new Option;
            e.setName("\u5176\u4ed6");
            e.setOther(!0);
            var c = null;
            "ComboSelect" == k.componentSetup.componentKey ? (c = $("#editor-component .combo_ul_js"),
            e.renderEditor(c, k),
            k.changeOpt(a.closest(".choicelistEdit_js"))) : (c = $("#editor-component .choicelistEdit_js"),
            e.renderEditor(c, k),
            l.changeFormOption())
        });
        $(document).on("click", "#editor-component .choicelistEdit_js .minusoption_js", function(a) {
            a = $(this).closest("li");
            var k = $("#widget-control .field-active").data("componentData");
            if (0 == a.siblings("li").not(".otherOption_js").length)
                m.notify("\u6700\u540e\u4e00\u9879\u4e0d\u80fd\u5220\u9664");
            else if ("ComboSelect" == k.componentSetup.componentKey) {
                if ($(this).closest("ul").hasClass("combo_ul_js")) {
                    for (var e = $(this).closest("li").find(".combo_optionName_js").eq(0).val(), c = $(this).closest("li").siblings(".ComboSelect_js"), b = !0, d = 0; d < c.length; d++) {
                        var f = $(c[d]).find(".combo_optionName_js").eq(0).val();
                        if ("" != f && null != f) {
                            b = !1;
                            break
                        }
                    }
                    if (b && e) {
                        m.notify("\u6700\u540e\u4e00\u4e2a\u975e\u7a7a\u9009\u9879\u4e0d\u80fd\u5220\u9664");
                        return
                    }
                }
                a.hasClass("otherOption_js") && a.closest(".choicelistEdit_js").find(".btn-default_js").parent().show();
                e = a.closest(".choicelistEdit_js");
                a.remove();
                k.changeOpt(e)
            } else {
                e = a.find(".optionName_js").val();
                k = a.siblings("li");
                b = !0;
                for (d = 0; d < k.length; d++)
                    if (c = $(k[d]),
                    "" != c.find(".optionName_js").val() && null != c.find(".optionName_js").val()) {
                        b = !1;
                        break
                    }
                b && e ? m.notify("\u6700\u540e\u4e00\u4e2a\u975e\u7a7a\u9009\u9879\u4e0d\u80fd\u5220\u9664") : (a.hasClass("otherOption_js") && $("#editor-component .btn-default_js").parent().show(),
                a.remove(),
                l.changeFormOption())
            }
        });
        $(document).on("click", "#editor-component .choicelistEdit_js .plusoption_js", function(a) {
            var k = $("#widget-control .field-active").data("componentData");
            if ("ComboSelect" == k.componentSetup.componentKey) {
                var e = $(this).closest("li");
                a = k.componentSetup.selects.length - parseInt($("#editor-component .j_comboselect-tabs .active").attr("index"));
                var c = function(a, e, b) {
                    var d = new Option;
                    d.setName(a);
                    d.setOrder(e);
                    d.setFieldId(k.componentSetup.selectIds[k.componentSetup.selects.length - b]);
                    1 < b && (a = [c(("" == a ? "\u9009\u9879" : d.componentSetup.name) + 1, 0, b - 1)],
                    d.setChildren(a));
                    return d.componentSetup
                };
                a = new Option(c("", e.index() + 1, a));
                a.renderEditor(null, k, e);
                k.changeOpt($(this).closest(".choicelistEdit_js"))
            } else {
                var e = $("#editor-component .choicelistEdit_js")
                  , b = e.find(".otherOption_js");
                e.remove(".otherOption_js");
                a = new Option;
                a.renderEditor(e, k, $(this).parents("li"));
                e.append(b);
                l.changeFormOption()
            }
        });
        $(document).on("mouseenter", "#editor-component .choicelistEdit_js li", function(a) {
            $(this).css("cursor", "move")
        });
        $(document).on("change", "input:radio[name\x3d'dividingLineType']", function(a) {
            a = $(this).val();
            $("#widget-control .field-active .divider-line").attr("class", "divider-line " + a);
            $("#widget-control .field-active").data("componentData").setType(a)
        });
        $(document).on("change", "input:radio[name\x3d'paragraphType']", function(a) {
            a = $(this).val();
            var k = $("#widget-control .field-active .paragraph").attr("class").toString()
              , k = k.substring(0, 15) + " " + a;
            $("#widget-control .field-active .paragraph").attr("class", k);
            $("#widget-control .field-active").data("componentData").setStyle(a)
        });
        $(document).on("change", "input:radio[name\x3d'dateFormat']", function(a) {
            a = $(this).val();
            var k = $("#widget-control .field-active").data("componentData")
              , e = "";
            "yyyy-MM-dd" == a ? e = "\u5e74-\u6708-\u65e5" : "yyyy-MM" == a ? e = "\u5e74-\u6708" : "yyyy-MM-dd HH:mm" == a && (e = "\u5e74-\u6708-\u65e5 \u65f6:\u5206");
            $(document).find(".j_earlyContent").addClass("hide");
            $(document).find(".j_latestContent").addClass("hide");
            l.resetDateCheckRule(k, a, !0, !0);
            $("#widget-control .field-active .form-control").attr("placeholder", e);
            k.setFormat(a)
        });
        $(document).on("click", "#editor-component #systemDate", function(a) {
            a = $(this).is(":checked");
            $("#widget-control .field-active").data("componentData").setIsSystemDate(a)
        });
        $(document).on("click", "#editor-component #readonly", function(a) {
            a = $(this).is(":checked");
            $("#widget-control .field-active").data("componentData").setIsReadonly(a)
        });
        $(document).on("click", "#editor-component #earlyDate", function(a) {
            a = $(this).is(":checked");
            var k = $("#widget-control .field-active").data("componentData")
              , e = k.componentSetup.componentKey
              , c = "";
            "DateComponent" == e ? (c = k.componentSetup.format,
            null == k.componentSetup.earlyType && l.resetDateCheckRule(k, c, !0, !1)) : "DateInterval" == e && (c = k.componentSetup.start.format,
            null == k.componentSetup.start.earlyType && l.resetDateCheckRule(k, c, !0, !1));
            1 == a || "true" == a ? ($(this).prop("checked", !0),
            "DateComponent" == e ? k.setEarlyDate(!0) : "DateInterval" == e && (k.componentSetup.start.earlyDate = !0,
            k.componentSetup.end.earlyDate = !0),
            $(document).find(".j_earlyContent").removeClass("hide"),
            $(document).find("#editor-component #latestDate").is(":checked") && ("currentDay" == $(document).find(".j_latestContent select").val() ? $(document).find(".j_earlyContent").find("select").find('option[value\x3d"currentDayAfter"]').addClass("hide") : "currentHour" == $(document).find(".j_latestContent select").val() ? $(document).find(".j_earlyContent").find("select").find('option[value\x3d"currentHourAfter"]').addClass("hide") : "currentMonth" == $(document).find(".j_latestContent select").val() ? $(document).find(".j_earlyContent").find("select").find('option[value\x3d"currentMonthAfter"]').addClass("hide") : "currentDayBefore" == $(document).find(".j_latestContent select").val() ? ($(document).find(".j_earlyContent").find("select").find('option[value\x3d"currentDay"]').addClass("hide"),
            $(document).find(".j_earlyContent").find("select").find('option[value\x3d"currentDayAfter"]').addClass("hide"),
            $(document).find(".j_earlyContent").find("select").find('option[value\x3d"currentDayBefore"]').prop("selected", !0),
            $(document).find(".j_earlyContent").find(".j_beforeOrAfterNum").removeClass("hide")) : "currentHourBefore" == $(document).find(".j_latestContent select").val() ? ($(document).find(".j_earlyContent").find("select").find('option[value\x3d"currentHour"]').addClass("hide"),
            $(document).find(".j_earlyContent").find("select").find('option[value\x3d"currentHourAfter"]').addClass("hide"),
            $(document).find(".j_earlyContent").find("select").find('option[value\x3d"currentHourBefore"]').prop("selected", !0),
            $(document).find(".j_earlyContent").find(".j_beforeOrAfterNum").removeClass("hide")) : "currentMonthBefore" == $(document).find(".j_latestContent select").val() && ($(document).find(".j_earlyContent").find("select").find('option[value\x3d"currentMonth"]').addClass("hide"),
            $(document).find(".j_earlyContent").find("select").find('option[value\x3d"currentMonthAfter"]').addClass("hide"),
            $(document).find(".j_earlyContent").find("select").find('option[value\x3d"currentMonthBefore"]').prop("selected", !0),
            $(document).find(".j_earlyContent").find(".j_beforeOrAfterNum").removeClass("hide")))) : ($(this).prop("checked", !1),
            "DateComponent" == e ? (k.setEarlyDate(!1),
            c = k.componentSetup.format) : "DateInterval" == e && (k.componentSetup.start.earlyDate = !1,
            k.componentSetup.end.earlyDate = !1,
            c = k.componentSetup.start.format),
            $(document).find(".j_earlyContent").addClass("hide"),
            l.resetDateCheckRule(k, c, !0, !1))
        });
        $(document).on("click", "#editor-component #latestDate", function(a) {
            a = $(this).is(":checked");
            var k = $("#widget-control .field-active").data("componentData")
              , e = k.componentSetup.componentKey
              , c = "";
            "DateComponent" == e ? (c = k.componentSetup.format,
            null == k.componentSetup.lateType && l.resetDateCheckRule(k, c, !1, !0)) : "DateInterval" == e && (c = k.componentSetup.start.format,
            null == k.componentSetup.start.lateType && l.resetDateCheckRule(k, c, !1, !0));
            1 == a || "true" == a ? ($(this).prop("checked", !0),
            "DateComponent" == e ? k.setLateDate(!0) : "DateInterval" == e && (k.componentSetup.start.lateDate = !0,
            k.componentSetup.end.lateDate = !0),
            $(document).find(".j_latestContent").removeClass("hide"),
            $(document).find("#editor-component #earlyDate").is(":checked") && ("currentDay" == $(document).find(".j_earlyContent select").val() ? $(document).find(".j_latestContent").find("select").find('option[value\x3d"currentDayBefore"]').addClass("hide") : "currentHour" == $(document).find(".j_earlyContent select").val() ? $(document).find(".j_latestContent").find("select").find('option[value\x3d"currentHourBefore"]').addClass("hide") : "currentMonth" == $(document).find(".j_earlyContent select").val() ? $(document).find(".j_latestContent").find("select").find('option[value\x3d"currentMonthBefore"]').addClass("hide") : "currentDayAfter" == $(document).find(".j_earlyContent select").val() ? ($(document).find(".j_latestContent").find("select").find('option[value\x3d"currentDay"]').addClass("hide"),
            $(document).find(".j_latestContent").find("select").find('option[value\x3d"currentDayBefore"]').addClass("hide"),
            $(document).find(".j_latestContent").find("select").find('option[value\x3d"currentDayAfter"]').prop("selected", !0),
            $(document).find(".j_latestContent").find(".j_beforeOrAfterNum").removeClass("hide")) : "currentHourAfter" == $(document).find(".j_earlyContent select").val() ? ($(document).find(".j_latestContent").find("select").find('option[value\x3d"currentHour"]').addClass("hide"),
            $(document).find(".j_latestContent").find("select").find('option[value\x3d"currentHourBefore"]').addClass("hide"),
            $(document).find(".j_latestContent").find("select").find('option[value\x3d"currentHourAfter"]').prop("selected", !0),
            $(document).find(".j_latestContent").find(".j_beforeOrAfterNum").removeClass("hide")) : "currentMonthAfter" == $(document).find(".j_earlyContent select").val() && ($(document).find(".j_latestContent").find("select").find('option[value\x3d"currentMonth"]').addClass("hide"),
            $(document).find(".j_latestContent").find("select").find('option[value\x3d"currentMonthBefore"]').addClass("hide"),
            $(document).find(".j_latestContent").find("select").find('option[value\x3d"currentMonthAfter"]').prop("selected", !0),
            $(document).find(".j_latestContent").find(".j_beforeOrAfterNum").removeClass("hide")))) : ($(this).prop("checked", !1),
            "DateComponent" == e ? (k.setLateDate(!1),
            c = k.componentSetup.format) : "DateInterval" == e && (k.componentSetup.start.lateDate = !1,
            k.componentSetup.end.lateDate = !1,
            c = k.componentSetup.start.format),
            $(document).find(".j_latestContent").addClass("hide"),
            l.resetDateCheckRule(k, c, !1, !0))
        });
        $(document).on("change", ".j_earlyContent select", function(a) {
            a = $(this).val();
            var k = $("#widget-control .field-active").data("componentData")
              , e = k.componentSetup.componentKey
              , c = "";
            "DateComponent" == e ? (k.setEarlyType(a),
            c = k.componentSetup.format) : "DateInterval" == e && (k.componentSetup.start.earlyType = a,
            k.componentSetup.end.earlyType = a,
            c = k.componentSetup.start.format);
            var b = $(document).find(".j_earlyContent")
              , d = $(document).find(".j_latestContent");
            "specified" == a && (b.find(".j_specDate").removeClass("hide"),
            b.find(".j_beforeOrAfterNum").addClass("hide"));
            if ("currentDayBefore" == a || "currentDayAfter" == a || "currentMonthBefore" == a || "currentMonthAfter" == a || "currentHourBefore" == a || "currentHourAfter" == a)
                b.find(".j_specDate").addClass("hide"),
                b.find(".j_beforeOrAfterNum").removeClass("hide");
            if ("currentDayAfter" == a || "currentMonthAfter" == a || "currentHourAfter" == a)
                if ("yyyy-MM-dd HH:mm" == c || "YYYY-MM-DD HH:mm:ss" == c || "YYYY-MM-DD HH:mm" == c) {
                    if (d.find("select").find('option[value\x3d"currentHour"]').addClass("hide"),
                    d.find("select").find('option[value\x3d"currentHourBefore"]').addClass("hide"),
                    "currentHourBefore" == d.find("select").val() || "currentHour" == d.find("select").val())
                        d.find("select").find('option[value\x3d"currentHourAfter"]').prop("selected", !0),
                        d.find(".j_beforeOrAfterNum").removeClass("hide"),
                        "DateComponent" == e ? (k.setLateType("currentHourAfter"),
                        k.setLateAfterHour(d.find(".j_beforeOrAfterNum").val().trim())) : "DateInterval" == e && (k.componentSetup.start.lateType = "currentHourAfter",
                        k.componentSetup.end.lateType = "currentHourAfter",
                        k.componentSetup.start.lateAfterHour = d.find(".j_beforeOrAfterNum").val().trim(),
                        k.componentSetup.end.lateAfterHour = d.find(".j_beforeOrAfterNum").val().trim())
                } else if ("yyyy-MM-dd" == c || "HH:mm:ss" == c || "YYYY-MM-DD" == c) {
                    if (d.find("select").find('option[value\x3d"currentDay"]').addClass("hide"),
                    d.find("select").find('option[value\x3d"currentDayBefore"]').addClass("hide"),
                    "currentDayBefore" == d.find("select").val() || "currentDay" == d.find("select").val())
                        d.find("select").find('option[value\x3d"currentDayAfter"]').prop("selected", !0),
                        d.find(".j_beforeOrAfterNum").removeClass("hide"),
                        "DateComponent" == e ? (k.setLateType("currentDayAfter"),
                        k.setLateAfterDay(d.find(".j_beforeOrAfterNum").val().trim())) : "DateInterval" == e && (k.componentSetup.start.lateType = "currentDayAfter",
                        k.componentSetup.end.lateType = "currentDayAfter",
                        k.componentSetup.start.lateAfterDay = d.find(".j_beforeOrAfterNum").val().trim(),
                        k.componentSetup.end.lateAfterDay = d.find(".j_beforeOrAfterNum").val().trim())
                } else {
                    if ("yyyy-MM" == c || "YYYY-MM" == c)
                        if (d.find("select").find('option[value\x3d"currentMonth"]').addClass("hide"),
                        d.find("select").find('option[value\x3d"currentMonthBefore"]').addClass("hide"),
                        "currentMonthBefore" == d.find("select").val() || "currentMonth" == d.find("select").val())
                            d.find("select").find('option[value\x3d"currentMonthAfter"]').prop("selected", !0),
                            d.find(".j_beforeOrAfterNum").removeClass("hide"),
                            "DateComponent" == e ? (k.setLateType("currentMonthAfter"),
                            k.setLateAfterMonth(d.find(".j_beforeOrAfterNum").val().trim())) : "DateInterval" == e && (k.componentSetup.start.lateType = "currentMonthAfter",
                            k.componentSetup.end.lateType = "currentMonthAfter",
                            k.componentSetup.start.lateAfterMonth = d.find(".j_beforeOrAfterNum").val().trim(),
                            k.componentSetup.end.lateAfterMonth = d.find(".j_beforeOrAfterNum").val().trim())
                }
            else if ("yyyy-MM-dd HH:mm" == c || "YYYY-MM-DD HH:mm:ss" == c || "YYYY-MM-DD HH:mm" == c)
                d.find("select").find('option[value\x3d"currentHour"]').removeClass("hide"),
                d.find("select").find('option[value\x3d"currentHourBefore"]').removeClass("hide");
            else if ("yyyy-MM-dd" == c || "HH:mm:ss" == c || "YYYY-MM-DD" == c)
                d.find("select").find('option[value\x3d"currentDay"]').removeClass("hide"),
                d.find("select").find('option[value\x3d"currentDayBefore"]').removeClass("hide");
            else if ("yyyy-MM" == c || "YYYY-MM" == c)
                d.find("select").find('option[value\x3d"currentMonth"]').removeClass("hide"),
                d.find("select").find('option[value\x3d"currentMonthBefore"]').removeClass("hide");
            if ("currentDay" == a || "currentMonth" == a || "currentHour" == a)
                if (b.find(".j_specDate").addClass("hide"),
                b.find(".j_beforeOrAfterNum").addClass("hide"),
                "yyyy-MM-dd HH:mm" == c || "YYYY-MM-DD HH:mm:ss" == c || "YYYY-MM-DD HH:mm" == c)
                    d.find("select").find('option[value\x3d"currentHourBefore"]').addClass("hide"),
                    "currentHourBefore" == d.find("select").val() && (d.find("select").find('option[value\x3d"currentHourAfter"]').prop("selected", !0),
                    "DateComponent" == e ? (k.setLateType("currentHourAfter"),
                    k.setLateAfterHour(d.find(".j_beforeOrAfterNum").val().trim())) : "DateInterval" == e && (k.componentSetup.start.lateType = "currentHourAfter",
                    k.componentSetup.end.lateType = "currentHourAfter",
                    k.componentSetup.start.lateAfterHour = d.find(".j_beforeOrAfterNum").val().trim(),
                    k.componentSetup.end.lateAfterHour = d.find(".j_beforeOrAfterNum").val().trim()));
                else if ("yyyy-MM-dd" == c || "HH:mm:ss" == c || "YYYY-MM-DD" == c)
                    d.find("select").find('option[value\x3d"currentDayBefore"]').addClass("hide"),
                    "currentDayBefore" == d.find("select").val() && (d.find("select").find('option[value\x3d"currentDayAfter"]').prop("selected", !0),
                    "DateComponent" == e ? (k.setLateType("currentDayAfter"),
                    k.setLateAfterDay(d.find(".j_beforeOrAfterNum").val().trim())) : "DateInterval" == e && (k.componentSetup.start.lateType = "currentDayAfter",
                    k.componentSetup.end.lateType = "currentDayAfter",
                    k.componentSetup.start.lateAfterDay = d.find(".j_beforeOrAfterNum").val().trim(),
                    k.componentSetup.end.lateAfterDay = d.find(".j_beforeOrAfterNum").val().trim()));
                else if ("yyyy-MM" == c || "YYYY-MM" == c)
                    d.find("select").find('option[value\x3d"currentMonthBefore"]').addClass("hide"),
                    "currentMonthBefore" == d.find("select").val() && (d.find("select").find('option[value\x3d"currentMonthAfter"]').prop("selected", !0),
                    "DateComponent" == e ? (k.setLateType("currentMonthAfter"),
                    k.setLateAfterMonth(d.find(".j_beforeOrAfterNum").val().trim())) : "DateInterval" == e && (k.componentSetup.start.lateType = "currentMonthAfter",
                    k.componentSetup.end.lateType = "currentMonthAfter",
                    k.componentSetup.start.lateAfterMonth = d.find(".j_beforeOrAfterNum").val().trim(),
                    k.componentSetup.end.lateAfterMonth = d.find(".j_beforeOrAfterNum").val().trim()));
            "currentDayBefore" == a && (b.find(".j_beforeOrAfterNum input").val(""),
            "DateComponent" == e ? k.setEarlyBeforeDay("") : "DateInterval" == e && (k.componentSetup.start.earlyBeforeDay = "",
            k.componentSetup.end.earlyBeforeDay = ""));
            "currentHourBefore" == a && (b.find(".j_beforeOrAfterNum input").val(""),
            "DateComponent" == e ? k.setEarlyBeforeHour("") : "DateInterval" == e && (k.componentSetup.start.earlyBeforeHour = "",
            k.componentSetup.end.earlyBeforeHour = ""));
            "currentMonthBefore" == a && (b.find(".j_beforeOrAfterNum input").val(""),
            "DateComponent" == e ? k.setEarlyBeforeMonth("") : "DateInterval" == e && (k.componentSetup.start.earlyBeforeMonth = "",
            k.componentSetup.end.earlyBeforeMonth = ""));
            "currentDayAfter" == a && (b.find(".j_beforeOrAfterNum input").val(""),
            "DateComponent" == e ? k.setEarlyAfterDay("") : "DateInterval" == e && (k.componentSetup.start.earlyAfterDay = "",
            k.componentSetup.end.earlyAfterDay = ""));
            "currentHourAfter" == a && (b.find(".j_beforeOrAfterNum input").val(""),
            "DateComponent" == e ? k.setEarlyAfterHour("") : "DateInterval" == e && (k.componentSetup.start.earlyAfterHour = "",
            k.componentSetup.end.earlyAfterHour = ""));
            "currentMonthAfter" == a && (b.find(".j_beforeOrAfterNum input").val(""),
            "DateComponent" == e ? k.setEarlyAfterMonth("") : "DateInterval" == e && (k.componentSetup.start.earlyAfterMonth = "",
            k.componentSetup.end.earlyAfterMonth = ""))
        });
        $(document).on("change", ".j_latestContent select", function(a) {
            a = $(this).val();
            var k = $("#widget-control .field-active").data("componentData")
              , e = k.componentSetup.componentKey
              , c = "";
            "DateComponent" == e ? (k.setLateType(a),
            c = k.componentSetup.format) : "DateInterval" == e && (k.componentSetup.start.lateType = a,
            k.componentSetup.end.lateType = a,
            c = k.componentSetup.start.format);
            var b = $(document).find(".j_earlyContent")
              , d = $(document).find(".j_latestContent");
            "specified" == a && (d.find(".j_specDate").removeClass("hide"),
            d.find(".j_beforeOrAfterNum").addClass("hide"));
            if ("currentDay" == a || "currentMonth" == a || "currentHour" == a)
                d.find(".j_specDate").addClass("hide"),
                d.find(".j_beforeOrAfterNum").addClass("hide");
            if ("currentDayBefore" == a || "currentDayAfter" == a || "currentMonthBefore" == a || "currentMonthAfter" == a || "currentHourBefore" == a || "currentHourAfter" == a)
                d.find(".j_specDate").addClass("hide"),
                d.find(".j_beforeOrAfterNum").removeClass("hide");
            if ("currentDayBefore" == a || "currentMonthBefore" == a || "currentHourBefore" == a)
                if ("yyyy-MM-dd HH:mm" == c || "YYYY-MM-DD HH:mm:ss" == c || "YYYY-MM-DD HH:mm" == c) {
                    if (b.find("select").find('option[value\x3d"currentHour"]').addClass("hide"),
                    b.find("select").find('option[value\x3d"currentHourAfter"]').addClass("hide"),
                    "currentHourAfter" == b.find("select").val() || "currentHour" == b.find("select").val())
                        b.find("select").find('option[value\x3d"currentHourBefore"]').prop("selected", !0),
                        b.find(".j_beforeOrAfterNum").removeClass("hide"),
                        "DateComponent" == e ? (k.setEarlyType("currentHourBefore"),
                        k.setEarlyBeforeHour(b.find(".j_beforeOrAfterNum").val().trim())) : "DateInterval" == e && (k.componentSetup.start.earlyType = "currentHourBefore",
                        k.componentSetup.end.earlyType = "currentHourBefore",
                        k.componentSetup.start.earlyBeforeHour = b.find(".j_beforeOrAfterNum").val().trim(),
                        k.componentSetup.end.earlyBeforeHour = b.find(".j_beforeOrAfterNum").val().trim())
                } else if ("yyyy-MM-dd" == c || "HH:mm:ss" == c || "YYYY-MM-DD" == c) {
                    if (b.find("select").find('option[value\x3d"currentDay"]').addClass("hide"),
                    b.find("select").find('option[value\x3d"currentDayAfter"]').addClass("hide"),
                    "currentDayAfter" == b.find("select").val() || "currentDay" == b.find("select").val())
                        b.find("select").find('option[value\x3d"currentDayBefore"]').prop("selected", !0),
                        b.find(".j_beforeOrAfterNum").removeClass("hide"),
                        "DateComponent" == e ? (k.setEarlyType("currentDayBefore"),
                        k.setEarlyBeforeDay(b.find(".j_beforeOrAfterNum").val().trim())) : "DateInterval" == e && (k.componentSetup.start.earlyType = "currentDayBefore",
                        k.componentSetup.end.earlyType = "currentDayBefore",
                        k.componentSetup.start.earlyBeforeDay = b.find(".j_beforeOrAfterNum").val().trim(),
                        k.componentSetup.end.earlyBeforeDay = b.find(".j_beforeOrAfterNum").val().trim())
                } else {
                    if ("yyyy-MM" == c || "YYYY-MM" == c)
                        if (b.find("select").find('option[value\x3d"currentMonth"]').addClass("hide"),
                        b.find("select").find('option[value\x3d"currentMonthAfter"]').addClass("hide"),
                        "currentMonthAfter" == b.find("select").val() || "currentMonth" == b.find("select").val())
                            b.find("select").find('option[value\x3d"currentMonthBefore"]').prop("selected", !0),
                            b.find(".j_beforeOrAfterNum").removeClass("hide"),
                            "DateComponent" == e ? (k.setEarlyType("currentMonthBefore"),
                            k.setEarlyBeforeMonth(b.find(".j_beforeOrAfterNum").val().trim())) : "DateInterval" == e && (k.componentSetup.start.earlyType = "currentMonthBefore",
                            k.componentSetup.end.earlyType = "currentMonthBefore",
                            k.componentSetup.start.earlyBeforeMonth = b.find(".j_beforeOrAfterNum").val().trim(),
                            k.componentSetup.end.earlyBeforeMonth = b.find(".j_beforeOrAfterNum").val().trim())
                }
            else if ("yyyy-MM-dd HH:mm" == c || "YYYY-MM-DD HH:mm:ss" == c || "YYYY-MM-DD HH:mm" == c)
                b.find("select").find('option[value\x3d"currentHour"]').removeClass("hide"),
                b.find("select").find('option[value\x3d"currentHourAfter"]').removeClass("hide");
            else if ("yyyy-MM-dd" == c || "HH:mm:ss" == c || "YYYY-MM-DD" == c)
                b.find("select").find('option[value\x3d"currentDay"]').removeClass("hide"),
                b.find("select").find('option[value\x3d"currentDayAfter"]').removeClass("hide");
            else if ("yyyy-MM" == c || "YYYY-MM" == c)
                b.find("select").find('option[value\x3d"currentMonth"]').removeClass("hide"),
                b.find("select").find('option[value\x3d"currentMonthAfter"]').removeClass("hide");
            "currentDayBefore" == a && (d.find(".j_beforeOrAfterNum input").val(""),
            "DateComponent" == e ? k.setLateBeforeDay("") : "DateInterval" == e && (k.componentSetup.start.lateBeforeDay = "",
            k.componentSetup.end.lateBeforeDay = ""));
            "currentHourBefore" == a && (d.find(".j_beforeOrAfterNum input").val(""),
            "DateComponent" == e ? k.setLateBeforeHour("") : "DateInterval" == e && (k.componentSetup.start.lateBeforeHour = "",
            k.componentSetup.end.lateBeforeHour = ""));
            "currentMonthBefore" == a && (d.find(".j_beforeOrAfterNum input").val(""),
            "DateComponent" == e ? k.setLateBeforeMonth("") : "DateInterval" == e && (k.componentSetup.start.lateBeforeMonth = "",
            k.componentSetup.end.lateBeforeMonth = ""));
            "currentDayAfter" == a && (d.find(".j_beforeOrAfterNum input").val(""),
            "DateComponent" == e ? k.setLateAfterDay("") : "DateInterval" == e && (k.componentSetup.start.lateAfterDay = "",
            k.componentSetup.end.lateAfterDay = ""));
            "currentHourAfter" == a && (d.find(".j_beforeOrAfterNum input").val(""),
            "DateComponent" == e ? k.setLateAfterHour("") : "DateInterval" == e && (k.componentSetup.start.lateAfterHour = "",
            k.componentSetup.end.lateAfterHour = ""));
            "currentMonthAfter" == a && (d.find(".j_beforeOrAfterNum input").val(""),
            "DateComponent" == e ? k.setLateAfterMonth("") : "DateInterval" == e && (k.componentSetup.start.lateAfterMonth = "",
            k.componentSetup.end.lateAfterMonth = ""))
        });
        $(document).off("click", ".j_earlyContent .j_specDate input,.j_latestContent .j_specDate input").on("click", ".j_earlyContent .j_specDate input,.j_latestContent .j_specDate input", function(a) {
            a = $(this);
            var k = ""
              , e = ""
              , c = "";
            0 < a.parents(".j_latestContent").length ? (k = "late",
            e = $(document).find(".j_earlyContent .j_specDate input").val().trim()) : 0 < a.parents(".j_earlyContent").length && (k = "early",
            c = $(document).find(".j_latestContent .j_specDate input").val().trim());
            var b = $("#widget-control .field-active").data("componentData")
              , d = b.componentSetup.componentKey
              , f = "";
            "DateComponent" == d ? f = b.componentSetup.format : "DateInterval" == d && (f = b.componentSetup.start.format);
            var l = ""
              , g = ""
              , h = ""
              , x = ""
              , C = new Date;
            if ("yyyy-MM-dd HH:mm" == f || "YYYY-MM-DD HH:mm:ss" == f || "YYYY-MM-DD HH:mm" == f)
                l = "yyyy-mm-dd hh:ii",
                g = Date.create(C).format("{yyyy}-{MM}-{dd} {HH}:{mm}"),
                h = Date.create(C.setDate(C.getDate() + 1)).format("{yyyy}-{MM}-{dd} {HH}:{mm}"),
                x = Date.create(C.setDate(C.getDate() + 7)).format("{yyyy}-{MM}-{dd} {HH}:{mm}");
            else if ("yyyy-MM-dd" == f || "HH:mm:ss" == f || "YYYY-MM-DD" == f)
                l = "yyyy-mm-dd",
                g = Date.create(C).format("{yyyy}-{MM}-{dd}"),
                h = Date.create(C.setDate(C.getDate() + 1)).format("{yyyy}-{MM}-{dd}"),
                x = Date.create(C.setDate(C.getDate() + 7)).format("{yyyy}-{MM}-{dd}");
            else if ("yyyy-MM" == f || "YYYY-MM" == f)
                l = "yyyy-mm",
                g = Date.create(C).format("{yyyy}-{MM}"),
                h = Date.create(C.setDate(C.getDate() + 1)).format("{yyyy}-{MM}"),
                x = Date.create(C.setDate(C.getDate() + 7)).format("{yyyy}-{MM}");
            var B = C = "month"
              , n = !0;
            0 <= l.indexOf("hh:ii") ? C = "hour" : 0 > l.indexOf("dd") && (B = C = "year",
            n = !1);
            $(this).datetimepicker({
                dateBtnGroup: ["today", "tomorrow", "upcoming", "someday"],
                format: l,
                language: "zh_CN",
                todayHighlight: !0,
                todayBtn: n,
                autoclose: !0,
                minView: C,
                startView: B
            }).off("changeDate").on("changeDate", function(a) {
                var e = a.date
                  , c = "";
                if (15 < l.length)
                    e && (c = new Date(a.date.getTime() + 6E4 * a.date.getTimezoneOffset()),
                    c = Date.create(c).format("{yyyy}-{MM}-{dd} {HH}:{mm}"));
                else if ("yyyy-MM-dd HH:mm" == f || "YYYY-MM-DD HH:mm:ss" == f || "YYYY-MM-DD HH:mm" == f)
                    c = Date.create(e).format("{yyyy}-{MM}-{dd} {HH}:{mm}");
                else if ("yyyy-MM-dd" == f || "HH:mm:ss" == f || "YYYY-MM-DD" == f)
                    c = Date.create(e).format("{yyyy}-{MM}-{dd}");
                else if ("yyyy-MM" == f || "YYYY-MM" == f)
                    c = Date.create(e).format("{yyyy}-{MM}");
                "early" == k ? "DateComponent" == d ? b.setEarlySpecDate(c) : "DateInterval" == d && (b.componentSetup.start.earlySpecDate = c,
                b.componentSetup.end.earlySpecDate = c) : "late" == k && ("DateComponent" == d ? b.setLateSpecDate(c) : "DateInterval" == d && (b.componentSetup.start.lateSpecDate = c,
                b.componentSetup.end.lateSpecDate = c))
            });
            "early" == k && "specified" == $(document).find(".j_latestContent select").val() && $(document).find("#latestDate").is(":checked") ? $(document).find(".j_earlyContent .j_specDate input").datetimepicker("setEndDate", c) : "late" == k && "specified" == $(document).find(".j_earlyContent select").val() && $(document).find("#earlyDate").is(":checked") ? $(document).find(".j_latestContent .j_specDate input").datetimepicker("setStartDate", e) : "early" == k && "specified" != $(document).find(".j_latestContent select").val() ? $(document).find(".j_earlyContent .j_specDate input").datetimepicker("setEndDate", null) : "late" == k && "specified" != $(document).find(".j_earlyContent select").val() ? $(document).find(".j_latestContent .j_specDate input").datetimepicker("setStartDate", null) : "late" != k || "specified" != $(document).find(".j_earlyContent select").val() || $(document).find("#earlyDate").is(":checked") ? "early" != k || "specified" != $(document).find(".j_latestContent select").val() || $(document).find("#latestDate").is(":checked") || $(document).find(".j_earlyContent .j_specDate input").datetimepicker("setEndDate", null) : $(document).find(".j_latestContent .j_specDate input").datetimepicker("setStartDate", null);
            n = B = C = !0;
            "early" == k ? (e = $(document).find("#editor-component #latestDate"),
            c && e.is(":checked") && (g <= c ? C = !0 : g > c && (C = !1),
            h <= c ? B = !0 : h > c && (B = !1),
            x <= c ? n = !0 : x > c && (n = !1),
            g = ["someday"],
            1 != C && "true" != C || g.push("today"),
            1 != B && "true" != B || g.push("tomorrow"),
            1 != n && "true" != n || g.push("upcoming"),
            a.datetimepicker("setDateBtnGroup", g))) : "late" == k && (c = $(document).find("#editor-component #earlyDate"),
            e && c.is(":checked") && (g < e ? C = !1 : g >= e && (C = !0),
            h < e ? B = !1 : h >= e && (B = !0),
            x < e ? n = !1 : x >= e && (n = !0),
            g = [],
            1 != C && "true" != C || g.push("today"),
            1 != B && "true" != B || g.push("tomorrow"),
            1 != n && "true" != n || g.push("upcoming"),
            a.datetimepicker("setDateBtnGroup", g)));
            $(this).datetimepicker("show");
            m.moveDatetimepicker($(this))
        });
        $(document).off("focus", ".j_earlyContent .j_beforeOrAfterNum input,.j_latestContent .j_beforeOrAfterNum input").on("focus", ".j_earlyContent .j_beforeOrAfterNum input,.j_latestContent .j_beforeOrAfterNum input", function(a) {
            window.dateObj = $("#widget-control .field-active").data("componentData")
        });
        $(document).off("blur", ".j_earlyContent .j_beforeOrAfterNum input,.j_latestContent .j_beforeOrAfterNum input").on("blur", ".j_earlyContent .j_beforeOrAfterNum input,.j_latestContent .j_beforeOrAfterNum input", function(a) {
            a = $(this);
            var k = a.val().trim();
            if ("" != k)
                if (/^[1-9]\d*$/.test(k)) {
                    var e = ""
                      , c = "";
                    if (0 < a.parents(".j_latestContent").length) {
                        var e = "late"
                          , b = a.parents(".j_latestContent");
                        if ("currentDayBefore" == b.find("select").val() || "currentMonthBefore" == b.find("select").val() || "currentHourBefore" == b.find("select").val())
                            c = "before";
                        else if ("currentDayAfter" == b.find("select").val() || "currentMonthAfter" == b.find("select").val() || "currentHourAfter" == b.find("select").val())
                            c = "after"
                    } else if (0 < a.parents(".j_earlyContent").length)
                        if (e = "early",
                        b = a.parents(".j_earlyContent"),
                        "currentDayBefore" == b.find("select").val() || "currentMonthBefore" == b.find("select").val() || "currentHourBefore" == b.find("select").val())
                            c = "before";
                        else if ("currentDayAfter" == b.find("select").val() || "currentMonthAfter" == b.find("select").val() || "currentHourAfter" == b.find("select").val())
                            c = "after";
                    var b = window.dateObj
                      , d = b.componentSetup.componentKey
                      , f = "";
                    "DateComponent" == d ? f = b.componentSetup.format : "DateInterval" == d && (f = b.componentSetup.start.format);
                    if ("yyyy-MM-dd HH:mm" == f || "YYYY-MM-DD HH:mm:ss" == f || "YYYY-MM-DD HH:mm" == f)
                        if (8760 < k)
                            m.notify("\u5c0f\u65f6\u6570\u4e0d\u80fd\u8d85\u8fc78760"),
                            a.val("");
                        else if ("early" == e)
                            if ("before" == c) {
                                if (b.componentSetup.lateType == b.componentSetup.earlyType && (e = $(document).find(".j_latestContent .j_beforeOrAfterNum input").val().trim(),
                                parseInt(k) < parseInt(e))) {
                                    m.notify("\u6700\u665a\u65f6\u95f4\u4e0d\u80fd\u65e9\u4e8e\u6700\u65e9\u65f6\u95f4");
                                    a.val("");
                                    return
                                }
                                "DateComponent" == d ? b.setEarlyBeforeHour(k) : "DateInterval" == d && (b.componentSetup.start.earlyBeforeHour = k,
                                b.componentSetup.end.earlyBeforeHour = k)
                            } else {
                                if ("after" == c) {
                                    if (b.componentSetup.lateType == b.componentSetup.earlyType && (e = $(document).find(".j_latestContent .j_beforeOrAfterNum input").val().trim(),
                                    parseInt(k) > parseInt(e))) {
                                        m.notify("\u6700\u665a\u65f6\u95f4\u4e0d\u80fd\u65e9\u4e8e\u6700\u65e9\u65f6\u95f4");
                                        a.val("");
                                        return
                                    }
                                    "DateComponent" == d ? b.setEarlyAfterHour(k) : "DateInterval" == d && (b.componentSetup.start.earlyAfterHour = k,
                                    b.componentSetup.end.earlyAfterHour = k)
                                }
                            }
                        else {
                            if ("late" == e)
                                if ("before" == c) {
                                    if (b.componentSetup.lateType == b.componentSetup.earlyType && (e = $(document).find(".j_earlyContent .j_beforeOrAfterNum input").val().trim(),
                                    parseInt(k) > parseInt(e))) {
                                        m.notify("\u6700\u665a\u65f6\u95f4\u4e0d\u80fd\u65e9\u4e8e\u6700\u65e9\u65f6\u95f4");
                                        a.val("");
                                        return
                                    }
                                    "DateComponent" == d ? b.setLateBeforeHour(k) : "DateInterval" == d && (b.componentSetup.start.lateBeforeHour = k,
                                    b.componentSetup.end.lateBeforeHour = k)
                                } else if ("after" == c) {
                                    if (b.componentSetup.lateType == b.componentSetup.earlyType && (e = $(document).find(".j_earlyContent .j_beforeOrAfterNum input").val().trim(),
                                    parseInt(k) < parseInt(e))) {
                                        m.notify("\u6700\u665a\u65f6\u95f4\u4e0d\u80fd\u65e9\u4e8e\u6700\u65e9\u65f6\u95f4");
                                        a.val("");
                                        return
                                    }
                                    "DateComponent" == d ? b.setLateAfterHour(k) : "DateInterval" == d && (b.componentSetup.start.lateAfterHour = k,
                                    b.componentSetup.end.lateAfterHour = k)
                                }
                        }
                    else if ("yyyy-MM-dd" == f || "HH:mm:ss" == f || "YYYY-MM-DD" == f)
                        if (365 < k)
                            m.notify("\u5929\u6570\u4e0d\u80fd\u8d85\u8fc7365"),
                            a.val("");
                        else if ("early" == e)
                            if ("before" == c) {
                                if (b.componentSetup.lateType == b.componentSetup.earlyType && (e = $(document).find(".j_latestContent .j_beforeOrAfterNum input").val().trim(),
                                parseInt(k) < parseInt(e))) {
                                    m.notify("\u6700\u665a\u65f6\u95f4\u4e0d\u80fd\u65e9\u4e8e\u6700\u65e9\u65f6\u95f4");
                                    a.val("");
                                    return
                                }
                                "DateComponent" == d ? b.setEarlyBeforeDay(k) : "DateInterval" == d && (b.componentSetup.start.earlyBeforeDay = k,
                                b.componentSetup.end.earlyBeforeDay = k)
                            } else {
                                if ("after" == c) {
                                    if (b.componentSetup.lateType == b.componentSetup.earlyType && (e = $(document).find(".j_latestContent .j_beforeOrAfterNum input").val().trim(),
                                    parseInt(k) > parseInt(e))) {
                                        m.notify("\u6700\u665a\u65f6\u95f4\u4e0d\u80fd\u65e9\u4e8e\u6700\u65e9\u65f6\u95f4");
                                        a.val("");
                                        return
                                    }
                                    "DateComponent" == d ? b.setEarlyAfterDay(k) : "DateInterval" == d && (b.componentSetup.start.earlyAfterDay = k,
                                    b.componentSetup.end.earlyAfterDay = k)
                                }
                            }
                        else {
                            if ("late" == e)
                                if ("before" == c) {
                                    if (b.componentSetup.lateType == b.componentSetup.earlyType && (e = $(document).find(".j_earlyContent .j_beforeOrAfterNum input").val().trim(),
                                    parseInt(k) > parseInt(e))) {
                                        m.notify("\u6700\u665a\u65f6\u95f4\u4e0d\u80fd\u65e9\u4e8e\u6700\u65e9\u65f6\u95f4");
                                        a.val("");
                                        return
                                    }
                                    "DateComponent" == d ? b.setLateBeforeDay(k) : "DateInterval" == d && (b.componentSetup.start.lateBeforeDay = k,
                                    b.componentSetup.end.lateBeforeDay = k)
                                } else if ("after" == c) {
                                    if (b.componentSetup.lateType == b.componentSetup.earlyType && (e = $(document).find(".j_earlyContent .j_beforeOrAfterNum input").val().trim(),
                                    parseInt(k) < parseInt(e))) {
                                        m.notify("\u6700\u665a\u65f6\u95f4\u4e0d\u80fd\u65e9\u4e8e\u6700\u65e9\u65f6\u95f4");
                                        a.val("");
                                        return
                                    }
                                    "DateComponent" == d ? b.setLateAfterDay(k) : "DateInterval" == d && (b.componentSetup.start.lateAfterDay = k,
                                    b.componentSetup.end.lateAfterDay = k)
                                }
                        }
                    else if ("yyyy-MM" == f || "YYYY-MM" == f)
                        if (12 < k)
                            m.notify("\u6708\u6570\u4e0d\u80fd\u8d85\u8fc712"),
                            a.val("");
                        else if ("early" == e)
                            if ("before" == c) {
                                if (b.componentSetup.lateType == b.componentSetup.earlyType && (e = $(document).find(".j_latestContent .j_beforeOrAfterNum input").val().trim(),
                                parseInt(k) < parseInt(e))) {
                                    m.notify("\u6700\u665a\u65f6\u95f4\u4e0d\u80fd\u65e9\u4e8e\u6700\u65e9\u65f6\u95f4");
                                    a.val("");
                                    return
                                }
                                "DateComponent" == d ? b.setEarlyBeforeMonth(k) : "DateInterval" == d && (b.componentSetup.start.earlyBeforeMonth = k,
                                b.componentSetup.end.earlyBeforeMonth = k)
                            } else {
                                if ("after" == c) {
                                    if (b.componentSetup.lateType == b.componentSetup.earlyType && (e = $(document).find(".j_latestContent .j_beforeOrAfterNum input").val().trim(),
                                    parseInt(k) > parseInt(e))) {
                                        m.notify("\u6700\u665a\u65f6\u95f4\u4e0d\u80fd\u65e9\u4e8e\u6700\u65e9\u65f6\u95f4");
                                        a.val("");
                                        return
                                    }
                                    "DateComponent" == d ? b.setEarlyAfterMonth(k) : "DateInterval" == d && (b.componentSetup.start.earlyAfterMonth = k,
                                    b.componentSetup.end.earlyAfterMonth = k)
                                }
                            }
                        else if ("late" == e)
                            if ("before" == c) {
                                if (b.componentSetup.lateType == b.componentSetup.earlyType && (e = $(document).find(".j_earlyContent .j_beforeOrAfterNum input").val().trim(),
                                parseInt(k) > parseInt(e))) {
                                    m.notify("\u6700\u665a\u65f6\u95f4\u4e0d\u80fd\u65e9\u4e8e\u6700\u65e9\u65f6\u95f4");
                                    a.val("");
                                    return
                                }
                                "DateComponent" == d ? b.setLateBeforeMonth(k) : "DateInterval" == d && (b.componentSetup.start.lateBeforeMonth = k,
                                b.componentSetup.end.lateBeforeMonth = k)
                            } else if ("after" == c) {
                                if (b.componentSetup.lateType == b.componentSetup.earlyType && (e = $(document).find(".j_earlyContent .j_beforeOrAfterNum input").val().trim(),
                                parseInt(k) < parseInt(e))) {
                                    m.notify("\u6700\u665a\u65f6\u95f4\u4e0d\u80fd\u65e9\u4e8e\u6700\u65e9\u65f6\u95f4");
                                    a.val("");
                                    return
                                }
                                "DateComponent" == d ? b.setLateAfterMonth(k) : "DateInterval" == d && (b.componentSetup.start.lateAfterMonth = k,
                                b.componentSetup.end.lateAfterMonth = k)
                            }
                } else
                    m.notify("\u53ea\u80fd\u4e3a\u6b63\u6574\u6570"),
                    a.val("")
        });
        $(document).on("keyup", "#editor-component .placeholder_js", function(a) {
            a = $(this);
            var e = a.val().trim()
              , c = a.attr("index");
            if (null == e || 0 == e.length)
                e = "\u8bf7\u9009\u62e9",
                a.val(e);
            $("#widget-control .field-active").data("componentData").setPlaceholder(e, c);
            $("#widget-control .field-active .choicelist").eq(c).find("option").eq(0).text(e)
        });
        $(document).on("change", "select[id\x3d'moneyType']", function(a) {
            a = $(this).val();
            var e = $("#widget-control .field-active").data("componentData");
            e.setType(a);
            var c = e.componentSetup.isReadOnly
              , e = e.componentSetup.submitSel;
            $("#widget-control .field-active #moneyType").find("option").attr("selected", !1);
            $("#widget-control .field-active #moneyType").find('option[value\x3d"' + a + '"]').attr("selected", !0);
            "true" == e || 1 == e ? "true" == c || 1 == c ? ($("#widget-control .field-active #moneyType").addClass("hide"),
            $("#widget-control .field-active .form-amountbox .money_type_js").removeClass("hide-im hide").text("(" + a + ")")) : ($("#widget-control .field-active #moneyType").removeClass("hide"),
            $("#widget-control .field-active .form-amountbox .money_type_js").addClass("hide-im hide").text("(" + a + ")")) : ($("#widget-control .field-active #moneyType").addClass("hide"),
            $("#widget-control .field-active .form-amountbox .money_type_js").text("(" + a + ")").removeClass("hide-im hide"))
        });
        $(document).on("click", "#editor-component #isUnique", function(a) {
            a = $(this).is(":checked");
            $("#widget-control .field-active").data("componentData").setIsUnique(a)
        });
        $(document).on("click", "#editor-component #isCurrentDepartment", function(a) {
            a = $(this).is(":checked");
            $("#widget-control .field-active").data("componentData").setIsCurrentDepartment(a)
        });
        $(document).on("click", "#editor-component #isReadonly", function(a) {
            a = $(this).is(":checked");
            $("#widget-control .field-active").data("componentData").setIsReadonly(a)
        });
        $(document).on("click", "#editor-component #isCurrentEmployee", function(a) {
            a = $(this).is(":checked");
            $("#widget-control .field-active").data("componentData").setIsCurrentEmployee(a)
        });
        $(document).on("click", "#editor-component #isSingle", function(a) {
            a = $(this).is(":checked");
            $("#widget-control .field-active").data("componentData").setSingle(a)
        });
        $(document).on("click", "#editor-component .j_optBatcEdit", function(a) {
            a = $("#optBatcEdit");
            a.find("#optContent").parent().removeClass("has-error");
            a.find(".j_optBatcEditEr").hide();
            a.find(".icon-help").hide();
            var e = "";
            $("#editor-component ul.choicelistEdit_js").children().each(function(a) {
                a = $(this).find(".optionName_js").val();
                null != a && (e += a.trim() + "\n")
            });
            a.find("#optContent").val(e.trim());
            $("#optBatcEdit").modal()
        });
        $(document).on("click", "#editor-component .j_comboBatcEdit", function(a) {
            var e = $("#widget-control .field-active").data("componentData");
            a = $("#optBatcEdit");
            a.find("#optContent").parent().removeClass("has-error");
            a.find(".j_optBatcEditEr").hide();
            a.find(".icon-help").show();
            for (var c = "", b = function(a, e) {
                var k = e + a.name.trim() + "\n";
                if (a.children && 0 < a.children.length)
                    for (var c = 0; c < a.children.length; c++) {
                        var d = a.children[c];
                        1 != d.other && "true" != d.other && (k += b(d, e + "-"))
                    }
                return k
            }, e = e.componentSetup.options, d = 0; d < e.length; d++) {
                var f = e[d];
                1 != f.other && "true" != f.other && (c += b(f, ""))
            }
            a.find("#optContent").val(c.trim());
            $("#optBatcEdit").modal()
        });
        $(document).on("click", "#optBatcEdit .j_saveOptBatc", function(a) {
            a = $("#widget-control .field-active").data("componentData");
            var e = $("#editor-component ul.choicelistEdit_js")
              , c = $("#optBatcEdit")
              , b = c.find("#optContent").val().trim();
            c.find("#optContent").parent().removeClass("has-error");
            c.find(".j_optBatcEditEr").hide().text("\u4e0d\u80fd\u4e3a\u7a7a");
            if ("" == b)
                c.find("#optContent").parent().addClass("has-error"),
                c.find("#optContent").focus(),
                c.find(".j_optBatcEditEr").show();
            else {
                for (var d = b.split("\n"), f = [], g = [], b = 0; b < d.length; b++) {
                    var h = d[b];
                    "" != h.trim() && (f.push(h.trim()),
                    g.push(h.trim()))
                }
                if ("ComboSelect" != a.componentSetup.componentKey)
                    for (d = g.sort(),
                    b = 0; b < d.length; b++)
                        if (d[b] == d[b + 1]) {
                            c.find("#optContent").parent().addClass("has-error");
                            c.find("#optContent").focus();
                            c.find(".j_optBatcEditEr").text("\u9009\u9879\u540d\u79f0\u4e0d\u80fd\u91cd\u590d").show();
                            return
                        }
                if ("ComboSelect" == a.componentSetup.componentKey) {
                    for (var d = !0, s = a.componentSetup.selects.length, b = 0; b < f.length; b++) {
                        g = f[b];
                        if (100 < g.length) {
                            c.find(".j_optBatcEditEr").text("\u9009\u9879\u5b57\u7b26\u8fc7\u957f");
                            d = !1;
                            break
                        }
                        if (0 == b) {
                            if (g.startsWith("-") || !f[b + 1]) {
                                c.find(".j_optBatcEditEr").text("\u9009\u9879\u683c\u5f0f\u4e0d\u6b63\u786e");
                                d = !1;
                                break
                            }
                        } else {
                            if (2 == s && !g.startsWith("-")) {
                                if (!f[b + 1]) {
                                    c.find(".j_optBatcEditEr").text("\u9009\u9879\u683c\u5f0f\u4e0d\u6b63\u786e");
                                    d = !1;
                                    break
                                }
                                if (!f[b - 1].startsWith("-") || !f[b + 1].startsWith("-")) {
                                    c.find(".j_optBatcEditEr").text("\u9009\u9879\u683c\u5f0f\u4e0d\u6b63\u786e");
                                    d = !1;
                                    break
                                }
                            }
                            if (3 == s) {
                                if (!g.startsWith("-")) {
                                    if (!f[b + 1]) {
                                        c.find(".j_optBatcEditEr").text("\u9009\u9879\u683c\u5f0f\u4e0d\u6b63\u786e");
                                        d = !1;
                                        break
                                    }
                                    if (!f[b - 1].startsWith("--") || !f[b + 1].startsWith("-") || f[b + 1].startsWith("--")) {
                                        c.find(".j_optBatcEditEr").text("\u9009\u9879\u683c\u5f0f\u4e0d\u6b63\u786e");
                                        d = !1;
                                        break
                                    }
                                }
                                if (g.startsWith("-") && !g.startsWith("--")) {
                                    if (!f[b + 1]) {
                                        c.find(".j_optBatcEditEr").text("\u9009\u9879\u683c\u5f0f\u4e0d\u6b63\u786e");
                                        d = !1;
                                        break
                                    }
                                    if (f[b - 1].startsWith("-") && !f[b - 1].startsWith("--") || !f[b + 1].startsWith("--")) {
                                        c.find(".j_optBatcEditEr").text("\u9009\u9879\u683c\u5f0f\u4e0d\u6b63\u786e");
                                        d = !1;
                                        break
                                    }
                                }
                                if (g.startsWith("--") && !f[b - 1].startsWith("-")) {
                                    c.find(".j_optBatcEditEr").text("\u9009\u9879\u683c\u5f0f\u4e0d\u6b63\u786e");
                                    d = !1;
                                    break
                                }
                            }
                        }
                    }
                    if (d) {
                        e = function(a, e) {
                            for (var k = [], c = [], b = 0; b < a.length; b++) {
                                var d = a[b];
                                d.startsWith(e) || (0 < c.length && k.push(c.slice(0)),
                                c = []);
                                c.push(d)
                            }
                            k.push(c);
                            return k
                        }
                        ;
                        d = e(f, "-");
                        f = [];
                        h = a.componentSetup.selectIds;
                        if (2 == s)
                            for (b = 0; b < d.length; b++) {
                                var m = d[b]
                                  , g = new Option;
                                g.setName(m[0]);
                                g.setOrder(b);
                                g.setFieldId(h[0]);
                                for (var x = [], C = 1; C < m.length; C++) {
                                    var B = new Option;
                                    B.setName(m[C].substring(1));
                                    B.setOrder(C - 1);
                                    B.setFieldId(h[1]);
                                    x.push(B.componentSetup)
                                }
                                g.setChildren(x);
                                f.push(g.componentSetup)
                            }
                        if (3 == s)
                            for (b = 0; b < d.length; b++) {
                                m = d[b];
                                g = new Option;
                                g.setName(m[0]);
                                g.setOrder(b);
                                g.setFieldId(h[0]);
                                x = [];
                                s = e(m.slice(1), "--");
                                for (m = 0; m < s.length; m++) {
                                    C = s[m];
                                    B = new Option;
                                    B.setName(C[0].substring(1));
                                    B.setOrder(m);
                                    B.setFieldId(h[1]);
                                    for (var n = [], E = 1; E < C.length; E++) {
                                        var G = new Option;
                                        G.setName(C[E].substring(2));
                                        G.setOrder(E - 1);
                                        G.setFieldId(h[2]);
                                        n.push(G.componentSetup)
                                    }
                                    B.setChildren(n);
                                    x.push(B.componentSetup)
                                }
                                g.setChildren(x);
                                f.push(g.componentSetup)
                            }
                        b = l.checkComboOptionName(f);
                        1 == b || "true" == b ? (c.find("#optContent").parent().addClass("has-error"),
                        c.find("#optContent").focus(),
                        c.find(".j_optBatcEditEr").text("\u540c\u7ea7\u522b\u9009\u9879\u540d\u79f0\u4e0d\u80fd\u91cd\u590d").show()) : (a.componentSetup.options = f,
                        a.renderEditor(),
                        $("#optBatcEdit").modal("hide"))
                    } else
                        c.find("#optContent").parent().addClass("has-error"),
                        c.find("#optContent").focus(),
                        c.find(".j_optBatcEditEr").show()
                } else {
                    c = a.componentSetup.componentKey;
                    d = e.find("li." + c + "_js");
                    for (b = 0; b < f.length; b++)
                        h = f[b],
                        g = d.eq(b),
                        null == g.get(0) ? ((new Option({
                            name: h,
                            order: b,
                            index: 0,
                            selectionId: "",
                            defOption: !1,
                            other: !1
                        })).renderEditor(e, a),
                        g = e.find(".otherOption_js"),
                        e.remove(".otherOption_js"),
                        e.append(g)) : g.find(".optionName_js").val(h);
                    f.length < d.length && e.find("li." + c + "_js:gt(" + (f.length - 1) + ")").remove();
                    l.changeFormOption();
                    $("#optBatcEdit").modal("hide")
                }
            }
        });
        $(document).on("click", "#optBatcEdit .j_close", function(a) {
            $("#optBatcEdit").modal("hide")
        });
        $(document).on("change", "#component-dataset", function(a) {
            $("#widget-control .field-active").data("componentData").setDataSetId($(this).val())
        });
        $(document).on("change", "#component-stattype", function(a) {
            $("#widget-control .field-active").data("componentData").setStatType($(this).val())
        });
        $(document).on("click", ".table_field", function(a) {
            a = $(this);
            var e = $("#widget-control .field-active").data("componentData")
              , c = a.val();
            a.prop("checked") ? e.addDataSet(c, a.attr("title")) : e.removeDataSet(c)
        });
        $(document).off("change", "input:radio[name\x3d'monitor-type']").on("change", "input:radio[name\x3d'monitor-type']", function(a) {
            a = $(this).val();
            var e = $("#widget-control .field-active").data("componentData");
            e.setMonitorType(a);
            e.componentSetup.monitorFields = [];
            e.renderEditor();
            "date" == a ? $("#editor-component").find(".j_isCapital_Div").addClass("hide") : $("#editor-component").find(".j_isCapital_Div").removeClass("hide")
        });
        $(document).off("change", "input:radio[name\x3d'date-type']").on("change", "input:radio[name\x3d'date-type']", function(a) {
            a = $(this).val();
            $("#widget-control .field-active").data("componentData").setDateType(a)
        });
        $(document).off("change", ".j_operate input,.j_select_monitor").on("change", ".j_operate input,.j_select_monitor", function() {
            var a = $("#widget-control .field-active").data("componentData")
              , e = $(this);
            e.hasClass("j_select_monitor") && ("\u5e38\u91cf" == e.val() ? e.next().removeClass("hide") : e.next().addClass("hide"));
            a.getFormula()
        });
        $(document).off("keydown", ".j_number_input").on("keydown", ".j_number_input", function(a) {
            a = parseInt(a.keyCode);
            var e = $(this).val();
            if ((110 == a || 190 == a) && 0 <= e.indexOf(".") || (109 == a || 173 == a) && 0 <= e.indexOf("-"))
                return !1
        });
        $(document).off("keyup", ".j_number_input").on("keyup", ".j_number_input", function(a) {
            a = $(this).val();
            var e = $("#widget-control .field-active").data("componentData");
            isNaN(a) && "-" != a && $(this).val(parseFloat(a));
            "." == a.charAt(0) && $(this).val(0 + parseFloat(a));
            e.getFormula()
        });
        $(document).on("keyup", ".j_number_input", function(a) {
            a = $(this).val();
            var e = $("#widget-control .field-active").data("componentData");
            $(this).val(a.replace(/[^\d.-]/g, ""));
            e.getFormula()
        });
        $(document).off("blur", ".j_number_input").on("blur", ".j_number_input", function(a) {
            a = $(this).val();
            var e = $("#widget-control .field-active").data("componentData");
            $(this).val(a.replace(/[^\d.-]/g, ""));
            e.getFormula()
        });
        $(document).on("change", "#editor-component input:radio[name\x3d'isedit']", function(a) {
            $("#widget-control .field-active").data("componentData").setIsEdit($(this).val())
        });
        $(document).on("change", "#source_module_select", function(a) {
            a = $("#widget-control .field-active").data("componentData");
            var e = $(this).val();
            if ("dataTemplate" == e) {
                var c = $(this).find("option:selected").attr("type")
                  , b = $(this).find("option:selected").attr("templateId");
                if ("default" == c) {
                    var d = {};
                    d.templateId = b;
                    d.formInitTempLate = "formInitTempLate";
                    $.ajax({
                        contentType: "application/json",
                        type: TEAMS.ajaxMethod,
                        url: TEAMS.api.initTemplate,
                        dataType: "json",
                        async: !1,
                        data: JSON.stringify(d),
                        success: function(a) {
                            a.message ? m.notify(a.message) : (b = a.formDataTemplate.id,
                            $("#source_module_select").find("option:selected").val(e),
                            $("#source_module_select").find("option:selected").attr("type", a.formDataTemplate.type),
                            c = a.formDataTemplate.type)
                        }
                    })
                }
                a.setDataTemplateId(b)
            } else
                a.setDataTemplateId("");
            a.setSourceModule(e);
            a.componentSetup.relateField && (a.componentSetup.relateField = null,
            m.notify("\u5173\u8054\u8bbe\u7f6e\u5df2\u5931\u6548"))
        });
        $(document).off("click", ".j_addField").on("click", ".j_addField", function(a) {
            a = $("#widget-control .field-active").data("componentData");
            var e = $(a.tpl)
              , c = $(this).parents(".j_choicelistEdit_number").find(".j_monitor_item:first").clone().show();
            c.find(".js_signField").text("A" + a.count + ":");
            c.find(".js_signField").attr("title", "A" + a.count);
            e = e.siblings("#j_operate_list").clone();
            e.find("input").attr("name", "operate-type-" + a.count);
            $(".j_choicelistEdit_number").append(e.html());
            $(".j_choicelistEdit_number").append(c);
            a = $("#widget-control .field-active").data("componentData");
            a.getFormula();
            a.count++;
            a.getFormula()
        });
        $(document).off("click", ".j_delField").on("click", ".j_delField", function(a) {
            a = $(this).parents(".j_monitor_item");
            var e = $("#widget-control .field-active").data("componentData");
            if (2 > a.siblings().length)
                return m.notify("\u81f3\u5c11\u8981\u76d1\u63a7\u4e00\u4e2a"),
                !1;
            1 == a.prev().length ? a.prev().remove() : a.next().remove();
            a.remove();
            e.getFormula()
        });
        $(document).off("click", ".j_edit_number").on("click", ".j_edit_number", function() {
            $("#widget-control .field-active").data("componentData").monitoreditor()
        });
        $(document).off("click", "#isDefault").on("click", "#isDefault", function(a) {
            var e = $(this);
            a = $(this).prop("checked");
            var e = e.attr("comkey")
              , c = $("#widget-control .field-active").data("componentData");
            a ? ($("#j_default_value").removeClass("hide"),
            $("#widget-control .field-active").find(".field-value_js").val(c.componentSetup.content),
            "position" == e && c.componentSetup.defaultAddress && ($("#widget-control .field-active").find(".field-value_js").text(c.componentSetup.defaultAddress),
            $("#widget-control .field-active").find(".field-value_js").parent().addClass("field-position-nobd"),
            $("#j_default_value .j_defaultPosition").text(c.componentSetup.defaultAddress))) : ($("#j_default_value").addClass("hide"),
            $("#widget-control .field-active").find(".field-value_js").val(""),
            "position" == e && ($("#widget-control .field-active").find(".field-value_js").text("\u83b7\u53d6\u5730\u7406\u4f4d\u7f6e"),
            $("#widget-control .field-active").find(".field-value_js").parent().removeClass("field-position-nobd")),
            c.setContent(""),
            $("#content").val(""));
            c.setIsDefault(a)
        });
        $(document).off("click", "#isAutoPosition").on("click", "#isAutoPosition", function(a) {
            $(this);
            a = $(this).prop("checked");
            $("#widget-control .field-active").data("componentData").setIsAutoPosition(a)
        });
        $(document).off("click", ".j_defaultPosition").on("click", ".j_defaultPosition", function(a) {
            a = $(this);
            $("#default-position");
            l.level = 18;
            l.lng = a.attr("lng");
            l.lat = a.attr("lat");
            l.address = a.attr("address");
            l.lng || l.lat || $.ajax({
                url: "https://api.map.baidu.com/location/ip?ak\x3dXKXXQG69VnCYhXvtrfjVuWjh\x26coor\x3dbd09ll",
                type: TEAMS.ajaxMethod,
                dataType: "jsonp",
                success: function(a) {
                    a.content && a.content.point && (l.lng = a.content.point.x,
                    l.lat = a.content.point.y,
                    l.first = !0,
                    l.level = 11)
                }
            });
            $("#default-position").modal()
        });
        $(document).off("setPlace", "#default-position").on("setPlace", "#default-position", function(a) {
            var e = $("#default-position")
              , c = $("#editor-component")
              , b = $("#widget-control .field-active").data("componentData")
              , d = $("#default-position").find(".j_searchAddr")
              , f = d.text();
            f && m.confirm("\u786e\u5b9a\u4ee5\u5730\u5740\uff1a" + d.text() + " \u4e3a\u9ed8\u8ba4\u5730\u5740\u5417?", function(a) {
                if (a) {
                    m.notify("\u9ed8\u8ba4\u5730\u5740\u6dfb\u52a0\u6210\u529f");
                    a = d.attr("lng");
                    var l = d.attr("lat");
                    c.find(".j_defaultPosition").text(f).attr("lng", a).attr("lat", l).attr("address", f);
                    b.setDefaultAddress(f);
                    b.setDefaultLng(a);
                    b.setDefaultLat(l);
                    $("#widget-control .field-active").find(".j_position_render").text(f);
                    $("#widget-control .field-active").find(".j_position_render").parent().addClass("field-position-nobd");
                    e.modal("hide")
                }
            })
        });
        $(document).off("keyup", "#content").on("keyup", "#content", function(a) {
            var e = $(this);
            a = e.val();
            var c = $("#widget-control .field-active").data("componentData")
              , b = e.attr("type")
              , d = e.attr("comkey");
            if ("text" == b && "Text" == d && (d = c.componentSetup.maxlen,
            a.length > parseInt(d))) {
                a = a.substring(0, d);
                $(this).val(a);
                return
            }
            "number" == b && (d = e.attr("comkey"),
            "Money" == d || "NumberComponent" == d) && ("Money" == d && 15 < a.length ? $(this).val(a.substring(0, 15)) : (e = c.componentSetup.pointSize,
            null != e && "" != e && "sel" != e && (0 < e ? 0 < a.indexOf(".") && (c = a.substring(0, a.indexOf(".")),
            b = a.substring(a.indexOf(".") + 1),
            0 < b.length && b.length > e && (b = b.substring(0, e),
            a = c + "." + b)) : 0 < a.indexOf(".") && (a = a.substring(0, a.indexOf("."))),
            $(this).val(a))))
        });
        $(document).off("blur", "#content").on("blur", "#content", function(a) {
            a = $(this);
            var e = $("#widget-control .field-active").data("componentData");
            if (e) {
                var c = a.val().trim()
                  , b = a.attr("type")
                  , d = a.attr("comkey");
                "TextArea" == d && (c = (a.val() || "").replace(/\s+$/g, ""),
                $(this).val(c));
                if ("text" == b && "Text" == d) {
                    d = e.componentSetup.maxlen;
                    if (c.length > parseInt(d)) {
                        m.notify("\u60a8\u5f53\u524d\u9ed8\u8ba4\u503c\u7684\u957f\u5ea6\u4e3a" + c.length + ",\u8d85\u8fc7\u4e86\u8bbe\u7f6e\u7684\u6700\u5927\u957f\u5ea6!");
                        return
                    }
                    if(d)
                      e.setMaxlen(d)
                }
                if ("email" != b || e.email(c)) {
                    if ("tel" == b) {
                        if (a.hasClass("phone_js") && !e.tel(c)) {
                            a.val(e.getContent());
                            return
                        }
                        if (a.hasClass("mobile_js") && !e.mobile(c)) {
                            a.val(e.getContent());
                            return
                        }
                    }
                    if ("number" == b && (d = a.attr("comkey"),
                    ("Money" == d || "NumberComponent" == d) && c)) {
                        var b = e.componentSetup.pointSize
                          , d = e.componentSetup.minNum
                          , f = e.componentSetup.maxNum
                          , l = !1;
                        if (d || f)
                            if (d && f && (parseInt(d) > parseInt(c) || parseInt(f) < parseInt(c)) ? (m.notify("\u8bf7\u8f93\u5165\u8303\u56f4\u5728" + d + "--" + f + " \u4e4b\u95f4\u7684\u9ed8\u8ba4\u503c!"),
                            l = !0) : d && "" == f && parseInt(d) > parseInt(c) ? (m.notify("\u8bf7\u8f93\u5165\u5927\u4e8e" + d + " \u7684\u9ed8\u8ba4\u503c!"),
                            l = !0) : f && "" == d && parseInt(f) < parseInt(c) && (m.notify("\u8bf7\u8f93\u5165\u5c0f\u4e8e" + f + " \u7684\u9ed8\u8ba4\u503c!"),
                            l = !0),
                            l) {
                                $(this).val("");
                                $("#widget-control .field-active").find(".field-value_js").val("");
                                e.setContent("");
                                return
                            }
                        if (null != b && "" != b && 0 < b)
                            if (0 > c.indexOf(".")) {
                                d = "";
                                for (f = 0; f < b; f++)
                                    d += "0";
                                c = c + "." + d
                            } else {
                                l = c.substring(0, c.indexOf("."));
                                c = c.substring(c.indexOf(".") + 1);
                                d = "";
                                for (f = 0; f < b - c.length; f++)
                                    d += "0";
                                c = l + "." + (c + d)
                            }
                        a.val(c);
                        $("#widget-control .field-active").find(".field-value_js").val(c);
                        e.setContent(c);
                        return
                    }
                    $("#widget-control .field-active").find(".field-value_js").val(c);
                    e.setContent(c)
                } else
                    a.val(e.getContent())
            }
        });
        $(document).off("click", "#isHideTitle").on("click", "#isHideTitle", function(a) {
            $(this);
            a = $(this).prop("checked");
            var e = $("#widget-control .field-active");
            e.data("componentData").setIsHideTitle(a);
            a && 0 == e.closest(".subtable_js").length ? e.addClass("field-notitle").find(".widget-title .widget-title_js").addClass("hide") : e.removeClass("field-notitle").find(".widget-title .widget-title_js").removeClass("hide")
        });
        $(document).off("click", "#isRelationAdd").on("click", "#isRelationAdd", function() {
            var a = $(this).is(":checked");
            $("#widget-control .field-active").data("componentData").setIsAddForRelation(a)
        });
        $(document).off("click", "#submitSel").on("click", "#submitSel", function(a) {
            $(this);
            a = $(this).prop("checked");
            var e = $("#widget-control .field-active")
              , c = e.data("componentData")
              , b = c.componentSetup.type;
            c.setSubmitSel(a);
            c = c.componentSetup.isReadOnly;
            e.find("#moneyType").removeClass("small medium large");
            e.find("#moneyType").find("option").attr("selected", !1);
            e.find("#moneyType").find('option[value\x3d"' + b + '"]').attr("selected", !0);
            a ? "true" == c || 1 == c ? (e.find("#moneyType").addClass("hide"),
            e.find(".money_type_js").removeClass("hide-im hide").text("(" + b + ")")) : (e.find("#moneyType").removeClass("hide"),
            e.find(".money_type_js").addClass("hide-im hide").text("(" + b + ")")) : (e.find("#moneyType").addClass("hide"),
            e.find(".money_type_js").removeClass("hide-im hide").text("(" + b + ")"))
        });
        $(document).off("click", "#isCapital").on("click", "#isCapital", function(a) {
            $(this);
            a = $(this).prop("checked");
            $("#widget-control .field-active").data("componentData").setIsCapital(a)
        });
        $(document).off("click", "#isReadOnly").on("click", "#isReadOnly", function(a) {
            $(this);
            a = $(this).prop("checked");
            var e = $("#widget-control .field-active").data("componentData");
            e.setIsReadOnly(a);
            var c = e.componentSetup.type
              , e = e.componentSetup.submitSel;
            $("#widget-control .field-active #moneyType").find("option").attr("selected", !1);
            $("#widget-control .field-active #moneyType").find('option[value\x3d"' + c + '"]').attr("selected", !0);
            a ? ($("#widget-control .field-active").find("#moneyType").addClass("hide"),
            $("#widget-control .field-active").find(".money_type_js").removeClass("hide-im hide").text("(" + c + ")")) : 1 == e || "true" == e ? ($("#widget-control .field-active").find("#moneyType").removeClass("hide"),
            $("#widget-control .field-active").find(".money_type_js").addClass("hide-im hide").text("(" + c + ")")) : ($("#widget-control .field-active").find("#moneyType").addClass("hide"),
            $("#widget-control .field-active").find(".money_type_js").removeClass("hide-im hide").text("(" + c + ")"))
        });
        $(document).off("click", "#j_default_value .j_deleteImage").on("click", "#j_default_value .j_deleteImage", function(a) {
            a = $("#widget-control .field-active").data("componentData");
            var e = $(this).parents(".j_imageItem")
              , c = [];
            e.siblings(".j_imageItem").each(function() {
                c.push({
                    optionId: $(this).attr("id"),
                    content: $(this).data("name")
                })
            });
            a.setImages(c);
            e.remove()
        });
        $(document).off("click", "#j_default_value .j_deleteFile").on("click", "#j_default_value .j_deleteFile", function(a) {
            a = $("#widget-control .field-active").data("componentData");
            var e = $(this).parents(".file-item")
              , c = [];
            e.siblings(".file-item").each(function() {
                var a = $(this).find("a").eq(0).attr("data-value")
                  , e = $(this).find("a").eq(0).text()
                  , k = $(this).find("a").eq(0).attr("type");
                c.push({
                    optionId: a,
                    content: e,
                    type: k,
                    optionObj: $(this).data("fileObj")
                })
            });
            a.setFiles(c);
            e.remove()
        });
        $(document).off("click", ".j_cut_image").on("click", ".j_cut_image", function(a) {
            a = $("#widget-control .field-active").data("componentData");
            var e = $(this).attr("imageId"),
                c = $(this);   //$("#widget-control .field-active");
            a.cutImage(e,c)
        });
        $(document).off("change", ".j-chart-xaixs").on("change", ".j-chart-xaixs", function(a) {
            a = $(this);
            var e = a.children("option:selected").attr("componentKey")
              , c = $("#widget-control .field-active").data("componentData");
            "DateComponent" == e ? (a.parent().siblings(".j-chart-grouptype").removeClass("hide"),
            c.setGroupType($(".j-chart-grouptype").find('option[selected\x3d"selected"]').attr("value")),
            a.parent().parent().addClass("group-xaixs-date")) : (a.parent().siblings(".j-chart-grouptype").addClass("hide"),
            a.parent().parent().removeClass("group-xaixs-date"),
            c.setGroupType(""));
            c.renderYaixs(a);
            $(".j-chart-yaixs").change();
            c.componentSetup.formatType && "xType" == c.componentSetup.formatType && c.renderxAixsTwo();
            c.setxAixs(c.bulidxAixs())
        });
        $(document).off("change", ".j-chart-xaixs_two").on("change", ".j-chart-xaixs_two", function(a) {
            a = $(this);
            var e = a.children("option:selected").attr("componentKey")
              , c = $("#widget-control .field-active").data("componentData");
            "DateComponent" == e ? (a.parent().siblings(".j-chart-grouptype-two").removeClass("hide"),
            a.parent().parent().addClass("group-xaixs-date")) : (a.parent().siblings(".j-chart-grouptype-two").addClass("hide"),
            a.parent().parent().removeClass("group-xaixs-date"));
            c.setxAixs(c.bulidxAixs());
            c.setXGroupType(c.bullidXGroupType())
        });
        $(document).off("click", ".j-chart-grouptype a").on("click", ".j-chart-grouptype a", function(a) {
            a = $(this);
            a.addClass("active").siblings().removeClass("active");
            var e = $("#widget-control .field-active").data("componentData");
            "DateComponent" == componentKey ? (a.parent().siblings(".j-chart-grouptype-two").removeClass("hide"),
            a.parent().parent().addClass("group-xaixs-date")) : (a.parent().siblings(".j-chart-grouptype-two").addClass("hide"),
            a.parent().parent().removeClass("group-xaixs-date"));
            e.setxAixs(e.bulidxAixs());
            e.setXGroupType(e.bullidXGroupType())
        });
        $(document).off("change", ".j-chart-grouptype,.j-chart-grouptype-two").on("change", ".j-chart-grouptype,.j-chart-grouptype-two", function(a) {
            a = $(this);
            var e = $("#widget-control .field-active").data("componentData");
            e.componentSetup.formatType && "xType" == e.componentSetup.formatType ? e.setXGroupType(e.bullidXGroupType()) : e.setGroupType(a.find("option:selected").attr("value"))
        });
        $(document).off("change", ".j-chart-yaixs").on("change", ".j-chart-yaixs", function(a) {
            var e = $(this);
            a = e.closest("li").find(".j-chart-stattype");
            var e = e.find("option:selected").attr("componentKey")
              , c = $("#widget-control .field-active").data("componentData");
            0 <= "MoneyMonitorRatyNumberComponent".indexOf(e) ? 6 != a.find("option").length && a.append("\x3coption value\x3d'sum'\x3e\u5408\u8ba1\x3c/option\x3e\x3coption value\x3d'max'\x3e\u6700\u5927\u503c\x3c/option\x3e\x3coption value\x3d'min'\x3e\u6700\u5c0f\u503c\x3c/option\x3e\x3coption value\x3d'avg'\x3e\u5e73\u5747\u503c\x3c/option") : a.find("option[value\x3d'sum'],option[value\x3d'max'],option[value\x3d'min'],option[value\x3d'avg']").remove();
            c.setyAixs(c.bulidyAixs())
        });
        $(document).off("change", ".j-chart-stattype").on("change", ".j-chart-stattype", function(a) {
            a = $("#widget-control .field-active").data("componentData");
            a.setyAixs(a.bulidyAixs())
        });
        $(document).off("click", ".j-chart-charttype a").on("click", ".j-chart-charttype a", function(a) {
            a = $(this);
            if (!a.hasClass("disabled")) {
                var e = $("#widget-control .field-active")
                  , c = e.data("componentData");
                c.setType(a.attr("value"));
                a.addClass("active").siblings().removeClass("active");
                c.render(e);
                e.addClass("field-active");
                "pie" == c.componentSetup.chartType || "table" == c.componentSetup.chartType ? ($("#editor-component").find(".j-yaixs-add").addClass("hide"),
                $("#editor-component").find(".j-xaixs-add").addClass("hide")) : ($("#editor-component").find(".j-yaixs-add").removeClass("hide"),
                $("#editor-component").find(".j-xaixs-add").removeClass("hide"))
            }
        });
        $(document).off("click", ".j-yaixs-add").on("click", ".j-yaixs-add", function(a) {
            a = $(this);
            var e = $("#widget-control .field-active").data("componentData");
            a.closest(".form-group-hasli").addClass("form-group-moreli");
            $("#editor-component").find("a[value\x3d'pie'],a[value\x3d'table']").addClass("disabled");
            e.addYaixs();
            e.setyAixs(e.bulidyAixs())
        });
        $(document).off("click", ".j-xaixs-add").on("click", ".j-xaixs-add", function(a) {
            $(this);
            a = $("#widget-control .field-active").data("componentData");
            $("#editor-component").find("a[value\x3d'pie'],a[value\x3d'table']").addClass("disabled");
            $("#editor-component").find(".j_sort_chart").addClass("hide");
            a.addxAixs();
            a.setxAixs(a.bulidxAixs())
        });
        $(document).off("click", ".j-xaixs-minus").on("click", ".j-xaixs-minus", function(a) {
            a = $(this);
            a.parent().addClass("hide");
            a.parent().find(".j-chart-xaixs_two").empty();
            a.parent().siblings(".j-xaixs-add").removeClass("hide");
            a = $("#widget-control .field-active").data("componentData");
            $("#editor-component").find(".j-yaixs-add").removeClass("hide");
            $("#editor-component").find(".j_sort_chart").removeClass("hide");
            a.setxAixs(a.bulidxAixs());
            a.setXGroupType([]);
            a.setFormatType("yType")
        });
        $(document).off("click", ".j-yaixs-plus").on("click", ".j-yaixs-plus", function(a) {
            a = $(this);
            var e = $("#widget-control .field-active").data("componentData");
            e.addYaixs(a.closest("li"));
            e.setyAixs(e.bulidyAixs())
        });
        $(document).off("click", ".j-yaixs-minus").on("click", ".j-yaixs-minus", function(a) {
            $li = $(this).closest("li");
            1 == $li.siblings().length && ($li.closest(".form-group-hasli").removeClass("form-group-moreli"),
            $("#editor-component").find("a[value\x3d'pie'],a[value\x3d'table']").removeClass("disabled"));
            a = $("#widget-control .field-active").data("componentData");
            $li.remove();
            a.setyAixs(a.bulidyAixs())
        });
        $(document).off("change", ".j-chart-orderby").on("change", ".j-chart-orderby", function(a) {
            $("#widget-control .field-active").data("componentData").setOrderBy($(this).val())
        });
        $(document).off("click", ".j_edit_condition").on("click", ".j_edit_condition", function(a) {
            var e = $("#widget-control .field-active").data("componentData");
            (a = e.getConditionFields()) && 0 < a.length ? (new d({
                fields: a,
                condition: e.getCondition(),
                success: function(a) {
                    e.setCondition(a)
                }
            })).render() : m.notify("\u6682\u65e0\u53ef\u9009\u62e9\u7684\u63a7\u4ef6")
        });
        $(document).off("click", ".j_isDran_line").on("click", ".j_isDran_line", function(a) {
            a = $("#widget-control .field-active").data("componentData");
            if(a.componentSetup.componentKey=='TableLayout' || a.componentSetup.componentKey=='ColumnPanel') {
                var e = $("#widget-control .field-active").find('.form-tablelayout-wrap table > thead .ui-resizable');
                e.width('');
            } else {
                a.setIsDran("");
                a = $("#widget-control div[cid\x3d'" + a.cid + "']");
                a.removeAttr("isDran");
                var e = a.find(".subtable_js .subtr_js .subtd_js");
                e && (3 < e.length ? a.find(".subtable_js .subtr_js .subtd_js").width("241px") : 3 == e.length ? (a.find(".subtr_js").find(".subtd_js").css("width", "242px"),
                a.find(".subtr_js").find(".subtd_js:first").css("width", "241px")) : 2 == e.length ? a.find(".subtr_js").find(".subtd_js").css("width", "362px") : a.find(".subtr_js").find(".subtd_js").css("width", "100%"))
            }
        });
        $(document).off("click", ".j_total_line").on("click", ".j_total_line", function(a) {
            a = $("#widget-control .field-active").data("componentData");
            var e = $("#widget-control div[cid\x3d'" + a.cid + "']").find(".subtr_js .subtd_js .field_js");
            a = a.componentSetup.totalLine;
            if (e && 0 < e.length) {
                for (var c = [], b = 0; b < e.length; b++) {
                    var d = e[b];
                    if (d && $(d).attr("componentKey") && ("NumberComponent" == $(d).attr("componentKey") || "Money" == $(d).attr("componentKey") || "Monitor" == $(d).attr("componentKey"))) {
                        var f = {};
                        f.fieldId = $(d).attr("tempid");
                        f.componentkey = $(d).attr("componentKey");
                        f.title = $(d).find(".widget-title_js").text();
                        c.push(f)
                    }
                }
                if (c && 0 < c.length) {
                    e = $("#total_line_datatable");
                    e.find(".j_total_ul").empty();
                    if (a && 0 < a.length)
                        for (b = 0; b < c.length; b++) {
                            d = e.find(".j_clone .j_total_li").clone();
                            d.find("input").attr("id", c[b].fieldId).attr("componentKey", c[b].componentKey).attr("value", c[b].title).prop("checked", !0);
                            d.find(".j_totalName").text(c[b].title);
                            for (f = 0; f < a.length; f++)
                                c[b].fieldId == a[f] && d.find("input").prop("checked", !1);
                            e.find(".j_total_ul").append(d)
                        }
                    else
                        for (b = 0; b < c.length; b++)
                            for (b = 0; b < c.length; b++)
                                d = e.find(".j_clone .j_total_li").clone(),
                                d.find(".j_totalName").text(c[b].title),
                                d.find("input").attr("id", c[b].fieldId).attr("componentKey", c[b].componentKey).text(c[b].title).prop("checked", !0),
                                e.find(".j_total_ul").append(d);
                    e.modal();
                    0 < e.find(".j_dataTable_select").not("input:checked").length - 1 ? $("#total_line_datatable .j_select_total").prop("checked", !1) : $("#total_line_datatable .j_select_total").prop("checked", !0)
                } else
                    m.notify("\u6682\u65e0\u53ef\u9009\u62e9\u7684\u63a7\u4ef6")
            } else
                m.notify("\u6682\u65e0\u53ef\u9009\u62e9\u7684\u63a7\u4ef6")
        });
        $(document).off("click", "#total_line_datatable .j_select_total").on("click", "#total_line_datatable .j_select_total", function(a) {
            $("#total_line_datatable").find('.j_total_ul input[type\x3d"checkbox"]').prop("checked", this.checked)
        });
        $(document).off("click", "#total_line_datatable .j_dataTable_select").on("click", "#total_line_datatable .j_dataTable_select", function(a) {
            0 < $("#total_line_datatable").find(".j_dataTable_select").not("input:checked").length - 1 ? $("#total_line_datatable .j_select_total").prop("checked", !1) : $("#total_line_datatable .j_select_total").prop("checked", !0)
        });
        $(document).off("click", "#total_line_datatable .j_totalOk").on("click", "#total_line_datatable .j_totalOk", function(a) {
            a = $("#total_line_datatable");
            var e = [];
            a.find('.j_total_ul input[type\x3d"checkbox"]:not(:checked)').each(function() {
                e.push($(this).attr("id"))
            });
            $("#widget-control .field-active").data("componentData").setTotalLine(e);
            a.modal("hide")
        });
        $(document).off("click", "#total_line_datatable .j_totalCancel").on("click", "#total_line_datatable .j_totalCancel", function(a) {
            $("#total_line_datatable").modal("hide")
        });
        $(document).off("click", ".j_optDataSource").on("click", ".j_optDataSource", function(a) {
            var e = $("#data_source_module")
              , c = $(this).attr("componentkey")
              , $level = $(this).parents('.comboselect-opt'),
              levelNum = 1;
              if($level.hasClass('comboselect-opt-2')) levelNum =2;
              else if($level.hasClass('comboselect-opt-3')) levelNum =3;
            $('#data_source_module .j_data_source').attr('level', levelNum);
            a = {};
            a.levelType = c;
            $.ajax({
                contentType: "application/json",
                type: TEAMS.ajaxMethod,
                url: TEAMS.api.queryDataListByLayout,
                dataType: "json",
                data: JSON.stringify(a),
                success: function(a) {
                    if (a.message)
                        m.notify(a.message);
                    else {
                        if (a.formdataTemplatesList) {
                            a = a.formdataTemplatesList;
                            for (var b = $("#data_source_module .j_data_source_templates").find("ul").html(""), d = 0; d < a.length; d++) {
                                var f = a[d]
                                  , l = e.find(".j_data_li_clone").clone();

                                l.removeClass("hide").removeClass("j_data_li_clone").addClass("j_data_li");
                                $(l).attr("templateId", f.id).attr("type", f.type).attr("level", f.dropDownLevel).attr("templateName", f.name).attr("isTemplate", "isTemplate");
                                $(l).find("a").html(f.name);
                                b.append(l)

                            }

                            $("#data_source_module").find(".combo_select_js").keyup(function(event) {
                                var _v = $.trim($(this).val()),
                                    l = e.find(".j_data_li");
                                $(l).hide();
                                $.each(a, function(index, val) {
                                    if(_v=="") {
                                        $(l).show()
                                        return false
                                    };
                                    if((val.name).indexOf(_v)>=0){
                                         $(l).eq(index).show();
                                    }
                                });
                                
                            });

                            "ComboSelect" != c ? (e.find("#show_choose_level_info").html('\u53ef\u4ee5\u9009\u62e9\u5230\u4e0b\u62c9\u7ea7\u522b\u4e3a"\u4e00\u7ea7"\u7684\u6570\u636e\u6e90'),
                            e.find(".j_data_details_two").addClass("hide"),
                            e.find(".j_data_details_three").addClass("hide")) : (e.find("#show_choose_level_info").html('\u53ef\u4ee5\u9009\u62e9\u5230\u4e0b\u62c9\u7ea7\u522b\u4e3a"\u4e8c\u7ea7"\u6216"\u4e09\u7ea7"\u7684\u6570\u636e\u6e90'),
                            e.find(".j_data_details_two").removeClass("hide"),
                            e.find(".j_data_details_three").removeClass("hide"));
                            e.find(".j_data_source_templates li:first").click();


                        }
                        e.modal()
                    }
                }
            })
        });
        $(document).off("click", ".j_moreDataSource").on("click", ".j_moreDataSource", function(a) {
              $('.combo_ul_js li').show();
              $(this).hide();
        });
        $(document).off("click", "#data_source_module .j_data_source li").on("click", "#data_source_module .j_data_source li", function(a) {
            var e = $(this);
            $(this).addClass("active").siblings().removeClass("active");
            var c = e.closest("div.j_data_details");
            $(c).nextAll().find("ul").html("");
            if (a = e.data("details")) {
                $dataNext = $(c).next();
                for (var b = $dataNext.find("ul").html(""), d = 0; d < a.length; d++) {
                    var f = a[d]
                      , l = c.parent().find(".j_data_li_clone").clone();
                    l.removeClass("hide").removeClass("j_data_li_clone");
                    $(l).find("a").html(f.name);
                    $(l).attr("id", f.id);
                    b.append(l)
                }
            } else
                a = {},
                a.templateId = e.attr("templateId") || $('.j_data_source .j_data_source_templates ul li.active').attr("templateId"),
                e.attr("isTemplate") ? (a.detailsLevel = "1") :( a.parentId = e.attr("id")),
                $.ajax({
                    contentType: "application/json",
                    type: TEAMS.ajaxMethod,
                    url: TEAMS.api.queryDateDetailsByDetails,
                    dataType: "json",
                    data: JSON.stringify(a),
                    success: function(a) {
                        if (a.message)
                            m.notify(a.message);
                        else if (a && a.templateDetailsList) {
                            e.data("details", a.templateDetailsList);
                            $dataNext = $(c).next();
                            for (var b = $dataNext.find("ul").html(""), d = 0; d < a.templateDetailsList.length; d++) {
                                var f = a.templateDetailsList[d]
                                  , l = c.parent().find(".j_data_li_clone").clone();
                                l.removeClass("hide").removeClass("j_data_li_clone");
                                $(l).find("a").html(f.name);
                                $(l).attr("id", f.id);
                                b.append(l)
                            }
                        }
                    }
                })
        });
        $(document).off("click", "#data_source_module .j_data_template_save").on("click", "#data_source_module .j_data_template_save", function(a) {
            $(this);
            a = $("#data_source_module");
            $li = a.find(".j_data_source_templates ul li.active");

            var levelNum = $('#data_source_module .j_data_source').attr('level');

      //      var sourceDataType = $(this).attr('sourceData');  //   1 静态    2 动态
            var e = $($li).data("details")
              , c = $($li).attr("templateId")
              , b = $($li).attr("templateName")
              , d = $($li).attr("type")
              , f = levelNum;
            if ("default" == d) {
                var g = {};
                g.templateId = $li.attr("templateid");
                g.formInitTempLate = "formInitTempLate";
                $.ajax({
                    contentType: "application/json",
                    type: TEAMS.ajaxMethod,
                    async: !1,
                    url: TEAMS.api.initTemplate,
                    dataType: "json",
                    data: JSON.stringify(g),
                    success: function(a) {
                        a.message ? m.notify(a.message) : (e = a.formDataTemplate.detailsList,
                        c = a.formDataTemplate.id
                   //     f = a.formDataTemplate.dropDownLevel
                    )}
                })
            }
            var d = $("#widget-control .field-active").data("componentData")
              , h = $("#editor-component");
            h.find(".j_data_template_name").removeClass("hide").attr("templateId", c).data("details", e).find("span.j_template_name_span").html(b).attr("title", b);
            h.find(".j_cancel_template").removeClass("hide");
            if ("Select" == d.componentSetup.componentKey) {
                h.find(".btn-default_js").parent().addClass("hide");
                h.find(".j_optBatcEdit").parent().addClass("hide");
                h.find(".j_componentType_change").addClass("hide");
                if (null != e && 0 < e.length) {
                    b = [];
                    for (g = 0; g < e.length; g++) {
                        var s = e[g]
                          , A = new Option;
                        A.setName(s.name);
                        A.setOrder(s.order);
                        A.setSelectionId(s.id);
                        A.setIsReadonly(!0);
                        b.push(A.componentSetup)
                    }
                    d.renderOption(h, b)
                 //   (sourceDataType == 1) && d.renderOption(h, b)
                }
                d.setTemplateId(c);
                d.setDetailDefaultId("");
                d.setOptions([])
            } else
                "ComboSelect" == d.componentSetup.componentKey && (h.find(".j_combotype").addClass("hide"),
                h.find(".j_comboselect_other").addClass("hide"),
                h.find(".j_comboBatcEdit").addClass("hide"),
                g = {},
                g.templateId = c,
                g.detailsLevel = String(levelNum),
                $.ajax({
                    contentType: "application/json",
                    type: TEAMS.ajaxMethod,
                    async: !1,
                    url: TEAMS.api.queryDataSourcesByTemplate,
                    dataType: "json",
                    data: JSON.stringify(g),
                    success: function(a) {
                        a.message ? m.notify(a.message) : e = a.formDataTemplate.detailsList
                    }
                }),
                null != e && 0 < e.length && (b = [],
                b = l.getAllComboSelectOptions(e),
                d.setOptions([]),
                d.setTemplateId(c),
                d.setDetailDefaultId(""),
             //   (sourceDataType == 1) && (d.renderOption(b),d.renderType(f, !1))
                d.renderOption(b),
                d.renderType(f, !1)
                ),
                h.find(".j_combotype").find("input[name\x3d'combotype'][value\x3d'" + f + "']").prop("checked", !0));
            h.find(".js_other").addClass("hide").css("display", "none");
            a.modal("hide")
        });
        $(document).off("click", ".j_cancel_template_data").on("click", ".j_cancel_template_data", function(a) {
            a = $("#widget-control .field-active").data("componentData");
            var e = $("#editor-component");
            e.find(".js_other").addClass("hide");
            e.find(".js_other").removeClass("hide").css("display", "list-item");
            if ("Select" == a.componentSetup.componentKey) {
                e.find(".j_data_template_name").addClass("hide");
                e.find(".j_cancel_template").addClass("hide");
                e.find(".btn-default_js").parent().removeClass("hide");
                e.find(".j_optBatcEdit").parent().removeClass("hide");
                e.find(".j_componentType_change").removeClass("hide");
                a.setTemplateId("");
                a.setDetailDefaultId("");
                for (var c = [], b = 1; 4 > b; b++) {
                    var d = new Option;
                    d.setName("\u9009\u9879" + b);
                    d.setOrder(b);
                    c.push(d.componentSetup)
                }
                a.renderOption(e, c);
                a.setOptions(c)
            } else
                "ComboSelect" == a.componentSetup.componentKey && (e.find(".j_cancel_template").addClass("hide"),
                e.find(".j_combotype").removeClass("hide"),
                e.find(".j_comboselect_other").removeClass("hide"),
                e.find(".j_comboBatcEdit").removeClass("hide"),
                e.find(".j_data_template_name").addClass("hide"),
                a.setTemplateId(""),
                a.setDetailDefaultId(""),
                e = $(".j_combotype").find("input[name\x3d'combotype']:checked").val(),
                a.renderType(e),
                a.setDataDetails([]))
        });
        $(document).off("click", ".j_data_cancel").on("click", ".j_data_cancel", function(a) {
            $("#data_source_module").modal("hide")
        });
        $(document).on("change", "#editor-component ul li .detail_js", function(a) {
            a = $("#widget-control .field-active").data("componentData");
            var e = a.componentSetup.componentKey
              , c = $(this).attr("detailid");
            "Select" == e && ($("#editor-component"),
            a.setDetailDefaultId(c))
        });
        $(document).off("click", ".j_relate_field").on("click", ".j_relate_field", function(a) {
            var e = $("#widget-control .field-active").data("componentData");
            (a = e.getRelateFields()) && 0 < a.length ? (new b({
                fields: a,
                componentKey: e.getComponentKey(),
                component: e,
                relateField: e.getRelateField(),
                success: function(a) {
                    e.setRelateField(a)
                }
            })).render() : m.notify("\u6682\u65e0\u53ef\u9009\u62e9\u7684\u63a7\u4ef6")
        });
        /*数据来源项*/
        

        $(document).off("click", ".j_relate_datatable").on("click", ".j_relate_datatable", function(a) {               
            $(this);
            var tableId = $(this).find("option:selected").val(),
                colId = '';
            var e = $("#widget-control .field-active").data("componentData");
        //    e.setRelatDataTableId(tableId);
            $("#widget-control .field-active").attr('dataTableId',tableId)
            $("#widget-control .field-active").attr('dataColId',colId)

        });


        $(document).on("click", "#editor-component .optDataTableAdd_js", function(a) {
    
            var e = $('#optDataEdit'),
                g = {};
            g.formId =  $("#formId").val();
            $.ajax({
                contentType: "application/json",
                type: TEAMS.ajaxMethod,
                async: false,
                url:  TEAMS.api.findAlltable,
                dataType: "json",
                data: JSON.stringify(g),
                success: function(a) {
                   
                        if (a) {
                            for (var b = $("#optDataEdit .j_data_source_templates").find("ul").html(""), d = 0; d < a.length; d++) {
                                var f = a[d]
                                  , l = e.find(".j_data_li_clone").clone();

                                l.removeClass("hide").removeClass("j_data_li_clone").addClass("j_data_li");
                                $(l).attr("templateId", f.id).attr("active", false).attr("templateName", f.name);
                                $(l).find("a").html(f.comments);
                                if(f.active) $(l).addClass('active')
                                b.append(l)

                            }

                            e.find(".combo_select_js").keyup(function(event) {
                                var _v = $.trim($(this).val()),
                                    l = e.find(".j_data_li");
                                $(l).hide();
                                $.each(a, function(index, val) {
                                    if(_v=="") {
                                        $(l).show()
                                        return false
                                    };
                                    if((val.comments).indexOf(_v)>=0){
                                         $(l).eq(index).show();
                                    }
                                });
                                
                            });

                        }
                        e.modal()
                   
                }
           })                         
        });
        $(document).off("click", "#optDataEdit .j_data_cancel").on("click", "#optDataEdit .j_data_cancel", function(a) {
            $("#optDataEdit").modal("hide")
        });
        $(document).off("click", "#optDataEdit .j_data_source li").on("click", "#optDataEdit .j_data_source li", function(a) {
            var e = $(this);
            $(this).toggleClass("active");
            if($(this).hasClass('active'))
                $(this).attr('active', true);
            else 
                $(this).attr('active', false);
            
        });

        $(document).off("click", "#optDataEdit .j_data_template_save").on("click", "#optDataEdit .j_data_template_save", function(a) {
            $(this);
            a = $("#optDataEdit");
            $li = a.find(".j_data_source_templates ul li.active");
          
            var g = {};
            g.formId =  $("#formId").val();
            g.dataList = [];
            $li.each(function(index, el) {
               g.dataList[index] = {
                   "id" : $(this).attr("templateId"),
                   "name" : $(this).attr("templateName"),
                   "comments" : $(this).text(),
                   "active" : true
               };
            });
            $.ajax({
                contentType: "application/json",
                type: TEAMS.ajaxMethod,
                url:  TEAMS.api.saveSourcetable,
                dataType: "json",
                data: JSON.stringify(g),
                success: function(a) {
                    if(a) {
                        // $(document).find('.j_relate_datatable').each(function(index, el) {
                        //     var _e = $(this);
                        //     $.each(g.dataList,function(i,n){
                        //         _e.append('<option value='+n.id+' name='+n.name+'>'+n.comments+'</option>');

                                
                        //     })
                        // });
                         l.findSourcetable(true)                        
                    }
                }
            })

            
            a.modal("hide")
        });


        $(document).off("click", ".j_relate_dataunit").on("click", ".j_relate_dataunit", function(a) {
            $(this);
            var colId = $(this).find("option:selected").val();
            var e = $("#widget-control .field-active").data("componentData");
            e.setRelatDataUnitId(colId);
            $("#widget-control .field-active").attr('dataColId',colId)
        });
        

        $(document).off("click", "#orgtiqu").on("click", "#orgtiqu", function(a) {
            $(this);
            a = $(this).prop("checked");
            var e = $("#widget-control .field-active").data("componentData");
            e.setIsOrgtiqu(a);
        });

        $(document).off("click", "#orgtiqulist").on("click", "#orgtiqulist", function(a) {
            $(this);
            a = $(this).prop("checked");
            var e = $("#widget-control .field-active").data("componentData");
            e.setIsOrgtiqulist(a);
        });
        $(document).on("click", "#editor-component #delBorder", function(a) {
            a = $(this).is(":checked");
            var k = $("#widget-control .field-active").data("componentData");
            k.setIsBorder(a)
        });
        
        $(document).off("click", "#isBorderLay").on("click", "#isBorderLay", function(a) {
            $(this);
            a = $(this).prop("checked");
            var e = $("#widget-control .field-active").data("componentData");
            e.setIsBorderLayout(a);
        });

        $(document).off("click", ".j_einvoice_relatefield").on("click", ".j_einvoice_relatefield", function(a) {
            $("#einvoice-editor").modal({
                keyboard: !1,
                backdrop: "static"
            })
        });
        $(document).off("change", ".format-js").on("change", ".format-js", function(a) {
            a = $("#widget-control .field-active").data("componentData");
            a.setFormat($(this).val());
            a.renderCycle();
            a.bulidExpression()
        });
        $(document).off("change", ".length-js").on("change", ".length-js", function(a) {
            a = $("#widget-control .field-active").data("componentData");
            a.setLength($(this).val());
            a.bulidExpression()
        });
        $(document).off("change", ".cycle-js").on("change", ".cycle-js", function(a) {
            $("#widget-control .field-active").data("componentData").setCycle($(this).val())
        });
        $(document).off("change", ".after-js select,.after-js input").on("change", ".after-js select,.after-js input", function(a) {
            a = $("#widget-control .field-active").data("componentData");
            a.bulidFields("after");
            a.bulidExpression()
        });
        $(document).off("change", ".before-js select,.before-js input").on("change", ".before-js select,.before-js input", function(a) {
            a = $("#widget-control .field-active").data("componentData");
            a.bulidFields("before");
            a.bulidExpression()
        });
        $(document).off("click", ".field-minus-js").on("click", ".field-minus-js", function(a) {
            a = $("#widget-control .field-active").data("componentData");
            var e = $(this)
              , c = e.closest(".serial-fields-js");
            e.closest(".serial-field-js").remove();
            a.bulidFields(c.attr("type"));
            a.renderMenu(c);
            a.bulidExpression()
        });
        $(document).off("click", ".field-plus-js").on("click", ".field-plus-js", function(a) {
            a = $("#widget-control .field-active").data("componentData");
            var e = $(this).closest(".serial-fields-js");
            a.renderFieds(a.getFormFieds(), e)
        });
        $(document).off("click", "#mapconfig-close").on("click", "#mapconfig-close", function(a) {
            $("#default-position").modal("hide")
        });
        $(document).off("click", "#onlyPhoto").on("click", "#onlyPhoto", function(a) {
            a = $(this).is(":checked");
            var e = $("#widget-control .field-active").data("componentData");
            1 == a || "true" == a ? e.setOnlyPhoto(!0) : e.setOnlyPhoto(!1)
        });
        $(document).off("click", ".j_watermark_set").on("click", ".j_watermark_set", function(a) {
            $("#watermark-config").find(".j_watermarkContent").empty();
            a = $(document).find(".j_waterMarkClone .j_waterMark_main").clone();
            a.find(".j_topbox").empty();
            a.find(".j_middlebox").empty();
            a.find(".j_bottombox").empty();
            $("#watermark-config").find(".j_watermarkContent").append(a);
            var e = $("#widget-control .field-active").data("componentData");
            a = e.componentSetup.timeWaterMark;
            var c = e.componentSetup.placeWaterMark
              , b = e.componentSetup.nameWaterMark
              , e = e.componentSetup.selfWaterMark;
            a || (a = l.initWaterMark("time", "1", ""));
            c || (c = l.initWaterMark("place", "2", ""));
            b || (b = l.initWaterMark("name", "3", ""));
            e || (e = l.initWaterMark("self", "4", "\u81ea\u5b9a\u4e49\u6587\u5b57"));
            for (var d = 1; 4 >= d; d++)
                if (a.order == d) {
                    var f = $(document).find(".j_waterMarkClone .j_upTime").clone();
                    f.attr("order", d);
                    $("#watermark-config").find(".j_configContainer").append(f)
                } else
                    c.order == d ? (f = $(document).find(".j_waterMarkClone .j_uploadPlace").clone(),
                    f.attr("order", d),
                    $("#watermark-config").find(".j_configContainer").append(f)) : b.order == d ? (f = $(document).find(".j_waterMarkClone .j_userName").clone(),
                    f.attr("order", d),
                    $("#watermark-config").find(".j_configContainer").append(f)) : e.order == d && (f = $(document).find(".j_waterMarkClone .j_selfConfig").clone(),
                    f.attr("order", d),
                    $("#watermark-config").find(".j_configContainer").append(f));
            l.renderWaterMark();
            l.optionDrag();
            $("#watermark-config").modal();
            m.initLayout($(".j_watermarkScr"))
        });
        $(document).off("click", ".j_watermark_slideToggle").on("click", ".j_watermark_slideToggle", function(a) {
            $(this).find(".j_opt").hasClass("on") ? ($(this).find(".j_opt").removeClass("on"),
            $(this).parents(".j_watermark-box").find(".j_watermark-info").slideDown()) : ($(this).find(".j_opt").addClass("on"),
            $(this).parents(".j_watermark-box").find(".j_watermark-info").slideUp());
            a.stopPropagation()
        });
        $(document).off("click", ".j_watermark-headercheck").on("click", ".j_watermark-headercheck", function(a) {
            $(this).find('input[type\x3d"checkbox"]').click();
            a.stopPropagation()
        });
        $(document).off("click", ".j_colorSetting").on("click", ".j_colorSetting", function(a) {
            var e = $(this).parents(".j_watermark-box").attr("type");
            $(".j_watermark-color").toggleClass("hide").attr("type", e);
            if (!$(".j_watermark-color").hasClass("hide")) {
                var e = a.pageX
                  , c = a.pageY;
                $(".j_watermark-color").css({
                    left: e + 10,
                    top: c
                })
            }
            $(document).one("click", function() {
                $(".j_watermark-color").addClass("hide")
            });
            a.stopPropagation()
        });
        $(document).off("click", ".j_watermark-color").on("click", ".j_watermark-color", function(a) {
            a.stopPropagation()
        });
        $(document).off("click", ".j_watermark-color\x3espan").on("click", ".j_watermark-color\x3espan", function(a) {
            $(this).addClass("active").siblings().removeClass("active");
            a = $(this).attr("data-color");
            var e = $(".j_watermark-color").attr("type");
            "time" == e ? $("#watermark-config").find(".j_preTime").css("color", a) : "place" == e ? $("#watermark-config").find(".j_prePlace").css("color", a) : "name" == e ? $("#watermark-config").find(".j_preName").css("color", a) : "self" == e && $("#watermark-config").find(".j_preSelf").css("color", a);
            $('.j_watermark-box[type\x3d"' + e + '"]').find(".j_colorSetting").attr("data-color", a).css({
                color: a,
                "border-color": a
            });
            $(this).parent().addClass("hide")
        });
        $(document).off("click", "#watermark-config .j_item_input").on("click", "#watermark-config .j_item_input", function(a) {
            var e = $("#watermark-config")
              , c = $(this)
              , b = c.attr("value")
              , d = c.is(":checked");
            "upTime" == b ? 1 == d || "true" == d ? (e.find(".j_preTime").removeClass("hide"),
            e = e.find(".j_preTime").css("color"),
            c.parents(".j_watermark-box").find(".j_colorSetting").css({
                color: e,
                "border-color": e
            })) : e.find(".j_preTime").addClass("hide") : "uploadPlace" == b ? 1 == d || "true" == d ? (e.find(".j_prePlace").removeClass("hide"),
            e = e.find(".j_prePlace").css("color"),
            c.parents(".j_watermark-box").find(".j_colorSetting").css({
                color: e,
                "border-color": e
            })) : e.find(".j_prePlace").addClass("hide") : "userName" == b ? 1 == d || "true" == d ? (e.find(".j_preName").removeClass("hide"),
            e = e.find(".j_preName").css("color"),
            c.parents(".j_watermark-box").find(".j_colorSetting").css({
                color: e,
                "border-color": e
            })) : e.find(".j_preName").addClass("hide") : "selfConfig" == b && (1 == d || "true" == d ? (e.find(".j_preSelf").removeClass("hide"),
            e = e.find(".j_preSelf").css("color"),
            c.parents(".j_watermark-box").find(".j_colorSetting").css({
                color: e,
                "border-color": e
            })) : e.find(".j_preSelf").addClass("hide"));
            a.stopPropagation()
        });
        $(document).off("change", "#watermark-config .j_font select").on("change", "#watermark-config .j_font select", function(a) {
            var e = $(this);
            a = e.val();
            e = e.parents(".j_watermark-box").attr("type");
            "time" == e ? $("#watermark-config").find(".j_preTime").css("font-family", a) : "place" == e ? $("#watermark-config").find(".j_prePlace").css("font-family", a) : "name" == e ? $("#watermark-config").find(".j_preName").css("font-family", a) : "self" == e && $("#watermark-config").find(".j_preSelf").css("font-family", a)
        });
        $(document).off("change", "#watermark-config .j_font_size select").on("change", "#watermark-config .j_font_size select", function(a) {
            a = $(this);
            var e = a.val() + ""
              , e = Number(e.substring(0, 2)) / 2 + 4 + "px";
            a = a.parents(".j_watermark-box").attr("type");
            "time" == a ? $("#watermark-config").find(".j_preTime").css("font-size", e) : "place" == a ? $("#watermark-config").find(".j_prePlace").css("font-size", e) : "name" == a ? $("#watermark-config").find(".j_preName").css("font-size", e) : "self" == a && $("#watermark-config").find(".j_preSelf").css("font-size", e)
        });
        $(document).off("change", "#watermark-config .j_horizontal_align select").on("change", "#watermark-config .j_horizontal_align select", function(a) {
            var e = $(this);
            a = e.val();
            e = e.parents(".j_watermark-box").attr("type");
            "time" == e ? $("#watermark-config").find(".j_preTime").css("text-align", a) : "place" == e ? $("#watermark-config").find(".j_prePlace").css("text-align", a) : "name" == e ? $("#watermark-config").find(".j_preName").css("text-align", a) : "self" == e && $("#watermark-config").find(".j_preSelf").css("text-align", a)
        });
        $(document).off("change", "#watermark-config .j_vertical_align select").on("change", "#watermark-config .j_vertical_align select", function(a) {
            var e = $(this);
            a = e.val();
            e = e.parents(".j_watermark-box").attr("type");
            "time" == e ? l.imgWaterSetVertical($("#watermark-config").find(".j_preTime"), a) : "place" == e ? l.imgWaterSetVertical($("#watermark-config").find(".j_prePlace"), a) : "name" == e ? l.imgWaterSetVertical($("#watermark-config").find(".j_preName"), a) : "self" == e && l.imgWaterSetVertical($("#watermark-config").find(".j_preSelf"), a);
            l.renderOrderPre()
        });
        $(document).off("blur", "#watermark-config .j_alpha input").on("blur", "#watermark-config .j_alpha input", function(a) {
            var e = $(this)
              , c = /^(0|[1-9]\d*)$/;
            a = e.val();
            if (0 == c.test(a) || "false" == c.test(a))
                return e.val(""),
                m.notify("\u53ea\u80fd\u8f93\u51651\u5230100\u7684\u6574\u6570"),
                !1;
            if (0 == Number(a) || 100 < Number(a))
                return m.notify("\u53ea\u80fd\u8f93\u51651\u5230100\u7684\u6574\u6570"),
                e.val(""),
                !1;
            a /= 100;
            e = e.parents(".j_watermark-box").attr("type");
            "time" == e ? $("#watermark-config").find(".j_preTime").css("opacity", a) : "place" == e ? $("#watermark-config").find(".j_prePlace").css("opacity", a) : "name" == e ? $("#watermark-config").find(".j_preName").css("opacity", a) : "self" == e && $("#watermark-config").find(".j_preSelf").css("opacity", a)
        });
        $(document).off("blur", "#watermark-config .j_selfTxt input").on("blur", "#watermark-config .j_selfTxt input", function(a) {
            a = $(this).val();
            $("#watermark-config").find(".j_preSelf").text(a)
        });
        $(document).off("click", "#watermark-config .j_btn-cancel").on("click", "#watermark-config .j_btn-cancel", function(a) {
            $("#watermark-config").modal("hide")
        });
        $(document).off("click", "#watermark-config #watermark-close").on("click", "#watermark-config #watermark-close", function(a) {
            $("#watermark-config").modal("hide")
        });
        $(document).off("hidden.bs.modal", "#watermark-config").on("hidden.bs.modal", "#watermark-config", function(a) {
            m.destroyLayout($(".j_watermarkScr"))
        });
        $(document).off("click", "#watermark-config .j_btn-ok").on("click", "#watermark-config .j_btn-ok", function(a) {
            var e = {}
              , c = {}
              , b = {}
              , d = {};
            a = $("#watermark-config");
            for (var f = a.find(".j_item_input"), l = 0; l < f.length; l++) {
                var g = $(f[l])
                  , h = g.attr("value")
                  , g = g.is(":checked");
                "upTime" == h ? e.selected = 1 == g || "true" == g ? !0 : !1 : "uploadPlace" == h ? c.selected = 1 == g || "true" == g ? !0 : !1 : "userName" == h ? b.selected = 1 == g || "true" == g ? !0 : !1 : "selfConfig" == h && (d.selected = 1 == g || "true" == g ? !0 : !1)
            }
            a.find(".j_watermark-box").each(function() {
                var a = $(this)
                  , f = a.attr("type")
                  , l = a.attr("order")
                  , g = a.find(".j_font select").val()
                  , h = a.find(".j_font_size select").val()
                  , p = a.find(".j_colorSetting").attr("data-color")
                  , w = a.find(".j_horizontal_align select").val()
                  , v = a.find(".j_vertical_align select").val()
                  , s = a.find(".j_alpha input").val();
                if ("time" == f)
                    e.type = "time",
                    e.order = l,
                    e.font = g,
                    e.fontSize = h,
                    e.fontColor = p,
                    e.horizontal = w,
                    e.vertical = v,
                    e.alpha = s;
                else if ("place" == f)
                    c.type = "place",
                    c.order = l,
                    c.font = g,
                    c.fontSize = h,
                    c.fontColor = p,
                    c.horizontal = w,
                    c.vertical = v,
                    c.alpha = s;
                else if ("name" == f)
                    b.type = "name",
                    b.order = l,
                    b.font = g,
                    b.fontSize = h,
                    b.fontColor = p,
                    b.horizontal = w,
                    b.vertical = v,
                    b.alpha = s;
                else if ("self" == f) {
                    d.type = "self";
                    if (a = a.find(".j_selfTxt input").val().trim())
                        d.selfTxt = a;
                    d.order = l;
                    d.font = g;
                    d.fontSize = h;
                    d.fontColor = p;
                    d.horizontal = w;
                    d.vertical = v;
                    d.alpha = s
                }
            });
            a = $("#widget-control .field-active").data("componentData");
            a.setTimeWaterMark(e);
            a.setPlaceWaterMark(c);
            a.setNameWaterMark(b);
            a.setSelfWaterMark(d);
            $("#watermark-config").modal("hide")
        });
        
        /*new tabcotral*/
        $(document).on("click", ".j_edit_tabControl", function() {
            $(document).trigger("renderEditor", $(this).parents(".j-tab-control"))
        });
        $(document).on("click", ".j_tab_add", function(a) {
            $("#widget-control .field-active").data("componentData").addTabOption()
        });
        $(document).on("click", ".j_tab_remove", function(a) {
            $("#widget-control .field-active").data("componentData").removeTabOption($(this))
        });
        $(document).on("blur", ".j_tab_name", function(a) {
            window.objText.checkTabOptionName($(this))
        });
        $(document).on("focus", ".j_tab_name", function(a) {
            $(this).attr("oldName", $(this).val());
            window.objText = $("#widget-control .field-active").data("componentData")
        });
        $(document).on("click", ".j-tab-li", function(a) {
            $(this).hasClass("active") || ($(this).parents(".tabcontrlo-layout_js").hasClass("field-active") || $(this).parents(".tabcontrlo-layout_js").find(".j_edit_tabControl").trigger("click"),
            $("#widget-control .field-active").data("componentData").renderEditTabPageClick($(this), $(this).parents(".tabcontrlo-layout_js")))
        });
        $(document).on("change", "input:radio[name\x3d'tab-heightType']", function(a) {
            a = $(this).val();
            var b = $("#widget-control .field-active").data("componentData");
            a && "fixed" == a ? ($(this).parent().next().removeClass("hide").find("input").val("10"),
            b.setFixedHeight(10),
            $("#widget-control .field-active").find(".j-tab-contents").height(Number(300))) : ($(this).closest(".controls").find(".j-tab-fixed-height").addClass("hide"),
            $("#widget-control .field-active").find(".j-tab-contents").height(""));
            b.setHeightType(a)
        });
        $(document).on("blur", ".j-tab-fixed-height input", function(a) {
            a = $(this).val();
            var b = a.replace(/[^\d.-]/g, "");
            "" == b && (b = 10);
            var b = parseInt(b)
              , c = $("#widget-control .field-active").data("componentData");
            $(this).val(b);
            isNaN(a) && $(this).val(c.componentSetup.fixedHeight);
            c.setFixedHeight($(this).val());
            $("#widget-control .field-active").find(".j-tab-contents").height(25 * Number($(this).val()))
        });
        $(document).on("keyup", ".j-tab-fixed-height input", function(a) {
            a = $(this).val();
            var b = a.replace(/[^\d.-]/g, "");
            "" == b && (b = 10);
            var b = parseInt(b)
              , c = $("#widget-control .field-active").data("componentData");
            $(this).val(b);
            isNaN(a) && $(this).val(c.componentSetup.fixedHeight);
            c.setFixedHeight($(this).val())
        });
    };
    l.findSourcetable = function(f) {
        var a = [],
            g = {};
            g.formId =  $("#formId").val();
        $.ajax({
                contentType: "application/json",
                type: TEAMS.ajaxMethod,
                async: false,
                url:  TEAMS.api.findSourcetable,
                dataType: "json",
                data: JSON.stringify(g),
                success: function(data) {
                    a = data;
                    if(f) {
                        l.formEvents();
                        var dataTableId,dataColId;
                        var _dom = $("#widget-control .field-active");
                        if(_dom.attr('dataTableId')!='')
                            dataTableId = _dom.attr('dataTableId');
                        if(_dom.attr('dataColId')!='')
                            dataColId = _dom.attr('dataColId');

                        $(document).find('.j_relate_datatable').each(function(index, el) {
                            var _e = $(this).html('<option value=" ">无</option>');
                            $('.j_relate_dataunit').html('<option value=" ">无</option>')
                            var e = _dom.data("componentData");

                            $.each(a,function(i,n){
                                _e.append('<option value='+n.id+' name='+n.name+'>'+n.comments+'</option>');

                                if(n.id == dataTableId) {
                                    _e.find('option[value='+n.id+']').attr('selected','selected');
                                    e.setRelatDataTableId(n.id);
                                    var index = _e.get(0).selectedIndex;
                                    if(index>0 && a[index-1].columns && a[index-1].columns.length) {
                                        var _columns = a[index-1].columns;
                                        $.each(_columns,function(i,n){
                                            $('.j_relate_dataunit').append('<option value='+n.colid+' name='+n.name+'>'+n.comments+'</option>');
                                            if(n.colid == dataColId) {
                                                $('.j_relate_dataunit').find('option[value='+n.colid+']').attr('selected','selected');
                                                e.setRelatDataUnitId(n.colid);
                                            }

                                        })
                                    }

                                }
                            })

                            _e.change(function(event){
                                var tableId = $(this).find("option:selected").val();
                                e.setRelatDataTableId(tableId);
                                $('.j_relate_dataunit').html('<option value=" ">无</option>')
                                var index = _e.get(0).selectedIndex;
                                if(index>0 && a[index-1] && a[index-1].columns && a[index-1].columns.length) {
                                    var _columns = a[index-1].columns;
                                    $.each(_columns,function(i,n){
                                        $('.j_relate_dataunit').append('<option value='+n.colid+' name='+n.name+'>'+n.comments+'</option>');
                                        var colId = $('.j_relate_dataunit').find("option:selected").val();
                                        e.setRelatDataUnitId(colId);
                                    })
                                } else {

                                }
                                  
                            });
                        });

                    }

                }
            })  
        return  a;
    };
    l.resetDateCheckRule = function(a, e, c, b) {
        var d = a.componentSetup.componentKey
          , f = ""
          , g = ""
          , h = "currentDay"
          , s = "currentDay";
        "yyyy-MM-dd" == e ? (f = $(document).find("#option-clone .j_nyr_config").clone(),
        g = $(document).find("#option-clone .j_nyr_config").clone(),
        s = h = "currentDay") : "yyyy-MM" == e ? (f = $(document).find("#option-clone .j_ny_config").clone(),
        g = $(document).find("#option-clone .j_ny_config").clone(),
        s = h = "currentMonth") : "yyyy-MM-dd HH:mm" == e && (f = $(document).find("#option-clone .j_nyrsf_config").clone(),
        g = $(document).find("#option-clone .j_nyrsf_config").clone(),
        s = h = "currentHour");
        if ("true" == c || 1 == c)
            $(document).find(".j_earlyContent").empty().append(f),
            $(document).find("#earlyDate").prop("checked", !1);
        if ("true" == b || 1 == b)
            $(document).find(".j_latestContent").empty().append(g),
            $(document).find("#latestDate").prop("checked", !1);
        f = e = "";
        "DateInterval" == d ? (e = a.componentSetup.start,
        f = a.componentSetup.end,
        l.resetRuleConfigForDateInterval(e, h, s, c, b),
        l.resetRuleConfigForDateInterval(f, h, s, c, b)) : "DateComponent" == d && l.resetRuleConfig(a, h, s, c, b)
    }
    ;
    l.resetRuleConfig = function(a, e, c, b, d) {
        if ("true" == b || 1 == b)
            a.setEarlyDate(!1),
            a.setEarlyType(e),
            a.setEarlySpecDate(""),
            a.setEarlyBeforeDay(""),
            a.setEarlyAfterDay(""),
            a.setEarlyBeforeMonth(""),
            a.setEarlyAfterMonth(""),
            a.setEarlyBeforeHour(""),
            a.setEarlyAfterHour("");
        if ("true" == d || 1 == d)
            a.setLateDate(!1),
            a.setLateType(c),
            a.setLateSpecDate(""),
            a.setLateBeforeDay(""),
            a.setLateAfterDay(""),
            a.setLateBeforeMonth(""),
            a.setLateAfterMonth(""),
            a.setLateBeforeHour(""),
            a.setLateAfterHour("")
    }
    ;
    l.resetRuleConfigForDateInterval = function(a, e, c, b, d) {
        if ("true" == b || 1 == b)
            a.earlyDate = !1,
            a.earlyType = e,
            a.earlySpecDate = "",
            a.earlyBeforeDay = "",
            a.earlyAfterDay = "",
            a.earlyBeforeMonth = "",
            a.earlyAfterMonth = "",
            a.earlyBeforeHour = "",
            a.earlyAfterHour = "";
        if ("true" == d || 1 == d)
            a.lateDate = !1,
            a.lateType = c,
            a.lateSpecDate = "",
            a.lateBeforeDay = "",
            a.lateAfterDay = "",
            a.lateBeforeMonth = "",
            a.lateAfterMonth = "",
            a.lateBeforeHour = "",
            a.lateAfterHour = ""
    }
    ;
    l.optionDrag = function() {
        var a = $("#watermark-config");
        a.find(".j_configContainer").mousedown(function() {
            document.activeElement.blur()
        });
        a.find(".j_configContainer").sortable({
            cursor: "move",
            scroll: !1,
            items: ".j_watermark-box",
            connectWith: ".j_configContainer",
            update: function(e, c) {
                c.item.data("update", !0);
                l.renderOrder(a.find(".j_configContainer"))
            },
            receive: function(a, e) {
                e.item.data("receive", !0)
            },
            stop: function(a, e) {
                e.item.data("update") && (e.item.data("update", !1),
                e.item.data("receive") && e.item.data("receive", !1))
            }
        })
    }
    ;
    l.renderOrder = function(a) {
        var e = $("#watermark-config").find(".j_pic_preview");
        a = a.find(".j_watermark-box");
        for (var c = 0; c < a.length; c++) {
            var b = $(a[c]);
            b.attr("order", c + 1);
            b = b.attr("type");
            "time" == b ? e.find(".j_preTime").attr("order", c + 1) : "place" == b ? e.find(".j_prePlace").attr("order", c + 1) : "name" == b ? e.find(".j_preName").attr("order", c + 1) : "self" == b && e.find(".j_preSelf").attr("order", c + 1)
        }
        l.renderOrderPre()
    }
    ;
    l.initWaterMark = function(a, e, c) {
        var b = {
            selected: "false"
        };
        b.order = e;
        b.font = "SimSun";
        b.fontSize = "20px";
        b.fontColor = "#FF00FF";
        b.horizontal = "center";
        b.vertical = "middle";
        b.alpha = "50";
        b.type = a;
        "self" == a && (b.selfTxt = c);
        return b
    }
    ;
    l.renderWaterMark = function() {
        var a = $("#watermark-config")
          , e = $("#widget-control .field-active").data("componentData")
          , c = e.componentSetup.timeWaterMark
          , b = e.componentSetup.placeWaterMark
          , d = e.componentSetup.nameWaterMark
          , e = e.componentSetup.selfWaterMark;
        c || (c = l.initWaterMark("time", "1", ""));
        b || (b = l.initWaterMark("place", "2", ""));
        d || (d = l.initWaterMark("name", "3", ""));
        e || (e = l.initWaterMark("self", "4", "\u81ea\u5b9a\u4e49\u6587\u5b57"));
        var a = a.find(".j_pic_preview")
          , f = a.width()
          , g = a.height();
        a.find(".j_pre").css({
            width: f,
            height: g - 23
        });
        if (c) {
            l.renderWaterMarkDetail(".j_upTime", c);
            var h = $(document).find(".j_waterMarkClone .j_preTime").clone();
            h.attr("order", c.order);
            h.css("font-family", c.font);
            var s = c.fontSize + ""
              , s = Number(s.substring(0, 2)) / 2 + 4 + "px";
            h.css("font-size", s);
            h.css("color", c.fontColor);
            h.css("text-align", c.horizontal);
            h.css("vertical-align", c.vertical);
            h.css("opacity", Number(c.alpha) / 100);
            "top" == c.vertical ? a.find(".j_pre").find(".j_topbox").append(h) : "middle" == c.vertical ? a.find(".j_pre").find(".j_middlebox").append(h) : "bottom" == c.vertical && a.find(".j_pre").find(".j_bottombox").append(h)
        }
        b && (l.renderWaterMarkDetail(".j_uploadPlace", b),
        c = $(document).find(".j_waterMarkClone .j_prePlace").clone(),
        c.attr("order", b.order),
        c.css("font-family", b.font),
        s = b.fontSize + "",
        s = Number(s.substring(0, 2)) / 2 + 4 + "px",
        h.css("font-size", s),
        c.css("color", b.fontColor),
        c.css("text-align", b.horizontal),
        c.css("vertical-align", b.vertical),
        c.css("opacity", Number(b.alpha) / 100),
        "top" == b.vertical ? a.find(".j_pre").find(".j_topbox").append(c) : "middle" == b.vertical ? a.find(".j_pre").find(".j_middlebox").append(c) : "bottom" == b.vertical && a.find(".j_pre").find(".j_bottombox").append(c));
        d && (l.renderWaterMarkDetail(".j_userName", d),
        b = $(document).find(".j_waterMarkClone .j_preName").clone(),
        b.attr("order", d.order),
        b.css("font-family", d.font),
        s = d.fontSize + "",
        s = Number(s.substring(0, 2)) / 2 + 4 + "px",
        b.css("font-size", s),
        b.css("color", d.fontColor),
        b.css("text-align", d.horizontal),
        b.css("vertical-align", d.vertical),
        b.css("opacity", Number(d.alpha) / 100),
        "top" == d.vertical ? a.find(".j_pre").find(".j_topbox").append(b) : "middle" == d.vertical ? a.find(".j_pre").find(".j_middlebox").append(b) : "bottom" == d.vertical && a.find(".j_pre").find(".j_bottombox").append(b));
        e && (l.renderWaterMarkDetail(".j_selfConfig", e),
        d = $(document).find(".j_waterMarkClone .j_preSelf").clone(),
        d.attr("order", e.order),
        d.css("font-family", e.font),
        s = e.fontSize + "",
        s = Number(s.substring(0, 2)) / 2 + 4 + "px",
        d.css("font-size", s),
        d.css("color", e.fontColor),
        d.css("text-align", e.horizontal),
        d.css("vertical-align", e.vertical),
        d.css("opacity", Number(e.alpha) / 100),
        d.text(e.selfTxt),
        "top" == e.vertical ? a.find(".j_pre").find(".j_topbox").append(d) : "middle" == e.vertical ? a.find(".j_pre").find(".j_middlebox").append(d) : "bottom" == e.vertical && a.find(".j_pre").find(".j_bottombox").append(d));
        l.renderOrderPre();
        a.find(".j_pre\x3ediv").css({
            width: f,
            height: (g - 23) / 3
        })
    }
    ;
    l.renderOrderPre = function() {
        var a = $("#watermark-config")
          , e = a.find(".j_watermark-box")
          , a = a.find(".j_pic_preview")
          , c = a.find(".j_topbox").clone()
          , b = a.find(".j_middlebox").clone()
          , d = a.find(".j_bottombox").clone();
        a.find(".j_pre .j_topbox").empty();
        a.find(".j_pre .j_middlebox").empty();
        a.find(".j_pre .j_bottombox").empty();
        for (var f = 0; f < e.length; f++) {
            var l = $(e[f])
              , g = l.find(".j_item_input").is(":checked")
              , h = l.attr("order")
              , l = l.find(".j_vertical_align select").val()
              , m = "";
            "top" == l ? (m = c.find('.j_preItem[order\x3d"' + h + '"]'),
            m.attr("title", m.text()),
            a.find(".j_pre .j_topbox").append(m)) : "middle" == l ? (m = b.find('.j_preItem[order\x3d"' + h + '"]'),
            m.attr("title", m.text()),
            a.find(".j_pre .j_middlebox").append(m)) : "bottom" == l && (m = d.find('.j_preItem[order\x3d"' + h + '"]'),
            m.attr("title", m.text()),
            a.find(".j_pre .j_bottombox").append(m));
            g ? m.removeClass("hide") : m.addClass("hide")
        }
    }
    ;
    l.renderWaterMarkDetail = function(a, e) {
        var c = $("#watermark-config");
        if (".j_selfConfig" == a) {
            var b = e.selfTxt;
            c.find(a + " .j_selfTxt input").val(b)
        }
        c.find(a + " .j_item_input").prop("checked", !1);
        1 != e.selected && "true" != e.selected || c.find(a + " .j_item_input").prop("checked", !0);
        c.find(a + " .j_font select").find('option[value\x3d"' + e.font + '"]').attr("selected", !0);
        c.find(a + " .j_font_size select").find('option[value\x3d"' + e.fontSize + '"]').attr("selected", !0);
        c.find(a + " .j_colorSetting").attr("data-color", e.fontColor).css({
            color: e.fontColor,
            "border-color": e.fontColor
        });
        c.find(a + " .j_horizontal_align").find('option[value\x3d"' + e.horizontal + '"]').attr("selected", !0);
        c.find(a + " .j_vertical_align").find('option[value\x3d"' + e.vertical + '"]').attr("selected", !0);
        c.find(a + " .j_alpha input").val(e.alpha)
    }
    ;
    l.renderMap = function(a, e, c, b, d) {
        window.HOST_TYPE = "2";
        window.BMap_loadScriptTime = (new Date).getTime();
        n.async(["https://api.map.baidu.com/getscript?v\x3d2.0\x26ak\x3dXKXXQG69VnCYhXvtrfjVuWjh\x26services\x3d\x26t\x3d" + TEAMS.version], function() {
            var f = new BMap.Map("j_mapArea",{
                enableMapClick: !1
            });
            new BMap.Geocoder;
            var g = new BMap.Point(a,e);
            f.centerAndZoom(g, b);
            f.enableDragging();
            f.enableScrollWheelZoom();
            d && l.addMarker(f, g, c, !0);
            l.addEvents(f)
        })
    }
    ;
    l.addMarker = function(a, e, c, b) {
        var d = new BMap.Marker(e);
        c = new BMap.InfoWindow(c,{
            offset: new BMap.Size(-4,-14),
            enableCloseOnClick: !1
        });
        d.infoWindow = c;
        a.clearOverlays();
        a.addOverlay(d);
        b && a.openInfoWindow(c, e);
        $("#loading").hide()
    }
    ;
    l.addEvents = function(a) {
        var e = $("#default-position")
          , c = $("#editor-component")
          , b = $("#widget-control .field-active").data("componentData");
        a.addEventListener("click", function(d) {
            var f = new BMap.Geocoder
              , g = d.point;
            f.getLocation(g, function(d) {
                d = d.addressComponents;
                var f = d.province + d.city + d.district + d.street + d.streetNumber;
                m.confirm("\u786e\u5b9a\u4ee5\u5730\u5740\uff1a" + f + " \u4e3a\u9ed8\u8ba4\u5730\u5740\u5417?", function(d) {
                    d && (m.notify("\u9ed8\u8ba4\u5730\u5740\u6dfb\u52a0\u6210\u529f"),
                    c.find(".j_defaultPosition").text(f).attr("lng", g.lng).attr("lat", g.lat).attr("address", f),
                    b.setDefaultAddress(f),
                    b.setDefaultLng(g.lng),
                    b.setDefaultLat(g.lat),
                    d = new BMap.Point(g.lng,g.lat),
                    $("#widget-control .field-active").find(".j_position_render").text(f),
                    $("#widget-control .field-active").find(".j_position_render").parent().addClass("field-position-nobd"),
                    l.addMarker(a, d, "\u5730\u5740\uff1a" + f, !0),
                    e.modal("hide"))
                })
            })
        });
        e.off("keyup.position", "#j_cityName").on("keyup.position", "#j_cityName", function(e) {
            e = $(this).val();
            "" != e && a.centerAndZoom(e, 12)
        });
        var d = new BMap.Autocomplete({
            input: "j_addressInput",
            location: a
        });
        d.addEventListener("onhighlight", function(a) {
            var e = ""
              , c = a.fromitem.value
              , b = "";
            -1 < a.fromitem.index && (b = c.province + c.city + c.district + c.street + c.business);
            e = "FromItem\x3cbr /\x3eindex \x3d " + a.fromitem.index + "\x3cbr /\x3evalue \x3d " + b;
            b = "";
            -1 < a.toitem.index && (c = a.toitem.value,
            b = c.province + c.city + c.district + c.street + c.business);
            e += "\x3cbr /\x3eToItem\x3cbr /\x3eindex \x3d " + a.toitem.index + "\x3cbr /\x3evalue \x3d " + b;
            $("#searchResultPanel").innerHTML = e
        });
        d.addEventListener("onconfirm", function(c) {
            e.find(".j_addrs-list").empty().addClass("hide");
            var b = c.item.value;
            myValue = b.province + b.city + b.district + b.street + b.business;
            $("#searchResultPanel").innerHTML = "onconfirm\x3cbr /\x3eindex \x3d " + c.item.index + "\x3cbr /\x3emyValue \x3d " + myValue;
            l.setPlace(a, myValue)
        });
        e.off("refreshValue.position", "#j_addressInput").on("refreshValue.position", "#j_addressInput", function(a) {
            var e = $(this);
            e.val(e.val() + " ");
            setTimeout(function() {
                e.val($.trim(e.val()))
            }, 150)
        });
        e.off("keyup.position", "#j_addressInput").on("keyup.position", "#j_addressInput", function(a) {
            if (13 == a.keyCode) {
                a = $(this);
                a = $.trim(a.val());
                var c = $.trim(e.find("#j_cityName").val());
                c || (c = a);
                $.ajax({
                    url: "https://api.map.baidu.com/place/v2/search",
                    dataType: "jsonp",
                    type: TEAMS.ajaxMethod,
                    data: {
                        q: a,
                        region: c,
                        output: "json",
                        ak: "XKXXQG69VnCYhXvtrfjVuWjh"
                    },
                    crossDomain: !0,
                    success: function(a) {
                        l.renderSearchAddrs(a.results)
                    }
                })
            }
        });
        e.off("click.position", ".j_addrs-list li").on("click.position", ".j_addrs-list li", function(c) {
            var b = $(this);
            e.find(".j_addrs-list").empty().addClass("hide");
            c = $.trim(b.find(".j_addr-info").attr("addr"));
            var d = b.find(".j_addr-info").attr("lon")
              , f = b.find(".j_addr-info").attr("lat")
              , b = new BMap.Point(d,f);
            a.clearOverlays();
            a.centerAndZoom(b, 18);
            var l = new BMap.Marker(b);
            c = new BMap.InfoWindow('\x3cspan class\x3d"j_searchAddr" lng\x3d"' + d + '" lat\x3d"' + f + '"\x3e' + c + "\x3c/span\x3e\x3cbr/\x3e\x3ca class\x3d\"fr j_settingPoint\" onclick\x3d\"$('#default-position').trigger('setPlace')\"\x3e\u8bbe\u7f6e\u4e3a\u9ed8\u8ba4\u5730\u5740\x3c/a\x3e",{
                offset: new BMap.Size(-4,-14),
                enableCloseOnClick: !1
            });
            l.infoWindow = c;
            a.addOverlay(l);
            a.openInfoWindow(c, b)
        })
    }
    ;
    l.processCommonLayoutDetail = function(a) {
        a.fieldId = "";
        a.tempId = "";
        a.condition = null;
        a.relateField = null;
        a.selectIds = [];
        if (a.selects && 0 < a.selects.length)
            for (var e = 0; e < a.selects.length; e++)
                a.selects[e].fieldId = "",
                a.selects[e].tempId = "",
                a.selects[e].formId = "";
        var c = function(a) {
            a.uid = "";
            a.selectionId = "";
            a.fieldId = "";
            a.parent = "";
            if (null != a.children && 0 < a.children.length)
                for (var e = 0; e < a.children.length; e++)
                    c(a.children[e])
        };
        if (a.options && 0 < a.options.length)
            for (e = 0; e < a.options.length; e++)
                c(a.options[e])
    }
    ;
    l.renderSearchAddrs = function(a) {
        var e = $("#default-position")
          , c = 0;
        e.find(".j_addrs-list").empty().removeClass("hide");
        for (var b = 0, d = a.length; b < d; b++) {
            var f = a[b];
            if (f.name && f.address && f.location && f.location.lat && f.location.lng) {
                var c = c + 1
                  , l = e.find("#j_addr-liCLone").clone().removeAttr("id");
                l.find(".j_addr-info").attr({
                    addr: f.address + f.name,
                    lon: f.location.lng,
                    lat: f.location.lat,
                    title: f.name + " " + f.address
                }).text(f.name);
                l.find(".j_tip-info").text(f.address);
                e.find(".j_addrs-list").append(l)
            }
        }
        0 >= c && (e.find(".j_addrs-list").addClass("hide"),
        e.find("#j_addressInput").trigger("refreshValue"))
    }
    ;
    l.setPlace = function(a, e) {
        a.clearOverlays();
        var c = new BMap.LocalSearch(a,{
            onSearchComplete: function() {
                var b = c.getResults().getPoi(0).point;
                a.centerAndZoom(b, 18);
                var d = new BMap.Marker(b);
                e = '\x3cspan class\x3d"j_searchAddr" lng\x3d"' + b.lng + '" lat\x3d"' + b.lat + '"\x3e' + e + "\x3c/span\x3e\x3cbr/\x3e\x3ca class\x3d\"fr j_settingPoint\" onclick\x3d\"$('#default-position').trigger('setPlace')\"\x3e\u8bbe\u7f6e\u4e3a\u9ed8\u8ba4\u5730\u5740\x3c/a\x3e";
                var f = new BMap.InfoWindow(e,{
                    offset: new BMap.Size(-4,-14),
                    enableCloseOnClick: !1
                });
                d.infoWindow = f;
                a.addOverlay(d);
                a.openInfoWindow(f, b)
            }
        });
        c.search(e)
    }
    ;
    l.drag = function() {
        var a = $("#fieldBatcEdit");
        a.find(".j_field_ul").sortable({
            connectWith: ".j_field_ul",
            update: function(e, c) {
                a.find(".j_field_ul .j_field_li").each(function(a) {
                    $(this).find(".j_num").text(a + 1)
                });
                c.item.data("update", !0)
            },
            receive: function(a, e) {
                e.item.data("receive", !0)
            },
            stop: function(a, e) {
                e.item.data("update") && (e.item.data("update", !1),
                e.item.data("receive") && e.item.data("receive", !1))
            }
        })
    }
    ;
    l.getComponentModule = function(a) {
        var e = "";
        switch (a) {
        case "Employee":
            e = "employee";
            break;
        case "employee":
            e = "employee";
            break;
        case "Department":
            e = "department";
            break;
        case "department":
            e = "department";
            break;
        case "DataSource":
            e = "datasource";
            break;
        case "dataSource":
            e = "datasource";
            break;
        case "ProductionComponent":
            e = "production";
            break;
        case "production":
            e = "production";
            break;
        case "ContractComponent":
            e = "contract";
            break;
        case "contract":
            e = "contract";
            break;
        case "ChanceComponent":
            e = "chance";
            break;
        case "chance":
            e = "chance";
            break;
        case "ContactComponent":
            e = "contact";
            break;
        case "contact":
            e = "contact";
            break;
        case "CustomerComponent":
            e = "customer";
            break;
        case "customer":
            e = "customer";
            break;
        case "Workflow":
            e = "workflow";
            break;
        case "workflow":
            e = "workflow";
            break;
        case "Document":
            e = "document";
            break;
        case "document":
            e = "document";
            break;
        case "Task":
            e = "task";
            break;
        case "task":
            e = "task";
            break;
        case "Mainline":
            e = "mainline";
            break;
        case "mainline":
            e = "mainline";
            break;
        case "form":
            e = "form"
        }
        return e
    }
    ;
    l.assembleFormDataQueryParam = function(a) {
        var e = $("#filter-condition")
          , c = {};
        c.formId = a;
        var b = [];
        e.find("#search-group-list .j_progressSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition");
            var e = e.attr("value")
              , c = ""
              , c = $.trim(a.find("input").val());
            "" == c && (c = null);
            if (null == c)
                return !0;
            b.push({
                content: c,
                term: e
            })
        });
        c.progress = b;
        var d = [];
        e.find("#search-group-list .j_isFinishedSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition .j_selected");
            var e = e.attr("value")
              , c = [];
            a.find(".entity-item").each(function(a) {
                a = $(this).find("a").eq(0).attr("status");
                var e = $(this).find("a").eq(0).text();
                a = {
                    id: a,
                    name: e
                };
                c.push(a)
            });
            if (0 == c.length)
                return !0;
            d.push({
                ids: c,
                term: e
            })
        });
        c.isFinished = d;
        var f = [];
        e.find("#search-group-list .j_nameSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition");
            var e = e.attr("value")
              , c = ""
              , c = $.trim(a.find("input").val());
            "" == c && (c = null);
            if (null == c)
                return !0;
            f.push({
                content: c,
                term: e
            })
        });
        c.names = f;
        var g = [];
        e.find("#search-group-list .j_flowNameSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition");
            var e = e.attr("value")
              , c = ""
              , c = $.trim(a.find("input").val());
            "" == c && (c = null);
            if (null == c)
                return !0;
            g.push({
                content: c,
                term: e
            })
        });
        c.flowNames = g;
        var h = [];
        e.find("#search-group-list .j_descriptionSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition");
            var e = e.attr("value")
              , c = ""
              , c = $.trim(a.find("input").val());
            "" == c && (c = null);
            if (null == c)
                return !0;
            h.push({
                content: c,
                term: e
            })
        });
        c.descriptions = h;
        var m = [];
        e.find("#search-group-list .j_optSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition .j_selected");
            var e = e.attr("value")
              , c = [];
            a.find(".entity-item").each(function(a) {
                a = $(this).find("a").eq(0).attr("id");
                var e = $(this).find("a").eq(0).text();
                a = {
                    id: a,
                    name: e
                };
                c.push(a)
            });
            if (0 == c.length)
                return !0;
            m.push({
                ids: c,
                term: e
            })
        });
        c.operators = m;
        var A = [];
        e.find("#search-group-list .j_creatorSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition .j_selected");
            var e = e.attr("value")
              , c = [];
            a.find(".entity-item").each(function(a) {
                a = $(this).find("a").eq(0).attr("id");
                var e = $(this).find("a").eq(0).text();
                a = {
                    id: a,
                    name: e
                };
                c.push(a)
            });
            if (0 == c.length)
                return !0;
            A.push({
                ids: c,
                term: e
            })
        });
        c.creators = A;
        var x = [];
        e.find("#search-group-list .j_managerSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition .j_selected");
            var e = e.attr("value")
              , c = [];
            a.find(".entity-item").each(function(a) {
                a = $(this).find("a").eq(0).attr("id");
                var e = $(this).find("a").eq(0).text();
                a = {
                    id: a,
                    name: e
                };
                c.push(a)
            });
            if (0 == c.length)
                return !0;
            x.push({
                ids: c,
                term: e
            })
        });
        c.managers = x;
        var C = [];
        e.find("#search-group-list .j_flowOperatorSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition .j_selected");
            var e = e.attr("value")
              , c = [];
            a.find(".entity-item").each(function(a) {
                a = $(this).find("a").eq(0).attr("id");
                var e = $(this).find("a").eq(0).text();
                a = {
                    id: a,
                    name: e
                };
                c.push(a)
            });
            if (0 == c.length)
                return !0;
            C.push({
                ids: c,
                term: e
            })
        });
        c.flowOperators = C;
        var n = [];
        e.find("#search-group-list .j_flowOperatorDeptSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition .j_selected");
            var e = e.attr("value")
              , c = [];
            a.find(".entity-item").each(function(a) {
                a = $(this).find("a").eq(0).attr("id");
                var e = $(this).find("a").eq(0).text();
                a = {
                    id: a,
                    name: e
                };
                c.push(a)
            });
            if (0 == c.length)
                return !0;
            n.push({
                ids: c,
                term: e
            })
        });
        c.flowOperatorDepts = n;
        var D = [];
        e.find("#search-group-list .j_shareManSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition .j_selected");
            var e = e.attr("value")
              , c = [];
            a.find(".entity-item").each(function(a) {
                a = $(this).find("a").eq(0).attr("id");
                var e = $(this).find("a").eq(0).text();
                a = {
                    id: a,
                    name: e
                };
                c.push(a)
            });
            if (0 == c.length)
                return !0;
            D.push({
                ids: c,
                term: e
            })
        });
        c.shareMans = D;
        var E = [];
        e.find("#search-group-list .j_participantSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition .j_selected");
            var e = e.attr("value")
              , c = [];
            a.find(".entity-item").each(function(a) {
                a = $(this).find("a").eq(0).attr("id");
                var e = $(this).find("a").eq(0).text();
                a = {
                    id: a,
                    name: e
                };
                c.push(a)
            });
            if (0 == c.length)
                return !0;
            E.push({
                ids: c,
                term: e
            })
        });
        c.participants = E;
        var G = [];
        e.find("#search-group-list .j_createTimeSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition");
            var e = e.attr("value")
              , c = ""
              , b = ""
              , c = $.trim(a.find("input").eq(0).val())
              , b = $.trim(a.find("input").eq(1).val());
            "" == c && (c = null);
            "" == b && (b = null);
            if (null == c && null == b)
                return !0;
            G.push({
                content: c,
                endContent: b,
                term: e
            })
        });
        c.createTimes = G;
        var u = [];
        e.find("#search-group-list .j_createDateSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition .j_search_default_date option:selected");
            a = $(this).find(".j_formField-condition");
            var c = e.attr("key");
            if (c)
                a = {
                    selectedOption: c
                };
            else {
                var b = e = ""
                  , e = $.trim(a.find("input").eq(0).val())
                  , b = $.trim(a.find("input").eq(1).val());
                "" == e && (e = null);
                "" == b && (b = null);
                a = {
                    content: e,
                    endContent: b,
                    term: c
                };
                if (null == e && null == b)
                    return !0
            }
            u.push(a)
        });
        c.createdates = u;
        var y = [];
        e.find("#search-group-list .j_lastUpdateTimeSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition .j_search_default_date option:selected");
            a = $(this).find(".j_formField-condition");
            var c = e.attr("key");
            if (c)
                a = {
                    selectedOption: c
                },
                u.push(a);
            else {
                var b = e = ""
                  , e = $.trim(a.find("input").eq(0).val())
                  , b = $.trim(a.find("input").eq(1).val());
                "" == e && (e = null);
                "" == b && (b = null);
                a = {
                    content: e,
                    endContent: b,
                    term: c
                };
                if (null == e && null == b)
                    return !0;
                y.push(a)
            }
        });
        c.lastUpdateTimes = y;
        var F = [];
        e.find("#search-group-list .j_startTimeSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition");
            var c = e.attr("key");
            if (c)
                a = {
                    selectedOption: c
                };
            else {
                var b = e = ""
                  , e = $.trim(a.find("input").eq(0).val())
                  , b = $.trim(a.find("input").eq(1).val());
                "" == e && (e = null);
                "" == b && (b = null);
                a = {
                    content: e,
                    endContent: b,
                    term: c
                };
                if (null == e && null == b)
                    return !0
            }
            F.push(a)
        });
        c.startTimes = F;
        var H = [];
        e.find("#search-group-list .j_duedateSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition");
            var c = e.attr("key");
            if (c)
                a = {
                    selectedOption: c
                };
            else {
                var b = e = ""
                  , e = $.trim(a.find("input").eq(0).val())
                  , b = $.trim(a.find("input").eq(1).val());
                "" == e && (e = null);
                "" == b && (b = null);
                a = {
                    content: e,
                    endContent: b,
                    term: c
                };
                if (null == e && null == b)
                    return !0
            }
            H.push(a)
        });
        c.duedates = H;
        var I = [];
        e.find("#search-group-list .j_commentTimeSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition");
            var c = e.attr("key");
            if (c)
                a = {
                    selectedOption: c
                };
            else {
                var b = e = ""
                  , e = $.trim(a.find("input").eq(0).val())
                  , b = $.trim(a.find("input").eq(1).val());
                "" == e && (e = null);
                "" == b && (b = null);
                a = {
                    content: e,
                    endContent: b,
                    term: c
                };
                if (null == e && null == b)
                    return !0
            }
            I.push(a)
        });
        c.commentTimes = I;
        var J = [];
        e.find("#search-group-list .j_flowSubmitTimeSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition");
            var c = e.attr("key");
            if (c)
                a = {
                    selectedOption: c
                };
            else {
                var b = e = ""
                  , e = $.trim(a.find("input").eq(0).val())
                  , b = $.trim(a.find("input").eq(1).val());
                "" == e && (e = null);
                "" == b && (b = null);
                a = {
                    content: e,
                    endContent: b,
                    term: c
                };
                if (null == e && null == b)
                    return !0
            }
            J.push(a)
        });
        c.flowSubmitTimes = J;
        var K = [];
        e.find("#search-group-list .j_flowFinishTimeSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition");
            var c = e.attr("key");
            if (c)
                a = {
                    selectedOption: c
                };
            else {
                var b = e = ""
                  , e = $.trim(a.find("input").eq(0).val())
                  , b = $.trim(a.find("input").eq(1).val());
                "" == e && (e = null);
                "" == b && (b = null);
                a = {
                    content: e,
                    endContent: b,
                    term: c
                };
                if (null == e && null == b)
                    return !0
            }
            K.push(a)
        });
        c.flowFinishTimes = K;
        var O = [];
        e.find("#search-group-list .j_prioritySearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition .j_selected");
            var e = e.attr("value")
              , c = [];
            a.find(".entity-item").each(function(a) {
                a = $(this).find("a").eq(0).attr("status");
                var e = $(this).find("a").eq(0).text();
                a = {
                    id: a,
                    name: e
                };
                c.push(a)
            });
            if (0 == c.length)
                return !0;
            O.push({
                ids: c,
                term: e
            })
        });
        c.prioritys = O;
        var P = [];
        e.find("#search-group-list .j_typeSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition .j_selected");
            var e = e.attr("value")
              , c = [];
            a.find(".entity-item").each(function(a) {
                a = $(this).find("a").eq(0).attr("status");
                var e = $(this).find("a").eq(0).text();
                c.push({
                    status: a,
                    text: e
                })
            });
            if (0 == c.length)
                return !0;
            P.push({
                ids: c,
                term: e
            })
        });
        c.types = P;
        var L = [];
        e.find("#search-group-list .j_flowStatusSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition .j_selected");
            var e = e.attr("value")
              , c = [];
            a.find(".entity-item").each(function(a) {
                a = $(this).find("a").eq(0).attr("status");
                var e = $(this).find("a").eq(0).text();
                c.push({
                    status: a,
                    text: e
                })
            });
            if (0 == c.length)
                return !0;
            L.push({
                ids: c,
                term: e
            })
        });
        c.flowStatuss = L;
        var Q = [];
        e.find("#search-group-list .j_statusSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition .j_selected");
            var e = e.attr("value")
              , c = [];
            a.find(".entity-item").each(function(a) {
                a = $(this).find("a").attr("status");
                var e = $(this).find("a").text();
                c.push({
                    status: a,
                    text: e
                })
            });
            if (0 == c.length)
                return !0;
            Q.push({
                ids: c,
                term: e
            })
        });
        c.datastatus = Q;
        var R = [];
        e.find("#search-group-list .j_formFieldSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-select select option:selected")
              , c = $(this).find(".j_formField-condition .j_condition option:selected");
            a = $(this).find(".j_formField-condition");
            var b = $(this).find(".j_formField-condition .j_selected")
              , k = e.attr("id")
              , d = e.text()
              , f = e.attr("subformid")
              , e = e.attr("key")
              , c = c.attr("value")
              , z = ""
              , g = ""
              , h = []
              , z = "Text TextArea Email Phone Mobile FileComponent PositionComponent".split(" ")
              , g = ["DateComponent", "Money", "NumberComponent", "Monitor", "Raty"]
              , k = {
                fieldId: k,
                fieldTitle: d,
                subFormId: f,
                com_key: e,
                term: c
            };
            if ("null" != c && "notnull" != c)
                if (l.getType(e, z)) {
                    z = $.trim(a.find("input").val());
                    if ("" == z)
                        return !0;
                    k.content = z
                } else if (l.getType(e, g)) {
                    z = $.trim(a.find("input").eq(0).val());
                    g = $.trim(a.find("input").eq(1).val());
                    "" == z && (z = null);
                    "" == g && (g = null);
                    if (null == z && null == g)
                        return !0;
                    k.content = z;
                    k.endContent = g
                } else if ("ComboSelect" == e) {
                    var r = [];
                    b.find(".entity-item").each(function(a) {
                        a = $(this).find("a").attr("selectId");
                        var e;
                        a: {
                            for (e = 0; e < r.length; e++)
                                if (r[e].fieldId == a) {
                                    e = !0;
                                    break a
                                }
                            e = !1
                        }
                        e || r.push({
                            fieldId: a,
                            com_key: "Select"
                        })
                    });
                    for (a = 0; a < r.length; a++)
                        d = r[a],
                        h = [],
                        b.find("a[selectId\x3d'" + d.fieldId + "']").each(function(a) {
                            a = $(this).attr("id");
                            var e = $(this).text();
                            h.push({
                                id: a,
                                text: e
                            })
                        }),
                        d.ids = h;
                    if (0 == r.length)
                        return !0;
                    k.children = r
                } else {
                    b.find(".entity-item").each(function(a) {
                        a = $(this).find("a").eq(0).attr("id");
                        var e = $(this).find("a").eq(0).text();
                        h.push({
                            id: a,
                            text: e
                        })
                    });
                    if (0 == h.length)
                        return !0;
                    k.ids = h
                }
            R.push(k)
        });
        c.filterFormDatas = R;
        return c
    }
    ;
    l.assembleParam = function() {
        var a = $("#filter-condition")
          , e = {}
          , c = [];
        a.find("#search-group-list .j_progressSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition");
            var e = e.attr("value")
              , b = ""
              , b = $.trim(a.find("input").val());
            "" == b && (b = null);
            if (null == b)
                return !0;
            c.push({
                content: b,
                term: e
            })
        });
        e.progress = c;
        var b = [];
        a.find("#search-group-list .j_isFinishedSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition .j_selected");
            var e = e.attr("value")
              , c = [];
            a.find(".entity-item").each(function(a) {
                a = $(this).find("a").attr("status");
                c.push(a)
            });
            if (0 == c.length)
                return !0;
            b.push({
                ids: c,
                term: e
            })
        });
        e.isFinished = b;
        var d = [];
        a.find("#search-group-list .j_nameSearchGroup").each(function(a) {
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
        e.names = d;
        var f = [];
        a.find("#search-group-list .j_flowNameSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition");
            var e = e.attr("value")
              , c = ""
              , c = $.trim(a.find("input").val());
            "" == c && (c = null);
            if (null == c)
                return !0;
            f.push({
                content: c,
                term: e
            })
        });
        e.flowNames = f;
        var g = [];
        a.find("#search-group-list .j_descriptionSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition");
            var e = e.attr("value")
              , c = ""
              , c = $.trim(a.find("input").val());
            "" == c && (c = null);
            if (null == c)
                return !0;
            g.push({
                content: c,
                term: e
            })
        });
        e.descriptions = g;
        var h = [];
        a.find("#search-group-list .j_createTimeSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition");
            var e = e.attr("value")
              , c = ""
              , b = ""
              , c = $.trim(a.find("input").eq(0).val())
              , b = $.trim(a.find("input").eq(1).val());
            "" == c && (c = null);
            "" == b && (b = null);
            if (null == c && null == b)
                return !0;
            h.push({
                content: c,
                endContent: b,
                term: e
            })
        });
        e.createTimes = h;
        var m = [];
        a.find("#search-group-list .j_createDateSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition .j_search_default_date option:selected").attr("key");
            if (e)
                e = {
                    selectedOption: e
                };
            else {
                var c = $(this).find(".j_formField-condition")
                  , b = a = "";
                a = $.trim(c.find("input").eq(0).val());
                b = $.trim(c.find("input").eq(1).val());
                "" == a && (a = null);
                "" == b && (b = null);
                e = {
                    content: a,
                    endContent: b,
                    term: e
                };
                if (null == a && null == b)
                    return !0
            }
            m.push(e)
        });
        e.createdates = m;
        var A = [];
        a.find("#search-group-list .j_lastUpdateTimeSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition .j_search_default_date option:selected").attr("key");
            if (e)
                e = {
                    selectedOption: e
                },
                m.push(e);
            else {
                var c = $(this).find(".j_formField-condition")
                  , b = a = "";
                a = $.trim(c.find("input").eq(0).val());
                b = $.trim(c.find("input").eq(1).val());
                "" == a && (a = null);
                "" == b && (b = null);
                e = {
                    content: a,
                    endContent: b,
                    term: e
                };
                if (null == a && null == b)
                    return !0;
                A.push(e)
            }
        });
        e.lastUpdateTimes = A;
        var x = [];
        a.find("#search-group-list .j_flowSubmitTimeSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition .j_search_default_date option:selected").attr("key");
            if (e)
                e = {
                    selectedOption: e
                };
            else {
                var c = $(this).find(".j_formField-condition")
                  , b = a = "";
                a = $.trim(c.find("input").eq(0).val());
                b = $.trim(c.find("input").eq(1).val());
                "" == a && (a = null);
                "" == b && (b = null);
                e = {
                    content: a,
                    endContent: b,
                    term: e
                };
                if (null == a && null == b)
                    return !0
            }
            x.push(e)
        });
        e.flowSubmitTimes = x;
        var C = [];
        a.find("#search-group-list .j_flowFinishTimeSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition .j_search_default_date option:selected").attr("key");
            if (e)
                e = {
                    selectedOption: e
                };
            else {
                var c = $(this).find(".j_formField-condition")
                  , b = a = "";
                a = $.trim(c.find("input").eq(0).val());
                b = $.trim(c.find("input").eq(1).val());
                "" == a && (a = null);
                "" == b && (b = null);
                e = {
                    content: a,
                    endContent: b,
                    term: e
                };
                if (null == a && null == b)
                    return !0
            }
            C.push(e)
        });
        e.flowFinishTime = C;
        var n = [];
        a.find("#search-group-list .j_startTimeSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition");
            var c = e.attr("key");
            if (c)
                a = {
                    selectedOption: c
                };
            else {
                var b = e = ""
                  , e = $.trim(a.find("input").eq(0).val())
                  , b = $.trim(a.find("input").eq(1).val());
                "" == e && (e = null);
                "" == b && (b = null);
                a = {
                    content: e,
                    endContent: b,
                    term: c
                };
                if (null == e && null == b)
                    return !0
            }
            n.push(a)
        });
        e.startTimes = n;
        var D = [];
        a.find("#search-group-list .j_duedateSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition");
            var c = e.attr("key");
            if (c)
                a = {
                    selectedOption: c
                };
            else {
                var b = e = ""
                  , e = $.trim(a.find("input").eq(0).val())
                  , b = $.trim(a.find("input").eq(1).val());
                "" == e && (e = null);
                "" == b && (b = null);
                a = {
                    content: e,
                    endContent: b,
                    term: c
                };
                if (null == e && null == b)
                    return !0
            }
            D.push(a)
        });
        e.duedates = D;
        var E = [];
        a.find("#search-group-list .j_commentTimeSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition");
            var c = e.attr("key");
            if (c)
                a = {
                    selectedOption: c
                };
            else {
                var b = e = ""
                  , e = $.trim(a.find("input").eq(0).val())
                  , b = $.trim(a.find("input").eq(1).val());
                "" == e && (e = null);
                "" == b && (b = null);
                a = {
                    content: e,
                    endContent: b,
                    term: c
                };
                if (null == e && null == b)
                    return !0
            }
            E.push(a)
        });
        e.commentTimes = E;
        var G = [];
        a.find("#search-group-list .j_typeSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition .j_selected");
            var e = e.attr("value")
              , c = [];
            a.find(".entity-item").each(function(a) {
                a = $(this).find("a").attr("status");
                c.push(a)
            });
            if (0 == c.length)
                return !0;
            G.push({
                ids: c,
                term: e
            })
        });
        e.types = G;
        var u = [];
        a.find("#search-group-list .j_flowStatusSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition .j_selected");
            var e = e.attr("value")
              , c = [];
            a.find(".entity-item").each(function(a) {
                a = $(this).find("a").attr("status");
                c.push(a)
            });
            if (0 == c.length)
                return !0;
            u.push({
                ids: c,
                term: e
            })
        });
        e.flowStatuss = u;
        var y = [];
        a.find("#search-group-list .j_statusSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition .j_selected");
            var e = e.attr("value")
              , c = [];
            a.find(".entity-item").each(function(a) {
                a = $(this).find("a").attr("status");
                c.push(a)
            });
            if (0 == c.length)
                return !0;
            y.push({
                ids: c,
                term: e
            })
        });
        e.datastatus = y;
        var F = [];
        a.find("#search-group-list .j_optSearchGroup").each(function(a) {
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
            F.push({
                ids: c,
                term: e
            })
        });
        e.operators = F;
        var H = [];
        a.find("#search-group-list .j_flowOperatorSearchGroup").each(function(a) {
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
            H.push({
                ids: c,
                term: e
            })
        });
        e.flowOperators = H;
        var I = [];
        a.find("#search-group-list .j_flowOperatorDeptSearchGroup").each(function(a) {
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
            I.push({
                ids: c,
                term: e
            })
        });
        e.flowOperatorDepts = I;
        var J = [];
        a.find("#search-group-list .j_creatorSearchGroup").each(function(a) {
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
            J.push({
                ids: c,
                term: e
            })
        });
        e.creators = J;
        var K = [];
        a.find("#search-group-list .j_managerSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition .j_selected");
            var e = e.attr("value")
              , c = [];
            a.find(".entity-item").each(function(a) {
                a = $(this).find("a").eq(0).attr("id");
                c.push(a)
            });
            if (0 == c.length)
                return !0;
            K.push({
                ids: c,
                term: e
            })
        });
        e.managers = K;
        var O = [];
        a.find("#search-group-list .j_shareManSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition .j_selected");
            var e = e.attr("value")
              , c = [];
            a.find(".entity-item").each(function(a) {
                a = $(this).find("a").eq(0).attr("id");
                c.push(a)
            });
            if (0 == c.length)
                return !0;
            O.push({
                ids: c,
                term: e
            })
        });
        e.shareMans = O;
        var P = [];
        a.find("#search-group-list .j_participantSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition .j_selected");
            var e = e.attr("value")
              , c = [];
            a.find(".entity-item").each(function(a) {
                a = $(this).find("a").eq(0).attr("id");
                c.push(a)
            });
            if (0 == c.length)
                return !0;
            P.push({
                ids: c,
                term: e
            })
        });
        e.participants = P;
        var L = [];
        a.find("#search-group-list .j_prioritySearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-condition select option:selected");
            a = $(this).find(".j_formField-condition .j_selected");
            var e = e.attr("value")
              , c = [];
            a.find(".entity-item").each(function(a) {
                a = $(this).find("a").attr("status");
                c.push(a)
            });
            if (0 == c.length)
                return !0;
            L.push({
                ids: c,
                term: e
            })
        });
        e.prioritys = L;
        var Q = [];
        a.find("#search-group-list .j_formFieldSearchGroup").each(function(a) {
            var e = $(this).find(".j_formField-select select option:selected")
              , c = $(this).find(".j_formField-condition .j_condition option:selected");
            a = $(this).find(".j_formField-condition");
            var b = $(this).find(".j_formField-condition .j_selected")
              , k = e.attr("id")
              , d = e.attr("subformid")
              , e = e.attr("key")
              , c = c.attr("value")
              , f = ""
              , z = ""
              , g = []
              , f = "Text TextArea Email Phone Mobile FileComponent PositionComponent".split(" ")
              , z = ["DateComponent", "Money", "NumberComponent", "Monitor", "Raty"]
              , k = {
                fieldId: k,
                subFormId: d,
                com_key: e,
                term: c
            };
            if ("null" != c && "notnull" != c)
                if (l.getType(e, f)) {
                    f = $.trim(a.find("input").val());
                    if ("" == f)
                        return !0;
                    k.content = f
                } else if (l.getType(e, z)) {
                    f = $.trim(a.find("input").eq(0).val());
                    z = $.trim(a.find("input").eq(1).val());
                    "" == f && (f = null);
                    "" == z && (z = null);
                    if (null == f && null == z)
                        return !0;
                    k.content = f;
                    k.endContent = z
                } else if ("ComboSelect" == e) {
                    var h = [];
                    b.find(".entity-item").each(function(a) {
                        a = $(this).find("a").attr("selectId");
                        var e;
                        a: {
                            for (e = 0; e < h.length; e++)
                                if (h[e].fieldId == a) {
                                    e = !0;
                                    break a
                                }
                            e = !1
                        }
                        e || h.push({
                            fieldId: a,
                            com_key: "Select"
                        })
                    });
                    for (a = 0; a < h.length; a++)
                        d = h[a],
                        g = [],
                        b.find("a[selectId\x3d'" + d.fieldId + "']").each(function(a) {
                            a = $(this).attr("id");
                            g.push(a)
                        }),
                        d.ids = g;
                    if (0 == h.length)
                        return !0;
                    k.children = h
                } else {
                    b.find(".entity-item").each(function(a) {
                        a = $(this).find("a").attr("id");
                        g.push(a)
                    });
                    if (0 == g.length)
                        return !0;
                    k.ids = g
                }
            Q.push(k)
        });
        e.filterFormDatas = Q;
        return e
    }
    ;
    l.checkComboOptionName = function(a) {
        for (var e = !1, c = [], e = 0; e < a.length; e++) {
            var b = a[e];
            c.push(b.name.trim())
        }
        b = c.sort();
        for (e = 0; e < b.length; e++)
            if (b[e] == b[e + 1])
                return e = !0;
        for (e = 0; e < a.length; e++)
            if (b = a[e],
            b.children && 0 < b.children.length) {
                for (var d = [], c = 0; c < b.children.length; c++) {
                    var f = b.children[c];
                    d.push(f.name.trim())
                }
                b = d.sort();
                for (d = 0; d < b.length; d++)
                    if (b[d] == b[d + 1])
                        return e = !0
            }
        for (e = 0; e < a.length; e++)
            if (b = a[e],
            b.children && 0 < b.children.length)
                for (c = 0; c < b.children.length; c++)
                    if (f = b.children[c],
                    f.children && 0 < f.children.length) {
                        for (var l = [], d = 0; d < f.children.length; d++)
                            l.push(f.children[d].name.trim());
                        f = l.sort();
                        for (d = 0; d < f.length; d++)
                            if (f[d] == f[d + 1])
                                return e = !0
                    }
    }
    ;
    l.getType = function(a, e) {
        return -1 < e.toString().indexOf(a) ? !0 : !1
    }
    ;
    l.queryDocFields = function() {
        var a = null;
        $.ajax({
            contentType: "application/json",
            type: "GET",
            async: !1,
            data: {
                module: "document"
            },
            dataType: "json",
            url: "/docfreeform/getFormFields",
            success: function(e) {
                e && e.data && (a = e.data);
                $("#widget-control .field-active").data("formFields", a)
            }
        });
        return a
    }
    ;
    l.queryFormFields = function(a, e) {
        var c = {};
        c.formId = a;
        c.module = l.module;
        var b = "/formdatastat/findAdvSearchField.json";
        "workflow" == e && (b = TEAMS.service.flow + "/flowdatastat/findAdvSearchField.json");
        var d = null;
        $.ajax({
            contentType: "application/json",
            type: TEAMS.ajaxMethod,
            async: !1,
            data: JSON.stringify(c),
            dataType: "json",
            url: b,
            success: function(a) {
                a && a.message || (d = a.formFields,
                $("#widget-control .field-active").data("formFields", d))
            }
        });
        return d
    }
    ;
    l.renderFieldsByDoc = function(a, e) {
        a.find(".j_fieldOption").remove();
        _.each(e, function(e) {
            var c = $("\x3coption id\x3d" + e.id + " key\x3d" + e.type + "\x3e" + e.name + "\x3c/option\x3e");
            c.addClass("j_fieldOption");
            c.data("layoutDetail", e.options);
            a.append(c)
        })
    }
    ;
    l.renderFields = function(a, e) {
        a.find(".j_fieldOption").remove();
        var c = $("#editor-component").find("#form_select_input").attr("module");
        _.each(e, function(e) {
            var b = e.id
              , d = e.componentKey
              , k = e.title
              , f = $("\x3coption id\x3d" + b + " key\x3d" + d + "\x3e" + k + "\x3c/option\x3e");
            e.subForm && e.subForm.id && (f = $("\x3coption id\x3d" + b + " subFormId\x3d" + e.subForm.id + " key\x3d" + d + "\x3e" + k + "\x3c/option\x3e"));
            f.addClass("j_fieldOption");
            0 != e["delete"] && (f.addClass("option-line"),
            f.text(f.text() + "(\u5df2\u5220\u9664)"));
            "ImageComponent" != d && "FileComponent" != d && "FormComponent" != d && ("DataSource" == e.componentKey && f.attr("sourceModule", e.sourceModule),
            "workflow" != c ? (f.data("layoutDetail", e.layoutDetail),
            a.append(f)) : "ComboSelect" != d && (f.data("layoutDetail", e.layoutDetail),
            a.append(f)))
        })
    }
    ;
    l.renderFormFields = function(a) {
        var e = $("#editor-component")
          , c = $("#widget-control .field-active").data("componentData")
          , b = e.find(".j_clone .j_form-field-li").clone();
        e.find(".j_showField .j_form-field-ul").empty();
        if (0 == a.length) {
            var d = e.find(".j_clone .j_option").clone();
            d.attr("value", "nofields").attr("id", "nofields").text("\u65e0\u5b57\u6bb5\u5185\u5bb9\uff01");
            b.find(".j_form-field-select").append(d);
            b.find("select").find("option[value\x3d'nofields']").attr("selected", !0);
            e.find(".j_showField .j_form-field-ul").append(b);
            e.find(".j_showField").removeClass("hide");
            c.setFieldIds(["nofields"]);
            e.find(".j_batch_edit").attr("formId", formId).addClass("hide")
        } else {
            for (var f = 0; f < a.length; f++) {
                var d = e.find(".j_clone .j_option").clone()
                  , l = a[f];
                d.attr("value", l.id).attr("id", l.id).attr("title", l.title);
                d.text(l.title);
                0 == b.find(".j_form-field-select").find("#" + l.id).length && b.find(".j_form-field-select").append(d)
            }
            e.find(".j_showField .j_form-field-ul").append(b);
            e.find(".j_showField").removeClass("hide");
            e.find(".j_batch_edit").attr("formId", formId).removeClass("hide");
            a = e.find(".j_showField .j_form-field-select").val();
            e = e.find(".j_showField .j_form-field-select").find("option[value\x3d'" + a + "']").text();
            b = [];
            b.push(a + "_" + e);
            c.setFieldIds(b)
        }
    }
    ;
    l.queryMyForms = function(a, e) {
        var c = {}
          , b = TEAMS.service.formreport + "/reportform/queryFormsByTenantKey.json";
        "workflow" == e ? (c.queryType = "flowManange",
        c.formParam = {
            keyword: a
        },
        c.pageSize = 10,
        c.pageNo = 1,
        b = TEAMS.service.flow + "/flowform/findCompany.json") : "task" == e ? (c.queryType = "task",
        c.filter = {
            keyword: a
        },
        c.pageSize = 10,
        c.pageNo = 1,
        b = "/form/queryTaskByTenantKey.json") : (c.module = "biaoge",
        c.keyword = a,
        c.pageSize = 10,
        c.pageNo = 1);
        "cloud" == $("#ownership").val() && l.sysMenuId && (c.module = "cloud",
        c.keyword = a,
        c.pageSize = 10,
        c.pageNo = 1,
        c.sysMenuId = l.sysMenuId,
        c.ownership = "cloud",
        b = "/form/queryFormsBySysMenuId.json");
        $.ajax({
            contentType: "application/json",
            type: TEAMS.ajaxMethod,
            data: JSON.stringify(c),
            dataType: "json",
            url: b,
            success: function(a) {
                if (a.message)
                    m.notify(a.message);
                else {
                    var c = ""
                      , c = "task" == e ? a.taskFormLinks : a.formPage.result;
                    if (0 == c.length)
                        "task" == e ? $("#editor-component").find("#form_select_input").attr("value", "\u6682\u65e0\u4efb\u52a1") : "workflow" == $("#module").val() ? $("#editor-component").find("#form_select_input").attr("value", "\u6682\u65e0\u5ba1\u6279\u8868") : $("#editor-component").find("#form_select_input").attr("value", "\u6682\u65e0\u8868\u5355");
                    else {
                        $("#widget-control .field-active").data("formInfo", c);
                        $("#editor-component").find("#search_form_list").empty();
                        a = 0;
                        for (var b = c.length; a < b; a++) {
                            var d = c[a];
                            d.name = d.name.replace(/</g, "\x26lt").replace(/>/g, "\x26gt").replace("/[\r\n]/g", " ");
                            d = "task" == e ? "\x3cp id\x3d'" + d.formId + "' class\x3d'form j_form' style\x3d'width:140px;' title\x3d'" + d.name + "'\x3e" + d.name + "\x3c/p\x3e" : "\x3cp id\x3d'" + d.id + "' class\x3d'form j_form' style\x3d'width:140px;' title\x3d'" + d.name + "'\x3e" + d.name + "\x3c/p\x3e";
                            $("#editor-component").find("#search_form_list").append(d)
                        }
                    }
                }
            }
        })
    }
    ;
    l.changeFormOption = function() {
        var a = $("#widget-control .field-active").data("componentData")
          , e = $("#widget-control .field-active .choicelist_js");
        e.html("");
        "Select" == a.getComponentKey() && e.append("\x3coption value\x3d''\x3e\u8bf7\u9009\u62e9\x3c/option\x3e");
        var c = [];
        $("#editor-component ul.choicelistEdit_js").children().each(function(b) {
            var d = $(this).find(".option_js")
              , f = $(this).find(".optionName_js")
              , l = $(this).find(".j_imageItem").attr("imageid")
              , g = d.attr("uid")
              , h = d.val()
              , d = d.is(":checked")
              , f = f.val()
              , m = !1;
            $(this).hasClass("otherOption_js") && (m = !0,
            f = "\u5176\u4ed6",
            h = $(this).find(".other_option_js").attr("value"));
            l = new Option({
                name: f,
                order: b,
                index: 0,
                selectionId: h,
                defOption: d,
                other: m,
                objId: l,
                uid: g
            });
            l.render(e, a);
            c[b] = l.componentSetup
        });
        a.setOptions(c)
    }
    ;
    l.componentDraggableEvents = function() {
        l.fromAndColPanelSortable();
        l.subFromSortable();
        $("#form-widget-list .drag-into-layout .widget-item:not(.not_subform_js)").draggable({
            connectToSortable: "#widget-control,.subtr_js td,.j_tab_content_new",
            helper: "clone",
            opacity: .8,
            appendTo: "body",
            start: function(a, e) {
                l.currentDrag = $(this);
                $(".ui-draggable-dragging").css({
                    height: "auto",
                    "float": "none",
                    width: "270px"
                })
            }
        }).disableSelection();
        $("#form-widget-list .drag-into-layout .not_subform_js").draggable({
            connectToSortable: "#widget-control,.j_tab_content_new",
            helper: "clone",
            opacity: .8,
            appendTo: "body",
            start: function(a, e) {
                l.currentDrag = $(this);
                $(".ui-draggable-dragging").css({
                    height: "auto",
                    "float": "none",
                    width: "270px"
                })
            }
        }).disableSelection();
        $("#layout-widget-list .widget-item").draggable({
            connectToSortable: "#widget-control,.j_tab_content_new",
            helper: "clone",
            appendTo: "body",
            start: function(a, e) {
                l.currentDrag = $(this);
                $(".ui-draggable-dragging").css({
                    height: "auto",
                    "float": "none",
                    width: "270px"
                })
            },
            stop: function(a, e) {}
        }).disableSelection()
    }
    ;
    l.sortableProcess = function(a) {
        if (!a.is("td")) {
            if (null != a && null != l.currentDrag) {
                var b = a.attr("componentKey")
                  , c = null;
                if (c = l.currentDrag.data("layoutDetail")) {
                    var c = JSON.parse(c)
                      , d = function(a) {
                        a.uid = q.uid();
                        if (null != a.children && 0 < a.children.length)
                            for (var b = 0; b < a.children.length; b++)
                                d(a.children[b])
                    };
                    if (c.options && 0 < c.options.length)
                        for (var f = 0; f < c.options.length; f++)
                            d(c.options[f]);
                    c = new window[b](c);
                    c.renderEditPreview(a, !0);
                    "TabControl" == a.attr("componentkey") && c.setTabheadWidth(a);
                    a = $(".field_js[tempid\x3d'" + c.componentSetup.tempId + "']")
                } else
                    f = a.attr("type"),
                    c = new window[b],
                    f && "function" == typeof c.setType && c.setType(f),
                    c.render(a),
                    "TabControl" == a.attr("componentkey") && c.setTabheadWidth(a);
                this.addComponentModel(c);
                a.data("componentData", c);
                $(".subtd_js ").find(".general_js").remove()
            }
            if (a.parent().hasClass("cell_js") && 1 <= a.siblings().length)
                if (null != l.currentDrag)
                    a.remove();
                else
                    return !1;
            if (0 < a.parent("td").length && 2 <= a.siblings().length)
                if (null != l.currentDrag)
                    a.remove();
                else
                    return !1;
            if (null != a && a.hasClass("form-layout_js") || a.hasClass("subform_js") || a.hasClass("table_layout_js")) {
                if (a.parent().hasClass("cell_js") || 0 < a.parent("td").length)
                    if (null != l.currentDrag)
                        a.remove();
                    else
                        return !1
            } else if (null != a && a.hasClass("field_js"))
                a.click();
            else if (null != a && a.hasClass("subtd_js"))
                a.find(".field_js").click();
            else if (null != a && a.hasClass("tabcontrlo-layout_js") && (a.parent().hasClass("cell_js") || 0 < a.parent("td").length || a.parent().hasClass("j-tab-content")))
                if (null != l.currentDrag)
                    a.remove();
                else
                    return !1;
            null != a && a.hasClass("tabcontrlo-layout_js") && (a.find(".j_edit_tabControl").click(),
            l.fromAndColPanelSortable(),
            l.tabSortable());
            null != a && a.hasClass("form-layout_js") && (l.fromAndColPanelSortable(),
            l.tabSortable());
            null != a && a.hasClass("subform_js") && (a.find(".field_subform_js").click(),
            l.subFromSortable());
            null != a && a.hasClass("table_layout_js") && (l.fromAndColPanelSortable(),
            l.tabSortable());
            l.currentDrag = null
        }
    }
    ;
    l.fromAndColPanelSortable = function() {
        var a = $("#widget-control,.cell_js,.j_tablelayout td,.j_tab_content_new")
          , e = $("#widget-control,.j_tab_content_new");
        e.sortable({
            connectWith: a,
            placeholder: "form-placeholder-filed ",
            cancel: ".j_cancel-drag",
            stop: function(a, e) {
                return l.sortableProcess(e.item)
            },
            over: function(a, e) {
                $(this).find(".form-placeholder-filed").show()
            },
            out: function(a, e) {}
        }).disableSelection();
        e.find(".cell_js").sortable({
            connectWith: a,
            placeholder: "form-placeholder-filed ",
            cancel: ".j_cancel-drag",
            stop: function(a, e) {
                return l.sortableProcess(e.item)
            },
            over: function(a, e) {
                if (1 <= $(this).find(".field_js").length)
                    $(this).find(".form-placeholder-filed").hide();
                else {
                    var c = e.item.attr("componentkey");
                    "DataTable" != c && "ColumnPanel" != c && "TableLayout" != c || $(this).find(".form-placeholder-filed").hide()
                }
            },
            out: function(a, e) {
                $(this).find(".form-placeholder-filed").show()
            }
        }).disableSelection();
        $(".j_tablelayout td").sortable({
            connectWith: a,
            placeholder: "form-placeholder-filed ",
            start: function(a, e) {
                $(".ui-draggable-dragging").css({
                    height: "auto",
                    "float": "none",
                    width: "270px"
                })
            },
            stop: function(a, e) {
                return 0 != e.item.parent("td").length && 0 != e.item.siblings().length ? !1 : l.sortableProcess(e.item)
            },
            over: function(a, e) {
                if (1 <= $(this).find(".field_js").length)
                    $(this).find(".form-placeholder-filed").hide();
                else {
                    var c = e.item.attr("componentkey")
                      , c = e.item.attr("componentkey");
                    "DataTable" == c || "ColumnPanel" == c || "TableLayout" == c ? $(this).find(".form-placeholder-filed").hide() : $(this).find(".form-placeholder-filed").show()
                }
            },
            out: function(a, e) {}
        })
    }
    ;
    l.subFromSortable = function() {
        var a = $("#widget-control .subtable_js");
        a.find("tr").sortable({
            connectWith: a,
            placeholder: "form-placeholder-filed ",
            stop: function(a, e) {
                return l.sortableProcess(e.item)
            },
            over: function(a, e) {
                $(this).parent().parent().addClass("form-layout-active")
            },
            cancel: ".j_notIstr",
            scroll: !1,
            sort: function(a, e) {
                e.item.parent().find(".form-placeholder-filed").css({
                    width: e.item.width() - 2,
                    height: e.item.find(".field").height() - 2
                })
            },
            out: function(a, e) {
                $(this).parent().parent().removeClass("form-layout-active")
            }
        });
        a.find("tr").find("td").sortable({
            items: ":not(*)",
            placeholder: "form-placeholder-filed ",
            stop: function(a, e) {
                var c = new DataTable
                  , b = e.item.attr("componentkey")
                  , c = c.filterItme[b];
                if ((1 == e.item.siblings().length && e.item.siblings().hasClass("ui-resizable-handle") || 0 == e.item.siblings().length) && null == c)
                    return l.sortableProcess(e.item);
                e.item.remove()
            },
            over: function(a, e) {
                if (1 <= e.item.siblings(".field_js").length)
                    e.item.parents(".subform_js").find(".form-placeholder-filed").hide();
                else {
                    var c = new DataTable
                      , b = e.item.attr("componentkey");
                    null != c.filterItme[b] && e.item.parents(".subform_js").find(".form-placeholder-filed").hide()
                }
            },
            out: function(a, e) {}
        })
    }
    ;
    l.tabSortable = function() {
        var a = $("#widget-control,.cell_js,.j_tablelayout td,.j_tab_content_new");
        $("#widget-control .j_tab_content_new").sortable({
            connectWith: a,
            placeholder: "form-placeholder-filed ",
            start: function(a, c) {
                $(".ui-draggable-dragging").css({
                    height: "auto",
                    "float": "none",
                    width: "270px"
                })
            },
            stop: function(a, c) {
                return l.sortableProcess(c.item)
            },
            over: function(a, c) {}
        })
    }
    ;
    l.formSetupEvents = function() {
        $(document).on("keydown", "#edit-form #name-form", function(a) {
            a = $(this).val();
            $(".form-design .form-view .form-head .form-name").text(a);
            $(".form-preview .form-name").text(a)
        });
        $(document).on("keyup", "#edit-form #name-form", function(a) {
            a = $(this).val();
            $(".form-design .form-view .form-head .form-name").text(a);
            $(".form-preview .form-name").text(a)
        });
        $(document).on("blur", "#edit-form #name-form", function(a) {
            l.checkFormName(function(a) {
                a.message ? ($("#edit-form .c-danger").show(),
                $("#edit-form .c-danger").text(a.message)) : $("#edit-form .c-danger").hide()
            })
        });
        $(document).on("keydown", "#edit-form #description-form", function(a) {
            a = $(this).val();
            $(".form-design .form-view .form-head .form-description").text(a);
            $(".form-preview .form-description").text(a)
        });
        $(document).on("keyup", "#edit-form #description-form", function(a) {
            a = $(this).val();
            $(".form-design .form-view .form-head .form-description").text(a);
            $(".form-preview .form-description").text(a)
        });
        $("#edit-form").find(".color-box").colpick({
            flat: !0,
            layout: "hex",
            color: '#bbbbbb',
            submit: 0,
            onChange: function(f, d, b, c) {
                var rgb = "rgb("+(255-b.b)+","+(255-b.g)+","+(255-b.r)+")";
                $(".form-view .form-head").css("background-color", "#" + d);
                $(".form-view .form-head .form-name").css("color", rgb);
                $('#colorScheme').val(rgb);
                $('#bgcolorScheme').val("#"+d);
            }
        })
     //   l.loadformownership()
    }
    ;
    l.checkFormName = function(a) {
        var c = $.trim($("#name-form").val());
        if ("" == c)
            $("#edit-form .c-danger").show(),
            "workflow" == $("#module").val() ? $("#edit-form .c-danger").text("\u8bf7\u8f93\u5165\u5ba1\u6279\u8868\u6807\u9898") : $("#edit-form .c-danger").text("\u8bf7\u8f93\u5165\u8868\u5355\u6807\u9898"),
            $(".j_edit_tab[edit-type\x3d'form']").click();
        else if (120 < m.getByteLen(c))
            $("#edit-form .c-danger").show(),
            "workflow" == $("#module").val() ? $("#edit-form .c-danger").text("\u5ba1\u6279\u8868\u540d\u79f0\u8fc7\u957f") : $("#edit-form .c-danger").text("\u8868\u5355\u540d\u79f0\u8fc7\u957f"),
            $(".j_edit_tab[edit-type\x3d'form']").click();
        else {
            var b = {}
              , d = l.formId
              , f = $("input[name\x3d'ownership']:checked").val();
            f || (f = $("#name-form").attr("ownership"));
         //   "personal" == f && (b["form.operator"] = TEAMS.currentUser.id);
            b["form.id"] = d;
            b["form.name"] = c;
            b["form.ownership"] = f;
            d = $("#module").val();
            b["form.module"] = d;
            b.module = d;
            "biaoge_report" == d && (b["form.report.id"] = $("#reportId").val());
            "" != c && $.ajax({
                type: TEAMS.ajaxMethod,
                url: TEAMS.api.checkFormName,
                dataType: "json",
                data: b,
                success: function(e) {
                    a(e)
                }
            })
        }
    }
    ;
    // l.loadformownership = function() {
    //     var a = TEAMS.currentUser.admin
    //       , e = TEAMS.currentTenant.tenantKey;
    //     !a || $(formId).val() ? $("#edit-form div.js_formownership").remove() : $("#edit-form div.js_formownership").show();
    //     a || $(formId).val() || $("#edit-form #name-form").attr("ownership", "personal");
    //     "t7akvdnf84" == e && $("#edit-form div.js_formownership div.js_formowner").append('\x3clabel class\x3d"radio-inline"\x3e\x3cinput type\x3d"radio" value\x3d"cloud" name\x3d"ownership"\x3esmartheer\u4e91\u8868\u5355\x3c/label\x3e');
    //     e = $("#module").val();
    //     if ("biaoge" == e || "workflow" == e)
    //         "biaoge" == e && (e = "form"),
    //         (a || 0 <= $.inArray(e, TEAMS.moduleAdmins.modules)) && $(".j_userbtns .j_edit_data_sources").show()
    // }
    // ;
    l.renderCkEditor = function() {
        l.ckEditor = CKEDITOR.replace("descriptionEdit", {
            toolbar: [{
                name: "tools",
                items: "Link Unlink - Bold Italic Underline - TextColor BGColor".split(" ")
            }, {
                name: "styles",
                items: ["Font", "FontSize"]
            }, {
                name: "paragraph",
                groups: ["list", "align"],
                items: "NumberedList BulletedList - JustifyLeft JustifyCenter JustifyRight JustifyBlock - Maximize".split(" ")
            }, {
                name: "colors"
            }],
            height: 200
        });
        var a = $("#widget-control .field-active")
          , e = $("#widget-control .field-active").data("componentData");
        l.ckEditor.paragraph = a;
        (a = a.find(".paragraph").html()) && l.ckEditor.setData(a);
        l.ckEditor.on("change", function(a) {
            a = this.getData();
            this.paragraph.find(".paragraph").html(a);
            e.setContent(a)
        });
        l.ckEditor.on("instanceReady", function() {
            var a = this;
            this.document.on("keyup", function() {
                var c = a.getData();
                l.ckEditor.paragraph.find(".paragraph").html(c);
                e.setContent(c)
            });
            this.document.on("keydown", function() {
                var c = a.getData();
                l.ckEditor.paragraph.find(".paragraph").html(c);
                e.setContent(c)
            })
        })
    }
    ;
    l.formIntro = function() {
        $("body").addClass("introjs-open");
        var a = [{
            element: "#formContainer_js #formContent",
            intro: "\x3ch5\x3e\u8868\u5355\u7f16\u8f91\u533a\x3c/h5\x3e\u53ef\u4e3a\u8868\u5355\u8bbe\u8ba1\u6392\u7248\x3cbr\x3e1\u3001\u53ef\u4ee5\u968f\u610f\u62d6\u62fd\u63a7\u4ef6\u7684\u4f4d\u7f6e\uff1b\x3cbr\x3e2\u3001\u53ef\u4ee5\u5220\u9664\u4e0d\u9700\u8981\u7684\u63a7\u4ef6\uff1b\x3cbr\x3e3\u3001\u4e00\u4e9b\u7279\u6b8a\u63a7\u4ef6\u7684\u64cd\u4f5c(\u5982\u660e\u7ec6\u5b50\u8868\u589e\u52a0\u5217)\uff1b\x3cbr\x3e\x3cbr\x3e",
            position: "left"
        }, {
            element: "#form-widget #form-widget-list",
            intro: "\x3ch5\x3e\u5b57\u6bb5\u63a7\u4ef6\x3c/h5\x3e\u4ee5\u62d6\u62fd\u7684\u65b9\u5f0f\u9009\u62e9\u60a8\u9700\u8981\u7684\u63a7\u4ef6\uff0c\u62d6\u5230\u4e2d\u95f4\u7684\u8868\u5355\u7f16\u8f91\u533a\uff1b\x3cbr\x3e\x3cbr\x3e",
            position: "right"
        }, {
            element: "#formEdit_js #edit-widget",
            intro: "\x3ch5\x3e\u63a7\u4ef6\u8bbe\u7f6e\x3c/h5\x3e\u53ef\u4ee5\u8bbe\u7f6e\u5f53\u524d\u9009\u4e2d\u63a7\u4ef6\u7684\u76f8\u5173\u4fe1\u606f\uff1b\x3cbr\x3e\x3cbr\x3e",
            position: "left"
        }, {
            element: "#form-widget #layout-widget-list",
            intro: "\x3ch5\x3e\u5e03\u5c40\u63a7\u4ef6\x3c/h5\x3e\u5e03\u5c40\u63a7\u4ef6\u4e2d\u53ef\u62d6\u5165\u5b57\u6bb5\u63a7\u4ef6\uff0c\u672c\u8eab\u65e0\u663e\u793a\u6548\u679c\uff1b\x3cbr\x3e\x3cbr\x3e",
            position: "right"
        }, {
            element: ".header .j_userbtns",
            intro: "1\u3001\u4fdd\u5b58\uff1a\u8868\u5355\u7f16\u8f91\u5b8c\u6bd5\u540e\u8bb0\u5f97\u4fdd\u5b58\u60a8\u7684\u8868\u5355\uff1b\x3cbr\x3e2\u3001" + ("biaoge" == l.module ? "\u4fdd\u5b58\u5e76\u53d1\u5e03" : "\u4fdd\u5b58\u5e76\u542f\u7528") + "\uff1a\u4fdd\u5b58\u5f53\u524d\u8868\u5355\u6570\u636e\u5e76\u8bbe\u7f6e\u4e3a\u542f\u7528\u72b6\u6001\uff0c\u53ef\u4ee5\u76f4\u63a5\u4f7f\u7528\u4e86\uff1b\x3cbr\x3e\u53e6\u5916\uff0c\u5728\u201c\u8868\u5355\u8bbe\u7f6e\u201d\u4e0b\uff0c\u60a8\u53ef\u4ee5\u4fee\u6539\u8868\u5355\u540d\u79f0\u53ca\u5176\u76f8\u5e94\u7684\u63cf\u8ff0\u3002\x3cbr\x3e\x3cbr\x3e",
            position: "left"
        }]
          , e = [{
            element: "#formContainer_js #formContent",
            intro: "\x3ch5\x3e\u5ba1\u6279\u8868\u7f16\u8f91\u533a\x3c/h5\x3e\u53ef\u4e3a\u5ba1\u6279\u8868\u8bbe\u8ba1\u6392\u7248\x3cbr\x3e1\u3001\u53ef\u4ee5\u968f\u610f\u62d6\u62fd\u63a7\u4ef6\u7684\u4f4d\u7f6e\uff1b\x3cbr\x3e2\u3001\u53ef\u4ee5\u5220\u9664\u4e0d\u9700\u8981\u7684\u63a7\u4ef6\uff1b\x3cbr\x3e3\u3001\u4e00\u4e9b\u7279\u6b8a\u63a7\u4ef6\u7684\u64cd\u4f5c(\u5982\u660e\u7ec6\u5b50\u8868\u589e\u52a0\u5217)\uff1b\x3cbr\x3e\x3cbr\x3e",
            position: "left"
        }, {
            element: "#form-widget #form-widget-list",
            intro: "\x3ch5\x3e\u5b57\u6bb5\u63a7\u4ef6\x3c/h5\x3e\u4ee5\u62d6\u62fd\u7684\u65b9\u5f0f\u9009\u62e9\u60a8\u9700\u8981\u7684\u63a7\u4ef6\uff0c\u62d6\u5230\u4e2d\u95f4\u7684\u5ba1\u6279\u8868\u7f16\u8f91\u533a\uff1b\x3cbr\x3e\x3cbr\x3e",
            position: "right"
        }, {
            element: "#formEdit_js #edit-widget",
            intro: "\x3ch5\x3e\u63a7\u4ef6\u8bbe\u7f6e\x3c/h5\x3e\u53ef\u4ee5\u8bbe\u7f6e\u5f53\u524d\u9009\u4e2d\u63a7\u4ef6\u7684\u76f8\u5173\u4fe1\u606f\uff1b\x3cbr\x3e\x3cbr\x3e",
            position: "left"
        }, {
            element: "#form-widget #layout-widget-list",
            intro: "\x3ch5\x3e\u5e03\u5c40\u63a7\u4ef6\x3c/h5\x3e\u5e03\u5c40\u63a7\u4ef6\u4e2d\u53ef\u62d6\u5165\u5b57\u6bb5\u63a7\u4ef6\uff0c\u672c\u8eab\u65e0\u663e\u793a\u6548\u679c\uff1b\x3cbr\x3e\x3cbr\x3e",
            position: "right"
        }, {
            element: ".header .j_userbtns",
            intro: "1\u3001\u4fdd\u5b58\uff1a\u5ba1\u6279\u8868\u7f16\u8f91\u5b8c\u6bd5\u540e\u8bb0\u5f97\u4fdd\u5b58\u60a8\u7684\u5ba1\u6279\u8868\uff1b\x3cbr\x3e2\u3001" + ("biaoge" == l.module ? "\u4fdd\u5b58\u5e76\u53d1\u5e03" : "\u4fdd\u5b58\u5e76\u542f\u7528") + "\uff1a\u4fdd\u5b58\u5f53\u524d\u5ba1\u6279\u8868\u6570\u636e\u5e76\u8bbe\u7f6e\u4e3a\u542f\u7528\u72b6\u6001\uff0c\u53ef\u4ee5\u76f4\u63a5\u4f7f\u7528\u4e86\uff1b\x3cbr\x3e\u53e6\u5916\uff0c\u5728\u201c\u5ba1\u6279\u8868\u8bbe\u7f6e\u201d\u4e0b\uff0c\u60a8\u53ef\u4ee5\u4fee\u6539\u5ba1\u6279\u8868\u540d\u79f0\u53ca\u5176\u76f8\u5e94\u7684\u63cf\u8ff0\u3002\x3cbr\x3e\x3cbr\x3e",
            position: "left"
        }]
          , c = [{
            element: "#formContainer_js #formContent",
            intro: "\x3ch5\x3e\u62a5\u544a\u7f16\u8f91\u533a\x3c/h5\x3e\u53ef\u4e3a\u62a5\u544a\u8bbe\u8ba1\u6392\u7248\x3cbr\x3e1\u3001\u53ef\u4ee5\u968f\u610f\u62d6\u62fd\u63a7\u4ef6\u7684\u4f4d\u7f6e\uff1b\x3cbr\x3e2\u3001\u53ef\u4ee5\u5220\u9664\u4e0d\u9700\u8981\u7684\u63a7\u4ef6\uff1b\x3cbr\x3e3\u3001\u4e00\u4e9b\u7279\u6b8a\u63a7\u4ef6\u7684\u64cd\u4f5c\uff1b\x3cbr\x3e\x3cbr\x3e",
            position: "left"
        }, {
            element: "#form-widget #form-widget-list",
            intro: "\x3ch5\x3e\u5b57\u6bb5\u63a7\u4ef6\x3c/h5\x3e\u4ee5\u62d6\u62fd\u7684\u65b9\u5f0f\u9009\u62e9\u60a8\u9700\u8981\u7684\u63a7\u4ef6\uff0c\u62d6\u5230\u4e2d\u95f4\u7684\u62a5\u544a\u7f16\u8f91\u533a\uff1b\x3cbr\x3e\x3cbr\x3e",
            position: "right"
        }, {
            element: "#formEdit_js #edit-widget",
            intro: "\x3ch5\x3e\u63a7\u4ef6\u8bbe\u7f6e\x3c/h5\x3e\u53ef\u4ee5\u8bbe\u7f6e\u5f53\u524d\u9009\u4e2d\u63a7\u4ef6\u7684\u76f8\u5173\u4fe1\u606f\uff1b\x3cbr\x3e\x3cbr\x3e",
            position: "left"
        }, {
            element: "#form-widget #layout-widget-list",
            intro: "\x3ch5\x3e\u5e03\u5c40\u63a7\u4ef6\x3c/h5\x3e\u5e03\u5c40\u63a7\u4ef6\u4e2d\u53ef\u62d6\u5165\u5b57\u6bb5\u63a7\u4ef6\uff0c\u672c\u8eab\u65e0\u663e\u793a\u6548\u679c\uff1b\x3cbr\x3e\x3cbr\x3e",
            position: "right"
        }, {
            element: ".header .j_userbtns",
            intro: "\u4fdd\u5b58\uff1a\u62a5\u544a\u7f16\u8f91\u5b8c\u6bd5\u540e\u8bb0\u5f97\u4fdd\u5b58\u60a8\u7684\u62a5\u8868\uff1b\x3cbr\x3e\u53e6\u5916\uff0c\u5728\u201c\u62a5\u544a\u8bbe\u7f6e\u201d\u4e0b\uff0c\u60a8\u53ef\u4ee5\u4fee\u6539\u62a5\u544a\u540d\u79f0\u53ca\u5176\u76f8\u5e94\u7684\u63cf\u8ff0\u3002\x3cbr\x3e\x3cbr\x3e",
            position: "left"
        }];
        switch (l.module) {
        case "biaoge_report":
            a = c;
            break;
        case "workflow":
            a = e;
            0 < $("body").find(".submit_js:visible").length ? "" : a.length -= 1;
            break;
        default:
            0 < $("body").find(".submit_js:visible").length ? "" : a.length -= 1
        }
        introJs().setOptions({
            prevLabel: "\u4e0a\u4e00\u6b65",
            nextLabel: "\u4e0b\u4e00\u6b65",
            skipLabel: "\u4e0d\u63d0\u793a",
            doneLabel: "\u5b8c\u6210",
            steps: a
        }).onbeforechange(function(a) {
            setTimeout(function() {
                $(".introjs-helperLayer .introjs-tooltip").attr("style", $(".introjs-helperLayer .introjs-tooltip").attr("style") + " min-width:300px;")
            }, 10);
            switch ($(a).attr("id")) {
            case "formContent":
                setTimeout(function() {
                    $(".introjs-helperLayer .introjs-tooltip").attr("style", $(".introjs-helperLayer .introjs-tooltip").attr("style") + " min-width:200px;")
                }, 10);
                $(".form-view-wrapper .mCSB_container").css("top", "0px");
                $(".form-view-wrapper .mCSB_dragger").css("top", "0px");
                break;
            case "form-widget":
            case "form-widget-list":
                $(".j_widget_tab[widget-type\x3d'form']").click();
                break;
            case "layout-widget-list":
                $(".j_widget_tab[widget-type\x3d'layout']").click();
                break;
            case "formEdit_js":
            case "edit-form":
                $(".j_edit_tab[edit-type\x3d'form']").click();
                break;
            case "edit-widget":
                $(".introjs-helperLayer").addClass("introjs-autoheight"),
                setTimeout(function() {
                    $(".introjs-helperLayer").removeClass("introjs-autoheight")
                }, 400),
                null == $("#formContent #widget-control .field_js").get(0) ? (a = "biaoge_report" == $("#module").val() ? $('\x3cdiv class\x3d"field field_js field-active" title\x3d"\u62d6\u62fd\u81f3\u9875\u9762\u4e2d\u95f4\u533a\u57df" componentkey\x3d"PieComponent" style\x3d"display: block;"\x3e\x3cspan class\x3d"j_widgetDele widgetDele-btn"\x3e\x3ci class\x3d"icon-remove-sign"\x3e\x3c/i\x3e\x3c/span\x3e\x3cdiv class\x3d"paragraph alert"\x3e\x3cimg class\x3d"statimg" src\x3d"/static/img/form/pie.png"\x3e\x3c/div\x3e\x3c/div\x3e') : $('\x3cdiv class\x3d"widget-item general_js ui-draggable" componentkey\x3d"Text" title\x3d"\u62d6\u62fd\u81f3\u9875\u9762\u4e2d\u95f4\u533a\u57df"\x3e\x3c/div\x3e'),
                $("#formContent #widget-control").append(a),
                l.currentDrag = a,
                l.sortableProcess(a)) : null == $("#formContent #widget-control .field_js.field-active").get(0) && $("#formContent #widget-control .field_js:eq(0)").click(),
                $(".j_edit_tab[edit-type\x3d'widget']").click()
            }
            window.onbeforeunload = null;
            setTimeout(function() {
                l.beforeunload()
            }, 200)
        }).onchange(function(a) {}).oncomplete(function() {
            l.introSaveConfig()
        }).onexit(function() {
            l.introSaveConfig()
        }).start().refresh()
    }
    ;
    l.introSaveConfig = function() {
        window.onbeforeunload = null;
        setTimeout(function() {
            l.beforeunload()
        }, 200);
        $("body").removeClass("introjs-open");
        if (!l.isShowIntro) {
            l.isShowIntro = !0;
            var a = {
                "config.configKey": "guide.from.createformintro",
                "config.configValue": "1"
            };
            $.ajax({
                type: TEAMS.ajaxMethod,
                dataType: "json",
                url: "/form/findIntroCount.json",
                success: function(e) {
                    1 == !e.introCount && $.ajax({
                        type: TEAMS.ajaxMethod,
                        data: a,
                        dataType: "json",
                        url: "/base/configuration/saveConfig.json",
                        success: function(a) {}
                    })
                }
            })
        }
    }
    ;
    l.initUploader = function(a) {
        var e = this.uploader = new plupload.Uploader({
            runtimes: "html5,flash",
            file_data_name: "data",
            browse_button: ".file-input",
            container: "",
            max_file_size: "50M",
            url: "/base/upload.json?module\x3dform",
            flash_swf_url: "/static/swf/plupload.swf"
        });
        e.init();
        e.bind("FilesAdded", function(a, e) {
            $.each(e, function(a, e) {
                plupload.formatSize(e.size)
            });
            a.refresh();
            a.start()
        });
        e.bind("UploadProgress", function(a, e) {
            $("#" + e.id + " i").html(e.percent + "%")
        });
        e.bind("Error", function(a, e) {
            -600 == e.code && m.notify("\u53ea\u80fd\u4e0a\u4f20\u6700\u5927\u4e0d\u8d85\u8fc750M\u7684\u6587\u4ef6", "\u6587\u4ef6\u5927\u5c0f\u8d85\u8fc7\u9650\u5236", "error");
            a.refresh()
        });
        e.bind("FileUploaded", function(e, c, b) {
            c = jQuery.parseJSON(b.response).fileObj;
            var d = c.name;
            e = c.image;
            c = {
                fileObj: c
            };
            "true" == e || 1 == e ? $.ajax({
                contentType: "application/json",
                type: TEAMS.ajaxMethod,
                dataType: "json",
                data: JSON.stringify(c),
                url: "/formdata/createImage.json",
                success: function(e) {
                    e = e.imageFile.id;
                    a.componentSetup.imageIds.push(e);
                    e = $('\x3cdiv id\x3d"' + e + '" class\x3d"img-item j_imageItem"\x3e\x3cdiv class\x3d"img-box"\x3e\x3ca class\x3d"fancybox" type\x3d"image" href\x3d"/base/download/img/' + e + '/image"\x3e\x3cimg src\x3d"/base/download/img/' + e + '/small"\x3e\x3c/div\x3e\x3cdiv class\x3d"img-opt"\x3e\x3ci class\x3d"icon-minus-sign j_deleteImage"\x3e\x3c/i\x3e\x3c/div\x3e\x3c/div\x3e');
                    e.data("name", d);
                    $(".field-active .img-wedget").append(e);
                    m.notify("\u56fe\u7247\u4e0a\u4f20\u6210\u529f")
                }
            }) : m.notify("\u8bf7\u4e0a\u4f20\u56fe\u7247\u6587\u4ef6", "\u6587\u4ef6\u683c\u5f0f\u4e0d\u6b63\u786e", "error")
        });
        e.bind("UploadComplete", function(a, e) {})
    }
    ;
    l.windowfunction = function() {
        window.getdatastaturl = function(a, e, c) {
            c || (c = "");
            var b = window.location.href
              , d = c + "/formdatastat" + e;
            null != a.module && ("workflow" == a.module || "workflowStat" == a.module || "workflowMenu" == a.module || "formField" == a.module && -1 < window.location.href.indexOf("workflows")) ? d = TEAMS.service.flow + c + "/flowdatastat" + e : (null == a.module || "" == a.module) && -1 < b.indexOf("workflows") ? d = TEAMS.service.flow + c + "/flowdatastat" + e : (null == a.module || "" == a.module) && -1 < b.indexOf("freeform/edit") && -1 < b.indexOf("/workflow") ? d = TEAMS.service.flow + c + "/flowdatastat" + e : (null == a.module || "" == a.module) && -1 < b.indexOf("/free/") && -1 < b.indexOf("/workflow") && (d = TEAMS.service.flow + c + "/flowdatastat" + e);
            return d
        }
    }
    ;
    $(function() {
        l.windowfunction();
        m.initLayout($(".j_scroll_sideBar"));
        m.initLayout($(".j_scroll_formView"));
        m.initLayout($(".j_scroll_edit"));
        m.initLayout($(".j_sortfieldScr"));
        m.initLayout($(".j_filter-conditionScr"));
        setInterval(function() {
            $('[data-toggle\x3d"tooltip"]').tooltip({
                container: "body",
                animation: !0,
                html: !0
            })
        }, 1E3);
        $("#edit-form #description-form").autosize();
        -1 != window.location.search.indexOf("frame\x3dtrue") && ($("figure.logo").remove(),
        $(".j_formHdCapiton").removeClass("fs-20").css({
            margin: "15px 30px 0 15px",
            "font-size": "16px"
        }));
        $(window).off("resize.formlayout").on("resize.formlayout", function(a) {
            l.calculateHeight();
            setTimeout(function() {
                $("body div.scroll-wrapper").each(function(a) {
                    $(this).trigger("resizeSroll", a)
                })
            }, 100)
        });
        $("body").off("resizeSroll").on("resizeSroll", "div.scroll-wrapper", function(a) {
            a = $(this);
            if (a.attr("horizontal")) {
                var e = $(window).width()
                  , c = a.offset().left;
                a.css("width", e - c)
            } else {
                var e = $(window).height()
                  , c = a.attr("marginbottom") || 0
                  , b = a.offset().top;
                a.css("height", e - b - c)
            }
            a.mCustomScrollbar("update")
        });
        $(document).on("click", ".j_widget_tab", function() {
            var a = $(this)
              , e = a.attr("widget-type");
            a.parent().siblings().find("a").removeClass("active");
            a.addClass("active");
            "form" == e ? ($("#layout-widget-list").hide(),
            $("#commonfield-widget-list").hide(),
            $("#form-widget-list").show()) : "layout" == e ? ($("#layout-widget-list").show(),
            $("#form-widget-list").hide(),
            $("#commonfield-widget-list").hide()) : "commonfield" == e && ($("#commonfield-widget-list").show(),
            $("#form-widget-list").hide(),
            $("#layout-widget-list").hide(),
            m.initLayout($(".j_scroll_commonfield")))
        });
        $(document).on("click", ".j_edit_data_sources", function() {
            window.open(TEAMS.api.editDataSources)
        });
        $(document).on("click", ".j_edit_tab", function() {
            var a = $(this)
              , e = a.attr("edit-type");
            a.parent().siblings().find("a").removeClass("active");
            a.addClass("active");
            "widget" == e ? ($("#edit-form").hide(),
            $("#edit-widget").show()) : "form" == e && ($("#edit-form").show(),
            $("#edit-widget").hide())
        });
        $(document).on("mouseenter", ".js_eTips", function() {
            var a = $(this)
              , e = setTimeout(function() {
                $(".js_eTipsMore").removeClass("hide")
            }, 300);
            a.data("showTimer", e)
        });
        $(document).on("mouseleave", ".js_eTips", function() {
            var a = $(this).data("showTimer");
            a && clearTimeout(a);
            $(".js_eTipsMore").addClass("hide")
        });
        $(document).off("renderCkEditor").on("renderCkEditor", function(a, e) {
            l.renderCkEditor()
        });
        $(document).on("click", ".showIntro_js", function() {
            l.isShowIntro = !0;
            l.formIntro()
        });
        1 > $("#introCount").val() && setTimeout(function() {
            l.formIntro()
        }, 1E3);
        l.beforeunload();
        l.formEvents();
        l.formSetupEvents();
        l.componentSetupEvents();
        l.componentDraggableEvents();
        var a = $("#formId").val()
          , e = $("#filterName").val()
          , c = $("#filterDescription").val();
        0 < $("#reportId").length && (l.reportId = $("#reportId").val());
        $(".form-name").text(e);
        $(".form-description").text(c);
        l.calculateHeight();
        l.bodyHtml = $("#formContent").html();
        l.loadFormLayout(a);
        l.loadDeleteFeild(a);
        l.loadCommonFeild(a);
        "workflow" != l.module && "biaoge" != l.module && "biaoge_report" != l.module && $(".j_edit_tab").click();
        $(document).on("afterCreateCell", function(a, e) {
            l.fromAndColPanelSortable()
        });
        $(document).on("afterCreateTabPage", function(a, b) {
            l.fromAndColPanelSortable();
            l.tabSortable()
        });
        _.each(TEAMS.disableModules, function(a) {
            $("#form-widget-list").find('[acl-module-id\x3d"' + a.moduleId + '"]').remove()
        });
        l.imgWaterSetVertical = function(a, e) {
            a.height();
            "top" == e ? a.appendTo($("#watermark-config .j_pre\x3e.top-box")) : "middle" == e ? a.appendTo($("#watermark-config .j_pre\x3e.middle-box")) : "bottom" == e && a.appendTo($("#watermark-config .j_pre\x3e.bottom-box"))
        }
    });
    u.exports = l
});
define("form/editDataSourcesview", ["form/form-plugin", "form/editDataSourcesmodel", "form/tplutil"], function(n, y, u) {
    var m = n("form/form-plugin")
      , h = n("form/editDataSourcesmodel")
      , g = n("form/tplutil");
    n = Backbone.View.extend({
        initialize: function(f) {
            this.el = f.el;
            this.tpl = g.get("editDataSources");
            this.model = new h;
            $(this.el).append(this.tpl);
            $(this.el).find(".j_user_name").html(TEAMS.currentUser.name).attr("title", TEAMS.currentUser.name);
            $(this.el).find(".j_user_team").html(TEAMS.currentTenant.tenantName).attr("title", TEAMS.currentTenant.tenantName);
            (f = $("#employeeAvatar").val()) && $(this.el).find(".j_user_head_img").attr("src", "/base/download/" + f)
        },
        delegateEvents: function() {
            var f = this
              , d = $(f.el);
            d.on("click.EditDataSourcesView", ".j_data_search", function() {
                f.renderDataList(1)
            });
            d.on("keyup.EditDataSourcesView", ".j_data_name_search", function(b) {
                13 == b.keyCode && d.find(".j_data_search").trigger("click")
            });
            d.on("change.EditDataSourcesView", ".j_data_type_search", function(b) {
                d.find(".j_data_search").trigger("click")
            });
            $(document).on("click.EditDataSourcesView", "#comboBatcEdit", function(b) {
                d.find("#j_custom_dataSources #comboSelect_list .choicelistEdit_js:first li.ComboSelect_js").removeAttr("isBatcEdit");
                b = d.find("#optBatcEdit");
                b.find("#optContent").parent().removeClass("has-error");
                b.find(".j_optBatcEditEr").hide();
                b.find(".icon-help").show();
                for (var c = "", l = function(a, e) {
                    var c = e + a.name.trim() + "\n";
                    if (a.children && 0 < a.children.length)
                        for (var b = 0; b < a.children.length; b++)
                            c += l(a.children[b], e + "-");
                    return c
                }, e = f.getDetails(), a = 0; a < e.length; a++)
                    c += l(e[a], "");
                b.find("#optContent").val(c.trim());
                $("#optBatcEdit").modal()
            });
            $(document).on("click", "#optBatcEdit .j_saveOptBatc", function(b) {
                var c = $("#optBatcEdit")
                  , l = c.find("#optContent").val().trim();
                b = d.find("#j_custom_dataSources");
                var e = b.find("#comboSelect_list .j_comboselect-tabs .j_comboselect_tab:not('.hide')").length;
                c.find("#optContent").parent().removeClass("has-error");
                c.find(".j_optBatcEditEr").hide().text("\u4e0d\u80fd\u4e3a\u7a7a");
                if ("" == l)
                    c.find("#optContent").parent().addClass("has-error"),
                    c.find("#optContent").focus(),
                    c.find(".j_optBatcEditEr").show();
                else {
                    for (var a = l.split("\n"), k = [], z = [], l = 0; l < a.length; l++) {
                        var g = a[l];
                        "" != g.trim() && (k.push(g.trim()),
                        z.push(g.trim()))
                    }
                    if (1 == e) {
                        b = z.sort();
                        for (l = 0; l < b.length; l++)
                            if (b[l] == b[l + 1]) {
                                c.find("#optContent").parent().addClass("has-error");
                                c.find("#optContent").focus();
                                c.find(".j_optBatcEditEr").text("\u9009\u9879\u540d\u79f0\u4e0d\u80fd\u91cd\u590d").show();
                                return
                            }
                        c = d.find("#j_custom_dataSources #comboSelect_list .choicelistEdit_js:first");
                        for (l = 0; l < k.length; l++)
                            g = k[l],
                            e = d.find("#j_custom_dataSources #comboSelect_list .choicelistEdit_js:first li.ComboSelect_js input[value\x3d'" + g + "']"),
                            0 == e.length ? (a = d.find(".j_select_data_clone"),
                            e = $(c).find("li:last"),
                            a = a.find(".js_comboSelect_clone").clone().removeClass("js_comboSelect_clone").addClass("ComboSelect_js").attr("isBatcEdit", "isBatcEdit"),
                            z = f.renderDetail(null, l, g, [], 1),
                            a.find(".combo_optionName_js").data("detail", z).attr("value", g),
                            e.after(a)) : (e.attr("value", g),
                            e.data("detail").name = g,
                            e.data("detail").order = l,
                            $(e).closest(".ComboSelect_js").attr("isBatcEdit", "isBatcEdit"));
                        d.find("#j_custom_dataSources #comboSelect_list .choicelistEdit_js:first li.ComboSelect_js").not("[isBatcEdit\x3d'isBatcEdit']").remove();
                        l = d.find("#j_custom_dataSources #comboSelect_list .choicelistEdit_js:first ul.combo_ul_js");
                        f.renderSelectIndex(l);
                        $("#optBatcEdit").modal("hide")
                    } else {
                        g = !0;
                        for (l = 0; l < k.length; l++) {
                            a = k[l];
                            if (100 < a.length) {
                                c.find(".j_optBatcEditEr").text("\u9009\u9879\u5b57\u7b26\u8fc7\u957f");
                                g = !1;
                                break
                            }
                            if (0 == l) {
                                if (a.startsWith("-") || !k[l + 1]) {
                                    c.find(".j_optBatcEditEr").text("\u9009\u9879\u683c\u5f0f\u4e0d\u6b63\u786e");
                                    g = !1;
                                    break
                                }
                            } else {
                                if (2 == e && !a.startsWith("-")) {
                                    if (!k[l + 1]) {
                                        c.find(".j_optBatcEditEr").text("\u9009\u9879\u683c\u5f0f\u4e0d\u6b63\u786e");
                                        g = !1;
                                        break
                                    }
                                    if (!k[l - 1].startsWith("-") || !k[l + 1].startsWith("-")) {
                                        c.find(".j_optBatcEditEr").text("\u9009\u9879\u683c\u5f0f\u4e0d\u6b63\u786e");
                                        g = !1;
                                        break
                                    }
                                }
                                if (3 == e) {
                                    if (!a.startsWith("-")) {
                                        if (!k[l + 1]) {
                                            c.find(".j_optBatcEditEr").text("\u9009\u9879\u683c\u5f0f\u4e0d\u6b63\u786e");
                                            g = !1;
                                            break
                                        }
                                        if (!k[l - 1].startsWith("--") || !k[l + 1].startsWith("-") || k[l + 1].startsWith("--")) {
                                            c.find(".j_optBatcEditEr").text("\u9009\u9879\u683c\u5f0f\u4e0d\u6b63\u786e");
                                            g = !1;
                                            break
                                        }
                                    }
                                    if (a.startsWith("-") && !a.startsWith("--")) {
                                        if (!k[l + 1]) {
                                            c.find(".j_optBatcEditEr").text("\u9009\u9879\u683c\u5f0f\u4e0d\u6b63\u786e");
                                            g = !1;
                                            break
                                        }
                                        if (k[l - 1].startsWith("-") && !k[l - 1].startsWith("--") || !k[l + 1].startsWith("--")) {
                                            c.find(".j_optBatcEditEr").text("\u9009\u9879\u683c\u5f0f\u4e0d\u6b63\u786e");
                                            g = !1;
                                            break
                                        }
                                    }
                                    if (a.startsWith("--") && !k[l - 1].startsWith("-")) {
                                        c.find(".j_optBatcEditEr").text("\u9009\u9879\u683c\u5f0f\u4e0d\u6b63\u786e");
                                        g = !1;
                                        break
                                    }
                                }
                            }
                        }
                        if (g) {
                            g = function(a, e) {
                                for (var c = [], b = [], d = 0; d < a.length; d++) {
                                    var k = a[d];
                                    k.startsWith(e) || (0 < b.length && c.push(b.slice(0)),
                                    b = []);
                                    b.push(k)
                                }
                                c.push(b);
                                return c
                            }
                            ;
                            a = g(k, "-");
                            k = [];
                            if (2 == e)
                                for (l = 0; l < a.length; l++) {
                                    for (var z = a[l], h = [], p = 1; p < z.length; p++) {
                                        var w = f.renderDetail(null, p - 1, z[p].substring(1), [], 2);
                                        h.push(w)
                                    }
                                    z = f.renderDetail(null, l, z[0], h, 1);
                                    k.push(z)
                                }
                            if (3 == e)
                                for (l = 0; l < a.length; l++) {
                                    z = a[l];
                                    h = [];
                                    e = g(z.slice(1), "--");
                                    for (p = 0; p < e.length; p++) {
                                        for (var w = e[p], v = [], m = 1; m < w.length; m++) {
                                            var A = f.renderDetail(null, m - 1, w[m].substring(2), [], 3);
                                            v.push(A)
                                        }
                                        w = f.renderDetail(null, p, w[0].substring(1), v, 2);
                                        h.push(w)
                                    }
                                    z = f.renderDetail(null, l, z[0], h, 1);
                                    k.push(z)
                                }
                            l = f.checkComboOptionName(k);
                            if (1 == l || "true" == l)
                                c.find("#optContent").parent().addClass("has-error"),
                                c.find("#optContent").focus(),
                                c.find(".j_optBatcEditEr").text("\u540c\u7ea7\u522b\u9009\u9879\u540d\u79f0\u4e0d\u80fd\u91cd\u590d").show();
                            else {
                                c = d.find("#j_custom_dataSources #comboSelect_list .choicelistEdit_js:first");
                                for (l = 0; l < k.length; l++)
                                    if (g = k[l],
                                    e = d.find("#j_custom_dataSources #comboSelect_list .choicelistEdit_js:first li.ComboSelect_js input[value\x3d'" + g.name + "']"),
                                    0 == e.length)
                                        a = d.find(".j_select_data_clone"),
                                        e = $(c).find("li:last"),
                                        a = a.find(".js_comboSelect_clone").clone().removeClass("js_comboSelect_clone").addClass("ComboSelect_js").attr("isBatcEdit", "isBatcEdit"),
                                        z = f.renderDetail(null, l, g.name, g.children, 1),
                                        a.find(".combo_optionName_js").data("detail", z).attr("value", g.name).attr("index", l),
                                        e.after(a);
                                    else {
                                        var x = function(a, e) {
                                            for (var c = [], b = 0; b < a.length; b++) {
                                                for (var d = a[b], k = 0; k < e.length; k++) {
                                                    var f = e[k];
                                                    d.name == f.name && null != d.children && 0 < d.children.length && (f.children = x(d.children, f.children));
                                                    if (d.name == f.name) {
                                                        d = f;
                                                        break
                                                    }
                                                }
                                                d.order = b;
                                                c.push(d)
                                            }
                                            return c
                                        }
                                          , a = e.data("detail");
                                        a.name = g.name;
                                        a.children = x(g.children, a.children);
                                        e.attr("value", g.name);
                                        e.data("detail", a);
                                        $(e).closest(".ComboSelect_js").attr("isBatcEdit", "isBatcEdit")
                                    }
                                d.find("#j_custom_dataSources #comboSelect_list .choicelistEdit_js:first li.ComboSelect_js").not("[isBatcEdit\x3d'isBatcEdit']").remove();
                                l = d.find("#j_custom_dataSources #comboSelect_list .choicelistEdit_js:first ul.combo_ul_js");
                                f.renderSelectIndex(l);
                                b.find("#comboSelect_list .j_comboselect-tabs .j_comboselect_tab:first").click();
                                $("#optBatcEdit").modal("hide")
                            }
                        } else
                            c.find("#optContent").parent().addClass("has-error"),
                            c.find("#optContent").focus(),
                            c.find(".j_optBatcEditEr").show()
                    }
                }
            });
            d.on("click EditDataSourcesView", ".j_optBatc_close", function() {
                $("#optBatcEdit").modal("hide")
            });
            d.on("click EditDataSourcesView", ".j_close_pre", function() {
                $("#data_source_pre_module").modal("hide")
            });
            d.on("click.EditDataSourcesView", ".j_add_dataSource", function() {
                var b = $("#j_custom_dataSources");
                f.renderModuleData({
                    type: "add"
                });
                b.modal()
            });
            d.on("click EditDataSourcesView", ".j_edit", function() {
                var b = $(this)
                  , c = $("#j_custom_dataSources")
                  , b = b.parents("li.j_temp_li").attr("templateid")
                  , d = {};
                d.templateId = b;
                f.model.queryDataSourcesByTemplate(d, function(e) {
                    e.message ? m.notify(e.message) : (e.type = "edit",
                    f.renderModuleData(e),
                    c.modal())
                })
            });
            d.on("click EditDataSourcesView", ".j_download", function() {
                $(".j_dataProcess").removeClass("hide");
                var b = $(this).parents("li .j_temp_li").attr("templateId")
                  , c = {};
                c.templateId = b;
                f.model.initTemplate(c, function(c) {
                    $(".j_dataProcess").addClass("hide");
                    c.message ? m.notify(c.message) : f.renderDataList(1)
                })
            });
            d.on("click EditDataSourcesView", ".j_preview", function() {
                var b = $(this)
                  , c = $("#data_source_pre_module")
                  , b = b.parents("li.j_temp_li")
                  , d = b.data("template")
                  , b = b.attr("templateid")
                  , e = {};
                e.templateId = b;
                e.detailsLevel = "1";
                f.model.queryDateDetailsByDetails(e, function(a) {
                    if (a.message)
                        m.notify(a.message);
                    else {
                        if (a && a.templateDetailsList && d) {
                            c.find(".j_pre_data_name").html(d.name);
                            "2" == d.dropDownLevel ? (c.find(".j_data_details_two").removeClass("hide"),
                            c.find(".j_data_details_three").addClass("hide")) : "3" == d.dropDownLevel ? (c.find(".j_data_details_two").removeClass("hide"),
                            c.find(".j_data_details_three").removeClass("hide")) : (c.find(".j_data_details_two").addClass("hide"),
                            c.find(".j_data_details_three").addClass("hide"));
                            if ((a = a.templateDetailsList) && 0 < a.length)
                                for (var e = c.find(".j_data_source .j_data_details_one ul").html(""), b = 0; b < a.length; b++) {
                                    var f = a[b]
                                      , g = c.find(".j_data_li_clone").clone();
                                    g.removeClass("hide").removeClass("j_data_li_clone").addClass("j_data_li");
                                    $(g).find("a").html(f.name);
                                    $(g).attr("id", f.id);
                                    e.append(g)
                                }
                            c.find(".j_data_details_one li:first").click()
                        }
                        c.modal()
                    }
                })
            });
            d.on("click EditDataSourcesView", "#data_source_pre_module .j_data_source li", function(b) {
                var c = $(this);
                $(this).addClass("active").siblings().removeClass("active");
                var d = c.closest("div.j_data_details");
                $(d).nextAll().find("ul").html("");
                if ((b = c.data("detailsData")) && 0 < b.length) {
                    $dataNext = $(d).next();
                    for (var e = $dataNext.find("ul").html(""), a = 0; a < b.length; a++) {
                        var k = b[a]
                          , z = d.parent().find(".j_data_li_clone").clone();
                        z.removeClass("hide").removeClass("j_data_li_clone");
                        $(z).data("details", k.children);
                        $(z).find("a").html(k.name);
                        $(z).attr("id", k.id);
                        e.append(z)
                    }
                } else
                    b = {},
                    b.parentId = c.attr("id"),
                    f.model.queryDateDetailsByDetails(b, function(a) {
                        if (a.message)
                            m.notify(a.message);
                        else if (a && a.templateDetailsList) {
                            c.data("detailsData", a.templateDetailsList);
                            $dataNext = $(d).next();
                            for (var e = $dataNext.find("ul").html(""), b = 0; b < a.templateDetailsList.length; b++) {
                                var k = a.templateDetailsList[b]
                                  , f = d.parent().find(".j_data_li_clone").clone();
                                f.removeClass("hide").removeClass("j_data_li_clone");
                                $(f).find("a").html(k.name);
                                $(f).attr("id", k.id);
                                e.append(f)
                            }
                        }
                    })
            });
            d.on("click EditDataSourcesView", ".j_delete", function() {
                var b = $(this).parents("li .j_temp_li").attr("templateId")
                  , c = {};
                c.templateId = b;
                f.model.deleteTemplate(c, function(c) {
                    c.message ? m.notify(c.message) : f.renderDataList(1)
                })
            });
            d.on("click EditDataSourcesView", ".j_close", function() {
                $("#j_custom_dataSources").modal("hide")
            });
            d.on("click EditDataSourcesView", ".j_save_combo", function() {
                var b = d.find("#j_custom_dataSources")
                  , c = b.find("#data_source_name").val().trim()
                  , l = b.find("#comboSelect_list .j_comboselect-tabs .j_comboselect_tab:not('.hide')").length;
                if (null == c || "" == c)
                    m.notify("\u6a21\u677f\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a!");
                else {
                    var e = {};
                    e.name = c;
                    f.model.checkName(e, function(a) {
                        a.message ? m.notify(a.message) : (e.templateDetailsList = f.getDetails(),
                        e.level = l,
                        f.model.saveTemplate(e, function(a) {
                            a.message ? m.notify(a.message) : (f.renderDataList(1),
                            b.modal("hide"))
                        }))
                    })
                }
            });
            d.on("click EditDataSourcesView", ".j_edit_combo", function() {
                var b = d.find("#j_custom_dataSources")
                  , c = b.find("#data_source_name").val().trim()
                  , l = b.find("#data_source_name").attr("oldName")
                  , e = b.find("#data_source_name").attr("templateId")
                  , a = b.find("#comboSelect_list .j_comboselect-tabs .j_comboselect_tab:not('.hide')").length;
                if (null == c || "" == c)
                    m.notify("\u6a21\u677f\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a!");
                else if (c == l) {
                    var k = {};
                    k.name = c;
                    k.templateDetailsList = f.getDetails();
                    k.level = a;
                    k.templateId = e;
                    f.model.editTemplate(k, function(a) {
                        a.message ? m.notify(a.message) : (f.renderDataList(1),
                        b.modal("hide"))
                    })
                } else
                    k = {},
                    k.name = c,
                    f.model.checkName(k, function(c) {
                        c.message ? m.notify(c.message) : (k.templateDetailsList = f.getDetails(),
                        k.level = a,
                        k.templateId = e,
                        f.model.editTemplate(k, function(a) {
                            a.message ? m.notify(a.message) : (f.renderDataList(1),
                            b.modal("hide"))
                        }))
                    })
            });
            d.on("click EditDataSourcesView", "#j_custom_dataSources #combo_select_add", function() {
                var b = d.find("#j_custom_dataSources")
                  , c = b.find('.j_comboselect-tabs li.j_comboselect_tab:not(".hide")').length;
                3 == c ? m.notify("\u6700\u9ad8\u7ea7\u522b\u4e3a\u4e09\u7ea7!") : (b.find('.j_comboselect-tabs li.j_comboselect_tab[index\x3d"' + c + '"]').removeClass("hide"),
                f.renderDetailInfo(c, "add"))
            });
            d.on("click EditDataSourcesView", "#j_custom_dataSources #combo_select_delete", function() {
                var b = d.find("#j_custom_dataSources")
                  , c = b.find('.j_comboselect-tabs li.j_comboselect_tab:not(".hide")').length
                  , l = b.find(".j_comboselect-tabs li.j_comboselect_tab.active").attr("index");
                1 == c ? m.notify("\u81f3\u5c11\u4fdd\u7559\u4e00\u7ea7!") : (c -= 1,
                l < c ? m.notify("\u8bf7\u5148\u5220\u9664\u4e0b\u4e00\u7ea7!") : (f.renderDetailInfo(c, "delete"),
                b.find('.j_comboselect-tabs li.j_comboselect_tab[index\x3d"' + c + '"]').addClass("hide"),
                b.find('.j_comboselect-tabs li.j_comboselect_tab[index\x3d"' + (c - 1) + '"]').click()))
            });
            d.on("click EditDataSourcesView", "#j_custom_dataSources .j_comboselect_tab", function() {
                var b = d.find("#j_custom_dataSources")
                  , c = $(this);
                c.addClass("active").siblings().removeClass("active");
                var c = c.attr("index")
                  , l = b.find("#comboSelect_list ul.choicelistEdit_js").eq(c);
                f.renderLeavel(c, l);
                b.find("#comboSelect_list ul.choicelistEdit_js").eq(c).show().siblings().not(".j_comboselect-tabs").hide()
            });
            d.on("click EditDataSourcesView", "#j_custom_dataSources #comboSelect_list .plusoption_js", function() {
                var b = d.find(".j_select_data_clone")
                  , c = $(this).closest("li")
                  , b = b.find(".js_comboSelect_clone").clone().removeClass("js_comboSelect_clone").addClass("ComboSelect_js")
                  , l = $(this).closest(".combo_ul_js")
                  , l = l.closest(".choicelistEdit_js")
                  , l = f.renderDetail(null, null, null, [], Number(l.attr("index")) + 1);
                b.find(".combo_optionName_js").data("detail", l);
                c.after(b);
                l = c.closest(".combo_ul_js");
                f.renderSelectIndex(l)
            });
            d.on("click EditDataSourcesView", "#j_custom_dataSources #comboSelect_list .minusoption_js", function() {
                var b = $(this).closest("li")
                  , c = $(this).closest(".combo_ul_js");
                0 == b.siblings().length ? m.notify("\u9009\u9879\u6700\u5c11\u4fdd\u7559\u4e00\u4e2a!") : (b.remove(),
                f.renderSelectIndex(c),
                b = c.closest(".choicelistEdit_js"),
                c = b.attr("index"),
                f.editComboSelect(c, b))
            });
            d.on("change EditDataSourcesView", "#j_custom_dataSources #comboSelect_list .j_comboselect_one select", function() {
                var b = $(this)
                  , c = d.find("#j_custom_dataSources #comboSelect_list").find(".choicelistEdit_js:first")
                  , l = b.closest(".choicelistEdit_js")
                  , e = l.attr("index")
                  , a = b.val()
                  , b = l.find(".combo_ul_js")
                  , c = $(c).find("li.ComboSelect_js .combo_optionName_js[index\x3d'" + a + "']").data("detail");
                if ("1" == e)
                    f.renderComboSelect(c.children, b);
                else if ("2" == e) {
                    l = l.find(".j_comboselect_two select").html("");
                    e = c.children;
                    for (a = 0; a < e.length; a++) {
                        var k = e[a]
                          , z = "\x3coption value\x3d'" + k.order + "'\x3e" + k.name + "\x3c/option\x3e";
                        $(z).attr("order", k.order);
                        $(l).append(z)
                    }
                    f.renderComboSelect(c.children[0].children, b)
                }
            });
            d.on("change EditDataSourcesView", "#j_custom_dataSources #comboSelect_list .j_comboselect_two select", function() {
                var b = $(this)
                  , c = d.find("#j_custom_dataSources #comboSelect_list").find(".choicelistEdit_js:first")
                  , l = b.closest(".choicelistEdit_js")
                  , b = b.val()
                  , e = l.find(".combo_ul_js")
                  , l = l.find(".j_comboselect_one select").val()
                  , c = $(c).find("li.ComboSelect_js .combo_optionName_js[index\x3d'" + l + "']").data("detail");
                f.renderComboSelect(c.children[b].children, e)
            });
            d.on("change EditDataSourcesView", "#j_custom_dataSources ul li .combo_optionName_js", function(b) {
                b = $.trim($(this).val());
                var c = $.trim($(this).attr("value"))
                  , d = $(this).closest("ul")
                  , e = $(this).closest("li").siblings("li");
                if ("" == b || null == b)
                    m.notify("\u9009\u9879\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a!"),
                    $(this).val(c),
                    $(this).focus();
                else {
                    for (var a = 0; a < e.length; a++) {
                        var k = $(e[a])
                          , k = $.trim(k.find(".combo_optionName_js").attr("value"));
                        if (b == k) {
                            m.notify("\u9009\u9879\u4e0d\u80fd\u91cd\u540d!");
                            $(this).val(c);
                            $(this).focus();
                            return
                        }
                    }
                    $(this).attr("value", b);
                    $(this).data("detail").name = b;
                    b = $(d).closest(".choicelistEdit_js");
                    c = b.attr("index");
                    f.editComboSelect(c, b, $(this).attr("index"))
                }
            });
            d.on("click EditDataSourcesView", "#more_data", function(b) {
                b = $(this).data("page");
                f.renderDataList(b.nextPage)
            });
            $(window).off("resize EditDataSourcesView").on("resize EditDataSourcesView", function(b) {
                setTimeout(function() {
                    $("body div.scroll-wrapper").each(function(c) {
                        $(this).trigger("resizeSroll", c)
                    })
                }, 100)
            });
            $("body").off("resizeSroll").on("resizeSroll", "div.scroll-wrapper", function(b) {
                b = $(this);
                if (b.attr("horizontal")) {
                    var c = $(window).width()
                      , d = b.offset().left;
                    b.css("width", c - d)
                } else {
                    var c = $(window).height()
                      , d = b.attr("marginbottom") || 0
                      , e = b.offset().top;
                    b.css("height", c - e - d)
                }
                b.mCustomScrollbar("update")
            });
            setInterval(function() {
                $('[data-toggle\x3d"tooltip"]').each(function() {
                    var b = $(this).parents(".approver-line");
                    b ? b.hasClass("hide") || $(this).tooltip({
                        container: "body",
                        animation: !0,
                        html: !0
                    }) : $(this).tooltip({
                        container: "body",
                        animation: !0,
                        html: !0
                    })
                })
            }, 1E3)
        },
        render: function() {
            $(this.el);
            m.initLayout($(".j_editdataModalScr"));
            m.initLayout($(".j_editDataScr"));
            this.renderDataList(1)
        },
        renderDataList: function(f) {
            var d = $(this.el)
              , b = $(d).find(".j_data_name_search").val()
              , c = d.find(".j_data_type_search").val()
              , l = {};
            l.pageNo = f;
            l.name = $.trim(b);
            l.type = c;
            this.model.queryTrash(l, function(e) {
                if (e.message)
                    m.notify(e.message);
                else {
                    var a = e.templatePage;
                    e = a.result;
                    var c = d.find("#dataSourcesContent #dataSourcesList ul");
                    1 == f && ($(c).empty(),
                    null == e || 0 == e.length ? d.find("#dataSourcesContent .j_empty").show() : d.find("#dataSourcesContent .j_empty").hide());
                    a && a.hasNext ? (d.find("#dataSourcesContent #more_data").show(),
                    d.find("#dataSourcesContent #more_data").data("page", a)) : d.find("#dataSourcesContent #more_data").hide();
                    if (e)
                        for (a = 0; a < e.length; a++) {
                            var b = d.find("#dataSourcesContent #dataSourceClone li").clone()
                              , l = e[a];
                            b.attr("templateId", l.id);
                            b.data("template", l);
                            b.find(".j_name").prop("title", l.name).text(l.name);
                            var g = l.type ? "custom" == l.type ? "\u81ea\u5b9a\u4e49" : "\u7cfb\u7edf" : "\u7cfb\u7edf";
                            b.find(".j_type").attr("title", g).text(g);
                            b.find(".j_creator").attr("title", l.creatorName).text(l.creatorName);
                            g = "3" == l.dropDownLevel ? "\u4e09\u7ea7" : "2" == l.dropDownLevel ? "\u4e8c\u7ea7" : "\u4e00\u7ea7";
                            b.find(".j_dropDownLevel").attr("title", g).text(g);
                            if (l.lastUpdataTime || l.createTime)
                                g = Date.create(l.lastUpdataTime || l.createTime),
                                b.find(".j_updata_time").attr("title", g.format("{yyyy}-{MM}-{dd}  {HH}:{mm}:{ss}")).text(g.format("{yyyy}-{MM}-{dd}  {HH}:{mm}:{ss}"));
                            "default" == l.type && (b.find(".j_download").removeClass("hide"),
                            b.find(".j_preview").removeClass("hide"),
                            b.find(".j_edit").addClass("hide"),
                            b.find(".j_delete").addClass("hide"));
                            c.append(b)
                        }
                }
            })
        },
        renderModuleData: function(f) {
            var d = $(this.el)
              , b = d.find(".j_select_data_clone .j_select_data_level_clone").clone().removeClass("j_select_data_level_clone")
              , d = d.find("#j_custom_dataSources");
            d.find(".j_editdataModalScr #comboSelect_list").html("").append(b);
            "add" == f.type ? (d.find("#data_source_name").val(""),
            f = this.renderDetail(null, 0, "\u9009\u9879\u4e00", [], 1),
            d.find("#comboSelect_list ul.choicelistEdit_js[index\x3d'0'] .combo_optionName_js").data("detail", f),
            d.find(".j_operation .j_save_combo").removeClass("hide"),
            d.find(".j_operation .j_edit_combo").addClass("hide")) : "edit" == f.type && (d.find(".j_operation .j_save_combo").addClass("hide"),
            d.find(".j_operation .j_edit_combo").removeClass("hide"),
            d.find(".j_modal_title").html("\u7f16\u8f91\u6570\u636e\u6e90"),
            d.find("#data_source_name").attr("oldName", f.formDataTemplate.name).attr("templateId", f.formDataTemplate.id).val(f.formDataTemplate.name),
            d.find(".j_comboselect-tabs li:lt(" + f.formDataTemplate.dropDownLevel + ")").removeClass("hide"),
            b = d.find(".choicelistEdit_js[index\x3d'0'] .combo_ul_js"),
            this.renderComboSelect(f.formDataTemplate.detailsList, b))
        },
        renderDetail: function(f, d, b, c, l) {
            return {
                id: f,
                order: d,
                name: b,
                children: c,
                detailsLevel: l
            }
        },
        getDetails: function() {
            var f = $(this.el).find("#j_custom_dataSources #comboSelect_list .choicelistEdit_js:first")
              , f = $(f).find("li.ComboSelect_js")
              , d = [];
            if (f)
                for (var b = 0; b < f.length; b++) {
                    var c = f[b];
                    $(c).find(".combo_optionName_js").val() && (c = $(c).find(".combo_optionName_js").data("detail"),
                    d.push(c))
                }
            return d
        },
        renderDetailInfo: function(f, d) {
            var b = $(this.el).find("#j_custom_dataSources #comboSelect_list").find(".choicelistEdit_js[index\x3d'0']")
              , c = this.getDetails();
            if (c)
                if ("add" == d)
                    if ("1" == f)
                        for (var l = 0; l < c.length; l++) {
                            var e = c[l];
                            if (null == e.children || 1 > e.children.length)
                                e.children.push(this.renderDetail(null, 0, "\u9009\u9879\u4e00", [], 2)),
                                $(b).find("li.ComboSelect_js:eq(" + l + ")").data("detail", e)
                        }
                    else {
                        if ("2" == f)
                            for (l = 0; l < c.length; l++) {
                                for (var e = c[l], a = e.children, k = 0; k < a.length; k++) {
                                    var z = a[k];
                                    (null == z.children || 1 > z.children.length) && e.children[k].children.push(this.renderDetail(null, 0, "\u9009\u9879\u4e00", [], 3))
                                }
                                $(b).find("li.ComboSelect_js:eq(" + l + ")").data("detail", e)
                            }
                    }
                else if ("delete" == d)
                    if ("1" == f)
                        for (l = 0; l < c.length; l++)
                            e = c[l],
                            e.children = [],
                            $(b).find("li.ComboSelect_js:eq(" + l + ")").data("detail", e);
                    else if ("2" == f)
                        for (l = 0; l < c.length; l++) {
                            e = c[l];
                            a = e.children;
                            for (k = 0; k < a.length; k++)
                                e.children[k].children = [];
                            $(b).find("li.ComboSelect_js:eq(" + l + ")").data("detail", e)
                        }
        },
        editComboSelect: function(f, d, b) {
            var c = $(this.el)
              , l = c.find("#j_custom_dataSources #comboSelect_list").find(".choicelistEdit_js:first")
              , e = []
              , a = d.find(".j_comboselect_one select").val();
            if ("1" == f) {
                if (d = $(d).find("li.ComboSelect_js"))
                    for (f = 0; f < d.length; f++) {
                        var k = d[f];
                        $(k).find(".combo_optionName_js").val() && (k = $(k).find(".combo_optionName_js").data("detail"),
                        e.push(k))
                    }
                k = $(l).find("li.ComboSelect_js .combo_optionName_js[index\x3d'" + a + "']").data("detail");
                k.children = e;
                3 == c.find('#j_custom_dataSources .j_comboselect-tabs li.j_comboselect_tab:not(".hide")').length && 0 == k.children[b].children.length && k.children[b].children.push(this.renderDetail(null, 0, "\u9009\u9879\u4e00", [], 3));
                $(l).find("li.ComboSelect_js .combo_optionName_js[index\x3d'" + a + "']").data("detail", k)
            } else if ("2" == f) {
                b = d.find(".j_comboselect_two select").val();
                if (d = $(d).find("li.ComboSelect_js"))
                    for (f = 0; f < d.length; f++)
                        k = d[f],
                        $(k).find(".combo_optionName_js").val() && (k = $(k).find(".combo_optionName_js").data("detail"),
                        e.push(k));
                k = $(l).find("li.ComboSelect_js .combo_optionName_js[index\x3d'" + a + "']").data("detail");
                k.children[b].children = e;
                $(l).find("li.ComboSelect_js .combo_optionName_js[index\x3d'" + a + "']").data("detail", k)
            }
        },
        renderLeavel: function(f, d) {
            $(this.el).find("#j_custom_dataSources #comboSelect_list");
            var b = this.getDetails();
            if (b) {
                var c = d.find(".combo_ul_js");
                if ("1" == f) {
                    d.find(".j_comboselect_one select").html("");
                    for (var l = 0; l < b.length; l++) {
                        var e = b[l]
                          , a = "\x3coption value\x3d'" + e.order + "'\x3e" + e.name + "\x3c/option\x3e";
                        d.find(".j_comboselect_one select").append(a)
                    }
                    this.renderComboSelect(b[0].children, c)
                } else if ("2" == f) {
                    d.find(".j_comboselect_one select").html("");
                    for (l = 0; l < b.length; l++)
                        d.find(".j_comboselect_two select").html(""),
                        e = b[l],
                        a = "\x3coption value\x3d'" + e.order + "'\x3e" + e.name + "\x3c/option\x3e",
                        $(a).attr("order", e.order),
                        d.find(".j_comboselect_one select").append(a);
                    l = b[0].children;
                    for (e = 0; e < l.length; e++) {
                        var a = l[e]
                          , k = "\x3coption value\x3d'" + a.order + "'\x3e" + a.name + "\x3c/option\x3e";
                        $(k).attr("order", a.order);
                        d.find(".j_comboselect_two select").append(k)
                    }
                    this.renderComboSelect(b[0].children[0].children, c)
                }
            }
        },
        renderComboSelect: function(f, d) {
            var b = $(this.el).find(".j_select_data_clone");
            $(d).html("");
            if (f)
                for (var c = 0; c < f.length; c++) {
                    var l = f[c]
                      , e = b.find(".js_comboSelect_clone").clone().removeClass("js_comboSelect_clone").addClass("ComboSelect_js");
                    $(e).find(".combo_optionName_js").attr("value", l.name).attr("index", l.order).attr("detailId", l.id).attr("detailsLevel", l.detailsLevel).val(l.name);
                    l = this.renderDetail(l.id, l.order, l.name, l.children || [], l.detailsLevel);
                    e.find(".combo_optionName_js").data("detail", l);
                    d.append(e)
                }
        },
        renderSelectIndex: function(f) {
            if (f = f.find("li.ComboSelect_js"))
                for (var d = 0; d < f.length; d++) {
                    var b = f[d];
                    $(b).find(".combo_optionName_js").attr("index", d);
                    $(b).find(".combo_optionName_js").data("detail").order = d
                }
        },
        checkComboOptionName: function(f) {
            for (var d = !1, b = [], d = 0; d < f.length; d++) {
                var c = f[d];
                b.push(c.name.trim())
            }
            c = b.sort();
            for (d = 0; d < c.length; d++)
                if (c[d] == c[d + 1])
                    return d = !0;
            for (d = 0; d < f.length; d++)
                if (c = f[d],
                c.children && 0 < c.children.length) {
                    for (var l = [], b = 0; b < c.children.length; b++) {
                        var e = c.children[b];
                        l.push(e.name.trim())
                    }
                    c = l.sort();
                    for (l = 0; l < c.length; l++)
                        if (c[l] == c[l + 1])
                            return d = !0
                }
            for (d = 0; d < f.length; d++)
                if (c = f[d],
                c.children && 0 < c.children.length)
                    for (b = 0; b < c.children.length; b++)
                        if (e = c.children[b],
                        e.children && 0 < e.children.length) {
                            for (var a = [], l = 0; l < e.children.length; l++)
                                a.push(e.children[l].name.trim());
                            e = a.sort();
                            for (l = 0; l < e.length; l++)
                                if (e[l] == e[l + 1])
                                    return d = !0
                        }
        }
    });
    u.exports = n
});
