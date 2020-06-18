"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/stitchit',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret'
};
exports["default"] = _default;