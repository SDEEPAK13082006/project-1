import { Request, Response } from 'express';

const MOCK_CHARACTERS = [
  {
    characterId: 'oliver-owl',
    name: 'Oliver Owl',
    avatar: '🦉',
    description: 'Wise owl who loves forest riddles and starry skies.',
    worldOrigin: 'magical-forest',
    catchphrase: 'Hoo-hoo! Wisdom begins with kindness!'
  },
  {
    characterId: 'barnaby-bear',
    name: 'Barnaby Bear',
    avatar: '🧸',
    description: 'Friendly teddy bear who loves honey pancakes.',
    worldOrigin: 'toy-world',
    catchphrase: 'Ready for tonight’s adventure?'
  },
  {
    characterId: 'captain-sam',
    name: 'Captain Sam',
    avatar: '🚀',
    description: 'Little space explorer who sails past rainbow comets.',
    worldOrigin: 'space-adventures',
    catchphrase: '3, 2, 1... Launch into sweet dreams!'
  }
];

export class CharacterController {
  public static async getCharacters(req: Request, res: Response) {
    return res.status(200).json(MOCK_CHARACTERS);
  }

  public static async getCharacterById(req: Request, res: Response) {
    const { id } = req.params;
    const char = MOCK_CHARACTERS.find(c => c.characterId === id) || MOCK_CHARACTERS[0];
    return res.status(200).json(char);
  }
}
