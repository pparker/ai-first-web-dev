"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function StoryPage() {
  const searchParams = useSearchParams();
  const story = searchParams.get("text");

  return (
    <main style={{ padding: "2rem", maxWidth: "700px" }}>
      <h1>Your Story</h1>

      <p style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}>
        {story ?? "No story found."}
      </p>

      <div style={{ marginTop: "2rem" }}>
        <Link href="/select">Start Again</Link>
      </div>
    </main>
  );
}