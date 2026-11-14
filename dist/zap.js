#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/fflate@0.8.3/node_modules/fflate/esm/index.mjs
function deflateSync(data, opts) {
  return dopt(data, opts || {}, 0, 0);
}
function strToU8(str, latin1) {
  if (latin1) {
    var ar_1 = new u8(str.length);
    for (var i = 0; i < str.length; ++i)
      ar_1[i] = str.charCodeAt(i);
    return ar_1;
  }
  if (te)
    return te.encode(str);
  var l = str.length;
  var ar = new u8(str.length + (str.length >> 1));
  var ai = 0;
  var w = function(v) {
    ar[ai++] = v;
  };
  for (var i = 0; i < l; ++i) {
    if (ai + 5 > ar.length) {
      var n = new u8(ai + 8 + (l - i << 1));
      n.set(ar);
      ar = n;
    }
    var c = str.charCodeAt(i);
    if (c < 128 || latin1)
      w(c);
    else if (c < 2048)
      w(192 | c >> 6), w(128 | c & 63);
    else if (c > 55295 && c < 57344)
      c = 65536 + (c & 1023 << 10) | str.charCodeAt(++i) & 1023, w(240 | c >> 18), w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | c & 63);
    else
      w(224 | c >> 12), w(128 | c >> 6 & 63), w(128 | c & 63);
  }
  return slc(ar, 0, ai);
}
function zipSync(data, opts) {
  if (!opts)
    opts = {};
  var r = {};
  var files = [];
  fltn(data, "", r, opts);
  var o = 0;
  var tot = 0;
  for (var fn in r) {
    var _a2 = r[fn], file = _a2[0], p = _a2[1];
    var compression = p.level == 0 ? 0 : 8;
    var f = strToU8(fn), s = f.length;
    var com = p.comment, m = com && strToU8(com), ms = m && m.length;
    var exl = exfl(p.extra);
    if (s > 65535)
      err(11);
    var d = compression ? deflateSync(file, p) : file, l = d.length;
    var c = crc();
    c.p(file);
    files.push(mrg(p, {
      size: file.length,
      crc: c.d(),
      c: d,
      f,
      m,
      u: s != fn.length || m && com.length != ms,
      o,
      compression
    }));
    o += 30 + s + exl + l;
    tot += 76 + 2 * (s + exl) + (ms || 0) + l;
  }
  var out = new u8(tot + 22), oe = o, cdl = tot - o;
  for (var i = 0; i < files.length; ++i) {
    var f = files[i];
    wzh(out, f.o, f, f.f, f.u, f.c.length);
    var badd = 30 + f.f.length + exfl(f.extra);
    out.set(f.c, f.o + badd);
    wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
  }
  wzf(out, o, files.length, cdl, oe);
  return out;
}
var import_module, require2, _a, Worker, isMarkedAsUntransferable, u8, u16, i32, fleb, fdeb, clim, freb, _a, fl, revfl, _b, fd, revfd, rev, x, i, hMap, flt, i, i, i, i, fdt, i, flm, fdm, shft, slc, ec, err, wbits, wbits16, hTree, ln, lc, clen, wfblk, wblk, deo, et, dflt, crct, crc, dopt, mrg, wbytes, fltn, te, td, tds, exfl, wzh, wzf;
var init_esm = __esm({
  "node_modules/.pnpm/fflate@0.8.3/node_modules/fflate/esm/index.mjs"() {
    import_module = require("module");
    require2 = (0, import_module.createRequire)("/");
    try {
      _a = require2("worker_threads"), Worker = _a.Worker, isMarkedAsUntransferable = _a.isMarkedAsUntransferable;
    } catch (e) {
    }
    u8 = Uint8Array;
    u16 = Uint16Array;
    i32 = Int32Array;
    fleb = new u8([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      2,
      2,
      2,
      2,
      3,
      3,
      3,
      3,
      4,
      4,
      4,
      4,
      5,
      5,
      5,
      5,
      0,
      /* unused */
      0,
      0,
      /* impossible */
      0
    ]);
    fdeb = new u8([
      0,
      0,
      0,
      0,
      1,
      1,
      2,
      2,
      3,
      3,
      4,
      4,
      5,
      5,
      6,
      6,
      7,
      7,
      8,
      8,
      9,
      9,
      10,
      10,
      11,
      11,
      12,
      12,
      13,
      13,
      /* unused */
      0,
      0
    ]);
    clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
    freb = function(eb, start) {
      var b = new u16(31);
      for (var i = 0; i < 31; ++i) {
        b[i] = start += 1 << eb[i - 1];
      }
      var r = new i32(b[30]);
      for (var i = 1; i < 30; ++i) {
        for (var j = b[i]; j < b[i + 1]; ++j) {
          r[j] = j - b[i] << 5 | i;
        }
      }
      return { b, r };
    };
    _a = freb(fleb, 2);
    fl = _a.b;
    revfl = _a.r;
    fl[28] = 258, revfl[258] = 28;
    _b = freb(fdeb, 0);
    fd = _b.b;
    revfd = _b.r;
    rev = new u16(32768);
    for (i = 0; i < 32768; ++i) {
      x = (i & 43690) >> 1 | (i & 21845) << 1;
      x = (x & 52428) >> 2 | (x & 13107) << 2;
      x = (x & 61680) >> 4 | (x & 3855) << 4;
      rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
    }
    hMap = (function(cd, mb, r) {
      var s = cd.length;
      var i = 0;
      var l = new u16(mb);
      for (; i < s; ++i) {
        if (cd[i])
          ++l[cd[i] - 1];
      }
      var le = new u16(mb);
      for (i = 1; i < mb; ++i) {
        le[i] = le[i - 1] + l[i - 1] << 1;
      }
      var co;
      if (r) {
        co = new u16(1 << mb);
        var rvb = 15 - mb;
        for (i = 0; i < s; ++i) {
          if (cd[i]) {
            var sv = i << 4 | cd[i];
            var r_1 = mb - cd[i];
            var v = le[cd[i] - 1]++ << r_1;
            for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
              co[rev[v] >> rvb] = sv;
            }
          }
        }
      } else {
        co = new u16(s);
        for (i = 0; i < s; ++i) {
          if (cd[i]) {
            co[i] = rev[le[cd[i] - 1]++] >> 15 - cd[i];
          }
        }
      }
      return co;
    });
    flt = new u8(288);
    for (i = 0; i < 144; ++i)
      flt[i] = 8;
    for (i = 144; i < 256; ++i)
      flt[i] = 9;
    for (i = 256; i < 280; ++i)
      flt[i] = 7;
    for (i = 280; i < 288; ++i)
      flt[i] = 8;
    fdt = new u8(32);
    for (i = 0; i < 32; ++i)
      fdt[i] = 5;
    flm = /* @__PURE__ */ hMap(flt, 9, 0);
    fdm = /* @__PURE__ */ hMap(fdt, 5, 0);
    shft = function(p) {
      return (p + 7) / 8 | 0;
    };
    slc = function(v, s, e) {
      if (s == null || s < 0)
        s = 0;
      if (e == null || e > v.length)
        e = v.length;
      return new u8(v.subarray(s, e));
    };
    ec = [
      "unexpected EOF",
      "invalid block type",
      "invalid length/literal",
      "invalid distance",
      "stream finished",
      "no stream handler",
      ,
      // determined by compression function
      "no callback",
      "invalid UTF-8 data",
      "extra field too long",
      "date not in range 1980-2099",
      "filename too long",
      "stream finishing",
      "invalid zip data"
      // determined by unknown compression method
    ];
    err = function(ind, msg, nt) {
      var e = new Error(msg || ec[ind]);
      e.code = ind;
      if (Error.captureStackTrace)
        Error.captureStackTrace(e, err);
      if (!nt)
        throw e;
      return e;
    };
    wbits = function(d, p, v) {
      v <<= p & 7;
      var o = p / 8 | 0;
      d[o] |= v;
      d[o + 1] |= v >> 8;
    };
    wbits16 = function(d, p, v) {
      v <<= p & 7;
      var o = p / 8 | 0;
      d[o] |= v;
      d[o + 1] |= v >> 8;
      d[o + 2] |= v >> 16;
    };
    hTree = function(d, mb) {
      var t2 = [];
      for (var i = 0; i < d.length; ++i) {
        if (d[i])
          t2.push({ s: i, f: d[i] });
      }
      var s = t2.length;
      var t22 = t2.slice();
      if (!s)
        return { t: et, l: 0 };
      if (s == 1) {
        var v = new u8(t2[0].s + 1);
        v[t2[0].s] = 1;
        return { t: v, l: 1 };
      }
      t2.sort(function(a, b) {
        return a.f - b.f;
      });
      t2.push({ s: -1, f: 25001 });
      var l = t2[0], r = t2[1], i0 = 0, i1 = 1, i2 = 2;
      t2[0] = { s: -1, f: l.f + r.f, l, r };
      while (i1 != s - 1) {
        l = t2[t2[i0].f < t2[i2].f ? i0++ : i2++];
        r = t2[i0 != i1 && t2[i0].f < t2[i2].f ? i0++ : i2++];
        t2[i1++] = { s: -1, f: l.f + r.f, l, r };
      }
      var maxSym = t22[0].s;
      for (var i = 1; i < s; ++i) {
        if (t22[i].s > maxSym)
          maxSym = t22[i].s;
      }
      var tr = new u16(maxSym + 1);
      var mbt = ln(t2[i1 - 1], tr, 0);
      if (mbt > mb) {
        var i = 0, dt = 0;
        var lft = mbt - mb, cst = 1 << lft;
        t22.sort(function(a, b) {
          return tr[b.s] - tr[a.s] || a.f - b.f;
        });
        for (; i < s; ++i) {
          var i2_1 = t22[i].s;
          if (tr[i2_1] > mb) {
            dt += cst - (1 << mbt - tr[i2_1]);
            tr[i2_1] = mb;
          } else
            break;
        }
        dt >>= lft;
        while (dt > 0) {
          var i2_2 = t22[i].s;
          if (tr[i2_2] < mb)
            dt -= 1 << mb - tr[i2_2]++ - 1;
          else
            ++i;
        }
        for (; i >= 0 && dt; --i) {
          var i2_3 = t22[i].s;
          if (tr[i2_3] == mb) {
            --tr[i2_3];
            ++dt;
          }
        }
        mbt = mb;
      }
      return { t: new u8(tr), l: mbt };
    };
    ln = function(n, l, d) {
      return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
    };
    lc = function(c) {
      var s = c.length;
      while (s && !c[--s])
        ;
      var cl = new u16(++s);
      var cli = 0, cln = c[0], cls = 1;
      var w = function(v) {
        cl[cli++] = v;
      };
      for (var i = 1; i <= s; ++i) {
        if (c[i] == cln && i != s)
          ++cls;
        else {
          if (!cln && cls > 2) {
            for (; cls > 138; cls -= 138)
              w(32754);
            if (cls > 2) {
              w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
              cls = 0;
            }
          } else if (cls > 3) {
            w(cln), --cls;
            for (; cls > 6; cls -= 6)
              w(8304);
            if (cls > 2)
              w(cls - 3 << 5 | 8208), cls = 0;
          }
          while (cls--)
            w(cln);
          cls = 1;
          cln = c[i];
        }
      }
      return { c: cl.subarray(0, cli), n: s };
    };
    clen = function(cf, cl) {
      var l = 0;
      for (var i = 0; i < cl.length; ++i)
        l += cf[i] * cl[i];
      return l;
    };
    wfblk = function(out, pos, dat) {
      var s = dat.length;
      var o = shft(pos + 2);
      out[o] = s & 255;
      out[o + 1] = s >> 8;
      out[o + 2] = out[o] ^ 255;
      out[o + 3] = out[o + 1] ^ 255;
      for (var i = 0; i < s; ++i)
        out[o + i + 4] = dat[i];
      return (o + 4 + s) * 8;
    };
    wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
      wbits(out, p++, final);
      ++lf[256];
      var _a2 = hTree(lf, 15), dlt = _a2.t, mlb = _a2.l;
      var _b2 = hTree(df, 15), ddt = _b2.t, mdb = _b2.l;
      var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
      var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
      var lcfreq = new u16(19);
      for (var i = 0; i < lclt.length; ++i)
        ++lcfreq[lclt[i] & 31];
      for (var i = 0; i < lcdt.length; ++i)
        ++lcfreq[lcdt[i] & 31];
      var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
      var nlcc = 19;
      for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
        ;
      var flen = bl + 5 << 3;
      var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
      var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
      if (bs >= 0 && flen <= ftlen && flen <= dtlen)
        return wfblk(out, p, dat.subarray(bs, bs + bl));
      var lm, ll, dm, dl;
      wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
      if (dtlen < ftlen) {
        lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
        var llm = hMap(lct, mlcb, 0);
        wbits(out, p, nlc - 257);
        wbits(out, p + 5, ndc - 1);
        wbits(out, p + 10, nlcc - 4);
        p += 14;
        for (var i = 0; i < nlcc; ++i)
          wbits(out, p + 3 * i, lct[clim[i]]);
        p += 3 * nlcc;
        var lcts = [lclt, lcdt];
        for (var it = 0; it < 2; ++it) {
          var clct = lcts[it];
          for (var i = 0; i < clct.length; ++i) {
            var len = clct[i] & 31;
            wbits(out, p, llm[len]), p += lct[len];
            if (len > 15)
              wbits(out, p, clct[i] >> 5 & 127), p += clct[i] >> 12;
          }
        }
      } else {
        lm = flm, ll = flt, dm = fdm, dl = fdt;
      }
      for (var i = 0; i < li; ++i) {
        var sym = syms[i];
        if (sym > 255) {
          var len = sym >> 18 & 31;
          wbits16(out, p, lm[len + 257]), p += ll[len + 257];
          if (len > 7)
            wbits(out, p, sym >> 23 & 31), p += fleb[len];
          var dst = sym & 31;
          wbits16(out, p, dm[dst]), p += dl[dst];
          if (dst > 3)
            wbits16(out, p, sym >> 5 & 8191), p += fdeb[dst];
        } else {
          wbits16(out, p, lm[sym]), p += ll[sym];
        }
      }
      wbits16(out, p, lm[256]);
      return p + ll[256];
    };
    deo = /* @__PURE__ */ new i32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
    et = /* @__PURE__ */ new u8(0);
    dflt = function(dat, lvl, plvl, pre, post, st) {
      var s = st.z || dat.length;
      var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post);
      var w = o.subarray(pre, o.length - post);
      var lst = st.l;
      var pos = (st.r || 0) & 7;
      if (lvl) {
        if (pos)
          w[0] = st.r >> 3;
        var opt = deo[lvl - 1];
        var n = opt >> 13, c = opt & 8191;
        var msk_1 = (1 << plvl) - 1;
        var prev = st.p || new u16(32768), head = st.h || new u16(msk_1 + 1);
        var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
        var hsh = function(i2) {
          return (dat[i2] ^ dat[i2 + 1] << bs1_1 ^ dat[i2 + 2] << bs2_1) & msk_1;
        };
        var syms = new i32(25e3);
        var lf = new u16(288), df = new u16(32);
        var lc_1 = 0, eb = 0, i = st.i || 0, li = 0, wi = st.w || 0, bs = 0;
        for (; i + 2 < s; ++i) {
          var hv = hsh(i);
          var imod = i & 32767, pimod = head[hv];
          prev[imod] = pimod;
          head[hv] = imod;
          if (wi <= i) {
            var rem = s - i;
            if ((lc_1 > 7e3 || li > 24576) && (rem > 423 || !lst)) {
              pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
              li = lc_1 = eb = 0, bs = i;
              for (var j = 0; j < 286; ++j)
                lf[j] = 0;
              for (var j = 0; j < 30; ++j)
                df[j] = 0;
            }
            var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
            if (rem > 2 && hv == hsh(i - dif)) {
              var maxn = Math.min(n, rem) - 1;
              var maxd = Math.min(32767, i);
              var ml = Math.min(258, rem);
              while (dif <= maxd && --ch_1 && imod != pimod) {
                if (dat[i + l] == dat[i + l - dif]) {
                  var nl = 0;
                  for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                    ;
                  if (nl > l) {
                    l = nl, d = dif;
                    if (nl > maxn)
                      break;
                    var mmd = Math.min(dif, nl - 2);
                    var md = 0;
                    for (var j = 0; j < mmd; ++j) {
                      var ti = i - dif + j & 32767;
                      var pti = prev[ti];
                      var cd = ti - pti & 32767;
                      if (cd > md)
                        md = cd, pimod = ti;
                    }
                  }
                }
                imod = pimod, pimod = prev[imod];
                dif += imod - pimod & 32767;
              }
            }
            if (d) {
              syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
              var lin = revfl[l] & 31, din = revfd[d] & 31;
              eb += fleb[lin] + fdeb[din];
              ++lf[257 + lin];
              ++df[din];
              wi = i + l;
              ++lc_1;
            } else {
              syms[li++] = dat[i];
              ++lf[dat[i]];
            }
          }
        }
        for (i = Math.max(i, wi); i < s; ++i) {
          syms[li++] = dat[i];
          ++lf[dat[i]];
        }
        pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
        if (!lst) {
          st.r = pos & 7 | w[pos / 8 | 0] << 3;
          pos -= 7;
          st.h = head, st.p = prev, st.i = i, st.w = wi;
        }
      } else {
        for (var i = st.w || 0; i < s + lst; i += 65535) {
          var e = i + 65535;
          if (e >= s) {
            w[pos / 8 | 0] = lst;
            e = s;
          }
          pos = wfblk(w, pos + 1, dat.subarray(i, e));
        }
        st.i = s;
      }
      return slc(o, 0, pre + shft(pos) + post);
    };
    crct = /* @__PURE__ */ (function() {
      var t2 = new Int32Array(256);
      for (var i = 0; i < 256; ++i) {
        var c = i, k = 9;
        while (--k)
          c = (c & 1 && -306674912) ^ c >>> 1;
        t2[i] = c;
      }
      return t2;
    })();
    crc = function() {
      var c = -1;
      return {
        p: function(d) {
          var cr = c;
          for (var i = 0; i < d.length; ++i)
            cr = crct[cr & 255 ^ d[i]] ^ cr >>> 8;
          c = cr;
        },
        d: function() {
          return ~c;
        }
      };
    };
    dopt = function(dat, opt, pre, post, st) {
      if (!st) {
        st = { l: 1 };
        if (opt.dictionary) {
          var dict = opt.dictionary.subarray(-32768);
          var newDat = new u8(dict.length + dat.length);
          newDat.set(dict);
          newDat.set(dat, dict.length);
          dat = newDat;
          st.w = dict.length;
        }
      }
      return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? st.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20 : 12 + opt.mem, pre, post, st);
    };
    mrg = function(a, b) {
      var o = {};
      for (var k in a)
        o[k] = a[k];
      for (var k in b)
        o[k] = b[k];
      return o;
    };
    wbytes = function(d, b, v) {
      for (; v; ++b)
        d[b] = v, v >>>= 8;
    };
    fltn = function(d, p, t2, o) {
      for (var k in d) {
        var val = d[k], n = p + k, op = o;
        if (Array.isArray(val))
          op = mrg(o, val[1]), val = val[0];
        if (ArrayBuffer.isView(val))
          t2[n] = [val, op];
        else {
          t2[n += "/"] = [new u8(0), op];
          fltn(val, n, t2, o);
        }
      }
    };
    te = typeof TextEncoder != "undefined" && /* @__PURE__ */ new TextEncoder();
    td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
    tds = 0;
    try {
      td.decode(et, { stream: true });
      tds = 1;
    } catch (e) {
    }
    exfl = function(ex) {
      var le = 0;
      if (ex) {
        for (var k in ex) {
          var l = ex[k].length;
          if (l > 65535)
            err(9);
          le += l + 4;
        }
      }
      return le;
    };
    wzh = function(d, b, f, fn, u, c, ce, co) {
      var fl2 = fn.length, ex = f.extra, col = co && co.length;
      var exl = exfl(ex);
      wbytes(d, b, ce != null ? 33639248 : 67324752), b += 4;
      if (ce != null)
        d[b++] = 20, d[b++] = f.os;
      d[b] = 20, b += 2;
      d[b++] = f.flag << 1 | (c < 0 && 8), d[b++] = u && 8;
      d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
      var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
      if (y < 0 || y > 119)
        err(10);
      wbytes(d, b, y << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >> 1), b += 4;
      if (c != -1) {
        wbytes(d, b, f.crc);
        wbytes(d, b + 4, c < 0 ? -c - 2 : c);
        wbytes(d, b + 8, f.size);
      }
      wbytes(d, b + 12, fl2);
      wbytes(d, b + 14, exl), b += 16;
      if (ce != null) {
        wbytes(d, b, col);
        wbytes(d, b + 6, f.attrs);
        wbytes(d, b + 10, ce), b += 14;
      }
      d.set(fn, b);
      b += fl2;
      if (exl) {
        for (var k in ex) {
          var exf = ex[k], l = exf.length;
          wbytes(d, b, +k);
          wbytes(d, b + 2, l);
          d.set(exf, b + 4), b += 4 + l;
        }
      }
      if (col)
        d.set(co, b), b += col;
      return b;
    };
    wzf = function(o, b, c, d, e) {
      wbytes(o, b, 101010256);
      wbytes(o, b + 8, c);
      wbytes(o, b + 10, c);
      wbytes(o, b + 12, d);
      wbytes(o, b + 16, e);
    };
  }
});

// packages/core/src/formats/registry.js
var require_registry = __commonJS({
  "packages/core/src/formats/registry.js"(exports2, module2) {
    "use strict";
    var FormatRegistry = class {
      constructor() {
        this._byName = /* @__PURE__ */ new Map();
        this._byMime = /* @__PURE__ */ new Map();
        this._byExt = /* @__PURE__ */ new Map();
        this._handlers = /* @__PURE__ */ new Set();
      }
      /**
       * Registers a new format handler.
       * @param {FormatHandler} handler
       */
      register(handler) {
        if (!handler || typeof handler !== "object") {
          throw new TypeError("Format handler must be an object.");
        }
        if (!handler.name || typeof handler.name !== "string") {
          throw new TypeError("Format handler must have a valid string name.");
        }
        const name = handler.name.toLowerCase();
        this._byName.set(name, handler);
        this._handlers.add(handler);
        if (Array.isArray(handler.mimeTypes)) {
          for (const mime of handler.mimeTypes) {
            this._byMime.set(mime.toLowerCase(), handler);
          }
        }
        if (Array.isArray(handler.extensions)) {
          for (const ext of handler.extensions) {
            const normalized = ext.startsWith(".") ? ext.toLowerCase() : `.${ext.toLowerCase()}`;
            this._byExt.set(normalized, handler);
          }
        }
      }
      /**
       * Gets a format handler by name.
       * @param {string} name
       * @returns {FormatHandler | undefined}
       */
      getByName(name) {
        if (!name) return void 0;
        return this._byName.get(String(name).toLowerCase());
      }
      /**
       * Gets a format handler by MIME type.
       * @param {string} mime
       * @returns {FormatHandler | undefined}
       */
      getByMime(mime) {
        if (!mime) return void 0;
        return this._byMime.get(String(mime).toLowerCase().split(";")[0].trim());
      }
      /**
       * Gets a format handler by file extension.
       * @param {string} ext
       * @returns {FormatHandler | undefined}
       */
      getByExtension(ext) {
        if (!ext) return void 0;
        const normalized = ext.startsWith(".") ? ext.toLowerCase() : `.${ext.toLowerCase()}`;
        return this._byExt.get(normalized);
      }
      /**
       * Detects the format handler matching the input byte signature.
       * @param {Uint8Array | Buffer} bytes
       * @returns {FormatHandler | null}
       */
      detect(bytes) {
        if (!bytes || !bytes.length) return null;
        for (const handler of this._handlers) {
          if (typeof handler.detect === "function") {
            try {
              if (handler.detect(bytes)) {
                return handler;
              }
            } catch {
            }
          }
        }
        return null;
      }
      /**
       * Returns all registered format handlers.
       * @returns {FormatHandler[]}
       */
      getAll() {
        return Array.from(this._handlers);
      }
      /**
       * Returns an array of supported input format names.
       * @returns {string[]}
       */
      getSupportedInputs() {
        return Array.from(this._handlers).filter((h) => h.isInput).map((h) => h.name);
      }
      /**
       * Returns an array of supported output format names.
       * @returns {string[]}
       */
      getSupportedOutputs() {
        return Array.from(this._handlers).filter((h) => h.isOutput).map((h) => h.name);
      }
    };
    var registry = new FormatRegistry();
    module2.exports = {
      FormatRegistry,
      registry,
      registerFormat: (handler) => registry.register(handler),
      getHandlerByName: (name) => registry.getByName(name),
      getHandlerByMime: (mime) => registry.getByMime(mime),
      getHandlerByExtension: (ext) => registry.getByExtension(ext),
      detectFormatHandler: (bytes) => registry.detect(bytes),
      getAllHandlers: () => registry.getAll()
    };
  }
});

