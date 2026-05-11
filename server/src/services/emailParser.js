function parseEmailStatus(text = "") {
  const t = text.toLowerCase();

  if (t.includes("congratulations") || t.includes("accepted") || t.includes("successful")) {
    return "ACCEPTED";
  }

  if (t.includes("unfortunately") || t.includes("denied") || t.includes("rejected")) {
    return "DENIED";
  }

  if (t.includes("interview") || t.includes("voice chat") || t.includes("schedule a time")) {
    return "INTERVIEW";
  }

  if (t.includes("under review") || t.includes("reviewing") || t.includes("being reviewed")) {
    return "UNDER_REVIEW";
  }

  if (t.includes("received") || t.includes("submitted")) {
    return "SUBMITTED";
  }

  return "UNKNOWN";
}

module.exports = { parseEmailStatus };
