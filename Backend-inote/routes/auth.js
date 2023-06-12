const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_Secret = "dev@Rocks$walls";


// ROUTE 1 creating new user(sign up) handling http://localhost:5000/api/auth/createUSer here. No login required
router.post(
  "/createUser",
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //checking whether a user with the email already exists.
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry a user with this email already exists." });
      }
      let salt = bcrypt.genSaltSync(10);
      let secPass = await bcrypt.hash(req.body.password, salt);
      // create a new user.
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      let data = {
        user: {
          id: user.id,
        },
      };

      let authtoken = jwt.sign(data, JWT_Secret);
      // res.json(user);
      res.json({ authtoken,"status":true  });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("some error occured bruhh!!");
    }
  }
);

// ROUTE 2 handling http://localhost:5000/api/auth/login here.

router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      //check for the user in database.
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please enter proper credentials./email not found" });
      }
      //compare the password from request and the hash of the password.
      let passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please enter proper credentials." });
      }
      let data = {
        user: {
          id: user.id,
        },
      };
      // sending the JWT token for authentication puposes.
      let authtoken = jwt.sign(data, JWT_Secret);
      res.json({ authtoken,"status":true });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("some internal error occured ");
    }
  }
);

// ROUTE 3 get loggedin user detaisl handling http://localhost:5000/api/auth/getuser here. Login required

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userid = req.user.id;
    let user = await User.findById(userid).select("-password");
    res.json( user );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("some internal error occured ");
  }
});

module.exports = router;

