import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBreedDetails } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import '../style/listImageStyle.css';


const BreedDetails: React.FC = () => {
  const { breedName } = useParams<{ breedName: string }>();
  const [breedimages, setBreedImages] = useState<[] | null>();
  const [favorites, setFavorites] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  });

  useEffect(() => {
    if (breedName) {
      const getBreedDetails = async () => {
        const data = await fetchBreedDetails(breedName);
        const dogsArray = data.message.map((imgUrl: any) => ({
            name: "breedName",
            url: imgUrl
        }));

        console.log("wefjkbejkf", dogsArray)
        
        setBreedImages(dogsArray);
        
      };
      getBreedDetails();
    }
  }, [breedName]);

  const toggleFavorite = (url: string) => {
    let updatedFavorites = [];
    if (favorites.includes(url)) {
      updatedFavorites = favorites.filter(fav => fav !== url);
    } else {
      updatedFavorites = [...favorites, url];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (!breedimages) {
    return <p>Loading...</p>;
  }

  return (

    <div className="breed-details">
      <h1>{breedName}</h1>
      <div className="image-grid">
        {breedimages.map((item:any) => (
          <div key={item} className="image-item">
            <img src={item.url} alt={item.name} className="image" />
            <div className="favorite-icon" onClick={() => toggleFavorite(item.url)}>
              {favorites.includes(item.url) ? (
                <FontAwesomeIcon icon={fasHeart} className="liked" />
              ) : (
                <FontAwesomeIcon icon={fasHeart} className="not-liked" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
};


export default BreedDetails;
