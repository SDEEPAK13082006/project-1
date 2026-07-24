export class CharacterMemoryService {
  public static getCharacterMemoryPrompt(characterName: string): string {
    const memoryBank: Record<string, string> = {
      'Oliver Owl': 'Oliver remembered when they solved the Starlight Riddle together in the Magical Forest and gave out the Silver Key.',
      'Barnaby Bear': 'Barnaby recalled their midnight tea party where everyone shared blueberry pancakes and laughed.',
      'Captain Sam': 'Sam remembered their rocket voyage past the Rainbow Comet, waving to friendly galaxy aliens.',
      'Splash Dolphin': 'Splash remembered diving to the glowing coral reef to find the Golden Pearl of Friendship.',
      'Doctor Daisy': 'Daisy recalled helping the little fawn heal its leg near the sunny community park.'
    };

    return memoryBank[characterName] || `${characterName} smiled warmly, remembering past adventures and great acts of kindness.`;
  }
}
