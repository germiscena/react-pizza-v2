import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StringLiteral } from 'typescript';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
    sizes: [string];
  }>();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://62cd5e85a43bf7800856f862.mockapi.io/items/' + id);
        setData(data);
      } catch (error) {
        alert('Oшибка при получении пиццы');
        navigate('/');
      }
    }
    fetchPizza();
  }, [id]);

  if (!data) {
    return <>'Загрузка...'</>;
  }
  return (
    <div className='container'>
      <img src={data.imageUrl} />
      <h1>{data.title}</h1>
      <h3>Цена: {data.price} ₽</h3>
      <h3>Размеры: {data.sizes.map((item) => item + 'см. ')}</h3>
    </div>
  );
};

export default FullPizza;
