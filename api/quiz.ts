import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getGeminiClient } from '../src/lib/gemini.js';
import { BASE_SYSTEM_PROMPT, QUIZ_PROMPT } from '../src/lib/prompts.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { topic, difficulty = 'medium', questionCount = 5, customText } = req.body || {};
    const ai = getGeminiClient();

    const userPrompt = `Generate a ${difficulty} quiz about: "${topic}". 
Include ${questionCount} total questions (a mix of MCQ, True/False, and Short Answer questions).
${customText ? `Base the quiz on these provided notes:\n${customText}` : ''}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userPrompt,
      config: {
        systemInstruction: `${BASE_SYSTEM_PROMPT}\n${QUIZ_PROMPT}`,
        responseMimeType: 'application/json',
        temperature: 0.6,
      },
    });

    const rawText = response.text || '{}';
    const parsedData = JSON.parse(rawText);
    return res.json(parsedData);
  } catch (error: any) {
    console.error('Error in /api/quiz:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate interactive quiz.',
    });
  }
}
