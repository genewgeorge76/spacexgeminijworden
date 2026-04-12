const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    // LOGIC: Automatically upgrade user in the Castle Moat RBAC
    console.log(`Payment Success: Unlocking Palace for ${session.customer_details.email}`);
    // Here we would trigger the accessControl.ts update
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};