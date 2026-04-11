import { createFileRoute } from '@tanstack/react-router';
import CommandCenter from '@/components/CommandCenter';

export const Route = createFileRoute('/command-center')({
  component: CommandCenter,
});
