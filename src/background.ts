// src/background.ts
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action !== 'chat') return;

  const { content, model } = msg as { action: string; content: string; model: string };

  // 先取出用户储存的 apiKey
  chrome.storage.sync.get(['apiKey'], async (res) => {
    const apiKey = res.apiKey as string | undefined;
    if (!apiKey) {
      sendResponse({ reply: '⚠️ API Key 未设置，请先到 Settings 填写。' });
      return;
    }

    try {
      const payload = {
        model,
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content },
        ] as ChatCompletionMessageParam[]
      };

      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
      });

      if (!r.ok) throw new Error(`HTTP ${r.status}`);

      const data = await r.json();
      const ai = data.choices?.[0]?.message?.content?.trim() || '🤖 …（空回复）';

      sendResponse({ reply: ai });
    } catch (e) {
      console.error(e);
      sendResponse({ reply: '❌ 与 OpenAI 通信出错。' });
    }
  });

  // 表示稍后会调用 sendResponse
  return true;
});
