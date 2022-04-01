"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteStorage = void 0;
var _RemoteStorage = new WeakMap();
var RemoteStorage = /** @class */ (function () {
    function RemoteStorage(connector) {
        _RemoteStorage.set(this, { connector: connector });
    }
    RemoteStorage.prototype.list = function () {
        var connector = _RemoteStorage.get(this).connector;
        return connector.list();
    };
    RemoteStorage.prototype.var = function (name, value) {
        var connector = _RemoteStorage.get(this).connector;
        if (arguments.length < 2) {
            return connector.get(name);
        }
        if (value !== undefined) {
            return connector.set(name, value);
        }
        return connector.del(name);
    };
    return RemoteStorage;
}());
exports.RemoteStorage = RemoteStorage;
