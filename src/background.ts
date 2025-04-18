// Reference to Chrome types
/// <reference path="./types/chrome.d.ts" />

console.log("Background script loaded");

// Sample responses for the chat based on different categories
const sampleResponses = {
  greeting: [
    "Hello! How can I assist you today?",
    "Hi there! What can I help you with?",
    "Greetings! How may I be of service?",
    "Welcome! How can I help you today?"
  ],
  question: [
    "That's an interesting question. Let me think about that...",
    "Great question! Here's what I know about that...",
    "I'd be happy to help with that question. Here's my take...",
    "Let me provide some information on that topic..."
  ],
  clarification: [
    "I'm not sure I understand. Could you please clarify?",
    "Could you provide more details about your question?",
    "I'd like to understand better. Can you elaborate?",
    "I want to make sure I help correctly. Can you explain more?"
  ],
  suggestion: [
    "Based on my knowledge, I would suggest...",
    "Here's what I recommend in this situation...",
    "From my perspective, you might want to consider...",
    "My suggestion would be to..."
  ],
  appreciation: [
    "That's a great point! I hadn't considered that perspective.",
    "Thank you for sharing that insight!",
    "I appreciate your thoughtful approach to this.",
    "That's a valuable perspective to consider."
  ],
  limitation: [
    "That's beyond my current capabilities, but I can help with something else.",
    "I'm afraid I can't assist with that specific request, but I'm happy to help in other ways.",
    "That's outside my scope, but let me know if there's something else I can help with.",
    "I have some limitations in that area, but I can try to help with related questions."
  ],
  fallback: [
    "I appreciate your patience. Let me work through this step by step.",
    "I'm here to help with any questions you might have.",
    "I understand your concern. Here's what I think...",
    "Let me see how I can assist you with that."
  ]
};

// Function to get a response based on message content
function getContextualResponse(message: string): string {
  message = message.toLowerCase();
  
  // Determine the type of response based on the message content
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return getRandomFromCategory('greeting');
  } else if (message.includes('?')) {
    return getRandomFromCategory('question');
  } else if (message.includes('what') || message.includes('how') || message.includes('why')) {
    return getRandomFromCategory('question');
  } else if (message.includes('suggest') || message.includes('recommend') || message.includes('advice')) {
    return getRandomFromCategory('suggestion');
  } else if (message.includes('thanks') || message.includes('thank you') || message.includes('appreciate')) {
    return getRandomFromCategory('appreciation');
  } else if (message.includes('not understand') || message.includes('confused') || message.includes('unclear')) {
    return getRandomFromCategory('clarification');
  } else if (message.includes('can you') || message.includes('could you') || message.includes('would you')) {
    // Check if it might be a request beyond capabilities
    if (message.includes('image') || message.includes('picture') || message.includes('draw') || 
        message.includes('create') || message.includes('generate')) {
      return getRandomFromCategory('limitation');
    }
  }
  
  // Default fallback response
  return getRandomFromCategory('fallback');
}

// Function to get a random response from a specific category
function getRandomFromCategory(category: keyof typeof sampleResponses): string {
  const responses = sampleResponses[category];
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

// Function to simulate an AI response
function simulateAIResponse(message: string, model: string): Promise<string> {
  console.log(`Processing message with model: ${model}`);
  
  // In a real implementation, this would call the OpenAI API
  // For now, we'll return a contextual response after a delay
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      const response = getContextualResponse(message);
      resolve(response);
    }, 1000 + Math.random() * 1000); // Simulate variable API delay (1-2 seconds)
  });
}

// Initialize extension when installed
chrome.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);
  
  // Set default settings if this is a new installation
  if (details.reason === 'install') {
    const defaultSettings = {
      apiKey: '',
      model: 'gpt-3.5-turbo',
      notificationStyle: 'standard',
      showNotifications: true,
      theme: 'blue'
    };
    
    chrome.storage.sync.set({ settings: defaultSettings }, () => {
      console.log("Default settings initialized");
    });
  }
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received:", message, "from:", sender);
  
  // Handle different message types
  if (message.action === "chatMessage") {
    // Process chat message
    console.log("Chat message received:", message.content);
    
    // Send immediate response to keep the message channel open
    sendResponse({ status: "Processing message" });
    
    // Get the current tab information
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentUrl = tabs[0]?.url || '';
      
      // Add context about the current page to enhance the response
      let contextualMessage = message.content;
      if (currentUrl && !currentUrl.startsWith('chrome://')) {
        console.log("Adding context from current page:", currentUrl);
        // In a real implementation, we might fetch page content here
      }
      
      // Simulate AI response
      simulateAIResponse(contextualMessage, message.model || "gpt-3.5-turbo")
        .then((response) => {
          // Send the AI response back to the popup
          chrome.runtime.sendMessage({
            action: "aiResponse",
            content: response,
            timestamp: new Date().toISOString()
          });
        })
        .catch((error) => {
          console.error("Error processing message:", error);
          chrome.runtime.sendMessage({
            action: "aiResponse",
            content: "I'm sorry, there was an error processing your request.",
            error: true,
            timestamp: new Date().toISOString()
          });
        });
    });
    
    return true; // Keep the message channel open for async responses
  } else if (message.action === "contentScriptLoaded") {
    // Content script has loaded on a page
    console.log("Content script loaded on:", message.url);
    sendResponse({ status: "Background acknowledged content script" });
    return false;
  } else {
    // Handle other message types
    sendResponse({ status: "Background received message" });
    return false;
  }
});

// Optional: Listen for tab updates to potentially provide context-aware suggestions
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && !tab.url.startsWith('chrome://')) {
    console.log("Tab updated:", tab.url);
    // In a real implementation, we might analyze the page content here
  }
});
