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

  // when a customer adds a product to their cart add a cartProduct
  // if they have a cart or create a cart and add a cart with the product
  // if they don't have a cart
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
        // create a new cart for the customer and add the product to the cart
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
};
