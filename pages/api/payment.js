const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
import { mongooseConnect } from "@/lib/mongoose"

import { Order } from "@/models/Order"
import { Product } from "@/models/Product"

export default async function handler(req, res){
    if(req.method !== 'POST'){
        res.json('should be a POST request')
        return
    }

    const {
        name, email, city, streetAddress, country, postalCode, checkoutProducts
    } = req.body

    await mongooseConnect()
    const productIds = checkoutProducts.map(product => product.id)
    const productsInfo = await Product.find({_id:productIds})

    let uniqueProducts =  Array.from(new Set(checkoutProducts.map(JSON.stringify))).map(JSON.parse);


    let line_items = []
    const getQuantityOfProduct = (product) => {
        let numberOfEntries = checkoutProducts.filter(checkoutProduct => checkoutProduct.id === product.id && checkoutProduct.size === product.size).length
        return numberOfEntries
    }
    let orderTotalPrice = 0
    for(const product of uniqueProducts){
        const productInfo = productsInfo.find(p => p._id.toString() === product.id)

        const quantity = getQuantityOfProduct(product)

        if(quantity > 0 && productInfo){
            orderTotalPrice += productInfo.price * 100 * quantity
            line_items.push({
                quantity,
                price_data: {
                    currency: 'GBP',
                    product_data:
                        {
                            name: productInfo.name, 
                            description: product.size,
                            images: [productInfo.images[0]]
                        },
                    unit_amount: productInfo.price * 100
                }
            })
        }
    }

    const orderDoc = await Order.create({
        line_items,name,email,streetAddress,city,postalCode,country,paid:false, orderTotalPrice
    })

    console.log("payment",orderDoc)

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode:'payment',
        customer_email: email,
        success_url: process.env.PUBLIC_URL + '/checkout?success=1',
        cancel_url: process.env.PUBLIC_URL + '/checkout?cancel=1',
        metadata: {orderId:orderDoc._id.toString()}
    })

    res.json({
        url:session.url,
        order: orderDoc
    })
}