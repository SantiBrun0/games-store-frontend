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


  const ipRequest = ''

  const [gamesHome, setGamesHome] = useState([])

  const getGamesHome = async () => {
    const url = 'http://localhost:8080/videogame/random'
    const res = await fetch(url)
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
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    };

    const URL = `http://localhost:8080/order`;
  
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
      method: 'PUT'
    };

    const URL = `http://localhost:8080/videogame/sell?id=${id}&sale=${sale}`;

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
