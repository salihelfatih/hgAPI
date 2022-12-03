const AuthControllerPolicy = require("./policies/AuthControllerPolicy");
const AuthController = require("./controllers/AuthController");
const ProductsController = require("./controllers/ProductsController");
const CartsController = require("./controllers/CartsController");
const OrdersController = require("./controllers/OrdersController");
const VendorsController = require("./controllers/VendorsController");
const CustomersController = require("./controllers/CustomersController");
const ReportsController = require("./controllers/ReportsController");

module.exports = (app) => {
  app.post("/customers/login", AuthController.loginCustomer);
  app.post("/vendors/login", AuthController.loginVendor);
  app.post("/logout", AuthController.logout);
  app.post(
    "/customers",
    AuthControllerPolicy.registerCustomer,
    AuthController.registerCustomer
  );
  app.post(
    "/vendors",
    AuthControllerPolicy.registerVendor,
    AuthController.registerVendor
  );
  app.get("/customers", CustomersController.index);
  app.get("/customers/:customerId", CustomersController.show);
  app.put("/customers/:customerId", CustomersController.put);
  app.delete("/customers/:customerId", CustomersController.delete);
  app.delete("/customers", CustomersController.deleteAll);

  app.get("/vendors", VendorsController.index);
  app.get("/vendors/:vendorId", VendorsController.show);
  app.put("/vendors/:vendorId", VendorsController.put);
  app.delete("/vendors/:vendorId", VendorsController.delete);
  app.delete("/vendors", VendorsController.deleteAll);

  // products routes
  app.get("/vendors/:vendorId/products", ProductsController.index);
  // app.get("/products", ProductsController.findAllProducts);
  app.get("/products/:productId", ProductsController.show);
  app.post("/products", ProductsController.post);
  app.put("/products/:productId", ProductsController.put);
  app.delete("/products/:productId", ProductsController.delete);
  app.delete("/products", ProductsController.deleteAll);

  // routes for finding cart products
  app.get("/customers/:customerId/carts", CartsController.index);
  app.get("/customers/:customerId/carts/:cartId", CartsController.show);
  app.post("/customers/:customerId/carts", CartsController.post);
  // app.put("/carts/:cartId", CartsController.put);
  // app.delete("/carts/:cartId", CartsController.delete);
  // app.delete("/carts", CartsController.deleteAll);

  app.get("/orders", OrdersController.index);
  app.get("/orders/:orderId", OrdersController.show);
  app.post("/orders", OrdersController.post);
  app.put("/orders/:orderId", OrdersController.put);
  app.delete("/orders/:orderId", OrdersController.delete);
  app.delete("/orders", OrdersController.deleteAll);

  // reports routes
  app.get("/reports", ReportsController.index);
  app.get("/reports/:reportId", ReportsController.show);
  app.post("/reports", ReportsController.post);
  app.put("/reports/:reportId", ReportsController.put);
  app.delete("/reports/:reportId", ReportsController.delete);
  app.delete("/reports", ReportsController.deleteAll);
};
