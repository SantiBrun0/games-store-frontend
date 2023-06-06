import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { cartInitialState, cartReducer } from "../../reducers/shoppingCartReducer";
import TYPES from "../../reducers/actionTypes";
import toast from 'react-hot-toast';


export const ContextGlobal = createContext();

const ContextProvider = ({ children }) => {

  const [totalPrice, setTotalPrice] = useState(0)

  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = (product) => {
    dispatch({
      type: TYPES.ADD_TO_CART,
      payload: product
    })
    toast.success('Agregado al carrito!')
  }

  const removeFromCart = (product) => {
    dispatch({
      type: TYPES.REMOVE_PRODUCT_FROM_CART,
      payload: product
    })
    toast('Removido del carrito!', {
      icon: '🧹',
    });
  }

  const clearCart = () => {
    dispatch({
      type: TYPES.CLEAR_CART
    })
    toast('Carrito limpio!', {
      icon: '🧹',
    });
  }


  const ipRequest = '18.218.146.105'

  const [gamesHome, setGamesHome] = useState([])

  const getGamesHome = async () => {
    const URL = `http://${ipRequest}:8080/videogame/random`
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
    setGamesHome(data)
  }

  useEffect(() => {
    getGamesHome()
  }, [])

  const postOrder = async (payload) => {
    const config = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers':'*',
        },
        body: JSON.stringify(payload)
    };

    const URL = `http://${ipRequest}:8080/order`;
  
    try {
      const response = await fetch(URL, config);
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  const sellVideogame = async (id, sale) => {
    const config = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers':'*',
      }
    };

    const URL = `http://${ipRequest}:8080/videogame/sell?id=${id}&sale=${sale}`;

    try {
      const response = await fetch(URL, config);
  
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ContextGlobal.Provider
      value={{
        ipRequest,
        gamesHome,
        addToCart,
        removeFromCart,
        clearCart,
        cart: state,
        totalPrice,
        setTotalPrice,
        postOrder,
        sellVideogame
      }}
    >
      {children}
    </ContextGlobal.Provider>
  );
};

export default ContextProvider;

export const useContextGlobal = () => {
  return useContext(ContextGlobal);
};
