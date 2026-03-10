import Link from 'next/link';
import Nav from './components/Nav';

export default function Home() {
  return (
    <>
      <Nav />
      <div className="page-centered" style={{ minHeight: 'calc(100vh - 57px)' }}>
        <h1>Write With Me</h1>
        <p>Create magical stories together.</p>
        <Link href="/select">
          <button className="btn mt-1">Start</button>
        </Link>
      </div>
    </>
  );
}
