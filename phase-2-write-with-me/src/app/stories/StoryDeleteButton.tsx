'use client';
import { useRouter } from 'next/navigation';

export default function StoryDeleteButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    await fetch(`/api/stories/${id}`, { method: 'DELETE' });
    router.refresh();
  }

  return (
    <button onClick={handleDelete} className="btn-danger">Delete</button>
  );
}
