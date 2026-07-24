// Kid Safety Service enforcing 100% appropriate bedtime stories for ages 3-12

const PROHIBITED_KEYWORDS = [
  'kill', 'die', 'dead', 'death', 'blood', 'weapon', 'gun', 'sword', 'knife',
  'war', 'fight', 'steal', 'thief', 'crime', 'dating', 'romance', 'kiss',
  'alcohol', 'smoke', 'drug', 'gamble', 'scary', 'monster', 'ghost', 'nightmare'
];

export class KidSafetyService {
  public static validateContent(text: string): { isSafe: boolean; score: number; sanitized: string } {
    let sanitized = text;
    let score = 100;

    PROHIBITED_KEYWORDS.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      if (regex.test(sanitized)) {
        score -= 10;
        sanitized = sanitized.replace(regex, 'sleepy friend');
      }
    });

    if (!sanitized.includes('happy') && !sanitized.includes('sweet dreams')) {
      sanitized += ' And everyone smiled, sailing into happy sweet dreams.';
    }

    return {
      isSafe: score >= 90,
      score: Math.max(0, score),
      sanitized
    };
  }
}
