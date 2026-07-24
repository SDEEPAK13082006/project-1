import { Request, Response } from 'express';

export class DashboardController {
  public static async getParentStats(req: Request, res: Response) {
    return res.status(200).json({
      totalStoriesRead: 42,
      totalMinutesRead: 168,
      activeStreakDays: 14,
      vocabularyWordsLearned: 56,
      favoriteCategories: [
        { category: 'Magical Forest', count: 18 },
        { category: 'Space Adventures', count: 12 },
        { category: 'Unicorn Kingdom', count: 8 }
      ],
      weeklyMinutesData: [
        { day: 'Mon', minutes: 15 },
        { day: 'Tue', minutes: 20 },
        { day: 'Wed', minutes: 18 },
        { day: 'Thu', minutes: 25 },
        { day: 'Fri', minutes: 30 },
        { day: 'Sat', minutes: 35 },
        { day: 'Sun', minutes: 25 }
      ]
    });
  }
}
