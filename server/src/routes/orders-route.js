const express = require("express");
const router = express.Router();
const cors = require("cors");
var moment = require("moment");

const Order = require("../models/order");

const OrderSpecs = require("../models/order-spec");

const User = require("../models/user");

// middleware that is specific to this router
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use(
  cors({
    origin: [
      "http://localhost:5000",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

//Fetching Order Week
router.get("/orderWeek", async (req, res) => {
  console.log("order on the week");
  try {
    const ordersList = await Order.find({ user: req.body.user })
      .populate("ordersSpecs", "quantity")
      .populate({
        path: "ordersSpecs",
        populate: {
          path: "meals",
          populate: ["name", "ratings", "price", "id", "origin", "image"],
        },
      })
      .sort({ dateOrdered: -1 });

    const monday = moment().weekday(1);
    const sunday = moment().weekday(7);

    const ordersListWeek = await Promise.all(
      ordersList.map(async (orderCatch) => {
        if (
          moment(orderCatch.dateOrdered).isBetween(monday, sunday, null, "[]")
        ) {
          return orderCatch;
        }
      })
    );

    console.log("ordersListWeek:", ordersListWeek);
    res.json({ sucess: true, data: ordersListWeek });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, error: "Can't fetch ordered week meals !" });
  }
});

//Emit Order
router.post("/order", async (req, res) => {
  console.log("orders-routes orderSpecsCurrent :", req.body);
  try {
    const orderSpecIds = Promise.all(
      req.body.ordersSpecs.map(async (orderSpec) => {
        // instance of OrderSpecs Model
        let newOrderSpec = new OrderSpecs({
          meal: orderSpec.id, // id meal
          quantity: orderSpec.quantity,
        });
        newOrderSpec = await newOrderSpec.save();

        return newOrderSpec._id;
      })
    );

    //await to return values of the Promise in one array (using Promise.all)
    const orderSpecIdsResolved = await orderSpecIds;

    // shorthand using "await" to return straight at the end the value of Promise
    const totalPrices = await Promise.all(
      orderSpecIdsResolved.map(async (orderSpecId) => {
        const orderSpec = await OrderSpecs.findById(orderSpecId).populate(
          "meal",
          "price"
        );

        const totalPrice = orderSpec.meal.price * orderSpec.quantity;

        return totalPrice;
      })
    );

    const totalPrice = totalPrices.reduce((acc, elt) => acc + elt, 0);

    const ordersItems = await Promise.all(
      orderSpecIdsResolved.map(async (orderSpecId) => {
        const orderSpec = await OrderSpecs.findById(orderSpecId).populate(
          "meal",
          ["_id", "name", "price", "origin", "ratings"]
        );
        return orderSpec;
      })
    );

    const userHomeLocation = async () => {
      const userEmail = req.body.user;
      let currentUser;
      let city, street, userId;

      if (req.body.city === "home" || req.body.street === "home") {
        /*  if (userData.type === "id") {
          currentUser = await User.findById(userData.user);
        } else {
          currentUser = await User.findOne({ email: userData.user });
        } */

        if (req.cookies.userId !== undefined) {
          console.log("userId: ", req.cookies.userId);
          currentUser = await User.findById(req.cookies.userId);
        } else {
          console.log("userEmail:", userEmail);
          currentUser = await User.findOne({ email: userEmail });
        }
        console.log("currentUser:", currentUser);
        city = currentUser.city;
        street = currentUser.street;
        userId = currentUser._id;

        return { city, street, userId };
      } else {
        console.log("currentUser:", currentUser);
        city = req.body.city;
        street = req.body.street;
        userId = currentUser._id;
        return { city, street, userId };
      }
    };

    const homeInfo = await userHomeLocation();

    const { city, street, userId } = homeInfo;

    console.log("orders-route user-id", userId);

    let order = new Order({
      ordersSpecs: ordersItems,
      city: city,
      street: street,
      totalPrice: totalPrice.toFixed(2),
      user: userId,
      phone: req.body.phone,
      codePayment: totalPrice.toString(16),
      status: req.body.status,
      payment: req.body.payment,
    });

    order = await order.save();

    console.log("new Order successfully posted", order);

    res.json({ success: true, data: order });
    // ...be continued, add user in order and phone user in order but first finish categories-routes code implementation
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error:
        "Error: check your process something went wrong can't post this order",
    });
  }
});

