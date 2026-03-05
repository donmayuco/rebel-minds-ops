import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const webhook = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    if (!webhook) {
      return NextResponse.json(
        { error: "Missing NEXT_PUBLIC_N8N_WEBHOOK_URL in Vercel env vars" },
        { status: 500 }
      );
    }

    const r = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // If n8n rejects, surface that message
    if (!r.ok) {
      const text = await r.text().catch(() => "");
      return NextResponse.json(
        { error: `n8n webhook failed (${r.status})`, details: text.slice(0, 400) },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    // IMPORTANT: show the real error so we can fix it fast
    return NextResponse.json(
      { error: "Connect API crashed", details: String(err?.message || err) },
      { status: 500 }
    );
  }
}