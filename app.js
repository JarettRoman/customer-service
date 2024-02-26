const express = require("express");
const bodyParser = require("body-parser");
const ServiceScheduler = require("./ServiceScheduler");
const Customer = require("./Customer");

const app = express();
const port = 3000;
app.use(bodyParser.json());

const scheduler = new ServiceScheduler();

const validateCheckInData = (req, res, next) => {
  const { name, phoneNumber, isVip } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ message: "Invalid name" });
  }

  if (!phoneNumber || !/^\d{3}-\d{3}-\d{4}$/.test(phoneNumber)) {
    return res.status(400).json({ message: "Invalid phone number" });
  }

  if (isVip !== undefined && typeof isVip !== "boolean") {
    return res.status(400).json({ message: "Invalid Vip flag" });
  }
  next();
};

app.post("/checkin", validateCheckInData, (req, res) => {
  const { name, phoneNumber, isVip } = req.body;

  const customer = new Customer(name, phoneNumber, isVip);

  const serviceNumber = scheduler.checkIn(customer);

  if (serviceNumber) {
    res.status(201).json({
      message: "Appointment scheduled successfully",
      serviceNumber: serviceNumber,
    });
  } else {
    res.status(400).json({
      message: "Customer has already an appointment scheduled",
      serviceNumber: scheduler.appointments.get(phoneNumber).serviceNumber,
    });
  }
});

app.get("/next-customer", (req, res) => {
  const nextCustomer = scheduler.getNextCustomer();

  if (nextCustomer) {
    res.status(200).json(nextCustomer);
  } else {
    res.status(404).json({ message: "No customers in queue." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
