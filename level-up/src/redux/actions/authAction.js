import { createUserWithEmailAndPasswordFunc, signInWithEmailAndPasswordFunc, signOutFunc, addHackathonToFirestore, getHackathonsFromFirestore } from '../services/firebase';

// Authentication Actions
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT = 'LOGOUT';

// Hackathon Actions
export const ADD_HACKATHON_START = 'ADD_HACKATHON_START';
export const ADD_HACKATHON_SUCCESS = 'ADD_HACKATHON_SUCCESS';
export const ADD_HACKATHON_FAILURE = 'ADD_HACKATHON_FAILURE';

export const FETCH_HACKATHONS_START = 'FETCH_HACKATHONS_START';
export const FETCH_HACKATHONS_SUCCESS = 'FETCH_HACKATHONS_SUCCESS';
export const FETCH_HACKATHONS_FAILURE = 'FETCH_HACKATHONS_FAILURE';

// Authentication Action Creators
export const loginStart = () => ({
    type: LOGIN_START,
});

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

export const logout = () => ({
    type: LOGOUT,
});

// Hackathon Action Creators
export const addHackathonStart = () => ({
    type: ADD_HACKATHON_START,
});

export const addHackathonSuccess = (hackathon) => ({
    type: ADD_HACKATHON_SUCCESS,
    payload: hackathon,
});

export const addHackathonFailure = (error) => ({
    type: ADD_HACKATHON_FAILURE,
    payload: error,
});

export const fetchHackathonsStart = () => ({
    type: FETCH_HACKATHONS_START,
});

export const fetchHackathonsSuccess = (hackathons) => ({
    type: FETCH_HACKATHONS_SUCCESS,
    payload: hackathons,
});

export const fetchHackathonsFailure = (error) => ({
    type: FETCH_HACKATHONS_FAILURE,
    payload: error,
});

// Firebase Auth Thunks (Asynchronous Actions)
export const registerUser = (email, password) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const userCredential = await createUserWithEmailAndPasswordFunc(email, password);
        dispatch(loginSuccess(userCredential.user));
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

export const loginUser = (email, password) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const userCredential = await signInWithEmailAndPasswordFunc(email, password);
        dispatch(loginSuccess(userCredential.user));
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        await signOutFunc();
        dispatch(logout());
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

// Hackathon Thunks (Asynchronous Actions)
export const addHackathon = (hackathonData) => async (dispatch) => {
    dispatch(addHackathonStart());
    try {
        const docRef = await addHackathonToFirestore(hackathonData);
        dispatch(addHackathonSuccess(docRef));
    } catch (error) {
        dispatch(addHackathonFailure(error.message));
    }
};

export const fetchHackathons = () => async (dispatch) => {
    dispatch(fetchHackathonsStart());
    try {
        const hackathons = await getHackathonsFromFirestore();
        dispatch(fetchHackathonsSuccess(hackathons));
    } catch (error) {
        dispatch(fetchHackathonsFailure(error.message));
    }
};
