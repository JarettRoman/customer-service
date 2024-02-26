class ServiceScheduler {
  constructor() {
    this.customerQueue = [];
    this.vipQueue = [];
    this.appointments = new Map();
    this.customerProcessed = 0;
    this.vipProcessed = 0;
    this.serviceNumber = 0;
  }

  checkIn(customer) {
    if (this.hasAppointment(customer)) {
      return null;
    }
    const appointment = { customer, serviceNumber: ++this.serviceNumber };
    this.appointments.set(customer.phoneNumber, appointment);
    if (customer.isVip) {
      this.vipQueue.push(customer.phoneNumber);
    } else {
      this.customerQueue.push(customer.phoneNumber);
    }
    return this.serviceNumber;
  }

  hasAppointment(customer) {
    return this.appointments.has(customer.phoneNumber);
  }

  getNextCustomer() {
    const rate = this.vipProcessed / Math.max(1, this.customerProcessed);

    let nextCustomer = null;

    if (rate < 2 && this.vipQueue.length > 0) {
      this.vipProcessed++;
      nextCustomer = this.appointments.get(this.vipQueue.shift()).customer;
    } else if (this.customerQueue.length > 0) {
      this.customerProcessed++;
      nextCustomer = this.appointments.get(this.customerQueue.shift()).customer;
    } else if (this.vipQueue.length > 0 && this.customerQueue.length === 0) {
      this.vipProcessed++;
      nextCustomer = this.appointments.get(this.vipQueue.shift()).customer;
    }
    if (nextCustomer) {
      this.appointments.delete(nextCustomer.phoneNumber);
    }
    return nextCustomer;
  }
}

module.exports = ServiceScheduler;
