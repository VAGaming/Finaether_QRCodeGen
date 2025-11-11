const qrcode = document.getElementById("qrcode");
const timer = document.getElementById("timer");
const linkDisplay = document.getElementById("link");
let countdown = 30;

function generateQRCode() {
  const timestamp = Date.now();
  const redirectUrl = `${location.origin}/redirect.html?t=${timestamp}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    redirectUrl
  )}`;

  qrcode.src = qrUrl;
  console.log(`Generated QR for: ${redirectUrl}`);
}

function startCountdown() {
  setInterval(() => {
    countdown--;
    if (countdown <= 0) {
      countdown = 30;
      generateQRCode();
    }
    timer.textContent = countdown;
  }, 1000);
}
generateQRCode();
startCountdown();
