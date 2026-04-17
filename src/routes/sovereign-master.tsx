import { createFileRoute } from '@tanstack/react-router';
import JWordenSovereignMaster from '@/components/JWordenSovereignMaster';

export const Route = createFileRoute('/sovereign-master')({
  component: JWordenSovereignMaster,
});
