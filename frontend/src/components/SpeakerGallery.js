import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from 'react-masonry-css';
import { useDebounce } from 'use-debounce';
import SpeakerCard from './SpeakerCard';
import SpeakerModal from './SpeakerModal';
import LoadingSpinner from './LoadingSpinner';
import { colors, breakpoints, Container } from '../styles/GlobalStyles';

const GalleryContainer = styled.div`
  min-height: 100vh;
  padding: 40px 0;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
  color: ${colors.white};
`;

const Title = styled(motion.h1)`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  background: linear-gradient(135deg, ${colors.white} 0%, ${colors.accent} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: ${breakpoints.tablet}) {
    font-size: 36px;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 18px;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto 40px;
  line-height: 1.6;
  
  @media (max-width: ${breakpoints.tablet}) {
    font-size: 16px;
  }
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
  
  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
`;

const SearchInput = styled(motion.input)`
  width: 100%;
  padding: 16px 50px 16px 20px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    background: ${colors.white};
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  
  &::placeholder {
    color: ${colors.gray};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.gray};
  font-size: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  
  @media (max-width: ${breakpoints.tablet}) {
    justify-content: center;
  }
`;

const FilterTag = styled(motion.button)`
  padding: 8px 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  background: ${props => props.active ? colors.white : 'transparent'};
  color: ${props => props.active ? colors.primary : colors.white};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-2px);
  }
`;

const Stats = styled(motion.div)`
  text-align: center;
  margin-bottom: 30px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
`;

const MasonryContainer = styled.div`
  .masonry-grid {
    display: flex;
    margin-left: -20px;
    width: auto;
  }
  
  .masonry-grid-column {
    padding-left: 20px;
    background-clip: padding-box;
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.8);
  
  h3 {
    font-size: 24px;
    margin-bottom: 12px;
    color: ${colors.white};
  }
  
  p {
    font-size: 16px;
    opacity: 0.8;
  }
`;

const SpeakerGallery = ({ speakers, loading, error }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    speakers.forEach(speaker => {
      if (speaker.tags) {
        speaker.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, [speakers]);

  // Filter speakers based on search and tags
  const filteredSpeakers = useMemo(() => {
    return speakers.filter(speaker => {
      const matchesSearch = !debouncedSearchTerm || 
        speaker.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        speaker.title?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        speaker.bio?.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => speaker.tags?.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [speakers, debouncedSearchTerm, selectedTags]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const breakpointColumns = {
    default: 4,
    1200: 3,
    768: 2,
    576: 1
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <GalleryContainer>
        <Container>
          <EmptyState
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
          </EmptyState>
        </Container>
      </GalleryContainer>
    );
  }

  return (
    <GalleryContainer>
      <Container>
        <Header>
          <Title
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            NTK Speakers Gallery
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover amazing speakers from the NTK conference. Click on any speaker to learn more about their talks and expertise.
          </Subtitle>
        </Header>

        <Controls>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search speakers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
            <SearchIcon>🔍</SearchIcon>
          </SearchContainer>

          {allTags.length > 0 && (
            <FilterContainer>
              {allTags.slice(0, 8).map(tag => (
                <FilterTag
                  key={tag}
                  active={selectedTags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tag}
                </FilterTag>
              ))}
            </FilterContainer>
          )}
        </Controls>

        <Stats
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Showing {filteredSpeakers.length} of {speakers.length} speakers
        </Stats>

        {filteredSpeakers.length === 0 ? (
          <EmptyState
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3>No speakers found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </EmptyState>
        ) : (
          <MasonryContainer>
            <Masonry
              breakpointCols={breakpointColumns}
              className="masonry-grid"
              columnClassName="masonry-grid-column"
            >
              <AnimatePresence>
                {filteredSpeakers.map((speaker, index) => (
                  <SpeakerCard
                    key={speaker.id}
                    speaker={speaker}
                    index={index}
                    onClick={setSelectedSpeaker}
                  />
                ))}
              </AnimatePresence>
            </Masonry>
          </MasonryContainer>
        )}
      </Container>

      <AnimatePresence>
        {selectedSpeaker && (
          <SpeakerModal
            speaker={selectedSpeaker}
            onClose={() => setSelectedSpeaker(null)}
          />
        )}
      </AnimatePresence>
    </GalleryContainer>
  );
};

export default SpeakerGallery;