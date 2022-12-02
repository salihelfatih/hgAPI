const { Vendor } = require("../models");
const { Product } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      let vendors = null;
      const search = req.query.search;
      const category = req.query.category;
      const address = req.query.address;
      // if there is a search and it doesn't have All in it
      if (search && search !== "All") {
        vendors = await Vendor.findAll({
          where: {
            [Op.or]: ["address", "kitchenName", "kitchenCategory"].map(
              (key) => ({
                [key]: {
                  [Op.iLike]: `%${search}%`,
                },
              })
            ),
          },
        });
        if (category) {
          vendors = await Vendor.findAll({
            where: {
              [Op.or]: ["kitchenCategory"].map((key) => ({
                [key]: {
                  [Op.iLike]: `%${search}%`,
                },
              })),
              kitchenCategory: {
                [Op.iLike]: `%${category}%`,
              },
            },
          });
        }
        if (address) {
          vendors = await Vendor.findAll({
            where: {
              [Op.or]: ["address"].map((key) => ({
                [key]: {
                  [Op.iLike]: `%${search}%`,
                },
              })),
              address: {
                [Op.iLike]: `%${address}%`,
              },
            },
          });
        }
      } else {
        vendors = await Vendor.findAll({
          include: [
            {
              model: Product,
              as: "products",
            },
          ],
        });
      }
      res.send(vendors);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to fetch the vendors",
      });
    }
  },

  async show(req, res) {
    try {
      const vendor = await Vendor.findByPk(req.params.vendorId, {
        include: [
          {
            model: Product,
            as: "products",
            attributes: ["id", "name", "price", "description", "image"],
          },
        ],
      });
      res.send(vendor);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to fetch the vendor",
      });
    }
  },

  async post(req, res) {
    try {
      const vendor = await Vendor.create(req.body);
      res.send(vendor);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to create the vendor.",
      });
    }
  },

  async put(req, res) {
    try {
      await Vendor.update(req.body, {
        where: {
          id: req.params.vendorId,
        },
      });
      res.send(req.body);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to update the vendor.",
      });
    }
  },

  async delete(req, res) {
    try {
      const vendor = await Vendor.findByPk(req.params.vendorId);
      if (!vendor) {
        return res.status(403).send({
          error: "You do not have access to this vendor.",
        });
      }
      await vendor.destroy();
      res.send(vendor);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to delete the vendor.",
      });
    }
  },

  async deleteAll(req, res) {
    try {
      await Vendor.destroy({
        where: {},
        truncate: false,
      });
      res.send("All vendors deleted.");
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to delete all vendors.",
      });
    }
  },

  async filterByCategory(req, res) {
    try {
      const vendors = await Vendor.findAll({
        where: {
          category: req.params.kitchenCategory,
        },
      });
      res.send(vendors);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to filter for the vendor.",
      });
    }
  },

  async filterByAddress(req, res) {
    try {
      const vendors = await Vendor.findAll({
        where: {
          location: req.params.address,
        },
      });
      res.send(vendors);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to filter for the vendor.",
      });
    }
  },

  async sort(req, res) {
    try {
      const vendors = await Vendor.findAll({
        order: [["name", "ASC"]],
      });
      res.send(vendors);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to sort for the vendor.",
      });
    }
  },

  async paginate(req, res) {
    try {
      const vendors = await Vendor.findAll({
        limit: 10,
        offset: 10,
      });
      res.send(vendors);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to paginate for the vendor.",
      });
    }
  },

  async getOrders(req, res) {
    try {
      const vendor = await Vendor.findByPk(req.params.vendorId);
      if (!vendor) {
        return res.status(403).send({
          error: "You do not have access to this vendor.",
        });
      }
      await vendor.getOrders();
      res.send(vendor);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to get the orders for this vendor.",
      });
    }
  },

  async addFave(req, res) {
    try {
      const vendor = await Vendor.findByPk(req.params.vendorId);
      if (!vendor) {
        return res.status(403).send({
          error: "You do not have access to this vendor.",
        });
      }
      await vendor.addFave(req.body.faveId);
      res.send(vendor);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to add a fave to this vendor.",
      });
    }
  },

  async getFaves(req, res) {
    try {
      const vendor = await Vendor.findByPk(req.params.vendorId);
      if (!vendor) {
        return res.status(403).send({
          error: "You do not have access to this vendor.",
        });
      }
      await vendor.getFaves();
      res.send(vendor);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to get the faves for this vendor.",
      });
    }
  },

  async removeFave(req, res) {
    try {
      const vendor = await Vendor.findByPk(req.params.vendorId);
      if (!vendor) {
        return res.status(403).send({
          error: "You do not have access to this vendor.",
        });
      }
      await vendor.removeFave(req.body.faveId);
      res.send(vendor);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to remove a fave from this vendor.",
      });
    }
  },

  async addProduct(req, res) {
    try {
      const vendor = await Vendor.findByPk(req.params.vendorId);
      if (!vendor) {
        return res.status(403).send({
          error: "You do not have access to this vendor.",
        });
      }
      await vendor.addProduct(req.body.productId);
      res.send(vendor);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to add a product to this vendor.",
      });
    }
  },

  async getProducts(req, res) {
    try {
      const vendor = await Vendor.findByPk(req.params.vendorId);
      if (!vendor) {
        return res.status(403).send({
          error: "You do not have access to this vendor.",
        });
      }
      await vendor.getProducts();
      res.send(vendor);
    } catch (err) {
      res.status(500).send({
        error:
          "An error has occured trying to get the products for this vendor.",
      });
    }
  },

  async removeProduct(req, res) {
    try {
      const vendor = await Vendor.findByPk(req.params.vendorId);
      if (!vendor) {
        return res.status(403).send({
          error: "You do not have access to this vendor.",
        });
      }
      await vendor.removeProduct(req.body.productId);
      res.send(vendor);
    } catch (err) {
      res.status(500).send({
        error:
          "An error has occured trying to remove a product from this vendor.",
      });
    }
  },

  async addReview(req, res) {
    try {
      const vendor = await Vendor.findByPk(req.params.vendorId);
      if (!vendor) {
        return res.status(403).send({
          error: "You do not have access to this vendor.",
        });
      }
      await vendor.addReview(req.body.reviewId);
      res.send(vendor);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to add a review to this vendor.",
      });
    }
  },

  async getReviews(req, res) {
    try {
      const vendor = await Vendor.findByPk(req.params.vendorId);
      if (!vendor) {
        return res.status(403).send({
          error: "You do not have access to this vendor.",
        });
      }
      await vendor.getReviews();
      res.send(vendor);
    } catch (err) {
      res.status(500).send({
        error:
          "An error has occured trying to get the reviews for this vendor.",
      });
    }
  },

  async removeReview(req, res) {
    try {
      const vendor = await Vendor.findByPk(req.params.vendorId);
      if (!vendor) {
        return res.status(403).send({
          error: "You do not have access to this vendor.",
        });
      }
      await vendor.removeReview(req.body.reviewId);
      res.send(vendor);
    } catch (err) {
      res.status(500).send({
        error:
          "An error has occured trying to remove a review from this vendor.",
      });
    }
  },
};
