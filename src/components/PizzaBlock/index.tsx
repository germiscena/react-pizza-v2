import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, CartItem } from '../../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

type PizzaBlockProps = {
  title: string;
  price: number;
  image: string;
  sizes: number[];
  types: number[];
  id: string;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({ title, price, image, sizes, types, id }) => {
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const [pizzasAdded, setPizzasAdded] = React.useState(0);
  const pizzaProps = { title, price, image, sizes, types };
  const navigate = useNavigate();
  const typeNames = ['тонкое', 'традиционное'];
  const dispatch = useDispatch();

  const onClickAdd = () => {
    const item: CartItem = {
      title,
      price,
      image,
      types,
      count: 0,
      sizes,
    };
    dispatch(addToCart(item));
  };

  return (
    <div className='pizza-block'>
      <img
        onClick={() => navigate(`/pizza/${id}`)}
        className='pizza-block__image'
        src={image}
        alt='Pizza'
      />
      <h4 className='pizza-block__title'>{title}</h4>
      <div className='pizza-block__selector'>
        <ul>
          {types.map((item) => (
            <li
              key={item}
              onClick={() => setActiveType(item)}
              className={activeType === item ? 'active' : ''}>
              {typeNames[item]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((item, i) => (
            <li
              key={i}
              onClick={() => setActiveSize(i)}
              className={activeSize === i ? 'active' : ''}>
              {item} см.
            </li>
          ))}
        </ul>
      </div>
      <div className='pizza-block__bottom'>
        <div className='pizza-block__price'>от {price} ₽</div>
        <div
          onClick={() => {
            onClickAdd();
            setPizzasAdded(pizzasAdded + 1);
          }}
          className='button button--outline button--add'>
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
              fill='white'
            />
          </svg>
          <span>Добавить</span>
          <i>{pizzasAdded}</i>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
