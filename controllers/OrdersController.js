const Order = require("../models");

module.exports = {
  async index(req, res) {
    try {
      const orders = await Order.findAll({
        limit: 10,
      });
      res.send(orders);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to fetch the orders.",
      });
    }
  },

  async show(req, res) {
    try {
      const order = await Order.findByPk(req.params.orderId);
      res.send(order);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to show the order.",
      });
    }
  },

  async post(req, res) {
    try {
      const order = await Order.create(req.body);
      res.send(order);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to create the order.",
      });
    }
  },

  async put(req, res) {
    try {
      await Order.update(req.body, {
        where: {
          id: req.params.orderId,
        },
      });
      res.send(req.body);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to update the order.",
      });
    }
  },

  async delete(req, res) {
    try {
      const order = await Order.findByPk(req.params.orderId);
      if (!order) {
        return res.status(403).send({
          error: "You do not have access to this order.",
        });
      }
      await order.destroy();
      res.send(order);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to delete the order.",
      });
    }
  },

  async deleteAll(req, res) {
    try {
      const orders = await Order.findAll();
      if (!orders) {
        return res.status(403).send({
          error: "You do not have access to these orders.",
        });
      }
      await orders.destroy();
      res.send(orders);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to delete the orders.",
      });
    }
  },

  async search(req, res) {
    try {
      const orders = await Order.findAll({
        where: {
          name: {
            [Op.like]: "%" + req.query.name + "%",
          },
        },
      });
      res.send(orders);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to search the orders.",
      });
    }
  },

  async filter(req, res) {
    try {
      const orders = await Order.findAll({
        where: {
          price: {
            [Op.gt]: req.query.price,
          },
        },
      });
      res.send(orders);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to filter the orders.",
      });
    }
  },
};
