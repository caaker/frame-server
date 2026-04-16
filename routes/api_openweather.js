import { Router } from 'express';
const router = Router();
const OPENWEATHER_KEY = '78fd50d70e6c6a18205f31af5ff95107';

router.route('/air').get(async (req, res) => {
  const { lat, lon } = req.query;
  const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  res.status(200).json(data);
});

router.route('/weather').get(async (req, res) => {
  const { lat, lon } = req.query;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${OPENWEATHER_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
    res.status(200).json(data);
});

export { router as api_openweather };
