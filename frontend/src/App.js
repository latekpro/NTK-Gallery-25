import React from 'react';
import { GlobalStyle } from './styles/GlobalStyles';
import SpeakerGallery from './components/SpeakerGallery';
import CoastalBackground from './components/CoastalBackground';
import { useSpeakers } from './hooks/useSpeakers';

function App() {
  const { speakers, loading, error } = useSpeakers();

  return (
    <>
      <GlobalStyle />
      <CoastalBackground />
      <SpeakerGallery 
        speakers={speakers} 
        loading={loading} 
        error={error} 
      />
    </>
  );
}

export default App;