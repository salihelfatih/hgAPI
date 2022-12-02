const { Customer } = require("../models");

module.exports = {
  async index(req, res) {
    try {
      const customers = await Customer.findAll({
        limit: 10,
      });
      res.send(customers);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to fetch the customers.",
      });
    }
  },

  async show(req, res) {
    try {
      const customer = await Customer.findByPk(req.params.customerId);
      res.send(customer);
      // console.log(customer)
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to show the customer.",
      });
    }
  },

  async put(req, res) {
    try {
      await Customer.update(req.body, {
        where: {
          id: req.params.customerId,
        },
      });
      res.send(req.body);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to update the customer.",
      });
    }
  },

  async delete(req, res) {
    try {
      const customer = await Customer.findByPk(req.params.customerId);
      if (!customer) {
        return res.status(403).send({
          error: "You do not have access to this customer.",
        });
      }
      await customer.destroy();
      res.send(customer);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to delete the customer.",
      });
    }
  },

  async deleteAll(req, res) {
    try {
      await Customer.destroy({
        where: {},
        truncate: false,
      });
      res.send("All customers deleted.");
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to delete all customers.",
      });
    }
  },
};
