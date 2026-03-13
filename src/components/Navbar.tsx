'use client';

import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-6">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between px-8 py-4 rounded-full border border-border bg-surface/60 backdrop-blur-xl shadow-2xl">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-bg-deep group-hover:rotate-[360deg] transition-transform duration-700">
              <span className="text-xl font-bold">ي</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-serif font-bold leading-none">يحيى محمد</span>
              <span className="text-[10px] text-primary font-bold tracking-widest uppercase mt-1">Research Lab</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {['الرئيسية', 'الأبحاث', 'المدونة', 'عن المختبر'].map((item) => (
              <Link 
                key={item}
                href={item === 'المدونة' ? '/blog' : '#'} 
                className="text-xs font-bold text-muted hover:text-primary transition-colors tracking-widest"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <ThemeSwitcher />
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">System Online</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
