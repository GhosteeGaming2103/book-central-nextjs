"use client";

import React, { useEffect, useState } from "react";

const GetImages = () => {
  const [images, setImages] = useState([]);

  // On Page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/get-images", {});
        const data = await response.json();
        setImages(data);
      } catch (e: any) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const handleClick = async () => {
    // Call API
    try {
      const response = await fetch("/api/get-images", {});
      const data = await response.json();
      setImages(data);
    } catch (e: any) {
      console.error(e);
    }
  };
  return (
    <>
      {images.length > 0 && (
        <ul>
          {images.map((img: any, i: number) => (
            <li key={i}>
              <img
                src={img.url}
                alt="Uploaded Image"
                width={200}
                height={200}
              />
            </li>
          ))}
        </ul>
      )}
      <h1>Get Images</h1>
      <button type="button" onClick={handleClick}>
        GET IMAGES
      </button>
    </>
  );
};

export default GetImages;
