// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"XFIe":[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"dqAF":[function(require,module,exports) {
var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"nCe2":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"jFcs":[function(require,module,exports) {
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":"nCe2"}],"jj57":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"w4mz":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"jj57"}],"hXTE":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"hd3X":[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"hXTE"}],"ItUS":[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":"jj57","./_global":"XFIe"}],"H2dS":[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"hd3X","./_fails":"hXTE","./_dom-create":"ItUS"}],"eMTc":[function(require,module,exports) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":"jj57"}],"YAFO":[function(require,module,exports) {
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":"w4mz","./_ie8-dom-define":"H2dS","./_to-primitive":"eMTc","./_descriptors":"hd3X"}],"Irt8":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"L7aH":[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":"YAFO","./_property-desc":"Irt8","./_descriptors":"hd3X"}],"SAz4":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"qJpY":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var has = require('./_has');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_global":"XFIe","./_core":"dqAF","./_ctx":"jFcs","./_hide":"L7aH","./_has":"SAz4"}],"kBu7":[function(require,module,exports) {
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],"SN96":[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":"XFIe"}],"XKlW":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"DAOJ":[function(require,module,exports) {


var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_ctx":"jFcs","./_invoke":"kBu7","./_html":"SN96","./_dom-create":"ItUS","./_global":"XFIe","./_cof":"XKlW"}],"az67":[function(require,module,exports) {
var $export = require('./_export');
var $task = require('./_task');
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});

},{"./_export":"qJpY","./_task":"DAOJ"}],"Ho3O":[function(require,module,exports) {
require('../modules/web.immediate');
module.exports = require('../modules/_core').setImmediate;

},{"../modules/web.immediate":"az67","../modules/_core":"dqAF"}],"lhhI":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _setImmediate = _interopRequireDefault(require("core-js/library/fn/set-immediate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * NUO v1.1.0
 * (c) 2018 crossjs
 * Released under the MIT License.
 */
function Nuo(fn) {
  var this$1 = this;

  if (!isNuo(this)) {
    throw new TypeError('Promises must be constructed via new');
  }

  if (!isFunction(fn)) {
    throw new TypeError('The first argument must be a function');
  } // state


  this._s = null; // value

  this._v = null; // progress

  this._p = null; // deferred

  this._d = [];
  doResolve(fn, function (value) {
    return resolve.call(this$1, value);
  }, function (reason) {
    return reject.call(this$1, reason);
  }, function (progress) {
    return notify.call(this$1, progress);
  });
}

function handle(deferred) {
  var this$1 = this;

  if (this._s === null) {
    this._d.push(deferred);

    if (deferred.onProgress) {
      if (this._p !== null) {
        (0, _setImmediate.default)(function () {
          deferred.onProgress(this$1._p);
        });
      }
    }

    return;
  }

  (0, _setImmediate.default)(function () {
    var cb = this$1._s ? deferred.onFulfilled : deferred.onRejected;

    if (cb === null) {
      (this$1._s ? deferred.resolve : deferred.reject)(this$1._v);
    } else {
      try {
        var ret = cb(this$1._v);
        deferred.resolve(ret);
      } catch (e) {
        deferred.reject(e);
      }
    }
  });
}

function resolve(newValue) {
  var this$1 = this;

  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === this) {
      throw new TypeError('A promise cannot be resolved with itself.');
    }

    if (newValue && (isObject(newValue) || isFunction(newValue))) {
      var then = newValue.then;

      if (isFunction(then)) {
        var fn = function (resolve, reject, notify) {
          then.call(newValue, resolve, reject, notify);
        };

        doResolve(fn, function (value) {
          return resolve.call(this$1, value);
        }, function (reason) {
          return reject.call(this$1, reason);
        }, function (progress) {
          return notify.call(this$1, progress);
        });
        return;
      }
    }

    this._s = true;
    this._v = newValue;
    finale.call(this);
  } catch (e) {
    reject.call(this, e);
  }
}

function reject(newValue) {
  this._s = false;
  this._v = newValue;
  finale.call(this);
}

function notify(progress) {
  this._p = progress;
  finale.call(this, true);
}

function finale(keepDeferred) {
  var this$1 = this;

  for (var i = 0, d = this._d, len = d.length; i < len; i++) {
    handle.call(this$1, d[i]);
  }

  if (!keepDeferred) {
    this._d = null;
  }
}

