const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

import { mongooseConnect } from "@/lib/mongoose"

import { Order } from "@/models/Order";
import {buffer} from 'micro'

const endpointSecret = "whsec_fa354549160a57a757ed9f463134870f80e0947cc8fab430b69d12bd2219800c";

export default async function handler(req,res){
    await mongooseConnect()
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId
      const paid = data.payment_status === 'paid'
      if(orderId && paid){
        await Order.findByIdAndUpdate(orderId, {
            paid: true
        })
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok')
}

export const config = {
    api: {bodyParser:false}
}