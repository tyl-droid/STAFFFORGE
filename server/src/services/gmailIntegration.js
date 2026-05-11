function parseGmailMock(emails = []) {
  return emails.map(email => {
    const body = (email.body || "").toLowerCase();

    let status = "UNKNOWN";

    if (body.includes("congratulations") || body.includes("accepted")) {
      status = "ACCEPTED";
    } else if (body.includes("unfortunately") || body.includes("denied") || body.includes("rejected")) {
      status = "DENIED";
    } else if (body.includes("interview")) {
      status = "INTERVIEW";
    } else if (body.includes("under review")) {
      status = "UNDER_REVIEW";
    }

    return {
      subject: email.subject,
      status
    };
  });
}

module.exports = { parseGmailMock };
