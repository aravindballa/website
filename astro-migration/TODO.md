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

- [x] Create homepage layout showing:
  - [x] Brief bio/introduction section
  - [x] 3 most recent posts (mix of blog posts and memos)
  - [x] Post cards with:
    - [x] Banner image (if available)
    - [x] Title
    - [x] First 150 characters of content
  - [x] Sections for podcast and speaking engagements

## Phase 4: Blog Features

- [x] Create writings page with:
  - [x] All posts and memos combined
  - [x] Filter buttons (All, Blog posts, Memos)
  - [x] Grid layout (2 columns on desktop)
  - [x] Cards with dynamic heights based on banner presence
  - [x] Relative dates for memos
  - [x] Reading time display
- [x] Implement reading time calculation
- [ ] Support for wiki-style links in memos (`[[link]]` syntax)

## Phase 5: Content Migration

- [x] Set up content collections matching Contentlayer structure:
  - [x] Post: Blog posts (writings)
  - [x] Memo: Short-form content
  - [x] Note: Handwritten notes
  - [x] Talk: Conference talks
  - [x] Letter: Newsletter content (hackletter)
  - [x] BookNote: Book reviews (bookshelf)
- [x] Maintain frontmatter structure:
  ```yaml
  title: string
  date: date
  description: string
  published: boolean (optional)
  banner: string (optional)
  bannercaption: string (optional)
  tags: string (optional)
  ```
- [x] Copy all real content from /content/ directory
- [x] Create individual post pages for all content types
- [x] Update homepage and writings page to use real content

## Phase 6: Polish & Features

- [x] Add SEO meta tags
- [x] Generate RSS feed
- [x] Create pages for all content collections (talks, notes, hackletter)
- [ ] Image optimization (use the same from ImageKit)
- [ ] Test responsive design across devices
- [ ] Verify all MDX custom components work
- [ ] Test dark/light theme persistence

## Additional Features Implemented

- [x] Reading time calculation for all posts and memos
- [x] Enhanced SEO with Open Graph and Twitter Card meta tags
- [x] RSS feed generation for all published content
- [x] Individual pages for all content types
- [x] Proper content schema validation with nullable fields
- [x] Dark/light theme toggle with persistence
- [x] Mobile responsive navigation
- [x] Content filtering on writings page

## Technical Stack

- **Framework**: Astro
- **Styling**: Tailwind CSS + @tailwindcss/typography
- **Content**: MDX with Astro Content Collections
- **Fonts**: Poppins (headings), Work Sans (body)
- **Theme**: CSS variables with dark/light mode support
