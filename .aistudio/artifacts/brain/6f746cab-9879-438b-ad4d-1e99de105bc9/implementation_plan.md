# Desktop iPhone Preview for Account Login, Intro Slides & Settings

## Summary
Provide desktop developers and reviewers the ability to preview the Account Login flow, Post-Signup Intro Slides, and Account Settings modal directly inside the simulated iPhone 15 Pro device frame. This is **strictly a desktop previewing tool** and does not alter the core mobile app or display any preview toggles to real mobile users.

---

> [!IMPORTANT]
> **Preview-Only Guarantee**: On real mobile devices (screens $< 768\text{px}$), all preview buttons and simulated bezel frames remain completely hidden. Real iPhone and Android users always see the 100% native mobile app with touch-first ergonomics, full-bleed screen layouts, and zero preview artifacts.

- **Confirmed Decision 1**: The preview toggle is strictly for desktop/laptop inspection. Real mobile devices automatically run in native mobile mode.
- **Confirmed Decision 2**: When toggled on desktop, the Login screen, Intro Slides, and Settings modal render directly inside the centered iPhone device frame (with the iOS status bar and Dynamic Island) instead of expanding into wide desktop popups.
- **Confirmed Decision 3**: The desktop view switcher (`iPhone View` ↔ `Full View`) remains accessible on desktop even when the login screen or settings modal is active, via a top-right floating desktop pill.

---

## 1. Overview & Core Concept
- **What It Does**: Allows testing and previewing every stage of the application—unauthenticated Login/Signup, 4-step Post-Signup Intro onboarding, and Account Settings—inside the simulated iPhone frame on desktop screens.
- **Target Audience**: App creators and reviewers previewing mobile ergonomics and visual hierarchy from a desktop browser before shipping.
- **Key Value**: Guarantees zero surprise layouts when transitioning between auth, onboarding, and dashboard views on mobile.

---

## 2. User Experience & Visual Design
- **Desktop Preview Behavior**:
  - A discrete desktop preview pill (`iPhone View` / `Full View`) floats in the top-right corner of desktop viewports (`hidden md:flex z-50 fixed top-4 right-4`), ensuring it is always clickable even if the user is logged out or viewing Settings.
  - When **iPhone View** is selected:
    - **Login / Signup Screen**: Renders directly inside the 412px iPhone frame, complete with iOS status bar (`9:41 · 5G · 100%`), compact logo, touch inputs, and full-width buttons.
    - **Intro Slides**: The 4 swipeable financial onboarding cards fit cleanly inside the iPhone container with bottom pagination dots and primary action button.
    - **Settings Modal**: Opens directly within the iPhone frame as a native iOS bottom sheet or framed view rather than a giant desktop overlay.
- **Real Mobile Device Behavior (Unchanged & Pure)**:
  - When opened on any real iPhone, iPad, or Android phone, the floating preview pill is completely omitted (`hidden md:flex`).
  - The login screen, intro slides, and settings naturally take up the native device screen without bezels or outer padding.

---

## 3. Key Product Decisions & Trade-Offs
- **Decision 1: Floating Desktop-Only View Switcher**:
  - *Chosen Approach*: Render the view switcher in a fixed desktop floating pill (`fixed top-4 right-4 hidden md:flex`) so it is accessible on every screen, including the pre-login state and settings.
  - *Why*: Eliminates the issue where the header navigation is hidden behind auth modals.
- **Decision 2: Modal In-Frame Nesting in iPhone Mode**:
  - *Chosen Approach*: When `mobilePhoneFrameMode` is active on desktop, `AuthAndIntroModal` and `SettingsModal` render inside the iPhone frame container rather than at the root `body` level.
  - *Why*: Gives a 1:1 preview of the exact mobile viewport bounds.

---

## 4. Technical Architecture & Component Flow

```
┌─────────────────────────────────────────────────────────────┐
│ Desktop Viewport (1440px)                                   │
│                                                             │
│  [Floating Toggle: iPhone View ↔ Full View] (Desktop Only)  │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ iPhone 15 Pro Bezel Frame (412px × 820px)             │  │
│  │  - iOS Status Bar (9:41, Dynamic Island, 5G)          │  │
│  │                                                       │  │
│  │  [ Active Content View inside Frame ]                 │  │
│  │    • Unauthenticated: Mobile Login / Signup           │  │
│  │    • Post-Signup: Mobile Intro Slides 1-4             │  │
│  │    • Authenticated: Home / Modules / Cards / Compare  │  │
│  │    • Overlay State: Native iOS-Style Settings Sheet   │  │
│  │                                                       │  │
│  │  - iOS Bottom Navigation / Home Indicator             │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### State & Handler Integration
- `mobilePhoneFrameMode`: Persisted in component state (defaults to desktop full view or toggleable).
- `AuthAndIntroModal.tsx`: Accepts `inPhoneFrame?: boolean` to render full-bleed within the iPhone shell when active.
- `SettingsModal.tsx`: Accepts `inPhoneFrame?: boolean` to render within the iPhone shell when active.
