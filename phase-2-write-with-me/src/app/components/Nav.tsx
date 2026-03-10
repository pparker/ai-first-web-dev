import Link from 'next/link';

export default function Nav() {
  return (
    <nav style={{
      display: 'flex',
      gap: '1.5rem',
      padding: '1rem 2rem',
      borderBottom: '1px solid #e0e0e0',
      fontSize: '0.95rem',
    }}>
      <Link href="/select">Create Story</Link>
      <Link href="/stories">Saved Stories</Link>
    </nav>
  );
}
