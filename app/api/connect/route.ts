import { NextRequest, NextResponse } from "next/server";

const industryMap: Record<string, string> = {
  "construction": "Construction/Trades",
  "logistics": "Logistics/Transport",
  "home-services": "Home Services",
  "professional": "Professional Services",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const payload = {
      businessName: body.businessName ?? body.business ?? "",
      industry: industryMap[body.industry ?? body.type ?? ""] ?? "",
      phone: body.phone ?? "",
      email: body.email ?? "",
      priorityArea: body.priorityArea ?? "",
      submittedAt: new Date().toISOString(),
      source: body.source ?? "Website",
      status: "New",
      notes: body.notes ?? "",
    };

    const baseId = process.env.AIRTABLE_BASE_ID ?? "appA45e5Wy3pwfduC";
    const tableId = process.env.AIRTABLE_TABLE_ID ?? "tblr9VCJ6KtfhvfDA";
    const apiKey = process.env.AIRTABLE_API_KEY;

    if (!apiKey) {
      console.error("Missing AIRTABLE_API_KEY");
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
            fldkbSxDNI7GSCUAh: payload.businessName,
            fldFItGDGCdyarvQR: payload.email,
            fldlEr9xm942RDvny: payload.phone,
            fldF4hkke0PHS0AOQ: payload.industry,
            fldAoi9N7uLFbcBWk: payload.priorityArea,
            fldYvhuvdNtlBSedY: payload.source,
            fldE1f8cvYQjpNmV8: payload.status,
            fldlLqCohSaS6MW5T: payload.notes,
            fld23FyFgCGQDRrHB: payload.submittedAt,
          },
        }),
      }
    );

    if (!airtableRes.ok) {
      const errData = await airtableRes.json().catch(() => ({}));
      console.error("Airtable error:", errData);
      return NextResponse.json(
        { success: false, error: "Failed to save submission.", details: errData?.error?.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Connect submission error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
