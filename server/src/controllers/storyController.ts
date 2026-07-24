import { Request, Response } from 'express';
import { AiStoryGeneratorService } from '../services/aiStoryGeneratorService';

export class StoryController {
  public static async generateStory(req: Request, res: Response) {
    try {
      const generated = await AiStoryGeneratorService.generateStory(req.body);
      return res.status(201).json(generated);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public static async getStories(req: Request, res: Response) {
    return res.status(200).json([]);
  }

  public static async toggleFavorite(req: Request, res: Response) {
    const { id } = req.params;
    return res.status(200).json({ storyId: id, isFavorite: true });
  }
}
