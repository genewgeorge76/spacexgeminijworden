import { createFileRoute } from '@tanstack/react-router';
import MrWorden3D from '@/components/MrWorden3D';

export const Route = createFileRoute('/mr-worden-3d')({
  component: MrWorden3D,
});
