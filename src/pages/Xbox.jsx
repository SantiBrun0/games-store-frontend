import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import { useContextGlobal } from '../components/utils/ContextGlobal';

const Xbox = () => {
  const [allGames, setAllGames] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const { addToCart } = useContextGlobal()

  const getAllGames = async () => {
    const url = `http://localhost:8080/videogame/console/xbox/page/${page - 1}`
    const res = await fetch(url)
    const data = await res.json()
    setTotalPages(data.totalPages)
    setAllGames(data.content)
  }

  useEffect(() => {
    if (allGames.length == 0) {
      setTimeout(() => {
        getAllGames()
      }, 1500);
    } else {
      getAllGames()
    }
  }, [page])

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  return (
    <>
    {
      (allGames.length == 0) ?
        <section className='spinner-container'>
          <Spinner animation="border" variant="primary" />
        </section>
      :
        <section className='playstation-videogames'>
            <Container className='all-videogames'>
                <h2>Xbox</h2>
                <br />
                <Row>
                    {
                        allGames.map(game => {
                            return (
                                <Col xs={12} sm={6} md={4} lg={3} key={game.id}>
                                    <Card data={game} addToCart={addToCart} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>

            <div className='pagination-container'>
              <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </section>
    }
    </>
  )
}

export default Xbox