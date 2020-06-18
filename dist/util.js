"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getToken = function getToken(user) {
  return _jsonwebtoken["default"].sign(user, _config["default"].JWT_SECRET, {
    expiresIn: '48h'
  });
};

exports.getToken = getToken;