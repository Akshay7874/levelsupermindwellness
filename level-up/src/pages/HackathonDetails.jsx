import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

const HackathonDetails = () => {
    const { hackathonId } = useParams();  // Get the hackathonId from the URL
    const [hackathon, setHackathon] = useState(null);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const fetchHackathonDetails = async () => {
            const hackathonRef = doc(db, 'hackathons', hackathonId);
            const hackathonDoc = await getDoc(hackathonRef);

            if (hackathonDoc.exists()) {
                setHackathon(hackathonDoc.data());
                setParticipants(hackathonDoc.data().participants || []);
            } else {
                console.log("No such hackathon!");
            }
        };

        fetchHackathonDetails();
    }, [hackathonId]);

    return (
        <div className="p-8">
            {hackathon ? (
                <>
                    <h2 className="text-3xl font-bold mb-6">{hackathon.name}</h2>
                    <p className="mb-4">{hackathon.description}</p>
                    <p className="text-sm text-gray-500 mb-6">Date: {hackathon.date}</p>

                    <h3 className="text-xl font-semibold">Participants</h3>
                    <ul className="list-disc pl-6">
                        {participants.length > 0 ? (
                            participants.map((participantId, index) => (
                                <li key={index}>User ID: {participantId}</li>
                            ))
                        ) : (
                            <p>No participants yet.</p>
                        )}
                    </ul>
                </>
            ) : (
                <p>Loading hackathon details...</p>
            )}
        </div>
    );
};

export default HackathonDetails;
