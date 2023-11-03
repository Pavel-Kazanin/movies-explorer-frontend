import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import cardLink from "../../images/movies/33 слова о дизайне.jpg";

function Movies({width}) {

  const initialCards = [
    {
      name: '33 слова о дизайне',
      link: cardLink,
      duration: '1ч 42м',
      saved: true,
      id: 1
    },
    {
      name: 'Киноальманах «100 лет дизайна»',
      link: cardLink,
      duration: '1ч 42м',
      saved: true,
      id: 2
    },
    {
      name: 'В погоне за Бенкси',
      link: cardLink,
      duration: '1ч 42м',
      saved: false,
      id: 3
    },
    {
      name: 'Баския: Взрыв реальности',
      link: cardLink,
      duration: '1ч 42м',
      saved: false,
      id: 4
    },
    {
      name: 'Бег это свобода',
      link: cardLink,
      duration: '1ч 42м',
      saved: true,
      id: 5
    },
    {
      name: 'Книготорговцы',
      link: cardLink,
      duration: '1ч 42м',
      saved: false,
      id: 6
    },
    {
      name: 'Когда я думаю о Германии ночью',
      link: cardLink,
      duration: '1ч 42м',
      saved: false,
      id: 7
    },
    {
      name: 'Gimme Danger: История Игги и The Stooges',
      link: cardLink,
      duration: '1ч 42м',
      saved: false,
      id: 8
    },
    {
      name: 'Дженис: Маленькая девочка грустит',
      link: cardLink,
      duration: '1ч 42м',
      saved: false,
      id: 9
    },
    {
      name: 'Соберись перед прыжком',
      link: cardLink,
      duration: '1ч 42м',
      saved: false,
      id: 10
    },
    {
      name: 'Пи Джей Харви: A dog called money',
      link: cardLink,
      duration: '1ч 42м',
      saved: false,
      id: 11
    },
    {
      name: 'По волнам: Искусство звука в кино',
      link: cardLink,
      duration: '1ч 42м',
      saved: false,
      id: 12
    },
    {
      name: 'Рудбой',
      link: cardLink,
      duration: '1ч 42м',
      saved: false,
      id: 13
    },
    {
      name: 'Скейт — кухня',
      link: cardLink,
      duration: '1ч 42м',
      saved: false,
      id: 14
    },
    {
      name: 'Война искусств',
      link: cardLink,
      duration: '1ч 42м',
      saved: false,
      id: 15
    },
    {
      name: 'Зона',
      link: cardLink,
      duration: '1ч 42м',
      saved: false,
      id: 16
    },
    {
      name: 'Война искусств',
      link: cardLink,
      duration: '1ч 42м',
      saved: false,
      id: 17
    },
    {
      name: 'Война искусств',
      link: cardLink,
      duration: '1ч 42м',
      saved: false,
      id: 18
    },
    {
      name: 'Война искусств',
      link: cardLink,
      duration: '1ч 42м',
      saved: false,
      id: 19
    },
    {
      name: 'Война искусств',
      link: cardLink,
      duration: '1ч 42м',
      saved: false,
      id: 20
    },
    {
      name: 'Война искусств',
      link: cardLink,
      duration: '1ч 42м',
      saved: false,
      id: 21
    },
    {
      name: 'Война искусств',
      link: cardLink,
      duration: '1ч 42м',
      saved: false,
      id: 22
    },
    {
      name: 'Война искусств',
      link: cardLink,
      duration: '1ч 42м',
      saved: false,
      id: 23
    },
    {
      name: 'Война искусств',
      link: cardLink,
      duration: '1ч 42м',
      saved: false,
      id: 24
    },
    {
      name: 'Война искусств',
      link: cardLink,
      duration: '1ч 42м',
      saved: false,
      id: 25
    }
  ];

  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState();
  const [visibleButton, setVisibleButton] = useState(true);

  useEffect(() => {       
    if (width >= 1280) {
      setVisibleItems(16);
    } else if (width < 1280 && width >= 768) {
      setVisibleItems(8);
    } else if (width < 768) {
      setVisibleItems(5);
    }
  }, [width])

  useEffect(() => {
    setItems(initialCards);      
    if (items.length > 0 && items.length <= visibleItems) {
      setVisibleButton(false);
    };  
  }, [visibleItems]);

  function showMore() {
    setVisibleItems((previousValue) => previousValue + 4);                 
  }  
  
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList selector="card" visibleItems={visibleItems} items={items} />
      <div className={`show-more ${!visibleButton && "show-more_hidden"}`}>
        <button className="show-more__button" type="buttuon" onClick={showMore}>Еще</button>
      </div>      
    </section>  
  )
}

export default Movies;