// src/components/HackathonForm.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addHackathon } from '../redux/actions/hackathonActions'; // Example action
import { db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';

const HackathonForm = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !description || !date || !location) {
            setError('All fields are required.');
            return;
        }

        try {
            const newHackathon = {
                name,
                description,
                date,
                location,
            };

            // Add hackathon to Firebase
            await addDoc(collection(db, 'hackathons'), newHackathon);

            // Optionally dispatch action to Redux store if needed
            dispatch(addHackathon(newHackathon));

            // Clear form after submission
            setName('');
            setDescription('');
            setDate('');
            setLocation('');
            setError('');

            alert('Hackathon created successfully!');
        } catch (err) {
            console.error('Error creating hackathon: ', err);
            setError('Failed to create hackathon. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-80">
                <h2 className="text-2xl text-center mb-4">Create a New Hackathon</h2>

                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                <input
                    type="text"
                    className="w-full p-2 mb-4 border rounded"
                    placeholder="Hackathon Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <textarea
                    className="w-full p-2 mb-4 border rounded"
                    placeholder="Hackathon Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input
                    type="date"
                    className="w-full p-2 mb-4 border rounded"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <input
                    type="text"
                    className="w-full p-2 mb-4 border rounded"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                    Create Hackathon
                </button>
            </form>
        </div>
    );
};

export default HackathonForm;
