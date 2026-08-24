// Favorites.jsx - Pagina PREFERITI

import { useState } from 'react';
import RecordsTable from '../components/RecordsTable.jsx';
import WeatherDetailsModal from '../components/WeatherDetailsModal.jsx';
import { useWeatherModal } from '../hooks/useWeatherModal.js';
import { addToHistory, clearFavorites, getFavorites, removeFavorite } from '../services/storage.js';

/**
 * Pagina con l'elenco delle posizioni preferite salvate dall'utente.
 * @returns {React.JSX.Element} - Componente Favorites.
 */
function Favorites() {
  const [favorites, setFavorites] = useState(() => getFavorites());
  const { modalState, openRecord, closeModal } = useWeatherModal();

  function refresh() {
    setFavorites(getFavorites());
  }

  function openFavoriteWeather(entry) {
    openRecord(entry, () => addToHistory(entry.name, entry.latitude, entry.longitude));
  }

  function handleDelete(entry) {
    removeFavorite(entry.id);
    closeModal();
    refresh();
  }

  function handleDeleteAll() {
    clearFavorites();
    closeModal();
    refresh();
  }

  return (
    <main className="main-content">
      <section className="page-section">
        <div className="search-form">
          <h2>💙 Posizioni Preferite</h2>
          <p className="section-description">Clicca su una riga per aprire i dettagli nel modale</p>
        </div>
      </section>

      <section className="page-section">
        <div id="favorites-container" className="result-container">
          <RecordsTable
            records={favorites}
            emptyMessage="💔 Nessun preferito salvato. Vai a Ricerca per aggiungerne uno!"
            columns={[
              { header: 'Località', render: (fav) => fav.name },
              {
                header: 'Coordinate',
                render: (fav) => `${fav.latitude.toFixed(2)}°, ${fav.longitude.toFixed(2)}°`,
              },
            ]}
            onRowClick={openFavoriteWeather}
            onDelete={handleDelete}
            onDeleteAll={handleDeleteAll}
            clearAllLabel="Cancella preferiti"
            deleteLabel="Rimuovi"
          />
        </div>
      </section>

      <WeatherDetailsModal {...modalState} onClose={closeModal} />
    </main>
  );
}

export default Favorites;
