// FavoriteButton.jsx - Il pulsante ⭐ per aggiungere ai preferiti
//
// Mostra ⭐ se non è nei preferiti, ✅ se lo è già.

/**
 * Pulsante inline per aggiungere la posizione corrente ai preferiti.
 *
 * @param {Object} props
 * @param {boolean} props.visible - Se true, il pulsante è mostrato
 * @param {boolean} props.isFavorite - Se true, la posizione è già nei preferiti
 * @param {Function} props.onClick - Callback al click sul pulsante
 * @returns {React.JSX.Element|null} - Componente FavoriteButton.
 */
function FavoriteButton({ visible, isFavorite, onClick }) {
  if (!visible) {
    return null;
  }

  return (
    <button
      id="btn-add-favorite"
      type="button"
      className="btn btn-favorite-inline"
      onClick={onClick}
      disabled={isFavorite}
      title={isFavorite ? 'Già nei preferiti' : 'Aggiungi ai preferiti'}
      style={{ opacity: isFavorite ? 0.5 : 1 }}
    >
      {isFavorite ? '✅' : '⭐'}
    </button>
  );
}

export default FavoriteButton;
