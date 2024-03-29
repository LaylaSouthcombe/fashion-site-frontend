import { ObjectId } from 'mongodb'
import {model,models,Schema} from 'mongoose'

const OrderSchema = new Schema({
        line_items: Object,
        name: String,
        email: String,
        streetAddress: String,
        city: String,
        country: String,
        postalCode: String,
        paid: Boolean,
        orderTotalPrice: Number,
        accountId: ObjectId
    }, {
        timestamps: true
})

export const Order = models?.Order || model('Order', OrderSchema)