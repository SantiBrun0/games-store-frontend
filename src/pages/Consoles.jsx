import React, { useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import CardConsole from "../components/CardConsole";
import Spinner from 'react-bootstrap/Spinner';
const Consoles = () => {

  const [consoles, setConsoles] = useState([])

  const getAllConsoles = async () => {
    const url = `http://localhost:8080/console`
    const res = await fetch(url)
    const data = await res.json()
    setConsoles(data)
  }

  useEffect(() => {
    setTimeout(() => {
      getAllConsoles()
    }, 1500);
  }, [])

  return (
    <>
    {
      (consoles.length == 0) ?
        <section className='spinner-container'>
          <Spinner animation="border" variant="primary" />
        </section>
      :
        <section className="consoles">
          <Container className="all-videogames">
            <h2>Consolas</h2>
            <br />
            <Row>
              {consoles.map((console) => {
                return (
                  <Col xs={12} sm={6} md={4} lg={3} key={console.id}>
                    <CardConsole data={console} />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </section>
    }
    </>
  );
};

export default Consoles;
