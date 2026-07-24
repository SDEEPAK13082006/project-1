export class DreamMemoryService {
  public static getChildDreamMemory(childName: string) {
    return {
      childName,
      favoriteAnimals: ['Golden Dragon', 'Friendly Fox', 'Dolphin'],
      favoriteCharacters: ['Oliver Owl', 'Wizard Sarah', 'Barnaby Bear'],
      favoriteWorlds: ['magical-forest', 'space-adventures', 'unicorn-kingdom'],
      favoriteMorals: ['Kindness', 'Friendship', 'Bravery'],
      preferredLength: 'Medium',
      preferredVoice: 'Mother'
    };
  }
}
