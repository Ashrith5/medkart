'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("Admin@123", 10); // Default password

    return queryInterface.bulkInsert('Admins', [
      {
        name: "Super Admin",
        email: "admin@example.com",
        password: hashedPassword,
        mobile: "9999999999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Admins', { email: "admin@example.com" }, {});
  }
};

