### How to run

- `node app.js` - starts server (port 3000)
- `npm test` - run unit tests

## Endpoints

- POST `/checkin` (pass customer information within body)
- GET `/next-customer`

## Customer

| arguments        | description                            |
| ---------------- | -------------------------------------- |
| name             | Customer's Name                        |
| phoneNumber      | Customer's Phone Number (xxx-xxx-xxxx) |
| isVip (optional) | is this a VIP customer?                |

## ServiceScheduler

ServiceScheduler doesn't take any arguments

| properties         | description                                                             |
| ------------------ | ----------------------------------------------------------------------- |
| appointments       | Map of scheduled appointments. Keyed by customer phone number           |
| customerQueue      | Queue containing regular customers' phone numbers who have appointments |
| vipQueue           | Queue containing vip customers' phone numbers who have appointments     |
| customersProcessed | Number tracking amount of regular customers processed                   |
| vipProcessed       | Number tracking amount of vip customers processed                       |
| serviceNumber      | Number accounting for generated service numbers for appointments        |

| methods           | description                                                |
| ----------------- | ---------------------------------------------------------- |
| checkIn(customer) | sets up appointment for customer. Returns a service number |
| getNextCustomer() | Gets next customer scheduled for an appointment            |
