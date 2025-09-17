import { useState, useEffect } from 'react';
import { speakersApi } from '../services/api';

export const useSpeakers = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchSpeakers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await speakersApi.getAllSpeakers();
      
      if (response.success) {
        setSpeakers(response.data || []);
        setLastUpdated(new Date());
      } else {
        throw new Error(response.error || 'Failed to fetch speakers');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching speakers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const refetch = () => {
    fetchSpeakers();
  };

  return {
    speakers,
    loading,
    error,
    lastUpdated,
    refetch
  };
};

export const useSpeaker = (id) => {
  const [speaker, setSpeaker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchSpeaker = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await speakersApi.getSpeakerById(id);
        
        if (response.success) {
          setSpeaker(response.data);
        } else {
          throw new Error(response.error || 'Failed to fetch speaker');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching speaker:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeaker();
  }, [id]);

  return {
    speaker,
    loading,
    error
  };
};