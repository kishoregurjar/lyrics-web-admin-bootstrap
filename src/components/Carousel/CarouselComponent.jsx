import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './ExampleCarouselImage';

const imageData = [
    {
        src: "/assets/BannerAboutUs.png",
        alt: "Discover Our Journey",
        label: "Our Story",
        caption: "Explore the evolution of our music and the stories behind our hits."
    },
    {
        src: "/assets/BannerAlbums.png",
        alt: "Our Latest Albums",
        label: "New Releases",
        caption: "Dive into our latest albums and discover fresh sounds and rhythms."
    },
    {
        src: "/assets/BannerContactUs.png",
        alt: "Connect With Us",
        label: "Get in Touch",
        caption: "Have questions or want to collaborate? Reach out and let’s connect."
    },
    {
        src: "/assets/BannerLyrics.png",
        alt: "Lyrics for Every Song",
        label: "Song Lyrics",
        caption: "Find the lyrics to your favorite tracks and sing along with every word."
    }
];


const CarouselComponent = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <div>
            <Carousel activeIndex={index} onSelect={handleSelect} className='w-100 m-auto'>
                {imageData.map((image, idx) => (
                    <Carousel.Item key={idx}>
                        <ExampleCarouselImage src={image.src} alt={image.alt} />
                        <Carousel.Caption>
                            <h3>{image.label}</h3>
                            <p>{image.caption}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default CarouselComponent;
