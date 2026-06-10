import { NextResponse } from 'next/server';

/**
 * Lead proxy (server deploy path only — disabled for static export by
 * scripts/build-static.mjs). Injects N8N_TOKEN server-side so the token
 * never reaches the client, and silently swallows obvious bot submissions
 * (honeypot filled / submitted faster than 3 s after render).
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot + timing trap (§7.2): pretend success so bots learn nothing.
  const honeypot = typeof body.website === 'string' && body.website.trim() !== '';
  const ts = typeof body.ts === 'number' ? body.ts : 0;
  const tooFast = !ts || Date.now() - ts < 3_000;
  if (honeypot || tooFast) {
    return NextResponse.json({ ok: true });
  }

  const webhook = process.env.N8N_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: false, reason: 'not-configured' }, { status: 503 });
  }

  const lead = { ...body };
  delete lead.website;
  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lead, token: process.env.N8N_TOKEN ?? '' }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) throw new Error(`webhook HTTP ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
