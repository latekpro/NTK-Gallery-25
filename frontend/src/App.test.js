import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the useSpeakers hook to avoid API calls during testing
jest.mock('./hooks/useSpeakers', () => ({
  useSpeakers: () => ({
    speakers: [],
    loading: false,
    error: null
  })
}));

describe('App', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('renders application content', () => {
    const { container } = render(<App />);
    // The app should render without errors
    // This is a basic smoke test to ensure the component structure is valid
    expect(container.firstChild).toBeTruthy();
  });
});