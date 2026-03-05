import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const url = process.env.N8N_WEBHOOK_URL; // server-only env var
    if (!url) {
      return NextResponse.json(
        { ok: false, error: "Missing N8N_WEBHOOK_URL" },
        { status: 500 }
      );
    }

    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await r.text(); // keep for debugging

    if (!r.ok) {
      return NextResponse.json(
        { ok: false, error: `n8n failed: ${r.status}`, detail: text },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}