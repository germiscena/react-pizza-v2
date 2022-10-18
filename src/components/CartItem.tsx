import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearItems, removeThisPizza } from '../redux/slices/cartSlice';

type ItemProps = {
  item: {
    count: number;
    image: string;
    price: number;
    sizes: number[];
    title: string;
    types: number[];
  };
};

const CartItem: React.FC<ItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div className='cart__item'>
      <div className='cart__item-img'>
        <img className='pizza-block__image' src={item.image} alt='Pizza' />
      </div>
      <div className='cart__item-info'>
        <h3>{item.title}</h3>
        <p>тонкое, {item.sizes[Math.round(Math.random())]} см.</p>
      </div>
      <div className='cart__item-count'>
        <div
          onClick={() => dispatch(removeFromCart(item))}
          className='button button--outline button--circle cart__item-count-minus'>
          -
        </div>
        <b>{item.count}</b>
        <div
          onClick={() => dispatch(addToCart(item))}
          className='button button--outline button--circle cart__item-count-plus'>
          +
        </div>
      </div>
      <div className='cart__item-price'>
        <b>{item.price} ₽</b>
      </div>
      <div onClick={() => dispatch(removeThisPizza(item))} className='cart__item-remove'>
        <div className='button button--outline button--circle'>x</div>
      </div>
    </div>
  );
};

export default CartItem;
