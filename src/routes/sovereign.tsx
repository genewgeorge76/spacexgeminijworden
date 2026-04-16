import { createFileRoute } from '@tanstack/react-router';
import JWordenSovereignEngine from '@/components/JWordenSovereignEngine';

export const Route = createFileRoute('/sovereign')({
  component: JWordenSovereignEngine,
});