// packages/core/src/formats/svg.js
var require_svg = __commonJS({
  "packages/core/src/formats/svg.js"(exports2, module2) {
    "use strict";
    function validateSvgString(input) {
      const svg = Buffer.isBuffer(input) ? input.toString("utf8") : String(input);
      if (Buffer.byteLength(svg) === 0 || !/<svg(?:\s|\/?>)/i.test(svg)) {
        throw new Error("This file does not contain a valid SVG document.");
      }
      if (/<(?:script|foreignObject)\b/i.test(svg) || /\bon\w+\s*=/i.test(svg)) {
        throw new Error("This SVG contains active content and cannot be converted.");
      }
      if (/<!ENTITY\b/i.test(svg)) {
        throw new Error("Custom XML entities are not supported.");
      }
      if (/<!DOCTYPE\b/i.test(svg)) {
        throw new Error("DOCTYPE declarations are not supported.");
      }
      return svg;
    }
    function getSvgDimensions(svg) {
      const widthMatch = svg.match(/\bwidth=["']([0-9.]+)(?:px)?["']/i);
      const heightMatch = svg.match(/\bheight=["']([0-9.]+)(?:px)?["']/i);
      const viewBoxMatch = svg.match(/\bviewBox=["']\s*([0-9.-]+)\s+([0-9.-]+)\s+([0-9.]+)\s+([0-9.]+)\s*["']/i);
      const width = widthMatch ? parseFloat(widthMatch[1]) : viewBoxMatch ? parseFloat(viewBoxMatch[3]) : void 0;
      const height = heightMatch ? parseFloat(heightMatch[1]) : viewBoxMatch ? parseFloat(viewBoxMatch[4]) : void 0;
      return { width, height };
    }
    var svgHandler = {
      name: "svg",
      mimeTypes: Object.freeze(["image/svg+xml"]),
      extensions: Object.freeze([".svg"]),
      supportsAlpha: true,
      isInput: true,
      isOutput: false,
      detect(bytes) {
        if (!bytes || !bytes.length) return false;
        const sample = bytes.subarray(0, Math.min(bytes.length, 4096)).toString("utf8").replace(/^\uFEFF/, "").trimStart();
        return /<svg(?:\s|\/?>)/i.test(sample) || /^<\?xml[\s\S]*?<svg(?:\s|\/?>)/i.test(sample);
      },
      async decode(bytes) {
        const { Resvg } = require("@resvg/resvg-js");
        const sharp = require("sharp");
        const svg = validateSvgString(bytes);
        const dims = getSvgDimensions(svg);
        const width = dims.width || 2048;
        const height = dims.height || 2048;
        const resvg = new Resvg(svg, {
          fitTo: { mode: "original" },
          background: "rgba(0, 0, 0, 0)"
        });
        const pngBuffer = resvg.render().asPng();
        const { data: raw, info } = await sharp(pngBuffer, { limitInputPixels: 4096 * 4096 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        return {
          data: new Uint8ClampedArray(raw.buffer, raw.byteOffset, raw.byteLength),
          width: info.width,
          height: info.height
        };
      },
      async encode() {
        throw new Error("SVG output encoding from raster is not supported. Zap converts SVG to modern raster formats (WebP, PNG, AVIF).");
      }
    };
    module2.exports = {
      svgHandler,
      validateSvgString,
      getSvgDimensions
    };
  }
});

// packages/core/src/formats/png.js
var require_png = __commonJS({
  "packages/core/src/formats/png.js"(exports2, module2) {
    "use strict";
    var PNG_HEADER = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    var pngHandler = {
      name: "png",
      mimeTypes: Object.freeze(["image/png"]),
      extensions: Object.freeze([".png"]),
      supportsAlpha: true,
      isInput: true,
      isOutput: true,
      detect(bytes) {
        if (!bytes || bytes.length < 8) return false;
        const buf = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        return buf.subarray(0, 8).equals(PNG_HEADER);
      },
      async decode(bytes) {
        const sharp = require("sharp");
        const { data: raw, info } = await sharp(bytes, { limitInputPixels: 4096 * 4096, pages: 1, animated: false }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        return {
          data: new Uint8ClampedArray(raw.buffer, raw.byteOffset, raw.byteLength),
          width: info.width,
          height: info.height
        };
      },
      async encode(image, options = {}) {
        const sharp = require("sharp");
        const raw = Buffer.isBuffer(image.data) ? image.data : Buffer.from(image.data.buffer, image.data.byteOffset, image.data.byteLength);
        let pipeline = sharp(raw, {
          raw: {
            width: image.width,
            height: image.height,
            channels: 4
          }
        });
        if (options.background) {
          pipeline = pipeline.flatten({ background: options.background });
        }
        const effort = options.effort !== void 0 ? Number(options.effort) : 4;
        return pipeline.png({
          compressionLevel: Math.max(0, Math.min(9, effort)),
          adaptiveFiltering: true
        }).toBuffer();
      }
    };
    module2.exports = {
      pngHandler
    };
  }
});

// packages/core/src/formats/jpeg.js
var require_jpeg = __commonJS({
  "packages/core/src/formats/jpeg.js"(exports2, module2) {
    "use strict";
    var jpegHandler = {
      name: "jpeg",
      mimeTypes: Object.freeze(["image/jpeg", "image/jpg"]),
      extensions: Object.freeze([".jpg", ".jpeg"]),
      supportsAlpha: false,
      isInput: true,
      isOutput: true,
      detect(bytes) {
        if (!bytes || bytes.length < 3) return false;
        return bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
      },
      async decode(bytes) {
        const sharp = require("sharp");
        const { data: raw, info } = await sharp(bytes, { limitInputPixels: 4096 * 4096, pages: 1, animated: false }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        return {
          data: new Uint8ClampedArray(raw.buffer, raw.byteOffset, raw.byteLength),
          width: info.width,
          height: info.height
        };
      },
      async encode(image, options = {}) {
        if (options.lossless) {
          throw new Error("JPEG output does not support lossless encoding.");
        }
        const sharp = require("sharp");
        const raw = Buffer.isBuffer(image.data) ? image.data : Buffer.from(image.data.buffer, image.data.byteOffset, image.data.byteLength);
        let hasAlpha = false;
        for (let i = 3; i < raw.length; i += 4) {
          if (raw[i] < 255) {
            hasAlpha = true;
            break;
          }
        }
        if (hasAlpha && !options.background) {
          throw new Error("JPEG cannot store transparency. Pass a background color to flatten the image, or choose WebP, PNG, or AVIF.");
        }
        let pipeline = sharp(raw, {
          raw: {
            width: image.width,
            height: image.height,
            channels: 4
          }
        });
        if (options.background && hasAlpha) {
          pipeline = pipeline.flatten({ background: options.background });
        }
        const quality = options.quality !== void 0 ? Math.max(1, Math.min(100, Number(options.quality))) : 85;
        return pipeline.jpeg({
          quality,
          mozjpeg: true
        }).toBuffer();
      }
    };
    module2.exports = {
      jpegHandler
    };
  }
});

// packages/core/src/formats/webp.js
var require_webp = __commonJS({
  "packages/core/src/formats/webp.js"(exports2, module2) {
    "use strict";
    var webpHandler = {
      name: "webp",
      mimeTypes: Object.freeze(["image/webp"]),
      extensions: Object.freeze([".webp"]),
      supportsAlpha: true,
      isInput: true,
      isOutput: true,
      detect(bytes) {
        if (!bytes || bytes.length < 12) return false;
        const buf = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        return buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP";
      },
      async decode(bytes) {
        const sharp = require("sharp");
        const { data: raw, info } = await sharp(bytes, { limitInputPixels: 4096 * 4096, pages: 1, animated: false }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        return {
          data: new Uint8ClampedArray(raw.buffer, raw.byteOffset, raw.byteLength),
          width: info.width,
          height: info.height
        };
      },
      async encode(image, options = {}) {
        const sharp = require("sharp");
        const raw = Buffer.isBuffer(image.data) ? image.data : Buffer.from(image.data.buffer, image.data.byteOffset, image.data.byteLength);
        let pipeline = sharp(raw, {
          raw: {
            width: image.width,
            height: image.height,
            channels: 4
          }
        });
        if (options.background) {
          pipeline = pipeline.flatten({ background: options.background });
        }
        const quality = options.quality !== void 0 ? Math.max(1, Math.min(100, Number(options.quality))) : 85;
        const effort = options.effort !== void 0 ? Number(options.effort) : 4;
        const lossless = Boolean(options.lossless);
        return pipeline.webp({
          quality,
          alphaQuality: 100,
          lossless,
          effort: Math.round(effort * 6 / 9)
        }).toBuffer();
      }
    };
    module2.exports = {
      webpHandler
    };
  }
});

// packages/core/src/formats/avif.js
var require_avif = __commonJS({
  "packages/core/src/formats/avif.js"(exports2, module2) {
    "use strict";
    var avifHandler = {
      name: "avif",
      mimeTypes: Object.freeze(["image/avif"]),
      extensions: Object.freeze([".avif"]),
      supportsAlpha: true,
      isInput: true,
      isOutput: true,
      detect(bytes) {
        if (!bytes || bytes.length < 12) return false;
        const buf = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        if (buf.subarray(4, 8).toString("ascii") === "ftyp") {
          const brands = buf.subarray(8, Math.min(buf.length, 4096)).toString("ascii");
          return brands.includes("avif") || brands.includes("avis");
        }
        return false;
      },
      async decode(bytes) {
        const sharp = require("sharp");
        const { data: raw, info } = await sharp(bytes, { limitInputPixels: 4096 * 4096, pages: 1, animated: false }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        return {
          data: new Uint8ClampedArray(raw.buffer, raw.byteOffset, raw.byteLength),
          width: info.width,
          height: info.height
        };
      },
      async encode(image, options = {}) {
        const sharp = require("sharp");
        const raw = Buffer.isBuffer(image.data) ? image.data : Buffer.from(image.data.buffer, image.data.byteOffset, image.data.byteLength);
        let pipeline = sharp(raw, {
          raw: {
            width: image.width,
            height: image.height,
            channels: 4
          }
        });
        if (options.background) {
          pipeline = pipeline.flatten({ background: options.background });
        }
        const quality = options.quality !== void 0 ? Math.max(1, Math.min(100, Number(options.quality))) : 85;
        const effort = options.effort !== void 0 ? Number(options.effort) : 4;
        const lossless = Boolean(options.lossless);
        return pipeline.avif({
          quality,
          lossless,
          effort: Math.max(0, Math.min(9, effort))
        }).toBuffer();
      }
    };
    module2.exports = {
      avifHandler
    };
  }
});

// packages/core/src/formats/gif.js
var require_gif = __commonJS({
  "packages/core/src/formats/gif.js"(exports2, module2) {
    "use strict";
    var gifHandler = {
      name: "gif",
      mimeTypes: Object.freeze(["image/gif"]),
      extensions: Object.freeze([".gif"]),
      supportsAlpha: true,
      isInput: true,
      isOutput: false,
      detect(bytes) {
        if (!bytes || bytes.length < 6) return false;
        const buf = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        const sig = buf.subarray(0, 6).toString("ascii");
        return sig === "GIF87a" || sig === "GIF89a";
      },
      async decode(bytes) {
        const sharp = require("sharp");
        const { data: raw, info } = await sharp(bytes, { limitInputPixels: 4096 * 4096, pages: 1, animated: false }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        return {
          data: new Uint8ClampedArray(raw.buffer, raw.byteOffset, raw.byteLength),
          width: info.width,
          height: info.height
        };
      },
      async encode() {
        throw new Error("GIF output encoding is not supported. Zap converts GIF to modern web formats (WebP, PNG, AVIF).");
      }
    };
    module2.exports = {
      gifHandler
    };
  }
});

// packages/core/src/formats/tiff.js
var require_tiff = __commonJS({
  "packages/core/src/formats/tiff.js"(exports2, module2) {
    "use strict";
    var tiffHandler = {
      name: "tiff",
      mimeTypes: Object.freeze(["image/tiff"]),
      extensions: Object.freeze([".tif", ".tiff"]),
      supportsAlpha: true,
      isInput: true,
      isOutput: false,
      detect(bytes) {
        if (!bytes || bytes.length < 4) return false;
        const buf = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        return buf.subarray(0, 4).equals(Buffer.from([73, 73, 42, 0])) || buf.subarray(0, 4).equals(Buffer.from([77, 77, 0, 42])) || buf.subarray(0, 4).equals(Buffer.from([73, 73, 43, 0])) || buf.subarray(0, 4).equals(Buffer.from([77, 77, 0, 43]));
      },
      async decode(bytes) {
        const sharp = require("sharp");
        const { data: raw, info } = await sharp(bytes, { limitInputPixels: 4096 * 4096, pages: 1, animated: false }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        return {
          data: new Uint8ClampedArray(raw.buffer, raw.byteOffset, raw.byteLength),
          width: info.width,
          height: info.height
        };
      },
      async encode() {
        throw new Error("TIFF output encoding is not supported. Zap converts TIFF to modern web formats (WebP, PNG, AVIF).");
      }
    };
    module2.exports = {
      tiffHandler
    };
  }
});

// packages/core/src/formats/index.js
var require_formats = __commonJS({
  "packages/core/src/formats/index.js"(exports2, module2) {
    "use strict";
    var {
      FormatRegistry,
      registry,
      registerFormat,
      getHandlerByName,
      getHandlerByMime,
      getHandlerByExtension,
      detectFormatHandler,
      getAllHandlers
    } = require_registry();
    var { svgHandler } = require_svg();
    var { pngHandler } = require_png();
    var { jpegHandler } = require_jpeg();
    var { webpHandler } = require_webp();
    var { avifHandler } = require_avif();
    var { gifHandler } = require_gif();
    var { tiffHandler } = require_tiff();
    registry.register(svgHandler);
    registry.register(pngHandler);
    registry.register(jpegHandler);
    registry.register(webpHandler);
    registry.register(avifHandler);
    registry.register(gifHandler);
    registry.register(tiffHandler);
    module2.exports = {
      FormatRegistry,
      registry,
      registerFormat,
      getHandlerByName,
      getHandlerByMime,
      getHandlerByExtension,
      detectFormatHandler,
      getAllHandlers,
      svgHandler,
      pngHandler,
      jpegHandler,
      webpHandler,
      avifHandler,
      gifHandler,
      tiffHandler
    };
  }
});

// packages/shared/src/defaults.js
var require_defaults = __commonJS({
  "packages/shared/src/defaults.js"(exports2, module2) {
    "use strict";
    var DEFAULT_OPTIONS3 = Object.freeze({
      scale: Object.freeze([1]),
      baseWidth: 512,
      quality: 85,
      effort: 4,
      lossless: false,
      clean: true,
      stripMetadata: true,
      outDir: "public/icons",
      maxBytes: 5 * 1024 * 1024,
      onConflict: "skip",
      emitManifest: true,
      fit: "contain",
      to: "webp",
      lockTarget: void 0,
      strict: true
    });
    var DEFAULT_CONVERSION_POLICY = Object.freeze({
      quality: Object.freeze({
        mode: "lossy",
        default: 85,
        perFormat: Object.freeze({})
      }),
      limits: Object.freeze({
        maxInputBytes: 5 * 1024 * 1024,
        maxOutputBytes: void 0,
        targetOutputBytes: void 0
      }),
      formats: Object.freeze({
        accept: Object.freeze([]),
        reject: Object.freeze([])
      }),
      advanced: Object.freeze({
        effort: 4,
        stripMetadata: true,
        preserveColorProfile: false
      })
    });
    module2.exports = {
      DEFAULT_OPTIONS: DEFAULT_OPTIONS3,
      DEFAULT_CONVERSION_POLICY
    };
  }
});

// packages/shared/src/constants.js
var require_constants = __commonJS({
  "packages/shared/src/constants.js"(exports2, module2) {
    "use strict";
    var APP_ORIGIN = "https://zapwebp.vercel.app";
    var DEFAULT_PORT = 3e3;
    var DEFAULT_TIMEOUT_MS = 3e4;
    var MAX_DIMENSION = 4096;
    var MAX_PIXELS = MAX_DIMENSION * MAX_DIMENSION;
    var MAX_SVG_DEPTH = 64;
    var MAX_DATA_URI_BYTES = 1e6;
    var DEFAULT_CACHE_CONTROL = "public, max-age=31536000, immutable";
    var ZAPWEBP_USER_AGENT = "zapwebp/1.2.0";
    module2.exports = {
      APP_ORIGIN,
      DEFAULT_PORT,
      DEFAULT_TIMEOUT_MS,
      MAX_DIMENSION,
      MAX_PIXELS,
      MAX_SVG_DEPTH,
      MAX_DATA_URI_BYTES,
      DEFAULT_CACHE_CONTROL,
      ZAPWEBP_USER_AGENT
    };
  }
});

// packages/shared/src/errors.js
var require_errors = __commonJS({
  "packages/shared/src/errors.js"(exports2, module2) {
    "use strict";
    var ZapwebpError3 = class extends Error {
      /**
       * @param {object} params
       * @param {string} params.code
       * @param {string} params.message
       * @param {string} [params.fix]
       * @param {string} [params.docs]
       * @param {number} [params.exitCode=1]
       * @param {object} [params.input]
       * @param {string} [params.target]
       * @param {object} [params.suggestedFix]
       */
      constructor({ code, message, fix, docs, exitCode = 1, input, target, suggestedFix, ...rest }) {
        super(message);
        this.name = "ZapwebpError";
        this.code = code;
        this.fix = fix || "";
        this.docs = docs || `https://zapwebp-docs.vercel.app/errors#${code}`;
        this.exitCode = exitCode;
        if (input !== void 0) this.input = input;
        if (target !== void 0) this.target = target;
        if (suggestedFix !== void 0) this.suggestedFix = suggestedFix;
        Object.assign(this, rest);
      }
    };
    var ERROR_CATALOG = Object.freeze({
      E_UNSUPPORTED_FORMAT: {
        code: "E_UNSUPPORTED_FORMAT",
        message: "Cannot decode this file into the locked target format.",
        fix: "Upload a supported format, or install the format plugin for this file."
      },
      E_ALPHA_NOT_REPRESENTABLE: {
        code: "E_ALPHA_NOT_REPRESENTABLE",
        message: "JPEG cannot store transparency. Pass a background color to flatten the image, or choose WebP, PNG, or AVIF.",
        fix: 'Pass --background "#ffffff" or choose WebP/PNG/AVIF.',
        suggestedFix: { background: "#ffffff" }
      },
      alpha_loss_forbidden: {
        code: "alpha_loss_forbidden",
        message: "JPEG cannot store transparency. Pass a background color to flatten the image, or choose WebP, PNG, or AVIF.",
        fix: 'Pass --background "#ffffff" or choose --to webp.'
      },
      file_empty: {
        code: "file_empty",
        message: "The input file is empty (0 bytes).",
        fix: "Verify the file source or complete the download before converting."
      },
      unsupported_format: {
        code: "unsupported_format",
        message: "Unsupported or unrecognized image format. Supported inputs: SVG, PNG, JPEG, WebP, AVIF, GIF, and TIFF.",
        fix: "Ensure the file format is supported or install a format expansion plugin."
      },
      svg_invalid: {
        code: "svg_invalid",
        message: "This file does not contain a valid SVG document.",
        fix: "Validate your SVG markup in an editor before converting."
      },
      svg_active_content: {
        code: "svg_active_content",
        message: "This SVG contains active content (<script>, <foreignObject>, or event handlers) and cannot be converted.",
        fix: "Sanitize the SVG to remove scripts or active tags."
      },
      svg_custom_entity: {
        code: "svg_custom_entity",
        message: "Custom XML entities are not supported.",
        fix: "Remove <!ENTITY> declarations from the SVG header."
      },
      svg_doctype_unsupported: {
        code: "svg_doctype_unsupported",
        message: "DOCTYPE declarations are not supported.",
        fix: "Remove <!DOCTYPE> declarations from the SVG header."
      },
      dimensions_exceeded: {
        code: "dimensions_exceeded",
        message: "Image dimensions exceed the 4096 px side or pixel-count limit.",
        fix: "Resize the asset or pass a smaller --width option."
      },
      options_invalid: {
        code: "options_invalid",
        message: "Conversion options must be an object.",
        fix: "Check the CLI flags or options object supplied."
      },
      E_EMPTY_FILE: {
        code: "E_EMPTY_FILE",
        message: "The input file is empty (0 bytes).",
        fix: "Ensure the file was downloaded or copied completely."
      },
      E_CORRUPT_HEADER: {
        code: "E_CORRUPT_HEADER",
        message: "File is too small to contain a valid container header.",
        fix: "The asset appears truncated or corrupt."
      },
      E_UNKNOWN_FORMAT: {
        code: "E_UNKNOWN_FORMAT",
        message: "The file header does not match any recognized format.",
        fix: "Check the file extension or install a community format plugin."
      },
      E_UNSAFE_SVG: {
        code: "E_UNSAFE_SVG",
        message: "SVG contains dangerous or active content.",
        fix: "Remove scripts, foreignObjects, or external URLs from the SVG."
      },
      E_PATH_TRAVERSAL: {
        code: "E_PATH_TRAVERSAL",
        message: "Path escapes working directory boundary.",
        fix: "Specify an input or output path inside the project root."
      },
      E_SSRF_BLOCKED: {
        code: "E_SSRF_BLOCKED",
        message: "Access to local networks, private subnets, and cloud metadata is forbidden.",
        fix: "Provide a publicly accessible HTTPS image URL."
      },
      E_UNSAFE_PROTOCOL: {
        code: "E_UNSAFE_PROTOCOL",
        message: "Only secure HTTPS URLs are permitted.",
        fix: "Use an https:// URL."
      },
      E_CLEAN_FAILED: {
        code: "E_CLEAN_FAILED",
        message: "Metadata handler failed to eliminate targeted metadata.",
        fix: "Inspect the file with zapwebp-lens and check metadata plugins."
      },
      E_CORRUPT_CONTAINER: {
        code: "E_CORRUPT_CONTAINER",
        message: "File container became unreadable after metadata stripping.",
        fix: "Check the metadata plugin implementation."
      },
      E_WRITE_LOCKED: {
        code: "E_WRITE_LOCKED",
        message: "Destination file is locked by another process.",
        fix: "Close any viewer or editor holding a file lock and retry."
      },
      E_WRITE_PERMISSION: {
        code: "E_WRITE_PERMISSION",
        message: "Permission denied writing to destination directory.",
        fix: "Verify write permissions for the destination folder."
      },
      E_READ_PERMISSION: {
        code: "E_READ_PERMISSION",
        message: "Permission denied reading input file.",
        fix: "Verify read permissions for the source file."
      },
      E_DISK_FULL: {
        code: "E_DISK_FULL",
        message: "No space left on device.",
        fix: "Free disk space and re-run conversion."
      },
      E_TOO_LARGE: {
        code: "E_TOO_LARGE",
        message: "Input file exceeds maximum allowed bytes limit.",
        fix: "Compress the input file or increase maxInputBytes in conversion policy."
      },
      E_INPUT_TOO_LARGE: {
        code: "E_INPUT_TOO_LARGE",
        message: "Input file exceeds maximum allowed bytes limit.",
        fix: "Compress the input file or increase maxInputBytes in conversion policy."
      },
      E_OUTPUT_TOO_LARGE: {
        code: "E_OUTPUT_TOO_LARGE",
        message: "Could not compress image below target output bytes limit.",
        fix: "Increase maxOutputBytes, adjust quality, or downscale image dimensions.",
        suggestedFix: { quality: 70 }
      },
      E_SYMLINK_LOOP: {
        code: "E_SYMLINK_LOOP",
        message: "Symlink cycle detected during path traversal.",
        fix: "Remove recursive symlinks or exclude the folder using ignore patterns."
      },
      E_TIMEOUT: {
        code: "E_TIMEOUT",
        message: "Image conversion exceeded the maximum timeout threshold.",
        fix: "Downscale the asset or increase conversion timeout configuration."
      },
      E_WASM_FAILED: {
        code: "E_WASM_FAILED",
        message: "WASM conversion engine failed to initialize.",
        fix: "Ensure WebAssembly is supported in your environment or use the native CLI."
      },
      E_NODE_VERSION: {
        code: "E_NODE_VERSION",
        message: "Current Node.js version is too old. Node.js >= 22.0.0 is required.",
        fix: "Upgrade your Node.js runtime to version 22 or later."
      },
      E_INVALID_CONFIG: {
        code: "E_INVALID_CONFIG",
        message: "Zapwebp configuration file is malformed or invalid.",
        fix: "Check the syntax and option keys in zapwebp.config.js or package.json."
      },
      E_UPLOADER_REQUIRED: {
        code: "E_UPLOADER_REQUIRED",
        message: "createZapStore requires an active conversion handler to convert images.",
        fix: "Provide an uploader callback function in initialConfig or upload options."
      },
      E_CROP_EMPTY: {
        code: "E_CROP_EMPTY",
        message: "The requested crop region has zero or negative dimensions.",
        fix: "Specify valid non-zero crop coordinates within image bounds."
      },
      E_MODEL_FAILED: {
        code: "E_MODEL_FAILED",
        message: "AI detection model failed to load or initialize.",
        fix: "Verify WASM runtime access or fall back to Smart-Subject mode.",
        suggestedFix: { mode: "subject", strategy: "attention" }
      },
      E_RATE_LIMIT: {
        code: "E_RATE_LIMIT",
        message: "Too many requests. Rate limit threshold exceeded.",
        fix: "Wait a few moments before submitting additional requests."
      },
      E_AUTH: {
        code: "E_AUTH",
        message: "Authentication credentials for storage provider are invalid or expired.",
        fix: "Verify API keys, service tokens, or environment credentials."
      },
      E_STORAGE: {
        code: "E_STORAGE",
        message: "Storage provider returned an unhandled error during write or read.",
        fix: "Check remote storage bucket permissions and connection status."
      },
      E_FORMAT_REJECTED: {
        code: "E_FORMAT_REJECTED",
        message: "Image format is rejected by conversion policy allowlist or denylist.",
        fix: "Update accepted formats policy or supply an allowed image file."
      },
      E_UNSUPPORTED_LOCALE: {
        code: "E_UNSUPPORTED_LOCALE",
        message: "Requested locale is not supported.",
        fix: "Choose a supported locale (e.g. en, tl)."
      }
    });
    module2.exports = {
      ZapwebpError: ZapwebpError3,
      ERROR_CATALOG
    };
  }
});

// packages/shared/src/security.js
var require_security = __commonJS({
  "packages/shared/src/security.js"(exports2, module2) {
    "use strict";
    var net = require("node:net");
    function isPrivateIp(hostname) {
      if (!hostname) return true;
      const host = String(hostname).toLowerCase().trim().replace(/^\[|\]$/g, "");
      if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal") || host === "broadcasthost" || host === "0.0.0.0") {
        return true;
      }
      if (net.isIPv4(host)) {
        const parts = host.split(".").map(Number);
        const [a, b] = parts;
        if (a === 0) return true;
        if (a === 127) return true;
        if (a === 10) return true;
        if (a === 172 && b >= 16 && b <= 31) return true;
        if (a === 192 && b === 168) return true;
        if (a === 169 && b === 254) return true;
        if (a === 100 && b >= 64 && b <= 127) return true;
        return false;
      }
      if (net.isIPv6(host)) {
        if (host === "::1" || host === "::") return true;
        if (host.startsWith("fe80:") || host.startsWith("fe90:") || host.startsWith("fea0:") || host.startsWith("feb0:")) {
          return true;
        }
        if (host.startsWith("fc") || host.startsWith("fd")) return true;
        if (host.startsWith("::ffff:")) {
          const v4part = host.slice(7);
          if (net.isIPv4(v4part)) {
            return isPrivateIp(v4part);
          }
        }
        return false;
      }
      return false;
    }
    function validateSafeUrl(urlStr) {
      let parsed;
      try {
        parsed = new URL(urlStr);
      } catch {
        const err2 = new Error(`Invalid URL format: "${urlStr}"`);
        err2.code = "E_UNSAFE_URL";
        throw err2;
      }
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        const err2 = new Error(`Unsupported URL protocol "${parsed.protocol}". Only HTTP and HTTPS are permitted.`);
        err2.code = "E_UNSAFE_URL";
        throw err2;
      }
      if (isPrivateIp(parsed.hostname)) {
        const err2 = new Error(`Access to private, loopback, or link-local network address "${parsed.hostname}" is forbidden.`);
        err2.code = "E_UNSAFE_URL";
        throw err2;
      }
      return parsed;
    }
    module2.exports = {
      isPrivateIp,
      validateSafeUrl
    };
  }
});

// packages/shared/src/i18n.js
var require_i18n = __commonJS({
  "packages/shared/src/i18n.js"(exports2, module2) {
    "use strict";
    var SUPPORTED_LOCALES = Object.freeze(["en", "tl"]);
    var activeLocale = "en";
    var localeCache = /* @__PURE__ */ new Map();
    localeCache.set("en", {
      "dropzone.placeholder": "Drop, paste, or browse",
      "dropzone.hint": "Images, URLs, or SVG code",
      "button.convert": "Convert",
      "button.cancel": "Cancel",
      "button.batch": "Batch",
      "button.download": "Download",
      "button.crop": "Crop",
      "settings.quality": "Quality",
      "settings.clean": "Clean Mode",
      "crop.title": "Crop Image",
      "toast.success": "{{count}} file(s) converted",
      "toast.error": "Error: {{message}}",
      "cli.help": "Convert and optimize common image formats from your terminal."
    });
    localeCache.set("tl", {
      "dropzone.placeholder": "I-drop, i-paste, o i-browse",
      "dropzone.hint": "Mga larawan, URL, o SVG code",
      "button.convert": "I-convert",
      "button.cancel": "Kanselahin",
      "button.batch": "Maramihan",
      "button.download": "I-download",
      "button.crop": "I-crop",
      "settings.quality": "Kalidad",
      "settings.clean": "Malinis na Mode",
      "crop.title": "I-crop ang Imahe",
      "toast.success": "{{count}} (na) file ang na-convert",
      "toast.error": "May error: {{message}}",
      "cli.help": "I-convert at i-optimize ang mga format ng imahe mula sa iyong terminal."
    });
    function setLocale2(locale) {
      if (!locale) return;
      const normalized = String(locale).toLowerCase().split(/[-_]/)[0];
      if (SUPPORTED_LOCALES.includes(normalized)) {
        activeLocale = normalized;
      }
    }
    function getLocale() {
      return activeLocale;
    }
    function registerTranslations(locale, strings) {
      if (!locale || !strings || typeof strings !== "object") return;
      const current = localeCache.get(locale) || {};
      localeCache.set(locale, { ...current, ...strings });
    }
    function t2(key, vars = {}) {
      const current = localeCache.get(activeLocale) || {};
      const english = localeCache.get("en") || {};
      let text = current[key] ?? english[key] ?? key;
      if (vars && typeof vars === "object") {
        for (const [k, v] of Object.entries(vars)) {
          text = text.replace(new RegExp(`{{\\s*${k}\\s*}}`, "g"), String(v));
        }
      }
      return text;
    }
    module2.exports = {
      SUPPORTED_LOCALES,
      setLocale: setLocale2,
      getLocale,
      registerTranslations,
      t: t2
    };
  }
});

// packages/shared/src/index.js
var require_src = __commonJS({
  "packages/shared/src/index.js"(exports2, module2) {
    "use strict";
    var { DEFAULT_OPTIONS: DEFAULT_OPTIONS3, DEFAULT_CONVERSION_POLICY } = require_defaults();
    var {
      APP_ORIGIN,
      DEFAULT_PORT,
      DEFAULT_TIMEOUT_MS,
      MAX_DIMENSION,
      MAX_PIXELS,
      MAX_SVG_DEPTH,
      MAX_DATA_URI_BYTES,
      DEFAULT_CACHE_CONTROL,
      ZAPWEBP_USER_AGENT
    } = require_constants();
    var { ERROR_CATALOG, ZapwebpError: ZapwebpError3 } = require_errors();
    var { isPrivateIp, validateSafeUrl } = require_security();
    var i18n = require_i18n();
    var INPUT_FORMATS3 = Object.freeze(["svg", "png", "jpeg", "webp", "avif", "gif", "tiff"]);
    var OUTPUT_FORMATS2 = Object.freeze(["webp", "png", "jpeg", "avif"]);
    var ALPHA_FORMATS = Object.freeze(["svg", "png", "webp", "avif", "gif", "tiff"]);
    var MIME_MAP = Object.freeze({
      svg: "image/svg+xml",
      png: "image/png",
      jpeg: "image/jpeg",
      webp: "image/webp",
      avif: "image/avif",
      gif: "image/gif",
      tiff: "image/tiff"
    });
    var EXT_MAP = Object.freeze({
      svg: [".svg"],
      png: [".png"],
      jpeg: [".jpg", ".jpeg"],
      webp: [".webp"],
      avif: [".avif"],
      gif: [".gif"],
      tiff: [".tif", ".tiff"]
    });
    function getSupportedPairs() {
      const pairs = [];
      for (const from of INPUT_FORMATS3) {
        for (const to of OUTPUT_FORMATS2) {
          if (from !== to) {
            pairs.push({ from, to, slug: `${from}-to-${to}` });
          }
        }
      }
      return Object.freeze(pairs);
    }
    var supportedPairs = getSupportedPairs();
    function supportsAlpha(format) {
      return ALPHA_FORMATS.includes(String(format).toLowerCase());
    }
    function getMimeType(format) {
      const normalized = format === "jpg" ? "jpeg" : String(format).toLowerCase();
      return MIME_MAP[normalized] || "application/octet-stream";
    }
    function getCanonicalUrl(routePath = "") {
      const cleaned = routePath.startsWith("/") ? routePath : `/${routePath}`;
      return `${APP_ORIGIN}${cleaned}`;
    }
    module2.exports = {
      APP_ORIGIN,
      DEFAULT_PORT,
      DEFAULT_TIMEOUT_MS,
      MAX_DIMENSION,
      MAX_PIXELS,
      MAX_SVG_DEPTH,
      MAX_DATA_URI_BYTES,
      DEFAULT_CACHE_CONTROL,
      ZAPWEBP_USER_AGENT,
      DEFAULT_OPTIONS: DEFAULT_OPTIONS3,
      DEFAULT_CONVERSION_POLICY,
      ERROR_CATALOG,
      ZapwebpError: ZapwebpError3,
      i18n,
      t: i18n.t,
      setLocale: i18n.setLocale,
      getLocale: i18n.getLocale,
      registerTranslations: i18n.registerTranslations,
      SUPPORTED_LOCALES: i18n.SUPPORTED_LOCALES,
      INPUT_FORMATS: INPUT_FORMATS3,
      OUTPUT_FORMATS: OUTPUT_FORMATS2,
      ALPHA_FORMATS,
      MIME_MAP,
      EXT_MAP,
      supportedPairs,
      getSupportedPairs,
      supportsAlpha,
      getMimeType,
      getCanonicalUrl,
      isPrivateIp,
      validateSafeUrl
    };
  }
});

// packages/core/src/metadata/registry.js
var require_registry2 = __commonJS({
  "packages/core/src/metadata/registry.js"(exports2, module2) {
    "use strict";
    var { ZapwebpError: ZapwebpError3 } = require_src();
    var MetadataRegistry = class {
      constructor() {
        this._handlers = /* @__PURE__ */ new Map();
      }
      /**
       * Registers a metadata handler.
       * @param {MetadataHandler} handler
       */
      register(handler) {
        if (!handler || typeof handler !== "object") {
          throw new TypeError("Metadata handler must be an object.");
        }
        if (!handler.name || typeof handler.name !== "string") {
          throw new TypeError("Metadata handler must declare a string name.");
        }
        if (typeof handler.inspect !== "function" || typeof handler.strip !== "function") {
          throw new TypeError(`Metadata handler "${handler.name}" must implement inspect() and strip().`);
        }
        this._handlers.set(handler.name.toLowerCase(), handler);
      }
      /**
       * Gets a handler by name.
       * @param {string} name
       * @returns {MetadataHandler | undefined}
       */
      getByName(name) {
        if (!name) return void 0;
        return this._handlers.get(String(name).toLowerCase());
      }
      /**
       * Returns all registered handlers.
       * @returns {MetadataHandler[]}
       */
      getAll() {
        return Array.from(this._handlers.values());
      }
      /**
       * Runs inspection across all active handlers.
       * @param {Uint8Array | Buffer} bytes
       * @param {object} [options]
       * @param {string[]} [options.strip] - Handler names to apply
       * @param {string[]} [options.keep] - Handler names to skip
       * @returns {Promise<MetadataField[]>}
       */
      async inspect(bytes, options = {}) {
        const active = this._resolveHandlers(options);
        const fields = [];
        for (const handler of active) {
          try {
            const found = await handler.inspect(bytes);
            if (Array.isArray(found)) fields.push(...found);
          } catch {
          }
        }
        return fields;
      }
      /**
       * Strips metadata using registered handlers with Zero-Trust verification.
       * @param {Uint8Array | Buffer} bytes
       * @param {object} [options]
       * @returns {Promise<{ output: Buffer, removed: MetadataField[], kept: MetadataField[] }>}
       */
      async clean(bytes, options = {}) {
        const activeHandlers = this._resolveHandlers(options);
        const removed = [];
        const kept = [];
        for (const handler of this.getAll()) {
          const isTarget = activeHandlers.some((h) => h.name.toLowerCase() === handler.name.toLowerCase());
          try {
            const found = await handler.inspect(bytes);
            if (Array.isArray(found) && found.length) {
              if (isTarget) {
                removed.push(...found);
              } else {
                kept.push(...found);
              }
            }
          } catch {
          }
        }
        if (removed.length === 0) {
          const buf = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
          return { output: buf, removed: [], kept };
        }
        let current = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
        for (const handler of activeHandlers) {
          try {
            const stripped = await handler.strip(current, options);
            current = Buffer.isBuffer(stripped) ? stripped : Buffer.from(stripped);
          } catch (err2) {
            throw new ZapwebpError3({
              code: "E_CLEAN_FAILED",
              message: `Metadata handler "${handler.name}" failed: ${err2.message}`
            });
          }
        }
        try {
          if (current.length >= 16) {
            const sharp = require("sharp");
            await sharp(current, { failOn: "none" }).metadata();
          }
        } catch {
          const str = current.toString("utf8");
          if (!str.includes("<svg")) {
            throw new ZapwebpError3({
              code: "E_CORRUPT_CONTAINER",
              message: "Output image became unreadable following metadata stripping."
            });
          }
        }
        for (const handler of activeHandlers) {
          const remaining = await handler.inspect(current).catch(() => []);
          if (Array.isArray(remaining) && remaining.length > 0) {
            throw new ZapwebpError3({
              code: "E_CLEAN_FAILED",
              message: `Zero-Trust verification failed: Handler "${handler.name}" left ${remaining.length} metadata item(s) in container.`,
              fix: "Review metadata handler strip implementation."
            });
          }
        }
        return { output: current, removed, kept };
      }
      /**
       * Resolves active handlers based on --strip and --keep filters.
       * @private
       */
      _resolveHandlers(options = {}) {
        const all = this.getAll();
        const keep = Array.isArray(options.keep) ? options.keep.map((k) => k.toLowerCase()) : [];
        const strip = Array.isArray(options.strip) ? options.strip.map((s) => s.toLowerCase()) : [];
        if (strip.length > 0) {
          return all.filter((h) => strip.includes(h.name.toLowerCase()) && !keep.includes(h.name.toLowerCase()));
        }
        if (keep.length > 0) {
          return all.filter((h) => !keep.includes(h.name.toLowerCase()));
        }
        return all;
      }
    };
    var metadataRegistry = new MetadataRegistry();
    module2.exports = {
      MetadataRegistry,
      metadataRegistry,
      registerMetadataHandler: (handler) => metadataRegistry.register(handler),
      getMetadataHandlers: () => metadataRegistry.getAll(),
      getMetadataHandlerByName: (name) => metadataRegistry.getByName(name),
      cleanBytes: (bytes, options) => metadataRegistry.clean(bytes, options)
    };
  }
});

// packages/core/src/metadata/exif.js
var require_exif = __commonJS({
  "packages/core/src/metadata/exif.js"(exports2, module2) {
    "use strict";
    var exifHandler = {
      name: "exif",
      async inspect(bytes) {
        const data = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
        const fields = [];
        if (data.includes(Buffer.from("eXIf"))) {
          fields.push({ type: "EXIF", key: "PNG-eXIf", value: "present", offset: data.indexOf("eXIf") });
        }
        if (data.length >= 4 && data[0] === 255 && data[1] === 216) {
          const idx = data.indexOf(Buffer.from("Exif\0\0"));
          if (idx !== -1) {
            fields.push({ type: "EXIF", key: "JPEG-Exif", value: "present", offset: idx });
          }
        }
        if (data.includes(Buffer.from("EXIF"))) {
          fields.push({ type: "EXIF", key: "WebP-EXIF", value: "present", offset: data.indexOf("EXIF") });
        }
        return fields;
      },
      async strip(bytes) {
        const data = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
        try {
          const sharp = require("sharp");
          const meta = await sharp(data).metadata();
          if (!meta.format) return data;
          return await sharp(data).toBuffer();
        } catch {
          return data;
        }
      }
    };
    module2.exports = { exifHandler };
  }
});

// packages/core/src/metadata/xmp.js
var require_xmp = __commonJS({
  "packages/core/src/metadata/xmp.js"(exports2, module2) {
    "use strict";
    var xmpHandler = {
      name: "xmp",
      async inspect(bytes) {
        const data = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
        const fields = [];
        const sample = data.subarray(0, Math.min(data.length, 16384)).toString("utf8");
        if (/<(?:rdf:RDF|xmp:CreatorTool|xmpMM:)/i.test(sample)) {
          fields.push({ type: "XMP", key: "XML-Packet", value: "present", offset: 0 });
        }
        if (data.includes(Buffer.from("http://ns.adobe.com/xap/1.0/")) || data.includes(Buffer.from("XMP "))) {
          fields.push({ type: "XMP", key: "Adobe-XMP", value: "present", offset: data.indexOf("http://ns.adobe.com") });
        }
        return fields;
      },
      async strip(bytes) {
        const data = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
        const text = data.toString("utf8");
        if (text.includes("<svg")) {
          const cleaned = text.replace(/<metadata[\s\S]*?<\/metadata>/gi, "").replace(/<rdf:RDF[\s\S]*?<\/rdf:RDF>/gi, "");
          return Buffer.from(cleaned, "utf8");
        }
        try {
          const sharp = require("sharp");
          const meta = await sharp(data).metadata();
          if (!meta.format) return data;
          return await sharp(data).toBuffer();
        } catch {
          return data;
        }
      }
    };
    module2.exports = { xmpHandler };
  }
});

// packages/core/src/metadata/c2pa.js
var require_c2pa = __commonJS({
  "packages/core/src/metadata/c2pa.js"(exports2, module2) {
    "use strict";
    var c2paHandler = {
      name: "c2pa",
      async inspect(bytes) {
        const data = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
        const fields = [];
        if (data.includes(Buffer.from("c2pa")) || data.includes(Buffer.from("jumb"))) {
          fields.push({ type: "C2PA", key: "Provenance-Manifest", value: "present", offset: Math.max(data.indexOf("c2pa"), data.indexOf("jumb")) });
        }
        return fields;
      },
      async strip(bytes) {
        const data = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
        try {
          const sharp = require("sharp");
          const meta = await sharp(data).metadata();
          if (!meta.format) return data;
          return await sharp(data).toBuffer();
        } catch {
          return data;
        }
      }
    };
    module2.exports = { c2paHandler };
  }
});

// packages/core/src/metadata/png-text.js
var require_png_text = __commonJS({
  "packages/core/src/metadata/png-text.js"(exports2, module2) {
    "use strict";
    var pngTextHandler = {
      name: "png-text",
      async inspect(bytes) {
        const data = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
        const fields = [];
        for (const chunk of ["tEXt", "iTXt", "zTXt", "tIME", "pHYs"]) {
          if (data.includes(Buffer.from(chunk))) {
            fields.push({ type: "PNG-tEXt", key: chunk, value: "present", offset: data.indexOf(chunk) });
          }
        }
        return fields;
      },
      async strip(bytes) {
        const data = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
        try {
          const sharp = require("sharp");
          const meta = await sharp(data).metadata();
          if (!meta.format) return data;
          return await sharp(data).toBuffer();
        } catch {
          return data;
        }
      }
    };
    module2.exports = { pngTextHandler };
  }
});

// packages/core/src/metadata/icc.js
var require_icc = __commonJS({
  "packages/core/src/metadata/icc.js"(exports2, module2) {
    "use strict";
    var iccHandler = {
      name: "icc",
      async inspect(bytes) {
        const data = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
        const fields = [];
        if (data.includes(Buffer.from("ICC_PROFILE")) || data.includes(Buffer.from("ICCP"))) {
          fields.push({ type: "ICC", key: "Color-Profile", value: "present", offset: Math.max(data.indexOf("ICC_PROFILE"), data.indexOf("ICCP")) });
        }
        return fields;
      },
      async strip(bytes) {
        const data = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
        try {
          const sharp = require("sharp");
          const meta = await sharp(data).metadata();
          if (!meta.format) return data;
          return await sharp(data).toBuffer();
        } catch {
          return data;
        }
      }
    };
    module2.exports = { iccHandler };
  }
});

// packages/core/src/metadata/index.js
var require_metadata = __commonJS({
  "packages/core/src/metadata/index.js"(exports2, module2) {
    "use strict";
    var {
      MetadataRegistry,
      metadataRegistry,
      registerMetadataHandler,
      getMetadataHandlers,
      getMetadataHandlerByName,
      cleanBytes
    } = require_registry2();
    var { exifHandler } = require_exif();
    var { xmpHandler } = require_xmp();
    var { c2paHandler } = require_c2pa();
    var { pngTextHandler } = require_png_text();
    var { iccHandler } = require_icc();
    metadataRegistry.register(exifHandler);
    metadataRegistry.register(xmpHandler);
    metadataRegistry.register(c2paHandler);
    metadataRegistry.register(pngTextHandler);
    metadataRegistry.register(iccHandler);
    module2.exports = {
      MetadataRegistry,
      metadataRegistry,
      registerMetadataHandler,
      getMetadataHandlers,
      getMetadataHandlerByName,
      cleanBytes,
      exifHandler,
      xmpHandler,
      c2paHandler,
      pngTextHandler,
      iccHandler
    };
  }
});

// packages/core/src/policy.js
var require_policy = __commonJS({
  "packages/core/src/policy.js"(exports2, module2) {
    "use strict";
    var { DEFAULT_CONVERSION_POLICY, ZapwebpError: ZapwebpError3 } = require_src();
    function resolvePolicy(customPolicy = {}, optionsFallback = {}) {
      const policy = customPolicy || {};
      const qualityConfig = policy.quality || {};
      let mode = qualityConfig.mode || (optionsFallback.lossless ? "lossless" : void 0);
      if (!mode) mode = DEFAULT_CONVERSION_POLICY.quality.mode;
      if (!["lossy", "lossless", "auto"].includes(mode)) {
        throw new Error(`Policy quality.mode must be 'lossy', 'lossless', or 'auto' (received "${mode}").`);
      }
      const defaultQuality = qualityConfig.default !== void 0 ? Number(qualityConfig.default) : optionsFallback.quality !== void 0 ? Number(optionsFallback.quality) : DEFAULT_CONVERSION_POLICY.quality.default;
      if (!Number.isInteger(defaultQuality) || defaultQuality < 1 || defaultQuality > 100) {
        throw new Error("Policy quality.default must be an integer between 1 and 100.");
      }
      const perFormat = {};
      if (qualityConfig.perFormat && typeof qualityConfig.perFormat === "object") {
        for (const [fmt, q] of Object.entries(qualityConfig.perFormat)) {
          const normalizedFmt = fmt.toLowerCase() === "jpg" ? "jpeg" : fmt.toLowerCase();
          const numQ = Number(q);
          if (Number.isInteger(numQ) && numQ >= 1 && numQ <= 100) {
            perFormat[normalizedFmt] = numQ;
          }
        }
      }
      const limitsConfig = policy.limits || {};
      const maxInputBytes = limitsConfig.maxInputBytes !== void 0 ? Number(limitsConfig.maxInputBytes) : optionsFallback.maxBytes !== void 0 ? Number(optionsFallback.maxBytes) : DEFAULT_CONVERSION_POLICY.limits.maxInputBytes;
      if (!Number.isFinite(maxInputBytes) || maxInputBytes <= 0) {
        throw new Error("Policy limits.maxInputBytes must be a positive number.");
      }
      const maxOutputBytes = limitsConfig.maxOutputBytes !== void 0 ? Number(limitsConfig.maxOutputBytes) : optionsFallback.maxOutputBytes !== void 0 ? Number(optionsFallback.maxOutputBytes) : void 0;
      const targetOutputBytes = limitsConfig.targetOutputBytes !== void 0 ? Number(limitsConfig.targetOutputBytes) : optionsFallback.targetOutputBytes !== void 0 ? Number(optionsFallback.targetOutputBytes) : void 0;
      const formatsConfig = policy.formats || {};
      const normalizeList = (list, fallbackStr) => {
        if (Array.isArray(list)) {
          return list.map((f) => String(f).toLowerCase().trim() === "jpg" ? "jpeg" : String(f).toLowerCase().trim()).filter(Boolean);
        }
        if (typeof list === "string") {
          return list.split(",").map((f) => f.toLowerCase().trim() === "jpg" ? "jpeg" : f.toLowerCase().trim()).filter(Boolean);
        }
        if (fallbackStr && typeof fallbackStr === "string") {
          return fallbackStr.split(",").map((f) => f.toLowerCase().trim() === "jpg" ? "jpeg" : f.toLowerCase().trim()).filter(Boolean);
        }
        return [];
      };
      const accept = normalizeList(formatsConfig.accept, optionsFallback.accept);
      const reject = normalizeList(formatsConfig.reject, optionsFallback.reject);
      const advancedConfig = policy.advanced || {};
      const effort = advancedConfig.effort !== void 0 ? Number(advancedConfig.effort) : optionsFallback.effort !== void 0 ? Number(optionsFallback.effort) : DEFAULT_CONVERSION_POLICY.advanced.effort;
      const stripMetadata = advancedConfig.stripMetadata !== void 0 ? Boolean(advancedConfig.stripMetadata) : optionsFallback.clean !== void 0 ? Boolean(optionsFallback.clean) : DEFAULT_CONVERSION_POLICY.advanced.stripMetadata;
      const preserveColorProfile = advancedConfig.preserveColorProfile !== void 0 ? Boolean(advancedConfig.preserveColorProfile) : DEFAULT_CONVERSION_POLICY.advanced.preserveColorProfile;
      return {
        quality: {
          mode,
          default: defaultQuality,
          perFormat
        },
        limits: {
          maxInputBytes,
          maxOutputBytes,
          targetOutputBytes
        },
        formats: {
          accept,
          reject
        },
        advanced: {
          effort,
          stripMetadata,
          preserveColorProfile
        }
      };
    }
    function checkPolicyInput({ policy, data, detectedFormat }) {
      if (!policy || !data) return;
      if (policy.limits?.maxInputBytes && data.length > policy.limits.maxInputBytes) {
        throw new ZapwebpError3({
          code: "E_INPUT_TOO_LARGE",
          message: `Input is ${data.length} bytes, max is ${policy.limits.maxInputBytes}.`,
          fix: "Compress the file, or increase maxInputBytes.",
          inputBytes: data.length,
          maxBytes: policy.limits.maxInputBytes,
          suggestedFix: {
            maxInputBytes: Math.ceil(data.length * 1.05),
            reason: "Input exceeds maximum allowed ingress bytes."
          }
        });
      }
      const fmt = (detectedFormat || "").toLowerCase() === "jpg" ? "jpeg" : (detectedFormat || "").toLowerCase();
      const acceptList = policy.formats?.accept || [];
      const rejectList = policy.formats?.reject || [];
      if (fmt) {
        if (acceptList.length > 0 && !acceptList.includes(fmt)) {
          throw new ZapwebpError3({
            code: "E_FORMAT_REJECTED",
            message: `Format "${fmt}" is not in the accept list.`,
            fix: `Add "${fmt}" to accept, or upload a supported format.`,
            detected: fmt,
            allowed: acceptList,
            suggestedFix: {
              accept: [...acceptList, fmt],
              reason: `Format "${fmt}" was rejected because it is not in the policy allowlist.`
            }
          });
        }
        if (rejectList.includes(fmt)) {
          throw new ZapwebpError3({
            code: "E_FORMAT_REJECTED",
            message: `Format "${fmt}" is in the reject list.`,
            fix: `Remove "${fmt}" from reject, or upload a different file.`,
            detected: fmt,
            rejected: rejectList,
            suggestedFix: {
              reject: rejectList.filter((f) => f !== fmt),
              reason: `Format "${fmt}" was rejected by policy denylist.`
            }
          });
        }
      }
    }
    function evaluateQuality({ policy, inputFormat, inputBytes = 0, hasAlpha = false, targetFormat = "webp" }) {
      const normInput = (inputFormat || "").toLowerCase() === "jpg" ? "jpeg" : (inputFormat || "").toLowerCase();
      const normTarget = (targetFormat || "").toLowerCase() === "jpg" ? "jpeg" : (targetFormat || "").toLowerCase();
      let mode = policy.quality.mode;
      let quality = policy.quality.default;
      let lossless = false;
      if (mode === "lossless") {
        lossless = true;
        quality = 100;
      } else if (mode === "auto") {
        if (normInput === "svg") {
          lossless = true;
          quality = 100;
        } else if (normInput === "png" && inputBytes < 1e5) {
          lossless = true;
          quality = 100;
        } else if (normInput === "jpeg") {
          lossless = false;
          quality = 75;
        } else if (hasAlpha) {
          lossless = false;
          quality = 90;
        } else {
          lossless = false;
          quality = 80;
        }
      } else {
        lossless = false;
        quality = policy.quality.default;
      }
      if (policy.quality.perFormat) {
        if (policy.quality.perFormat[normInput] !== void 0) {
          quality = policy.quality.perFormat[normInput];
        } else if (policy.quality.perFormat[normTarget] !== void 0) {
          quality = policy.quality.perFormat[normTarget];
        }
      }
      quality = Math.max(1, Math.min(100, Math.round(quality)));
      if (normTarget === "jpeg") {
        lossless = false;
      }
      return {
        quality,
        lossless,
        mode,
        targetQuality: quality
      };
    }
    module2.exports = {
      resolvePolicy,
      checkPolicyInput,
      evaluateQuality
    };
  }
});

// packages/core/package.json
var require_package = __commonJS({
  "packages/core/package.json"(exports2, module2) {
    module2.exports = {
      name: "@zapwebp/core",
      version: "1.1.1",
      description: "Format-aware image conversion engine with transparency-safe outputs.",
      main: "src/index.js",
      types: "src/index.d.ts",
      exports: {
        ".": {
          types: "./src/index.d.ts",
          default: "./src/index.js"
        }
      },
      files: [
        "src",
        "README.md",
        "LICENSE"
      ],
      license: "MIT",
      scripts: {
        test: "node --test"
      },
      engines: {
        node: ">=22"
      },
      dependencies: {
        "@resvg/resvg-js": "^2.6.2",
        "@zapwebp/shared": "workspace:*",
        sharp: "^0.35.5"
      },
      publishConfig: {
        access: "public"
      },
      homepage: "https://zapwebp.vercel.app",
      repository: {
        type: "git",
        url: "https://github.com/Zapwebp/core.git"
      },
      bugs: {
        url: "https://github.com/Zapwebp/core/issues"
      },
      author: "Eldrex Delos Reyes Bula <eldrexdelosreyesbula@gmail.com>"
    };
  }
});

// packages/core/src/registry/transforms.js
var require_transforms = __commonJS({
  "packages/core/src/registry/transforms.js"(exports2, module2) {
    "use strict";
    var TransformRegistry = class {
      constructor() {
        this._transforms = /* @__PURE__ */ new Map();
      }
      /**
       * Registers a transform step.
       * @param {TransformStep} transform
       */
      register(transform) {
        if (!transform || typeof transform !== "object") {
          throw new TypeError("Transform step must be an object.");
        }
        if (!transform.name || typeof transform.name !== "string") {
          throw new TypeError("Transform step must declare a string name.");
        }
        if (typeof transform.apply !== "function") {
          throw new TypeError(`Transform step "${transform.name}" must implement an apply() function.`);
        }
        this._transforms.set(transform.name.toLowerCase(), transform);
      }
      /**
       * Retrieves a registered transform by name.
       * @param {string} name
       * @returns {TransformStep | undefined}
       */
      getByName(name) {
        if (!name) return void 0;
        return this._transforms.get(String(name).toLowerCase());
      }
      /**
       * Returns all registered transforms.
       * @returns {TransformStep[]}
       */
      getAll() {
        return Array.from(this._transforms.values());
      }
    };
    var transformRegistry = new TransformRegistry();
    function registerTransform(transform) {
      transformRegistry.register(transform);
    }
    function getTransforms() {
      return transformRegistry.getAll();
    }
    module2.exports = {
      TransformRegistry,
      transformRegistry,
      registerTransform,
      getTransforms,
      getTransformByName: (name) => transformRegistry.getByName(name)
    };
  }
});

// packages/core/src/index.js
var require_src2 = __commonJS({
  "packages/core/src/index.js"(exports2, module2) {
    "use strict";
    var path7 = require("node:path");
    var crypto3 = require("node:crypto");
    var formats = require_formats();
    var metadata = require_metadata();
    var {
      MAX_DIMENSION,
      MAX_PIXELS,
      INPUT_FORMATS: INPUT_FORMATS3,
      OUTPUT_FORMATS: OUTPUT_FORMATS2,
      DEFAULT_OPTIONS: DEFAULT_OPTIONS3,
      ZapwebpError: ZapwebpError3
    } = require_src();
    var {
      resolvePolicy,
      checkPolicyInput,
      evaluateQuality
    } = require_policy();
    var _sharpInstance = null;
    function getSharp() {
      if (_sharpInstance) return _sharpInstance;
      try {
        _sharpInstance = require("sharp");
        return _sharpInstance;
      } catch (err2) {
        throw new ZapwebpError3({
          code: "E_ENGINE_UNAVAILABLE",
          message: "Native raster engine (sharp) is not available in this environment: " + (err2 && err2.message ? err2.message : String(err2)),
          fix: 'Install sharp via "npm install sharp" or ensure native prebuilts are compiled for this architecture.'
        });
      }
    }
    var _resvgInstance = null;
    function getResvg() {
      if (_resvgInstance) return _resvgInstance;
      try {
        const mod = require("@resvg/resvg-js");
        _resvgInstance = mod.Resvg || mod;
        return _resvgInstance;
      } catch (err2) {
        throw new ZapwebpError3({
          code: "E_ENGINE_UNAVAILABLE",
          message: "Native vector engine (@resvg/resvg-js) is not available in this environment: " + (err2 && err2.message ? err2.message : String(err2)),
          fix: "Install @resvg/resvg-js or ensure native prebuilts are compiled for this architecture."
        });
      }
    }
    var MAX_WIDTH = MAX_DIMENSION;
    var FIT_MODES = Object.freeze(["contain", "cover", "fill", "inside", "outside"]);
    var SVG_DANGER_RE = /<(?:script|foreignObject)\b|\bon\w+\s*=|<\!ENTITY|<\!DOCTYPE|@import/i;
    function validateImageBytes(input) {
      const data = asBuffer(input);
      if (!data || data.length === 0) {
        throw new ZapwebpError3({
          code: "E_EMPTY_FILE",
          message: "The file is empty (0 bytes).",
          fix: "Verify the file source or complete the download before converting."
        });
      }
      if (data.length < 16) {
        const str = data.toString("utf8");
        if (str.includes("<svg")) return;
        throw new ZapwebpError3({
          code: "E_CORRUPT_HEADER",
          message: "File is too small to contain a valid container header.",
          fix: "The asset appears truncated or corrupt."
        });
      }
    }
    function asBuffer(input) {
      if (Buffer.isBuffer(input)) return input;
      if (input instanceof Uint8Array) return Buffer.from(input.buffer, input.byteOffset, input.byteLength);
      if (typeof input === "string") return Buffer.from(input, "utf8");
      throw new Error("Image input must be a string or byte array.");
    }
    function detectFormat3(input) {
      const data = asBuffer(input);
      if (!data.length) throw new Error("The input file is empty.");
      const registered = formats.detectFormatHandler(data);
      if (registered) return registered.name;
      if (data.length >= 8 && data.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return "png";
      if (data.length >= 3 && data[0] === 255 && data[1] === 216 && data[2] === 255) return "jpeg";
      if (data.length >= 6 && (data.subarray(0, 6).toString("ascii") === "GIF87a" || data.subarray(0, 6).toString("ascii") === "GIF89a")) return "gif";
      if (data.length >= 12 && data.subarray(0, 4).toString("ascii") === "RIFF" && data.subarray(8, 12).toString("ascii") === "WEBP") return "webp";
      if (data.length >= 12 && data.subarray(4, 8).toString("ascii") === "ftyp") {
        const brands = data.subarray(8, Math.min(data.length, 4096)).toString("ascii");
        if (brands.includes("avif") || brands.includes("avis")) return "avif";
      }
      if (data.length >= 4 && (data.subarray(0, 4).equals(Buffer.from([73, 73, 42, 0])) || data.subarray(0, 4).equals(Buffer.from([77, 77, 0, 42])) || data.subarray(0, 4).equals(Buffer.from([73, 73, 43, 0])) || data.subarray(0, 4).equals(Buffer.from([77, 77, 0, 43])))) return "tiff";
      if (data.length >= 2 && data.subarray(0, 2).toString("ascii") === "BM") throw new Error("BMP input is not supported yet.");
      if (data.length >= 4 && data[0] === 0 && data[1] === 0 && data[2] === 1 && data[3] === 0) throw new Error("ICO input is not supported yet.");
      const text = data.subarray(0, Math.min(data.length, 4096)).toString("utf8").replace(/^\uFEFF/, "").trimStart();
      if (/<svg(?:\s|\/?>)/i.test(text) || /^<\?xml[\s\S]*?<svg(?:\s|\/?>)/i.test(text)) return "svg";
      throw new Error("Unsupported or unrecognized image format. Supported inputs: SVG, PNG, JPEG, WebP, AVIF, GIF, and TIFF.");
    }
    function validateSvg(input) {
      const svg = Buffer.isBuffer(input) ? input.toString("utf8") : String(input);
      if (Buffer.byteLength(svg) === 0 || !/<svg(?:\s|\/?>)/i.test(svg)) throw new Error("This file does not contain a valid SVG document.");
      if (SVG_DANGER_RE.test(svg)) {
        if (/<(?:script|foreignObject)\b/i.test(svg) || /\bon\w+\s*=/i.test(svg)) {
          throw new ZapwebpError3({
            code: "E_UNSAFE_SVG",
            message: "This SVG contains active content and cannot be converted.",
            fix: "Remove <script>, inline on* handlers, or foreignObject tags before converting."
          });
        }
        if (/<!ENTITY\b/i.test(svg)) {
          throw new ZapwebpError3({
            code: "E_UNSAFE_SVG",
            message: "Custom XML entities are not supported.",
            fix: "Remove <!ENTITY> declarations from the SVG markup."
          });
        }
        if (/<!DOCTYPE\b/i.test(svg)) {
          throw new ZapwebpError3({
            code: "E_UNSAFE_SVG",
            message: "DOCTYPE declarations are not supported.",
            fix: "Remove <!DOCTYPE> declarations from the SVG markup."
          });
        }
        if (/@import\b/i.test(svg)) {
          throw new ZapwebpError3({
            code: "E_UNSAFE_SVG",
            message: "External stylesheet imports are not supported.",
            fix: "Embed all styles inline within <style> elements without @import."
          });
        }
      }
      let decoded;
      try {
        decoded = svg.replace(/&#x([\da-f]+);/gi, (_match, code) => String.fromCodePoint(Number.parseInt(code, 16))).replace(/&#(\d+);/g, (_match, code) => String.fromCodePoint(Number(code))).replace(/&amp;/gi, "&");
      } catch {
        throw new Error("This SVG contains an invalid character reference.");
      }
      let normalized;
      try {
        normalized = decoded.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\\([\da-f]{1,6})\s?/gi, (_match, code) => String.fromCodePoint(Number.parseInt(code, 16)));
      } catch {
        throw new Error("This SVG contains an invalid CSS escape.");
      }
      const safeReference = (value) => {
        const ref = value.trim().replace(/^("|')([\s\S]*)\1$/, "$2").trim();
        return ref.startsWith("#") || /^data:image\/(?:png|jpe?g|gif|webp);base64,[a-z\d+/=]+$/i.test(ref) || /^data:font\/(?:woff2?|ttf|otf);base64,[a-z\d+/=]+$/i.test(ref);
      };
      const attributeRefs = /(?:href|src)\s*=\s*(["'])(.*?)\1/gi;
      for (const match of normalized.matchAll(attributeRefs)) if (!safeReference(match[2])) throw new Error("External references are not supported. Embed raster images and fonts in the SVG first.");
      if (/@import\b/i.test(normalized)) throw new Error("External stylesheet imports are not supported.");
      for (const match of normalized.matchAll(/url\(\s*([^)]*?)\s*\)/gi)) if (!safeReference(match[1])) throw new Error("External references are not supported. Embed images and fonts in the SVG first.");
      return svg;
    }
    function checkSvgSafety2(input, options = {}) {
      try {
        validateSvg(input);
        return { safe: true };
      } catch (err2) {
        return { safe: false, reason: "unsafe_svg", detail: err2.message };
      }
    }
    function svgDimensions(svg) {
      const root = svg.match(/<svg\b[^>]*>/i)?.[0] || "";
      const attribute = (name) => root.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(["'])(.*?)\\1`, "i"))?.[2];
      const viewBox = attribute("viewBox");
      if (viewBox) {
        const values = viewBox.trim().split(/[\s,]+/).map(Number);
        if (values.length === 4 && values.every(Number.isFinite) && values[2] > 0 && values[3] > 0) return { width: values[2], height: values[3] };
      }
      const dimension = (name) => {
        const value = attribute(name);
        const match = value?.trim().match(/^([+]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(?:px)?$/i);
        return match ? Number(match[1]) : void 0;
      };
      return { width: dimension("width"), height: dimension("height") };
    }
    function detectMetadata(input) {
      const data = asBuffer(input);
      const detected = {
        hasMetadata: false,
        exif: false,
        xmp: false,
        c2pa: false,
        comments: false,
        chunks: [],
        summary: []
      };
      if (!data.length) return detected;
      const textSample = data.subarray(0, Math.min(data.length, 8192)).toString("utf8");
      if (/<(?:rdf:RDF|metadata|dc:format|xmp:CreatorTool)/i.test(textSample)) {
        detected.hasMetadata = true;
        detected.xmp = true;
        detected.summary.push("XMP XML metadata");
      }
      if (/c2pa|jumbf/i.test(textSample)) {
        detected.hasMetadata = true;
        detected.c2pa = true;
        detected.summary.push("C2PA manifest");
      }
      if (data.length >= 8 && data.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
        let offset = 8;
        while (offset + 8 <= data.length) {
          const length = data.readUInt32BE(offset);
          const type = data.subarray(offset + 4, offset + 8).toString("ascii");
          detected.chunks.push(type);
          if (["eXIf", "iTXt", "tEXt", "zTXt", "tIME", "pHYs"].includes(type)) {
            detected.hasMetadata = true;
            if (type === "eXIf") {
              detected.exif = true;
              detected.summary.push("PNG eXIf");
            } else if (type === "iTXt" || type === "tEXt" || type === "zTXt") {
              const content = data.subarray(offset + 8, Math.min(offset + 8 + length, data.length)).toString("utf8");
              if (/xmp|adobe|rdf/i.test(content)) detected.xmp = true;
              if (/c2pa|jumb/i.test(content)) detected.c2pa = true;
              detected.summary.push(`PNG ${type}`);
            }
          }
          if (type === "c2pa" || type === "jumb") {
            detected.hasMetadata = true;
            detected.c2pa = true;
            detected.summary.push("PNG C2PA");
          }
          offset += 12 + length;
        }
      }
      if (data.length >= 2 && data[0] === 255 && data[1] === 216) {
        let offset = 2;
        while (offset + 4 <= data.length) {
          if (data[offset] !== 255) {
            offset++;
            continue;
          }
          const marker = data[offset + 1];
          if (marker === 218 || marker === 217) break;
          if (marker === 0 || marker >= 208 && marker <= 215) {
            offset += 2;
            continue;
          }
          const length = data.readUInt16BE(offset + 2);
          if (marker === 225) {
            detected.hasMetadata = true;
            const app1Header = data.subarray(offset + 4, Math.min(offset + 4 + length, data.length)).toString("utf8");
            if (app1Header.startsWith("Exif")) {
              detected.exif = true;
              detected.summary.push("JPEG EXIF");
            } else if (app1Header.includes("adobe.com") || app1Header.includes("xmp")) {
              detected.xmp = true;
              detected.summary.push("JPEG XMP");
            }
          } else if (marker === 235) {
            detected.hasMetadata = true;
            detected.c2pa = true;
            detected.summary.push("JPEG C2PA (JUMBF)");
          } else if (marker === 237) {
            detected.hasMetadata = true;
            detected.summary.push("JPEG Photoshop / IPTC");
          } else if (marker === 254) {
            detected.hasMetadata = true;
            detected.comments = true;
            detected.summary.push("JPEG Comment");
          }
          offset += 2 + length;
        }
      }
      if (data.length >= 12 && data.subarray(0, 4).toString("ascii") === "RIFF" && data.subarray(8, 12).toString("ascii") === "WEBP") {
        let offset = 12;
        while (offset + 8 <= data.length) {
          const fourcc = data.subarray(offset, offset + 4).toString("ascii");
          const size = data.readUInt32LE(offset + 4);
          detected.chunks.push(fourcc);
          if (fourcc === "EXIF") {
            detected.hasMetadata = true;
            detected.exif = true;
            detected.summary.push("WebP EXIF");
          } else if (fourcc === "XMP ") {
            detected.hasMetadata = true;
            detected.xmp = true;
            detected.summary.push("WebP XMP");
          } else if (fourcc === "ICCP") {
            detected.hasMetadata = true;
            detected.summary.push("WebP ICCP");
          }
          offset += 8 + size + size % 2;
        }
      }
      detected.summary = [...new Set(detected.summary)];
      return detected;
    }
    function generateCleanCertificate(output) {
      const data = asBuffer(output);
      const hash = crypto3.createHash("sha256").update(data).digest("hex");
      const metadata2 = detectMetadata(data);
      const verified = !metadata2.hasMetadata;
      return {
        sha256: hash,
        chunks: metadata2.chunks,
        metadataChunks: metadata2.summary.length,
        verified,
        verifiedAt: (/* @__PURE__ */ new Date()).toISOString(),
        tool: "zap@1.1.0"
      };
    }
    async function verifyAlpha(input) {
      const data = asBuffer(input);
      const { data: raw, info } = await getSharp()(data, { limitInputPixels: MAX_PIXELS }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      const w = info.width;
      const h = info.height;
      const getAlpha = (x, y) => raw[(y * w + x) * 4 + 3];
      const corners = [
        getAlpha(0, 0),
        getAlpha(Math.max(0, w - 1), 0),
        getAlpha(0, Math.max(0, h - 1)),
        getAlpha(Math.max(0, w - 1), Math.max(0, h - 1))
      ];
      let anyTransparent = false;
      for (let i = 3; i < raw.length; i += 4) {
        if (raw[i] < 255) {
          anyTransparent = true;
          break;
        }
      }
      return {
        hasAlpha: anyTransparent,
        alphaPreserved: anyTransparent,
        cornerAlpha: corners
      };
    }
    function auditConversionCommand2(command) {
      if (!command || typeof command !== "string") {
        throw new Error("Command must be a non-empty string.");
      }
      const issues = [];
      const cmd = command.trim();
      const isImageMagick = /\b(magick|convert)\b/i.test(cmd);
      const isSvgInput = /\.svg\b/i.test(cmd);
      const isWebpOutput = /\.webp\b/i.test(cmd);
      const isJpegOutput = /\.(jpe?g)\b/i.test(cmd);
      const hasBackgroundNone = /-background\s+none\b/i.test(cmd);
      const hasStrip = /-strip\b/i.test(cmd);
      if (isImageMagick && isSvgInput && !hasBackgroundNone) {
        issues.push("ImageMagick defaults to compositing SVG onto a solid black or opaque canvas unless -background none is passed.");
      }
      if (isImageMagick && !hasStrip) {
        issues.push("Command does not strip container metadata (EXIF/XMP/C2PA/software provenance).");
      }
      if (isJpegOutput && isSvgInput) {
        issues.push("Target format is JPEG, which cannot store transparency. Transparent regions will turn black unless an explicit background color is flattened.");
      }
      if (/\bcwebp\b/i.test(cmd) && isSvgInput) {
        issues.push("cwebp cannot decode vector SVG directly; passing SVG directly to cwebp fails.");
      }
      const safe = issues.length === 0;
      const inputMatch = cmd.match(/['"]?([a-zA-Z0-9_\-./\\]+\.(svg|png|jpe?g|webp|avif|gif|tiff?))['"]?/i);
      const file = inputMatch ? inputMatch[1] : "image.svg";
      const outExt = isWebpOutput ? "webp" : isJpegOutput ? "jpg" : "webp";
      const recommendedCommand = `zap "${file}" --to ${outExt} --clean`;
      return {
        safe,
        issues,
        recommendedCommand
      };
    }
    function explainBlackBackground2(context = {}) {
      return {
        cause: "Single-step rasterization without explicit transparent canvas initialization or alpha quality retention.",
        technicalDetails: [
          "ImageMagick and Cairo default uninitialized raster canvases to solid black (RGB 0, 0, 0) instead of transparent RGBA (0, 0, 0, 0).",
          "Many WebP encoders drop alpha or set alpha compression quality to 0 in lossy mode unless explicitly given alpha_q: 100.",
          "JPEG targets lack an alpha channel entirely, collapsing all transparent pixels into black boxes."
        ],
        remedy: "Use a two-stage pipeline: (1) render SVG over explicit transparent canvas (resvg), then (2) encode to WebP with alpha retention (cwebp -alpha_q 100).",
        zapSolution: 'zap <file.svg> --to webp (or convert_image MCP tool). Zap always defaults background to "transparent" and enforces alpha preservation by construction.'
      };
    }
    function normalizeOptions(options = {}) {
      if (!options || typeof options !== "object" || Array.isArray(options)) throw new Error("Conversion options must be an object.");
      const lockTarget = options.lockTarget || options.lock;
      const overrideLock = Boolean(options.overrideLock);
      const strict = options.strict !== void 0 ? Boolean(options.strict) : true;
      let to;
      if (lockTarget && !overrideLock) {
        to = String(lockTarget).toLowerCase();
      } else {
        to = String(options.to ?? DEFAULT_OPTIONS3.to).toLowerCase();
      }
      if (!OUTPUT_FORMATS2.includes(to)) throw new Error(`Unsupported output format: ${to}. Choose ${OUTPUT_FORMATS2.join(", ")}.`);
      const quality = Number(options.quality ?? DEFAULT_OPTIONS3.quality);
      if (!Number.isInteger(quality) || quality < 0 || quality > 100) throw new Error("Quality must be an integer between 0 and 100.");
      const effort = Number(options.effort ?? DEFAULT_OPTIONS3.effort);
      if (!Number.isInteger(effort) || effort < 0 || effort > 9) throw new Error("Effort must be an integer between 0 and 9.");
      const dimension = (key) => {
        if (options[key] === void 0) return void 0;
        const value = Number(options[key]);
        if (!Number.isInteger(value) || value < 1 || value > MAX_WIDTH) throw new Error(`${key} must be an integer between 1 and ${MAX_WIDTH}.`);
        return value;
      };
      const width = dimension("width");
      const height = dimension("height");
      const fit = String(options.fit ?? DEFAULT_OPTIONS3.fit).toLowerCase();
      if (!FIT_MODES.includes(fit)) throw new Error(`Fit must be one of ${FIT_MODES.join(", ")}.`);
      if (options.lossless !== void 0 && typeof options.lossless !== "boolean") throw new Error("Lossless must be a boolean.");
      if (options.stripMetadata !== void 0 && typeof options.stripMetadata !== "boolean") throw new Error("stripMetadata must be a boolean.");
      if (options.clean !== void 0 && typeof options.clean !== "boolean") throw new Error("clean must be a boolean.");
      const clean = options.clean !== void 0 ? Boolean(options.clean) : options.stripMetadata ?? DEFAULT_OPTIONS3.clean;
      const stripMetadata = clean;
      const verify = Boolean(options.verify || options.verifyClean);
      const assertAlpha = Boolean(options.assertAlpha);
      const report = Boolean(options.report);
      const transforms = Array.isArray(options.transforms) ? options.transforms.filter((t2) => t2 && typeof t2.apply === "function") : void 0;
      for (const key of ["background", "svgBackground"]) if (options[key] !== void 0 && (typeof options[key] !== "string" || !options[key].trim() || options[key].length > 64)) throw new Error(`${key} must be a non-empty color string of 64 characters or fewer.`);
      return {
        to,
        width,
        height,
        fit,
        quality,
        lossless: options.lossless ?? false,
        effort,
        background: options.background,
        svgBackground: options.svgBackground,
        stripMetadata,
        clean,
        verify,
        assertAlpha,
        report,
        transforms,
        lockTarget,
        strict,
        overrideLock,
        policy: options.policy,
        maxOutputBytes: options.maxOutputBytes,
        targetOutputBytes: options.targetOutputBytes,
        accept: options.accept,
        reject: options.reject
      };
    }
    function checkDimensions(width, height) {
      if (!Number.isFinite(width) || !Number.isFinite(height) || width < 1 || height < 1 || width > MAX_WIDTH || height > MAX_WIDTH || width * height > MAX_PIXELS) {
        throw new Error(`Image dimensions exceed the ${MAX_WIDTH} px side or pixel-count limit.`);
      }
    }
    async function inspectImage2(input) {
      const data = asBuffer(input);
      const format = detectFormat3(data);
      const metadata2 = detectMetadata(data);
      if (format === "svg") {
        const svg = validateSvg(data);
        const { width, height } = svgDimensions(svg);
        if (width && height && (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0)) throw new Error("The SVG has invalid intrinsic dimensions.");
        return { format, width: width || void 0, height: height || void 0, hasAlpha: true, bytes: data.length, metadata: metadata2 };
      }
      const meta = await getSharp()(data, { limitInputPixels: MAX_PIXELS, pages: 1, animated: false, failOn: "error" }).metadata();
      checkDimensions(meta.width, meta.height);
      return { format, width: meta.width, height: meta.height, hasAlpha: Boolean(meta.hasAlpha), bytes: data.length, metadata: metadata2 };
    }
    async function convertImage2(input, options = {}) {
      const opts = normalizeOptions(options);
      const policy = resolvePolicy(opts.policy, opts);
      const data = asBuffer(input);
      if (policy.limits?.maxInputBytes && data.length > policy.limits.maxInputBytes) {
        throw new ZapwebpError3({
          code: "E_INPUT_TOO_LARGE",
          message: `Input is ${data.length} bytes, max is ${policy.limits.maxInputBytes}.`,
          fix: "Compress the file, or increase maxInputBytes.",
          inputBytes: data.length,
          maxBytes: policy.limits.maxInputBytes,
          suggestedFix: {
            maxInputBytes: Math.ceil(data.length * 1.05),
            reason: "Input exceeds maximum allowed ingress bytes."
          }
        });
      }
      validateImageBytes(data);
      let format;
      try {
        format = detectFormat3(data);
      } catch (err2) {
        if (opts.lockTarget && !opts.strict) {
          return {
            data,
            format: "unknown",
            width: void 0,
            height: void 0,
            size: data.length,
            alphaPreserved: false,
            alphaVerified: false,
            clean: false,
            removedMetadata: [],
            passedThrough: true,
            targetLockEnforced: Boolean(opts.lockTarget && !opts.overrideLock),
            targetLockBypassed: Boolean(opts.lockTarget && opts.overrideLock)
          };
        }
        if (opts.lockTarget && opts.strict) {
          throw new ZapwebpError3({
            code: "E_UNSUPPORTED_FORMAT",
            message: `Cannot decode this file into the locked target format (${opts.to}).`,
            fix: "Upload a supported format, or install the format plugin for this file.",
            input: {
              detectedFormat: "unknown",
              bytes: data.length
            },
            target: opts.to
          });
        }
        throw err2;
      }
      checkPolicyInput({ policy, data, detectedFormat: format });
      let source = data;
      let sourceHasAlpha;
      if (format === "svg") {
        const svg = validateSvg(data);
        const dims = svgDimensions(svg);
        const aspect = dims.width && dims.height ? dims.height / dims.width : 1;
        const fitByCover = opts.fit === "cover" || opts.fit === "outside";
        const renderMode = opts.width && opts.height ? fitByCover === aspect > opts.height / opts.width ? "width" : "height" : opts.height && !opts.width ? "height" : "width";
        const renderValue = renderMode === "height" ? opts.height ?? opts.width ?? 2048 : opts.width ?? opts.height ?? 2048;
        const rasterWidth = renderMode === "width" ? renderValue : Math.ceil(renderValue / aspect);
        const rasterHeight = renderMode === "height" ? renderValue : Math.ceil(renderValue * aspect);
        checkDimensions(rasterWidth, rasterHeight);
        const resvgOptions = { background: opts.svgBackground ?? "rgba(0, 0, 0, 0)" };
        resvgOptions.fitTo = { mode: renderMode, value: renderValue };
        const ResvgClass = getResvg();
        source = new ResvgClass(svg, resvgOptions).render().asPng();
        const svgMeta = await getSharp()(source, { limitInputPixels: MAX_PIXELS }).metadata();
        sourceHasAlpha = Boolean(svgMeta.hasAlpha);
      } else {
        const meta = await getSharp()(source, { limitInputPixels: MAX_PIXELS, pages: 1, animated: false, failOn: "error" }).metadata();
        checkDimensions(meta.width, meta.height);
        sourceHasAlpha = Boolean(meta.hasAlpha);
      }
      const transformReports = [];
      let rawBufferInfo = null;
      if (opts.transforms && opts.transforms.length > 0) {
        let raw = await decodeToRgba(source, format === "svg" ? "png" : format);
        for (const step of opts.transforms) {
          if (typeof step.apply === "function") {
            const inputDims = { width: raw.width, height: raw.height };
            const transformed = await step.apply(raw, opts);
            if (!transformed || !transformed.data || !transformed.width || !transformed.height) {
              throw new Error(`Transform "${step.name || "unknown"}" returned an invalid RawImage.`);
            }
            checkDimensions(transformed.width, transformed.height);
            raw = transformed;
            const meta = typeof step.getMetadata === "function" ? step.getMetadata() : step.metadata || {};
            transformReports.push({
              name: step.name || "transform",
              input: inputDims,
              output: { width: raw.width, height: raw.height },
              ...meta
            });
          }
        }
        let hasAlpha = false;
        for (let i = 3; i < raw.data.length; i += 4) {
          if (raw.data[i] < 255) {
            hasAlpha = true;
            break;
          }
        }
        sourceHasAlpha = hasAlpha;
        const rawBuffer = Buffer.isBuffer(raw.data) ? raw.data : Buffer.from(raw.data.buffer, raw.data.byteOffset, raw.data.byteLength);
        rawBufferInfo = {
          buffer: rawBuffer,
          rawOptions: {
            width: raw.width,
            height: raw.height,
            channels: 4
          }
        };
      }
      const evalQ = evaluateQuality({
        policy,
        inputFormat: format,
        inputBytes: data.length,
        hasAlpha: sourceHasAlpha,
        targetFormat: opts.to
      });
      const targetQuality = options.quality !== void 0 ? Number(options.quality) : evalQ.quality;
      const targetLossless = options.lossless !== void 0 ? Boolean(options.lossless) : evalQ.lossless;
      if (opts.to === "jpeg" && sourceHasAlpha && !opts.background) {
        throw new ZapwebpError3({
          code: "E_ALPHA_NOT_REPRESENTABLE",
          message: "JPEG cannot store transparency. Pass a background color to flatten the image, or choose WebP, PNG, or AVIF.",
          fix: 'Pass --background "#ffffff" or choose WebP/PNG/AVIF.',
          suggestedFix: { background: "#ffffff" }
        });
      }
      if (opts.to === "jpeg" && targetLossless) throw new Error("JPEG output does not support lossless encoding.");
      const createPipeline = () => {
        const sharpInstance = getSharp();
        if (rawBufferInfo) {
          return sharpInstance(rawBufferInfo.buffer, { raw: rawBufferInfo.rawOptions });
        }
        return sharpInstance(source, { limitInputPixels: MAX_PIXELS, pages: 1, animated: false, failOn: "error" });
      };
      const encodeWithQuality = async (q, isLossless) => {
        let p = createPipeline();
        if (opts.width || opts.height) p = p.resize({ width: opts.width, height: opts.height, fit: opts.fit, withoutEnlargement: false });
        if (opts.background && sourceHasAlpha) p = p.flatten({ background: opts.background });
        if (!policy.advanced.stripMetadata) p = p.withMetadata();
        const effort = policy.advanced.effort ?? opts.effort;
        if (opts.to === "webp") p = p.webp({ quality: q, alphaQuality: 100, lossless: isLossless, effort: Math.round(effort * 6 / 9) });
        else if (opts.to === "png") p = p.png({ compressionLevel: effort, adaptiveFiltering: true });
        else if (opts.to === "jpeg") p = p.jpeg({ quality: q, mozjpeg: true });
        else p = p.avif({ quality: q, lossless: isLossless, effort });
        return await p.toBuffer({ resolveWithObject: true });
      };
      let effectiveQuality = targetQuality;
      let effectiveLossless = targetLossless;
      let { data: output, info } = await encodeWithQuality(effectiveQuality, effectiveLossless);
      checkDimensions(info.width, info.height);
      let qualityReducedBy = 0;
      let maxOutputHit = false;
      const limitMaxOutput = policy.limits?.maxOutputBytes || policy.limits?.targetOutputBytes;
      if (limitMaxOutput && output.length > limitMaxOutput) {
        let currentQ = effectiveQuality;
        while (output.length > limitMaxOutput && currentQ > 10) {
          currentQ -= 5;
          const res = await encodeWithQuality(currentQ, false);
          output = res.data;
          info = res.info;
        }
        if (output.length > limitMaxOutput) {
          throw new ZapwebpError3({
            code: "E_OUTPUT_TOO_LARGE",
            message: `Cannot fit output in ${limitMaxOutput} bytes (reached ${output.length} bytes at quality ${currentQ}).`,
            fix: "Increase maxOutputBytes, or downscale the image.",
            actualBytes: output.length,
            maxBytes: limitMaxOutput,
            suggestedFix: {
              quality: 10,
              reason: "Image exceeds maxOutputBytes even after reducing quality to 10."
            }
          });
        }
        qualityReducedBy = effectiveQuality - currentQ;
        effectiveQuality = currentQ;
        effectiveLossless = false;
        maxOutputHit = true;
      }
      const inputMetadata = detectMetadata(data);
      const alphaPreserved = opts.to !== "jpeg" && sourceHasAlpha && !opts.background;
      let certificate;
      if (opts.verify) {
        certificate = generateCleanCertificate(output);
      }
      if (opts.assertAlpha && sourceHasAlpha) {
        const check = await verifyAlpha(output);
        if (!check.hasAlpha) {
          throw new Error("Alpha assertion failed: output image does not contain transparent pixels.");
        }
      }
      const backgroundStatus = sourceHasAlpha ? opts.background ? "flattened" : "preserved_alpha" : "preserved_opaque";
      const transparency = backgroundStatus === "flattened" ? "flattened" : sourceHasAlpha ? "preserved" : "preserved_opaque";
      return {
        data: output,
        format: opts.to,
        width: info.width,
        height: info.height,
        size: output.length,
        alphaPreserved,
        alphaVerified: alphaPreserved,
        backgroundStatus,
        transparency,
        flattenColor: opts.background || void 0,
        clean: opts.clean,
        removedMetadata: inputMetadata.summary,
        certificate,
        transforms: transformReports.length > 0 ? transformReports : void 0,
        targetLockEnforced: Boolean(opts.lockTarget && !opts.overrideLock),
        targetLockBypassed: Boolean(opts.lockTarget && opts.overrideLock),
        policy: {
          quality: {
            mode: evalQ.mode,
            used: effectiveQuality,
            target: evalQ.targetQuality,
            reducedBy: qualityReducedBy,
            reason: qualityReducedBy > 0 ? "to fit maxOutputBytes" : "as specified"
          },
          limits: {
            maxInputBytes: policy.limits.maxInputBytes,
            maxOutputBytes: limitMaxOutput,
            maxOutputHit
          },
          format: {
            input: format,
            output: opts.to,
            accepted: true
          }
        }
      };
    }
    async function convert(input, options = {}) {
      const result = await convertImage2(input, options);
      const out = result.data;
      out.format = result.format;
      out.width = result.width;
      out.height = result.height;
      out.size = result.size;
      out.alphaPreserved = result.alphaPreserved;
      out.certificate = result.certificate;
      out.targetLockEnforced = result.targetLockEnforced;
      out.targetLockBypassed = result.targetLockBypassed;
      out.passedThrough = Boolean(result.passedThrough);
      out.data = result.data;
      out.policy = result.policy;
      return out;
    }
    async function decodeToRgba(input, format) {
      const data = asBuffer(input);
      const fmt = format ? String(format).toLowerCase() : detectFormat3(data);
      let source = data;
      if (fmt === "svg") {
        const svg = validateSvg(data);
        const dims = svgDimensions(svg);
        const width = dims.width || 2048;
        const height = dims.height || 2048;
        checkDimensions(width, height);
        const ResvgClass = getResvg();
        source = new ResvgClass(svg, { fitTo: { mode: "original" }, background: "rgba(0, 0, 0, 0)" }).render().asPng();
      }
      const pipeline = getSharp()(source, { limitInputPixels: MAX_PIXELS, pages: 1, animated: false, failOn: "error" }).ensureAlpha();
      const { data: raw, info } = await pipeline.raw().toBuffer({ resolveWithObject: true });
      checkDimensions(info.width, info.height);
      return {
        data: new Uint8ClampedArray(raw.buffer, raw.byteOffset, raw.byteLength),
        width: info.width,
        height: info.height
      };
    }
    async function encodeFromRgba(image, options = {}) {
      if (!image || !image.data || !Number.isInteger(image.width) || !Number.isInteger(image.height)) {
        throw new Error("image must be an object with data (RGBA bytes), width, and height.");
      }
      checkDimensions(image.width, image.height);
      const opts = normalizeOptions(options);
      const raw = Buffer.isBuffer(image.data) ? image.data : Buffer.from(image.data.buffer, image.data.byteOffset, image.data.byteLength);
      let hasAlpha = false;
      for (let i = 3; i < raw.length; i += 4) {
        if (raw[i] < 255) {
          hasAlpha = true;
          break;
        }
      }
      if (opts.to === "jpeg" && hasAlpha && !opts.background) {
        throw new ZapwebpError3({
          code: "E_ALPHA_NOT_REPRESENTABLE",
          message: "JPEG cannot store transparency. Pass a background color to flatten the image, or choose WebP, PNG, or AVIF.",
          fix: 'Pass --background "#ffffff" or choose WebP/PNG/AVIF.',
          suggestedFix: { background: "#ffffff" }
        });
      }
      if (opts.to === "jpeg" && opts.lossless) {
        throw new Error("JPEG output does not support lossless encoding.");
      }
      let pipeline = getSharp()(raw, {
        raw: {
          width: image.width,
          height: image.height,
          channels: 4
        }
      });
      if (opts.width || opts.height) {
        pipeline = pipeline.resize({
          width: opts.width,
          height: opts.height,
          fit: opts.fit,
          withoutEnlargement: false
        });
      }
      if (opts.background && hasAlpha) {
        pipeline = pipeline.flatten({ background: opts.background });
      }
      if (!opts.stripMetadata) {
        pipeline = pipeline.withMetadata();
      }
      const quality = Math.max(1, opts.quality);
      if (opts.to === "webp") {
        pipeline = pipeline.webp({ quality, alphaQuality: 100, lossless: opts.lossless, effort: Math.round(opts.effort * 6 / 9) });
      } else if (opts.to === "png") {
        pipeline = pipeline.png({ compressionLevel: opts.effort, adaptiveFiltering: true });
      } else if (opts.to === "jpeg") {
        pipeline = pipeline.jpeg({ quality, mozjpeg: true });
      } else {
        pipeline = pipeline.avif({ quality, lossless: opts.lossless, effort: opts.effort });
      }
      const { data: outBuffer, info } = await pipeline.toBuffer({ resolveWithObject: true });
      checkDimensions(info.width, info.height);
      return outBuffer;
    }
    async function convertSvgToWebp(input, options = {}) {
      return convertImage2(input, { ...options, to: "webp" });
    }
    function parseScales2(scaleInput) {
      if (scaleInput === void 0 || scaleInput === null) return [1];
      const list = Array.isArray(scaleInput) ? scaleInput : String(scaleInput).split(",").map((s) => s.trim()).filter(Boolean);
      const parsed = list.map((item) => {
        const num = Number(item);
        if (!Number.isFinite(num) || num <= 0) {
          throw new Error(`Scale multiplier must be a positive number, received: ${item}`);
        }
        return num;
      });
      if (!parsed.length) return [1];
      return [...new Set(parsed)].sort((a, b) => a - b);
    }
    function scaleSuffix2(scale) {
      if (scale === 1) return "";
      return `@${scale}x`;
    }
    function outputName2(inputPath, format = "webp", scale = 1) {
      const extension = format === "jpeg" ? "jpg" : format;
      const base = path7.basename(inputPath, path7.extname(inputPath)) || "image";
      const suffix = scaleSuffix2(scale);
      return `${base}${suffix}.${extension}`;
    }
    function generateSrcset2(baseFile, scales = [1], format = "webp", alt = "") {
      const base = path7.basename(baseFile, path7.extname(baseFile)) || "image";
      const ext = format === "jpeg" ? "jpg" : format;
      const sorted = parseScales2(scales);
      const primaryFile = `${base}.${ext}`;
      const srcsetString = sorted.map((s) => `${base}${scaleSuffix2(s)}.${ext} ${s}x`).join(", ");
      return `<img src="${primaryFile}" srcset="${srcsetString}" alt="${alt}">`;
    }
    var pkg = require_package();
    var { registerTransform, getTransforms } = require_transforms();
    function getVersion() {
      return pkg.version;
    }
    function getFormats() {
      return formats.getAllHandlers().map((h) => h.name);
    }
    module2.exports = {
      // Frozen Seven Public Functions (Enterprise Architecture Core API Surface)
      convert,
      inspect: inspectImage2,
      registerFormat: formats.registerFormat,
      registerMetadataHandler: metadata.registerMetadataHandler,
      registerTransform,
      getVersion,
      getFormats,
      // Backwards-Compatible Surfaces
      convertImage: convertImage2,
      convertSvgToWebp,
      decodeToRgba,
      encodeFromRgba,
      detectFormat: detectFormat3,
      detectMetadata,
      generateCleanCertificate,
      verifyAlpha,
      auditConversionCommand: auditConversionCommand2,
      explainBlackBackground: explainBlackBackground2,
      inspectImage: inspectImage2,
      validateSvg,
      validateImageBytes,
      checkSvgSafety: checkSvgSafety2,
      normalizeOptions,
      parseScales: parseScales2,
      scaleSuffix: scaleSuffix2,
      outputName: outputName2,
      generateSrcset: generateSrcset2,
      resolvePolicy,
      checkPolicyInput,
      evaluateQuality,
      formats,
      registry: formats.registry,
      getHandlerByName: formats.getHandlerByName,
      getHandlerByMime: formats.getHandlerByMime,
      detectFormatHandler: formats.detectFormatHandler,
      getAllHandlers: formats.getAllHandlers,
      metadata,
      MetadataRegistry: metadata.MetadataRegistry,
      metadataRegistry: metadata.metadataRegistry,
      getMetadataHandlers: metadata.getMetadataHandlers,
      cleanBytes: metadata.cleanBytes,
      getTransforms,
      getSharp,
      getResvg,
      MAX_WIDTH,
      INPUT_FORMATS: INPUT_FORMATS3,
      OUTPUT_FORMATS: OUTPUT_FORMATS2,
      FIT_MODES
    };
  }
});

// packages/cli/src/fs.js
async function writeSafe(destPath, data, attempts = 3) {
  const dir = import_node_path.default.dirname(destPath);
  try {
    await import_promises.default.mkdir(dir, { recursive: true });
  } catch (err2) {
    if (err2.code === "EACCES") {
      throw new ZapwebpError({
        code: "E_WRITE_PERMISSION",
        message: `Permission denied creating directory: ${dir}`,
        fix: "Check folder permissions."
      });
    }
    throw err2;
  }
  const tmpPath = import_node_path.default.join(dir, `.zap-tmp-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  try {
    await import_promises.default.writeFile(tmpPath, data);
  } catch (err2) {
    if (err2.code === "ENOSPC") {
      throw new ZapwebpError({
        code: "E_DISK_FULL",
        message: "No space left on device.",
        fix: "Free disk space and retry."
      });
    }
    throw err2;
  }
  if (!process.env.ANDROID_ROOT) {
    try {
      const handle = await import_promises.default.open(tmpPath, "r+");
      await handle.sync();
      await handle.close();
    } catch {
    }
  }
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      await import_promises.default.rename(tmpPath, destPath);
      return;
    } catch (err2) {
      if ((err2.code === "EBUSY" || err2.code === "EPERM") && attempt < attempts) {
        await new Promise((r) => setTimeout(r, 100 * attempt));
        continue;
      }
      await import_promises.default.rm(tmpPath, { force: true }).catch(() => {
      });
      if (err2.code === "EBUSY") {
        throw new ZapwebpError({
          code: "E_WRITE_LOCKED",
          message: `Destination file is locked: ${destPath}`,
          fix: "Close any application holding a lock on the file."
        });
      }
      throw err2;
    }
  }
}
var import_promises, import_node_path, import_shared, ZapwebpError;
var init_fs = __esm({
  "packages/cli/src/fs.js"() {
    import_promises = __toESM(require("node:fs/promises"), 1);
    import_node_path = __toESM(require("node:path"), 1);
    import_shared = __toESM(require_src(), 1);
    ({ ZapwebpError } = import_shared.default);
  }
});

// node_modules/.pnpm/ignore@7.0.14/node_modules/ignore/index.js
var require_ignore = __commonJS({
  "node_modules/.pnpm/ignore@7.0.14/node_modules/ignore/index.js"(exports2, module2) {
    function makeArray(subject) {
      return Array.isArray(subject) ? subject : [subject];
    }
    var UNDEFINED = void 0;
    var EMPTY = "";
    var SPACE = " ";
    var ESCAPE = "\\";
    var REGEX_LITERAL_SPECIAL = /[.*+?()[\]{}^$|\\/]/;
    var BOM = "\uFEFF";
    var REGEX_INVALID_TRAILING_BACKSLASH = /(?:[^\\]|^)\\$/;
    var REGEX_ANCHORED_GLOBSTAR = /^\/\*{2,}$/;
    var REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION = /^\\!/;
    var REGEX_REPLACE_LEADING_EXCAPED_HASH = /^\\#/;
    var REGEX_SPLITALL_CRLF = /\r?\n/g;
    var DOUBLE_SLASH = "//";
    var SLASH_CODE = 47;
    var DOT_CODE = 46;
    var SLASH = "/";
    var TMP_KEY_IGNORE = "node-ignore";
    if (typeof Symbol !== "undefined") {
      TMP_KEY_IGNORE = Symbol.for("node-ignore");
    }
    var KEY_IGNORE = TMP_KEY_IGNORE;
    var define = (object, key, value) => {
      Object.defineProperty(object, key, { value });
      return value;
    };
    var RETURN_FALSE = () => false;
    var POSIX_CLASSES = {
      alnum: "0-9A-Za-z",
      alpha: "A-Za-z",
      blank: " \\t",
      cntrl: "\\x00-\\x1f\\x7f",
      digit: "0-9",
      graph: "!-.0-~",
      lower: "a-z",
      print: " -.0-~",
      punct: "!-.:-@\\[-`{-~",
      // git's `sane-ctype.h` classifies \v and \f as control, not space,
      //   unlike C's `isspace`
      space: " \\t\\n\\r",
      upper: "A-Z",
      xdigit: "0-9A-Fa-f"
    };
    var CLASS_MEMBERS_TO_ESCAPE = "\\]^-[";
    var escapeMember = (char) => CLASS_MEMBERS_TO_ESCAPE.indexOf(char) < 0 ? char : ESCAPE + char;
    var NON_SLASH = "(?!\\/)";
    var classSource = (negated, body) => {
      if (negated) {
        return `[^\\/${body}]`;
      }
      const source = `[${body}]`;
      return new RegExp(source).test("/") ? NON_SLASH + source : source;
    };
    var scanBracket = (pattern, start) => {
      const { length } = pattern;
      let index = start + 1;
      let negated = EMPTY;
      const lead = pattern[index];
      if (lead === "!" || lead === "^") {
        negated = "^";
        index++;
      }
      let body = EMPTY;
      let prev = EMPTY;
      for (; ; ) {
        const char = pattern[index];
        if (char === UNDEFINED) {
          return null;
        }
        if (char === ESCAPE) {
          const escaped = pattern[index + 1];
          if (escaped === UNDEFINED) {
            return null;
          }
          body += escapeMember(escaped);
          prev = escaped;
          index++;
        } else if (char === "-" && prev && index + 1 < length && pattern[index + 1] !== "]") {
          index++;
          let to = pattern[index];
          if (to === ESCAPE) {
            to = pattern[index += 1];
          }
          if (prev <= to) {
            body += `-${escapeMember(to)}`;
          }
          prev = EMPTY;
        } else if (char === "[" && pattern[index + 1] === ":") {
          const nameStart = index + 2;
          let end = nameStart;
          while (end < length && pattern[end] !== "]") {
            end++;
          }
          if (end === length) {
            return null;
          }
          if (end > nameStart && pattern[end - 1] === ":") {
            const name = pattern.slice(nameStart, end - 1);
            if (!Object.prototype.hasOwnProperty.call(POSIX_CLASSES, name)) {
              return null;
            }
            body += POSIX_CLASSES[name];
            prev = EMPTY;
            index = end;
          } else {
            body += escapeMember("[");
            prev = "[";
            index = nameStart - 2;
          }
        } else {
          body += escapeMember(char);
          prev = char;
        }
        index++;
        if (pattern[index] === "]") {
          return {
            end: index,
            source: classSource(negated, body)
          };
        }
      }
    };
    var NEVER_MATCH = "[]";
    var PLACEHOLDER = "\0";
    var REGEX_RESTORE_PLACEHOLDER = new RegExp(
      `${PLACEHOLDER}(\\d+)${PLACEHOLDER}`,
      "g"
    );
    var TRAILING_WILDCARD = "\uE000";
    var TRAILING_DOUBLESTAR = "\uE001";
    var isReserved = (char) => char === PLACEHOLDER || char === TRAILING_WILDCARD || char === TRAILING_DOUBLESTAR;
    var extractBrackets = (pattern) => {
      const sources = [];
      const hold = (source) => `${PLACEHOLDER}${sources.push(source) - 1}${PLACEHOLDER}`;
      const { length } = pattern;
      let out = EMPTY;
      let index = 0;
      while (index < length) {
        const char = pattern[index];
        if (char === ESCAPE) {
          const escaped = pattern[index + 1];
          if (escaped === UNDEFINED || escaped === SLASH && index + 2 === length) {
            out += hold(NEVER_MATCH);
          } else if (escaped === "*" || escaped === "[" || escaped === SPACE) {
            out += pattern.slice(index, index + 2);
          } else {
            out += hold(
              REGEX_LITERAL_SPECIAL.test(escaped) ? ESCAPE + escaped : isReserved(escaped) ? `[${escaped}]` : escaped
            );
          }
          index += 2;
        } else if (isReserved(char)) {
          out += hold(`[${char}]`);
          index++;
        } else if (char === "[") {
          const scanned = scanBracket(pattern, index);
          if (scanned === null) {
            out += hold(NEVER_MATCH);
            index = length;
          } else {
            out += hold(scanned.source);
            index = scanned.end + 1;
          }
        } else {
          out += char;
          index++;
        }
      }
      return {
        source: out,
        sources
      };
    };
    var DIRECT = null;
    var REGEX_INNER_SLASH = /\/(?!$)/;
    var REPLACERS = [
      // Replace (\ ) with ' '
      // Only a space: an escaped tab or other whitespace is already a literal by
      //   the time it reaches here, and a bare tab must be left as one, not turned
      //   into a space.
      // (\ ) -> ' '
      // (\\ ) -> '\\ '
      // (\\\ ) -> '\\ '
      [
        // A run of backslashes is taken whole, from its first one, so no match
        //   ever starts again inside it -- `(\\+?) ` did, which made a long run
        //   quadratic.
        /(\\+)( ?)/g,
        (_, run, space) => space ? run.slice(0, run.length - run.length % 2) + SPACE : run,
        ESCAPE + SPACE
      ],
      // git's wildmatch() reads a run of two or more asterisks as one globstar
      //   whenever the run fills a path segment: it starts the pattern or follows
      //   a `/`, and it ends the pattern or comes before a `/`. A run of two is
      //   already `**`; a longer one is folded into `**` here, so the steps
      //   below only ever have to know `**`.
      // `***/foo` -> `**/foo`, `a/***/b` -> `a/**/b`, `a/***` -> `a/**`
      // git also takes a run beside a literal prefix (`a***/b`) or beside an
      //   escaped slash (`***\/b`) as a globstar, and this does not; the README
      //   lists both, under "A run of asterisks".
      [
        /(^|\/)\*{3,}(?=\/|$)/g,
        (_, start) => `${start}**`,
        "*"
      ],
      // Escape metacharacters
      // which is written down by users but means special for regular expressions.
      // > There are 12 characters with special meanings:
      // > - the backslash \,
      // > - the caret ^,
      // > - the dollar sign $,
      // > - the period or dot .,
      // > - the vertical bar or pipe symbol |,
      // > - the question mark ?,
      // > - the asterisk or star *,
      // > - the plus sign +,
      // > - the opening parenthesis (,
      // > - the closing parenthesis ),
      // > - and the opening square bracket [,
      // > - the opening curly brace {,
      // > These special characters are often called "metacharacters".
      [
        /[\\$.|*+(){^]/g,
        (match) => `\\${match}`
      ],
      [
        // > a question mark (?) matches a single character
        /(?!\\)\?/g,
        () => "[^/]",
        "?"
      ],
      // leading slash
      [
        // > A leading slash matches the beginning of the pathname.
        // > For example, "/*.c" matches "cat-file.c" but not "mozilla-sha1/sha1.c".
        // A leading slash matches the beginning of the pathname
        /^\//,
        () => "^",
        SLASH
      ],
      // replace special metacharacter slash after the leading slash
      [
        /\//g,
        () => "\\/",
        SLASH
      ],
      [
        // > A leading "**" followed by a slash means match in all directories.
        // > For example, "**/foo" matches file or directory "foo" anywhere,
        // > the same as pattern "foo".
        // > "**/foo/bar" matches file or directory "bar" anywhere that is directly
        // >   under directory "foo".
        // Notice that the '*'s have been replaced as '\\*'
        /^\^*(?:\\\*\\\*\\\/)+/,
        // '**/foo' <-> 'foo'
        () => "^(?:.*\\/)?",
        "*"
      ],
      // starting
      [
        // there will be no leading '/'
        //   (which has been replaced by section "leading slash")
        // If starts with '**', adding a '^' to the regular expression also works
        DIRECT,
        (source, pattern) => {
          if (!source || source[0] === "^") {
            return source;
          }
          const anchor = !REGEX_INNER_SLASH.test(pattern) ? "(?:^|\\/)" : "^";
          return anchor + source;
        }
      ],
      // two globstars
      [
        // Use lookahead assertions so that we could match more than one `'/**'`
        /\\\/\\\*\\\*(?=\\\/|$)/g,
        // Zero, one or several directories
        // should not use '*', or it will be replaced by the next replacer
        // Check if it is not the last `'/**'`
        (_, index, str) => index + 6 < str.length ? str.slice(index + 6) === "\\/" ? "(?:\\/[^\\/]+)+" : "(?:\\/[^\\/]+)*" : `\\/${TRAILING_DOUBLESTAR}`,
        "*"
      ],
      // normal intermediate wildcards
      [
        // Never replace escaped '*'
        // ignore rule '\*' will match the path '*'
        // 'abc.*/' -> go
        // 'abc.*'  -> skip this rule,
        //    coz trailing single wildcard will be handed by [trailing wildcard]
        /(^|[^\\]+)(\\\*)+(?=.+)/g,
        // '*.js' matches '.js'
        // '*.js' doesn't match 'abc'
        (_, p1, p2) => {
          const unescaped = p2.replace(/\\\*/g, "[^\\/]*");
          return p1 + unescaped;
        },
        "*"
      ],
      // trailing wildcard, held apart from a literal star
      [
        // The step above leaves a trailing `*` alone, so a single `\*` is all that
        //   can be left at the end here, and what stands in front of it says which
        //   kind it is. A wildcard arrives as the escaper wrote it, `\*` with
        //   nothing before it; a literal arrives as the user's own escape, which
        //   the escaper doubled, and then the star's own -- `\\` and then `\*`.
        //   There is no third case: every backslash still reaching the chain is
        //   one `\*`, `\[` or `\ ` carries itself, and each is followed by its
        //   own character, so a longer run can never form. This runs while the
        //   two are still distinct, before the unescape steps below collapse the
        //   literal onto the very `\*` a wildcard leaves behind.
        /(^|[^\\])((?:\\\\)*)\\\*$/,
        (match, p1, p2) => p2 === EMPTY ? p1 + TRAILING_WILDCARD : match,
        "*"
      ],
      [
        // unescape, revert step 3 except for back slash
        // For example, if a user escape a '\\*',
        // after step 3, the result will be '\\\\\\*'
        /\\\\\\(?=[$.|*+(){^])/g,
        () => ESCAPE,
        ESCAPE + ESCAPE
      ],
      [
        // '\\\\' -> '\\'
        /\\\\/g,
        () => ESCAPE,
        ESCAPE + ESCAPE
      ],
      [
        // Every real bracket expression -- POSIX classes included -- has already
        //   been held aside by `extractBrackets`, so the only `[` left in the
        //   pattern is an escaped, literal one.
        // A backslash could only stand at the end of the range if it quoted the
        //   `]`, and `\]` is held aside long before this.
        /\\\[([^\]/]*?)($|\])/g,
        // '\\[bar]' -> '\\\\[bar]'
        (match, range, close) => `\\[${range}${close}`,
        "["
      ],
      // ending
      [
        // 'js' will not match 'js.'
        // 'ab' will not match 'abc'
        DIRECT,
        // WTF!
        // https://git-scm.com/docs/gitignore
        // changes in [2.22.1](https://git-scm.com/docs/gitignore/2.22.1)
        // which re-fixes #24, #38
        // > If there is a separator at the end of the pattern then the pattern
        // > will only match directories, otherwise the pattern can match both
        // > files and directories.
        // 'js*' will not match 'a.js'
        // 'js/' will not match 'a.js'
        // 'js' will match 'a.js' and 'a.js/'
        (source) => {
          const last = source[source.length - 1];
          if (!last || last === TRAILING_WILDCARD || last === TRAILING_DOUBLESTAR) {
            return source;
          }
          return last === SLASH ? `${source}$` : `${source}(?=$|\\/$)`;
        }
      ]
    ];
    var REGEX_REPLACE_TRAILING_WILDCARD = /(^|\\\/)?\uE000$/;
    var MODE_IGNORE = "regex";
    var MODE_CHECK_IGNORE = "checkRegex";
    var UNDERSCORE = "_";
    var replaceTrailingWildcard = (_, p1) => {
      const prefix = p1 ? `${p1}[^/]+` : "[^/]*";
      return `${prefix}(?=$|\\/$)`;
    };
    var REGEX_REPLACE_TRAILING_DOUBLESTAR = /\uE001$/;
    var replaceTrailingDoublestar = () => ".+(?=$|\\/$)";
    var WILDCARD = "[^\\/]*";
    var separatorAfter = (run, at) => {
      let separator = EMPTY;
      for (let index = at + 1; index < run.length && !run[index].wildcard; index++) {
        separator += run[index].single;
      }
      return separator;
    };
    var pinWildcards = (source) => {
      if (source.indexOf(WILDCARD) < 0) {
        return source;
      }
      const tokens = [];
      const { length } = source;
      let index = 0;
      while (index < length) {
        const char = source[index];
        if (source.startsWith(WILDCARD, index)) {
          tokens.push({ wildcard: true });
          index += WILDCARD.length;
        } else if (char === "[") {
          let end = index + 1;
          if (source[end] === "^") {
            end++;
          }
          if (source[end] === "]") {
            end++;
          }
          while (end < length && source[end] !== "]") {
            end += source[end] === ESCAPE ? 2 : 1;
          }
          end++;
          tokens.push({ single: source.slice(index, end) });
          index = end;
        } else if (char === ESCAPE) {
          tokens.push({ single: source.slice(index, index + 2) });
          index += 2;
        } else if (char === "(") {
          let depth = 0;
          let end = index;
          do {
            if (source[end] === ESCAPE) {
              end++;
            } else if (source[end] === "(") {
              depth++;
            } else if (source[end] === ")") {
              depth--;
            }
            end++;
          } while (end < length && depth > 0);
          if ("*+?".indexOf(source[end]) >= 0) {
            end++;
          }
          tokens.push({ boundary: source.slice(index, end) });
          index = end;
        } else if (char === "^" || char === "$") {
          tokens.push({ boundary: char });
          index++;
        } else {
          tokens.push({ single: char });
          index++;
        }
      }
      let out = EMPTY;
      let run = [];
      const flush = () => {
        let lastWildcard;
        run.forEach((token, at) => {
          if (token.wildcard) {
            lastWildcard = at;
          }
        });
        run.forEach((token, at) => {
          if (!token.wildcard) {
            out += token.single;
            return;
          }
          out += at === lastWildcard ? WILDCARD : `(?:(?!${separatorAfter(run, at)})[^\\/])*`;
        });
        run = [];
      };
      tokens.forEach((token) => {
        if (token.boundary === void 0) {
          run.push(token);
          return;
        }
        flush();
        out += token.boundary;
      });
      flush();
      return out;
    };
    var makeRegexPrefix = (pattern) => {
      if (REGEX_ANCHORED_GLOBSTAR.test(pattern)) {
        pattern = "**";
      }
      const { source, sources } = extractBrackets(pattern);
      const replaced = REPLACERS.reduce(
        // A pass whose matcher finds nothing hands back the very string it was
        //   given, so asking first costs a search and saves a rewrite. Ten of the
        //   fifteen passes never fire for a typical .gitignore line, and between
        //   them they were 45% of this chain.
        (prev, [matcher, replacer, required]) => {
          if (matcher === DIRECT) {
            return replacer(prev, pattern);
          }
          if (required !== UNDEFINED && prev.indexOf(required) < 0) {
            return prev;
          }
          return matcher.test(prev) ? prev.replace(matcher, replacer.bind(pattern)) : prev;
        },
        source
      );
      return sources.length ? replaced.replace(
        REGEX_RESTORE_PLACEHOLDER,
        (match, index) => sources[index]
      ) : replaced;
    };
    var checkSourceOf = (body, prefix) => {
      if (body[body.length - 1] === SLASH) {
        prefix = makeRegexPrefix(body.slice(0, -1));
      }
      const head = prefix.slice(0, -1);
      const last = prefix[prefix.length - 1];
      return last === TRAILING_WILDCARD ? `${head}$` : last === TRAILING_DOUBLESTAR ? `${head}.*$` : NEVER_MATCH;
    };
    var matchesBasename = (body) => {
      const index = body.indexOf(SLASH);
      return index < 0 || index === body.length - 1;
    };
    var basenameOf = (path7) => {
      const end = path7.length - 1;
      const index = path7.lastIndexOf(
        SLASH,
        path7[end] === SLASH ? end - 1 : end
      );
      return index < 0 ? path7 : path7.slice(index + 1);
    };
    var parentOf = (path7) => {
      if (path7.charCodeAt(0) === SLASH_CODE || path7.indexOf(DOUBLE_SLASH) >= 0) {
        const slices = path7.split(SLASH).filter(Boolean);
        slices.pop();
        return slices.length ? slices.join(SLASH) + SLASH : EMPTY;
      }
      const end = path7.length - 1;
      const cut = path7.lastIndexOf(
        SLASH,
        path7.charCodeAt(end) === SLASH_CODE ? end - 1 : end
      );
      return cut < 0 ? EMPTY : path7.slice(0, cut + 1);
    };
    var isString = (subject) => typeof subject === "string";
    var checkPattern = (pattern) => pattern && isString(pattern) && !REGEX_INVALID_TRAILING_BACKSLASH.test(pattern);
    var splitPattern = (pattern) => pattern.split(REGEX_SPLITALL_CRLF).filter(Boolean);
    var IgnoreRule = class {
      constructor(pattern, mark, body, ignoreCase, negative, prefix) {
        this.pattern = pattern;
        this.mark = mark;
        this.negative = negative;
        define(this, "body", body);
        define(this, "ignoreCase", ignoreCase);
        define(this, "regexPrefix", prefix);
      }
      // Worked out on first use and kept behind an own property, the way `regex`
      //   caches itself in `_regex`. Deciding it in the constructor instead would
      //   add a fourth `defineProperty` to every rule ever built, which cost 4% of
      //   every compile -- including the compiles of rules that are never matched
      //   against anything.
      get _basenameOnly() {
        return define(this, "_basenameOnly", matchesBasename(this.body));
      }
      get regex() {
        const key = UNDERSCORE + MODE_IGNORE;
        if (this[key]) {
          return this[key];
        }
        return this._make(MODE_IGNORE, key);
      }
      get checkRegex() {
        const key = UNDERSCORE + MODE_CHECK_IGNORE;
        if (this[key]) {
          return this[key];
        }
        return this._make(MODE_CHECK_IGNORE, key);
      }
      _make(mode, key) {
        const str = pinWildcards(
          mode === MODE_IGNORE ? this.regexPrefix.replace(REGEX_REPLACE_TRAILING_WILDCARD, replaceTrailingWildcard).replace(REGEX_REPLACE_TRAILING_DOUBLESTAR, replaceTrailingDoublestar) : checkSourceOf(this.body, this.regexPrefix)
        );
        const regex = this.ignoreCase ? new RegExp(str, "i") : new RegExp(str);
        return define(this, key, regex);
      }
    };
    var isLineEnd = (char) => char === "\r" || char === "\n";
    var trimEnd = (body) => {
      let end = body.length;
      while (end && isLineEnd(body[end - 1])) {
        end--;
      }
      const lineEnd = end;
      while (end && body[end - 1] === SPACE) {
        end--;
      }
      if (end === lineEnd) {
        return body.slice(0, end);
      }
      let backslashes = 0;
      while (backslashes < end && body[end - backslashes - 1] === ESCAPE) {
        backslashes++;
      }
      return backslashes % 2 ? body.slice(0, end - 1) + SPACE : body.slice(0, end);
    };
    var createRule = ({
      pattern,
      mark
    }, ignoreCase) => {
      let body = pattern[0] === BOM ? pattern.slice(1) : pattern;
      if (body[0] === "#") {
        return;
      }
      let negative = false;
      if (body[0] === "!") {
        negative = true;
        body = body.slice(1);
      }
      const last = body[body.length - 1];
      if (last === SPACE || last === "\r" || last === "\n") {
        body = trimEnd(body);
      }
      if (!body) {
        return;
      }
      body = body.replace(REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION, "!").replace(REGEX_REPLACE_LEADING_EXCAPED_HASH, "#");
      const regexPrefix = makeRegexPrefix(body);
      return new IgnoreRule(
        pattern,
        mark,
        body,
        ignoreCase,
        negative,
        regexPrefix
      );
    };
    var RuleManager = class {
      constructor(ignoreCase) {
        this._ignoreCase = ignoreCase;
        this._rules = [];
        this._basenameCount = 0;
      }
      _add(pattern) {
        if (pattern && pattern[KEY_IGNORE]) {
          this._rules = this._rules.concat(pattern._rules._rules);
          this._basenameCount += pattern._rules._basenameCount;
          this._added = true;
          return;
        }
        if (isString(pattern)) {
          pattern = {
            pattern
          };
        }
        const rule = checkPattern(pattern.pattern) && createRule(pattern, this._ignoreCase);
        if (rule) {
          this._added = true;
          this._rules.push(rule);
          if (matchesBasename(rule.body)) {
            this._basenameCount++;
          }
        }
      }
      // @param {Array<string> | string | Ignore} pattern
      add(pattern) {
        this._added = false;
        makeArray(
          isString(pattern) ? splitPattern(pattern) : pattern
        ).forEach(this._add, this);
        if (this._added) {
          this._literalRules = UNDEFINED;
        }
        return this._added;
      }
      // Match the literal 'abc/' for `checkIgnore`, last rule wins. Only a rule
      //   ending in a wildcard can match it (see `checkSourceOf`), so the rest
      //   are left out once, rather than tested or compiled for every path.
      testLiteral(path7) {
        const rules = this._literalRules || (this._literalRules = this._rules.filter(
          ({ body }) => body[body.length - (body[body.length - 1] === SLASH ? 2 : 1)] === "*"
        ));
        let ignored = false;
        let unignored = false;
        let matchedRule;
        for (let index = rules.length - 1; index >= 0; index--) {
          const rule = rules[index];
          if (rule.checkRegex.test(path7)) {
            ignored = !rule.negative;
            unignored = rule.negative;
            matchedRule = rule.negative ? UNDEFINED : rule;
            break;
          }
        }
        const ret = {
          ignored,
          unignored
        };
        if (matchedRule) {
          ret.rule = matchedRule;
        }
        return ret;
      }
      // Test one single path without recursively checking parent directories
      //
      // - mode `string` either `MODE_IGNORE` or `MODE_CHECK_IGNORE`
      // @returns {TestResult}
      test(path7, mode) {
        const rules = this._rules;
        const { length } = rules;
        const shortcut = this._basenameCount * 2 >= length;
        const basename = shortcut ? basenameOf(path7) : path7;
        for (let index = length - 1; index >= 0; index--) {
          const rule = rules[index];
          if (rule[mode].test(
            shortcut && rule._basenameOnly ? basename : path7
          )) {
            const { negative } = rule;
            const ret = {
              ignored: !negative,
              unignored: negative
            };
            if (!negative) {
              ret.rule = rule;
            }
            return ret;
          }
        }
        return {
          ignored: false,
          unignored: false
        };
      }
    };
    var throwError = (message, Ctor) => {
      throw new Ctor(message);
    };
    var checkPath = (path7, originalPath, doThrow) => {
      if (!isString(path7)) {
        return doThrow(
          `path must be a string, but got \`${originalPath}\``,
          TypeError
        );
      }
      if (!path7) {
        return doThrow(`path must not be empty`, TypeError);
      }
      if (checkPath.isNotRelative(path7)) {
        const r = "`path.relative()`d";
        return doThrow(
          `path should be a ${r} string, but got "${originalPath}"`,
          RangeError
        );
      }
      return true;
    };
    var isNotRelative = (path7) => {
      const first = path7.charCodeAt(0);
      if (first === SLASH_CODE) {
        return true;
      }
      if (first !== DOT_CODE) {
        return false;
      }
      if (path7.length === 1) {
        return true;
      }
      const second = path7.charCodeAt(1);
      if (second === SLASH_CODE) {
        return true;
      }
      if (second !== DOT_CODE) {
        return false;
      }
      return path7.length === 2 || path7.charCodeAt(2) === SLASH_CODE;
    };
    checkPath.isNotRelative = isNotRelative;
    checkPath.convert = (p) => p;
    var Ignore = class {
      constructor({
        ignorecase = true,
        ignoreCase = ignorecase,
        allowRelativePaths = false
      } = {}) {
        define(this, KEY_IGNORE, true);
        this._rules = new RuleManager(ignoreCase);
        this._strictPathCheck = !allowRelativePaths;
        this._initCache();
      }
      _initCache() {
        this._ignoreCache = /* @__PURE__ */ Object.create(null);
        this._testCache = /* @__PURE__ */ Object.create(null);
      }
      add(pattern) {
        if (this._rules.add(pattern)) {
          this._initCache();
        }
        return this;
      }
      // legacy
      addPattern(pattern) {
        return this.add(pattern);
      }
      // @returns {TestResult}
      _test(originalPath, cache) {
        const path7 = originalPath && checkPath.convert(originalPath);
        checkPath(
          path7,
          originalPath,
          this._strictPathCheck ? throwError : RETURN_FALSE
        );
        return this._t(path7, cache);
      }
      checkIgnore(path7) {
        if (path7.charCodeAt(path7.length - 1) !== SLASH_CODE) {
          return this.test(path7);
        }
        const dir = this._t(path7, this._testCache);
        if (dir.ignored) {
          return dir;
        }
        const literal = this._rules.testLiteral(path7);
        return literal.ignored || literal.unignored ? literal : dir;
      }
      _t(path7, cache) {
        if (path7 in cache) {
          return cache[path7];
        }
        const parentPath = parentOf(path7);
        const parent = parentPath ? this._t(parentPath, cache) : UNDEFINED;
        return cache[path7] = parent && parent.ignored ? parent : this._rules.test(path7, MODE_IGNORE);
      }
      ignores(path7) {
        return this._test(path7, this._ignoreCache).ignored;
      }
      createFilter() {
        return (path7) => !this.ignores(path7);
      }
      filter(paths) {
        return makeArray(paths).filter(this.createFilter());
      }
      // @returns {TestResult}
      test(path7) {
        return this._test(path7, this._testCache);
      }
    };
    var factory = (options) => new Ignore(options);
    var isPathValid = (path7) => checkPath(path7 && checkPath.convert(path7), path7, RETURN_FALSE);
    var setupWindows = () => {
      const makePosix = (str) => /^\\\\\?\\/.test(str) || /["<>|\u0000-\u001F]+/u.test(str) ? str : str.replace(/\\/g, "/");
      checkPath.convert = makePosix;
      const REGEX_TEST_WINDOWS_PATH_ABSOLUTE = /^[a-z]:\//i;
      checkPath.isNotRelative = (path7) => REGEX_TEST_WINDOWS_PATH_ABSOLUTE.test(path7) || isNotRelative(path7);
    };
    if (
      // Detect `process` so that it can run in browsers.
      typeof process !== "undefined" && process.platform === "win32"
    ) {
      setupWindows();
    }
    module2.exports = factory;
    factory.default = factory;
    module2.exports.isPathValid = isPathValid;
    define(module2.exports, Symbol.for("setupWindows"), setupWindows);
  }
});

// packages/cli/src/gate-chain.js
function sha256(buffer) {
  return import_node_crypto.default.createHash("sha256").update(buffer).digest("hex");
}
function getGitFiles(mode, cwd = process.cwd()) {
  try {
    const gitCmd = mode === "staged" ? "git diff --cached --name-only --diff-filter=ACMR" : "git diff --name-only --diff-filter=ACMR HEAD";
    const output = (0, import_node_child_process.execSync)(gitCmd, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
    return output.split("\n").map((line) => line.trim()).filter(Boolean).map((rel) => import_node_path2.default.resolve(cwd, rel));
  } catch {
    return [];
  }
}
async function createIgnoreChecker(rootDir, options = {}) {
  const ig = (0, import_ignore.default)();
  const ruleOrigins = [];
  if (!options.noDefaultIgnores && !options.includeAll) {
    ig.add(DEFAULT_IGNORES);
    for (const r of DEFAULT_IGNORES) ruleOrigins.push({ rule: r, source: "builtin" });
  }
  if (!options.includeIgnored && !options.includeAll) {
    const zapignorePath = import_node_path2.default.join(rootDir, ".zapwebpignore");
    const zapignoreContent = await (0, import_promises2.readFile)(zapignorePath, "utf8").catch(() => null);
    if (zapignoreContent) {
      const lines = zapignoreContent.split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
      ig.add(lines);
      for (const r of lines) ruleOrigins.push({ rule: r, source: ".zapwebpignore" });
    }
  }
  if (!options.includeIgnored && !options.includeAll && Array.isArray(options.configIgnores)) {
    ig.add(options.configIgnores);
    for (const r of options.configIgnores) ruleOrigins.push({ rule: r, source: ".zapwebp.config.json" });
  }
  return {
    isIgnored(filePath) {
      const rel = import_node_path2.default.relative(rootDir, filePath).replace(/\\/g, "/");
      if (rel.startsWith(".zapwebp/") || rel === ".zapwebp") {
        return { ignored: true, rule: ".zapwebp/**", source: "internal_artifact" };
      }
      const ignored = ig.ignores(rel);
      if (!ignored) return { ignored: false };
      const match = ruleOrigins.find((o) => {
        const testIg = (0, import_ignore.default)().add(o.rule);
        return testIg.ignores(rel);
      });
      return { ignored: true, rule: match?.rule || "matched pattern", source: match?.source || "ignore_rule" };
    }
  };
}
async function evaluateGateChain(filePath, context) {
  const {
    rootDir,
    ignoreChecker,
    fromFormat,
    maxFileSizeBytes = DEFAULT_MAX_FILE_SIZE,
    followSymlinks = false,
    allowOutside = false,
    allowUnsafe = false,
    force = false
  } = context;
  const resolved = import_node_path2.default.resolve(filePath);
  const relRoot = import_node_path2.default.relative(rootDir, resolved);
  const isOutside = relRoot === ".." || relRoot.startsWith(`..${import_node_path2.default.sep}`) || import_node_path2.default.isAbsolute(relRoot);
  if (isOutside && !allowOutside && !force) {
    return { inScope: false, reason: "outside_root", detail: "Path escapes project boundary" };
  }
  const lstats = await (0, import_promises2.lstat)(resolved).catch(() => null);
  if (!lstats) {
    return { inScope: false, reason: "not_found", detail: "File does not exist" };
  }
  if (lstats.isSymbolicLink() && !followSymlinks && !force) {
    return { inScope: false, reason: "symlink", detail: "Symbolic links ignored by default" };
  }
  const stats = await (0, import_promises2.stat)(resolved).catch(() => null);
  if (!stats || !stats.isFile()) {
    return { inScope: false, reason: "not_found", detail: "Not a regular file" };
  }
  const ignoreResult = ignoreChecker.isIgnored(resolved);
  if (ignoreResult.ignored) {
    return { inScope: false, reason: ignoreResult.source === "internal_artifact" ? "internal_artifact" : "ignored", detail: `${ignoreResult.source}: ${ignoreResult.rule}` };
  }
  if (stats.size > maxFileSizeBytes) {
    return { inScope: false, reason: "too_large", detail: `File exceeds size limit (${Math.round(stats.size / 1024 / 1024)}MB > ${Math.round(maxFileSizeBytes / 1024 / 1024)}MB)` };
  }
  let bytes;
  try {
    bytes = await (0, import_promises2.readFile)(resolved);
  } catch (err2) {
    return { inScope: false, reason: "permission_denied", detail: err2.message };
  }
  let format;
  const supportedInputs = import_core.default.registry && typeof import_core.default.registry.getSupportedInputs === "function" ? import_core.default.registry.getSupportedInputs() : INPUT_FORMATS;
  try {
    format = detectFormat(bytes);
  } catch (err2) {
    const ext = import_node_path2.default.extname(resolved).toLowerCase();
    if (ext === ".heic" || ext === ".heif") {
      return { inScope: false, reason: "unsupported_format", detail: "This format requires a plugin. Install it with: npm i -g zapwebp-format-heic" };
    }
    if (ext === ".jxl") {
      return { inScope: false, reason: "unsupported_format", detail: "This format requires a plugin. Install it with: npm i -g zapwebp-format-jxl" };
    }
    return { inScope: false, reason: "unsupported_format", detail: err2.message };
  }
  if (!supportedInputs.includes(format)) {
    return { inScope: false, reason: "unsupported_format", detail: `Unsupported format: ${format}` };
  }
  if (fromFormat && format !== fromFormat) {
    return { inScope: false, reason: "format_mismatch", detail: `Format is ${format}, expected ${fromFormat}` };
  }
  if (format === "svg") {
    const safety = checkSvgSafety(bytes);
    if (!safety.safe && !allowUnsafe) {
      return { inScope: false, reason: "unsafe_svg", detail: safety.detail };
    }
  }
  return {
    inScope: true,
    format,
    size: stats.size,
    mtimeMs: stats.mtimeMs,
    sha256: sha256(bytes),
    bytes
  };
}
var import_promises2, import_node_child_process, import_node_path2, import_node_crypto, import_ignore, import_core, detectFormat, checkSvgSafety, INPUT_FORMATS, DEFAULT_IGNORES, DEFAULT_MAX_FILE_SIZE;
var init_gate_chain = __esm({
  "packages/cli/src/gate-chain.js"() {
    import_promises2 = require("node:fs/promises");
    import_node_child_process = require("node:child_process");
    import_node_path2 = __toESM(require("node:path"), 1);
    import_node_crypto = __toESM(require("node:crypto"), 1);
    import_ignore = __toESM(require_ignore(), 1);
    import_core = __toESM(require_src2(), 1);
    ({ detectFormat, checkSvgSafety, INPUT_FORMATS } = import_core.default);
    DEFAULT_IGNORES = [
      "node_modules/**",
      ".git/**",
      ".next/**",
      ".nuxt/**",
      "dist/**",
      "build/**",
      "out/**",
      "coverage/**",
      "vendor/**",
      ".venv/**",
      "__pycache__/**",
      ".zapwebp/**"
    ];
    DEFAULT_MAX_FILE_SIZE = 10 * 1024 * 1024;
  }
});

// packages/cli/src/journal.js
function fileHash(buffer) {
  return import_node_crypto2.default.createHash("sha256").update(buffer).digest("hex");
}
function generateTransactionId() {
  const ts = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
  const rnd = import_node_crypto2.default.randomBytes(3).toString("hex");
  return `${ts}-${rnd}`;
}
function getJournalPaths(rootDir) {
  const zapDir = import_node_path3.default.resolve(rootDir, ".zapwebp");
  return {
    zapDir,
    journalDir: import_node_path3.default.join(zapDir, "journal"),
    backupsDir: import_node_path3.default.join(zapDir, "backups")
  };
}
async function writeTransaction(rootDir, transaction) {
  const { journalDir } = getJournalPaths(rootDir);
  await (0, import_promises3.mkdir)(journalDir, { recursive: true });
  const journalPath = import_node_path3.default.join(journalDir, `${transaction.id}.json`);
  await (0, import_promises3.writeFile)(journalPath, JSON.stringify(transaction, null, 2) + "\n", "utf8");
  return journalPath;
}
async function listTransactions(rootDir) {
  const { journalDir } = getJournalPaths(rootDir);
  const files = await (0, import_promises3.readdir)(journalDir).catch(() => []);
  const transactions = [];
  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    try {
      const content = await (0, import_promises3.readFile)(import_node_path3.default.join(journalDir, file), "utf8");
      const data = JSON.parse(content);
      transactions.push(data);
    } catch {
    }
  }
  return transactions.sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt));
}
async function undoTransaction(rootDir, targetId, options = {}) {
  const transactions = await listTransactions(rootDir);
  if (!transactions.length) {
    throw new Error("No conversion transactions found in .zapwebp/journal.");
  }
  const tx = targetId ? transactions.find((t2) => t2.id === targetId || t2.id.endsWith(targetId)) : transactions.find((t2) => t2.status !== "undone");
  if (!tx) {
    throw new Error(`Transaction not found or already undone: ${targetId || "latest"}`);
  }
  const { backupsDir, journalDir } = getJournalPaths(rootDir);
  const undoneOperations = [];
  for (const op of tx.operations) {
    const fullPath = import_node_path3.default.resolve(rootDir, op.path);
    if (op.type === "create") {
      const existing = await (0, import_promises3.readFile)(fullPath).catch(() => null);
      if (existing) {
        const currentHash = fileHash(existing);
        if (currentHash !== op.sha256 && !options.forceUndo) {
          throw new Error(`Cannot undo create for ${op.path}: file was modified since conversion. Use --force-undo to delete anyway.`);
        }
        const backupFile = import_node_path3.default.resolve(backupsDir, tx.id, op.path);
        await (0, import_promises3.mkdir)(import_node_path3.default.dirname(backupFile), { recursive: true });
        await (0, import_promises3.writeFile)(backupFile, existing);
        await (0, import_promises3.rm)(fullPath, { force: true });
        undoneOperations.push({ type: "delete_created", path: op.path });
      }
    } else if (op.type === "modify" || op.type === "delete") {
      const backupFile = import_node_path3.default.resolve(backupsDir, tx.id, op.backupPath || op.path);
      const backupData = await (0, import_promises3.readFile)(backupFile).catch(() => null);
      if (!backupData) {
        throw new Error(`Backup data missing for ${op.path} in transaction ${tx.id}`);
      }
      await (0, import_promises3.mkdir)(import_node_path3.default.dirname(fullPath), { recursive: true });
      await (0, import_promises3.writeFile)(fullPath, backupData);
      undoneOperations.push({ type: "restored_from_backup", path: op.path });
    }
  }
  tx.status = "undone";
  tx.undoneAt = (/* @__PURE__ */ new Date()).toISOString();
  await (0, import_promises3.writeFile)(import_node_path3.default.join(journalDir, `${tx.id}.json`), JSON.stringify(tx, null, 2) + "\n", "utf8");
  return {
    id: tx.id,
    undoneCount: undoneOperations.length,
    operations: undoneOperations
  };
}
async function redoTransaction(rootDir, targetId) {
  const transactions = await listTransactions(rootDir);
  const tx = targetId ? transactions.find((t2) => t2.id === targetId || t2.id.endsWith(targetId)) : transactions.find((t2) => t2.status === "undone");
  if (!tx) {
    throw new Error(`No undone transaction found to redo: ${targetId || "latest"}`);
  }
  const { journalDir, backupsDir } = getJournalPaths(rootDir);
  const redoneOps = [];
  for (const op of tx.operations) {
    const fullPath = import_node_path3.default.resolve(rootDir, op.path);
    if (op.type === "create" || op.type === "modify") {
      const backupFile = import_node_path3.default.resolve(backupsDir, tx.id, op.path);
      const backupData = await (0, import_promises3.readFile)(backupFile).catch(() => null);
      if (backupData) {
        await (0, import_promises3.mkdir)(import_node_path3.default.dirname(fullPath), { recursive: true });
        await (0, import_promises3.writeFile)(fullPath, backupData);
        redoneOps.push({ type: "recreated", path: op.path });
      }
    }
  }
  tx.status = "completed";
  delete tx.undoneAt;
  await (0, import_promises3.writeFile)(import_node_path3.default.join(journalDir, `${tx.id}.json`), JSON.stringify(tx, null, 2) + "\n", "utf8");
  return {
    id: tx.id,
    redoneCount: redoneOps.length,
    operations: redoneOps
  };
}
async function pruneJournal(rootDir, maxKeep = 50, maxAgeDays = 30) {
  const transactions = await listTransactions(rootDir);
  const now = Date.now();
  const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1e3;
  const { journalDir, backupsDir } = getJournalPaths(rootDir);
  let prunedCount = 0;
  for (let i = 0; i < transactions.length; i++) {
    const tx = transactions[i];
    const age = now - new Date(tx.startedAt).getTime();
    if (i >= maxKeep || age > maxAgeMs) {
      await (0, import_promises3.rm)(import_node_path3.default.join(journalDir, `${tx.id}.json`), { force: true }).catch(() => {
      });
      await (0, import_promises3.rm)(import_node_path3.default.join(backupsDir, tx.id), { recursive: true, force: true }).catch(() => {
      });
      prunedCount++;
    }
  }
  return { prunedCount };
}
var import_promises3, import_node_path3, import_node_crypto2;
var init_journal = __esm({
  "packages/cli/src/journal.js"() {
    import_promises3 = require("node:fs/promises");
    import_node_path3 = __toESM(require("node:path"), 1);
    import_node_crypto2 = __toESM(require("node:crypto"), 1);
  }
});

// packages/cli/src/gitignore.js
async function isGitRepo(rootDir) {
  let curr = import_node_path4.default.resolve(rootDir);
  while (true) {
    const gitDir = import_node_path4.default.join(curr, ".git");
    const info = await (0, import_promises4.stat)(gitDir).catch(() => null);
    if (info) return true;
    const parent = import_node_path4.default.dirname(curr);
    if (parent === curr) return false;
    curr = parent;
  }
}
async function readGitignore(rootDir) {
  const filePath = import_node_path4.default.join(rootDir, ".gitignore");
  try {
    const content = await (0, import_promises4.readFile)(filePath, "utf8");
    return { exists: true, content };
  } catch {
    return { exists: false, content: "" };
  }
}
function extractBlockPaths(content) {
  const startIdx = content.indexOf(BLOCK_START);
  const endIdx = content.indexOf(BLOCK_END);
  if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) return [];
  const blockText = content.slice(startIdx + BLOCK_START.length, endIdx);
  return blockText.split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
}
async function updateGitignoreBlock(rootDir, pathsToIgnore, options = {}) {
  const gitignorePath = import_node_path4.default.join(rootDir, ".gitignore");
  const { exists, content } = await readGitignore(rootDir);
  const normalizedPaths = [...new Set(
    pathsToIgnore.map((p) => p.trim().replace(/\\/g, "/")).map((p) => p.endsWith("/") || import_node_path4.default.extname(p) ? p : `${p}/`).filter(Boolean)
  )];
  const blockLines = [
    BLOCK_START,
    "# Converted image outputs \u2014 regenerate with `zap`",
    ...normalizedPaths.filter((p) => !p.startsWith(".zapwebp")),
    "# Reversible conversion journal \u2014 machine-local, do not commit",
    ...normalizedPaths.filter((p) => p.startsWith(".zapwebp")),
    BLOCK_END
  ];
  const newBlock = blockLines.join("\n");
  let newContent;
  const startIdx = content.indexOf(BLOCK_START);
  const endIdx = content.indexOf(BLOCK_END);
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    const before = content.slice(0, startIdx).trimEnd();
    const after = content.slice(endIdx + BLOCK_END.length).trimStart();
    newContent = (before ? before + "\n\n" : "") + newBlock + (after ? "\n\n" + after : "\n");
  } else {
    newContent = (content.trimEnd() ? content.trimEnd() + "\n\n" : "") + newBlock + "\n";
  }
  if (newContent !== content) {
    await (0, import_promises4.writeFile)(gitignorePath, newContent, "utf8");
    return { updated: true, paths: normalizedPaths };
  }
  return { updated: false, paths: normalizedPaths };
}
async function syncGitignore(rootDir, settings = {}) {
  const { outDir, commitOutputs = false, gitignoreMode = "auto" } = settings;
  if (gitignoreMode === "never" || gitignoreMode === "off") {
    return { applied: false };
  }
  const insideGit = await isGitRepo(rootDir);
  if (!insideGit && gitignoreMode !== "always") {
    return { applied: false };
  }
  const { content } = await readGitignore(rootDir);
  const existingBlockPaths = extractBlockPaths(content);
  const pathsToIgnore = new Set(existingBlockPaths);
  pathsToIgnore.add(".zapwebp/");
  if (outDir && !commitOutputs) {
    const relOut = import_node_path4.default.relative(rootDir, import_node_path4.default.resolve(rootDir, outDir)).replace(/\\/g, "/");
    if (relOut && relOut !== ".") {
      pathsToIgnore.add(relOut.endsWith("/") ? relOut : `${relOut}/`);
    }
  }
  const res = await updateGitignoreBlock(rootDir, Array.from(pathsToIgnore));
  return { applied: res.updated, paths: res.paths };
}
var import_promises4, import_node_path4, BLOCK_START, BLOCK_END;
var init_gitignore = __esm({
  "packages/cli/src/gitignore.js"() {
    import_promises4 = require("node:fs/promises");
    import_node_path4 = __toESM(require("node:path"), 1);
    BLOCK_START = "# >>> zapwebp >>>";
    BLOCK_END = "# <<< zapwebp <<<";
  }
});

// packages/cli/src/config.js
async function loadConfigFile(rootDir, explicitConfigPath) {
  if (explicitConfigPath) {
    const full = import_node_path5.default.resolve(rootDir, explicitConfigPath);
    const content = await (0, import_promises5.readFile)(full, "utf8");
    return { config: JSON.parse(content), filePath: full };
  }
  for (const filename of CONFIG_FILENAMES) {
    const full = import_node_path5.default.join(rootDir, filename);
    const exists = await (0, import_promises5.stat)(full).then((s) => s.isFile(), () => false);
    if (exists) {
      try {
        const content = await (0, import_promises5.readFile)(full, "utf8");
        return { config: JSON.parse(content), filePath: full };
      } catch (err2) {
        throw new Error(`Failed to parse configuration file ${filename}: ${err2.message}`);
      }
    }
  }
  return { config: {}, filePath: null };
}
function resolveConfigPrecedence({ cliOptions = {}, fileConfig = {}, env = process.env }) {
  const resolved = {};
  const origins = {};
  const fields = [
    "format",
    "to",
    "quality",
    "lossless",
    "effort",
    "scales",
    "scale",
    "baseWidth",
    "width",
    "height",
    "fit",
    "outDir",
    "background",
    "clean",
    "stripMetadata",
    "verifyClean",
    "assertAlpha",
    "report",
    "maxFileSizeBytes",
    "followSymlinks",
    "allowOutsideRoot",
    "lockTarget",
    "strict",
    "overrideLock"
  ];
  for (const field of fields) {
    if (cliOptions[field] !== void 0) {
      resolved[field] = cliOptions[field];
      origins[field] = "cli_flag";
      continue;
    }
    let fileVal = fileConfig[field];
    if (field === "lockTarget") {
      fileVal = fileConfig.lockTarget || fileConfig.output?.lock || fileConfig.ingest?.target || fileConfig.lock;
    } else if (field === "strict") {
      fileVal = fileConfig.strict !== void 0 ? fileConfig.strict : fileConfig.output?.strict !== void 0 ? fileConfig.output.strict : fileConfig.ingest?.strict;
    } else if (field === "background") {
      fileVal = fileConfig.background || fileConfig.defaultBackground || fileConfig.output?.background;
    }
    if (fileVal !== void 0) {
      resolved[field] = fileVal;
      origins[field] = "config_file";
      continue;
    }
    if (field === "lockTarget" && (env.ZAPWEBP_TARGET !== void 0 || env.ZAPWEBP_LOCK_TARGET !== void 0)) {
      resolved[field] = env.ZAPWEBP_TARGET || env.ZAPWEBP_LOCK_TARGET;
      origins[field] = "env_var";
      continue;
    }
    if (field === "strict" && env.ZAPWEBP_STRICT !== void 0) {
      resolved[field] = env.ZAPWEBP_STRICT === "true" || env.ZAPWEBP_STRICT === "1";
      origins[field] = "env_var";
      continue;
    }
    if (field === "background" && (env.ZAPWEBP_BACKGROUND !== void 0 || env.ZAPWEBP_DEFAULT_BACKGROUND !== void 0)) {
      resolved[field] = env.ZAPWEBP_BACKGROUND || env.ZAPWEBP_DEFAULT_BACKGROUND;
      origins[field] = "env_var";
      continue;
    }
    const envKey = `ZAPWEBP_${field.replace(/([A-Z])/g, "_$1").toUpperCase()}`;
    if (env[envKey] !== void 0) {
      resolved[field] = env[envKey];
      origins[field] = "env_var";
      continue;
    }
    const defaultField = field === "to" ? "format" : field === "scale" ? "scales" : field;
    if (DEFAULT_CONFIG[defaultField] !== void 0) {
      resolved[field] = DEFAULT_CONFIG[defaultField];
      origins[field] = "default";
    }
  }
  return { resolved, origins };
}
var import_promises5, import_node_path5, import_shared2, CONFIG_FILENAMES, DEFAULT_CONFIG;
var init_config = __esm({
  "packages/cli/src/config.js"() {
    import_promises5 = require("node:fs/promises");
    import_node_path5 = __toESM(require("node:path"), 1);
    import_shared2 = __toESM(require_src(), 1);
    CONFIG_FILENAMES = [".zapwebp.config.json", "zapwebp.config.json", "zapwebp.json", ".zapwebp.json"];
    DEFAULT_CONFIG = {
      format: import_shared2.DEFAULT_OPTIONS.to,
      quality: import_shared2.DEFAULT_OPTIONS.quality,
      lossless: import_shared2.DEFAULT_OPTIONS.lossless,
      effort: import_shared2.DEFAULT_OPTIONS.effort,
      scales: [...import_shared2.DEFAULT_OPTIONS.scale],
      baseWidth: import_shared2.DEFAULT_OPTIONS.baseWidth,
      clean: import_shared2.DEFAULT_OPTIONS.clean,
      maxFileSizeBytes: 10 * 1024 * 1024,
      followSymlinks: false,
      allowOutsideRoot: false,
      lockTarget: void 0,
      strict: true,
      overrideLock: false,
      gitignore: {
        outputs: "auto",
        journal: "auto"
      }
    };
  }
});

// packages/cli/src/index.js
var src_exports = {};
function parseArgs(argv) {
  const parsed = { inputs: [], options: {} };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") parsed.help = true;
    else if (arg === "--lossless") parsed.options.lossless = true;
    else if (arg === "--watch") parsed.watch = true;
    else if (arg === "--manifest") parsed.manifest = true;
    else if (arg === "--check") parsed.check = true;
    else if (arg === "--dry-run") parsed.dryRun = true;
    else if (arg === "--json") parsed.json = true;
    else if (arg === "--stdin") parsed.stdin = true;
    else if (arg === "--list") parsed.list = true;
    else if (arg === "--pick") parsed.pick = true;
    else if (arg === "--here") parsed.here = true;
    else if (arg === "--files") {
      const value = argv[++i];
      if (!value) throw new Error(`${arg} requires a file path.`);
      parsed.filesFile = value;
    } else if (arg === "--concurrency") {
      const value = argv[++i];
      if (!value) throw new Error(`${arg} requires a number.`);
      parsed.concurrency = Number(value);
    } else if (arg === "--keep") {
      const value = argv[++i];
      if (!value) throw new Error(`${arg} requires metadata handler names (comma-separated).`);
      parsed.options.keep = value.split(",").map((s) => s.trim().toLowerCase());
    } else if (arg === "--lang") {
      const value = argv[++i];
      if (!value) throw new Error(`${arg} requires a locale code (e.g. en, tl).`);
      parsed.lang = value.toLowerCase();
    } else if (arg === "--strip") {
      const next = argv[i + 1];
      if (next && !next.startsWith("-")) {
        i++;
        parsed.options.strip = next.split(",").map((s) => s.trim().toLowerCase());
      } else {
        parsed.options.stripMetadata = true;
      }
    } else if (arg === "--lock-target") {
      const value = argv[++i];
      if (!value) throw new Error(`${arg} requires a target format.`);
      parsed.lockTarget = value.toLowerCase();
      parsed.options.lockTarget = value.toLowerCase();
    } else if (arg === "--strict") {
      parsed.strict = true;
      parsed.options.strict = true;
    } else if (arg === "--no-strict") {
      parsed.strict = false;
      parsed.options.strict = false;
    } else if (arg === "--override-lock") {
      parsed.overrideLock = true;
      parsed.options.overrideLock = true;
    } else if (arg === "--clean") parsed.options.clean = true;
    else if (arg === "--no-clean") parsed.options.clean = false;
    else if (arg === "--verify-clean") parsed.options.verifyClean = true;
    else if (arg === "--assert-alpha") parsed.options.assertAlpha = true;
    else if (arg === "--report") parsed.options.report = true;
    else if (arg === "--zip") parsed.zip = true;
    else if (arg === "--srcset") parsed.srcset = true;
    else if (arg === "--changed") parsed.changed = true;
    else if (arg === "--staged") parsed.staged = true;
    else if (arg === "--include-ignored") parsed.includeIgnored = true;
    else if (arg === "--include-all") parsed.includeAll = true;
    else if (arg === "--no-default-ignores") parsed.noDefaultIgnores = true;
    else if (arg === "--follow-symlinks") parsed.followSymlinks = true;
    else if (arg === "--allow-outside") parsed.allowOutside = true;
    else if (arg === "--allow-unsafe") parsed.allowUnsafe = true;
    else if (arg === "--force") parsed.force = true;
    else if (arg === "--force-undo") parsed.forceUndo = true;
    else if (arg === "--commit-outputs") parsed.commitOutputs = true;
    else if (arg === "--gitignore=off") parsed.gitignoreOff = true;
    else if (arg === "--hook") parsed.hook = true;
    else if (arg === "--scale" || arg === "--scales") {
      const value = argv[++i];
      if (!value) throw new Error(`${arg} needs a multiplier value, e.g. 1,2,3`);
      parsed.scales = parseScales(value);
    } else if (arg === "--base-width") {
      const value = argv[++i];
      if (!value) throw new Error(`${arg} needs a pixel value, e.g. 512`);
      parsed.baseWidth = Number(value);
    } else if (["-o", "--output", "--out-dir", "--width", "--height", "--quality", "--effort", "--fit", "--to", "--from", "--background", "--config"].includes(arg)) {
      const value = argv[++i];
      if (!value) throw new Error(`${arg} needs a value.`);
      if (arg === "-o" || arg === "--output") parsed.output = value;
      else if (arg === "--out-dir") parsed.outDir = value;
      else if (arg === "--config") parsed.config = value;
      else if (arg === "--to") parsed.targets = value.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
      else if (arg === "--from") parsed.from = value.toLowerCase();
      else if (arg === "--fit" || arg === "--background") parsed.options[arg.slice(2)] = value;
      else parsed.options[arg.slice(2)] = Number(value);
    } else if (arg === "-") parsed.inputs.push("-");
    else if (arg.startsWith("-")) throw new Error(`Unknown option: ${arg}`);
    else parsed.inputs.push(arg);
  }
  return parsed;
}
async function writeAtomic(filePath, data) {
  return writeSafe(filePath, data);
}
function commonDirectory(paths) {
  if (!paths || !paths.length) return process.cwd();
  const resolved = paths.map((p) => import_node_path6.default.resolve(p));
  let common = import_node_path6.default.extname(resolved[0]) ? import_node_path6.default.dirname(resolved[0]) : resolved[0];
  for (let i = 0; i < resolved.length; i++) {
    const item = resolved[i];
    while (!item.startsWith(common + import_node_path6.default.sep) && item !== common) {
      const parent = import_node_path6.default.dirname(common);
      if (parent === common) break;
      common = parent;
    }
  }
  return common;
}
function inputRootForPatterns(patterns, files, rootDir = process.cwd()) {
  const roots = [];
  for (const pat of patterns) {
    if (pat === "-" || pat.startsWith("-")) continue;
    const resolved = import_node_path6.default.resolve(rootDir, pat);
    const magicIndex = resolved.search(/[*?{}[\]]/);
    if (magicIndex !== -1) {
      const prefix = resolved.slice(0, magicIndex);
      const lastSep = prefix.lastIndexOf(import_node_path6.default.sep);
      roots.push(lastSep !== -1 ? prefix.slice(0, lastSep) : prefix);
    }
  }
  if (roots.length) {
    return commonDirectory(roots);
  }
  if (files && files.length > 1) {
    return commonDirectory(files);
  }
  if (files && files.length === 1) {
    return import_node_path6.default.dirname(import_node_path6.default.resolve(files[0]));
  }
  return rootDir;
}
function outputFor(input, inputs, output, outDir, inputRoot, target, scale = 1) {
  const extension = target === "jpeg" ? "jpg" : target;
  const suffix = scaleSuffix(scale);
  let destination;
  if (output && inputs.length === 1 && !output.endsWith(".zip")) {
    const ext = import_node_path6.default.extname(output);
    const base = output.slice(0, -ext.length);
    destination = scale === 1 ? import_node_path6.default.resolve(output) : import_node_path6.default.resolve(`${base}${suffix}${ext}`);
  } else if (!outDir) {
    destination = import_node_path6.default.join(import_node_path6.default.dirname(input), outputName(input, target, scale));
  } else {
    const rel = import_node_path6.default.relative(inputRoot, input);
    const relPath = rel.startsWith("..") ? import_node_path6.default.basename(input) : rel;
    destination = import_node_path6.default.join(outDir, relPath.replace(/\.[^.]+$/, `${suffix}.${extension}`));
  }
  return destination;
}
async function main() {
  const rootDir = process.cwd();
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(HELP);
    return;
  }
  if (args.inputs[0] === "init") {
    const configPath = import_node_path6.default.join(rootDir, ".zapwebp.config.json");
    const zapignorePath = import_node_path6.default.join(rootDir, ".zapwebpignore");
    const starterConfig = {
      format: DEFAULT_OPTIONS2.to,
      quality: DEFAULT_OPTIONS2.quality,
      scales: [1, 2, 3],
      baseWidth: DEFAULT_OPTIONS2.baseWidth,
      clean: DEFAULT_OPTIONS2.clean,
      outDir: DEFAULT_OPTIONS2.outDir,
      gitignore: { outputs: "auto", journal: "auto" }
    };
    await writeAtomic(configPath, JSON.stringify(starterConfig, null, 2) + "\n");
    const starterIgnore = `# .zapwebpignore
# Ignore legacy assets or raw sources
src/icons/legacy/**
**/*.bak.svg
`;
    await writeAtomic(zapignorePath, starterIgnore);
    await syncGitignore(rootDir, { outDir: "public/icons", commitOutputs: args.commitOutputs, gitignoreMode: "always" });
    if (args.hook) {
      const hookPath = import_node_path6.default.join(rootDir, ".git", "hooks", "pre-commit");
      if (await (0, import_promises6.stat)(import_node_path6.default.dirname(hookPath)).then(() => true, () => false)) {
        await (0, import_promises6.writeFile)(hookPath, "#!/bin/sh\nzap --staged --check\n", { mode: 493 });
        process.stdout.write("\u2713 Installed Git pre-commit hook (.git/hooks/pre-commit)\n");
      }
    }
    process.stdout.write("\u2713 Initialized Zap in this project:\n  - Created .zapwebp.config.json\n  - Created .zapwebpignore\n  - Synchronized .gitignore\n");
    return;
  }
  if (args.inputs[0] === "undo") {
    const targetId = args.inputs[1];
    const res = await undoTransaction(rootDir, targetId, { forceUndo: args.forceUndo });
    process.stdout.write(`\u2713 Undone transaction ${res.id} (${res.undoneCount} operations reverted)
`);
    for (const op of res.operations) {
      process.stdout.write(`  - ${op.type}: ${op.path}
`);
    }
    return;
  }
  if (args.inputs[0] === "redo") {
    const targetId = args.inputs[1];
    const res = await redoTransaction(rootDir, targetId);
    process.stdout.write(`\u2713 Redone transaction ${res.id} (${res.redoneCount} operations re-applied)
`);
    return;
  }
  if (args.inputs[0] === "history") {
    const history = await listTransactions(rootDir);
    if (args.json) {
      process.stdout.write(JSON.stringify(history, null, 2) + "\n");
    } else {
      process.stdout.write("\nRecent Transactions:\n\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n");
      if (!history.length) process.stdout.write("  No transactions recorded in .zapwebp/journal.\n");
      for (const t2 of history) {
        process.stdout.write(`  ${t2.id} [${t2.status.toUpperCase()}] ${t2.startedAt} (${t2.operations.length} ops)
    Command: ${t2.command}
`);
      }
      process.stdout.write("\n");
    }
    return;
  }
  if (args.inputs[0] === "show") {
    const targetId = args.inputs[1];
    if (!targetId) throw new Error("Usage: zap show <transaction-id>");
    const history = await listTransactions(rootDir);
    const tx = history.find((t2) => t2.id === targetId || t2.id.endsWith(targetId));
    if (!tx) throw new Error(`Transaction not found: ${targetId}`);
    if (args.json) {
      process.stdout.write(JSON.stringify(tx, null, 2) + "\n");
    } else {
      process.stdout.write(`
Transaction: ${tx.id}
Status: ${tx.status}
Started: ${tx.startedAt}
Command: ${tx.command}
Operations:
`);
      for (const op of tx.operations) {
        process.stdout.write(`  - ${op.type} ${op.path} (${op.bytes || 0} bytes, sha256: ${op.sha256?.slice(0, 10)}...)
`);
      }
      process.stdout.write("\n");
    }
    return;
  }
  if (args.inputs[0] === "gc") {
    const res = await pruneJournal(rootDir);
    process.stdout.write(`\u2713 Garbage collected journal: pruned ${res.prunedCount} old transaction logs.
`);
    return;
  }
  if (args.inputs[0] === "doctor") {
    const nodeMajor = Number(process.versions.node.split(".")[0]);
    const insideGit = await isGitRepo(rootDir);
    const { journalDir } = getJournalPaths(rootDir);
    let journalWritable = false;
    try {
      await (0, import_promises6.mkdir)(journalDir, { recursive: true });
      journalWritable = true;
    } catch {
    }
    process.stdout.write("\nZap Health Diagnostics:\n\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n");
    process.stdout.write(`Node.js version:      v${process.versions.node} ${nodeMajor >= 22 ? "\u2713" : "\u2717 (Needs >=22)"}
`);
    process.stdout.write(`Git Repository:       ${insideGit ? "\u2713 Active" : "- Not a git repo"}
`);
    process.stdout.write(`Journal Permissions:  ${journalWritable ? "\u2713 Writable" : "\u2717 Read-only"}
`);
    process.stdout.write(`Engine Availability:  \u2713 @zapwebp/core ready (resvg + sharp)
`);
    process.stdout.write(`Telemetry:            \u2713 Disabled (0 network calls)

`);
    return;
  }
  if (args.inputs[0] === "gitignore") {
    const sub = args.inputs[1];
    const { content } = await readGitignore(rootDir);
    const blockPaths = extractBlockPaths(content);
    if (sub === "show" || !sub) {
      process.stdout.write("\nPaths currently managed in .gitignore block:\n");
      if (!blockPaths.length) process.stdout.write("  (none)\n");
      for (const p of blockPaths) process.stdout.write(`  - ${p}
`);
      process.stdout.write("\n");
      return;
    }
    if (sub === "add") {
      const p = args.inputs[2];
      if (!p) throw new Error("Usage: zap gitignore add <path>");
      const updated = [.../* @__PURE__ */ new Set([...blockPaths, p])];
      await updateGitignoreBlock(rootDir, updated);
      process.stdout.write(`\u2713 Added ${p} to .gitignore block
`);
      return;
    }
    if (sub === "remove") {
      const p = args.inputs[2];
      if (!p) throw new Error("Usage: zap gitignore remove <path>");
      const updated = blockPaths.filter((item) => item !== p && item !== `${p}/`);
      await updateGitignoreBlock(rootDir, updated);
      process.stdout.write(`\u2713 Removed ${p} from .gitignore block
`);
      return;
    }
    throw new Error(`Unknown gitignore subcommand: ${sub}. Choose show, add, or remove.`);
  }
  if (args.inputs[0] === "audit" && args.inputs.length > 1 && !args.inputs[1].includes("*") && (args.inputs[1].includes(" ") || /\b(magick|convert|cwebp)\b/.test(args.inputs.slice(1).join(" ")))) {
    const commandToAudit = args.inputs.slice(1).join(" ").trim();
    const result = auditConversionCommand(commandToAudit);
    if (args.json) {
      process.stdout.write(JSON.stringify(result, null, 2) + "\n");
    } else {
      process.stdout.write(`
Command: ${commandToAudit}
`);
      process.stdout.write(`Safe: ${result.safe ? "YES" : "NO"}
`);
      if (result.issues.length) {
        process.stdout.write("Issues detected:\n");
        for (const issue of result.issues) process.stdout.write(`  - ${issue}
`);
      }
      process.stdout.write(`Recommended Zap command:
  ${result.recommendedCommand}

`);
    }
    if (!result.safe) process.exitCode = 1;
    return;
  }
  if (args.inputs[0] === "explain-black-bg" || args.inputs[0] === "explain-black-background") {
    const result = explainBlackBackground();
    if (args.json) {
      process.stdout.write(JSON.stringify(result, null, 2) + "\n");
    } else {
      process.stdout.write(`
Root Cause: ${result.cause}

Technical details:
`);
      for (const item of result.technicalDetails) process.stdout.write(`  - ${item}
`);
      process.stdout.write(`
Remedy:
  ${result.remedy}

Zap Solution:
  ${result.zapSolution}

`);
    }
    return;
  }
  if (args.inputs[0] === "inspect") {
    const fileToInspect = args.inputs[1];
    if (!fileToInspect) throw new Error("The inspect command requires an image file path.");
    const inputData = await (0, import_promises6.readFile)(import_node_path6.default.resolve(fileToInspect));
    const result = await inspectImage(inputData);
    if (args.json) {
      process.stdout.write(JSON.stringify(result, null, 2) + "\n");
    } else {
      process.stdout.write(`
File: ${fileToInspect}
`);
      process.stdout.write(`Format: ${result.format.toUpperCase()}
`);
      process.stdout.write(`Dimensions: ${result.width || "vector"} \xD7 ${result.height || "vector"}
`);
      process.stdout.write(`Transparency: ${result.hasAlpha ? "yes" : "no"}
`);
      process.stdout.write(`Size: ${result.bytes} bytes
`);
      process.stdout.write(`Container Metadata: ${result.metadata.hasMetadata ? result.metadata.summary.join(", ") : "none (clean)"}

`);
    }
    return;
  }
  const { config: fileConfig } = await loadConfigFile(rootDir, args.config);
  const { resolved: options, origins } = resolveConfigPrecedence({
    cliOptions: { ...args.options, outDir: args.outDir, from: args.from },
    fileConfig
  });
  if (args.inputs[0] === "config" && (args.inputs[1] === "show" || !args.inputs[1])) {
    if (args.json) {
      process.stdout.write(JSON.stringify({ options, origins }, null, 2) + "\n");
    } else {
      process.stdout.write("\nResolved Configuration & Precedence:\n\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n");
      for (const [k, v] of Object.entries(options)) {
        process.stdout.write(`  ${k.padEnd(20)} ${String(Array.isArray(v) ? v.join(",") : v).padEnd(20)} (${origins[k]})
`);
      }
      process.stdout.write("\n");
    }
    return;
  }
  const ignoreChecker = await createIgnoreChecker(rootDir, {
    includeIgnored: args.includeIgnored,
    includeAll: args.includeAll,
    noDefaultIgnores: args.noDefaultIgnores,
    configIgnores: fileConfig.ignore
  });
  if (args.inputs[0] === "ignored") {
    const targetDir = import_node_path6.default.resolve(args.inputs[1] || ".");
    const matched = [];
    for await (const file of (0, import_promises6.glob)("**/*", { cwd: targetDir, nodir: true })) {
      const full = import_node_path6.default.resolve(targetDir, file);
      const res = ignoreChecker.isIgnored(full);
      if (res.ignored) {
        matched.push({ path: import_node_path6.default.relative(rootDir, full), ...res });
      }
    }
    if (args.json) {
      process.stdout.write(JSON.stringify(matched, null, 2) + "\n");
    } else {
      process.stdout.write(`
Ignored Files in ${import_node_path6.default.relative(rootDir, targetDir) || "."}:
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
`);
      for (const m of matched) {
        process.stdout.write(`  ${m.path.padEnd(35)} [${m.source}] rule: ${m.rule}
`);
      }
      process.stdout.write(`
Total ignored: ${matched.length}

`);
    }
    return;
  }
  if (args.inputs[0] === "explain") {
    const targetFile = args.inputs[1];
    if (!targetFile) throw new Error("Usage: zap explain <file>");
    const gateResult = await evaluateGateChain(targetFile, {
      rootDir,
      ignoreChecker,
      fromFormat: args.from,
      followSymlinks: args.followSymlinks,
      allowOutside: args.allowOutside,
      allowUnsafe: args.allowUnsafe,
      force: args.force
    });
    if (args.json) {
      process.stdout.write(JSON.stringify(gateResult, null, 2) + "\n");
    } else {
      process.stdout.write(`
File: ${targetFile}
`);
      process.stdout.write(`In Scope: ${gateResult.inScope ? "YES \u2713" : "NO \u2717"}
`);
      if (!gateResult.inScope) {
        process.stdout.write(`Reason:   ${gateResult.reason}
`);
        process.stdout.write(`Detail:   ${gateResult.detail}
`);
      } else {
        process.stdout.write(`Format:   ${gateResult.format}
`);
        process.stdout.write(`Size:     ${gateResult.size} bytes
`);
      }
      process.stdout.write("\n");
    }
    return;
  }
  let rawCandidates = [];
  if (args.here && !args.inputs.length) {
    for await (const f of (0, import_promises6.glob)("*", { cwd: rootDir, nodir: true })) rawCandidates.push(import_node_path6.default.resolve(rootDir, f));
  } else if (args.changed) {
    rawCandidates = getGitFiles("changed", rootDir);
  } else if (args.staged) {
    rawCandidates = getGitFiles("staged", rootDir);
  } else if (args.inputs[0] === "audit") {
    const patterns = args.inputs.slice(1).length ? args.inputs.slice(1) : ["**/*"];
    for (const pat of patterns) {
      for await (const f of (0, import_promises6.glob)(pat, { cwd: rootDir, nodir: true })) rawCandidates.push(import_node_path6.default.resolve(rootDir, f));
    }
  } else if (args.inputs.length) {
    for (const pat of args.inputs) {
      if (pat === "-") {
        rawCandidates.push("-");
        continue;
      }
      if (!/[*?{}[\]]/.test(pat)) {
        rawCandidates.push(import_node_path6.default.resolve(rootDir, pat));
      } else {
        for await (const f of (0, import_promises6.glob)(pat, { cwd: rootDir, nodir: true })) rawCandidates.push(import_node_path6.default.resolve(rootDir, f));
      }
    }
  } else if (fileConfig.include) {
    const incs = Array.isArray(fileConfig.include) ? fileConfig.include : [fileConfig.include];
    for (const pat of incs) {
      for await (const f of (0, import_promises6.glob)(pat, { cwd: rootDir, nodir: true })) rawCandidates.push(import_node_path6.default.resolve(rootDir, f));
    }
  }
  if (args.filesFile) {
    const listPath = import_node_path6.default.resolve(rootDir, args.filesFile);
    const content = await (0, import_promises6.readFile)(listPath, "utf8");
    const lines = content.split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
    for (const l of lines) {
      rawCandidates.push(import_node_path6.default.resolve(rootDir, l));
    }
  }
  if (args.stdin || rawCandidates.includes("-")) {
    const chunks = [];
    for await (const chunk of process.stdin) chunks.push(chunk);
    const inputBuffer = Buffer.concat(chunks);
    const format = detectFormat2(inputBuffer);
    const targetFormat = args.targets?.[0] || options.to || "webp";
    const converted = await convertImage(inputBuffer, { ...options, to: targetFormat });
    if (args.output) {
      await writeAtomic(import_node_path6.default.resolve(args.output), converted.data);
    } else {
      process.stdout.write(converted.data);
    }
    return;
  }
  if (!rawCandidates.length) {
    throw new Error("No input files or globs specified.\n\n" + HELP);
  }
  rawCandidates = [...new Set(rawCandidates)];
  const inScopeFiles = [];
  const skippedFiles = [];
  const skipReasons = {};
  for (const candidate of rawCandidates) {
    const gate = await evaluateGateChain(candidate, {
      rootDir,
      ignoreChecker,
      fromFormat: args.from,
      followSymlinks: args.followSymlinks,
      allowOutside: args.allowOutside,
      allowUnsafe: args.allowUnsafe,
      force: args.force
    });
    if (gate.inScope) {
      inScopeFiles.push({ path: candidate, ...gate });
    } else {
      skippedFiles.push({ path: candidate, ...gate });
      skipReasons[gate.reason] = (skipReasons[gate.reason] || 0) + 1;
    }
  }
  const lockTarget = args.lockTarget || options.lockTarget;
  const isStrict = options.strict !== void 0 ? Boolean(options.strict) : lockTarget ? true : false;
  const overrideLock = Boolean(args.overrideLock || options.overrideLock);
  if (lockTarget && !overrideLock && isStrict && skippedFiles.some((f) => f.reason === "unsupported_format")) {
    const failedFile = skippedFiles.find((f) => f.reason === "unsupported_format");
    process.stderr.write(`\u274C ${import_node_path6.default.relative(rootDir, failedFile.path)}: E_UNSUPPORTED_FORMAT: Cannot decode this file into the locked target format (${lockTarget}).
Fix: Upload a supported format, or install the format plugin for this file.
`);
    process.exitCode = 1;
    return;
  }
  if (lockTarget && !overrideLock && !isStrict) {
    const passThroughCandidates = skippedFiles.filter((f) => f.reason === "unsupported_format");
    for (const item of passThroughCandidates) {
      inScopeFiles.push({ path: item.path, ...item, passedThrough: true });
    }
  }
  if (args.list) {
    if (args.json) {
      process.stdout.write(JSON.stringify({
        count: inScopeFiles.length,
        files: inScopeFiles.map((f, idx) => ({
          index: idx + 1,
          path: import_node_path6.default.relative(rootDir, f.path),
          size: f.size,
          format: f.format
        }))
      }, null, 2) + "\n");
    } else {
      process.stdout.write(`
Found ${inScopeFiles.length} media file(s):
`);
      process.stdout.write("\u2500".repeat(54) + "\n");
      inScopeFiles.forEach((f, idx) => {
        const rel = import_node_path6.default.relative(rootDir, f.path);
        const sizeStr = `${(f.size / 1024).toFixed(1)} KB`;
        process.stdout.write(`  [${String(idx + 1).padStart(2)}] ${rel.padEnd(28)} ${sizeStr.padStart(8)}   ${(f.format || "").toUpperCase()}
`);
      });
      process.stdout.write("\nLegend: [index] name \xB7 size \xB7 format\nRun `zap --list --json` for machine-readable output.\n\n");
    }
    return;
  }
  if (args.pick) {
    if (args.json) {
      process.stdout.write(JSON.stringify({
        count: inScopeFiles.length,
        files: inScopeFiles.map((f, idx) => ({
          index: idx + 1,
          path: import_node_path6.default.relative(rootDir, f.path),
          size: f.size,
          format: f.format,
          selected: false
        }))
      }, null, 2) + "\n");
      return;
    }
    const readline = await import("node:readline/promises");
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    try {
      process.stdout.write(`
Found ${inScopeFiles.length} media file(s):
`);
      inScopeFiles.forEach((f, idx) => {
        process.stdout.write(`  [${idx + 1}] ${import_node_path6.default.relative(rootDir, f.path)} (${(f.size / 1024).toFixed(1)} KB, ${(f.format || "").toUpperCase()})
`);
      });
      const ans = await rl.question('\nEnter indices to convert (comma-separated, e.g. 1,2 or "all"): ');
      if (ans.trim().toLowerCase() !== "all" && ans.trim().length > 0) {
        const indices = ans.split(",").map((s) => Number(s.trim())).filter((n) => Number.isInteger(n) && n >= 1 && n <= inScopeFiles.length);
        if (indices.length) {
          const selected = indices.map((i) => inScopeFiles[i - 1]);
          inScopeFiles.length = 0;
          inScopeFiles.push(...selected);
        }
      }
    } finally {
      rl.close();
    }
  }
  let targetFormats;
  if (lockTarget && !overrideLock) {
    targetFormats = [lockTarget];
  } else {
    targetFormats = args.targets?.length ? args.targets : [options.to || options.format || "webp"];
  }
  const scales = args.scales?.length ? args.scales : options.scales?.length ? options.scales : [1];
  const baseWidth = args.baseWidth || options.baseWidth || 512;
  const configuredOutDir = args.outDir || options.outDir;
  const outDir = configuredOutDir ? import_node_path6.default.resolve(rootDir, configuredOutDir) : args.here ? rootDir : void 0;
  const patternsForRoot = args.inputs.length ? args.inputs : fileConfig.include ? Array.isArray(fileConfig.include) ? fileConfig.include : [fileConfig.include] : [];
  const commonBase = inputRootForPatterns(patternsForRoot, inScopeFiles.map((f) => f.path), rootDir);
  const plannedOutputsCount = inScopeFiles.length * targetFormats.length * scales.length;
  if (args.dryRun) {
    const plannedRecords = [];
    for (const fileItem of inScopeFiles) {
      for (const target of targetFormats) {
        for (const scale of scales) {
          const dest = outputFor(fileItem.path, inScopeFiles.map((f) => f.path), args.output, outDir, commonBase, target, scale);
          plannedRecords.push({
            input: fileItem.path,
            output: dest,
            scale,
            format: target,
            status: "planned"
          });
        }
      }
    }
    if (args.json) {
      process.stdout.write(`${JSON.stringify(plannedRecords)}
`);
    } else {
      process.stdout.write(`
zap run ${(/* @__PURE__ */ new Date()).toISOString()} (dry-run)
`);
      process.stdout.write("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n");
      process.stdout.write(`Scanned     ${rawCandidates.length} files
`);
      process.stdout.write(`In scope    ${inScopeFiles.length} files
`);
      process.stdout.write(`Skipped     ${skippedFiles.length} files
`);
      for (const [r, count] of Object.entries(skipReasons)) {
        process.stdout.write(`  \u251C\u2500 ${r.padEnd(20)} ${count}
`);
      }
      process.stdout.write(`Outputs     ${plannedOutputsCount} files (${inScopeFiles.length} \xD7 ${scales.length} scales)
`);
      process.stdout.write("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n");
      process.stdout.write("Re-run without --dry-run to apply.\n\n");
    }
    return;
  }
  if (!args.json) {
    process.stdout.write(`
zap run ${(/* @__PURE__ */ new Date()).toISOString()}
`);
    process.stdout.write("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n");
    process.stdout.write(`Scanned     ${rawCandidates.length} files
`);
    process.stdout.write(`In scope    ${inScopeFiles.length} files
`);
    process.stdout.write(`Skipped     ${skippedFiles.length} files
`);
    for (const [r, count] of Object.entries(skipReasons)) {
      process.stdout.write(`  \u251C\u2500 ${r.padEnd(20)} ${count}
`);
    }
    process.stdout.write(`Outputs     ${plannedOutputsCount} files (${inScopeFiles.length} \xD7 ${scales.length} scales)
`);
    process.stdout.write("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n");
  }
  if (args.inputs[0] === "audit") {
    if (args.json) {
      process.stdout.write(JSON.stringify({ scanned: rawCandidates.length, inScope: inScopeFiles.length, skipped: skippedFiles }, null, 2) + "\n");
    }
    return;
  }
  if (!inScopeFiles.length) {
    if (args.check) process.exitCode = 1;
    if (!args.watch) return;
  }
  const transactionId = generateTransactionId();
  const operations = [];
  const records = [];
  for (const fileItem of inScopeFiles) {
    const currentBytes = await (0, import_promises6.readFile)(fileItem.path).catch(() => null);
    if (!currentBytes || sha256(currentBytes) !== fileItem.sha256) {
      skippedFiles.push({ path: fileItem.path, reason: "changed_during_run" });
      continue;
    }
    for (const target of targetFormats) {
      for (const scale of scales) {
        const dest = outputFor(fileItem.path, inScopeFiles.map((f) => f.path), args.output, outDir, commonBase, target, scale);
        const computeWidth = () => {
          if (options.width !== void 0) return Math.round(options.width * scale);
          if (args.scales?.length || args.baseWidth) return Math.round(baseWidth * scale);
          return void 0;
        };
        const computedWidth = computeWidth();
        const targetOptions = {
          ...options,
          to: target,
          lockTarget,
          strict: isStrict,
          overrideLock,
          ...computedWidth ? { width: computedWidth } : {}
        };
        const existingOutput = await (0, import_promises6.readFile)(dest).catch(() => null);
        if (args.check) {
          records.push({
            input: fileItem.path,
            output: dest,
            status: existingOutput ? "current" : "stale"
          });
          continue;
        }
        let converted;
        try {
          converted = await convertImage(currentBytes, targetOptions);
        } catch (err2) {
          if (err2.code === "E_UNSUPPORTED_FORMAT") {
            process.stderr.write(`\u274C ${import_node_path6.default.relative(rootDir, fileItem.path)}: ${err2.message}
Fix: ${err2.fix}
`);
            process.exitCode = 1;
            return;
          }
          throw err2;
        }
        if (converted.passedThrough) {
          await writeAtomic(dest, currentBytes);
          records.push({
            input: fileItem.path,
            output: dest,
            scale,
            format: "unknown",
            size: currentBytes.length,
            passedThrough: true,
            status: "passed_through"
          });
          continue;
        }
        await writeAtomic(dest, converted.data);
        operations.push({
          type: "create",
          path: import_node_path6.default.relative(rootDir, dest).replace(/\\/g, "/"),
          sha256: sha256(converted.data),
          bytes: converted.size
        });
        records.push({
          input: fileItem.path,
          output: dest,
          scale,
          format: target,
          size: converted.size,
          width: converted.width,
          height: converted.height,
          alphaPreserved: converted.alphaPreserved,
          clean: converted.clean,
          certificate: converted.certificate,
          removedMetadata: converted.removedMetadata,
          status: "converted"
        });
      }
    }
  }
  if (args.zip && !args.dryRun) {
    const zipEntries = {};
    for (const r of records) {
      if (r.status === "converted") {
        const rel = import_node_path6.default.relative(outDir || commonBase, r.output).replace(/\\/g, "/");
        zipEntries[rel] = await (0, import_promises6.readFile)(r.output);
      }
    }
    const manifestData = {
      generatedBy: "zap 1.1.0",
      generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      settings: { format: targetFormats.join(","), scales, baseWidth },
      records
    };
    zipEntries["manifest.json"] = Buffer.from(JSON.stringify(manifestData, null, 2) + "\n", "utf8");
    const archiveBuffer = zipSync(zipEntries);
    const archivePath = args.output && args.output.endsWith(".zip") ? import_node_path6.default.resolve(args.output) : import_node_path6.default.join(outDir || commonBase, "zap-export.zip");
    await writeAtomic(archivePath, archiveBuffer);
    process.stdout.write(`\u2713 Created archive ${archivePath} (${archiveBuffer.length} bytes; ${records.length} files)
`);
  }
  if (args.manifest && !args.dryRun) {
    const manifestPath = import_node_path6.default.join(outDir || commonBase, "manifest.json");
    const manifestData = {
      generatedBy: "zap 1.1.0",
      generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      settings: { format: targetFormats.join(","), scales, baseWidth },
      records
    };
    await writeAtomic(manifestPath, JSON.stringify(manifestData, null, 2) + "\n");
  }
  if (args.srcset) {
    for (const fileItem of inScopeFiles) {
      process.stdout.write(generateSrcset(fileItem.path, scales, targetFormats[0]) + "\n");
    }
  }
  if (operations.length && !args.dryRun) {
    await writeTransaction(rootDir, {
      id: transactionId,
      startedAt: (/* @__PURE__ */ new Date()).toISOString(),
      finishedAt: (/* @__PURE__ */ new Date()).toISOString(),
      command: process.argv.slice(2).join(" "),
      cwd: rootDir,
      status: "completed",
      operations
    });
  }
  if (!args.gitignoreOff) {
    await syncGitignore(rootDir, {
      outDir: configuredOutDir,
      commitOutputs: args.commitOutputs
    });
  }
  if (args.json) {
    process.stdout.write(`${JSON.stringify(records)}
`);
  } else {
    for (const r of records) {
      process.stdout.write(`${r.status === "converted" ? "\u2713" : "="} ${r.input} \u2192 ${r.output}${r.size ? ` (${r.size} bytes)` : ""}
`);
    }
  }
  if (args.check && records.some((r) => r.status === "stale")) {
    process.exitCode = 1;
  }
  if (args.watch) {
    const watchDir = commonBase || rootDir;
    process.stdout.write(`Watching ${import_node_path6.default.relative(rootDir, watchDir) || "."} for changes...
`);
    const watcher = (0, import_node_fs.watch)(watchDir, { recursive: true }, async (eventType, filename) => {
      if (!filename) return;
      const fullPath = import_node_path6.default.resolve(watchDir, filename);
      if (outDir && (fullPath === outDir || fullPath.startsWith(outDir + import_node_path6.default.sep))) return;
      if (fullPath.includes(".zapwebp")) return;
      await new Promise((resolve) => setTimeout(resolve, 60));
      const fileStat = await (0, import_promises6.stat)(fullPath).catch(() => null);
      if (!fileStat || !fileStat.isFile()) return;
      const gate = await evaluateGateChain(fullPath, {
        rootDir,
        ignoreChecker,
        fromFormat: args.from,
        followSymlinks: args.followSymlinks,
        allowOutside: args.allowOutside,
        allowUnsafe: args.allowUnsafe,
        force: true
      });
      if (!gate.inScope) return;
      const currentBytes = await (0, import_promises6.readFile)(fullPath).catch(() => null);
      if (!currentBytes || currentBytes.length === 0) return;
      for (const target of targetFormats) {
        for (const scale of scales) {
          const dest = outputFor(fullPath, [fullPath], args.output, outDir, commonBase, target, scale);
          const computeWidth = () => {
            if (options.width !== void 0) return Math.round(options.width * scale);
            if (args.scales?.length || args.baseWidth) return Math.round(baseWidth * scale);
            return void 0;
          };
          const computedWidth = computeWidth();
          const targetOptions = {
            ...options,
            to: target,
            ...computedWidth ? { width: computedWidth } : {}
          };
          try {
            const converted = await convertImage(currentBytes, targetOptions);
            await writeAtomic(dest, converted.data);
            process.stdout.write(`\u2713 ${import_node_path6.default.relative(rootDir, fullPath)} \u2192 ${import_node_path6.default.relative(rootDir, dest)} (${converted.size} bytes)
`);
          } catch (err2) {
            process.stderr.write(`zap watch error on ${filename}: ${err2.message}
`);
          }
        }
      }
    });
    await new Promise((resolve) => {
      process.on("SIGINT", () => {
        watcher.close();
        resolve();
      });
      process.on("SIGTERM", () => {
        watcher.close();
        resolve();
      });
    });
  }
}
var import_promises6, import_node_fs, import_node_path6, import_core2, import_shared3, DEFAULT_OPTIONS2, ZapwebpError2, setLocale, t, convertImage, inspectImage, detectFormat2, outputName, parseScales, scaleSuffix, generateSrcset, auditConversionCommand, explainBlackBackground, INPUT_FORMATS2, OUTPUT_FORMATS, HELP;
var init_src = __esm({
  "packages/cli/src/index.js"() {
    import_promises6 = require("node:fs/promises");
    import_node_fs = require("node:fs");
    import_node_path6 = __toESM(require("node:path"), 1);
    init_esm();
    import_core2 = __toESM(require_src2(), 1);
    import_shared3 = __toESM(require_src(), 1);
    init_fs();
    init_gate_chain();
    init_journal();
    init_gitignore();
    init_config();
    ({ DEFAULT_OPTIONS: DEFAULT_OPTIONS2, ZapwebpError: ZapwebpError2, setLocale, t } = import_shared3.default);
    ({
      convertImage,
      inspectImage,
      detectFormat: detectFormat2,
      outputName,
      parseScales,
      scaleSuffix,
      generateSrcset,
      auditConversionCommand,
      explainBlackBackground,
      INPUT_FORMATS: INPUT_FORMATS2,
      OUTPUT_FORMATS
    } = import_core2.default);
    HELP = `zapwebp \u2014 SVG \u2192 WebP, safe, reversible, and scoped.

USAGE
  zap [paths...] [options]
  zap <command> [options]

COMMANDS
  init              Set up config, ignore rules, and .gitignore
  watch             Convert on change (undoable)
  audit             Dry-run + safety audit report or command linter
  check             CI mode: exit 1 if any conversion is needed
  explain <file>    Explain why a file will or won't convert
  ignored [dir]     Explain why files are skipped by ignore rules
  history           List past conversion transactions
  undo [id|step]    Revert the last run (or a specific transaction)
  redo [id]         Reapply the last undone transaction
  show <id>         Inspect a transaction's operations
  gc                Prune old journal logs and backups
  gitignore <subcmd> Manage .gitignore block (show, add, remove)
  config show       Display resolved configuration and origins
  doctor            Verify system environment and dependencies
  inspect <image>   Analyze image container and metadata chunks
  explain-black-bg  Explain ImageMagick black background bugs

OPTIONS
  -o, --output <file>     Output file (single input) or .zip archive
      --out-dir <dir>     Destination folder for converted outputs
      --to <formats>      Target format(s), comma-separated (default: webp)
      --from <format>     Restrict input format filter
      --scale <scales>    Multiplier scales, e.g. 1,2,3 (default: 1)
      --base-width <px>   Base pixel width for scale 1x (default: 512)
      --width <px>        Explicit output width (max 4096)
      --height <px>       Explicit output height (max 4096)
      --fit <mode>        contain, cover, fill, inside, outside
      --quality <0-100>   Compression quality (default: 85)
      --lossless          Encode losslessly where supported
      --effort <0-9>      Encoding effort
      --background <col>  Flatten color for JPEG output
      --clean             Strip AI provenance and metadata (default: true)
      --no-clean          Preserve container metadata
      --verify-clean      Enforce 0 metadata chunks and Clean Certificate
      --assert-alpha      Strictly fail if transparent input loses alpha
      --lock-target <fmt> Enforce many-to-one conversion to specified format
      --strict            Strictly fail on unconvertible inputs (default when locked)
      --no-strict         Pass through unconvertible files unchanged
      --override-lock     Explicit opt-in to bypass configured target lock
      --zip               Bundle outputs into a single ZIP archive
      --srcset            Print responsive <img srcset> HTML tags
      --changed           Only convert files modified vs HEAD (git)
      --staged            Only convert files in git staging area
      --include-ignored   Bypass .zapwebpignore and config ignores
      --include-all       Bypass all ignore layers including built-ins
      --follow-symlinks   Follow symbolic links (disabled by default)
      --allow-outside     Allow paths outside current workspace
      --allow-unsafe      Permit SVGs with minor safety warnings
      --force             Force conversion of up-to-date files
      --force-undo        Force undo even if outputs were modified
      --commit-outputs    Do not add outDir to .gitignore
      --gitignore=off     Disable automatic .gitignore management
      --stdin             Read image from standard input
      --manifest          Write manifest.json
      --dry-run           Plan conversion without writing files or journal
      --json              Emit machine-readable JSON output
      --config <file>     Explicit path to configuration file
  -h, --help              Show this help

SAFETY & PRIVACY
  \u2022 Zero telemetry. Zero network calls. Files never leave your machine.
  \u2022 Reversible: every run creates an undoable journal in .zapwebp/journal/.
  \u2022 TOCTOU safe: files are re-verified immediately before writing.
  \u2022 Atomic writes: tmp -> rename ensures no half-written files.
`;
    main().catch((error) => {
      if (error instanceof ZapwebpError2) {
        process.stderr.write(`\u26A1 zap! ${error.message}
`);
        if (error.fix) process.stderr.write(`   \u2192 ${error.fix}
`);
        if (error.docs) process.stderr.write(`   \u2192 ${error.docs}
`);
        process.exit(error.exitCode || 1);
      }
      process.stderr.write(`zap: ${error.message}
`);
      process.exitCode = 1;
    });
  }
});

// packages/cli/bin/zap.js
Promise.resolve().then(() => (init_src(), src_exports)).catch((error) => {
  process.stderr.write(`zap: ${error.message}
`);
  process.exitCode = 1;
});
