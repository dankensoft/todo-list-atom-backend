"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsHandler = void 0;
const cors_1 = __importDefault(require("cors"));
exports.corsHandler = (0, cors_1.default)({ origin: true });
//# sourceMappingURL=cors.js.map