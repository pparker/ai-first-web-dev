'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';

export default function BuilderPage() {
  const params = useParams<{ child: string }>();
  const router = useRouter();
  const child = params.child;

  const [idea, setIdea] = useState('');
  const [length, setLength] = useState('medium');
  const [tone, setTone] = useState('funny');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ child, idea, length, tone }),
    });

    const data = await res.json();
    router.push(`/story?text=${encodeURIComponent(data.story)}`);
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '600px' }}>
      <h1>Story Builder</h1>
      <p>Storyteller: <strong>{child}</strong></p>
      <Link href="/select">Change storyteller</Link>

      <form onSubmit={handleSubmit} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label>Story Idea</label>
          <textarea
            value={idea}
            onChange={e => setIdea(e.target.value)}
            rows={4}
            style={{ display: 'block', width: '100%', marginTop: '0.25rem', fontSize: '1rem' }}
          />
        </div>

        <div>
          <label>Length</label>
          <select
            value={length}
            onChange={e => setLength(e.target.value)}
            style={{ display: 'block', width: '100%', marginTop: '0.25rem', fontSize: '1rem' }}
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>

        <div>
          <label>Tone</label>
          <select
            value={tone}
            onChange={e => setTone(e.target.value)}
            style={{ display: 'block', width: '100%', marginTop: '0.25rem', fontSize: '1rem' }}
          >
            <option value="funny">Funny</option>
            <option value="adventurous">Adventurous</option>
            <option value="calm">Calm</option>
          </select>
        </div>

        <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer' }}>
          {loading ? 'Generating...' : 'Generate Story'}
        </button>
      </form>
    </main>
  );
}
