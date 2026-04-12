import OpenAI from 'openai';
import { Router } from 'express';
const router = Router();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// router.post('/', async (req, res) => {
//   try {
//     const { message } = req.body;
//     const response = await openai.responses.create({
//       model: 'gpt-4.1-mini',
//       input: message,
//     });
//     res.json({
//       reply: response.output[0].content[0].text,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

export { router as agents_chatgpt };