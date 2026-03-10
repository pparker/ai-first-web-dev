import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="site-nav">
      <Link href="/select">Create Story</Link>
      <Link href="/stories">Saved Stories</Link>
    </nav>
  );
}
