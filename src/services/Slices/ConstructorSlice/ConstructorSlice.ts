import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../../utils/types';
import { nanoid } from '@reduxjs/toolkit';

type TInitialState = {
  ingredients: TConstructorIngredient[];
  bun: TIngredient | null;
};

const initialState: TInitialState = {
  ingredients: [],
  bun: null
};

export const burgerConstructor = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: nanoid()
        }
      })
    },
    removeIngredientbyIndex: (state, action: PayloadAction<number>) => {
      state.ingredients = state.ingredients.filter(
        (item, index) => index !== action.payload
      );
    },
    swapIngredients: (
      state,
      action: PayloadAction<{ index: number; type: 'up' | 'down' }>
    ) => {
      const temp = state.ingredients[action.payload.index];
      if (action.payload.type === 'up') {
        state.ingredients[action.payload.index] =
          state.ingredients[action.payload.index - 1];
        state.ingredients[action.payload.index - 1] = temp;
      } else {
        state.ingredients[action.payload.index] =
          state.ingredients[action.payload.index + 1];
        state.ingredients[action.payload.index + 1] = temp;
      }
    },
    setBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    clearConstructor: (state) => {
      state.ingredients = [];
      state.bun = null;
    }
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectBun: (state) => state.bun,
    selectBurgerConstructor: (state) => ({
      bun: state.bun,
      ingredients: state.ingredients
    })
  }
});

export const {
  addIngredient,
  removeIngredientbyIndex,
  swapIngredients,
  setBun,
  clearConstructor
} = burgerConstructor.actions;

export const { selectIngredients, selectBun, selectBurgerConstructor } =
  burgerConstructor.selectors;

export default burgerConstructor.reducer;
