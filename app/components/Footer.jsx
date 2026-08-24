// Footer.jsx - Footer riutilizzabile

/**
 * Footer dell'applicazione con crediti dei dati.
 * @returns {React.JSX.Element} - Componente Footer.
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          🌦️ Weather App | Dati da{' '}
          <a href="https://open-meteo.com" target="_blank" rel="noreferrer">
            Open-Meteo
          </a>
        </p>
        <p>API libera e gratuita, senza registrazione</p>
      </div>
    </footer>
  );
}

export default Footer;
