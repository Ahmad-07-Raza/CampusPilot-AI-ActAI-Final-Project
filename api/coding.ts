import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getGeminiClient } from '../src/lib/gemini.js';
import { BASE_SYSTEM_PROMPT, CODING_PROMPT } from '../src/lib/prompts.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { code, language = 'python', taskType = 'explain' } = req.body || {};
    if (!code || code.trim().length === 0) {
      return res.status(400).json({ error: 'Code snippet is required.' });
    }

    const ai = getGeminiClient();
    const userPrompt = `Language: ${language}
Task Request: ${taskType} (Explain line-by-line, debug errors, compute complexity O(N), optimize algorithm).
Code Snippet:
\`\`\`${language}
${code}
\`\`\``;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userPrompt,
      config: {
        systemInstruction: `${BASE_SYSTEM_PROMPT}\n${CODING_PROMPT}`,
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
    });

    const rawText = response.text || '{}';
    const parsedData = JSON.parse(rawText);
    return res.json(parsedData);
  } catch (error: any) {
    console.error('Error in /api/coding:', error);
    return res.status(500).json({
      error: error.message || 'Failed to analyze code.',
    });
  }
}
