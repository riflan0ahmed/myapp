const express = require("express");
const router = express.Router();
const { Customer, validate } = require("../models/customer");

// Get All Customers
router.get("/", async (req, res) => {
  const customers = await Customer.find();

  if (!customers) return res.status(404).send("The Customers are not found");

  res.send(customers);
});

// Get A Customer By Id
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById();

  if (!customer) return res.status(404).send("The Customer Id is not found");

  res.send(customer);
});

// Create A Customer
router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
  });
  await customer.save();

  res.send(customer);
});

// Update A Customer
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.detail[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phoneNumber: req.body.phoneNumber,
    },
    { new: true }
  );

  res.send(customer);
});

// Delete A Customer
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send("The Customer Id is not Found");

  res.send(customer);
});

module.exports = router;
