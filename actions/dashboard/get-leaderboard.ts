"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

export const getLeaderboard = async () => {
  try{

    const {userId}=auth()

    if (!userId){
      return {
        leaderboard: [],
        message:"Please login to view the leaderboard"
      }
    }

    const leaderboard = await db.user.findMany({
      select:{
        id:true,
        name:true,
        email:true,
        points:true,
      },
      orderBy:{
        points:"desc"
      },
      take:10
    })


    return {
      leaderboard,
      message:"Leaderboard fetched successfully"
    }

  }
  catch (error) {

    console.log("[ERROR] getLeaderboard",error)

    return {
      leaderboard: [],
      message:"Error fetching leaderboard"
    }
  }

}
