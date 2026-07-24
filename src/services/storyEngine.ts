import { Story, StoryFormInputs, StoryPage } from '../types/story';
import { STORY_WORLDS } from '../data/storyWorldsData';
import { KidSafetySanitizer } from './kidSafetySanitizer';

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=800&auto=format&fit=crop'
];

export const generateStoryFromInputs = (inputs: StoryFormInputs): Story => {
  const {
    childName,
    childAge,
    favoriteAnimal,
    favoriteColor,
    favoriteCharacter,
    favoritePlace,
    favoriteToy,
    favoriteFood,
    style,
    worldId,
    moralLesson,
    illustrationStyle,
    tone,
    length,
    language
  } = inputs;

  const matchedWorld = STORY_WORLDS.find(w => w.id === worldId) || STORY_WORLDS[0];

  const pageCount = length === 'Short' ? 3 : length === 'Medium' ? 4 : 5;
  const pages: StoryPage[] = [];

  // Page 1: World Introduction
  const p1Text = KidSafetySanitizer.sanitizeContent(
    `Once upon a peaceful evening, 5-year-old ${childName} stepped into the ${matchedWorld.title}. With a favorite ${favoriteColor} blanket and hugging a beloved ${favoriteToy}, ${childName} met a gentle ${favoriteAnimal} friend near the ${favoritePlace}. Together, they set off on a calm adventure filled with bright stardust and happy smiles.`
  );
  pages.push({
    pageNumber: 1,
    content: p1Text,
    illustrationUrl: matchedWorld.coverImage || DEFAULT_IMAGES[0],
    imagePrompt: `${illustrationStyle} illustration of ${childName} entering the ${matchedWorld.title} holding a ${favoriteToy} alongside a happy ${favoriteAnimal}.`
  });

  // Page 2: Companion & Friendship
  const p2Text = KidSafetySanitizer.sanitizeContent(
    `As they explored deeper into the ${matchedWorld.title}, ${childName} met ${favoriteCharacter}, who was carrying a basket of warm ${favoriteFood}. To solve the friendly puzzle of the starlight gate, ${childName} remembered the importance of ${moralLesson.toLowerCase()} and shared the ${favoriteFood} with everyone. Everyone cheered happily!`
  );
  pages.push({
    pageNumber: 2,
    content: p2Text,
    illustrationUrl: DEFAULT_IMAGES[1],
    imagePrompt: `${illustrationStyle} picture of ${childName} practicing ${moralLesson.toLowerCase()} with ${favoriteCharacter} and ${favoriteAnimal}.`
  });

  // Page 3: Moral Lesson Climax
  const p3Text = KidSafetySanitizer.sanitizeContent(
    `The sky lit up with warm golden sparkles! A wise owl hovered above, praising ${childName} for demonstrating true ${moralLesson.toLowerCase()}. The owl handed over a silver star key that unlocked a chorus of gentle lullabies across the galaxy.`
  );
  pages.push({
    pageNumber: 3,
    content: p3Text,
    illustrationUrl: DEFAULT_IMAGES[2],
    imagePrompt: `${illustrationStyle} scene of ${childName} unlocking a glowing star key under a magical sky.`
  });

  if (pageCount >= 4) {
    const p4Text = KidSafetySanitizer.sanitizeContent(
      `Floating comfortably on clouds made of soft cotton candy, ${childName} nestled into a hammock of moonlight. The ${favoriteAnimal} curled up softly at the end of the bed, feeling safe and warm.`
    );
    pages.push({
      pageNumber: 4,
      content: p4Text,
      illustrationUrl: DEFAULT_IMAGES[3],
      imagePrompt: `${illustrationStyle} scene of ${childName} resting peacefully in a starry hammock.`
    });
  }

  if (pageCount >= 5) {
    const p5Text = KidSafetySanitizer.sanitizeContent(
      `With a quiet yawn, ${childName} tucked ${favoriteToy} under the warm covers back home. "Goodnight stars, goodnight ${matchedWorld.title}," whispered ${childName}. And as bedtime chimed softly, sweet dreams began.`
    );
    pages.push({
      pageNumber: 5,
      content: p5Text,
      illustrationUrl: matchedWorld.coverImage || DEFAULT_IMAGES[0],
      imagePrompt: `${illustrationStyle} bedtime scene of ${childName} sleeping peacefully.`
    });
  }

  const totalWords = pages.reduce((acc, p) => acc + p.content.split(' ').length, 0);

  return {
    id: `story-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title: `${childName} & the Secret of ${matchedWorld.title}`,
    childName,
    childAge,
    childGender: inputs.childGender,
    favoriteAnimal,
    favoriteColor,
    favoriteCharacter,
    favoritePlace,
    favoriteToy,
    favoriteFood,
    favoriteHobby: inputs.favoriteHobby || 'Stargazing',
    language,
    length,
    style,
    worldId: matchedWorld.id,
    moralLesson,
    voiceType: inputs.voiceType,
    narrationSpeed: inputs.narrationSpeed,
    illustrationStyle,
    tone,
    createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readingTimeMinutes: Math.ceil(totalWords / 75),
    wordCount: totalWords,
    difficulty: childAge <= 4 ? 'Easy' : childAge <= 7 ? 'Medium' : 'Advanced',
    pages,
    isFavorite: false,
    coverImage: matchedWorld.coverImage,
    summary: `A soothing bedtime journey in the ${matchedWorld.title} teaching ${childName} about ${moralLesson.toLowerCase()}.`
  };
};
