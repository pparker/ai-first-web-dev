import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request: Request) {
  const { child, idea, length, tone } = await request.json();

  const wordCount: Record<string, string> = {
    short: 'under 250 words',
    medium: 'between 250 and 600 words',
    long: 'between 600 and 1200 words',
  };
  const targetLength = wordCount[length] ?? 'around 400 words';

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
- Tone: ${tone}. Keep this tone consistent throughout.
- Length: ${targetLength}. Stay within this range.
- Audience: children aged 5–11. Use simple, clear language and short sentences.
- Structure: include a clear beginning, middle, and satisfying ending.

Return your response as a JSON object with exactly two fields:
- "title": a short, child-friendly title for the story (4–8 words)
- "story": the full story text with no title, headings, or extra commentary`,
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

    const { title, story } = JSON.parse(raw);
    return NextResponse.json({ title, story });
  } catch (error) {
    console.error('Story generation failed:', error);
    return NextResponse.json(
      { error: 'Sorry, something went wrong while generating the story. Please try again.' },
      { status: 500 }
    );
  }
}
