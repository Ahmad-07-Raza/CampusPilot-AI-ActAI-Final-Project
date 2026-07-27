import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getGeminiClient } from '../src/lib/gemini.js';
import { BASE_SYSTEM_PROMPT, PLANNER_PROMPT } from '../src/lib/prompts.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { examName, examDate, availableHoursPerDay = 3, subjects = [] } = req.body || {};
    const ai = getGeminiClient();

    const userPrompt = `Target Exam/Project: ${examName}
Exam Date/Deadline: ${examDate}
Daily Available Study Hours: ${availableHoursPerDay} hours/day
Key Subjects/Modules to cover: ${Array.isArray(subjects) ? subjects.join(', ') : subjects}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userPrompt,
      config: {
        systemInstruction: `${BASE_SYSTEM_PROMPT}\n${PLANNER_PROMPT}`,
        responseMimeType: 'application/json',
        temperature: 0.5,
      },
    });

    const rawText = response.text || '{}';
    const parsedData = JSON.parse(rawText);
    return res.json(parsedData);
  } catch (error: any) {
    console.error('Error in /api/planner:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate study schedule.',
    });
  }
}
