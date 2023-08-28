import {model,models,Schema} from 'mongoose'

const AccountSchema = new Schema({
        name: String,
        email: String,
        streetAddress: String,
        city: String,
        country: String,
        postalCode: String,
        passwordHash: String
    }, {
        timestamps: true
})

export const Account = models?.Account || model('Account', AccountSchema)