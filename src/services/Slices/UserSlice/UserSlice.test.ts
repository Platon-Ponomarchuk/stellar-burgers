import * as user from './UserSlice';

describe('Проверка userSlice', () => {
  const initialState: user.TInitialState = {
    isAuth: false,
    user: { email: '', name: '' },
    error: ''
  };

  const fakeUser = {
    email: 'test',
    name: 'test'
  };

  const expectedFullfilled: user.TInitialState = {
    isAuth: true,
    user: fakeUser,
    error: ''
  };

  const expectedRejected: user.TInitialState = {
    isAuth: false,
    user: { email: '', name: '' },
    error: 'error'
  };

  describe('Проверка получения данных пользователя fetchUser', () => {
    test('[#1] Проверка успешного выполнения fetchUser', () => {
      const action = {
        type: user.fetchUser.fulfilled.type,
        payload: { user: fakeUser }
      };
      const state = user.default(initialState, action);

      expect(state).toEqual(expectedFullfilled);
    });

    test('[#2] Проверка неуспешного выполнения fetchUser', () => {
      const action = {
        type: user.fetchUser.rejected.type,
        error: { message: 'error' }
      };
      const state = user.default(initialState, action);

      expect(state).toEqual(expectedRejected);
    });
  });

  describe('Проверка логина loginUser', () => {
    test('[#3] Проверка успешного выполнения loginUser', () => {
      const action = {
        type: user.loginUser.fulfilled.type,
        payload: fakeUser
      };

      const state = user.default(initialState, action);
      console.log(state);

      expect(state).toEqual(expectedFullfilled);
    });

    test('[#4] Проверка неуспешного выполнения', () => {
      const action = {
        type: user.loginUser.rejected.type,
        error: { message: 'error' }
      };
      const state = user.default(initialState, action);

      expect(state).toEqual(expectedRejected);
    });
  });

  describe('Проверка регистрации regidterUser', () => {
    test('[#5] Проверка успешного выполнения regidterUser', () => {
      const action = {
        type: user.regidterUser.fulfilled.type,
        payload: fakeUser
      };
      const state = user.default(initialState, action);

      expect(state).toEqual(expectedFullfilled);
    });

    test('[#6] Проверка неуспешного выполнения regidterUser', () => {
      const action = {
        type: user.regidterUser.rejected.type,
        error: { message: 'error' }
      };
      const state = user.default(initialState, action);

      expect(state).toEqual(expectedRejected);
    });
  });

  describe('Проверка выхода logoutUser', () => {
    test('[#7] Проверка успешного выполнения logoutUser', () => {
      const action = {
        type: user.logoutUser.fulfilled.type
      };
      const state = user.default(initialState, action);

      expect(state).toEqual(initialState);
    });
  });

  test('[#8] Проверка успешного выполнения updateUser', () => {
    const action = {
      type: user.refreshUser.fulfilled.type,
      payload: { user: { email: 'test1', name: 'test1' } }
    };
    const state = user.default(expectedFullfilled, action);

    expect(state).not.toEqual(expectedFullfilled);
    expect(state.user).toEqual({ email: 'test1', name: 'test1' });
  });

  test('[#9]Проверка очитски ошибки clearError', () => {
    const action = {
      type: user.clearError.type
    };
    const state = user.default(expectedRejected, action);

    expect(state).not.toEqual(expectedRejected);
    expect(state.error).toEqual('');
  });
});
