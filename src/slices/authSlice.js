import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",

  initialState: {},
  reducers: {},
  extraReducers: (builder) => {},
});

export default authSlice.reducer;
