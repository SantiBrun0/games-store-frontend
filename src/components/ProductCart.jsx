import React from 'react'
import { useContextGlobal } from './utils/ContextGlobal'

const ProductCart = ({ data, removeFromCart, addToCart }) => {

  const { cart } = useContextGlobal()
  const productInCart = cart.filter(item => item.id === data.id)

  return (
    <article className='product-cart'>

        <div className='img-container'>
            <img src={data.images.front} alt="videogame" />
        </div>

        <div className='data-container'>
            <strong>{data.name}</strong>
            <p>{data.console.name}</p>
            <p>Precio: ${data.price}</p>
            <div className='quantity-container'>
              <p>{data.quantity} {data.quantity > 1 ? 'unidades' : 'unidad'}</p>
              <button 
                className={`${data.stock == 0 || productInCart[0]?.quantity == data.stock ? 'btn-cart-disabled' : 'btn-add-cart'}`} 
                disabled={(data.stock == 0 || productInCart[0]?.quantity == data.stock) ? true : false}
                onClick={() => addToCart(data)}
              >
                +
              </button>
            </div>
            <button className='btn-remove' onClick={() => removeFromCart(data)}>REMOVER DEL CARRITO</button>
        </div>


    </article>
  )
}

export default ProductCart