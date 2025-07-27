import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import App from './App.tsx';
import { About } from './components/About/About.tsx';
import { Layout } from './components/Layout/Layout.tsx';
import { CardDetails } from './components/DetailsPanel/DetailsPanel.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
        children: [
          {
            path: 'page/:page',
            children: [
              {
                path: 'card/:id',
                element: <CardDetails />,
              },
            ],
          },
        ],
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
} else {
  throw new Error('Element with ID "root" not found.');
}
