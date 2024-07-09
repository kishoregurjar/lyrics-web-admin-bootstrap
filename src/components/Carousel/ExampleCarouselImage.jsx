import React from 'react';

function ExampleCarouselImage({ src, alt }) {
    return (
        <div style={{ height: '450px', background: 'gray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={src} alt={alt} style={{ maxHeight: '100%', maxWidth: '100%' }} />
        </div>
    );
}

export default ExampleCarouselImage;