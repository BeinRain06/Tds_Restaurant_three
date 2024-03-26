import axios from "axios";

/* axios.defaults.withCredentials = true; */

export async function initiateOrder(userEmail, orderSpecsCurrent) {
  try {
    // console.log("API-orderSpecsCurrent :", orderSpecsCurrent);
    const ordersSpecs = orderSpecsCurrent;

    // console.log("orders - API -userEmail :", userEmail);

    const params = {
      ordersSpecs: orderSpecsCurrent,
      user: userEmail,
      city: "home",
      street: "home",
    };

    const response = await fetch("/orders/order", {
      method: "POST",
      body: JSON.stringify(params),
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => res.data)
      .catch((error) => {
        console.error("Error:", error);
      });

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchOrdersWeek(userId) {
  try {
    const res = await axios.get(
      "/orders/orderweek",
      {
        user: userId,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const orderListWeek = res.data.data;

    // console.log("ordered:", orderListWeek);

    return orderListWeek;
  } catch (err) {
    console.log(err);
  }
}

export async function updateThisLocationOrder(userId, newLoc, orderId) {
  try {
    const { phone, city, street } = newLoc;

    const res = await axios.put(
      "/orders/order/newlocation",
      {
        user: userId,
        phone: phone,
        city: city,
        street: street,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const order = res.data.data;

    // console.log("ordered:", order);

    return order;
  } catch (err) {
    console.log(err);
  }
}

export async function updateThisTotalPriceOrder(orderId, orderSpecsCurrent) {
  try {
    /* console.log("orderId -API-PUT METHOD:", orderId);
    console.log("orderSpecsCurrent -API-PUT METHOD:", orderSpecsCurrent); */

    const res = await axios.put(
      "/orders/order/updateprice",
      {
        ordersSpecs: orderSpecsCurrent,
      },

      {
        headers: {
          /* "Content-Type": "application/x-www-form-urlencoded", */
          "Content-Type": "application/json",
        },
      }
    );

    const order = res.data.data;

    // console.log("order when updated:", order);

    return order;

    // with Fetch Method

    /*  const data = {
      ordersSpecs: orderSpecsCurrent,
    };
    const response = await fetch(`${api_url}/${orderId}`, {
      method: "PUT",
      body: JSON.stringify(data),
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();

    // let decoder = new TextDecoder("utf-16");
    // let rateData = JSON.parse(decoder.decode(res));

    console.log("res PUT METHOD:", res);
    return res.data; */
  } catch (err) {
    console.log(err);
  }
}

export async function checkTotalPriceOrder(orderSpecsCurrent) {
  try {
    const res = await axios.post(
      "/orders/order/checkprice",
      {
        ordersSpecs: orderSpecsCurrent,
      },

      {
        headers: {
          /*  "Content-Type": "application/x-www-form-urlencoded", */
          "Content-Type": "application/json",
        },
      }
    );

    const totalPriceIn = res.data.data.toFixed(2);

    // console.log("new total price when updated:", totalPriceIn);

    return totalPriceIn;

    // with Fetch Method

    /*  const data = {
      ordersSpecs: orderSpecsCurrent,
    };
    const response = await fetch(`${api_url}/${orderId}`, {
      method: "PUT",
      body: JSON.stringify(data),
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();

    // let decoder = new TextDecoder("utf-16");
    // let rateData = JSON.parse(decoder.decode(res));

    console.log("res PUT METHOD:", res);
    return res.data; */
  } catch (err) {
    console.log(err);
  }
}
