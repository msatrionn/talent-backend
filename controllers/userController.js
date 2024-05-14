const User = require('../models/User');
const fs = require('fs-extra');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data','users.json');

exports.createUser = async (req, res) => {
  try {
    const { fullName, email, phone, address, postalCode, status } = req.body;

    const newUser = new User(fullName, email, phone, address, postalCode, status);
    const errors = newUser.validate();

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // Read existing data from the JSON file
    let users = [];
    try {
      const data = await fs.readFile(dataFilePath, 'utf-8');
      users = JSON.parse(data);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    // Check if email already exists
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
      return res.status(400).json({ errors: { email: 'Email already exists' } });
    }

    // Add new user to the users array
    users.push(newUser);

    // Save updated users array to the JSON file
    await fs.writeFile(dataFilePath, JSON.stringify(users, null, 2));

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.showUser = async (req, res) => {
  try {
    // Read the data from the JSON file
    const data = await fs.readFile(dataFilePath, 'utf-8');
    const users = JSON.parse(data);

    res.status(200).json(users);
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.status(404).json({ message: 'No users found' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
