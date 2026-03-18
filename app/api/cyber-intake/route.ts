import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      businessName,
      email,
      phone,
      companySize,
      industry,
      training,
      mfa,
      incident,
      newsletter,
    } = body;

    if (!name || !businessName || !email) {
      return NextResponse.json(
        { success: false, error: "Name, business name, and email are required." },
        { status: 400 }
      );
    }

    // ─── Risk Scoring ──────────────────────────────────────────────────
    let score = 0;

    // Training
    if (training === "NeverThoughtAboutIt") score += 2;
    else if (training === "No") score += 2;
    else if (training === "Occasionally") score += 1;

    // MFA
    if (mfa === "No") score += 2;
    else if (mfa === "NotSure") score += 2;
    else if (mfa === "OnSomeAccounts") score += 1;

    // Incident history
    if (incident === "YesARealBreach") score += 3;
    else if (incident === "NotSurePossibly") score += 1;
    else if (incident === "MinorIssue") score += 1;

    // Industry risk
    if (industry === "Medical/Dental") score += 1;
    else if (industry === "Legal/Accounting") score += 1;

    // Size
    if (companySize === "50+") score += 1;

    score = Math.min(score, 10);

    let riskLevel: string;
    if (score >= 7) riskLevel = "High";
    else if (score >= 4) riskLevel = "Medium";
    else riskLevel = "Low";

    // ─── Airtable Write ────────────────────────────────────────────────
    const baseId = process.env.AIRTABLE_CYBER_BASE_ID;
    const tableId = process.env.AIRTABLE_CYBER_TABLE_ID;
    const apiKey = process.env.AIRTABLE_API_KEY;

    if (!baseId || !tableId || !apiKey) {
      console.error("Missing Airtable env vars for cyber intake");
      return NextResponse.json(
        { success: false, error: "Server configuration error." },
        { status: 500 }
      );
    }

    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            fld5j9Ryb8i4EAXk8: name,
            fldpV2tc2Ep6xKZea: businessName,
            fldwRByaqyrYGO7mz: email,
            fldG01redIIMqOtwr: phone || "",
            fldpuF8XJOXvuqxJu: companySize,
            fldUqMDpQK3wXbqHp: industry,
            fldG6ZK6DEQF8K8qJ: training,
            fldtQHwirerw4Q6JA: mfa,
            fldDSWpfy6gNkwPtc: incident,
            fldBSJLYLQtqQHxR4: score,
            fldCMvPH8QZLT78sD: riskLevel,
            fldEtJplRtLgVXxSK: newsletter ?? false,
            fldxO1eAwh01OTHts: "New",
            fldDTKtUIuKjSkCIz: "WebsiteForm",
            fldJtxF8DGLxPmBiu: new Date().toISOString(),
          },
        }),
      }
    );

    if (!airtableRes.ok) {
      const errData = await airtableRes.json().catch(() => ({}));
      console.error("Airtable error:", errData);
      return NextResponse.json(
        { success: false, error: "Failed to save submission." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, riskScore: score, riskLevel });
  } catch (err) {
    console.error("Cyber intake error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
