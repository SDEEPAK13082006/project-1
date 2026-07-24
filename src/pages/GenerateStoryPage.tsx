import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StoryGeneratorForm } from '../components/story/StoryGeneratorForm';
import { useStory } from '../context/StoryContext';

export const GenerateStoryPage: React.FC = () => {
  const { activeStory } = useStory();
  const navigate = useNavigate();

  const handleStoryGenerated = () => {
    if (activeStory) {
      navigate(`/story/${activeStory.id}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      <StoryGeneratorForm onStoryGenerated={handleStoryGenerated} />
    </div>
  );
};
