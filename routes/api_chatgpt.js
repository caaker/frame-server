import OpenAI from 'openai';
import { Router } from 'express';
const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI
});

router.post('/message', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await openai.responses.create({
    model: 'gpt-5.3-mini',
    input: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message }
      ]
    });
    res.json({
      reply: response.output_text
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export { router as api_chatgpt };

/*  models
      model: 'gpt-5.3-mini',
      model: 'gpt-5.3',


    notets:
      two methods to guide behavior
        instructions:
        role;
*/