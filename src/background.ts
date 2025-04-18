console.log("Background script loaded");

chrome.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received:", message, "from:", sender);
  sendResponse({ status: "Background received message" });
  return true; // Keep the message channel open for async responses
});
