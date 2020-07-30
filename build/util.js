"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdmin = exports.isAuth = exports.getToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("./config"));

var getToken = function getToken(user) {
  return _jsonwebtoken["default"].sign({
    _id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    rePassword: user.rePassword,
    description: user.description
  }, _config["default"].JWT_SECRET, {
    expiresIn: "48h"
  });
};

exports.getToken = getToken;

var isAuth = function isAuth(req, res, next) {
  var token = req.headers.authorization;

  if (token) {
    var onlyToken = token.slice(7, token.length);

    _jsonwebtoken["default"].verify(onlyToken, _config["default"].JWT_SECRET, function (err, decode) {
      if (err) {
        return res.status(401).send({
          msg: "invalid token"
        });
      }

      req.user = decode;
      return next();
    });
  } else {
    return res.status(401).send({
      msg: "Token is not supplied"
    });
  }
};

exports.isAuth = isAuth;

var isAdmin = function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    return next();
  }

  return res.status(401).send({
    msg: "Admin Token is not valid"
  });
};

exports.isAdmin = isAdmin;
//# sourceMappingURL=util.js.map