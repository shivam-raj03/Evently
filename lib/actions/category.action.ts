import { connectDB } from "../dbConnection";
import Category from "../Models/Category";
import { handleError } from "../utils";





export const getCategoryByName = async (catName: string) => {
    try {
        await connectDB();

        const category = await Category.findOne({name: catName})

        if(!category){
            return null;
        }
        return JSON.parse(JSON.stringify(category));

    } catch (error) {
        handleError(error);
    }
}