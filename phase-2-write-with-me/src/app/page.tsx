import Link from 'next/link';
import Nav from './components/Nav';

export default function Home() {
  return (
    <>
      <Nav />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 57px)',
        textAlign: 'center',
        padding: '0 1rem',
      }}>
      <h1>Write With Me</h1>
      <p>Create magical stories together.</p>
      <Link href="/select">
        <button style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer',
        }}>
          Start
        </button>
      </Link>
      </div>
    </>
  );
}
