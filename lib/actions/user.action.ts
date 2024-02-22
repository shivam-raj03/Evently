'use server'

import { connectDB } from "../dbConnection"
import { handleError } from "../utils"
import User from "../Models/User";
import Event from "../Models/Event";
import Order from "../Models/Order";

export interface createUserParams {
    clerkId: String,
    email: String,
    userName: String,
    firstName: String,
    lastName?: String,
    photo?: String
}

export const createUser = async (user: createUserParams) => {
    try {
        console.log('before connecting db');
        await connectDB();
        console.log('after connecting db');
        const newUser = await User.create(user);
        console.log('after creating user');
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        console.log('went to error block');
        handleError(error);
    }
}

export interface updateUserParams {
    userName: String,
    firstName: String,
    lastName?: String,
    photo?: String
}


export const updateUser = async (clerkId: string, user: updateUserParams) => {
    try {
        await connectDB();
        const updatedUser = await User.findByIdAndUpdate({ clerkId }, user, {new: true});
        if(!updateUser) throw new Error('User update failed');
        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        handleError(error);
    }
}

export const deleteUser = async (clerkId: string) => {
    try {
        await connectDB();
        const user = await User.findOne({clerkId});
        if(!user){
            throw new Error('User not found');
        }

        const userEvents = await Event.find({oganizer: user._id});
        
        if(userEvents){
            await Event.deleteMany({organizer: user._id});
        }

        const userOrders = await Order.find({user: user._id});

        if(userOrders){
            await Order.deleteMany({user: user._id});
        }

        await User.findOneAndDelete(user._id);
    
        return JSON.parse(JSON.stringify(user));
        
    } catch (error) {
        handleError(error);
    }
}

export async function getUserById(userId: string) {
    try {
      await connectDB()
  
      const user = await User.findById(userId)
  
      if (!user) throw new Error('User not found')
      return JSON.parse(JSON.stringify(user))
    } catch (error) {
      handleError(error)
    }
  }
