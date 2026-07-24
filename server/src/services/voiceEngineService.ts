export type VoiceActor = 
  | 'Mother' 
  | 'Father' 
  | 'Grandmother' 
  | 'Grandfather' 
  | 'Boy' 
  | 'Girl' 
  | 'Storyteller' 
  | 'Friendly Owl' 
  | 'Fairy';

export class VoiceEngineService {
  public static getVoiceConfig(voice: VoiceActor) {
    const voiceProfiles: Record<VoiceActor, { pitch: number; speed: number; description: string }> = {
      'Mother': { pitch: 1.1, speed: 0.95, description: 'Warm, comforting, maternal tone' },
      'Father': { pitch: 0.9, speed: 0.95, description: 'Deep, reassuring, protective tone' },
      'Grandmother': { pitch: 1.15, speed: 0.85, description: 'Gentle, storytelling grandmother voice' },
      'Grandfather': { pitch: 0.85, speed: 0.85, description: 'Wise, cozy grandfather voice' },
      'Boy': { pitch: 1.3, speed: 1.0, description: 'Playful young boy narrator' },
      'Girl': { pitch: 1.35, speed: 1.0, description: 'Cheerful young girl narrator' },
      'Storyteller': { pitch: 1.0, speed: 0.9, description: 'Classic cinematic bedtime narrator' },
      'Friendly Owl': { pitch: 0.8, speed: 0.8, description: 'Deep hooing wise owl narrator' },
      'Fairy': { pitch: 1.4, speed: 1.0, description: 'Sparkling high fairy voice' }
    };

    return voiceProfiles[voice] || voiceProfiles['Mother'];
  }
}
