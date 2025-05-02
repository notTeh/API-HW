import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  try {
    const { city } = req.body;
    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }

    const weatherData = await WeatherService.getWeatherForCity(city);
  // TODO: save city to search history
    await HistoryService.addCity(city);

    return res.status(200).json(weatherData);
  }
  catch (error) {
    console.error('Error fetching weather data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// TODO: GET search history
router.get('/history', async (_: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    res.status(200).json({ history });
  } catch (error) {
    console.error('Error retrieving search history:', error);
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// * BONUS TODO: DELETE city from search history

export default router;
