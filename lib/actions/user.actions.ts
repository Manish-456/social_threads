"use server";

import { revalidatePath } from "next/cache";
import User from '../models/user.model';
import { connectToDb } from "../mongoose";
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";
import Community from '../models/community.model';

interface UserProps {
        userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path : string;
}


export async function updateUser(
 {
    userId,  
    username,
    name,
    bio,
    path,
    image

 } : UserProps

) : Promise<void> {
    connectToDb();

  try {
    await User.findOneAndUpdate({
        id : userId
     }, {
        username : username.toLowerCase(),
        image,
        bio,
        onboarded : true,
        name
     }, {
        upsert : true 
     })

     if(path === "/profile/edit"){
        revalidatePath(path) // It allows us to revalidate the data associated with a specific path. 
     }
  } catch (error : any) {
    throw new Error(`Failed to create/update user: ${error.message}`)
  }
}

export const fetchUser = async(userId : string) => {
   try {
      connectToDb();
      return await User.findOne({
         id : userId
      })
      .populate({
         path : "communities",
         model : Community
      })
   } catch (error : any) {
       throw new Error(`Failed to fetch user : ${error.message}`)
   }
}

export async function fetchUserThreads(userId : string){
  try {
    connectToDb();
    // Find all threads authorized by user with the given userId
    // TODO : populate community
    const threads = await User.findOne({id : userId})
    .populate({
      path : 'threads',
      model : Thread,
      populate : {
         path : 'children',
         model : Thread,
         populate : {
            path : 'author',
            model : User,
            select : 'name image id'
         }
      }
    })
    return threads;
  } catch (error : any) {
   throw new Error(`Failed to fetch threads : ${error.message}`)
  }
}


export async function fetchUsers({
   userId,
   searchString = '',
   pageNumber = 1,
   pageSize = 20,
   sortBy = 'desc'
} : {
   userId? : string;
   searchString? : string;
   pageNumber? : number;
   pageSize? : number;
   sortBy? : SortOrder
}){
   try {
      connectToDb();
      const skipAmount = (pageNumber - 1) * pageSize;

      const regex = new RegExp(searchString, "i");

      const query : FilterQuery<typeof User> = {
         id : {$ne : userId}
      };

      if(searchString.trim() !== ""){
         query.$or = [
            {username : {$regex : regex}},
            {name : {$regex : regex}}
         ]
      }

      const sortOptions = {createdAt : sortBy}

      const usersQuery = await User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)
      .exec();

      const totalUsersCount = await User.countDocuments(query);

      const isNext = totalUsersCount > skipAmount + usersQuery.length;

      return {
         usersQuery,
         isNext
      }
   }  catch (error : any) {
      throw new Error(`Failed to fetch users : ${error.message}`)
     }
}

export async function getActivities(userId : string){
   try {
      // find all the threads created by the user.
      const userThreads = await Thread.find({author : userId});

      // collect all the child thread ids (replies) from the children

      const childThreadIds = userThreads.reduce((acc, userThread) => {
         return acc.concat(userThread.children);
      }, [])

      console.log(childThreadIds);

      const replies = await Thread.find({
         _id : {
            $in : childThreadIds
         },
         author : {
            $ne : userId
         }
      }).populate({
         path : 'author',
         model : User,
         select : 'name image _id'
      });

      return replies;

   }catch (error : any) {
      throw new Error(`Failed to fetch users : ${error.message}`)
     }
}