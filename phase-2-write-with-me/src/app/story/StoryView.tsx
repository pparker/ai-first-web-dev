'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StorySaver from './StorySaver';

type Props = {
  title?: string;
  text: string;
  child: string;
  idea: string;
  tone: string;
  length: string;
  guestName?: string;
  editHref: string;
  canRegenerate: boolean;
};

export default function StoryView({ title, text: initialText, child, idea, tone, length, guestName, editHref, canRegenerate }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resolvedChild = child === 'guest' && guestName ? guestName : child;

  async function handleRegenerate() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ child: resolvedChild, idea, tone, length }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.');
        return;
      }
      const qsParams: Record<string, string> = { title: data.title ?? '', text: data.story, child, idea, tone, length };
      if (guestName) qsParams.guestName = guestName;
      router.push(`/story?${new URLSearchParams(qsParams).toString()}`);
    } catch {
      setError('Could not reach the server. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <StorySaver title={title} child={child} idea={idea} tone={tone} length={length} text={initialText} guestName={guestName} />
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
        {canRegenerate && (
          <button
            onClick={handleRegenerate}
            disabled={loading}
            className="btn"
            style={{ fontSize: '0.875rem', padding: '0.4rem 1rem' }}
          >
            {loading ? 'Generating…' : 'Generate another version'}
          </button>
        )}
      </nav>
    </>
  );
}
