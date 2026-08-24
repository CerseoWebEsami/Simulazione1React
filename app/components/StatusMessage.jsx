// StatusMessage.jsx - Stati condivisi di caricamento / errore / vuoto

/**
 * Mostra uno stato di caricamento, errore o "nessun dato" dentro un contenitore.
 *
 * @param {Object} props
 * @param {"idle"|"loading"|"error"|"empty"} props.status - Stato corrente.
 * @param {string} [props.loadingMessage] - Testo mostrato durante il caricamento.
 * @param {string} [props.errorTitle] - Titolo dell'errore.
 * @param {string} [props.errorMessage] - Dettaglio dell'errore.
 * @param {string} [props.emptyMessage] - Messaggio da mostrare se non ci sono dati.
 * @returns {React.JSX.Element|null} - Componente StatusMessage.
 */
function StatusMessage({
  status,
  loadingMessage = '⏳ Caricamento...',
  errorTitle = 'Errore',
  errorMessage = '',
  emptyMessage = 'Nessun dato disponibile.',
}) {
  if (status === 'loading') {
    return <div className="loading">{loadingMessage}</div>;
  }

  if (status === 'error') {
    return (
      <div className="error">
        <strong>❌ {errorTitle}</strong>
        {errorMessage ? <p>{errorMessage}</p> : null}
      </div>
    );
  }

  if (status === 'empty') {
    return <div className="empty">{emptyMessage}</div>;
  }

  return null;
}

export default StatusMessage;
