class Customer {
  constructor(name, phoneNumber, isVip = false) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.isVip = isVip;
  }
}

module.exports = Customer;
