import { createFileRoute } from '@tanstack/react-router';
import LegalComplianceNode from '@/components/LegalComplianceNode';

export const Route = createFileRoute('/legal-compliance')({
  component: LegalComplianceNode,
});
