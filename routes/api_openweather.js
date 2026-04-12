import { Router } from 'express';
const router = Router();
const OPENWEATHER_KEY = '78fd50d70e6c6a18205f31af5ff95107';

router.route('/openweather').get(async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('DEBUG: Fetch to openweather failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { router as api_openweather };