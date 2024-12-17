// src/pages/CreateHackathon.js
import { useState } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';

const CreateHackathon = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'hackathons'), {
                name,
                description,
                date,
            });
            alert('Hackathon created successfully');
        } catch (error) {
            alert('Failed to create hackathon');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-80">
                <h2 className="text-2xl text-center mb-4">Create Hackathon</h2>
                <input
                    type="text"
                    placeholder="Hackathon Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                    Create
                </button>
            </form>
        </div>
    );
};

export default CreateHackathon;

