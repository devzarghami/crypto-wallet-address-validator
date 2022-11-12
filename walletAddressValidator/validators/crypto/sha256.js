/**
 * A JavaScript implementation of the SHA family of hashes - defined in FIPS PUB 180-4, FIPS PUB 202,
 * and SP 800-185 - as well as the corresponding HMAC implementation as defined in FIPS PUB 198-1.
 *
 * Copyright 2008-2020 Brian Turek, 1998-2009 Paul Johnston & Contributors
 * Distributed under the BSD License
 * See http://caligatio.github.com/jsSHA/ for more information
 *
 * Two ECMAScript polyfill functions carry the following license:
 *
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED,
 * INCLUDING WITHOUT LIMITATION ANY IMPLIED WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 * MERCHANTABLITY OR NON-INFRINGEMENT.
 *
 * See the Apache Version 2.0 License for specific language governing permissions and limitations under the License.
 */
!(function (t, r) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = r() : typeof define === 'function' && define.amd ? define(r) : (t = typeof globalThis !== 'undefined' ? globalThis : t || self).jsSHA = r()
}(this, function () {
  'use strict'
  var t = function (r, n) {
    return (t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (t, r) {
      t.__proto__ = r
    } || function (t, r) {
      for (const n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
    })(r, n)
  }
  const r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

  function n (t, r, n, i) {
    let e; let o; let u; const s = r || [0]; const f = (n = n || 0) >>> 3; const h = i === -1 ? 3 : 0
    for (e = 0; e < t.length; e += 1) o = (u = e + f) >>> 2, s.length <= o && s.push(0), s[o] |= t[e] << 8 * (h + i * (u % 4))
    return { value: s, binLen: 8 * t.length + n }
  }

  function i (t, i, e) {
    switch (i) {
      case 'UTF8':
      case 'UTF16BE':
      case 'UTF16LE':
        break
      default:
        throw new Error('encoding must be UTF8, UTF16BE, or UTF16LE')
    }
    switch (t) {
      case 'HEX':
        return function (t, r, n) {
          return (function (t, r, n, i) {
            let e, o, u, s
            if (t.length % 2 != 0) throw new Error('String of HEX type must be in byte increments')
            const f = r || [0]; const h = (n = n || 0) >>> 3; const a = i === -1 ? 3 : 0
            for (e = 0; e < t.length; e += 2) {
              if (o = parseInt(t.substr(e, 2), 16), isNaN(o)) throw new Error('String of HEX type contains invalid characters')
              for (u = (s = (e >>> 1) + h) >>> 2; f.length <= u;) f.push(0)
              f[u] |= o << 8 * (a + i * (s % 4))
            }
            return { value: f, binLen: 4 * t.length + n }
          }(t, r, n, e))
        }
      case 'TEXT':
        return function (t, r, n) {
          return (function (t, r, n, i, e) {
            let o; let u; let s; let f; let h; let a; let c; let w; let v = 0; const E = n || [0]; const A = (i = i || 0) >>> 3
            if (r === 'UTF8') {
              for (c = e === -1 ? 3 : 0, s = 0; s < t.length; s += 1) {
                for (u = [], (o = t.charCodeAt(s)) < 128 ? u.push(o) : o < 2048 ? (u.push(192 | o >>> 6), u.push(128 | 63 & o)) : o < 55296 || o >= 57344 ? u.push(224 | o >>> 12, 128 | o >>> 6 & 63, 128 | 63 & o) : (s += 1, o = 65536 + ((1023 & o) << 10 | 1023 & t.charCodeAt(s)), u.push(240 | o >>> 18, 128 | o >>> 12 & 63, 128 | o >>> 6 & 63, 128 | 63 & o)), f = 0; f < u.length; f += 1) {
                  for (h = (a = v + A) >>> 2; E.length <= h;) E.push(0)
                  E[h] |= u[f] << 8 * (c + e * (a % 4)), v += 1
                }
              }
            } else {
              for (c = e === -1 ? 2 : 0, w = r === 'UTF16LE' && e !== 1 || r !== 'UTF16LE' && e === 1, s = 0; s < t.length; s += 1) {
                for (o = t.charCodeAt(s), !0 === w && (o = (f = 255 & o) << 8 | o >>> 8), h = (a = v + A) >>> 2; E.length <= h;) E.push(0)
                E[h] |= o << 8 * (c + e * (a % 4)), v += 2
              }
            }
            return { value: E, binLen: 8 * v + i }
          }(t, i, r, n, e))
        }
      case 'B64':
        return function (t, n, i) {
          return (function (t, n, i, e) {
            let o; let u; let s; let f; let h; let a; let c = 0; const w = n || [0]; const v = (i = i || 0) >>> 3; const E = e === -1 ? 3 : 0
            const A = t.indexOf('=')
            if (t.search(/^[a-zA-Z0-9=+/]+$/) === -1) throw new Error('Invalid character in base-64 string')
            if (t = t.replace(/=/g, ''), A !== -1 && A < t.length) throw new Error("Invalid '=' found in base-64 string")
            for (o = 0; o < t.length; o += 4) {
              for (f = t.substr(o, 4), s = 0, u = 0; u < f.length; u += 1) s |= r.indexOf(f.charAt(u)) << 18 - 6 * u
              for (u = 0; u < f.length - 1; u += 1) {
                for (h = (a = c + v) >>> 2; w.length <= h;) w.push(0)
                w[h] |= (s >>> 16 - 8 * u & 255) << 8 * (E + e * (a % 4)), c += 1
              }
            }
            return { value: w, binLen: 8 * c + i }
          }(t, n, i, e))
        }
      case 'BYTES':
        return function (t, r, n) {
          return (function (t, r, n, i) {
            let e; let o; let u; let s; const f = r || [0]; const h = (n = n || 0) >>> 3; const a = i === -1 ? 3 : 0
            for (o = 0; o < t.length; o += 1) e = t.charCodeAt(o), u = (s = o + h) >>> 2, f.length <= u && f.push(0), f[u] |= e << 8 * (a + i * (s % 4))
            return { value: f, binLen: 8 * t.length + n }
          }(t, r, n, e))
        }
      case 'ARRAYBUFFER':
        try {
          new ArrayBuffer(0)
        } catch (t) {
          throw new Error('ARRAYBUFFER not supported by this environment')
        }
        return function (t, r, i) {
          return (function (t, r, i, e) {
            return n(new Uint8Array(t), r, i, e)
          }(t, r, i, e))
        }
      case 'UINT8ARRAY':
        try {
          new Uint8Array(0)
        } catch (t) {
          throw new Error('UINT8ARRAY not supported by this environment')
        }
        return function (t, r, i) {
          return n(t, r, i, e)
        }
      default:
        throw new Error('format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY')
    }
  }

  function e (t, n, i, e) {
    switch (t) {
      case 'HEX':
        return function (t) {
          return (function (t, r, n, i) {
            let e; let o; let u = ''; const s = r / 8; const f = n === -1 ? 3 : 0
            for (e = 0; e < s; e += 1) o = t[e >>> 2] >>> 8 * (f + n * (e % 4)), u += '0123456789abcdef'.charAt(o >>> 4 & 15) + '0123456789abcdef'.charAt(15 & o)
            return i.outputUpper ? u.toUpperCase() : u
          }(t, n, i, e))
        }
      case 'B64':
        return function (t) {
          return (function (t, n, i, e) {
            let o; let u; let s; let f; let h; let a = ''; const c = n / 8; const w = i === -1 ? 3 : 0
            for (o = 0; o < c; o += 3) for (f = o + 1 < c ? t[o + 1 >>> 2] : 0, h = o + 2 < c ? t[o + 2 >>> 2] : 0, s = (t[o >>> 2] >>> 8 * (w + i * (o % 4)) & 255) << 16 | (f >>> 8 * (w + i * ((o + 1) % 4)) & 255) << 8 | h >>> 8 * (w + i * ((o + 2) % 4)) & 255, u = 0; u < 4; u += 1) a += 8 * o + 6 * u <= n ? r.charAt(s >>> 6 * (3 - u) & 63) : e.b64Pad
            return a
          }(t, n, i, e))
        }
      case 'BYTES':
        return function (t) {
          return (function (t, r, n) {
            let i; let e; let o = ''; const u = r / 8; const s = n === -1 ? 3 : 0
            for (i = 0; i < u; i += 1) e = t[i >>> 2] >>> 8 * (s + n * (i % 4)) & 255, o += String.fromCharCode(e)
            return o
          }(t, n, i))
        }
      case 'ARRAYBUFFER':
        try {
          new ArrayBuffer(0)
        } catch (t) {
          throw new Error('ARRAYBUFFER not supported by this environment')
        }
        return function (t) {
          return (function (t, r, n) {
            let i; const e = r / 8; const o = new ArrayBuffer(e); const u = new Uint8Array(o); const s = n === -1 ? 3 : 0
            for (i = 0; i < e; i += 1) u[i] = t[i >>> 2] >>> 8 * (s + n * (i % 4)) & 255
            return o
          }(t, n, i))
        }
      case 'UINT8ARRAY':
        try {
          new Uint8Array(0)
        } catch (t) {
          throw new Error('UINT8ARRAY not supported by this environment')
        }
        return function (t) {
          return (function (t, r, n) {
            let i; const e = r / 8; const o = n === -1 ? 3 : 0; const u = new Uint8Array(e)
            for (i = 0; i < e; i += 1) u[i] = t[i >>> 2] >>> 8 * (o + n * (i % 4)) & 255
            return u
          }(t, n, i))
        }
      default:
        throw new Error('format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY')
    }
  }

  const o = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]
  const u = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]
  const s = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]

  function f (t) {
    const r = { outputUpper: !1, b64Pad: '=', outputLen: -1 }; const n = t || {}; const i = 'Output length must be a multiple of 8'
    if (r.outputUpper = n.outputUpper || !1, n.b64Pad && (r.b64Pad = n.b64Pad), n.outputLen) {
      if (n.outputLen % 8 != 0) throw new Error(i)
      r.outputLen = n.outputLen
    } else if (n.shakeLen) {
      if (n.shakeLen % 8 != 0) throw new Error(i)
      r.outputLen = n.shakeLen
    }
    if (typeof r.outputUpper !== 'boolean') throw new Error('Invalid outputUpper formatting option')
    if (typeof r.b64Pad !== 'string') throw new Error('Invalid b64Pad formatting option')
    return r
  }

  function h (t, r) {
    return t >>> r | t << 32 - r
  }

  function a (t, r) {
    return t >>> r
  }

  function c (t, r, n) {
    return t & r ^ ~t & n
  }

  function w (t, r, n) {
    return t & r ^ t & n ^ r & n
  }

  function v (t) {
    return h(t, 2) ^ h(t, 13) ^ h(t, 22)
  }

  function E (t, r) {
    const n = (65535 & t) + (65535 & r)
    return (65535 & (t >>> 16) + (r >>> 16) + (n >>> 16)) << 16 | 65535 & n
  }

  function A (t, r, n, i) {
    const e = (65535 & t) + (65535 & r) + (65535 & n) + (65535 & i)
    return (65535 & (t >>> 16) + (r >>> 16) + (n >>> 16) + (i >>> 16) + (e >>> 16)) << 16 | 65535 & e
  }

  function p (t, r, n, i, e) {
    const o = (65535 & t) + (65535 & r) + (65535 & n) + (65535 & i) + (65535 & e)
    return (65535 & (t >>> 16) + (r >>> 16) + (n >>> 16) + (i >>> 16) + (e >>> 16) + (o >>> 16)) << 16 | 65535 & o
  }

  function d (t) {
    return h(t, 7) ^ h(t, 18) ^ a(t, 3)
  }

  function l (t) {
    return h(t, 6) ^ h(t, 11) ^ h(t, 25)
  }

  function R (t) {
    return t == 'SHA-224' ? u.slice() : s.slice()
  }

  function y (t, r) {
    let n; let i; let e; let u; let s; let f; let R; let y; let U; let b; let T; let m; const F = []
    for (n = r[0], i = r[1], e = r[2], u = r[3], s = r[4], f = r[5], R = r[6], y = r[7], T = 0; T < 64; T += 1) F[T] = T < 16 ? t[T] : A(h(m = F[T - 2], 17) ^ h(m, 19) ^ a(m, 10), F[T - 7], d(F[T - 15]), F[T - 16]), U = p(y, l(s), c(s, f, R), o[T], F[T]), b = E(v(n), w(n, i, e)), y = R, R = f, f = s, s = E(u, U), u = e, e = i, i = n, n = E(U, b)
    return r[0] = E(n, r[0]), r[1] = E(i, r[1]), r[2] = E(e, r[2]), r[3] = E(u, r[3]), r[4] = E(s, r[4]), r[5] = E(f, r[5]), r[6] = E(R, r[6]), r[7] = E(y, r[7]), r
  }

  return (function (r) {
    function n (t, n, e) {
      let o = this
      if (t !== 'SHA-224' && t !== 'SHA-256') throw new Error('Chosen SHA variant is not supported')
      const u = e || {}
      return (o = r.call(this, t, n, e) || this).t = o.i, o.o = !0, o.u = -1, o.s = i(o.h, o.v, o.u), o.A = y, o.p = function (t) {
        return t.slice()
      }, o.l = R, o.R = function (r, n, i, e) {
        return (function (t, r, n, i, e) {
          for (var o, u = 15 + (r + 65 >>> 9 << 4), s = r + n; t.length <= u;) t.push(0)
          for (t[r >>> 5] |= 128 << 24 - r % 32, t[u] = 4294967295 & s, t[u - 1] = s / 4294967296 | 0, o = 0; o < t.length; o += 16) i = y(t.slice(o, o + 16), i)
          return e === 'SHA-224' ? [i[0], i[1], i[2], i[3], i[4], i[5], i[6]] : i
        }(r, n, i, e, t))
      }, o.U = R(t), o.T = 512, o.m = t === 'SHA-224' ? 224 : 256, o.F = !1, u.hmacKey && o.B(function (t, r, n, e) {
        const o = t + ' must include a value and format'
        if (!r) {
          if (!e) throw new Error(o)
          return e
        }
        if (void 0 === r.value || !r.format) throw new Error(o)
        return i(r.format, r.encoding || 'UTF8', n)(r.value)
      }('hmacKey', u.hmacKey, o.u)), o
    }

    return (function (r, n) {
      function i () {
        this.constructor = r
      }

      t(r, n), r.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i())
    }(n, r)), n
  }(function () {
    function t (t, r, n) {
      const i = n || {}
      if (this.h = r, this.v = i.encoding || 'UTF8', this.numRounds = i.numRounds || 1, isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || this.numRounds < 1) throw new Error('numRounds must a integer >= 1')
      this.g = t, this.Y = [], this.H = 0, this.S = !1, this.I = 0, this.C = !1, this.L = [], this.N = []
    }

    return t.prototype.update = function (t) {
      let r; let n = 0; const i = this.T >>> 5; const e = this.s(t, this.Y, this.H); const o = e.binLen; const u = e.value; const s = o >>> 5
      for (r = 0; r < s; r += i) n + this.T <= o && (this.U = this.A(u.slice(r, r + i), this.U), n += this.T)
      this.I += n, this.Y = u.slice(n >>> 5), this.H = o % this.T, this.S = !0
    }, t.prototype.getHash = function (t, r) {
      let n; let i; let o = this.m; const u = f(r)
      if (this.F) {
        if (u.outputLen === -1) throw new Error('Output length must be specified in options')
        o = u.outputLen
      }
      const s = e(t, o, this.u, u)
      if (this.C && this.t) return s(this.t(u))
      for (i = this.R(this.Y.slice(), this.H, this.I, this.p(this.U), o), n = 1; n < this.numRounds; n += 1) this.F && o % 32 != 0 && (i[i.length - 1] &= 16777215 >>> 24 - o % 32), i = this.R(i, o, 0, this.l(this.g), o)
      return s(i)
    }, t.prototype.setHMACKey = function (t, r, n) {
      if (!this.o) throw new Error('Variant does not support HMAC')
      if (this.S) throw new Error('Cannot set MAC key after calling update')
      const e = i(r, (n || {}).encoding || 'UTF8', this.u)
      this.B(e(t))
    }, t.prototype.B = function (t) {
      let r; const n = this.T >>> 3; const i = n / 4 - 1
      if (this.numRounds !== 1) throw new Error('Cannot set numRounds with MAC')
      if (this.C) throw new Error('MAC key already set')
      for (n < t.binLen / 8 && (t.value = this.R(t.value, t.binLen, 0, this.l(this.g), this.m)); t.value.length <= i;) t.value.push(0)
      for (r = 0; r <= i; r += 1) this.L[r] = 909522486 ^ t.value[r], this.N[r] = 1549556828 ^ t.value[r]
      this.U = this.A(this.L, this.U), this.I = this.T, this.C = !0
    }, t.prototype.getHMAC = function (t, r) {
      const n = f(r)
      return e(t, this.m, this.u, n)(this.i())
    }, t.prototype.i = function () {
      let t
      if (!this.C) throw new Error('Cannot call getHMAC without first setting MAC key')
      const r = this.R(this.Y.slice(), this.H, this.I, this.p(this.U), this.m)
      return t = this.A(this.N, this.l(this.g)), t = this.R(r, this.m, this.T, t, this.m)
    }, t
  }()))
}))
