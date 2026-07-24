import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { StoryProvider, useStory } from './context/StoryContext';
import { EnvironmentProvider } from './context/EnvironmentContext';

import { GlobalDreamBackground } from './components/common/GlobalDreamBackground';
import { FloatingDock } from './components/layout/FloatingDock';
import { FloatingMusicPlayer } from './components/layout/FloatingMusicPlayer';
import { RoomTopBar } from './components/layout/RoomTopBar';
import { AuthModal } from './components/layout/AuthModal';

import { WeatherEffects } from './components/environment/WeatherEffects';
import { SleepModeOverlay } from './components/environment/SleepModeOverlay';

import { DreamRoomHub } from './components/room/DreamRoomHub';
import { DreamForestHub } from './components/forest/DreamForestHub';
import { StoryWorldsGrid } from './components/worlds/StoryWorldsGrid';
import { WorldRealmDetail } from './components/worlds/WorldRealmDetail';
import { MagicalStoryWizard } from './components/story/MagicalStoryWizard';
import { MagicBookLoader } from './components/story/MagicBookLoader';
import { WoodenBookshelf } from './components/library/WoodenBookshelf';
import { TreasureRoom } from './components/rewards/TreasureRoom';
import { ChildBedroom } from './components/profile/ChildBedroom';

import { ParentDashboardPage } from './pages/ParentDashboardPage';
import { GalleryPage } from './pages/GalleryPage';
import { PricingPage } from './pages/PricingPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { AuthPage } from './pages/AuthPage';
import { StoryViewPage } from './pages/StoryViewPage';

const CreateStoryFlow: React.FC = () => {
  const { isGenerating, activeStory } = useStory();
  const navigate = useNavigate();

  const handleComplete = () => {
    if (activeStory) {
      navigate(`/story/${activeStory.id}`);
    } else {
      navigate('/library');
    }
  };

  if (isGenerating) {
    return <MagicBookLoader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      <MagicalStoryWizard onComplete={handleComplete} />
    </div>
  );
};

/** Determines if the current route is the Dream Room (fullscreen, self-contained) */
const AppInner: React.FC = () => {
  const location = useLocation();
  const isRoom = location.pathname === '/' || location.pathname === '/room';

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-dream-purple/30 text-slate-100 relative overflow-x-hidden">
      {!isRoom && (
        <>
          {/* Global Animated Disney/Ghibli Background */}
          <GlobalDreamBackground />
          {/* Weather Effects Particle Overlay */}
          <WeatherEffects />
          {/* Sleep Mode Overlay & Countdown Banner */}
          <SleepModeOverlay />
          {/* Unified Room Top Bar */}
          <RoomTopBar />
        </>
      )}

      {/* Main Content Area */}
      <div className={isRoom ? 'relative z-10' : 'relative z-10 pb-28 pt-16'}>
        <Routes>
          {/* Primary Interactive Dream Room Hub */}
          <Route path="/" element={<DreamRoomHub />} />
          <Route path="/room" element={<DreamRoomHub />} />

          {/* 12 Story Worlds Catalog & Realm Detail */}
          <Route path="/worlds" element={<StoryWorldsGrid />} />
          <Route path="/world/:id" element={<WorldRealmDetail />} />

          <Route path="/forest" element={<DreamForestHub />} />
          <Route path="/create" element={<CreateStoryFlow />} />
          <Route path="/generate" element={<CreateStoryFlow />} />
          <Route path="/story/:id" element={<StoryViewPage />} />
          <Route path="/library" element={<WoodenBookshelf />} />
          <Route path="/my-stories" element={<WoodenBookshelf />} />
          <Route path="/narrator" element={<StoryViewPage />} />
          <Route path="/rewards" element={<TreasureRoom />} />
          <Route path="/achievements" element={<TreasureRoom />} />
          <Route path="/parents" element={<ParentDashboardPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={<ChildBedroom />} />
          <Route path="/login" element={<AuthPage />} />
        </Routes>
      </div>

      {/* Floating Bottom Music Player & Glass Dock (non-room pages) */}
      {!isRoom && (
        <>
          <FloatingMusicPlayer />
          <FloatingDock />
        </>
      )}

      {/* Auth Modal */}
      <AuthModal />
    </div>
  );
};

      {/* Auth Modal */}
      <AuthModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StoryProvider>
          <EnvironmentProvider>
            <Router>
              <AppInner />
            </Router>
          </EnvironmentProvider>
        </StoryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
