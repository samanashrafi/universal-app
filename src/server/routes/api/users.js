const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("server/config/keys");
const passport = require("passport");

// Load Input Validation
const validateRegister = require("server/validation/register");
const validateLogin = require("server/validation/login");

// Load User model
const User = require("server/models/User");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users works3" }));

// @route   GET api/users/register
// @desc    Register user
// @access  Public

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    const { errors, isValid } = validateRegister(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    if (user) {
      errors.email =
        "ایمیل مورد نظر قبلا ثبت شده است لطفا ایمیل دیگری را انتخاب فرمایید.";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        avatar: req.body.avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err)
            return res.status(400).json({
              errosMsg: "سیستم با خطا مواجه شده است لطفا بعدا امتحان فرمایید."
            });
          newUser.password = hash;
          newUser
            .save()
            .then(user =>
              res
                .status(200)
                .json({ msg: "کاربر گرامی ثبت نام شما با موفقیت انجام شد." })
            )
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      mobile: req.user.mobile
    });
  }
);

// @route   GET api/users/all
// @desc    Return all user
// @access  Private

router.get("/all", (req, res) => {
  User.find()
    .populate("user", ["name", "email", "mobile", "avatar"])
    .then(users => {
      if (!users) {
        return res.status(404).json({ msg: "هیچ کاربری وجود ندارد." });
      }
      res.json(users);
    })
    .catch(err => res.status(404).json({ users: "هیچ کاربری وجود ندارد." }));
});

// @route   GET api/users/:user_Id
// @desc    delete user by Id
// @access  Private
router.post("/delete/id", (req, res) => {
  User.findByIdAndRemove(req.params.id).then(users => {
    if (!users) {
      return res.status(404).json({ msg: "هیچ کاربری وجود ندارد." });
    }
    res.json({ msg: "کاربر مورد نظر شما با موفقیت حذف شد." });
  });
});

// router.delete(
//   "/delete/:user_id",
//   // passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     User.findOne({ user: req.user.id })
//       .then(user => {
//         // Get remove index
//         const removeIndex = user.education
//           .map(item => item.id)
//           .indexOf(req.params.user_id);

//         // Splice out of array
//         user.splice(removeIndex, 1);

//         // Save
//         user.save().then(user => res.json(user));
//       })
//       .catch(err => res.status(404).json(err));
//   }
// );

module.exports = router;
