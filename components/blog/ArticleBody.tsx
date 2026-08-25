import type { BlogBlock } from '@/lib/blog-posts';

export default function ArticleBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'p':
            return (
              <p key={i} className="text-base leading-relaxed sm:text-lg" style={{ color: 'var(--hive-ink)' }}>
                {block.text}
              </p>
            );
          case 'h2':
            return (
              <h2
                key={i}
                className="font-display pt-4 text-2xl font-semibold sm:text-3xl"
                style={{ color: 'var(--hive-ink)' }}
              >
                {block.text}
              </h2>
            );
          case 'list':
            return (
              <ul key={i} className="ml-5 list-disc space-y-2 text-base leading-relaxed" style={{ color: 'var(--hive-ink)' }}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case 'quote':
            return (
              <blockquote
                key={i}
                className="rounded-r-lg border-l-4 py-2 pl-5 font-display text-xl italic"
                style={{ borderColor: 'var(--hive-ochre)', color: 'var(--hive-pine-dark)' }}
              >
                {block.text}
                {block.attribution && (
                  <footer className="hive-eyebrow mt-2 not-italic" style={{ color: 'var(--hive-dusk)' }}>
                    — {block.attribution}
                  </footer>
                )}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}