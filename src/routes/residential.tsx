import { createFileRoute } from '@tanstack/react-router';
import { ResidentialHub } from '../components/public/ResidentialHub';

export const Route = createFileRoute('/residential')({
  component: ResidentialHub,
});
