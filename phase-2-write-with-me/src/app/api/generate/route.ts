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
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Write a ${tone} children's story for a child named ${child}. The story should be ${targetLength} and based on this idea: ${idea}. Write only the story text, no titles or meta-commentary.`,
        },
      ],
    });

    const story = response.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n');

    return NextResponse.json({ story });
  } catch (error) {
    console.error('Story generation failed:', error);
    return NextResponse.json(
      { error: 'Sorry, something went wrong while generating the story. Please try again.' },
      { status: 500 }
    );
  }
}
