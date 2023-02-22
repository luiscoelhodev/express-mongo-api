import { Request, Response } from 'express';
import { User } from './database';
import { userZodSchema } from './usersValidator';

export class UsersController {
  public async getUsers(_request: Request, response: Response) {
    const users = await User.find();
    return response.json({ users });
  }

  public async createUser(request: Request, response: Response) {
    const isBodyValid = userZodSchema.safeParse(request.body);
    if (isBodyValid.success) {
      const newUser = new User(isBodyValid.data);

      //Queries DB to check if user already exists
      try {
        const userAlreadyExists = await User.findOne({
          $or: [{ email: newUser.email }, { ssn: newUser.ssn }],
        });
        if (userAlreadyExists) {
          return response.status(400).json({ error: 'User already exists!' });
        }
      } catch (error) {
        console.log(error);
        return response.status(500).json({
          message: 'Error in querying DB to check if user already exists.',
        });
      }

      try {
        await newUser.save();
        return response.status(201).json({
          message: 'User created successfully.',
        });
      } catch (error) {
        console.log(error);
        return response
          .status(500)
          .json({ message: 'Error in creating user.' });
      }
    } else {
      return response.status(422).json({
        message: 'Invalid user information. ',
        error: isBodyValid.error.errors,
      });
    }
  }
}
