import { useState } from "react";

const ImageCarousel = ({images}) => {
    const [counter, setCounter ] = useState(0);
    return (
        <div className="d-flex flex-column ">
            <div className="imageCarouselContainer mb-2">
                {images.map( (image, index) => {
                    return <img key={index} className="border border-2 carouselImage" src={image} alt="" srcset="" style={{zIndex: counter === index ? 999:0}} />
                })}
            </div>
            <span className="d-flex align-items-center justify-content-center">
                <button className="btn btn-dark me-1" onClick={ e => {
                    if(counter <= 0) {
                        setCounter(images.length - 1);
                        return 
                    }
                    setCounter(pre => pre - 1)
                }}>
                    <i className="fa-solid fa-angle-left p-1"></i>
                </button>
                <button className="btn btn-dark ms-1" onClick={ e => {
                    if(counter === images.length - 1) {
                        console.log(counter, 'ues')
                        setCounter(0);
                        return 
                    }
                    setCounter(pre => pre + 1)
                }}>
                    <i className="fa-solid fa-angle-right p-1"></i>
                </button>
            </span>
        </div>
    )
}

export default ImageCarousel;