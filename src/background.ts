console.log("Background script loaded");

// Sample responses for the chat
const sampleResponses = [
  "Hello! How can I assist you today?",
  "That's an interesting question. Let me think about that...",
  "I understand your concern. Here's what I think...",
  "Based on my knowledge, I would suggest...",
  "I'm not sure I understand. Could you please clarify?",
  "That's a great point! I hadn't considered that perspective.",
  "Let me provide some more information on that topic.",
  "I'm here to help with any questions you might have.",
  "That's beyond my current capabilities, but I can help with something else.",
  "I appreciate your patience. Let me work through this step by step."
];

// Function to get a random response
function getRandomResponse() {
  const randomIndex = Math.floor(Math.random() * sampleResponses.length);
  return sampleResponses[randomIndex];
}

// Function to simulate an AI response
function simulateAIResponse(message: string, model: string) {
  console.log(`Processing message with model: ${model}`);
  
  // In a real implementation, this would call the OpenAI API
  // For now, we'll just return a random response after a delay
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      const response = getRandomResponse();
      resolve(response);
    }, 1000); // Simulate API delay
  });
}

chrome.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received:", message, "from:", sender);
  
  // Handle different message types
  if (message.action === "chatMessage") {
    // Process chat message
    console.log("Chat message received:", message.content);
    
    // Send immediate response to keep the message channel open
    sendResponse({ status: "Processing message" });
    
    // Simulate AI response
    simulateAIResponse(message.content, message.model || "gpt-3.5-turbo")
      .then((response) => {
        // Send the AI response back to the popup
        chrome.runtime.sendMessage({
          action: "aiResponse",
          content: response
        });
      })
      .catch((error) => {
        console.error("Error processing message:", error);
        chrome.runtime.sendMessage({
          action: "aiResponse",
          content: "I'm sorry, there was an error processing your request."
        });
      });
    
    return true; // Keep the message channel open for async responses
  } else {
    // Handle other message types
    sendResponse({ status: "Background received message" });
    return true;
  }
});
