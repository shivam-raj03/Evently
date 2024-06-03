import { connectDB } from "../dbConnection";
import Category from "../Models/Category";
import { handleError } from "../utils";





export const getCategoryByName = async (catName: string) => {
    try {
        await connectDB();

        // const lookUp = {
        //     'business' : 'Business'
        // }


        const category = await Category.findOne({name: catName})
        console.log(category);
        if(!category){
            return null;
        }
        return JSON.parse(JSON.stringify(category));

    } catch (error) {
        handleError(error);
    }
}


