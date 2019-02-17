/*
 *  Sugar Library v1.4.0
 *
 *  Freely distributable and licensed under the MIT-style license.
 *  Copyright (c) 2013 Andrew Plummer
 *  http://sugarjs.com/
 *
 * ---------------------------- */
(function() {
    function aa(a) {
        return function() {
            return a
        }
    }
    var l = Object
      , p = Array
      , q = RegExp
      , r = Date
      , s = String
      , t = Number
      , u = Math
      , ba = "undefined" !== typeof global ? global : this
      , v = l.prototype.toString
      , da = l.prototype.hasOwnProperty
      , ea = l.defineProperty && l.defineProperties
      , fa = "function" === typeof q()
      , ga = !("0"in new s("a"))
      , ia = {}
      , ja = /^\[object Date|Array|String|Number|RegExp|Boolean|Arguments\]$/
      , w = "Boolean Number String Array Date RegExp Function".split(" ")
      , la = ka("boolean", w[0])
      , x = ka("number", w[1])
      , y = ka("string", w[2])
      , A = ma(w[3])
      , C = ma(w[4])
      , D = ma(w[5])
      , F = ma(w[6]);
    function ma(a) {
        var b = "Array" === a && p.isArray || function(b, d) {
            return (d || v.call(b)) === "[object " + a + "]"
        }
        ;
        return ia[a] = b
    }
    function ka(a, b) {
        function c(c) {
            return G(c) ? v.call(c) === "[object " + b + "]" : typeof c === a
        }
        return ia[b] = c
    }
    function na(a) {
        a.SugarMethods || (oa(a, "SugarMethods", {}),
        H(a, !1, !0, {
            extend: function(b, c, d) {
                H(a, !1 !== d, c, b)
            },
            sugarRestore: function() {
                return pa(this, a, arguments, function(a, c, d) {
                    oa(a, c, d.method)
                })
            },
            sugarRevert: function() {
                return pa(this, a, arguments, function(a, c, d) {
                    d.existed ? oa(a, c, d.original) : delete a[c]
                })
            }
        }))
    }
    function H(a, b, c, d) {
        var e = b ? a.prototype : a;
        na(a);
        I(d, function(d, f) {
            var h = e[d]
              , m = J(e, d);
            F(c) && h && (f = qa(h, f, c));
            !1 === c && h || oa(e, d, f);
            a.SugarMethods[d] = {
                method: f,
                existed: m,
                original: h,
                instance: b
            }
        })
    }
    function K(a, b, c, d, e) {
        var g = {};
        d = y(d) ? d.split(",") : d;
        d.forEach(function(a, b) {
            e(g, a, b)
        });
        H(a, b, c, g)
    }
    function pa(a, b, c, d) {
        var e = 0 === c.length
          , g = L(c)
          , f = !1;
        I(b.SugarMethods, function(b, c) {
            if (e || -1 !== g.indexOf(b))
                f = !0,
                d(c.instance ? a.prototype : a, b, c)
        });
        return f
    }
    function qa(a, b, c) {
        return function(d) {
            return c.apply(this, arguments) ? b.apply(this, arguments) : a.apply(this, arguments)
        }
    }
    function oa(a, b, c) {
        ea ? l.defineProperty(a, b, {
            value: c,
            configurable: !0,
            enumerable: !1,
            writable: !0
        }) : a[b] = c
    }
    function L(a, b, c) {
        var d = [];
        c = c || 0;
        var e;
        for (e = a.length; c < e; c++)
            d.push(a[c]),
            b && b.call(a, a[c], c);
        return d
    }
    function sa(a, b, c) {
        var d = a[c || 0];
        A(d) && (a = d,
        c = 0);
        L(a, b, c)
    }
    function ta(a) {
        if (!a || !a.call)
            throw new TypeError("Callback is not callable");
    }
    function M(a) {
        return void 0 !== a
    }
    function N(a) {
        return void 0 === a
    }
    function J(a, b) {
        return !!a && da.call(a, b)
    }
    function G(a) {
        return !!a && ("object" === typeof a || fa && D(a))
    }
    function ua(a) {
        var b = typeof a;
        return null == a || "string" === b || "number" === b || "boolean" === b
    }
    function va(a, b) {
        b = b || v.call(a);
        try {
            if (a && a.constructor && !J(a, "constructor") && !J(a.constructor.prototype, "isPrototypeOf"))
                return !1
        } catch (c) {
            return !1
        }
        return !!a && "[object Object]" === b && "hasOwnProperty"in a
    }
    function I(a, b) {
        for (var c in a)
            if (J(a, c) && !1 === b.call(a, c, a[c], a))
                break
    }
    function wa(a, b) {
        for (var c = 0; c < a; c++)
            b(c)
    }
    function xa(a, b) {
        I(b, function(c) {
            a[c] = b[c]
        });
        return a
    }
    function ya(a) {
        ua(a) && (a = l(a));
        if (ga && y(a))
            for (var b = a, c = 0, d; d = b.charAt(c); )
                b[c++] = d;
        return a
    }
    function O(a) {
        xa(this, ya(a))
    }
    O.prototype.constructor = l;
    var P = u.abs
      , za = u.pow
      , Aa = u.ceil
      , Q = u.floor
      , R = u.round
      , Ca = u.min
      , S = u.max;
    function Da(a, b, c) {
        var d = za(10, P(b || 0));
        c = c || R;
        0 > b && (d = 1 / d);
        return c(a * d) / d
    }
    var Ea = 48, Fa = 57, Ga = 65296, Ha = 65305, Ia = ".", Ja = "", Ka = {}, La;
    function Ma() {
        return "\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u2028\u2029\u3000\ufeff"
    }
    function Na(a, b) {
        var c = "";
        for (a = a.toString(); 0 < b; )
            if (b & 1 && (c += a),
            b >>= 1)
                a += a;
        return c
    }
    function Oa(a, b) {
        var c, d;
        c = a.replace(La, function(a) {
            a = Ka[a];
            a === Ia && (d = !0);
            return a
        });
        return d ? parseFloat(c) : parseInt(c, b || 10)
    }
    function T(a, b, c, d) {
        d = P(a).toString(d || 10);
        d = Na("0", b - d.replace(/\.\d+/, "").length) + d;
        if (c || 0 > a)
            d = (0 > a ? "-" : "+") + d;
        return d
    }
    function Pa(a) {
        if (11 <= a && 13 >= a)
            return "th";
        switch (a % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th"
        }
    }
    function Qa(a, b) {
        function c(a, c) {
            if (a || -1 < b.indexOf(c))
                d += c
        }
        var d = "";
        b = b || "";
        c(a.multiline, "m");
        c(a.ignoreCase, "i");
        c(a.global, "g");
        c(a.u, "y");
        return d
    }
    function Ra(a) {
        y(a) || (a = s(a));
        return a.replace(/([\\/\'*+?|()\[\]{}.^$])/g, "\\$1")
    }
    function U(a, b) {
        return a["get" + (a._utc ? "UTC" : "") + b]()
    }
    function Sa(a, b, c) {
        return a["set" + (a._utc && "ISOWeek" != b ? "UTC" : "") + b](c)
    }
    function Ta(a, b) {
        var c = typeof a, d, e, g, f, h, m, n;
        if ("string" === c)
            return a;
        g = v.call(a);
        d = va(a, g);
        e = A(a, g);
        if (null != a && d || e) {
            b || (b = []);
            if (1 < b.length)
                for (m = b.length; m--; )
                    if (b[m] === a)
                        return "CYC";
            b.push(a);
            d = a.valueOf() + s(a.constructor);
            f = e ? a : l.keys(a).sort();
            m = 0;
            for (n = f.length; m < n; m++)
                h = e ? m : f[m],
                d += h + Ta(a[h], b);
            b.pop()
        } else
            d = -Infinity === 1 / a ? "-0" : s(a && a.valueOf ? a.valueOf() : a);
        return c + g + d
    }
    function Ua(a, b) {
        return a === b ? 0 !== a || 1 / a === 1 / b : Va(a) && Va(b) ? Ta(a) === Ta(b) : !1
    }
    function Va(a) {
        var b = v.call(a);
        return ja.test(b) || va(a, b)
    }
    function Wa(a, b, c) {
        var d, e = a.length, g = b.length, f = !1 !== b[g - 1];
        if (!(g > (f ? 1 : 2)))
            return Xa(a, e, b[0], f, c);
        d = [];
        L(b, function(b) {
            if (la(b))
                return !1;
            d.push(Xa(a, e, b, f, c))
        });
        return d
    }
    function Xa(a, b, c, d, e) {
        d && (c %= b,
        0 > c && (c = b + c));
        return e ? a.charAt(c) : a[c]
    }
    function Ya(a, b) {
        K(b, !0, !1, a, function(a, b) {
            a[b + ("equal" === b ? "s" : "")] = function() {
                return l[b].apply(null, [this].concat(L(arguments)))
            }
        })
    }
    na(l);
    I(w, function(a, b) {
        na(ba[b])
    });
    var Za, $a;
    for ($a = 0; 9 >= $a; $a++)
        Za = s.fromCharCode($a + Ga),
        Ja += Za,
        Ka[Za] = s.fromCharCode($a + Ea);
    Ka[","] = "";
    Ka["\uff0e"] = Ia;
    Ka[Ia] = Ia;
    La = q("[" + Ja + "\uff0e," + Ia + "]", "g");
    "use strict";
    H(l, !1, !1, {
        keys: function(a) {
            var b = [];
            if (!G(a) && !D(a) && !F(a))
                throw new TypeError("Object required");
            I(a, function(a) {
                b.push(a)
            });
            return b
        }
    });
    function ab(a, b, c, d) {
        var e = a.length
          , g = -1 == d
          , f = g ? e - 1 : 0;
        c = isNaN(c) ? f : parseInt(c >> 0);
        0 > c && (c = e + c);
        if (!g && 0 > c || g && c >= e)
            c = f;
        for (; g && 0 <= c || !g && c < e; ) {
            if (a[c] === b)
                return c;
            c += d
        }
        return -1
    }
    function bb(a, b, c, d) {
        var e = a.length
          , g = 0
          , f = M(c);
        ta(b);
        if (0 != e || f)
            f || (c = a[d ? e - 1 : g],
            g++);
        else
            throw new TypeError("Reduce called on empty array with no initial value");
        for (; g < e; )
            f = d ? e - g - 1 : g,
            f in a && (c = b(c, a[f], f, a)),
            g++;
        return c
    }
    function cb(a) {
        if (0 === a.length)
            throw new TypeError("First argument must be defined");
    }
    H(p, !1, !1, {
        isArray: function(a) {
            return A(a)
        }
    });
    H(p, !0, !1, {
        every: function(a, b) {
            var c = this.length
              , d = 0;
            for (cb(arguments); d < c; ) {
                if (d in this && !a.call(b, this[d], d, this))
                    return !1;
                d++
            }
            return !0
        },
        some: function(a, b) {
            var c = this.length
              , d = 0;
            for (cb(arguments); d < c; ) {
                if (d in this && a.call(b, this[d], d, this))
                    return !0;
                d++
            }
            return !1
        },
        map: function(a, b) {
            b = arguments[1];
            var c = this.length
              , d = 0
              , e = Array(c);
            for (cb(arguments); d < c; )
                d in this && (e[d] = a.call(b, this[d], d, this)),
                d++;
            return e
        },
        filter: function(a) {
            var b = arguments[1]
              , c = this.length
              , d = 0
              , e = [];
            for (cb(arguments); d < c; )
                d in this && a.call(b, this[d], d, this) && e.push(this[d]),
                d++;
            return e
        },
        indexOf: function(a, b) {
            return y(this) ? this.indexOf(a, b) : ab(this, a, b, 1)
        },
        lastIndexOf: function(a, b) {
            return y(this) ? this.lastIndexOf(a, b) : ab(this, a, b, -1)
        },
        forEach: function(a, b) {
            var c = this.length
              , d = 0;
            for (ta(a); d < c; )
                d in this && a.call(b, this[d], d, this),
                d++
        },
        reduce: function(a, b) {
            return bb(this, a, b)
        },
        reduceRight: function(a, b) {
            return bb(this, a, b, !0)
        }
    });
    H(Function, !0, !1, {
        bind: function(a) {
            var b = this, c = L(arguments, null, 1), d;
            if (!F(this))
                throw new TypeError("Function.prototype.bind called on a non-function");
            d = function() {
                return b.apply(b.prototype && this instanceof b ? this : a, c.concat(L(arguments)))
            }
            ;
            d.prototype = this.prototype;
            return d
        }
    });
    H(r, !1, !1, {
        now: function() {
            return (new r).getTime()
        }
    });
    (function() {
        var a = Ma().match(/^\s+$/);
        try {
            s.prototype.trim.call([1])
        } catch (b) {
            a = !1
        }
        H(s, !0, !a, {
            trim: function() {
                return this.toString().trimLeft().trimRight()
            },
            trimLeft: function() {
                return this.replace(q("^[" + Ma() + "]+"), "")
            },
            trimRight: function() {
                return this.replace(q("[" + Ma() + "]+$"), "")
            }
        })
    }
    )();
    (function() {
        var a = new r(r.UTC(1999, 11, 31))
          , a = a.toISOString && "1999-12-31T00:00:00.000Z" === a.toISOString();
        K(r, !0, !a, "toISOString,toJSON", function(a, c) {
            a[c] = function() {
                return T(this.getUTCFullYear(), 4) + "-" + T(this.getUTCMonth() + 1, 2) + "-" + T(this.getUTCDate(), 2) + "T" + T(this.getUTCHours(), 2) + ":" + T(this.getUTCMinutes(), 2) + ":" + T(this.getUTCSeconds(), 2) + "." + T(this.getUTCMilliseconds(), 3) + "Z"
            }
        })
    }
    )();
    "use strict";
    function db(a) {
        a = q(a);
        return function(b) {
            return a.test(b)
        }
    }
    function eb(a) {
        var b = a.getTime();
        return function(a) {
            return !(!a || !a.getTime) && a.getTime() === b
        }
    }
    function fb(a) {
        return function(b, c, d) {
            return b === a || a.call(this, b, c, d)
        }
    }
    function gb(a) {
        return function(b, c, d) {
            return b === a || a.call(d, c, b, d)
        }
    }
    function hb(a, b) {
        var c = {};
        return function(d, e, g) {
            var f;
            if (!G(d))
                return !1;
            for (f in a)
                if (c[f] = c[f] || ib(a[f], b),
                !1 === c[f].call(g, d[f], e, g))
                    return !1;
            return !0
        }
    }
    function jb(a) {
        return function(b) {
            return b === a || Ua(b, a)
        }
    }
    function ib(a, b) {
        if (!ua(a)) {
            if (D(a))
                return db(a);
            if (C(a))
                return eb(a);
            if (F(a))
                return b ? gb(a) : fb(a);
            if (va(a))
                return hb(a, b)
        }
        return jb(a)
    }
    function kb(a, b, c, d) {
        return b ? b.apply ? b.apply(c, d || []) : F(a[b]) ? a[b].call(a) : a[b] : a
    }
    function V(a, b, c, d) {
        var e = +a.length;
        0 > c && (c = a.length + c);
        c = isNaN(c) ? 0 : c;
        for (!0 === d && (e += c); c < e; ) {
            d = c % a.length;
            if (!(d in a)) {
                lb(a, b, c);
                break
            }
            if (!1 === b.call(a, a[d], d, a))
                break;
            c++
        }
    }
    function lb(a, b, c) {
        var d = [], e;
        for (e in a)
            e in a && (e >>> 0 == e && 4294967295 != e) && e >= c && d.push(parseInt(e));
        d.sort().each(function(c) {
            return b.call(a, a[c], c, a)
        })
    }
    function mb(a, b, c, d, e, g) {
        var f, h, m;
        0 < a.length && (m = ib(b),
        V(a, function(b, c) {
            if (m.call(g, b, c, a))
                return f = b,
                h = c,
                !1
        }, c, d));
        return e ? h : f
    }
    function nb(a, b) {
        var c = [], d = {}, e;
        V(a, function(g, f) {
            e = b ? kb(g, b, a, [g, f, a]) : g;
            ob(d, e) || c.push(g)
        });
        return c
    }
    function pb(a, b, c) {
        var d = []
          , e = {};
        b.each(function(a) {
            ob(e, a)
        });
        a.each(function(a) {
            var b = Ta(a)
              , h = !Va(a);
            if (qb(e, b, a, h) !== c) {
                var m = 0;
                if (h)
                    for (b = e[b]; m < b.length; )
                        b[m] === a ? b.splice(m, 1) : m += 1;
                else
                    delete e[b];
                d.push(a)
            }
        });
        return d
    }
    function rb(a, b, c) {
        b = b || Infinity;
        c = c || 0;
        var d = [];
        V(a, function(a) {
            A(a) && c < b ? d = d.concat(rb(a, b, c + 1)) : d.push(a)
        });
        return d
    }
    function sb(a) {
        var b = [];
        L(a, function(a) {
            b = b.concat(a)
        });
        return b
    }
    function qb(a, b, c, d) {
        var e = b in a;
        d && (a[b] || (a[b] = []),
        e = -1 !== a[b].indexOf(c));
        return e
    }
    function ob(a, b) {
        var c = Ta(b)
          , d = !Va(b)
          , e = qb(a, c, b, d);
        d ? a[c].push(b) : a[c] = b;
        return e
    }
    function tb(a, b, c, d) {
        var e, g, f, h = [], m = "max" === c, n = "min" === c, z = p.isArray(a);
        for (e in a)
            if (a.hasOwnProperty(e)) {
                c = a[e];
                f = kb(c, b, a, z ? [c, parseInt(e), a] : []);
                if (N(f))
                    throw new TypeError("Cannot compare with undefined");
                if (f === g)
                    h.push(c);
                else if (N(g) || m && f > g || n && f < g)
                    h = [c],
                    g = f
            }
        z || (h = rb(h, 1));
        return d ? h : h[0]
    }
    function ub(a, b) {
        var c, d, e, g, f = 0, h = 0;
        c = p[xb];
        d = p[yb];
        var m = p[zb]
          , n = p[Ab]
          , z = p[Bb];
        a = Cb(a, c, d);
        b = Cb(b, c, d);
        do
            c = a.charAt(f),
            e = m[c] || c,
            c = b.charAt(f),
            g = m[c] || c,
            c = e ? n.indexOf(e) : null,
            d = g ? n.indexOf(g) : null,
            -1 === c || -1 === d ? (c = a.charCodeAt(f) || null,
            d = b.charCodeAt(f) || null,
            z && ((c >= Ea && c <= Fa || c >= Ga && c <= Ha) && (d >= Ea && d <= Fa || d >= Ga && d <= Ha)) && (c = Oa(a.slice(f)),
            d = Oa(b.slice(f)))) : (e = e !== a.charAt(f),
            g = g !== b.charAt(f),
            e !== g && 0 === h && (h = e - g)),
            f += 1;
        while (null != c && null != d && c === d);return c === d ? h : c - d
    }
    function Cb(a, b, c) {
        y(a) || (a = s(a));
        c && (a = a.toLowerCase());
        b && (a = a.replace(b, ""));
        return a
    }
    var Ab = "AlphanumericSortOrder"
      , xb = "AlphanumericSortIgnore"
      , yb = "AlphanumericSortIgnoreCase"
      , zb = "AlphanumericSortEquivalents"
      , Bb = "AlphanumericSortNatural";
    H(p, !1, !0, {
        create: function() {
            var a = [];
            L(arguments, function(b) {
                if (!ua(b) && "length"in b && ("[object Arguments]" === v.call(b) || b.callee) || !ua(b) && "length"in b && !y(b) && !va(b))
                    b = p.prototype.slice.call(b, 0);
                a = a.concat(b)
            });
            return a
        }
    });
    H(p, !0, !1, {
        find: function(a, b) {
            ta(a);
            return mb(this, a, 0, !1, !1, b)
        },
        findIndex: function(a, b) {
            var c;
            ta(a);
            c = mb(this, a, 0, !1, !0, b);
            return N(c) ? -1 : c
        }
    });
    H(p, !0, !0, {
        findFrom: function(a, b, c) {
            return mb(this, a, b, c)
        },
        findIndexFrom: function(a, b, c) {
            b = mb(this, a, b, c, !0);
            return N(b) ? -1 : b
        },
        findAll: function(a, b, c) {
            var d = [], e;
            0 < this.length && (e = ib(a),
            V(this, function(a, b, c) {
                e(a, b, c) && d.push(a)
            }, b, c));
            return d
        },
        count: function(a) {
            return N(a) ? this.length : this.findAll(a).length
        },
        removeAt: function(a, b) {
            if (N(a))
                return this;
            N(b) && (b = a);
            this.splice(a, b - a + 1);
            return this
        },
        include: function(a, b) {
            return this.clone().add(a, b)
        },
        exclude: function() {
            return p.prototype.remove.apply(this.clone(), arguments)
        },
        clone: function() {
            return xa([], this)
        },
        unique: function(a) {
            return nb(this, a)
        },
        flatten: function(a) {
            return rb(this, a)
        },
        union: function() {
            return nb(this.concat(sb(arguments)))
        },
        intersect: function() {
            return pb(this, sb(arguments), !1)
        },
        subtract: function(a) {
            return pb(this, sb(arguments), !0)
        },
        at: function() {
            return Wa(this, arguments)
        },
        first: function(a) {
            if (N(a))
                return this[0];
            0 > a && (a = 0);
            return this.slice(0, a)
        },
        last: function(a) {
            return N(a) ? this[this.length - 1] : this.slice(0 > this.length - a ? 0 : this.length - a)
        },
        from: function(a) {
            return this.slice(a)
        },
        to: function(a) {
            N(a) && (a = this.length);
            return this.slice(0, a)
        },
        min: function(a, b) {
            return tb(this, a, "min", b)
        },
        max: function(a, b) {
            return tb(this, a, "max", b)
        },
        least: function(a, b) {
            return tb(this.groupBy.apply(this, [a]), "length", "min", b)
        },
        most: function(a, b) {
            return tb(this.groupBy.apply(this, [a]), "length", "max", b)
        },
        sum: function(a) {
            a = a ? this.map(a) : this;
            return 0 < a.length ? a.reduce(function(a, c) {
                return a + c
            }) : 0
        },
        average: function(a) {
            a = a ? this.map(a) : this;
            return 0 < a.length ? a.sum() / a.length : 0
        },
        inGroups: function(a, b) {
            var c = 1 < arguments.length
              , d = this
              , e = []
              , g = Aa(this.length / a);
            wa(a, function(a) {
                a *= g;
                var h = d.slice(a, a + g);
                c && h.length < g && wa(g - h.length, function() {
                    h = h.add(b)
                });
                e.push(h)
            });
            return e
        },
        inGroupsOf: function(a, b) {
            var c = [], d = this.length, e = this, g;
            if (0 === d || 0 === a)
                return e;
            N(a) && (a = 1);
            N(b) && (b = null);
            wa(Aa(d / a), function(d) {
                for (g = e.slice(a * d, a * d + a); g.length < a; )
                    g.push(b);
                c.push(g)
            });
            return c
        },
        isEmpty: function() {
            return 0 == this.compact().length
        },
        sortBy: function(a, b) {
            var c = this.clone();
            c.sort(function(d, e) {
                var g, f;
                g = kb(d, a, c, [d]);
                f = kb(e, a, c, [e]);
                return (y(g) && y(f) ? ub(g, f) : g < f ? -1 : g > f ? 1 : 0) * (b ? -1 : 1)
            });
            return c
        },
        randomize: function() {
            for (var a = this.concat(), b = a.length, c, d; b; )
                c = u.random() * b | 0,
                d = a[--b],
                a[b] = a[c],
                a[c] = d;
            return a
        },
        zip: function() {
            var a = L(arguments);
            return this.map(function(b, c) {
                return [b].concat(a.map(function(a) {
                    return c in a ? a[c] : null
                }))
            })
        },
        sample: function(a) {
            var b = this.randomize();
            return 0 < arguments.length ? b.slice(0, a) : b[0]
        },
        each: function(a, b, c) {
            V(this, a, b, c);
            return this
        },
        add: function(a, b) {
            if (!x(t(b)) || isNaN(b))
                b = this.length;
            p.prototype.splice.apply(this, [b, 0].concat(a));
            return this
        },
        remove: function() {
            var a = this;
            L(arguments, function(b) {
                var c = 0;
                for (b = ib(b); c < a.length; )
                    b(a[c], c, a) ? a.splice(c, 1) : c++
            });
            return a
        },
        compact: function(a) {
            var b = [];
            V(this, function(c) {
                A(c) ? b.push(c.compact()) : a && c ? b.push(c) : a || (null == c || c.valueOf() !== c.valueOf()) || b.push(c)
            });
            return b
        },
        groupBy: function(a, b) {
            var c = this, d = {}, e;
            V(c, function(b, f) {
                e = kb(b, a, c, [b, f, c]);
                d[e] || (d[e] = []);
                d[e].push(b)
            });
            b && I(d, b);
            return d
        },
        none: function() {
            return !this.any.apply(this, arguments)
        }
    });
    H(p, !0, !0, {
        all: p.prototype.every,
        any: p.prototype.some,
        insert: p.prototype.add
    });
    function Db(a, b) {
        K(l, !1, !0, a, function(a, d) {
            a[d] = function(a, c, f) {
                var h = l.keys(ya(a)), m;
                b || (m = ib(c, !0));
                f = p.prototype[d].call(h, function(d) {
                    var f = a[d];
                    return b ? kb(f, c, a, [d, f, a]) : m(f, d, a)
                }, f);
                A(f) && (f = f.reduce(function(b, c) {
                    b[c] = a[c];
                    return b
                }, {}));
                return f
            }
        });
        Ya(a, O)
    }
    H(l, !1, !0, {
        map: function(a, b) {
            var c = {}, d, e;
            for (d in a)
                J(a, d) && (e = a[d],
                c[d] = kb(e, b, a, [d, e, a]));
            return c
        },
        reduce: function(a) {
            var b = l.keys(ya(a)).map(function(b) {
                return a[b]
            });
            return b.reduce.apply(b, L(arguments, null, 1))
        },
        each: function(a, b) {
            ta(b);
            I(a, b);
            return a
        },
        size: function(a) {
            return l.keys(ya(a)).length
        }
    });
    var Eb = "any all none count find findAll isEmpty".split(" ")
      , Fb = "sum average min max least most".split(" ")
      , Gb = ["map", "reduce", "size"]
      , Hb = Eb.concat(Fb).concat(Gb);
    (function() {
        function a() {
            var a = arguments;
            return 0 < a.length && !F(a[0])
        }
        var b = p.prototype.map;
        K(p, !0, a, "every,all,some,filter,any,none,find,findIndex", function(a, b) {
            var e = p.prototype[b];
            a[b] = function(a) {
                var b = ib(a);
                return e.call(this, function(a, c) {
                    return b(a, c, this)
                })
            }
        });
        H(p, !0, a, {
            map: function(a) {
                return b.call(this, function(b, e) {
                    return kb(b, a, this, [b, e, this])
                })
            }
        })
    }
    )();
    (function() {
        p[Ab] = "A\u00c1\u00c0\u00c2\u00c3\u0104BC\u0106\u010c\u00c7D\u010e\u00d0E\u00c9\u00c8\u011a\u00ca\u00cb\u0118FG\u011eH\u0131I\u00cd\u00cc\u0130\u00ce\u00cfJKL\u0141MN\u0143\u0147\u00d1O\u00d3\u00d2\u00d4PQR\u0158S\u015a\u0160\u015eT\u0164U\u00da\u00d9\u016e\u00db\u00dcVWXY\u00ddZ\u0179\u017b\u017d\u00de\u00c6\u0152\u00d8\u00d5\u00c5\u00c4\u00d6".split("").map(function(a) {
            return a + a.toLowerCase()
        }).join("");
        var a = {};
        V("A\u00c1\u00c0\u00c2\u00c3\u00c4 C\u00c7 E\u00c9\u00c8\u00ca\u00cb I\u00cd\u00cc\u0130\u00ce\u00cf O\u00d3\u00d2\u00d4\u00d5\u00d6 S\u00df U\u00da\u00d9\u00db\u00dc".split(" "), function(b) {
            var c = b.charAt(0);
            V(b.slice(1).split(""), function(b) {
                a[b] = c;
                a[b.toLowerCase()] = c.toLowerCase()
            })
        });
        p[Bb] = !0;
        p[yb] = !0;
        p[zb] = a
    }
    )();
    Db(Eb);
    Db(Fb, !0);
    Ya(Gb, O);
    p.AlphanumericSort = ub;
    "use strict";
    var W, Ib, Jb = "ampm hour minute second ampm utc offset_sign offset_hours offset_minutes ampm".split(" "), Kb = "({t})?\\s*(\\d{1,2}(?:[,.]\\d+)?)(?:{h}([0-5]\\d(?:[,.]\\d+)?)?{m}(?::?([0-5]\\d(?:[,.]\\d+)?){s})?\\s*(?:({t})|(Z)|(?:([+-])(\\d{2,2})(?::?(\\d{2,2}))?)?)?|\\s*({t}))", Lb = {}, Mb, Nb, Ob, Pb = [], Qb = {}, X = {
        yyyy: function(a) {
            return U(a, "FullYear")
        },
        yy: function(a) {
            return U(a, "FullYear") % 100
        },
        ord: function(a) {
            a = U(a, "Date");
            return a + Pa(a)
        },
        tz: function(a) {
            return a.getUTCOffset()
        },
        isotz: function(a) {
            return a.getUTCOffset(!0)
        },
        Z: function(a) {
            return a.getUTCOffset()
        },
        ZZ: function(a) {
            return a.getUTCOffset().replace(/(\d{2})$/, ":$1")
        }
    }, Rb = [{
        name: "year",
        method: "FullYear",
        k: !0,
        b: function(a) {
            return 864E5 * (365 + (a ? a.isLeapYear() ? 1 : 0 : 0.25))
        }
    }, {
        name: "month",
        error: 0.919,
        method: "Month",
        k: !0,
        b: function(a, b) {
            var c = 30.4375, d;
            a && (d = a.daysInMonth(),
            b <= d.days() && (c = d));
            return 864E5 * c
        }
    }, {
        name: "week",
        method: "ISOWeek",
        b: aa(6048E5)
    }, {
        name: "day",
        error: 0.958,
        method: "Date",
        k: !0,
        b: aa(864E5)
    }, {
        name: "hour",
        method: "Hours",
        b: aa(36E5)
    }, {
        name: "minute",
        method: "Minutes",
        b: aa(6E4)
    }, {
        name: "second",
        method: "Seconds",
        b: aa(1E3)
    }, {
        name: "millisecond",
        method: "Milliseconds",
        b: aa(1)
    }], Sb = {};
    function Tb(a) {
        xa(this, a);
        this.g = Pb.concat()
    }
    Tb.prototype = {
        getMonth: function(a) {
            return x(a) ? a - 1 : this.months.indexOf(a) % 12
        },
        getWeekday: function(a) {
            return this.weekdays.indexOf(a) % 7
        },
        addFormat: function(a, b, c, d, e) {
            var g = c || [], f = this, h;
            a = a.replace(/\s+/g, "[,. ]*");
            a = a.replace(/\{([^,]+?)\}/g, function(a, b) {
                var d, e, h, B = b.match(/\?$/);
                h = b.match(/^(\d+)\??$/);
                var k = b.match(/(\d)(?:-(\d))?/)
                  , E = b.replace(/[^a-z]+$/, "");
                h ? d = f.tokens[h[1]] : f[E] ? d = f[E] : f[E + "s"] && (d = f[E + "s"],
                k && (e = [],
                d.forEach(function(a, b) {
                    var c = b % (f.units ? 8 : d.length);
                    c >= k[1] && c <= (k[2] || k[1]) && e.push(a)
                }),
                d = e),
                d = Ub(d));
                h ? h = "(?:" + d + ")" : (c || g.push(E),
                h = "(" + d + ")");
                B && (h += "?");
                return h
            });
            b ? (b = Vb(f, e),
            e = ["t", "[\\s\\u3000]"].concat(f.timeMarker),
            h = a.match(/\\d\{\d,\d\}\)+\??$/),
            Wb(f, "(?:" + b + ")[,\\s\\u3000]+?" + a, Jb.concat(g), d),
            Wb(f, a + "(?:[,\\s]*(?:" + e.join("|") + (h ? "+" : "*") + ")" + b + ")?", g.concat(Jb), d)) : Wb(f, a, g, d)
        }
    };
    function Xb(a, b, c) {
        var d, e, g = b[0], f = b[1], h = b[2];
        b = a[c] || a.relative;
        if (F(b))
            return b.call(a, g, f, h, c);
        e = a.units[8 * (a.plural && 1 < g ? 1 : 0) + f] || a.units[f];
        a.capitalizeUnit && (e = Yb(e));
        d = a.modifiers.filter(function(a) {
            return "sign" == a.name && a.value == (0 < h ? 1 : -1)
        })[0];
        return b.replace(/\{(.*?)\}/g, function(a, b) {
            switch (b) {
            case "num":
                return g;
            case "unit":
                return e;
            case "sign":
                return d.src
            }
        })
    }
    function Zb(a, b) {
        b = b || a.code;
        return "en" === b || "en-US" === b ? !0 : a.variant
    }
    function $b(a, b) {
        return b.replace(q(a.num, "g"), function(b) {
            return ac(a, b) || ""
        })
    }
    function ac(a, b) {
        var c;
        return x(b) ? b : b && -1 !== (c = a.numbers.indexOf(b)) ? (c + 1) % 10 : 1
    }
    function Y(a, b) {
        var c;
        y(a) || (a = "");
        c = Sb[a] || Sb[a.slice(0, 2)];
        if (!1 === b && !c)
            throw new TypeError("Invalid locale.");
        return c || Ib
    }
    function bc(a, b) {
        function c(a) {
            var b = h[a];
            y(b) ? h[a] = b.split(",") : b || (h[a] = [])
        }
        function d(a, b) {
            a = a.split("+").map(function(a) {
                return a.replace(/(.+):(.+)$/, function(a, b, c) {
                    return c.split("|").map(function(a) {
                        return b + a
                    }).join("|")
                })
            }).join("|");
            a.split("|").forEach(b)
        }
        function e(a, b, c) {
            var e = [];
            h[a].forEach(function(a, f) {
                b && (a += "+" + a.slice(0, 3));
                d(a, function(a, b) {
                    e[b * c + f] = a.toLowerCase()
                })
            });
            h[a] = e
        }
        function g(a, b, c) {
            a = "\\d{" + a + "," + b + "}";
            c && (a += "|(?:" + Ub(h.numbers) + ")+");
            return a
        }
        function f(a, b) {
            h[a] = h[a] || b
        }
        var h, m;
        h = new Tb(b);
        c("modifiers");
        "months weekdays units numbers articles tokens timeMarker ampm timeSuffixes dateParse timeParse".split(" ").forEach(c);
        m = !h.monthSuffix;
        e("months", m, 12);
        e("weekdays", m, 7);
        e("units", !1, 8);
        e("numbers", !1, 10);
        f("code", a);
        f("date", g(1, 2, h.digitDate));
        f("year", "'\\d{2}|" + g(4, 4));
        f("num", function() {
            var a = ["-?\\d+"].concat(h.articles);
            h.numbers && (a = a.concat(h.numbers));
            return Ub(a)
        }());
        (function() {
            var a = [];
            h.i = {};
            h.modifiers.push({
                name: "day",
                src: "yesterday",
                value: -1
            });
            h.modifiers.push({
                name: "day",
                src: "today",
                value: 0
            });
            h.modifiers.push({
                name: "day",
                src: "tomorrow",
                value: 1
            });
            h.modifiers.forEach(function(b) {
                var c = b.name;
                d(b.src, function(d) {
                    var e = h[c];
                    h.i[d] = b;
                    a.push({
                        name: c,
                        src: d,
                        value: b.value
                    });
                    h[c] = e ? e + "|" + d : d
                })
            });
            h.day += "|" + Ub(h.weekdays);
            h.modifiers = a
        }
        )();
        h.monthSuffix && (h.month = g(1, 2),
        h.months = "1 2 3 4 5 6 7 8 9 10 11 12".split(" ").map(function(a) {
            return a + h.monthSuffix
        }));
        h.full_month = g(1, 2) + "|" + Ub(h.months);
        0 < h.timeSuffixes.length && h.addFormat(Vb(h), !1, Jb);
        h.addFormat("{day}", !0);
        h.addFormat("{month}" + (h.monthSuffix || ""));
        h.addFormat("{year}" + (h.yearSuffix || ""));
        h.timeParse.forEach(function(a) {
            h.addFormat(a, !0)
        });
        h.dateParse.forEach(function(a) {
            h.addFormat(a)
        });
        return Sb[a] = h
    }
    function Wb(a, b, c, d) {
        a.g.unshift({
            r: d,
            locale: a,
            q: q("^" + b + "$", "i"),
            to: c
        })
    }
    function Yb(a) {
        return a.slice(0, 1).toUpperCase() + a.slice(1)
    }
    function Ub(a) {
        return a.filter(function(a) {
            return !!a
        }).join("|")
    }
    function cc() {
        var a = r.SugarNewDate;
        return a ? a() : new r
    }
    function dc(a, b) {
        var c;
        if (G(a[0]))
            return a;
        if (x(a[0]) && !x(a[1]))
            return [a[0]];
        if (y(a[0]) && b)
            return [ec(a[0]), a[1]];
        c = {};
        Nb.forEach(function(b, e) {
            c[b.name] = a[e]
        });
        return [c]
    }
    function ec(a) {
        var b, c = {};
        if (a = a.match(/^(\d+)?\s?(\w+?)s?$/i))
            N(b) && (b = parseInt(a[1]) || 1),
            c[a[2].toLowerCase()] = b;
        return c
    }
    function fc(a, b, c) {
        var d;
        N(c) && (c = Ob.length);
        for (b = b || 0; b < c && (d = Ob[b],
        !1 !== a(d.name, d, b)); b++)
            ;
    }
    function gc(a, b) {
        var c = {}, d, e;
        b.forEach(function(b, f) {
            d = a[f + 1];
            N(d) || "" === d || ("year" === b && (c.t = d.replace(/'/, "")),
            e = parseFloat(d.replace(/'/, "").replace(/,/, ".")),
            c[b] = isNaN(e) ? d.toLowerCase() : e)
        });
        return c
    }
    function hc(a) {
        a = a.trim().replace(/^just (?=now)|\.+$/i, "");
        return ic(a)
    }
    function ic(a) {
        return a.replace(Mb, function(a, c, d) {
            var e = 0, g = 1, f, h;
            if (c)
                return a;
            d.split("").reverse().forEach(function(a) {
                a = Lb[a];
                var b = 9 < a;
                b ? (f && (e += g),
                g *= a / (h || 1),
                h = a) : (!1 === f && (g *= 10),
                e += g * a);
                f = b
            });
            f && (e += g);
            return e
        })
    }
    function jc(a, b, c, d) {
        function e(a) {
            vb.push(a)
        }
        function g() {
            vb.forEach(function(a) {
                a.call()
            })
        }
        function f() {
            var a = n.getWeekday();
            n.setWeekday(7 * (k.num - 1) + (a > Ba ? Ba + 7 : Ba))
        }
        function h() {
            var a = B.i[k.edge];
            fc(function(a) {
                if (M(k[a]))
                    return E = a,
                    !1
            }, 4);
            if ("year" === E)
                k.e = "month";
            else if ("month" === E || "week" === E)
                k.e = "day";
            n[(0 > a.value ? "endOf" : "beginningOf") + Yb(E)]();
            -2 === a.value && n.reset()
        }
        function m() {
            var a;
            fc(function(b, c, d) {
                "day" === b && (b = "date");
                if (M(k[b])) {
                    if (d >= wb)
                        return n.setTime(NaN),
                        !1;
                    a = a || {};
                    a[b] = k[b];
                    delete k[b]
                }
            });
            a && e(function() {
                n.set(a, !0)
            })
        }
        var n, z, ha, vb, B, k, E, wb, Ba, ra, ca;
        n = cc();
        vb = [];
        n.utc(d);
        C(a) ? n.utc(a.isUTC()).setTime(a.getTime()) : x(a) ? n.setTime(a) : G(a) ? (n.set(a, !0),
        k = a) : y(a) && (ha = Y(b),
        a = hc(a),
        ha && I(ha.o ? [ha.o].concat(ha.g) : ha.g, function(c, d) {
            var g = a.match(d.q);
            if (g) {
                B = d.locale;
                k = gc(g, d.to);
                B.o = d;
                k.utc && n.utc();
                if (k.timestamp)
                    return k = k.timestamp,
                    !1;
                d.r && (!y(k.month) && (y(k.date) || Zb(ha, b))) && (ca = k.month,
                k.month = k.date,
                k.date = ca);
                k.year && 2 === k.t.length && (k.year = 100 * R(U(cc(), "FullYear") / 100) - 100 * R(k.year / 100) + k.year);
                k.month && (k.month = B.getMonth(k.month),
                k.shift && !k.unit && (k.unit = B.units[7]));
                k.weekday && k.date ? delete k.weekday : k.weekday && (k.weekday = B.getWeekday(k.weekday),
                k.shift && !k.unit && (k.unit = B.units[5]));
                k.day && (ca = B.i[k.day]) ? (k.day = ca.value,
                n.reset(),
                z = !0) : k.day && -1 < (Ba = B.getWeekday(k.day)) && (delete k.day,
                k.num && k.month ? (e(f),
                k.day = 1) : k.weekday = Ba);
                k.date && !x(k.date) && (k.date = $b(B, k.date));
                k.ampm && k.ampm === B.ampm[1] && 12 > k.hour ? k.hour += 12 : k.ampm === B.ampm[0] && 12 === k.hour && (k.hour = 0);
                if ("offset_hours"in k || "offset_minutes"in k)
                    n.utc(),
                    k.offset_minutes = k.offset_minutes || 0,
                    k.offset_minutes += 60 * k.offset_hours,
                    "-" === k.offset_sign && (k.offset_minutes *= -1),
                    k.minute -= k.offset_minutes;
                k.unit && (z = !0,
                ra = ac(B, k.num),
                wb = B.units.indexOf(k.unit) % 8,
                E = W.units[wb],
                m(),
                k.shift && (ra *= (ca = B.i[k.shift]) ? ca.value : 0),
                k.sign && (ca = B.i[k.sign]) && (ra *= ca.value),
                M(k.weekday) && (n.set({
                    weekday: k.weekday
                }, !0),
                delete k.weekday),
                k[E] = (k[E] || 0) + ra);
                k.edge && e(h);
                "-" === k.year_sign && (k.year *= -1);
                fc(function(a, b, c) {
                    b = k[a];
                    var d = b % 1;
                    d && (k[Ob[c - 1].name] = R(d * ("second" === a ? 1E3 : 60)),
                    k[a] = Q(b))
                }, 1, 4);
                return !1
            }
        }),
        k ? z ? n.advance(k) : (n._utc && n.reset(),
        kc(n, k, !0, !1, c)) : ("now" !== a && (n = new r(a)),
        d && n.addMinutes(-n.getTimezoneOffset())),
        g(),
        n.utc(!1));
        return {
            c: n,
            set: k
        }
    }
    function lc(a) {
        var b, c = P(a), d = c, e = 0;
        fc(function(a, f, h) {
            b = Q(Da(c / f.b(), 1));
            1 <= b && (d = b,
            e = h)
        }, 1);
        return [d, e, a]
    }
    function mc(a) {
        var b = lc(a.millisecondsFromNow());
        if (6 === b[1] || 5 === b[1] && 4 === b[0] && a.daysFromNow() >= cc().daysInMonth())
            b[0] = P(a.monthsFromNow()),
            b[1] = 6;
        return b
    }
    function nc(a, b, c) {
        function d(a, c) {
            var d = U(a, "Month");
            return Y(c).months[d + 12 * b]
        }
        Z(a, d, c);
        Z(Yb(a), d, c, 1)
    }
    function Z(a, b, c, d) {
        X[a] = function(a, g) {
            var f = b(a, g);
            c && (f = f.slice(0, c));
            d && (f = f.slice(0, d).toUpperCase() + f.slice(d));
            return f
        }
    }
    function oc(a, b, c) {
        X[a] = b;
        X[a + a] = function(a, c) {
            return T(b(a, c), 2)
        }
        ;
        c && (X[a + a + a] = function(a, c) {
            return T(b(a, c), 3)
        }
        ,
        X[a + a + a + a] = function(a, c) {
            return T(b(a, c), 4)
        }
        )
    }
    function pc(a) {
        var b = a.match(/(\{\w+\})|[^{}]+/g);
        Qb[a] = b.map(function(a) {
            a.replace(/\{(\w+)\}/, function(b, e) {
                a = X[e] || e;
                return e
            });
            return a
        })
    }
    function qc(a, b, c, d) {
        var e;
        if (!a.isValid())
            return "Invalid Date";
        Date[b] ? b = Date[b] : F(b) && (e = mc(a),
        b = b.apply(a, e.concat(Y(d))));
        if (!b && c)
            return e = e || mc(a),
            0 === e[1] && (e[1] = 1,
            e[0] = 1),
            a = Y(d),
            Xb(a, e, 0 < e[2] ? "future" : "past");
        b = b || "long";
        if ("short" === b || "long" === b || "full" === b)
            b = Y(d)[b];
        Qb[b] || pc(b);
        var g, f;
        e = "";
        b = Qb[b];
        g = 0;
        for (c = b.length; g < c; g++)
            f = b[g],
            e += F(f) ? f(a, d) : f;
        return e
    }
    function rc(a, b, c, d, e) {
        var g, f, h, m = 0, n = 0, z = 0;
        g = jc(b, c, null, e);
        0 < d && (n = z = d,
        f = !0);
        if (!g.c.isValid())
            return !1;
        if (g.set && g.set.e) {
            Rb.forEach(function(b) {
                b.name === g.set.e && (m = b.b(g.c, a - g.c) - 1)
            });
            b = Yb(g.set.e);
            if (g.set.edge || g.set.shift)
                g.c["beginningOf" + b]();
            "month" === g.set.e && (h = g.c.clone()["endOf" + b]().getTime());
            !f && (g.set.sign && "millisecond" != g.set.e) && (n = 50,
            z = -50)
        }
        f = a.getTime();
        b = g.c.getTime();
        h = sc(a, b, h || b + m);
        return f >= b - n && f <= h + z
    }
    function sc(a, b, c) {
        b = new r(b);
        a = (new r(c)).utc(a.isUTC());
        23 !== U(a, "Hours") && (b = b.getTimezoneOffset(),
        a = a.getTimezoneOffset(),
        b !== a && (c += (a - b).minutes()));
        return c
    }
    function kc(a, b, c, d, e) {
        function g(a) {
            return M(b[a]) ? b[a] : b[a + "s"]
        }
        function f(a) {
            return M(g(a))
        }
        var h;
        if (x(b) && d)
            b = {
                milliseconds: b
            };
        else if (x(b))
            return a.setTime(b),
            a;
        M(b.date) && (b.day = b.date);
        fc(function(d, e, g) {
            var m = "day" === d;
            if (f(d) || m && f("weekday"))
                return b.e = d,
                h = +g,
                !1;
            !c || ("week" === d || m && f("week")) || Sa(a, e.method, m ? 1 : 0)
        });
        Rb.forEach(function(c) {
            var e = c.name;
            c = c.method;
            var h;
            h = g(e);
            N(h) || (d ? ("week" === e && (h = (b.day || 0) + 7 * h,
            c = "Date"),
            h = h * d + U(a, c)) : "month" === e && f("day") && Sa(a, "Date", 15),
            Sa(a, c, h),
            d && "month" === e && (e = h,
            0 > e && (e = e % 12 + 12),
            e % 12 != U(a, "Month") && Sa(a, "Date", 0)))
        });
        d || (f("day") || !f("weekday")) || a.setWeekday(g("weekday"));
        var m;
        a: {
            switch (e) {
            case -1:
                m = a > cc();
                break a;
            case 1:
                m = a < cc();
                break a
            }
            m = void 0
        }
        m && fc(function(b, c) {
            if ((c.k || "week" === b && f("weekday")) && !(f(b) || "day" === b && f("weekday")))
                return a[c.j](e),
                !1
        }, h + 1);
        return a
    }
    function Vb(a, b) {
        var c = Kb, d = {
            h: 0,
            m: 1,
            s: 2
        }, e;
        a = a || W;
        return c.replace(/{([a-z])}/g, function(c, f) {
            var h = []
              , m = "h" === f
              , n = m && !b;
            if ("t" === f)
                return a.ampm.join("|");
            m && h.push(":");
            (e = a.timeSuffixes[d[f]]) && h.push(e + "\\s*");
            return 0 === h.length ? "" : "(?:" + h.join("|") + ")" + (n ? "" : "?")
        })
    }
    function tc(a, b, c) {
        var d, e;
        x(a[1]) ? d = dc(a)[0] : (d = a[0],
        e = a[1]);
        return jc(d, e, b, c).c
    }
    H(r, !1, !0, {
        create: function() {
            return tc(arguments)
        },
        past: function() {
            return tc(arguments, -1)
        },
        future: function() {
            return tc(arguments, 1)
        },
        addLocale: function(a, b) {
            return bc(a, b)
        },
        setLocale: function(a) {
            var b = Y(a, !1);
            Ib = b;
            a && a != b.code && (b.code = a);
            return b
        },
        getLocale: function(a) {
            return a ? Y(a, !1) : Ib
        },
        addFormat: function(a, b, c) {
            Wb(Y(c), a, b)
        }
    });
    H(r, !0, !0, {
        set: function() {
            var a = dc(arguments);
            return kc(this, a[0], a[1])
        },
        setWeekday: function(a) {
            if (!N(a))
                return Sa(this, "Date", U(this, "Date") + a - U(this, "Day"))
        },
        setISOWeek: function(a) {
            var b = U(this, "Day") || 7;
            if (!N(a))
                return this.set({
                    month: 0,
                    date: 4
                }),
                this.set({
                    weekday: 1
                }),
                1 < a && this.addWeeks(a - 1),
                1 !== b && this.advance({
                    days: b - 1
                }),
                this.getTime()
        },
        getISOWeek: function() {
            var a;
            a = this.clone();
            var b = U(a, "Day") || 7;
            a.addDays(4 - b).reset();
            return 1 + Q(a.daysSince(a.clone().beginningOfYear()) / 7)
        },
        beginningOfISOWeek: function() {
            var a = this.getDay();
            0 === a ? a = -6 : 1 !== a && (a = 1);
            this.setWeekday(a);
            return this.reset()
        },
        endOfISOWeek: function() {
            0 !== this.getDay() && this.setWeekday(7);
            return this.endOfDay()
        },
        getUTCOffset: function(a) {
            var b = this._utc ? 0 : this.getTimezoneOffset()
              , c = !0 === a ? ":" : "";
            return !b && a ? "Z" : T(Q(-b / 60), 2, !0) + c + T(P(b % 60), 2)
        },
        utc: function(a) {
            oa(this, "_utc", !0 === a || 0 === arguments.length);
            return this
        },
        isUTC: function() {
            return !!this._utc || 0 === this.getTimezoneOffset()
        },
        advance: function() {
            var a = dc(arguments, !0);
            return kc(this, a[0], a[1], 1)
        },
        rewind: function() {
            var a = dc(arguments, !0);
            return kc(this, a[0], a[1], -1)
        },
        isValid: function() {
            return !isNaN(this.getTime())
        },
        isAfter: function(a, b) {
            return this.getTime() > r.create(a).getTime() - (b || 0)
        },
        isBefore: function(a, b) {
            return this.getTime() < r.create(a).getTime() + (b || 0)
        },
        isBetween: function(a, b, c) {
            var d = this.getTime();
            a = r.create(a).getTime();
            var e = r.create(b).getTime();
            b = Ca(a, e);
            a = S(a, e);
            c = c || 0;
            return b - c < d && a + c > d
        },
        isLeapYear: function() {
            var a = U(this, "FullYear");
            return 0 === a % 4 && 0 !== a % 100 || 0 === a % 400
        },
        daysInMonth: function() {
            return 32 - U(new r(U(this, "FullYear"),U(this, "Month"),32), "Date")
        },
        format: function(a, b) {
            return qc(this, a, !1, b)
        },
        relative: function(a, b) {
            y(a) && (b = a,
            a = null);
            return qc(this, a, !0, b)
        },
        is: function(a, b, c) {
            var d, e;
            if (this.isValid()) {
                if (y(a))
                    switch (a = a.trim().toLowerCase(),
                    e = this.clone().utc(c),
                    !0) {
                    case "future" === a:
                        return this.getTime() > cc().getTime();
                    case "past" === a:
                        return this.getTime() < cc().getTime();
                    case "weekday" === a:
                        return 0 < U(e, "Day") && 6 > U(e, "Day");
                    case "weekend" === a:
                        return 0 === U(e, "Day") || 6 === U(e, "Day");
                    case -1 < (d = W.weekdays.indexOf(a) % 7):
                        return U(e, "Day") === d;
                    case -1 < (d = W.months.indexOf(a) % 12):
                        return U(e, "Month") === d
                    }
                return rc(this, a, null, b, c)
            }
        },
        reset: function(a) {
            var b = {}, c;
            a = a || "hours";
            "date" === a && (a = "days");
            c = Rb.some(function(b) {
                return a === b.name || a === b.name + "s"
            });
            b[a] = a.match(/^days?/) ? 1 : 0;
            return c ? this.set(b, !0) : this
        },
        clone: function() {
            var a = new r(this.getTime());
            a.utc(!!this._utc);
            return a
        }
    });
    H(r, !0, !0, {
        iso: function() {
            return this.toISOString()
        },
        getWeekday: r.prototype.getDay,
        getUTCWeekday: r.prototype.getUTCDay
    });
    function uc(a, b) {
        function c() {
            return R(this * b)
        }
        function d() {
            return tc(arguments)[a.j](this)
        }
        function e() {
            return tc(arguments)[a.j](-this)
        }
        var g = a.name
          , f = {};
        f[g] = c;
        f[g + "s"] = c;
        f[g + "Before"] = e;
        f[g + "sBefore"] = e;
        f[g + "Ago"] = e;
        f[g + "sAgo"] = e;
        f[g + "After"] = d;
        f[g + "sAfter"] = d;
        f[g + "FromNow"] = d;
        f[g + "sFromNow"] = d;
        t.extend(f)
    }
    H(t, !0, !0, {
        duration: function(a) {
            a = Y(a);
            return Xb(a, lc(this), "duration")
        }
    });
    W = Ib = r.addLocale("en", {
        plural: !0,
        timeMarker: "at",
        ampm: "am,pm",
        months: "January,February,March,April,May,June,July,August,September,October,November,December",
        weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",
        units: "millisecond:|s,second:|s,minute:|s,hour:|s,day:|s,week:|s,month:|s,year:|s",
        numbers: "one,two,three,four,five,six,seven,eight,nine,ten",
        articles: "a,an,the",
        tokens: "the,st|nd|rd|th,of",
        "short": "{Month} {d}, {yyyy}",
        "long": "{Month} {d}, {yyyy} {h}:{mm}{tt}",
        full: "{Weekday} {Month} {d}, {yyyy} {h}:{mm}:{ss}{tt}",
        past: "{num} {unit} {sign}",
        future: "{num} {unit} {sign}",
        duration: "{num} {unit}",
        modifiers: [{
            name: "sign",
            src: "ago|before",
            value: -1
        }, {
            name: "sign",
            src: "from now|after|from|in|later",
            value: 1
        }, {
            name: "edge",
            src: "last day",
            value: -2
        }, {
            name: "edge",
            src: "end",
            value: -1
        }, {
            name: "edge",
            src: "first day|beginning",
            value: 1
        }, {
            name: "shift",
            src: "last",
            value: -1
        }, {
            name: "shift",
            src: "the|this",
            value: 0
        }, {
            name: "shift",
            src: "next",
            value: 1
        }],
        dateParse: ["{month} {year}", "{shift} {unit=5-7}", "{0?} {date}{1}", "{0?} {edge} of {shift?} {unit=4-7?}{month?}{year?}"],
        timeParse: "{num} {unit} {sign};{sign} {num} {unit};{0} {num}{1} {day} of {month} {year?};{weekday?} {month} {date}{1?} {year?};{date} {month} {year};{date} {month};{shift} {weekday};{shift} week {weekday};{weekday} {2?} {shift} week;{num} {unit=4-5} {sign} {day};{0?} {date}{1} of {month};{0?}{month?} {date?}{1?} of {shift} {unit=6-7}".split(";")
    });
    Ob = Rb.concat().reverse();
    Nb = Rb.concat();
    Nb.splice(2, 1);
    K(r, !0, !0, Rb, function(a, b, c) {
        function d(a) {
            a /= f;
            var c = a % 1
              , d = b.error || 0.999;
            c && P(c % 1) > d && (a = R(a));
            return 0 > a ? Aa(a) : Q(a)
        }
        var e = b.name, g = Yb(e), f = b.b(), h, m;
        b.j = "add" + g + "s";
        h = function(a, b) {
            return d(this.getTime() - r.create(a, b).getTime())
        }
        ;
        m = function(a, b) {
            return d(r.create(a, b).getTime() - this.getTime())
        }
        ;
        a[e + "sAgo"] = m;
        a[e + "sUntil"] = m;
        a[e + "sSince"] = h;
        a[e + "sFromNow"] = h;
        a[b.j] = function(a, b) {
            var c = {};
            c[e] = a;
            return this.advance(c, b)
        }
        ;
        uc(b, f);
        3 > c && ["Last", "This", "Next"].forEach(function(b) {
            a["is" + b + g] = function() {
                return rc(this, b + " " + e, "en")
            }
        });
        4 > c && (a["beginningOf" + g] = function() {
            var a = {};
            switch (e) {
            case "year":
                a.year = U(this, "FullYear");
                break;
            case "month":
                a.month = U(this, "Month");
                break;
            case "day":
                a.day = U(this, "Date");
                break;
            case "week":
                a.weekday = 0
            }
            return this.set(a, !0)
        }
        ,
        a["endOf" + g] = function() {
            var a = {
                hours: 23,
                minutes: 59,
                seconds: 59,
                milliseconds: 999
            };
            switch (e) {
            case "year":
                a.month = 11;
                a.day = 31;
                break;
            case "month":
                a.day = this.daysInMonth();
                break;
            case "week":
                a.weekday = 6
            }
            return this.set(a, !0)
        }
        )
    });
    W.addFormat("([+-])?(\\d{4,4})[-.]?{full_month}[-.]?(\\d{1,2})?", !0, ["year_sign", "year", "month", "date"], !1, !0);
    W.addFormat("(\\d{1,2})[-.\\/]{full_month}(?:[-.\\/](\\d{2,4}))?", !0, ["date", "month", "year"], !0);
    W.addFormat("{full_month}[-.](\\d{4,4})", !1, ["month", "year"]);
    W.addFormat("\\/Date\\((\\d+(?:[+-]\\d{4,4})?)\\)\\/", !1, ["timestamp"]);
    W.addFormat(Vb(W), !1, Jb);
    Pb = W.g.slice(0, 7).reverse();
    W.g = W.g.slice(7).concat(Pb);
    oc("f", function(a) {
        return U(a, "Milliseconds")
    }, !0);
    oc("s", function(a) {
        return U(a, "Seconds")
    });
    oc("m", function(a) {
        return U(a, "Minutes")
    });
    oc("h", function(a) {
        return U(a, "Hours") % 12 || 12
    });
    oc("H", function(a) {
        return U(a, "Hours")
    });
    oc("d", function(a) {
        return U(a, "Date")
    });
    oc("M", function(a) {
        return U(a, "Month") + 1
    });
    (function() {
        function a(a, c) {
            var d = U(a, "Hours");
            return Y(c).ampm[Q(d / 12)] || ""
        }
        Z("t", a, 1);
        Z("tt", a);
        Z("T", a, 1, 1);
        Z("TT", a, null, 2)
    }
    )();
    (function() {
        function a(a, c) {
            var d = U(a, "Day");
            return Y(c).weekdays[d]
        }
        Z("dow", a, 3);
        Z("Dow", a, 3, 1);
        Z("weekday", a);
        Z("Weekday", a, null, 1)
    }
    )();
    nc("mon", 0, 3);
    nc("month", 0);
    nc("month2", 1);
    nc("month3", 2);
    X.ms = X.f;
    X.milliseconds = X.f;
    X.seconds = X.s;
    X.minutes = X.m;
    X.hours = X.h;
    X["24hr"] = X.H;
    X["12hr"] = X.h;
    X.date = X.d;
    X.day = X.d;
    X.year = X.yyyy;
    K(r, !0, !0, "short,long,full", function(a, b) {
        a[b] = function(a) {
            return qc(this, b, !1, a)
        }
    });
    "\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07".split("").forEach(function(a, b) {
        9 < b && (b = za(10, b - 9));
        Lb[a] = b
    });
    xa(Lb, Ka);
    Mb = q("([\u671f\u9031\u5468])?([\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07" + Ja + "]+)(?!\u6628)", "g");
    (function() {
        var a = W.weekdays.slice(0, 7)
          , b = W.months.slice(0, 12);
        K(r, !0, !0, "today yesterday tomorrow weekday weekend future past".split(" ").concat(a).concat(b), function(a, b) {
            a["is" + Yb(b)] = function(a) {
                return this.is(b, 0, a)
            }
        })
    }
    )();
    r.utc || (r.utc = {
        create: function() {
            return tc(arguments, 0, !0)
        },
        past: function() {
            return tc(arguments, -1, !0)
        },
        future: function() {
            return tc(arguments, 1, !0)
        }
    });
    H(r, !1, !0, {
        RFC1123: "{Dow}, {dd} {Mon} {yyyy} {HH}:{mm}:{ss} {tz}",
        RFC1036: "{Weekday}, {dd}-{Mon}-{yy} {HH}:{mm}:{ss} {tz}",
        ISO8601_DATE: "{yyyy}-{MM}-{dd}",
        ISO8601_DATETIME: "{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{fff}{isotz}"
    });
    "use strict";
    function Range(a, b) {
        this.start = vc(a);
        this.end = vc(b)
    }
    function vc(a) {
        return C(a) ? new r(a.getTime()) : null == a ? a : C(a) ? a.getTime() : a.valueOf()
    }
    function wc(a) {
        a = null == a ? a : C(a) ? a.getTime() : a.valueOf();
        return !!a || 0 === a
    }
    function xc(a, b) {
        var c, d, e, g;
        if (x(b))
            return new r(a.getTime() + b);
        c = b[0];
        d = b[1];
        e = U(a, d);
        g = new r(a.getTime());
        Sa(g, d, e + c);
        return g
    }
    function yc(a, b) {
        return s.fromCharCode(a.charCodeAt(0) + b)
    }
    function zc(a, b) {
        return a + b
    }
    Range.prototype.toString = function() {
        return this.isValid() ? this.start + ".." + this.end : "Invalid Range"
    }
    ;
    H(Range, !0, !0, {
        isValid: function() {
            return wc(this.start) && wc(this.end) && typeof this.start === typeof this.end
        },
        span: function() {
            return this.isValid() ? P((y(this.end) ? this.end.charCodeAt(0) : this.end) - (y(this.start) ? this.start.charCodeAt(0) : this.start)) + 1 : NaN
        },
        contains: function(a) {
            return null == a ? !1 : a.start && a.end ? a.start >= this.start && a.start <= this.end && a.end >= this.start && a.end <= this.end : a >= this.start && a <= this.end
        },
        every: function(a, b) {
            var c, d = this.start, e = this.end, g = e < d, f = d, h = 0, m = [];
            F(a) && (b = a,
            a = null);
            a = a || 1;
            x(d) ? c = zc : y(d) ? c = yc : C(d) && (c = a,
            x(c) ? a = c : (d = c.toLowerCase().match(/^(\d+)?\s?(\w+?)s?$/i),
            c = parseInt(d[1]) || 1,
            d = d[2].slice(0, 1).toUpperCase() + d[2].slice(1),
            d.match(/hour|minute|second/i) ? d += "s" : "Year" === d ? d = "FullYear" : "Day" === d && (d = "Date"),
            a = [c, d]),
            c = xc);
            for (g && 0 < a && (a *= -1); g ? f >= e : f <= e; )
                m.push(f),
                b && b(f, h),
                f = c(f, a),
                h++;
            return m
        },
        union: function(a) {
            return new Range(this.start < a.start ? this.start : a.start,this.end > a.end ? this.end : a.end)
        },
        intersect: function(a) {
            return a.start > this.end || a.end < this.start ? new Range(NaN,NaN) : new Range(this.start > a.start ? this.start : a.start,this.end < a.end ? this.end : a.end)
        },
        clone: function() {
            return new Range(this.start,this.end)
        },
        clamp: function(a) {
            var b = this.start
              , c = this.end
              , d = c < b ? c : b
              , b = b > c ? b : c;
            return vc(a < d ? d : a > b ? b : a)
        }
    });
    [t, s, r].forEach(function(a) {
        H(a, !1, !0, {
            range: function(b, c) {
                a.create && (b = a.create(b),
                c = a.create(c));
                return new Range(b,c)
            }
        })
    });
    H(t, !0, !0, {
        upto: function(a, b, c) {
            return t.range(this, a).every(c, b)
        },
        clamp: function(a, b) {
            return (new Range(a,b)).clamp(this)
        },
        cap: function(a) {
            return this.clamp(void 0, a)
        }
    });
    H(t, !0, !0, {
        downto: t.prototype.upto
    });
    H(p, !1, function(a) {
        return a instanceof Range
    }, {
        create: function(a) {
            return a.every()
        }
    });
    "use strict";
    function Ac(a, b, c, d, e) {
        Infinity !== b && (a.timers || (a.timers = []),
        x(b) || (b = 1),
        a.n = !1,
        a.timers.push(setTimeout(function() {
            a.n || c.apply(d, e || [])
        }, b)))
    }
    H(Function, !0, !0, {
        lazy: function(a, b, c) {
            function d() {
                g.length < c - (f && b ? 1 : 0) && g.push([this, arguments]);
                f || (f = !0,
                b ? h() : Ac(d, m, h));
                return z
            }
            var e = this, g = [], f = !1, h, m, n, z;
            a = a || 1;
            c = c || Infinity;
            m = Aa(a);
            n = R(m / a) || 1;
            h = function() {
                var a = g.length, b;
                if (0 != a) {
                    for (b = S(a - n, 0); a > b; )
                        z = Function.prototype.apply.apply(e, g.shift()),
                        a--;
                    Ac(d, m, function() {
                        f = !1;
                        h()
                    })
                }
            }
            ;
            return d
        },
        throttle: function(a) {
            return this.lazy(a, !0, 1)
        },
        debounce: function(a) {
            function b() {
                b.cancel();
                Ac(b, a, c, this, arguments)
            }
            var c = this;
            return b
        },
        delay: function(a) {
            var b = L(arguments, null, 1);
            Ac(this, a, this, this, b);
            return this
        },
        every: function(a) {
            function b() {
                c.apply(c, d);
                Ac(c, a, b)
            }
            var c = this
              , d = arguments
              , d = 1 < d.length ? L(d, null, 1) : [];
            Ac(c, a, b);
            return c
        },
        cancel: function() {
            var a = this.timers, b;
            if (A(a))
                for (; b = a.shift(); )
                    clearTimeout(b);
            this.n = !0;
            return this
        },
        after: function(a) {
            var b = this
              , c = 0
              , d = [];
            if (!x(a))
                a = 1;
            else if (0 === a)
                return b.call(),
                b;
            return function() {
                var e;
                d.push(L(arguments));
                c++;
                if (c == a)
                    return e = b.call(this, d),
                    c = 0,
                    d = [],
                    e
            }
        },
        once: function() {
            return this.throttle(Infinity, !0)
        },
        fill: function() {
            var a = this
              , b = L(arguments);
            return function() {
                var c = L(arguments);
                b.forEach(function(a, b) {
                    (null != a || b >= c.length) && c.splice(b, 0, a)
                });
                return a.apply(this, c)
            }
        }
    });
    "use strict";
    function Bc(a, b, c, d, e, g) {
        var f = a.toFixed(20)
          , h = f.search(/\./)
          , f = f.search(/[1-9]/)
          , h = h - f;
        0 < h && (h -= 1);
        e = S(Ca(Q(h / 3), !1 === e ? c.length : e), -d);
        d = c.charAt(e + d - 1);
        -9 > h && (e = -3,
        b = P(h) - 9,
        d = c.slice(0, 1));
        c = g ? za(2, 10 * e) : za(10, 3 * e);
        return Da(a / c, b || 0).format() + d.trim()
    }
    H(t, !1, !0, {
        random: function(a, b) {
            var c, d;
            1 == arguments.length && (b = a,
            a = 0);
            c = Ca(a || 0, N(b) ? 1 : b);
            d = S(a || 0, N(b) ? 1 : b) + 1;
            return Q(u.random() * (d - c) + c)
        }
    });
    H(t, !0, !0, {
        log: function(a) {
            return u.log(this) / (a ? u.log(a) : 1)
        },
        abbr: function(a) {
            return Bc(this, a, "kmbt", 0, 4)
        },
        metric: function(a, b) {
            return Bc(this, a, "n\u03bcm kMGTPE", 4, N(b) ? 1 : b)
        },
        bytes: function(a, b) {
            return Bc(this, a, "kMGTPE", 0, N(b) ? 4 : b, !0) + "B"
        },
        isInteger: function() {
            return 0 == this % 1
        },
        isOdd: function() {
            return !isNaN(this) && !this.isMultipleOf(2)
        },
        isEven: function() {
            return this.isMultipleOf(2)
        },
        isMultipleOf: function(a) {
            return 0 === this % a
        },
        format: function(a, b, c) {
            var d, e, g, f = "";
            N(b) && (b = ",");
            N(c) && (c = ".");
            d = (x(a) ? Da(this, a || 0).toFixed(S(a, 0)) : this.toString()).replace(/^-/, "").split(".");
            e = d[0];
            g = d[1];
            for (d = e.length; 0 < d; d -= 3)
                d < e.length && (f = b + f),
                f = e.slice(S(0, d - 3), d) + f;
            g && (f += c + Na("0", (a || 0) - g.length) + g);
            return (0 > this ? "-" : "") + f
        },
        hex: function(a) {
            return this.pad(a || 1, !1, 16)
        },
        times: function(a) {
            if (a)
                for (var b = 0; b < this; b++)
                    a.call(this, b);
            return this.toNumber()
        },
        chr: function() {
            return s.fromCharCode(this)
        },
        pad: function(a, b, c) {
            return T(this, a, b, c)
        },
        ordinalize: function() {
            var a = P(this)
              , a = parseInt(a.toString().slice(-2));
            return this + Pa(a)
        },
        toNumber: function() {
            return parseFloat(this, 10)
        }
    });
    (function() {
        function a(a) {
            return function(c) {
                return c ? Da(this, c, a) : a(this)
            }
        }
        H(t, !0, !0, {
            ceil: a(Aa),
            round: a(R),
            floor: a(Q)
        });
        K(t, !0, !0, "abs,pow,sin,asin,cos,acos,tan,atan,exp,pow,sqrt", function(a, c) {
            a[c] = function(a, b) {
                return u[c](this, a, b)
            }
        })
    }
    )();
    "use strict";
    var Cc = ["isObject", "isNaN"]
      , Dc = "keys values select reject each merge clone equal watch tap has toQueryString".split(" ");
    function Ec(a, b, c, d) {
        var e, g, f;
        (g = b.match(/^(.+?)(\[.*\])$/)) ? (f = g[1],
        b = g[2].replace(/^\[|\]$/g, "").split("]["),
        b.forEach(function(b) {
            e = !b || b.match(/^\d+$/);
            !f && A(a) && (f = a.length);
            J(a, f) || (a[f] = e ? [] : {});
            a = a[f];
            f = b
        }),
        !f && e && (f = a.length.toString()),
        Ec(a, f, c, d)) : a[b] = d && "true" === c ? !0 : d && "false" === c ? !1 : c
    }
    function Fc(a, b) {
        var c;
        return A(b) || G(b) && b.toString === v ? (c = [],
        I(b, function(b, e) {
            a && (b = a + "[" + b + "]");
            c.push(Fc(b, e))
        }),
        c.join("&")) : a ? Gc(a) + "=" + (C(b) ? b.getTime() : Gc(b)) : ""
    }
    function Gc(a) {
        return a || !1 === a || 0 === a ? encodeURIComponent(a).replace(/%20/g, "+") : ""
    }
    function Hc(a, b, c) {
        var d, e = a instanceof O ? new O : {};
        I(a, function(a, f) {
            d = !1;
            sa(b, function(b) {
                (D(b) ? b.test(a) : G(b) ? J(b, a) : a === s(b)) && (d = !0)
            }, 1);
            d === c && (e[a] = f)
        });
        return e
    }
    H(l, !1, !0, {
        watch: function(a, b, c) {
            if (ea) {
                var d = a[b];
                l.defineProperty(a, b, {
                    enumerable: !0,
                    configurable: !0,
                    get: function() {
                        return d
                    },
                    set: function(e) {
                        d = c.call(a, b, d, e)
                    }
                })
            }
        }
    });
    H(l, !1, function() {
        return 1 < arguments.length
    }, {
        keys: function(a, b) {
            var c = l.keys(a);
            c.forEach(function(c) {
                b.call(a, c, a[c])
            });
            return c
        }
    });
    H(l, !1, !0, {
        isObject: function(a) {
            return va(a)
        },
        isNaN: function(a) {
            return x(a) && a.valueOf() !== a.valueOf()
        },
        equal: function(a, b) {
            return Ua(a, b)
        },
        extended: function(a) {
            return new O(a)
        },
        merge: function(a, b, c, d) {
            var e, g, f;
            if (a && "string" !== typeof b)
                for (e in b)
                    if (J(b, e) && a) {
                        g = b[e];
                        f = c && G(g);
                        if (M(a[e])) {
                            if (!1 === d && !f)
                                continue;
                            F(d) && (g = d.call(b, e, a[e], b[e]))
                        }
                        if (f)
                            if (C(g))
                                g = new r(g.getTime());
                            else if (D(g))
                                g = new q(g.source,Qa(g));
                            else {
                                a[e] || (a[e] = p.isArray(g) ? [] : {});
                                l.merge(a[e], b[e], c, d);
                                continue
                            }
                        a[e] = g
                    }
            return a
        },
        values: function(a, b) {
            var c = [];
            I(a, function(d, e) {
                c.push(e);
                b && b.call(a, e)
            });
            return c
        },
        clone: function(a, b) {
            var c;
            if (!G(a))
                return a;
            c = v.call(a);
            if (C(a, c) && a.clone)
                return a.clone();
            if (C(a, c) || D(a, c))
                return new a.constructor(a);
            if (a instanceof O)
                c = new O;
            else if (A(a, c))
                c = [];
            else if (va(a, c))
                c = {};
            else
                throw new TypeError("Clone must be a basic data type.");
            return l.merge(c, a, b)
        },
        fromQueryString: function(a, b) {
            var c = l.extended();
            a = a && a.toString ? a.toString() : "";
            a.replace(/^.*?\?/, "").split("&").forEach(function(a) {
                a = a.split("=");
                2 === a.length && Ec(c, a[0], decodeURIComponent(a[1]), b)
            });
            return c
        },
        toQueryString: function(a, b) {
            return Fc(b, a)
        },
        tap: function(a, b) {
            var c = b;
            F(b) || (c = function() {
                if (b)
                    a[b]()
            }
            );
            c.call(a, a);
            return a
        },
        has: function(a, b) {
            return J(a, b)
        },
        select: function(a) {
            return Hc(a, arguments, !0)
        },
        reject: function(a) {
            return Hc(a, arguments, !1)
        }
    });
    K(l, !1, !0, w, function(a, b) {
        var c = "is" + b;
        Cc.push(c);
        a[c] = ia[b]
    });
    H(l, !1, function() {
        return 0 === arguments.length
    }, {
        extend: function() {
            var a = Cc.concat(Dc);
            "undefined" !== typeof Hb && (a = a.concat(Hb));
            Ya(a, l)
        }
    });
    Ya(Dc, O);
    "use strict";
    H(q, !1, !0, {
        escape: function(a) {
            return Ra(a)
        }
    });
    H(q, !0, !0, {
        getFlags: function() {
            return Qa(this)
        },
        setFlags: function(a) {
            return q(this.source, a)
        },
        addFlag: function(a) {
            return this.setFlags(Qa(this, a))
        },
        removeFlag: function(a) {
            return this.setFlags(Qa(this).replace(a, ""))
        }
    });
    "use strict";
    function Ic(a) {
        a = +a;
        if (0 > a || Infinity === a)
            throw new RangeError("Invalid number");
        return a
    }
    function Jc(a, b) {
        return Na(M(b) ? b : " ", a)
    }
    function Kc(a, b, c, d, e) {
        var g;
        if (a.length <= b)
            return a.toString();
        d = N(d) ? "..." : d;
        switch (c) {
        case "left":
            return a = e ? Lc(a, b, !0) : a.slice(a.length - b),
            d + a;
        case "middle":
            return c = Aa(b / 2),
            g = Q(b / 2),
            b = e ? Lc(a, c) : a.slice(0, c),
            a = e ? Lc(a, g, !0) : a.slice(a.length - g),
            b + d + a;
        default:
            return b = e ? Lc(a, b) : a.slice(0, b),
            b + d
        }
    }
    function Lc(a, b, c) {
        if (c)
            return Lc(a.reverse(), b).reverse();
        c = q("(?=[" + Ma() + "])");
        var d = 0;
        return a.split(c).filter(function(a) {
            d += a.length;
            return d <= b
        }).join("")
    }
    function Mc(a, b, c) {
        y(b) && (b = a.indexOf(b),
        -1 === b && (b = c ? a.length : 0));
        return b
    }
    var Nc, Oc;
    H(s, !0, !1, {
        repeat: function(a) {
            a = Ic(a);
            return Na(this, a)
        }
    });
    H(s, !0, function(a) {
        return D(a) || 2 < arguments.length
    }, {
        startsWith: function(a) {
            var b = arguments
              , c = b[1]
              , b = b[2]
              , d = this;
            c && (d = d.slice(c));
            N(b) && (b = !0);
            c = D(a) ? a.source.replace("^", "") : Ra(a);
            return q("^" + c, b ? "" : "i").test(d)
        },
        endsWith: function(a) {
            var b = arguments
              , c = b[1]
              , b = b[2]
              , d = this;
            M(c) && (d = d.slice(0, c));
            N(b) && (b = !0);
            c = D(a) ? a.source.replace("$", "") : Ra(a);
            return q(c + "$", b ? "" : "i").test(d)
        }
    });
    H(s, !0, !0, {
        escapeRegExp: function() {
            return Ra(this)
        },
        escapeURL: function(a) {
            return a ? encodeURIComponent(this) : encodeURI(this)
        },
        unescapeURL: function(a) {
            return a ? decodeURI(this) : decodeURIComponent(this)
        },
        escapeHTML: function() {
            return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2f;")
        },
        unescapeHTML: function() {
            return this.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#x2f;/g, "/").replace(/&amp;/g, "&")
        },
        encodeBase64: function() {
            return Nc(unescape(encodeURIComponent(this)))
        },
        decodeBase64: function() {
            return decodeURIComponent(escape(Oc(this)))
        },
        each: function(a, b) {
            var c, d, e;
            F(a) ? (b = a,
            a = /[\s\S]/g) : a ? y(a) ? a = q(Ra(a), "gi") : D(a) && (a = q(a.source, Qa(a, "g"))) : a = /[\s\S]/g;
            c = this.match(a) || [];
            if (b)
                for (d = 0,
                e = c.length; d < e; d++)
                    c[d] = b.call(this, c[d], d, c) || c[d];
            return c
        },
        shift: function(a) {
            var b = "";
            a = a || 0;
            this.codes(function(c) {
                b += s.fromCharCode(c + a)
            });
            return b
        },
        codes: function(a) {
            var b = [], c, d;
            c = 0;
            for (d = this.length; c < d; c++) {
                var e = this.charCodeAt(c);
                b.push(e);
                a && a.call(this, e, c)
            }
            return b
        },
        chars: function(a) {
            return this.each(a)
        },
        words: function(a) {
            return this.trim().each(/\S+/g, a)
        },
        lines: function(a) {
            return this.trim().each(/^.*$/gm, a)
        },
        paragraphs: function(a) {
            var b = this.trim().split(/[\r\n]{2,}/);
            return b = b.map(function(b) {
                if (a)
                    var d = a.call(b);
                return d ? d : b
            })
        },
        isBlank: function() {
            return 0 === this.trim().length
        },
        has: function(a) {
            return -1 !== this.search(D(a) ? a : Ra(a))
        },
        add: function(a, b) {
            b = N(b) ? this.length : b;
            return this.slice(0, b) + a + this.slice(b)
        },
        remove: function(a) {
            return this.replace(a, "")
        },
        reverse: function() {
            return this.split("").reverse().join("")
        },
        compact: function() {
            return this.trim().replace(/([\r\n\s\u3000])+/g, function(a, b) {
                return "\u3000" === b ? b : " "
            })
        },
        at: function() {
            return Wa(this, arguments, !0)
        },
        from: function(a) {
            return this.slice(Mc(this, a, !0))
        },
        to: function(a) {
            N(a) && (a = this.length);
            return this.slice(0, Mc(this, a))
        },
        dasherize: function() {
            return this.underscore().replace(/_/g, "-")
        },
        underscore: function() {
            return this.replace(/[-\s]+/g, "_").replace(s.Inflector && s.Inflector.acronymRegExp, function(a, b) {
                return (0 < b ? "_" : "") + a.toLowerCase()
            }).replace(/([A-Z\d]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").toLowerCase()
        },
        camelize: function(a) {
            return this.underscore().replace(/(^|_)([^_]+)/g, function(b, c, d, e) {
                b = (b = s.Inflector) && b.acronyms[d];
                b = y(b) ? b : void 0;
                e = !1 !== a || 0 < e;
                return b ? e ? b : b.toLowerCase() : e ? d.capitalize() : d
            })
        },
        spacify: function() {
            return this.underscore().replace(/_/g, " ")
        },
        stripTags: function() {
            var a = this;
            sa(0 < arguments.length ? arguments : [""], function(b) {
                a = a.replace(q("</?" + Ra(b) + "[^<>]*>", "gi"), "")
            });
            return a
        },
        removeTags: function() {
            var a = this;
            sa(0 < arguments.length ? arguments : ["\\S+"], function(b) {
                b = q("<(" + b + ")[^<>]*(?:\\/>|>.*?<\\/\\1>)", "gi");
                a = a.replace(b, "")
            });
            return a
        },
        truncate: function(a, b, c) {
            return Kc(this, a, b, c)
        },
        truncateOnWord: function(a, b, c) {
            return Kc(this, a, b, c, !0)
        },
        pad: function(a, b) {
            var c, d;
            a = Ic(a);
            c = S(0, a - this.length) / 2;
            d = Q(c);
            c = Aa(c);
            return Jc(d, b) + this + Jc(c, b)
        },
        padLeft: function(a, b) {
            a = Ic(a);
            return Jc(S(0, a - this.length), b) + this
        },
        padRight: function(a, b) {
            a = Ic(a);
            return this + Jc(S(0, a - this.length), b)
        },
        first: function(a) {
            N(a) && (a = 1);
            return this.substr(0, a)
        },
        last: function(a) {
            N(a) && (a = 1);
            return this.substr(0 > this.length - a ? 0 : this.length - a)
        },
        toNumber: function(a) {
            return Oa(this, a)
        },
        capitalize: function(a) {
            var b;
            return this.toLowerCase().replace(a ? /[^']/g : /^\S/, function(a) {
                var d = a.toUpperCase(), e;
                e = b ? a : d;
                b = d !== a;
                return e
            })
        },
        assign: function() {
            var a = {};
            sa(arguments, function(b, c) {
                G(b) ? xa(a, b) : a[c + 1] = b
            });
            return this.replace(/\{([^{]+?)\}/g, function(b, c) {
                return J(a, c) ? a[c] : b
            })
        }
    });
    H(s, !0, !0, {
        insert: s.prototype.add
    });
    (function(a) {
        if (ba.btoa)
            Nc = ba.btoa,
            Oc = ba.atob;
        else {
            var b = /[^A-Za-z0-9\+\/\=]/g;
            Nc = function(b) {
                var d = "", e, g, f, h, m, n, z = 0;
                do
                    e = b.charCodeAt(z++),
                    g = b.charCodeAt(z++),
                    f = b.charCodeAt(z++),
                    h = e >> 2,
                    e = (e & 3) << 4 | g >> 4,
                    m = (g & 15) << 2 | f >> 6,
                    n = f & 63,
                    isNaN(g) ? m = n = 64 : isNaN(f) && (n = 64),
                    d = d + a.charAt(h) + a.charAt(e) + a.charAt(m) + a.charAt(n);
                while (z < b.length);return d
            }
            ;
            Oc = function(c) {
                var d = "", e, g, f, h, m, n = 0;
                if (c.match(b))
                    throw Error("String contains invalid base64 characters");
                c = c.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                do
                    e = a.indexOf(c.charAt(n++)),
                    g = a.indexOf(c.charAt(n++)),
                    h = a.indexOf(c.charAt(n++)),
                    m = a.indexOf(c.charAt(n++)),
                    e = e << 2 | g >> 4,
                    g = (g & 15) << 4 | h >> 2,
                    f = (h & 3) << 6 | m,
                    d += s.fromCharCode(e),
                    64 != h && (d += s.fromCharCode(g)),
                    64 != m && (d += s.fromCharCode(f));
                while (n < c.length);return d
            }
        }
    }
    )("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
}
)();
Date.addLocale("zh-CN", {
    variant: !0,
    monthSuffix: "月",
    weekdays: "星期日|周日,星期一|周一,星期二|周二,星期三|周三,星期四|周四,星期五|周五,星期六|周六",
    units: "毫秒,秒钟,分钟,小时,天,个星期|周,个月,年",
    tokens: "日|号",
    "short": "{yyyy}年{M}月{d}日",
    "long": "{yyyy}年{M}月{d}日 {tt}{h}:{mm}",
    full: "{yyyy}年{M}月{d}日 {weekday} {tt}{h}:{mm}:{ss}",
    past: "{num}{unit}{sign}",
    future: "{num}{unit}{sign}",
    duration: "{num}{unit}",
    timeSuffixes: "点|时,分钟?,秒",
    ampm: "上午,下午",
    modifiers: [{
        name: "day",
        src: "前天",
        value: -2
    }, {
        name: "day",
        src: "昨天",
        value: -1
    }, {
        name: "day",
        src: "今天",
        value: 0
    }, {
        name: "day",
        src: "明天",
        value: 1
    }, {
        name: "day",
        src: "后天",
        value: 2
    }, {
        name: "sign",
        src: "前",
        value: -1
    }, {
        name: "sign",
        src: "后",
        value: 1
    }, {
        name: "shift",
        src: "上|去",
        value: -1
    }, {
        name: "shift",
        src: "这",
        value: 0
    }, {
        name: "shift",
        src: "下|明",
        value: 1
    }],
    dateParse: ["{num}{unit}{sign}", "{shift}{unit=5-7}"],
    timeParse: ["{shift}{weekday}", "{year}年{month?}月?{date?}{0?}", "{month}月{date?}{0?}", "{date}[日号]"]
});
Date.addLocale("zh-TW", {
    variant: !0,
    monthSuffix: "月",
    weekdays: "星期日|周日,星期壹|周壹,星期二|周二,星期三|周三,星期四|周四,星期五|周五,星期六|周六",
    units: "毫秒,秒鐘,分鐘,小時,天,個星期|周,個月,年",
    tokens: "日|號",
    "short": "{yyyy}年{M}月{d}日",
    "long": "{yyyy}年{M}月{d}日 {tt}{h}:{mm}",
    full: "{yyyy}年{M}月{d}日 {weekday} {tt}{h}:{mm}:{ss}",
    past: "{num}{unit}{sign}",
    future: "{num}{unit}{sign}",
    duration: "{num}{unit}",
    timeSuffixes: "點|時,分鐘?,秒",
    ampm: "上午,下午",
    modifiers: [{
        name: "day",
        src: "前天",
        value: -2
    }, {
        name: "day",
        src: "昨天",
        value: -1
    }, {
        name: "day",
        src: "今天",
        value: 0
    }, {
        name: "day",
        src: "明天",
        value: 1
    }, {
        name: "day",
        src: "後天",
        value: 2
    }, {
        name: "sign",
        src: "前",
        value: -1
    }, {
        name: "sign",
        src: "後",
        value: 1
    }, {
        name: "shift",
        src: "上|去",
        value: -1
    }, {
        name: "shift",
        src: "這",
        value: 0
    }, {
        name: "shift",
        src: "下|明",
        value: 1
    }],
    dateParse: ["{num}{unit}{sign}", "{shift}{unit=5-7}"],
    timeParse: ["{shift}{weekday}", "{year}年{month?}月?{date?}{0?}", "{month}月{date?}{0?}", "{date}[日號]"]
});
/* Underscore.js 1.5.1
* http://underscorejs.org
* (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
* Underscore may be freely distributed under the MIT license.
*/
!function() {
    var n = this
      , t = n._
      , r = {}
      , e = Array.prototype
      , u = Object.prototype
      , i = Function.prototype
      , a = e.push
      , o = e.slice
      , c = e.concat
      , l = u.toString
      , f = u.hasOwnProperty
      , s = e.forEach
      , p = e.map
      , v = e.reduce
      , h = e.reduceRight
      , d = e.filter
      , g = e.every
      , m = e.some
      , y = e.indexOf
      , b = e.lastIndexOf
      , x = Array.isArray
      , _ = Object.keys
      , w = i.bind
      , j = function(n) {
        return n instanceof j ? n : this instanceof j ? (this._wrapped = n,
        void 0) : new j(n)
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = j),
    exports._ = j) : n._ = j,
    j.VERSION = "1.5.1";
    var A = j.each = j.forEach = function(n, t, e) {
        if (null != n)
            if (s && n.forEach === s)
                n.forEach(t, e);
            else if (n.length === +n.length) {
                for (var u = 0, i = n.length; i > u; u++)
                    if (t.call(e, n[u], u, n) === r)
                        return
            } else
                for (var a in n)
                    if (j.has(n, a) && t.call(e, n[a], a, n) === r)
                        return
    }
    ;
    j.map = j.collect = function(n, t, r) {
        var e = [];
        return null == n ? e : p && n.map === p ? n.map(t, r) : (A(n, function(n, u, i) {
            e.push(t.call(r, n, u, i))
        }),
        e)
    }
    ;
    var E = "Reduce of empty array with no initial value";
    j.reduce = j.foldl = j.inject = function(n, t, r, e) {
        var u = arguments.length > 2;
        if (null == n && (n = []),
        v && n.reduce === v)
            return e && (t = j.bind(t, e)),
            u ? n.reduce(t, r) : n.reduce(t);
        if (A(n, function(n, i, a) {
            u ? r = t.call(e, r, n, i, a) : (r = n,
            u = !0)
        }),
        !u)
            throw new TypeError(E);
        return r
    }
    ,
    j.reduceRight = j.foldr = function(n, t, r, e) {
        var u = arguments.length > 2;
        if (null == n && (n = []),
        h && n.reduceRight === h)
            return e && (t = j.bind(t, e)),
            u ? n.reduceRight(t, r) : n.reduceRight(t);
        var i = n.length;
        if (i !== +i) {
            var a = j.keys(n);
            i = a.length
        }
        if (A(n, function(o, c, l) {
            c = a ? a[--i] : --i,
            u ? r = t.call(e, r, n[c], c, l) : (r = n[c],
            u = !0)
        }),
        !u)
            throw new TypeError(E);
        return r
    }
    ,
    j.find = j.detect = function(n, t, r) {
        var e;
        return O(n, function(n, u, i) {
            return t.call(r, n, u, i) ? (e = n,
            !0) : void 0
        }),
        e
    }
    ,
    j.filter = j.select = function(n, t, r) {
        var e = [];
        return null == n ? e : d && n.filter === d ? n.filter(t, r) : (A(n, function(n, u, i) {
            t.call(r, n, u, i) && e.push(n)
        }),
        e)
    }
    ,
    j.reject = function(n, t, r) {
        return j.filter(n, function(n, e, u) {
            return !t.call(r, n, e, u)
        }, r)
    }
    ,
    j.every = j.all = function(n, t, e) {
        t || (t = j.identity);
        var u = !0;
        return null == n ? u : g && n.every === g ? n.every(t, e) : (A(n, function(n, i, a) {
            return (u = u && t.call(e, n, i, a)) ? void 0 : r
        }),
        !!u)
    }
    ;
    var O = j.some = j.any = function(n, t, e) {
        t || (t = j.identity);
        var u = !1;
        return null == n ? u : m && n.some === m ? n.some(t, e) : (A(n, function(n, i, a) {
            return u || (u = t.call(e, n, i, a)) ? r : void 0
        }),
        !!u)
    }
    ;
    j.contains = j.include = function(n, t) {
        return null == n ? !1 : y && n.indexOf === y ? n.indexOf(t) != -1 : O(n, function(n) {
            return n === t
        })
    }
    ,
    j.invoke = function(n, t) {
        var r = o.call(arguments, 2)
          , e = j.isFunction(t);
        return j.map(n, function(n) {
            return (e ? t : n[t]).apply(n, r)
        })
    }
    ,
    j.pluck = function(n, t) {
        return j.map(n, function(n) {
            return n[t]
        })
    }
    ,
    j.where = function(n, t, r) {
        return j.isEmpty(t) ? r ? void 0 : [] : j[r ? "find" : "filter"](n, function(n) {
            for (var r in t)
                if (t[r] !== n[r])
                    return !1;
            return !0
        })
    }
    ,
    j.findWhere = function(n, t) {
        return j.where(n, t, !0)
    }
    ,
    j.max = function(n, t, r) {
        if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535)
            return Math.max.apply(Math, n);
        if (!t && j.isEmpty(n))
            return -1 / 0;
        var e = {
            computed: -1 / 0,
            value: -1 / 0
        };
        return A(n, function(n, u, i) {
            var a = t ? t.call(r, n, u, i) : n;
            a > e.computed && (e = {
                value: n,
                computed: a
            })
        }),
        e.value
    }
    ,
    j.min = function(n, t, r) {
        if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535)
            return Math.min.apply(Math, n);
        if (!t && j.isEmpty(n))
            return 1 / 0;
        var e = {
            computed: 1 / 0,
            value: 1 / 0
        };
        return A(n, function(n, u, i) {
            var a = t ? t.call(r, n, u, i) : n;
            a < e.computed && (e = {
                value: n,
                computed: a
            })
        }),
        e.value
    }
    ,
    j.shuffle = function(n) {
        var t, r = 0, e = [];
        return A(n, function(n) {
            t = j.random(r++),
            e[r - 1] = e[t],
            e[t] = n
        }),
        e
    }
    ;
    var F = function(n) {
        return j.isFunction(n) ? n : function(t) {
            return t[n]
        }
    };
    j.sortBy = function(n, t, r) {
        var e = F(t);
        return j.pluck(j.map(n, function(n, t, u) {
            return {
                value: n,
                index: t,
                criteria: e.call(r, n, t, u)
            }
        }).sort(function(n, t) {
            var r = n.criteria
              , e = t.criteria;
            if (r !== e) {
                if (r > e || r === void 0)
                    return 1;
                if (e > r || e === void 0)
                    return -1
            }
            return n.index < t.index ? -1 : 1
        }), "value")
    }
    ;
    var k = function(n, t, r, e) {
        var u = {}
          , i = F(null == t ? j.identity : t);
        return A(n, function(t, a) {
            var o = i.call(r, t, a, n);
            e(u, o, t)
        }),
        u
    };
    j.groupBy = function(n, t, r) {
        return k(n, t, r, function(n, t, r) {
            (j.has(n, t) ? n[t] : n[t] = []).push(r)
        })
    }
    ,
    j.countBy = function(n, t, r) {
        return k(n, t, r, function(n, t) {
            j.has(n, t) || (n[t] = 0),
            n[t]++
        })
    }
    ,
    j.sortedIndex = function(n, t, r, e) {
        r = null == r ? j.identity : F(r);
        for (var u = r.call(e, t), i = 0, a = n.length; a > i; ) {
            var o = i + a >>> 1;
            r.call(e, n[o]) < u ? i = o + 1 : a = o
        }
        return i
    }
    ,
    j.toArray = function(n) {
        return n ? j.isArray(n) ? o.call(n) : n.length === +n.length ? j.map(n, j.identity) : j.values(n) : []
    }
    ,
    j.size = function(n) {
        return null == n ? 0 : n.length === +n.length ? n.length : j.keys(n).length
    }
    ,
    j.first = j.head = j.take = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[0] : o.call(n, 0, t)
    }
    ,
    j.initial = function(n, t, r) {
        return o.call(n, 0, n.length - (null == t || r ? 1 : t))
    }
    ,
    j.last = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[n.length - 1] : o.call(n, Math.max(n.length - t, 0))
    }
    ,
    j.rest = j.tail = j.drop = function(n, t, r) {
        return o.call(n, null == t || r ? 1 : t)
    }
    ,
    j.compact = function(n) {
        return j.filter(n, j.identity)
    }
    ;
    var R = function(n, t, r) {
        return t && j.every(n, j.isArray) ? c.apply(r, n) : (A(n, function(n) {
            j.isArray(n) || j.isArguments(n) ? t ? a.apply(r, n) : R(n, t, r) : r.push(n)
        }),
        r)
    };
    j.flatten = function(n, t) {
        return R(n, t, [])
    }
    ,
    j.without = function(n) {
        return j.difference(n, o.call(arguments, 1))
    }
    ,
    j.uniq = j.unique = function(n, t, r, e) {
        j.isFunction(t) && (e = r,
        r = t,
        t = !1);
        var u = r ? j.map(n, r, e) : n
          , i = []
          , a = [];
        return A(u, function(r, e) {
            (t ? e && a[a.length - 1] === r : j.contains(a, r)) || (a.push(r),
            i.push(n[e]))
        }),
        i
    }
    ,
    j.union = function() {
        return j.uniq(j.flatten(arguments, !0))
    }
    ,
    j.intersection = function(n) {
        var t = o.call(arguments, 1);
        return j.filter(j.uniq(n), function(n) {
            return j.every(t, function(t) {
                return j.indexOf(t, n) >= 0
            })
        })
    }
    ,
    j.difference = function(n) {
        var t = c.apply(e, o.call(arguments, 1));
        return j.filter(n, function(n) {
            return !j.contains(t, n)
        })
    }
    ,
    j.zip = function() {
        for (var n = j.max(j.pluck(arguments, "length").concat(0)), t = new Array(n), r = 0; n > r; r++)
            t[r] = j.pluck(arguments, "" + r);
        return t
    }
    ,
    j.object = function(n, t) {
        if (null == n)
            return {};
        for (var r = {}, e = 0, u = n.length; u > e; e++)
            t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r
    }
    ,
    j.indexOf = function(n, t, r) {
        if (null == n)
            return -1;
        var e = 0
          , u = n.length;
        if (r) {
            if ("number" != typeof r)
                return e = j.sortedIndex(n, t),
                n[e] === t ? e : -1;
            e = 0 > r ? Math.max(0, u + r) : r
        }
        if (y && n.indexOf === y)
            return n.indexOf(t, r);
        for (; u > e; e++)
            if (n[e] === t)
                return e;
        return -1
    }
    ,
    j.lastIndexOf = function(n, t, r) {
        if (null == n)
            return -1;
        var e = null != r;
        if (b && n.lastIndexOf === b)
            return e ? n.lastIndexOf(t, r) : n.lastIndexOf(t);
        for (var u = e ? r : n.length; u--; )
            if (n[u] === t)
                return u;
        return -1
    }
    ,
    j.range = function(n, t, r) {
        arguments.length <= 1 && (t = n || 0,
        n = 0),
        r = arguments[2] || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = 0, i = new Array(e); e > u; )
            i[u++] = n,
            n += r;
        return i
    }
    ;
    var M = function() {};
    j.bind = function(n, t) {
        var r, e;
        if (w && n.bind === w)
            return w.apply(n, o.call(arguments, 1));
        if (!j.isFunction(n))
            throw new TypeError;
        return r = o.call(arguments, 2),
        e = function() {
            if (!(this instanceof e))
                return n.apply(t, r.concat(o.call(arguments)));
            M.prototype = n.prototype;
            var u = new M;
            M.prototype = null;
            var i = n.apply(u, r.concat(o.call(arguments)));
            return Object(i) === i ? i : u
        }
    }
    ,
    j.partial = function(n) {
        var t = o.call(arguments, 1);
        return function() {
            return n.apply(this, t.concat(o.call(arguments)))
        }
    }
    ,
    j.bindAll = function(n) {
        var t = o.call(arguments, 1);
        if (0 === t.length)
            throw new Error("bindAll must be passed function names");
        return A(t, function(t) {
            n[t] = j.bind(n[t], n)
        }),
        n
    }
    ,
    j.memoize = function(n, t) {
        var r = {};
        return t || (t = j.identity),
        function() {
            var e = t.apply(this, arguments);
            return j.has(r, e) ? r[e] : r[e] = n.apply(this, arguments)
        }
    }
    ,
    j.delay = function(n, t) {
        var r = o.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, r)
        }, t)
    }
    ,
    j.defer = function(n) {
        return j.delay.apply(j, [n, 1].concat(o.call(arguments, 1)))
    }
    ,
    j.throttle = function(n, t, r) {
        var e, u, i, a = null, o = 0;
        r || (r = {});
        var c = function() {
            o = r.leading === !1 ? 0 : new Date,
            a = null,
            i = n.apply(e, u)
        };
        return function() {
            var l = new Date;
            o || r.leading !== !1 || (o = l);
            var f = t - (l - o);
            return e = this,
            u = arguments,
            0 >= f ? (clearTimeout(a),
            a = null,
            o = l,
            i = n.apply(e, u)) : a || r.trailing === !1 || (a = setTimeout(c, f)),
            i
        }
    }
    ,
    j.debounce = function(n, t, r) {
        var e, u = null;
        return function() {
            var i = this
              , a = arguments
              , o = function() {
                u = null,
                r || (e = n.apply(i, a))
            }
              , c = r && !u;
            return clearTimeout(u),
            u = setTimeout(o, t),
            c && (e = n.apply(i, a)),
            e
        }
    }
    ,
    j.once = function(n) {
        var t, r = !1;
        return function() {
            return r ? t : (r = !0,
            t = n.apply(this, arguments),
            n = null,
            t)
        }
    }
    ,
    j.wrap = function(n, t) {
        return function() {
            var r = [n];
            return a.apply(r, arguments),
            t.apply(this, r)
        }
    }
    ,
    j.compose = function() {
        var n = arguments;
        return function() {
            for (var t = arguments, r = n.length - 1; r >= 0; r--)
                t = [n[r].apply(this, t)];
            return t[0]
        }
    }
    ,
    j.after = function(n, t) {
        return function() {
            return --n < 1 ? t.apply(this, arguments) : void 0
        }
    }
    ,
    j.keys = _ || function(n) {
        if (n !== Object(n))
            throw new TypeError("Invalid object");
        var t = [];
        for (var r in n)
            j.has(n, r) && t.push(r);
        return t
    }
    ,
    j.values = function(n) {
        var t = [];
        for (var r in n)
            j.has(n, r) && t.push(n[r]);
        return t
    }
    ,
    j.pairs = function(n) {
        var t = [];
        for (var r in n)
            j.has(n, r) && t.push([r, n[r]]);
        return t
    }
    ,
    j.invert = function(n) {
        var t = {};
        for (var r in n)
            j.has(n, r) && (t[n[r]] = r);
        return t
    }
    ,
    j.functions = j.methods = function(n) {
        var t = [];
        for (var r in n)
            j.isFunction(n[r]) && t.push(r);
        return t.sort()
    }
    ,
    j.extend = function(n) {
        return A(o.call(arguments, 1), function(t) {
            if (t)
                for (var r in t)
                    n[r] = t[r]
        }),
        n
    }
    ,
    j.pick = function(n) {
        var t = {}
          , r = c.apply(e, o.call(arguments, 1));
        return A(r, function(r) {
            r in n && (t[r] = n[r])
        }),
        t
    }
    ,
    j.omit = function(n) {
        var t = {}
          , r = c.apply(e, o.call(arguments, 1));
        for (var u in n)
            j.contains(r, u) || (t[u] = n[u]);
        return t
    }
    ,
    j.defaults = function(n) {
        return A(o.call(arguments, 1), function(t) {
            if (t)
                for (var r in t)
                    n[r] === void 0 && (n[r] = t[r])
        }),
        n
    }
    ,
    j.clone = function(n) {
        return j.isObject(n) ? j.isArray(n) ? n.slice() : j.extend({}, n) : n
    }
    ,
    j.tap = function(n, t) {
        return t(n),
        n
    }
    ;
    var S = function(n, t, r, e) {
        if (n === t)
            return 0 !== n || 1 / n == 1 / t;
        if (null == n || null == t)
            return n === t;
        n instanceof j && (n = n._wrapped),
        t instanceof j && (t = t._wrapped);
        var u = l.call(n);
        if (u != l.call(t))
            return !1;
        switch (u) {
        case "[object String]":
            return n == String(t);
        case "[object Number]":
            return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t;
        case "[object Date]":
        case "[object Boolean]":
            return +n == +t;
        case "[object RegExp]":
            return n.source == t.source && n.global == t.global && n.multiline == t.multiline && n.ignoreCase == t.ignoreCase
        }
        if ("object" != typeof n || "object" != typeof t)
            return !1;
        for (var i = r.length; i--; )
            if (r[i] == n)
                return e[i] == t;
        var a = n.constructor
          , o = t.constructor;
        if (a !== o && !(j.isFunction(a) && a instanceof a && j.isFunction(o) && o instanceof o))
            return !1;
        r.push(n),
        e.push(t);
        var c = 0
          , f = !0;
        if ("[object Array]" == u) {
            if (c = n.length,
            f = c == t.length)
                for (; c-- && (f = S(n[c], t[c], r, e)); )
                    ;
        } else {
            for (var s in n)
                if (j.has(n, s) && (c++,
                !(f = j.has(t, s) && S(n[s], t[s], r, e))))
                    break;
            if (f) {
                for (s in t)
                    if (j.has(t, s) && !c--)
                        break;
                f = !c
            }
        }
        return r.pop(),
        e.pop(),
        f
    };
    j.isEqual = function(n, t) {
        return S(n, t, [], [])
    }
    ,
    j.isEmpty = function(n) {
        if (null == n)
            return !0;
        if (j.isArray(n) || j.isString(n))
            return 0 === n.length;
        for (var t in n)
            if (j.has(n, t))
                return !1;
        return !0
    }
    ,
    j.isElement = function(n) {
        return !(!n || 1 !== n.nodeType)
    }
    ,
    j.isArray = x || function(n) {
        return "[object Array]" == l.call(n)
    }
    ,
    j.isObject = function(n) {
        return n === Object(n)
    }
    ,
    A(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(n) {
        j["is" + n] = function(t) {
            return l.call(t) == "[object " + n + "]"
        }
    }),
    j.isArguments(arguments) || (j.isArguments = function(n) {
        return !(!n || !j.has(n, "callee"))
    }
    ),
    "function" != typeof /./ && (j.isFunction = function(n) {
        return "function" == typeof n
    }
    ),
    j.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n))
    }
    ,
    j.isNaN = function(n) {
        return j.isNumber(n) && n != +n
    }
    ,
    j.isBoolean = function(n) {
        return n === !0 || n === !1 || "[object Boolean]" == l.call(n)
    }
    ,
    j.isNull = function(n) {
        return null === n
    }
    ,
    j.isUndefined = function(n) {
        return n === void 0
    }
    ,
    j.has = function(n, t) {
        return f.call(n, t)
    }
    ,
    j.noConflict = function() {
        return n._ = t,
        this
    }
    ,
    j.identity = function(n) {
        return n
    }
    ,
    j.times = function(n, t, r) {
        for (var e = Array(Math.max(0, n)), u = 0; n > u; u++)
            e[u] = t.call(r, u);
        return e
    }
    ,
    j.random = function(n, t) {
        return null == t && (t = n,
        n = 0),
        n + Math.floor(Math.random() * (t - n + 1))
    }
    ;
    var I = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }
    };
    I.unescape = j.invert(I.escape);
    var T = {
        escape: new RegExp("[" + j.keys(I.escape).join("") + "]","g"),
        unescape: new RegExp("(" + j.keys(I.unescape).join("|") + ")","g")
    };
    j.each(["escape", "unescape"], function(n) {
        j[n] = function(t) {
            return null == t ? "" : ("" + t).replace(T[n], function(t) {
                return I[n][t]
            })
        }
    }),
    j.result = function(n, t) {
        if (null == n)
            return void 0;
        var r = n[t];
        return j.isFunction(r) ? r.call(n) : r
    }
    ,
    j.mixin = function(n) {
        A(j.functions(n), function(t) {
            var r = j[t] = n[t];
            j.prototype[t] = function() {
                var n = [this._wrapped];
                return a.apply(n, arguments),
                z.call(this, r.apply(j, n))
            }
        })
    }
    ;
    var N = 0;
    j.uniqueId = function(n) {
        var t = ++N + "";
        return n ? n + t : t
    }
    ,
    j.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var q = /(.)^/
      , B = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "	": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }
      , D = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    j.template = function(n, t, r) {
        var e;
        r = j.defaults({}, r, j.templateSettings);
        var u = new RegExp([(r.escape || q).source, (r.interpolate || q).source, (r.evaluate || q).source].join("|") + "|$","g")
          , i = 0
          , a = "__p+='";
        n.replace(u, function(t, r, e, u, o) {
            return a += n.slice(i, o).replace(D, function(n) {
                return "\\" + B[n]
            }),
            r && (a += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'"),
            e && (a += "'+\n((__t=(" + e + "))==null?'':__t)+\n'"),
            u && (a += "';\n" + u + "\n__p+='"),
            i = o + t.length,
            t
        }),
        a += "';\n",
        r.variable || (a = "with(obj||{}){\n" + a + "}\n"),
        a = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
        try {
            e = new Function(r.variable || "obj","_",a)
        } catch (o) {
            throw o.source = a,
            o
        }
        if (t)
            return e(t, j);
        var c = function(n) {
            return e.call(this, n, j)
        };
        return c.source = "function(" + (r.variable || "obj") + "){\n" + a + "}",
        c
    }
    ,
    j.chain = function(n) {
        return j(n).chain()
    }
    ;
    var z = function(n) {
        return this._chain ? j(n).chain() : n
    };
    j.mixin(j),
    A(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(n) {
        var t = e[n];
        j.prototype[n] = function() {
            var r = this._wrapped;
            return t.apply(r, arguments),
            "shift" != n && "splice" != n || 0 !== r.length || delete r[0],
            z.call(this, r)
        }
    }),
    A(["concat", "join", "slice"], function(n) {
        var t = e[n];
        j.prototype[n] = function() {
            return z.call(this, t.apply(this._wrapped, arguments))
        }
    }),
    j.extend(j.prototype, {
        chain: function() {
            return this._chain = !0,
            this
        },
        value: function() {
            return this._wrapped
        }
    })
}
.call(this);
/*
 * 	Backbone.js 1.0.0
 *  (c) 2010-2013 Jeremy Ashkenas, DocumentCloud Inc.
 *  Backbone may be freely distributed under the MIT license.
 *  http://backbonejs.org
 */
