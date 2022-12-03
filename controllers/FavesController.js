const Fave = require("../models");

module.exports = {
  async index(req, res) {
    try {
      const faves = await Fave.findAll({
        limit: 10,
      });
      res.send(faves);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to fetch the faves.",
      });
    }
  },

  async show(req, res) {
    try {
      const fave = await Fave.findByPk(req.params.faveId);
      res.send(fave);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to show the fave.",
      });
    }
  },

  async post(req, res) {
    try {
      const fave = await Fave.create(req.body);
      res.send(fave);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to create the fave.",
      });
    }
  },

  async put(req, res) {
    try {
      await Fave.update(req.body, {
        where: {
          id: req.params.faveId,
        },
      });
      res.send(req.body);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to update the fave.",
      });
    }
  },

  async delete(req, res) {
    try {
      const fave = await Fave.findByPk(req.params.faveId);
      if (!fave) {
        return res.status(403).send({
          error: "You do not have access to this fave.",
        });
      }
      await fave.destroy();
      res.send(fave);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to delete the fave.",
      });
    }
  },

  async showCustomerFaves(req, res) {
    try {
      const faves = await Fave.findAll({
        where: {
          customerId: req.params.customerId,
        },
      });
      res.send(faves);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to show the customer's faves.",
      });
    }
  },
};
