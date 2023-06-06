import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import CardOrder from "../components/CardOrder";
import Spinner from 'react-bootstrap/Spinner';
import { useContextGlobal } from "../components/utils/ContextGlobal";

const Orders = () => {

  const [orderSearch, setOrderSearch] = useState('0')
  const [order, setOrder] = useState()

  const { ipRequest } = useContextGlobal()

  const getOrder= async (code) => {
    try {
      const URL = `http://${ipRequest}:8080/order/${code}`
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
        toast.error('La orden no existe :(')
        throw new Error('La orden buscada no existe');
      }
      
      const data = await res.json();
      setOrder(data)
    } catch (error) {
        throw error;
    }
  }

  const handleChangeInput = (e) => {
    setOrderSearch(e.target.value)
  }

  const handleSubmitSearch = () => {
    getOrder(orderSearch);
  }
  
  return (
    <section className="orders">
      <Toaster />
      <nav className="search-navbar">
        <label>Búsqueda por tracking code</label>
        <div className="search-input-container">
          <input type="text" onChange={handleChangeInput} style={{width: '360px'}} />
          <button onClick={handleSubmitSearch}>BUSCAR</button>
        </div>
      </nav>

      <div className="order-container">
        {
          (!order) ?
          <>
            <span>Esperando codigo</span><Spinner animation="border" variant="primary" />
          </>
          :
          <CardOrder data={order} />
        }
      </div>
    </section>
  );
};

export default Orders;
