import Link from 'next/link';

export default async function StoryPage({ searchParams }: { searchParams: Promise<{ text?: string }> }) {
  const { text = '' } = await searchParams;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem 1rem',
      textAlign: 'center',
    }}>
      <h1>Your Story</h1>
      <p style={{ maxWidth: '600px', whiteSpace: 'pre-wrap', lineHeight: '1.6', marginTop: '1rem' }}>
        {text}
      </p>
      <Link href="/select" style={{ marginTop: '2rem' }}>Write another story</Link>
    </div>
  );
}
