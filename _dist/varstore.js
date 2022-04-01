"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarStore = void 0;
var _VarStore = new WeakMap();
var VarStore = /** @class */ (function () {
    function VarStore(connector) {
        _VarStore.set(this, { connector: connector });
    }
    VarStore.prototype.list = function () {
        var connector = _VarStore.get(this).connector;
        return connector.list();
    };
    VarStore.prototype.var = function (name, value) {
        var connector = _VarStore.get(this).connector;
        if (arguments.length < 2) {
            return connector.get(name);
        }
        if (value !== undefined) {
            return connector.set(name, value);
        }
        return connector.del(name);
    };
    return VarStore;
}());
exports.VarStore = VarStore;
