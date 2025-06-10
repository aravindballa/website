export interface ReadwiseBook {
  id: number;
  title: string;
  author: string;
  category: string;
  num_highlights: number;
  last_highlight_at: string;
  updated: string;
  cover_image_url: string;
  highlights_url: string;
  source_url: null;
  asin: string;
  tags: string[];
}

export interface ReadwiseBooksResponse {
  results: ReadwiseBook[];
}

export interface ReadwiseHighlight {
  id: number;
  text: string;
  location: number;
  note: string;
  color: string;
  highlighted_at: string;
  created_at: string;
  updated_at: string;
  external_id: string;
  end_location: number;
  url: string;
  book_id: number;
  tags: string[];
  is_favorite: boolean;
  is_discard: boolean;
  readwise_url: string;
}

export interface ReadwiseHighlightsResponse {
  results: ReadwiseHighlight[];
}

export async function getReadwiseBooks(): Promise<ReadwiseBooksResponse> {
  try {
    const response = await fetch('https://readwise-kv.aravindballa.workers.dev/');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Readwise books:', error);
    return { results: [] };
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and dashes with single dash
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long'
  }).format(date);
}