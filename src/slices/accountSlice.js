import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const accountSlice = createSlice({
  name: 'account',

  initialState: {},
  reducers: {},
  extraReducers: (builder) => {},
});

export default accountSlice.reducer;
