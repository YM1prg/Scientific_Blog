'use client';

import Giscus from '@giscus/react';

export default function Comments() {
  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h2 className="text-2xl mb-8 text-primary font-serif">المناقشات والتعليقات</h2>
      <div className="rounded-2xl bg-card/30 p-4 border border-border/50">
        <Giscus
          id="comments"
          repo="yahya-mohamed-abdullah/blog"
          repoId="" // Needs real ID from giscus.app
          category="Announcements"
          categoryId="" // Needs real ID from giscus.app
          mapping="pathname"
          term="Welcome to my blog!"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="transparent_dark"
          lang="ar"
          loading="lazy"
        />
      </div>
    </section>
  );
}
