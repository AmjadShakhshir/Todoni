import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { User, UserInput } from '../../types/User';
import { url } from '../../common/common';
import { Cred } from '../../types/Cred';

const initialState: {
    users: User[],
    currentUser: User | null,
    apikey: string,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string
} = {
    users: [],
    currentUser: null,
    apikey: '',
    status: 'idle',
    error: ''
};

export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
    'users/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${url}/users/`);
            const data = response.data;
            return data;
        } catch (e) {
            const error = e as Error;
            const message = error.message;
            return rejectWithValue(message)
        }
    }
);

export const register = createAsyncThunk<User, UserInput, { rejectValue: string }>(
    'users/register',
    async (user, { rejectWithValue }) => {
        try {
            console.log(user)
            const response = await axios.post(`${url}/users`, user);
            const data = response.data;
            return data;
        } catch (e) {
            const error = e as Error;
            const message = error.message;
            return rejectWithValue(message)
        }
    }
);

export const login = createAsyncThunk<User, Cred, { rejectValue: string }>(
    'users/login',
    async (cred, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}/users/login`, cred, { withCredentials: true });

            if (response.status !== 200) {
                return rejectWithValue('No user');
            }
            const cookies = document.cookie;
            console.log(cookies)
            const user = response.data;

            localStorage.setItem('user', JSON.stringify(user.apikey));
            return user;
            
        } catch (e) {
            const error = e as Error;
            const message = error.message;
            return rejectWithValue(message)
        }
    }
);

export const logout = createAsyncThunk<number, void, { rejectValue: string }>(
    'users/logout',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}/users/logout/${id}`);
            const data = response.status;
            return data;
        } catch (e) {
            const error = e as Error;
            const message = error.message;
            return rejectWithValue(message)
        }
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(register.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(register.fulfilled, (state, action) => {
                    return {
                    ...state,
                    status: 'succeeded',
                    currentUser: action.payload,
                    users: [...state.users, action.payload]
                }
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentUser = action.payload;
                state.apikey = state.currentUser.apikey;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(logout.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = 'succeeded';
                state.users = [];
                state.currentUser = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
        }
});

const usersReducer = usersSlice.reducer;
export default usersReducer;