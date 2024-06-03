'use server'

import { connectDB } from "../dbConnection"
import { handleError } from "../utils"
import User from "../Models/User";
import Event from "../Models/Event";
import Order from "../Models/Order";
import Tags from "../Models/Tags";
import Category from "../Models/Category";
import { revalidatePath } from "next/cache";
import { FilterQuery } from "mongoose";


export const createEvent = async (eventData: any) => {
   

    try {
        await connectDB();

        let data = eventData;
        data.ticketsLeft = data.totalCapacity;

        const category = await Category.findOne({name: data.category});

        if(!category){
            const newCategory = await Category.create({name: data.category});
            data.category = newCategory._id;
        } else{
            data.category = category._id;
        }

        const tagsId: any = [];

        for(const idx in data.tags){
            const inputTag = data.tags[idx]
            const tag = await Tags.findOne({name: inputTag});
            if(tag){
                tagsId.push(tag._id);
            }else{
                const newTag = await Tags.create({name: inputTag});
                tagsId.push(newTag._id);
            }
        }
        data.tags = tagsId;

        const newEvent = await Event.create(data);

        newEvent.tags.map(async (tag: string) => {
            const tagExists = await Tags.findById(tag);
            if(tagExists){
                tagExists.events.push(newEvent._id);
                await tagExists.save();
            } else {
                await Tags.create({name: tag, events: [newEvent._id]}); 
            }
        })
        revalidatePath("/");    
        return JSON.parse(JSON.stringify(newEvent));

    } catch (error) {
        console.log(error);
        throw error;
    }
}



export const getEventsByCategory = async (categoryId: string) => {
    
    
    try {
        await connectDB();
        const allEvents = await Event.find({category: categoryId})
            .populate('category', 'name')
            .populate('organizer', 'firstName lastname email')
            .populate('tags', 'name');
        
        return JSON.parse(JSON.stringify(allEvents));

    } catch (error) {
        handleError(error);
    }
}


export async function getEvents(searchQuery: string, page = 1, pageSize = 12) {
    try {
        await connectDB();

        const query: FilterQuery<typeof Event> = {};

        if (searchQuery) {
            query.$or = [
                { title: { $regex: new RegExp(searchQuery, "i") } },
                { description: { $regex: new RegExp(searchQuery, "i") } }
            ];
        }

        await User.find();

        const skip = (page - 1) * pageSize;

        const events = await Event.find(query)
            .populate("category", "name")
            .populate("organizer", "firstName lastName email")
            .populate("tags", "name")
            .skip(skip)
            .limit(pageSize);

        const total = await Event.countDocuments();

        const totalPages = Math.ceil(total / pageSize);

        return { events: JSON.parse(JSON.stringify(events)), totalPages };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getEventById(id: string) {
    try {
        await connectDB();

        const event = await Event.findById(id)
            .populate("category", "name")
            .populate("organizer", "firstName lastName email")
            .populate("tags", "name");

        return JSON.parse(JSON.stringify(event));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getEventsByUserId(userId: string){
    try {
        await connectDB();

        const events = await Event.find({organizer: userId})
            .populate("category", "name")
            .populate("organizer", "firstName lastName email")
            .populate("tags", "name");

    return JSON.parse(JSON.stringify(events));


    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function deleteEventById(eventId: string){
    try {
        await connectDB();

        const events = await Event.findByIdAndDelete(eventId)
        await Tags.updateMany({ events: eventId }, { $pull: { events: eventId } });

        await User.updateMany({ likedEvents: eventId }, { $pull: { likedEvents: eventId } });

        // add refund logic here

        await Order.deleteMany({ event: eventId });

        revalidatePath("/");
        revalidatePath("/profile");
        revalidatePath("/tickets");
        revalidatePath("/likes");

        return JSON.parse(JSON.stringify(event));

        


    } catch (error) {
        console.log(error);
        throw error;
    }
}