import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation } from "react-router-dom";
import useScreenSize from "../hooks/useScreenSize";
import { useContextGlobal } from "./utils/ContextGlobal";
import ProductCart from "./ProductCart";

const Header = () => {
  const [show, setShow] = useState(false);
  const location = useLocation()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(false)
  }, [location])
  
  const { width } = useScreenSize();

  const { cart, clearCart, removeFromCart, addToCart, totalPrice, setTotalPrice } = useContextGlobal();

  useEffect(() => {
    setTotalPrice(Number(cart.reduce((total, game) => total + (game.price * game.quantity), 0).toFixed(2)));
  }, [cart]);


  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = (isOpen) => {
    setDropdownOpen(isOpen);
  };

  const handleDropdownSelect = () => {
    setDropdownOpen(false);
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" sticky="top">
        <Container>
          {width > 445 ? (
            <Navbar.Brand className="logo">
              <img src="/icon.png" alt="logo" />
            </Navbar.Brand>
          ) : (
            ""
          )}
          
        <Nav className="me-auto">
            <Link to={"/"}>Inicio</Link>
            <NavDropdown
                title="Videojuegos"
                id="navbarScrollingDropdown"
                show={dropdownOpen}
                onToggle={handleDropdownToggle}
                onSelect={handleDropdownSelect}
            >
                <NavDropdown.Item
                as={Link}
                to={"/videogames/playstation"}
                className="link-console"
                >
                Playstation
                </NavDropdown.Item>
                <NavDropdown.Item
                as={Link}
                to={"/videogames/xbox"}
                className="link-console"
                >
                Xbox
                </NavDropdown.Item>
                <NavDropdown.Item
                as={Link}
                to={"/videogames"}
                className="link-console"
                >
                Todos
                </NavDropdown.Item>
            </NavDropdown>
            {/* <Link to={"/consoles"}>Consolas</Link> */}
            <Link to={"/orders"}>Ordenes</Link>
        </Nav>

          <Button variant="primary" onClick={handleShow} className="me-2 cart-button" disabled={location.pathname == '/purchase'}>
            <i
              className="bx bxs-cart"
              style={{
                fontSize: "2rem",
              }}
            />
            {
              (cart.length > 0) ?
                <div className="cart-number">{cart.length}</div>
              :
              ''
            }
          </Button>
          <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Carrito</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

              <aside className="cart">
                {
                    cart.map((item, index) => <ProductCart key={index} data={item} removeFromCart={removeFromCart} addToCart={addToCart} />)
                }
              </aside>

              <p className="total-price">PRECIO TOTAL: <strong>${totalPrice}</strong></p>

              <button className="btn-clean-cart" onClick={() => clearCart()}>LIMPIAR CARRITO</button>

              <Link to={"/purchase"}>
                <span className="btn-buy">COMPRAR</span>
              </Link>

            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
