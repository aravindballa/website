# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `yarn dev` - Start the Next.js development server
- `yarn dev:content` - Run Contentlayer in development mode (watches content changes)

### Build
- `yarn build:content` - Build content with Contentlayer
- `yarn build` - Build the Next.js application
- `yarn postbuild` - Generate sitemap after build (runs automatically)

### Other
- `yarn start` - Start production server
- `yarn rss` - Generate RSS feed

## Architecture

This is a personal website built with Next.js 13+, TypeScript, and Contentlayer for content management.

### Content Structure
The site uses Contentlayer to manage markdown/MDX content with these document types:
- **Post**: Blog posts in `/content/writings/`
- **Memo**: Short-form content in `/content/memos/`
- **Note**: Handwritten notes with images in `/content/notes/`
- **Talk**: Conference talks in `/content/talks/`
- **Letter**: Newsletter content in `/content/hackletter/`
- **BookNote**: Book reviews/notes in `/content/bookshelf/`

### Key Technologies
- **Next.js** with pages router (not app router, except for `/app/api/rss.xml/`)
- **Contentlayer** for type-safe content management
- **Tailwind CSS** for styling
- **MDX** support with custom components
- **Vercel OG** for generating open graph images

### Important Patterns
1. All content files support frontmatter with fields like `title`, `date`, `description`, `published`
2. Wiki-style links are supported in memos using `[[link]]` syntax
3. Custom MDX components are defined in `/components/mdxComponents.jsx`
4. The site uses `use-dark-mode` for theme switching
5. Analytics integration with custom script rewrites

### API Routes
- `/api/og.tsx` - Open Graph image generation
- `/api/booksbunny.ts` - Books data endpoint
- `/api/hackletter-submission.js` - Newsletter submission handler

### Content Management
When adding new content:
- Place files in the appropriate content subdirectory
- Include required frontmatter fields based on document type
- Use `.md` or `.mdx` extensions
- Slugs are automatically generated from filenames