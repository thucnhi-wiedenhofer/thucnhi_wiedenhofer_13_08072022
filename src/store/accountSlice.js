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

export const update = createAsyncThunk('account/update', async (data) => {
  let response = await axios({
    method: 'put',
    url: `${url}/profile`,
    headers: { authorization: `Bearer ${data.token}` },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
    },
  }).catch((error) => console.error(error.response));
  return response.status;
});

const accountSlice = createSlice({
  name: 'account',

  initialState: {
    accountStatus: '',
    updateStatus: '',
    message: '',
    firstName: '',
    lastName: '',
    id: '',
    createdAt: '',
    updatedAt: '',
  },

  reducers: {
    editName: (state) => {
      state.editName = true;
      return state;
    },
  },

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
    builder.addCase(update.pending, (state, action) => {
      return { ...state, updateStatus: 'pending' };
    });
    builder.addCase(update.fullfilled, (state, action) => {
      if (action && action.payload === 200)
        return (
          {
            ...state,
            updateStatus: 'success',
          },
          window.location.reload()
        );
    });
    builder.addCase(update.rejected, (state, action) => {
      return {
        ...state,
        updateStatus: 'rejected',
        message: action.payload.message,
      };
    });
  },
});

export const { editName } = accountSlice.actions;
export default accountSlice.reducer;
