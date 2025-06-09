# Astro Homepage Migration Plan

## Overview
Migrate the current Next.js personal website to Astro while maintaining all functionality, design, and content structure.

## Phase 1: Setup & Configuration
- [x] Configure Astro for MDX and content collections
- [x] Set up Tailwind CSS with typography plugin
- [x] Create content collections for blog posts from `/content/writings/`
- [x] Configure fonts (Poppins for headings, Work Sans for body)
- [x] Set up CSS variables for theming

## Phase 2: Core Components
- [x] Create Layout component with Header and Footer
- [x] Build Header component with:
  - [x] Logo
  - [x] Navigation (Writings, Bookshelf, caffeineletter, Newsletter, Podcast)
  - [x] Dark/light theme toggle
  - [x] Mobile responsive menu
- [x] Build Footer component with social links and theme switcher
- [x] Implement dark mode functionality

## Phase 3: Homepage Implementation
- [ ] Create homepage layout showing:
  - [ ] Brief bio/introduction section
  - [ ] 3 most recent posts (mix of blog posts and memos)
  - [ ] Post cards with:
    - [ ] Banner image (if available)
    - [ ] Title
    - [ ] First 150 characters of content
  - [ ] Sections for podcast and speaking engagements

## Phase 4: Blog Features
- [ ] Create writings page with:
  - [ ] All posts and memos combined
  - [ ] Filter buttons (All, Blog posts, Memos)
  - [ ] Grid layout (2 columns on desktop)
  - [ ] Cards with dynamic heights based on banner presence
  - [ ] Relative dates for memos
  - [ ] Reading time display
- [ ] Implement reading time calculation
- [ ] Support for wiki-style links in memos (`[[link]]` syntax)

## Phase 5: Content Migration
- [ ] Set up content collections matching Contentlayer structure:
  - [ ] Post: Blog posts
  - [ ] Memo: Short-form content
  - [ ] Note: Handwritten notes
  - [ ] Talk: Conference talks
  - [ ] Letter: Newsletter content
  - [ ] BookNote: Book reviews
- [ ] Maintain frontmatter structure:
  ```yaml
  title: string
  date: date
  description: string
  published: boolean (optional)
  banner: string (optional)
  bannercaption: string (optional)
  tags: string (optional)
  ```

## Phase 6: Polish & Features
- [ ] Add SEO meta tags
- [ ] Generate RSS feed
- [ ] Image optimization (migrate from ImageKit)
- [ ] Test responsive design across devices
- [ ] Verify all MDX custom components work
- [ ] Test dark/light theme persistence

## Technical Stack
- **Framework**: Astro
- **Styling**: Tailwind CSS + @tailwindcss/typography
- **Content**: MDX with Astro Content Collections
- **Fonts**: Poppins (headings), Work Sans (body)
- **Theme**: CSS variables with dark/light mode support