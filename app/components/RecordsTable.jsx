// RecordsTable.jsx - Mostra una tabella con righe cliccabili
//
// Usata per la cronologia e per i preferiti.
// Ogni riga può essere cliccata e cancellata.

/**
 * Tabella con cronologia o preferiti.
 *
 * @param {Object} props
 * @param {Array<Object>} props.records - I record da mostrare
 * @param {string} props.emptyMessage - Messaggio se non ci sono record (es: "Nessun favorito")
 * @param {Array<Object>} props.columns - Le colonne della tabella. Esempio: [{ header: "Data", render: (entry) => entry.name }]
 * @param {Function} props.onRowClick - Cosa fare se clicco una riga
 * @param {Function} props.onDelete - Cosa fare se clicco delete su una riga
 * @param {Function} [props.onDeleteAll] - Cosa fare se clicco "cancella tutto"
 * @param {string} [props.clearAllLabel="Cancella tutto"] - Testo del pulsante "cancella tutto"
 * @param {string} [props.deleteLabel="Rimuovi"] - Testo del pulsante "rimuovi" per ogni riga
 * @returns {React.JSX.Element} - Componente RecordsTable.
 */
function RecordsTable({
  records,
  emptyMessage,
  columns,
  onRowClick,
  onDelete,
  onDeleteAll,
  clearAllLabel = 'Cancella tutto',
  deleteLabel = 'Rimuovi',
}) {
  if (!records || records.length === 0) {
    return (
      <section style={{ padding: '20px', textAlign: 'center' }}>
        <p>{emptyMessage}</p>
      </section>
    );
  }

  function handleClearAll() {
    const conferma = confirm('Sei sicuro?');

    if (!conferma) {
      onDeleteAll();
    }
  }

  return (
    <section className="records-panel">
      <div
        className="records-header"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '10px 20px',
        }}
      >
        {onDeleteAll && (
          <button
            id="btn-clear-all"
            className="btn btn-secondary btn-danger"
            type="button"
            onClick={handleClearAll}
          >
            {clearAllLabel}
          </button>
        )}
      </div>
      <div className="records-table-wrapper">
        <table className="records-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.header}>{col.header}</th>
              ))}
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr
                key={record.id ?? record.timestamp ?? index}
                className="records-row"
                tabIndex={0}
                onClick={() => onRowClick?.(record)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onRowClick?.(record);
                  }
                }}
              >
                {columns.map((col) => (
                  <td key={col.header}>{col.render(record)}</td>
                ))}
                <td className="records-actions">
                  <button
                    className="btn btn-danger btn-delete"
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onDelete?.(record);
                    }}
                  >
                    {deleteLabel}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RecordsTable;
