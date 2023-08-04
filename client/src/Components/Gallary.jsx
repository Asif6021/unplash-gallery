import { useState, useEffect } from "react";
import Image from "./Image";
import "./gallary.css";

const Gallary = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");

  const fetchRandomImages = async () => {
    const per_page = 30;
    const response = await fetch(
      `https://api.unsplash.com/photos/random?count=${per_page}&client_id=6watbpIoR8gXvfL8IhlDqoV4w0bS1om2r0_0Rvg0rtc`
    );
    const data = await response.json();
    // console.log(data);
    setImages(data);
  };

  useEffect(() => {
    fetchRandomImages();
  }, []);

  const fetchImagesByQuery = async () => {
    const per_page = 30;
    const searchUrl = `https://api.unsplash.com/search/photos?query=${query}&per_page=${per_page}&client_id=6watbpIoR8gXvfL8IhlDqoV4w0bS1om2r0_0Rvg0rtc`;
    const response = await fetch(searchUrl);
    const data = await response.json();
    setImages(data.results);
  };

  const handleSearchValaueChange = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleSearch = () => {
    if (query) {
      fetchImagesByQuery();
    }
  };

  return (
    <div>
      <div className="search">
        <input
          type="text"
          value={query}
          placeholder="Search More Images"
          onChange={handleSearchValaueChange}
        />
        <button onClick={handleSearch} disabled={!query}>
          Search
        </button>
      </div>
      {!images ? (
        <h2 className="loading">Loading...</h2>
      ) : (
        <section className="section-container">
          <h1 className="recommended">Recommended for you</h1>
          <div className="image-grid">
            {images.map((image) => (
              <Image key={image.id} data={image} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Gallary;
