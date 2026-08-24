// Header.jsx - Header riutilizzabile con navigazione principale

import { Link, NavLink } from 'react-router';

const PAGES = [
  { name: 'Home', path: '/' },
  { name: 'Ricerca', path: '/search' },
  { name: 'Archivio', path: '/archive' },
  { name: 'Cronologia', path: '/history' },
  { name: 'Preferiti', path: '/favorites' },
];

/**
 * Header dell'applicazione con logo e navigazione tra le pagine.
 * @returns {React.JSX.Element} - Componente Header.
 */
function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">
          <Link to="/">🌤️ Weather App</Link>
        </h1>
        <nav className="header-nav">
          <ul>
            {PAGES.map((page) => (
              <li key={page.path}>
                <NavLink
                  to={page.path}
                  end={page.path === '/'}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                >
                  {page.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
