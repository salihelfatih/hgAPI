const Joi = require("joi");

module.exports = {
  registerCustomer(req, res, next) {
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.string().regex(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        )
      ),
      username: Joi.alternatives().when(Joi.string().email(), {
        then: Joi.forbidden().error(new Error("must not be an email")),
        otherwise: Joi.string().required(),
      }),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phoneNumber: Joi.string()
        .regex(/^[0-9]{10}$/)
        .required(),
      address: Joi.string().required(),
      zipCode: Joi.string().required(),
      profilePic: Joi.string().uri().required(),
    };

    const { error, value } = Joi.validate(req.body, schema);
    if (error) {
      switch (error.details[0].context.key) {
        case "email":
          res.status(400).send({
            error: "You must provide a valid email address.",
          });
          break;
        case "password":
          res.status(400).send({
            error: `Please provide a valid password (Password must be 8 characters including one uppercase letter, one lowercase letter, one number and one special character).`,
          });
        case "username":
          res.status(400).send({
            error: `Please provide a valid username.`,
          });
        case "firstName":
          res.status(400).send({
            error: `Please provide a valid first name.`,
          });
        case "lastName":
          res.status(400).send({
            error: `Please provide a valid last name.`,
          });
        case "phoneNumber":
          res.status(400).send({
            error: `Please provide a valid phone number.`,
          });
        case "address":
          res.status(400).send({
            error: `Please provide a valid address.`,
          });
        case "zipCode":
          res.status(400).send({
            error: `Please provide a valid zip code.`,
          });
        case "profilePicture":
          res.status(400).send({
            error: `Please provide a valid profile picture URL.`,
          });
          break;
        default:
          res.status(400).send({
            error: "Invalid registration information",
          });
      }
    } else {
      next();
    }
  },
  registerVendor(req, res, next) {
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.string().regex(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        )
      ),
      username: Joi.alternatives().when(Joi.string().email(), {
        then: Joi.forbidden().error(new Error("must not be an email")),
        otherwise: Joi.string().required(),
      }),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phoneNumber: Joi.string()
        .regex(/^[0-9]{10}$/)
        .required(),
      address: Joi.string().required(),
      zipCode: Joi.string().required(),
      profilePic: Joi.string().uri().required(),
      kitchenName: Joi.string().required(),
      kitchenCategory: Joi.string().required(),
      kitchenDescription: Joi.string().required(),
    };

    const { error, value } = Joi.validate(req.body, schema);
    if (error) {
      switch (error.details[0].context.key) {
        case "email":
          res.status(400).send({
            error: "You must provide a valid email address.",
          });
          break;
        case "password":
          res.status(400).send({
            error: `Please provide a valid password (Password must be 8 characters including one uppercase letter, one lowercase letter, one number and one special character).`,
          });
        case "username":
          res.status(400).send({
            error: `Please provide a valid username.`,
          });
        case "firstName":
          res.status(400).send({
            error: `Please provide a valid first name.`,
          });
        case "lastName":
          res.status(400).send({
            error: `Please provide a valid last name.`,
          });
        case "phoneNumber":
          res.status(400).send({
            error: `Please provide a valid phone number.`,
          });
        case "address":
          res.status(400).send({
            error: `Please provide a valid address.`,
          });
        case "zipCode":
          res.status(400).send({
            error: `Please provide a valid zip code.`,
          });
        case "profilePicture":
          res.status(400).send({
            error: `Please provide a valid profile Please valid profile picture URL.`,
          });
        case "kitchenName":
          res.status(400).send({
            error: `Please provide a valid kitchen name.`,
          });
        case "kitchenCategory":
          res.status(400).send({
            error: `Please provide a valid kitchen category.`,
          });
        case "kitchenDescription":
          res.status(400).send({
            error: `Please provide a valid kitchen description.`,
          });
          break;
        default:
          res.status(400).send({
            error: "Invalid registration information",
          });
      }
    } else {
      next();
    }
  },
};
