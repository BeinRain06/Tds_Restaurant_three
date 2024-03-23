import axios from "axios";

axios.defaults.withCredentials = true;

export async function userRegistering({
  password,
  city,
  street,
  country,
  phone,
  email,
}) {
  try {
    let userIdentity;

    let api_url = "http://localhost:5000/api/delivery/users/register";

    const res = await axios.post(
      api_url,

      {
        password: password,
        city: city,
        street: street,
        country: country,
        phone: phone,
        email: email,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    userIdentity = res.data.data;
    console.log(userIdentity);

    return userIdentity;
  } catch (err) {
    console.log(err);
  }
}

export async function userLogging({ email, password }) {
  try {
    let userIdentity;

    let api_url = "http://localhost:5000/api/delivery/users/login";

    console.log(`API-- this email: ${email}, this password:${password}`);

    const res = await axios.post(
      api_url,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    userIdentity = res.data.data;

    console.log("userIdentity return after logging", userIdentity);

    return userIdentity;
  } catch (err) {
    console.log(err);
  }
}

export async function updatingRegistering(email) {
  try {
    let userIdentity;

    let api_url = "http://localhost:5000/api/delivery/users/register";

    const res = await axios.put(
      api_url,
      {
        email: email,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    userIdentity = res.data.data;
    console.log(userIdentity);

    return userIdentity;
  } catch (err) {
    console.log(err);
  }
}
