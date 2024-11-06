import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '../../../utils/types';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  refreshToken,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../../../utils/cookie';

export const fetchUser = createAsyncThunk('user/get', async () => {
  if (localStorage.getItem('refreshToken')) {
    await refreshToken();
  }

  return await getUserApi();
});

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => await loginUserApi(data)
);

export const regidterUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async () => await logoutApi()
);

export const refreshUser = createAsyncThunk(
  'user/refresh',
  async (user: TRegisterData) => await updateUserApi(user)
);

type TInitialState = {
  isAuth: boolean;
  user: TUser;
  error: string;
};

const initialState: TInitialState = {
  isAuth: false,
  user: { email: '', name: '' },
  error: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = '';
    }
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuth: (state) => state.isAuth,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isAuth = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
        state.error = '';
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(regidterUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
        state.error = '';
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })
      .addCase(regidterUser.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuth = false;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        state.user = { email: '', name: '' };
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
      });
  }
});

export const { clearError } = userSlice.actions;

export const { selectUser, selectIsAuth, selectError } = userSlice.selectors;

export default userSlice.reducer;
