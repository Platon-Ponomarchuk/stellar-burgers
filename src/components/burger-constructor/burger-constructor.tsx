import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  selectBurgerConstructor
} from '../../services/Slices/ConstructorSlice';
import {
  clearOrder,
  fetchOrder,
  selectCurrentOrder,
  selectOrderRequest
} from '../../services/Slices/OrderSlice';
import { selectUser } from '../../services/Slices/UserSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(selectBurgerConstructor);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectCurrentOrder);
  const user = useSelector(selectUser);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest || !user) return;

    if (constructorItems) {
      const orderIngredients = [];
      orderIngredients.push(constructorItems.bun._id);
      constructorItems.ingredients.forEach(
        (ingredient: TConstructorIngredient) => {
          orderIngredients.push(ingredient._id);
        }
      );

      dispatch(fetchOrder(orderIngredients));
    }
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
