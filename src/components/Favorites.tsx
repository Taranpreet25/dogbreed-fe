
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import '../style/favStyle.css';

interface Favorite {
  breed: string;
  url: string;
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [filteredFavorites, setFilteredFavorites] = useState<Favorite[]>([]);
  const [filterValue, setFilterValue] = useState<string>('');

  useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        console.log(storedFavorites)
        setFavorites(storedFavorites);
        setFilteredFavorites(storedFavorites);
      }, []);

  const toggleFavorite = (url: string) => {
    const updatedFavorites = favorites.filter((item:any) => item !== url);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleFilterChange = (event:any) => {
    const value = event.target.value.toLowerCase();
    console.log(value)
    setFilterValue(value);
    filterFavorites(value);
  };

  const filterFavorites = (value: string) => {
    if (value.trim() === '') {
      setFilteredFavorites(favorites);
    } else {
      const normalizedFilter = value.toLowerCase().trim();
      const filtered = favorites.filter((fav: any) => {

        const url = fav.toLowerCase();
        const breedStartIndex = url.indexOf('/breeds/') + '/breeds/'.length;
        const breedEndIndex = url.indexOf('/', breedStartIndex);
        const breed = url.substring(breedStartIndex, breedEndIndex);
  
        return breed.includes(normalizedFilter);
      });

  
      setFilteredFavorites(filtered);
    }
  };
  
  
  

return (
  <div className="favorites-container">
    <h1>Favorite Images</h1>
    <div className="filter-input">
      <input
        type="text"
        placeholder="Filter by breed..."
        value={filterValue}
        onChange={handleFilterChange}
      />
    </div>
    <div className="favorite-grid">
      {filteredFavorites.length > 0 ? (
        filteredFavorites.map((fav:any) => (
                    <div key={fav} className="favorite-item">
                      <img src={fav} alt={fav.breed} className="favorite-image" />
                      <button className="favorite-heart" onClick={() => toggleFavorite(fav)}>
                        <FontAwesomeIcon icon={solidHeart} className="heart-icon" />
                      </button>
                    </div>
                  ))
      ) : (
        <p>No favorites found</p>
      )}
    </div>
  </div>
);
};

export default Favorites;

