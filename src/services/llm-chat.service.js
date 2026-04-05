import makeRequest from './make-request';

/**
 * LLMChatService
 *
 * Small wrapper class to send user prompts / messages to the internal LLM backend.
 * Assumes API base path is `/api/llm` with endpoints like:
 *  - POST /api/llm/prompt     { prompt, metadata }
 *  - POST /api/llm/messages   { messages: [{ role, content }, ...] }
 *
 * If your backend uses different endpoints, update BASE_PATH or the methods.
 */
export class LLMChatService {
  constructor(basePath = '/api/llm') {
    this.basePath = basePath;
  }

  /**
   * Send a single prompt (string or object) and return the backend response.
   * prompt: string | { prompt, ... }
   */
  async sendPrompt(prompt, metadata = {}) {
    if (!prompt) throw new Error('sendPrompt requires a prompt');

    const body = typeof prompt === 'string' ? { prompt, metadata } : { ...prompt, metadata };

    const url = `${this.basePath}/prompt`;
    return makeRequest(url, 'POST', {}, {}, body);
  }

  /**
   * Send an array of messages to the LLM backend (useful when sending conversation history).
   * messages: Array<{ role: 'user'|'assistant'|'system', content: string }>
   */
  async sendMessages(messages = []) {
    if (!Array.isArray(messages)) throw new Error('sendMessages expects an array of messages');
    const url = `${this.basePath}/messages`;
    return makeRequest(url, 'POST', {}, {}, { messages });
  }

  /**
   * Convenience: send prompt and return text result (unwraps common response shape)
   */
  async ask(prompt, metadata = {}) {
    const res = await this.sendPrompt(prompt, metadata);
    // try common response shapes
    if (res == null) return null;
    if (typeof res === 'string') return res;
    if (res.text) return res.text;
    if (res.output) return res.output;
    return res;
  }
}

export const llmChatService = new LLMChatService();

export default llmChatService;
