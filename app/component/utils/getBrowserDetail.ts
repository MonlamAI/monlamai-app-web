export function getBrowser() {
  let userAgent = navigator?.userAgent;
  let browser = "Unknown";

  // Detect Chrome
  if (/Chrome/.test(userAgent) && !/Chromium/.test(userAgent)) {
    browser = "Chrome";
  }
  // Detect Chromium-based Edge
  else if (/Edg/.test(userAgent)) {
    browser = "Edge";
  }
  // Detect Firefox
  else if (/Firefox/.test(userAgent)) {
    browser = "Firefox";
  }
  // Detect Safari
  else if (/Safari/.test(userAgent)) {
    browser = "Safari";
  }
  // Detect Internet Explorer
  else if (/Trident/.test(userAgent)) {
    browser = "Explorer";
  }

  return browser;
}
