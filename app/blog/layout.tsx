import type { ReactNode } from 'react';
import './blog-tokens.css';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <div className="hive-blog">{children}</div>;
}