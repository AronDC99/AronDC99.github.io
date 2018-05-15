(function(n) {
    n.extend(n.fn, {
        validate: function(t) {
            if (!this.length) return t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."), void 0;
            var i = n.data(this[0], "validator");
            return i ? i : (this.attr("novalidate", "novalidate"), i = new n.validator(t, this[0]), n.data(this[0], "validator", i), i.settings.onsubmit && (this.validateDelegate(":submit", "click", function(t) {
                i.settings.submitHandler && (i.submitButton = t.target);
                n(t.target).hasClass("cancel") && (i.cancelSubmit = !0);
                void 0 !== n(t.target).attr("formnovalidate") && (i.cancelSubmit = !0)
            }), this.submit(function(t) {
                function r() {
                    var r;
                    return i.settings.submitHandler ? (i.submitButton && (r = n("<input type='hidden'/>").attr("name", i.submitButton.name).val(n(i.submitButton).val()).appendTo(i.currentForm)), i.settings.submitHandler.call(i, i.currentForm, t), i.submitButton && r.remove(), !1) : !0
                }
                return i.settings.debug && t.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, r()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : r() : (i.focusInvalid(), !1)
            })), i)
        },
        valid: function() {
            if (n(this[0]).is("form")) return this.validate().form();
            var t = !0,
                i = n(this[0].form).validate();
            return this.each(function() {
                t = t && i.element(this)
            }), t
        },
        removeAttrs: function(t) {
            var i = {},
                r = this;
            return n.each(t.split(/\s/), function(n, t) {
                i[t] = r.attr(t);
                r.removeAttr(t)
            }), i
        },
        rules: function(t, i) {
            var r = this[0],
                o, u, h;
            if (t) {
                var e = n.data(r.form, "validator").settings,
                    s = e.rules,
                    f = n.validator.staticRules(r);
                switch (t) {
                    case "add":
                        n.extend(f, n.validator.normalizeRule(i));
                        delete f.messages;
                        s[r.name] = f;
                        i.messages && (e.messages[r.name] = n.extend(e.messages[r.name], i.messages));
                        break;
                    case "remove":
                        return i ? (o = {}, n.each(i.split(/\s/), function(n, t) {
                            o[t] = f[t];
                            delete f[t]
                        }), o) : (delete s[r.name], f)
                }
            }
            return u = n.validator.normalizeRules(n.extend({}, n.validator.classRules(r), n.validator.attributeRules(r), n.validator.dataRules(r), n.validator.staticRules(r)), r), u.required && (h = u.required, delete u.required, u = n.extend({
                required: h
            }, u)), u
        }
    });
    n.extend(n.expr[":"], {
        blank: function(t) {
            return !n.trim("" + n(t).val())
        },
        filled: function(t) {
            return !!n.trim("" + n(t).val())
        },
        unchecked: function(t) {
            return !n(t).prop("checked")
        }
    });
    n.validator = function(t, i) {
        this.settings = n.extend(!0, {}, n.validator.defaults, t);
        this.currentForm = i;
        this.init()
    };
    n.validator.format = function(t, i) {
        return 1 === arguments.length ? function() {
            var i = n.makeArray(arguments);
            return i.unshift(t), n.validator.format.apply(this, i)
        } : (arguments.length > 2 && i.constructor !== Array && (i = n.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), n.each(i, function(n, i) {
            t = t.replace(RegExp("\\{" + n + "\\}", "g"), function() {
                return i
            })
        }), t)
    };
    n.extend(n.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: !0,
            errorContainer: n([]),
            errorLabelContainer: n([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(n) {
                this.lastActive = n;
                this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, n, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(n)).hide())
            },
            onfocusout: function(n) {
                !this.checkable(n) && (n.name in this.submitted || !this.optional(n)) && this.element(n)
            },
            onkeyup: function(n, t) {
                (9 !== t.which || "" !== this.elementValue(n)) && (n.name in this.submitted || n === this.lastElement) && this.element(n)
            },
            onclick: function(n) {
                n.name in this.submitted ? this.element(n) : n.parentNode.name in this.submitted && this.element(n.parentNode)
            },
            highlight: function(t, i, r) {
                "radio" === t.type ? this.findByName(t.name).addClass(i).removeClass(r) : n(t).addClass(i).removeClass(r)
            },
            unhighlight: function(t, i, r) {
                "radio" === t.type ? this.findByName(t.name).removeClass(i).addClass(r) : n(t).removeClass(i).addClass(r)
            }
        },
        setDefaults: function(t) {
            n.extend(n.validator.defaults, t)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: n.validator.format("Please enter no more than {0} characters."),
            minlength: n.validator.format("Please enter at least {0} characters."),
            rangelength: n.validator.format("Please enter a value between {0} and {1} characters long."),
            range: n.validator.format("Please enter a value between {0} and {1}."),
            max: n.validator.format("Please enter a value less than or equal to {0}."),
            min: n.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function i(t) {
                    var i = n.data(this[0].form, "validator"),
                        r = "on" + t.type.replace(/^validate/, "");
                    i.settings[r] && i.settings[r].call(i, this[0], t)
                }
                var r, t;
                this.labelContainer = n(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || n(this.currentForm);
                this.containers = n(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                r = this.groups = {};
                n.each(this.settings.groups, function(t, i) {
                    "string" == typeof i && (i = i.split(/\s/));
                    n.each(i, function(n, i) {
                        r[i] = t
                    })
                });
                t = this.settings.rules;
                n.each(t, function(i, r) {
                    t[i] = n.validator.normalizeRule(r)
                });
                n(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", i).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", i);
                this.settings.invalidHandler && n(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function() {
                return this.checkForm(), n.extend(this.submitted, this.errorMap), this.invalid = n.extend({}, this.errorMap), this.valid() || n(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var n = 0, t = this.currentElements = this.elements(); t[n]; n++) this.check(t[n]);
                return this.valid()
            },
            element: function(t) {
                t = this.validationTargetFor(this.clean(t));
                this.lastElement = t;
                this.prepareElement(t);
                this.currentElements = n(t);
                var i = this.check(t) !== !1;
                return i ? delete this.invalid[t.name] : this.invalid[t.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), i
            },
            showErrors: function(t) {
                if (t) {
                    n.extend(this.errorMap, t);
                    this.errorList = [];
                    for (var i in t) this.errorList.push({
                        message: t[i],
                        element: this.findByName(i)[0]
                    });
                    this.successList = n.grep(this.successList, function(n) {
                        return !(n.name in t)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                n.fn.resetForm && n(this.currentForm).resetForm();
                this.submitted = {};
                this.lastElement = null;
                this.prepareForm();
                this.hideErrors();
                this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(n) {
                var t = 0,
                    i;
                for (i in n) t++;
                return t
            },
            hideErrors: function() {
                this.addWrapper(this.toHide).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    n(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (t) {}
            },
            findLastActive: function() {
                var t = this.lastActive;
                return t && 1 === n.grep(this.errorList, function(n) {
                    return n.element.name === t.name
                }).length && t
            },
            elements: function() {
                var t = this,
                    i = {};
                return n(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                    return !this.name && t.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in i || !t.objectLength(n(this).rules()) ? !1 : (i[this.name] = !0, !0)
                })
            },
            clean: function(t) {
                return n(t)[0]
            },
            errors: function() {
                var t = this.settings.errorClass.replace(" ", ".");
                return n(this.settings.errorElement + "." + t, this.errorContext)
            },
            reset: function() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = n([]);
                this.toHide = n([]);
                this.currentElements = n([])
            },
            prepareForm: function() {
                this.reset();
                this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(n) {
                this.reset();
                this.toHide = this.errorsFor(n)
            },
            elementValue: function(t) {
                var r = n(t).attr("type"),
                    i = n(t).val();
                return "radio" === r || "checkbox" === r ? n("input[name='" + n(t).attr("name") + "']:checked").val() : "string" == typeof i ? i.replace(/\r/g, "") : i
            },
            check: function(t) {
                var r, u;
                t = this.validationTargetFor(this.clean(t));
                var i, f = n(t).rules(),
                    e = !1,
                    s = this.elementValue(t);
                for (r in f) {
                    u = {
                        method: r,
                        parameters: f[r]
                    };
                    try {
                        if (i = n.validator.methods[r].call(this, s, t, u.parameters), "dependency-mismatch" === i) {
                            e = !0;
                            continue
                        }
                        if (e = !1, "pending" === i) return this.toHide = this.toHide.not(this.errorsFor(t)), void 0;
                        if (!i) return this.formatAndAdd(t, u), !1
                    } catch (o) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + u.method + "' method.", o), o;
                    }
                }
                if (!e) return (this.objectLength(f) && this.successList.push(t), !0)
            },
            customDataMessage: function(t, i) {
                return n(t).data("msg-" + i.toLowerCase()) || t.attributes && n(t).attr("data-msg-" + i.toLowerCase())
            },
            customMessage: function(n, t) {
                var i = this.settings.messages[n];
                return i && (i.constructor === String ? i : i[t])
            },
            findDefined: function() {
                for (var n = 0; arguments.length > n; n++)
                    if (void 0 !== arguments[n]) return arguments[n];
                return void 0
            },
            defaultMessage: function(t, i) {
                return this.findDefined(this.customMessage(t.name, i), this.customDataMessage(t, i), !this.settings.ignoreTitle && t.title || void 0, n.validator.messages[i], "<strong>Warning: No message defined for " + t.name + "<\/strong>")
            },
            formatAndAdd: function(t, i) {
                var r = this.defaultMessage(t, i.method),
                    u = /\$?\{(\d+)\}/g;
                "function" == typeof r ? r = r.call(this, i.parameters, t) : u.test(r) && (r = n.validator.format(r.replace(u, "{$1}"), i.parameters));
                this.errorList.push({
                    message: r,
                    element: t
                });
                this.errorMap[t.name] = r;
                this.submitted[t.name] = r
            },
            addWrapper: function(n) {
                return this.settings.wrapper && (n = n.add(n.parent(this.settings.wrapper))), n
            },
            defaultShowErrors: function() {
                for (var i, t, n = 0; this.errorList[n]; n++) t = this.errorList[n], this.settings.highlight && this.settings.highlight.call(this, t.element, this.settings.errorClass, this.settings.validClass), this.showLabel(t.element, t.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (n = 0; this.successList[n]; n++) this.showLabel(this.successList[n]);
                if (this.settings.unhighlight)
                    for (n = 0, i = this.validElements(); i[n]; n++) this.settings.unhighlight.call(this, i[n], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return n(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(t, i) {
                var r = this.errorsFor(t);
                r.length ? (r.removeClass(this.settings.validClass).addClass(this.settings.errorClass), r.html(i)) : (r = n("<" + this.settings.errorElement + ">").attr("for", this.idOrName(t)).addClass(this.settings.errorClass).html(i || ""), this.settings.wrapper && (r = r.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(r).length || (this.settings.errorPlacement ? this.settings.errorPlacement(r, n(t)) : r.insertAfter(t)));
                !i && this.settings.success && (r.text(""), "string" == typeof this.settings.success ? r.addClass(this.settings.success) : this.settings.success(r, t));
                this.toShow = this.toShow.add(r)
            },
            errorsFor: function(t) {
                var i = this.idOrName(t);
                return this.errors().filter(function() {
                    return n(this).attr("for") === i
                })
            },
            idOrName: function(n) {
                return this.groups[n.name] || (this.checkable(n) ? n.name : n.id || n.name)
            },
            validationTargetFor: function(n) {
                return this.checkable(n) && (n = this.findByName(n.name).not(this.settings.ignore)[0]), n
            },
            checkable: function(n) {
                return /radio|checkbox/i.test(n.type)
            },
            findByName: function(t) {
                return n(this.currentForm).find("[name='" + t + "']")
            },
            getLength: function(t, i) {
                switch (i.nodeName.toLowerCase()) {
                    case "select":
                        return n("option:selected", i).length;
                    case "input":
                        if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
                }
                return t.length
            },
            depend: function(n, t) {
                return this.dependTypes[typeof n] ? this.dependTypes[typeof n](n, t) : !0
            },
            dependTypes: {
                boolean: function(n) {
                    return n
                },
                string: function(t, i) {
                    return !!n(t, i.form).length
                },
                "function": function(n, t) {
                    return n(t)
                }
            },
            optional: function(t) {
                var i = this.elementValue(t);
                return !n.validator.methods.required.call(this, i, t) && "dependency-mismatch"
            },
            startRequest: function(n) {
                this.pending[n.name] || (this.pendingRequest++, this.pending[n.name] = !0)
            },
            stopRequest: function(t, i) {
                this.pendingRequest--;
                0 > this.pendingRequest && (this.pendingRequest = 0);
                delete this.pending[t.name];
                i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (n(this.currentForm).submit(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (n(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(t) {
                return n.data(t, "previousValue") || n.data(t, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(t, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(t, i) {
            t.constructor === String ? this.classRuleSettings[t] = i : n.extend(this.classRuleSettings, t)
        },
        classRules: function(t) {
            var i = {},
                r = n(t).attr("class");
            return r && n.each(r.split(" "), function() {
                this in n.validator.classRuleSettings && n.extend(i, n.validator.classRuleSettings[this])
            }), i
        },
        attributeRules: function(t) {
            var u = {},
                e = n(t),
                f = e[0].getAttribute("type"),
                r, i;
            for (r in n.validator.methods) "required" === r ? (i = e.get(0).getAttribute(r), "" === i && (i = !0), i = !!i) : i = e.attr(r), /min|max/.test(r) && (null === f || /number|range|text/.test(f)) && (i = Number(i)), i ? u[r] = i : f === r && "range" !== f && (u[r] = !0);
            return u.maxlength && /-1|2147483647|524288/.test(u.maxlength) && delete u.maxlength, u
        },
        dataRules: function(t) {
            var i, r, u = {},
                f = n(t);
            for (i in n.validator.methods) r = f.data("rule-" + i.toLowerCase()), void 0 !== r && (u[i] = r);
            return u
        },
        staticRules: function(t) {
            var i = {},
                r = n.data(t.form, "validator");
            return r.settings.rules && (i = n.validator.normalizeRule(r.settings.rules[t.name]) || {}), i
        },
        normalizeRules: function(t, i) {
            return n.each(t, function(r, u) {
                if (u === !1) return delete t[r], void 0;
                if (u.param || u.depends) {
                    var f = !0;
                    switch (typeof u.depends) {
                        case "string":
                            f = !!n(u.depends, i.form).length;
                            break;
                        case "function":
                            f = u.depends.call(i, i)
                    }
                    f ? t[r] = void 0 !== u.param ? u.param : !0 : delete t[r]
                }
            }), n.each(t, function(r, u) {
                t[r] = n.isFunction(u) ? u(i) : u
            }), n.each(["minlength", "maxlength"], function() {
                t[this] && (t[this] = Number(t[this]))
            }), n.each(["rangelength", "range"], function() {
                var i;
                t[this] && (n.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : "string" == typeof t[this] && (i = t[this].split(/[\s,]+/), t[this] = [Number(i[0]), Number(i[1])]))
            }), n.validator.autoCreateRanges && (t.min && t.max && (t.range = [t.min, t.max], delete t.min, delete t.max), t.minlength && t.maxlength && (t.rangelength = [t.minlength, t.maxlength], delete t.minlength, delete t.maxlength)), t
        },
        normalizeRule: function(t) {
            if ("string" == typeof t) {
                var i = {};
                n.each(t.split(/\s/), function() {
                    i[this] = !0
                });
                t = i
            }
            return t
        },
        addMethod: function(t, i, r) {
            n.validator.methods[t] = i;
            n.validator.messages[t] = void 0 !== r ? r : n.validator.messages[t];
            3 > i.length && n.validator.addClassRules(t, n.validator.normalizeRule(t))
        },
        methods: {
            required: function(t, i, r) {
                if (!this.depend(r, i)) return "dependency-mismatch";
                if ("select" === i.nodeName.toLowerCase()) {
                    var u = n(i).val();
                    return u && u.length > 0
                }
                return this.checkable(i) ? this.getLength(t, i) > 0 : n.trim(t).length > 0
            },
            email: function(n, t) {
                return this.optional(t) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(n)
            },
            url: function(n, t) {
                return this.optional(t) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(n)
            },
            date: function(n, t) {
                return this.optional(t) || !/Invalid|NaN/.test("" + new Date(n))
            },
            dateISO: function(n, t) {
                return this.optional(t) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(n)
            },
            number: function(n, t) {
                return this.optional(t) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(n)
            },
            digits: function(n, t) {
                return this.optional(t) || /^\d+$/.test(n)
            },
            creditcard: function(n, t) {
                var r, e;
                if (this.optional(t)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(n)) return !1;
                var f = 0,
                    i = 0,
                    u = !1;
                for (n = n.replace(/\D/g, ""), r = n.length - 1; r >= 0; r--) e = n.charAt(r), i = parseInt(e, 10), u && (i *= 2) > 9 && (i -= 9), f += i, u = !u;
                return 0 == f % 10
            },
            minlength: function(t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(n.trim(t), i);
                return this.optional(i) || u >= r
            },
            maxlength: function(t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(n.trim(t), i);
                return this.optional(i) || r >= u
            },
            rangelength: function(t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(n.trim(t), i);
                return this.optional(i) || u >= r[0] && r[1] >= u
            },
            min: function(n, t, i) {
                return this.optional(t) || n >= i
            },
            max: function(n, t, i) {
                return this.optional(t) || i >= n
            },
            range: function(n, t, i) {
                return this.optional(t) || n >= i[0] && i[1] >= n
            },
            equalTo: function(t, i, r) {
                var u = n(r);
                return this.settings.onfocusout && u.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    n(i).valid()
                }), t === u.val()
            },
            remote: function(t, i, r) {
                var f, u, e;
                return this.optional(i) ? "dependency-mismatch" : (f = this.previousValue(i), this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), f.originalMessage = this.settings.messages[i.name].remote, this.settings.messages[i.name].remote = f.message, r = "string" == typeof r && {
                    url: r
                } || r, f.old === t) ? f.valid : (f.old = t, u = this, this.startRequest(i), e = {}, e[i.name] = t, n.ajax(n.extend(!0, {
                    url: r,
                    mode: "abort",
                    port: "validate" + i.name,
                    dataType: "json",
                    data: e,
                    success: function(r) {
                        var e, h, s, o;
                        u.settings.messages[i.name].remote = f.originalMessage;
                        e = r === !0 || "true" === r;
                        e ? (h = u.formSubmitted, u.prepareElement(i), u.formSubmitted = h, u.successList.push(i), delete u.invalid[i.name], u.showErrors()) : (s = {}, o = r || u.defaultMessage(i, "remote"), s[i.name] = f.message = n.isFunction(o) ? o(t) : o, u.invalid[i.name] = !0, u.showErrors(s));
                        f.valid = e;
                        u.stopRequest(i, e)
                    }
                }, r)), "pending")
            }
        }
    });
    n.format = n.validator.format
})(jQuery),
function(n) {
    var t = {},
        i;
    n.ajaxPrefilter ? n.ajaxPrefilter(function(n, i, r) {
        var u = n.port;
        "abort" === n.mode && (t[u] && t[u].abort(), t[u] = r)
    }) : (i = n.ajax, n.ajax = function(r) {
        var f = ("mode" in r ? r : n.ajaxSettings).mode,
            u = ("port" in r ? r : n.ajaxSettings).port;
        return "abort" === f ? (t[u] && t[u].abort(), t[u] = i.apply(this, arguments), t[u]) : i.apply(this, arguments)
    })
}(jQuery),
function(n) {
    n.extend(n.fn, {
        validateDelegate: function(t, i, r) {
            return this.bind(i, function(i) {
                var u = n(i.target);
                if (u.is(t)) return r.apply(u, arguments)
            })
        }
    })
}(jQuery),
function(n) {
    function r(r, u) {
        this.element = r;
        this.$element = n(r);
        this.options = n.extend({}, i, u);
        this._defaults = i;
        this._name = t;
        n.when(n.proxy(this.initialize(), this)).done(this.options.callback !== null && typeof this.options.callback == "function" && this.options.callback())
    }
    var t = "checkradio",
        i = {
            wrapClass: "checkradio",
            checkedClass: "checked",
            triggerClass: "trigger",
            labelAttr: !1,
            callback: null,
            debug: !1
        };
    r.prototype = {
        initialize: function() {
            var i, t, r;
            if (this.element.type == "checkbox" || this.element.type == "radio") {
                if (i = this.$element.is(":checked"), i && (i = this.options.checkedClass), t = this.$element.attr("class"), t = typeof t != "undefined" ? t : "", this.$element.wrap(n('<div class="' + this.options.wrapClass + " " + this.element.type + " " + t + " " + i + '" />')), this.wrapEl = this.$element.parent(""), this.triggerEl = n('<a href="#trigger" class="' + this.options.triggerClass + '" />'), this.options.labelAttr && (r = typeof this.$element.attr(this.options.labelAttr) != "undefined" && this.$element.attr(this.options.labelAttr) !== "" ? this.$element.attr(this.options.labelAttr) : !1, r && this.triggerEl.addClass("labeled").text(r)), this.wrapEl.append(this.triggerEl), this.element.type == "checkbox") this.triggerEl.on("click", n.proxy(this.checkbox, this));
                if (this.element.type == "radio") this.triggerEl.on("click", n.proxy(this.radio, this));
                if (this.wrapEl.next("label").length > 0) {
                    if (this.element.type == "checkbox") this.wrapEl.next("label").addClass(this.element.type).on("click", n.proxy(this.checkbox, this));
                    if (this.element.type == "radio") this.wrapEl.next("label").addClass(this.element.type).on("click", n.proxy(this.radio, this))
                }
                if (this.wrapEl.prev("label").length > 0 && this.element.type == "checkbox") this.wrapEl.prev("label").addClass(this.element.type).on("click", n.proxy(this.checkbox, this));
                this.options.debug ? this.$element.css({
                    position: "absolute",
                    left: "0",
                    top: "100%",
                    "margin-top": "2px"
                }).parent("").css({
                    position: "relative"
                }) : (this.$element.css({
                    opacity: 0,
                    width: 0
                }), this.$element.addClass("legacy"));
                this.options.debug && console.dir(this)
            }
        },
        checkbox: function(n) {
            n && n.preventDefault();
            this.$element.trigger("click");
            this.$element.is(":checked") ? this.wrapEl.addClass(this.options.checkedClass) : this.wrapEl.removeClass(this.options.checkedClass)
        },
        radio: function(t) {
            t && t.preventDefault();
            this.$element.trigger("click");
            this.group = this.$element.attr("name");
            n("input[type=radio]").each(n.proxy(function(t, i) {
                n(i).attr("name") == this.group && (n(i).is(":checked") ? n(i).parent().addClass(this.options.checkedClass) : n(i).parent().removeClass(this.options.checkedClass))
            }, this))
        }
    };
    n.fn[t] = function(i) {
        return this.each(function() {
            n.data(this, "plugin_" + t) || n.data(this, "plugin_" + t, new r(this, i))
        })
    }
}(jQuery, window, document),
function(n) {
    typeof define == "function" && define.amd ? define(["jquery"], n) : n(jQuery)
}(function(n) {
    function i(n) {
        return t.raw ? n : encodeURIComponent(n)
    }

    function f(n) {
        return t.raw ? n : decodeURIComponent(n)
    }

    function e(n) {
        return i(t.json ? JSON.stringify(n) : String(n))
    }

    function o(n) {
        n.indexOf('"') === 0 && (n = n.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return n = decodeURIComponent(n.replace(u, " ")), t.json ? JSON.parse(n) : n
        } catch (i) {}
    }

    function r(i, r) {
        var u = t.raw ? i : o(i);
        return n.isFunction(r) ? r(u) : u
    }
    var u = /\+/g,
        t = n.cookie = function(u, o, s) {
            var y, a, h, v, c, p;
            if (o !== undefined && !n.isFunction(o)) return s = n.extend({}, t.defaults, s), typeof s.expires == "number" && (y = s.expires, a = s.expires = new Date, a.setTime(+a + y * 864e5)), document.cookie = [i(u), "=", e(o), s.expires ? "; expires=" + s.expires.toUTCString() : "", s.path ? "; path=" + s.path : "", s.domain ? "; domain=" + s.domain : "", s.secure ? "; secure" : ""].join("");
            for (h = u ? undefined : {}, v = document.cookie ? document.cookie.split("; ") : [], c = 0, p = v.length; c < p; c++) {
                var w = v[c].split("="),
                    b = f(w.shift()),
                    l = w.join("=");
                if (u && u === b) {
                    h = r(l, o);
                    break
                }
                u || (l = r(l)) === undefined || (h[b] = l)
            }
            return h
        };
    t.defaults = {};
    n.removeCookie = function(t, i) {
        return n.cookie(t) === undefined ? !1 : (n.cookie(t, "", n.extend({}, i, {
            expires: -1
        })), !n.cookie(t))
    }
}),
function(n) {
    n.ui = n.ui || {};
    n.fn.dialog = function(t) {
        return this.each(function() {
            n(this).is(".ui-dialog") || new n.ui.dialog(this, t)
        })
    };
    n.fn.dialogOpen = function() {
        return this.each(function() {
            var t;
            n(this).parents(".ui-dialog").length && (t = this);
            !t && n(this).is(".ui-dialog") && (t = n(".ui-dialog-content", this)[0]);
            n.ui.dialogOpen(t)
        })
    };
    n.fn.dialogClose = function() {
        return this.each(function() {
            var t;
            n(this).parents(".ui-dialog").length && (t = this);
            !t && n(this).is(".ui-dialog") && (t = n(".ui-dialog-content", this)[0]);
            n.ui.dialogClose(t)
        })
    };
    n.ui.dialog = function(t, i) {
        var u = {
                width: 300,
                height: 200,
                position: "center",
                buttons: [],
                modal: !1,
                drag: !0,
                resize: !0,
                shadow: !1
            },
            i = i || {},
            h, e, c, s, l;
        n.extend(u, i);
        this.element = t;
        h = this;
        n.data(this.element, "ui-dialog", this);
        var f = n(t).addClass("ui-dialog-content").wrap(document.createElement("div")).wrap(document.createElement("div")),
            o = f.parent().addClass("ui-dialog-container").css({
                position: "relative"
            }),
            r = o.parent().addClass("ui-dialog").addClass(f.attr("className")).css({
                position: "absolute",
                width: u.width,
                height: u.height
            });
        u.modal == !1 && u.resize == !0 && (r.append("<div class='ui-resizable-n ui-resizable-handle'><\/div>").append("<div class='ui-resizable-s ui-resizable-handle'><\/div>").append("<div class='ui-resizable-e ui-resizable-handle'><\/div>").append("<div class='ui-resizable-w ui-resizable-handle'><\/div>").append("<div class='ui-resizable-ne ui-resizable-handle'><\/div>").append("<div class='ui-resizable-se ui-resizable-handle'><\/div>").append("<div class='ui-resizable-sw ui-resizable-handle'><\/div>").append("<div class='ui-resizable-nw ui-resizable-handle'><\/div>"), r.resizable());
        o.prepend('<div class="ui-dialog-titlebar"><\/div>');
        e = n(".ui-dialog-titlebar", o);
        c = u.title ? u.title : f.attr("title") ? f.attr("title") : "";
        e.append('<span class="ui-dialog-title">' + c + "<\/span>");
        e.append('<div class="ui-dialog-titlebar-close"><\/div>');
        n(".ui-dialog-titlebar-close", e).hover(function() {
            n(this).addClass("ui-dialog-titlebar-close-hover")
        }, function() {
            n(this).removeClass("ui-dialog-titlebar-close-hover")
        }).mousedown(function(n) {
            n.stopPropagation()
        }).click(function() {
            h.close()
        });
        s = 0;
        n.each(u.buttons, function() {
            return s = 1, !1
        });
        s == 1 && (r.append('<div class="ui-dialog-buttonpane"><\/div>'), l = n(".ui-dialog-buttonpane", r), n.each(u.buttons, function(t, i) {
            var r = n(document.createElement("button")).text(t).click(i);
            l.append(r)
        }));
        u.modal == !1 && u.drag == !0 && r.draggable({
            handle: ".ui-dialog-titlebar"
        });
        this.open = function() {
            var t = n(window),
                i = 0,
                f = 0;
            switch (u.position) {
                case "center":
                    i = t.height() / 2 - r.height() / 2;
                    f = t.width() / 2 - r.width() / 2;
                    break;
                case "left":
                    i = t.height() / 2 - r.height() / 2;
                    f = 0;
                    break;
                case "top":
                    i = 0;
                    f = t.width() / 2 - r.width() / 2
            }
            r.css({
                top: i,
                left: f
            });
            r.appendTo("body").show()
        };
        this.close = function() {
            r.hide()
        };
        r.show();
        this.open();
        u.shadow && n.fn.shadow != undefined && r.shadow()
    };
    n.ui.dialogOpen = function(t) {
        n.data(t, "ui-dialog").open()
    };
    n.ui.dialogClose = function(t) {
        n.data(t, "ui-dialog").close()
    }
}(jQuery)