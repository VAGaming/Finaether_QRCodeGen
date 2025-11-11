const params = new URLSearchParams(window.location.search);
const t = parseInt(params.get("t"), 10);
const status = document.getElementById("status");

if (!t) {
  status.textContent = "Invalid QR code — missing timestamp.";
} else {
  const now = Date.now();
  const age = (now - t) / 1000; // seconds

  if (age <= 30) {
    status.textContent = "QR is fresh.";
    window.location.href =
      "https://docs.google.com/forms/d/e/1FAIpQLScQOd8sFCM4anzXSkG2lJQz37iIpAoO43L4A-kFwe0ULwulkg/viewform";
  } else {
    status.textContent = "?";
    window.location.href = "https://www.google.com";
  }
}
