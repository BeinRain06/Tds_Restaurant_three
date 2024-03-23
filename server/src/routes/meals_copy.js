const express = require("express");
const router = express.Router();
const Meal = require("./models/meal");
const Category = require("./models/category");

/* import {
  PUDDING,
  DUNDEE,
  ECCLESS,
  ETON,
  MANDAZI,
  LASAGNE,
  MADEIRA,
  MINCE,
  CHEESECAKE,
} from "../assets/images/dessert/dessert";

import {
  ESCOVIT,
  FOFOS,
  PIE,
  STEW,
  GARIDES,
  SARDINES,
  TERIYAKI,
  KEDGEREE,
  LAKSAKING,
  LANCASHIRE,
  MEDITERRANEAN,
  NASI,
} from "../assets/images/fish/fish";

import {
  DUCKCONFIT,
  FATTAH,
  TSOCHICKEN,
  HANDICHICKEN,
  IRISHSTEW,
  KATSUDON,
  JERKCHICKEN,
  KATSUCHICKEN,
  KENTUCKYCHICKEN,
  KUNPAO,
  LAMBBIRYANI,
  LAMBROGAN,
} from "../assets/images/meat/meat";

import {
  DALFRY,
  FETTUCINE,
  FLAMICHE,
  ONIONSOUP,
  LENTIL,
  MESDAMES,
  PLAKI,
  SOURSOUP,
  GOHANRICE,
  KAFTEJI,
  EGGSOUP,
  DAUPHINOISE,
} from "../assets/images/vegetarian/vegeterian"; */

