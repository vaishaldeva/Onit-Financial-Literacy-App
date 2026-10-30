import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

let activeModalLockCount = 0;
let savedHtmlOverflow = '';
let savedBodyOverflow = '';
let savedHtmlOverscroll = '';
let savedBodyOverscroll = '';

function lockExternalPageScroll() {
  if (typeof document === 'undefined') return;
  if (activeModalLockCount === 0) {
    const html = document.documentElement;
    const body = document.body;
    savedHtmlOverflow = html.style.overflow;
    savedBodyOverflow = body.style.overflow;
    savedHtmlOverscroll = html.style.overscrollBehavior;
    savedBodyOverscroll = body.style.overscrollBehavior;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';
    body.style.overscrollBehavior = 'none';
    html.setAttribute('data-secondary-modal-open', 'true');
    body.setAttribute('data-secondary-modal-open', 'true');

    const mainEl = document.querySelector('main');
    if (mainEl instanceof HTMLElement) {
      mainEl.dataset.prevOverflowY = mainEl.style.overflowY || '';
      mainEl.style.overflowY = 'hidden';
    }
  }
  activeModalLockCount += 1;
}

function unlockExternalPageScroll() {
  if (typeof document === 'undefined') return;
  activeModalLockCount = Math.max(0, activeModalLockCount - 1);
  if (activeModalLockCount === 0) {
    const html = document.documentElement;
    const body = document.body;
    html.style.overflow = savedHtmlOverflow;
    body.style.overflow = savedBodyOverflow;
    html.style.overscrollBehavior = savedHtmlOverscroll;
    body.style.overscrollBehavior = savedBodyOverscroll;
    html.removeAttribute('data-secondary-modal-open');
    body.removeAttribute('data-secondary-modal-open');

    const mainEl = document.querySelector('main');
    if (mainEl instanceof HTMLElement) {
      mainEl.style.overflowY = mainEl.dataset.prevOverflowY || '';
      delete mainEl.dataset.prevOverflowY;
    }
  }
}

export interface SecondaryModalOverlayProps {
  ariaLabel: string;
  onClose: () => void;
  isPhoneView?: boolean;
  maxWidthClass?: string;
  header: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  cardClassName?: string;
  bodyClassName?: string;
}

/**
 * Unified Secondary Screen / Modal Overlay that:
 * 1. Locks all external/background scrolling (html, body, and <main>) while open.
 * 2. Portals to the top-level container so no parent transform or header clips the top.
 * 3. Keeps the header pinned at the top (shrink-0) so it is never cut off on load.
 * 4. Provides a single dedicated scroll container that resets to scrollTop = 0 on open.
 */
export const SecondaryModalOverlay: React.FC<SecondaryModalOverlayProps> = ({
  ariaLabel,
  onClose,
  isPhoneView = false,
  maxWidthClass = 'max-w-2xl',
  header,
  footer,
  children,
  cardClassName = 'bg-[#0E121A] border border-white/15',
  bodyClassName = 'px-5 pt-4 pb-6 sm:px-7 sm:pt-5 sm:pb-7 space-y-5',
}) => {
  const scrollBodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lockExternalPageScroll();
    if (scrollBodyRef.current) {
      scrollBodyRef.current.scrollTop = 0;
    }
    return () => {
      unlockExternalPageScroll();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (typeof document === 'undefined') return null;

  const phoneFrameEl = isPhoneView
    ? document.getElementById('onit-phone-frame')
    : null;
  const portalTarget = phoneFrameEl || document.body;

  const overlayContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onClick={onClose}
      className={
        phoneFrameEl
          ? 'absolute inset-0 z-[120] bg-black/85 backdrop-blur-xl flex flex-col justify-start p-3 overflow-hidden'
          : 'fixed inset-0 z-[120] bg-black/85 backdrop-blur-xl flex flex-col items-center justify-start sm:justify-center px-3 sm:px-6 pt-[max(calc(env(safe-area-inset-top,0px)+0.75rem),1rem)] pb-[max(calc(env(safe-area-inset-bottom,0px)+0.75rem),1rem)] overflow-hidden'
      }
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full ${
          phoneFrameEl ? 'h-full rounded-[28px]' : `${maxWidthClass} max-h-full rounded-[28px] sm:rounded-[32px]`
        } flex flex-col overflow-hidden shadow-2xl ${cardClassName}`}
      >
        {/* Fixed Top Header — Never Cut Off or Scrolled Out of View */}
        <div className="shrink-0 border-b border-white/10 bg-inherit">
          {header}
        </div>

        {/* Single Active Scroll Container */}
        <div
          ref={scrollBodyRef}
          data-secondary-scroll-body="true"
          className={`flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y [-webkit-overflow-scrolling:touch] ${bodyClassName}`}
        >
          {children}
        </div>

        {footer && (
          <div className="shrink-0 border-t border-white/10 bg-inherit">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(overlayContent, portalTarget);
};
