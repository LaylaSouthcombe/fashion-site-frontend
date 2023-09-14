import { mongooseConnect } from "@/lib/mongoose"
import bcrypt from 'bcrypt';
import { Account } from "@/models/Account"

export default async function handler(req, res){
    if(req.method !== 'POST'){
        res.json('should be a POST request')
        return
    }

    const {
        email, password, firstName, lastName
    } = req.body

    try {
      await mongooseConnect()

      const existingUser = await Account.findOne({email: email})

      if (existingUser) {
        // throw new Error('User already exists');
        return res.status(500).json({ message: 'User not found' })
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new Account({ email, passwordHash: hashedPassword, firstName, lastName });

      newUser.save()
        .then((account) => {
          res.status(201).json({ message: 'Account created successfully', accountId: account._id })
        })
        .catch((error) => {
          throw new Error('Account could not be created ', error);
        })

    } catch (error) {
      console.error('hi ', error)
      res.status(error.requestResult.statusCode).send(error.message)
    }
}