// models/User.js
const validator = require('validator');

class User {
  constructor(fullName, email, phone, address, postalCode, status) {
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.postalCode = postalCode;
    this.status = status;
  }

  validate() {
    const errors = {};

    if (!this.fullName || !validator.isAlpha(this.fullName.replace(/\s/g, ''))) {
      errors.fullName = 'Full Name is required and should contain only letters';
    }

    if (!this.email || !validator.isEmail(this.email)) {
      errors.email = 'Invalid email';
    }

    if (!this.phone || !validator.isNumeric(this.phone)) {
      errors.phone = 'Invalid phone number';
    }

    if (!this.address) {
      errors.address = 'Address is required';
    }

    if (!this.postalCode || !validator.isNumeric(this.postalCode)) {
      errors.postalCode = 'Invalid postal code';
    }
    
    if (this.postalCode && this.postalCode.length !== 5) {
      errors.postalCode = 'Postal code must be exactly 5 digits';
    }

    if (!this.status) {
      errors.status = 'User status is required';
    }

    return errors;
  }
}

module.exports = User;
