// src/pages/HackathonList.js
import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import HackathonCard from '../components/HackathonCard';

const HackathonList = () => {
    const [hackathons, setHackathons] = useState([]);

    useEffect(() => {
        const fetchHackathons = async () => {
            const hackathonCollection = collection(db, 'hackathons');
            const hackathonSnapshot = await getDocs(hackathonCollection);
            const hackathonsData = hackathonSnapshot.docs.map(doc => doc.data());
            setHackathons(hackathonsData);
        };

        fetchHackathons();
    }, []);

    return (
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hackathons.map((hackathon, index) => (
                <HackathonCard key={index} hackathon={hackathon} />
            ))}
        </div>
    );
};

export default HackathonList;
