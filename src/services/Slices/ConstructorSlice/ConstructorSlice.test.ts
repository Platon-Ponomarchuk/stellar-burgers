import * as constructor from './ConstructorSlice';

describe('Проверка constructorSlice', () => {
  const ingredients = [
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
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    }
  ];

  const initialState = {
    ingredients: [],
    bun: null
  };

  test('[#1] Проверка добавления ингредиента', () => {
    expect(initialState.ingredients.length).toBe(0);

    const newState = constructor.default(
      initialState,
      constructor.addIngredient(ingredients[1])
    );

    expect(newState.ingredients.length).toBe(1);
  });

  test('[#2] Проверка удаления ингредиента', () => {
    let State = constructor.default(
      initialState,
      constructor.setBun(ingredients[0])
    );

    State = constructor.default(
      State,
      constructor.addIngredient(ingredients[1])
    );

    expect(State.ingredients.length).toBe(1);

    State = constructor.default(State, constructor.removeIngredientbyIndex(0));

    expect(State.ingredients.length).toBe(0);
  });

  test('[#3] Проверка перемещения ингредиента', () => {
    let State = constructor.default(
      initialState,
      constructor.setBun(ingredients[0])
    );

    State = constructor.default(
      State,
      constructor.addIngredient(ingredients[1])
    );

    State = constructor.default(
      State,
      constructor.addIngredient(ingredients[2])
    );

    expect(State.ingredients[0]._id).toBe(ingredients[1]._id);

    State = constructor.default(
      State,
      constructor.swapIngredients({ index: 0, type: 'down' })
    );

    expect(State.ingredients[0]._id).toBe(ingredients[2]._id);
  });
});
