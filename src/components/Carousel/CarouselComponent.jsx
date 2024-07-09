import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './ExampleCarouselImage';

const imageData = [
    {
        src: "/assets/BannerAboutUs.png",
        alt: "First slide",
        label: "First slide label",
        caption: "Nulla vitae elit libero, a pharetra augue mollis interdum."
    },
    {
        src: "/assets/BannerAlbums.png",
        alt: "Second slide",
        label: "Second slide label",
        caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        src: "/assets/BannerContactUs.png",
        alt: "Third slide",
        label: "Third slide label",
        caption: "Praesent commodo cursus magna, vel scelerisque nisl consectetur."
    },
    {
        src: "/assets/BannerLyrics.png",
        alt: "Fourth slide",
        label: "Fourth slide label",
        caption: "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh."
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
