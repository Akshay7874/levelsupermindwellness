// src/components/HackathonCard.js
import { useState } from 'react';

const HackathonCard = ({ hackathon }) => {
    const [showDetails, setShowDetails] = useState(false);  // State to control visibility of details

    // Toggle visibility of details
    const toggleDetails = () => {
        setShowDetails(prevState => !prevState);
    };

    return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">{hackathon.name}</h3>



            {/* Button to toggle details visibility */}
            <button
                onClick={toggleDetails}
                className="mt-4 p-2 bg-blue-500 text-white rounded">
                {showDetails ? 'Hide Details' : 'View Details'}
            </button>

            {/* Conditionally render full description and date if details are visible */}
            {showDetails && (
                <div className="mt-4">
                    <p>{hackathon.description}</p>
                    <p className="text-gray-500 text-sm">Date: {hackathon.date}</p>
                </div>
            )}
        </div>
    );
};

export default HackathonCard;

