  var log = console.log.bind(console)

function Nihil() {}
Nihil.prototype = Object.create(null)

function isObject(object) {
  var type = typeof object
  return type === 'function' || type === 'object' && !!object
}

var nativeAlert = window.alert
window.alert = function() {
  return nativeAlert(arguments.join("\n"))
}

Object.defineProperty(Object.prototype, "define", {
  configurable: true,
  enumerable: false,
  writable: false,
  value: function(name, value) {
    // if (Object[name]) {
    //   delete Object[name]
    // }
    Object.defineProperty(this, name, {
      configurable: true,
      enumerable: false,
      value: value
    })
    return this
  }
})
Object.prototype.define("extend", function() {
  return function(src) {
    var target = this
    if (isObject(src)) {
      for (var o in src) {
        if (Object[src[o]]) {
          delete Object[src[o]]
        }
        this.define(o, src[o])
      }
    }
    return this
  }
})


Object.prototype.extend({
  "hasProperty": function(a) {
    return Object.hasOwnProperty(this, a)
  },
  "getPropertyName": function(a) {
    return Object.getOwnPropertyName(this, a)
  },
  "getPropertyNames": function() {
    return Object.getOwnPropertyNames(this)
  },
  "getPropertyDescriptor": function(a) {
    return Object.getOwnPropertyDescriptor(this, a)
  },
  "getPropertyDescriptors": function() {
    var result = {}; that = this;
    Object.getOwnPropertyNames(that).each(function(a, b) {
      result[a] = Object.getOwnPropertyDescriptor(that, a)
    }, that)
    return result
  },
  "each": function(f) {
    var that = this;
    for (var i in that) {
      f && that.hasProperty(i) && f.call(that, that[i], i)
    }
    return this
  },
  "alert": function() {
    return alert(this)
  },
  "toString": function() {
    var that = this;
    return Object.prototype.toString.call(that)
  }
})
Object.prototype.define("forEach", function(callback, scope) {
  var collection = this
  if (Object.prototype.toString.call(collection) === '[object Object]') {
    for (var prop in collection) {
      if (Object.prototype.hasOwnProperty.call(collection, prop)) {
        callback.call(scope, collection[prop], prop, collection)
      }
    }
  } else {
    for (var i = 0, len = collection.length; i < len; i++) {
      callback.call(scope, collection[i], i, collection)
    }
  }
})

Object.define("setPrototypeOf", function(obj, proto) {
  obj.__proto__ = proto
  return obj
})

Object.prototype.define("map", function(fn, ctx) {
  var ctx = ctx || this,
    self = this,
    result = {}
  Object.keys(self).each(function(v, k) {
    result[k] = fn.call(ctx, self[k], k, self)
  })
  return result
})
Object.prototype.define("log", function() {
  return log(this)
})

Object.prototype.define("size", function() {
  return this.length || Object.keys(this).length
})
Object.prototype.define("str", function() {
  return JSON.stringify(this)
})
Object.prototype.define("toInt", function() {
  return parseInt(this, (arguments[0] || 10))
})
Object.prototype.define("clone", function() {
  return JSON.parse(JSON.stringify(this))
})
Object.prototype.define("values", function() {
  var keys = Object.keys(this)
  var ret = []
  for (var i = 0; i < keys.length; i++) {
    ret.push(this[keys[i]])
  }
  return ret
})
Object.prototype.define("setPrototypeOf", function(obj, proto) {
  obj.__proto__ = proto
  return obj
})
