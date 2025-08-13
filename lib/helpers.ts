// lib/helpers.ts
export function keywordsToString(keywords: string[]): string {
  return JSON.stringify(keywords);
}

export function keywordsFromString(keywordsString: string): string[] {
  try {
    return JSON.parse(keywordsString);
  } catch {
    return [];
  }
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}