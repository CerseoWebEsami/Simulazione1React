import { useState } from 'react';
import { getWeatherByCoordinates } from '../services/api.js';

const INITIAL_STATE = {
  open: false,
  title: '',
  subtitle: '',
  weather: null,
  loading: false,
  error: null,
};

/**
 * Hook per la modale condivisa dei dettagli meteo.
 *
 * Fornisce lo stato della modale e la funzione per aprirla a partire
 * da un record (voce di cronologia o preferito), caricando il meteo
 * dalle coordinate e gestendo caricamento/errore.
 *
 * @returns {{ modalState: Object, openRecord: Function, closeModal: Function }}
 */
export function useWeatherModal() {
  const [modalState, setModalState] = useState(INITIAL_STATE);

  async function openRecord(entry, onBeforeRequest) {
    const subtitle = `${entry.latitude.toFixed(2)}°, ${entry.longitude.toFixed(2)}°`;

    setModalState({
      open: true,
      title: entry.name,
      subtitle,
      weather: null,
      loading: true,
      error: null,
    });

    try {
      if (typeof onBeforeRequest === 'function') {
        onBeforeRequest();
      }

      const weather = await getWeatherByCoordinates(entry.latitude, entry.longitude);
      setModalState((state) => ({ ...state, weather, loading: false }));
    } catch (error) {
      setModalState((state) => ({ ...state, loading: false, error: error.message }));
    }
  }

  function closeModal() {
    setModalState((state) => ({ ...state, open: false }));
  }

  return { modalState, openRecord, closeModal };
}
