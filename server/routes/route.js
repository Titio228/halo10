const express = require("express");
const router = express.Router();
const crud = require("../db/Crud");

/**================================================================
 * GET all users
 ================================================================*/
router.get("/users", async (req, res) => {
  try {
    console.log("Route GET user request all");
    let nameTab = await crud.displayAllDead();
    res.json(nameTab);
  } catch (e) {
    res.json(e.message);
  }
});

/**================================================================
 * GET user by name
 ================================================================*/
router.get("/users/:lastname", async (req, res) => {
  try {
    console.log("Route GET user request by Name");
    let lastName = req.params.lastname;
    let lastNameTab = await crud.displayDeadByName(lastName);
    res.json(lastNameTab);
  } catch (e) {
    res.json(e);
  }
});

/**================================================================
 * GET all subscriptions
 ================================================================*/
router.get("/subscriptions/", async (req, res) => {
  try {
    console.log("Route GET subscription request all");
    let subscriptionTab = await crud.displayAllSubscription();
    res.json(subscriptionTab);
  } catch (e) {
    res.json(e.message);
  }
});

/**================================================================
 * POST create subscriptions
 ================================================================*/
router.post("/create_subscriptions", async (req, res) => {
  try {
    console.log("Route POST create subscription request");
    const { price, sold, inputList } = req.body;

    await crud.insertPriceSubscription(price, sold);
    const lastIDRows = await crud.bringLastId();
    await crud.insertAvantageSubscription(inputList, lastIDRows[0].id);

    res.json("Create subscription success");
  } catch (e) {
    res.json(e.message);
  }
});

/**================================================================
 * POST delete subscriptions
 ================================================================*/
router.post("/delete_subscriptions", async (req, res) => {
  try {
    console.log("Route POST delete subscription request");
    const { price } = req.body;
    const idSubscriptionDeleted = await crud.displaySubscriptionById(price);
    console.log(idSubscriptionDeleted);

    idSubscriptionDeleted.forEach((e) => {
      console.log(e.id);
      crud.deleteBenefit(e.id);
      crud.deleteSubscription(e.id);
    });

    res.json("Delete subscription success");
  } catch (e) {
    res.json(e.message);
  }
});

/**================================================================
 * POST => insert user
 ================================================================*/
router.post("/inscription", async (req, res) => {
  try {
    console.log("Route POST request");
    const {
      firstName,
      lastName,
      birthday,
      email,
      phone,
      sex,
      password,
      confirmPassword,
    } = req.body;
    await crud.insert(
      firstName,
      lastName,
      birthday,
      email,
      phone,
      sex,
      password,
      confirmPassword
    );
    res.json("success");
  } catch (err) {
    res.json(err);
  }
});

router.post("/connection", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("route" + email, password);
    if (await crud.checkLogin(email, password)) {
      res.json("success");
    } else {
      throw new Error("Email ou password not valid");
    }
  } catch (err) {
    res.json(err);
  }
});

/**================================================================
 * PUT => update user by name
 ================================================================*/
router.put("/:name/:email/:password/:namechange", async (req, res) => {
  try {
    console.log("Route PUT request");
    const { name, email, password, nameChange } = req.body;
    await crud.update(name, email, password, nameChange);
    res.json(`Update ${name} success`);
  } catch (err) {
    res.json(err);
  }
});

/**================================================================
 * DELETE => delete user by name
 ================================================================*/
router.delete("/:name", async (req, res) => {
  try {
    console.log("Route DELETE request");
    const { name } = req.body;
    await crud.deleteByName(name);
    res.json(`Delete ${name} success`);
  } catch (err) {
    res.json(err);
  }
});

/**================================================================
 * DELETE => delete all users
 ================================================================*/
router.delete("/", async (req, res) => {
  try {
    console.log("Route DELETE request");
    await crud.deleteAll();
    res.json("Delete All success");
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
