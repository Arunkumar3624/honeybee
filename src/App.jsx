import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* When the URL path is exactly "/", show the Home page */}
        <Route path="/" element={<Home />} />
        
        {/* When the URL path is "/menu", show the Menu page */}
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}