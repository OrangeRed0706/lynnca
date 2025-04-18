console.log("Content script loaded");

// Send a message to the background script when the content script loads
chrome.runtime.sendMessage(
  { action: "contentScriptLoaded", url: window.location.href },
  (response) => {
    console.log("Response from background:", response);
  }
);

// Listen for messages from the popup or background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in content script:", message);
  sendResponse({ status: "Content script received message" });
  return true; // Keep the message channel open for async responses
});

// Function to show a notification that the extension is active
function showNotification() {
  const notification = document.createElement("div");
  notification.id = "vue-extension-injected";
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.padding = "10px";
  notification.style.backgroundColor = "rgba(0, 128, 255, 0.8)";
  notification.style.color = "white";
  notification.style.borderRadius = "5px";
  notification.style.zIndex = "9999";
  notification.style.fontSize = "14px";
  notification.textContent = "Vue Extension Active";
  
  document.body.appendChild(notification);
  
  // Remove the notification after 5 seconds
  setTimeout(() => {
    if (notification && notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 5000);
}

// Run the notification function when the DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", showNotification);
} else {
  showNotification();
}
