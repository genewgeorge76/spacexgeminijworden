import './index.css'; // This turns on the Black and Gold theme
import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export const router = createRouter({ routeTree });
export const getRouter = () => router;

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
