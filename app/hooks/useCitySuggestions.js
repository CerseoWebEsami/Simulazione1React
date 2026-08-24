import { useEffect, useRef, useState } from 'react';

/**
 * Hook per l'autocomplete della ricerca città.
 *
 * Effettua una ricerca "debounced" (300ms) sull'input digitato dall'utente,
 * mostrando uno stato di caricamento e gestendo eventuali errori.
 *
 * @param {Function} fetchSuggestions - Funzione che ricerca le città (es: API call)
 * @returns {{ items: Array|null, loading: boolean, error: boolean, search: Function, reset: Function }}
 */
export function useCitySuggestions(fetchSuggestions) {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const timerRef = useRef(null);

  function search(text) {
    clearTimeout(timerRef.current);

    if (text.trim().length < 2) {
      setItems(null);
      setError(false);
      setLoading(false);
      return;
    }

    timerRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        setError(false);
        const results = await fetchSuggestions(text.trim());
        setItems(results);
      } catch (errore) {
        console.error('Errore ricerca città:', errore);
        setError(true);
        setItems(null);
      } finally {
        setLoading(false);
      }
    }, 300);
  }

  function reset() {
    clearTimeout(timerRef.current);
    setItems(null);
    setError(false);
    setLoading(false);
  }

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return { items, loading, error, search, reset };
}
