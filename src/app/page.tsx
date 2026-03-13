import Link from 'next/link';

export default function Home() {
  const researchTracks = [
    {
      title: "نماذج اللغة الصغيرة للفقه",
      status: "Active Research",
      description: "تطوير SLMs متخصصة في متون المذهب الشافعي مع الحفاظ على البناء المنطقي التقليدي.",
      metric: "Accuracy: 94.2%",
      color: "from-emerald-500/20 to-transparent"
    },
    {
      title: "محركات الاستدلال العقدي",
      status: "Prototyping",
      description: "بناء أنظمة Neuro-Symbolic لتمثيل البراهين الفلسفية في علم الكلام برمجياً.",
      metric: "Nodes: 1.2M",
      color: "from-teal-500/20 to-transparent"
    },
    {
      title: "أخلاقيات الذكاء الاصطناعي",
      status: "Theoretical",
      description: "صياغة معايير المحاذاة (Alignment) بناءً على المقاصد الشرعية والقيم الأخلاقية الموضوعية.",
      metric: "Citations: 45",
      color: "from-amber-500/20 to-transparent"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden selection:bg-primary/30">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '3s' }} />

      <section className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-[1px] bg-primary"></span>
            <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase">Islamic AI Research Lab</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-[1.1]">
            نطوّر تقنيات <span className="text-primary italic">تنبض</span> <br /> 
            بقيم <span className="text-secondary">الأصالة</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted max-w-2xl mb-12 leading-relaxed font-light">
            مختبر بحثي متخصص في استكشاف آفاق الذكاء الاصطناعي من منظور المنطق الإسلامي والعلوم التقليدية.
          </p>

          <div className="flex flex-wrap gap-6">
            <Link href="/blog" className="px-10 py-4 bg-primary text-background font-black rounded-full hover:scale-105 transition-all shadow-xl shadow-primary/20">
              استكشف المختبر
            </Link>
            <div className="flex items-center gap-4 px-6 py-4 border border-border rounded-full bg-surface/50 backdrop-blur-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-bold">٣ مشاريع نشطة حالياً</span>
            </div>
          </div>
        </div>
      </section>

      {/* Research Tracks Grid */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {researchTracks.map((track, i) => (
            <div key={i} className="research-card rounded-[2rem] p-10 flex flex-col justify-between min-h-[400px]">
              <div>
                <div className="flex justify-between items-start mb-12">
                  <div className="px-4 py-1 rounded-full border border-primary/20 text-[10px] font-bold text-primary bg-primary/5 uppercase tracking-widest">
                    {track.status}
                  </div>
                  <div className="text-secondary/40 islamic-pattern w-6 h-6"></div>
                </div>
                <h3 className="text-3xl font-serif mb-6 leading-tight">{track.title}</h3>
                <p className="text-muted leading-relaxed">{track.description}</p>
              </div>
              
              <div className="mt-12 pt-8 border-t border-border/50 flex justify-between items-center">
                <span className="font-mono text-xs text-primary/60">{track.metric}</span>
                <span className="text-primary">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="research-card rounded-[3rem] p-16 md:p-24 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-[80px] -mr-32 -mt-32" />
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-serif mb-10 leading-tight">
                "الهدف ليس بناء آلات تفكّر، بل بناء آلات <span className="text-primary italic">تدرك</span> مقاصد الحق والخير."
              </h2>
              <div className="flex items-center gap-6">
                <div className="w-16 h-[1px] bg-secondary/30"></div>
                <p className="text-secondary font-serif text-xl italic">يحيى محمد عبد الله</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 container mx-auto px-6 border-t border-border/20">
        <div className="flex flex-col md:flex-row justify-between gap-12 text-sm text-muted">
          <div className="space-y-4">
            <p className="text-foreground font-serif text-lg font-bold">يحيى محمد عبد الله</p>
            <p>© {new Date().getFullYear()} - مختبر أبحاث الذكاء الاصطناعي الإسلامي</p>
          </div>
          <div className="flex gap-12">
            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors">Papers</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
