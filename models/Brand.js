import {model, Schema, models} from "mongoose"
const ObjectId = Schema.ObjectId

const brandSchema = new Schema({
    Id: ObjectId,
    letter: {
        type: String,
        required: true
    },
    brands: {
        type: Array,
        required: true
    }
  }, {
    timestamps: true
})

export const Brand = models.Brand || model('Brand', brandSchema)