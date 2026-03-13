import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import Comments from '@/components/Comments';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-6 max-w-3xl">
        <header className="mb-12 text-center">
          <div className="flex justify-center gap-4 text-sm text-muted-foreground mb-4 font-sans">
            <time>{post.date}</time>
            <span className="text-secondary">{post.category.toUpperCase()}</span>
          </div>
          <h1 className="text-4xl md:text-5xl mb-6 text-primary leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="text-sm text-accent">#{tag}</span>
            ))}
          </div>
        </header>

        <div className="prose prose-invert prose-blue max-w-none 
          prose-headings:font-serif prose-headings:text-primary 
          prose-p:text-foreground/90 prose-p:leading-relaxed
          prose-blockquote:border-r-4 prose-blockquote:border-secondary prose-blockquote:bg-muted/30 prose-blockquote:p-4
          prose-code:text-accent prose-code:bg-muted/50 prose-code:p-1 prose-code:rounded">
          <MDXRemote 
            source={post.content} 
            options={{
              mdxOptions: {
                remarkPlugins: [remarkMath, remarkGfm],
                rehypePlugins: [rehypeKatex],
              }
            }}
          />
        </div>

        {/* Comments Section */}
        <Comments />
      </div>
    </article>
  );
}
