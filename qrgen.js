function updateQRCode() {
  const now = new Date();
  const nowStr = now.toLocaleString();
  const timeDisplay = document.getElementById("time");
  if (timeDisplay) timeDisplay.textContent = nowStr;

  // Build a safe URL for check.js: include a numeric timestamp and an encoded human-readable time
  const ts = now.getTime();
  const url =
    "https://wuang-qr-code-gen.vercel.app/check.html?ts=" +
    ts +
    "&time=" +
    encodeURIComponent(nowStr);

  if (typeof qrcode === "function") {
    const qr = qrcode(0, "L");
    qr.addData(url);
    qr.make();

    const qrDiv = document.getElementById("qrcode");
    if (qrDiv) qrDiv.innerHTML = qr.createImgTag(5);
  } else {
    // Fallback: show the URL as text so check.js can still be used if QR library isn't loaded
    const qrDiv = document.getElementById("qrcode");
    if (qrDiv) qrDiv.textContent = url;
    console.error(
      "qrcode() is not available; include qrcode.js before this script."
    );
  }
}
updateQRCode();
setInterval(updateQRCode, 1000);
