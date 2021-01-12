const { Stripe } = require("stripe");
const User = require("../lib/models/user/users-schema");

const stripe = new Stripe(sk_test_51I6GFrAAyiIKrt7bV0ujpx8Na80sPOiyEaVnm4U8sRqWON8sYdQlATgg8Cr9pZEZzmQtyXLOjeseZNGOfSZojVV300mA4IiLIn, { apiVersion: "2020-08-27" });

const createStripeCustomer = async ({ username }) => {
  console.log('username in createStripeCustomer',username)
  const { data } = await stripe.customers.list({ username });
  console.log('data in utils',data)
  return data.length === 0 ? stripe.customers.create({ username }) : data[0];
};

const attachPaymentMethod = async ({ customer, id }) =>
  stripe.paymentMethods.attach(id, {
    customer,
  });

// const createSubscription = ({ customer, payment, price }) => {
//   return stripe.subscriptions.create({
//     items: [
//       {
//         price,
//       },
//     ],
//     customer,
//     default_payment_method: payment,
//   });
// };

module.exports = {
  createStripeCustomer,
  attachPaymentMethod,
  // createSubscription,
};