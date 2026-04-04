'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { GeneratedStory } from '../../lib/story-types';

type Props = GeneratedStory & {
  guestName?: string;
  editHref: string;
};

export default function StoryView({ title, text: initialText, child, idea, tone, length, guestName, editHref }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resolvedChild = child === 'guest' && guestName ? guestName : child;

  async function handleRegenerate() {
    setLoading(true);
    setError('');
    try {
      const genRes = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ child: resolvedChild, idea, tone, length }),
      });
      const data = await genRes.json();
      if (!genRes.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.');
        return;
      }
      const saveRes = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: data.id, title: data.title ?? null, child, idea, tone, length, text: data.text, guestName }),
      });
      if (!saveRes.ok) {
        setError('Could not save your story. Please try again.');
        return;
      }
      router.push(`/story/${data.id}`);
    } catch {
      setError('Could not reach the server. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {title && <h2 className="story-title">{title}</h2>}
      <div className="story-body">
        {initialText.split(/\n\n+/).map((para, i) => (
          <p key={i}>{para.trim()}</p>
        ))}
      </div>
      {error && <p className="error-text mt-1">{error}</p>}
      <nav className="story-actions">
        <Link href="/select">Create another story</Link>
        <Link href={editHref}>Edit your prompt</Link>
        <button
          onClick={handleRegenerate}
          disabled={loading}
          className="btn"
          style={{ fontSize: '0.875rem', padding: '0.4rem 1rem' }}
        >
          {loading ? 'Generating…' : 'Generate another version'}
        </button>
      </nav>
    </>
  );
}
