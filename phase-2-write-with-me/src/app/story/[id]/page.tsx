import { sql } from '@vercel/postgres';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '../../components/Nav';
import StoryView from '../StoryView';
import type { SavedStory } from '../../../lib/story-types';

export default async function StoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { rows } = await sql`
    SELECT id, title, child, guest_name AS "guestName", idea, tone, length, text, created_at
    FROM stories
    WHERE id = ${id}
  `;

  if (rows.length === 0) notFound();

  const story = rows[0] as SavedStory;

  const editParams: Record<string, string> = { idea: story.idea, length: story.length, tone: story.tone };
  if (story.child === 'guest' && story.guestName) editParams.guestName = story.guestName;
  const editHref = `/builder/${story.child}?${new URLSearchParams(editParams).toString()}`;

  return (
    <>
      <Nav />
      <main className="page-main mx-auto">
        <h1>Your Story</h1>
        <StoryView
          title={story.title}
          text={story.text}
          child={story.child}
          idea={story.idea}
          tone={story.tone}
          length={story.length}
          guestName={story.guestName}
          editHref={editHref}
        />
      </main>
    </>
  );
}
