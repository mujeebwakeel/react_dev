"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireWildcard(require("express"));

var _productModel = require("../models/productModel");

var _util = require("../util");

var router = _express["default"].Router();

router.get("/", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var item;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.query.search && req.query.search === "all") {
              _productModel.Product.find({}, function (err, products) {
                res.send(products);
              });
            } else if (req.query.search && req.query.search !== "undefined") {
              item = req.query.search;

              _productModel.Product.find({
                category: item
              }, function (err, products) {
                res.send(products);
              });
            } else {
              _productModel.Product.find({
                category: "Shirt"
              }, function (err, products) {
                res.send(products);
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
router.get("/soldout", _util.isAuth, _util.isAdmin, function (req, res) {
  _productModel.Purchase.find({}, function (err, foundGoods) {
    if (err) {
      return res.send("Error while searching sold goods");
    }

    res.send(foundGoods);
  });
});
router.get("/:id", function (req, res) {
  _productModel.Product.findById(req.params.id, function (err, product) {
    if (err) {
      return res.status(400).send({
        message: "Product Not Found"
      });
    }

    res.send(product);
  });
});
router.post("/", _util.isAuth, _util.isAdmin, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var product;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            product = new _productModel.Product({
              name: req.body.name,
              price: req.body.price,
              image: req.body.imageUrl,
              imageId: req.body.imageId,
              category: req.body.category,
              brand: req.body.brand,
              countInStock: req.body.countInStock,
              description: req.body.description,
              rating: req.body.rating,
              numReviews: req.body.numReviews
            });
            product.save(function (err, newProduct) {
              if (err) {
                console.log(err);
                return res.status(500).send({
                  message: "Error while creating Product"
                });
              }

              return res.status(201).send({
                message: "New Product Created",
                data: newProduct
              });
            });

          case 2:
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
router.put("/:id", _util.isAuth, _util.isAdmin, /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _productModel.Product.findById(req.params.id, /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(err, product) {
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (!(err || !product)) {
                          _context3.next = 3;
                          break;
                        }

                        console.log(err);
                        return _context3.abrupt("return", res.status(500).send({
                          message: "Error while updating Product"
                        }));

                      case 3:
                        product.name = req.body.name;
                        product.price = req.body.price;
                        product.category = req.body.category;
                        product.brand = req.body.brand;
                        product.countInStock = req.body.countInStock;
                        product.description = req.body.description;
                        product.rating = req.body.rating;
                        console.log(product);
                        product.save(function (err, foundProduct) {
                          if (err) {
                            console.log(err);
                            return res.status(500).send({
                              message: "Error while updating Product"
                            });
                          }

                          return res.status(200).send({
                            message: "Product Updated",
                            data: foundProduct
                          });
                        });

                      case 12:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x7, _x8) {
                return _ref4.apply(this, arguments);
              };
            }());

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router["delete"]("/:id", _util.isAuth, _util.isAdmin, /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var deletedProduct;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _productModel.Product.findById(req.params.id);

          case 2:
            deletedProduct = _context5.sent;

            if (!deletedProduct) {
              _context5.next = 7;
              break;
            }

            _context5.next = 6;
            return deletedProduct.remove();

          case 6:
            return _context5.abrupt("return", res.send({
              message: "Product Deleted",
              data: deletedProduct
            }));

          case 7:
            return _context5.abrupt("return", res.status(500).send({
              message: "Error while deleteting Product"
            }));

          case 8:
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
router.post("/purchase", _util.isAuth, /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var product, items;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            product = new _productModel.Purchase({
              order_time: req.body.order_time,
              order_id: req.body.order_id,
              customer_name: req.body.customer_name,
              customer_email: req.body.customer_email,
              order_amount: req.body.order_amount,
              item_number: req.body.item_number,
              shipping: req.body.shipping
            });
            items = req.body.items;
            items.forEach(function (item) {
              product.items.push(item);
            });
            product.save(function (err, purchasedProduct) {
              if (err) {
                return res.status(500).send({
                  message: "Error while saving purchased product"
                });
              }

              return res.status(201).send({
                message: "New Product Created",
                data: purchasedProduct
              });
            });

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
router.get("/soldout/:id", /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var product;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _productModel.Purchase.findById(req.params.id);

          case 2:
            product = _context7.sent;
            product.cleared = true;
            product.save(function (err, clearedProduct) {
              if (err) {
                return res.status(500).send({
                  message: "Error while saving purchased product"
                });
              }

              return res.status(201).send({
                message: "New Product Created",
                data: clearedProduct
              });
            });

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=productRoute.js.map