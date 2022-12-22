"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtocolTypes = exports.ServerStatus = void 0;
var ServerStatus;
(function (ServerStatus) {
    ServerStatus["UP"] = "up";
    ServerStatus["DOWN"] = "down";
})(ServerStatus = exports.ServerStatus || (exports.ServerStatus = {}));
var ProtocolTypes;
(function (ProtocolTypes) {
    ProtocolTypes[ProtocolTypes["HTTP"] = 0] = "HTTP";
    ProtocolTypes[ProtocolTypes["HTTPs"] = 1] = "HTTPs";
    ProtocolTypes[ProtocolTypes["TCP"] = 2] = "TCP";
})(ProtocolTypes = exports.ProtocolTypes || (exports.ProtocolTypes = {}));
//# sourceMappingURL=enums.js.map