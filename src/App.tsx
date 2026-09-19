/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { Footer } from './components/common/Footer';
import { CommandPalette } from './components/common/CommandPalette';
import { Toast } from './components/common/Toast';
import { MyPathDrawer } from './components/common/MyPathDrawer';
import { HomeView } from './views/HomeView';
import { FullMapView } from './views/FullMapView';
import { CapabilityView } from './views/CapabilityView';
import { LearningPathsView } from './views/LearningPathsView';
import { CommandsView } from './views/CommandsView';
import { PlaybooksView } from './views/PlaybooksView';
import { GeneratorsView } from './views/GeneratorsView';
import { PromptLabView } from './views/PromptLabView';
import { DashboardView } from './views/DashboardView';
import { LearnView } from './views/LearnView';

const MainRouter: React.FC = () => {
  const { activeView } = useApp();

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView />;
      case 'map':
        return <FullMapView />;
      case 'capabilities':
        return <CapabilityView />;
      case 'learn':
        return <LearnView />;
      case 'learning-paths':
        return <LearningPathsView />;
      case 'commands':
        return <CommandsView />;
      case 'playbooks':
        return <PlaybooksView />;
      case 'generators':
      case 'claude-md-generator':
      case 'skill-generator':
      case 'subagent-generator':
        return <GeneratorsView />;
      case 'prompt-lab':
        return <PromptLabView />;
      case 'dashboard':
        return <DashboardView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070B16] text-slate-100 selection:bg-purple-500/30 selection:text-purple-200">
      {/* Global Navbar */}
      <Navbar />

      {/* Primary Routed View */}
      <main className="flex-1 pb-16 lg:pb-0">
        {renderView()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Mobile Thumb Navigation */}
      <MobileBottomNav />

      {/* Global Modal Command Palette (Cmd+K) */}
      <CommandPalette />

      {/* User Learning Path Slideout Panel */}
      <MyPathDrawer />

      {/* System Toast Floating Feedback */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
