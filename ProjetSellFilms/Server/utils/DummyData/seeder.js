const fs = require('fs');
require('colors');
const dotenv = require('dotenv');
const Film = require('../../models/filmModel');
const User = require('../../models/userModel');
const Admin = require('../../models/adminModel');
const dbConnection = require('../../config/database');
const cartShopModel = require('../../models/cartShopModel');

dotenv.config({ path: '../../config.env' });

// connect to DB
dbConnection();

// Read data
const films = JSON.parse(fs.readFileSync("./films.json"));


// Insert data film
const insertData = async () => {
  try {
    await Film.create(films);

    console.log('Data Inserted'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete film
const destroyData = async () => {
  try {
    await Film.deleteMany();
    console.log('Data Destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete user
const destroyUserData = async () => {
  try {
    await User.deleteMany();
    console.log('Data Destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
// Delete admin
const destroyAdminData = async () => {
  try {
    await Admin.deleteMany();
    console.log('Data Destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
// Delete cartSHop
const destroycartShop = async () => {
  try {
    await cartShopModel.deleteMany();
    console.log('Data Destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// node seeder.js -i
if (process.argv[2] === '-i') {
  insertData();
  // node seeder.js -d
} else if (process.argv[2] === '-d') {
  destroyData();
} else if (process.argv[2] === '-deleteUsers') {
  destroyUserData();
} else if (process.argv[2] === '-deleteAdmins') {
  destroyAdminData();
} else if (process.argv[2] === '-c') {
  destroycartShop();
}