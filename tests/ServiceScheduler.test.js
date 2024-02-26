const ServiceScheduler = require("../ServiceScheduler.js");
const Customer = require("../Customer.js");

test("customer double checkin results in error", () => {
  const scheduler = new ServiceScheduler();

  const myCustomer = new Customer("Test Customer", 7373337777, true);

  scheduler.checkIn(myCustomer);
  expect(scheduler.checkIn(myCustomer)).toBe(null);
});

test("getNextCustomer() returns null when no appointment has been made", () => {
  const scheduler = new ServiceScheduler();
  expect(scheduler.getNextCustomer()).toBe(null);
});

test("customer has an appointment", () => {
  const scheduler = new ServiceScheduler();
  const myCustomer = new Customer("Test Customer", 1234567890, true);
  expect(scheduler.hasAppointment(myCustomer)).toBe(false);
  scheduler.checkIn(myCustomer);
  expect(scheduler.hasAppointment(myCustomer)).toBe(true);
});

test("processing rate retained when more VIP customers have appointments than regular customers", () => {
  const scheduler = new ServiceScheduler();
  const firstCustomer = new Customer("First Customer", 1111111111, true);
  const secondCustomer = new Customer("Second Customer", 2222222222, true);
  const thirdCustomer = new Customer("Third Customer", 3333333333, true);
  const fourthCustomer = new Customer("Fourth Customer", 4444444444, false);

  scheduler.checkIn(firstCustomer);
  scheduler.checkIn(secondCustomer);
  scheduler.checkIn(thirdCustomer);
  scheduler.checkIn(fourthCustomer);

  expect(scheduler.getNextCustomer()).toBe(firstCustomer);
  expect(scheduler.getNextCustomer()).toBe(secondCustomer);
  expect(scheduler.getNextCustomer()).toBe(fourthCustomer);
  expect(scheduler.getNextCustomer()).toBe(thirdCustomer);
});
