import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import HackathonCard from '../components/HackathonCard';

const Dashboard = () => {
    const [userHackathons, setUserHackathons] = useState([]);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            const fetchUserHackathons = async () => {
                const q = query(
                    collection(db, 'hackathons'),
                    where('createdBy', '==', user.uid) // Assuming hackathons are created by users
                );
                const querySnapshot = await getDocs(q);
                const hackathonsData = querySnapshot.docs.map(doc => doc.data());
                setUserHackathons(hackathonsData);
            };

            fetchUserHackathons();
        }
    }, [user]);

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6">Your Hackathons</h2>
            {user ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userHackathons.length > 0 ? (
                        userHackathons.map((hackathon, index) => (
                            <HackathonCard key={index} hackathon={hackathon} />
                        ))
                    ) : (
                        <p>No hackathons found.</p>
                    )}
                </div>
            ) : (
                <p>Please log in to view your dashboard.</p>
            )}
        </div>
    );
};

export default Dashboard;
