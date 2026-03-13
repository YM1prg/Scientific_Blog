'use client';

import { useTheme, Theme } from './ThemeProvider';

const themes: { id: Theme; label: string; icon: string; color: string }[] = [
  { id: 'nature', label: 'طبيعة', icon: '🌿', color: '#10b981' },
  { id: 'tech', label: 'تقنية', icon: '💻', color: '#06b6d4' },
  { id: 'heritage', label: 'تراث', icon: '🕌', color: '#0d9488' },
  { id: 'modern', label: 'حديث', icon: '🏢', color: '#2563eb' },
  { id: 'soft', label: 'ناعم', icon: '🍦', color: '#15803d' },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1.5 p-1 rounded-full bg-surface/30 border border-border/50 backdrop-blur-sm">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          title={t.label}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-500 relative group ${
            theme === t.id 
              ? 'bg-primary shadow-lg shadow-primary/20' 
              : 'hover:bg-primary/20'
          }`}
        >
          <span className={`text-[10px] transition-transform duration-500 ${theme === t.id ? 'scale-110' : 'grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100'}`}>
            {t.icon}
          </span>
          {theme === t.id && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full border border-bg-deep animate-pulse"></span>
          )}
        </button>
      ))}
    </div>
  );
}
