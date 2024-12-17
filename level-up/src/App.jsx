// src/App.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { monitorAuthState } from './services/firebase';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HackathonList from './pages/HackathonList';
import CreateHackathon from './pages/CreateHackathon';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    monitorAuthState(dispatch);  // Monitor authentication state
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />
        <Route path="/hackathons" element={<HackathonList />} />
        <Route path="/create-hackathon" element={user ? <CreateHackathon /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
