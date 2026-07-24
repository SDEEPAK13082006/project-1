export class QuizVocabService {
  public static generateQuizAndVocab(childName: string, moralLesson: string, worldId: string) {
    const quiz = [
      {
        question: `What important value did ${childName} practice during the story?`,
        options: [moralLesson, 'Tidiness', 'Whistling', 'Running fast'],
        correctAnswer: moralLesson,
        type: 'MCQ'
      },
      {
        question: `True or False: ${childName}'s kindness helped light up the night sky!`,
        options: ['True', 'False'],
        correctAnswer: 'True',
        type: 'TrueFalse'
      },
      {
        question: `Which creature gave ${childName} the star key?`,
        options: ['Wise Owl', 'Grumpy Bear', 'Pirate Parrot', 'Tiny Ant'],
        correctAnswer: 'Wise Owl',
        type: 'MCQ'
      }
    ];

    const vocabulary = [
      {
        word: 'Luminous',
        pronunciation: 'LOO-min-us',
        definition: 'Giving off a warm, bright, glowing light.',
        example: `The stardust flower was luminous in the ${worldId.replace('-', ' ')}.`
      },
      {
        word: 'Compassion',
        pronunciation: 'kum-PASH-un',
        definition: 'Showing deep kindness and caring for others.',
        example: `${childName} showed compassion by sharing breakfast with animal friends.`
      },
      {
        word: 'Harmony',
        pronunciation: 'HAR-muh-nee',
        definition: 'Living together in peace, joy, and friendship.',
        example: `All creatures lived in peaceful harmony under the starry sky.`
      }
    ];

    return { quiz, vocabulary };
  }
}
