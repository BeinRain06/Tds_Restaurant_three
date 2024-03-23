import axios from "axios";

axios.defaults.withCredentials = true;

//FOR POST
/* export async function postPayment(orderId, account, codePayment, totalPrice) {
  //remember you post the Payment when you click on the "validate Button" in template Order.jsx
  try {
    let api_url = "http://localhost:5000/api/delivery/payments/payment";

    let newPayment;

    const res = await axios.post(
      api_url,
      {
        order: orderId, // id_order
        account: account,
        codePayment: codePayment, // default value first
        amountBill: totalPrice.toString(),
      },
      {
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    newPayment = res.data.data;

    console.log("newPayment initialize...", newPayment);
    //send back payment context Api right function
    return newPayment;
  } catch (err) {
    console.log(err);
  }
} */

export async function postPayment(orderId, account, codePayment, totalPriceIn) {
  //remember you post the Payment when you click on the "validate Button" in template Order.jsx
  try {
    let api_url = "http://localhost:5000/api/delivery/payments/payment";

    const params = {
      order: orderId,
      account: account,
      codePayment: codePayment,
      amountBill: totalPriceIn,
    };

    const response = await fetch(api_url, {
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

    // newPayment = await res.data;

    console.log("newPayment initialize...", response);
    //send back payment context Api right function
    return response;
  } catch (err) {
    console.log(err);
  }
}

// ---> HERE FURTHER ADD PART FUNCTION (UPDATE REQUEST) TO FINALIZE THE PAYMENT

//FOR POST
export async function endPayment(paymentId, account, amountBill) {
  //remember you post the Payment when you click on the "validate Button" in template Order.jsx
  try {
    let api_url = "http://localhost:5000/api/delivery/payments/payment";

    let endPayment;

    const res = await axios.put(
      `${api_url}/${paymentId}`,
      {
        account: account,
        amountBill: amountBill,
      },
      {
        headers: {
          /* "Content-Type": "application/json", */
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    endPayment = res.data.data;

    console.log("newPayment completed", endPayment);
    //send back payment context Api right function
    return endPayment;
  } catch (err) {
    console.log(err);
  }
}
