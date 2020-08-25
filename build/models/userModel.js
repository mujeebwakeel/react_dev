"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var userSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    "default": false
  },
  description: {
    type: String,
    required: true
  }
});

var userModel = _mongoose["default"].model("User", userSchema);

var _default = userModel;
exports["default"] = _default;
//# sourceMappingURL=userModel.js.map