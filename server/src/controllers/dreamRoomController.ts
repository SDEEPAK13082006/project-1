import { Request, Response } from 'express';

export class DreamRoomController {
  public static async getRoomConfig(req: Request, res: Response) {
    const hour = new Date().getHours();
    const timeTheme = (hour >= 6 && hour < 11) ? 'Morning' : (hour >= 11 && hour < 17) ? 'Afternoon' : (hour >= 17 && hour < 19) ? 'Evening' : 'Night';

    return res.status(200).json({
      timeTheme,
      lampMode: 'ON',
      weather: 'Default',
      moonStatus: 'Full Glow 🌙',
      curtainsOpen: true,
      owlMessage: 'Hoo-hoo! Ready for tonight’s bedtime adventure?',
      starPoints: 120,
      rewardCount: 5,
      bookshelfStories: 42
    });
  }
}
