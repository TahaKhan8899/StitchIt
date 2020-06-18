"use strict";

var _express = _interopRequireDefault(require("express"));

var _data = _interopRequireDefault(require("./data"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _config = _interopRequireDefault(require("./config"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _userRoute = _interopRequireDefault(require("./routes/userRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var mongodbUrl = _config["default"].MONGODB_URL;

_mongoose["default"].connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})["catch"](function (error) {
  return console.log('error: ', error.reason);
});

_mongoose["default"].set('useCreateIndex', true);

var app = (0, _express["default"])();
app.use('/api/users', _userRoute["default"]);
app.get('/api/products', function (req, res) {
  return res.send(_data["default"].products);
});
app.get('/api/products/:id', function (req, res) {
  var productId = parseInt(req.params.id, 10);

  var product = _data["default"].products.find(function (x) {
    return x._id === productId;
  });

  if (product) {
    res.send(product);
  } else res.status(404).send({
    msg: 'Product Not Found'
  });
});
app.listen(5000, function () {
  console.log('server started at http://localhost:5000');
});