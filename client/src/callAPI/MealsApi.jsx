import axios from "axios";
axios.defaults.withCredentials = true;

export async function getMeals() {
  // const body_url = axios.defaults.baseUrl;

  // const api_url = `${body_url}/meals`;

  try {
    const res = await axios.get("/meals");
    // console.log("responseMeal: ", res);
    let meals = [];
    meals = res.data.data;
    return meals;
  } catch (err) {
    console.log(err);
  }
}

export async function getDesserts() {
  let desserts = [];
  try {
    const res = await axios.get("/meals/desserts");
    desserts = res.data.data; //res.data(axios res) - .data (structured data response in backend)
    return desserts;
  } catch (err) {
    console.log(err);
  }
}

export async function getSeaFoods() {
  let seafoods = [];
  try {
    const res = await axios.get("/meals/seafoods");
    seafoods = res.data.data; //res.data(axios res) - .data (structured data response in backend)
    return seafoods;
  } catch (err) {
    console.log(err);
  }
}

export async function getVegetarians() {
  let vegetarians = [];
  try {
    const res = await axios.get("/meals/vegetarians");
    vegetarians = res.data.data; //res.data(axios res) - .data (structured data response in backend)
    return vegetarians;
  } catch (err) {
    console.log(err);
  }
}

export async function getSeaMeats() {
  let meats = [];
  try {
    const res = await axios.get("/meals/meats");
    meats = res.data.data; //res.data(axios res) - .data (structured data response in backend)
    return meats;
  } catch (err) {
    console.log(err);
  }
}

export async function* getAllTypesFoods() {
  try {
    //GET MEALS
    const resMeals = await axios.get("/meals");
    sendMeals = resMeals.data.data;

    yield sendMeals;

    //GET MEATS
    const resMeats = await axios.get(`${api_url}/${process.env.ID_MEATS}`);
    sendMeats = resMeats.data.data;

    yield sendMeats;

    //GET DESSERTS
    const resDesserts = await axios.get(
      `${api_url}/${process.env.ID_DESSERTS}`
    );
    sendDesserts = resDesserts.data.data;
    yield sendDesserts;
    //GET VEGETARIANS
    const resVegetarians = await axios.get(
      `${api_url}/${process.env.ID_VEGETARIANS}`
    );
    sendVegetarians = resVegetarians.data.data;
    yield sendVegetarians;

    //GET SEAFOODS
    const resSeaFoods = await axios.get(
      `${api_url}/${process.env.ID_SEAFOODS}`
    );
    sendSeaFoods = resSeaFoods.data.data;

    yield sendSeaFoods;
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: "Error Sending all eventually data types of Foods",
    });
  }
}
