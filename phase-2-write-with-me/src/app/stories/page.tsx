import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';
import Link from 'next/link';
import Nav from '../components/Nav';
import StoryDeleteButton from './StoryDeleteButton';
import type { SavedStory } from '../../lib/story-types';

async function getStories(): Promise<SavedStory[]> {
  const { rows } = await sql`
    SELECT id, title, child, guest_name AS "guestName", idea, tone, length, text, created_at
    FROM stories
    ORDER BY created_at DESC
  `;
  return rows as SavedStory[];
}

export default async function StoriesPage() {
  const stories = await getStories();

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
            const qsParams: Record<string, string> = { id: s.id, text: s.text, child: s.child, idea: s.idea, length: s.length, tone: s.tone };
            if (s.title) qsParams.title = s.title;
            if (s.guestName) qsParams.guestName = s.guestName;
            const qs = new URLSearchParams(qsParams);
            const author = s.guestName ? `${s.guestName} (guest)` : s.child;
            return (
              <li key={s.id} className="story-item">
                <Link href={`/story?${qs.toString()}`} className="bold">
                  {s.title ?? `${author} — ${s.idea}`}
                </Link>
                <p className="meta-text">{author} · {s.tone} · {s.length} · {new Date(s.created_at).toLocaleDateString()}</p>
                <StoryDeleteButton id={s.id} />
              </li>
            );
          })}
        </ul>
        <Link href="/select" className="inline-block mt-2">Create a new story</Link>
      </main>
    </>
  );
}
