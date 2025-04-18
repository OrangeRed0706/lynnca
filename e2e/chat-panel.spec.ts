import { test, expect } from '@playwright/test';

// Test the chat panel in the popup
test.describe('Chat Panel', () => {
  // Setup: Open the popup page before each test
  test.beforeEach(async ({ page }) => {
    // Navigate to the popup page
    await page.goto('/src/popup/index.html');
    
    // Wait for the page to load
    await page.waitForSelector('.popup-container');
  });

  test('should display the chat interface', async ({ page }) => {
    // Check that the header is visible
    await expect(page.locator('header h1')).toHaveText('AI Chat Assistant');
    
    // Check that the input area is visible
    await expect(page.locator('textarea')).toBeVisible();
    
    // Check that the send button is visible
    await expect(page.locator('textarea + button')).toBeVisible();
    
    // Check that the empty state message is visible
    await expect(page.getByText('Start a conversation...')).toBeVisible();
  });

  test('should toggle settings panel', async ({ page }) => {
    // Settings panel should be hidden initially
    await expect(page.locator('.bg-white.rounded-lg.shadow-md')).not.toBeVisible();
    
    // Click the settings button
    await page.locator('header button').click();
    
    // Settings panel should be visible
    await expect(page.locator('.bg-white.rounded-lg.shadow-md')).toBeVisible();
    
    // Check that the API key input is visible
    await expect(page.locator('input[type="password"]')).toBeVisible();
    
    // Check that the model select is visible
    await expect(page.locator('select')).toBeVisible();
    
    // Click the settings button again
    await page.locator('header button').click();
    
    // Settings panel should be hidden again
    await expect(page.locator('.bg-white.rounded-lg.shadow-md')).not.toBeVisible();
  });

  test('should send a message and show loading indicator', async ({ page }) => {
    // Type a message
    await page.locator('textarea').fill('Hello, AI!');
    
    // Click the send button (use a more specific selector)
    await page.locator('.flex-grow + button').click();
    
    // Check that the message was added to the chat
    await expect(page.locator('.message-container')).toBeVisible();
    await expect(page.locator('.message-container .bg-blue-500')).toContainText('Hello, AI!');
    
    // Check that the loading indicator is shown
    await expect(page.locator('.typing-indicator')).toBeVisible();
    
    // Note: In a real environment with the Chrome API, we would get a response
    // from the background script, but in the test environment, we can't simulate this
  });

  test('should save settings', async ({ page }) => {
    // Open settings panel
    await page.locator('header button').click();
    
    // Enter API key
    await page.locator('input[type="password"]').fill('test-api-key');
    
    // Select model
    await page.locator('select').selectOption('gpt-4');
    
    // Click save button
    await page.locator('.bg-white.rounded-lg button').click();
    
    // Settings panel should be closed
    await expect(page.locator('.bg-white.rounded-lg.shadow-md')).not.toBeVisible();
    
    // Reopen settings to verify values were saved
    await page.locator('header button').click();
    
    // Check that the API key was saved
    await expect(page.locator('input[type="password"]')).toHaveValue('test-api-key');
    
    // Check that the model was saved
    await expect(page.locator('select')).toHaveValue('gpt-4');
  });

  // Skip this test for now as it requires the Chrome API to be available
  test.skip('should open options page when link is clicked', async ({ page, context }) => {
    // Verify that the "Open Options" link exists
    await expect(page.locator('a:has-text("Open Options")')).toBeVisible();
    
    // In a real Chrome extension environment, clicking this link would open the options page
    // But in the test environment, we can't simulate this behavior
  });
});
