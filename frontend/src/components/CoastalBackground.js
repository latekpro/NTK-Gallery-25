import React from 'react';
import styled, { keyframes } from 'styled-components';

/* Coastal animation keyframes */
const floatingWave = keyframes`
  0%, 100% {
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.3;
  }
  33% {
    transform: translateY(-15px) translateX(10px) scale(1.1);
    opacity: 0.6;
  }
  66% {
    transform: translateY(5px) translateX(-5px) scale(0.9);
    opacity: 0.4;
  }
`;

const gentleBreeze = keyframes`
  0% {
    transform: translateX(-20px) rotate(0deg);
    opacity: 0;
  }
  50% {
    opacity: 0.4;
    transform: translateX(20px) rotate(180deg);
  }
  100% {
    transform: translateX(40px) rotate(360deg);
    opacity: 0;
  }
`;

const seasideGlow = keyframes`
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.3) rotate(180deg);
    opacity: 0.5;
  }
`;

const CoastalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
`;

const FloatingElement = styled.div.withConfig({
  shouldForwardProp: (prop) => !['bg', 'duration', 'delay', 'size'].includes(prop),
})`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.bg || 'rgba(135, 206, 250, 0.2)'};
  animation: ${floatingWave} ${props => props.duration || '10s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

const WaveElement = styled(FloatingElement).withConfig({
  shouldForwardProp: (prop) => !['bg', 'duration', 'delay', 'size'].includes(prop),
})`
  width: ${props => props.size || '60px'};
  height: ${props => props.size || '60px'};
`;

const GlowElement = styled.div.withConfig({
  shouldForwardProp: (prop) => !['duration', 'delay', 'size'].includes(prop),
})`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  animation: ${seasideGlow} ${props => props.duration || '8s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  width: ${props => props.size || '100px'};
  height: ${props => props.size || '100px'};
`;

const BreezeElement = styled.div.withConfig({
  shouldForwardProp: (prop) => !['duration', 'delay'].includes(prop),
})`
  position: absolute;
  width: 2px;
  height: 40px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, transparent 100%);
  animation: ${gentleBreeze} ${props => props.duration || '6s'} linear infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

const CoastalBackground = () => {
  return (
    <CoastalContainer>
      {/* Floating wave-like elements */}
      <WaveElement 
        size="80px" 
        bg="rgba(135, 206, 250, 0.15)" 
        duration="12s" 
        delay="0s"
        style={{ top: '20%', left: '10%' }}
      />
      <WaveElement 
        size="60px" 
        bg="rgba(102, 126, 234, 0.1)" 
        duration="15s" 
        delay="2s"
        style={{ top: '60%', left: '75%' }}
      />
      <WaveElement 
        size="100px" 
        bg="rgba(118, 75, 162, 0.08)" 
        duration="18s" 
        delay="4s"
        style={{ top: '40%', left: '50%' }}
      />
      <WaveElement 
        size="70px" 
        bg="rgba(70, 130, 180, 0.12)" 
        duration="14s" 
        delay="6s"
        style={{ top: '80%', left: '20%' }}
      />
      <WaveElement 
        size="50px" 
        bg="rgba(100, 149, 237, 0.1)" 
        duration="16s" 
        delay="8s"
        style={{ top: '30%', left: '85%' }}
      />

      {/* Glowing light effects */}
      <GlowElement 
        size="150px" 
        duration="10s" 
        delay="1s"
        style={{ top: '10%', left: '60%' }}
      />
      <GlowElement 
        size="120px" 
        duration="13s" 
        delay="5s"
        style={{ top: '70%', left: '30%' }}
      />
      <GlowElement 
        size="90px" 
        duration="11s" 
        delay="7s"
        style={{ top: '50%', left: '80%' }}
      />

      {/* Gentle breeze effects */}
      <BreezeElement 
        duration="8s" 
        delay="0s"
        style={{ top: '25%', left: '15%' }}
      />
      <BreezeElement 
        duration="12s" 
        delay="3s"
        style={{ top: '65%', left: '40%' }}
      />
      <BreezeElement 
        duration="9s" 
        delay="6s"
        style={{ top: '85%', left: '70%' }}
      />
      <BreezeElement 
        duration="11s" 
        delay="9s"
        style={{ top: '35%', left: '90%' }}
      />
    </CoastalContainer>
  );
};

export default CoastalBackground;