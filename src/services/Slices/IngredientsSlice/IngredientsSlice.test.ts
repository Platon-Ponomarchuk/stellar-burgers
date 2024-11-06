import * as ingredients from './IngredientsSlice';

describe('Проверка IngredientsSlice', () => {
  const initialState: ingredients.TInitialState = {
    ingredients: [],
    isIngredientsLoading: false
  };

  const ingredientsData = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    }
  ];

  test('[#1] Ожидание результата getIngredientsThunk', () => {
    const action = {
      type: ingredients.getIngredientsThunk.pending.type
    };
    const state = ingredients.default(initialState, action);

    expect(state.isIngredientsLoading).toEqual(true);
  });

  test('[#2] Успешное выполнение getIngredientsThunk', () => {
    const action = {
      type: ingredients.getIngredientsThunk.fulfilled.type,
      payload: ingredientsData
    };
    const state = ingredients.default(initialState, action);

    expect(state.isIngredientsLoading).toEqual(false);
    expect(state.ingredients).toEqual(ingredientsData);
  });

  test('[#3] Неуспешное выполнение getIngredientsThunk', () => {
    const action = {
      type: ingredients.getIngredientsThunk.rejected.type
    };
    const state = ingredients.default(initialState, action);

    expect(state).toEqual(initialState);
  });
});
