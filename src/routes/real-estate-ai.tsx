import { createFileRoute } from '@tanstack/react-router';
import RealEstateAINode from '@/components/RealEstateAINode';

export const Route = createFileRoute('/real-estate-ai')({
  component: RealEstateAINode,
});
