import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPasswordFunc, signInWithGoogle } from '../services/firebase'; // Correct import from firebase.js
import { loginStart, loginSuccess, loginFailure } from '../redux/reducers/authReducer';

const Register = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(loginStart());
            await createUserWithEmailAndPasswordFunc(email, password);  // Call function to create a user
            dispatch(loginSuccess());
            alert("Registered successfully");
        } catch (err) {
            setError('Failed to create account.');
            dispatch(loginFailure(err.message));
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle(dispatch);  // Google login
        } catch (err) {
            setError('Failed to log in with Google.');
            dispatch(loginFailure(err.message));
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-80">
                <h2 className="text-2xl text-center mb-4">Register</h2>
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                <input
                    type="email"
                    className="w-full p-2 mb-4 border rounded"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="w-full p-2 mb-4 border rounded"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Register</button>

                <div className="my-4 text-center">OR</div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full p-2 bg-red-500 text-white rounded"
                >
                    Login with Google
                </button>
            </form>
        </div>
    );
};

export default Register;
