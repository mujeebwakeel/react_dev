"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _connectHistoryApiFallback = _interopRequireDefault(require("connect-history-api-fallback"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _config = _interopRequireDefault(require("./config"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _path = _interopRequireDefault(require("path"));

var _userRoute = _interopRequireDefault(require("./routes/userRoute"));

var _productRoute = _interopRequireDefault(require("./routes/productRoute"));

var _cors = _interopRequireDefault(require("cors"));

_dotenv["default"].config();

var mongodbUrl = _config["default"].MONGODB_URL;

_mongoose["default"].connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})["catch"](function (error) {
  return console.log(error.message);
});

var app = (0, _express["default"])();
app.use((0, _connectHistoryApiFallback["default"])());
var port = process.env.PORT || 5000;
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _cors["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../frontend/build')));
app.use("/api/users", _userRoute["default"]);
app.use("/api/products", _productRoute["default"]);
app.get("*", function (req, res) {
  res.send(_express["default"]["static"](_path["default"].join(__dirname, '../frontend/build/index.html')));
});

if (process.env.NODE_ENV === "production") {
  app.use(_express["default"]["static"](_path["default"].join(__dirname, '../frontend/build')));
  app.get("*", function (req, res) {
    res.sendFile(_path["default"].join(__dirname, '../frontend/build', 'index.html'));
  });
}

app.listen(port, function () {
  console.log("The backend server has started");
});
//# sourceMappingURL=server.js.map