//CHECK TOTAL PRICE
router.post("/order/checkprice", async (req, res) => {
  try {
    const orderSpecIds = Promise.all(
      req.body.ordersSpecs.map(async (orderSpec) => {
        // instance of OrderSpecs Model
        let newOrderSpec = new OrderSpecs({
          meal: orderSpec.id,
          quantity: orderSpec.quantity,
        });
        newOrderSpec = await newOrderSpec.save();

        return newOrderSpec._id;
      })
    );

    const orderSpecIdsResolved = await orderSpecIds;

    // shorthand using "await" to return straight at the end the value of Promise
    const totalPrices = await Promise.all(
      orderSpecIdsResolved.map(async (orderSpecId) => {
        const orderSpec = await OrderSpecs.findById(orderSpecId).populate(
          "meal",
          "price"
        );

        const totalPrice = orderSpec.meal.price * orderSpec.quantity;

        return totalPrice;
      })
    );

    const totalPrice = totalPrices.reduce((acc, elt) => acc + elt, 0);

    res.json({ success: true, data: totalPrice });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error:
        "Error: check your process something went wrong can't check price of this order",
    });
  }
});

// UPDATING NEW LOCATION
router.put("/order/newlocation/:orderId", async (req, res) => {
  console.log("body phone:", req.body.phone);
  console.log("body user:", req.body.user);

  let city = req.body.city;
  let street = req.body.street;

  try {
    if (city === "home" || street === "home") {
      const user = await User.findById(req.body.user);
      city = user.city;
      street = user.street;
      console.log("city:", city);
      console.log("street:", street);
    }

    const updateOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        phone: req.body.phone,
        city: city,
        street: street,
      },
      { new: true }
    );
    console.log(" Order successfully updated", updateOrder);

    res.json({ success: true, data: updateOrder });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong can't create rated-meal",
    });
    console.log(err);
  }
});

// UPDATING ORDER TOTAL PRICE
router.put("/order/updateprice/:orderId", async (req, res) => {
  try {
    const ordersItems = await Promise.all(
      req.body.ordersSpecs.map(async (item) => {
        let orderSpecId = item._id;

        if (orderSpecId === undefined) {
          let newOrderSpec = new OrderSpecs({
            meal: item.id,
            quantity: item.quantity,
          });
          newOrderSpec = await newOrderSpec.save();
          orderSpecId = newOrderSpec._id;
        }

        const orderSpec = await OrderSpecs.findById(orderSpecId).populate(
          "meal",
          ["_id", "name", "price", "origin", "ratings"]
        );
        return orderSpec;
      })
    );

    const totalPrices = await Promise.all(
      ordersItems.map(async (orderItem) => {
        const orderSpec = await OrderSpecs.findById(orderItem._id).populate(
          "meal",
          "price"
        );

        const totalPrice = orderSpec.meal.price * orderSpec.quantity;

        return totalPrice;
      })
    );

    const totalPrice = totalPrices.reduce((acc, elt) => acc + elt, 0);

    console.log("params orderId:", req.params.orderId);

    const updateOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        orderSpecs: ordersItems,
        totalPrice: totalPrice.toFixed(2),
        codePayment: totalPrice.toString(16),
      },
      { new: true }
    );
    console.log(" Order successfully updated", updateOrder);

    res.json({ success: true, data: updateOrder });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Error: something went wrong can't create updated the order",
    });
    console.log(err);
  }
});

module.exports = router;

// --> here we are i writed authenticated user => next move i have to **POST** order after this authentication (order-routes.js)
