import { getEnv } from '@/server/utils/environment';
import { GoogleGenerativeAI } from '@google/generative-ai';

import type { GenerativeModel, InputContent } from '@google/generative-ai';
import type { GenerativeAIModel } from '@/server/types/index';

/**
 * Class representing the Gemini API connection and its methods.
 * This is an implementation of the AIInterface.
 */
class Gemini implements GenerativeAIModel {
  apiKey: string = this.setApiKey();
  AI: GoogleGenerativeAI = this.connect();
  model: GenerativeModel | undefined;

  /**
   * Create a Gemini API connection.
   */
  constructor() {
    getEnv();
  }

  /**
   * Set the Gemini API key using the environment variable.
   *
   * @return the Gemini API key
   */
  setApiKey(): string {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('Gemini API Key not found');
      throw new Error('Gemini API Key not found');
    }

    return apiKey || '';
  }

  /**
   * The GenerativeModel to use during prompt generation.
   *
   * @param model The GenerativeModel to set. See the model documentation for the correct model name.
   */
  setModel(model: string = 'gemini-pro'): void {
    this.model = this.AI.getGenerativeModel({ model: model });
  }

  /**
   * Connect to the API.
   *
   * @return The GoogleGenerativeAI connection.
   */
  connect(): GoogleGenerativeAI {
    if (!this.apiKey) {
      this.setApiKey();
    }

    this.AI = new GoogleGenerativeAI(this.apiKey);

    // The model name may change. Check the documentation for the latest model name.
    // https://ai.google.dev/models/gemini
    this.setModel('gemini-pro');

    return this.AI;
  }

  /**
   * Generate a one off response to a prompt.
   *
   * @param prompt The prompt to use in generating the response.
   * @return The text of the generated response.
   */
  async generateResponse(prompt: string): Promise<string> {
    if (!this.model) {
      throw new Error('Model not found');
    }

    const result = await this.model.generateContent(prompt);
    const response = await result.response;

    return response.text();
  }

  /**
   * Generate a response to a prompt in the context of a conversation.
   *
   * @param history The conversation history.
   * @param prompt The prompt to use in generating the response.
   * @param generationConfig The generation configuration.
   * @return The text of the generated response.
   */
  async generateConversation(
    history: InputContent[],
    prompt: string,
    generationConfig?: object
  ): Promise<string> {
    if (!this.model) {
      throw new Error('Model not found');
    }

    const chat = this.model.startChat({ history, generationConfig });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;

    return response.text();
  }
}

export default Gemini;
