import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { child, idea, length, tone } = await request.json();

  // TODO: replace with real AI call
  const story = `A ${tone} ${length} story for ${child}: ${idea}`;

  return NextResponse.json({ story });
}
