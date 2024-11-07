import * as order from './OrderSlice';

describe('Проверка orderSlice', () => {
  const initialState: order.TInitialState = {
    allOrders: {
      orders: [],
      total: 0,
      totalToday: 0
    },
    userOrders: [],
    orderRequest: false,
    currentOrder: null
  };

  const orderData = {
    _id: '1',
    status: 'done',
    name: 'test',
    createdAt: '9:00:00',
    updatedAt: '9:00:00',
    number: 123,
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093c'
    ]
  };

  const postOrderData = {
    name: 'test',
    order: orderData
  };

  describe('Проверка получения всех заказов fetchAllOrders', () => {
    test('[#1] Проверка успешного выполнения fetchAllOrders', () => {
      const action = {
        type: order.fetchAllOrders.fulfilled.type,
        payload: {
          orders: [orderData],
          total: 1,
          totalToday: 1
        }
      };
      const state = order.default(initialState, action);

      expect(state.allOrders.orders.length).toEqual(1);
    });
  });

  describe('Проверка получения заказа fetchOrderById', () => {
    test('[#2] Проверка успешного выполнения fetchOrderById', () => {
      const action = {
        type: order.fetchOrderById.fulfilled.type,
        payload: {
          orders: [orderData]
        }
      };
      const state = order.default(initialState, action);

      expect(state.currentOrder).toEqual(orderData);
    });

    test('[#3] Проверка неуспешного выполнения fetchOrderById', () => {
      const action = {
        type: order.fetchOrderById.rejected.type
      };
      const state = order.default(initialState, action);

      expect(state.currentOrder).toEqual(null);
    });
  });

  describe('Проверка получения пользователя fetchUserOrders', () => {
    test('[#4] Проверка успешного выполнения fetchUserOrders', () => {
      const action = {
        type: order.fetchUserOrders.fulfilled.type,
        payload: [orderData]
      };
      const state = order.default(initialState, action);

      expect(state.userOrders.length).toEqual(1);
      expect(state.userOrders[0]).toEqual(orderData);
    });
  });

  describe('Проверка публикации заказа fetchOrder', () => {
    test('[#5] Проверка успешного выполнения fetchOrder', () => {
      const action = {
        type: order.fetchOrder.fulfilled.type,
        payload: postOrderData
      };
      const state = order.default(initialState, action);

      expect(state.currentOrder).toEqual(orderData);
      expect(state.orderRequest).toBe(false);
    });

    test('[#6] Проверка неуспешного выполнения fetchOrder', () => {
      const action = {
        type: order.fetchOrder.rejected.type
      };
      const state = order.default(initialState, action);

      expect(state).toBe(initialState);
    });

    test('[#7] Проверка ожидания выполнения fetchOrder', () => {
      const action = {
        type: order.fetchOrder.pending.type
      };
      const state = order.default(initialState, action);

      expect(state.orderRequest).toBe(true);
    });
  });

  test('[#8] Проверка очитски заказа clearOrder', () => {
    const action = {
      type: order.clearOrder.type
    };
    const state = order.default(initialState, action);

    expect(state.currentOrder).toBe(null);
  })
});
