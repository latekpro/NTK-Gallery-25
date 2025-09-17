import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, animations } from '../styles/GlobalStyles';

const SpeakerCardContainer = styled(motion.div)`
  background: ${colors.white};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all ${animations.normal};
  margin-bottom: 20px;
  break-inside: avoid;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const SpeakerImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${animations.normal};
  }
  
  &:hover img {
    transform: scale(1.1);
  }
`;

const PlaceholderAvatar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 600;
  color: ${colors.white};
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
`;

const SpeakerInfo = styled.div`
  padding: 20px;
`;

const SpeakerName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.darkGray};
  margin-bottom: 8px;
  line-height: 1.3;
`;

const SpeakerTitle = styled.p`
  font-size: 14px;
  color: ${colors.gray};
  margin-bottom: 12px;
  line-height: 1.4;
`;

const SpeakerBio = styled.p`
  font-size: 13px;
  color: ${colors.gray};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
`;

const TalkCount = styled.div`
  font-size: 12px;
  color: ${colors.primary};
  font-weight: 500;
  
  &::before {
    content: '🎤 ';
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
`;

const Tag = styled.span`
  background: linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20);
  color: ${colors.primary};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`;

const SpeakerCard = ({ speaker, onClick, index }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <SpeakerCardContainer
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={() => onClick(speaker)}
      layout
    >
      <SpeakerImage>
        {speaker.imageUrl ? (
          <img 
            src={speaker.imageUrl} 
            alt={speaker.name}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <PlaceholderAvatar style={{ display: speaker.imageUrl ? 'none' : 'flex' }}>
          {getInitials(speaker.name)}
        </PlaceholderAvatar>
      </SpeakerImage>
      
      <SpeakerInfo>
        <SpeakerName>{speaker.name}</SpeakerName>
        {speaker.title && <SpeakerTitle>{speaker.title}</SpeakerTitle>}
        {speaker.bio && <SpeakerBio>{speaker.bio}</SpeakerBio>}
        
        {speaker.talks && speaker.talks.length > 0 && (
          <TalkCount>
            {speaker.talks.length} talk{speaker.talks.length !== 1 ? 's' : ''}
          </TalkCount>
        )}
        
        {speaker.tags && speaker.tags.length > 0 && (
          <TagsContainer>
            {speaker.tags.slice(0, 3).map((tag, idx) => (
              <Tag key={idx}>{tag}</Tag>
            ))}
            {speaker.tags.length > 3 && (
              <Tag>+{speaker.tags.length - 3} more</Tag>
            )}
          </TagsContainer>
        )}
      </SpeakerInfo>
    </SpeakerCardContainer>
  );
};

export default SpeakerCard;