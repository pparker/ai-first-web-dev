'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'write-with-me-stories';

type SavedStory = {
  child: string;
  idea: string;
  tone: string;
  length: string;
  text: string;
  savedAt: number;
};

export default function StoriesPage() {
  const [stories, setStories] = useState<SavedStory[]>([]);

  useEffect(() => {
    setStories(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]'));
  }, []);

  if (stories.length === 0) {
    return (
      <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <h1>Saved Stories</h1>
        <p style={{ marginTop: '1rem', color: '#555' }}>No stories saved yet.</p>
        <Link href="/select" style={{ display: 'inline-block', marginTop: '1rem' }}>Create one</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Saved Stories</h1>
      <ul style={{ marginTop: '1.5rem', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {stories.map((s) => {
          const qs = new URLSearchParams({ text: s.text, child: s.child, idea: s.idea, length: s.length, tone: s.tone });
          return (
            <li key={s.savedAt} style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '0.75rem' }}>
              <Link href={`/story?${qs.toString()}`}>
                <strong>{s.child}</strong> — {s.idea}
              </Link>
              <p style={{ fontSize: '0.85rem', color: '#888', margin: '0.2rem 0 0' }}>
                {new Date(s.savedAt).toLocaleDateString()}
              </p>
            </li>
          );
        })}
      </ul>
      <Link href="/select" style={{ display: 'inline-block', marginTop: '2rem' }}>Create a new story</Link>
    </main>
  );
}
