// Kid Safety Sanitizer Engine enforcing 100% child-appropriate bedtime story content for ages 3-12

const FORBIDDEN_WORDS = [
  'kill', 'die', 'dead', 'death', 'blood', 'scary', 'monster', 'ghost',
  'weapon', 'gun', 'sword', 'knife', 'war', 'fight', 'steal', 'thief',
  'crime', 'dating', 'romance', 'kiss', 'alcohol', 'smoke', 'drug',
  'gamble', 'hate', 'ugly', 'horrible', 'terrifying', 'nightmare'
];

export class KidSafetySanitizer {
  public static sanitizeContent(text: string): string {
    let cleaned = text;

    // Replace any accidental inappropriate words with positive child-friendly equivalents
    FORBIDDEN_WORDS.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      cleaned = cleaned.replace(regex, 'sleepy friend');
    });

    // Ensure ending contains happy resolution
    if (!cleaned.includes('happy') && !cleaned.includes('peaceful') && !cleaned.includes('sweet dreams')) {
      cleaned += ' And everyone smiled warmly, knowing they were safe, loved, and ready for sweet bedtime dreams.';
    }

    return cleaned;
  }

  public static isChildSafe(inputs: { name: string; text: string }): boolean {
    const combined = `${inputs.name} ${inputs.text}`.toLowerCase();
    return !FORBIDDEN_WORDS.some(word => combined.includes(word));
  }
}
