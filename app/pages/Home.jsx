// Home.jsx - Pagina HOME (guida sito)

import { Link } from 'react-router';

/**
 * Pagina principale con panoramica dell'app e guida rapida.
 * @returns {React.JSX.Element} - Componente Home.
 */
function Home() {
  return (
    <main className="main-content">
      <section className="home-hero page-section">
        <h2>Benvenuto su Weather App</h2>
        <p>
          Un sito semplice per consultare meteo attuale, previsioni e storico delle citta. Scegli
          una sezione dal menu oppure usa i collegamenti rapidi qui sotto.
        </p>
        <div className="quick-links">
          <Link className="btn btn-primary" to="/search">
            Vai a Ricerca
          </Link>
          <Link className="btn btn-secondary" to="/archive">
            Apri Archivio
          </Link>
        </div>
      </section>

      <section className="home-guide page-section">
        <h3>Come funziona</h3>
        {/* TODO 2: Aggiungi la classe CSS corretta a questo div per mostrare le GUIDE come una GRIGLIA */}
        <div className="">
          <article className="guide-card">
            <h4>1. Cerca una citta</h4>
            <p>Vai su Ricerca e inserisci il nome della citta oppure le coordinate geografiche.</p>
          </article>
          <article className="guide-card">
            <h4>2. Leggi il meteo</h4>
            <p>Visualizza meteo corrente e previsioni su una singola schermata compatta.</p>
          </article>
          <article className="guide-card">
            <h4>3. Salva e consulta</h4>
            <p>Usa Preferiti e Cronologia per tornare alle localita piu usate in un click.</p>
          </article>
          <article className="guide-card">
            <h4>4. Controlla lo storico</h4>
            <p>Apri Archivio, scegli una citta e un intervallo date per vedere il meteo passato.</p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Home;
