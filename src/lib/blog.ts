import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
  category: 'logic' | 'islamic' | 'tech' | 'other';
}

function processContent(content: string): string {
  return content
    // Escape curly braces that are not already escaped
    .replace(/(?<!\\){/g, '\\{')
    .replace(/(?<!\\)}/g, '\\}')
    // Handle Obsidian highlights ==text== -> <mark>text</mark>
    .replace(/==([^=]+)==/g, '<mark>$1</mark>')
    // Handle Wikilinks [[Link]] -> [Link](/blog/Link) or [[Link|Display]] -> [Display](/blog/Link)
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, link, display) => {
      const href = `/blog/${link.trim().replace(/\s+/g, '-')}`;
      return `[${(display || link).trim()}](${href})`;
    });
}

export function getAllPosts(): PostData[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        content: processContent(content),
        title: data.title || slug,
        date: data.date || '',
        tags: data.tags || [],
        excerpt: data.excerpt || '',
        category: data.category || 'other',
      } as PostData;
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): PostData | null {
  const decodedSlug = decodeURIComponent(slug);
  const possiblePaths = [
    path.join(postsDirectory, `${decodedSlug}.mdx`),
    path.join(postsDirectory, `${decodedSlug}.md`),
    path.join(postsDirectory, decodedSlug),
  ];
  
  let fullPath = '';
  for (const p of possiblePaths) {
    if (fs.existsSync(p) && !fs.lstatSync(p).isDirectory()) {
      fullPath = p;
      break;
    }
  }

  if (!fullPath) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: decodedSlug.replace(/\.mdx?$/, ''),
    content: processContent(content),
    title: data.title || decodedSlug,
    date: data.date || '',
    tags: data.tags || [],
    excerpt: data.excerpt || '',
    category: data.category || 'other',
  } as PostData;
}
