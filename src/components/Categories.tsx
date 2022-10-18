import React from 'react';

type CategoriesProps = {
  category: number;
  onClickCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(({ category, onClickCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className='categories'>
      <ul>
        {categories.map((item, i) => (
          <li
            key={item}
            onClick={() => onClickCategory(i)}
            className={category === i ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
