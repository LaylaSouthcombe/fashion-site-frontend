import { mongooseConnect } from "@/lib/mongoose"
import { Order } from "@/models/Order"
import { Product } from "@/models/Product"
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res){
    if(req.method !== 'POST'){
        res.json('should be a POST request')
        return
    }
    const {
        name, email, city, streetAddress, country, postalCode, checkoutProducts
    } = req.body
    await mongooseConnect()
    const productsIds = checkoutProducts
    const uniqueIds = [...new Set(productsIds)]
    const productsInfo = await Product.find({_id:uniqueIds})

    let line_items = []
    for(const productId of uniqueIds){
        const productInfo = productsInfo.find(p => p._id.toString() === productId)
        const quantity = productsIds.filter(id => id === productId)?.length || 0
        if(quantity > 0 && productInfo){
            line_items.push({
                quantity,
                price_data: {
                    currency: 'GBP',
                    product_data: {name:productInfo.name},
                    unit_amount: quantity * productInfo.price * 100
                }
            })
        }
    }

    const orderDoc = await Order.create({
        line_items,name,email,streetAddress,city,postalCode, country,paid:false
    })

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode:'payment',
        customer_email: email,
        success_url: process.env.PUBLIC_URL + '/checkout?success=1',
        cancel_url: process.env.PUBLIC_URL + '/checkout?cancel=1',
        metadata: {orderId:orderDoc._id.toString()}
    })

    res.json({
        url:session.url
    })
}