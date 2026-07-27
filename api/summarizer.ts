import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getGeminiClient } from '../src/lib/gemini.js';
import { BASE_SYSTEM_PROMPT, SUMMARIZER_PROMPT } from '../src/lib/prompts.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { notesText, topicTitle } = req.body || {};
    if (!notesText || notesText.trim().length === 0) {
      return res.status(400).json({ error: 'Notes text is required.' });
    }

    const ai = getGeminiClient();
    const userPrompt = `Topic/Title: ${topicTitle || 'Lecture Notes'}
Notes/Text to summarize:
${notesText}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userPrompt,
      config: {
        systemInstruction: `${BASE_SYSTEM_PROMPT}\n${SUMMARIZER_PROMPT}`,
        responseMimeType: 'application/json',
        temperature: 0.5,
      },
    });

    const rawText = response.text || '{}';
    const parsedData = JSON.parse(rawText);
    return res.json(parsedData);
  } catch (error: any) {
    console.error('Error in /api/summarizer:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate notes summary and flashcards.',
    });
  }
}
