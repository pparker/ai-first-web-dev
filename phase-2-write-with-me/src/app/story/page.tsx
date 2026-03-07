import Link from 'next/link';

export default async function StoryPage({ searchParams }: { searchParams: Promise<{ text?: string }> }) {
  const { text } = await searchParams;

  if (!text) {
    return (
      <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <h1>Your Story</h1>
        <p style={{ marginTop: '1rem', color: '#555' }}>
          No story found. Head back and create one!
        </p>
        <Link href="/select" style={{ display: 'inline-block', marginTop: '1rem' }}>
          Choose a storyteller
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Your Story</h1>

      <p style={{
        marginTop: '1.5rem',
        lineHeight: '1.8',
        fontSize: '1.1rem',
        whiteSpace: 'pre-wrap',
        background: '#f9f9f9',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
      }}>
        {text}
      </p>

      <nav style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem' }}>
        <Link href="/select">Create another story</Link>
        <Link href="/select">Edit your prompt</Link>
      </nav>
    </main>
  );
}