(function() {
    var t = this;
    var e = t.Backbone;
    var i = [];
    var r = i.push;
    var s = i.slice;
    var n = i.splice;
    var a;
    if (typeof exports !== "undefined") {
        a = exports
    } else {
        a = t.Backbone = {}
    }
    a.VERSION = "1.0.0";
    var h = t._;
    if (!h && typeof require !== "undefined")
        h = require("underscore");
    a.$ = t.jQuery || t.Zepto || t.ender || t.$;
    a.noConflict = function() {
        t.Backbone = e;
        return this
    }
    ;
    a.emulateHTTP = false;
    a.emulateJSON = false;
    var o = a.Events = {
        on: function(t, e, i) {
            if (!l(this, "on", t, [e, i]) || !e)
                return this;
            this._events || (this._events = {});
            var r = this._events[t] || (this._events[t] = []);
            r.push({
                callback: e,
                context: i,
                ctx: i || this
            });
            return this
        },
        once: function(t, e, i) {
            if (!l(this, "once", t, [e, i]) || !e)
                return this;
            var r = this;
            var s = h.once(function() {
                r.off(t, s);
                e.apply(this, arguments)
            });
            s._callback = e;
            return this.on(t, s, i)
        },
        off: function(t, e, i) {
            var r, s, n, a, o, u, c, f;
            if (!this._events || !l(this, "off", t, [e, i]))
                return this;
            if (!t && !e && !i) {
                this._events = {};
                return this
            }
            a = t ? [t] : h.keys(this._events);
            for (o = 0,
            u = a.length; o < u; o++) {
                t = a[o];
                if (n = this._events[t]) {
                    this._events[t] = r = [];
                    if (e || i) {
                        for (c = 0,
                        f = n.length; c < f; c++) {
                            s = n[c];
                            if (e && e !== s.callback && e !== s.callback._callback || i && i !== s.context) {
                                r.push(s)
                            }
                        }
                    }
                    if (!r.length)
                        delete this._events[t]
                }
            }
            return this
        },
        trigger: function(t) {
            if (!this._events)
                return this;
            var e = s.call(arguments, 1);
            if (!l(this, "trigger", t, e))
                return this;
            var i = this._events[t];
            var r = this._events.all;
            if (i)
                c(i, e);
            if (r)
                c(r, arguments);
            return this
        },
        stopListening: function(t, e, i) {
            var r = this._listeners;
            if (!r)
                return this;
            var s = !e && !i;
            if (typeof e === "object")
                i = this;
            if (t)
                (r = {})[t._listenerId] = t;
            for (var n in r) {
                r[n].off(e, i, this);
                if (s)
                    delete this._listeners[n]
            }
            return this
        }
    };
    var u = /\s+/;
    var l = function(t, e, i, r) {
        if (!i)
            return true;
        if (typeof i === "object") {
            for (var s in i) {
                t[e].apply(t, [s, i[s]].concat(r))
            }
            return false
        }
        if (u.test(i)) {
            var n = i.split(u);
            for (var a = 0, h = n.length; a < h; a++) {
                t[e].apply(t, [n[a]].concat(r))
            }
            return false
        }
        return true
    };
    var c = function(t, e) {
        var i, r = -1, s = t.length, n = e[0], a = e[1], h = e[2];
        switch (e.length) {
        case 0:
            while (++r < s)
                (i = t[r]).callback.call(i.ctx);
            return;
        case 1:
            while (++r < s)
                (i = t[r]).callback.call(i.ctx, n);
            return;
        case 2:
            while (++r < s)
                (i = t[r]).callback.call(i.ctx, n, a);
            return;
        case 3:
            while (++r < s)
                (i = t[r]).callback.call(i.ctx, n, a, h);
            return;
        default:
            while (++r < s)
                (i = t[r]).callback.apply(i.ctx, e)
        }
    };
    var f = {
        listenTo: "on",
        listenToOnce: "once"
    };
    h.each(f, function(t, e) {
        o[e] = function(e, i, r) {
            var s = this._listeners || (this._listeners = {});
            var n = e._listenerId || (e._listenerId = h.uniqueId("l"));
            s[n] = e;
            if (typeof i === "object")
                r = this;
            e[t](i, r, this);
            return this
        }
    });
    o.bind = o.on;
    o.unbind = o.off;
    h.extend(a, o);
    var d = a.Model = function(t, e) {
        var i;
        var r = t || {};
        e || (e = {});
        this.cid = h.uniqueId("c");
        this.attributes = {};
        h.extend(this, h.pick(e, p));
        if (e.parse)
            r = this.parse(r, e) || {};
        if (i = h.result(this, "defaults")) {
            r = h.defaults({}, r, i)
        }
        this.set(r, e);
        this.changed = {};
        this.initialize.apply(this, arguments)
    }
    ;
    var p = ["url", "urlRoot", "collection"];
    h.extend(d.prototype, o, {
        changed: null,
        validationError: null,
        idAttribute: "id",
        initialize: function() {},
        toJSON: function(t) {
            return h.clone(this.attributes)
        },
        sync: function() {
            return a.sync.apply(this, arguments)
        },
        get: function(t) {
            return this.attributes[t]
        },
        escape: function(t) {
            return h.escape(this.get(t))
        },
        has: function(t) {
            return this.get(t) != null
        },
        set: function(t, e, i) {
            var r, s, n, a, o, u, l, c;
            if (t == null)
                return this;
            if (typeof t === "object") {
                s = t;
                i = e
            } else {
                (s = {})[t] = e
            }
            i || (i = {});
            if (!this._validate(s, i))
                return false;
            n = i.unset;
            o = i.silent;
            a = [];
            u = this._changing;
            this._changing = true;
            if (!u) {
                this._previousAttributes = h.clone(this.attributes);
                this.changed = {}
            }
            c = this.attributes,
            l = this._previousAttributes;
            if (this.idAttribute in s)
                this.id = s[this.idAttribute];
            for (r in s) {
                e = s[r];
                if (!h.isEqual(c[r], e))
                    a.push(r);
                if (!h.isEqual(l[r], e)) {
                    this.changed[r] = e
                } else {
                    delete this.changed[r]
                }
                n ? delete c[r] : c[r] = e
            }
            if (!o) {
                if (a.length)
                    this._pending = true;
                for (var f = 0, d = a.length; f < d; f++) {
                    this.trigger("change:" + a[f], this, c[a[f]], i)
                }
            }
            if (u)
                return this;
            if (!o) {
                while (this._pending) {
                    this._pending = false;
                    this.trigger("change", this, i)
                }
            }
            this._pending = false;
            this._changing = false;
            return this
        },
        unset: function(t, e) {
            return this.set(t, void 0, h.extend({}, e, {
                unset: true
            }))
        },
        clear: function(t) {
            var e = {};
            for (var i in this.attributes)
                e[i] = void 0;
            return this.set(e, h.extend({}, t, {
                unset: true
            }))
        },
        hasChanged: function(t) {
            if (t == null)
                return !h.isEmpty(this.changed);
            return h.has(this.changed, t)
        },
        changedAttributes: function(t) {
            if (!t)
                return this.hasChanged() ? h.clone(this.changed) : false;
            var e, i = false;
            var r = this._changing ? this._previousAttributes : this.attributes;
            for (var s in t) {
                if (h.isEqual(r[s], e = t[s]))
                    continue;
                (i || (i = {}))[s] = e
            }
            return i
        },
        previous: function(t) {
            if (t == null || !this._previousAttributes)
                return null;
            return this._previousAttributes[t]
        },
        previousAttributes: function() {
            return h.clone(this._previousAttributes)
        },
        fetch: function(t) {
            t = t ? h.clone(t) : {};
            if (t.parse === void 0)
                t.parse = true;
            var e = this;
            var i = t.success;
            t.success = function(r) {
                if (!e.set(e.parse(r, t), t))
                    return false;
                if (i)
                    i(e, r, t);
                e.trigger("sync", e, r, t)
            }
            ;
            R(this, t);
            return this.sync("read", this, t)
        },
        save: function(t, e, i) {
            var r, s, n, a = this.attributes;
            if (t == null || typeof t === "object") {
                r = t;
                i = e
            } else {
                (r = {})[t] = e
            }
            if (r && (!i || !i.wait) && !this.set(r, i))
                return false;
            i = h.extend({
                validate: true
            }, i);
            if (!this._validate(r, i))
                return false;
            if (r && i.wait) {
                this.attributes = h.extend({}, a, r)
            }
            if (i.parse === void 0)
                i.parse = true;
            var o = this;
            var u = i.success;
            i.success = function(t) {
                o.attributes = a;
                var e = o.parse(t, i);
                if (i.wait)
                    e = h.extend(r || {}, e);
                if (h.isObject(e) && !o.set(e, i)) {
                    return false
                }
                if (u)
                    u(o, t, i);
                o.trigger("sync", o, t, i)
            }
            ;
            R(this, i);
            s = this.isNew() ? "create" : i.patch ? "patch" : "update";
            if (s === "patch")
                i.attrs = r;
            n = this.sync(s, this, i);
            if (r && i.wait)
                this.attributes = a;
            return n
        },
        destroy: function(t) {
            t = t ? h.clone(t) : {};
            var e = this;
            var i = t.success;
            var r = function() {
                e.trigger("destroy", e, e.collection, t)
            };
            t.success = function(s) {
                if (t.wait || e.isNew())
                    r();
                if (i)
                    i(e, s, t);
                if (!e.isNew())
                    e.trigger("sync", e, s, t)
            }
            ;
            if (this.isNew()) {
                t.success();
                return false
            }
            R(this, t);
            var s = this.sync("delete", this, t);
            if (!t.wait)
                r();
            return s
        },
        url: function() {
            var t = h.result(this, "urlRoot") || h.result(this.collection, "url") || U();
            if (this.isNew())
                return t;
            return t + (t.charAt(t.length - 1) === "/" ? "" : "/") + encodeURIComponent(this.id)
        },
        parse: function(t, e) {
            return t
        },
        clone: function() {
            return new this.constructor(this.attributes)
        },
        isNew: function() {
            return this.id == null
        },
        isValid: function(t) {
            return this._validate({}, h.extend(t || {}, {
                validate: true
            }))
        },
        _validate: function(t, e) {
            if (!e.validate || !this.validate)
                return true;
            t = h.extend({}, this.attributes, t);
            var i = this.validationError = this.validate(t, e) || null;
            if (!i)
                return true;
            this.trigger("invalid", this, i, h.extend(e || {}, {
                validationError: i
            }));
            return false
        }
    });
    var v = ["keys", "values", "pairs", "invert", "pick", "omit"];
    h.each(v, function(t) {
        d.prototype[t] = function() {
            var e = s.call(arguments);
            e.unshift(this.attributes);
            return h[t].apply(h, e)
        }
    });
    var g = a.Collection = function(t, e) {
        e || (e = {});
        if (e.url)
            this.url = e.url;
        if (e.model)
            this.model = e.model;
        if (e.comparator !== void 0)
            this.comparator = e.comparator;
        this._reset();
        this.initialize.apply(this, arguments);
        if (t)
            this.reset(t, h.extend({
                silent: true
            }, e))
    }
    ;
    var m = {
        add: true,
        remove: true,
        merge: true
    };
    var y = {
        add: true,
        merge: false,
        remove: false
    };
    h.extend(g.prototype, o, {
        model: d,
        initialize: function() {},
        toJSON: function(t) {
            return this.map(function(e) {
                return e.toJSON(t)
            })
        },
        sync: function() {
            return a.sync.apply(this, arguments)
        },
        add: function(t, e) {
            return this.set(t, h.defaults(e || {}, y))
        },
        remove: function(t, e) {
            t = h.isArray(t) ? t.slice() : [t];
            e || (e = {});
            var i, r, s, n;
            for (i = 0,
            r = t.length; i < r; i++) {
                n = this.get(t[i]);
                if (!n)
                    continue;
                delete this._byId[n.id];
                delete this._byId[n.cid];
                s = this.indexOf(n);
                this.models.splice(s, 1);
                this.length--;
                if (!e.silent) {
                    e.index = s;
                    n.trigger("remove", n, this, e)
                }
                this._removeReference(n)
            }
            return this
        },
        set: function(t, e) {
            e = h.defaults(e || {}, m);
            if (e.parse)
                t = this.parse(t, e);
            if (!h.isArray(t))
                t = t ? [t] : [];
            var i, s, a, o, u, l;
            var c = e.at;
            var f = this.comparator && c == null && e.sort !== false;
            var d = h.isString(this.comparator) ? this.comparator : null;
            var p = []
              , v = []
              , g = {};
            for (i = 0,
            s = t.length; i < s; i++) {
                if (!(a = this._prepareModel(t[i], e)))
                    continue;
                if (u = this.get(a)) {
                    if (e.remove)
                        g[u.cid] = true;
                    if (e.merge) {
                        u.set(a.attributes, e);
                        if (f && !l && u.hasChanged(d))
                            l = true
                    }
                } else if (e.add) {
                    p.push(a);
                    a.on("all", this._onModelEvent, this);
                    this._byId[a.cid] = a;
                    if (a.id != null)
                        this._byId[a.id] = a
                }
            }
            if (e.remove) {
                for (i = 0,
                s = this.length; i < s; ++i) {
                    if (!g[(a = this.models[i]).cid])
                        v.push(a)
                }
                if (v.length)
                    this.remove(v, e)
            }
            if (p.length) {
                if (f)
                    l = true;
                this.length += p.length;
                if (c != null) {
                    n.apply(this.models, [c, 0].concat(p))
                } else {
                    r.apply(this.models, p)
                }
            }
            if (l)
                this.sort({
                    silent: true
                });
            if (e.silent)
                return this;
            for (i = 0,
            s = p.length; i < s; i++) {
                (a = p[i]).trigger("add", a, this, e)
            }
            if (l)
                this.trigger("sort", this, e);
            return this
        },
        reset: function(t, e) {
            e || (e = {});
            for (var i = 0, r = this.models.length; i < r; i++) {
                this._removeReference(this.models[i])
            }
            e.previousModels = this.models;
            this._reset();
            this.add(t, h.extend({
                silent: true
            }, e));
            if (!e.silent)
                this.trigger("reset", this, e);
            return this
        },
        push: function(t, e) {
            t = this._prepareModel(t, e);
            this.add(t, h.extend({
                at: this.length
            }, e));
            return t
        },
        pop: function(t) {
            var e = this.at(this.length - 1);
            this.remove(e, t);
            return e
        },
        unshift: function(t, e) {
            t = this._prepareModel(t, e);
            this.add(t, h.extend({
                at: 0
            }, e));
            return t
        },
        shift: function(t) {
            var e = this.at(0);
            this.remove(e, t);
            return e
        },
        slice: function(t, e) {
            return this.models.slice(t, e)
        },
        get: function(t) {
            if (t == null)
                return void 0;
            return this._byId[t.id != null ? t.id : t.cid || t]
        },
        at: function(t) {
            return this.models[t]
        },
        where: function(t, e) {
            if (h.isEmpty(t))
                return e ? void 0 : [];
            return this[e ? "find" : "filter"](function(e) {
                for (var i in t) {
                    if (t[i] !== e.get(i))
                        return false
                }
                return true
            })
        },
        findWhere: function(t) {
            return this.where(t, true)
        },
        sort: function(t) {
            if (!this.comparator)
                throw new Error("Cannot sort a set without a comparator");
            t || (t = {});
            if (h.isString(this.comparator) || this.comparator.length === 1) {
                this.models = this.sortBy(this.comparator, this)
            } else {
                this.models.sort(h.bind(this.comparator, this))
            }
            if (!t.silent)
                this.trigger("sort", this, t);
            return this
        },
        sortedIndex: function(t, e, i) {
            e || (e = this.comparator);
            var r = h.isFunction(e) ? e : function(t) {
                return t.get(e)
            }
            ;
            return h.sortedIndex(this.models, t, r, i)
        },
        pluck: function(t) {
            return h.invoke(this.models, "get", t)
        },
        fetch: function(t) {
            t = t ? h.clone(t) : {};
            if (t.parse === void 0)
                t.parse = true;
            var e = t.success;
            var i = this;
            t.success = function(r) {
                var s = t.reset ? "reset" : "set";
                i[s](r, t);
                if (e)
                    e(i, r, t);
                i.trigger("sync", i, r, t)
            }
            ;
            R(this, t);
            return this.sync("read", this, t)
        },
        create: function(t, e) {
            e = e ? h.clone(e) : {};
            if (!(t = this._prepareModel(t, e)))
                return false;
            if (!e.wait)
                this.add(t, e);
            var i = this;
            var r = e.success;
            e.success = function(s) {
                if (e.wait)
                    i.add(t, e);
                if (r)
                    r(t, s, e)
            }
            ;
            t.save(null, e);
            return t
        },
        parse: function(t, e) {
            return t
        },
        clone: function() {
            return new this.constructor(this.models)
        },
        _reset: function() {
            this.length = 0;
            this.models = [];
            this._byId = {}
        },
        _prepareModel: function(t, e) {
            if (t instanceof d) {
                if (!t.collection)
                    t.collection = this;
                return t
            }
            e || (e = {});
            e.collection = this;
            var i = new this.model(t,e);
            if (!i._validate(t, e)) {
                this.trigger("invalid", this, t, e);
                return false
            }
            return i
        },
        _removeReference: function(t) {
            if (this === t.collection)
                delete t.collection;
            t.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function(t, e, i, r) {
            if ((t === "add" || t === "remove") && i !== this)
                return;
            if (t === "destroy")
                this.remove(e, r);
            if (e && t === "change:" + e.idAttribute) {
                delete this._byId[e.previous(e.idAttribute)];
                if (e.id != null)
                    this._byId[e.id] = e
            }
            this.trigger.apply(this, arguments)
        }
    });
    var _ = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain"];
    h.each(_, function(t) {
        g.prototype[t] = function() {
            var e = s.call(arguments);
            e.unshift(this.models);
            return h[t].apply(h, e)
        }
    });
    var w = ["groupBy", "countBy", "sortBy"];
    h.each(w, function(t) {
        g.prototype[t] = function(e, i) {
            var r = h.isFunction(e) ? e : function(t) {
                return t.get(e)
            }
            ;
            return h[t](this.models, r, i)
        }
    });
    var b = a.View = function(t) {
        this.cid = h.uniqueId("view");
        this._configure(t || {});
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents()
    }
    ;
    var x = /^(\S+)\s*(.*)$/;
    var E = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
    h.extend(b.prototype, o, {
        tagName: "div",
        $: function(t) {
            return this.$el.find(t)
        },
        initialize: function() {},
        render: function() {
            return this
        },
        remove: function() {
            this.$el.remove();
            this.stopListening();
            return this
        },
        setElement: function(t, e) {
            if (this.$el)
                this.undelegateEvents();
            this.$el = t instanceof a.$ ? t : a.$(t);
            this.el = this.$el[0];
            if (e !== false)
                this.delegateEvents();
            return this
        },
        delegateEvents: function(t) {
            if (!(t || (t = h.result(this, "events"))))
                return this;
            this.undelegateEvents();
            for (var e in t) {
                var i = t[e];
                if (!h.isFunction(i))
                    i = this[t[e]];
                if (!i)
                    continue;
                var r = e.match(x);
                var s = r[1]
                  , n = r[2];
                i = h.bind(i, this);
                s += ".delegateEvents" + this.cid;
                if (n === "") {
                    this.$el.on(s, i)
                } else {
                    this.$el.on(s, n, i)
                }
            }
            return this
        },
        undelegateEvents: function() {
            this.$el.off(".delegateEvents" + this.cid);
            return this
        },
        _configure: function(t) {
            if (this.options)
                t = h.extend({}, h.result(this, "options"), t);
            h.extend(this, h.pick(t, E));
            this.options = t
        },
        _ensureElement: function() {
            if (!this.el) {
                var t = h.extend({}, h.result(this, "attributes"));
                if (this.id)
                    t.id = h.result(this, "id");
                if (this.className)
                    t["class"] = h.result(this, "className");
                var e = a.$("<" + h.result(this, "tagName") + ">").attr(t);
                this.setElement(e, false)
            } else {
                this.setElement(h.result(this, "el"), false)
            }
        }
    });
    a.sync = function(t, e, i) {
        var r = k[t];
        h.defaults(i || (i = {}), {
            emulateHTTP: a.emulateHTTP,
            emulateJSON: a.emulateJSON
        });
        var s = {
            type: r,
            dataType: "json"
        };
        if (!i.url) {
            s.url = h.result(e, "url") || U()
        }
        if (i.data == null && e && (t === "create" || t === "update" || t === "patch")) {
            s.contentType = "application/json";
            s.data = JSON.stringify(i.attrs || e.toJSON(i))
        }
        if (i.emulateJSON) {
            s.contentType = "application/x-www-form-urlencoded";
            s.data = s.data ? {
                model: s.data
            } : {}
        }
        if (i.emulateHTTP && (r === "PUT" || r === "DELETE" || r === "PATCH")) {
            s.type = "POST";
            if (i.emulateJSON)
                s.data._method = r;
            var n = i.beforeSend;
            i.beforeSend = function(t) {
                t.setRequestHeader("X-HTTP-Method-Override", r);
                if (n)
                    return n.apply(this, arguments)
            }
        }
        if (s.type !== "GET" && !i.emulateJSON) {
            s.processData = false
        }
        if (s.type === "PATCH" && window.ActiveXObject && !(window.external && window.external.msActiveXFilteringEnabled)) {
            s.xhr = function() {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }
        }
        var o = i.xhr = a.ajax(h.extend(s, i));
        e.trigger("request", e, o, i);
        return o
    }
    ;
    var k = {
        create: "POST",
        update: "PUT",
        patch: "PATCH",
        "delete": "DELETE",
        read: "GET"
    };
    a.ajax = function() {
        return a.$.ajax.apply(a.$, arguments)
    }
    ;
    var S = a.Router = function(t) {
        t || (t = {});
        if (t.routes)
            this.routes = t.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments)
    }
    ;
    var $ = /\((.*?)\)/g;
    var T = /(\(\?)?:\w+/g;
    var H = /\*\w+/g;
    var A = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    h.extend(S.prototype, o, {
        initialize: function() {},
        route: function(t, e, i) {
            if (!h.isRegExp(t))
                t = this._routeToRegExp(t);
            if (h.isFunction(e)) {
                i = e;
                e = ""
            }
            if (!i)
                i = this[e];
            var r = this;
            a.history.route(t, function(s) {
                var n = r._extractParameters(t, s);
                i && i.apply(r, n);
                r.trigger.apply(r, ["route:" + e].concat(n));
                r.trigger("route", e, n);
                a.history.trigger("route", r, e, n)
            });
            return this
        },
        navigate: function(t, e) {
            a.history.navigate(t, e);
            return this
        },
        _bindRoutes: function() {
            if (!this.routes)
                return;
            this.routes = h.result(this, "routes");
            var t, e = h.keys(this.routes);
            while ((t = e.pop()) != null) {
                this.route(t, this.routes[t])
            }
        },
        _routeToRegExp: function(t) {
            t = t.replace(A, "\\$&").replace($, "(?:$1)?").replace(T, function(t, e) {
                return e ? t : "([^/]+)"
            }).replace(H, "(.*?)");
            return new RegExp("^" + t + "$")
        },
        _extractParameters: function(t, e) {
            var i = t.exec(e).slice(1);
            return h.map(i, function(t) {
                return t ? decodeURIComponent(t) : null
            })
        }
    });
    var I = a.History = function() {
        this.handlers = [];
        h.bindAll(this, "checkUrl");
        if (typeof window !== "undefined") {
            this.location = window.location;
            this.history = window.history
        }
    }
    ;
    var N = /^[#\/]|\s+$/g;
    var P = /^\/+|\/+$/g;
    var O = /msie [\w.]+/;
    var C = /\/$/;
    I.started = false;
    h.extend(I.prototype, o, {
        interval: 50,
        getHash: function(t) {
            var e = (t || this).location.href.match(/#(.*)$/);
            return e ? e[1] : ""
        },
        getFragment: function(t, e) {
            if (t == null) {
                if (this._hasPushState || !this._wantsHashChange || e) {
                    t = this.location.pathname;
                    var i = this.root.replace(C, "");
                    if (!t.indexOf(i))
                        t = t.substr(i.length)
                } else {
                    t = this.getHash()
                }
            }
            return t.replace(N, "")
        },
        start: function(t) {
            if (I.started)
                throw new Error("Backbone.history has already been started");
            I.started = true;
            this.options = h.extend({}, {
                root: "/"
            }, this.options, t);
            this.root = this.options.root;
            this._wantsHashChange = this.options.hashChange !== false;
            this._wantsPushState = !!this.options.pushState;
            this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
            var e = this.getFragment();
            var i = document.documentMode;
            var r = O.exec(navigator.userAgent.toLowerCase()) && (!i || i <= 7);
            this.root = ("/" + this.root + "/").replace(P, "/");
            if (r && this._wantsHashChange) {
                this.iframe = a.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow;
                this.navigate(e)
            }
            if (this._hasPushState) {
                a.$(window).on("popstate", this.checkUrl)
            } else if (this._wantsHashChange && "onhashchange"in window && !r) {
                a.$(window).on("hashchange", this.checkUrl)
            } else if (this._wantsHashChange) {
                this._checkUrlInterval = setInterval(this.checkUrl, this.interval)
            }
            this.fragment = e;
            var s = this.location;
            var n = s.pathname.replace(/[^\/]$/, "$&/") === this.root;
            if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !n) {
                this.fragment = this.getFragment(null, true);
                this.location.replace(this.root + this.location.search + "#" + this.fragment);
                return true
            } else if (this._wantsPushState && this._hasPushState && n && s.hash) {
                this.fragment = this.getHash().replace(N, "");
                this.history.replaceState({}, document.title, this.root + this.fragment + s.search)
            }
            if (!this.options.silent)
                return this.loadUrl()
        },
        stop: function() {
            a.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl);
            clearInterval(this._checkUrlInterval);
            I.started = false
        },
        route: function(t, e) {
            this.handlers.unshift({
                route: t,
                callback: e
            })
        },
        checkUrl: function(t) {
            var e = this.getFragment();
            if (e === this.fragment && this.iframe) {
                e = this.getFragment(this.getHash(this.iframe))
            }
            if (e === this.fragment)
                return false;
            if (this.iframe)
                this.navigate(e);
            this.loadUrl() || this.loadUrl(this.getHash())
        },
        loadUrl: function(t) {
            var e = this.fragment = this.getFragment(t);
            var i = h.any(this.handlers, function(t) {
                if (t.route.test(e)) {
                    t.callback(e);
                    return true
                }
            });
            return i
        },
        navigate: function(t, e) {
            if (!I.started)
                return false;
            if (!e || e === true)
                e = {
                    trigger: e
                };
            t = this.getFragment(t || "");
            if (this.fragment === t)
                return;
            this.fragment = t;
            var i = this.root + t;
            if (this._hasPushState) {
                this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, i)
            } else if (this._wantsHashChange) {
                this._updateHash(this.location, t, e.replace);
                if (this.iframe && t !== this.getFragment(this.getHash(this.iframe))) {
                    if (!e.replace)
                        this.iframe.document.open().close();
                    this._updateHash(this.iframe.location, t, e.replace)
                }
            } else {
                return this.location.assign(i)
            }
            if (e.trigger)
                this.loadUrl(t)
        },
        _updateHash: function(t, e, i) {
            if (i) {
                var r = t.href.replace(/(javascript:|#).*$/, "");
                t.replace(r + "#" + e)
            } else {
                t.hash = "#" + e
            }
        }
    });
    a.history = new I;
    var j = function(t, e) {
        var i = this;
        var r;
        if (t && h.has(t, "constructor")) {
            r = t.constructor
        } else {
            r = function() {
                return i.apply(this, arguments)
            }
        }
        h.extend(r, i, e);
        var s = function() {
            this.constructor = r
        };
        s.prototype = i.prototype;
        r.prototype = new s;
        if (t)
            h.extend(r.prototype, t);
        r.__super__ = i.prototype;
        return r
    };
    d.extend = g.extend = S.extend = b.extend = I.extend = j;
    var U = function() {
        throw new Error('A "url" property or function must be specified')
    };
    var R = function(t, e) {
        var i = e.error;
        e.error = function(r) {
            if (i)
                i(t, r, e);
            t.trigger("error", t, r, e)
        }
    }
}
).call(this);
/*
 * json2.js    2014-02-04
 * See https://github.com/douglascrockford/JSON-js
 */
if (typeof JSON !== 'object') {
    JSON = {}
}
(function() {
    'use strict';
    function f(n) {
        return n < 10 ? '0' + n : n
    }
    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null
        }
        ;
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
            return this.valueOf()
        }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\'
    }, rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }
    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
        if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
            value = value.toJSON(key)
        }
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
        case 'string':
            return quote(value);
        case 'number':
            return isFinite(value) ? String(value) : 'null';
        case 'boolean':
        case 'null':
            return String(value);
        case 'object':
            if (!value) {
                return 'null'
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === '[object Array]') {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null'
                }
                v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                gap = mind;
                return v
            }
            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v)
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v)
                        }
                    }
                }
            }
            v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v
        }
    }
    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function(value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' '
                }
            } else if (typeof space === 'string') {
                indent = space
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify')
            }
            return str('', {
                '': value
            })
        }
    }
    if (typeof JSON.parse !== 'function') {
        JSON.parse = function(text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function(a) {
                    return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ? walk({
                    '': j
                }, '') : j
            }
            throw new SyntaxError('JSON.parse')
        }
    }
}());
/*! Sea.js 2.2.0 | seajs.org/LICENSE.md */
!function(a, b) {
    function c(a) {
        return function(b) {
            return {}.toString.call(b) == "[object " + a + "]"
        }
    }
    function d() {
        return A++
    }
    function e(a) {
        return a.match(D)[0]
    }
    function f(a) {
        for (a = a.replace(E, "/"); a.match(F); )
            a = a.replace(F, "/");
        return a
    }
    function g(a) {
        var b = a.length - 1
          , c = a.charAt(b);
        return "#" === c ? a.substring(0, b) : ".js" === a.substring(b - 2) || a.indexOf("?") > 0 || ".css" === a.substring(b - 3) || "/" === c ? a : a + ".js"
    }
    function h(a) {
        var b = v.alias;
        return b && x(b[a]) ? b[a] : a
    }
    function i(a) {
        var b = v.paths, c;
        return b && (c = a.match(G)) && x(b[c[1]]) && (a = b[c[1]] + c[2]),
        a
    }
    function j(a) {
        var b = v.vars;
        return b && a.indexOf("{") > -1 && (a = a.replace(H, function(a, c) {
            return x(b[c]) ? b[c] : a
        })),
        a
    }
    function k(a) {
        var b = v.map
          , c = a;
        if (b)
            for (var d = 0, e = b.length; e > d; d++) {
                var f = b[d];
                if (c = z(f) ? f(a) || a : a.replace(f[0], f[1]),
                c !== a)
                    break
            }
        return c
    }
    function l(a, b) {
        var c, d = a.charAt(0);
        if (I.test(a))
            c = a;
        else if ("." === d)
            c = f((b ? e(b) : v.cwd) + a);
        else if ("/" === d) {
            var g = v.cwd.match(J);
            c = g ? g[0] + a.substring(1) : a
        } else
            c = v.base + a;
        return c
    }
    function m(a, b) {
        if (!a)
            return "";
        a = h(a),
        a = i(a),
        a = j(a),
        a = g(a);
        var c = l(a, b);
        return c = k(c)
    }
    function n(a) {
        return a.hasAttribute ? a.src : a.getAttribute("src", 4)
    }
    function o(a, b, c) {
        var d = R.test(a)
          , e = K.createElement(d ? "link" : "script");
        if (c) {
            var f = z(c) ? c(a) : c;
            f && (e.charset = f)
        }
        p(e, b, d),
        d ? (e.rel = "stylesheet",
        e.href = a) : (e.async = !0,
        e.src = a),
        T = e,
        Q ? P.insertBefore(e, Q) : P.appendChild(e),
        T = null
    }
    function p(a, c, d) {
        function e() {
            S.test(a.readyState) && (a.onload = a.onerror = a.onreadystatechange = null,
            d || v.debug || P.removeChild(a),
            a = null,
            c())
        }
        var f = "onload"in a
          , g = d && (V || !f);
        return g ? (setTimeout(function() {
            q(a, c)
        }, 1),
        b) : (f ? a.onload = a.onerror = e : a.onreadystatechange = e,
        b)
    }
    function q(a, b) {
        var c = a.sheet, d;
        if (V)
            c && (d = !0);
        else if (c)
            try {
                c.cssRules && (d = !0)
            } catch (e) {
                "NS_ERROR_DOM_SECURITY_ERR" === e.name && (d = !0)
            }
        setTimeout(function() {
            d ? b() : q(a, b)
        }, 20)
    }
    function r() {
        if (T)
            return T;
        if (U && "interactive" === U.readyState)
            return U;
        for (var a = P.getElementsByTagName("script"), b = a.length - 1; b >= 0; b--) {
            var c = a[b];
            if ("interactive" === c.readyState)
                return U = c
        }
    }
    function s(a) {
        var b = [];
        return a.replace(X, "").replace(W, function(a, c, d) {
            d && b.push(d)
        }),
        b
    }
    function t(a, b) {
        this.uri = a,
        this.dependencies = b || [],
        this.exports = null,
        this.status = 0,
        this._waitings = {},
        this._remain = 0
    }
    if (!a.seajs) {
        var u = a.seajs = {
            version: "2.2.0"
        }
          , v = u.data = {}
          , w = c("Object")
          , x = c("String")
          , y = Array.isArray || c("Array")
          , z = c("Function")
          , A = 0
          , B = v.events = {};
        u.on = function(a, b) {
            var c = B[a] || (B[a] = []);
            return c.push(b),
            u
        }
        ,
        u.off = function(a, b) {
            if (!a && !b)
                return B = v.events = {},
                u;
            var c = B[a];
            if (c)
                if (b)
                    for (var d = c.length - 1; d >= 0; d--)
                        c[d] === b && c.splice(d, 1);
                else
                    delete B[a];
            return u
        }
        ;
        var C = u.emit = function(a, b) {
            var c = B[a], d;
            if (c)
                for (c = c.slice(); d = c.shift(); )
                    d(b);
            return u
        }
        , D = /[^?#]*\//, E = /\/\.\//g, F = /\/[^/]+\/\.\.\//, G = /^([^/:]+)(\/.+)$/, H = /{([^{]+)}/g, I = /^\/\/.|:\//, J = /^.*?\/\/.*?\//, K = document, L = e(K.URL), M = K.scripts, N = K.getElementById("seajsnode") || M[M.length - 1], O = e(n(N) || L), P = K.getElementsByTagName("head")[0] || K.documentElement, Q = P.getElementsByTagName("base")[0], R = /\.css(?:\?|$)/i, S = /^(?:loaded|complete|undefined)$/, T, U, V = +navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, "$1") < 536, W = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g, X = /\\\\/g, Y = u.cache = {}, Z, $ = {}, _ = {}, ab = {}, bb = t.STATUS = {
            FETCHING: 1,
            SAVED: 2,
            LOADING: 3,
            LOADED: 4,
            EXECUTING: 5,
            EXECUTED: 6
        };
        t.prototype.resolve = function() {
            for (var a = this, b = a.dependencies, c = [], d = 0, e = b.length; e > d; d++)
                c[d] = t.resolve(b[d], a.uri);
            return c
        }
        ,
        t.prototype.load = function() {
            var a = this;
            if (!(a.status >= bb.LOADING)) {
                a.status = bb.LOADING;
                var c = a.resolve();
                C("load", c);
                for (var d = a._remain = c.length, e, f = 0; d > f; f++)
                    e = t.get(c[f]),
                    e.status < bb.LOADED ? e._waitings[a.uri] = (e._waitings[a.uri] || 0) + 1 : a._remain--;
                if (0 === a._remain)
                    return a.onload(),
                    b;
                var g = {};
                for (f = 0; d > f; f++)
                    e = Y[c[f]],
                    e.status < bb.FETCHING ? e.fetch(g) : e.status === bb.SAVED && e.load();
                for (var h in g)
                    g.hasOwnProperty(h) && g[h]()
            }
        }
        ,
        t.prototype.onload = function() {
            var a = this;
            a.status = bb.LOADED,
            a.callback && a.callback();
            var b = a._waitings, c, d;
            for (c in b)
                b.hasOwnProperty(c) && (d = Y[c],
                d._remain -= b[c],
                0 === d._remain && d.onload());
            delete a._waitings,
            delete a._remain
        }
        ,
        t.prototype.fetch = function(a) {
            function c() {
                o(g.requestUri, g.onRequest, g.charset)
            }
            function d() {
                delete $[h],
                _[h] = !0,
                Z && (t.save(f, Z),
                Z = null);
                var a, b = ab[h];
                for (delete ab[h]; a = b.shift(); )
                    a.load()
            }
            var e = this
              , f = e.uri;
            e.status = bb.FETCHING;
            var g = {
                uri: f
            };
            C("fetch", g);
            var h = g.requestUri || f;
            return !h || _[h] ? (e.load(),
            b) : $[h] ? (ab[h].push(e),
            b) : ($[h] = !0,
            ab[h] = [e],
            C("request", g = {
                uri: f,
                requestUri: h,
                onRequest: d,
                charset: v.charset
            }),
            g.requested || (a ? a[g.requestUri] = c : c()),
            b)
        }
        ,
        t.prototype.exec = function() {
            function a(b) {
                return t.get(a.resolve(b)).exec()
            }
            var c = this;
            if (c.status >= bb.EXECUTING)
                return c.exports;
            c.status = bb.EXECUTING;
            var e = c.uri;
            a.resolve = function(a) {
                return t.resolve(a, e)
            }
            ,
            a.async = function(b, c) {
                return t.use(b, c, e + "_async_" + d()),
                a
            }
            ;
            var f = c.factory
              , g = z(f) ? f(a, c.exports = {}, c) : f;
            return g === b && (g = c.exports),
            null !== g || R.test(e) || C("error", c),
            delete c.factory,
            c.exports = g,
            c.status = bb.EXECUTED,
            C("exec", c),
            g
        }
        ,
        t.resolve = function(a, b) {
            var c = {
                id: a,
                refUri: b
            };
            return C("resolve", c),
            c.uri || m(c.id, b)
        }
        ,
        t.define = function(a, c, d) {
            var e = arguments.length;
            1 === e ? (d = a,
            a = b) : 2 === e && (d = c,
            y(a) ? (c = a,
            a = b) : c = b),
            !y(c) && z(d) && (c = s("" + d));
            var f = {
                id: a,
                uri: t.resolve(a),
                deps: c,
                factory: d
            };
            if (!f.uri && K.attachEvent) {
                var g = r();
                g && (f.uri = g.src)
            }
            C("define", f),
            f.uri ? t.save(f.uri, f) : Z = f
        }
        ,
        t.save = function(a, b) {
            var c = t.get(a);
            c.status < bb.SAVED && (c.id = b.id || a,
            c.dependencies = b.deps || [],
            c.factory = b.factory,
            c.status = bb.SAVED)
        }
        ,
        t.get = function(a, b) {
            return Y[a] || (Y[a] = new t(a,b))
        }
        ,
        t.use = function(b, c, d) {
            var e = t.get(d, y(b) ? b : [b]);
            e.callback = function() {
                for (var b = [], d = e.resolve(), f = 0, g = d.length; g > f; f++)
                    b[f] = Y[d[f]].exec();
                c && c.apply(a, b),
                delete e.callback
            }
            ,
            e.load()
        }
        ,
        t.preload = function(a) {
            var b = v.preload
              , c = b.length;
            c ? t.use(b, function() {
                b.splice(0, c),
                t.preload(a)
            }, v.cwd + "_preload_" + d()) : a()
        }
        ,
        u.use = function(a, b) {
            return t.preload(function() {
                t.use(a, b, v.cwd + "_use_" + d())
            }),
            u
        }
        ,
        t.define.cmd = {},
        a.define = t.define,
        u.Module = t,
        v.fetchedList = _,
        v.cid = d,
        u.resolve = m,
        u.require = function(a) {
            return (Y[t.resolve(a)] || {}).exports
        }
        ;
        var cb = /^(.+?\/)(\?\?)?(seajs\/)+/;
        v.base = (O.match(cb) || ["", O])[1],
        v.dir = O,
        v.cwd = L,
        v.charset = "utf-8",
        v.preload = function() {
            var a = []
              , b = location.search.replace(/(seajs-\w+)(&|$)/g, "$1=1$2");
            return b += " " + K.cookie,
            b.replace(/(seajs-\w+)=1/g, function(b, c) {
                a.push(c)
            }),
            a
        }(),
        u.config = function(a) {
            for (var b in a) {
                var c = a[b]
                  , d = v[b];
                if (d && w(d))
                    for (var e in c)
                        d[e] = c[e];
                else
                    y(d) ? c = d.concat(c) : "base" === b && ("/" === c.slice(-1) || (c += "/"),
                    c = l(c)),
                    v[b] = c
            }
            return C("config", a),
            u
        }
    }
}(this);
!function(e, n) {
    function r(e) {
        c[e.name] = e
    }
    function t(e) {
        return e && c.hasOwnProperty(e)
    }
    function o(e) {
        for (var n in c)
            if (t(n)) {
                var r = "," + c[n].ext.join(",") + ",";
                if (r.indexOf("," + e + ",") > -1)
                    return n
            }
    }
    function a(e, r) {
        var t = n.ActiveXObject ? new n.ActiveXObject("Microsoft.XMLHTTP") : new n.XMLHttpRequest;
        return t.open("GET", e, !0),
        t.onreadystatechange = function() {
            if (4 === t.readyState) {
                if (t.status > 399 && t.status < 600)
                    throw new Error("Could not load: " + e + ", status = " + t.status);
                r(t.responseText)
            }
        }
        ,
        t.send(null)
    }
    function i(e) {
        e && /\S/.test(e) && (n.execScript || function(e) {
            (n.eval || eval).call(n, e)
        }
        )(e)
    }
    function s(e) {
        return e.replace(/(["\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
    }
    function u(e) {
        return e.replace(/\?.*$/, "")
    }
    var c = {}
      , f = {};
    r({
        name: "text",
        ext: [".tpl", ".html"],
        exec: function(e, n) {
            i('define("' + e + '#", [], "' + s(n) + '")')
        }
    }),
    r({
        name: "json",
        ext: [".json"],
        exec: function(e, n) {
            i('define("' + e + '#", [], ' + n + ")")
        }
    }),
    r({
        name: "handlebars",
        ext: [".handlebars"],
        exec: function(e, n) {
            var r = ['define("' + e + '#", ["handlebars"], function(require, exports, module) {', '  var source = "' + s(n) + '"', '  var Handlebars = require("handlebars")', "  module.exports = function(data, options) {", "    options || (options = {})", "    options.helpers || (options.helpers = {})", "    for (var key in Handlebars.helpers) {", "      options.helpers[key] = options.helpers[key] || Handlebars.helpers[key]", "    }", "    return Handlebars.compile(source)(data, options)", "  }", "})"].join("\n");
            i(r)
        }
    }),
    e.on("resolve", function(n) {
        var r = n.id;
        if (!r)
            return "";
        var a, i;
        (i = r.match(/^(\w+)!(.+)$/)) && t(i[1]) ? (a = i[1],
        r = i[2]) : (i = r.match(/[^?]+(\.\w+)(?:\?|#|$)/)) && (a = o(i[1])),
        a && -1 === r.indexOf("#") && (r += "#");
        var s = e.resolve(r, n.refUri);
        a && (f[s] = a),
        n.uri = s
    }),
    e.on("request", function(e) {
        var n = f[e.uri];
        n && (a(e.requestUri, function(r) {
            c[n].exec(e.uri, r),
            e.onRequest()
        }),
        e.requested = !0)
    }),
    "object" == typeof process && (a = function(e, n) {
        n(require("fs").readFileSync(u(e), "utf8"))
    }
    ),
    define("seajs-text", [], {})
}(seajs, this);
var SPECIAL_REGEX = {
    'infoview.pattenChinese': new RegExp(/^([\u2e80-\u9fffa-zA-Z()（） ]+){2,40}$/),
    'validation.name': /^([\u2e80-\u9fff a-zA-Z]+){1,}$|^([a-zA-Z]+[\s.]?){0,4}[a-zA-Z]+$/,
    'validation.username': /^([\u2e80-\u9fff a-zA-Z()（）]+){1,}$|^([a-zA-Z]+[\s.]?){0,4}[a-zA-Z]+$/,
    'validation.company': /^([\u2e80-\u9fff]+){2,}$|^([a-zA-Z]+[\s.]?){0,}[a-zA-Z]+$/,
    'validation.teamName': /^[\u4e00-\u9fa5aa-zA-Z()（） ]+$/,
    'validation.email': /^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/,
    'addteamview.addTeam': /^[\u4e00-\u9fa5aa-zA-Z()（） ]+$/,
    'formPlugin.sensitiveWords': /中[^\u4e00-\u9fa5]*奖|支[^\u4e00-\u9fa5]*付[^\u4e00-\u9fa5]*宝|银[^\u4e00-\u9fa5]*行[^\u4e00-\u9fa5]*卡|银[^\u4e00-\u9fa5]*行[^\u4e00-\u9fa5]*[账帐][^\u4e00-\u9fa5]*户|网[^\u4e00-\u9fa5]*银|银[^\u4e00-\u9fa5]*行[^\u4e00-\u9fa5]*[账帐][^\u4e00-\u9fa5]*号/g,
    'formPlugin.sensitiveWords.html': /中((?!><)[^\u4e00-\u9fa5])*奖|支((?!><)[^\u4e00-\u9fa5])*付((?!><)[^\u4e00-\u9fa5])*宝|银((?!><)[^\u4e00-\u9fa5])*行((?!><)[^\u4e00-\u9fa5])*卡|银((?!><)[^\u4e00-\u9fa5])*行((?!><)[^\u4e00-\u9fa5])*[账帐]((?!><)[^\u4e00-\u9fa5])*户|网((?!><)[^\u4e00-\u9fa5])*银|银((?!><)[^\u4e00-\u9fa5])*行((?!><)[^\u4e00-\u9fa5])*[账帐]((?!><)[^\u4e00-\u9fa5])*号/g,
    'formPlugin.sensitiveWords.json': /中((?!"},{")[^\u4e00-\u9fa5])*奖|支((?!"},{")[^\u4e00-\u9fa5])*付((?!"},{")[^\u4e00-\u9fa5])*宝|银((?!"},{")[^\u4e00-\u9fa5])*行((?!"},{")[^\u4e00-\u9fa5])*卡|银((?!"},{")[^\u4e00-\u9fa5])*行((?!"},{")[^\u4e00-\u9fa5])*[账帐]((?!"},{")[^\u4e00-\u9fa5])*户|网((?!"},{")[^\u4e00-\u9fa5])*银|银((?!"},{")[^\u4e00-\u9fa5])*行((?!"},{")[^\u4e00-\u9fa5])*[账帐]((?!"},{")[^\u4e00-\u9fa5])*号/g,
    'crm.validation.name': /^([\u2e80-\u9fff]+){2,}$|^([a-zA-Z]+[\s.]?){0,4}[a-zA-Z]+$/,
    'crm.validation.chinese': /.*[\u4e00-\u9fa5]+.*$/,
    'sender.writeletterview.address': /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    'emoji.h5.filter': /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,
    'im.chat.send.emoji.filter': ['\ud83c[\udf00-\udfff]', '\ud83d[\udc00-\ude4f]', '\ud83d[\ude80-\udeff]']
}
