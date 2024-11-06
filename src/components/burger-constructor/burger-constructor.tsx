import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  selectBurgerConstructor
} from '../../services/Slices/ConstructorSlice/ConstructorSlice';
import {
  clearOrder,
  fetchOrder,
  selectCurrentOrder,
  selectOrderRequest
} from '../../services/Slices/OrderSlice/OrderSlice';
import { selectIsAuth } from '../../services/Slices/UserSlice/UserSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(selectBurgerConstructor);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectCurrentOrder);
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isAuth) {
      navigate('/login');
      return;
    }

    if (constructorItems) {
      const orderIngredients = [];
      orderIngredients.push(constructorItems.bun._id);
      constructorItems.ingredients.forEach(
        (ingredient: TConstructorIngredient) => {
          orderIngredients.push(ingredient._id);
        }
      );
      orderIngredients.push(constructorItems.bun._id);

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