/*meals*/
const meals = [
  {
    meats: [
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "duck confit",
        /* foodPicture: { DUCKCONFIT }, */
        ratings: "3.8",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "British",
        category: "meats",
        ingredients: ["bay leag", "white wine", "garlic"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "egyptian fattah",
        /* foodPicture: { FATTAH }, */
        ratings: "3.8",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Egyptian",
        category: "meats",
        ingredients: ["tomatoes", "onions", "pepper"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "general tso's chicken",
        /*  foodPicture: { TSOCHICKEN }, */
        ratings: "4.1",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Chinese",
        category: "meats",
        ingredients: ["soy sauce", "honey", "garlic"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "handi chicken",
        /*  foodPicture: { HANDICHICKEN }, */
        ratings: "3.8",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "British",
        category: "meats",
        ingredients: ["bay leag", "white wine", "garlic"],
      },

      {
        id: Math.ceil(Math.random() * 1000000),
        /*  foodName: { IRISHSTEW }, */
        foodPicture: "",
        ratings: "4.3",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Irish",
        category: "meats",
        ingredients: ["cereliac", "turnips", "carrots"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "jerk chicken",
        /*  foodPicture: { JERKCHICKEN }, */
        ratings: "4.1",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Jamaican",
        category: "meats",
        ingredients: ["onions", "garlic", "lime"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "japanese katsudon",
        /*   foodPicture: { KATSUDON }, */
        ratings: "4.3",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Japanese",
        category: "meats",
        ingredients: ["onions", "soy sauce", "sushi rices"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "kentucky fried chicken",
        /*  foodPicture: { KENTUCKYCHICKEN }, */
        ratings: "4.4",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "American",
        category: "meats",
        ingredients: ["paprica", "oregano", "basil"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "katsu chicken curry",
        /* foodPicture: { KATSUCHICKEN }, */
        ratings: "4.3",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Japanese",
        category: "meats",
        ingredients: ["garlic", "carrots", "curry powder"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "kun pao chicken",
        /*  foodPicture: { KUNPAO }, */
        ratings: "4.3",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Chinese",
        category: "meats",
        ingredients: ["peanuts", "garlic clove", "brown sugar"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "lamb biryani",
        /*    foodPicture: { LAMBBIRYANI }, */
        ratings: "4.3",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Indian",
        category: "meats",
        ingredients: ["mint", "cirianto", "cumin seeds"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "lamb rogan josh",
        /*   foodPicture: { LAMBROGAN }, */
        ratings: "4.3",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Indian",
        category: "meats",
        ingredients: ["onion", "paprika", "cinnamon stick"],
      },
    ],
    seaFoods: [
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "escovit fish",
        /*  foodPicture: { ESCOVIT }, */
        ratings: "4.2",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Jamaican",
        category: "seafoods",
        ingredients: ["garlic", "onions", "carrots"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "garides sanagaki",
        /*  foodPicture: { GARIDES }, */
        ratings: "3.9",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Greek",
        category: "seafoods",
        ingredients: ["chopped onions", "white whine", "chopped tomatoes"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "grilles portuguese sardines",
        /*  foodPicture: { SARDINES }, */
        ratings: "4.1",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Portuguese",
        category: "seafoods",
        ingredients: ["garlic", "lemon", "red chili"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "honey teriyaki salmon",
        /*    foodPicture: { TERIYAKI }, */
        ratings: "4.2",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Japanese",
        category: "seafoods",
        ingredients: ["soy sauce", "olive oil", "sesame feed"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "kedgeree",
        /*  foodPicture: { KEDGEREE }, */
        ratings: "4.3",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "British",
        category: "seafoods",
        ingredients: ["onions", "coriander", "cuury powder"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "laksa king",
        /*   foodPicture: { LAKSAKING }, */
        ratings: "4.3",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Malaysian",
        category: "seafoods",
        ingredients: ["lime", "coriander", "coconuts milk"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "landcashire hotpot",
        /* foodPicture: { LANCASHIRE }, */
        ratings: "3.8",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "British",
        category: "seafoods",
        ingredients: ["carrots", "baby leaves", "plain flour"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "fish pie",
        /*  foodPicture: { PIE }, */
        ratings: "3.8",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "British",
        category: "seafoods",
        ingredients: ["double cream", "dill", "lemon"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "fish stew",
        /* foodPicture: { STEW }, */
        ratings: "3.8",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "French",
        category: "seafoods",
        ingredients: ["onions", "orange", "prawns"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "fish fofos",
        /*  foodPicture: { FOFOS }, */
        ratings: "3.8",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Portuguese",
        category: "seafoods",
        ingredients: ["coriander", "cumin seeds", "flour"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "mediterranean pasta salad",
        /*   foodPicture: { MEDITERRANEAN }, */
        ratings: "3.8",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Italian",
        category: "seafoods",
        ingredients: ["green olive", "tuna", "pepper"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "nasi lemak",
        /* foodPicture: { NASI }, */
        ratings: "3.8",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Malaysian",
        category: "seafoods",
        ingredients: ["peanuts", "cumcumber", "shallots"],
      },
    ],
    vegetarians: [
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "egg drop soup",
        /* foodPicture: { EGGSOUP }, */
        ratings: "4.2",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Chinese",
        category: "vegetarians",
        ingredients: ["peas", "cornstarch", "spring onions"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "gigantes plaki",
        /*   foodPicture: { PLAKI }, */
        ratings: "4.1",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Greek",
        category: "vegetarians",
        ingredients: ["onions", "tomatoes", "dried oregano"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "kafteji",
        /*  foodPicture: { KAFTEJI }, */
        ratings: "4.3",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Tunisiam",
        category: "vegetarians",
        ingredients: ["onions", "pumpkin", "pepper"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "koshari",
        /* foodPicture: { SOURSOUP }, */
        ratings: "4.3",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Egyptian",
        category: "vegetarians",
        ingredients: ["brown lentils", "onion", "maccaroni"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "flamiche",
        /* foodPicture: { FLAMICHE }, */
        ratings: "3.8",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "French",
        category: "vegetarians",
        ingredients: ["plain flour", "lard", "butter"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "french onion soup",
        /* foodPicture: { ONIONSOUP }, */
        ratings: "3.8",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "French",
        category: "vegetarians",
        ingredients: ["onion", "plain flour", "sugar"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "fettucine alfredo",
        /*  foodPicture: { FETTUCINE }, */
        ratings: "3.8",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Italian",
        category: "vegetarians",
        ingredients: ["fettucine", "nutmeg", "corn flour"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "french lentil",
        /* foodPicture: { LENTIL }, */
        ratings: "3.8",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "French",
        category: "vegetarians",
        ingredients: ["onion", "garlic", "carrots"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "fennel dauphinoise",
        /*  foodPicture: { DAUPHINOISE }, */
        ratings: "3.8",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "French",
        category: "vegetarians",
        ingredients: ["butter", "milk", "garlic"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "full mesdames",
        /* foodPicture: { MESDAMES }, */
        ratings: "3.8",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Egyptian",
        category: "vegetarians",
        ingredients: ["lemon", "cumin", "garlic clove"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "japanese gohan rice",
        /* foodPicture: { GOHANRICE }, */
        ratings: "3.8",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Japanese",
        category: "vegetarians",
        ingredients: ["mirin", "pickle juice", "spring onion"],
      },
    ],
    desserts: [
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "dundee cake",
        /* foodPicture: { DUNDEE }, */
        ratings: "3.8",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "British",
        category: "desserts",
        ingredients: ["orange", "milk", "dried fruits"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "eton mess",
        /* foodPicture: { ETON }, */
        ratings: "4.0",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "British",
        category: "desserts",
        ingredients: ["strawberries", "double cream", "mint"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "eccles cake",
        /*     foodPicture: { ECCLESS }, */
        ratings: "4.0",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "British",
        category: "desserts",
        ingredients: ["butter", "lemon", "cinnamon"],
      },

      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "home made mandazi",
        /*  foodPicture: { MANDAZI }, */
        ratings: "4.2",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "Kenyan",
        category: "desserts",
        ingredients: ["milk", "sugar", "eggs"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "lasagne",
        /* foodPicture: { LASAGNE }, */
        ratings: "3.8",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "British",
        category: "desserts",
        ingredients: ["onion", "celery", "garlic"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "madeira cake",
        /* foodPicture: { MADEIRA }, */
        ratings: "3.8",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "British",
        category: "desserts",
        ingredients: ["milk", "lemon", "mixed peel"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "mince pies",
        /* foodPicture: { MINCE }, */
        ratings: "3.8",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "British",
        category: "desserts",
        ingredients: ["butter", "plain flour", "icing sugar"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "newyork cheesecake",
        /*  foodPicture: { CHEESECAKE }, */
        ratings: "3.8",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "American",
        category: "desserts",
        ingredients: ["lemon juice", "sugar", "sour cream"],
      },
      {
        id: Math.ceil(Math.random() * 1000000),
        foodName: "christmas pudding Flapjack",
        /*  foodPicture: { PUDDING }, */
        ratings: "3.8",
        miniDesc: "Lorem ipsum dolor sit.",
        longDesc:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque commodi, sequi laudantium nulla et laborum harum delectus earum autem quas!",
        origin: "British",
        category: "desserts",
        ingredients: ["orange", "golden syrup", "christams pudding"],
      },
    ],
  },
];

/*get all Meals*/

//GET
router.get("/", async (req, res) => {
  try {
    const meals = await Meal.find().populate("category");
    res.json({ success: true, data: meals });
  } catch (err) {
    res.status(500).json({ success: false, error: "Error: cannot find meals" });
    console.log(err);
  }
  // res.json({ success: "true", data: meals[0] });
});

//GET DESSERTS
router.get("/desserts", async (req, res) => {
  // res.json({ success: "true", data: meals[0].desserts });
  try {
    const desserts = await Meal.find({ category: idDessert }).populate(
      "category"
    );
    res.json({ success: true, data: desserts });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot find desserts" });
    console.log(err);
  }
});

router.get("/seafoods", async (req, res) => {
  // res.json({ success: "true", data: meals[0].seaFoods });
  try {
    const seafoods = await Meal.find({ category: idSeafoods }).populate(
      "category"
    );
    res.json({ success: true, data: seafoods });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot find desserts" });
    console.log(err);
  }
});

router.get("/meats", async (req, res) => {
  // res.json({ success: "true", data: meals[0].meats });
  try {
    const meats = await Meal.find({ category: idMeats }).populate("category");
    res.json({ success: true, data: meats });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot find desserts" });
    console.log(err);
  }
});

router.get("/vegetarians", async (req, res) => {
  // res.json({ success: "true", data: meals[0].vegetarians });
  try {
    const vegetarians = await Meal.find({ category: idVegetarians }).populate(
      "category"
    );
    res.json({ success: true, data: vegetarians });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot find desserts" });
    console.log(err);
  }
});

//POST
router.post(
  ("/",
  async (req, res) => {
    const newFood = new Meal({
      name: req.body.name,
      image: req.body.image,
      sm_desc: req.body.sm_desc,
      lg_desc: req.body.lg_desc,
      category: req.body.category, // id of one inside collection category
      rating: req.body.rating,
      price: req.body.price,
      origin: req.body.origin,
    });

    try {
      const category = Category.findById(newFood.category);
      if (!category) {
        throw new Error("error: category not find");
      } else {
        const saveMeal = await newFood.save();
        res.json({ success: true, data: saveMeal });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        error: "Error: something went wrong can;t creat meals",
      });

      console.log(err);
    }
  })
);

//PUT
router.put("/:id", async (req, res) => {
  try {
    const mealUpdate = await Meal.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          image: req.body.image,
          sm_desc: req.body.sm_desc,
          lg_desc: req.body.lg_desc,
          category: req.body.category, // id of one inside collection category
          rating: req.body.rating,
          price: req.body.price,
          origin: req.body.origin,
        },
      },
      { new: true }
    );
    const category = Category.findById(mealUpdate.category);
    if (!category) {
      throw new Error("Error: category didn't match");
    }
    res.json({ success: true, data: mealUpdate });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "something went wrong in update" });
    console.log(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Meal.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "something went wrong in delete" });
    console.log(err);
  }
});

module.exports = router;
