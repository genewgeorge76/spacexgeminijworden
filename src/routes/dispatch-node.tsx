import { createFileRoute } from '@tanstack/react-router';
import DispatchNode from '../components/DispatchNode';

export const Route = createFileRoute('/dispatch-node')({
  component: DispatchNode,
});
