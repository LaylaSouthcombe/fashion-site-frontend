import {model, Schema, models} from "mongoose"
const ObjectId = Schema.ObjectId

const featuredSchema = new Schema({
        Id: ObjectId,
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        salesPrice: {
            price: {
                type: Number
            },
            reduction: {
                type: Number
            },
            percentage:  {
                type: Number
            }
        },
        images: {
            type: Array
        },
        brand: {
            type: String,
            required: true
        },
        productCategory: {
            type: String,
            required: true
        },
        productType: {
            type: String,
            required: true
        },
        productSubType: {
            type: String,
            required: true
        },
        sizesAndStock: {
            type: Array,
            required: true
        },
        colour: {
            type: String,
            required: true
        },
        productSummary: {
            type: String,
            required: true
        },
        sizeAndFit: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
})

export const Featured = models.Featured || model('Featured', featuredSchema)