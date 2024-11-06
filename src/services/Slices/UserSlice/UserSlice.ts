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
} from '../../../utils/burger-api';
import { deleteCookie, setCookie } from '../../../utils/cookie';

export const fetchUser = createAsyncThunk('user/get', async () => {
  if (localStorage.getItem('refreshToken')) {
    await refreshToken();
  }

  return await getUserApi();
});

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);

    if (!res.success) {
      return Promise.reject(res);
    }

    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);

    return res.user;
  }
);

export const regidterUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);

    if (!res.success) {
      return Promise.reject(res);
    }

    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);

    return res.user;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  const { success } = await logoutApi();

  if (!success) {
    return Promise.reject();
  }

  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const refreshUser = createAsyncThunk(
  'user/refresh',
  async (user: TRegisterData) => await updateUserApi(user)
);

export type TInitialState = {
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
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
        state.error = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(regidterUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
        state.error = '';
      })
      .addCase(regidterUser.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuth = false;
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
