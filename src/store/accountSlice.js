import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

export const getUser = createAsyncThunk('account/getUser', async (token) => {
  let response = await axios({
    method: 'post',
    url: `${url}/profile`,
    headers: { authorization: `Bearer ${token}` },
  }).catch((err) => console.error(err));

  return { body: response.data.body, status: response.status };
});

const accountSlice = createSlice({
  name: 'account',

  initialState: {
    accountStatus: '',
    message: '',
    firstName: '',
    lastName: '',
    id: '',
    createdAt: '',
    updatedAt: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          firstName: action.payload.body.firstName,
          lastName: action.payload.body.lastName,
          id: action.payload.body.id,
          createdAt: action.payload.body.createdAt,
          updatedAt: action.payload.body.updatedAt,
        };
      } else return state;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      return {
        ...state,
        accountStatus: 'rejected',
        message: action.payload.message,
      };
    });
  },
});

export default accountSlice.reducer;
