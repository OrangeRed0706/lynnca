// Reference to Chrome types
/// <reference path="./types/chrome.d.ts" />

// Define theme color type
type ThemeColor = 'blue' | 'green' | 'purple' | 'red' | 'gray' | 'yellow' | 'indigo' | 'pink';

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
  
  // Handle specific message types
  if (message.action === "getPageInfo") {
    // Get page information
    const pageInfo = {
      title: document.title,
      url: window.location.href,
      description: getMetaDescription(),
      textContent: getPageTextSummary()
    };
    sendResponse({ status: "success", data: pageInfo });
  } else {
    sendResponse({ status: "Content script received message" });
  }
  
  return true; // Keep the message channel open for async responses
});

// Function to get meta description
function getMetaDescription(): string {
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    const content = metaDescription.getAttribute('content');
    return content || '';
  }
  return '';
}

// Function to get a summary of the page text content
function getPageTextSummary(): string {
  // Get all paragraphs
  const paragraphs = document.querySelectorAll('p');
  let text = '';
  
  // Get the first few paragraphs (up to 3)
  for (let i = 0; i < Math.min(paragraphs.length, 3); i++) {
    const paragraph = paragraphs[i];
    const content = paragraph.textContent;
    
    if (content) {
      const trimmedContent = content.trim();
      if (trimmedContent.length > 20) {
        text += trimmedContent + ' ';
        if (text.length > 200) break;
      }
    }
  }
  
  // Truncate if too long
  return text.length > 200 ? text.substring(0, 200) + '...' : text;
}

// Function to show a notification that the extension is active
function showNotification() {
  // Get settings from storage
  chrome.storage.sync.get(['settings'], (result) => {
    // Check if notifications are enabled
    if (result.settings && result.settings.showNotifications === false) {
      return;
    }
    
    // Get notification style
    const style = result.settings?.notificationStyle || 'standard';
    const theme = (result.settings?.theme || 'blue') as ThemeColor;
    
    // Create notification element
    const notification = document.createElement("div");
    notification.id = "vue-extension-injected";
    
    // Apply base styles
    Object.assign(notification.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      padding: style === 'minimal' ? "8px 12px" : "12px 16px",
      color: "white",
      borderRadius: "8px",
      zIndex: "9999",
      fontSize: style === 'minimal' ? "12px" : "14px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
      display: "flex",
      alignItems: "center",
      transition: "all 0.3s ease",
      opacity: "0",
      transform: "translateY(10px)"
    });
    
    // Apply theme color
    const themeColors: Record<ThemeColor, string> = {
      blue: "linear-gradient(135deg, #3b82f6, #2563eb)",
      green: "linear-gradient(135deg, #10b981, #059669)",
      purple: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
      red: "linear-gradient(135deg, #ef4444, #dc2626)",
      gray: "linear-gradient(135deg, #6b7280, #4b5563)",
      yellow: "linear-gradient(135deg, #f59e0b, #d97706)",
      indigo: "linear-gradient(135deg, #4f46e5, #4338ca)",
      pink: "linear-gradient(135deg, #ec4899, #db2777)"
    };
    
    // Use a valid theme or fallback to blue
    let validTheme: ThemeColor = 'blue';
    if (theme in themeColors) {
      validTheme = theme;
    }
    notification.style.background = themeColors[validTheme];
    
    // Create icon (for standard and detailed styles)
    if (style !== 'minimal') {
      const icon = document.createElement("div");
      icon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
          <line x1="16" y1="8" x2="2" y2="22"></line>
          <line x1="17.5" y1="15" x2="9" y2="15"></line>
        </svg>
      `;
      icon.style.marginRight = "10px";
      notification.appendChild(icon);
    }
    
    // Create content container
    const content = document.createElement("div");
    
    // Add title
    const title = document.createElement("div");
    title.textContent = "Vue Extension Active";
    title.style.fontWeight = "bold";
    content.appendChild(title);
    
    // Add description for detailed style
    if (style === 'detailed') {
      const description = document.createElement("div");
      description.textContent = "AI chat assistant is ready to help";
      description.style.fontSize = "12px";
      description.style.marginTop = "4px";
      description.style.opacity = "0.9";
      content.appendChild(description);
    }
    
    notification.appendChild(content);
    
    // Add close button
    const closeButton = document.createElement("div");
    closeButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;
    Object.assign(closeButton.style, {
      marginLeft: "12px",
      cursor: "pointer",
      opacity: "0.7",
      transition: "opacity 0.2s ease"
    });
    closeButton.addEventListener("mouseover", () => {
      closeButton.style.opacity = "1";
    });
    closeButton.addEventListener("mouseout", () => {
      closeButton.style.opacity = "0.7";
    });
    closeButton.addEventListener("click", () => {
      notification.style.opacity = "0";
      notification.style.transform = "translateY(10px)";
      setTimeout(() => {
        if (notification && notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    });
    notification.appendChild(closeButton);
    
    // Add to the page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.opacity = "1";
      notification.style.transform = "translateY(0)";
    }, 10);
    
    // Remove the notification after a delay
    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateY(10px)";
      setTimeout(() => {
        if (notification && notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, style === 'minimal' ? 3000 : 5000);
  });
}

// Run the notification function when the DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", showNotification);
} else {
  showNotification();
}
