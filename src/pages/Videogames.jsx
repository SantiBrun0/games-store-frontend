import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from 'react-bootstrap/Spinner';
import { useContextGlobal } from '../components/utils/ContextGlobal';

const Videogames = () => {

  const [allGames, setAllGames] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [gameSearch, setGameSearch] = useState('')

  const { addToCart, ipRequest } = useContextGlobal()

  const getAllGames = async () => {
    const URL = `http://${ipRequest}:8080/videogame/page/${page - 1}`
    const config = {
      headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':'*',
      }
    };
    const res = await fetch(URL, config)
    const data = await res.json()
    setTotalPages(data.totalPages)
    setAllGames(data.content)
  }

  const getGameByName = async (name) => {
    try {
      const URL = `http://${ipRequest}:8080/videogame/name/${name}`
      const config = {
        headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers':'*',
        }
      };
      const res = await fetch(URL, config);
      
      if (!res.ok) {
        toast.error('El videojuego no existe :(')
        throw new Error('El videojuego buscado no existe');
      }
      
      const data = await res.json();
      setAllGames(data)
    } catch (error) {
        throw error;
    }
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

  const handleChangeInput = (e) => {
    setGameSearch(e.target.value)
  }

  const handleSubmitSearch = () => {
    getGameByName(gameSearch);
  }

  return (
    <>
    {
      (allGames.length == 0) ?
        <section className='spinner-container'>
          <Spinner animation="border" variant="primary" />
        </section>
      :
        <section className='videogames'>
          <Toaster />
            <nav className='search-navbar'>
              <label>Búsqueda por nombre</label>
              <div className='search-input-container'>
                <input type="text" onChange={handleChangeInput} />
                <button onClick={handleSubmitSearch}>BUSCAR</button>
              </div>
            </nav>

            <Container className='all-videogames'>
                <h2>Videojuegos</h2>
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

export default Videogames