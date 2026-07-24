import { Request, Response } from 'express';

export class RecommendationController {
  public static async getRecommendations(req: Request, res: Response) {
    const { mood = 'Calm', age = 5 } = req.query;

    return res.status(200).json({
      mood,
      age: Number(age),
      recommendedStories: [
        {
          id: 'rec-1',
          title: 'The Stardust Unicorn & Rainbow Bridge',
          worldId: 'unicorn-kingdom',
          recommendedAge: 'Ages 3–8',
          coverImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
          reason: 'Matches calm mood and bedtime lulls'
        },
        {
          id: 'rec-2',
          title: 'Splash the Dolphin & the Coral Reef Light',
          worldId: 'ocean-adventures',
          recommendedAge: 'Ages 4–9',
          coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
          reason: 'Popular in Ocean Realm'
        }
      ]
    });
  }
}
