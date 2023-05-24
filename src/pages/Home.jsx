import React, { useEffect } from 'react'
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import Card from '../components/Card';
import { useContextGlobal } from '../components/utils/ContextGlobal';



const Home = () => {

  const { gamesHome, addToCart } = useContextGlobal()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>

        <Carousel className='carousel'>
                <Carousel.Item className='item'>
                    <img
                    className="d-block w-100"
                    src="gamer-playstation.jpg"
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="gamer-xbox.jpg"
                    alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="gamer-nintendo.jpg"
                    alt="Third slide"
                    />
                </Carousel.Item>
        </Carousel>

        <Container className='home'>
            <h2>Recomendaciones</h2>
            <br />
            <Row>
                {
                    gamesHome.map(game => {
                        return (
                            <Col xs={12} sm={6} md={4} lg={3} key={game.id}>
                                <Card data={game} addToCart={addToCart} />
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    </>
  )
}

export default Home