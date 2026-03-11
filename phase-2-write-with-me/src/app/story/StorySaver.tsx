'use client';
import { useEffect } from 'react';

const STORAGE_KEY = 'write-with-me-stories';

export default function StorySaver({ title, child, idea, tone, length, text, guestName }: {
  title?: string; child: string; idea: string; tone: string; length: string; text: string; guestName?: string;
}) {
  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    const isDuplicate = existing.some((s: { child: string; idea: string; tone: string; length: string; text: string }) =>
      s.child === child && s.idea === idea && s.tone === tone && s.length === length && s.text === text
    );
    if (isDuplicate) return;
    const entry: Record<string, string | number> = { child, idea, tone, length, text, savedAt: Date.now() };
    if (title) entry.title = title;
    if (guestName) entry.guestName = guestName;
    const updated = [entry, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, [text]);

  return null;
}
