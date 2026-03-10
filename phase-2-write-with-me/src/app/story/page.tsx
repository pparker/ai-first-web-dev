import Link from 'next/link';
import StorySaver from './StorySaver';
import Nav from '../components/Nav';

export default async function StoryPage({ searchParams }: { searchParams: Promise<{ text?: string; child?: string; idea?: string; length?: string; tone?: string; guestName?: string }> }) {
  const { text, child, idea, length, tone, guestName } = await searchParams;

  const editParams: Record<string, string> = { idea: idea ?? '', length: length ?? 'medium', tone: tone ?? 'funny' };
  if (child === 'guest' && guestName) editParams.guestName = guestName;
  const editHref = child ? `/builder/${child}?${new URLSearchParams(editParams).toString()}` : '/select';

  if (!text) {
    return (
      <>
        <Nav />
        <main className="page-main mx-auto">
          <h1>Your Story</h1>
          <p className="muted-text">No story found. Head back and create one!</p>
          <Link href="/select" className="inline-block mt-1">Choose a storyteller</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="page-main mx-auto">
        <h1>Your Story</h1>
        <StorySaver child={child ?? ''} idea={idea ?? ''} tone={tone ?? ''} length={length ?? ''} text={text} guestName={guestName} />
        <p className="story-body">{text}</p>
        <nav className="story-actions">
          <Link href="/select">Create another story</Link>
          <Link href={editHref}>Edit your prompt</Link>
        </nav>
      </main>
    </>
  );
}
