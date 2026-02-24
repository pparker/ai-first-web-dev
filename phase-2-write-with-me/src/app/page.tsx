import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '0 1rem',
    }}>
      <h1>Write With Me</h1>
      <p>Create magical stories together.</p>
      <Link href="/select">
        <button
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Start
        </button>
      </Link>
    </div>
  );
}
