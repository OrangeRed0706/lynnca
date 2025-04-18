import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import App, { provideChromeApi } from '../../src/popup/App.vue';

// Create a mock Chrome API
const mockChromeApi = {
  getTabs: vi.fn((callback) => callback([{ url: 'https://example.com' }])),
  getStorage: vi.fn((keys, callback) => callback({})),
  setStorage: vi.fn((items, callback) => {
    if (callback) callback();
  }),
  sendMessage: vi.fn((message, callback) => {
    if (callback) callback({ status: 'ok' });
  }),
  addMessageListener: vi.fn(),
  openOptionsPage: vi.fn()
};

describe('Chat Panel', () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Mount the component with the mock Chrome API
    wrapper = mount(App, {
      props: {
        testChromeApi: mockChromeApi
      }
    });
  });

  it('renders the chat panel correctly', () => {
    expect(wrapper.find('header h1').text()).toBe('AI Chat Assistant');
    expect(wrapper.find('textarea').exists()).toBe(true);
    expect(wrapper.find('button svg').exists()).toBe(true);
  });

  it('shows empty state message when no messages', () => {
    expect(wrapper.text()).toContain('Start a conversation...');
  });

  it('toggles settings panel when settings button is clicked', async () => {
    // Settings panel should be hidden initially
    expect(wrapper.find('.bg-white.rounded-lg.shadow-md').exists()).toBe(false);
    
    // Click the settings button
    await wrapper.find('header button').trigger('click');
    
    // Settings panel should be visible
    expect(wrapper.find('.bg-white.rounded-lg.shadow-md').exists()).toBe(true);
    
    // Click the settings button again
    await wrapper.find('header button').trigger('click');
    
    // Settings panel should be hidden again
    expect(wrapper.find('.bg-white.rounded-lg.shadow-md').exists()).toBe(false);
  });

  it('sends a message when the send button is clicked', async () => {
    // Mock the setTimeout function
    vi.useFakeTimers();
    
    // Type a message
    const textarea = wrapper.find('textarea');
    await textarea.setValue('Hello, AI!');
    
    // Click the send button
    await wrapper.find('.flex-grow + button').trigger('click');
    
    // Check if the message was added to the chat
    const messages = wrapper.findAll('.message-container');
    expect(messages.length).toBe(1);
    expect(messages[0].text()).toContain('Hello, AI!');
    
    // Advance timers to trigger the setTimeout
    vi.runAllTimers();
    
    // Check if the message was sent to the background script
    expect(mockChromeApi.sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'chatMessage',
        content: 'Hello, AI!',
      }),
      expect.any(Function)
    );
    
    // Check if the textarea was cleared
    expect(textarea.element.value).toBe('');
    
    // Restore real timers
    vi.useRealTimers();
  });

  it('shows loading indicator after sending a message', async () => {
    // Type and send a message
    await wrapper.find('textarea').setValue('Hello, AI!');
    await wrapper.find('.flex-grow + button').trigger('click');
    
    // Check if loading indicator is shown
    expect(wrapper.find('.typing-indicator').exists()).toBe(true);
  });

  it('saves settings when save button is clicked', async () => {
    // Open settings panel
    await wrapper.find('header button').trigger('click');
    
    // Enter API key and select model
    await wrapper.find('input[type="password"]').setValue('test-api-key');
    await wrapper.find('select').setValue('gpt-4');
    
    // Click save button
    await wrapper.find('.bg-white.rounded-lg button').trigger('click');
    
    // Check if settings were saved
    expect(mockChromeApi.setStorage).toHaveBeenCalledWith(
      {
        apiKey: 'test-api-key',
        model: 'gpt-4',
      },
      expect.any(Function)
    );
    
    // Check if settings panel was closed
    expect(wrapper.find('.bg-white.rounded-lg').exists()).toBe(false);
  });
});
