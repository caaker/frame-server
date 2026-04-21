import OpenAI from 'openai';
import { Router } from 'express';
const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI });

router.post('/message', async (req, res) => {
  const { message } = req.body;
  const response = await openai.responses.create({
    model: 'gpt-4o-mini',
    input: [
      { role: 'system', content: 'You are a helpful assistant for health and longevity.' },
      { role: 'user', content: message }
    ]
  });

  res.json({
    reply: response.output_text
  });

});

export { router as api_chatgpt };