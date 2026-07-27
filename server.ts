import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import {
  BASE_SYSTEM_PROMPT,
  QUIZ_PROMPT,
  SUMMARIZER_PROMPT,
  ASSIGNMENT_PROMPT,
  CODING_PROMPT,
  PLANNER_PROMPT,
} from "./src/lib/prompts.js";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Helper to get Gemini Client safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not configured.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "CampusPilot AI" });
});

// 1. AI Study Assistant Chat
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, course, systemModifier } = req.body;
    const ai = getGeminiClient();

    let fullSystemInstruction = BASE_SYSTEM_PROMPT;
    if (course) {
      fullSystemInstruction += `\n[Current Course Context: ${course}]`;
    }
    if (systemModifier) {
      fullSystemInstruction += `\n[User Strategy Focus: ${systemModifier}]`;
    }

    // Format chat history for Gemini generateContent or chat
    const formattedContents = (messages || []).map((m: { role: string; content: string }) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    // If no messages provided, return error
    if (!formattedContents.length) {
      return res.status(400).json({ error: "No messages provided." });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: formattedContents,
      config: {
        systemInstruction: fullSystemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text || "No response generated." });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({
      error: error.message || "An error occurred while generating chat response.",
    });
  }
});

// 2. Interactive Quiz Generator
app.post("/api/quiz", async (req, res) => {
  try {
    const { topic, difficulty = "medium", questionCount = 5, customText } = req.body;
    const ai = getGeminiClient();

    const userPrompt = `Generate a ${difficulty} quiz about: "${topic}". 
Include ${questionCount} total questions (a mix of MCQ, True/False, and Short Answer questions).
${customText ? `Base the quiz on these provided notes:\n${customText}` : ""}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction: `${BASE_SYSTEM_PROMPT}\n${QUIZ_PROMPT}`,
        responseMimeType: "application/json",
        temperature: 0.6,
      },
    });

    const rawText = response.text || "{}";
    const parsedData = JSON.parse(rawText);
    res.json(parsedData);
  } catch (error: any) {
    console.error("Error in /api/quiz:", error);
    res.status(500).json({
      error: error.message || "Failed to generate interactive quiz.",
    });
  }
});

// 3. Notes & Lecture Summarizer + Flashcard Engine
app.post("/api/summarizer", async (req, res) => {
  try {
    const { notesText, topicTitle } = req.body;
    if (!notesText || notesText.trim().length === 0) {
      return res.status(400).json({ error: "Notes text is required." });
    }

    const ai = getGeminiClient();
    const userPrompt = `Topic/Title: ${topicTitle || "Lecture Notes"}
Notes/Text to summarize:
${notesText}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction: `${BASE_SYSTEM_PROMPT}\n${SUMMARIZER_PROMPT}`,
        responseMimeType: "application/json",
        temperature: 0.5,
      },
    });

    const rawText = response.text || "{}";
    const parsedData = JSON.parse(rawText);
    res.json(parsedData);
  } catch (error: any) {
    console.error("Error in /api/summarizer:", error);
    res.status(500).json({
      error: error.message || "Failed to generate notes summary and flashcards.",
    });
  }
});

// 4. Assignment Helper & Roadmap Generator
app.post("/api/assignment", async (req, res) => {
  try {
    const { title, subject, deadline, wordCount, additionalDetails } = req.body;
    const ai = getGeminiClient();

    const userPrompt = `Assignment Title: ${title}
Subject/Course: ${subject || "General"}
Target Deadline: ${deadline || "Next week"}
Word Count/Deliverable Format: ${wordCount || "1500 words"}
Details/Prompt: ${additionalDetails || "Standard university research assignment"}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction: `${BASE_SYSTEM_PROMPT}\n${ASSIGNMENT_PROMPT}`,
        responseMimeType: "application/json",
        temperature: 0.6,
      },
    });

    const rawText = response.text || "{}";
    const parsedData = JSON.parse(rawText);
    res.json(parsedData);
  } catch (error: any) {
    console.error("Error in /api/assignment:", error);
    res.status(500).json({
      error: error.message || "Failed to generate assignment plan.",
    });
  }
});

// 5. Programming Assistant & Algorithm Analyzer
app.post("/api/coding", async (req, res) => {
  try {
    const { code, language = "python", taskType = "explain" } = req.body;
    if (!code || code.trim().length === 0) {
      return res.status(400).json({ error: "Code snippet is required." });
    }

    const ai = getGeminiClient();
    const userPrompt = `Language: ${language}
Task Request: ${taskType} (Explain line-by-line, debug errors, compute complexity O(N), optimize algorithm).
Code Snippet:
\`\`\`${language}
${code}
\`\`\``;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction: `${BASE_SYSTEM_PROMPT}\n${CODING_PROMPT}`,
        responseMimeType: "application/json",
        temperature: 0.4,
      },
    });

    const rawText = response.text || "{}";
    const parsedData = JSON.parse(rawText);
    res.json(parsedData);
  } catch (error: any) {
    console.error("Error in /api/coding:", error);
    res.status(500).json({
      error: error.message || "Failed to analyze code.",
    });
  }
});

// 6. AI Study Planner Generator
app.post("/api/planner", async (req, res) => {
  try {
    const { examName, examDate, availableHoursPerDay = 3, subjects = [] } = req.body;
    const ai = getGeminiClient();

    const userPrompt = `Target Exam/Project: ${examName}
Exam Date/Deadline: ${examDate}
Daily Available Study Hours: ${availableHoursPerDay} hours/day
Key Subjects/Modules to cover: ${subjects.join(", ")}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction: `${BASE_SYSTEM_PROMPT}\n${PLANNER_PROMPT}`,
        responseMimeType: "application/json",
        temperature: 0.5,
      },
    });

    const rawText = response.text || "{}";
    const parsedData = JSON.parse(rawText);
    res.json(parsedData);
  } catch (error: any) {
    console.error("Error in /api/planner:", error);
    res.status(500).json({
      error: error.message || "Failed to generate study schedule.",
    });
  }
});

// ----------------------------------------------------
// VITE / STATIC SERVING
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[CampusPilot AI] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
