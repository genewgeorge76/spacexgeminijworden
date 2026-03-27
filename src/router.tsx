import './index.css';
import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

// 1. Create the router engine
export const router = createRouter({ routeTree });

// 2. THE MISSING PIECE: Export getRouter for the Netlify/Vite Build
export const getRouter = () => router;

// 3. Register the router for TypeScript safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