function Handler(onFulfilled, onRejected, onProgress, resolve, reject, notify) {
  this.onFulfilled = isFunction(onFulfilled) ? onFulfilled : null;
  this.onRejected = isFunction(onRejected) ? onRejected : null;
  this.onProgress = isFunction(onProgress) ? onProgress : null;
  this.resolve = resolve;
  this.reject = reject;
  this.notify = notify;
}
/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */


function doResolve(fn, onFulfilled, onRejected, onProgress) {
  var done = false;

  try {
    fn(function (value) {
      if (done) {
        return;
      }

      done = true;
      onFulfilled(value);
    }, function (reason) {
      if (done) {
        return;
      }

      done = true;
      onRejected(reason);
    }, function (progress) {
      if (done) {
        return;
      }

      onProgress(progress);
    });
  } catch (e) {
    if (done) {
      return;
    }

    done = true;
    onRejected(e);
  }
}

Nuo.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};

Nuo.prototype['finally'] = function (done) {
  return this.then(function (value) {
    return Nuo.resolve(done()).then(function () {
      return value;
    });
  }, function (reason) {
    return Nuo.resolve(done()).then(function () {
      throw reason;
    });
  });
};

Nuo.prototype.progress = function (onProgress) {
  return this.then(null, null, onProgress);
};

Nuo.prototype.then = function (onFulfilled, onRejected, onProgress) {
  var this$1 = this;
  return new Nuo(function (resolve, reject, notify) {
    handle.call(this$1, new Handler(onFulfilled, onRejected, onProgress, resolve, reject, notify));
  });
};

Nuo.resolve = function (value) {
  return isNuo(value) ? value : new Nuo(function (resolve) {
    return resolve(value);
  });
};

Nuo.reject = function (value) {
  return new Nuo(function (resolve, reject) {
    return reject(value);
  });
};

Nuo.notify = function (value) {
  return new Nuo(function (resolve, reject, notify) {
    return notify(value);
  });
};

Nuo.all = function (values) {
  return new Nuo(function (resolve, reject, notify) {
    if (values.length === 0) {
      return resolve([]);
    }

    var remaining = values.length;

    function res(i, val) {
      try {
        if (val && (isObject(val) || isFunction(val))) {
          var then = val.then;

          if (isFunction(then)) {
            then.call(val, function (val) {
              res(i, val);
            }, reject, notify);
            return;
          }
        }

        values[i] = val;

        if (--remaining === 0) {
          resolve(values);
        }
      } catch (e) {
        reject(e);
      }
    } // 各数组项都会被执行到，
    // 即时中途出现被拒绝项。


    for (var i = 0, len = remaining; i < len; i++) {
      res(i, values[i]);
    }
  });
};

Nuo.race = function (values) {
  return new Nuo(function (resolve, reject, notify) {
    // 各数组项都会被执行到，
    // 即时中途出现被拒绝项。
    for (var i = 0, len = values.length; i < len; i++) {
      Nuo.resolve(values[i]).then(resolve, reject, notify);
    }
  });
};

Nuo.any = function (values) {
  return new Nuo(function (resolve, reject, notify) {
    if (values.length === 0) {
      return reject();
    }

    var remaining = values.length;

    function res(i, val) {
      try {
        if (val && (isObject(val) || isFunction(val))) {
          var then = val.then;

          if (isFunction(then)) {
            then.call(val, function (val) {
              res(i, val);
            }, reject, notify);
            return;
          }
        }

        resolve(val);
      } catch (e) {
        reject(e);
      }

      if (--remaining === 0) {
        reject();
      }
    } // 各数组项都会被执行到，
    // 即时中途出现被拒绝项。


    for (var i = 0, len = remaining; i < len; i++) {
      res(i, values[i]);
    }
  });
};

function isNuo(val) {
  return val instanceof Nuo;
}

function isObject(val) {
  return typeof val === 'object';
}

function isFunction(val) {
  return typeof val === 'function';
}

var _default = Nuo;
exports.default = _default;
},{"core-js/library/fn/set-immediate":"Ho3O"}],"PbFG":[function(require,module,exports) {
"use strict";

var _nuo = _interopRequireDefault(require("nuo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof Promise === "undefined") {
  window.Promise = _nuo.default;
}
},{"nuo":"lhhI"}]},{},["PbFG"], null)
//# sourceMappingURL=promise.7b611e3b.js.map