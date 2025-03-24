import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Get token from localStorage on initialization
const token = localStorage.getItem("token");

// Async Thunks
export const registerUser = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || "Registration failed. Please try again."
        );
    }
});

export const loginUser = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || "Login failed. Please check your credentials."
        );
    }
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
    localStorage.removeItem("token");
    return null;
});

// Redux Slice
const authSlice = createSlice({
    name: "auth",
    initialState: { 
        user: null, 
        token: token, // Initialize with token from localStorage
        loading: false, 
        error: null 
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
            });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;