// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const stripeChargeCallback = res => (stripeErr, stripeRes) => {
//     if (stripeErr) {
//       res.status(500).send({ error: stripeErr });
//     } else {
//       res.status(200).send({ success: stripeRes });
//     }
//   };

// const paymentApi = app => {
//   console.log('in paymentApi in payment.js ')
//     app.get("/payment", (req, res) => {
//       console.log('in paymentApi in payment.js in get ')
//       res.send({
//         message: "Hello Stripe checkout server!",
//         timestamp: new Date().toISOString()
//       });
//     });

//     app.post("/payment", (req, res) => {
//       console.log('in paymentApi in payment.js in post ')
//         const body = {
//           source: req.body.token.id,
//           amount: req.body.amount,
//           currency: "usd"
//         };
//         stripe.charges.create(body, stripeChargeCallback(res));
//     });
//     return app;
// };


// module.exports = paymentApi;
