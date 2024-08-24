import axios from 'axios';

const API_KEY = "Your API Key";

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  },
});

export const getOpenAIResponse = async (prompt) => {
  const response = await openai.post('/completions', {
    model: 'gpt-4o-mini',
    prompt: prompt,
    max_tokens: 2048,
  });
  return response.data;
};