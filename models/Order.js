import {model,models,Schema} from 'mongoose'

const OrderSchema = new Schema({
    line_items: Object,
    name: String,
    email: String,
    streetAddres: String,
    city: String,
    country: String,
    postalCode: String,
    paid: Boolean
})

export const Order = models?.Order || model('Order', OrderSchema)