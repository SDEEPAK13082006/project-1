import { Story } from '../types/story';

export const INITIAL_STORIES: Story[] = [
  {
    id: 'story-demo-1',
    title: 'Leo and the Whispering Dragon of Starlight',
    childName: 'Leo',
    childAge: 5,
    childGender: 'Boy',
    favoriteAnimal: 'Dragon',
    favoriteColor: 'Purple',
    favoriteCharacter: 'Captain Star',
    favoritePlace: 'Sky Castle',
    favoriteToy: 'Teddy Bear',
    favoriteFood: 'Pancakes',
    favoriteHobby: 'Stargazing',
    language: 'English',
    length: 'Medium',
    style: 'Fantasy',
    moralLesson: 'Kindness',
    voiceType: 'Mother',
    narrationSpeed: 1,
    illustrationStyle: '3D Pixar',
    tone: 'Calm',
    createdAt: 'Jul 24, 2026',
    readingTimeMinutes: 4,
    wordCount: 320,
    difficulty: 'Easy',
    isFavorite: true,
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    summary: 'Leo travels to Sky Castle with a friendly whispering dragon to learn why kindness shines brighter than stars.',
    pages: [
      {
        pageNumber: 1,
        content: 'High above the cozy town of Willow Creek, in a bed draped with purple blankets, 5-year-old Leo snuggled close to his teddy bear. Outside, a soft violet light flickered near the balcony. It was Barnaby, a tiny dragon with shimmering stardust wings! "Leo," Barnaby whispered gently, "the Stars of Kindness are dimming tonight, and we need a brave friend to help us glow again."',
        illustrationUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
        imagePrompt: '3D Pixar style illustration of a 5 year old boy with a purple blanket looking at a cute stardust dragon at the balcony under a moonlit sky.'
      },
      {
        pageNumber: 2,
        content: 'Hand in hand, Leo and Barnaby floated up toward Sky Castle on a staircase made of soft clouds. When they reached the central fountain, Captain Star was looking worried. "A grumpy cloud stole our warm light because no one offered it a warm pancake," Captain Star sighed. Leo smiled, opened his magical lunchbox, and handed his favorite blueberry pancake to the cloud.',
        illustrationUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop',
        imagePrompt: '3D Pixar style of Leo offering a pancake to a sleepy cloud in a starlight sky castle.'
      },
      {
        pageNumber: 3,
        content: 'The grumpy cloud tasted the pancake and immediately dissolved into a shower of warm, sparkling rain! "Kindness is the sweetest magic," cheered Captain Star. The entire sky ignited with brilliant purple and gold lights, playing a soft lullaby melody across the galaxy.',
        illustrationUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop',
        imagePrompt: '3D Pixar magic lights exploding in purple sky with happy dragon and star captain.'
      },
      {
        pageNumber: 4,
        content: 'Feeling warm and sleepy, Leo nestled back into his cozy bed as Barnaby tucked the purple blanket around his shoulders. "Goodnight, brave Leo," whispered Barnaby. Leo closed his eyes, sailing into the happiest dreams.',
        illustrationUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
        imagePrompt: 'Cozy Pixar bedroom with glowing stars on the ceiling and a sleeping boy.'
      }
    ]
  },
  {
    id: 'story-demo-2',
    title: 'Mia and the Coral Kingdom Adventure',
    childName: 'Mia',
    childAge: 6,
    childGender: 'Girl',
    favoriteAnimal: 'Dolphin',
    favoriteColor: 'Sky Blue',
    favoriteCharacter: 'Mermaid Princess',
    favoritePlace: 'Coral Reef',
    favoriteToy: 'Magic Wand',
    favoriteFood: 'Strawberries',
    favoriteHobby: 'Swimming',
    language: 'English',
    length: 'Short',
    style: 'Ocean',
    moralLesson: 'Teamwork',
    voiceType: 'Female',
    narrationSpeed: 0.9,
    illustrationStyle: 'Disney',
    tone: 'Adventure',
    createdAt: 'Jul 22, 2026',
    readingTimeMinutes: 3,
    wordCount: 260,
    difficulty: 'Easy',
    isFavorite: false,
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    summary: 'Mia dives into a glowing coral underwater world to help a dolphin family build a lighthouse made of seashells.',
    pages: [
      {
        pageNumber: 1,
        content: 'Mia loved the ocean waves. One evening, as the sky turned pale pink and sky blue, a playful dolphin named Splash bobbed in the water. "Mia! The coral lights are broken, and our fish friends cannot find their way to sleep," Splash clicked happily.',
        illustrationUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
        imagePrompt: 'Disney style underwater scene with a little girl swimming alongside a friendly dolphin.'
      },
      {
        pageNumber: 2,
        content: 'Mia used her magic wand to wave bubbles toward the dark coral reef. Working together with Splash and Mermaid Princess, they built a glowing seashell tower. Every sea creature helped carry one shell!',
        illustrationUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=800&auto=format&fit=crop',
        imagePrompt: 'Disney style glowing coral tower under the sea with mermaids and sea turtles.'
      },
      {
        pageNumber: 3,
        content: 'When the tower lit up, the whole ocean shimmered in peaceful blue light. Mia drifted back to her beach hammock, knowing that teamwork makes any task easy and fun. Goodnight, deep blue sea!',
        illustrationUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop',
        imagePrompt: 'Peaceful sunset over calm ocean waves with glowing seashells on the shore.'
      }
    ]
  }
];
