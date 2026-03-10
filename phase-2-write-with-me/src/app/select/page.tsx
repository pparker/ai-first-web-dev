import Link from 'next/link';
import Nav from '../components/Nav';

export default function SelectPage() {
  return (
    <>
      <Nav />
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '0 1rem',
    }}>
      <h1>Choose Your Storyteller</h1>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
        <Link href="/builder/ellie">
          <button>Ellie</button>
        </Link>
        <Link href="/builder/clara">
          <button>Clara</button>
        </Link>
        <Link href="/builder/guest">
          <button>Guest</button>
        </Link>
      </div>
    </div>
    </>
  );
}
