import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: selectedCategory } = await searchParams;
  const allPosts = getAllPosts();
  
  const categories = [
    { id: 'all', name: 'جميع المسارات', icon: '🌲' },
    { id: 'logic', name: 'المنطق', icon: '⚖️' },
    { id: 'islamic', name: 'العلوم الشرعية', icon: '📖' },
    { id: 'tech', name: 'الذكاء الاصطناعي', icon: '💻' },
  ];

  const filteredPosts = selectedCategory && selectedCategory !== 'all'
    ? allPosts.filter(post => post.category === selectedCategory)
    : allPosts;

  return (
    <div className="min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-16 h-[1px] bg-primary"></span>
            <h1 className="text-4xl md:text-6xl font-serif">سِجِلّ الأبحاث</h1>
          </div>
          <p className="text-xl text-muted max-w-2xl leading-relaxed">
            توثيق للمراحل البحثية في المختبر، من التأسيس المنطقي إلى النمذجة الرياضية والبرمجية.
          </p>
        </header>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-20 border-b border-border pb-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.id === 'all' ? '/blog' : `/blog?category=${cat.id}`}
              className={`px-6 py-2 rounded-full border transition-all flex items-center gap-3 text-xs font-bold tracking-widest uppercase ${
                (selectedCategory === cat.id) || (!selectedCategory && cat.id === 'all')
                  ? 'bg-primary text-background border-primary'
                  : 'bg-surface/30 border-border hover:border-primary/50 text-muted'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-24">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <article 
                key={post.slug} 
                className="group relative flex flex-col gap-8 border-l border-primary/10 pl-10 hover:border-primary transition-colors"
              >
                <div className="flex items-center justify-between text-[10px] font-bold text-primary/60 uppercase tracking-[0.3em]">
                  <span>{post.date}</span>
                  <span className="px-3 py-1 bg-surface rounded-full border border-border">{post.category}</span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-3xl md:text-4xl font-serif group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-muted text-lg leading-relaxed line-clamp-3 font-light italic">
                  "{post.excerpt || 'استخلاص للمسار البحثي الحالي في هذا النطاق...'}"
                </p>

                <div className="flex items-center justify-between mt-4">
                   <div className="flex gap-4">
                     {post.tags.slice(0, 2).map(tag => (
                       <span key={tag} className="text-[10px] text-secondary font-bold uppercase tracking-widest">#{tag}</span>
                     ))}
                   </div>
                   <Link 
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-2 text-xs font-black text-primary group-hover:translate-x-[-4px] transition-transform"
                  >
                    فتح الوثيقة <span>←</span>
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-32 text-center research-card rounded-[3rem]">
              <p className="text-muted text-xl font-serif">المسار البحثي المحدد لا يحتوي على وثائق منشورة حالياً.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
