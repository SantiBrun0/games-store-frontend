import React, { useEffect } from 'react'
import { Carousel } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'

const Detail = () => {

  const { state } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className='detail'>

        <Carousel className='carousel-detail'>
            <Carousel.Item className='item'>
                    <img
                    className="d-block w-100"
                    src={state.images.front}
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={state.images.back}
                    alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={state.images.extra}
                    alt="Third slide"
                    />
            </Carousel.Item>
        </Carousel>

        <div className='data-detail'>
            <h2 className='title-detail'>{state.name}</h2>
            <h4 className='console-detail'>{state.console.name}</h4>
            <p className='genre-detail'>Género: {state.genre}</p>
            <p className='launch-detail'>Fecha de lanzamiento: {state.launch}</p>
            <p className='description-detail'>{state.description}</p>
        </div>

    </section>
  )
}

export default Detail