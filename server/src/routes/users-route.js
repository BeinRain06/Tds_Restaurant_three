const express = require("express");

require("dotenv").config();

var cors = require("cors");

const router = express.Router();

const bcrypt = require("bcryptjs");

// <-- HERE MIDDLEWARE REQUEST(or CHECK) AUTHORIZATION BEFORE PROCESSING FURTHER(sending response.json in each url_routes)... -->
const requireAuthJwt = require("../protect-api/jwt");
const errorHandler = require("../protect-api/error-handler");

const User = require("../models/user");

const Favourite = require("../models/favourite");

// middleware that is specific to this router
const middlewareUser = router.use(express.urlencoded({ extended: false }));

//middleware cors
router.use(
  cors({
    origin: [
      "http://localhost:5000",
      "http://localhost:3000",
      "http://localhost:5173",
      "https://tds-restaurant-three-ui.vercel.app",
      "https://tds-restaurant-three.vercel.app",
      "https://tds-restaurant-three-back-end.onrender.com",
    ],
    preflightContinue: false,
    credentials: true,
  })
);

//check the Authorization
router.use(requireAuthJwt());
router.use(errorHandler);

// install and require npm **jsonwebtoken** package
const jwt = require("jsonwebtoken");

const createToken = (id, isAdmin) => {
  const secret = process.env.secret;
  // jwt signing
  return jwt.sign(
    {
      id,
      isAdmin,
    },
    secret,
    { expiresIn: "3d" }
  );
};

/*get Favourites*/

//GET all

router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");

    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: "Error: cannot list users" });
  }
});

// User login

router.get("/login", async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({ email }).select("-passwordHash");

    const maxAge = 3 * 1000 * 60 * 60 * 24; // 3days in ms

    //jwt signing (CREATING TOKEN FOR ACCESS AUTHORIZATION)
    const token = createToken(user.id, user.isAdmin);

    console.log("token GET LOG:", token);

    const userId = user.id;

    //(SENDING TOKEN FOR VALID AUTHORIZATION before : res.json)
    res.cookie("access_jwt_token", token, { httpOnly: true, maxAge: maxAge });

    res.cookie("userId", userId, { httpOnly: true, maxAge: maxAge });

    res.json({ success: true, data: user });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot find  user " });
    console.log(err);
  }
});

//POST user register
/*new user*/
router.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    let user = new User({
      name: req.body.name,
      passwordHash: bcrypt.hashSync(password, 10),
      city: req.body.city,
      street: req.body.street,
      country: req.body.country,
      phone: req.body.phone,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
    });

    //check if user email already exist
    const userExist = await User.findOne({ email: user.email });

    if (userExist) {
      throw new Error("This email Already Exist. Cannot create User !");
    }

    user = await user.save();
    const userId = user.id;

    const maxAge = 3 * 1000 * 60 * 60 * 24; // 3days in ms
    //jwt signing

    const token = createToken(user.id, user.isAdmin);

    res.cookie("access_jwt_token", token, { httpOnly: true, maxAge: maxAge });

    res.cookie("userId", userId, { httpOnly: true, maxAge: maxAge });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot create  user " });
    console.log(err);
  }
});

/*simple sign in (useremail, userpassword) */
router.post("/login", async (req, res) => {
  try {
    //find user by email
    // console.log("req :", req.body);
    console.log(
      `in the users-route -> this email: ${req.body.email}, along with this password: ${req.body.password}`
    );

    const user = await User.findOne({ email: req.body.email });

    const secret = process.env.secret;

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Error: user doesn't exist or incorrect email",
      });
    }
    //compare password enter with the existing one in data using bcrypt
    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const maxAge = 3 * 1000 * 60 * 60 * 24; // 3days in ms

      //jwt signing (CREATING TOKEN FOR ACCESS AUTHORIZATION)
      const userId = user.id;
      const token = createToken(user.id, user.isAdmin);

      //(SENDING TOKEN FOR VALID AUTHORIZATION before : res.json)
      res.cookie("access_jwt_token", token, { httpOnly: true, maxAge: maxAge });

      res.cookie("userId", userId, { httpOnly: false, maxAge: maxAge });

      console.log("token POST:", token);

      return res.status(200).json({
        success: true,
        message: `User ${user.name} Authenticated!`,
        data: { userName: user.name, userEmail: user.email },
      });
    } else {
      return res.status(400).json({
        success: false,
        error: " Incorrect User password",
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot find  user " });
    console.log(err);
  }
});

//PUT(update user)
router.put("/register", async (req, res) => {
  try {
    //t]TWO OPTIONS: forgot Password/ update info user
    let newPassword;
    const user = await User.findOne({ email: req.body.email });
    if (req.body.isAdmin) {
      throw new Error("Invalid Update! Specifying Admin parameter");
    }
    if (req.body.password === "") {
      throw new Error("Empty String! Cannot be password");
    } else if (req.body.password.length < 6) {
      throw new Error("password is at least 6 characters!");
    } else {
      newPassword = req.body.password;
    }

    if (user) {
      const updateUser = await User.findByIdAndUpdate(
        user.id,
        {
          name: req.body.name,
          passwordHash: bcrypt.hashSync(newPassword, 10),
          city: req.body.city,
          street: req.body.city,
          country: req.body.country,
          phone: req.body.phone,
          email: req.body.email,
        },
        { new: true }
      );
      const userId = user.id;
      const maxAge = 3 * 1000 * 60 * 60 * 24; // 3days in ms
      //jwt signing
      const token = createToken(user.id, user.isAdmin);

      return res.status(200).json({
        success: true,
        data: updateUser,
      });
    } else {
      throw new Error("Cannot found User!");
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot update  user " });
    console.log(err);
  }
});

//delete User (quite for Admin)
router.delete("/:userId", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot delete  user " });
    console.log(err);
  }
});

/*get Favourites*/

//GET an User favourite
router.get("/favourites", async (req, res) => {
  try {
    const userId = req.cookie.jwt.user;

    /* const favourites = await Favourite.findBy({}).sort({ ratings: -1 }).limit(3); */
    const user = await User.findById(userId).populate({
      path: "favourites",
      populate: {
        path: "meal",
        populate: ["name", "origin", "longDesc", "ratings"],
      },
    });

    const favourites = user.favourites;

    res.json({ success: true, data: favourites });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot find  user favourites" });
  }
});

module.exports = router;
