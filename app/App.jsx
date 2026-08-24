import { Route, Routes } from 'react-router';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Archive from './pages/Archive.jsx';
import Favorites from './pages/Favorites.jsx';
import History from './pages/History.jsx';
import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';

/**
 * Componente principale dell'applicazione.
 * @returns {React.JSX.Element} - Componente App.
 */
function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/history" element={<History />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
