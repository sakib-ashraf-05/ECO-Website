import React, { useState, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Loading from './Loading';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const NoixorgoPage = lazy(() => import('./pages/NoixorgoPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const HelpUsPage = lazy(() => import('./pages/HelpUsPage'));

/** How long the splash runs, fade included. Full length the very first time this
 *  browser loads the site, a short version on every visit after that. */
const SPLASH_SEEN_KEY = 'eco-splash-seen';
const FIRST_VISIT_MS = 3000;
const RETURNING_VISIT_MS = 1000;

function getSplashDuration() {
  try {
    return localStorage.getItem(SPLASH_SEEN_KEY) ? RETURNING_VISIT_MS : FIRST_VISIT_MS;
  } catch {
    return FIRST_VISIT_MS; // storage blocked (private mode): always show the full splash
  }
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [splashDuration] = useState(getSplashDuration);

  const handleLoadingComplete = () => {
    try {
      localStorage.setItem(SPLASH_SEEN_KEY, '1');
    } catch {
      // storage blocked: next visit simply replays the full splash
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading duration={splashDuration} onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Navbar />
      
      <AnimatePresence mode="wait">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-12 h-12 border-4 border-[#3FAE5C] border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/noixorgo" element={<NoixorgoPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:blogId" element={<BlogPostPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/help-us" element={<HelpUsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      
      <Footer />
    </div>
  );
}