import './index.css';
import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

// 1. Create the router engine
export const router = createRouter({ routeTree });

// 2. Export getRouter for the build engine
export const getRouter = () => router;

// 3. Register the router for TypeScript safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
