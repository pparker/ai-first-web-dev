'use client';
import { useEffect } from 'react';

const STORAGE_KEY = 'write-with-me-stories';

export default function StorySaver({ child, idea, tone, length, text }: {
  child: string; idea: string; tone: string; length: string; text: string;
}) {
  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    const isDuplicate = existing.some((s: { child: string; idea: string; tone: string; length: string; text: string }) =>
      s.child === child && s.idea === idea && s.tone === tone && s.length === length && s.text === text
    );
    if (isDuplicate) return;
    const updated = [{ child, idea, tone, length, text, savedAt: Date.now() }, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  return null;
}
