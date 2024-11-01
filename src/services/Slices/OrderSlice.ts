import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';

export const fetchAllOrders = createAsyncThunk(
  'orders/get/all',
  async () => await getFeedsApi()
);

export const fetchUserOrders = createAsyncThunk(
  'orders/get/user',
  async () => await getOrdersApi()
);

export const fetchOrder = createAsyncThunk(
  'order/post',
  async (data: string[]) => await orderBurgerApi(data)
);

export const fetchOrderById = createAsyncThunk(
  'order/get',
  async (id: number) => await getOrderByNumberApi(id)
);

type TInitialState = {
  allOrders: { orders: TOrder[]; total: number; totalToday: number };
  userOrders: TOrder[];
  orderRequest: boolean;
  currentOrder: TOrder | null;
};

const initialState: TInitialState = {
  allOrders: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  userOrders: [],
  orderRequest: false,
  currentOrder: null
};

export const order = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.currentOrder = null;
    }
  },
  selectors: {
    selectCurrentOrder: (state) => state.currentOrder,
    selectOrderRequest: (state) => state.orderRequest,
    selectAllOrders: (state) => state.allOrders.orders,
    selectTotalOrders: (state) => state.allOrders.total,
    selectTotalTodayOrders: (state) => state.allOrders.totalToday,
    selectUserOrders: (state) => state.userOrders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.currentOrder = action.payload.order;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.allOrders = action.payload;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload.orders[0];
      })
      .addCase(fetchOrderById.rejected, (state) => {
        state.currentOrder = null;
      });
  }
});

export const { clearOrder } = order.actions;

export const {
  selectCurrentOrder,
  selectOrderRequest,
  selectAllOrders,
  selectTotalOrders,
  selectTotalTodayOrders,
  selectUserOrders
} = order.selectors;

export default order.reducer;
