'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import Nav from '../../components/Nav';

export default function BuilderPage() {
  const params = useParams<{ child: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const child = params.child;

  const isGuest = child === 'guest';
  const [guestName, setGuestName] = useState(searchParams.get('guestName') ?? '');
  const [guestNameError, setGuestNameError] = useState('');
  const [idea, setIdea] = useState(searchParams.get('idea') ?? '');
  const [length, setLength] = useState(searchParams.get('length') ?? 'medium');
  const [tone, setTone] = useState(searchParams.get('tone') ?? 'funny');
  const [loading, setLoading] = useState(false);
  const [ideaError, setIdeaError] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isGuest && !guestName.trim()) {
      setGuestNameError('Please enter the child\'s name.');
      return;
    }
    setGuestNameError('');

    if (!idea.trim()) {
      setIdeaError('Please enter a story idea.');
      return;
    }
    setIdeaError('');
    setError('');

    const resolvedChild = isGuest ? guestName.trim() : child;
    setLoading(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ child: resolvedChild, idea, length, tone }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      const qs = new URLSearchParams({ title: data.title ?? '', text: data.story, child, idea, length, tone, ...(isGuest && { guestName: guestName.trim() }) });
      router.push(`/story?${qs.toString()}`);
    } catch {
      setError('Could not reach the server. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Nav />
      <main className="page-main">
        <h1>Story Builder</h1>
        <p>Storyteller: <strong>{child}</strong></p>
        <Link href="/select">Change storyteller</Link>

        <form onSubmit={handleSubmit} className="form">
          {isGuest && (
            <div>
              <label>{"Child's name"}</label>
              <input
                type="text"
                value={guestName}
                onChange={e => { setGuestName(e.target.value); setGuestNameError(''); }}
                placeholder="Enter the child's name"
                className="form-control"
              />
              {guestNameError && <p className="error-text">{guestNameError}</p>}
            </div>
          )}
          <div>
            <label>Story Idea</label>
            <textarea
              value={idea}
              onChange={e => { setIdea(e.target.value); setIdeaError(''); }}
              rows={4}
              className="form-control"
            />
            {ideaError && <p className="error-text">{ideaError}</p>}
          </div>

          <div>
            <label>Length</label>
            <select value={length} onChange={e => setLength(e.target.value)} className="form-control">
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
          </div>

          <div>
            <label>Tone</label>
            <select value={tone} onChange={e => setTone(e.target.value)} className="form-control">
              <option value="funny">Funny</option>
              <option value="adventurous">Adventurous</option>
              <option value="calm">Calm</option>
            </select>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" disabled={loading} className="btn">
            {loading ? 'Generating story...' : 'Generate Story'}
          </button>
        </form>
      </main>
    </>
  );
}
