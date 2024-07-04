import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './app/root';

// Mock Remix components
jest.mock('remix', () => ({
  ...jest.requireActual('remix'),
  Links: () => <div>Links</div>,
  LiveReload: () => <div>LiveReload</div>,
  Meta: () => <div>Meta</div>,
  Outlet: () => <div>Outlet</div>,
  Scripts: () => <div>Scripts</div>,
  ScrollRestoration: () => <div>ScrollRestoration</div>,
}));

test('renders root component', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(screen.getByText('Links')).toBeInTheDocument();
  expect(screen.getByText('Meta')).toBeInTheDocument();
  expect(screen.getByText('Outlet')).toBeInTheDocument();
  expect(screen.getByText('Scripts')).toBeInTheDocument();
  expect(screen.getByText('ScrollRestoration')).toBeInTheDocument();
  expect(screen.getByText('LiveReload')).toBeInTheDocument();
});
