import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getGeminiClient } from '../src/lib/gemini.js';
import { BASE_SYSTEM_PROMPT } from '../src/lib/prompts.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { messages, course, systemModifier } = req.body || {};
    const ai = getGeminiClient();

    let fullSystemInstruction = BASE_SYSTEM_PROMPT;
    if (course) {
      fullSystemInstruction += `\n[Current Course Context: ${course}]`;
    }
    if (systemModifier) {
      fullSystemInstruction += `\n[User Strategy Focus: ${systemModifier}]`;
    }

    const formattedContents = (messages || []).map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    if (!formattedContents.length) {
      return res.status(400).json({ error: 'No messages provided.' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: formattedContents,
      config: {
        systemInstruction: fullSystemInstruction,
        temperature: 0.7,
      },
    });

    return res.json({ text: response.text || 'No response generated.' });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({
      error: error.message || 'An error occurred while generating chat response.',
    });
  }
}
