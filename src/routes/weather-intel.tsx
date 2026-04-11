import { createFileRoute } from '@tanstack/react-router';
import WeatherIntel from '@/components/WeatherIntel';

export const Route = createFileRoute('/weather-intel')({
  component: WeatherIntel,
});
