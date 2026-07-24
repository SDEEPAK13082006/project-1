export type ChildMood = 'Happy' | 'Excited' | 'Curious' | 'Sleepy' | 'Sad' | 'Calm';

export class EmotionEngineService {
  public static adaptForEmotion(mood: ChildMood) {
    switch (mood) {
      case 'Sleepy':
        return {
          pacing: 'Slow & Gentle Lullaby',
          music: 'Soft Piano Lullaby',
          toneModifier: 'ultra soothing, peaceful, encouraging deep sleep',
          suggestedWeather: 'Night Stars'
        };
      case 'Excited':
        return {
          pacing: 'Dynamic & Joyful',
          music: 'Upbeat Orchestral Fantasy',
          toneModifier: 'fun, celebratory, encouraging teamwork and smiles',
          suggestedWeather: 'Rainbow Sparkles'
        };
      case 'Curious':
        return {
          pacing: 'Investigative & Wonder-filled',
          music: 'Magical Harp & Chimes',
          toneModifier: 'exploratory, thought-provoking, educational',
          suggestedWeather: 'Galaxy Auroras'
        };
      case 'Sad':
        return {
          pacing: 'Warm & Comforting Hug',
          music: 'Soft Acoustic Guitar',
          toneModifier: 'deeply comforting, reassuring, full of warm hugs',
          suggestedWeather: 'Warm Sunshine'
        };
      default:
        return {
          pacing: 'Balanced Bedtime Pace',
          music: 'Forest Nature Ambience',
          toneModifier: 'calm, pleasant, uplifting',
          suggestedWeather: 'Default'
        };
    }
  }
}
