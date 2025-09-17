import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    line-height: 1.6;
  }

  #root {
    min-height: 100vh;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

export const colors = {
  primary: '#667eea',
  secondary: '#764ba2',
  accent: '#f093fb',
  white: '#ffffff',
  lightGray: '#f8f9fa',
  gray: '#6c757d',
  darkGray: '#343a40',
  black: '#000000',
  success: '#28a745',
  warning: '#ffc107',
  error: '#dc3545',
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowHover: 'rgba(0, 0, 0, 0.2)'
};

export const breakpoints = {
  mobile: '576px',
  tablet: '768px',
  desktop: '992px',
  large: '1200px'
};

export const animations = {
  fast: '0.2s ease',
  normal: '0.3s ease',
  slow: '0.5s ease',
  bounce: '0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
};

// Common styled components
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: ${breakpoints.tablet}) {
    padding: 0 16px;
  }
`;

export const Button = styled.button`
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
  color: ${colors.white};
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 500;
  cursor: pointer;
  transition: all ${animations.normal};
  font-size: 14px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Card = styled.div`
  background: ${colors.white};
  border-radius: 16px;
  box-shadow: 0 4px 20px ${colors.shadow};
  transition: all ${animations.normal};
  overflow: hidden;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px ${colors.shadowHover};
  }
`;