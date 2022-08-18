import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import AboutMe from './components/AboutMe';
import Connect from './components/Connect';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import ResetPage from './components/ResetPage';

function App() {

  return (
      <Router>
          <ResetPage />
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/about-me' element={<AboutMe />} />
              <Route path='/connect' element={<Connect />} />
              <Route path='/terms' element={<Terms />} />
              <Route path='/privacy' element={<Privacy />} />
          </Routes>
      </Router>
  );
}

export default App;
