import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { colors, Container } from '../styles/GlobalStyles';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: ${colors.white};
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top: 4px solid ${colors.white};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled(motion.h2)`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const LoadingSubtext = styled(motion.p)`
  font-size: 16px;
  opacity: 0.8;
  text-align: center;
  max-width: 400px;
  line-height: 1.5;
`;

const FloatingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
`;

const FloatingElement = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: ${float} 3s ease-in-out infinite;
  
  &:nth-child(1) {
    width: 80px;
    height: 80px;
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }
  
  &:nth-child(2) {
    width: 60px;
    height: 60px;
    top: 60%;
    right: 10%;
    animation-delay: 1s;
  }
  
  &:nth-child(3) {
    width: 40px;
    height: 40px;
    top: 80%;
    left: 50%;
    animation-delay: 2s;
  }
  
  &:nth-child(4) {
    width: 100px;
    height: 100px;
    top: 30%;
    right: 30%;
    animation-delay: 0.5s;
  }
`;

const LoadingSpinner = ({ message = "Loading amazing speakers..." }) => {
  return (
    <LoadingContainer>
      <FloatingElements>
        <FloatingElement />
        <FloatingElement />
        <FloatingElement />
        <FloatingElement />
      </FloatingElements>
      
      <Container>
        <SpinnerContainer>
          <Spinner />
          
          <LoadingText
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {message}
          </LoadingText>
          
          <LoadingSubtext
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We're fetching the latest speaker information from the NTK conference. 
            This should only take a moment.
          </LoadingSubtext>
        </SpinnerContainer>
      </Container>
    </LoadingContainer>
  );
};

export default LoadingSpinner;