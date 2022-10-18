import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../Pagination';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import {
  filterSort,
  filterSortCategory,
  filterSortPage,
  filterSortSearch,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, pizzaState } from '../redux/slices/pizzasSlice';
import { useAppDispatch } from '../redux/store';

const Home = () => {
  const navigate = useNavigate();
  const categoryId = useSelector(filterSortCategory);
  const sortType = useSelector(filterSort);
  const currentPage = useSelector(filterSortPage);
  const { items, status } = useSelector(pizzaState);
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const searchValue: string = useSelector(filterSortSearch);
  const [isLoading, setIsLoading] = React.useState(true);
  const sortingType = [
    { name: 'rating', prop: 'asc' },
    { name: 'rating', prop: 'desc' },
    { name: 'price', prop: 'asc' },
    { name: 'price', prop: 'desc' },
    { name: 'title', prop: 'asc' },
    { name: 'title', prop: 'desc' },
  ];

  const setCategoryType = React.useCallback((i: number) => {
    dispatch(setCategoryId(i));
  }, []);
  const onChangePage = (i: number) => {
    dispatch(setCurrentPage(i));
  };

  const getPizzas = async () => {
    setIsLoading(true);
    dispatch(fetchPizzas({ currentPage, categoryId, sortingType, sortType }));
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortList = sortingType.find(
        (obj) => obj.name === params.sort && obj.prop === params.prop,
      );
      if (sortList) {
        const sort = sortingType.indexOf(sortList);
        dispatch(setFilters({ sort, categoryId, searchValue, currentPage }));
        isSearch.current = true;
      }
    }
  }, []);

  React.useEffect(() => {
    if (isSearch.current == false) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const querryString = qs.stringify({
        sort: sortingType[sortType].name,
        prop: sortingType[sortType].prop,
        categoryId,
        currentPage,
      });
      navigate(`?${querryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const pizzas = items
    .filter((obj: any) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((item: any) => (
      <PizzaBlock
        key={item.title}
        price={item.price}
        title={item.title}
        image={item.imageUrl}
        sizes={item.sizes}
        types={item.types}
        id={item.id}
      />
    ));

  return (
    <div>
      <div className='content__top'>
        <Categories category={categoryId} onClickCategory={setCategoryType} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='__error-info'>
          <h2>Произошла ошибка</h2>
          <p>
            К сожалению, произошла ошибка. Попробуйте вернуться на главную страницу и повторить Ваши
            действия немного позже. Спасибо за понимание!
          </p>
        </div>
      ) : (
        <div className='content__items'>{status === 'loading' ? skeleton : pizzas}</div>
      )}
      <Pagination onChangePage={onChangePage} />
    </div>
  );
};
export default Home;
