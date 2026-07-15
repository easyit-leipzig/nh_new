/*!
 * nojquery 3.1.0
 * ----------------
 * Modern, backward-compatible small DOM helper.
 * - Based on nojquery 3.0.2 (keeps full backwards compatibility & aliases).
 * - Adds: nj.config, ajax timeouts, cookie options, opt-in global $.
 *
 * Usage:
 *   // default: window.nj available, window.$ NOT set
 *   nj('#id').html('hello');
 *   // to enable $ globally:
 *   nj.config.exposeDollar = true; if (nj.config.exposeDollar) window.$ = nj;
 *
 * Version: 3.1.0
 */

(function (global) {
  'use strict';

  // -------------------------
  // Utility helpers
  // -------------------------

  const isNode = v => typeof window !== 'undefined' && v instanceof Node;
  const isNodeList = v =>
    typeof NodeList !== 'undefined' && (NodeList.prototype.isPrototypeOf(v) || HTMLCollection.prototype.isPrototypeOf(v));

  const toArray = v => {
    if (!v) return [];
    if (Array.isArray(v)) return v.filter(isNode);
    if (isNode(v)) return [v];
    if (isNodeList(v)) return Array.from(v);
    return [];
  };

  const noop = () => {};

  function isJSON(item) {
    try {
      if (typeof item === 'string') JSON.parse(item);
      else JSON.stringify(item);
      return true;
    } catch (e) {
      return false;
    }
  }

  function deepEqual(a, b) {
    try {
      return JSON.stringify(a) === JSON.stringify(b);
    } catch (e) {
      return false;
    }
  }

  // -------------------------
  // Selector optimisation
  // -------------------------
  function select(selector, context) {
    context = context || document;
    if (selector === 0 || selector === '0') return [];
    if (!selector && selector !== 0) return [];
    if (isNode(selector)) return [selector];
    if (isNodeList(selector)) return Array.from(selector);
    if (Array.isArray(selector)) return selector.filter(isNode);
    if (typeof selector !== 'string') return [];

    const s = selector.trim();

    // ID fast path
    if (
      s[0] === '#' &&
      !s.includes(' ') &&
      !s.includes(',') &&
      !s.includes('[') &&
      !s.includes(':')
    ) {
      const el = document.getElementById(s.slice(1));
      return el ? [el] : [];
    }

    // class fast path
    if (
      s[0] === '.' &&
      !s.includes(' ') &&
      !s.includes(',') &&
      !s.includes('[') &&
      !s.includes(':')
    ) {
      return Array.from(document.getElementsByClassName(s.slice(1)));
    }

    // tag only
    if (
      !s.includes(' ') &&
      !s.includes(',') &&
      !s.includes('[') &&
      !s.includes(':') &&
      /^[a-zA-Z0-9-]+$/.test(s)
    ) {
      return Array.from(document.getElementsByTagName(s));
    }

    // fallback to querySelectorAll
    try {
      return Array.from((context || document).querySelectorAll(s));
    } catch (e) {
      return [];
    }
  }

  // -------------------------
  // Core wrapper
  // -------------------------
  function NJ(elements) {
    this.elements = toArray(elements);
  // Backwards compatibility: expose .e (old single Node or NodeList/HTMLCollection)

  }
Object.defineProperty(NJ.prototype, 'e', {
  get: function() {
    if (!this.elements) return null;
    if (this.elements.length === 0) return null;
    if (this.elements.length === 1) return this.elements[0];
    // return an array-like object similar to old NodeList/HTMLCollection
    const arr = this.elements.slice();
    arr.length = this.elements.length;
    arr.item = function(i) { return this[i]; };
    return arr;
  },
  configurable: true
});

// Also expose .length property for convenience (old code often used .length)
Object.defineProperty(NJ.prototype, 'length', {
  get: function() { return (this.elements ? this.elements.length : 0); },
  configurable: true
});

  NJ.prototype._each = function (cb) {
    this.elements.forEach((el, i) => cb.call(el, i, el));
    return this;
  };

  function nj(p) {
    if (p instanceof NJ) return p;
    if (typeof p === 'undefined' || p === null || p === '') return new NJ([]);
    if (typeof p === 'string' || isNode(p) || isNodeList(p)) return new NJ(select(p));
    if (Array.isArray(p)) return new NJ(p.filter(isNode));
    if (p === document || p === window) return new NJ([p]);
    return new NJ([]);
  }

  // -------------------------
  // DOM operations
  // -------------------------
  NJ.prototype.html = function (v) {
    if (typeof v === 'undefined') return this.elements[0] ? this.elements[0].innerHTML : undefined;
    return this._each(function () { this.innerHTML = v; });
  };

  NJ.prototype.text = function (v) {
    if (typeof v === 'undefined') return this.elements[0] ? this.elements[0].textContent : undefined;
    return this._each(function () { this.textContent = v; });
  };

  NJ.prototype.val = function (v) {
    if (typeof v === 'undefined') return this.elements[0] ? this.elements[0].value : undefined;
    return this._each(function () { this.value = v; });
  };

  NJ.prototype.append = function (node) {
    return this._each(function () {
      if (typeof node === 'string') this.insertAdjacentHTML('beforeend', node);
      else if (isNode(node)) this.appendChild(node);
      else if (node instanceof NJ && node.elements[0]) this.appendChild(node.elements[0]);
      else this.appendChild(document.createTextNode(String(node)));
    });
  };

  NJ.prototype.prepend = function (node) {
    return this._each(function () {
      if (typeof node === 'string') this.insertAdjacentHTML('afterbegin', node);
      else if (isNode(node)) this.insertBefore(node, this.firstChild);
      else if (node instanceof NJ && node.elements[0]) this.insertBefore(node.elements[0], this.firstChild);
      else this.insertBefore(document.createTextNode(String(node)), this.firstChild);
    });
  };

  NJ.prototype.before = function (node) {
    return this._each(function () {
      if (!this.parentNode) return;
      if (typeof node === 'string') this.insertAdjacentHTML('beforebegin', node);
      else if (isNode(node)) this.parentNode.insertBefore(node, this);
      else if (node instanceof NJ && node.elements[0]) this.parentNode.insertBefore(node.elements[0], this);
      else this.parentNode.insertBefore(document.createTextNode(String(node)), this);
    });
  };

  NJ.prototype.after = function (node) {
    return this._each(function () {
      if (!this.parentNode) return;
      if (typeof node === 'string') this.insertAdjacentHTML('afterend', node);
      else if (isNode(node)) this.parentNode.insertBefore(node, this.nextSibling);
      else if (node instanceof NJ && node.elements[0]) this.parentNode.insertBefore(node.elements[0], this.nextSibling);
      else this.parentNode.insertBefore(document.createTextNode(String(node)), this.nextSibling);
    });
  };

  NJ.prototype.remove = function () {
    return this._each(function () { if (this.parentNode) this.parentNode.removeChild(this); });
  };

  NJ.prototype.parent = function () {
    const parents = this.elements.map(el => el.parentElement).filter(Boolean);
    return new NJ(Array.from(new Set(parents)));
  };

  NJ.prototype.children = function () {
    let out = [];
    this.elements.forEach(el => out.push(...Array.from(el.children)));
    return new NJ(out);
  };

  NJ.prototype.first = function () { return new NJ(this.elements[0] ? [this.elements[0]] : []); };
  NJ.prototype.last = function () { const e=this.elements; return new NJ(e.length ? [e[e.length-1]] : []); };
  NJ.prototype.eq = function (n) { if (n < 0) n = this.elements.length + n; return new NJ(this.elements[n] ? [this.elements[n]] : []); };
  NJ.prototype.next = function () { return new NJ(this.elements.map(e => e.nextElementSibling).filter(Boolean)); };
  NJ.prototype.prev = function () { return new NJ(this.elements.map(e => e.previousElementSibling).filter(Boolean)); };

  // -------------------------
  // Attributes & dataset
  // -------------------------
  NJ.prototype.attr = function (name, val) {
    if (typeof val === 'undefined') return this.elements[0] ? this.elements[0].getAttribute(name) : undefined;
    return this._each(function () { this.setAttribute(name, String(val)); });
  };

  NJ.prototype.removeAttr = function (name) { return this._each(function () { this.removeAttribute(name); }); };
  NJ.prototype.hasAttr = function (name) { return this.elements[0] ? this.elements[0].hasAttribute(name) : false; };

  NJ.prototype.data = function (key, val) {
    if (typeof val === 'undefined') return this.elements[0] ? this.elements[0].dataset[key] : undefined;
    return this._each(function () { this.dataset[key] = val; });
  };

  NJ.prototype.removeData = function (key) { return this._each(function () { delete this.dataset[key]; }); };

  // -------------------------
  // Class helpers
  // -------------------------
  NJ.prototype.addClass = function (cls) {
    if (!cls) return this;
    const parts = cls.split(/\s+/).filter(Boolean);
    return this._each(function () { this.classList.add(...parts); });
  };

  NJ.prototype.removeClass = function (cls) {
    if (!cls) return this;
    const parts = cls.split(/\s+/).filter(Boolean);
    return this._each(function () { this.classList.remove(...parts); });
  };

  NJ.prototype.toggleClass = function (cls) { if (!cls) return this; return this._each(function () { this.classList.toggle(cls); }); };
  NJ.prototype.hasClass = function (cls) { return this.elements[0] ? this.elements[0].classList.contains(cls) : false; };
  NJ.prototype.classList = function () { return this.elements[0] ? this.elements[0].classList : undefined; };

  // -------------------------
  // Styles
  // -------------------------
  NJ.prototype.css = function (prop, val) {
    if (typeof prop === 'object') {
      return this._each(function () {
        for (let p in prop) {
          try { this.style[p] = prop[p]; } catch (e) {}
        }
      });
    }
    if (typeof val === 'undefined') {
      return this.elements[0] ? getComputedStyle(this.elements[0])[prop] : undefined;
    }
    return this._each(function () { this.style[prop] = val; });
  };

  NJ.prototype.removeCss = function (prop) { return this._each(function () { this.style.removeProperty(prop); }); };
  NJ.prototype.computed = function (prop) { return this.elements[0] ? getComputedStyle(this.elements[0]).getPropertyValue(prop) : undefined; };
  NJ.prototype.getMaxZIndex = function () {
    const elements = document.getElementsByTagName("*");
    let maxZ = 0;

    for (let i = 0; i < elements.length; i++) {
        const z = window.getComputedStyle(elements[i]).zIndex;

        // zIndex kann "auto", "undefined", "0" oder eine Zahl sein
        if (z !== "auto") {
            const zi = parseInt(z, 10);
            if (!isNaN(zi) && zi > maxZ) {
                maxZ = zi;
            }
        }
    }

    return maxZ;
}

  // -------------------------
  // Events
  // -------------------------
  NJ.prototype.on = function (ev, handler, opts) {
    if (!ev || typeof handler !== 'function') return this;
    return this._each(function () { this.addEventListener(ev, handler, opts || false); });
  };

  NJ.prototype.off = function (ev, handler, opts) {
    if (!ev || typeof handler !== 'function') return this;
    return this._each(function () { this.removeEventListener(ev, handler, opts || false); });
  };

  NJ.prototype.trigger = function (evName) {
    if (!evName) return this;
    return this._each(function () {
      try { this.dispatchEvent(new Event(evName)); }
      catch (e) {
        const evt = document.createEvent('Event');
        evt.initEvent(evName, true, true);
        this.dispatchEvent(evt);
      }
    });
  };

  // -------------------------
  // Form helpers
  // -------------------------
  NJ.prototype.checked = function (state) {
    if (typeof state === 'undefined') return this.elements[0] ? Boolean(this.elements[0].checked) : undefined;
    return this._each(function () { this.checked = !!state; });
  };

  NJ.prototype.selectValues = function (values, clearField = true) {
    if (!this.elements[0] || this.elements[0].tagName !== 'SELECT') return this;
    const select = this.elements[0];
    if (clearField) for (let opt of select.options) opt.selected = false;
    const vals = Array.isArray(values) ? values : String(values).split(',').map(s => s.trim());
    for (let opt of select.options) if (vals.includes(opt.value)) opt.selected = true;
    return this;
  };

  NJ.prototype.getSelected = function () {
    if (!this.elements[0]) return [];
    const opts = this.elements[0].options;
    const res = [];
    for (let i = 0; i < opts.length; i++) {
      if (opts[i].selected) res.push(opts[i].value || opts[i].text);
    }
    return res;
  };

  // -------------------------
  // Animation helpers (Web Animations API fallback)
  // -------------------------
  function animatePromise(el, keyframes, options) {
    if (!el || !el.animate) {
      return new Promise(resolve => {
        try {
          if (options && options.duration) setTimeout(resolve, options.duration);
          else setTimeout(resolve, 300);
        } catch (e) { resolve(); }
      });
    }
    try {
      return el.animate(keyframes, options).finished;
    } catch (e) {
      return Promise.resolve();
    }
  }

  NJ.prototype.fadeIn = function (duration, display) {
    const d = typeof duration === 'number' ? duration : (nj.config && nj.config.animation && nj.config.animation.duration) || 300;
    return this._each(function () {
      const el = this;
      el.style.opacity = 0;
      el.style.display = display || (getComputedStyle(el).display === 'none' ? 'block' : getComputedStyle(el).display || 'block');
      animatePromise(el, [{ opacity: 0 }, { opacity: 1 }], { duration: d }).catch(noop);
    });
  };

  NJ.prototype.fadeOut = function (duration) {
    const d = typeof duration === 'number' ? duration : (nj.config && nj.config.animation && nj.config.animation.duration) || 300;
    return this._each(function () {
      const el = this;
      animatePromise(el, [{ opacity: 1 }, { opacity: 0 }], { duration: d }).then(() => {
        el.style.display = 'none';
        el.style.opacity = '';
      }).catch(noop);
    });
  };

  NJ.prototype.slideUp = function (duration) {
    const d = typeof duration === 'number' ? duration : (nj.config && nj.config.animation && nj.config.animation.duration) || 300;
    return this._each(function () {
      const el = this;
      const height = el.getBoundingClientRect().height;
      el.style.overflow = 'hidden';
      animatePromise(el, [{ height: height + 'px' }, { height: '0px' }], { duration: d }).then(() => {
        el.style.display = 'none';
        el.style.height = '';
        el.style.overflow = '';
      }).catch(noop);
    });
  };

  NJ.prototype.slideDown = function (duration, display) {
    const d = typeof duration === 'number' ? duration : (nj.config && nj.config.animation && nj.config.animation.duration) || 300;
    return this._each(function () {
      const el = this;
      el.style.display = display || 'block';
      const height = el.getBoundingClientRect().height;
      el.style.overflow = 'hidden';
      el.style.height = '0px';
      void el.offsetHeight;
      animatePromise(el, [{ height: '0px' }, { height: height + 'px' }], { duration: d }).then(() => {
        el.style.height = '';
        el.style.overflow = '';
      }).catch(noop);
    });
  };

  // -------------------------
  // Geometry / bounding
  // -------------------------
  NJ.prototype.getRect = function () { return this.elements[0] ? this.elements[0].getBoundingClientRect() : undefined; };
  NJ.prototype.getBounding = function () { return this.getRect(); };

  // -------------------------
  // CSS variables (document-level)
  // -------------------------
  NJ.prototype.cssVar = function (k, v) {
    if (typeof v === 'undefined') return getComputedStyle(document.documentElement).getPropertyValue(k);
    document.documentElement.style.setProperty(k, v);
    return this;
  };

  // -------------------------
  // Browser detection
  // -------------------------
  nj.detectBrowser = function () {
    const ua = navigator.userAgent;
    if (ua.includes('Edg/')) return 'ChromiumEdge';
    if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Firefox')) return 'Firefox';
    return 'Unknown';
  };

  // -------------------------
  // Dialog-reflection compatibility (legacy)
  // -------------------------
  NJ.prototype.gDV = function (ds = 'dvar') {
    let el = this.elements[0];
    while (el) {
      if (el.dataset && el.dataset[ds]) return el.dataset[ds];
      el = el.parentElement;
    }
    return false;
  };

  NJ.prototype.Dia = function (ds = 'dvar', deep) {
    let el = this.elements[0];
    let dia = false;
    while (el) {
      if (el.dataset && el.dataset[ds]) { dia = el.dataset[ds]; break; }
      el = el.parentElement;
    }
    if (!dia) return false;
    const parts = dia.split('.');
    const depth = typeof deep === 'undefined' ? parts.length : deep;
    let tmp = window[parts[0]];
    for (let i = 1; i < depth; i++) {
      if (tmp === undefined || tmp === null) return undefined;
      tmp = tmp[parts[i]];
    }
    return tmp;
  };

  NJ.prototype.gRO = function (ds = 'dvar') {
    let el = this.elements[0];
    while (el) {
      if (el.dataset && el.dataset[ds]) return window[el.dataset[ds].split('.')[0]];
      el = el.parentElement;
    }
    return undefined;
  };

  nj.bDV = function (dvar) {
    const tmp = dvar.split('.');
    let val = window[tmp[0]];
    for (let j = 1; j < tmp.length; j++) val = val ? val[tmp[j]] : undefined;
    return val;
  };

  // -------------------------
  // Safe exec (warning)
  // -------------------------
  nj.exec = function (code) {
    try { console.warn('nj.exec is potentially unsafe. Prefer explicit functions.'); } catch (e) {}
    return new Function(code)();
  };

  // -------------------------
  // Objects / Arrays helpers
  // -------------------------
  nj.extend = (a, b) => Object.assign(a, b);
  nj.isJSON = isJSON;
  nj.arrayRemove = (arr, val) => {
    const i = arr.indexOf(val); if (i >= 0) arr.splice(i, 1); return arr;
  };
  nj.filterObjectArray = (arr, field, value) => arr.filter(it => it[field] === value);
  nj.forEach = (arr, cb) => arr.forEach(cb);
  nj.cEq = deepEqual;
  nj.oEx = nj.extend;
  nj.isJ = nj.isJSON;

  // convenience aliases for CSS root var
  nj.ddS = function (k, v) { document.documentElement.style.setProperty(k, v); };
  nj.ddG = function (k) { return getComputedStyle(document.documentElement).getPropertyValue(k); };
  nj.gBr = nj.detectBrowser;

  // -------------------------
  // Array helpers (legacy names kept)
  // -------------------------
  nj.rAE = function (arr, v) { const i = arr.indexOf(v); if (i >= 0) arr.splice(i, 1); return arr; };
  nj.fEa = function (arr, cb) { arr.forEach((e, i) => cb(i, e)); };
  nj.fOA = nj.filterObjectArray;

  // -------------------------
  // Global configuration (new in 3.0.3)
  // -------------------------
  // Keep existing nj.config if present; otherwise default values
  nj.config = nj.config || {};
  nj.config = Object.assign({
    debug: false,
    warn: true,
    ajaxTimeout: 8000,       // default global timeout for ajax (ms); 0 = disabled
    exposeDollar: false,     // opt-in: only expose $ when true
    animation: { duration: 300 } // default animation duration (ms)
  }, nj.config || {});

  // -------------------------
  // AJAX (Promise-based) with timeout support
  // -------------------------
  nj.ajax = {
    /**
     * POST JSON and parse JSON response.
     * opts:
     *   headers: {}
     *   timeout: ms (overrides nj.config.ajaxTimeout)
     */
    post(url, data = {}, opts = {}) {
      const headers = opts.headers || {};
      // timeout resolution: opts.timeout -> nj.config.ajaxTimeout -> 0
      const timeout = (typeof opts.timeout === 'number') ? opts.timeout : (nj.config && typeof nj.config.ajaxTimeout === 'number' ? nj.config.ajaxTimeout : 0);
      const controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
      const signal = controller ? controller.signal : undefined;
      let toId = null;
      if (controller && timeout > 0) {
        toId = setTimeout(() => controller.abort(), timeout);
      }
      return fetch(url, {
        method: 'POST',
        headers: Object.assign({ 'Content-Type': 'application/json' }, headers),
        body: JSON.stringify(data),
        signal: signal
      }).then(r => {
        if (toId) clearTimeout(toId);
        if (!r.ok) throw new Error(`Network response was not ok (${r.status})`);
        const ct = (r.headers.get('content-type') || '');
        if (ct.indexOf('application/json') !== -1) return r.json();
        return r.text().then(t => {
          if (!t) return null;
          try { return JSON.parse(t); } catch (e) { return t; }
        });
      }).catch(err => {
        if (err && err.name === 'AbortError') throw new Error('Request timed out');
        throw err;
      });
    },

    /**
     * POST FormData (from plain object).
     * opts:
     *   timeout: ms
     */
    postForm(url, formObj = {}, opts = {}) {
      const f = new FormData();
      for (let k in formObj) {
        if (Object.prototype.hasOwnProperty.call(formObj, k)) f.append(k, formObj[k]);
      }
      const timeout = (typeof opts.timeout === 'number') ? opts.timeout : (nj.config && typeof nj.config.ajaxTimeout === 'number' ? nj.config.ajaxTimeout : 0);
      const controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
      const signal = controller ? controller.signal : undefined;
      let toId = null;
      if (controller && timeout > 0) {
        toId = setTimeout(() => controller.abort(), timeout);
      }
      return fetch(url, { method: 'POST', body: f, signal: signal }).then(r => {
        if (toId) clearTimeout(toId);
        if (!r.ok) throw new Error(`Network response was not ok (${r.status})`);
        return r.text();
      }).catch(err => {
        if (err && err.name === 'AbortError') throw new Error('Request timed out');
        throw err;
      });
    }
  };

  // backward-compatible convenience wrappers (preserve old API)
  nj.post = function (url, data, cb) {
    nj.ajax.post(url, data).then(res => { if (typeof cb === 'function') cb(res); }).catch(err => {
      try { console.error(err); } catch (e) {}
      if (typeof cb === 'function') cb(null, err);
    });
  };

  nj.fetchPost = nj.post;
  nj.fetchPostNew = nj.post;

  // -------------------------
  // Cookies (extended options)
  // -------------------------
  const cookie = {
    get(name) {
      const b = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
      return b ? b.pop() : '';
    },

    /**
     * Set cookie with options:
     *   set(name, value, days, { path, domain, secure, sameSite })
     * days: number of days (optional)
     * opts.path default '/'
     * opts.secure boolean
     * opts.sameSite string 'Lax'|'Strict'|'None'
     * opts.domain string
     */
    set(name, value, days, opts) {
      opts = opts || {};
      let expires = '';
      if (typeof days === 'number' && days >= 0) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
      }
      const path = opts.path || '/';
      const secure = opts.secure ? '; Secure' : '';
      const sameSite = (typeof opts.sameSite === 'string' && opts.sameSite.length) ? ('; SameSite=' + opts.sameSite) : '';
      const domain = opts.domain ? ('; Domain=' + opts.domain) : '';
      document.cookie = name + '=' + (value || '') + expires + '; path=' + path + secure + sameSite + domain;
    },

    remove(name, opts) {
      // remove cookie by setting negative expiry; keep path/domain same as when set
      this.set(name, '', -1, opts || {});
    }
  };

  nj.cookie = cookie;

  // -------------------------
  // Misc utilities & aliases (preserve compatibility)
  // -------------------------
  nj.extend = nj.extend || ((a, b) => Object.assign(a, b));
  nj.isJSON = nj.isJSON || isJSON;
  nj.arrayRemove = nj.arrayRemove || ((arr, val) => { const i = arr.indexOf(val); if (i >= 0) arr.splice(i, 1); return arr; });
  nj.filterObjectArray = nj.filterObjectArray || ((arr, field, value) => arr.filter(it => it[field] === value));
  nj.forEach = nj.forEach || ((arr, cb) => arr.forEach(cb));
  nj.cEq = nj.cEq || deepEqual;
  nj.oEx = nj.oEx || nj.extend;
  nj.isJ = nj.isJ || nj.isJSON;

  nj.ddS = nj.ddS || function (k, v) { document.documentElement.style.setProperty(k, v); };
  nj.ddG = nj.ddG || function (k) { return getComputedStyle(document.documentElement).getPropertyValue(k); };
  nj.gBr = nj.gBr || nj.detectBrowser;

  // -------------------------
  // Backwards compatibility layer (map old short names to new)
  // -------------------------
  // DOM & selection
  

  /* 
  NJ.prototype.els = function (p) { return nj(p); };
  */
  // Backwards-compatible els(): if called on an instance, return raw DOM node(s)
// like old no_jquery (element, NodeList/HTMLCollection or null). If p provided,
// behave like old _els(p) and return DOM node(s) for p.
NJ.prototype.els = function (p) {
  // helper that mirrors old _els behaviour: return Node / NodeList / HTMLCollection
  function rawEls(arg) {
    if (arg === "" || typeof arg === "undefined" || arg === null) return null;
    if (isNode(arg) || isNodeList(arg)) return arg;
    if (typeof arg === "string") {
      const s = arg;
      // ID fast path
      if (s[0] === '#' && !s.includes(' ') && !s.includes(',') && !s.includes('[') && !s.includes(':')) {
        return document.getElementById(s.slice(1));
      }
      // class fast path
      if (s[0] === '.' && !s.includes(' ') && !s.includes(',') && !s.includes('[') && !s.includes(':')) {
        return document.getElementsByClassName(s.slice(1));
      }
      // fallback to querySelectorAll
      try { return document.querySelectorAll(s); } catch (e) { return null; }
    }
    return null;
  }

  // If called as instance method with no argument: return the underlying raw DOM (old .e)
  if (typeof p === 'undefined' || p === null) {
    // if single element in this.elements return element; else return NodeList-like array
    if (!this || !this.elements) return null;
    if (this.elements.length === 0) return null;
    if (this.elements.length === 1) return this.elements[0];
    // emulate HTMLCollection/NodeList by returning an actual NodeList is complex;
    // return array (legacy code mostly used .length or indexed access), which is acceptable.
    // But to keep index access: return a static NodeList-like object (with length + item)
    const arr = this.elements.slice();
    arr.length = this.elements.length;
    arr.item = function(i) { return this[i]; };
    return arr;
  }

  // If argument provided — behave like old _els(p)
  return rawEls(p);
};
  NJ.prototype.lEl = function () { return this.first(); };
  NJ.prototype.fEl = function () { return this.first(); };
  NJ.prototype.nEl = function (n) { return typeof n === 'number' ? this.eq(n - 1) : this.next(); };
  NJ.prototype.bEl = function () { return this.prev(); };
  NJ.prototype.cEl = function (t) { return document.createElement(t); };

  // HTML & text
  NJ.prototype.htm = NJ.prototype.html;
  NJ.prototype.oHt = function (v) { return this._each(function () { this.outerHTML = v; }); };
  NJ.prototype.oTx = function (v) { return this._each(function () { this.outerText = v; }); };
  NJ.prototype.txt = NJ.prototype.text;
  NJ.prototype.v = NJ.prototype.val;

  // DOM insertion
  NJ.prototype.b = NJ.prototype.before;
  NJ.prototype.a = NJ.prototype.after;
  NJ.prototype.p = NJ.prototype.parent;
  NJ.prototype.m = function (target) {
    const t = nj(target).elements[0];
    if (t) this._each(function () { t.appendChild(this); });
    return this;
  };

  // attributes
  NJ.prototype.id = function () { return this.attr('id'); };
  NJ.prototype.tag = function () { return this.elements[0] ? this.elements[0].tagName : undefined; };
  NJ.prototype.ds = function (k) { return this.data(k); };
  NJ.prototype.sDs = NJ.prototype.data;
  NJ.prototype.atr = NJ.prototype.attr;
  NJ.prototype.hAt = NJ.prototype.hasAttr;
  NJ.prototype.rAt = NJ.prototype.removeAttr;
  NJ.prototype.sPr = function (n, v) { return this._each(function () { this[n] = v; }); };
  NJ.prototype.rPr = function (a) { return this._each(function () { this.removeAttribute(a); }); };

  // classes (old names)
  NJ.prototype.aCN = NJ.prototype.addClass;
  NJ.prototype.rCN = NJ.prototype.removeClass;
  NJ.prototype.aCl = NJ.prototype.addClass;
  NJ.prototype.hCl = NJ.prototype.hasClass;
  NJ.prototype.rCl = NJ.prototype.removeClass;
  NJ.prototype.tCl = NJ.prototype.toggleClass;
  NJ.prototype.clL = NJ.prototype.classList;

  // styles (old names)
  NJ.prototype.sty = NJ.prototype.css;
  NJ.prototype.sRP = NJ.prototype.removeCss;
  NJ.prototype.gCS = NJ.prototype.computed;
  NJ.prototype.gMZ = NJ.prototype.getMaxZIndex
  // geometry
  NJ.prototype.gRe = NJ.prototype.getRect;
  NJ.prototype.rEl = NJ.prototype.remove;
  NJ.prototype.prE = NJ.prototype.prev;
  NJ.prototype.aCh = NJ.prototype.append;
  NJ.prototype.pCh = NJ.prototype.prepend;
  NJ.prototype.app = NJ.prototype.append;

  // events (old)
  NJ.prototype.tri = NJ.prototype.trigger;

  // cookies (old)
  NJ.prototype.sCV = function (name, val, days) { nj.cookie.set(name, val, days); return this; };
  NJ.prototype.gCV = function (name) { return nj.cookie.get(name); };

  // ajax (legacy)
  nj.fetchPostNew = nj.fetchPost = nj.post;
  NJ.prototype.fetchPostNew = nj.fetchPost = nj.post; 
  // misc (old -> new)
  NJ.prototype.isE = function () { return this.elements.length > 0; };
  nj.ddS = nj.ddS;
  nj.ddG = nj.ddG;
  nj.cEq = nj.cEq;
  nj.gBr = nj.detectBrowser;
  nj.exC = nj.exec;
  nj.oEx = nj.extend;
  nj.isJ = nj.isJSON;

  // dialog reflection aliases (ensure they exist)
  NJ.prototype.gDV = NJ.prototype.gDV;
  NJ.prototype.Dia = NJ.prototype.Dia;
  NJ.prototype.gRO = NJ.prototype.gRO;
  nj.bDV = nj.bDV;

  // -------------------------
  // Final expose
  // -------------------------
  global.nj = nj;

  // Expose $ only if opt-in via nj.config.exposeDollar === true
  try {
    if (nj && nj.config && nj.config.exposeDollar) {
      // if $ exists and is not nj, warn (to avoid accidental overwrite)
      if (typeof global.$ !== 'undefined' && global.$ !== nj) {
        if (nj.config.warn) {
          try { console.warn('nj: global $ exists and will be overwritten because nj.config.exposeDollar === true'); } catch (e) {}
        }
      }
      global.$ = nj;
    }
  } catch (e) {
    // ignore in restricted environments
  }

  // End of file
})(window);

