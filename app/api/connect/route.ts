const industryMap: Record<string, string> = {
  "construction": "Construction/Trades",
  "logistics": "Logistics/Transport",
  "home-services": "Home Services",
  "professional": "Professional Services",
};

const payload = {
  businessName: body.businessName ?? body.business ?? "",
  industry: industryMap[body.industry ?? body.type ?? ""] ?? "",
  phone: body.phone ?? "",
  email: body.email ?? "",
  priorityArea: body.priorityArea ?? "",
  submittedAt: new Date().toISOString(),
  source: "Website",
  status: "New",
  notes: body.notes ?? "",
};