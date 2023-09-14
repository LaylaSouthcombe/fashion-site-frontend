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
        return res.status(401).json({ message: 'User not found' })
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect email or password' })
      }

      res.status(200).json({ message: 'Authentication successful' })
    } catch (error) {
      console.error(error)
      res.status(error.requestResult.statusCode).send(error.message)
    }
}