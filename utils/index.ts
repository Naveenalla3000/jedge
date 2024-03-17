import prisma from "@/prisma";

export const connectDb = async()=>{
    try {
        await prisma.$connect();
    } catch (error:any) {
        console.log(error.message);
        return new Error(error.message);
    }
}