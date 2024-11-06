import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../../../utils/types';
import { getIngredientsApi } from '@api';

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/get',
  async () => await getIngredientsApi()
);

type TInitialState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
};

const initialState: TInitialState = {
  ingredients: [],
  isIngredientsLoading: false
};

export const ingredients = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIsIngredientsLoading: (state) => state.isIngredientsLoading
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredientsThunk.pending, (state) => {
      state.isIngredientsLoading = true;
    });
    builder.addCase(getIngredientsThunk.rejected, (state) => {
      state.isIngredientsLoading = false;
    });
    builder.addCase(getIngredientsThunk.fulfilled, (state, action) => {
      state.isIngredientsLoading = false;
      state.ingredients = action.payload;
    });
  }
});

export const {} = ingredients.actions;

export const { selectIngredients, selectIsIngredientsLoading } =
  ingredients.selectors;

export default ingredients.reducer;
