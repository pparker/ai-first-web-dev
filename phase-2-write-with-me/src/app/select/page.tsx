export default function SelectPage() {
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
      <h1>Choose Your Storyteller</h1>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
        <button>Ellie</button>
        <button>Clara</button>
        <button>Guest</button>
      </div>
    </div>
  );
}
