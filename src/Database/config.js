import mongoose from 'mongoose';

export const dbConnect = async() => {
    try{
        const data = await mongoose.connect(process.env.URL_DB);
        console.log('DB connected');
        return (data);
    }
    catch(error){
        console.log(error)
        throw new Error(error);
    }
}