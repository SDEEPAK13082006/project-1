import { Response } from 'express';
import { AuthenticatedRequest } from '../types';

export class ChildController {
  public static async getProfiles(req: AuthenticatedRequest, res: Response) {
    return res.status(200).json([
      {
        id: 'child-1',
        name: 'Leo',
        age: 5,
        gender: 'Boy',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
        favoriteAnimal: 'Golden Dragon',
        favoriteColor: 'Soft Purple',
        favoriteCharacter: 'Wizard',
        favoritePlace: 'Sky Kingdom',
        preferredStoryWorld: 'magical-forest',
        readingStreakDays: 14
      }
    ]);
  }

  public static async createProfile(req: AuthenticatedRequest, res: Response) {
    const newChild = {
      id: `child-${Date.now()}`,
      ...req.body,
      readingStreakDays: 1
    };
    return res.status(201).json(newChild);
  }
}
