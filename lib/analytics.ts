export function trackEvent(
  eventName: string,
  payload: Record<string, any> = {}
) {
  try {
    if (typeof window === "undefined") return;

    if (process.env.NODE_ENV === "development") {
      console.log("[trackEvent]", eventName, payload);
    }

    // Future: plug into GA4 / PostHog / etc.
  } catch (err) {
    console.error("Analytics error:", err);
  }
}