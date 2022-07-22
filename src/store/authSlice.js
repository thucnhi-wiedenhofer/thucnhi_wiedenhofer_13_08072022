import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

export const login = createAsyncThunk(
  'auth/login',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${url}/login`, {
        email: values.email,
        password: values.password,
      });

      /* if "remenber me" checckbox  is checked, email is recorded in localStorage */

      if (values.checked) {
        localStorage.setItem('email', values.email);
      } else {
        localStorage.removeItem('email');
      }

      /* isLogged is used for Navigation component */

      sessionStorage.setItem('token', data.body.token);
      sessionStorage.setItem('isLogged', true);

      return data.body.token;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    token: sessionStorage.getItem('token'),
    status: '',
    message: '',
    isLogged: false,
  },
  reducers: {
    remember: (state) => {
      const rememberMe = localStorage.getItem('email');
      if (rememberMe) {
        state.email = rememberMe;
        return state;
      }
    },
    /* Logout  remove token and isLogged in sessionStorage and modify navigation component */
    logout: (state, action) => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('isLogged');

      return {
        ...state,
        token: '',
        status: '',
        message: '',
        isLogged: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      return { ...state, loginStatus: 'pending' };
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload) {
        sessionStorage.setItem('isLogged', true);
        return {
          ...state,
          token: action.payload,
          status: 'success',
          message: action.payload.message,
          isLogged: true,
        };
      } else return state;
    });
    builder.addCase(login.rejected, (state, action) => {
      return {
        ...state,
        token: '',
        status: 'rejected',
        message: action.payload.message,
      };
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
