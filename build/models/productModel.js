"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Purchase = exports.Product = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var productSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    "default": 0,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  countInStock: {
    type: Number,
    "default": 0,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    "default": 0,
    required: true
  },
  numReviews: {
    type: Number,
    "default": 0,
    required: true
  }
});
var purchaseSchema = new _mongoose["default"].Schema({
  order_time: {
    type: String,
    required: true
  },
  order_id: {
    type: String,
    required: true
  },
  customer_name: {
    type: String,
    required: true
  },
  customer_email: {
    type: String,
    required: true
  },
  order_amount: {
    type: Number,
    required: true
  },
  item_number: {
    type: Number,
    required: true
  },
  items: [{
    product: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    qty: {
      type: Number,
      required: true
    }
  }],
  cleared: {
    type: Boolean,
    "default": false,
    required: true
  },
  shipping: {
    address: {
      type: String
    },
    country: {
      type: String
    },
    city: {
      type: String
    },
    postalCode: {
      type: String
    }
  }
});

var Product = _mongoose["default"].model("Product", productSchema);

exports.Product = Product;

var Purchase = _mongoose["default"].model("Purchase", purchaseSchema);

exports.Purchase = Purchase;
//# sourceMappingURL=productModel.js.map