The issue with your code is that the `fetchImages` function is designed to fetch all images from the API, and it does not have any logic for filtering images based on a search term. To implement the search functionality, you need to modify the `handleSearch` function to filter the images based on the `searchValue` state and update the `images` state accordingly.

Here's the updated code with the correct search implementation:

```jsx
import { useState, useEffect } from "react";
import Image from "./Image";
import "./gallary.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);

  const fetchImages = async () => {
    const response = await fetch(
      "https://api.unsplash.com/photos?client_id=YOUR_UNSPLASH_ACCESS_KEY"
    );

    const data = await response.json();
    setImages(data);
    setFilteredImages(data); // Initialize filteredImages with all images
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const handleSearch = () => {
    const filtered = images.filter((image) =>
      image.description?.toLowerCase().includes(searchValue)
    );
    setFilteredImages(filtered);
  };

  return (
    <div>
      <div className="search">
        <input
          type="text"
          value={searchValue}
          placeholder="Search More Images"
          onChange={handleSearchValueChange}
        />
        <button onClick={handleSearch} disabled={!searchValue}>
          Search
        </button>
      </div>
      {!images ? (
        <h2 className="loading">Loading...</h2>
      ) : (
        <section className="section-container">
          <h1 className="recommended">Recommended for you</h1>
          <div className="image-grid">
            {filteredImages.map((image) => (
              <Image key={image.id} data={image} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Gallery;
```

In this code, the `handleSearch` function filters the images based on the `searchValue` state by using the `filter` method on the `images` array. The filtered images are stored in the `filteredImages` state, which is then used to display the filtered images in the gallery. The `filteredImages` state is initialized with all images when the component mounts, and it is updated each time the user types a new search term and clicks the search button.

Remember to replace `'YOUR_UNSPLASH_ACCESS_KEY'` with your actual Unsplash API access key.

Now, the search functionality should work as expected, filtering the images based on the search term entered by the user.