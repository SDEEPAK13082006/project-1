import { Request, Response } from 'express';

const STORY_WORLDS_LIST = [
  { id: 'magical-forest', title: 'Magical Forest', emoji: '🌳', storyCount: 42 },
  { id: 'space-adventures', title: 'Space Adventures', emoji: '🚀', storyCount: 38 },
  { id: 'unicorn-kingdom', title: 'Unicorn Kingdom', emoji: '🦄', storyCount: 45 },
  { id: 'ocean-adventures', title: 'Ocean Adventures', emoji: '🌊', storyCount: 35 },
  { id: 'dinosaur-world', title: 'Dinosaur World', emoji: '🦖', storyCount: 29 },
  { id: 'fairy-tale-kingdom', title: 'Fairy Tale Kingdom', emoji: '🏰', storyCount: 50 },
  { id: 'vehicle-world', title: 'Vehicle World', emoji: '🚂', storyCount: 26 },
  { id: 'school-adventures', title: 'School Adventures', emoji: '🏫', storyCount: 31 },
  { id: 'toy-world', title: 'Toy World', emoji: '🧸', storyCount: 40 },
  { id: 'healthy-habits', title: 'Healthy Habits', emoji: '🍎', storyCount: 22 },
  { id: 'community-heroes', title: 'Community Heroes', emoji: '🧑‍🚒', storyCount: 28 },
  { id: 'kid-friendly-mystery', title: 'Kid-Friendly Mystery', emoji: '🧩', storyCount: 33 }
];

export class StoryWorldController {
  public static async getAllWorlds(req: Request, res: Response) {
    return res.status(200).json(STORY_WORLDS_LIST);
  }

  public static async getWorldById(req: Request, res: Response) {
    const { id } = req.params;
    const world = STORY_WORLDS_LIST.find(w => w.id === id) || STORY_WORLDS_LIST[0];
    return res.status(200).json(world);
  }
}
