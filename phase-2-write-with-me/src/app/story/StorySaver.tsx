'use client';
import { useEffect } from 'react';
import type { SavedStory } from '../../lib/story-types';

type Props = Omit<SavedStory, 'id' | 'created_at'> & { id?: string };

export default function StorySaver({ id, title, child, idea, tone, length, text, guestName }: Props) {
  useEffect(() => {
    if (!id) return;
    fetch('/api/stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title, child, idea, tone, length, text, guestName }),
    }).catch(console.error);
  }, [text]);

  return null;
}
