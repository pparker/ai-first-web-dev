import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await sql`DELETE FROM stories WHERE id = ${id}`;
  return new NextResponse(null, { status: 204 });
}
