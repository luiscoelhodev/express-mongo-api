import { Request, Response } from 'express';
import { User } from './database';
import { userUpdateZodSchema, userZodSchema } from './usersValidator';
import { isValidObjectId } from 'mongoose';

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

  public async getUserById(request: Request, response: Response) {
    const { userId } = request.params;

    if (!userId || !/^[a-zA-Z0-9]+$/.test(userId)) {
      return response
        .status(400)
        .json({ error: 'Please provide a valid userId.' });
    }

    try {
      const userFound = await User.findById(userId);
      console.log(userFound);
      if (userFound === null) {
        return response.status(404).json({ error: 'User not found.' });
      }
      return response.status(200).json({ userFound });
    } catch (error) {
      if (!isValidObjectId(userId)) {
        return response.status(400).json({
          error:
            'Please provide a valid ObjectId. A Valid ObjectId must have 24 hexadecimal characters, representing the 12 bytes of the ObjectId in order.',
        });
      }
      return response
        .status(500)
        .json({ message: 'Error in retrieving user', error });
    }
  }

  public async updateUser(request: Request, response: Response) {
    const { userId } = request.params;

    if (!userId || !/^[a-zA-Z0-9]+$/.test(userId)) {
      return response
        .status(400)
        .json({ error: 'Please provide a valid userId.' });
    }

    const validation = userUpdateZodSchema.safeParse(request.body);

    if (validation.success) {
      try {
        const userToBeUpdated = await User.findByIdAndUpdate(
          userId,
          validation.data,
          { new: true }
        );
        return response
          .status(200)
          .json({ message: 'User updated successfully.', userToBeUpdated });
      } catch (error) {
        console.log(error);
        if (!isValidObjectId(userId)) {
          return response.status(400).json({
            error:
              'Please provide a valid ObjectId. A Valid ObjectId must have 24 hexadecimal characters, representing the 12 bytes of the ObjectId in order.',
          });
        }
        return response.status(500).json({ message: 'Error updating user' });
      }
    } else {
      return response.status(422).json({
        message: 'Invalid parameters.',
        error: validation.error.errors,
      });
    }
  }
}
