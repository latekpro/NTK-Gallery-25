# Product Requirements Document (PRD)

## Product Name
**NTK-Speakers-Gallery**

---

## Objective
Build a visually stunning web application that showcases all speakers from the NTK conference by fetching their data from the NTK public schedule API. The application should present the speakers’ images and profiles in an engaging, dynamic gallery that is delightful for visual users.

---

## Stakeholders
- Visual conference attendees
- NTK conference organizers
- Web development team (ReactJS + NodeJS)
- Designers

---

## Target Audience
- Attendees of the NTK conference who want to explore speakers visually
- Anyone interested in discovering NTK speakers with an emphasis on imagery

---

## Application Architecture
- **Frontend:** ReactJS (SPA, responsive, visually rich, supports animations)
- **Backend:** NodeJS (API proxy, data processing, CORS handling)
- **External API:** [NTK Schedule API](https://www.ntk.si/api/clientapi/schedule)

---

## Features

### 1. Speaker Gallery (Core Feature)
- Fetch all speakers, including their names, profile pictures, and relevant links, from the NTK schedule API.
- Display speakers in a dynamic, responsive, and visually engaging grid or masonry gallery.
- Each speaker tile/card features:
    - High-res profile picture (with fallback if missing)
    - Name, title/role, and a short description (if available)
    - Clickable: opens a modal or card flip with more info, bio, and talk details (if available)
- Support for lazy loading/infinite scroll for large lists.

### 2. Visual Flourishes
- Animated card hover effects (flip, zoom, parallax, or glow)
- Soft shadows and floating elements for depth
- Subtle background gradients or animated shapes
- Optional light/dark mode toggle
- Animated header/banner with NTK branding

### 3. Search & Filter
- Live search by name, title, or topic
- Tag-based filtering (e.g., “AI”, “Cloud”, “Security” if tags exist)
- Filter speakers by session day/time (if available)

### 4. Profile Modal
- On click, show a modal with full speaker details:
    - Larger profile image
    - Full name and titles
    - Biography
    - List of talks/sessions with date/time, abstract, location
    - Links to social media or personal pages (if available)

### 5. Responsive Design
- Mobile-first, grid adapts to screen size
- Touch-friendly interactions
- Fast, smooth transitions

### 6. Backend (NodeJS)
- Proxy requests to NTK API, handle CORS and rate limiting
- Optionally cache data for performance
- Normalize and clean up speaker data for frontend consumption

---

## Visual/UX Inspirations
- [Unsplash](https://unsplash.com) for gallery layout and image loading
- [Pinterest](https://pinterest.com) for masonry grid
- [Material-UI](https://mui.com) for modern React components
- [Apple Music Artists](https://music.apple.com/us/browse/artists) for animated artist cards
- Subtle micro-interactions (e.g., [Lottie animations](https://lottiefiles.com/))

---

## User Flow

1. **Landing:** User arrives at the NTK-Speakers-Gallery, greeted by NTK-branded animated header.
2. **Gallery:** User sees grid of speaker cards, can scroll, search, or filter.
3. **Interact:** Hover/tap on a card animates it; click opens profile modal with details.
4. **Explore:** User closes modal, continues browsing, or shares a speaker profile link.
5. **Mobile:** User can swipe between cards or use sticky search/filter bar.

---

## Technical Requirements

### Frontend
- ReactJS 18+ (with hooks)
- CSS-in-JS (Styled Components or Emotion)
- Masonry or grid layout library (e.g., react-masonry-css)
- Modal/dialog library (e.g., Material-UI, React Modal)
- Animation library (e.g., Framer Motion, GSAP)
- Responsive image loading (srcset, lazy loading)
- Accessible (ARIA, keyboard navigation)

### Backend
- NodeJS 18+ (Express)
- Axios or node-fetch for API calls
- CORS and simple cache (memory or Redis)
- Environment config for API endpoints

---

## Data Model (Frontend Example)
```js
{
  id: string,
  name: string,
  title: string,
  bio: string,
  imageUrl: string,
  talks: [
    {
      id: string,
      title: string,
      abstract: string,
      dateTime: string,
      location: string
    }
  ],
  tags: [string],
  socialLinks: [{ type: string, url: string }]
}
```

---

## Out of Scope
- Speaker/talk ratings or comments
- Editing speaker data
- Authentication/authorization

---

## Success Metrics
- All speakers from NTK API shown with images and info
- No broken images or major layout glitches
- Fast load time (<2s to interactive)
- Visual engagement: users spend >60s browsing, high click-through to speaker profiles
- Mobile and desktop usability

---

## Deliverables
- ReactJS frontend with animated gallery, modal, search/filter
- NodeJS backend proxy and data normalizer
- Figma/Sketch mockups of gallery and modal (optional, for design phase)
- README and setup instructions

---

## Timeline
1. **Design/Mockups:** 3 days
2. **Backend/API:** 2 days
3. **Frontend core gallery:** 3 days
4. **Animations & polish:** 2 days
5. **Testing & deploy:** 2 days

---

## Notes for Developers
- Focus on visual delight—use color, motion, and imagery
- Make it fast and smooth, even for large speaker lists
- Use placeholders for missing images or bios

---

## Appendix

### API Reference
- [NTK Schedule API](https://www.ntk.si/api/clientapi/schedule)
    - Fetch all sessions, extract unique speakers
    - Speaker fields: name, photo, description, social, etc.

---
