import { createFileRoute } from '@tanstack/react-router';
import InvestorROINode from '@/components/InvestorROINode';

export const Route = createFileRoute('/investor-roi')({
  component: InvestorROINode,
});
