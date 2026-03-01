// app/pwa-register.tsx  (or in layout with useEffect)
'use client';

import { useEffect, useState } from 'react';

export function PWARegister() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registered:', registration);
          })
          .catch((error) => {
            console.log('Service Worker registration failed:', error);
          });
      });
    }

    // Handle PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to install prompt: ${outcome}`);
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
  };

  if (!showInstallPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg shadow-lg p-4 flex items-center justify-between animate-in slide-in-from-bottom-4">
      <div>
        <p className="font-semibold">Install Math Fast</p>
        <p className="text-sm opacity-90">
          Play offline and access from your home screen
        </p>
      </div>
      <div className="flex gap-2 ml-4">
        <button
          onClick={handleInstallClick}
          className="px-4 py-2 bg-white text-indigo-600 rounded font-semibold hover:bg-gray-100 transition whitespace-nowrap"
        >
          Install
        </button>
        <button
          onClick={handleDismiss}
          className="px-3 py-2 hover:bg-indigo-500 rounded transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
