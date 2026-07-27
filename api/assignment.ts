import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getGeminiClient } from '../src/lib/gemini.js';
import { BASE_SYSTEM_PROMPT, ASSIGNMENT_PROMPT } from '../src/lib/prompts.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { title, subject, deadline, wordCount, additionalDetails } = req.body || {};
    const ai = getGeminiClient();

    const userPrompt = `Assignment Title: ${title}
Subject/Course: ${subject || 'General'}
Target Deadline: ${deadline || 'Next week'}
Word Count/Deliverable Format: ${wordCount || '1500 words'}
Details/Prompt: ${additionalDetails || 'Standard university research assignment'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userPrompt,
      config: {
        systemInstruction: `${BASE_SYSTEM_PROMPT}\n${ASSIGNMENT_PROMPT}`,
        responseMimeType: 'application/json',
        temperature: 0.6,
      },
    });

    const rawText = response.text || '{}';
    const parsedData = JSON.parse(rawText);
    return res.json(parsedData);
  } catch (error: any) {
    console.error('Error in /api/assignment:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate assignment plan.',
    });
  }
}
