// src/pages/Home.js
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">Welcome to Hackathon Manager</h1>
            <p className="text-lg mb-6">Find, Create, and Participate in Hackathons</p>
            <Link to="/hackathons" className="p-2 bg-blue-500 text-white rounded">Browse Hackathons</Link>
        </div>
    );
};

export default Home;
