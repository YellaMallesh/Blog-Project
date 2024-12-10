"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }

function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var User = require('../models/User');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var adminLayout = '../views/layouts/admin';
var jwtSecret = process.env.JWT_SECRET;

// get / check-Login Page
var authMiddleware = function authMiddleware(req, res, next) {
  var token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }
  try {
    var decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'unauthorized'
    });
  }
};

// get / Admin-Login Page

router.get('/admin', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var locals;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          try {
            locals = {
              title: "Admin",
              description: "a simple blogging website"
            };
            res.render('admin/index', {
              locals: locals,
              layout: adminLayout
            });
          } catch (error) {
            console.log(error);
          }
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// *Post/
// *Admin - Check Login
router.post('/admin', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body, username, password, user, isPasswordValid, token;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          _context2.next = 4;
          return User.findOne({
            username: username
          });
        case 4:
          user = _context2.sent;
          if (user) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(401).json({
            message: 'Invalid credentials'
          }));
        case 7:
          _context2.next = 9;
          return bcrypt.compare(password, user.password);
        case 9:
          isPasswordValid = _context2.sent;
          if (isPasswordValid) {
            _context2.next = 12;
            break;
          }
          return _context2.abrupt("return", res.status(401).json({
            message: 'Invalid credentials'
          }));
        case 12:
          token = jwt.sign({
            userId: user._id
          }, jwtSecret);
          res.cookie('token', token, {
            httpOnly: true
          });
          res.redirect('/dashboard');
          _context2.next = 20;
          break;
        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
        case 20:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 17]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

// *Get
// *admin -dashboard
router.get('/dashboard', authMiddleware, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var locals, data;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          locals = {
            title: ' Dashboard',
            description: 'Simple Blog website.'
          };
          _context3.next = 4;
          return Post.find();
        case 4:
          data = _context3.sent;
          res.render('admin/dashboard', {
            locals: locals,
            data: data,
            layout: adminLayout
          });
          _context3.next = 11;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

// *Get
// *admin -Create New Post

router.get('/add-post', authMiddleware, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var locals, data;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          locals = {
            title: ' Add post',
            description: 'Simple Blog website.'
          };
          _context4.next = 4;
          return Post.find();
        case 4:
          data = _context4.sent;
          res.render('admin/add-post', {
            locals: locals,
            layout: adminLayout
          });
          _context4.next = 11;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

// *POST
// *admin -Create New Post

router.post('/add-post', authMiddleware, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var newPost;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.prev = 1;
          newPost = new Post({
            title: req.body.title,
            body: req.body.body
          });
          _context5.next = 5;
          return Post.create(newPost);
        case 5:
          res.redirect('/dashboard');
          _context5.next = 11;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          console.log(_context5.t0);
        case 11:
          _context5.next = 16;
          break;
        case 13:
          _context5.prev = 13;
          _context5.t1 = _context5["catch"](0);
          console.log(_context5.t1);
        case 16:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 13], [1, 8]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

// *GET
// *admin -Edit Post

router.get('/edit-post/:id', authMiddleware, /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var locals, data;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          locals = {
            title: 'Edit post',
            description: 'Simple Blog website.'
          };
          _context6.next = 4;
          return Post.findOne({
            _id: req.params.id
          });
        case 4:
          data = _context6.sent;
          res.render('admin/edit-post', {
            locals: locals,
            data: data,
            layout: adminLayout
          });
          _context6.next = 11;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());

// *PUT
// *admin -Edit Post

router.put('/edit-post/:id', authMiddleware, /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
          });
        case 3:
          res.redirect("/edit-post/".concat(req.params.id));
          _context7.next = 9;
          break;
        case 6:
          _context7.prev = 6;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
        case 9:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 6]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());

// *DELETE
// *admin -delete Post

router["delete"]('/delete-post/:id', authMiddleware, /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return Post.deleteOne({
            _id: req.params.id
          });
        case 3:
          res.redirect('/dashboard');
          _context8.next = 9;
          break;
        case 6:
          _context8.prev = 6;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);
        case 9:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 6]]);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());

// *Post/
// *admin -Register
router.post('/register', /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _req$body2, username, password, hashedPassword, user;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
          _context9.next = 4;
          return bcrypt.hash(password, 10);
        case 4:
          hashedPassword = _context9.sent;
          _context9.prev = 5;
          _context9.next = 8;
          return User.create({
            username: username,
            password: hashedPassword
          });
        case 8:
          user = _context9.sent;
          res.status(201).json({
            message: 'User Created',
            user: user
          });
          _context9.next = 15;
          break;
        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](5);
          if (_context9.t0.code === 11000) {
            res.status(409).json({
              message: 'user already in use'
            });
          }
        case 15:
          res.status(500).json({
            message: 'internal server error'
          });
          _context9.next = 21;
          break;
        case 18:
          _context9.prev = 18;
          _context9.t1 = _context9["catch"](0);
          console.log(_context9.t1);
        case 21:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 18], [5, 12]]);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());

// *Get/
// *admin -Logout

router.get('/logout', function (req, res) {
  res.clearCookie('token');
  // res.json({message:"logout successful"});
  res.redirect('/');
});
module.exports = router;
