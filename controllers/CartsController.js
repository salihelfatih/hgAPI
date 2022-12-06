const { Cart } = require("../models");
const { CartProduct } = require("../models");
const { Product } = require("../models");
const { Order } = require("../models");
const { Customer } = require("../models");
const { Payment } = require("../models");

module.exports = {
  // get all carts for a customer (customer id)
  async index(req, res) {
    try {
      const { customerId } = req.params;
      const customer = await Customer.findByPk(customerId);
      if (!customer) {
        return res.status(403).send({
          error: "The customer does not exist",
        });
      }
      const carts = await Cart.findAll({
        where: {
          customerId: customerId,
        },
        include: [
          {
            model: CartProduct,
            as: "cartProduct",
            include: [
              {
                model: Product,
                as: "product",
              },
            ],
          },
        ],
      });
      res.send(carts);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to fetch the carts",
      });
    }
  },

  // get all carts
  async findAllCarts(req, res) {
    try {
      const carts = await Cart.findAll({
        include: [
          {
            model: CartProduct,
            as: "cartProduct",
            include: [
              {
                model: Product,
                as: "product",
              },
            ],
          },
        ],
      });
      res.send(carts);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to fetch the carts",
      });
    }
  },

  // get a cart by id
  async show(req, res) {
    try {
      const { cartId } = req.params;
      const cart = await Cart.findByPk(cartId, {
        include: [
          {
            model: CartProduct,
            as: "cartProduct",
            include: [
              {
                model: Product,
                as: "product",
              },
            ],
          },
        ],
      });
      res.send(cart);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to fetch the cart",
      });
    }
  },

  async post(req, res) {
    try {
      const { customerId } = req.params;
      const { productId } = req.body;
      const customer = await Customer.findByPk(customerId);
      if (!customer) {
        return res.status(403).send({
          error: "The customer does not exist",
        });
      }
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(403).send({
          error: "The product does not exist",
        });
      }
      const cart = await Cart.findOne({
        where: {
          customerId: customerId,
        },
      });
      if (cart) {
        const cartProduct = await CartProduct.findOne({
          where: {
            cartId: cart.id,
            productId: productId,
          },
        });
        if (cartProduct) {
          cartProduct.quantity = cartProduct.quantity + 1;
          await cartProduct.save();
        } else {
          await CartProduct.create({
            cartId: cart.id,
            productId: productId,
            quantity: 1,
          });
        }
      } else {
        const newCart = await Cart.create({
          customerId: customerId,
          status: "active",
        });
        await CartProduct.create({
          cartId: newCart.id,
          productId: productId,
          quantity: 1,
        });
      }
      res.send({
        message: "Product added to cart",
      });
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to add the product to the cart",
      });
    }
  },

  async put(req, res) {
    try {
      const { cartId } = req.params;
      const { productId, quantity } = req.body;
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(403).send({
          error: "The product does not exist",
        });
      }
      const cart = await Cart.findByPk(cartId);
      if (!cart) {
        return res.status(403).send({
          error: "The cart does not exist",
        });
      }
      const cartProduct = await CartProduct.findOne({
        where: {
          cartId: cartId,
          productId: productId,
        },
      });
      if (!cartProduct) {
        return res.status(403).send({
          error: "The product does not exist in the cart",
        });
      }
      cartProduct.quantity = quantity;
      await cartProduct.save();
      res.send({
        message: "Product quantity updated",
      });
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to update the product quantity",
      });
    }
  },

  async delete(req, res) {
    try {
      const { cartId } = req.params;
      const cart = await Cart.findByPk(cartId);
      if (!cart) {
        return res.status(403).send({
          error: "The cart does not exist",
        });
      }
      await cart.destroy();
      res.send({
        message: "Cart deleted",
      });
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to delete the cart",
      });
    }
  },

  async deleteProduct(req, res) {
    try {
      const { cartId, productId } = req.params;
      const cart = await Cart.findByPk(cartId);
      if (!cart) {
        return res.status(403).send({
          error: "The cart does not exist",
        });
      }
      const cartProduct = await CartProduct.findOne({
        where: {
          cartId: cartId,
          productId: productId,
        },
      });
      if (!cartProduct) {
        return res.status(403).send({
          error: "The product does not exist in the cart",
        });
      }
      await cartProduct.destroy();
      res.send({
        message: "Product deleted from cart",
      });
    } catch (err) {
      res.status(500).send({
        error:
          "An error has occured trying to delete the product from the cart",
      });
    }
  },

  async updateProduct(req, res) {
    try {
      const { cartId, productId } = req.params;
      const { quantity } = req.body;
      const cart = await Cart.findByPk(cartId);
      if (!cart) {
        return res.status(403).send({
          error: "The cart does not exist",
        });
      }
      const cartProduct = await CartProduct.findOne({
        where: {
          cartId: cartId,
          productId: productId,
        },
      });
      if (!cartProduct) {
        return res.status(403).send({
          error: "The product does not exist in the cart",
        });
      }
      cartProduct.quantity = quantity;
      await cartProduct.save();
      res.send({
        message: "Product quantity updated",
      });
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to update the product quantity",
      });
    }
  },

  async checkout(req, res) {
    try {
      const { cartId } = req.params;
      const cart = await Cart.findByPk(cartId);
      if (!cart) {
        return res.status(403).send({
          error: "The cart does not exist",
        });
      }
      cart.status = "completed";
      await cart.save();
      res.send({
        message: "Cart checked out",
      });
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to checkout the cart",
      });
    }
  },
};
