

export function getVisitorId() {
  if (typeof window === "undefined") {
    return null;
  }

  let visitorId =
    localStorage.getItem("visitor_id");

  if (!visitorId) {
    visitorId = crypto.randomUUID();

    localStorage.setItem(
      "visitor_id",
      visitorId
    );
  }

  return visitorId;
}