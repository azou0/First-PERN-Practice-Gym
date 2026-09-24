import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma";

export const profileRouter = Router();

profileRouter.post("/", async (req: Request, res: Response) => {
    try {
       const { userId, ...profileData } = req.body; 

       if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
       }

       const {
            goal,
            experience,
            days_per_week,
            sessionLength,
            equipment,
            injuries,
            preferredSplit, 
        } = profileData;

        if (
            !goal ||
            !experience ||
            !days_per_week ||
            !sessionLength ||
            !equipment ||
            //!injuries ||
            !preferredSplit
        ) {
            return res.status(400).json({ error: "Missing required fields" });
        }
      await prisma.user_profiles.upsert({
        where: {
                user_id: userId,
            },
        update:{
            goal,
            experience,
            days_per_week: days_per_week,
            sessionLength: sessionLength,
            equipment,
            injuries: injuries || null,
            preferredSplit: preferredSplit,
            updated_at: new Date(),
        },
        create: {
            user_id: userId,
            goal,
            experience,
            days_per_week: days_per_week,
            sessionLength: sessionLength,
            equipment,
            injuries: injuries || null,
            preferredSplit: preferredSplit,
            updated_at: new Date(),
        },
     });

      res.json({ success: true });
    } catch (error) {
        console.error("Error saving profile:", error);
        res.status(500).json({ error: "Failed to save profile" });
    }
});