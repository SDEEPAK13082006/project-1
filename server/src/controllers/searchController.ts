import { Request, Response } from 'express';

export class SearchController {
  public static async search(req: Request, res: Response) {
    const { q, world, moral, age } = req.query;

    return res.status(200).json({
      query: q || '',
      resultsCount: 2,
      results: [
        {
          id: 'story-1',
          title: `Leo & the Secret of Magical Forest`,
          worldId: world || 'magical-forest',
          moralLesson: moral || 'Kindness',
          summary: 'A soothing bedtime story about kindness and starlight keys.',
          coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop'
        },
        {
          id: 'story-2',
          title: `Sam & the Rainbow Comet`,
          worldId: 'space-adventures',
          moralLesson: 'Bravery',
          summary: 'A cosmic voyage past sparkling moon craters.',
          coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop'
        }
      ]
    });
  }
}
