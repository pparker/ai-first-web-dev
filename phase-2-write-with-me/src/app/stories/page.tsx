'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from '../components/Nav';

const STORAGE_KEY = 'write-with-me-stories';

type SavedStory = {
  child: string;
  idea: string;
  tone: string;
  length: string;
  text: string;
  savedAt: number;
  guestName?: string;
};

export default function StoriesPage() {
  const [stories, setStories] = useState<SavedStory[]>([]);

  useEffect(() => {
    setStories(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]'));
  }, []);

  function deleteStory(savedAt: number) {
    const updated = stories.filter((s) => s.savedAt !== savedAt);
    setStories(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  if (stories.length === 0) {
    return (
      <>
        <Nav />
        <main className="page-main mx-auto">
          <h1>Saved Stories</h1>
          <p className="muted-text">No stories saved yet.</p>
          <Link href="/select" className="inline-block mt-1">Create one</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="page-main mx-auto">
        <h1>Saved Stories</h1>
        <ul className="stories-list">
          {stories.map((s) => {
            const qsParams: Record<string, string> = { text: s.text, child: s.child, idea: s.idea, length: s.length, tone: s.tone };
            if (s.guestName) qsParams.guestName = s.guestName;
            const qs = new URLSearchParams(qsParams);
            return (
              <li key={s.savedAt} className="story-item">
                <Link href={`/story?${qs.toString()}`} className="bold">
                  {s.guestName ? `${s.guestName} (guest)` : s.child} — {s.idea}
                </Link>
                <p className="meta-text">{s.tone} · {s.length} · {new Date(s.savedAt).toLocaleDateString()}</p>
                <button onClick={() => deleteStory(s.savedAt)} className="btn-danger">Delete</button>
              </li>
            );
          })}
        </ul>
        <Link href="/select" className="inline-block mt-2">Create a new story</Link>
      </main>
    </>
  );
}
