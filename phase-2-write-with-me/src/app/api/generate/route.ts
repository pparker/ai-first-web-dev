import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const RATE_LIMIT = 5;
const WINDOW_MS = 60_000;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => t > cutoff);

  if (timestamps.length >= RATE_LIMIT) {
    requestLog.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}

const toneDescriptions: Record<string, string> = {
  funny: 'Use playful humour, comic situations, and light wordplay.',
  calm: 'Use gentle pacing, warm descriptions, and a peaceful, soothing atmosphere.',
  adventurous: 'Use exciting action, a sense of discovery, and dramatic but age-appropriate tension.',
};

export async function POST(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : null;

  if (ip && isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests, please slow down.' },
      { status: 429 }
    );
  }

  const { child, idea, length, tone } = await request.json();

  const wordCount: Record<string, string> = {
    short: 'under 250 words',
    medium: 'between 250 and 600 words',
    long: 'between 600 and 1200 words',
  };
  const targetLength = wordCount[length] ?? 'around 400 words';
  const toneDescription = toneDescriptions[tone] ?? '';

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: `Write a children's story with the following requirements:

- The main character is a child named ${child}.
- The story is based on this idea: ${idea}
- Tone: ${tone}. ${toneDescription} Maintain this tone from start to finish.
- Length: ${targetLength}. Stay within this range.
- Audience: children aged 8–11. Use simple, vivid language and short sentences.
- Structure: include a clear beginning, middle, and satisfying ending. The ending must feel resolved and complete — not abrupt or left hanging.
- Do not include moral lessons or heavy-handed messages — let the story speak for itself.

Return your response as a JSON object with exactly two fields:
- "title": a short, child-friendly title for the story (4–8 words)
- "text": the full story text with no title, headings, or extra commentary`,
        },
      ],
    });

    const raw = response.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n')
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/, '')
      .trim();

    const { title, text } = JSON.parse(raw);
    return NextResponse.json({ id: crypto.randomUUID(), title, text });
  } catch (error) {
    console.error('Story generation failed:', error);
    return NextResponse.json(
      { error: 'Sorry, something went wrong while generating the story. Please try again.' },
      { status: 500 }
    );
  }
}
