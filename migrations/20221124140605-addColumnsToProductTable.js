"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Products", "calories", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("Products", "fat", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("Products", "carbs", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("Products", "protein", {
      type: Sequelize.INTEGER,
    });

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Products", "calories");
    await queryInterface.removeColumn("Products", "fat");
    await queryInterface.removeColumn("Products", "carbs");
    await queryInterface.removeColumn("Products", "protein");

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
