"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function StoryBuilderPage() {
  const params = useParams<{ child: string }>();
  const router = useRouter();
  const child = params.child;

  const [idea, setIdea] = useState("");
  const [length, setLength] = useState("medium");
  const [tone, setTone] = useState("funny");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        child,
        idea,
        length,
        tone,
      }),
    });

    const data = await res.json();

    router.push(`/story?text=${encodeURIComponent(data.story)}`);
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "600px" }}>
      <h1>Story Builder</h1>

      <p>
        Storyteller: <strong>{child}</strong>
      </p>

      <Link href="/select">Change storyteller</Link>

      <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
        <div>
          <label>Story Idea</label>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label>Length</label>
          <select value={length} onChange={(e) => setLength(e.target.value)}>
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label>Tone</label>
          <select value={tone} onChange={(e) => setTone(e.target.value)}>
            <option value="funny">Funny</option>
            <option value="adventurous">Adventurous</option>
            <option value="calm">Calm</option>
          </select>
        </div>

        <button style={{ marginTop: "1.5rem" }} disabled={loading}>
          {loading ? "Generating..." : "Generate Story"}
        </button>
      </form>
    </main>
  );
}