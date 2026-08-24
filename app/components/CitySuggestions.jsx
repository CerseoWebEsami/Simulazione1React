// CitySuggestions.jsx - Dropdown di autocomplete per la ricerca città

/**
 * Lista dei suggerimenti città da mostrare nel dropdown.
 *
 * @param {Object} props
 * @param {Array<Object>} props.items - Città trovate dall'API di geocoding
 * @param {Function} props.onSelect - Callback invocata al click su un suggerimento, riceve { name, country, latitude, longitude }
 * @returns {React.JSX.Element} - Lista dei suggerimenti.
 */
function SuggestionItems({ items, onSelect }) {
  if (!items || items.length === 0) {
    return <div style={{ padding: '10px' }}>Nessuna città trovata</div>;
  }

  // TODO 1: Mappa l'array 'items' (prendendo solo i primi 5 elementi) per creare gli elementi da mostrare.
  // Ogni elemento deve essere un <div className="suggestion-item"> cliccabile, con testo
  // "{name}, {country}" (se country è presente), che al click chiama onSelect() passando
  // { name, country, latitude, longitude } presi dall'item corrispondente.
  return /* inserisci qui la logica map() con .slice(0, 5) */ null;
}

/**
 * Contenitore del dropdown di autocomplete per la ricerca città.
 *
 * @param {Object} props
 * @param {Array<Object>|null} props.items - Città trovate (null = dropdown nascosto)
 * @param {boolean} props.loading - True mentre la ricerca è in corso
 * @param {boolean} props.error - True se la ricerca ha fallito
 * @param {Function} props.onSelect - Callback invocata alla selezione di una città
 * @returns {React.JSX.Element|null} - Componente CitySuggestions.
 */
function CitySuggestions({ items, loading, error, onSelect }) {
  const visible = loading || error || items !== null;

  if (!visible) {
    return null;
  }

  return (
    <div className="suggestions">
      {loading && <div style={{ padding: '10px' }}>🔍 Ricerca...</div>}
      {!loading && error && (
        <div style={{ padding: '10px', color: 'red' }}>❌ Errore nella ricerca</div>
      )}
      {!loading && !error && <SuggestionItems items={items} onSelect={onSelect} />}
    </div>
  );
}

export default CitySuggestions;