/* =========================================================
 * nojquery 3.1.0 module extension
 * Adds manager instances under nj.*
 * ========================================================= */
(function (global) {
  'use strict';
  if (!global.nj) throw new Error('nojquery core must be loaded first');
  const nj = global.nj;

  class BaseManager {
    constructor(options = {}) { this.options = Object.assign({}, options); }
    configure(options = {}) { Object.assign(this.options, options); return this; }
  }

  class StorageManager extends BaseManager {
    constructor(options = {}) {
      super(Object.assign({ namespace: 'nj', defaultScope: 'local' }, options));
      this.local = this._scope('local');
      this.session = this._scope('session');
    }
    _store(scope) { return scope === 'session' ? sessionStorage : localStorage; }
    _key(key) { return this.options.namespace ? `${this.options.namespace}.${key}` : String(key); }
    _scope(scope) {
      return {
        get:(k,d=null)=>this.get(k,d,{scope}), set:(k,v,o={})=>this.set(k,v,Object.assign({},o,{scope})),
        save:(k,v,o={})=>this.set(k,v,Object.assign({},o,{scope})), load:(k,d=null)=>this.get(k,d,{scope}),
        has:k=>this.has(k,{scope}), remove:k=>this.remove(k,{scope}), clear:()=>this.clear({scope}),
        keys:()=>this.keys({scope}), size:()=>this.size({scope}), update:(k,fn,o={})=>this.update(k,fn,Object.assign({},o,{scope}))
      };
    }
    get(key, fallback=null, opts={}) {
      const scope=opts.scope||this.options.defaultScope;
      try {
        const raw=this._store(scope).getItem(this._key(key));
        if (raw===null) return fallback;
        const box=JSON.parse(raw);
        if (box && Object.prototype.hasOwnProperty.call(box,'value')) {
          if (box.expiresAt && Date.now()>box.expiresAt) { this.remove(key,{scope}); return fallback; }
          return box.value;
        }
        return box;
      } catch(e) { return fallback; }
    }
    set(key,value,opts={}) {
      const scope=opts.scope||this.options.defaultScope, ttl=Number(opts.ttl||0);
      try {
        this._store(scope).setItem(this._key(key),JSON.stringify({value,createdAt:Date.now(),expiresAt:ttl>0?Date.now()+ttl:null}));
        return value;
      } catch(e) { return false; }
    }
    save(k,v,o){return this.set(k,v,o);} load(k,d,o){return this.get(k,d,o);}
    has(k,o={}){const s={}; return this.get(k,s,o)!==s;}
    remove(k,o={}){try{this._store(o.scope||this.options.defaultScope).removeItem(this._key(k));return true;}catch(e){return false;}}
    keys(o={}){const st=this._store(o.scope||this.options.defaultScope),p=this.options.namespace?this.options.namespace+'.':'';const a=[];for(let i=0;i<st.length;i++){const k=st.key(i);if(k&&(!p||k.startsWith(p)))a.push(p?k.slice(p.length):k);}return a;}
    clear(o={}){const st=this._store(o.scope||this.options.defaultScope);this.keys(o).forEach(k=>st.removeItem(this._key(k)));return true;}
    size(o={}){return this.keys(o).length;}
    update(k,fn,o={}){if(typeof fn!=='function')throw new TypeError('updater must be a function');const v=fn(this.get(k,null,o));this.set(k,v,o);return v;}
  }

  class NavigationManager extends BaseManager {
    constructor(options={}){super(Object.assign({linkSelector:'[data-nav-section]',activeClass:'active',storageKey:'navigation.active'},options));this.observer=null;}
    links(){return Array.from(document.querySelectorAll(this.options.linkSelector));}
    setActive(section,{store=true}={}){if(!section)return this;this.links().forEach(a=>{const on=a.dataset.navSection===section;a.classList.toggle(this.options.activeClass,on);on?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current');});if(store)nj.storage.local.set(this.options.storageKey,section);document.dispatchEvent(new CustomEvent('nj:navigationchange',{detail:{section}}));return this;}
    restore(fallback='start'){const s=document.body.dataset.activeNav||nj.storage.local.get(this.options.storageKey,fallback);this.setActive(s,{store:false});return s;}
    scrollSpy(selector='main section[id]',opts={}){this.stopScrollSpy();const sections=Array.from(document.querySelectorAll(selector));this.observer=new IntersectionObserver(es=>{const v=es.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(v)this.setActive(v.target.id);},{root:opts.root||null,rootMargin:opts.rootMargin||'-20% 0px -60% 0px',threshold:opts.threshold||[.01,.2,.5]});sections.forEach(s=>this.observer.observe(s));return this;}
    stopScrollSpy(){if(this.observer)this.observer.disconnect();this.observer=null;return this;}
    breadcrumbs(container,items=[],opts={}){const el=typeof container==='string'?document.querySelector(container):container;if(!el)return this;el.innerHTML='';items.forEach((it,i)=>{if(i){const s=document.createElement('span');s.className='nj-breadcrumb-separator';s.textContent=opts.separator||'›';el.appendChild(s);}const n=document.createElement(it.href?'a':'span');n.textContent=it.label||'';n.className='nj-breadcrumb-item';if(it.href)n.href=it.href;if(it.current)n.setAttribute('aria-current','page');el.appendChild(n);});return this;}
  }

  class SidebarManager extends BaseManager {
    constructor(options={}){super(Object.assign({sidebar:'.sidebar',scrollWindow:'.sidebar-scroll-window',toggle:'.menu-toggle',up:'.sidebar-scroll-button--up',down:'.sidebar-scroll-button--down',openClass:'open',bodyOpenClass:'menu-open',storageKey:'sidebar.position'},options));this.bound=false;}
    init(options={}){this.configure(options);this.sidebar=document.querySelector(this.options.sidebar);this.scrollWindow=document.querySelector(this.options.scrollWindow);this.toggle=document.querySelector(this.options.toggle);this.up=document.querySelector(this.options.up);this.down=document.querySelector(this.options.down);if(this.bound)return this;this.bound=true;this.toggle?.addEventListener('click',()=>this.toggleOpen());this.up?.addEventListener('click',()=>this.scroll(-this.step()));this.down?.addEventListener('click',()=>this.scroll(this.step()));this.scrollWindow?.addEventListener('scroll',()=>{this.savePosition();this.updateButtons();},{passive:true});window.addEventListener('resize',()=>this.updateButtons());this.restorePosition();this.updateButtons();return this;}
    open(){this.sidebar?.classList.add(this.options.openClass);document.body.classList.add(this.options.bodyOpenClass);this.toggle?.setAttribute('aria-expanded','true');return this;}
    close(){this.sidebar?.classList.remove(this.options.openClass);document.body.classList.remove(this.options.bodyOpenClass);this.toggle?.setAttribute('aria-expanded','false');return this;}
    toggleOpen(){return this.sidebar?.classList.contains(this.options.openClass)?this.close():this.open();}
    step(){return Math.max(120,Math.round((this.scrollWindow?.clientHeight||0)*.6));}
    scroll(amount,behavior='smooth'){this.scrollWindow?.scrollBy({top:amount,behavior});return this;}
    savePosition(){if(this.scrollWindow)nj.storage.local.set(this.options.storageKey,this.scrollWindow.scrollTop);return this;}
    restorePosition(){if(this.scrollWindow)this.scrollWindow.scrollTop=Number(nj.storage.local.get(this.options.storageKey,0))||0;return this;}
    updateButtons(){if(!this.scrollWindow)return this;const up=this.scrollWindow.scrollTop>2,down=this.scrollWindow.scrollTop+this.scrollWindow.clientHeight<this.scrollWindow.scrollHeight-2;if(this.up)this.up.hidden=!up;if(this.down)this.down.hidden=!down;this.sidebar?.classList.toggle('has-overflow-above',up);this.sidebar?.classList.toggle('has-overflow-below',down);return this;}
  }

  class AccordionManager extends BaseManager {
    constructor(options={}){super(Object.assign({selector:'details',single:false,openClass:'is-open'},options));this.items=[];}
    init(options={}){this.configure(options);this.items=Array.from(document.querySelectorAll(this.options.selector));this.items.forEach(item=>item.addEventListener('toggle',()=>{item.classList.toggle(this.options.openClass,item.open);if(item.open&&this.options.single)this.items.forEach(o=>{if(o!==item)o.open=false;});}));return this;}
    _el(t){return typeof t==='string'?document.querySelector(t):t;}
    open(t){const e=this._el(t);if(e)e.open=true;return this;} close(t){const e=this._el(t);if(e)e.open=false;return this;} toggle(t){const e=this._el(t);if(e)e.open=!e.open;return this;} closeAll(){this.items.forEach(e=>e.open=false);return this;}
  }

  class ThemeManager extends BaseManager {
    constructor(options={}){super(Object.assign({attribute:'data-theme',storageKey:'theme',defaultTheme:'leipzig-blau',themes:['neon','dark','leipzig-blau']},options));}
    set(theme,{store=true}={}){if(!this.options.themes.includes(theme))throw new Error('Unknown theme: '+theme);document.documentElement.setAttribute(this.options.attribute,theme);if(store)nj.storage.local.set(this.options.storageKey,theme);document.dispatchEvent(new CustomEvent('nj:themechange',{detail:{theme}}));return theme;}
    get(){return document.documentElement.getAttribute(this.options.attribute)||this.options.defaultTheme;}
    restore(){return this.set(nj.storage.local.get(this.options.storageKey,this.options.defaultTheme),{store:false});}
    toggle(sequence=this.options.themes){const i=sequence.indexOf(this.get());return this.set(sequence[(i+1)%sequence.length]);}
  }

  class AnimationManager extends BaseManager {
    constructor(options={}){super(Object.assign({duration:300,easing:'ease'},options));}
    animate(target,keyframes,options={}){const o=Object.assign({duration:this.options.duration,easing:this.options.easing,fill:'both'},options);return Promise.all(nj(target).elements.map(el=>el.animate?el.animate(keyframes,o).finished:Promise.resolve()));}
    fadeIn(t,d){nj(t).fadeIn(d||this.options.duration);return this;} fadeOut(t,d){nj(t).fadeOut(d||this.options.duration);return this;} slideUp(t,d){nj(t).slideUp(d||this.options.duration);return this;} slideDown(t,d){nj(t).slideDown(d||this.options.duration);return this;} pulse(t,d=500){return this.animate(t,[{transform:'scale(1)'},{transform:'scale(1.04)'},{transform:'scale(1)'}],{duration:d});}
  }

  class AjaxManager extends BaseManager {
    constructor(options={}){super(Object.assign({timeout:nj.config.ajaxTimeout||8000,headers:{}},options));}
    request(url,opts={}){const c=typeof AbortController!=='undefined'?new AbortController():null;const timeout=typeof opts.timeout==='number'?opts.timeout:this.options.timeout;let id=null;if(c&&timeout>0)id=setTimeout(()=>c.abort(),timeout);const fo=Object.assign({},opts,{headers:Object.assign({},this.options.headers,opts.headers||{}),signal:c?c.signal:undefined});delete fo.timeout;delete fo.responseType;return fetch(url,fo).then(async r=>{if(id)clearTimeout(id);if(!r.ok)throw new Error(`Network response was not ok (${r.status})`);const type=opts.responseType||'auto';if(type==='json')return r.json();if(type==='blob')return r.blob();if(type==='arrayBuffer')return r.arrayBuffer();if(type==='text')return r.text();return (r.headers.get('content-type')||'').includes('application/json')?r.json():r.text();}).catch(e=>{if(e?.name==='AbortError')throw new Error('Request timed out');throw e;});}
    get(u,o={}){return this.request(u,Object.assign({},o,{method:'GET'}));} post(u,d={},o={}){return this.request(u,Object.assign({},o,{method:'POST',headers:Object.assign({'Content-Type':'application/json'},o.headers||{}),body:JSON.stringify(d)}));} put(u,d={},o={}){return this.request(u,Object.assign({},o,{method:'PUT',headers:Object.assign({'Content-Type':'application/json'},o.headers||{}),body:JSON.stringify(d)}));} delete(u,o={}){return this.request(u,Object.assign({},o,{method:'DELETE'}));} postForm(u,d,o={}){const f=d instanceof FormData?d:Object.entries(d||{}).reduce((x,[k,v])=>(x.append(k,v),x),new FormData());return this.request(u,Object.assign({},o,{method:'POST',body:f}));}
  }

  class FormManager extends BaseManager {
    _el(f){return typeof f==='string'?document.querySelector(f):f;}
    serialize(f){const e=this._el(f);if(!e)return{};const out={};new FormData(e).forEach((v,k)=>{out[k]=k in out?(Array.isArray(out[k])?[...out[k],v]:[out[k],v]):v;});return out;}
    validate(f){const e=this._el(f);if(!e)return false;const ok=e.checkValidity();if(!ok)e.reportValidity();return ok;}
    reset(f){this._el(f)?.reset();return this;}
    submit(f,o={}){const e=this._el(f);if(!e)return Promise.reject(new Error('Form not found'));if(o.validate!==false&&!this.validate(e))return Promise.reject(new Error('Form validation failed'));const url=o.url||e.action,method=(o.method||e.method||'POST').toUpperCase();if(method==='GET'){const q=new URLSearchParams(this.serialize(e)).toString();return nj.ajax.get(url+(url.includes('?')?'&':'?')+q,o);}if(o.formData)return nj.ajax.postForm(url,new FormData(e),o);return nj.ajax.request(url,Object.assign({},o,{method,headers:Object.assign({'Content-Type':'application/json'},o.headers||{}),body:JSON.stringify(this.serialize(e))}));}
    bind(f,o={}){const e=this._el(f);if(!e)return this;e.addEventListener('submit',ev=>{ev.preventDefault();this.submit(e,o).then(r=>o.onSuccess?.(r,e)).catch(err=>o.onError?o.onError(err,e):console.error(err));});return this;}
  }

  class ModalManager extends BaseManager {
    constructor(options={}){super(Object.assign({activeClass:'is-open',closeSelector:'[data-modal-close]'},options));this.active=null;this.lastFocus=null;}
    _el(t){return typeof t==='string'?document.querySelector(t):t;}
    open(t){const m=this._el(t);if(!m)return this;this.lastFocus=document.activeElement;this.active=m;m.hidden=false;m.classList.add(this.options.activeClass);m.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');m.querySelector('[autofocus],button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')?.focus();m.querySelectorAll(this.options.closeSelector).forEach(b=>b.addEventListener('click',()=>this.close(),{once:true}));return this;}
    close(t){const m=t?this._el(t):this.active;if(!m)return this;m.classList.remove(this.options.activeClass);m.setAttribute('aria-hidden','true');m.hidden=true;document.body.classList.remove('modal-open');this.lastFocus?.focus();if(m===this.active)this.active=null;return this;}
    toggle(t){const m=this._el(t);return !m?this:(m.hidden||!m.classList.contains(this.options.activeClass)?this.open(m):this.close(m));}
    create(o={}){const m=document.createElement('div');m.className=o.className||'nj-modal';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');m.setAttribute('aria-hidden','true');m.hidden=true;if(o.id)m.id=o.id;if(o.label)m.setAttribute('aria-label',o.label);m.innerHTML='<div class="nj-modal__backdrop" data-modal-close></div><div class="nj-modal__dialog">'+(o.closeButton===false?'':'<button type="button" class="nj-modal__close" data-modal-close aria-label="Schließen">×</button>')+'<div class="nj-modal__content">'+(o.content||'')+'</div></div>';document.body.appendChild(m);return m;}
  }

  class CookieManager extends BaseManager {
    get(name,fallback=''){const m=document.cookie.match('(^|;)\\s*'+name+'\\s*=\\s*([^;]+)');if(!m)return fallback;const v=decodeURIComponent(m.pop());try{return JSON.parse(v);}catch(e){return v;}}
    set(name,value,days,opts={}){let exp='';if(typeof days==='number'){const d=new Date(Date.now()+days*86400000);exp='; expires='+d.toUTCString();}const path='; path='+(opts.path||'/'),domain=opts.domain?'; Domain='+opts.domain:'',secure=opts.secure?'; Secure':'',same=opts.sameSite?'; SameSite='+opts.sameSite:'';const v=encodeURIComponent(typeof value==='string'?value:JSON.stringify(value));document.cookie=name+'='+v+exp+path+domain+secure+same;return value;}
    has(name){return document.cookie.split(';').some(c=>c.trim().startsWith(name+'='));}
    remove(name,opts={}){return this.set(name,'',-1,opts);}
  }

  nj.storage=new StorageManager();
  nj.navigation=new NavigationManager();
  nj.sidebar=new SidebarManager();
  nj.accordion=new AccordionManager();
  nj.theme=new ThemeManager();
  nj.animation=new AnimationManager();
  nj.ajax=new AjaxManager();
  nj.form=new FormManager();
  nj.modal=new ModalManager();
  nj.cookie=new CookieManager();
  nj.managers={StorageManager,NavigationManager,SidebarManager,AccordionManager,ThemeManager,AnimationManager,AjaxManager,FormManager,ModalManager,CookieManager};
  nj.post=function(url,data,cb){const p=nj.ajax.post(url,data);if(typeof cb==='function')p.then(r=>cb(r)).catch(e=>cb(null,e));return p;};
  nj.fetchPost=nj.fetchPostNew=nj.post;
})(window);
