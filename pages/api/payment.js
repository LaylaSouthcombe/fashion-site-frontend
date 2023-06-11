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
    const products = checkoutProducts
    const uniqueIds = [...new Set(products.id)]
    const productsInfo = await Product.find({_id:uniqueIds})

    let line_items = []
    for(const product of products){
        const productInfo = productsInfo.find(p => p._id.toString() === product.id)
        const getQuantityOfProduct = (productSizeQuantity) => {
            let quantity
            let numberOfEntries = products.filter(product => product.id === productSizeQuantity.id && product.size === productSizeQuantity.size)
            for(let i = 0; i < numberOfEntries.length; i++){
                quantity += numberOfEntries[i].quantity
            }
            return quantity
        }
        // const quantity = products.filter(id => id === productId)?.length || 0
        const quantity = getQuantityOfProduct(product)
        let numberInLineItems = line_items.filter(item => item.id === product.id && item.size === product.size)?.length || 0
        if(quantity > 0 && productInfo && numberInLineItems === 0){
            line_items.push({
                quantity,
                price_data: {
                    currency: 'GBP',
                    product_data: {name:productInfo.name},
                    unit_amount: quantity * productInfo.price * 100
                },
                id: product.id,
                size: product.size
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