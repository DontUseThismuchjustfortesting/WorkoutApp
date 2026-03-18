import { GoogleGenAI, Type } from "@google/genai";
import { WorkoutPreferences, WorkoutPlan } from "../types";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateWorkoutPlan(prefs: WorkoutPreferences): Promise<WorkoutPlan> {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Create a detailed, professional workout plan for someone with the following preferences:
    - Sport/Activity: ${prefs.sport}
    - Goals: ${prefs.goals}
    - Fitness Level: ${prefs.fitnessLevel}
    - Available Equipment: ${prefs.equipment}
    - Frequency: ${prefs.frequency} days per week
    - Session Duration: ${prefs.duration} minutes
    ${prefs.additionalInfo ? `- Additional Info: ${prefs.additionalInfo}` : ''}

    The plan should be structured as a weekly schedule. 
    Provide a title for the plan, a brief description, a day-by-day schedule, and 3-5 key tips for success.
  `;

  const response = await genAI.models.generateContent({
    model,
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          schedule: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING },
                activity: { type: Type.STRING },
                details: { type: Type.STRING }
              },
              required: ["day", "activity", "details"]
            }
          },
          tips: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["title", "description", "schedule", "tips"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as WorkoutPlan;
}

export async function getWorkoutDetails(activity: string, details: string, prefs: WorkoutPreferences): Promise<string> {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    The user is following a workout plan for ${prefs.sport} with the goal of ${prefs.goals}.
    They are at a ${prefs.fitnessLevel} level and have ${prefs.equipment} available.
    
    Today's activity is: "${activity}"
    Brief details: "${details}"
    
    Provide a more detailed explanation of how to perform this workout. 
    Include specific exercises, sets, reps, or durations where appropriate. 
    Also, add a "Pro Tip" for this specific session.
    Format the response in clear Markdown.
  `;

  const response = await genAI.models.generateContent({
    model,
    contents: [{ parts: [{ text: prompt }] }],
  });

  return response.text || "Could not generate details at this time.";
}
