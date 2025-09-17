import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, animations, breakpoints } from '../styles/GlobalStyles';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalContainer = styled(motion.div)`
  background: ${colors.white};
  border-radius: 20px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  z-index: 10;
  transition: all ${animations.normal};
  
  &:hover {
    background: ${colors.white};
    transform: scale(1.1);
  }
`;

const Header = styled.div`
  position: relative;
  height: 300px;
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const SpeakerImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 6px solid ${colors.white};
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
`;

const PlaceholderAvatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 6px solid ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 700;
  color: ${colors.white};
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
`;

const Content = styled.div`
  padding: 40px;
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 30px 20px;
  }
`;

const SpeakerName = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${colors.darkGray};
  margin-bottom: 8px;
  text-align: center;
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 28px;
  }
`;

const SpeakerTitle = styled.h2`
  font-size: 18px;
  color: ${colors.gray};
  margin-bottom: 24px;
  text-align: center;
  font-weight: 500;
`;

const Section = styled.div`
  margin-bottom: 32px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.darkGray};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Bio = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${colors.gray};
  margin-bottom: 24px;
`;

const TalksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TalkCard = styled.div`
  background: ${colors.lightGray};
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid ${colors.primary};
`;

const TalkTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.darkGray};
  margin-bottom: 8px;
`;

const TalkMeta = styled.div`
  font-size: 14px;
  color: ${colors.gray};
  margin-bottom: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const TalkAbstract = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: ${colors.gray};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  background: linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20);
  color: ${colors.primary};
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
`;

const SocialLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${colors.lightGray};
  border-radius: 20px;
  text-decoration: none;
  color: ${colors.gray};
  font-size: 14px;
  transition: all ${animations.normal};
  
  &:hover {
    background: ${colors.primary};
    color: ${colors.white};
    transform: translateY(-2px);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 20px;
  color: ${colors.gray};
  font-style: italic;
`;

const SpeakerModal = ({ speaker, onClose }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return 'TBA';
    try {
      return new Date(dateTime).toLocaleString();
    } catch {
      return dateTime;
    }
  };

  const getSocialIcon = (type) => {
    const icons = {
      twitter: '🐦',
      linkedin: '💼',
      github: '🐙',
      website: '🌐',
      email: '📧'
    };
    return icons[type.toLowerCase()] || '🔗';
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <Overlay
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <ModalContainer
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={onClose}>
          ✕
        </CloseButton>
        
        <Header>
          {speaker.imageUrl ? (
            <SpeakerImage
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
        </Header>

        <Content>
          <SpeakerName>{speaker.name}</SpeakerName>
          {speaker.title && <SpeakerTitle>{speaker.title}</SpeakerTitle>}

          {speaker.bio && (
            <Section>
              <SectionTitle>
                📝 About
              </SectionTitle>
              <Bio>{speaker.bio}</Bio>
            </Section>
          )}

          {speaker.talks && speaker.talks.length > 0 && (
            <Section>
              <SectionTitle>
                🎤 Talks ({speaker.talks.length})
              </SectionTitle>
              <TalksList>
                {speaker.talks.map((talk, index) => (
                  <TalkCard key={index}>
                    <TalkTitle>{talk.title}</TalkTitle>
                    <TalkMeta>
                      {talk.dateTime && (
                        <span>📅 {formatDateTime(talk.dateTime)}</span>
                      )}
                      {talk.location && (
                        <span>📍 {talk.location}</span>
                      )}
                      {talk.duration && (
                        <span>⏰ {talk.duration}</span>
                      )}
                    </TalkMeta>
                    {talk.abstract && (
                      <TalkAbstract>{talk.abstract}</TalkAbstract>
                    )}
                  </TalkCard>
                ))}
              </TalksList>
            </Section>
          )}

          {speaker.tags && speaker.tags.length > 0 && (
            <Section>
              <SectionTitle>
                🏷️ Topics
              </SectionTitle>
              <TagsContainer>
                {speaker.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </TagsContainer>
            </Section>
          )}

          {speaker.socialLinks && speaker.socialLinks.length > 0 && (
            <Section>
              <SectionTitle>
                🔗 Connect
              </SectionTitle>
              <SocialLinks>
                {speaker.socialLinks.map((link, index) => (
                  <SocialLink
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{getSocialIcon(link.type)}</span>
                    {link.type.charAt(0).toUpperCase() + link.type.slice(1)}
                  </SocialLink>
                ))}
              </SocialLinks>
            </Section>
          )}

          {(!speaker.bio && (!speaker.talks || speaker.talks.length === 0) && 
            (!speaker.tags || speaker.tags.length === 0) && 
            (!speaker.socialLinks || speaker.socialLinks.length === 0)) && (
            <EmptyState>
              More information about this speaker will be available soon.
            </EmptyState>
          )}
        </Content>
      </ModalContainer>
    </Overlay>
  );
};

export default SpeakerModal;