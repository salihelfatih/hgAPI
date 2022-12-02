const { Product } = require("../models");
// const { Vendor } = require("../models");

module.exports = {
  // get all products for a vendor (vendor id)
  async index(req, res) {
    try {
      let products = null;
      const search = req.query.search;
      const price = req.query.price;
      const calories = req.query.calories;
      const vendorId = req.params.vendorId;
      // if there is a search and it doesn't have All in it
      if (search && search !== "All") {
        products = await Product.findAll({
          where: {
            [Op.or]: ["name", "price", "calories"].map((key) => ({
              [key]: {
                [Op.iLike]: `%${search}%`,
              },
            })),
            vendorId: vendorId,
          },
        });
        if (price) {
          products = await Product.findAll({
            where: {
              [Op.or]: ["price"].map((key) => ({
                [key]: {
                  [Op.iLike]: `%${search}%`,
                },
              })),
              price: {
                [Op.iLike]: `%${price}%`,
              },
              vendorId: vendorId,
            },
          });
        }
        if (calories) {
          products = await Product.findAll({
            where: {
              [Op.or]: ["calories"].map((key) => ({
                [key]: {
                  [Op.iLike]: `%${search}%`,
                },
              })),
              calories: {
                [Op.iLike]: `%${calories}%`,
              },
              vendorId: vendorId,
            },
          });
        }
      } else {
        products = await Product.findAll({
          where: {
            vendorId: vendorId,
          },
        });
      }
      res.send(products);
    } catch (err) {
      res.status(500).send({
        error: "an error has occured trying to fetch the products",
      });
    }
  },

  // // get all products for a vendor (vendor id)
  // async index(req, res) {
  //   try {
  //     const products = await Product.findAll({
  //       where: {
  //         vendorId: req.params.vendorId,
  //       },
  //     });
  //     res.send(products);
  //   } catch (err) {
  //     res.status(500).send({
  //       error: "An error has occured trying to fetch the products.",
  //     });
  //   }
  // },

  async show(req, res) {
    try {
      const product = await Product.findOne({
        where: {
          id: req.params.productId,
        },
      });
      if (req.accepts("json")) {
        return res.send(product);
      } else {
        return res.render("product", { product: product });
      }
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to fetch the product.",
      });
    }
  },

  async findAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.send(products);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to fetch the products.",
      });
    }
  },

  // async showByVendor(req, res) {
  //   try {
  //     const product = await Product.findOne({
  //       where: {
  //         id: req.params.productId,
  //         vendorId: req.params.vendorId,
  //       },
  //     });
  //     res.send(product);
  //   } catch (err) {
  //     res.status(500).send({
  //       error: "An error has occured trying to fetch the product.",
  //     });
  //   }
  // },

  async post(req, res) {
    try {
      const product = await Product.create(req.body);
      res.send(product);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to create the product.",
      });
    }
  },

  async put(req, res) {
    try {
      await Product.update(req.body, {
        where: {
          id: req.params.productId,
        },
      });
      res.send(req.body);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to update the product.",
      });
    }
  },

  async delete(req, res) {
    try {
      const product = await Product.findOne({
        where: {
          id: req.params.productId,
        },
      });
      if (!product) {
        return res.status(403).send({
          error: "The product information was not found.",
        });
      }
      await product.destroy();
      res.send(product);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to delete the product.",
      });
    }
  },

  async deleteAll(req, res) {
    try {
      const products = await Product.findAll();
      if (!products) {
        return res.status(403).send({
          error: "The product information was not found.",
        });
      }
      await products.destroy();
      res.send(products);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to delete the products.",
      });
    }
  },

  async search(req, res) {
    try {
      const products = await Product.findAll({
        where: {
          name: {
            [Op.like]: "%" + req.query.name + "%",
          },
        },
      });
      res.send(products);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to search the products.",
      });
    }
  },

  async filterByPrice(req, res) {
    try {
      const products = await Product.findAll({
        where: {
          price: {
            [Op.gte]: req.query.price,
          },
        },
      });
      res.send(products);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to filter the products.",
      });
    }
  },

  async filterByCalories(req, res) {
    try {
      const products = await Product.findAll({
        where: {
          calories: {
            [Op.gte]: req.query.calories,
          },
        },
      });
      res.send(products);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to filter the products.",
      });
    }
  },

  async filterByVendor(req, res) {
    try {
      const products = await Product.findAll({
        where: {
          vendorId: req.query.vendorId,
        },
      });
      res.send(products);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to filter the products.",
      });
    }
  },

  async sort(req, res) {
    try {
      const products = await Product.findAll({
        order: [["name", "ASC"]],
      });
      res.send(products);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to sort the products.",
      });
    }
  },

  async paginate(req, res) {
    try {
      const products = await Product.findAll({
        limit: 10,
        offset: 10,
      });
      res.send(products);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to paginate the products.",
      });
    }
  },

  async aggregate(req, res) {
    try {
      const products = await Product.findAll({
        attributes: [
          "name",
          [sequelize.fn("COUNT", sequelize.col("name")), "count"],
        ],
        group: ["name"],
      });
      res.send(products);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to aggregate the products.",
      });
    }
  },

  async join(req, res) {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });
      res.send(products);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to join the products.",
      });
    }
  },

  async transaction(req, res) {
    try {
      const t = await sequelize.transaction();
      const product = await Product.create(
        {
          name: "test",
          price: 100,
        },
        { transaction: t }
      );
      await t.commit();
      res.send(product);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to create the product.",
      });
    }
  },

  async bulkCreate(req, res) {
    try {
      const products = await Product.bulkCreate([
        {
          name: "test1",
          price: 100,
        },
        {
          name: "test2",
          price: 200,
        },
      ]);
      res.send(products);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to create the products.",
      });
    }
  },

  async bulkUpdate(req, res) {
    try {
      const products = await Product.bulkCreate(
        [
          {
            name: "test1",
            price: 100,
          },
          {
            name: "test2",
            price: 200,
          },
        ],
        {
          updateOnDuplicate: ["name", "price"],
        }
      );
      res.send(products);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to update the products.",
      });
    }
  },

  async bulkDelete(req, res) {
    try {
      const products = await Product.bulkCreate(
        [
          {
            name: "test1",
            price: 100,
          },
          {
            name: "test2",
            price: 200,
          },
        ],
        {
          updateOnDuplicate: ["name", "price"],
        }
      );
      await products.destroy();
      res.send(products);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to delete the products.",
      });
    }
  },

  async upsert(req, res) {
    try {
      const product = await Product.upsert({
        name: "test",
        price: 100,
      });
      res.send(product);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to upsert the product.",
      });
    }
  },

  async bulkUpsert(req, res) {
    try {
      const products = await Product.bulkCreate(
        [
          {
            name: "test1",
            price: 100,
          },
          {
            name: "test2",
            price: 200,
          },
        ],
        {
          updateOnDuplicate: ["name", "price"],
        }
      );
      res.send(products);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to upsert the products.",
      });
    }
  },

  async bulkCreateOrUpdate(req, res) {
    try {
      const products = await Product.bulkCreate(
        [
          {
            name: "test1",
            price: 100,
          },
          {
            name: "test2",
            price: 200,
          },
        ],
        {
          updateOnDuplicate: ["name", "price"],
        }
      );
      res.send(products);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to create or update the products.",
      });
    }
  },

  async bulkCreateOrUpdateWithWhere(req, res) {
    try {
      const products = await Product.bulkCreate(
        [
          {
            name: "test1",
            price: 100,
          },
          {
            name: "test2",
            price: 200,
          },
        ],
        {
          updateOnDuplicate: ["name", "price"],
        }
      );
      res.send(products);
    } catch (err) {
      res.status(500).send({
        error:
          "An error has occured trying to create or update the products with where.",
      });
    }
  },

  async bulkCreateOrUpdateWithWhereAndReturning(req, res) {
    try {
      const products = await Product.bulkCreate(
        [
          {
            name: "test1",
            price: 100,
          },
          {
            name: "test2",
            price: 200,
          },
        ],
        {
          updateOnDuplicate: ["name", "price"],
        }
      );
      res.send(products);
    } catch (err) {
      res.status(500).send({
        error:
          "An error has occured trying to create or update the products with where and returning.",
      });
    }
  },
};
