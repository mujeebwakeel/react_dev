"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _util = require("../util");

var router = _express["default"].Router();

router.post("/register", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.body.password === req.body.rePassword) {
              user = new _userModel["default"]({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                rePassword: req.body.rePassword,
                description: req.body.description
              });
              user.save(function (err, newUser) {
                if (err) {
                  return res.status(401).send({
                    msg: "Invalid User Data"
                  });
                }

                res.send({
                  _id: newUser.id,
                  name: newUser.name,
                  email: newUser.email,
                  isAdmin: newUser.isAdmin,
                  description: newUser.description,
                  token: (0, _util.getToken)(newUser)
                });
              });
            } else {
              res.status(401).send({
                msg: "password confirmation failed"
              });
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.put("/register/:id", _util.isAuth, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _userModel["default"].findById(req.params.id);

          case 2:
            user = _context2.sent;
            user.name = req.body.name;
            user.email = req.body.email;
            user.description = req.body.description;
            user.save(function (err, foundUser) {
              if (err) {
                return res.status(500).send({
                  message: "Error while updating User Profile"
                });
              }

              return res.send({
                _id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email,
                description: foundUser.description,
                token: (0, _util.getToken)(foundUser),
                isAdmin: foundUser.isAdmin
              });
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post("/signin", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var signinUser;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _userModel["default"].findOne({
              email: req.body.email,
              password: req.body.password
            });

          case 2:
            signinUser = _context3.sent;

            if (signinUser) {
              res.send({
                _id: signinUser.id,
                name: signinUser.name,
                email: signinUser.email,
                isAdmin: signinUser.isAdmin,
                description: signinUser.description,
                token: (0, _util.getToken)(signinUser)
              });
            } else {
              res.status(401).send({
                msg: "Invalid email or password."
              });
            }

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.get("/allusers", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _userModel["default"].find({}, function (err, foundUsers) {
              if (err) {
                console.log(error);
              } else {
                res.send(foundUsers);
              }
            });

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.get("/createadmin", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            user = new _userModel["default"]({
              name: "Yhinkus",
              email: "wakeelmujeeb@yahoo.com",
              password: "kaywhy",
              rePassword: "kaywhy",
              description: "I am someone who was born to succeed, add values to others and make them see the world in good ways",
              isAdmin: true
            });
            user.save(function (err, newUser) {
              if (err) {
                return res.status(401).send({
                  msg: "Invalid User Data"
                });
              } else {
                res.send(newUser);
              }
            });

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=userRoute.js.map