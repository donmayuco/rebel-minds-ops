import { NextRequest, NextResponse } from "next/server";

const industryMap: Record<string, string> = {
  "construction": "Construction/Trades",
  "logistics": "Logistics/Transport",
  "home-services": "Home Services",
  "professional": "Professional Services",
  "other": "Other",
  "Construction/Trades": "Construction/Trades",
  "Logistics/Transport": "Logistics/Transport",
  "Home Services": "Home Services",
  "Professional Services": "Professional Services",
  "Other": "Other",
  "Construcción / Oficios": "Construction/Trades",
  "Logística / Transporte": "Logistics/Transport",
  "Servicios del Hogar": "Home Services",
  "Servicios Profesionales": "Professional Services",
  "Otro": "Other",
};

const priorityAreaMap: Record<string, string> = {
  "Organize receipts and expenses for better accounting": "Organize receipts and expenses for better accounting",
  "Improve project visibility and tracking": "Improve project visibility and tracking",
  "Reduce manual data entry and paperwork": "Reduce manual data entry and paperwork",
  "Respond to leads faster and track inquiries": "Respond to leads faster and track inquiries",
  "Simplify scheduling and team coordination": "Simplify scheduling and team coordination",
  "Not sure yet — show me what's possible": "Not sure yet — show me what's possible",
  "Organizar recibos y gastos para contabilidad": "Organize receipts and expenses for better accounting",
  "Mejorar la visibilidad y seguimiento de proyectos": "Improve project visibility and tracking",
  "Reducir captura manual de datos y papeleo": "Reduce manual data entry and paperwork",
  "Responder a prospectos más rápido": "Respond to leads faster and track inquiries",
  "Simplificar horarios y coordinación del equipo": "Simplify scheduling and team coordination",
  "No estoy seguro — muéstrame qué es posible": "Not sure yet — show me what's possible",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const payload = {
      businessName: body.businessName ?? body.business ?? "",
      industry: industryMap[body.industry ?? body.type ?? ""] ?? "",
      phone: body.phone ?? "",
      email: body.email ?? "",
      priorityArea: priorityAreaMap[body.priorityArea] ?? body.priorityArea ?? "",
      submittedAt: new Date().toISOString(),
      source: body.source === "Spanish Form" ? "Website" : (body.source ?? "Website"),
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
// ── n8n webhook: Slack + Email notifications (fire & forget) ──
    fetch("https://rebelmindsops.app.n8n.cloud/webhook/connect-intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch((err) => console.error("n8n webhook error:", err));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Connect submission error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
