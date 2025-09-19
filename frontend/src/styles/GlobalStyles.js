import styled, { createGlobalStyle, keyframes } from 'styled-components';

/* Keyframe animations for coastal atmosphere */
const gradientShift = keyframes`
  0%, 100% {
    background-position: 0% 50%, 0% 50%;
  }
  25% {
    background-position: 100% 50%, 25% 75%;
  }
  50% {
    background-position: 100% 100%, 50% 100%;
  }
  75% {
    background-position: 0% 100%, 75% 25%;
  }
`;

const waveFloat = keyframes`
  0%, 100% {
    transform: translateY(0px) translateX(0px);
    opacity: 0.4;
  }
  25% {
    transform: translateY(-10px) translateX(5px);
    opacity: 0.6;
  }
  50% {
    transform: translateY(0px) translateX(10px);
    opacity: 0.5;
  }
  75% {
    transform: translateY(5px) translateX(5px);
    opacity: 0.7;
  }
`;

const lightShimmer = keyframes`
  0%, 100% {
    opacity: 0.2;
    transform: scale(1) rotate(0deg);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.1) rotate(180deg);
  }
`;

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
    /* Animated panoramic background inspired by Portorož coastal scenery */
    background: 
      linear-gradient(
        to bottom,
        rgba(135, 206, 250, 0.8) 0%,
        rgba(135, 206, 250, 0.6) 30%,
        rgba(102, 126, 234, 0.8) 70%,
        rgba(118, 75, 162, 0.9) 100%
      ),
      linear-gradient(
        45deg,
        #87CEEB 0%,
        #4682B4 25%,
        #6495ED 50%,
        #4169E1 75%,
        #667eea 100%
      );
    background-size: 100% 100%, 300% 300%;
    background-attachment: fixed;
    background-repeat: no-repeat;
    animation: ${gradientShift} 15s ease-in-out infinite;
    min-height: 100vh;
    line-height: 1.6;
    position: relative;
    overflow-x: hidden;
  }
  
  /* Add a subtle coastal atmosphere with animated overlay */
  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(ellipse at top, rgba(255, 255, 255, 0.1) 0%, transparent 70%),
      radial-gradient(ellipse at bottom, rgba(135, 206, 250, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
    animation: ${lightShimmer} 8s ease-in-out infinite;
  }

  /* Floating coastal elements */
  body::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 80% 20%, rgba(135, 206, 250, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 40% 40%, rgba(102, 126, 234, 0.08) 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
    animation: ${waveFloat} 12s ease-in-out infinite;
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