import { createSlice } from "@reduxjs/toolkit";


const getUsersFromStorage = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : {};
};

const saveUsersToStorage = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
};


const loadState = () => {

    const activeSession = localStorage.getItem('activeSession');
    if (activeSession) {
        const users = getUsersFromStorage();
        const email = activeSession;

        if (users[email]) {
            const userData = users[email];
            return {
                email: { value: email, isCorrect: true },
                password: { value: userData.password, isCorrect: true },
                user: userData.userName,
                birthdate: userData.birthdate,
                likedMovies: userData.likedMovies || [],
                likedShows: userData.likedShows || [],
                savedMovies: userData.savedMovies || [],
                savedShows: userData.savedShows || [],
                isAuthenticated: true,
                currentUser: email,
                clickModal: false,
                error: null
            };
        }
    }

 
    return {
        email: { value: '', isCorrect: false },
        password: { value: '', isCorrect: false },
        user: '',
        birthdate: '',
        likedMovies: [],
        likedShows: [],
        savedMovies: [],
        savedShows: [],
        isAuthenticated: false,
        currentUser: null,
        clickModal: false,
        error: null
    };
};

const authLogin = createSlice({
    name: 'authLogin',
    initialState: loadState(),
    reducers: {
        registerUser: (state, action) => {
            const { email, password, userName, birthdate } = action.payload;
            const users = getUsersFromStorage();


        
            users[email] = {
                password,
                userName,
                birthdate,
                likedMovies: [],
                likedShows: [],
                savedMovies: [],
                savedShows: [],
                clickModal: false
            };
            state.error = null

            saveUsersToStorage(users);

        },
        verifyUser: (state, action) => {
            const users = getUsersFromStorage();
            const email = action.payload
            if (users[email]) {
                state.error = 'User already exists';
                return;
            }
            state.error =''

        },
        setEmail: (state, action) => {
            state.email.value = action.payload;
            const users = getUsersFromStorage();
            if (!users[state.email.value]) {
                state.error = 'Wrong email';
                state.isAuthenticated = false;
                return
            }
            state.email.isCorrect = true
            state.error = false;
        },
        setPassword: (state, action) => {
            state.password.value = action.payload;
            const users = getUsersFromStorage();
            if (users[state.email.value].password !== state.password.value) {
                state.error = 'Wrong password';
                state.isAuthenticated = false;
                return
            }
        
            state.password.isCorrect = true
            state.error = false;
            state.isAuthenticated = true;

            const email = state.email.value;
            const userData = users[email];
            state.user = userData.userName;
            state.birthdate = userData.birthdate;
            state.likedMovies = userData.likedMovies;
            state.likedShows = userData.likedShows;
            state.savedMovies = userData.savedMovies;
            state.savedShows = userData.savedShows;
            state.isAuthenticated = true;
            state.currentUser = email;
            state.clickModal = false;
            state.error = null;
  
            localStorage.setItem('activeSession', email);
        },

        updateUserData: (state, action) => {
            const { type, item } = action.payload;
            const users = getUsersFromStorage();
            const email = state.currentUser;

            if (!email || !users[email]) return;

  
            switch (type) {
                case 'toggleLikedMovie': {
                    const foundItem = users[email].likedMovies.find(movie => movie.id === item.id);
                    if (foundItem) {
                        users[email].likedMovies = users[email].likedMovies.filter(movie => movie.id !== item.id);
                        state.likedMovies = users[email].likedMovies
                    } else {
                        state.likedMovies = [...users[email].likedMovies, item];
                        users[email].likedMovies = state.likedMovies;
                    }
                    break;
                }
                case 'toggleLikedShow': {
                    const foundItem = users[email].likedShows.find(show => show.id === item.id);
                    if (foundItem) {
                        users[email].likedShows = users[email].likedShows.filter(show => show.id !== item.id);
                        state.likedShows = users[email].likedShows
                    } else {
                        state.likedShows = [...users[email].likedShows, item];
                        users[email].likedShows = state.likedShows;
                    }
                    break;
                }
                case 'toggleSavedMovie': {
                    const foundItem = users[email].savedMovies.find(movie => movie.id === item.id);
                    if (foundItem) {
                        users[email].savedMovies = users[email].savedMovies.filter(movie => movie.id !== item.id);
                        state.savedMovies = users[email].savedMovies
                    } else {
                        state.savedMovies = [...users[email].savedMovies, item];
                        users[email].savedMovies = state.savedMovies;
                    }
                    break;
                }
                case 'toggleSavedShow': {
                    const foundItem = users[email].savedShows.find(show => show.id === item.id);
                    if (foundItem) {
                        users[email].savedShows = users[email].savedShows.filter(show => show.id !== item.id);
                        state.savedShows = users[email].savedShows
                    } else {
                        state.savedShows = [...users[email].savedShows, item];
                        users[email].savedShows = state.savedShows;
                    }
                    break;
                }

            }

            saveUsersToStorage(users);
        },
        openModal: (state) => {
            state.clickModal = true;
        },
        closeModal: (state) => {
            state.clickModal = false;
        },

        logout: (state) => {
            state.email = { value: '', isCorrect: false };
            state.password = { value: '', isCorrect: false };
            state.birthdate = '';
            state.user = ''
            state.likedMovies = [];
            state.likedShows = [];
            state.savedMovies = [];
            state.savedShows = [];
            state.isAuthenticated = false;
            state.currentUser = null;
            state.error = null;

            localStorage.removeItem('activeSession');
        }
    }
})

export const { registerUser,verifyUser, setEmail, setPassword, updateUserData, logout,openModal,closeModal } = authLogin.actions;
export default authLogin.reducer;