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
        return res.status(401).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new Account({ email, passwordHash: hashedPassword, firstName, lastName });

      newUser.save()
        .then((account) => {
          res.status(201).json({ message: 'Account created successfully', accountId: account._id });
        })
        .catch((error) => {
          return res.status(401).json({ message: 'Account couldn\'t be created ', error});
        });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
}