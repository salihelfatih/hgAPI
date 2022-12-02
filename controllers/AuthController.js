const { Customer } = require("../models");
const { Vendor } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
}

module.exports = {
  async loginCustomer(req, res) {
    try {
      const { email, password } = req.body;
      const customer = await Customer.findOne({
        where: {
          email,
        },
      });
      if (!customer) {
        return res.status(403).send({
          error: "The login information was incorrect",
        });
      }
      const isPasswordValid = await customer.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(403).send({
          error: "The login information was incorrect",
        });
      }

      const customerJson = customer.toJSON();
      res.send({
        customer: customerJson,
        token: jwtSignUser(customerJson),
      });
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to log in",
      });
    }
  },

  async loginVendor(req, res) {
    try {
      const vendor = await Vendor.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!vendor) {
        return res.status(403).send({
          error: "The login information was incorrect",
        });
      }
      const isPasswordValid = await vendor.comparePassword(req.body.password);
      if (!isPasswordValid) {
        return res.status(403).send({
          error: "The login information was incorrect",
        });
      }
      const vendorJson = vendor.toJSON();
      res.send({
        vendor: vendorJson,
        token: jwtSignUser(vendorJson),
      });
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to log in.",
      });
    }
  },

  async registerCustomer(req, res) {
    try {
      // check if email is used
      const customer = await Customer.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (customer) {
        return res.status(400).send({
          error: "This email account is already in use.",
        });
      }
      const newCustomer = await Customer.create(req.body);
      const customerJson = newCustomer.toJSON();
      res.send({
        customer: customerJson,
        token: jwtSignUser(customerJson),
      });
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to create the customer.",
      });
    }
  },

  async registerVendor(req, res) {
    try {
      // check if email is used
      const vendor = await Vendor.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (vendor) {
        return res.status(400).send({
          error: "This email account is already in use.",
        });
      }
      const newVendor = await Vendor.create(req.body);
      const vendorJson = newVendor.toJSON();
      res.send({
        vendor: vendorJson,
        token: jwtSignUser(vendorJson),
      });
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to create the vendor.",
      });
    }
  },

  async logout(req, res) {
    try {
      res.send({
        message: "Successfully logged out.",
      });
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to log out.",
      });
    }
  },
};
