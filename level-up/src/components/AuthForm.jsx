// src/components/AuthForm.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPasswordFunc } from '../services/firebase';
import { loginStart, loginSuccess, loginFailure } from '../redux/reducers/authReducer';

const AuthForm = ({ mode }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(loginStart());
            await signInWithEmailAndPasswordFunc(email, password);
        } catch (error) {
            dispatch(loginFailure(error.message));
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-80">
                <h2 className="text-2xl text-center mb-4">{mode === 'login' ? 'Login' : 'Register'}</h2>
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
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                    {mode === 'login' ? 'Login' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;
