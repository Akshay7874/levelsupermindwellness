import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPasswordFunc } from '../services/firebase';
import { loginStart, loginSuccess, loginFailure } from '../redux/reducers/authReducer';

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(loginStart());
            const user = await signInWithEmailAndPasswordFunc(email, password);
            dispatch(loginSuccess(user)); // Pass the user data to loginSuccess
            alert("logged in successfuly")
        } catch (err) {
            setError('Invalid email or password.');
            dispatch(loginFailure(err.message));
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-80">
                <h2 className="text-2xl text-center mb-4">Login</h2>
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
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
            </form>
        </div>
    );
};

export default Login;
