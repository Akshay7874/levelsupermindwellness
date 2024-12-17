// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/authReducer';
import { logoutFunc } from '../services/firebase';

const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = async () => {
        await logoutFunc(dispatch);  // Calls logout function from firebase service
    };

    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold">
                    <Link to="/">Hackathon Manager</Link>
                </div>
                <div className="space-x-10">
                    <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                    <Link to="/hackathons" className="text-white hover:text-gray-300">Hackathons</Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
                            <button
                                onClick={handleLogout}
                                className="text-white hover:text-gray-300"
                            >
                                Logout
                            </button>
                            <Link to="/create-hackathon" className="text-white hover:text-gray-300">
                                Create Hackathon
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
                            <Link to="/register" className="text-white hover:text-gray-300">Register</Link>
                        </>
                    )}






                </div>
            </div>
        </nav>
    );
};

export default Navbar;
