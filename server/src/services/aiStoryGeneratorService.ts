import { KidSafetyService } from './kidSafetyService';
import { CharacterMemoryService } from './characterMemoryService';
import { EmotionEngineService, ChildMood } from './emotionEngineService';
import { QuizVocabService } from './quizVocabService';
import { VoiceEngineService, VoiceActor } from './voiceEngineService';

interface GenerateStoryDTO {
  childName: string;
  childAge: number;
  childGender?: string;
  favoriteAnimal: string;
  favoriteColor: string;
  favoriteCharacter: string;
  favoritePlace: string;
  favoriteToy?: string;
  favoriteFood?: string;
  worldId?: string;
  style?: string;
  moralLesson?: string;
  voiceType?: VoiceActor;
  length?: 'Short' | 'Medium' | 'Long';
  illustrationStyle?: string;
  mood?: ChildMood;
  partNumber?: number;
}

export class AiStoryGeneratorService {
  public static async generateStory(dto: GenerateStoryDTO) {
    const {
      childName,
      childAge,
      favoriteAnimal,
      favoriteColor,
      favoriteCharacter,
      favoritePlace,
      favoriteToy = 'Teddy Bear',
      favoriteFood = 'Pancakes',
      worldId = 'magical-forest',
      style = 'Fantasy',
      moralLesson = 'Kindness',
      voiceType = 'Mother',
      length = 'Medium',
      illustrationStyle = '3D Pixar',
      mood = 'Calm',
      partNumber = 1
    } = dto;

    const characterMemoryText = CharacterMemoryService.getCharacterMemoryPrompt(favoriteCharacter);
    const emotionConfig = EmotionEngineService.adaptForEmotion(mood);
    const voiceConfig = VoiceEngineService.getVoiceConfig(voiceType);

    const pageCount = length === 'Short' ? 3 : length === 'Medium' ? 4 : 5;
    const pages = [];

    const seriesTitle = partNumber > 1 ? ` (Part ${partNumber})` : '';
    const title = `${childName} & the Secret of ${worldId.replace('-', ' ')}${seriesTitle}`;

    for (let i = 1; i <= pageCount; i++) {
      const rawText = i === 1
        ? `Once upon a peaceful evening, ${childAge}-year-old ${childName} hugged ${favoriteToy} and entered the ${worldId.replace('-', ' ')} alongside a friendly ${favoriteAnimal}. ${characterMemoryText}`
        : i === 2
        ? `Hand in hand, ${childName} met ${favoriteCharacter} near the ${favoritePlace}. Practicing ${moralLesson}, ${childName} shared delicious ${favoriteFood} with everyone.`
        : i === 3
        ? `A wise owl handed ${childName} a glowing ${favoriteColor} star key for showing true ${moralLesson}. The pacing felt ${emotionConfig.pacing}.`
        : `Tucked safely in bed, ${childName} smiled, knowing that being kind makes every day a fairy tale. Goodnight!`;

      const { sanitized } = KidSafetyService.validateContent(rawText);

      pages.push({
        pageNumber: i,
        content: sanitized,
        illustrationUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
        imagePrompt: `${illustrationStyle} illustration of ${childName} with a ${favoriteAnimal} in ${worldId}.`
      });
    }

    const totalWords = pages.reduce((sum, p) => sum + p.content.split(' ').length, 0);

    const { quiz, vocabulary } = QuizVocabService.generateQuizAndVocab(childName, moralLesson, worldId);

    return {
      title,
      childName,
      childAge,
      childGender: dto.childGender || 'Boy',
      favoriteAnimal,
      favoriteColor,
      favoriteCharacter,
      favoritePlace,
      favoriteToy,
      favoriteFood,
      favoriteHobby: 'Stargazing',
      worldId,
      style,
      moralLesson,
      voiceType,
      voiceConfig,
      emotionConfig,
      narrationSpeed: voiceConfig.speed,
      illustrationStyle,
      tone: 'Calm',
      readingTimeMinutes: Math.ceil(totalWords / 75),
      wordCount: totalWords,
      difficulty: childAge <= 4 ? 'Easy' : childAge <= 7 ? 'Medium' : 'Advanced',
      pages,
      quiz,
      vocabulary,
      partNumber,
      isFavorite: false,
      coverImage: pages[0].illustrationUrl,
      summary: `A bedtime story about ${childName} learning ${moralLesson} in ${worldId}.`,
      safeContentScore: 100
    };
  }
}
