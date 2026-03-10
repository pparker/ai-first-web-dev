import Link from 'next/link';
import Nav from '../components/Nav';

export default function SelectPage() {
  return (
    <>
      <Nav />
      <div className="page-centered" style={{ minHeight: '100vh' }}>
        <h1>Choose Your Storyteller</h1>
        <div className="storyteller-buttons">
          <Link href="/builder/ellie"><button>Ellie</button></Link>
          <Link href="/builder/clara"><button>Clara</button></Link>
          <Link href="/builder/guest"><button>Guest</button></Link>
        </div>
      </div>
    </>
  );
}
