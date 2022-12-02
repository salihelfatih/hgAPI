const { Review } = require("../models");

module.exports = {
  async index(req, res) {
    try {
      const reviews = await Review.findAll({
        limit: 10,
      });
      res.send(reviews);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to fetch the reviews",
      });
    }
  },

  async show(req, res) {
    try {
      const review = await Review.findByPk(req.params.reviewId);
      res.send(review);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to fetch the review",
      });
    }
  },

  async post(req, res) {
    try {
      const review = await Review.create(req.body);
      res.send(review);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to create the review.",
      });
    }
  },

  async put(req, res) {
    try {
      await Review.update(req.body, {
        where: {
          id: req.params.reviewId,
        },
      });
      res.send(req.body);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to update the review.",
      });
    }
  },

  async delete(req, res) {
    try {
      const review = await Review.findOne({
        where: {
          id: req.params.reviewId,
        },
      });
      await review.destroy();
      res.send(review);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to delete the review.",
      });
    }
  },

  async deleteAll(req, res) {
    try {
      await Review.destroy({
        where: {},
        truncate: false,
      });
      res.send("All reviews have been deleted");
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to delete all reviews.",
      });
    }
  },

  async search(req, res) {
    try {
      const review = await Review.findOne({
        where: {
          reviewName: req.params.reviewName,
        },
      });
      res.send(review);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to fetch the review.",
      });
    }
  },

  async filter(req, res) {
    try {
      const review = await Review.findAll({
        where: {
          reviewName: req.params.reviewName,
        },
      });
      res.send(review);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to fetch the review.",
      });
    }
  },
};
