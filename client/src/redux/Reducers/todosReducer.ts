import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Todo } from '../../types/Todo';
import axios from 'axios';
import { url } from '../../common/common';

const initialState: {
    data: Todo[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string
} = {
    data: [],
    status: 'idle',
    error: ''
};

export const fetchTodos = createAsyncThunk<Todo[], void, { rejectValue: string }>(
    'todos/fetchTodos',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${url}/todos`);
            const data = response.data;
            return data;
        } catch (e) {
            const error = e as Error;
            const message = error.message;
            return rejectWithValue(message)
        }
    }
);

const todosSlice = createSlice({
    name: 'todos',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
        }
});

const todosReducer = todosSlice.reducer;
export default todosReducer;