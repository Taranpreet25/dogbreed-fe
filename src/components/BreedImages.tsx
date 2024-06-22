import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBreedDetails } from '../services/api';
import '../style/styles.css';

const BreedImages: React.FC = () => {
  const { breed } = useParams<{ breed: string }>();
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      if (breed) {
        try {
          const data = await fetchBreedDetails(breed);
          if (data && data.message) {
            setImages(data.message);
          } else {
            setError('Invalid response structure');
          }
        } catch (err) {
          setError('Failed to fetch images.');
        }
      } else {
        setError('Breed is not defined.');
      }
    };
    fetchImages();
  }, [breed]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="image-gallery">
      <h1>{breed ? breed.replace('/', ' ') : 'Breed'} Images</h1>
      <div className="image-grid">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} className="image-item">
              <img
                src={image}
                alt={`${breed} ${index}`}
                className="image"
              />
            </div>
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
};

export default BreedImages;
