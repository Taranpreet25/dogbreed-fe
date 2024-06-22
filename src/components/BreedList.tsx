import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBreeds } from '../services/api';
import '../style/styles.css';

const BreedsList: React.FC = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const data = await getBreeds();
        if (data && data.message) {
          const breedNames = Object.keys(data.message).reduce((acc, breed) => {
            const subBreeds = data.message[breed];
            if (subBreeds.length > 0) {
              subBreeds.forEach((subBreed: any) => acc.push(`${breed}/${subBreed}`));
            } else {
              acc.push(breed);
            }
            return acc;
          }, [] as string[]);
          setBreeds(breedNames);
        } else {
          setError('Invalid response structure');
        }
      } catch (err) {
        setError('Failed to fetch breeds.');
      }
    };
    fetchBreeds();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='dog-breeds-container'>
      <h1>Dog Breeds</h1>
      <Link to="/favorites">
        <button className="favorites-button">View Favorites</button>
      </Link>
      <div className="breeds-container">
        {breeds.map((breed) => (
          <div key={breed} className="breed-column">
            <div className="breed-item">
              <Link to={`/breeds/${breed}`}>{breed.replace('/', ' ')}</Link>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default BreedsList;
