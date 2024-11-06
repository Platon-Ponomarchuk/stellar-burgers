import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './Slices/IngredientsSlice/IngredientsSlice';
import userReducer from './Slices/UserSlice/UserSlice';
import burgerConstructorReducer from './Slices/ConstructorSlice/ConstructorSlice';
import orderReducer from './Slices/OrderSlice/OrderSlice';

describe('rootReducer', () => {
  test('Проверка инициализации', () => {
    const rootReducer = combineReducers({
      ingredients: ingredientsReducer,
      user: userReducer,
      burgerConstructor: burgerConstructorReducer,
      orders: orderReducer
    });

    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toEqual({
      ingredients: {
        ingredients: [],
        isIngredientsLoading: false
      },
      user: {
        isAuth: false,
        user: { email: '', name: '' },
        error: ''
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      orders: {
        allOrders: {
          orders: [],
          total: 0,
          totalToday: 0
        },
        userOrders: [],
        orderRequest: false,
        currentOrder: null
      }
    });
  });
});
