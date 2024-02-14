import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRandomGreeting = createAsyncThunk(
    'greetings/fetchRandomGreeting',
    async () => {
        try {
            const response = await fetch('/random_greeting');
            if (!response.ok) {
                throw new Error('Failed to fetch.');
            }
            const data = await response.json();
            console.log(data); // Log the response data
            return data.greeting;
        } catch (error) {
            console.error('Error fetching random greeting:', error);
            throw error;
        }
    },
);


const initialState = {
    greeting: '',
    isLoading: false,
    error: null,
};

const greetingsSlice = createSlice({
    name: 'greetings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRandomGreeting.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchRandomGreeting.fulfilled, (state, action) => {
                state.greeting = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchRandomGreeting.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default greetingsSlice.reducer;