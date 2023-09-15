import { mongooseConnect } from "@/lib/mongoose"
import bcrypt from 'bcrypt';
import { Account } from "@/models/Account"

export default async function handler(req, res){
    if(req.method !== 'POST'){
        res.json('should be a POST request')
        return
    }

    const {
        email, password
    } = req.body
  
    try {
      await mongooseConnect()

      const user = await Account.findOne({email: email})
      if (!user) {
        return res.status(401).json({ message: 'No account with that email found. Please ensure you have entered your email correctly.' })
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect email and password combination. Please ensure you have entered both correctly.' })
      }

      res.status(200).json({ message: 'Authentication successful', accountId: user._id })
    } catch (error) {
      res.status(error.requestResult.statusCode).json({message: error.message})
    }
}