import { mongooseConnect } from "@/lib/mongoose"

import { Account } from "@/models/Account"

export default async function handler(req, res){
    if(req.method !== 'POST'){
        res.json('should be a POST request')
        return
    }

    const {
        email, password
    } = req.body

    await mongooseConnect()

    const accountInfo = await Account.find({email:email})

    console.log(accountInfo)

    res.json(accountInfo)
}