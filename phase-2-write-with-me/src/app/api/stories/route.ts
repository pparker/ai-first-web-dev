import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  const { rows } = await sql`
    SELECT id, title, child, guest_name AS "guestName", idea, tone, length, text, created_at
    FROM stories
    ORDER BY created_at DESC
  `;
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const { id, title, child, guestName, idea, tone, length, text } = await request.json();
  await sql`
    INSERT INTO stories (id, title, child, guest_name, idea, tone, length, text)
    VALUES (${id}, ${title ?? null}, ${child}, ${guestName ?? null}, ${idea}, ${tone}, ${length}, ${text})
    ON CONFLICT (id) DO NOTHING
  `;
  return new NextResponse(null, { status: 204 });
}
