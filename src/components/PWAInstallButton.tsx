import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Download, Smartphone, Share, PlusSquare, CheckCircle2, X, WifiOff } from 'lucide-react';
import { usePWAInstall, useOnlineStatus } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  compact?: boolean;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    if (!showIOSGuide) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowIOSGuide(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showIOSGuide]);

  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowIOSGuide(true);
    }
  };

  const modalContent = showIOSGuide && typeof document !== 'undefined'
    ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Install Onit on iPhone or iPad"
          onClick={() => setShowIOSGuide(false)}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md px-[22px] pt-[max(3.75rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-panel-elevated w-full max-w-md max-h-[82dvh] overflow-y-auto my-auto rounded-3xl p-5 sm:p-6 border border-white/15 space-y-4 shadow-2xl relative"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-slate-950 font-extrabold text-sm shrink-0 shadow-md">
                  ONIT
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Installable iOS Web App
                  </p>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    Add Onit to Your iPhone Home Screen
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                aria-label="Close iOS install guide"
                className="min-h-[40px] min-w-[40px] shrink-0 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center cursor-pointer transition-all"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Install <strong>Onit: Own Your Future</strong> directly onto your iPhone for a full-screen native app experience, home screen icon, and instant offline access to all modules and card comparisons:
            </p>

            <div className="space-y-2.5">
              <div className="rounded-2xl bg-slate-950/90 border border-white/10 p-3.5 flex items-start gap-3">
                <div className="h-8 w-8 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                  <Share className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="text-xs text-slate-200">
                  <p className="font-bold text-white">1. Tap the Share button in Safari</p>
                  <p className="text-slate-400 mt-0.5">
                    Look for the square icon with an upward arrow at the bottom of your iPhone screen.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-950/90 border border-white/10 p-3.5 flex items-start gap-3">
                <div className="h-8 w-8 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5">
                  <PlusSquare className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="text-xs text-slate-200">
                  <p className="font-bold text-white">2. Select &ldquo;Add to Home Screen&rdquo;</p>
                  <p className="text-slate-400 mt-0.5">
                    Scroll down the share sheet and tap <strong>Add to Home Screen</strong>, then tap <strong>Add</strong> in the top-right corner.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-950/90 border border-white/10 p-3.5 flex items-start gap-3">
                <div className="h-8 w-8 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                  <Smartphone className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="text-xs text-slate-200">
                  <p className="font-bold text-white">3. Launch Full-Screen from Your Home Screen</p>
                  <p className="text-slate-400 mt-0.5">
                    Open the <strong>Onit</strong> icon on your iPhone home screen—it launches in standalone full-screen mode with zero Safari address bars.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-300 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Works offline · Zero App Store wait</span>
              </div>

              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 text-xs font-bold shadow-md hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        aria-label={isIOS ? 'Install Onit on iPhone' : 'Install Onit App'}
        className={
          compact
            ? 'min-h-[34px] px-2.5 py-1 rounded-xl bg-emerald-400/15 hover:bg-emerald-400/25 border border-emerald-400/35 text-[11px] font-bold text-emerald-300 flex items-center gap-1 whitespace-nowrap cursor-pointer transition-colors'
            : 'px-3 py-2 text-xs font-semibold text-emerald-300 bg-emerald-500/12 hover:bg-emerald-500/20 border border-emerald-400/30 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer'
        }
      >
        <Download className="h-3.5 w-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
        <span className={compact ? 'inline' : 'hidden sm:inline'}>
          {isIOS ? 'Install iOS App' : 'Install App'}
        </span>
      </button>

      {modalContent}
    </>
  );
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-16 md:bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-500/95 px-3.5 py-2 text-xs font-bold text-slate-950 shadow-xl border border-amber-300"
    >
      <WifiOff className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>Offline Mode — All modules & card data available offline</span>
    </div>
  );
};
